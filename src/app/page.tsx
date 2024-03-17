import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import socialIcons from "@/public/other";
import HomeUnauthenticated from "@/public/home/home_unauthenticated.png";
import Button from "./components/ui/button";

const socialIconsTyped: { [key: string]: StaticImageData } = socialIcons;

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between m-5 sm:m-10">
      <div className="flex flex-col justify-center gap-3 sm:gap-7 items-center text-center pt-5 sm:pt-20">
        <header className="text-center pb-2 font-bold text-4xl lg:text-6xl mx-10">
          <span className="text-incard-blue">Grow your online </span>
          business <br /> with incard.
        </header>

        <span className=" max-w-2xl text-sm sm:text-base sm:mx-14">
          This is a Frontend take home assessment. Consists of 3 pages. SSR &
          CSR. Authentication persistent sessions. protected routes. route
          handeling. error handeling
        </span>

        <Link href="/dashboard">
          <Button text="Dashboard" />
        </Link>

        <aside className="text-sm sm:text-xl">
          This is{" "}
          <strong className="text-incard-blue">a Server Side Rendered</strong>{" "}
          Page
        </aside>

        <Image
          className="w-full -z-10 md:-translate-y-24"
          src={HomeUnauthenticated}
          width={900}
          height={300}
          alt="You shall not pass"
        />

        <footer className="flex flex-col -translate-y-20 md:-translate-y-72 justify-center items-center text-center gap-2 md:gap-10">
          <span>We work across all major ecom platforms</span>
          <div className="flex flex-col justify-center items-center md:flex-row gap-6 ">
            {Object.keys(socialIcons).map((iconName: string, index: number) => (
              <div key={index}>
                <Image
                  src={socialIconsTyped[iconName]}
                  width={100}
                  height={200}
                  alt="company logo"
                />
              </div>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}
