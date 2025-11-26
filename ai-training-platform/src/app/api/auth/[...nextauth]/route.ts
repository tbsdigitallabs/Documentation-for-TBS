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
          level: 1,
          xp: 0,
          completedModules: [],
        }
      }
      // Ensure onboardingCompleted is always defined (default to false if undefined)
      if (token.onboardingCompleted === undefined) {
        token.onboardingCompleted = false
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
