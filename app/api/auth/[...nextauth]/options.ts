import type { NextAuthOptions, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
//import GitHubProvider from 'next-auth/providers/github'
import CredentialProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
    
    providers: [
        CredentialProvider ({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username: ",
                    type: "text",
                    placeholder: "Enter your username here",
                },
                password:  {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter your secret password here",
                } 
            },

            //👇 Authorize function is called
            async authorize(credentials) {
                //👇 Normally would have some logic here for retrieving user data from db and then verify the credentials
                
                //👇 Hard coding a user for technical interviewer - normally have a post request to backend API
                const user = { 
                    id: "001", 
                    name:"incard", 
                    password: "incard",
                }
                
                //👇 Normally would have more extensive logic - would use bcrypt to be comparing passwords 
                if (credentials?.username === user.name && credentials.password === user.password ) {
                        //-Any object returned will be saved in `user` property of the JWT
                        return user;
                    } else {
                        //-If null then an error will be displayed advising the user to check their details.
                        return null;
                    }
                    //👉 Could also reject this callback with an Error & send user to an error page (w/ error message as a query parameter)
                }
        })
    ],
    /// Adding a custom property to the session object
    // 👇  
    callbacks: {

        //- Basically, we just need to use the types that are already present in the next-auth (Session, JWT, Account). 
        //- However, these types only contain necessary properties. Hence, we need to augment its type.
        
       async jwt({ token, user,} : { token: JWT, user?: User, }) : Promise<JWT>{
            token.customTokenProperty = "Added from JWT Callback"
            console.log({
                msg: "JWT Callback Result 🔥",
                token:  token,
                user: user,             //expected undefinded - only upon sign-in callback
                //account: account,     //expected undefinded - only upon sign-in callback
                //profile: profile,     //expected undefinded - only upon sign-in callback
            });

            // 👇 Pass in CUSTOM DATA into to token  
            //-The thought process is now (say this was production app) we could now use post requests based on the users id or name  
            if (user) {
                return {
                    ...token,
                    custom_id: user.id,     // now token id will be the same as the user id and stored in the token
                    name: user.name,        // store the username in the token because why not ..
                }
            }
            return token;
        },
        
        async session({ session, token, user} : {session: Session, token: JWT, user: User}) : Promise<Session> {
            console.log({
                msg: "Session Callback 🔥",
                session: session,
                user: user,
                token: token,
            });

            // 👇 Passs in CUSTOM DATA into the session 
            // -  The thought process is now we can access the user's id and name via session (when using the useSession hook)
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id, 
                    name: token.name
                }
            };
            return session;
        }
    },
    
    //👇 Default is JWT so don't really need to specify the below code - but one way to set maxAge on session
    session: {
        //-default is jwt, an encrypted JWT (JWE) stored in the session cookie.
        strategy:'jwt',  //using JWT token
        //-How long until an idle session expires and is no longer valid.
        maxAge: 3*60, //3 minutes
    },

    //👇 Default when using startergy session jwt stratergy - but one way to set maxAge on jwt token
    jwt: {
        //- can set the max age of the JWT
        maxAge: 3*60,
        // secret: process.env.SECRET_KEY,
        //- can definde own encoding/decoiding functions for signing & encryption 
        //async encode() {},
        //async decode() {},

    },

    //👇 Custom callback URL in querey string - post signIn and signOut pages
    pages: {
        signIn: "/auth/signIn",
        signOut: "/",
    },
    
};