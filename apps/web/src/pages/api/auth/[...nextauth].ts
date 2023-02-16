/* eslint-disable turbo/no-undeclared-env-vars */
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { getAccessToken } from "../../../lib/getAccessToken";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account && user) {
        user.accessToken = await getAccessToken({
          ...user,
          provider: account.provider,
        });
        return true;
      }
      return false;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user?.accessToken,
          refreshToken: user?.refreshToken,
        };
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.accessToken = token?.accessToken;
        session.user.refreshToken = token?.refreshToken;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
