import Link from "next/link";
import { requireAdmin } from "@/lib/auth";

export default function Userlayout({
  children,
}:{
  children:React.ReactNode;
}){
    //  const session= await requireAdmin();  
  return(
    <div>
          <nav className="p-4 bg-white flex justify-between">
        <div className="text-xl font-bold text-gray-600">
          NSS
        </div>
        <div className="flex">
       
        <Link href="/user/dashboard" className="text-gray-600  font-semibold pr-6">
          Dashboard
        </Link>

        <Link href="/user/donations" className="text-gray-600  font-semibold">
       My Donations
        </Link>
        </div>
      </nav>

        <main>{children}</main>
       </div>
  );
}

