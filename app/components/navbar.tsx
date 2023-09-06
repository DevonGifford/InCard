"use client";

import Link from "next/link"
import React, { useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { MdOutlineClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi" 
import { toast } from "react-hot-toast";
import Image from "next/image";

import Logo from "@/public/incard_logo.png"

export default function Navbar() {
    //  ✅ Handle opening and Closing of SideBar
    const [showMenu, setShowMenu] = useState(false);
    const ref = useRef<string | any>("");
    function handleMenu (e:any) { setShowMenu(false) };

    // ✅ Get Session data for conditional signIn/signOut button
    const { data: session } = useSession({
      required: false
    })

    return (
        <nav className="bg-transparent p-4 flex justify-between">
            {/* BURGER ICON */}
            <div className="flex flex-row gap-3 z-20 scale-75 -translate-x-5 sm:scale-100 sm:-translate-x-0" onClick={() => setShowMenu(true)}>
                <GiHamburgerMenu size={30}/>
                <Image 
                  className="-translate-y-1 scale-90"
                  src={Logo}
                  height={1}
                  width={120}
                  alt="inCard Logo"
                />
            </div>
            {/* SIDE-BAR-MENU */}
            {showMenu && (
              <div 
                ref={(node) => (ref.current = node)} 
                onClick={handleMenu}
                className="absolute mdl:hidden top-0 left-0 bottom-0 left-start w-full h-screen flex flex-col "
              >
                <div className="w-full sm:w-[60%] max-w-screen-xl h-full scrollbar-hide bg-incard-blue flex flex-col items-center px-4 py-16 relative z-10">
                    {/* CLOSE BUTTON */}
                    <MdOutlineClose  
                      onClick={() => setShowMenu(false)}
                      className="text-3xl text-textGreen cursor-pointer hover:scale-125 absolute top-8 right-8"
                    />
                    {/* LIST OF ROUTES */}
                    <ul className="flex flex-col font-semibold text-3xl gap-12 md:gap-24 items-left pt-12 md:pt-32">
                        <li className="transition ease-in-out duration-150 hover:scale-110 hover:-translate-y-1"><Link href="/">Home</Link></li>
                        <li className="transition ease-in-out duration-150 hover:scale-110 hover:-translate-y-1"><Link href="/an-extra-page-example">Bonus Page</Link></li>
                        <li className="transition ease-in-out duration-150 hover:scale-110 hover:-translate-y-1"><Link href="/a-server-page-example">SSR Page</Link></li>
                        <li className="transition ease-in-out duration-150 hover:scale-110 hover:-translate-y-1"><Link href="/a-client-page-example">CSR Page</Link></li>
                    </ul>
                </div>
              </div>
            )}
            {/* CONDITIONAL SIGN-IN & SIGN-OUT BUTTONS */}
            {session? (
                <button className=" bg-incard-blue px-6 py-1 rounded-full font-semibold text-lg text-black" onClick={() => signOut()}>Sign Out</button>
              ):(
                <button className=" bg-incard-blue px-6 py-1 rounded-full font-semibold text-lg text-black" onClick={() => signIn()}>Sign In</button>
            )}
        </nav>
    )
}

