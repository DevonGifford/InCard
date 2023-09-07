"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";
import UserCard from "@/app/components/usercard";
import Button from "../../components/button";

type SessionExpires = string | undefined;

export default function ClientPage() {
  // ✅ Checking & Retrieving current Session, else redirect to sign-in
  const { data: session, update } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });

  // ✅ Reset maxAge of session-token
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
        const timeRemainingMs = expirationTime.getTime() - currentTime.getTime();
        const minutesRemaining = Math.floor(timeRemainingMs / (1000 * 60)); //- Format time, minutes and seconds
        const secondsRemaining = Math.floor((timeRemainingMs % (1000 * 60)) / 1000);
        toast((t) => (  //- Display the time in toast notif
            <div className="flex">
              <span>
                You have{" "}
                <b>
                  {minutesRemaining} minutes and {secondsRemaining} seconds
                </b>{" "}
                remaining
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
    <section className="flex flex-col items-center justify-between p-5">
      <UserCard user={session?.user} pagetype={"Client"} />
      <div className="w-1/2 sm:w-1/4 flex flex-col gap-3 justify-evenly pt-10">
        <Button text="Log Session" onClick={() => logExpiration(session)} />
        <Button text="Update Session" onClick={updateSession} />
      </div>
    </section>
  );
}
