import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import Button from "../components/ui/button";
import splashImage from "@/public/incard-images/home_horizontal_card.png";
import clientLogos from "@/public/client-logos";

const clientLogo: { [key: string]: StaticImageData } = clientLogos;

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between m-5 sm:m-10 pt-20">
      <div className="relative h-[70vh] md:h-[50vh] flex flex-col justify-between gap-3 md:gap-7 items-center text-center ">
        <header className="flex flex-col text-center space-y-4  md:space-y-14 ">
          <p className="flex flex-col font-bold text-4xl lg:text-6xl">
            <span className="text-incard-blue">Grow your online </span>
            business <br /> with incard.
            <span className="max-w-2xl text-sm sm:text-base sm:mx-14 font-thin pt-6">
              This is a Frontend take home assessment. Consists of 3 pages.
              Utilizing SSR & CSR. Authentication with persistent sessions and
              protected routes
            </span>
          </p>
          <Link href="/dashboard" className="text-sm">
            <Button text="Getting  Started" />
          </Link>
        </header>

        <Image
          className="absolute -z-10 translate-y-10"
          src={splashImage}
          width={1800}
          height={600}
          alt="premium visa card"
        />

        <footer className="flex flex-col justify-center items-center text-center gap-4 lg:gap-8">
          <span className="font-semibold italic">
            We work across all major ecom platforms
          </span>
          <div className="flex overflow-hidden space-x-3 gap-2 group">
            {Object.keys(clientLogos).map((iconName: string, index: number) => (
              <div
                key={index}
                className="flex items-center animate-loop-scroll group-hover:paused cursor-pointer"
              >
                <Image
                  src={clientLogo[iconName]}
                  width={200}
                  height={200}
                  alt="company logo"
                  className="max-w-none mx-4 lg:mx-10"
                />
              </div>
            ))}
            {Object.keys(clientLogos).map((iconName: string, index: number) => (
              <div
                key={index}
                className="hidden lg:flex items-center animate-loop-scroll group-hover:paused cursor-pointer"
                aria-hidden="true"
              >
                <Image
                  src={clientLogo[iconName]}
                  width={200}
                  height={200}
                  alt="company logo"
                  className="max-w-none mx-4 lg:mx-10"
                />
              </div>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}
