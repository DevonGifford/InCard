import { AlertTriangle, Copy } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const AuthInstructions = () => {
  function copyText() {
    navigator.clipboard
      .writeText("incard")
      .then(() => {
        toast("Copied to clipboard", { icon: "📝" });
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
      });
  }
  return (
    <div className="flex flex-col gap-4 sm:gap-7 items-start">
      <span className="pt-1 lg:pt-3 text-incard-blue font-semibold">
        <Link href="/"> Back to Home Page </Link>
      </span>

      <div className="flex flex-col gap-2 justify-evenly">
        <p className="text-base text-zinc-300">
          Dont have an account?{" "}
          <span className="text-base font-bold hover:font-heavy text-incard-blue">
            See below
          </span>
        </p>
      </div>

      {/* COPY BUTTON */}
      <div className="flex flex-col gap-2 sm:gap-3 max-w-[400px] bg-gray-800 rounded-lg p-5 text-xs md:text-sm lg:text-base">
        <span className="flex flex-row gap-2 font-semibold items-center">
          <AlertTriangle />
          Note this is a Technical Assessment
        </span>
        <span>
          For successful authentication, you can use the following for both the{" "}
          <strong>username & password</strong>.
        </span>
        <div
          className="w-3/5 max-w-[900px] min-w-[130px] bg-gray-700 hover:bg-gray-600 hover:cursor-pointer border-2 border-gray-400 py-2 rounded-lg mt-2"
          onClick={copyText}
        >
          <div className="flex flex-row justify-between mx-4 font-semibold text-base">
            incard
            <Copy />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthInstructions;
