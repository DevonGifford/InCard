import type { NextAuthOptions, Session, User } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

export const options: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username: ",
          type: "text",
          placeholder: "Enter your username here",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your secret password here",
        },
      },

      async authorize(credentials) {
        //Note: Production would have some logic here for retrieving user data from db then compare/verify credentials
        //Note: Hard coding a user for technical interviewer - Production would have a post request to backend API
        const user = {
          id: "001",
          name: "incard",
          password: "incard",
        };
        //Note: Production would have more extensive logic - would use bcrypt to be comparing passwords etc.
        if (
          credentials?.username === user.name &&
          credentials.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    //adding custom 'jwt-tokens'
    async jwt({ token, user }: { token: JWT; user?: User }): Promise<JWT> {
      token.customTokenProperty = "Added from JWT Callback";
      //Note: The thought process is now (say this was production app) we could now use post requests based on the users id or name
      if (user) {
        return {
          ...token,
          custom_id: user.id, //-token id will be updated/set as userID
          name: user.name, //-store the username in the token because why not ..
        };
      }
      return token;
    },

    //adding custom 'session'
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
      user: User;
    }): Promise<Session> {
      //Note: The thought process is now we can easily access the user's id and name via session (when using the useSession hook)
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
        },
      };
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/"))
        return `${baseUrl}${url}`; //-Allows relative callback URLs
      else if (new URL(url).origin === baseUrl) return url; //-Allows callback URLs on the same origin
      return baseUrl;
    },
  },

  //Note: Setting s custom maxAge on the session & JWT tokens
  session: {
    strategy: "jwt",
    maxAge: 5 * 60,
  },
  jwt: {
    maxAge: 5 * 60,
  },

  // Custom re-directs
  pages: {
    signIn: "/auth/signIn",
    signOut: "/auth/signIn",
  },
};
