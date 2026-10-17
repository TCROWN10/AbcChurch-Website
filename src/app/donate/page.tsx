"use client";
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth, displayName } from '@/lib/auth/auth-context';

type Frequency = 'weekly' | 'monthly' | 'yearly';

const GIVING_CATEGORIES: Array<{ label: string; description: string }> = [
  { label: 'Tithes', description: 'Honour God with the first tenth' },
  { label: 'Offerings', description: 'Freewill gifts for ministry' },
  { label: 'Building Fund', description: 'Help grow our church home' },
  { label: 'Missions', description: 'Support outreach near and far' },
];

const FREQUENCIES: Array<{ value: Frequency; label: string; adverb: string }> = [
  { value: 'weekly', label: 'Weekly', adverb: 'every week' },
  { value: 'monthly', label: 'Monthly', adverb: 'every month' },
  { value: 'yearly', label: 'Yearly', adverb: 'every year' },
];

const PRESET_AMOUNTS = [10, 25, 50, 100, 250, 500];
const MIN_AMOUNT = 1;
const MAX_AMOUNT = 100000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

function sanitizeAmountInput(value: string): string {
  const cleaned = value.replace(/[^\d.]/g, '');
  const [whole, ...rest] = cleaned.split('.');
  if (rest.length === 0) return whole.slice(0, 6);
  return `${whole.slice(0, 6)}.${rest.join('').slice(0, 2)}`;
}

type FieldErrors = Partial<Record<'amount' | 'email', string>>;

