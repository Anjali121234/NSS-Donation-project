"use client"
 import Link from "next/link";
 
export default function UserNavbar() {
  return (
    <div className="text-black bg-white">
      <h1 >Hello User</h1>
    <Link href="/user/profile">My Profile</Link>
    <Link href="/user/dashboard">Dashboard</Link>
    <Link href="/user/donations">My Donations</Link>
    </div>
  );
}