"use client";
import Link from "next/link";
import { signIn ,getSession} from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [logging,setlogging]=useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setlogging(true);
    const form = e.currentTarget;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;

    try {
      const a = await signIn("credentials", {
        redirect: false,
        email,
        password,
        
      });

      if (!a?.ok) {
        alert("Invalid credentials");
        return;
      }
      const session=await getSession();
      if(session?.user?.role==="admin"){
        window.location.href="/admin/dashboard";
      } else{
        window.location.href="/user/dashboard";
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong");
    }finally{setlogging(false);}
  };

  return (
    <div>
     
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="bg-white w-80 p-6 rounded-lg">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <input
              name="email"
              className="p-4 h-10 border rounded shadow text-black placeholder-gray-400"
              type="email"
              placeholder="Email"
            />
            <input
              name="password"
              className="p-4 h-10 border rounded shadow text-black placeholder-gray-400"
              type="password"
              placeholder="Password"
            />
            <button
              type="submit"
              
              className={` text-white h-10 rounded shadow ${logging? "bg-gray-400" :"bg-gray-500"}`}
            >
             {logging ? "Logging in":"Login"}
            </button>
            <Link href="/register">
            <button className="text-white h-10 rounded shadow bg-gray-500 w-full">
              Register as a new user
            </button></Link>
          </form>
        </div>
      </div>
    </div>
  );
}