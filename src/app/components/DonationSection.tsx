"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

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
    x: -50
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8
    }
  }
};

const imageVariants = {
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

export default function DonationSection() {
  return (
    <section className="relative w-full bg-[#F8F8F8] py-16 px-4 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/Donation-Background.png"
        alt="Donation Section Background"
        fill
        className="object-cover w-full h-full z-0 pointer-events-none select-none"
        priority
      />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
        {/* Left: Donation Info */}
        <motion.div 
          className="flex-1 flex flex-col items-start justify-center mb-8 md:mb-0"
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-8" 
            style={{ color: '#FF602E' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Make Donation
          </motion.h2>
          <div className="flex flex-col gap-6 w-full max-w-md">
            {/* Card 1 */}
            <motion.div 
              className="flex items-start gap-4 bg-[#425A60] rounded-lg shadow-lg p-6 w-full"
              variants={cardVariants}
              whileHover="hover"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="flex-shrink-0 mt-1">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#fff" opacity=".15"/><path d="M12 17a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1zm0-10a5 5 0 0 0-5 5c0 2.5 2.5 4.5 4.5 7.5.3.5 1.2.5 1.5 0C14.5 16.5 17 14.5 17 12a5 5 0 0 0-5-5zm0 6.5A1.5 1.5 0 1 1 12 8a1.5 1.5 0 0 1 0 3.5z" fill="#fff"/></svg>
              </div>
              <div>
                <div className="text-white font-bold text-xl mb-1">Secure Giving Portal</div>
                <div className="text-white text-opacity-80 text-base">Give with confidence through our safe and reliable online platform.</div>
              </div>
            </motion.div>
            {/* Card 2 */}
            <motion.div 
              className="flex items-start gap-4 bg-[#425A60] rounded-lg shadow-lg p-6 w-full"
              variants={cardVariants}
              whileHover="hover"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="flex-shrink-0 mt-1">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#fff" opacity=".15"/><path d="M12 17.27l-5.18-4.73A2 2 0 0 1 6 10.18V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3.18a2 2 0 0 1-.82 1.36L12 17.27zM12 15l4.55-4.15A.5.5 0 0 0 16.5 10H7.5a.5.5 0 0 0-.32.85L12 15z" fill="#fff"/></svg>
              </div>
              <div>
                <div className="text-white font-bold text-xl mb-1">Giving Categories</div>
                <div className="text-white text-opacity-80 text-base">Choose where your gift goes — from tithes to missions and outreach efforts.</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        {/* Right: Donation Box Image */}
        <motion.div 
          className="flex-1 flex items-center justify-center"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="rounded-2xl overflow-hidden shadow-lg w-[370px] h-[340px] md:w-[420px] md:h-[380px] bg-[#fff] flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/Donation-pic.png"
              alt="Donation Box"
              width={420}
              height={380}
              className="object-cover w-full h-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 