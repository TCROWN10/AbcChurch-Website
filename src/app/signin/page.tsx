"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/lib/auth/auth-context";

type Tab = "signin" | "create";

function safeRedirect(value: string | null) {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/home";
}

export default function SignInPage() {
  const router = useRouter();
  const { user, loading, refreshUser } = useAuth();
  const [tab, setTab] = useState<Tab>("signin");
  const [redirectTo, setRedirectTo] = useState("/home");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRedirectTo(safeRedirect(params.get("redirect")));
    if (params.get("tab") === "create") setTab("create");
  }, []);

  useEffect(() => {
    if (!loading && user) router.replace(redirectTo);
  }, [loading, user, redirectTo, router]);

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    setError("");
  };

  const switchTab = (next: Tab) => {
    setTab(next);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(tab === "signin" ? "/api/auth/login" : "/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          tab === "signin" ? { email: form.email, password: form.password } : form
        ),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.message || "Something went wrong. Please try again.");
        return;
      }
      await refreshUser();
      router.replace(redirectTo);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-base sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#FF602E] transition-colors";

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4F2]">
      <header className="w-full bg-[#28505A] h-16 flex items-center px-4 md:px-8">
        <Link href="/home" className="flex items-center gap-3">
          <Image src="/images/church-logo.png" alt="All Believers Christian Church" width={40} height={40} className="rounded-full" />
          <span className="text-white font-bold text-sm leading-tight hidden sm:block">
            ALL BELIEVERS<br />CHRISTIAN CHURCH
          </span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-6 sm:p-8"
        >
          <h1 className="text-2xl font-bold text-[#28505A]">
            {tab === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {tab === "signin"
              ? "Sign in to manage your giving and church account."
              : "Join the All Believers Christian Church family online."}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-1 rounded-xl bg-gray-100 p-1" role="tablist">
            {(["signin", "create"] as const).map(t => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                onClick={() => switchTab(t)}
                className={`relative rounded-lg py-2 text-sm font-semibold transition-colors ${
                  tab === t ? "text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab === t && (
                  <motion.span layoutId="auth-tab" className="absolute inset-0 rounded-lg bg-[#FF602E]" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                )}
                <span className="relative">{t === "signin" ? "Sign In" : "Create Account"}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <AnimatePresence initial={false}>
              {tab === "create" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-2 gap-3 overflow-hidden"
                >
                  <div>
                    <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-gray-700">First name</label>
                    <input id="firstName" autoComplete="given-name" value={form.firstName} onChange={update("firstName")} className={inputClass} required />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-gray-700">Last name</label>
                    <input id="lastName" autoComplete="family-name" value={form.lastName} onChange={update("lastName")} className={inputClass} required />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
              <input id="email" type="email" autoComplete="email" value={form.email} onChange={update("email")} placeholder="you@example.com" className={inputClass} required />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                {tab === "signin" && (
                  <Link href="/forgot-password" className="text-xs font-medium text-[#FF602E] hover:underline">
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={tab === "signin" ? "current-password" : "new-password"}
                  value={form.password}
                  onChange={update("password")}
                  className={`${inputClass} pr-16`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs font-semibold text-gray-500 hover:text-gray-800"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {tab === "create" && <p className="mt-1.5 text-xs text-gray-500">At least 8 characters.</p>}
            </div>

            {error && (
              <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF602E] py-3 text-base font-semibold text-white shadow-lg shadow-[#FF602E]/20 transition hover:bg-[#ff7449] disabled:opacity-60"
            >
              {submitting && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
              {tab === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Just want to give?{" "}
            <Link href="/donate" className="font-semibold text-[#FF602E] hover:underline">
              Donate as a guest
            </Link>
          </p>
        </motion.div>
      </main>
    </div>
  );
}
