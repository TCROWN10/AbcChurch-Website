"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

const events = [
  {
    title: 'Sundays',
    time: '9am – 11am',
    thumbnail: '/Video-Image.png',
    videoUrl: '#',
    highlight: true,
  },
  {
    title: 'Upcoming Events',
    time: 'Soon',
    thumbnail: '/Connect-pic.png',
    videoUrl: '#',
    highlight: false,
  },
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

export default function EventsSection() {
  return (
    <section className="w-full bg-[#222A31] py-10 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-12">
        {/* Left: Event Video Cards */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-8 md:mb-0 w-full md:w-auto items-center justify-center">
          {events.map((event, idx) => (
            <motion.div
              key={event.title}
              className={`relative w-full max-w-xs sm:w-[220px] sm:h-[300px] md:w-[260px] md:h-[340px] h-[220px] rounded-xl overflow-hidden shadow-lg group bg-black ${idx === 0 ? 'mt-0' : 'mt-8 sm:mt-12'}`}
              variants={cardVariants}
              whileHover="hover"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <Image
                src={event.thumbnail}
                alt={event.title}
                fill
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              {/* Play Button Overlay - Only for Sundays card */}
              {event.highlight && (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <polygon points="8,5 19,12 8,19" fill="#FF602E" />
                    </svg>
                  </div>
                </motion.div>
              )}
              {/* Event Info - Bottom left corner */}
              <div className={`absolute left-4 ${event.title === 'Sundays' ? 'bottom-8' : 'bottom-2'}`}>
                <div className="text-[#FF602E] font-semibold text-base mb-1">{event.title}</div>
                <div className="text-white text-lg font-medium">{event.time}</div>
              </div>
            </motion.div>
          ))}
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