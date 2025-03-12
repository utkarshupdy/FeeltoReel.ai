// "use client";

// import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";
// import { Home, User, Video, Music, DollarSign, LogOut, Sparkles } from "lucide-react";
// import { motion } from "framer-motion";
// import { useState } from "react";

// export default function Header() {
//   const { data: session } = useSession();
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   return (
//     <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50 font-[Poppins]">
//       <div className="container mx-auto flex justify-between items-center p-4">
//         {/* ✅ Left Section: Logo */}
//         <Link href="/" className="text-2xl font-extrabold tracking-wide flex items-center gap-2 hover:text-green-400 transition-all">
//           🎥 FeelToReel
//         </Link>

//         {/* ✅ Right Section: Navigation & User Options */}
//         <div className="flex items-center gap-6">
//           <Link href="/" className="hover:text-green-400 flex items-center gap-1 transition-all">
//             <Home size={18} />
//             Home
//           </Link>

//           <Link href="/subscription" className="hover:text-green-400 flex items-center gap-1 transition-all">
//             <DollarSign size={18} />
//             Pricing
//           </Link>

//           {/* ✅ If user is logged in, show "Generate" button */}
//           {session && (
//             <Link href="/upload" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-md text-white font-semibold hover:scale-105 transition-all">
//               <Sparkles size={18} />
//               Generate
//             </Link>
//           )}

//           {/* ✅ If user is NOT logged in, show Sign In & Sign Up */}
//           {!session ? (
//             <>
//               <Link href="/login" className="hover:text-green-400 transition-all">
//                 Sign In
//               </Link>
//               <Link href="/register" className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 transition-all">
//                 Sign Up
//               </Link>
//             </>
//           ) : (
//             /* ✅ If logged in, show user dropdown */
//             <div className="relative">
//               <button 
//                 className="flex items-center gap-2 focus:outline-none hover:text-green-400 transition-all"
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//               >
//                 <User size={20} />
//                 <span>{session.user.name}</span>
//               </button>

//               {/* ✅ Animated Dropdown Menu */}
//               <motion.ul
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: dropdownOpen ? 1 : 0, y: dropdownOpen ? 0 : -10 }}
//                 transition={{ duration: 0.2 }}
//                 className={`absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-md overflow-hidden ${dropdownOpen ? "block" : "hidden"}`}
//               >
//                 <li>
//                   <Link href="/user" className="block px-4 py-2 hover:bg-gray-700">
//                     Profile
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/my-audio" className="block px-4 py-2 hover:bg-gray-700 flex items-center gap-2">
//                     <Music size={16} />
//                     My Audios
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/my-video" className="block px-4 py-2 hover:bg-gray-700 flex items-center gap-2">
//                     <Video size={16} />
//                     My Videos
//                   </Link>
//                 </li>
//                 <li>
//                   <button
//                     onClick={() => signOut({ callbackUrl: "/login" })}
//                     className="block px-4 py-2 text-red-400 hover:bg-gray-700 w-full text-left flex items-center gap-2"
//                   >
//                     <LogOut size={16} />
//                     Sign Out
//                   </button>
//                 </li>
//               </motion.ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }


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
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50 font-[Poppins]">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo with Neumorphic Effect */}
        <Link href="/" className="text-2xl font-extrabold tracking-wide flex items-center gap-2 hover:text-blue-400 transition-all">
          <span className="p-2 rounded-lg bg-gray-800 shadow-[3px_3px_6px_rgba(0,0,0,0.5),-2px_-2px_6px_rgba(255,255,255,0.05)]">
            🎥
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            FeelToReel
          </span>
        </Link>

        {/* Navigation & User Options */}
        <div className="flex items-center gap-4">
          {/* Navigation Links with Neumorphic Hover Effect */}
          <Link 
            href="/" 
            className="px-3 py-2 rounded-lg hover:bg-gray-800 hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5),inset_-2px_-2px_5px_rgba(255,255,255,0.05)] flex items-center gap-1 transition-all duration-300"
          >
            <Home size={18} />
            <span className="hidden sm:block">Home</span>
          </Link>
          <Link 
                href="/contact" 
                className="px-3 py-2 rounded-lg hover:bg-gray-800 hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5),inset_-2px_-2px_5px_rgba(255,255,255,0.05)] transition-all duration-300"
              >
                Contact Us
              </Link>

          <Link 
            href="/subscription" 
            className="px-3 py-2 rounded-lg hover:bg-gray-800 hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5),inset_-2px_-2px_5px_rgba(255,255,255,0.05)] flex items-center gap-1 transition-all duration-300"
          >
            <DollarSign size={18} />
            <span className="hidden sm:block">Pricing</span>
          </Link>

          {/* Generate Button for Logged In Users */}
          {session && (
            <Link 
              href="/upload" 
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-purple-400 font-semibold shadow-[3px_3px_6px_rgba(0,0,0,0.5),-2px_-2px_6px_rgba(255,255,255,0.05)] hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.5),inset_-2px_-2px_6px_rgba(255,255,255,0.05)] transition-all duration-300"
            >
              <Sparkles size={18} />
              <span>Generate</span>
            </Link>
          )}

          {/* Auth Buttons for Logged Out Users */}
          {!session ? (
            <>
              <Link 
                href="/login" 
                className="px-3 py-2 rounded-lg hover:bg-gray-800 hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5),inset_-2px_-2px_5px_rgba(255,255,255,0.05)] transition-all duration-300"
              >
                Sign In
              </Link>
              <Link 
                href="/register" 
                className="px-4 py-2 rounded-lg bg-gray-800 text-blue-400 shadow-[3px_3px_6px_rgba(0,0,0,0.5),-2px_-2px_6px_rgba(255,255,255,0.05)] hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.5),inset_-2px_-2px_6px_rgba(255,255,255,0.05)] transition-all duration-300"
              >
                Sign Up
              </Link>
            </>
          ) : (
            /* User Dropdown with Neumorphic Effect */
            <div className="relative">
              <button 
                className="flex items-center gap-2 focus:outline-none px-3 py-2 rounded-lg hover:bg-gray-800 hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5),inset_-2px_-2px_5px_rgba(255,255,255,0.05)] transition-all duration-300"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="p-1 rounded-full bg-gray-800 shadow-[2px_2px_4px_rgba(0,0,0,0.5),-1px_-1px_4px_rgba(255,255,255,0.05)]">
                  <User size={16} />
                </span>
                <span className="hidden sm:block">{session.user.name}</span>
              </button>

              {/* Animated Dropdown Menu with Neumorphic Effect */}
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: dropdownOpen ? 1 : 0, y: dropdownOpen ? 0 : -10 }}
                transition={{ duration: 0.2 }}
                className={`absolute right-0 mt-2 w-48 bg-gray-800 shadow-[5px_5px_10px_rgba(0,0,0,0.5),-3px_-3px_10px_rgba(255,255,255,0.05)] rounded-lg overflow-hidden ${dropdownOpen ? "block" : "hidden"}`}
              >
                <li>
                  <Link 
                    href="/user" 
                    className="block px-4 py-2 hover:bg-gray-700 hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.3),inset_-1px_-1px_3px_rgba(255,255,255,0.05)]"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/my-audio" 
                    className="block px-4 py-2 hover:bg-gray-700 hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.3),inset_-1px_-1px_3px_rgba(255,255,255,0.05)] flex items-center gap-2"
                  >
                    <Music size={16} />
                    My Audios
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/my-video" 
                    className="block px-4 py-2 hover:bg-gray-700 hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.3),inset_-1px_-1px_3px_rgba(255,255,255,0.05)] flex items-center gap-2"
                  >
                    <Video size={16} />
                    My Videos
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="block px-4 py-2 text-red-400 hover:bg-gray-700 hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.3),inset_-1px_-1px_3px_rgba(255,255,255,0.05)] w-full text-left flex items-center gap-2"
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