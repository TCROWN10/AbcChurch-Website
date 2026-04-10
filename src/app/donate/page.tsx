"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCreateCheckoutMutation, useCreateGuestCheckoutMutation } from '@/store';
import type { DonationType } from '@/types/api';

function donationCheckoutErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'data' in error) {
    const raw = (error as { data: unknown }).data;
    if (typeof raw === 'string' && raw.trim()) {
      return raw;
    }
    if (raw && typeof raw === 'object') {
      const o = raw as Record<string, unknown>;
      if (typeof o.message === 'string' && o.message.trim()) {
        return o.message;
      }
      const inner = o.data;
      if (inner && typeof inner === 'object' && typeof (inner as { message?: string }).message === 'string') {
        const im = (inner as { message: string }).message;
        if (im.trim()) return im;
      }
    }
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return 'An error occurred. Please try again.';
}

const GIVING_CATEGORY_TO_API: Record<
  string,
  { type: DonationType; displayCategory: string }
> = {
  Tithes: { type: 'TITHE', displayCategory: 'Tithes' },
  Offerings: { type: 'OFFERING', displayCategory: 'Offerings' },
  'Building Fund': { type: 'DONATION', displayCategory: 'Building Fund' },
  Missions: { type: 'DONATION', displayCategory: 'Missions' },
};

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

const API_FREQ_TO_DISPLAY: Record<string, string> = {
  weekly: 'Every Week',
  monthly: 'Every Month',
  yearly: 'Every Year',
};

