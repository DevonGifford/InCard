"use client";

import React, { useState } from "react";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const SignUpSchema = z.object({
  username: z
    .string({
      required_error: "Username cannot be empty",
      invalid_type_error: "User name cannot contain special characters"
    })
    .min(3, {message: "Username is too short"})
    .max(8, {message: "Usernmae is too long"}),
  password: z
    .string()
    .min(3, {message: "Password is too short"})
    .max(20, {message: "Password is too long"})
});
type SignUpSchemaType = z.infer<typeof SignUpSchema>;

const LoginPage = () => {
  //🤔 Inital approach was to use searchParams with callback url - but this requried reloading the page 
  //✖ const searchParams = useSearchParams();
  //✖ const signInError = searchParams.get('error') ? 'task failed successfully' : ''
  //✅ Opted to instead handle the callbacks myself - simpler for notifications
  const searhParams = useSearchParams();
  const callbackUrl = searhParams.get('callbackUrl') || '/'
  const router = useRouter();
  const [error, setError] = useState('');
  
  //✅ Handle form submission - help cut api calls
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpSchemaType>({ 
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true
  });

  
  
  //✅ Handle Submit - managing callback URL myself
  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    console.log('username entered:  ', data.username)
    console.log('password entered: ', data.password);
    
    try {
      const result = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
        callbackUrl, 
      });
      if (!result?.error){
        //🎯 hot-toast-error message - success
        console.log('success')
        router.push("/")
      } else {
        //🎯hot-toast-error message - wrong username or password
        //error message for form
        setError("task failed successfully")
      }
    } catch (err: any) {
      //🎯hot-toast-error message - something went wrong 
      console.log(err)
    }
 
}

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black gap-1">

      <div className="sm:w-2/3 max-w-2xl -translate-y-10 h-fit px-10 py-5 rounded-2xl shadow-xl shadow-gray-900 bg-red border-2 border-orange-600 bg-gray-900 flex flex-col gap-5 text-center">

        {/* HEADER */}
        <div className="flex flex-col">
          <span className="text-center font-bold tracking-widest text-xl md:text-3xl py-2 pb-5 mb-3 border-b-2 border-orange-600">Please Sign In</span >
          {/* <span className="text-red-700 text-sm">{signInError}</span>  //INITIAL APPROACH */}
          <span className="text-red-700 text-sm">{error}</span>
        </div>

        {/* FORM */}
        <form  onSubmit={handleSubmit(onSubmit)} className="form flex flex-col justify-center items-center">
          <input 
            placeholder="username" 
            className="input w-2/5 min-w-[150px] text-white bg-gray-900 border-b-2 border-white text-center" 
            {...register("username")}
          />
          {errors.username && <span className="text-red-700 text-sm pt-2">{errors.username.message}</span>}          
          <input
            placeholder="password"
            className="mt-4 md:mt-8 input w-2/5 min-w-[150px] text-white bg-gray-900 border-b-2 border-white text-center"
            {...register("password")}
          />
          {errors.password && <span className="text-red-700 text-sm pt-2">{errors.password.message}</span>}
          
          <button 
            type="submit" 
            className="text-lg tracking-wider p-2 mt-6 md:mt-8 px-4 bg-gray-700 font-semi-bold text-orange-500 border-2 border-orange-600"
          >
            Login
          </button>
        </form>

      {/* FOOTER 🎯 add links */}
      <span className="pt-5 lg:pt-7 font-light"> Back to Home Page </span>
      <div className="flex flex-col gap-2 md:flex-row justify-evenly pt-1">
        <span className="text-sm font-extralight">Forgot your password?</span>
        <span className="text-sm font-extralight">Create a new account?</span>
      </div>

      </div>
    </div>
  );
};

export default LoginPage;