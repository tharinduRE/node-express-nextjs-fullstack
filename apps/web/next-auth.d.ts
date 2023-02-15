import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt"

interface CustomUser {
  accessToken: string;
  refreshToken: string;
}

declare module "next-auth" {
  export interface User extends CustomUser {}

  interface Session  {
    user?: {
      accessToken?: string | null;
      refreshToken?: string | null;
    } & DefaultSession["user"] 
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
  }
}