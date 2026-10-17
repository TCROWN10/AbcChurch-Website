import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatLongDate } from '@/components/ui/DateTile';
import { ArrowBadge, ArrowLeftIcon, ArrowRightIcon } from '@/components/ui/Icons';
import { getDevotionalByDate, getPublishedDevotionals } from '@/lib/server/content';

export const dynamic = 'force-dynamic';

const DEFAULT_COVER = '/images/content/Devotional-iHero.png';

type Params = { params: Promise<{ date: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { date } = await params;
  const devotional = await getDevotionalByDate(date);
  if (!devotional) return { title: 'Devotional not found' };
  return {
    title: `${devotional.title} | CONNECTLife Daily Devotional`,
    description: devotional.memoryVerse || `Daily devotional for ${formatLongDate(devotional.date)}`,
  };
}

export default async function DevotionalByDatePage({ params }: Params) {
  const { date } = await params;
  const devotional = await getDevotionalByDate(date);
  if (!devotional) notFound();

  const all = await getPublishedDevotionals();
  const index = all.findIndex(d => d.id === devotional.id);
  const newer = index > 0 ? all[index - 1] : undefined;
  const older = index >= 0 ? all[index + 1] : undefined;
  const cover = devotional.coverImage || DEFAULT_COVER;

  return (
    <div className="min-h-screen flex flex-col bg-[#0C232B]">
      <div className="relative w-full h-[280px] sm:h-[320px] md:h-[400px] flex items-center justify-center">
        <Image
          src={cover}
          alt=""
          fill
          style={{ objectFit: 'cover' }}
          priority
          unoptimized={cover.startsWith('http')}
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4 md:px-6">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#FF602E] mb-3">
            CONNECTLife Daily Devotional
          </p>
          <h1 className="max-w-3xl text-2xl sm:text-3xl md:text-5xl font-bold text-white drop-shadow mb-3">
            {devotional.title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#FFDECC] drop-shadow">{formatLongDate(devotional.date)}</p>
        </div>
      </div>

      <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <Link
          href="/devotional"
          className="group inline-flex items-center gap-3 text-base font-bold text-[#FF602E] hover:text-[#ff7f50] transition-colors"
        >
          <ArrowBadge direction="left" /> All devotionals
        </Link>

        {(devotional.memoryVerse || devotional.bibleReading) && (
          <div className="mt-8 grid gap-4">
            {devotional.memoryVerse && (
              <section className="rounded-2xl bg-[#18313B] p-5 sm:p-6 ring-1 ring-white/10">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF602E]">Memory Verse</h2>
                <p className="mt-2 text-white/90 leading-relaxed whitespace-pre-line">{devotional.memoryVerse}</p>
              </section>
            )}
            {devotional.bibleReading && (
              <section className="rounded-2xl bg-[#18313B] p-5 sm:p-6 ring-1 ring-white/10">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF602E]">Bible Reading</h2>
                <p className="mt-2 text-white/80 leading-relaxed whitespace-pre-line">{devotional.bibleReading}</p>
              </section>
            )}
          </div>
        )}

        <article
          className="rich-content mt-8"
          dangerouslySetInnerHTML={{ __html: devotional.body }}
        />

        <nav className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2" aria-label="More devotionals">
          {older ? (
            <Link
              href={`/devotional/${older.date}`}
              className="group rounded-2xl bg-[#18313B] p-5 ring-1 ring-white/10 hover:ring-[#FF602E]/60 transition"
            >
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/60 group-hover:text-[#FF602E] transition-colors">
                <ArrowLeftIcon className="h-4 w-4" strokeWidth={3} /> Previous day
              </p>
              <p className="mt-1 font-semibold text-white group-hover:text-[#FF602E] transition-colors">{older.title}</p>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {newer && (
            <Link
              href={`/devotional/${newer.date}`}
              className="group rounded-2xl bg-[#18313B] p-5 text-right ring-1 ring-white/10 hover:ring-[#FF602E]/60 transition"
            >
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/60 group-hover:text-[#FF602E] transition-colors">
                Next day <ArrowRightIcon className="h-4 w-4" strokeWidth={3} />
              </p>
              <p className="mt-1 font-semibold text-white group-hover:text-[#FF602E] transition-colors">{newer.title}</p>
            </Link>
          )}
        </nav>
      </main>
    </div>
  );
}
