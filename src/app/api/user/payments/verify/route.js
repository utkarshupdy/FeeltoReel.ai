import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Payment from "@/models/Payment";
import User from "@/models/User";

export async function POST(req) {
  try {
    const body = await req.json();
    await connectToDatabase();

    console.log("🔹 Received Razorpay Webhook:", body);

    if (body.event === "payment.captured") {
      const payment = body.payload.payment.entity;

      // ✅ Find the payment in DB & mark as completed
      const paymentRecord = await Payment.findOneAndUpdate(
        { razorpayOrderId: payment.order_id },
        { razorpayPaymentId: payment.id, status: "completed" }
      );

      if (!paymentRecord) {
        return NextResponse.json({ error: "Payment record not found" }, { status: 404 });
      }

      // ✅ Update user subscription plan
      await User.findByIdAndUpdate(paymentRecord.userId, {
        "subscription.plan": paymentRecord.plan,
        "subscription.expiresAt": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
      });

      console.log(`✅ Subscription updated for user ${paymentRecord.userId} to plan ${paymentRecord.plan}`);

      return NextResponse.json({ success: true, message: "Payment verified & subscription updated" });
    }

    return NextResponse.json({ success: false, message: "Unhandled event type" });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
  }
}
