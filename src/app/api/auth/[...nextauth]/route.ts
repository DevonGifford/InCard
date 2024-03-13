import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialProvider from "next-auth/providers/credentials";
import type { Session, User } from "next-auth";

const handler = NextAuth({
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        // Note: Hardcoding a single user for demonstration purposes.
        const user = { id: "001", name: "incard", password: "incard" };

        // Note: Utilizing basic credential comparison. Prod would have more robust security, like bcrypt for password hashing
        return (
          credentials?.username === user.name &&
          credentials.password === user.password
        ) ? user : null;
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 180 },
  jwt: { maxAge: 180 },
  callbacks: {
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
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/signIn",
    signOut: "/auth/signIn",
  },
});

export { handler as GET, handler as POST };
