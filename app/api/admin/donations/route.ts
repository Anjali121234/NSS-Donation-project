import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Donation from "@/models/donation";

export async function GET() {
  await connectDB();

  const donations = await Donation.find()
    .populate("userId", "name email")
    .sort({ createdAt: -1 });

  return NextResponse.json(donations);
}
