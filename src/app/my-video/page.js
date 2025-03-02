"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Video, Clock, Monitor, PlusCircle } from "lucide-react";
import { Vortex } from "@/components/ui/vortex";

export default function MyVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/user/my-video");
        const data = await res.json();
        if (data.success) {
          setVideos(data.videos);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading)
    return <p className="text-center text-white text-2xl">Loading videos...</p>;

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-transparent bg-opacity-90 p-10">
      
      {/* Vortex Background */}
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <Vortex />
      </div>

      {/* Page Title - Placed at the Top */}
      <h2 className="text-white text-4xl font-bold text-center mt-10 mb-8 relative z-10">
        🎥 My Video Files
      </h2>

      {videos.length === 0 ? (
        <div className="text-center text-gray-400 relative z-10">
          <p className="text-2xl mb-4">No Video to Display</p>
          <motion.button
            onClick={() => router.push("/upload")}
            className="px-6 py-3 bg-blue-800 rounded-lg hover:bg-blue-600 transition-all text-lg font-semibold flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PlusCircle size={20} />
            Generate One
          </motion.button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 w-full relative z-10">
          {videos.map((video) => (
            <motion.div
              key={video._id}
              className="relative bg-gray-900 bg-opacity-80 p-6 rounded-xl shadow-lg flex items-center justify-between overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Left Side - Details */}
              <div className="text-white space-y-2 w-2/3">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Video size={20} />
                  {video.prompt}
                </h3>
                <p className="text-gray-400 flex items-center gap-2">
                  <Monitor size={18} />
                  <span>Resolution: {video.resolution}</span>
                </p>
                <p className="text-gray-400 flex items-center gap-2">
                  <Clock size={18} />
                  <span>{video.duration} sec</span>
                </p>
              </div>

              {/* Right Side - Video Player */}
              <div className="w-1/3 flex justify-end">
                <video controls className="w-32 rounded-md">
                  <source src={video.videoUrl} type="video/mp4" />
                </video>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
