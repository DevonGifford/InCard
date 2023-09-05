import Image from "next/image"
import HappyGandalf from "@/public/you_pass.png"

type User = {
    name?: string | null | undefined;
    image?: string | null | undefined;
} | undefined

type Props = {
    user: User,
    pagetype: string,
}

export default function Card({ user, pagetype }: Props) {
    //👇Conditional Greeting Card (w/username from session)
    const greeting = user?.name ? (
        <div>
            <div className="flex flex-col justify-center text-center items-center pt-1 bg-orange-500 font-bold text-base sm:text-xl sm:p-4 md:text-3xl text-white">
                <span>Welcome {user?.name}!</span>
                <span className=" text-sm md:text-lg text-green-500 font-bold">Logged-in  ✔</span>
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
    //👇 Conditional if User-Image exists (from OAuth) - opted to not use OAuth in this project
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
        <section className="flex sm:w-1/2 sm:h-1/2 justify-center items-center flex-col gap-4">
            {greeting}
            {userImage}
            <p className="text-l sm:text-2xl text-center">This is a {pagetype} Side Rendered Page!</p>
            <span className="text-base text-center text-green-600">Only authenticated users can see this</span>
        </section>
    )
}