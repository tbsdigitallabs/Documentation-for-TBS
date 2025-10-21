import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Only allow @thebigsmoke and @tbsdigitallabs email domains
      if (user.email) {
        const allowedDomains = ['@thebigsmoke.com.au', '@tbsdigitallabs.com.au']
        const userDomain = user.email.substring(user.email.lastIndexOf('@'))

        if (allowedDomains.includes(userDomain)) {
          return true
        }
      }
      return false
    },
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = (user as any).id
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'database',
  },
})

export { handler as GET, handler as POST }
