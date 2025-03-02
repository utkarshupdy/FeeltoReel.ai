"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      {/* 🎥 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>

      {/* ⚡ Animated Background Lines */}
      <BackgroundBeams />

      {/* 🌟 Centered Content */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* 🚀 Animated App Name */}
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold tracking-wider"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          FeelToReel AI
        </motion.h1>

        {/* 📝 Rotating Quotes & Comments */}
        <motion.p
          className="mt-4 text-lg italic opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          &quot;Transform your words into stunning videos &amp; lifelike audio.&quot;
        </motion.p>

        {/* 🌟 Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/subscription">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              View Our Pricing
            </motion.button>
          </Link>

          {/* ✅ Show different buttons based on login state */}
          {session ? (
            <>
              <Link href="/subscription">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-500 px-6 py-3 rounded-full text-white hover:bg-blue-600 transition-all duration-300"
                >
                  Upgrade Your Plan
                </motion.button>
              </Link>
              <Link href="/upload">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-500 px-6 py-3 rounded-full text-white hover:bg-green-600 transition-all duration-300"
                >
                  Generate
                </motion.button>
              </Link>
            </>
          ) : (
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 px-6 py-3 rounded-full text-white hover:bg-green-600 transition-all duration-300"
              >
                Login / Sign Up to use our AI Tools
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
