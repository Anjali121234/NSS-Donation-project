"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState } from "react";

type NavbarProps = {
  role: "admin" | "user";
  name?: string;
};

export default function Navbar({ role, name }: NavbarProps) {
  const [open, setOpen] = useState(false); // dropdown open state

  // Links based on role
  const adminLinks = [
    { name: "Users", href: "/admin/users" },
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Donations", href: "/admin/donations" },
  ];

  const userLinks = [
    { name: "Dashboard", href: "/user/dashboard" },
    { name: "My Donations", href: "/user/donations" },
  ];

  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <nav className="w-full bg-white text-black shadow-md px-6 py-4 flex items-center justify-between">
      
     
      <h1 className="text-xl font-semibold">
        Hello, {name || (role === "admin" ? "Admin" : "User")}
      </h1>

      
      <div className="hidden md:flex gap-6 items-center font-bold">
        <button
          className="hover:text-blue-600 text-black"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </button>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-blue-600 transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden relative">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded border border-gray-400"
        >
          {/* Hamburger icon */}
          <div className="w-5 h-0.5 bg-black mb-1"></div>
          <div className="w-5 h-0.5 bg-black mb-1"></div>
          <div className="w-5 h-0.5 bg-black"></div>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow flex flex-col z-50">
            <button
              className="text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Logout
            </button>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)} // close menu on click
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
