"use client";
import { motion } from 'framer-motion';
import HeroWithNavbar from "../components/HeroWithNavbar";
import JoinUsSection from "../components/Message";
import EventsSection from "../components/EventsSection";
import DonationSection from "../components/DonationSection";
import GetConnectedSection from "../components/GetConnectedSection";

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

export default function HomePage() {
  return (
    <motion.div 
      className="relative min-h-screen bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <HeroWithNavbar />
      <main>
        <motion.div variants={sectionVariants}>
          <JoinUsSection />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <EventsSection />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <DonationSection />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <GetConnectedSection />
        </motion.div>
      </main>
    </motion.div>
  );
} 