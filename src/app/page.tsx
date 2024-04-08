import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import Button from "../components/ui/button";

import clientLogos from "@/public/client-logos";

const clientLogo: { [key: string]: StaticImageData } = clientLogos;

export default async function Home() {
  return (
    <main className="flex flex-col h-[80vh] justify-evenly items-center gap-8 bg-cover bg-center bg-no-repeat bg-[url('/incard-images/home_horizontal_card.png')] mt-8 md:pt-1">
      <header className="flex flex-col text-center space-y-4 md:space-y-14 ">
        <p className="flex flex-col font-bold text-4xl lg:text-6xl">
          <span className="text-incard-blue">Grow your online </span>
          business <br /> with incard.
          <span className="max-w-2xl text-sm sm:text-base sm:mx-14 font-thin pt-6 text-white">
            This is a Frontend take home assessment. Consists of 3 pages.
            Utilizing SSR & CSR. Authentication with persistent sessions and
            protected routes
          </span>
        </p>

        <Link href="/dashboard" className="text-sm">
          <Button text="Getting  Started" />
        </Link>
      </header>

      <footer className="flex flex-col justify-center items-center text-center gap-4 lg:gap-8">
        <span className="font-semibold italic">
          We work across all major ecom platforms
        </span>

        <div className="w-[90vw] inline-flex flex-nowrap gap-20 overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] group">
          <ul className="flex space-x-20 items-center justify-center animate-infinite-scroll group-hover:paused cursor-pointer">
            {Object.keys(clientLogos).map((iconName: string, index: number) => (
              <div
                key={index}
                className="flex items-center justify-center animate-infinite-scroll group-hover:paused cursor-pointer"
              >
                <Image
                  src={clientLogo[iconName]}
                  width={150}
                  height={150}
                  alt="company logo"
                  className="max-w-none"
                />
              </div>
            ))}
          </ul>

          <ul
            className="flex space-x-20 items-center justify-center animate-infinite-scroll group-hover:paused"
            aria-hidden="true"
          >
            {Object.keys(clientLogos).map((iconName: string, index: number) => (
              <div
                key={index}
                className="hidden lg:flex items-center justify-center  animate-infinite-scroll group-hover:paused cursor-pointer"
                aria-hidden="true"
              >
                <Image
                  src={clientLogo[iconName]}
                  width={150}
                  height={150}
                  alt="company logo"
                  className="max-w-none"
                />
              </div>
            ))}
          </ul>
        </div>
      </footer>
    </main>
  );
}
