"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import SideBar from "./sidebar";
import Logo from "@/public/incard_logo.png";

export default function Navbar() {
  const { data: session } = useSession({ required: false });

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
      <div className="flex flex-row gap-4 z-20 scale-75 -translate-x-5 sm:scale-100 sm:-translate-x-0">
        <SideBar />

        <Link href="/">
          <Image
            src={Logo}
            height={1}
            width={110}
            alt="inCard Logo"
          />
        </Link>
      </div>

      {session ? (
        <button
          className=" bg-incard-blue px-6 py-1 rounded-full font-medium text-base tracking-wider text-black"
          onClick={() => handleSignOut()}
        >
          Sign Out
        </button>
      ) : (
        <button
          className=" bg-incard-blue px-6 py-1 rounded-full font-medium text-base tracking-wider text-black"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      )}
    </nav>
  );
}
