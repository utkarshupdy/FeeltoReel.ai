"use client";

import { CardSpotlight } from "../../components/ui/CardSpotlight";
import { motion } from "framer-motion";
import Link from "next/link";
import { AuroraBackground } from "../../components/ui/aurora-background";

export default function PricingPage() {
  const pricingPlans = [
    {
      title: "Free Plan",
      price: "$0/mo",
      benefits: [
        "✅ 1 Video per Day",
        "✅ 1 Audio per Day",
        "✅ 720p Video Resolution",
        "✅ Basic AI Models",
        "❌ No Custom Voices",
        "❌ No Priority Processing",
      ],
      buttonText: "Get Started for Free",
      link: "/register",
    },
    {
      title: "Plus Plan",
      price: "$10/mo",
      benefits: [
        "✅ 5 Videos per Day",
        "✅ 5 Audios per Day",
        "✅ 1080p HD Video Resolution",
        "✅ Access to All AI Models",
        "✅ Standard Voice Options",
        "❌ No Custom AI Training",
      ],
      buttonText: "Upgrade to Plus",
      link: "/checkout?plan=plus",
    },
    {
      title: "Pro Plus Plan",
      price: "$20/mo",
      benefits: [
        "✅ Unlimited Videos & Audios",
        "✅ 4K Ultra HD Video Quality",
        "✅ Custom AI Voice Training",
        "✅ Access to All Pro Features",
        "✅ Priority Processing",
        "✅ Exclusive AI Model Access",
      ],
      buttonText: "Go Pro Plus",
      link: "/checkout?plan=pro-plus",
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* 🌟 Centered Background Beams */}
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <AuroraBackground className="w-full h-full opacity-50" />
      </div>
    

      {/* ✨ Animated Page Title */}
      <motion.h1
        className="text-5xl font-bold text-center mb-6 tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Choose Your Plan
      </motion.h1>

      {/* 🔥 Animated Subtitle */}
      <motion.p
        className="text-lg text-gray-400 text-center max-w-xl mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Select the plan that best fits your needs and start generating stunning AI-powered videos and audio.
      </motion.p>

      {/* 💳 Pricing Cards with Spotlight Effect - Centered */}
      <div className="flex justify-center items-center w-full px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {pricingPlans.map((plan, index) => (
            <CardSpotlight key={index} className="h-auto">
              <h2 className="text-2xl font-bold text-white mb-3">{plan.title}</h2>
              <p className="text-3xl font-extrabold text-green-400">{plan.price}</p>
              <ul className="mt-4 text-gray-300 space-y-2">
                {plan.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center">
                    <span className="mr-2">{benefit.includes("✅") ? "✅" : "❌"}</span>
                    {benefit.replace("✅ ", "").replace("❌ ", "")}
                  </li>
                ))}
              </ul>
              <Link href={plan.link}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full py-2 rounded-lg bg-blue-500 text-white text-sm font-semibold tracking-wide hover:bg-blue-600 transition-all duration-300"
                >
                  {plan.buttonText}
                </motion.button>
              </Link>
            </CardSpotlight>
          ))}
        </div>
      </div>
    </div>
  );
}
