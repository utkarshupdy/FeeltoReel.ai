"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Music, Timer, Mic, PlusCircle } from "lucide-react";
import { Vortex } from "@/components/ui/vortex";

export default function MyAudio() {
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const res = await fetch("/api/user/my-audio");
        const data = await res.json();
        if (data.success) {
          setAudios(data.audios);
        }
      } catch (error) {
        console.error("Error fetching audios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAudios();
  }, []);

  if (loading)
    return <p className="text-center text-white text-2xl">Loading audios...</p>;

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-transparent bg-opacity-90 p-10">
      
      {/* Vortex Background */}
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <Vortex />
      </div>

      {/* Page Title - Placed at the Top */}
      <h2 className="text-white text-4xl font-bold text-center mt-10 mb-8 relative z-10">
        🎵 My Audio Files
      </h2>

      {audios.length === 0 ? (
        <div className="text-center text-gray-400 relative z-10">
          <p className="text-2xl mb-4">No Audio to Display</p>
          <motion.button
            onClick={() => router.push("/upload")}
            className="px-6 py-3 bg-green-800 rounded-lg hover:bg-green-600 transition-all text-lg font-semibold flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PlusCircle size={20} />
            Generate One
          </motion.button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 w-full relative z-10">
          {audios.map((audio) => (
            <motion.div
              key={audio._id}
              className="relative bg-gray-900 bg-opacity-80 p-6 rounded-xl shadow-lg flex items-center justify-between overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Left Side - Details */}
              <div className="text-white space-y-2 w-2/3">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Music size={20} />
                  {audio.prompt}
                </h3>
                <p className="text-gray-400 flex items-center gap-2">
                  <Mic size={18} />
                  <span>{audio.voiceType.toUpperCase()} Voice</span>
                </p>
                <p className="text-gray-400 flex items-center gap-2">
                  <Timer size={18} />
                  <span>{audio.duration} sec</span>
                </p>
              </div>

              {/* Right Side - Audio Player */}
              <div className="w-1/3 flex justify-end">
                <audio controls className="w-32">
                  <source src={audio.audioUrl} type="audio/mpeg" />
                </audio>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
