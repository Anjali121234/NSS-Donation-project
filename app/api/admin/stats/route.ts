import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import User from "@/models/User";
import Donation from "@/models/donation";
export async function GET(){
    await connectDB();
     
    const totalUsers=await User.countDocuments({role:"user"});
    const successDonations=await Donation.countDocuments({
        status:"success"
    });
     const pendingDonations = await Donation.countDocuments({
    status: "pending",
  });
  const failedDonations = await Donation.countDocuments({
    status: "failed",
  });
  const totalAmountResult = await Donation.aggregate([
    { $match: { status: "success" } },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
      },
    },
  ]);
    const totalPendingAmountResult = await Donation.aggregate([
    { $match: { status: "pending" } },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
      },
    },
  ]);
 const totalPendingAmount =
    totalPendingAmountResult.length > 0 ? totalPendingAmountResult[0].totalAmount : 0;
  const totalAmount =
    totalAmountResult.length > 0 ? totalAmountResult[0].totalAmount : 0;
  return NextResponse.json({
    totalUsers,
    successDonations,
    pendingDonations,
    failedDonations,
    totalAmount,
    totalPendingAmount,
  });
}