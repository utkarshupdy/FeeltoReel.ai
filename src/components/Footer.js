"use client";

import Link from "next/link";
import { Home, Twitter, Instagram, Facebook } from "lucide-react";
import { useNotification } from "./Notification";

export default function Footer() {
  const { showNotification } = useNotification();

  return (
    <footer className="bg-gray-900  text-white p-6 w-full mt-auto">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* ✅ Branding */}
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold hover:text-green-400 transition-colors duration-300"
          >
            <Home className="w-5 h-5" />
            🎥 FeelToReel
          </Link>
          <p className="text-sm opacity-75 mt-2">
            AI-Powered Video & Audio Generation.
            <br />
            © {new Date().getFullYear()} FeelToReel. All rights reserved.
          </p>
        </div>

        {/* ✅ Contact Info */}
        <div>
          <span className="font-semibold">Contact</span>
          <div className="mt-2 space-y-1">
            <a
              className="block cursor-pointer hover:text-green-400 transition-colors duration-300"
              onClick={() =>
                showNotification("Email us at support@feeltoreel.com", "info")
              }
            >
              support@feeltoreel.com
            </a>
            <a
              className="block cursor-pointer hover:text-green-400 transition-colors duration-300"
              onClick={() => showNotification("Call us: +91 987-XXX-6543", "info")}
            >
              +91 987-XXX-6543
            </a>
          </div>
        </div>

        {/* ✅ Social Media */}
        <div>
          <span className="font-semibold">Follow Us</span>
          <div className="flex gap-4 mt-2">
            {[
              { name: "Twitter", icon: Twitter },
              { name: "Instagram", icon: Instagram },
              { name: "Facebook", icon: Facebook },
            ].map((platform) => (
              <a
                key={platform.name}
                className="cursor-pointer hover:text-green-400 transition-colors duration-300"
                onClick={() =>
                  showNotification(`Follow us on ${platform.name}`, "info")
                }
              >
                <platform.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
