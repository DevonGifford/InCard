"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Button from "../../components/ui/button";

import dashboardImage from "@/public/incard-images/dashboard_vertical_card.png";

type SessionExpires = string | undefined;

export default function ClientPage() {
  // FIXME: mysterious name 
  const { data: session, update } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });

  // FIXME: mystery smell
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

  // FIXME: long function, shotgun surgery
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
        toast((t) => (
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
        ));
      } else {
        toast.error("Session expiration time not available");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  // FIXME: Remove dead code, improve semantic tags, content cleanup
  return (
    <section className="flex flex-col items-center justify-between p-5 pt-20 md:pt-40 mx-10">
      <div className="flex flex-col md:flex-row gap-10 justify-evenly max-w-screen-lg">
        {/* LOG SESSION */}
        <div className="max-w-[400px] min-w-[275px] flex flex-col text-center gap-3 md:gap-6 xl:gap-10 translate-y-10">
          <h1 className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-bold text-incard-blue sm:text-end">
            Time until expiration
          </h1>
          <div className="sm:text-end text-sm sm:text-base 2xl:text-lg">
            <span>
              Display a <strong>Toast Notification</strong> that will tell you
              the time remaining before your
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
          height={400}
          src={dashboardImage}
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
              <strong>Update your current session</strong>, your JWT will be
              reset. You will be{" "}
              <strong>authenticated for another 5 minutes</strong>.
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
