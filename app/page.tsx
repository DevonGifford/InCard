import Image from 'next/image' 
import { options } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import { signIn } from 'next-auth/react'

import UserCard from "@/app/components/usercard"
import YouShallNotPass from "./../public/you_shall_not_pass.png"
import Link from 'next/link'

import HappyGandalf from "@/public/you_pass.png"
import Button from './components/button'

export default async function Home() {
  const session = await getServerSession(options)



  return (
    <main className="flex min-h-screen flex-col items-center justify-between m-12">
      {session ? (
        //- USER HAS BEEN VALIDATED
        <div className="flex flex-col justify-center items-center">
          <span className="text-5xl p-5 font-bold text-center text-orange-500">Welcome back, {session?.user?.name}</span>
          <Image
            className="w-1/2 border-8 rounded-full border-orange-500"
            src={HappyGandalf} 
            width={500}
            height={500}
            alt="happy gandalf"
          />
          <div className='p-5 pt-10 w-full flex flex-col sm:flex-row justify-center items-center gap-6 lg:justify-evenly'>
            <Link href='/a-client-page-example'><Button text='link to CSR page' /></Link>
            <Link href='/a-server-page-example'><Button text='link to SSR page' /></Link>
          </div>
        </div>
      ) : (
        //- USER HAS NOT BEEN VALIDATED
        <div className='flex flex-col justify-center items-center'>
          <h1 className="text-center text-orange-500 underline underline-offset-8 pb-2 font-bold text-5xl">You Shall Not Pass</h1>
          <Image 
            src={YouShallNotPass} 
            width={500}
            height={500}
            alt="You shall not pass"
          />
          <Link href={'/auth/signIn'} className='w-full'>
            <div className="w-full text-center text-2xl hover:bg-gray-900  text-orange-400 p-4 border-4 rounded-xl font-semibold border-orange-500"> 
              Please  <span className='hover:underline'>sign in</span>  to continue 
            </div>
          </Link>
        </div>
      )}
    </main>
  )
}
