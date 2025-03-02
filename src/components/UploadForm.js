"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useNotification } from "./Notification";
import { apiClient } from "@/lib/apiClient";
import { BackgroundLines } from "./ui/background-lines"; // ✅ Import Background Lines
import { motion } from "framer-motion";

import Link from "next/link";

const AI_MODELS = {
  textToVideo: ["RunwayML", "Pictory", "Synthesia", "Lumen5", "DeepBrain"],
  textToAudio: ["GoogleTTS", "IBMWatson", "AmazonPolly", "PlayHT", "CoquiTTS"],
};

const MAX_LIMITS = {
  free: { duration: 10, promptLimit: 50 },
  pro: { duration: 15, promptLimit: 100 },
  "pro-plus": { duration: 20, promptLimit: 200 },
};

export default function UploadForm() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const [type, setType] = useState("textToVideo"); // Default: Video
  const [model, setModel] = useState(AI_MODELS.textToVideo[0]);
  const [duration, setDuration] = useState(10);
  const [resolution, setResolution] = useState("1080p");
  const [voiceType, setVoiceType] = useState("male");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);


  if(!session || !session.user){
    return (
        <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center">
          {/* 🔥 Animated Warning Icon */}
          <motion.div
            className="mb-6 text-red-500 text-6xl"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            🚫
          </motion.div>
    
          {/* 🔴 Animated Unauthorized Text */}
          <motion.h1
            className="text-4xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Unauthorized Access!
          </motion.h1>
    
          {/* ⚠️ Animated Subtext */}
          <motion.p
            className="text-lg text-gray-400 text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Please log in to continue and access this page.
          </motion.p>
    
          {/* ✨ Animated Login Button */}
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
            >
              Login Now
            </motion.button>
          </Link>
        </div>
      );
  }

  const userPlan = session?.user?.subscription?.plan || "free";
  const { duration: maxDuration, promptLimit } = MAX_LIMITS[userPlan];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (prompt.length > promptLimit) {
      showNotification(`Prompt exceeds ${promptLimit} characters.`, "error");
      setLoading(false);
      return;
    }

    const payload = {
      model,
      duration,
      prompt,
      ...(type === "textToVideo" ? { resolution } : { voiceType }),
    };

    const endpoint = type === "textToVideo" ? "/user/generate/video" : "/user/generate/audio";

    try {
      const response = await apiClient.fetch(endpoint, {
        method: "POST",
        body: payload,
      });

      if (response.videoUrl || response.audioUrl) {
        // Encode the URL to ensure it works in query params
        const mediaUrl = encodeURIComponent(response.videoUrl || response.audioUrl);
        router.push(`/${type === "textToVideo" ? "video" : "audio"}?url=${mediaUrl}`);
      } else {
        throw new Error("Failed to generate media.");
      }
      
    } catch (error) {
      showNotification(error.message || "Failed to generate media", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center">
      {/* ✅ Background Lines */}
      <BackgroundLines className="absolute inset-0" />

      {/* ✅ Main Content - Split into Two Sections */}
      <div className="relative w-full max-w-5xl flex bg-transparent bg-opacity-80 p-8 rounded-lg shadow-lg">
        {/* ✅ Left Side - Form */}
        <div className="w-1/2 pr-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            {type === "textToVideo" ? "Generate Video" : "Generate Audio"}
          </h2>

          {/* ✅ Type Selection */}
          <div className="flex justify-center mb-4">
            <button
              className={`px-4 py-2 rounded-l ${
                type === "textToVideo" ? "bg-green-500" : "bg-gray-700"
              }`}
              onClick={() => setType("textToVideo")}
            >
              🎥 Video
            </button>
            <button
              className={`px-4 py-2 rounded-r ${
                type === "textToAudio" ? "bg-blue-500" : "bg-gray-700"
              }`}
              onClick={() => setType("textToAudio")}
            >
              🎙️ Audio
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ✅ AI Model Selection */}
            <div>
              <label className="block font-semibold">Select AI Model</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full p-2 border rounded bg-black text-gray-200"
              >
                {AI_MODELS[type].map((aiModel) => (
                  <option key={aiModel} value={aiModel}>
                    {aiModel}
                  </option>
                ))}
              </select>
            </div>

            {/* ✅ Duration (Limited by Plan) */}
            <div>
              <label className="block font-semibold">
                Duration (Max: {maxDuration} sec)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Math.min(maxDuration, e.target.value))}
                className="w-full p-2 border rounded bg-black text-gray-200"
                max={maxDuration}
              />
            </div>

            {/* ✅ Resolution (Only for Video) */}
            {type === "textToVideo" && (
              <div>
                <label className="block font-semibold">Select Resolution</label>
                <select
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  className="w-full p-2 border rounded bg-black text-gray-200"
                >
                  <option value="720p">720p</option>
                  <option value="1080p">1080p</option>
                  <option value="4K">4K</option>
                </select>
              </div>
            )}

            {/* ✅ Voice Type (Only for Audio) */}
            {type === "textToAudio" && (
              <div>
                <label className="block font-semibold">Voice Type</label>
                <select
                  value={voiceType}
                  onChange={(e) => setVoiceType(e.target.value)}
                  className="w-full p-2 border rounded bg-black text-gray-200"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            )}

            {/* ✅ Text Prompt (Limited by Plan) */}
            <div>
              <label className="block font-semibold">
                Enter Prompt (Max: {promptLimit} chars)
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-2 border rounded bg-black text-gray-200 resize-none"
                maxLength={promptLimit}
                rows={3}
                placeholder="Describe what you want to generate..."
              ></textarea>
            </div>

            {/* ✅ Submit Button */}
            <button
              type="submit"
              className={`w-full ${
                type === "textToVideo"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white py-2 rounded flex items-center justify-center`}
              disabled={loading}
            >
              {loading ? (
                <motion.div
                  className="h-5 w-5 border-4 border-white border-t-transparent rounded-full animate-spin"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              ) : (
                `Generate ${type === "textToVideo" ? "Video" : "Audio"}`
              )}
            </button>
          </form>
        </div>
        

        {/* ✅ Right Side - Video Preview */}
        <div className="w-1/2 flex justify-center items-center">
          <div className="w-full h-full border border-gray-700 rounded-lg overflow-hidden">
            <video
              src="/upload-video.mp4"
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}











