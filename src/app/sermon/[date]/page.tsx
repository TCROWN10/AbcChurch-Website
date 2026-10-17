import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatLongDate } from '@/components/ui/DateTile';
import { ArrowBadge } from '@/components/ui/Icons';
import { getSermonByDate } from '@/lib/server/content';
import { resolveVideo } from '@/lib/video-embed';

export const dynamic = 'force-dynamic';

const DEFAULT_COVER = '/images/content/Sermon-image.png';

type Params = { params: Promise<{ date: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { date } = await params;
  const sermon = await getSermonByDate(date);
  if (!sermon) return { title: 'Sermon not found' };
  return {
    title: `${sermon.title} | Sermon`,
    description: sermon.excerpt || `Sermon preached on ${formatLongDate(sermon.date)}`,
  };
}

export default async function SermonByDatePage({ params }: Params) {
  const { date } = await params;
  const sermon = await getSermonByDate(date);
  if (!sermon) notFound();

  const cover = sermon.coverImage || DEFAULT_COVER;
  const video = sermon.videoUrl ? resolveVideo(sermon.videoUrl) : null;
  const hasBody = sermon.body.replace(/<[^>]+>/g, '').trim().length > 0;

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
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#FF602E] mb-3">Sermon</p>
          <h1 className="max-w-3xl text-2xl sm:text-3xl md:text-5xl font-bold text-white drop-shadow mb-3">{sermon.title}</h1>
          <p className="text-sm sm:text-base md:text-lg text-[#FFDECC] drop-shadow">
            {formatLongDate(sermon.date)}
            {sermon.preacher && <> · {sermon.preacher}</>}
          </p>
        </div>
      </div>

      <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <Link
          href="/sermon"
          className="group inline-flex items-center gap-3 text-base font-bold text-[#FF602E] hover:text-[#ff7f50] transition-colors"
        >
          <ArrowBadge direction="left" /> All sermons
        </Link>

        {video && (
          <div className="mt-8 overflow-hidden rounded-2xl bg-black ring-1 ring-white/10 aspect-video">
            {video.type === 'embed' ? (
              <iframe
                src={video.src}
                title={sermon.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video src={video.src} controls playsInline preload="metadata" className="h-full w-full" />
            )}
          </div>
        )}

        {(sermon.scripture || sermon.excerpt) && (
          <section className="mt-8 rounded-2xl bg-[#18313B] p-5 sm:p-6 ring-1 ring-white/10">
            {sermon.scripture && (
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF602E]">{sermon.scripture}</h2>
            )}
            {sermon.excerpt && <p className="mt-2 text-white/85 leading-relaxed">{sermon.excerpt}</p>}
          </section>
        )}

        {hasBody && <article className="rich-content mt-8" dangerouslySetInnerHTML={{ __html: sermon.body }} />}
      </main>
    </div>
  );
}
