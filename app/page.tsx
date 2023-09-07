import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

import HomeAuthenticatedPage from "./components/home_authenticated";
import HomeUnauthenticatedPage from "./components/home_unauthenticated";

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between m-10">
      {session ? (
        //👇 USER HAS BEEN VALIDATED
        <HomeAuthenticatedPage name={session?.user?.name} />
      ) : (
        //👇 USER HAS NOT BEEN VALIDATED
        <HomeUnauthenticatedPage />
      )}
    </main>
  );
}
