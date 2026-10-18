"use client";
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { ChevronDownIcon } from '@/components/ui/Icons';
import { CHURCH_ADDRESS, CHURCH_MAPS_URL, CHURCH_VENUE } from '@/lib/church-info';

function MapPinIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-6.1-7-11.5A7 7 0 0112 2.5a7 7 0 017 7C19 14.9 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Message', href: '/message' },
  { label: 'Connect', href: '/connect' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Donate', href: '/donate' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, isAdmin, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Compute ARIA expanded values as strings
  const dropdownExpanded = dropdownOpen ? "true" : "false";
  const userDropdownExpanded = userDropdownOpen ? "true" : "false";
  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setUserDropdownOpen(false);
    await signOut();
    router.push('/home');
  };
  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileMenuOpen(false);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [mobileMenuOpen]);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-[84px] bg-[#31313169] flex items-center justify-between px-4 md:px-8 py-3"
      style={{ WebkitBackdropFilter: 'blur(84px)', backdropFilter: 'blur(84px)' }}
    >
      {/* Logo as back button */}
      <Link href="/" className="flex items-center gap-3 cursor-pointer">
        <Image
          src="/images/logo.png"
          alt="All Believers Christian Church Logo"
          width={48}
          height={48}
          className="rounded-full"
          priority
        />
        <span className="text-white font-bold text-sm leading-tight hidden sm:block">
          ALL BELIEVERS<br />CHRISTIAN CHURCH
        </span>
      </Link>
      {/* Hamburger for mobile */}
      <button
        type="button"
        className="md:hidden flex items-center justify-center w-10 h-10 ml-auto -mr-1 text-white rounded-lg hover:bg-white/10"
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open menu"
        aria-expanded={mobileMenuOpen}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
        </svg>
      </button>
      {/* Navigation Links (desktop) */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {NAV_LINKS.map((link) => (
          link.label === 'Message' ? (
            <div key={link.label} className="relative flex items-center" ref={dropdownRef}>
              {/* Message text as link */}
              <Link
                href={link.href}
                className={`text-base font-medium transition relative px-1 flex items-center gap-1
									${pathname === link.href ? 'text-[#FF602E] underline underline-offset-8 decoration-2' : 'text-white'}
									hover:underline hover:underline-offset-8 hover:decoration-2`}
                style={{ textUnderlinePosition: 'under' }}
              >
                {link.label}
              </Link>
              {/* Dropdown chevron as separate button */}
              <button
                type="button"
                className="ml-1 flex items-center text-white hover:text-[#FF602E] transition-colors focus:outline-none"
                aria-haspopup="true"
                aria-expanded={dropdownExpanded}
                aria-label="Toggle message menu"
                onClick={() => setDropdownOpen((open) => !open)}
              >
                <ChevronDownIcon className={`h-[18px] w-[18px] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} strokeWidth={3} />
              </button>
              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute left-0 top-full mt-2 min-w-[180px] rounded shadow-lg bg-[#313131e6] backdrop-blur-[24px] text-white z-50 flex flex-col" style={{ WebkitBackdropFilter: 'blur(24px)', backdropFilter: 'blur(24px)' }}>
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
								hover:underline hover:underline-offset-8 hover:decoration-2`}
              style={{ textUnderlinePosition: 'under' }}
            >
              {link.label}
            </Link>
          )
        ))}
        {/* Authentication Section */}
        {loading ? (
          <div className="ml-4 px-5 py-2 rounded bg-gray-600 text-white font-semibold text-base">
            Loading...
          </div>
        ) : user ? (
          <>
            <a
              href={CHURCH_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              title={`${CHURCH_VENUE}, ${CHURCH_ADDRESS}`}
              className="ml-4 inline-flex items-center gap-2 px-5 py-2 rounded bg-[#FF602E] text-white font-semibold text-base shadow hover:opacity-90 transition"
            >
              <MapPinIcon />
              Visit Us
            </a>
            {/* User dropdown */}
            <div className="relative ml-4" ref={userDropdownRef}>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 rounded bg-[#313131] text-white font-semibold text-base shadow hover:opacity-90 transition"
                aria-haspopup="true"
                aria-expanded={userDropdownExpanded}
                aria-label="User menu"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <span>
                  {user.firstName || user.email}
                </span>
                <ChevronDownIcon className={`h-[18px] w-[18px] transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} strokeWidth={3} />
              </button>
              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 min-w-[180px] rounded shadow-lg bg-[#313131e6] backdrop-blur-[24px] text-white z-40 flex flex-col" style={{ WebkitBackdropFilter: 'blur(24px)', backdropFilter: 'blur(24px)' }}>
                  <div className="px-4 py-3 border-b border-gray-600">
                    <p className="text-sm text-gray-300">Signed in as</p>
                    <p className="font-medium truncate">{user.email}</p>
                    {isAdmin && <p className="text-xs text-orange-300">{user.role === 'SUPER_ADMIN' ? 'Super admin' : 'Admin'}</p>}
                  </div>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="px-4 py-3 text-left hover:bg-[#444444cc] transition-colors border-t border-gray-600"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="px-4 py-3 text-left hover:bg-[#444444cc] transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link
              href="/signin"
              className={`text-base font-medium px-1 transition hover:underline hover:underline-offset-8 hover:decoration-2 ${pathname === '/signin' ? 'text-[#FF602E]' : 'text-white'}`}
              style={{ textUnderlinePosition: 'under' }}
            >
              Sign In
            </Link>
            <a
              href={CHURCH_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              title={`${CHURCH_VENUE}, ${CHURCH_ADDRESS}`}
              className="inline-flex items-center gap-2 px-5 py-2 rounded bg-[#FF602E] text-white font-semibold text-base shadow hover:opacity-90 transition"
            >
              <MapPinIcon />
              Visit Us
            </a>
          </>
        )}
      </div>
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && createPortal(
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center overflow-y-auto bg-black/60 px-4 pb-8 pt-16 backdrop-blur-sm md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMobileMenuOpen(false);
          }}
        >
          <button
            type="button"
            className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="w-full max-w-xs bg-white rounded-xl shadow-2xl flex flex-col items-center py-6 px-4">
            <Link href="/about" className={`w-full text-center text-lg font-semibold py-4 border-b border-gray-200 transition ${pathname === '/about' ? 'text-[#FF602E]' : 'text-[#232B33]'} hover:text-[#FF602E]`} onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="/message" className={`w-full text-center text-lg font-semibold py-4 border-b border-gray-200 transition ${pathname === '/message' ? 'text-[#FF602E]' : 'text-[#232B33]'} hover:text-[#FF602E]`} onClick={() => setMobileMenuOpen(false)}>Message</Link>
            <Link href="/sermon" className={`w-full text-center text-lg font-semibold py-4 border-b border-gray-200 transition ${pathname === '/sermon' ? 'text-[#FF602E]' : 'text-[#232B33]'} hover:text-[#FF602E]`} onClick={() => setMobileMenuOpen(false)}>Sermon</Link>
            <Link href="/devotional" className={`w-full text-center text-lg font-semibold py-4 border-b border-gray-200 transition ${pathname === '/devotional' ? 'text-[#FF602E]' : 'text-[#232B33]'} hover:text-[#FF602E]`} onClick={() => setMobileMenuOpen(false)}>Daily Devotional</Link>
            <Link href="/connect" className={`w-full text-center text-lg font-semibold py-4 border-b border-gray-200 transition ${pathname === '/connect' ? 'text-[#FF602E]' : 'text-[#232B33]'} hover:text-[#FF602E]`} onClick={() => setMobileMenuOpen(false)}>Connect</Link>
            <Link href="/gallery" className={`w-full text-center text-lg font-semibold py-4 border-b border-gray-200 transition ${pathname === '/gallery' ? 'text-[#FF602E]' : 'text-[#232B33]'} hover:text-[#FF602E]`} onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
            <Link href="/donate" className={`w-full text-center text-lg font-semibold py-4 border-b border-gray-200 transition ${pathname === '/donate' ? 'text-[#FF602E]' : 'text-[#232B33]'} hover:text-[#FF602E]`} onClick={() => setMobileMenuOpen(false)}>Donate</Link>
            {user ? (
              <>
                {isAdmin && (
                  <Link href="/admin" className="w-full text-center mt-4 px-5 py-3 rounded bg-purple-600 text-white font-semibold text-lg shadow hover:opacity-90 transition" onClick={() => setMobileMenuOpen(false)}>Admin Dashboard</Link>
                )}
                <a
                  href={CHURCH_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 mt-4 px-5 py-3 rounded bg-[#FF602E] text-white font-semibold text-lg shadow hover:opacity-90 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <MapPinIcon />
                  Visit Us
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="w-full text-center mt-2 px-5 py-3 rounded bg-[#313131] text-white font-semibold text-lg shadow hover:opacity-90 transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <a
                  href={CHURCH_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 mt-4 px-5 py-3 rounded bg-[#FF602E] text-white font-semibold text-lg shadow hover:opacity-90 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <MapPinIcon />
                  Visit Us
                </a>
                <Link
                  href="/signin"
                  className="w-full text-center mt-2 px-5 py-3 rounded bg-[#313131] text-white font-semibold text-lg shadow hover:opacity-90 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              </>
            )}
            <p className="mt-4 text-center text-sm text-gray-500">{CHURCH_ADDRESS}</p>
          </div>
        </div>,
        document.body
      )}
    </nav>
  );
}
