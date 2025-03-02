"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User, Video, Music, DollarSign, LogOut, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50 font-[Poppins]">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* ✅ Left Section: Logo */}
        <Link href="/" className="text-2xl font-extrabold tracking-wide flex items-center gap-2 hover:text-green-400 transition-all">
          🎥 FeelToReel
        </Link>

        {/* ✅ Right Section: Navigation & User Options */}
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-green-400 flex items-center gap-1 transition-all">
            <Home size={18} />
            Home
          </Link>

          <Link href="/subscription" className="hover:text-green-400 flex items-center gap-1 transition-all">
            <DollarSign size={18} />
            Pricing
          </Link>

          {/* ✅ If user is logged in, show "Generate" button */}
          {session && (
            <Link href="/upload" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-md text-white font-semibold hover:scale-105 transition-all">
              <Sparkles size={18} />
              Generate
            </Link>
          )}

          {/* ✅ If user is NOT logged in, show Sign In & Sign Up */}
          {!session ? (
            <>
              <Link href="/login" className="hover:text-green-400 transition-all">
                Sign In
              </Link>
              <Link href="/register" className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 transition-all">
                Sign Up
              </Link>
            </>
          ) : (
            /* ✅ If logged in, show user dropdown */
            <div className="relative">
              <button 
                className="flex items-center gap-2 focus:outline-none hover:text-green-400 transition-all"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <User size={20} />
                <span>{session.user.name}</span>
              </button>

              {/* ✅ Animated Dropdown Menu */}
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: dropdownOpen ? 1 : 0, y: dropdownOpen ? 0 : -10 }}
                transition={{ duration: 0.2 }}
                className={`absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-md overflow-hidden ${dropdownOpen ? "block" : "hidden"}`}
              >
                <li>
                  <Link href="/user" className="block px-4 py-2 hover:bg-gray-700">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href="/my-audio" className="block px-4 py-2 hover:bg-gray-700 flex items-center gap-2">
                    <Music size={16} />
                    My Audios
                  </Link>
                </li>
                <li>
                  <Link href="/my-video" className="block px-4 py-2 hover:bg-gray-700 flex items-center gap-2">
                    <Video size={16} />
                    My Videos
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="block px-4 py-2 text-red-400 hover:bg-gray-700 w-full text-left flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </li>
              </motion.ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
