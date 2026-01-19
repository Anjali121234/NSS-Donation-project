import connectDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import Donation from "@/models/donation";


export async function POST(req:Request){
    try{
    await connectDB();
     const session= await getServerSession(authOptions);
     if(!session){
      return  NextResponse.json({message:"unauthorized"},{status:401});
     }
     const {amount}=await req.json();
     if (!amount || typeof amount !== "number" || amount <= 0) {
  return NextResponse.json({ message: "Invalid donation amount" }, { status: 400 });
}
const donation= await Donation.create({
    userId:session.user.id,
    amount,
    status:"pending",
})
 const statuses = ["success", "pending"];
    const finalStatus =
      statuses[Math.floor(Math.random() * statuses.length)];

    donation.status = finalStatus;
    donation.transactionId = "TXN_" + Date.now();
    await donation.save();

    return NextResponse.json({
      message: "Donation processed",
      donation,
    });
    

  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}