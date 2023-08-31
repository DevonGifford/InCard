import type { NextAuthOptions } from 'next-auth';
//import GitHubProvider from 'next-auth/providers/github'
import CredentialProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
    //👇 Default is JWT so don't really need to specify the below code - but one way to set storage session length
    session: {
        //-default is jwt, an encrypted JWT (JWE) stored in the session cookie.
        strategy:'jwt',  //using JWT token
        //-How long until an idle session expires and is no longer valid.
        maxAge: 3*60, //3 minutes
    },

    //👇 callback URL in querey string - post signIn and signOut pages
    pages: {
        signIn: "/auth/signIn",
        signOut: "/",
    },
    
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

            async authorize(credentials) {
                //👇 Normally would have some logic here for retrieving user data from db and verify with credentials
                
                //👇 Hard coding a user for technical interviewer - normally have a post request to backend API
                const user = { id: "001", name:"incard", password: "incard"}
                
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


};