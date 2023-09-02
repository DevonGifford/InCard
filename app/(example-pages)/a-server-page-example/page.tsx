import { getServerSession } from "next-auth/next";
import { options } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Link from "next/link";
import Button from "../../components/button";
import UserCard from "@/app/components/usercard";

export default async function ServerPage() {
    const session = await getServerSession(options);
    // ✅ Handle redirect - not authenticated
    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/an-extra-page-example');
    } else {
        //✖ console.log("👀 [SSR page] Current Session: ", session?.user);
    }

    return (
        <section className="flex flex-col items-center justify-between p-5 gap-10">
            <UserCard user={session?.user} pagetype={"Server"} />
            <Link href='/'><Button text="Back to Home Page" /></Link>
        </section>
    )
}