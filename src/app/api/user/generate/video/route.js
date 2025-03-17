import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
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

    // Ensure user has a subscription plan
    if (!session.user.subscription) {
      session.user.subscription = { plan: "free", expiresAt: null };
    }

    console.log("📌 Received Video Generation Request:", { model, prompt, duration, resolution });

    // Check API usage limit
    const today = new Date().toISOString().split("T")[0];
    let usage = await ApiUsage.findOne({ userId: session.user.id, date: today });

    if (!usage) {
      usage = await ApiUsage.create({ userId: session.user.id });
    }

    const maxLimit = { free: 1, pro: 5, "pro-plus": Infinity };
    const userPlan = session.user.subscription.plan || "free";

    // if (usage.textToVideoCount >= maxLimit[userPlan]) {
    //   return NextResponse.json({ error: "Daily video limit reached. Upgrade your plan." }, { status: 403 });
    // }

    // Array of video URLs
    const videoUrls = [
      "https://videos.pexels.com/video-files/4549682/4549682-sd_640_360_30fps.mp4",
      "https://videos.pexels.com/video-files/4828605/4828605-sd_960_506_25fps.mp4",
      "https://videos.pexels.com/video-files/3626151/3626151-sd_506_960_25fps.mp4",
      "https://videos.pexels.com/video-files/3627092/3627092-sd_506_960_25fps.mp4",
      "https://videos.pexels.com/video-files/4114358/4114358-sd_640_360_25fps.mp4",
      "https://videos.pexels.com/video-files/5082031/5082031-sd_960_506_25fps.mp4",
      "https://videos.pexels.com/video-files/4888376/4888376-sd_640_360_24fps.mp4",
      "https://videos.pexels.com/video-files/5083562/5083562-sd_960_506_25fps.mp4",
      "https://videos.pexels.com/video-files/4110897/4110897-sd_640_360_25fps.mp4",
      "https://videos.pexels.com/video-files/5083554/5083554-sd_960_506_25fps.mp4",
      "https://videos.pexels.com/video-files/5082599/5082599-sd_506_960_25fps.mp4",
      "https://videos.pexels.com/video-files/5083552/5083552-sd_506_960_25fps.mp4",
      "https://videos.pexels.com/video-files/6994619/6994619-sd_640_360_30fps.mp4",
      "https://videos.pexels.com/video-files/5585952/5585952-sd_640_360_25fps.mp4",
    ];

    // Select a random video URL
    const randomIndex = Math.floor(Math.random() * videoUrls.length);
    const videoUrl = videoUrls[randomIndex];

    // Store the generated video in the database
    const videoRecord = await Video.create({
      userId: session.user.id,
      modelUsed: model,
      prompt,
      videoUrl,
      duration,
      resolution,
    });

    // Update API usage count
    usage.textToVideoCount += 1;
    await usage.save();

    console.log("✅ Video Successfully Generated:", videoUrl);
    return NextResponse.json({ videoUrl, videoId: videoRecord._id }, { status: 200 });
  } catch (error) {
    console.error("❌ Error generating video:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
