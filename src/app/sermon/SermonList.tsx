"use client";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import DateTile, { formatLongDate } from '@/components/ui/DateTile';
import { ArrowBadge, ArrowRightIcon } from '@/components/ui/Icons';
import type { BulletinSettings } from '@/lib/content-types';

export interface SermonSummary {
  date: string;
  title: string;
  scripture?: string;
  preacher?: string;
  excerpt?: string;
  image: string;
  hasVideo: boolean;
}

const isRemote = (url: string) => url.startsWith('http');

function BookIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5C10.5 5.5 8.5 5 6 5H4v13h2c2.5 0 4.5.5 6 1.5m0-13c1.5-1 3.5-1.5 6-1.5h2v13h-2c-2.5 0-4.5.5-6 1.5m0-13v13" />
    </svg>
  );
}

interface SermonListProps {
  sermons: SermonSummary[];
  bulletin: BulletinSettings;
}

export default function SermonList({ sermons, bulletin }: SermonListProps) {
  const [featured, ...pastSermons] = sermons;
  const BULLETIN_PDF = bulletin.pdfUrl;
  const BULLETIN_PREVIEW = bulletin.previewImage;

  return (
    <div className="min-h-screen flex flex-col bg-[#0C232B]">
      {/* Hero Section */}
      <div className="relative w-full h-[280px] sm:h-[320px] md:h-[400px] flex items-center justify-center">
        <Image
          src="/images/content/Sermon-image.png"
          alt="Sermon Hero"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 md:px-6">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white drop-shadow mb-2">SERMON</h1>
        </div>
      </div>

      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Featured sermon */}
        {featured ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF602E] mb-4">Latest sermon</p>
          <Link
            href={`/sermon/${featured.date}`}
            className="group grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-2xl bg-[#18313B] ring-1 ring-white/10 hover:ring-[#FF602E]/60 transition"
          >
            <div className="relative h-56 sm:h-72 lg:h-auto lg:min-h-[340px] overflow-hidden">
              <Image
                src={featured.image}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized={isRemote(featured.image)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-[#FF602E] px-3 py-1 text-xs font-semibold text-white shadow">
                {featured.hasVideo ? 'Watch & Read' : 'Sunday Service'}
              </span>
              {featured.scripture && (
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                  <BookIcon className="w-4 h-4 text-[#FF602E]" />
                  {featured.scripture}
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center gap-5 p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#FFDECC]/80">
                <span>{formatLongDate(featured.date)}</span>
                {featured.preacher && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden="true" />
                    <span>{featured.preacher}</span>
                  </>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">{featured.title}</h2>
              {featured.excerpt && <p className="text-white/70 leading-relaxed line-clamp-4">{featured.excerpt}</p>}
              <span className="inline-flex items-center gap-3 text-base font-bold text-[#FF602E]">
                {featured.hasVideo ? 'Watch the sermon' : 'Read full sermon'}
                <ArrowBadge />
              </span>
            </div>
          </Link>
        </motion.div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 py-16 text-center">
            <p className="text-lg font-semibold text-white">No sermons published yet</p>
            <p className="mt-1 text-sm text-white/60">Please check back after Sunday service.</p>
          </div>
        )}

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
          {/* Past sermons */}
          <section className="lg:col-span-2" aria-labelledby="past-sermons">
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <h2 id="past-sermons" className="text-2xl sm:text-3xl font-bold text-white">Past Sermons</h2>
                <p className="text-sm text-white/60 mt-1">Catch up on messages you may have missed.</p>
              </div>
              <span className="text-sm text-white/50 whitespace-nowrap">{pastSermons.length} sermons</span>
            </div>

            {pastSermons.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-white/15 py-12 text-center text-white/60">
                More sermons coming soon.
              </p>
            ) : (
              <ul className="space-y-4">
                {pastSermons.map((sermon, i) => (
                  <motion.li
                    key={sermon.date}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <Link
                      href={`/sermon/${sermon.date}`}
                      className="group flex gap-4 sm:gap-5 rounded-2xl bg-[#18313B] p-4 sm:p-5 ring-1 ring-white/5 hover:ring-[#FF602E]/50 hover:bg-[#1d3a46] transition"
                    >
                      <DateTile date={sermon.date} size="lg" />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/50">
                          <span>{formatLongDate(sermon.date)}</span>
                          {sermon.scripture && (
                            <span className="inline-flex items-center gap-1 text-[#FFDECC]/80">
                              <BookIcon className="w-3.5 h-3.5 text-[#FF602E]" />
                              {sermon.scripture}
                            </span>
                          )}
                          {sermon.hasVideo && (
                            <span className="rounded-full bg-[#FF602E]/15 px-2 py-0.5 font-semibold text-[#FF602E]">Video</span>
                          )}
                        </div>
                        <h3 className="mt-1.5 text-lg font-semibold text-white leading-snug group-hover:text-[#FF602E] transition-colors">
                          {sermon.title}
                        </h3>
                        {sermon.excerpt && (
                          <p className="mt-1.5 text-sm text-white/60 leading-relaxed line-clamp-2">{sermon.excerpt}</p>
                        )}
                      </div>
                      <span className="hidden sm:flex h-10 w-10 self-center flex-shrink-0 items-center justify-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10 transition group-hover:bg-[#FF602E] group-hover:text-white group-hover:ring-[#FF602E]">
                        <ArrowRightIcon className="h-5 w-5" strokeWidth={3} />
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            )}
          </section>

          {/* Weekly bulletin */}
          <aside aria-labelledby="weekly-bulletin">
            <div className="lg:sticky lg:top-24 rounded-2xl bg-[#18313B] p-5 sm:p-6 ring-1 ring-white/10">
              <h2 id="weekly-bulletin" className="text-xl font-bold text-white">{bulletin.title}</h2>
              <p className="mt-1 text-sm text-white/60">
                {bulletin.updatedLabel || 'Announcements, events and the order of service.'}
              </p>
              <a
                href={BULLETIN_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-5 block overflow-hidden rounded-xl bg-white ring-1 ring-white/10"
                aria-label="Open weekly bulletin PDF in a new tab"
              >
                <Image
                  src={BULLETIN_PREVIEW}
                  alt="Weekly bulletin preview"
                  width={2222}
                  height={1556}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
                  unoptimized
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-sm font-semibold text-white opacity-0 transition group-hover:bg-black/50 group-hover:opacity-100">
                  View full bulletin
                </span>
              </a>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <a
                  href={BULLETIN_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-[#FF602E] px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#E5552A] transition-colors"
                >
                  Open PDF
                </a>
                <a
                  href={BULLETIN_PDF}
                  download
                  className="rounded-lg px-4 py-2.5 text-center text-sm font-semibold text-[#FF602E] ring-1 ring-[#FF602E] hover:bg-[#FF602E] hover:text-white transition-colors"
                >
                  Download
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
