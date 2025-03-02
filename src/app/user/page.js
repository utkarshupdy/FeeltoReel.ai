"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { LogOut, User, Video, Music, Shield, Calendar, Zap } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-3xl">Loading user data...</h1>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-3xl">{error || "Unauthorized. Please log in."}</h1>
      </div>
    );
  }

  console.log(user);

  // ✅ Provide safe defaults
  const subscription = user.subscription || { plan: "free", expiresAt: null };
  const maxVideoLength = user.maxVideoLength ?? 10;
  const maxAudioLength = user.maxAudioLength ?? 30;
  const credits = user.credits ?? 1;

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col">
      {/* 🔥 Animated Background */}
      <BackgroundBeams className="absolute inset-0 -z-10" />

      {/* ✅ Profile Content Container */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full px-10 py-10 lg:py-20 space-y-10 lg:space-y-0">
        
        {/* ✅ Left Section - Profile Image & Name */}
        <motion.div
          className="flex flex-col items-center text-center space-y-4 lg:w-1/3"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          {/* 📸 Profile Image */}
          <Image
            src="/default-avatar.jpeg"
            alt="Profile Picture"
            width={150}
            height={150}
            className="w-36 h-36 rounded-full border-4 border-green-500 shadow-lg"
          />
          <h2 className="text-3xl font-bold">{user.name}</h2>
          <p className="text-gray-400 text-lg">{user.email}</p>
        </motion.div>

        {/* ✅ Right Section - User Info */}
        <motion.div
          className="flex flex-col w-full lg:w-2/3 space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          {/* 🛠 User Details */}
          <ProfileDetail icon={<Shield size={20} />} label="Role" value={user.role || "User"} />
          <ProfileDetail icon={<Zap size={20} />} label="Credits Left" value={credits} />
          <ProfileDetail icon={<Video size={20} />} label="Max Video Length" value={`${maxVideoLength} sec`} />
          <ProfileDetail icon={<Music size={20} />} label="Max Audio Length" value={`${maxAudioLength} sec`} />
          <ProfileDetail icon={<Calendar size={20} />} label="Subscription Plan" value={subscription.plan.toUpperCase()} />
        </motion.div>
      </div>

      {/* ✅ Action Buttons */}
      <div className="flex justify-center gap-6 mt-6">
        <motion.button
          onClick={() => router.push("/upload")}
          className="px-6 py-3 bg-green-500 rounded-lg hover:bg-green-600 transition-all text-lg font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Generate AI Content
        </motion.button>

        <motion.button
          onClick={() => router.push("/pricing")}
          className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-all text-lg font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Upgrade Plan
        </motion.button>
      </div>

      {/* ❌ Logout Button */}
      <motion.button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="mt-10 mx-auto w-fit px-6 py-3 bg-red-500 rounded-lg hover:bg-red-600 flex items-center gap-2 transition-all text-lg font-semibold"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <LogOut size={20} />
        Logout
      </motion.button>

      <br/>
      <br/>
    </div>
  );
}

/* ✅ Reusable Profile Detail Row */
const ProfileDetail = ({ icon, label, value }) => (
  <motion.div
    className="flex justify-between items-center p-4 bg-gray-900 bg-opacity-60 border border-gray-700 rounded-md hover:scale-105 transition-all"
    whileHover={{ scale: 1.05 }}
  >
    <div className="flex items-center gap-3 text-gray-300">
      {icon}
      <span className="text-lg">{label}</span>
    </div>
    <span className="text-white text-lg font-semibold">{value}</span>
  </motion.div>
);
