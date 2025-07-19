"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

const contentVariants = {
  hidden: { 
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
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

export default function GetConnectedSection() {
  return (
    <section className="relative w-full h-[340px] xs:h-[380px] sm:h-[420px] md:h-[480px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/Get-Connected pic.jpg"
        alt="Get Connected Background"
        fill
        className="object-cover w-full h-full z-0"
        priority
      />
      {/* Linear Gradient Overlay */}
      <div className="absolute inset-0 z-10" style={{background: 'linear-gradient(180deg, #12141D 0%, #12141D00 100%)'}} />
      {/* Content */}
      <motion.div 
        className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center px-2 sm:px-4"
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 
          className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 sm:mb-6"
          variants={itemVariants}
        >
          Get Connected
        </motion.h2>
        <motion.p 
          className="text-white text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-4 sm:mb-8"
          variants={itemVariants}
        >
          You were never meant to walk alone. At All Believers Christian Church, we believe in building a strong community of faith where everyone feels seen, known, and loved.
        </motion.p>
        <motion.div 
          className="flex flex-col gap-3 sm:gap-4 mb-3 sm:mb-4 justify-center w-full max-w-xs mx-auto"
          variants={itemVariants}
        >
          <motion.a 
            href="/signin" 
            className="w-full px-6 py-3 rounded bg-[#FF602E] text-white font-semibold text-base shadow hover:opacity-90 transition"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Join a Group
          </motion.a>
          <motion.a 
            href="/signin" 
            className="w-full px-6 py-3 rounded border border-white text-white font-semibold text-base shadow hover:bg-white hover:text-[#12141D] transition"
            variants={buttonVariants}
            whileHover="hover"  
            whileTap="tap"
          >
            Volunteer
          </motion.a>
        </motion.div>
        <motion.div 
          className="text-white text-base"
          variants={itemVariants}
        >
          Need someone to pray with you?{' '}
          <motion.a 
            href="/signin" 
            className="text-[#FF602E] font-semibold underline hover:opacity-80"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Click here
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
} 