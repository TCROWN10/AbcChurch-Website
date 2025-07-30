"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import EventsSection from "../components/EventsSection";
import StepsGrid from '../components/StepsGrid';

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

const sectionVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8
    }
  }
};

export default function MessagePage() {
  return (
    <motion.div 
      className="relative min-h-screen bg-[#232B33] flex flex-col"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden pt-16 md:pt-20">
        <Image
          src="/Hero-page.png"
          alt="Join Live Service Hero Background"
          fill
          className="object-cover w-full h-full z-0"
          priority
        />
        <div className="relative z-10 text-center text-white px-4 md:px-6 flex flex-col items-center w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 drop-shadow-lg">Join Live Service</h1>
          <button className="mt-4 bg-[#FF602E] text-white px-6 py-3 rounded-full font-semibold text-base md:text-lg shadow-lg flex items-center gap-2">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-play md:w-6 md:h-6"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            Watch Live
          </button>
        </div>
      </section>

      {/* Upcoming Events Section - Using the same component as home page */}
      <motion.div variants={sectionVariants}>
        <EventsSection />
      </motion.div>

      {/* Steps to Being Born Again Section */}
      <StepsGrid />
    </motion.div>
  );
} 