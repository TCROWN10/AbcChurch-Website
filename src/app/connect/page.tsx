"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

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

const formVariants = {
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

export default function ConnectPage() {
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
          src="/Connect-page.png"
          alt="Get Connected Hero Background"
          fill
          className="object-cover w-full h-full z-0"
          priority
        />
        <motion.div 
          className="relative z-10 text-center text-white px-4 flex flex-col items-center w-full"
          variants={contentVariants}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-2 drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Get Connected
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl font-medium drop-shadow mb-6 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Be part of something greater. Join a group, serve, or share your story. Your testimony could inspire someone and show them what God can do in a life filled with faith.
          </motion.p>
          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.button 
              onClick={() => window.location.href = '/signin'}
              className="bg-[#FF602E] text-white px-6 py-2 rounded font-semibold text-base shadow hover:opacity-90 transition"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Join a Group
            </motion.button>
            <motion.button 
              onClick={() => window.location.href = '/signin'}
              className="bg-white text-[#313131] px-6 py-2 rounded font-semibold text-base shadow hover:opacity-90 transition border border-white"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Volunteer
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>
      {/* Prayer Request Section */}
      <motion.section 
        className="py-16 px-4 max-w-6xl mx-auto"
        variants={contentVariants}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#F98B68]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Prayer request
        </motion.h2>
        <div className="flex flex-col md:flex-row items-center gap-10">
          <motion.div 
            className="w-full md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Image
              src="/Prayer-image.png"
              alt="Prayer Request"
              width={400}
              height={400}
              className="rounded-lg object-cover"
            />
          </motion.div>
          <motion.form 
            className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md flex flex-col gap-4"
            variants={formVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="fullName" className="font-medium text-gray-700">Full Name</label>
              <input id="fullName" type="text" placeholder="Enter your full name" className="border border-gray-300 rounded px-4 py-2" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-medium text-gray-700">Email</label>
              <input id="email" type="email" placeholder="Enter your email address" className="border border-gray-300 rounded px-4 py-2" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="subject" className="font-medium text-gray-700">Subject</label>
              <input id="subject" type="text" placeholder="Enter a subject" className="border border-gray-300 rounded px-4 py-2" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="prayerRequest" className="font-medium text-gray-700">Prayer Request</label>
              <textarea id="prayerRequest" placeholder="Type your prayer request here" className="border border-gray-300 rounded px-4 py-2 min-h-[100px]" />
            </div>
            <motion.button 
              type="button" 
              onClick={() => window.location.href = '/signin'}
              className="bg-[#FF602E] text-white px-6 py-2 rounded font-semibold text-base shadow hover:opacity-90 transition self-end"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit
            </motion.button>
          </motion.form>
        </div>
      </motion.section>
    </motion.div>
  );
} 