import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import HomeUnauthenticated from "@/public/home/home_unauthenticated.png";
import HomeAuthenticated from "@/public/home/home_authenticated.png";
import socialIcons from "@/public/other";
import Button from "./components/button";

const socialIconsTyped: { [key: string]: StaticImageData } = socialIcons;

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between m-10">
      {session ? (
        //👇 USER HAS BEEN VALIDATED
        <div className="flex flex-col justify-center items-center md:pt-20">
          <span className="text-5xl p-2 md:pb-14 font-bold text-center">
            Welcome back,{" "}
            <span className="text-incard-blue">{session?.user?.name}</span>
          </span>

          <div className="flex flex-col sm:flex-row gap-10 justify-around max-w-screen-lg">
            {/* TEXT LEFT - SSR */}
            <div className="flex flex-col text-center gap-3 translate-y-9">
              <Link href="/a-server-page-example">
                <h1 className="text-2xl font-bold text-incard-blue text-end hover:underline">
                  Server Side Rendering
                </h1>
              </Link>
              <div className="text-end">
                <span>
                  Simple SSR page example that uses Next-Auth to manage session.
                  THis is jsut filler text I will update it later and explain
                  some more details etc etc. I need to go to the shops now
                </span>
              </div>
              <Link className="text-start" href="/a-server-page-example">
                <Button text="Link to SSR" />
              </Link>
            </div>

            <Image
              className="hidden sm:block"
              src={HomeAuthenticated}
              height={400}
              width={150}
              alt="HomeAuthenticated"
            />

            {/* TEXT RIGHT - CSR */}
            <div className="flex flex-col text-center gap-3 translate-y-9">
              <Link href="/a-server-page-example">
                <h1 className="text-2xl font-bold text-incard-blue text-start hover:underline">
                  Client Side Rendering
                </h1>
              </Link>
              <div className="text-start">
                <span>
                  Simple SSR page example that uses Next-Auth to manage session.
                  THis is jsut filler text I will update it later and explain
                  some more details etc etc. I need to go to the shops now
                </span>
              </div>
              <Link className="text-end" href="/a-client-page-example">
                <Button text="Link to CSR" />
              </Link>
            </div>
          </div>
          {/* LINKS TO PAGES */}
          <div className="p-5 pt-10 w-full flex flex-col sm:flex-row justify-center items-center gap-6 lg:justify-evenly"></div>
        </div>
      ) : (
        //👇 USER HAS NOT BEEN VALIDATED
        <div className="flex flex-col justify-center gap-3 sm:gap-10 items-center text-center pt-20">
          {/* FILLER TEXT */}
          <h1 className="text-center pb-2 font-bold text-2xl sm:text-2xl lg:text-5xl">
            <span className="text-incard-blue">Grow your online </span>
            business with incard.
          </h1>
          <span className="text-sm sm:text-base  sm:mx-14">
            Faster payments. Higher limits. 24/7 support. Welcome to the worlds
            first payment solution designed exclusively for e-commerce,
            marketers and creators.
          </span>
          {/* SIGN IN BUTTON */}
          <Link href={"/auth/signIn"} className="w-full pt-5 sm:pt-1">
            <div className=" py-1 rounded-full justify-center items-center font-semibold text-black text-sm sm:text-base md:text-xl">
              <span className="bg-incard-blue py-3 rounded-full px-6 hover:underline">
                Access Now
              </span>
            </div>
          </Link>
          {/* IMAGE */}
          <Image
            className="w-full -z-10 md:-translate-y-20"
            src={HomeUnauthenticated}
            width={900}
            height={300}
            alt="You shall not pass"
          />
          {/* COMPANY LOGOS */}
          <div className="flex flex-col -translate-y-20 md:-translate-y-72 justify-center items-center text-center gap-2 md:gap-10">
            <span>We work across all major ecom platforms</span>
            <div className="flex flex-col justify-center items-center md:flex-row gap-6 ">
              {Object.keys(socialIcons).map(
                (iconName: string, index: number) => (
                  <div key={index}>
                    <Image
                      src={socialIconsTyped[iconName]}
                      width={100}
                      height={200}
                      alt=""
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
