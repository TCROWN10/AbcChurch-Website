"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function WelcomePage() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/content/Welcome.png"
        alt="Welcome Background"
        fill
        className="object-cover w-full h-full z-0"
        priority
      />
      
      {/* Black Border */}
      <div className="absolute inset-0 border-4 sm:border-6 md:border-8 border-black pointer-events-none z-10" />
      
      {/* Background Doves */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 opacity-10">
          <svg width="40" height="30" className="sm:w-[60px] sm:h-[40px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 opacity-10">
          <svg width="40" height="30" className="sm:w-[60px] sm:h-[40px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-3 sm:px-4 py-4 sm:py-8">
        {/* Page Title */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#12677F] mb-2"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: [0, 180, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            WELCOME TO
          </motion.h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#12677F]">
            A.B.C CHURCH
          </h2>
        </div>

        {/* Logo */}
        <motion.div
          className="mb-6 sm:mb-8 md:mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotate: [0, -5, 5, -3, 3, 0],
            y: [0, -10, 0, -5, 0]
          }}
          transition={{ 
            duration: 2, 
            delay: 0.3,
            rotate: {
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            y: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.5
            }
          }}
          whileHover={{
            scale: 1.1,
            rotate: [0, -10, 10, -5, 5, 0],
            transition: { duration: 0.5 }
          }}
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 rgba(255, 96, 46, 0.4)",
                "0 0 20px rgba(255, 96, 46, 0.8)",
                "0 0 0 rgba(255, 96, 46, 0.4)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="rounded-full p-1 sm:p-2"
          >
            <Image
              src="/images/logos/BigLogo.png"
              alt="All Believers Christian Church Logo"
              width={300}
              height={300}
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64"
              priority
            />
          </motion.div>
        </motion.div>

        {/* J.E.S.U.S C.H.R.I.S.T Text and Continue Button */}
        <motion.div
          className="text-center mb-4 sm:mb-6 px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FF602E] mb-3 sm:mb-4 leading-tight">
            J.E.S.U.S C.H.R.I.S.T
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#6B6B6B] mb-3 sm:mb-4 font-normal">
            CARING CALLING COMING
          </p>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed mb-6 sm:mb-8">
            Jesus Christ is the same yesterday,<br />
            today, and forever.
          </p>
          <motion.button
            onClick={handleContinue}
            className="bg-[#FF602E] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue →
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
} 