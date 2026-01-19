import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import Navbar from "@/components/navbar";
export default async function Adminlayout({
  children,
}:{
  children:React.ReactNode;
}){
     const session= await requireAdmin();  
  return(
    <div>
       <Navbar role="admin" />
         

        <main>{children}</main>
       </div>
  );
}

