"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import UserCard from "@/app/components/usercard";
import Button from "../../components/button";
import { toast } from "react-hot-toast";

type SessionExpires = string | undefined;

export default function ClientPage() {
  // ✅ Checking & Retrieving current Session - redirect to sign-in
  const { data: session, update } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });

  // ✅ Reset maxAge of session-token
  async function updateSession() {
    // 🎯 check session is still avail ? why? - it should sign out if session ends.  
    // 👇 TryUpdate the session 
    try {
      await update({
        ...session,
        user: {
          ...session?.user,
        },
      });
      // 🍞 notifications
      console.log("session successfully updated ✔");
      toast.success("Session expiration updated");
    } catch (error) {
      toast.error("This didn't work.");
    }
  }

  // ✅ Display time until auth-token expiration
  // function logExpiration() {
  //     try {
  //       const expirationRaw = session?.expires

  //       if (expirationRaw) {
  //         // 1. Parse the expirationRaw string into a Date object
  //         const expirationTime = new Date(expirationRaw);

  //         // 2. Calculate the time remaining in milliseconds
  //         const currentTime = new Date();
  //         const timeRemainingMs = expirationTime - currentTime;

  //         // 3. Format the time remaining into minutes and seconds
  //         const minutesRemaining = Math.floor(timeRemainingMs / (1000 * 60));
  //         const secondsRemaining = Math.floor((timeRemainingMs % (1000 * 60)) / 1000);

  //         // 4. Display the formatted time remaining
  //         console.log(`You have ${minutesRemaining} minutes and ${secondsRemaining} seconds remaining`);

  //       // 🍞 notifications
  //       console.log(expirationRaw)
  //       toast((t) => (
  //         <div className='flex '>
  //             <span>
  //                 You have <b>{expirationRaw}</b> seconds remaining
  //             </span>
  //             <button onClick={() => toast.dismiss(t.id)}>
  //                 Dismiss
  //             </button>
  //         </div>
  //       ));
  //     } catch (error) {toast.error("Something went wrong")}
  // }

  // ✅ Show time until token expiration
  function logExpiration(session: { expires: SessionExpires } | null) {
    try {
      const expirationRaw: SessionExpires = session?.expires;
      if (expirationRaw) {
        //- Parse the expirationRaw string into a Date object
        const expirationTime = new Date(expirationRaw);
        //- Calculate the time remaining in milliseconds
        const currentTime = new Date();
        const timeRemainingMs = expirationTime.getTime() - currentTime.getTime();
        //- Format the time remaining into minutes and seconds
        const minutesRemaining = Math.floor(timeRemainingMs / (1000 * 60));
        const secondsRemaining = Math.floor((timeRemainingMs % (1000 * 60)) / 1000);
        //- Display the formatted time remaining
        // 🍞 Custom Toast Notif
        // ✖ console.log(`You have ${minutesRemaining} minutes and ${secondsRemaining} seconds remaining`);
        toast((t) => (
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
        ));
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
        <Button
          text="Log Session"
          onClick={() => logExpiration(session)}
        />
        <Button text="Update Session" onClick={updateSession} />
      </div>
    </section>
  );
}
