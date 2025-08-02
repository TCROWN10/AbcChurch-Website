"use client";
import { useState, useTransition, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { resetPasswordAction, ActionResult } from "@/lib/auth/auth-actions";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, [searchParams]);

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await resetPasswordAction(formData);
      setResult(result);
    });
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Invalid Reset Link</h1>
          <p className="text-gray-600 mb-6">This password reset link is invalid or has expired.</p>
          <Link 
            href="/forgot-password" 
            className="bg-[#FF602E] text-white px-6 py-2 rounded hover:opacity-90 transition"
          >
            Request New Reset Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="/About All Believers Christian Church.png"
        alt="Reset Password Background"
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
          <h2 className="text-center text-2xl font-semibold text-gray-600 mb-2">Reset Password</h2>
          <p className="text-center text-gray-500 mb-6 text-sm">
            Enter your new password below.
          </p>

          {/* Success/Error Messages */}
          {result && (
            <div className={`w-full mb-4 p-3 rounded text-sm ${
              result.success 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {result.message && <p>{result.message}</p>}
              {result.errors && (
                <ul className="list-disc list-inside space-y-1">
                  {Object.entries(result.errors).map(([field, errors]) => (
                    <li key={field}>
                      <strong>{field}:</strong> {errors.join(', ')}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {!result?.success && (
            <form action={handleSubmit} className="w-full flex flex-col gap-4">
              <input type="hidden" name="token" value={token} />
              
              <input
                type="password"
                name="password"
                placeholder="New Password"
                className="w-full px-4 py-3 rounded border border-gray-200 bg-[#FFFFFF] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                disabled={isPending}
              />
              
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                className="w-full px-4 py-3 rounded border border-gray-200 bg-[#FFFFFF] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
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
                {isPending ? 'Resetting...' : 'Reset Password'}
              </motion.button>
            </form>
          )}

          {result?.success && (
            <div className="mt-6 text-center">
              <Link 
                href="/signin" 
                className="bg-[#FF602E] text-white px-6 py-2 rounded hover:opacity-90 transition"
              >
                Sign In Now
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF602E]"></div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}