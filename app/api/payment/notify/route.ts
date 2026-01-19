import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import Donation from "@/models/donation";

export async function POST(req: Request) {
  try {
    await connectDB();

    
    const data = await req.formData();

    const orderId = data.get("order_id") as string;
    const paymentId = data.get("payhere_payment_id") as string;
    const statusCode = data.get("status_code") as string;

    if (!orderId) {
      return NextResponse.json(
        { message: "Missing order_id" },
        { status: 400 }
      );
    }

    const finalStatus = statusCode === "2" ? "success" : "failed";

    await Donation.findByIdAndUpdate(orderId, {
      status: finalStatus,
      transactionId: paymentId,
    });

    return NextResponse.json({ message: "Payment status updated" });
  } catch (err) {
    console.error("PayHere notify error:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
