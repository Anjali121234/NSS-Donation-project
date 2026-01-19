"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
export default function RegisterPage() {
  const way = useRouter();
  const [register,setregister]=useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      setregister(true);
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Registration successful! Please login.");
      way.push("/login");   
    } catch (error) {
      console.error("register error:", error);
      alert("Something went wrong");
    }finally{
      setregister(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="bg-white w-80 p-6 rounded-lg">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input name="name" type="text" placeholder="Name" className="p-4 h-10 border text-black rounded shadow placeholder-gray-400" />
          <input name="email" type="email" placeholder="Email" className="p-4 h-10 border text-black rounded shadow placeholder-gray-400" />
          <input name="password" type="password" placeholder="Password" className="p-4 h-10 border text-black rounded shadow placeholder-gray-400" />
          <button type="submit" className={`${register?"bg-gray-400":"bg-gray-500"} text-white h-10 rounded shadow`}>
            {register? "Registering":"Register as a new user"}
            </button>
          <Link href="/login">
  <button className="bg-gray-500 text-white h-10 rounded shadow w-full">
    SignIn
  </button></Link>
        </form>
      </div>
    </div>
  );
}