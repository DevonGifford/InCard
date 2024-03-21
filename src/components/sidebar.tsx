import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { ExternalLink, Github, Linkedin, Menu } from "lucide-react";

const sidebarLinks = [
  {
    href: "/",
    title: "Home",
    secure: false,
    client: false,
  },
  {
    href: "/auth/signIn",
    title: "Sign-In",
    secure: false,
    client: true,
  },
  {
    href: "/dashboard",
    title: "Dashboard",
    secure: true,
    client: true,
  },
];

const quickLinks = [
  {
    href: "https://github.com/DevonGifford/InCard",
    text: "Project Source Code",
    icon: <Github size={20} />,
  },
  {
    href: "https://www.linkedin.com/in/dbgifford/",
    text: "LinkedIn Profile",
    icon: <Linkedin size={20} />,
  },
  {
    href: "https://devongifford.vercel.app/",
    text: "Portfolio Website",
    icon: <ExternalLink size={20} />,
  },
];

export default function SideBar() {
  return (
    <div className="flex flex-row gap-3 z-20 scale-75 sm:scale-100 sm:-translate-x-0">
      <Sheet>
        <SheetTrigger
          asChild
          className="cursor-pointer hover:text-incard-blue hover:scale-105"
        >
          <Menu size={28} />
        </SheetTrigger>
        <SheetContent side="left" className="bg-incard-blue/80">
          <SheetHeader>
            <SheetDescription className="ml-4">
              <div className="fixed top-28 flex flex-col gap-6 sm:gap-12 md:gap-20 text-xl sm:text-2xl font-bold text-left">
                {sidebarLinks.map(({ href, title, secure, client }) => (
                  <Link href={href} key={href}>
                    <div className="transition ease-in-out duration-150 hover:scale-95 text-white hover:text-cyan-950">
                      <h2>{title}</h2>
                      <aside className="flex flex-col md:flex-row md:gap-3 text-xs font-semibold ml-2">
                        <div className="text-green-950">
                          {secure ? (
                            <span>Protected page</span>
                          ) : (
                            <span>Unprotected page</span>
                          )}
                        </div>
                        <div className="text-gray-200/60">
                          {client ? (
                            <span>Client Side</span>
                          ) : (
                            <span>Server Side</span>
                          )}
                        </div>
                      </aside>
                    </div>
                  </Link>
                ))}
              </div>

              <footer className="fixed bottom-10">
                <h2 className="w-4/5 sm:w-3/5 text-left tracking-wider text-base sm:text-lg font-extrabold text-cyan-900 underline underline-offset-8 pt-24 lg:pt-16">
                  Quick Links
                </h2>
                <div className="flex flex-col text-left pt-3 text-xs sm:text-base text-zinc-200">
                  {quickLinks.map(({ href, text, icon }) => (
                    <Link target="_blank" href={href} key={href}>
                      <div className="flex flex-row gap-5 py-2 transition ease-in-out duration-150 hover:scale-105">
                        {icon} {text}
                      </div>
                    </Link>
                  ))}
                </div>
              </footer>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
