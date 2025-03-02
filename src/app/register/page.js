"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/components/Notification";
import { Vortex } from "@/components/ui/vortex";
// import Footer from "@/components/Footer";
// import Header from "@/components/Header";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { showNotification } = useNotification();

  const checkEmailExists = async (email) => {
    if (!email) return;
    try {
      const res = await fetch(`/api/auth/check-email?email=${email}`);
      const data = await res.json();
      setEmailExists(data.exists);
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      showNotification("All fields are required!", "error");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      showNotification("Passwords do not match!", "error");
      setLoading(false);
      return;
    }

    if (emailExists) {
      showNotification("Email already exists!", "error");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      showNotification("Registration successful! Redirecting...", "success");
      router.push("/login");
    } catch (error) {
      showNotification(error.message || "Failed to register", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-black text-white">
      {/* ✅ Header (Will remain fixed or scrollable above) */}
      {/* <Header /> */}

      {/* ✅ Main content (Full screen background except footer) */}
      <main className="flex-grow flex items-center justify-center relative">
        {/* ✅ Background Lines in Center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Vortex />
        </div>

        {/* ✅ Centered Form */}
        <div className="w-full max-w-md bg-transparent bg-opacity-80 p-6 rounded-lg shadow-lg z-10">
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded bg-black text-gray-300"
                required
              />
            </div>

            <div>
              <label className="block font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  checkEmailExists(e.target.value);
                }}
                className="w-full p-2 border rounded bg-black text-gray-300"
                required
              />
              {emailExists && <p className="text-red-400 text-sm mt-1">⚠️ Email already exists!</p>}
            </div>

            <div>
              <label className="block font-semibold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded bg-black text-gray-300"
                required
              />
            </div>

            <div>
              <label className="block font-semibold">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded bg-black text-gray-300"
                required
              />
              {password !== confirmPassword && (
                <p className="text-red-400 text-sm mt-1">⚠️ Passwords do not match!</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </main>

      {/* ✅ Footer (Will remain outside the main full-screen area) */}
      {/* <Footer /> */}
    </div>
  );
}
