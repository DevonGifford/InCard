'use client'
// Remember you must use an AuthProvider for 
// client components to useSession
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

import UserCard from "@/app/components/usercard"


export default function ClientPage() {
    const { data: session, update } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/client')
        }
    })
    
    const { data: sessionStuff } = useSession();

    async function updateSession() {
        //if (session) console.log(sessionStuff?.expires);
        await update({
            ...session,
            user: {
                ...session?.user,
                
            }
        })
    }   



    return (
        <section className="flex min-h-screen flex-col items-center justify-between p-24">
            <span className="text-xl text-center text-green-600">Only authenticated users can see this</span>
            <UserCard user={session?.user} pagetype={"Client"} />
            
            <div className='w-full flex justify-evenly pt-4'>
                <button 
                  className="border bg-orange-600 text-white rounded px-4 py-2" 
                  onClick={updateSession}
                >
                    Update Session
                </button>
                <button 
                  className="border bg-orange-600 text-white rounded px-4 py-2" 
                  onClick={() => console.log({ session })}
                >
                    Log Session
                </button>
            </div>

        </section>
    )
}