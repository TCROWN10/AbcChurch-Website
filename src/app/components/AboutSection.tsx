import Image from 'next/image';
import React from 'react';

export default function AboutSection() {
  return (
    <section className="relative w-full bg-white py-12 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/About-Background.png"
        alt="About Section Background"
        fill
        className="object-cover w-full h-full z-0 pointer-events-none select-none"
        priority
      />
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#6B6B6B] mb-20 relative z-10">
        About All Believers Christian Church
      </h2>
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl mx-auto px-4 py-10 rounded-2xl bg-[#F8F8F8] z-10">
        {/* Left: Image */}
        <div className="flex-shrink-0 rounded-xl overflow-hidden bg-[#F8F8F8]">
          <Image
            src="/9dcbc46d470b991ca44e800ef524477e02f208b4.jpg"
            alt="Church Gathering"
            width={350}
            height={350}
            className="object-cover w-[320px] h-[320px] md:w-[350px] md:h-[350px] rounded-xl"
          />
        </div>
        {/* Right: Card */}
        <div className="flex-1 bg-[#ECF0F1] rounded-xl p-8 flex flex-col justify-center min-w-[300px] max-w-[420px]">
          <h2 className="text-4xl md:text-4xl font-bold text-[#3D5C67] mb-2">Our Ministry</h2>
          <p className="text-[#6B6B6B] text-base md:text-lg mb-6">
            We Are Inclusive, Spirit-filled, Prayer-focused, Sanctified.
          </p>
          <hr className="border-[#D0D7DA] mb-6" />
          <a
            href="#visit"
            className="inline-block px-6 py-3 rounded bg-[#FF602E] text-white font-semibold text-base shadow hover:opacity-90 transition"
          >
            Visit Us Now
          </a>
        </div>
      </div>
    </section>
  );
} 