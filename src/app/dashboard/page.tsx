"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";
import { ExpiredSessionToast, TimeTilExpirationToast } from "@/src/lib/customToasts";
import Image from "next/image";
import Button from "../../components/ui/button";
import dashboardImage from "@/public/incard-images/dashboard_vertical_card.png";

type SessionExpires = string | undefined;

export default function DashboardPage() {
  const { data: session, update } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/signIn");
    },
  });

  async function refreshSessionExpiration() {
    if (new Date(session!.expires) > new Date()) {
      try {
        await update({ ...session, user: { ...session?.user } });
        toast.success("Session expiration updated");
      } catch (error) {
        toast.error("Failed to update session expiration");
      }
    } else {
      toast.custom(<ExpiredSessionToast />);
    }
  }

  function calculateTimeRemaining(session_expiration: string) {
    const expirationTime = new Date(session_expiration);
    const currentTime = new Date();
    return expirationTime.getTime() - currentTime.getTime();
  }

  function displaySessionExpiration(session: { expires: SessionExpires } | null) {
    try {
      const session_expiration: SessionExpires = session?.expires;
      if (session_expiration) {
        const timeTilExpiration = calculateTimeRemaining(session_expiration);
        toast.custom(
          timeTilExpiration > 0 
            ? <TimeTilExpirationToast timeRemaining={timeTilExpiration} />
            : <ExpiredSessionToast />
        );
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }


  return (
    <section className="flex flex-col items-center justify-between p-5 pt-20 md:pt-40 mx-10">
      <div className="flex flex-col md:flex-row gap-10 justify-evenly max-w-screen-lg">
        <section className="max-w-[400px] min-w-[275px] flex flex-col text-center gap-3 md:gap-6 xl:gap-10 translate-y-10">
          <h1 className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-bold text-incard-blue text-center">
            Time until expiration
          </h1>
          <p className="sm:text-center text-sm sm:text-base 2xl:text-lg">
            Receive a <strong>Toast notif</strong> displaying the{" "}
            <strong>remaining session time</strong> before your will be prompted
            to sign in again.
          </p>
          <Button text="Log Session" onClick={() => displaySessionExpiration(session)} />
        </section>
        <Image
          src={dashboardImage}
          height={400}
          width={150}
          alt="HomeAuthenticated"
          className="hidden md:block"
        />
        <section className="max-w-[400px] min-w-[275px] flex flex-col text-center gap-3 md:gap-6 xl:gap-10 translate-y-10">
          <h1 className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-bold text-incard-blue text-center">
            Update session expiration
          </h1>
          <p className="text-center text-sm sm:text-base 2xl:text-lg">
            Receive a <strong>Toast notif</strong> and update your session. You
            will remain authenticated for an additional{" "}
            <strong> three minutes</strong>.
          </p>
          <Button text="Update Session" onClick={refreshSessionExpiration} />
        </section>
      </div>
    </section>
  );
}
