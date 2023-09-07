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
        //👇 Normally would have some logic here for retrieving user data from db and then verify the credentials

        //👇 Hard coding a user for technical interviewer - normally have a post request to backend API
        const user = {
          id: "001",
          name: "incard",
          password: "incard",
        };
        //👇 Normally would have more extensive logic - would use bcrypt to be comparing passwords
        if (
          credentials?.username === user.name &&
          credentials.password === user.password
        ) { //-Any object returned will be saved in `user` property of the JWT
          return user;
        } else { //-If null then an error will be displayed advising the user to check their details.
          return null;
        }
        //👉 Could also reject this callback with an Error & send user to an error page (w/ error message as a query parameter)
      },
    }),
  ],
  // 👇 Adding a custom property to the session object
  // 🤔 Basically, we just need to use the types that are already present in the next-auth (Session, JWT, Account) - these types only contain necessary properties. Hence, we need to augment its type.
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }): Promise<JWT> {
      token.customTokenProperty = "Added from JWT Callback";
      // 👇 Pass in CUSTOM DATA into to token
      // 🤔 The thought process is now (say this was production app) we could now use post requests based on the users id or name
      if (user) {
        return {
          ...token,
          custom_id: user.id, //-token id will be updated/set as userID 
          name: user.name, //-store the username in the token because why not ..
        };
      }
      return token;
    },

    async session({ session, token, user, }: {
        session: Session;
        token: JWT;
        user: User;
    }): Promise<Session> {    
      // 👇 Passs in CUSTOM DATA into the session
      // 🤔 The thought process is now we can access the user's id and name via session (when using the useSession hook)
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
        },
      };
      return session;
    },
  },
  //👇 Default is JWT (encrypted JWT i.e. JWE) so don't really need to specify the below code - one way to set maxAge on session
  session: {
    strategy: "jwt", //-using JWT token
    maxAge: 3 * 60, //-3 minutes
  },
  //👇 Default when using 'stratergy session' jwt stratergy - one way to set maxAge on jwt token
  jwt: {
    maxAge: 3 * 60,
    // secret: process.env.SECRET_KEY,
  },
  //👇 Custom callback URL in querey string - post signIn and signOut pages
  pages: {
    signIn: "/auth/signIn",
    signOut: "/",
  },
};
