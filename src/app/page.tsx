import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import Button from "../components/ui/button";
import splashImage from "@/public/incard-images/home_horizontal_card.png"; 
import clientLogos from "@/public/client-logos";  

const clientLogo: { [key: string]: StaticImageData } = clientLogos;

export default async function Home() {  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between m-5 sm:m-10">
      <div className="flex flex-col justify-center gap-3 sm:gap-7 items-center text-center pt-5 sm:pt-20">
        <header className="text-center pb-2 font-bold text-4xl lg:text-6xl mx-10">
          <span className="text-incard-blue">Grow your online </span>
          business <br /> with incard.
        </header>

        <span className=" max-w-2xl text-sm sm:text-base sm:mx-14">
          This is a Frontend take home assessment. Consists of 3 pages. Utilizing SSR &
          CSR. Authentication with persistent sessions and protected routes
        </span>

        <Link href="/dashboard" className="text-sm">
          <Button text="Getting  Started" />
        </Link>


        <Image
          className="w-full -z-10 md:-translate-y-24"
          src={splashImage}
          width={900}
          height={300}
          alt="premium visa card"
        />

        <footer className="flex flex-col -translate-y-20 md:-translate-y-72 justify-center items-center text-center gap-2 md:gap-10">
          <span>We work across all major ecom platforms</span>
          <div className="flex flex-col justify-center items-center md:flex-row gap-6 ">
            {Object.keys(clientLogos).map((iconName: string, index: number) => (
              <div key={index}>
                <Image
                  src={clientLogo[iconName]}
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
