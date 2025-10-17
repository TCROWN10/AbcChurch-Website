"use client";
import { useState, useTransition, useEffect, Suspense } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { signInAction, signUpAction, guestSignInAction, ActionResult } from "@/lib/auth/auth-actions";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SignInPage />
    </Suspense>
  );
}

function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState<"signin" | "create">("signin");
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [googleEnabled, setGoogleEnabled] = useState(false);
  const [providerChecked, setProviderChecked] = useState(false);

  // Handle OAuth errors from URL params
  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      const errorMessages = {
        'oauth_setup_failed': 'OAuth setup failed. Please check your configuration.',
        'oauth_cancelled': 'Google sign-in was cancelled.',
        'invalid_oauth_response': 'Invalid OAuth response received.',
        'invalid_oauth_state': 'Invalid OAuth state. Please try again.',
        'oauth_failed': 'Google sign-in failed. Please try again.',
      };
      
      setResult({
        success: false,
        message: errorMessages[error as keyof typeof errorMessages] || 'An error occurred during sign-in.',
      });
      
      // Clean up URL by removing error param
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('error');
      window.history.replaceState({}, '', newUrl.toString());
    }
  }, [searchParams]);

  // Discover provider availability from server (production-safe)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/auth/config', { cache: 'no-store' });
        const data = await res.json().catch(() => ({}));
        if (!cancelled) setGoogleEnabled(Boolean(data?.googleEnabled));
      } catch (_) {
        if (!cancelled) setGoogleEnabled(false);
      } finally {
        if (!cancelled) setProviderChecked(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Reset fields when switching tabs
  const handleTab = (tab: "signin" | "create") => {
    setActiveTab(tab);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setResult(null);
  };

  // Form submission handlers
  const handleSignIn = async (formData: FormData) => {
    startTransition(async () => {
      const result = await signInAction(formData);
      setResult(result);
      if (result.success) {
        await refreshUser();
        router.push('/');
      }
    });
  };

  const handleSignUp = async (formData: FormData) => {
    startTransition(async () => {
      const result = await signUpAction(formData);
      setResult(result);
      if (result.success) {
        await refreshUser();
        router.push('/');
      }
    });
  };

  const handleGuestSignIn = async (formData: FormData) => {
    startTransition(async () => {
      const result = await guestSignInAction(formData);
      setResult(result);
      if (result.success) {
        await refreshUser();
        router.push('/');
      }
    });
  };

  // Google Sign-In handler
  const handleGoogleSignIn = () => {
    if (!providerChecked || !googleEnabled) {
      setResult({ success: false, message: 'Google sign-in is not available. Please use email sign-in.' });
      return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('redirect') || '/';
    const oauthUrl = `/api/auth/sign-in/google${redirectUrl !== '/' ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`;
    window.location.href = oauthUrl;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/church-logo.png"
        alt="Sign In Background"
        fill
        className="object-cover w-full h-full z-0"
        priority
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/70 z-10" />
      
      {/* Header */}
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
      
      {/* Back Button */}
      <button
        type="button"
        onClick={() => {
          if (window.history.length > 1) {
            router.back();
          } else {
            router.push('/');
          }
        }}
        className="absolute top-20 md:top-28 left-4 md:left-8 z-50 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-transparent hover:bg-white/20 rounded-full transition-all duration-200 cursor-pointer"
        aria-label="Go back"
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="text-gray-800 md:w-7 md:h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center relative z-20 px-4 md:px-0">
        {/* Dove Image */}
        <div className="absolute right-6 md:right-24 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none hidden md:block">
          <Image src="/images/content/Cloud-bird.png" alt="Dove" width={120} height={120} />
        </div>
        
        {/* Card */}
        <motion.div
          className="w-full max-w-xs min-w-[260px] md:min-w-[300px] bg-[#FFFFFF] rounded shadow-md px-3 md:px-4 pt-3 md:pt-4 pb-4 md:pb-6 flex flex-col items-center relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Title */}
          <h2 className="text-center text-lg md:text-xl font-semibold text-gray-600 mb-3 md:mb-4">Site Access</h2>
          
          {/* Tabs */}
          <div className="flex w-full relative">
            <button
              className={`flex-1 py-2 md:py-2.5 text-sm md:text-base font-medium rounded-tl-md transition-colors duration-200 cursor-pointer ${
                activeTab === "signin"
                  ? "bg-[#FF602E] text-white"
                  : "bg-[#FFF3ED] text-[#FF602E]"
              }`}
              onClick={() => handleTab("signin")}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-2 md:py-2.5 text-sm md:text-base font-medium rounded-tr-md transition-colors duration-200 cursor-pointer ${
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
          
          {/* Error/Success Messages */}
          {result && (
            <div className={`mx-8 mt-4 p-3 rounded text-sm ${
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

          {/* Form */}
          <div className="w-full px-3 md:px-6 pt-4 md:pt-6 flex flex-col gap-2 md:gap-3">
            <AnimatePresence mode="wait">
              {activeTab === "create" && (
                <motion.form
                  key="create"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-4"
                  action={handleSignUp}
                >
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="w-full px-3 py-2 rounded border border-gray-200 bg-[#FFFFFF] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF602E] text-sm"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                    disabled={isPending}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="w-full px-3 py-2 rounded border border-gray-200 bg-[#FFFFFF] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF602E] text-sm"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                    disabled={isPending}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full px-3 py-2 rounded border border-gray-200 bg-[#FFFFFF] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF602E] text-sm"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    disabled={isPending}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full px-3 py-2 rounded border border-gray-200 bg-[#FFFFFF] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF602E] text-sm"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    disabled={isPending}
                  />
                  <motion.button
                    type="submit"
                    className="w-full mt-2 bg-[#FF602E] text-white py-2 rounded font-semibold text-sm transition hover:opacity-90 cursor-pointer disabled:opacity-50"
                    whileHover={{ scale: isPending ? 1 : 1.02 }}
                    whileTap={{ scale: isPending ? 1 : 0.98 }}
                    disabled={isPending}
                  >
                    {isPending ? 'Creating Account...' : 'Continue'}
                  </motion.button>

                  {providerChecked && googleEnabled && (
                    <>
                      {/* OR Separator */}
                      <motion.div
                        className="flex items-center justify-center my-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <span className="text-[#FF602E] text-xs font-semibold">OR</span>
                      </motion.div>

                      {/* Google Sign-In Button */}
                      <motion.button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded font-medium text-sm transition hover:bg-gray-50 cursor-pointer disabled:opacity-50"
                        whileHover={{ scale: isPending ? 1 : 1.02 }}
                        whileTap={{ scale: isPending ? 1 : 0.98 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        disabled={isPending}
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                      </motion.button>
                    </>
                  )}
                </motion.form>
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
                  <motion.form
                    className="flex flex-col gap-4"
                    action={handleSignIn}
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full px-3 py-2 rounded border border-gray-200 bg-[#FFFFFF] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF602E] text-sm"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      disabled={isPending}
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="w-full px-3 py-2 rounded border border-gray-200 bg-[#FFFFFF] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF602E] text-sm"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      disabled={isPending}
                    />
                    <motion.button
                      type="submit"
                      className="w-full mt-2 bg-[#FF602E] text-white py-2 rounded font-semibold text-sm transition hover:opacity-90 cursor-pointer disabled:opacity-50"
                      whileHover={{ scale: isPending ? 1 : 1.02 }}
                      whileTap={{ scale: isPending ? 1 : 0.98 }}
                      disabled={isPending}
                    >
                      {isPending ? 'Signing In...' : 'Sign In'}
                    </motion.button>
                  </motion.form>

                  {/* Forgot Password Link */}
                  <div className="text-center mt-2">
                    <Link
                      href="/forgot-password"
                      className="text-[#FF602E] hover:underline text-xs"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  {providerChecked && googleEnabled && (
                    <>
                      {/* OR Separator */}
                      <motion.div
                        className="flex items-center justify-center my-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <span className="text-[#FF602E] text-xs font-semibold">OR</span>
                      </motion.div>

                      {/* Google Sign-In Button */}
                      <motion.button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded font-medium text-sm transition hover:bg-gray-50 cursor-pointer disabled:opacity-50"
                        whileHover={{ scale: isPending ? 1 : 1.02 }}
                        whileTap={{ scale: isPending ? 1 : 0.98 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        disabled={isPending || !providerChecked || !googleEnabled}
                        title={!providerChecked ? 'Checking providers...' : (!googleEnabled ? 'Google sign-in is not available' : undefined)}
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Sign in with Google
                      </motion.button>
                    </>
                  )}

                  {/* OR Separator */}
                  <motion.div
                    className="flex items-center justify-center my-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="text-[#FF602E] text-xs font-semibold">OR</span>
                  </motion.div>

                  {/* Guest Sign In */}
                  <motion.form
                    action={handleGuestSignIn}
                    className="flex flex-col gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full px-3 py-2 rounded border border-gray-200 bg-[#FFFFFF] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF602E] text-sm"
                      value={guestEmail}
                      onChange={e => setGuestEmail(e.target.value)}
                      required
                      disabled={isPending}
                    />
                    <motion.button
                      type="submit"
                      className="w-full mt-1 bg-[#FF602E] text-white py-2 rounded font-semibold text-sm transition hover:opacity-90 cursor-pointer disabled:opacity-50"
                      whileHover={{ scale: isPending ? 1 : 1.02 }}
                      whileTap={{ scale: isPending ? 1 : 0.98 }}
                      disabled={isPending}
                    >
                      {isPending ? 'Signing In...' : 'Continue As A Guest'}
                    </motion.button>
                  </motion.form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 