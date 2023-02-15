/* eslint-disable turbo/no-undeclared-env-vars */
import axios from "axios";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { API_BASE_URL } from "../../../lib";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
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
      if (account?.provider === "github") {
        user.accessToken = await getAccessToken({ ...user, provider: "github" });
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
      if(session.user){
        session.user.accessToken = token?.accessToken;
        session.user.refreshToken = token?.refreshToken;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);

async function getAccessToken(user: any) {
  try {
    const res = await axios.post(API_BASE_URL + "/auth/login", user);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
