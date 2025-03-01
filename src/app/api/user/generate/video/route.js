import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { callAIModel } from "@/lib/aiModels";
import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video";
import ApiUsage from "@/models/ApiUsage";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { prompt, model, duration, resolution } = await request.json();

  try {
    await connectToDatabase();

    // ✅ Check API usage limit
    const today = new Date().toISOString().split("T")[0];
    let usage = await ApiUsage.findOne({ userId: session.user.id, date: today });

    if (!usage) {
      usage = await ApiUsage.create({ userId: session.user.id });
    }

    const maxLimit = { free: 1, pro: 5, "pro-plus": Infinity };
    if (usage.textToVideoCount >= maxLimit[session.user.subscription.plan]) {
      return NextResponse.json({ error: "Daily video limit reached. Upgrade your plan." }, { status: 403 });
    }

    // ✅ Generate video using AI model
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

    return NextResponse.json({ videoUrl, videoId: videoRecord._id }, { status: 200 });
  } catch (error) {
    console.error("Error generating video:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
