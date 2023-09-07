import Link from "next/link";
import Image from "next/image";
import HomeAuthenticated from "@/public/home/home_authenticated.png";
import Button from "./button";

const HomeAuthenticatedPage = ({
  name,
}: {
  name: string | null | undefined;
}) => {
  return (
    <div className="flex flex-col justify-center items-center md:pt-20">
      <span className="text-5xl p-2 md:pb-14 font-bold text-center">
        Welcome back,{" "}
        <span className="text-incard-blue">{name ? name : "User"}</span>
      </span>

      <div className="flex flex-col sm:flex-row gap-10 justify-around max-w-screen-lg">
        {/* TEXT LEFT - SSR */}
        <div className="flex flex-col text-center gap-3 translate-y-9">
          <Link href="/a-server-page-example">
            <h1 className="text-2xl font-bold text-incard-blue text-end hover:underline">
              Server Side Rendering
            </h1>
          </Link>
          <div className="text-end">
            <span>
              Check this simple SSR page example that uses Next-Auth to access
              session data on server rendered components. This is just a simple
              showcase of how we can use the users details stored in both
              session and jwt - with the help of nextAuth
            </span>
          </div>
          <Link className="text-start" href="/a-server-page-example">
            <Button text="Link to SSR" />
          </Link>
        </div>

        <Image
          className="hidden sm:block"
          src={HomeAuthenticated}
          height={400}
          width={150}
          alt="HomeAuthenticated"
        />

        {/* TEXT RIGHT - CSR */}
        <div className="flex flex-col text-center gap-3 translate-y-9">
          <Link href="/a-server-page-example">
            <h1 className="text-2xl font-bold text-incard-blue text-start hover:underline">
              Client Side Rendering
            </h1>
          </Link>
          <div className="text-start">
            <span>
              Simple CSR page example that uses Next-Auth to manage the session
              on the client. From this page you can check how long until your
              session expires and extend the age of your current session.
            </span>
          </div>
          <Link className="text-end" href="/a-client-page-example">
            <Button text="Link to CSR" />
          </Link>
        </div>
      </div>
      {/* LINKS TO PAGES */}
      <div className="p-5 pt-10 w-full flex flex-col sm:flex-row justify-center items-center gap-6 lg:justify-evenly"></div>
    </div>
  );
};

export default HomeAuthenticatedPage;
