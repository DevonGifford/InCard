import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import Link from "next/link";


const NavBarSession = async () => {
    const session = await getServerSession(options);
    return ( 
        <>
            { session? (
                <div className="text-2xl font-semibold transition ease-in-out duration-150 hover:scale-110 hover:-translate-y-1"><Link href="/api/auth/signout">Sign Out</Link></div>
                ):(
                <div className="text-2xl font-semibold transition ease-in-out duration-150 hover:scale-110 hover:-translate-y-1"><Link href="/api/auth/signin">Sign In</Link></div>
            )}
        </>
     );
}
 
export default NavBarSession;