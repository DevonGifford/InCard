import type { NextAuthOptions, Session, User } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

export const options: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "Credentials",
      //FIXME: Remove dead code
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
        // Note: In this assessment, a hardcoded user is provided for demonstration purposes.
        // In a production environment, authentication would typically involve sending a POST request to the backend API/DB to validate user credentials.
        const user = {
          id: "001",
          name: "incard",
          password: "incard",
        };

        // Note: In this assessment, a basic credential comparison is performed for simplicity.
        // In a production environment, more robust security measures, such as bcrypt for password hashing and comparison, would be employed.
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
    //Note: Adding custom properties to JWT token
    async jwt({ token, user }: { token: JWT; user?: User }): Promise<JWT> {
      token.customTokenProperty = "Added from JWT Callback";
      if (user) {
        return {
          ...token,
          custom_id: user.id,
          name: user.name,
        };
      }
      return token;
    },

    //Note: Adding custom properties to session
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
      user: User;
    }): Promise<Session> {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
        },
      };
    },

    // custom redirect logic
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  // custom maxAge for session & JWT-token
  session: {
    strategy: "jwt",
    maxAge: 180,
  },
  jwt: {
    maxAge: 180,
  },

  // custom redirects
  pages: {
    signIn: "/auth/signIn",
    signOut: "/auth/signIn",
  },
};
