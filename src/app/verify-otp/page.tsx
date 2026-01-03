"use client";
import { useState, useTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ActionResult {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [isResending, setIsResending] = useState(false);
  const [result, setResult] = useState<ActionResult | null>(null);
  
  // Get email from URL params if available (from signin redirect)
  const emailFromUrl = searchParams.get('email');
  const [email, setEmail] = useState(emailFromUrl || "");
  const [otp, setOtp] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);

  // Handle OTP input as individual digits
  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;
    
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
    
    // Update combined OTP string
    setOtp(newOtpDigits.join(""));
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtpDigits(digits);
      setOtp(pastedData);
      // Focus last input
      document.getElementById(`otp-5`)?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !otp) {
      setResult({
        success: false,
        message: 'Please provide both email and OTP code.',
      });
      return;
    }

    if (otp.length !== 6) {
      setResult({
        success: false,
        message: 'OTP code must be 6 digits.',
      });
      return;
    }

    setResult(null);
    
    startTransition(async () => {
      try {
        const response = await fetch('/api/auth/verify-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
          },
          body: JSON.stringify({ email, otp }),
        });

        const data = await response.json();

        if (!response.ok) {
          let errorMessage = 'OTP verification failed. Please try again.';
          
          if (data?.message) {
            errorMessage = data.message;
          } else if (data?.data?.message) {
            errorMessage = data.data.message;
          }

          setResult({
            success: false,
            message: errorMessage,
          });
          return;
        }

        // Success - check if access token is returned
        if (data?.data?.accessToken) {
          // Store token if provided
          if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', data.data.accessToken);
          }
        }

        setResult({
          success: true,
          message: data?.message || 'Email verified successfully! Redirecting to home...',
        });

        // Refresh user session and redirect to landing page
        try {
          await refreshUser();
        } catch (error) {
          console.error('Error refreshing user:', error);
        }

        // Redirect to home page after 1.5 seconds
        setTimeout(() => {
          router.push('/home');
        }, 1500);
      } catch (error: any) {
        console.error('OTP verification error:', error);
        setResult({
          success: false,
          message: 'Network error. Please check your connection and try again.',
        });
      }
    });
  };

  const handleResendOtp = async () => {
    if (!email) {
      setResult({
        success: false,
        message: 'Please enter your email address first.',
      });
      return;
    }

    setIsResending(true);
    setResult(null);

    try {
      const response = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = 'Failed to resend OTP. Please try again.';
        
        if (data?.message) {
          errorMessage = data.message;
        } else if (data?.data?.message) {
          errorMessage = data.data.message;
        }

        setResult({
          success: false,
          message: errorMessage,
        });
        setIsResending(false);
        return;
      }

      setResult({
        success: true,
        message: data?.message || 'OTP code has been resent to your email.',
      });
      setIsResending(false);
      
      // Clear OTP inputs
      setOtpDigits(["", "", "", "", "", ""]);
      setOtp("");
    } catch (error: any) {
      console.error('Resend OTP error:', error);
      setResult({
        success: false,
        message: 'Network error. Please check your connection and try again.',
      });
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/church-logo.png"
        alt="OTP Verification Background"
        fill
        className="object-cover w-full h-full z-0 opacity-10"
        priority
      />
      {/* Overlay for content readability */}
      <div className="absolute inset-0 bg-white/70 z-10" />
      
      {/* Header Bar */}
      <header className="w-full bg-[#888888] h-16 md:h-20 flex items-center px-4 md:px-8 z-20 relative">
        <Link href="/" className="flex items-center gap-2 md:gap-3">
          <Image
            src="/images/church-logo.png"
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
      <div className="flex-1 flex items-center justify-center relative z-20 px-4 md:px-0 py-8">
        {/* Card */}
        <motion.div
          className="w-full max-w-md bg-[#FFFFFF] rounded-lg shadow-lg px-6 py-8 flex flex-col items-center relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Title */}
          <h2 className="text-center text-2xl font-semibold text-gray-800 mb-2">
            Verify Your Email
          </h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            Enter the 6-digit OTP code sent to your email
          </p>

          {/* Error/Success Messages */}
          {result && (
            <div className={`w-full mb-6 p-4 rounded text-sm ${
              result.success
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              <p className="text-center">{result.message}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleVerifyOtp} className="w-full space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isPending}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="your.email@example.com"
              />
            </div>

            {/* OTP Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                OTP Code
              </label>
              <div className="flex justify-center gap-2 md:gap-3">
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    disabled={isPending}
                    className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E] focus:border-[#FF602E] disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending || otp.length !== 6 || !email}
              className="w-full bg-[#FF602E] text-white py-3 rounded-md font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Verifying...</span>
                </>
              ) : (
                'Verify OTP'
              )}
            </button>

            {/* Resend OTP */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isResending || isPending || !email}
                className="text-[#FF602E] hover:underline text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending ? 'Sending...' : "Didn't receive code? Resend OTP"}
              </button>
            </div>
          </form>

          {/* Back to Sign In */}
          <div className="mt-6 pt-6 border-t border-gray-200 w-full text-center">
            <Link
              href="/signin"
              className="text-gray-600 hover:text-[#FF602E] text-sm font-medium"
            >
              ← Back to Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF602E]"></div>
      </div>
    }>
      <VerifyOtpForm />
    </Suspense>
  );
}

