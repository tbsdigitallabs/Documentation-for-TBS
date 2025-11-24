import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
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
  debug: true, // Enable debug mode
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
        (session.user as any).id = token.sub
      }
      return session
    },
    async jwt({ token, user, account }) {
      // On first sign in, store user info in token
      if (account && user) {
        token.sub = user.id
        token.email = user.email
        token.name = user.name
        token.picture = user.image
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
  },
})

export { handler as GET, handler as POST }
