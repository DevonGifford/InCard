"use client";

import React, { useState } from "react";
import Link from "next/link";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

import FormBackground from "@/public/home/form_background.webp";
import Image from "next/image";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

const SignUpSchema = z.object({
  username: z
    .string({
      required_error: "Username cannot be empty",
      invalid_type_error: "User name cannot contain special characters",
    })
    .min(3, { message: "Username is too short" })
    .max(8, { message: "Usernmae is too long" }),
  password: z
    .string()
    .min(3, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
});
type SignUpSchemaType = z.infer<typeof SignUpSchema>;











const LoginPage = () => {
  //🤔 Inital approach was to use searchParams with callback url - but this requried reloading the page
  //✖ const searchParams = useSearchParams();
  //✖ const signInError = searchParams.get('error') ? 'task failed successfully' : ''
  //✅ Opted to instead handle the callbacks myself - simpler to manage notifications
  const searhParams = useSearchParams();
  const callbackUrl = searhParams.get("callbackUrl") || "/";
  const router = useRouter();
  const [error, setError] = useState("");

  // This variable determines whether password is shown or not
  const [isShown, setIsSHown] = useState(false);

  // This function is called when the checkbox is checked or unchecked
  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };
  

  //✅ Handle form submission - helping cut wasted api calls
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  //✅ Handle Submit - managing the callback URL
  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    //✖ console.log('onSubmit fired 🔥')
    //✖ console.log('username entered:  ', data.username);
    //✖ console.log('password entered: ', data.password);
    try {
      const result = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
        callbackUrl,
      });

      if (!result?.error) {
        // 🍞 notifications
        //✖ console.log('successfully signed in');
        toast.success("Successfully signed in");
        router.push("/");
      } else {
        // 🍞 notifications
        //✖ console.log("failed to login with given credentials");
        setError("task failed successfully");
        toast.error("No user with these credentials");
      }
    } catch (err: any) {
      // 🍞 notifications
      //✖ console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-row h-screen gap-1">
      {/* IMAGE */}
      <div className="w-4/5 max-w-screen-xl"></div>
      <div className="relative overflow-hidden items-center mb-14 w-full h-[113vh] bg-right -translate-y-20">
        <Image
          className=" overflow-hidden"
          src={FormBackground}
          objectFit="cover"
          layout="fill"
          alt="login-image"
          priority={true}
          quality={100}
        />
      </div>

      {/* FORM */}
      <div className="absolute h-[113vh] w-full sm:w-3/5 lg:max-w-screen-xl px-20 pr-20 py-3 border-2 border-incard-blue bg-gray-900 flex flex-col gap-7 -translate-y-20">
        {/* HEADER */}
        <div className="flex flex-col pb-2 pt-24 lg:pt-40 xl:pt-52">
          <span className=" font-bold tracking-widest text-xl md:text-3xl py-2 pb-3 mb-3 border-b-2 border-incard-blue">
            Hello !
          </span>
          <span className="text-zinc-300"> Log in to your incard account.</span>
          {/* <span className="text-red-700 text-sm">{signInError}</span>  //INITIAL APPROACH */}
          <span className="text-red-700 text-sm translate-y-8">{error}</span>
        </div>

        {/* INPUT'S */}
        <form onSubmit={handleSubmit(onSubmit)} className="form flex flex-col ">
          <input
            placeholder="username"
            className="input w-3/5 max-w-[300px] min-w-[150px] text-white bg-gray-900 border-b-2 border-white"
            {...register("username")}
          />
          {errors.username && (
            <span className="text-red-700 text-sm pt-2">
              {errors.username.message}
            </span>
          )}
          <div className="flex flex-row">
            <input
              type={isShown ? "text" : "password"}
              placeholder="password"
              className="mt-6 md:mt-10 input w-3/5 max-w-[300px] min-w-[150px] text-white bg-gray-900 border-b-2 border-white"
              {...register("password")}
            />
            <div className=" flex items-end justify-end" onClick={togglePassword}>
              {isShown? (
                <AiOutlineEye size={28} />
                ):(
                <AiOutlineEyeInvisible size={28} />
              )}
            </div>

          </div>
          {errors.password && (
            <span className="text-red-700 text-sm pt-2">
              {errors.password.message}
            </span>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            // onClick={handleSubmit(onSubmit)}
            className="w-28 text-base md:text-lg tracking-wider rounded-full p-2 mt-6 md:mt-8 px-4 bg-incard-blue font-semi-bold text-black border-2 border-incard-blue"
          >
            Log in
          </button>
        </form>

        {/* FOOTER */}
        <span className="pt-5 lg:pt-5 text-incard-blue font-semibold">
          <Link href="/"> Back to Home Page </Link>
        </span>
        <div className="flex flex-col gap-2 justify-evenly pt-1">
          <span className="text-base text-zinc-300">
            Dont have an account?{" "}
            <Link href="/an-extra-page-example">
              <span className="text-base font-bold hover:font-heavy text-incard-blue">
                <br />
                Sign up
              </span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;