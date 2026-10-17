"use client";
import { motion } from 'framer-motion';
import HeroWithNavbar from "@/components/layout/HeroWithNavbar";
import JoinUsSection from "@/components/ui/Message";
import EventsSection from "@/components/sections/EventsSection";
import DonationSection from "@/components/sections/DonationSection";
import GetConnectedSection from "@/components/sections/GetConnectedSection";
import GallerySection from "@/components/sections/GallerySection";
import type { ChurchEvent, HeroSettings, MediaItem } from '@/lib/content-types';

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

interface HomeContentProps {
  hero: HeroSettings;
  events: ChurchEvent[];
  gallery: MediaItem[];
}

export default function HomeContent({ hero, events, gallery }: HomeContentProps) {
  return (
    <motion.div
      className="relative min-h-screen bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <HeroWithNavbar hero={hero} />
      <main>
        <motion.div variants={sectionVariants}>
          <JoinUsSection />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <EventsSection events={events} />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <GallerySection items={gallery} />
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
