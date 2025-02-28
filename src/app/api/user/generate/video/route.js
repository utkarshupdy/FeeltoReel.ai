import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { callAIModel } from "@/lib/aiModels";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { prompt, model } = await request.json();
  const videoUrl = await callAIModel(model, prompt, "textToVideo");

  return NextResponse.json({ videoUrl }, { status: 200 });
}
