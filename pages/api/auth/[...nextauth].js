import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import { prisma } from '@/lib/prisma'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',

      async authorize(credentials, req) {
        // Find the user wher email == req.body.email
        const { key, password } = req.body
        const user = await prisma.user.findFirst({
          where: {
            AND: [{ OR: [{ email: key }, { handle: key }] }, { password }],
          },
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
          },
        })
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  jwt: {
    encryption: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
  },
  callbacks: {
    async jwt({ token, account, user, isNewUser }) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken
      }
      if (user) {
        token.uid = user.id
        token.privilleges = user.privilleges
      }
      if (isNewUser) {
        token.isNewUser = isNewUser
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      session.user.id = token.uid
      session.privilleges = token.privilleges
      return session
    },
    async signIn({ user, account, profile, email }) {
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return '/unauthorized'
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    redirect: async (url, _baseUrl) => {
      if (url === '/user') {
        return Promise.resolve('/')
      }
      return Promise.resolve('/')
    },
  },
  session: {
    strategy: 'jwt',
  },
}

export default NextAuth(authOptions)
