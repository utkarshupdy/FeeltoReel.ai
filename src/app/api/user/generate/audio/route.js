import {  NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import { callAIModel } from "../../../../../lib/aiModels";
import { connectToDatabase } from "../../../../../lib/db";
import Audio from "../../../../../models/Audio";
import ApiUsage from "../../../../../models/ApiUsage";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { prompt, model, duration, voiceType } = await request.json();

  try {
    await connectToDatabase();

    if (!session.user.subscription) {
      session.user.subscription = { plan: "free", expiresAt: null };
    }

    // ✅ Check API usage limit
    const today = new Date().toISOString().split("T")[0];
    let usage = await ApiUsage.findOne({ userId: session.user.id, date: today });

    if (!usage) {
      usage = await ApiUsage.create({ userId: session.user.id });
    }

    const maxLimit = { free: 1, pro: 5, "pro-plus": Infinity };
    if (usage.textToAudioCount >= maxLimit[session.user.subscription.plan]) {
      return NextResponse.json({ error: "Daily audio limit reached. Upgrade your plan." }, { status: 403 });
    }

    // ✅ Generate audio using AI model
    const audioUrl = await callAIModel(model, prompt, "textToAudio");

    // ✅ Store the generated audio in the database
    const audioRecord = await Audio.create({
      userId: session.user.id,
      modelUsed: model,
      prompt,
      audioUrl,
      duration,
      voiceType,
    });

    // ✅ Update API usage count
    usage.textToAudioCount += 1;
    await usage.save();

    return NextResponse.json({ audioUrl, audioId: audioRecord._id }, { status: 200 });
  } catch (error) {
    console.error("Error generating audio:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
