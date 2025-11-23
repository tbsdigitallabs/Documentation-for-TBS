import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

// Lazy initialization to avoid database connection during build
let prisma: PrismaClient | undefined;

function getPrisma() {
  if (!prisma) {
    prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });
  }
  return prisma;
}

const handler = NextAuth({
  adapter: PrismaAdapter(getPrisma()),
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
    async session({ session, user, token }) {
      // Handle dev skip auth session (JWT strategy)
      if (token?.sub && token.sub === 'dev-user-123') {
        session.user = {
          id: 'dev-user-123',
          name: 'Dev User',
          email: 'dev@tbsdigitallabs.com.au',
          image: null,
        } as any
        return session
      }

      // Handle database strategy (production)
      if (user) {
        session.user.id = (user as any).id
      }

      return session
    },
    async jwt({ token, user, account }) {
      // Store dev user info in token
      if (account?.provider === 'dev-skip' && user) {
        token.sub = user.id
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
    strategy: process.env.NODE_ENV === 'development' ? 'jwt' : 'database',
  },
})

export { handler as GET, handler as POST }
