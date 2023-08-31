import Image from "next/image"
import HappyGandalf from "@/public/you_pass.png"

type User = {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
} | undefined

type Props = {
    user: User,
    pagetype: string,
}

export default function Card({ user, pagetype }: Props) {

    //-GREETING CARD
    const greeting = user?.name ? (
        <div>
            <div className="flex flex-col items-center p-6 bg-orange-500  font-bold text-5xl text-white">
                Welcome {user?.name}!
            </div>
            <Image
              className="border-8 border-orange-500"
              src={HappyGandalf} 
              width={500}
              height={500}
              alt="happy gandalf"
            />

        </div>
    ) : null
    
    //-IF USER HAS PROFILE PICTURE - from Oauth
    const userImage = user?.image ? (
        <Image
            className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
            src={user?.image}
            width={200}
            height={200}
            alt={user?.name ?? "Profile Pic"}
            priority={true}
        />
    ) : null

    return (
        <section className="flex flex-col gap-4">
            <p className="text-2xl text-center">This is a {pagetype} Side Rendered Page!</p>
            {greeting}
            {userImage}
        </section>
    )
}