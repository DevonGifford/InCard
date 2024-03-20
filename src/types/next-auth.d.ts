import { Session } from "inspector";
import NextAuth, {
  DefaultSession,
  Account,
  User,
  CallbacksOptions,
} from "next-auth/next";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: Account.accessToken;
    customTokenProperty: string;
    id: string;
    refreshTokenExpires?: number;
    accessTokenExpires?: number;
    refreshToken?: string;
    token: string;
    exp?: number;
    iat?: number;
    jti?: string;
  }
}

declare module "next-auth" {
  interface Session {
    accessToken?: Account.accessToken;
    customSessionProperty: string;
    id: string;
    username: string | null;
    refreshTokenExpires?: number;
    accessTokenExpires?: string;
    refreshToken?: string;
    token?: string;
    error?: string;
    user?: User;
  }

  interface User {
    username?: string | null;
    firstName?: string;
    lastName?: string;
    email?: string | null;
    id?: string;
    contactAddress?: { id?: string };
  }
}
