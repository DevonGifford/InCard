"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";

import Button from "@/app/components/ui/button";
import HomeAuthenticated from "@/public/home/home_authenticated.png";

type SessionExpires = string | undefined;

export default function ClientPage() {
  // ✅ Checking & Retrieving current Session, else redirect to sign-in
  const { data: session, update } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });
  // ✅ Reset maxAge of session-token w/ Toast Notif
  async function updateSession() {
    try {
      await update({
        ...session,
        user: {
          ...session?.user,
        },
      });
      toast.success("Session expiration updated");
    } catch (error) {
      toast.error("This didn't work.");
    }
  }
  // ✅ Calculate time until token expiration w/ Toast Notif
  function logExpiration(session: { expires: SessionExpires } | null) {
    try {
      const expirationRaw: SessionExpires = session?.expires;
      if (expirationRaw) {
        const expirationTime = new Date(expirationRaw); //- Parse expirationRaw string into Date object
        const currentTime = new Date(); //- Calculate time remaining, in milliseconds
        const timeRemainingMs =
          expirationTime.getTime() - currentTime.getTime();
        const minutesRemaining = Math.floor(timeRemainingMs / (1000 * 60)); //- Format time, minutes and seconds
        const secondsRemaining = Math.floor(
          (timeRemainingMs % (1000 * 60)) / 1000
        );
        toast(
          (
            t //- Display the time in toast notif
          ) => (
            <div className="flex">
              <span>
                You have{" "}
                <b>
                  {minutesRemaining} minutes and {secondsRemaining} seconds
                </b>{" "}
                remaining ⌛
              </span>
              <button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
            </div>
          )
        );
      } else {
        //- Handle the case when expirationRaw is not available - should never happen
        toast.error("Session expiration time not available");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <section className="flex flex-col items-center justify-between p-5 md:pt-20 mx-10">
      {/* HEADER */}
      <h1 className="text-center text-2xl sm:text-3xl lg:text-5xl text-incard-blue">
        <span className=" text-white">Welcome to your </span>
        Dashboard, {session?.user?.name}
      </h1>
      <p className="text-sm py-3 sm:py-10 sm:text-xl text-center">
        This is{" "}
        <strong className="text-incard-blue">a Client Side Rendered</strong>{" "}
        Page
      </p>

      {/* CONTENT */}
      <div className="flex flex-col md:flex-row gap-10 justify-evenly max-w-screen-lg">
        {/* LOG SESSION */}
        <div className="max-w-[400px] min-w-[275px] flex flex-col text-center gap-3 md:gap-6 xl:gap-10 translate-y-10">
          <h1 className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-bold text-incard-blue sm:text-end">
            Time until expiration
          </h1>
          <div className="sm:text-end text-sm sm:text-base 2xl:text-lg">
            <span>
              Display a <strong>Toast Notifcation</strong> that will tell you the
              time remaining before your
              <strong> session expires</strong> and you will need to sign in
              again.
            </span>
          </div>
          <div className="text-center">
            <Button text="Log Session" onClick={() => logExpiration(session)} />
          </div>
        </div>
        <Image
          className="hidden md:block"
          src={HomeAuthenticated}
          height={400}
          width={150}
          alt="HomeAuthenticated"
        />
        {/* UPDATE SESSION */}
        <div className="max-w-[400px] min-w-[275px] flex flex-col text-center gap-3 md:gap-6 xl:gap-10 translate-y-10">
          <h1 className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-bold text-incard-blue sm:text-start">
            Update session expiration
          </h1>
          <div className="text-center sm:text-start text-sm sm:text-base 2xl:text-lg">
            <span>
              <strong>Update your current session</strong>, your JWT will be reset. You will be{" "}
              <strong>authenticted for another 5 minutes</strong>.
            </span>
          </div>
          <div className="text-center">
            <Button text="Update Session" onClick={updateSession} />
          </div>
        </div>
      </div>
    </section>
  );
}
