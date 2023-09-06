import Link from "next/link";
import Image from "next/image";
import ExtraPageImage from '@/public/other/bonus_page.png'
import { SiGithub } from "react-icons/si";
import { BsLinkedin } from "react-icons/bs";
import { TbWorldWww } from "react-icons/tb"

export default async function ExtraPage() {
    return  (
      <div className="flex flex-col justify-center items-center gap-3 mx-5 pt-24 md:pt-36 text-center">
        <h1 className="text-4xl font-bold pb-5">Just an <span className="text-incard-blue">{" "}Extra Page</span></h1>
        <h2> This page is <em className="text-incard-blue font-bold">viewable</em> if you are <em className="text-incard-blue font-bold">authenticated or not</em></h2>
        <h4> This is a Server Side Rendered page</h4>
        <Image
          className="pt-4"
          src={ExtraPageImage}
          height={900}
          width={900}
          alt="Bonus Page Image"
        />
     
        <h1 className="text-2xl pt-10 font-bold"><span className="text-incard-blue">While you are here</span>, check out my portfolio</h1>
          <div className="flex flex-row gap-14 pt-10 justify-evenly text-center items-center pb-16">
            <Link href="https://devongifford.vercel.app/" target="_blank" className="hover:text-incard-blue/70 text-center justify-center items-center hover:-translate-y-2">
              <TbWorldWww size={35} />
            </Link>
            <Link href="https://www.linkedin.com/in/dbgifford/" target="_blank" className="hover:text-incard-blue/70 text-center justify-center items-center hover:-translate-y-2">
              <BsLinkedin size={35} />
            </Link>
            <Link href="https://github.com/DevonGifford" target="_blank" className="hover:text-incard-blue/70 text-center justify-center items-center hover:-translate-y-2">
                <SiGithub size={35} />
            </Link>
          </div>
      </div>
    )
}