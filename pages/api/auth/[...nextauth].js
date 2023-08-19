import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    CredentialProvider({
      name: "Sign in With Username and Password",

      async authorize(credentials, req) {
        // Find the user wher email == req.body.email
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
          where: {
            AND: [{ email: email }, { pass: password }],
          },
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
          },
        });
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

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
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    newUser: "/newuser", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async jwt({ token, account, user, isNewUser }) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      if (user) {
        token.user.id = user.id;
      }
      if (isNewUser) {
        token.isNewUser = isNewUser;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.uid = token.uid;
      return session;
    },
    session: {
      strategy: "jwt",
    },
  },
};

export default NextAuth(authOptions);
