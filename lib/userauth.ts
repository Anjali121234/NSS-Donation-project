import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function requireUser(){
    const session= await getServerSession(authOptions);
    if (!session) {
      console.log("session not created");
    redirect("/login");
    
  }

  if (session.user?.role !== "user") {
console.log("session role is nto admin")
    redirect("/login"); 
  }
return session;
}