'use client'
// Remember you must use an AuthProvider for 
// client components to useSession
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

import UserCard from "@/app/components/usercard"


export default function ClientPage() {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/client')
        }
    })

    return (
        <section className="flex min-h-screen flex-col items-center justify-between p-24">
            <UserCard user={session?.user} pagetype={"Client"} />
        </section>
    )
}