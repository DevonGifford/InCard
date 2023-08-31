"use client";

import Link from "next/link"
import React, { useRef, useState } from "react";

import { MdOutlineClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi" 

import NavBarSession from "./navbarsession";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
    const ref = useRef<string | any>("")


    function handleMenu (e:any) {
      setShowMenu(false)
    }

    const { data: session } = useSession({
      required: false
    })

    return (
        <nav className="bg-orange-500 p-4 flex justify-between">
            {/* BURGER ICON */}
            <div onClick={() => setShowMenu(true)}>
                <GiHamburgerMenu size={30}/>
            </div>
            {/* SIDE-BAR-MENU */}
            {showMenu && (
              <div 
                ref={(node) => (ref.current = node)} 
                onClick={handleMenu}
                className="absolute mdl:hidden top-0 left-0 bottom-0 left-start w-full h-screen flex flex-col "
              >
                <div className="w-full sm:w-[60%] h-full scrollbar-hide bg-orange-500 flex flex-col items-center px-4 py-16 mt-14 relative z-10">
                    {/* CLOSE BUTTON */}
                    <MdOutlineClose  
                      onClick={() => setShowMenu(false)}
                      className="text-3xl text-textGreen cursor-pointer hover:scale-125 absolute top-8 right-8"
                    />
                    {/* LIST OF PAGES */}
                    <ul className="flex flex-col font-semibold text-3xl gap-12 md:gap-24 items-left md:pt-32">
                        <li className="transition ease-in-out duration-150 hover:scale-110 hover:-translate-y-1"><Link href="/">Home</Link></li>
                        <li className="transition ease-in-out duration-150 hover:scale-110 hover:-translate-y-1"><Link href="/an-extra-page-example">Bonus Page</Link></li>
                        <li className="transition ease-in-out duration-150 hover:scale-110 hover:-translate-y-1"><Link href="/a-server-page-example">SSR Page</Link></li>
                        <li className="transition ease-in-out duration-150 hover:scale-110 hover:-translate-y-1"><Link href="/a-client-page-example">CSR Page</Link></li>
                    </ul>
                </div>
              </div>
            )}
            {/* CONDITIONAL SIGN-IN & SIGN-OUT BUTTONS */}
            {/* <NavBarSession /> */}
            {session? (
                <>
                <button className=" font-semibold text-2xl " onClick={() => signOut()}>Sign Out</button>
                </>
              ):(
                <>
                <button className=" font-semibold text-2xl " onClick={() => signIn()}>Sign In</button>
                </>
            )}
        </nav>
    )
}

