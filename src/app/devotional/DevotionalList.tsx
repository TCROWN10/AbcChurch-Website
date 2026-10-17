"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import JoinUsSection from '@/components/ui/Message';
import DateTile, { formatLongDate, formatMonthYear } from '@/components/ui/DateTile';
import { ArrowBadge, ArrowRightIcon } from '@/components/ui/Icons';

export interface DevotionalSummary {
  date: string;
  title: string;
  memoryVerse?: string;
  coverImage?: string;
}

const PAGE_SIZE = 12;
const ALL_MONTHS = 'all';
const DEFAULT_COVER = '/images/content/Devotional-iHero.png';

export default function DevotionalList({ devotionals: devotionalData }: { devotionals: DevotionalSummary[] }) {
  const [query, setQuery] = useState('');
  const [month, setMonth] = useState(ALL_MONTHS);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const featured = devotionalData[0];
  const featuredCover = featured?.coverImage || DEFAULT_COVER;

  const months = useMemo(
    () => Array.from(new Set(devotionalData.map(d => d.date.slice(0, 7)))),
    [devotionalData]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return devotionalData.filter(d => {
      if (month !== ALL_MONTHS && !d.date.startsWith(month)) return false;
      if (!q) return true;
      return d.title.toLowerCase().includes(q) || formatLongDate(d.date).toLowerCase().includes(q);
    });
  }, [query, month, devotionalData]);

  const grouped = useMemo(() => {
    const groups: Array<{ key: string; label: string; items: typeof devotionalData }> = [];
    for (const item of filtered.slice(0, visibleCount)) {
      const key = item.date.slice(0, 7);
      const last = groups[groups.length - 1];
      if (last?.key === key) {
        last.items.push(item);
      } else {
        groups.push({ key, label: formatMonthYear(item.date), items: [item] });
      }
    }
    return groups;
  }, [filtered, visibleCount]);

  const resetPaging = () => setVisibleCount(PAGE_SIZE);

  return (
    <div className="min-h-screen flex flex-col bg-[#0C232B]">
      {/* Hero Section */}
      <div className="relative w-full h-[280px] sm:h-[320px] md:h-[400px] flex items-center justify-center">
        <Image
          src="/images/content/Devotional-iHero.png"
          alt="Daily Devotional Hero"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 md:px-6">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white drop-shadow mb-2">CONNECTLife Daily Devotional</h1>
        </div>
      </div>

      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {!featured ? (
          <div className="rounded-2xl border border-dashed border-white/15 py-20 text-center">
            <p className="text-lg font-semibold text-white">No devotionals published yet</p>
            <p className="mt-1 text-sm text-white/60">Please check back soon.</p>
          </div>
        ) : (
        <>
        {/* Featured */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF602E] mb-4">Latest devotional</p>
          <Link
            href={`/devotional/${featured.date}`}
            className="group grid grid-cols-1 md:grid-cols-5 overflow-hidden rounded-2xl bg-[#18313B] ring-1 ring-white/10 hover:ring-[#FF602E]/60 transition"
          >
            <div className="relative h-52 sm:h-64 md:h-auto md:min-h-[280px] md:col-span-2 overflow-hidden">
              <Image
                src={featuredCover}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized={featuredCover.startsWith('http')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18313B] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#18313B]/40" />
            </div>
            <div className="md:col-span-3 flex flex-col justify-center gap-4 p-6 sm:p-8 md:p-10">
              <div className="flex items-center gap-4">
                <DateTile date={featured.date} size="lg" highlight />
                <div>
                  <p className="text-sm text-[#FFDECC]/80">{formatLongDate(featured.date)}</p>
                  <p className="text-xs text-white/50 mt-1">CONNECTLife Daily Devotional</p>
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                {featured.title}
              </h2>
              <p className="text-white/70 leading-relaxed max-w-xl line-clamp-3">
                {featured.memoryVerse ||
                  "Take a few quiet minutes with God's Word today. Read, reflect and carry this word with you through the rest of your day."}
              </p>
              <span className="inline-flex items-center gap-3 text-base font-bold text-[#FF602E]">
                Read today&apos;s devotional
                <ArrowBadge />
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Archive toolbar */}
        <div className="mt-16 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Devotional Archive</h2>
            <p className="text-sm text-white/60 mt-1">
              {filtered.length} {filtered.length === 1 ? 'devotional' : 'devotionals'}
              {month !== ALL_MONTHS && ` in ${formatMonthYear(`${month}-01`)}`}
              {query.trim() && ` matching “${query.trim()}”`}
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <svg className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                resetPaging();
              }}
              placeholder="Search by title or date"
              aria-label="Search devotionals"
              className="w-full rounded-xl bg-[#18313B] pl-10 pr-4 py-2.5 text-base sm:text-sm text-white placeholder:text-white/40 ring-1 ring-white/10 focus:ring-[#FF602E]/70 transition"
            />
          </div>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          {[ALL_MONTHS, ...months].map(m => {
            const active = month === m;
            return (
              <button
                key={m}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setMonth(m);
                  resetPaging();
                }}
                className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[#FF602E] text-white'
                    : 'bg-[#18313B] text-white/70 ring-1 ring-white/10 hover:text-white hover:ring-white/30'
                }`}
              >
                {m === ALL_MONTHS ? 'All' : formatMonthYear(`${m}-01`)}
              </button>
            );
          })}
        </div>

        {/* Archive list */}
        {grouped.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-white/15 py-16 text-center">
            <p className="text-white font-semibold">No devotionals found</p>
            <p className="text-sm text-white/60 mt-1">Try a different search or month.</p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setMonth(ALL_MONTHS);
                resetPaging();
              }}
              className="mt-5 rounded-lg bg-[#FF602E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#E5552A] transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-8 space-y-10">
            {grouped.map(group => (
              <section key={group.key} aria-labelledby={`month-${group.key}`}>
                <div className="flex items-center gap-4 mb-4">
                  <h3 id={`month-${group.key}`} className="text-sm font-semibold uppercase tracking-widest text-[#FFDECC]">
                    {group.label}
                  </h3>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <AnimatePresence initial={false}>
                    {group.items.map(item => (
                      <motion.li
                        key={item.date}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <Link
                          href={`/devotional/${item.date}`}
                          className="group flex h-full items-center gap-4 rounded-xl bg-[#18313B] p-4 ring-1 ring-white/5 hover:ring-[#FF602E]/50 hover:bg-[#1d3a46] transition"
                        >
                          <DateTile date={item.date} />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-white/50">
                              {formatLongDate(item.date).split(',')[0]}
                            </p>
                            <p className="mt-1 font-semibold text-white leading-snug group-hover:text-[#FF602E] transition-colors">
                              {item.title}
                            </p>
                          </div>
                          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10 transition group-hover:bg-[#FF602E] group-hover:text-white group-hover:ring-[#FF602E]">
                            <ArrowRightIcon className="h-[18px] w-[18px]" strokeWidth={3} />
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </section>
            ))}
          </div>
        )}

        {visibleCount < filtered.length && (
          <div className="mt-10 flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
              className="rounded-xl bg-transparent px-6 py-2.5 text-sm font-semibold text-[#FF602E] ring-1 ring-[#FF602E] hover:bg-[#FF602E] hover:text-white transition-colors"
            >
              Load more devotionals
            </button>
            <p className="text-xs text-white/50">
              Showing {Math.min(visibleCount, filtered.length)} of {filtered.length}
            </p>
          </div>
        )}
        </>
        )}
      </main>

      <JoinUsSection />
    </div>
  );
}
