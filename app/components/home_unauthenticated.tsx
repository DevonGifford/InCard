import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import socialIcons from "@/public/other";
import HomeUnauthenticated from "@/public/home/home_unauthenticated.png";

const socialIconsTyped: { [key: string]: StaticImageData } = socialIcons;

const HomeUnauthenticatedPage = () => {
  return (
    <div className="flex flex-col justify-center gap-3 sm:gap-10 items-center text-center pt-20">
      {/* FILLER TEXT */}
      <h1 className="text-center pb-2 font-bold text-2xl sm:text-2xl lg:text-5xl">
        <span className="text-incard-blue">Grow your online </span>
        business with incard.
      </h1>
      <span className="text-sm sm:text-base  sm:mx-14">
        Faster payments. Higher limits. 24/7 support. Welcome to the worlds
        first payment solution designed exclusively for e-commerce, marketers
        and creators.
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
          {Object.keys(socialIcons).map((iconName: string, index: number) => (
            <div key={index}>
              <Image
                src={socialIconsTyped[iconName]}
                width={100}
                height={200}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeUnauthenticatedPage;
