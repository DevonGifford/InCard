import Image from 'next/image' 
import { options } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"

import UserCard from "@/app/components/usercard"
import YouShallNotPass from "./../public/you_shall_not_pass.png"

export default async function Home() {
  const session = await getServerSession(options)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session ? (
        // USER HAS BEEN VALIDATED
        <div className="flex flex-col justify-center items-center">
          <UserCard user={session?.user} pagetype={"Server"} />
          <span className="text-xl text-center text-green-600">You have successfully been authenticated</span>

        </div>
      ) : (
        // USER HAS NOT BEEN VALIDATED
        <div>
          <h1 className="text-center text-orange-500 underline underline-offset-8 pb-2 font-bold text-5xl">You Shall Not Pass</h1>
          <Image 
            src={YouShallNotPass} 
            width={500}
            height={500}
            alt="You shall not pass"
          />
          <h3 className="text-center text-2xl  text-orange-400 p-4 border-4 rounded-xl font-semibold border-orange-500"> Please login to continue </h3>
        </div>
      )}
    </main>
  )
}
