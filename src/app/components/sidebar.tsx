import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import CustomLink from "./ui/customlink";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { ExternalLink, Github, Linkedin } from "lucide-react";

export default function SideBar() {
  return (
    <div className="flex flex-row gap-3 z-20 scale-75 - sm:scale-100 sm:-translate-x-0">
      <Sheet>
        <SheetTrigger
          asChild
          className=" cursor-pointer hover:text-incard-blue hover:scale-110"
        >
          <GiHamburgerMenu size={30} />
        </SheetTrigger>
        <SheetContent side={"left"} className=" bg-incard-blue/80">
          <SheetHeader>
            <SheetDescription className="ml-4">
              <div className="pt-10 sm:pt-16">
                <h1 className="text-left tracking-wider text-2xl md:text-3xl font-extrabold text-cyan-900 underline underline-offset-8 pb-8">
                  THE 3 PAGES:
                </h1>
                <div className="flex flex-col gap-6 sm:gap-12 text-xl sm:text-2xl font-bold text-left">
                  <CustomLink
                    source={"/"}
                    title="The Home Page"
                    secure={false}
                    client={false}
                  />
                  <CustomLink
                    source={"/auth/signIn"}
                    title="The Sign-In Page"
                    secure={false}
                    client={true}
                  />
                  <CustomLink
                    source={"/dashboard"}
                    title="The Dashboard Page"
                    secure={true}
                    client={true}
                  />
                </div>
              </div>
              <h2 className="w-4/5 sm:w-3/5 text-left tracking-wider text-base sm:text-lg font-extrabold text-cyan-900 underline underline-offset-8 pt-24 lg:pt-16 ">
                Some Quick Links
              </h2>
              <div className="flex flex-col text-left pt-3 text-xs sm:text-base text-zinc-200">
                <Link
                  target="_blank"
                  href="https://github.com/DevonGifford/InCard---TechnicalAssaignment"
                >
                  <div className="flex flex-row gap-5 py-2 transition ease-in-out duration-150 hover:scale-110">
                    <Github size={20} /> Project Source Code
                  </div>
                </Link>

                <Link
                  target="_blank"
                  href="https://www.linkedin.com/in/dbgifford/"
                >
                  <div className="flex flex-row gap-5 py-2 transition ease-in-out duration-150 hover:scale-110">
                    <Linkedin size={20} />
                    LinkedIn Profile{" "}
                  </div>
                </Link>

                <Link target="_blank" href="https://devongifford.vercel.app/">
                  <div className="flex flex-row gap-5 py-2 transition ease-in-out duration-150 hover:scale-110">
                    <ExternalLink size={20} />
                    Portfolio Website{" "}
                  </div>
                </Link>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
