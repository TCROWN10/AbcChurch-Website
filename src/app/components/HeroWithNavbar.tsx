"use client";
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Join Sunday', href: '#' },
  { label: 'Connect', href: '#' },
  { label: 'Donate', href: '#' },
];

const HERO_BG = '/HERO_BG.jpg';
const JESUS_LETTERS = ['J', '.', 'E', '.', 'S', '.', 'U', '.', 'S'];
const CAROUSEL_WORDS = ['caring', 'calling', 'coming'];

interface HeroWithNavbarProps {
  onAboutClick?: () => void;
}

export default function HeroWithNavbar() {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [carouselAnim, setCarouselAnim] = useState<'in' | 'out'>('in');
  const [carouselDone, setCarouselDone] = useState(false);
  const loopCount = useRef(0);

  // J.E.S.U.S animation
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (visibleLetters < JESUS_LETTERS.length) {
      timeout = setTimeout(() => {
        setVisibleLetters((v) => v + 1);
      }, 180);
    } else {
      timeout = setTimeout(() => {
        setVisibleLetters(0);
      }, 1200);
    }
    return () => clearTimeout(timeout);
  }, [visibleLetters]);

  // Caring/Calling/Coming carousel animation (fade/scale, repeat 4x, then show all)
  useEffect(() => {
    if (carouselDone) return;
    let timeout: NodeJS.Timeout;
    if (carouselAnim === 'in') {
      timeout = setTimeout(() => setCarouselAnim('out'), 1200);
    } else {
      timeout = setTimeout(() => {
        if (carouselIdx === CAROUSEL_WORDS.length - 1) {
          loopCount.current += 1;
          if (loopCount.current >= 4) {
            setCarouselDone(true);
            return;
          }
        }
        setCarouselIdx((idx) => (idx + 1) % CAROUSEL_WORDS.length);
        setCarouselAnim('in');
      }, 350);
    }
    return () => clearTimeout(timeout);
  }, [carouselAnim, carouselIdx, carouselDone]);

  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
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
        <h1 className="text-6xl md:text-7xl font-bold tracking-widest mb-4 flex justify-center">
          {JESUS_LETTERS.map((char, idx) => (
            <span
              key={idx}
              className={`inline-block transition-all duration-500 ease-out ${
                visibleLetters > idx
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-0 scale-50 translate-y-8'
              }`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              {char}
            </span>
          ))}
        </h1>
        {/* Carousel or all words */}
        {!carouselDone ? (
          <div className="relative h-[48px] flex items-center justify-center text-3xl md:text-4xl font-semibold mb-2 w-[220px] mx-auto overflow-x-hidden">
            {CAROUSEL_WORDS.map((word, idx) => (
              <span
                key={word}
                className={`absolute left-0 right-0 mx-auto text-[#FF602E] transition-all duration-500 ease-in-out
                  ${idx === carouselIdx && carouselAnim === 'in' ? 'opacity-100 scale-100' : ''}
                  ${idx === carouselIdx && carouselAnim === 'out' ? 'opacity-0 scale-75' : ''}
                  ${idx !== carouselIdx ? 'opacity-0 scale-75 pointer-events-none' : ''}
                `}
                style={{
                  transitionProperty: 'opacity, transform',
                }}
              >
                {word}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex gap-6 justify-center text-3xl md:text-4xl font-semibold mb-2">
            <span className="text-[#FF602E]">caring</span>
            <span className="text-[#FF602E]">calling</span>
            <span className="text-[#FF602E]">coming</span>
          </div>
        )}
        <p className="mt-6 text-base md:text-lg max-w-2xl mx-auto">
          Behold, I stand at the door and knock. If anyone hears My voice and opens the door, I will come in to him and dine with him, and he with Me. (Revelation 3:20)
        </p>
      </div>
    </section>
  );
} 