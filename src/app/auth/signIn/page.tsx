"use client";

import * as z from "zod";
import clsx from "clsx";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

import AuthBackdrop from "@/src/components/AuthBackdrop"; 
import AuthInstructions from "@/src/components/AuthInstructions";

const SignUpSchema = z.object({
  username: z
    .string()
    .nonempty({ message: "⚠ Username cannot be empty" })
    .min(3, { message: "⚠ Username is too short" })
    .max(8, { message: "⚠ Username is too long" }),
  password: z
    .string()
    .nonempty({ message: "⚠ Password cannot be empty" })
    .min(3, { message: "⚠ Password is too short" })
    .max(10, { message: "⚠ Password is too long" }),
});
type SignUpSchemaType = z.infer<typeof SignUpSchema>;

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  //FIXME: improve naming
  const [error, setError] = useState("");

  //FIXME: improve naming
  const [isShown, setIsSHown] = useState(false);

  //FIXME: improve naming
  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };

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

  //FIXME: long function, improve error handeling
  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    try {
      const result = await signIn("credentials", {
        username: data.username.trim(),
        password: data.password.trim(),
        redirect: false,
        callbackUrl,
      });
      if (!result?.error) {
        const callbackLink = result?.url!;
        router.push(callbackLink);
        toast.success("Successfully signed in");
      } else {
        setError(
          "⚠ Login failed. Please check your credentials and try again."
        );
        toast.error(
          "Login failed, please check your credentials and try again."
        );
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  //FIXME: improve semantic tags,
  return (
    <div className="flex flex-row h-screen gap-1">
      <AuthBackdrop />

      <div className="absolute items-center h-[113vh] w-full sm:w-3/5 lg:max-w-screen-xl px-8 sm:px-10 py-3 bg-gray-900 flex flex-col gap-3 sm:gap-7 -translate-y-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form flex flex-col pt-10 sm:px-14 text-white"
        >
          <div className="flex flex-col pb-2 pt-16 lg:pt-32 xl:pt-40">
            <span className=" font-bold tracking-widest text-2xl sm:text-3xl py-1 mb-0 sm:mb-2 ">
              Hello !
            </span>
            <span className="text-zinc-300 mb-1">
              {" "}
              Log in to your incard account.
            </span>
          </div>

          {/* USERNAME INPUT */}
          <div className="flex flex-col sm:pb-2" onClick={() => setError("")}>
            <h3 className=" font-extralight pb-4">Username</h3>
            <input
              role="username-input"
              placeholder=""
              className={clsx(
                "input text-white bg-gray-900 rounded-l border-2 border-gray-400 focus:outline-none focus:border-incard-blue p-2",
                errors.username || error ? "border-red-900" : "border-gray-400"
              )}
              {...register("username")}
            />
            {errors.username && (
              <span className="absolute translate-y-20 sm:translate-y-18 text-red-700 text-sm pt-2">
                {errors.username.message}
              </span>
            )}
          </div>

          {/* PASSWORD INPUT*/}
          <div className="flex flex-col mt-6 pb-3" onClick={() => setError("")}>
            <h3 className=" font-extralight pb-1">Password</h3>
            <div className="flex flex-col">
              <input
                role="password-input"
                type={isShown ? "text" : "password"}
                placeholder=""
                className={clsx(
                  "input text-white bg-gray-900 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-incard-blue p-2",
                  errors.password || error
                    ? "border-red-900"
                    : "border-gray-400"
                )}
                {...register("password")}
              />
              <div
                className="relative -translate-y-1.5 -translate-x-2 flex items-end justify-end cursor-pointer h-0"
                onClick={togglePassword}
              >
                {isShown ? <Eye size={28} /> : <EyeOff size={28} />}
              </div>
            </div>
            {errors.password && (
              <span className="absolute translate-y-16 sm:translate-y-18 text-red-700 text-sm pt-2">
                {errors.password.message}
              </span>
            )}
          </div>

          <span className="text-red-600 text-sm sm:text-base max-w-[350px]">
            {error}
          </span>
          <button
            type="submit"
            className=" w-40 mb-5 text-base md:text-lg tracking-wider rounded-xl p-2 mt-4 md:mt-8 px-4 bg-incard-blue font-semi-bold text-black border-2 border-incard-blue"
          >
            Log in
          </button>

          <AuthInstructions />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