export default function DonatePage() {
  const searchParams = useSearchParams();
  const [createCheckout, { isLoading: checkoutLoading }] = useCreateCheckoutMutation();
  const [createGuestCheckout, { isLoading: guestCheckoutLoading }] = useCreateGuestCheckoutMutation();
  const [hasAuthToken, setHasAuthToken] = useState(false);
  const [donorMode, setDonorMode] = useState<'account' | 'guest'>('guest');
  const [tab, setTab] = useState<'oneoff' | 'regular'>('oneoff');
  const [amount, setAmount] = useState('0.00');
  const [editingAmount, setEditingAmount] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [category, setCategory] = useState(givingCategories[0]);
  const [frequency, setFrequency] = useState(frequencies[1]);
  const [email, setEmail] = useState('');
  const [guestName, setGuestName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isSubmitting = isLoading || checkoutLoading || guestCheckoutLoading;
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
  }, [amount, category, tab, frequency, email, guestName, donorMode]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    const isAuthed = Boolean(token);
    setHasAuthToken(isAuthed);
    setDonorMode(isAuthed ? 'account' : 'guest');
  }, []);

  // Pre-fill after Stripe cancel (see donate/cancel query params)
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && givingCategories.includes(cat)) {
      setCategory(cat);
    }
    const amt = searchParams.get('amount');
    if (amt) {
      const n = parseFloat(amt);
      if (Number.isFinite(n) && n > 0) {
        setAmount(n.toFixed(2));
      }
    }
    const em = searchParams.get('email');
    if (em?.trim()) {
      setEmail(em.trim());
    }
    const freqParam = searchParams.get('frequency');
    if (freqParam && API_FREQ_TO_DISPLAY[freqParam]) {
      setFrequency(API_FREQ_TO_DISPLAY[freqParam]);
      setTab('regular');
    }
  }, [searchParams]);

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

  // Form submission handler — checkout is created on the Nest API (via /api/proxy)
  const handleSubmit = async () => {
    setIsLoading(true);
    setErrors({});
    setGeneralError('');

    try {
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
          : null;

      const amountDollars = parseFloat(amount);
      if (!Number.isFinite(amountDollars) || amountDollars <= 0) {
        setErrors({ amount: 'Please enter a valid donation amount' });
        setIsLoading(false);
        return;
      }

      const categoryMap = GIVING_CATEGORY_TO_API[category];
      if (!categoryMap) {
        setErrors({ category: 'Please choose a giving category' });
        setIsLoading(false);
        return;
      }
      if (donorMode === 'guest' && !email.trim()) {
        setErrors({ email: 'Please enter your email address' });
        setIsLoading(false);
        return;
      }

      const payload = {
        amount: amountDollars,
        type: categoryMap.type,
        currency: 'USD' as const,
        isRecurring: tab === 'regular',
        recurringPeriod:
          tab === 'regular'
            ? (getFrequencyValue(frequency) as 'weekly' | 'monthly' | 'yearly')
            : undefined,
        displayCategory: categoryMap.displayCategory,
        ...(typeof window !== 'undefined' && window.location?.origin
          ? { clientOrigin: window.location.origin }
          : {}),
      };

      const useAccountMode = donorMode === 'account' && Boolean(token);

      const data = useAccountMode
        ? await createCheckout(payload).unwrap()
        : await createGuestCheckout({
            ...payload,
            email: email.trim(),
            guestName: guestName.trim() || undefined,
          }).unwrap();

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      throw new Error('Checkout URL was not returned. Please try again.');
    } catch (error: unknown) {
      console.error('Donation submission error:', error);
      setGeneralError(donationCheckoutErrorMessage(error));
    } finally {
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
        src="/images/backgrounds/BG.png"
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
        <div className="absolute top-28 left-1/2 -translate-x-1/2 z-30 w-full max-w-lg px-4">
          <div className="rounded-lg bg-black/50 text-white text-sm px-4 py-3 backdrop-blur-sm border border-white/10">
            <span className="font-semibold">Guest checkout available.</span>{' '}
            You can give as a guest with your email or{' '}
            <Link href="/signin" className="text-[#FF602E] underline font-medium">
              Sign in
            </Link>{' '}
            to link donations to your account.
          </div>
        </div>
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
              className="w-full max-w-lg min-w-[200px] bg-[#313131b3] rounded-lg shadow-2xl p-3 sm:p-6 backdrop-blur-xl border border-white/10 flex flex-col gap-2 sm:gap-3 transition-all duration-300 mt-24 md:mt-28"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Tabs */}
            <motion.div 
              className="flex mb-4"
              variants={itemVariants}
            >
              {hasAuthToken && (
                <div className="w-full mb-3 rounded border border-white/20 p-2">
                  <p className="text-white/80 text-xs mb-2">Donor Mode</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setDonorMode('account')}
                      className={`flex-1 py-1.5 rounded text-xs font-semibold ${donorMode === 'account' ? 'bg-[#FF602E] text-white' : 'bg-white/10 text-white/80'}`}
                    >
                      Signed-in account
                    </button>
                    <button
                      type="button"
                      onClick={() => setDonorMode('guest')}
                      className={`flex-1 py-1.5 rounded text-xs font-semibold ${donorMode === 'guest' ? 'bg-[#FF602E] text-white' : 'bg-white/10 text-white/80'}`}
                    >
                      Guest checkout
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
            <motion.div className="flex mb-4" variants={itemVariants}>
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
            {donorMode === 'guest' && (
              <motion.div className="mb-3" variants={itemVariants}>
                <label htmlFor="guestName" className="block text-white/80 font-medium mb-1 text-sm">
                  Full Name (optional)
                </label>
                <input
                  id="guestName"
                  type="text"
                  value={guestName}
                  onChange={e => setGuestName(e.target.value)}
                  placeholder="Guest Donor"
                  className="w-full px-3 py-1.5 rounded bg-white/80 text-gray-800 border-none focus:ring-2 focus:ring-[#FF602E] outline-none text-sm"
                />
              </motion.div>
            )}
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
                Email Address {donorMode === 'guest' && <span className="text-red-400">*</span>}
                <span className="text-xs text-white/60 block">
                  {donorMode === 'guest'
                    ? 'Required for guest checkout and Stripe receipts.'
                    : 'Used only if you switch to guest checkout.'}
                </span>
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
              disabled={isSubmitting}
              className={`w-full mt-3 px-4 py-2 rounded font-semibold text-sm shadow transition relative ${
                isSubmitting 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-[#FF602E] hover:opacity-90'
              } text-white`}
              variants={itemVariants}
              whileHover={!isSubmitting ? { 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(255, 96, 46, 0.3)"
              } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <motion.div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Processing...
                </div>
              ) : (
                `Continue to secure checkout (${tab === 'oneoff' ? 'one-time' : 'recurring'})`
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