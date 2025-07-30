import Image from 'next/image';
import React from 'react';
import { motion } from "framer-motion";

const HERO_BG = '/HERO_BG.jpg';

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={HERO_BG}
        alt="Hero Background"
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-green-500 opacity-70" />
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 w-full max-w-7xl mx-auto">
        
        {/* Main Heading */}
        <motion.h1
          className="font-extrabold text-white drop-shadow-lg tracking-wider mb-6"
          style={{
            fontSize: 'min(6vw, 5rem)',
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            textAlign: 'center',
            width: '100%',
            maxWidth: '100vw'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          J.E.S.U.S -C.H.R.I.S.T
        </motion.h1>
        
        {/* Sub Heading */}
        <motion.div 
          className="flex flex-wrap gap-4 sm:gap-6 justify-center items-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <span className="text-[#45EFFF] text-xl sm:text-2xl md:text-4xl font-semibold">Caring</span>
          <span className="text-[#45EFFF] text-xl sm:text-2xl md:text-4xl font-semibold">Calling</span>
          <span className="text-[#45EFFF] text-xl sm:text-2xl md:text-4xl font-semibold">Coming</span>
        </motion.div>
        
        {/* Bible Verse */}
        <motion.p 
          className="text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          Behold, I stand at the door and knock. If anyone hears My voice and opens the door, I will come in to him and dine with him, and he with Me. (Revelation 3:20)
        </motion.p>
      </div>
    </section>
  );
} 