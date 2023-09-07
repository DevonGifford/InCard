import { Session } from "inspector";
import NextAuth, {
    DefaultSession, 
    Account,
    User,
    CallbacksOptions,
} from "next-auth/next";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
    /** 
     * Dev Note💻:  
     * Returned via `jwt` callback and `getToken`, when using JWT sessions
     *  */
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
    /**
     * Dev Note💻:
     * Returned by `useSession`, `getSession` and received as
     * a prop on the `SessionProvider` React Context
     */
    interface Session {
        accessToken?: Account.accessToken;
        customSessionProperty: string;
        id:string;
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
        contactAddress?: { id?: string; };
    }
}


/*
Future Devon Note:
The shape of the user object returned in th Oauth providers profile callback,
or the second parameter of the session callback, when using a database.

interface User {}
    Usually constans information about the provider being used
    and also extends 'TokenSet, which is different tokens returned by OAuth Providers

interface Account {}
    The OAuth profile returned from your provider

interface Profile {}
*/ 