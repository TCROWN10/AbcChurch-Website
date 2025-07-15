import Image from 'next/image';
import React from 'react';

const HERO_BG = '/HERO_BG.jpg'; // Corrected path

export default function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={HERO_BG}
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        priority
        className="z-0"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#12677F] opacity-70 z-10" />
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center text-white px-4">
        <h1 className="text-6xl md:text-7xl font-bold tracking-widest mb-4">J.E.S.U.S</h1>
        <div className="flex gap-6 justify-center text-3xl md:text-4xl font-semibold mb-2">
          <span className="text-[#FF602E]">caring</span>
          <span className="text-[#FF602E]">calling</span>
          <span className="text-[#FF602E]">coming</span>
        </div>
        <p className="mt-6 text-base md:text-lg max-w-2xl mx-auto">
          Behold, I stand at the door and knock. If anyone hears My voice and opens the door, I will come in to him and dine with him, and he with Me. (Revelation 3:20)
        </p>
      </div>
    </section>
  );
} 