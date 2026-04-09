"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const SUNDAY_FLIER_IMAGES = ['/Sunday-Flier.jpeg', '/Sunday-Flier-2.jpeg'] as const;
const ROTATE_MS = 5000;

const sundayEvent = {
  title: 'Sundays',
  time: '10am – 11:30am',
};

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

export default function EventsSection() {
  const [flierIndex, setFlierIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setFlierIndex((i) => (i + 1) % SUNDAY_FLIER_IMAGES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

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
            {SUNDAY_FLIER_IMAGES.map((src, i) => (
              <div
                key={src}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  i === flierIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <Image
                  src={src}
                  alt={`Sunday service — flier ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 260px"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  priority={i === 0}
                />
              </div>
            ))}
            {/* Event Info - Bottom left corner */}
            <div className="absolute left-4 bottom-8 z-30">
              <div className="text-[#FF602E] font-semibold text-base mb-1">{sundayEvent.title}</div>
              <div className="text-[#FF602E] text-lg font-medium">{sundayEvent.time}</div>
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