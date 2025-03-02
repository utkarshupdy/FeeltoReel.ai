import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import { callAIModel } from "../../../../../lib/aiModels";
import { connectToDatabase } from "../../../../../lib/db";
import Video from "../../../../../models/Video";
import ApiUsage from "../../../../../models/ApiUsage";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { prompt, model, duration, resolution } = await request.json();

  try {
    await connectToDatabase();

    // ✅ Ensure user has a subscription plan
    if (!session.user.subscription) {
      session.user.subscription = { plan: "free", expiresAt: null };
    }

    console.log("📌 Received Video Generation Request:", { model, prompt, duration, resolution });

    // ✅ Check API usage limit
    const today = new Date().toISOString().split("T")[0];
    let usage = await ApiUsage.findOne({ userId: session.user.id, date: today });

    if (!usage) {
      usage = await ApiUsage.create({ userId: session.user.id });
    }

    const maxLimit = { free: 1, pro: 5, "pro-plus": Infinity };
    const userPlan = session.user.subscription.plan || "free";

    if (usage.textToVideoCount >= maxLimit[userPlan]) {
      return NextResponse.json({ error: "Daily video limit reached. Upgrade your plan." }, { status: 403 });
    }

    // ✅ Generate video using AI model (polling for RunwayML)
    console.log("🔄 Calling AI Model...");
    const videoUrl = await callAIModel(model, prompt, "textToVideo");

    // ✅ Store the generated video in the database
    const videoRecord = await Video.create({
      userId: session.user.id,
      modelUsed: model,
      prompt,
      videoUrl,
      duration,
      resolution,
    });

    // ✅ Update API usage count
    usage.textToVideoCount += 1;
    await usage.save();

    console.log("✅ Video Successfully Generated:", videoUrl);
    return NextResponse.json({ videoUrl, videoId: videoRecord._id }, { status: 200 });
  } catch (error) {
    console.error("❌ Error generating video:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
