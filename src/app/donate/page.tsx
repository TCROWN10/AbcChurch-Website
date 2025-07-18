"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const paymentMethods = [
  'Debit/Credit Card, Apple Pay, Google Pay',
];
const givingCategories = [
  'Tithes',
  'Offerings',
  'Building Fund',
  'Missions',
];
const frequencies = [
  'Every Week',
  'Every Month',
  'Every Year',
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6
    }
  }
};

const heroVariants = {
  hidden: { 
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1
    }
  }
};

const formVariants = {
  hidden: { 
    opacity: 0,
    x: 50,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8
    }
  }
};

export default function DonatePage() {
  const router = useRouter();
  const [tab, setTab] = useState<'oneoff' | 'regular'>('oneoff');
  const [amount, setAmount] = useState('0.00');
  const [editingAmount, setEditingAmount] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [category, setCategory] = useState(givingCategories[0]);
  const [frequency, setFrequency] = useState(frequencies[1]);
  const amountInputRef = useRef<HTMLInputElement>(null);

  // Focus input when editingAmount becomes true
  useEffect(() => {
    if (editingAmount && amountInputRef.current) {
      amountInputRef.current.focus();
    }
  }, [editingAmount]);

  return (
    <motion.section 
      className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden pt-20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Image
        src="/BG.png"
        alt="Donation Hero Background"
        fill
        className="object-cover w-full h-full z-0"
        priority
      />
      {/* Heading */}
      <motion.div 
        className="absolute top-24 left-1/2 -translate-x-1/2 z-20 w-full flex justify-center pointer-events-none"
        variants={heroVariants}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Make Donation</h1>
      </motion.div>
      {/* Overlay Content */}
      <div className="relative z-20 w-full h-full flex items-center justify-center px-4 pt-24 md:pt-32">
        {/* Amount Overlay (left) */}
        <motion.div 
          className="flex-1 flex flex-col justify-center items-start h-full max-w-[400px] pl-4 md:pl-16"
          variants={itemVariants}
        >
          <motion.label
            htmlFor="amount"
            className="text-[#FF602E] text-lg md:text-xl font-semibold mb-2 cursor-pointer"
            onClick={() => setEditingAmount(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enter Donation Amount
          </motion.label>
          {editingAmount ? (
            <motion.input
              ref={amountInputRef}
              id="amount"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              onBlur={() => setEditingAmount(false)}
              className="text-[3.5rem] md:text-[5.5rem] font-bold text-[#787878] bg-transparent outline-none focus:ring-0 w-full max-w-[320px] border-0 shadow-none appearance-none no-spinners"
              style={{ lineHeight: 1, padding: 0 }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.div
              className="text-[3.5rem] md:text-[5.5rem] font-bold select-none leading-none cursor-pointer"
              style={{ color: '#787878' }}
              onClick={() => setEditingAmount(true)}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setEditingAmount(true); }}
              role="button"
              aria-label="Edit donation amount"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ${amount || '0.00'}
            </motion.div>
          )}
        </motion.div>
        {/* Form Overlay (right) */}
        <motion.div 
          className="flex-1 flex flex-col justify-center items-end h-full max-w-[600px] pr-4 md:pr-16"
          variants={formVariants}
        >
          <motion.div 
            className="w-full max-w-xl min-w-[320px] bg-[#313131b3] rounded-lg shadow-2xl p-8 backdrop-blur-xl border border-white/10 flex flex-col gap-4 transition-all duration-300 mt-8 md:mt-12"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Tabs */}
            <motion.div 
              className="flex mb-6"
              variants={itemVariants}
            >
              <motion.button
                className={`flex-1 py-2 font-semibold rounded-tl-lg rounded-tr-none rounded-bl-lg rounded-br-none transition text-base ${tab === 'oneoff' ? 'bg-[#FF602E] text-white' : 'bg-transparent text-white/80 border-b-2 border-white/30'}`}
                onClick={() => setTab('oneoff')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Give One-Off
              </motion.button>
              <motion.button
                className={`flex-1 py-2 font-semibold rounded-tr-lg rounded-tl-none rounded-br-lg rounded-bl-none transition text-base ${tab === 'regular' ? 'bg-[#FF602E] text-white' : 'bg-transparent text-white/80 border-b-2 border-white/30'}`}
                onClick={() => setTab('regular')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Regular Donation
              </motion.button>
            </motion.div>
            {/* Payment Method */}
            <motion.div 
              className="mb-4 relative"
              variants={itemVariants}
            >
              <label htmlFor="paymentMethod" className="block text-white/80 font-medium mb-1">Payment Method <span className="text-xs text-white/60">(Handled via Stripe once user clicks submit)</span></label>
              <div className="relative">
                <select
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-800 border-none shadow-lg focus:ring-2 focus:ring-[#FF602E] outline-none appearance-none pr-10 text-base font-semibold transition"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                >
                  {paymentMethods.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
                {/* Custom dropdown arrow */}
                <div className="pointer-events-none absolute top-1/2 right-4 transform -translate-y-1/2 text-[#FF602E] text-xl">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M6 8l4 4 4-4" stroke="#FF602E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </motion.div>
            {/* Giving Category */}
            <motion.div 
              className="mb-4"
              variants={itemVariants}
            >
              <label htmlFor="category" className="block text-white/80 font-medium mb-1">Giving Category</label>
              <select
                id="category"
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-4 py-2 rounded bg-white/80 text-gray-800 border-none focus:ring-2 focus:ring-[#FF602E] outline-none"
              >
                {givingCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </motion.div>
            {/* Frequency for Regular Donation */}
            {tab === 'regular' && (
              <motion.div 
                className="mb-4"
                variants={itemVariants}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-white/80 font-medium mb-1">Frequency</label>
                <div className="flex gap-2">
                  {frequencies.map(freq => (
                    <motion.button
                      key={freq}
                      type="button"
                      className={`px-4 py-2 rounded font-semibold text-sm transition border border-white/30 ${frequency === freq ? 'bg-[#FF602E] text-white' : 'bg-transparent text-white/80'}`}
                      onClick={() => setFrequency(freq)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {freq}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
            {/* Amount Input (hidden, controlled by left overlay) */}
            <input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              placeholder="$0.00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="hidden"
              tabIndex={-1}
              aria-hidden="true"
            />
            <motion.button
              type="button"
              onClick={() => router.push('/signin')}
              className="w-full mt-4 bg-[#FF602E] text-white px-6 py-3 rounded font-semibold text-base shadow hover:opacity-90 transition"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(255, 96, 46, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Submit
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      <style jsx global>{`
        input[type=number].no-spinners::-webkit-inner-spin-button,
        input[type=number].no-spinners::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number].no-spinners {
          -moz-appearance: textfield;
          appearance: textfield;
        }
      `}</style>
    </motion.section>
  );
} 