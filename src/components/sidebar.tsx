import Link from "next/link";
import SidebarLink from "./ui/sidebarlink";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi"; //FIXME: replace package with lucid icon
import { ExternalLink, Github, Linkedin } from "lucide-react";

export default function SideBar() {
  return (
    <div className="flex flex-row gap-3 z-20 scale-75 - sm:scale-100 sm:-translate-x-0">
      <Sheet>
        <SheetTrigger
          asChild
          className=" cursor-pointer hover:text-incard-blue hover:scale-110"
        >
          <GiHamburgerMenu size={28} />
        </SheetTrigger>
        <SheetContent side={"left"} className=" bg-incard-blue/80">
          <SheetHeader>
            <SheetDescription className="ml-4">
              <div className="fixed top-28 flex flex-col gap-6 sm:gap-12 md:gap-20 text-xl sm:text-2xl font-bold text-left">
                <SidebarLink
                  source={"/"}
                  title="Home"
                  secure={false}
                  client={false}
                />
                <SidebarLink
                  source={"/auth/signIn"}
                  title="Sign-In"
                  secure={false}
                  client={true}
                />
                <SidebarLink
                  source={"/dashboard"}
                  title="Dashboard"
                  secure={true}
                  client={true}
                />
              </div>
              <footer className="fixed bottom-10 ">
                <h2 className="w-4/5 sm:w-3/5 text-left tracking-wider text-base sm:text-lg font-extrabold text-cyan-900 underline underline-offset-8 pt-24 lg:pt-16 ">
                  Quick Links
                </h2>
                <div className="flex flex-col text-left pt-3 text-xs sm:text-base text-zinc-200">
                  <Link
                    target="_blank"
                    href="https://github.com/DevonGifford/InCard"
                  >
                    <div className="flex flex-row gap-5 py-2 transition ease-in-out duration-150 hover:scale-105">
                      <Github size={20} /> Project Source Code
                    </div>
                  </Link>

                  <Link
                    target="_blank"
                    href="https://www.linkedin.com/in/dbgifford/"
                  >
                    <div className="flex flex-row gap-5 py-2 transition ease-in-out duration-150 hover:scale-105">
                      <Linkedin size={20} />
                      LinkedIn Profile{" "}
                    </div>
                  </Link>

                  <Link target="_blank" href="https://devongifford.vercel.app/">
                    <div className="flex flex-row gap-5 py-2 transition ease-in-out duration-150 hover:scale-105">
                      <ExternalLink size={20} />
                      Portfolio Website{" "}
                    </div>
                  </Link>
                </div>
              </footer>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
