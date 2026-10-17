"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWithNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = pathname === "/signin" || pathname === "/welcome" || pathname?.startsWith("/admin");
  return (
    <>
      {!hideNav && <Navbar />}
      {children}
      {!hideNav && <Footer />}
    </>
  );
} 