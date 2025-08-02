"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { DonationFormData, CheckoutRequest, CheckoutResponse, DonationError, DonationErrorType } from '@/types/stripe';
import { validateDonationForm, formatCurrency } from '@/lib/stripe/stripe-helpers';

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
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string>('');
  const amountInputRef = useRef<HTMLInputElement>(null);

  // Focus input when editingAmount becomes true
  useEffect(() => {
    if (editingAmount && amountInputRef.current) {
      amountInputRef.current.focus();
    }
  }, [editingAmount]);

  // Clear errors when form data changes
  useEffect(() => {
    if (Object.keys(errors).length > 0 || generalError) {
      setErrors({});
      setGeneralError('');
    }
  }, [amount, category, tab, frequency, email]);

  // Helper function to convert frequency display to API format
  const getFrequencyValue = (displayFreq: string): string => {
    switch (displayFreq) {
      case 'Every Week':
        return 'weekly';
      case 'Every Month':
        return 'monthly';
      case 'Every Year':
        return 'yearly';
      default:
        return 'monthly';
    }
  };

  // Form submission handler
  const handleSubmit = async () => {
    setIsLoading(true);
    setErrors({});
    setGeneralError('');

    try {
      // Prepare form data
      const formData: DonationFormData = {
        amount: parseFloat(amount) || 0,
        category: category as 'Tithes' | 'Offerings' | 'Building Fund' | 'Missions',
        type: tab === 'oneoff' ? 'oneoff' : 'recurring',
        frequency: tab === 'regular' ? getFrequencyValue(frequency) as 'weekly' | 'monthly' | 'yearly' : undefined,
        email: email.trim() || undefined,
      };

      // Validate form data
      const validation = validateDonationForm(formData);
      if (!validation.isValid) {
        setErrors(validation.errors);
        setIsLoading(false);
        return;
      }

      // Prepare API request
      const checkoutRequest: CheckoutRequest = {
        amount: formData.amount,
        category: formData.category,
        type: formData.type === 'oneoff' ? 'payment' : 'subscription',
        frequency: formData.frequency,
        email: formData.email,
      };

      // Make API call to create checkout session
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutRequest),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle API errors
        if (data.details && typeof data.details === 'object') {
          setErrors(data.details);
        } else {
          setGeneralError(data.error || 'An error occurred while processing your donation');
        }
        setIsLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      const checkoutResponse: CheckoutResponse = data;
      window.location.href = checkoutResponse.url;

    } catch (error) {
      console.error('Donation submission error:', error);
      setGeneralError('Network error. Please check your connection and try again.');
      setIsLoading(false);
    }
  };

  return (
    <motion.section 
      className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-center overflow-x-hidden pt-20 pb-8 px-2 sm:px-4"
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
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Make Donation</h1>
      </motion.div>
      {/* Overlay Content */}
      <div className="relative z-20 w-full flex flex-col md:flex-row items-center justify-center gap-8 pt-32 md:pt-32">
        {/* Amount Overlay (top on mobile, left on desktop) */}
        <motion.div 
          className="w-full md:w-1/2 flex flex-col justify-center items-start max-w-[400px] mx-auto md:mx-0 md:pl-8"
          variants={itemVariants}
        >
          <motion.label
            htmlFor="amount"
            className={`text-[#FF602E] text-lg md:text-xl font-semibold mb-2 cursor-pointer ${errors.amount ? 'text-red-400' : ''}`}
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
          {errors.amount && (
            <motion.p 
              className="text-red-400 text-sm mt-2 max-w-[320px]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {errors.amount}
            </motion.p>
          )}
        </motion.div>
        {/* Form Overlay (bottom on mobile, right on desktop) */}
        <motion.div 
          className="w-full md:w-1/2 flex flex-col justify-center items-end max-w-[600px] mx-auto md:mx-0 md:pr-8"
          variants={formVariants}
        >
          <motion.div 
            className="w-full max-w-lg min-w-[200px] bg-[#313131b3] rounded-lg shadow-2xl p-3 sm:p-6 backdrop-blur-xl border border-white/10 flex flex-col gap-2 sm:gap-3 transition-all duration-300 mt-6 md:mt-12"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Tabs */}
            <motion.div 
              className="flex mb-4"
              variants={itemVariants}
            >
              <motion.button
                className={`flex-1 py-1.5 font-semibold rounded-tl-lg rounded-tr-none rounded-bl-lg rounded-br-none transition text-sm ${tab === 'oneoff' ? 'bg-[#FF602E] text-white' : 'bg-transparent text-white/80 border-b-2 border-white/30'}`}
                onClick={() => setTab('oneoff')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Give One-Off
              </motion.button>
              <motion.button
                className={`flex-1 py-1.5 font-semibold rounded-tr-lg rounded-tl-none rounded-br-lg rounded-bl-none transition text-sm ${tab === 'regular' ? 'bg-[#FF602E] text-white' : 'bg-transparent text-white/80 border-b-2 border-white/30'}`}
                onClick={() => setTab('regular')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Regular Donation
              </motion.button>
            </motion.div>
            {/* Payment Method */}
            <motion.div 
              className="mb-3 relative"
              variants={itemVariants}
            >
              <label htmlFor="paymentMethod" className="block text-white/80 font-medium mb-1 text-sm">Payment Method <span className="text-xs text-white/60">(Handled via Stripe once user clicks submit)</span></label>
              <div className="relative">
                <select
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/90 text-gray-800 border-none shadow-lg focus:ring-2 focus:ring-[#FF602E] outline-none appearance-none pr-10 text-sm font-semibold transition"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                >
                  {paymentMethods.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
                {/* Custom dropdown arrow */}
                <div className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2 text-[#FF602E] text-lg">
                  <svg width="16" height="16" fill="none" viewBox="0 0 20 20"><path d="M6 8l4 4 4-4" stroke="#FF602E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </motion.div>
            {/* Giving Category */}
            <motion.div 
              className="mb-3"
              variants={itemVariants}
            >
              <label htmlFor="category" className="block text-white/80 font-medium mb-1 text-sm">Giving Category</label>
              <select
                id="category"
                value={category}
                onChange={e => setCategory(e.target.value)}
                className={`w-full px-3 py-1.5 rounded bg-white/80 text-gray-800 border-none focus:ring-2 focus:ring-[#FF602E] outline-none text-sm ${errors.category ? 'ring-2 ring-red-500' : ''}`}
              >
                {givingCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && (
                <motion.p 
                  className="text-red-400 text-xs mt-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.category}
                </motion.p>
              )}
            </motion.div>
            {/* Frequency for Regular Donation */}
            {tab === 'regular' && (
              <motion.div 
                className="mb-3"
                variants={itemVariants}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-white/80 font-medium mb-1 text-sm">Frequency</label>
                <div className="flex gap-1">
                  {frequencies.map(freq => (
                    <motion.button
                      key={freq}
                      type="button"
                      className={`px-2 py-1 rounded font-semibold text-xs transition border border-white/30 ${frequency === freq ? 'bg-[#FF602E] text-white' : 'bg-transparent text-white/80'} ${errors.frequency ? 'border-red-500' : ''}`}
                      onClick={() => setFrequency(freq)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {freq}
                    </motion.button>
                  ))}
                </div>
                {errors.frequency && (
                  <motion.p 
                    className="text-red-400 text-xs mt-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.frequency}
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* Email Field */}
            <motion.div 
              className="mb-3"
              variants={itemVariants}
            >
              <label htmlFor="email" className="block text-white/80 font-medium mb-1 text-sm">
                Email Address {tab === 'regular' && <span className="text-red-400">*</span>}
                <span className="text-xs text-white/60 block">For donation receipts and confirmations</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className={`w-full px-3 py-1.5 rounded bg-white/80 text-gray-800 border-none focus:ring-2 focus:ring-[#FF602E] outline-none text-sm ${errors.email ? 'ring-2 ring-red-500' : ''}`}
              />
              {errors.email && (
                <motion.p 
                  className="text-red-400 text-xs mt-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>
            {/* General Error Display */}
            {generalError && (
              <motion.div 
                className="mb-3 p-2 bg-red-500/20 border border-red-500/50 rounded text-red-400 text-xs"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {generalError}
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
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full mt-3 px-4 py-2 rounded font-semibold text-sm shadow transition relative ${
                isLoading 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-[#FF602E] hover:opacity-90'
              } text-white`}
              variants={itemVariants}
              whileHover={!isLoading ? { 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(255, 96, 46, 0.3)"
              } : {}}
              whileTap={!isLoading ? { scale: 0.95 } : {}}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <motion.div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Processing...
                </div>
              ) : (
                `Submit ${tab === 'oneoff' ? 'Donation' : 'Subscription'}`
              )}
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