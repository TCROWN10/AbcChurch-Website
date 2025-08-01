"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { verifyEmailAction, ActionResult } from "@/lib/auth-actions";

function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<ActionResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      verifyEmailAction(token).then(setResult).finally(() => setIsLoading(false));
    } else {
      setResult({
        success: false,
        message: 'Invalid verification link'
      });
      setIsLoading(false);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="/About All Believers Christian Church.png"
        alt="Email Verification Background"
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
          <h2 className="text-center text-2xl font-semibold text-gray-600 mb-6">Email Verification</h2>

          {isLoading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF602E] mx-auto mb-4"></div>
              <p className="text-gray-500">Verifying your email...</p>
            </div>
          ) : (
            <>
              {/* Success/Error Messages */}
              <div className={`w-full mb-6 p-4 rounded text-center ${
                result?.success 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-red-100 text-red-700 border border-red-200'
              }`}>
                {result?.success ? (
                  <div>
                    <div className="text-4xl mb-2">✅</div>
                    <p className="font-semibold mb-2">Email Verified Successfully!</p>
                    <p className="text-sm">Your email has been verified. You can now access all features.</p>
                  </div>
                ) : (
                  <div>
                    <div className="text-4xl mb-2">❌</div>
                    <p className="font-semibold mb-2">Verification Failed</p>
                    <p className="text-sm">{result?.message || 'The verification link is invalid or has expired.'}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 w-full">
                {result?.success ? (
                  <Link 
                    href="/signin" 
                    className="w-full bg-[#FF602E] text-white py-3 rounded font-semibold text-center hover:opacity-90 transition"
                  >
                    Continue to Sign In
                  </Link>
                ) : (
                  <>
                    <Link 
                      href="/signin" 
                      className="w-full bg-[#FF602E] text-white py-3 rounded font-semibold text-center hover:opacity-90 transition"
                    >
                      Back to Sign In
                    </Link>
                    <Link 
                      href="/forgot-password" 
                      className="w-full border border-[#FF602E] text-[#FF602E] py-3 rounded font-semibold text-center hover:bg-[#FF602E] hover:text-white transition"
                    >
                      Request New Verification
                    </Link>
                  </>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF602E]"></div>
      </div>
    }>
      <VerifyEmailForm />
    </Suspense>
  );
}