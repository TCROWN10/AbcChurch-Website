"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { DEFAULT_SETTINGS, type HeroSettings } from '@/lib/content-types';

export default function HeroWithNavbar({ hero = DEFAULT_SETTINGS.hero }: { hero?: HeroSettings }) {
  const fullText = hero.headline;
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
  }, [fullText]);

  // Continuous typewriter animation effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    }
    // Wait 2 seconds when complete, then restart
    const timeout = setTimeout(() => {
      setDisplayText("");
      setCurrentIndex(0);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [currentIndex, fullText]);

  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center pt-16 md:pt-20 overflow-hidden">
      {hero.backgroundType === 'video' ? (
        <video
          key={hero.backgroundUrl}
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={hero.backgroundUrl}
          poster={hero.posterUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      ) : (
        <Image
          src={hero.backgroundUrl}
          alt=""
          fill
          className="object-cover w-full h-full z-0"
          priority
          unoptimized={hero.backgroundUrl.startsWith('http')}
        />
      )}
      {hero.overlayOpacity > 0 && (
        <div className="absolute inset-0 z-10 bg-black" style={{ opacity: hero.overlayOpacity / 100 }} />
      )}

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center text-white px-4">
        <motion.h1
          className="font-bold text-white drop-shadow-lg tracking-widest mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl min-h-[1.2em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {displayText}
          <span className="animate-pulse">|</span>
        </motion.h1>

        {hero.tagline.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-4 sm:gap-6 justify-center text-xl sm:text-2xl md:text-3xl font-semibold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {hero.tagline.map(word => (
              <span key={word} className="text-[#22C55E] drop-shadow">{word}</span>
            ))}
          </motion.div>
        )}

        {hero.verse && (
          <motion.p
            className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            {hero.verse}
          </motion.p>
        )}

        {hero.ctaLabel && hero.ctaHref && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            <Link
              href={hero.ctaHref}
              className="mt-8 inline-flex rounded-xl bg-[#FF602E] px-6 py-3 font-semibold text-white shadow-lg hover:bg-[#ff7449] transition"
            >
              {hero.ctaLabel}
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