export default function DonatePage() {
  const { user } = useAuth();
  const hasAuthToken = Boolean(user);
  const [donorMode, setDonorMode] = useState<'account' | 'guest'>('guest');
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState<Frequency>('monthly');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(GIVING_CATEGORIES[0].label);
  const [email, setEmail] = useState('');
  const [guestName, setGuestName] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [generalError, setGeneralError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const amountValue = parseFloat(amount);
  const hasValidAmount = Number.isFinite(amountValue) && amountValue >= MIN_AMOUNT;
  const frequencyInfo = FREQUENCIES.find(f => f.value === frequency) ?? FREQUENCIES[1];
  const amountLabel = hasValidAmount ? currency.format(amountValue) : '$0.00';

  useEffect(() => {
    setDonorMode(user ? 'account' : 'guest');
  }, [user]);

  // Pre-fill after Stripe cancel (see donate/cancel query params)
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const cat = searchParams.get('category');
    if (cat && GIVING_CATEGORIES.some(c => c.label === cat)) {
      setCategory(cat);
    }
    const amt = parseFloat(searchParams.get('amount') ?? '');
    if (Number.isFinite(amt) && amt > 0) {
      setAmount(amt.toFixed(2));
    }
    const em = searchParams.get('email');
    if (em?.trim()) {
      setEmail(em.trim());
    }
    const freq = searchParams.get('frequency');
    if (freq && FREQUENCIES.some(f => f.value === freq)) {
      setFrequency(freq as Frequency);
      setIsRecurring(true);
    }
  }, []);

  const clearError = (field: keyof FieldErrors) => {
    setGeneralError('');
    setErrors(prev => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const updateAmount = (value: string) => {
    setAmount(sanitizeAmountInput(value));
    clearError('amount');
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!Number.isFinite(amountValue) || amountValue <= 0) {
      next.amount = 'Please enter an amount to give.';
    } else if (amountValue < MIN_AMOUNT) {
      next.amount = `The minimum gift is ${currency.format(MIN_AMOUNT)}.`;
    } else if (amountValue > MAX_AMOUNT) {
      next.amount = `For gifts over ${currency.format(MAX_AMOUNT)}, please contact the church office.`;
    }
    if (donorMode === 'guest') {
      if (!email.trim()) {
        next.email = 'Email is required so we can send your receipt.';
      } else if (!EMAIL_PATTERN.test(email.trim())) {
        next.email = 'Please enter a valid email address.';
      }
    }
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');

    const fieldErrors = validate();
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    const asAccount = donorMode === 'account' && user;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/donations/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(amountValue * 100) / 100,
          category,
          isRecurring,
          frequency: isRecurring ? frequency : undefined,
          email: asAccount ? user.email : email.trim(),
          name: asAccount ? displayName(user) : guestName.trim() || undefined,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.data?.url) {
        throw new Error(json?.message || 'Could not start checkout. Please try again.');
      }
      window.location.href = json.data.url;
    } catch (error: unknown) {
      setGeneralError(error instanceof Error ? error.message : 'An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  const summary = useMemo(() => {
    const cadence = isRecurring ? frequencyInfo.adverb : 'one-time';
    return isRecurring
      ? `${amountLabel} ${cadence} to ${category}`
      : `${amountLabel} ${cadence} gift to ${category}`;
  }, [amountLabel, category, frequencyInfo.adverb, isRecurring]);

  const inputClass = (hasError?: boolean) =>
    `w-full rounded-lg bg-white/95 px-3.5 py-2.5 text-base sm:text-sm text-gray-900 placeholder:text-gray-400 border transition-colors ${
      hasError ? 'border-red-400' : 'border-transparent focus:border-[#FF602E]'
    }`;

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <Image
        src="/images/backgrounds/BG.png"
        alt=""
        fill
        priority
        className="object-cover z-0"
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/85 via-black/65 to-black/50" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 pt-24 pb-12 sm:gap-10 sm:px-6 sm:pt-28 sm:pb-16 lg:grid-cols-[1fr_minmax(0,480px)] lg:gap-16 lg:pt-32">
        {/* Left: amount */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FF602E]">Give generously</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl leading-tight">Make a Donation</h1>
          <p className="mt-4 max-w-md text-white/70 leading-relaxed">
            &ldquo;Each of you should give what you have decided in your heart to give&hellip; for God loves a
            cheerful giver.&rdquo; <span className="whitespace-nowrap text-white/50">&mdash; 2 Corinthians 9:7</span>
          </p>

          <div className="mt-10">
            <label htmlFor="amount" className="text-sm font-medium text-white/70">
              Your gift
            </label>
            <div
              className={`mt-2 flex items-baseline gap-2 border-b-2 pb-2 transition-colors ${
                errors.amount ? 'border-red-400' : 'border-white/20 focus-within:border-[#FF602E]'
              }`}
            >
              <span className="text-[2.75rem] leading-none font-bold text-[#FF602E] sm:text-7xl">$</span>
              <input
                id="amount"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="0.00"
                value={amount}
                onChange={e => updateAmount(e.target.value)}
                onBlur={() => hasValidAmount && setAmount(amountValue.toFixed(2))}
                aria-invalid={Boolean(errors.amount)}
                aria-describedby={errors.amount ? 'amount-error' : undefined}
                className="w-full min-w-0 bg-transparent text-[2.75rem] leading-none font-bold text-white placeholder:text-white/30 sm:text-7xl"
              />
              <span className="text-lg font-semibold text-white/50">USD</span>
            </div>
            <AnimatePresence>
              {errors.amount && (
                <motion.p
                  id="amount-error"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 text-sm text-red-400"
                >
                  {errors.amount}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {PRESET_AMOUNTS.map(preset => {
                const active = amountValue === preset;
                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => updateAmount(preset.toFixed(2))}
                    aria-pressed={active}
                    className={`rounded-lg border py-2 text-sm font-semibold transition-colors ${
                      active
                        ? 'border-[#FF602E] bg-[#FF602E] text-white'
                        : 'border-white/20 bg-white/5 text-white/85 hover:border-white/40 hover:bg-white/10'
                    }`}
                  >
                    ${preset}
                  </button>
                );
              })}
            </div>
          </div>

          <ul className="mt-10 hidden space-y-3 text-sm text-white/70 lg:block">
            {[
              'Secure payment processed by Stripe',
              'Receipt emailed to you instantly',
              'Recurring gifts can be cancelled anytime',
            ].map(item => (
              <li key={item} className="flex items-center gap-3">
                <svg className="h-5 w-5 flex-shrink-0 text-[#FF602E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right: form card */}
        <motion.form
          noValidate
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full rounded-2xl border border-white/10 bg-[#1f1f1f]/80 p-5 shadow-2xl backdrop-blur-xl sm:p-7"
        >
          {/* Gift type */}
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-white/5 p-1" role="tablist" aria-label="Gift type">
            {[
              { value: false, label: 'One-time' },
              { value: true, label: 'Recurring' },
            ].map(option => {
              const active = isRecurring === option.value;
              return (
                <button
                  key={option.label}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setIsRecurring(option.value)}
                  className={`relative rounded-lg py-2.5 text-sm font-semibold transition-colors ${
                    active ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="gift-type-pill"
                      className="absolute inset-0 rounded-lg bg-[#FF602E]"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{option.label}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence initial={false}>
            {isRecurring && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <p className="mt-5 mb-2 text-sm font-medium text-white/80">How often?</p>
                <div className="grid grid-cols-3 gap-2">
                  {FREQUENCIES.map(f => (
                    <button
                      key={f.value}
                      type="button"
                      aria-pressed={frequency === f.value}
                      onClick={() => setFrequency(f.value)}
                      className={`rounded-lg border py-2 text-sm font-semibold transition-colors ${
                        frequency === f.value
                          ? 'border-[#FF602E] bg-[#FF602E]/15 text-white'
                          : 'border-white/15 text-white/70 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category */}
          <fieldset className="mt-5">
            <legend className="mb-2 text-sm font-medium text-white/80">Where should your gift go?</legend>
            <div className="grid grid-cols-2 gap-2">
              {GIVING_CATEGORIES.map(c => {
                const active = category === c.label;
                return (
                  <button
                    key={c.label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setCategory(c.label)}
                    className={`rounded-xl border p-3 text-left transition-colors ${
                      active
                        ? 'border-[#FF602E] bg-[#FF602E]/15'
                        : 'border-white/15 bg-white/[0.03] hover:border-white/30'
                    }`}
                  >
                    <span className={`block text-sm font-semibold ${active ? 'text-white' : 'text-white/85'}`}>
                      {c.label}
                    </span>
                    <span className="mt-0.5 block text-xs leading-snug text-white/55">{c.description}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Donor details */}
          {hasAuthToken && (
            <div className="mt-5">
              <p className="mb-2 text-sm font-medium text-white/80">Give as</p>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { value: 'account', label: 'My account' },
                  { value: 'guest', label: 'Guest' },
                ] as const).map(option => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={donorMode === option.value}
                    onClick={() => {
                      setDonorMode(option.value);
                      clearError('email');
                    }}
                    className={`rounded-lg border py-2 text-sm font-semibold transition-colors ${
                      donorMode === option.value
                        ? 'border-[#FF602E] bg-[#FF602E]/15 text-white'
                        : 'border-white/15 text-white/70 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence initial={false}>
            {donorMode === 'guest' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="guestName" className="mb-1.5 block text-sm font-medium text-white/80">
                      Full name <span className="text-white/40">(optional)</span>
                    </label>
                    <input
                      id="guestName"
                      type="text"
                      autoComplete="name"
                      value={guestName}
                      onChange={e => setGuestName(e.target.value)}
                      placeholder="Jane Doe"
                      className={inputClass()}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white/80">
                      Email <span className="text-[#FF602E]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value);
                        clearError('email');
                      }}
                      placeholder="you@example.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={inputClass(Boolean(errors.email))}
                    />
                  </div>
                </div>
                {errors.email ? (
                  <p id="email-error" className="mt-2 text-xs text-red-400">{errors.email}</p>
                ) : (
                  !hasAuthToken && (
                    <p className="mt-2 text-xs text-white/50">
                      Giving as a guest.{' '}
                      <Link href="/signin?redirect=/donate" className="font-medium text-[#FF602E] hover:underline">
                        Sign in
                      </Link>{' '}
                      to link this gift to your account.
                    </p>
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Summary */}
          <div className="mt-6 flex items-center justify-between gap-4 rounded-xl bg-white/5 px-4 py-3">
            <span className="text-sm text-white/60">Summary</span>
            <span className="text-right text-sm font-semibold text-white">{summary}</span>
          </div>

          {generalError && (
            <div role="alert" className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {generalError}
            </div>
          )}

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF602E] py-3.5 text-base font-semibold text-white shadow-lg shadow-[#FF602E]/20 transition hover:bg-[#ff7449] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Redirecting to checkout&hellip;
              </>
            ) : (
              <>
                Give {amountLabel}
                {isRecurring && <span className="font-normal text-white/80">/ {frequencyInfo.label.toLowerCase()}</span>}
              </>
            )}
          </motion.button>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-white/50">
            <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 118 0v4" />
            </svg>
            Secure checkout with Card, Apple Pay or Google Pay via Stripe
          </p>
        </motion.form>
      </div>
    </section>
  );
}