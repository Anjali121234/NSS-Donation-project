import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/db";
import { authOptions } from "../../auth/[...nextauth]/route";
import Donation from "@/models/donation";

export async function GET(){
    await connectDB();
    const session= await getServerSession(authOptions);

    if(!session){
        return NextResponse.json({message:"unauthorized"},{status:401})
    }
    const donations=await Donation.find({
        userId:session.user.id,

    }).sort({createdAt:-1});
    return NextResponse.json(donations);
}


