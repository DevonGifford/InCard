import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

import SideBar from "@/app/components/sidebar";
import Logo from "@/public/incard_logo.png";

export default function Navbar() {
  //✅ Get Session data for conditional signIn/signOut button
  const { data: session } = useSession({
    required: false,
  });

  // ✅ Handle sign-out w/ toast notification
  async function handleSignOut() {
    try {
      const data = await signOut({
        redirect: true,
        callbackUrl: "/auth/signIn",
      });
      if (data) {
        toast.success("Successfully signed out");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <nav className="bg-transparent p-4 flex justify-between">
      <div className="flex flex-row gap-3 z-20 scale-75 -translate-x-5 sm:scale-100 sm:-translate-x-0">
        {/* BURGER MENU & SIDEBAR */}
        <SideBar />
        {/* Logo */}
        <Link href="/">
          <Image
            className="-translate-y-1 scale-90 hover:scale-95"
            src={Logo}
            height={1}
            width={120}
            alt="inCard Logo"
          />
        </Link>
      </div>

      {/* CONDITIONAL SIGN-IN & SIGN-OUT BUTTONS */}
      {session? (
          <button className=" bg-incard-blue px-6 py-1 rounded-full font-semibold text-lg text-black" onClick={() => handleSignOut()}>Sign Out</button>
        ):(
          <button className=" bg-incard-blue px-6 py-1 rounded-full font-semibold text-lg text-black" onClick={() => signIn()}>Sign In</button>
      )}
    </nav>
  );
}
