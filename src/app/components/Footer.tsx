import Image from 'next/image';
import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#FAFAFA] pt-12 pb-4 px-4 border-t border-[#ececec]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 pb-8">
        {/* Left: Logo, Description, Socials */}
        <div className="flex-1 min-w-[260px] flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Image src="/All Believers Christian Church.png" alt="Logo" width={56} height={56} className="rounded-full" />
            <span className="text-[#28505A] font-bold text-lg leading-tight">
              ALL BELIEVERS<br />CHRISTIAN CHURCH
            </span>
          </div>
          <p className="text-[#6B6B6B] text-base max-w-xs">
            At All Believers Christian Church, every event is an opportunity to encounter God, strengthen faith, and grow together in love.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" aria-label="X" className="text-[#28505A] hover:text-[#FF602E]">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M17.53 6.47a.75.75 0 0 0-1.06 0L12 10.94 7.53 6.47A.75.75 0 1 0 6.47 7.53L10.94 12l-4.47 4.47a.75.75 0 1 0 1.06 1.06L12 13.06l4.47 4.47a.75.75 0 0 0 1.06-1.06L13.06 12l4.47-4.47a.75.75 0 0 0 0-1.06z" fill="currentColor"/></svg>
            </a>
            <a href="https://web.facebook.com/abcchurch.davenport.ia" aria-label="Facebook" className="text-[#FF602E] hover:text-[#28505A]" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99h-2.54v-2.89h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 17 22 12z" fill="currentColor"/></svg>
            </a>
            <a href="#" aria-label="Instagram" className="text-[#28505A] hover:text-[#FF602E]">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17" cy="7" r="1.5" fill="currentColor"/></svg>
            </a>
          </div>
        </div>
        {/* Right: Nav, Email */}
        <div className="flex-1 min-w-[260px] flex flex-col gap-6 items-end">
          <nav className="flex gap-8 mb-4">
            <a href="#" className="text-[#28505A] font-semibold hover:text-[#FF602E]">Home</a>
            <a href="#" className="text-[#28505A] font-semibold hover:text-[#FF602E]">About</a>
            <a href="#" className="text-[#28505A] font-semibold hover:text-[#FF602E]">Vision</a>
            <a href="#" className="text-[#28505A] font-semibold hover:text-[#FF602E]">Connect</a>
          </nav>
          <form className="flex flex-col gap-2 w-full max-w-xs rounded-xl" style={{ boxShadow: '0 0 32px 0 #F5F5F5' }}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full rounded-md border border-[#ececec] px-4 py-3 text-[#28505A] bg-white placeholder-[#B0B8C1] focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
            />
            <div className="flex justify-end w-full">
              <button
                type="submit"
                className="h-12 px-8 rounded-md bg-[#FF602E] text-white font-bold text-lg transition"
                style={{ minWidth: '120px' }}
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Bottom: Links and Copyright */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 border-t border-[#ececec] pt-4 mt-2 text-[#6B6B6B] text-sm">
        <div className="flex gap-6 mb-2 md:mb-0">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms & Conditions</a>
          <a href="#" className="hover:underline">Support</a>
        </div>
        <div>©2022 All Believers Christian Church</div>
      </div>
    </footer>
  );
} 