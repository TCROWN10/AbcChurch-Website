import Link from "next/link";
import { CHURCH_ADDRESS } from "@/lib/church-info";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-[#F7F4F2] flex items-center justify-center px-4 pt-24 pb-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-xl ring-1 ring-black/5">
        <h1 className="text-2xl font-bold text-[#28505A]">Forgot your password?</h1>
        <p className="mt-3 text-gray-600 leading-relaxed">
          Please reach out to a church administrator. They can set a temporary password for you from the admin
          dashboard, and you can sign in with it straight away.
        </p>
        <p className="mt-3 text-sm text-gray-500">
          You can also speak to us after Sunday service at {CHURCH_ADDRESS}.
        </p>
        <Link
          href="/signin"
          className="mt-6 inline-flex w-full justify-center rounded-xl bg-[#FF602E] py-3 font-semibold text-white hover:bg-[#ff7449] transition"
        >
          Back to sign in
        </Link>
      </div>
    </main>
  );
}
