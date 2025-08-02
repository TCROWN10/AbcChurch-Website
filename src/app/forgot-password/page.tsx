"use client";
import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { requestPasswordResetAction, ActionResult } from "@/lib/auth/auth-actions";

export default function ForgotPasswordPage() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);
  const [email, setEmail] = useState("");

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await requestPasswordResetAction(formData);
      setResult(result);
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="/About All Believers Christian Church.png"
        alt="Forgot Password Background"
        fill
        className="object-cover w-full h-full z-0"
        priority
      />
      {/* Overlay for content readability */}
      <div className="absolute inset-0 bg-white/70 z-10" />
      
      {/* Header Bar */}
      <header className="w-full bg-[#888888] h-16 md:h-20 flex items-center px-4 md:px-8 z-20 relative">
        <Link href="/" className="flex items-center gap-2 md:gap-3">
          <Image
            src="/All Believers Christian Church.png"
            alt="All Believers Christian Church Logo"
            width={40}
            height={40}
            className="rounded-full md:w-12 md:h-12"
          />
          <span className="text-white font-bold text-sm md:text-lg hidden sm:block tracking-wide leading-tight">
            ALL BELIEVERS<br />CHRISTIAN CHURCH
          </span>
        </Link>
      </header>

      {/* Back Button */}
      <Link
        href="/signin"
        className="absolute top-20 md:top-28 left-4 md:left-8 z-50 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-transparent hover:bg-white/20 rounded-full transition-all duration-200"
        aria-label="Back to sign in"
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="text-gray-800 md:w-7 md:h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </Link>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center relative z-20 px-4 md:px-0">
        {/* Card */}
        <motion.div
          className="w-full max-w-md bg-[#FFFFFF] rounded shadow-md px-6 py-8 flex flex-col items-center relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Title */}
          <h2 className="text-center text-2xl font-semibold text-gray-600 mb-2">Forgot Password</h2>
          <p className="text-center text-gray-500 mb-6 text-sm">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          {/* Success/Error Messages */}
          {result && (
            <div className={`w-full mb-4 p-3 rounded text-sm ${
              result.success 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              <p>{result.message}</p>
            </div>
          )}

          {!result?.success && (
            <form action={handleSubmit} className="w-full flex flex-col gap-4">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded border border-gray-200 bg-[#FFFFFF] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={isPending}
              />
              
              <motion.button
                type="submit"
                className="w-full bg-[#FF602E] text-white py-3 rounded font-semibold transition hover:opacity-90 cursor-pointer disabled:opacity-50"
                whileHover={{ scale: isPending ? 1 : 1.02 }}
                whileTap={{ scale: isPending ? 1 : 0.98 }}
                disabled={isPending}
              >
                {isPending ? 'Sending...' : 'Send Reset Link'}
              </motion.button>
            </form>
          )}

          {/* Back to Sign In */}
          <div className="mt-6 text-center">
            <Link 
              href="/signin" 
              className="text-[#FF602E] hover:underline text-sm font-medium"
            >
              Back to Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}