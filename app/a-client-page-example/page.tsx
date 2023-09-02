'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import UserCard from "@/app/components/usercard"
import Button from '../components/button'

export default function ClientPage() {
    //✅ Checking & Retrieving current Session - redirect to sign-in 
    const { data: session, update } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/client')
        }
    })

    //✅ Reset the maxAge of session 
    async function updateSession() {
        await update({
            ...session,
            user: {
                ...session?.user,
            }
        })
        console.log("session successfully updated ✔")
        // 🎯 could use some notification here?  
    }   

    //✅ Show time until token expiration 
    // 🎯 time remaining = xx -> this is the hot toast notif 

    return (
        <section className="flex flex-col items-center justify-between p-5">
            <UserCard user={session?.user} pagetype={"Client"} />
            <div className='w-1/2 flex flex-col gap-3 md:flex-row justify-evenly pt-10'>
                <Button 
                  text='Log Session'
                  onClick={() => console.log({ session })}
                />
                <Button
                    text='Update Session' 
                    onClick={updateSession}
                />
            </div>
        </section>
    )
}