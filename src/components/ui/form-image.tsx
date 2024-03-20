import Image from "next/image";
import FormBackground from "@/public/home/form_background.webp";

const FormImage = () => {
  return (
    <>
      <div className="w-4/5 max-w-screen-xl"></div>
      <div className="relative overflow-hidden items-center mb-8 sm:mb-14 w-full h-[113vh] bg-right -translate-y-20">
        <Image
          className=" overflow-hidden"
          src={FormBackground}
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

export default FormImage;
