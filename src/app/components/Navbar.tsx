"use client";
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          link.label === 'Message' ? (
            <div key={link.label} className="relative flex items-center" ref={dropdownRef}>
              {/* Message text as link */}
              <Link
                href={link.href}
                className={`text-base font-medium transition relative px-1 flex items-center gap-1
                  ${pathname === link.href ? 'text-[#FF602E] underline underline-offset-8 decoration-2' : 'text-white'}
                  hover:underline hover:underline-offset-8 hover:decoration-2`
                }
                style={{ textUnderlinePosition: 'under' }}
                tabIndex={0}
              >
                {link.label}
              </Link>
              {/* Dropdown chevron as separate button */}
              <button
                type="button"
                className="ml-1 flex items-center focus:outline-none"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen((open) => !open)}
                tabIndex={0}
              >
                <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute left-0 top-full mt-2 min-w-[180px] rounded shadow-lg bg-[#313131e6] backdrop-blur-[24px] text-white z-40 flex flex-col" style={{WebkitBackdropFilter: 'blur(24px)', backdropFilter: 'blur(24px)'}}>
                  <Link href="/sermon" className="px-6 py-3 hover:bg-[#444444cc] transition-colors whitespace-nowrap" onClick={() => setDropdownOpen(false)}>Sermon</Link>
                  <Link href="/devotional" className="px-6 py-3 hover:bg-[#444444cc] transition-colors whitespace-nowrap" onClick={() => setDropdownOpen(false)}>Daily Devotional</Link>
                </div>
              )}
            </div>
          ) : (
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
          )
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