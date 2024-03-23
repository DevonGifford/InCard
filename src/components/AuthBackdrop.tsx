import Image from "next/image";
import formBackgroundImage from "@/public/incard-images/form_background.webp";


const AuthBackground = () => {
  return (
    <>
      <div className="w-4/5 max-w-screen-xl"></div>
      <div className="relative overflow-hidden items-center mb-8 sm:mb-14 w-full h-[113vh] bg-right -translate-y-20">
        <Image
          className=" overflow-hidden"
          src={formBackgroundImage}
          
          objectFit="cover"
          layout="fill"
          alt="login-image"
          placeholder="blur"
          priority={true}
          quality={80}
        />
      </div>
    </>
  );
};

export default AuthBackground;
