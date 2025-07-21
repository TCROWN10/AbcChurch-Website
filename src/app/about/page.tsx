"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import AboutSection from '../components/AboutSection';
import VisionMissionSection from '../components/VisionMissionSection';
import CoreBeliefsSection from '../components/CoreBeliefsSection';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.3
    }
  }
};

const heroVariants = {
  hidden: { 
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1
    }
  }
};

const contentVariants = {
  hidden: { 
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8
    }
  }
};

export default function AboutPage() {
  return (
    <motion.div 
      className="relative min-h-screen bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <motion.section
        className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden pt-20"
        variants={heroVariants}
      >
        <Image
          src="/Hero-page.png"
          alt="About Hero Background"
          fill
          className="object-cover w-full h-full z-0"
          priority
        />
        <motion.div 
          className="relative z-10 text-center text-white px-4 flex flex-col items-center w-full"
          variants={contentVariants}
        >
          <motion.span 
            className="text-base md:text-lg font-medium mb-2 drop-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            About All Believers Christian Church
          </motion.span>
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-2 drop-shadow-lg text-[#F98B68]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            About Us
          </motion.h1>
          <motion.p 
            className="text-sm md:text-base font-semibold drop-shadow mb-2 max-w-4xl mx-auto leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            All Believers Christian Church is a full gospel church devoted to inter-denominational revival of Apostolic signs, demonstrations of Holy Ghost power and a delivery of the salvation message of our Lord Jesus Christ to all men irrespective of colour, race or nation.
            <br />
            We invite you to worship with us for a power packed service and an unforgettable experience of the love of God.
          </motion.p>
        </motion.div>
      </motion.section>
      <main>
        <motion.div variants={contentVariants}>
          <VisionMissionSection />
        </motion.div>
        <motion.div variants={contentVariants}>
        <AboutSection />
        </motion.div>
        <motion.div variants={contentVariants}>
          <CoreBeliefsSection />
        </motion.div>
      </main>
    </motion.div>
  );
} 