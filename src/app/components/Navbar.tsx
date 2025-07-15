"use client";
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Message', href: '/message' },
  { label: 'Connect', href: '/connect' },
  { label: 'Donate', href: '/donate' },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav
      className="fixed top-0 left-0 w-full z-30 backdrop-blur-[84px] bg-[#31313169] flex items-center justify-between px-8 py-3"
      style={{ WebkitBackdropFilter: 'blur(84px)', backdropFilter: 'blur(84px)' }}
    >
      {/* Logo as back button */}
      <Link href="/" className="flex items-center gap-3 cursor-pointer">
        <Image
          src="/All Believers Christian Church.png"
          alt="All Believers Christian Church Logo"
          width={48}
          height={48}
          className="rounded-full"
        />
        <span className="text-white font-bold text-sm leading-tight hidden sm:block">
          ALL BELIEVERS<br />CHRISTIAN CHURCH
        </span>
      </Link>
      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`text-base font-medium transition relative px-1
              ${pathname === link.href ? 'text-[#FF602E] underline underline-offset-8 decoration-2' : 'text-white'}
              hover:underline hover:underline-offset-8 hover:decoration-2`
            }
            style={{ textUnderlinePosition: 'under' }}
          >
            {link.label}
          </Link>
        ))}
        <a
          href="/signin"
          className="ml-4 px-5 py-2 rounded bg-[#FF602E] text-white font-semibold text-base shadow hover:opacity-90 transition"
        >
          Visit Us
        </a>
      </div>
    </nav>
  );
} 