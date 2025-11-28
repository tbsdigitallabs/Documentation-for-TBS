import NextAuth, { type NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import "@/lib/env-validation"
import { upsertUser } from "@/lib/user-store"

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
          session.user.profile = token.profile
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
        token.profile = {
          bio: null,
          role: null,
          skills: [],
          interests: [],
          learningGoals: null,
          experienceLevel: null,
          profileImage: null,
          selectedClass: null,
          hobbies: null,
          systems: null,
          level: user.email === 'dev@tbsdigitallabs.com.au' ? 10 : 1,
          xp: user.email === 'dev@tbsdigitallabs.com.au' ? 10000 : 0,
          completedModules: [],
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
          // Generate completed modules for all roles to reach max XP (10000)
          const roles = ['developers', 'designers', 'project-managers', 'content-creators', 'sales-business-dev'];
          const modulesPerRole = ['module-1', 'module-2'];
          let totalXP = 0;
          
          roles.forEach(role => {
            modulesPerRole.forEach(module => {
              const moduleId = `${role}/${module}`;
              const moduleName = `${role.charAt(0).toUpperCase() + role.slice(1)} - ${module.replace('module-', 'Module ')}`;
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
          // Each module gives 75 XP, so 10 modules = 750 XP, we need ~133 modules total
          // But we'll just set it to 10000 XP and create enough modules
          while (totalXP < 10000) {
            const role = roles[Math.floor(Math.random() * roles.length)];
            const module = modulesPerRole[Math.floor(Math.random() * modulesPerRole.length)];
            const moduleId = `${role}/${module}-extra-${Math.floor(Math.random() * 1000)}`;
            const moduleName = `${role.charAt(0).toUpperCase() + role.slice(1)} - Advanced Training`;
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
        }
        
        token.profile = {
          ...(token.profile as any || {}),
          level: 10,
          xp: 10000,
          // Ensure cosmetic unlocks work by setting a valid class if missing
          selectedClass: (token.profile as any)?.selectedClass || 'developers',
          completedModules: isDavid ? completedModules : (token.profile as any)?.completedModules || [],
        };
      }

      // Update token when session is updated (from API routes)
      if (trigger === 'update' && sessionData) {
        if (sessionData.profile && typeof sessionData.profile === 'object') {
          token.profile = { ...(token.profile as object || {}), ...sessionData.profile }
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
