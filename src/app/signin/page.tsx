"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function SignInPage() {
  const [activeTab, setActiveTab] = useState<"signin" | "create">("signin");
  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [guestEmail, setGuestEmail] = useState("");

  // Reset fields when switching tabs
  const handleTab = (tab: "signin" | "create") => {
    setActiveTab(tab);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="/About All Believers Christian Church.png"
        alt="Sign In Background"
        fill
        className="object-cover w-full h-full z-0"
        priority
      />
      {/* Overlay for content readability (optional, can adjust opacity/color) */}
      <div className="absolute inset-0 bg-white/70 z-10" />
      {/* Header Bar */}
      <header className="w-full bg-[#888888] h-20 flex items-center px-8 z-20 relative">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/All Believers Christian Church.png"
            alt="All Believers Christian Church Logo"
            width={48}
            height={48}
            className="rounded-full"
          />
          <span className="text-white font-bold text-lg hidden sm:block tracking-wide">
            ALL BELIEVERS<br />CHRISTIAN CHURCH
          </span>
        </Link>
      </header>
      {/* Back Button OUTSIDE Card */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-28 left-8 z-20 flex items-center justify-center w-10 h-10 bg-transparent focus:outline-none cursor-pointer"
        aria-label="Go back"
      >
        {/* Chevron Left SVG */}
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#888" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center relative z-20">
        {/* Subtle Dove Image */}
        <div className="absolute right-24 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none hidden md:block">
          <Image src="/Cloud-bird.png" alt="Dove" width={120} height={120} />
        </div>
        {/* Card */}
        <motion.div
          className="w-full max-w-md bg-[#FFFFFF] rounded shadow-md px-0 pt-8 pb-10 flex flex-col items-center relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Title */}
          <h2 className="text-center text-2xl font-semibold text-gray-600 mb-6">Site Access</h2>
          {/* Tabs */}
          <div className="flex w-full relative">
            <button
              className={`flex-1 py-3 text-lg font-medium rounded-tl-md transition-colors duration-200 cursor-pointer ${
                activeTab === "signin"
                  ? "bg-[#FF602E] text-white"
                  : "bg-[#FFF3ED] text-[#FF602E]"
              }`}
              onClick={() => handleTab("signin")}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-3 text-lg font-medium rounded-tr-md transition-colors duration-200 cursor-pointer ${
                activeTab === "create"
                  ? "bg-[#FF602E] text-white"
                  : "bg-[#FFF3ED] text-[#FF602E]"
              }`}
              onClick={() => handleTab("create")}
            >
              Create Account
            </button>
            {/* Animated underline */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-[#FF602E] rounded"
              style={{ width: "50%" }}
              animate={{ x: activeTab === "signin" ? 0 : "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
          {/* Form */}
          <form className="w-full px-8 pt-8 flex flex-col gap-4">
            <AnimatePresence mode="wait">
              {activeTab === "create" && (
                <motion.div
                  key="create"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-4"
                >
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 rounded border border-gray-200 bg-[#FFFFFF] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 rounded border border-gray-200 bg-[#FFFFFF] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded border border-gray-200 bg-[#FFFFFF] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded border border-gray-200 bg-[#FFFFFF] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <motion.button
                    type="submit"
                    className="w-full mt-4 bg-[#FF602E] text-white py-3 rounded font-semibold text-base transition hover:opacity-90 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue
                  </motion.button>
                </motion.div>
              )}
              {activeTab === "signin" && (
                <motion.div
                  key="signin"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-4"
                >
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded border border-gray-200 bg-[#FFFFFF] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded border border-gray-200 bg-[#FFFFFF] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <motion.button
                    type="submit"
                    className="w-full mt-4 bg-[#FF602E] text-white py-3 rounded font-semibold text-base transition hover:opacity-90 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign In
                  </motion.button>
                  {/* OR Separator */}
                  <motion.div
                    className="flex items-center justify-center my-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-[#FF602E] text-sm font-semibold">OR</span>
                  </motion.div>
                  {/* Guest Sign In */}
                  <motion.input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded border border-gray-200 bg-[#FFFFFF] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
                    value={guestEmail}
                    onChange={e => setGuestEmail(e.target.value)}
                    required
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  />
                  <motion.button
                    type="button"
                    className="w-full mt-2 bg-[#FF602E] text-white py-3 rounded font-semibold text-base transition hover:opacity-90 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    // onClick={handleGuestSignIn}
                  >
                    Continue As A Guest
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 