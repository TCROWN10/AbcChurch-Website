"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

const HERO_BG = '/HERO_BG.jpg';
const FULL_TEXT = "J.E.S.U.S -C.H.R.I.S.T";

interface HeroWithNavbarProps {
  onAboutClick?: () => void;
}

export default function HeroWithNavbar() {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // Continuous typewriter animation effect
  useEffect(() => {
    if (isTyping) {
      if (currentIndex < FULL_TEXT.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev + FULL_TEXT[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, 150);
        return () => clearTimeout(timeout);
      } else {
        // Wait 2 seconds when complete, then restart
        const timeout = setTimeout(() => {
          setDisplayText("");
          setCurrentIndex(0);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentIndex, isTyping]);

  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center pt-16 md:pt-20">
      {/* Background Image */}
      <Image
        src={HERO_BG}
        alt="Hero Background"
        fill
        className="object-cover w-full h-full z-0"
        priority
      />
      
      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center text-white px-4">
        
        {/* Main Heading - Continuous Typewriter Animation */}
        <motion.h1
          className="font-bold text-white drop-shadow-lg tracking-widest mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl min-h-[1.2em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {displayText}
          <span className="animate-pulse">|</span>
        </motion.h1>
        
        {/* Sub Heading */}
        <motion.div 
          className="flex gap-4 sm:gap-6 justify-center text-xl sm:text-2xl md:text-3xl font-semibold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <span className="text-[#FF602E]">caring</span>
          <span className="text-[#FF602E]">calling</span>
          <span className="text-[#FF602E]">coming</span>
        </motion.div>
        
        {/* Bible Verse */}
        <motion.p 
          className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
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