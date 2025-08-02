import Image from 'next/image';
import React from 'react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="w-full bg-[#FAFAFA] pt-8 md:pt-12 pb-4 px-4 md:px-6 border-t border-[#ececec] relative">
      {/* Go Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-[#FF602E] text-white rounded-full shadow-lg hover:bg-[#e55a2a] transition-all duration-300 flex items-center justify-center z-10"
        aria-label="Go back to top"
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="md:w-6 md:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-8 md:gap-12 pb-6 md:pb-8">
        {/* Left: Logo, Description, Socials */}
        <div className="flex-1 min-w-[260px] flex flex-col gap-4 md:gap-6">
          <div className="flex items-center gap-2 md:gap-3">
            <Image src="/images/logos/All Believers Christian Church.png" alt="Logo" width={48} height={48} className="rounded-full md:w-14 md:h-14" />
            <span className="text-[#28505A] font-bold text-base md:text-lg leading-tight">
              ALL BELIEVERS<br />CHRISTIAN CHURCH
            </span>
          </div>
          <p className="text-[#6B6B6B] text-sm md:text-base max-w-xs">
            At All Believers Christian Church, every event is an opportunity to encounter God, strengthen faith, and grow together in love.
          </p>
          <div className="flex gap-3 md:gap-4 mt-2">
            <a href="#" aria-label="X" className="text-[#28505A] hover:text-[#FF602E]">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="md:w-6 md:h-6"><path d="M17.53 6.47a.75.75 0 0 0-1.06 0L12 10.94 7.53 6.47A.75.75 0 1 0 6.47 7.53L10.94 12l-4.47 4.47a.75.75 0 1 0 1.06 1.06L12 13.06l4.47 4.47a.75.75 0 0 0 1.06-1.06L13.06 12l4.47-4.47a.75.75 0 0 0 0-1.06z" fill="currentColor"/></svg>
            </a>
            <a href="https://web.facebook.com/abcchurch.davenport.ia" aria-label="Facebook" className="text-[#FF602E] hover:text-[#28505A]" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="md:w-6 md:h-6"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99h-2.54v-2.89h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 17 22 12z" fill="currentColor"/></svg>
            </a>
            <a href="https://www.instagram.com/theab_cc/" aria-label="Instagram" className="text-[#28505A] hover:text-[#FF602E]" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="md:w-6 md:h-6"><rect width="20" height="20" x="2" y="2" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17" cy="7" r="1.5" fill="currentColor"/></svg>
            </a>
          </div>
        </div>
        {/* Right: Nav, Email */}
        <div className="flex-1 min-w-[260px] flex flex-col gap-4 md:gap-6 items-start lg:items-end w-full lg:w-auto">
          <nav className="flex flex-wrap gap-4 md:gap-8 mb-2 md:mb-4">
            <a href="/" className="text-[#28505A] font-semibold hover:text-[#FF602E] text-sm md:text-base">Home</a>
            <a href="/about" className="text-[#28505A] font-semibold hover:text-[#FF602E] text-sm md:text-base">About</a>
            <a href="/about" className="text-[#28505A] font-semibold hover:text-[#FF602E] text-sm md:text-base">Vision</a>
            <a href="/connect" className="text-[#28505A] font-semibold hover:text-[#FF602E] text-sm md:text-base">Connect</a>
          </nav>
          <form className="flex flex-col gap-2 w-full max-w-xs rounded-xl" style={{ boxShadow: '0 0 32px 0 #F5F5F5' }}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full rounded-md border border-[#ececec] px-3 md:px-4 py-2.5 md:py-3 text-[#28505A] bg-white placeholder-[#B0B8C1] focus:outline-none focus:ring-2 focus:ring-[#FF602E] text-sm md:text-base"
            />
            <div className="flex justify-end w-full">
              <button
                type="submit"
                className="h-10 md:h-12 px-6 md:px-8 rounded-md bg-[#FF602E] text-white font-bold text-base md:text-lg transition"
                style={{ minWidth: '100px' }}
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Bottom: Links and Copyright */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 border-t border-[#ececec] pt-3 md:pt-4 mt-2 text-[#6B6B6B] text-xs md:text-sm">
        <div className="flex flex-wrap gap-4 md:gap-6 mb-2 md:mb-0 justify-center md:justify-start">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms & Conditions</a>
          <a href="#" className="hover:underline">Support</a>
        </div>
        <div className="text-center md:text-left">©2022 All Believers Christian Church</div>
      </div>
    </footer>
  );
} 