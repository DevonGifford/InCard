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
  const [showPassword, setShowPassword] = useState(false);
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    try {
      const result = await signIn("credentials", {
        username: data.username.trim(),
        password: data.password.trim(),
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError("root", {
          message: "⚠ Please check your credentials and try again.",
        });
        return;
      }

      const callbackLink = result?.url!;
      router.push(callbackLink);
    } catch (err: any) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex flex-row h-screen gap-1">
      <AuthBackdrop />

      <main className="absolute flex flex-col h-[113vh] w-full sm:w-3/5 lg:max-w-screen-xl px-4 sm:px-10 items-center  gap-4 sm:gap-8 -translate-y-20 bg-gray-900">
        <header className="flex flex-col pb-2 pt-[calc(100px+8vw)] items-start w-full sm:px-[2rem] md:px-[4rem] max-w-lg ">
          <h2 className="font-bold tracking-widest text-2xl sm:text-3xl py-1 mb-0 sm:mb-2">
            Hello!
          </h2>
          <p className="text-zinc-300 mb-1"> Log in to your incard account.</p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col text-white px-[calc(4px-1vw)] md:px-[4rem] w-full max-w-lg"
        >
          <section className="flex flex-col sm:pb-2">
            <h3 className=" font-extralight pb-4">Username</h3>
            <input
              role="username-input"
              placeholder=""
              className={clsx(
                "text-white bg-gray-900 rounded-md border-2 border-gray-400 focus:outline-none focus:border-incard-blue p-2",
                errors.username ? "border-red-900" : "border-gray-400",
              )}
              {...register("username")}
              onFocus={() => clearErrors("root")}
            />
            {errors.username && (
              <span className="absolute translate-y-20 sm:translate-y-18 text-red-700 text-sm pt-2">
                {errors.username.message}
              </span>
            )}
          </section>

          <section className="flex flex-col mt-6 pb-3">
            <h3 className="font-extralight pb-1">Password</h3>
            <div className="flex flex-col">
              <input
                role="password-input"
                type={showPassword ? "text" : "password"}
                placeholder=""
                className={clsx(
                  "text-white bg-gray-900 rounded-md border-2 border-gray-400 focus:outline-none focus:border-incard-blue p-2",
                  errors.password ? "border-red-900" : "border-gray-400",
                )}
                {...register("password")}
                onFocus={() => clearErrors("root")}
              />
              <div
                className="relative -translate-y-2 -translate-x-2 flex items-end justify-end cursor-pointer h-0"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <Eye size={26} /> : <EyeOff size={26} />}
              </div>
            </div>
            {errors.password && (
              <span className="absolute translate-y-16 sm:translate-y-18 text-red-700 text-sm pt-2">
                {errors.password.message}
              </span>
            )}
          </section>

          <aside className="text-red-600 text-sm sm:text-base max-w-[350px] md:max-w-2xl">
            {errors.root?.message}
          </aside>

          <button
            type="submit"
            className="w-40 mb-5 font-medium text-base md:text-lg tracking-wider rounded-md p-2 mt-4 md:mt-8 px-4 bg-incard-blue font-semi-bold text-black border-2 border-incard-blue"
          >
            Log in
          </button>
        </form>
        <footer>
          <AuthInstructions />
        </footer>
      </main>
    </div>
  );
};

export default LoginPage;
