"use client";
import { motion } from 'framer-motion';
import React from 'react';

const contentVariants = {
  hidden: { 
    opacity: 0,
    x: -50
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const mapVariants = {
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

const buttonVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.95
  }
};

export default function Message() {
  return (
    <section className="w-full bg-[#F8F8F8] py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left: Text */}
        <motion.div 
          className="flex-1 flex flex-col items-start justify-center mb-8 md:mb-0"
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4" 
            style={{ color: '#FF602EB2' }}
            variants={itemVariants}
          >
            Join Us For Worship
          </motion.h2>
          <motion.div 
            className="text-[#425A60] text-xl mb-2"
            variants={itemVariants}
          >
            Sundays
          </motion.div>
          <motion.div 
            className="text-3xl md:text-4xl font-bold text-[#284747] mb-4"
            variants={itemVariants}
          >
            9am – 11am
          </motion.div>
          <motion.div 
            className="flex items-center gap-2 mb-6"
            variants={itemVariants}
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="#6BCB77" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>
            <div>
              <span className="italic text-[#7A8A99] font-semibold">Bettendorf Community Center</span><br />
              <span className="text-[#7A8A99] text-base">2204 Grant St, Bettendorf IA, 52722</span>
            </div>
          </motion.div>
          <motion.a
            href="https://maps.google.com/?q=2204+Grant+St,+Bettendorf+IA,+52722"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-8 py-3 rounded bg-[#FF602E] text-white font-semibold text-base shadow hover:opacity-90 transition"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Get Directions
          </motion.a>
        </motion.div>
        {/* Right: Embedded Google Map */}
        <motion.div 
          className="flex-1 flex items-center justify-center"
          variants={mapVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="rounded-2xl overflow-hidden shadow-lg w-[370px] h-[320px] md:w-[420px] md:h-[340px] bg-[#dbeafe] flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <iframe
              title="Bettendorf Community Center Map"
              src="https://www.google.com/maps?q=2204+Grant+St,+Bettendorf+IA,+52722&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 