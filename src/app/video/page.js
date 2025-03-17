"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Vortex } from "@/components/ui/vortex";

function VideoContent() {
  const searchParams = useSearchParams();
  const encodedUrl = searchParams.get("url"); // Get video URL from query params
  const videoUrl = encodedUrl ? decodeURIComponent(encodedUrl) : "https://videos.pexels.com/video-files/2287044/2287044-uhd_2560_1440_30fps.mp4"; // Decode URL

  if (!videoUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white relative">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black -z-10" />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }}
          className="bg-gray-900/30 backdrop-blur-xl p-8 rounded-3xl shadow-[inset_0px_0px_20px_rgba(255,255,255,0.05),_5px_5px_15px_rgba(0,0,0,0.8),_-5px_-5px_15px_rgba(255,255,255,0.03)] border border-white/5 text-center w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-red-400">Invalid video URL</h2>
          <p className="text-gray-400 mt-2">Please provide a valid URL.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative p-6">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black -z-10" />
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 -z-10" />
      {/* <Vortex className="absolute inset-0 -z-10" /> */}
      {/* Glow effect */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
      <Vortex className="absolute inset-0 -z-10" />
      {/* Main Content Card with Neuromorphic Design */}
      <motion.div 
        className="w-full max-w-4xl bg-gray-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/5 flex flex-col items-center shadow-[inset_0px_0px_30px_rgba(255,255,255,0.03),_10px_10px_30px_rgba(0,0,0,0.8),_-10px_-10px_30px_rgba(255,255,255,0.02)]"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
          🎥 AI Generated Video
        </h2>

        {/* Video Player with Neuromorphic Border */}
        <motion.div
          className="w-full rounded-2xl p-px bg-gradient-to-r from-blue-500/30 to-purple-500/30"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
        >
          <div className="rounded-2xl overflow-hidden shadow-[inset_0px_0px_20px_rgba(255,255,255,0.05),_5px_5px_15px_rgba(0,0,0,0.5)]">
            <video 
              controls 
              autoPlay
              src={videoUrl} 
              className="w-full rounded-2xl"
            />
          </div>
        </motion.div>


        <p className="text-gray-400 mt-6 text-sm">
          📅 Created At: {new Date().toLocaleString()}
        </p>

        {/* Neuromorphic Buttons */}
        <div className="mt-8 flex space-x-6">
          <Link href="/upload">
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-2xl font-semibold text-green-400 bg-gray-900 border border-gray-800 shadow-[inset_0px_0px_10px_rgba(74,222,128,0.15),_5px_5px_10px_rgba(0,0,0,0.5),_-5px_-5px_10px_rgba(255,255,255,0.02)] transition-all hover:shadow-[inset_0px_0px_15px_rgba(74,222,128,0.3),_5px_5px_15px_rgba(0,0,0,0.5)]"
            >
              🎬 Generate More
            </motion.button>
          </Link>

          <Link href="/">
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-2xl font-semibold text-blue-400 bg-gray-900 border border-gray-800 shadow-[inset_0px_0px_10px_rgba(59,130,246,0.15),_5px_5px_10px_rgba(0,0,0,0.5),_-5px_-5px_10px_rgba(255,255,255,0.02)] transition-all hover:shadow-[inset_0px_0px_15px_rgba(59,130,246,0.3),_5px_5px_15px_rgba(0,0,0,0.5)]"
            >
              🏠 Home
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function VideoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="p-4 rounded-2xl bg-gray-900/40 shadow-[inset_0px_0px_10px_rgba(255,255,255,0.05),_5px_5px_15px_rgba(0,0,0,0.5)]">
          <div className="text-blue-400 text-xl font-medium">Loading...</div>
        </div>
      </div>
    }>
      <VideoContent />
    </Suspense>
  );
}