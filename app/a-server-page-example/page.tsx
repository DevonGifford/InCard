import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

import UserCard from "@/app/components/usercard"

export default async function ServerPage() {
    const session = await getServerSession(options)
    

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/an-extra-page-example')
    }

    return (
        <section className="flex min-h-screen flex-col items-center justify-between p-24">
            <span className="text-xl text-center text-green-600">Only authenticated users can see this</span>
            <UserCard user={session?.user} pagetype={"Server"} />
        </section>
    )

}