import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center px-4 py-16 bg-[#222A31] text-white">
      <h1 className="text-2xl font-bold mb-2">Page not found</h1>
      <p className="text-[#B0B8C1] mb-6 text-center max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/welcome"
        className="bg-[#FF602E] text-white px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity"
      >
        Back to welcome
      </Link>
    </div>
  );
}
