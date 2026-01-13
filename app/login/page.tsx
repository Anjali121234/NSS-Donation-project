"use client";
import UserNavbar from "@/components/usernavbar";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;

    try {
      const a = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/user/dashboard",
      });

      if (a?.ok) {
        window.location.href = "/user/dashboard";
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <UserNavbar />
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="bg-white w-80 p-6 rounded-lg">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <input
              name="email"
              className="p-4 h-10 border rounded shadow placeholder-gray-400"
              type="email"
              placeholder="Email"
            />
            <input
              name="password"
              className="p-4 h-10 border rounded shadow placeholder-gray-400"
              type="password"
              placeholder="Password"
            />
            <button
              type="submit"
              className="bg-gray-500 text-white h-10 rounded shadow"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}