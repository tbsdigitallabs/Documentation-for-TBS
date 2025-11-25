import NextAuth, { type NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import "@/lib/env-validation"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    // Development-only credentials provider for skipping auth
    ...(process.env.NODE_ENV === 'development' ? [
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
    ] : []),
  ],
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
        // Initialize profile data
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
        }
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

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
