"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import type { ChurchEvent } from '@/lib/content-types';

const ROTATE_MS = 5000;

const FALLBACK_EVENTS: Pick<ChurchEvent, 'id' | 'title' | 'time' | 'flierImage' | 'location' | 'date' | 'description'>[] = [
  { id: 'sunday-1', title: 'Sundays', time: '10am – 11:30am', flierImage: '/Sunday-Flier.jpeg' },
  { id: 'sunday-2', title: 'Sundays', time: '10am – 11:30am', flierImage: '/Sunday-Flier-2.jpeg' },
];

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3
    }
  }
};

const contentVariants = {
  hidden: { 
    opacity: 0,
    x: 50
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8
    }
  }
};

export default function EventsSection({ events }: { events?: ChurchEvent[] }) {
  const slides = (events?.filter(e => e.flierImage).length ? events.filter(e => e.flierImage) : FALLBACK_EVENTS);
  const [flierIndex, setFlierIndex] = useState(0);
  const current = slides[flierIndex % slides.length];

  useEffect(() => {
    if (slides.length < 2) return;
    const id = window.setInterval(() => {
      setFlierIndex((i) => (i + 1) % slides.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <section className="w-full bg-[#222A31] py-10 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-12">
        {/* Left: Event card — Sunday fliers rotate */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-8 md:mb-0 w-full md:w-auto items-center justify-center">
          <motion.div
            className="relative w-full max-w-xs sm:w-[220px] sm:h-[300px] md:w-[260px] md:h-[340px] h-[220px] rounded-xl overflow-hidden shadow-lg group bg-black mt-0"
            variants={cardVariants}
            whileHover="hover"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {slides.map((event, i) => (
              <div
                key={event.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  i === flierIndex % slides.length ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <Image
                  src={event.flierImage!}
                  alt={`${event.title} flier`}
                  fill
                  sizes="(max-width: 640px) 100vw, 260px"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  priority={i === 0}
                  unoptimized={event.flierImage!.startsWith('http')}
                />
              </div>
            ))}
            {/* Event Info - Bottom left corner */}
            <div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-black/80 to-transparent px-4 pb-5 pt-10">
              <div className="text-[#FF602E] font-semibold text-base mb-0.5">{current.title}</div>
              {(current.date || current.time) && (
                <div className="text-white text-sm font-medium">
                  {[current.date, current.time].filter(Boolean).join(' · ')}
                </div>
              )}
              {current.location && <div className="text-white/70 text-xs mt-0.5">{current.location}</div>}
            </div>
          </motion.div>
        </div>
        {/* Right: Description */}
        <motion.div 
          className="flex-1 flex flex-col items-center md:items-start justify-center text-center md:text-left"
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Upcoming Events
          </motion.h2>
          <motion.p 
            className="text-[#B0B8C1] text-sm sm:text-base md:text-lg mb-4 sm:mb-8 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Stay connected and spiritually refreshed by joining our upcoming gatherings, special services, and community outreach programs.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
} 