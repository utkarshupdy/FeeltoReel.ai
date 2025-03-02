// "use client";

// import { CardSpotlight } from "../../components/ui/CardSpotlight";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { AuroraBackground } from "../../components/ui/aurora-background";

// export default function PricingPage() {
//   const pricingPlans = [
//     {
//       title: "Free Plan",
//       price: "$0/mo",
//       benefits: [
//         "✅ 1 Video per Day",
//         "✅ 1 Audio per Day",
//         "✅ 720p Video Resolution",
//         "✅ Basic AI Models",
//         "❌ No Custom Voices",
//         "❌ No Priority Processing",
//       ],
//       buttonText: "Get Started for Free",
//       link: "/register",
//     },
//     {
//       title: "Plus Plan",
//       price: "$10/mo",
//       benefits: [
//         "✅ 5 Videos per Day",
//         "✅ 5 Audios per Day",
//         "✅ 1080p HD Video Resolution",
//         "✅ Access to All AI Models",
//         "✅ Standard Voice Options",
//         "❌ No Custom AI Training",
//       ],
//       buttonText: "Upgrade to Plus",
//       link: "/checkout?plan=plus",
//     },
//     {
//       title: "Pro Plus Plan",
//       price: "$20/mo",
//       benefits: [
//         "✅ Unlimited Videos & Audios",
//         "✅ 4K Ultra HD Video Quality",
//         "✅ Custom AI Voice Training",
//         "✅ Access to All Pro Features",
//         "✅ Priority Processing",
//         "✅ Exclusive AI Model Access",
//       ],
//       buttonText: "Go Pro Plus",
//       link: "/checkout?plan=pro-plus",
//     },
//   ];

//   return (
//     <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white">
//       {/* 🌟 Centered Background Beams */}
//       <div className="absolute inset-0 flex items-center justify-center -z-10">
//         <AuroraBackground className="w-full h-full opacity-50" />
//       </div>
    

//       {/* ✨ Animated Page Title */}
//       <motion.h1
//         className="text-5xl font-bold text-center mb-6 tracking-wide"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         Choose Your Plan
//       </motion.h1>

//       {/* 🔥 Animated Subtitle */}
//       <motion.p
//         className="text-lg text-gray-400 text-center max-w-xl mb-10"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5, duration: 1 }}
//       >
//         Select the plan that best fits your needs and start generating stunning AI-powered videos and audio.
//       </motion.p>

//       {/* 💳 Pricing Cards with Spotlight Effect - Centered */}
//       <div className="flex justify-center items-center w-full px-6 md:px-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
//           {pricingPlans.map((plan, index) => (
//             <CardSpotlight key={index} className="h-auto">
//               <h2 className="text-2xl font-bold text-white mb-3">{plan.title}</h2>
//               <p className="text-3xl font-extrabold text-green-400">{plan.price}</p>
//               <ul className="mt-4 text-gray-300 space-y-2">
//                 {plan.benefits.map((benefit, i) => (
//                   <li key={i} className="flex items-center">
//                     <span className="mr-2">{benefit.includes("✅") ? "✅" : "❌"}</span>
//                     {benefit.replace("✅ ", "").replace("❌ ", "")}
//                   </li>
//                 ))}
//               </ul>
//               <Link href={plan.link}>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="mt-6 w-full py-2 rounded-lg bg-blue-500 text-white text-sm font-semibold tracking-wide hover:bg-blue-600 transition-all duration-300"
//                 >
//                   {plan.buttonText}
//                 </motion.button>
//               </Link>
//             </CardSpotlight>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { CardSpotlight } from "../../components/ui/CardSpotlight";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { AuroraBackground } from "../../components/ui/aurora-background";

export default function PricingPage() {
  const router = useRouter();

  const pricingPlans = [
    {
      title: "Free Plan",
      price: 0,
      displayPrice: "$0/mo",
      plan: "free",
      benefits: [
        "✅ 1 Video per Day",
        "✅ 1 Audio per Day",
        "✅ 720p Video Resolution",
        "✅ Basic AI Models",
        "❌ No Custom Voices",
        "❌ No Priority Processing",
      ],
    },
    {
      title: "Plus Plan",
      price: 10, // 💰 Actual amount in USD
      displayPrice: "$10/mo",
      plan: "plus",
      benefits: [
        "✅ 5 Videos per Day",
        "✅ 5 Audios per Day",
        "✅ 1080p HD Video Resolution",
        "✅ Access to All AI Models",
        "✅ Standard Voice Options",
        "❌ No Custom AI Training",
      ],
    },
    {
      title: "Pro Plus Plan",
      price: 20, // 💰 Actual amount in USD
      displayPrice: "$20/mo",
      plan: "pro-plus",
      benefits: [
        "✅ Unlimited Videos & Audios",
        "✅ 4K Ultra HD Video Quality",
        "✅ Custom AI Voice Training",
        "✅ Access to All Pro Features",
        "✅ Priority Processing",
        "✅ Exclusive AI Model Access",
      ],
    },
  ];

  // Function to create Razorpay Order
  const handlePurchase = async (plan, price) => {
    try {
      const response = await fetch("/api/user/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, amount: price }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Payment failed");
  
      console.log("🟢 Order Created:", data);
  
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Ensure this is set in env
        amount: data.amount,
        currency: data.currency,
        name: "AI Video Generator",
        description: `Subscription for ${plan} Plan`,
        order_id: data.orderId,
        handler: async (response) => {
          console.log("✅ Payment Successful:", response);
          
          const verifyRes = await fetch("/api/user/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
  
          const verifyData = await verifyRes.json();
          if (!verifyRes.ok) throw new Error(verifyData.error || "Verification failed");
  
          alert("Payment successful! Your subscription is now active.");
          router.push("/");
        },
        prefill: {
          email: "user@example.com", // Fetch from session
          contact: "9999999999", // Optional
        },
        theme: { color: "#3399cc" },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("❌ Payment error:", error);
      alert("Payment failed, please try again.");
    }
  };
  
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <AuroraBackground className="w-full h-full opacity-50" />
      </div>

      <motion.h1
        className="text-5xl font-bold text-center mb-6 tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Choose Your Plan
      </motion.h1>

      <motion.p
        className="text-lg text-gray-400 text-center max-w-xl mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Select the plan that best fits your needs and start generating stunning AI-powered videos and audio.
      </motion.p>

      <div className="flex justify-center items-center w-full px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {pricingPlans.map((plan, index) => (
            <CardSpotlight key={index} className="h-auto">
              <h2 className="text-2xl font-bold text-white mb-3">{plan.title}</h2>
              <p className="text-3xl font-extrabold text-green-400">{plan.displayPrice}</p>
              <ul className="mt-4 text-gray-300 space-y-2">
                {plan.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center">
                    <span className="mr-2">{benefit.includes("✅") ? "✅" : "❌"}</span>
                    {benefit.replace("✅ ", "").replace("❌ ", "")}
                  </li>
                ))}
              </ul>
              <motion.button
                onClick={() => handlePurchase(plan.plan, plan.price)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-full py-2 rounded-lg bg-blue-500 text-white text-sm font-semibold tracking-wide hover:bg-blue-600 transition-all duration-300"
              >
                {plan.title === "Free Plan" ? "Get Started for Free" : "Upgrade Now"}
              </motion.button>
            </CardSpotlight>
          ))}
        </div>
      </div>
    </div>
  );
}
