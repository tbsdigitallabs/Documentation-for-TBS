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
      // Add user info from token to session
      if (session.user && token.sub) {
        session.user.id = token.sub
        // Add profile data from token to session
        if (token.profile) {
          // CRITICAL: Don't load all completedModules into session - it causes 431 errors
          // Build minimal session profile - only essential fields
          // The session is sent to client, so keep it as small as possible
          const profile = token.profile as any;
          
          // Build minimal profile object
          const sessionProfile: any = {
            level: profile.level || 1,
            xp: profile.xp || 0,
            selectedClass: profile.selectedClass,
          };
          
          // Only include completedModules if it's small (max 10)
          const modules = (profile.completedModules || []);
          if (modules.length > 0) {
            sessionProfile.completedModules = modules.slice(0, 10);
          } else {
            sessionProfile.completedModules = [];
          }
          
          // Include flag if present
          if (profile.hasAllModulesCompleted) {
            sessionProfile.hasAllModulesCompleted = true;
          }
          
          // Only include small optional fields (skip if null/undefined to save space)
          if (profile.profileImage) {
            sessionProfile.profileImage = profile.profileImage;
          }
          if (profile.cosmeticLoadout) {
            sessionProfile.cosmeticLoadout = profile.cosmeticLoadout;
          }
          
          session.user.profile = sessionProfile;
        }
        if (token.onboardingCompleted !== undefined) {
          session.user.onboardingCompleted = token.onboardingCompleted
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
        token.picture = user.image
        // Initialize profile data - always set onboardingCompleted to false for new users
        token.onboardingCompleted = false
        // CRITICAL: Keep initial profile minimal to prevent 431 errors
        // Only include essential fields, avoid null values that add to token size
        token.profile = {
          level: user.email === 'dev@tbsdigitallabs.com.au' ? 10 : 1,
          xp: user.email === 'dev@tbsdigitallabs.com.au' ? 10000 : 0,
          completedModules: [], // Always start empty
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
        
        // Create comprehensive completed modules list for david@thebigsmoke.com.au
        let completedModules: any[] = [];
        if (isDavid) {
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
          
          // Store completedModules in user store instead of JWT to prevent 431 errors
          // JWT tokens have size limits, so we store the full list in the file-based store
          if (token.email) {
            try {
              const { upsertUser } = await import('@/lib/user-store');
              upsertUser({
                email: token.email,
                name: token.name || 'SLAM',
                selectedClass: (token.profile as any)?.selectedClass || 'developers',
                level: 10,
                xp: 10000,
                completedModules: completedModules, // Store in user store
              });
            } catch (storeError) {
              console.error('Error storing David\'s modules in user store:', storeError);
            }
          }
        }
        
        // CRITICAL: Don't store all completedModules in JWT token - it causes 431 errors
        // Store ONLY essential data in JWT, everything else goes in user store
        // For David, store empty array and flag - full list is in user store
        const existingProfile = (token.profile as any) || {};
        
        // Build minimal profile object - only include essential fields
        const minimalProfile: any = {
          level: 10,
          xp: 10000,
          selectedClass: existingProfile.selectedClass || 'developers',
        };
        
        // CRITICAL: Empty array for David to keep JWT small
        if (isDavid) {
          minimalProfile.completedModules = [];
          minimalProfile.hasAllModulesCompleted = true;
        } else {
          // For other users, limit to 10 most recent
          const modules = (existingProfile.completedModules || []);
          minimalProfile.completedModules = modules.slice(-10);
        }
        
        // Only include small optional fields
        if (existingProfile.profileImage) {
          minimalProfile.profileImage = existingProfile.profileImage;
        }
        if (existingProfile.cosmeticLoadout) {
          minimalProfile.cosmeticLoadout = existingProfile.cosmeticLoadout;
        }
        
        token.profile = minimalProfile;
      }

      // Update token when session is updated (from API routes)
      if (trigger === 'update' && sessionData) {
        if (sessionData.profile && typeof sessionData.profile === 'object') {
          const updatedProfile = { ...(token.profile as object || {}), ...sessionData.profile };
          
          // CRITICAL: Limit completedModules in JWT to prevent 431 errors
          // Store only the 10 most recent modules in JWT, rest should be in user store
          if ((updatedProfile as any).completedModules && Array.isArray((updatedProfile as any).completedModules)) {
            const allModules = (updatedProfile as any).completedModules;
            // Keep only the 10 most recent modules in JWT
            (updatedProfile as any).completedModules = allModules.slice(-10);
            
            // Store full list in user store if email is available
            if (token.email && allModules.length > 10) {
              try {
                upsertUser({
                  email: token.email,
                  completedModules: allModules, // Store full list
                  level: (updatedProfile as any).level,
                  xp: (updatedProfile as any).xp,
                  selectedClass: (updatedProfile as any).selectedClass,
                });
              } catch (storeError) {
                console.error('Error storing completedModules in user store:', storeError);
              }
            }
          }
          
          token.profile = updatedProfile;
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
