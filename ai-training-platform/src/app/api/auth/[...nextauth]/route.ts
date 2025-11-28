import NextAuth, { type NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import "@/lib/env-validation"
import { upsertUser, getUserByEmail } from "@/lib/user-store"

// Build providers array - ensure at least one provider exists
const providers = [];

// Add Google provider if credentials are available
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  );
}

// Always add dev-skip provider in development (ensures at least one provider)
if (process.env.NODE_ENV === 'development') {
  providers.push(
    CredentialsProvider({
      id: 'dev-skip',
      name: 'Dev Skip Auth',
      credentials: {},
      async authorize() {
        // Return a mock user for development
        return {
          id: 'dev-user-123',
          name: 'Dev User',
          email: 'dev@tbsdigitallabs.com.au',
          image: null,
        }
      },
    })
  );
}

// NextAuth requires at least one provider
if (providers.length === 0) {
  throw new Error('NextAuth requires at least one provider. Please configure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET, or run in development mode.');
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || (process.env.NODE_ENV === 'development' ? 'dev-secret-change-in-production' : undefined),
  providers,
  debug: false, // Disable debug mode to reduce connection issues
  callbacks: {
    async signIn({ user, account, profile }) {
      // Allow dev skip auth in development
      if (account?.provider === 'dev-skip') {
        return true
      }

      // Only allow @thebigsmoke and @tbsdigitallabs email domains
      if (user.email) {
      // Exception for specific allowed users
      const allowedEmails = [
        'stephanie.maticevski@gmail.com',
        'zorasphone@gmail.com',
        'brearnerose22@gmail.com'
      ];

      if (user.email && allowedEmails.includes(user.email)) {
        return true
      }

        const allowedDomains = ['@thebigsmoke.com', '@thebigsmoke.com.au', '@oh-hello.co', '@tbsdigitallabs.com', '@tbsdigitallabs.com.au']
        const userDomain = user.email.substring(user.email.lastIndexOf('@'))

        if (allowedDomains.includes(userDomain)) {
          // Store user in leaderboard database on sign in
          try {
            upsertUser({
              id: user.id || user.email,
              email: user.email,
              name: user.name || 'Anonymous',
              image: user.image || undefined,
            });
          } catch (error) {
            console.error('Failed to store user:', error);
          }
          return true
        }
      }
      return false
    },
    async session({ session, token }) {
      // CRITICAL: Build ABSOLUTE MINIMAL session to prevent 431 errors
      // The session is sent to client in cookies/headers, so it MUST be tiny
      if (session.user && token.sub) {
        session.user.id = token.sub
        session.user.email = token.email || null
        session.user.name = token.name || null
        // DO NOT include token.picture/image in session - it can be large
        
        // Add profile data from token to session - ABSOLUTE MINIMUM
        if (token.profile) {
          const profile = token.profile as any;
          
          // Build absolute minimal profile - only essential fields
          // For David, only include the flag - nothing else
          if (profile.hasAllModulesCompleted) {
            session.user.profile = {
              level: profile.level || 10,
              xp: profile.xp || 10000,
              selectedClass: profile.selectedClass || null,
              hasAllModulesCompleted: true,
              // NO completedModules array - saves significant space
            };
          } else {
            // For other users, absolute minimum - only 1 most recent module if exists
            const modules = (profile.completedModules || []);
            session.user.profile = {
              level: profile.level || 1,
              xp: profile.xp || 0,
              selectedClass: profile.selectedClass || null,
              // Only include 1 most recent module if exists (reduced to absolute minimum)
              ...(modules.length > 0 ? { completedModules: modules.slice(-1) } : {}),
            };
          }
          
          // CRITICAL: DO NOT include profileImage or cosmeticLoadout in session
          // These can be fetched from user store via API if needed
        }
        
        // Only include onboardingCompleted if it's true (skip false to save space)
        if (token.onboardingCompleted === true) {
          session.user.onboardingCompleted = true
        }
      }
      return session
    },
    async jwt({ token, user, account, trigger, session: sessionData }) {
      // On first sign in, store user info in token
      if (account && user) {
        token.sub = user.id
        token.email = user.email
        token.name = user.name
        // CRITICAL: Don't store user.image in token.picture - it can be large
        // Store image URL in user store instead if needed
        // token.picture = user.image // REMOVED to prevent 431 errors
        // Initialize profile data - always set onboardingCompleted to false for new users
        token.onboardingCompleted = false
        // CRITICAL: Keep initial profile ABSOLUTE MINIMAL to prevent 431 errors
        // Only include essential fields, no arrays
        token.profile = {
          level: user.email === 'dev@tbsdigitallabs.com.au' ? 10 : 1,
          xp: user.email === 'dev@tbsdigitallabs.com.au' ? 10000 : 0,
          // DO NOT include completedModules array - start with undefined (smaller than empty array)
        }
      }
      // Ensure onboardingCompleted is always defined (default to false if undefined)
      if (token.onboardingCompleted === undefined) {
        token.onboardingCompleted = false
      }

      // FORCE UPDATE for dev user to ensure max stats
      // Supports both standard dev email and specific user david@thebigsmoke.com.au
      const isDevUser = token.email === 'dev@tbsdigitallabs.com.au' || token.email === 'david@thebigsmoke.com.au';
      const isDavid = token.email === 'david@thebigsmoke.com.au';
      
      if (isDevUser || isDavid) {
        token.name = "SLAM";
        
        // CRITICAL: For David, store modules in user store FIRST, then create minimal token
        // This prevents the large array from ever being in the JWT token
        let completedModules: any[] = [];
        if (isDavid) {
          // Store completedModules in user store BEFORE creating token profile
          // This ensures the large array never enters the JWT token
          // Map route slugs to content directory names and actual module slugs
          const roleModules: Record<string, { route: string; contentDir: string; modules: string[] }> = {
            developers: {
              route: 'developers',
              contentDir: 'developers',
              modules: ['01-foundation', '02-automated-research-pipelines', '03-ai-assisted-testing', '04-refactoring-legacy-code', '05-documenting-proprietary-systems']
            },
            designers: {
              route: 'designers',
              contentDir: 'designers',
              modules: ['01-ai-ui-ux-workflow', '02-generative-assets', '03-design-systems-ai']
            },
            'project-managers': {
              route: 'project-managers',
              contentDir: 'project-managers',
              modules: ['01-strategy-foundations', '02-ai-research-strategy', '03-ai-internal-data', '04-strategy-workflows', '05-qa-validation', '06-asana-automation', '07-meeting-governance']
            },
            'content-creators': {
              route: 'content-creators',
              contentDir: 'content-creators',
              modules: ['01-pr-angles', '02-creative-systems', '03-video-generation']
            },
            'sales-business-dev': {
              route: 'sales-business-dev',
              contentDir: 'sales',
              modules: ['01-gtm-planning', '02-lead-gen-systems', '03-hubspot-hygiene', '04-automated-reporting']
            }
          };
          
          let totalXP = 0;
          
          // Add all foundation modules first (Session 0)
          const foundationModules = ['02-admin-automation', '03-ai-cybersecurity-best-practices', '04-ai-landscape-2025', 'sora-setup'];
          foundationModules.forEach(moduleSlug => {
            const moduleId = `session-0/${moduleSlug}`;
            const moduleName = moduleSlug.replace(/^\d+-/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            const xpEarned = 75;
            totalXP += xpEarned;
            
            completedModules.push({
              moduleId,
              moduleName,
              completedAt: new Date().toISOString(),
              xpEarned,
              quizScore: 10,
            });
          });
          
          // Add all actual modules
          Object.values(roleModules).forEach(({ route, modules }) => {
            modules.forEach(moduleSlug => {
              const moduleId = `${route}/${moduleSlug}`;
              const moduleName = moduleSlug.replace(/^\d+-/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
              const xpEarned = 75; // Max XP per module (50 base + 25 bonus for perfect quiz)
              totalXP += xpEarned;
              
              completedModules.push({
                moduleId,
                moduleName,
                completedAt: new Date().toISOString(),
                xpEarned,
                quizScore: 10, // Perfect score
              });
            });
          });
          
          // Add more modules to reach exactly 10000 XP if needed
          // Each module gives 75 XP, we have ~22 modules = 1650 XP, need ~8350 more = ~111 more modules
          const allRoles = Object.keys(roleModules);
          const allModules = Object.values(roleModules).flatMap(r => r.modules);
          
          while (totalXP < 10000) {
            const role = allRoles[Math.floor(Math.random() * allRoles.length)];
            const roleData = roleModules[role];
            const module = roleData.modules[Math.floor(Math.random() * roleData.modules.length)];
            const moduleId = `${roleData.route}/${module}-repeat-${Math.floor(Math.random() * 1000)}`;
            const moduleName = `${module.replace(/^\d+-/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} (Advanced)`;
            const xpEarned = 75;
            totalXP += xpEarned;
            
            completedModules.push({
              moduleId,
              moduleName,
              completedAt: new Date().toISOString(),
              xpEarned,
              quizScore: 10,
            });
            
            if (completedModules.length > 200) break; // Safety limit
          }
          
          // CRITICAL: Store completedModules in user store FIRST (before creating token)
          // This ensures the large array never enters the JWT token
          if (token.email) {
            try {
              const { upsertUser } = await import('@/lib/user-store');
              upsertUser({
                email: token.email,
                name: token.name || 'SLAM',
                selectedClass: (token.profile as any)?.selectedClass || 'developers',
                level: 10,
                xp: 10000,
                completedModules: completedModules, // Store FULL list in user store
              });
            } catch (storeError) {
              console.error('Error storing David\'s modules in user store:', storeError);
            }
          }
        }
        
        // CRITICAL: Create ABSOLUTE MINIMAL token profile AFTER storing in user store
        // This ensures the large completedModules array never enters the JWT token
        const existingProfile = (token.profile as any) || {};
        
        if (isDavid) {
          // David: ONLY essential fields - no arrays, no optional data
          token.profile = {
            level: 10,
            xp: 10000,
            selectedClass: existingProfile.selectedClass || 'developers',
            hasAllModulesCompleted: true,
            // completedModules stored in user store, NOT in token
            // profileImage and cosmeticLoadout NOT in token
          };
        } else {
          // Other users: absolute minimum
          const modules = (existingProfile.completedModules || []);
          token.profile = {
            level: existingProfile.level || 1,
            xp: existingProfile.xp || 0,
            selectedClass: existingProfile.selectedClass || null,
            // Only 1 most recent module if exists
            ...(modules.length > 0 ? { completedModules: modules.slice(-1) } : {}),
          };
        }
      }

      // Update token when session is updated (from API routes)
      if (trigger === 'update' && sessionData) {
        if (sessionData.profile && typeof sessionData.profile === 'object') {
          const updatedProfile = { ...(token.profile as object || {}), ...sessionData.profile };
          
          // CRITICAL: Limit completedModules in JWT to prevent 431 errors
          // Store only the 3 most recent modules in JWT (reduced to prevent 431), rest in user store
          const allModules = (updatedProfile as any).completedModules || [];
          
          // Build absolute minimal profile for JWT
          const minimalUpdatedProfile: any = {
            level: (updatedProfile as any).level,
            xp: (updatedProfile as any).xp,
            selectedClass: (updatedProfile as any).selectedClass,
          };
          
          // Handle completedModules - limit to 2 most recent (reduced to prevent 431)
          if (allModules.length > 0) {
            minimalUpdatedProfile.completedModules = allModules.slice(-2);
          }
          // Don't include empty array - undefined is smaller
          
          // Include flag if present
          if ((updatedProfile as any).hasAllModulesCompleted) {
            minimalUpdatedProfile.hasAllModulesCompleted = true;
          }
          
          // CRITICAL: Skip profileImage and cosmeticLoadout entirely - they can be large
          // Fetch from user store via API if needed
          
          // Store full list in user store if email is available
          if (token.email && allModules.length > 2) {
            try {
              upsertUser({
                email: token.email,
                completedModules: allModules, // Store full list
                level: (updatedProfile as any).level,
                xp: (updatedProfile as any).xp,
                selectedClass: (updatedProfile as any).selectedClass,
                profileImage: (updatedProfile as any).profileImage,
                cosmeticLoadout: (updatedProfile as any).cosmeticLoadout,
              } as any);
            } catch (storeError) {
              console.error('Error storing completedModules in user store:', storeError);
            }
          }
          
          token.profile = minimalUpdatedProfile;
        }
        if (sessionData.onboardingCompleted !== undefined) {
          token.onboardingCompleted = sessionData.onboardingCompleted
        }
      }
      return token
    },
    async redirect({ url, baseUrl }) {
      // Allow relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allow callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    // Reduce session update frequency to prevent token bloat
    updateAge: 24 * 60 * 60, // Update session max once per day
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NEXTAUTH_URL?.startsWith('https://') ?? false,
        // Reduce maxAge to force more frequent token refreshes (smaller tokens)
        maxAge: 7 * 24 * 60 * 60, // 7 days instead of 30
      },
    },
  },
  useSecureCookies: process.env.NEXTAUTH_URL?.startsWith('https://'),
}

// Set NEXTAUTH_URL fallback for development
if (!process.env.NEXTAUTH_URL && process.env.NODE_ENV === 'development') {
  process.env.NEXTAUTH_URL = 'http://localhost:3000';
}

// Only initialize NextAuth if we have a secret or are in development with fallback
const canInitializeAuth = process.env.NEXTAUTH_SECRET || process.env.NODE_ENV === 'development';

let handler: ReturnType<typeof NextAuth> | null = null;

if (canInitializeAuth) {
  try {
    handler = NextAuth(authOptions);
  } catch (error) {
    console.error('Failed to initialize NextAuth:', error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
    handler = null;
  }
}

// Export handlers - return 500 if NextAuth not initialized
export const GET = handler
  ? handler
  : async () => {
    return new Response(
      JSON.stringify({ error: 'NextAuth not configured. Please set NEXTAUTH_SECRET in .env.local' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  };

export const POST = handler
  ? handler
  : async () => {
    return new Response(
      JSON.stringify({ error: 'NextAuth not configured. Please set NEXTAUTH_SECRET in .env.local' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  };
