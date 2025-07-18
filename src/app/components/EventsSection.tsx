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
    <section className="w-full bg-[#222A31] py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left: Event Video Cards */}
        <div className="flex flex-row gap-6 mb-8 md:mb-0">
          {events.map((event, idx) => (
            <motion.div
              key={event.title}
              className={`relative w-[260px] h-[340px] rounded-xl overflow-hidden shadow-lg group bg-black ${
                idx === 0 ? 'mt-0' : 'mt-8'
              }`}
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
              {/* Play Button Overlay */}
              {event.highlight && (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="16" fill="white" />
                      <polygon points="13,11 23,16 13,21" fill="#FF602E" />
                    </svg>
                  </div>
                </motion.div>
              )}
              {/* Event Info */}
              <div className="absolute left-0 bottom-0 w-full p-5 bg-gradient-to-t from-black/70 to-transparent">
                <div className="text-[#FF602E] font-semibold text-base mb-1">{event.title}</div>
                <div className="text-white text-lg font-medium opacity-80">{event.time}</div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Right: Description */}
        <motion.div 
          className="flex-1 flex flex-col items-start justify-center"
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Upcoming Events
          </motion.h2>
          <motion.p 
            className="text-[#B0B8C1] text-base md:text-lg mb-8 max-w-md"
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