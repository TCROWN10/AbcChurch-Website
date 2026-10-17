"use client";
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { MediaItem } from '@/lib/content-types';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/Icons';

type Item = Pick<MediaItem, 'id' | 'url' | 'kind' | 'title' | 'caption'>;

function PlayBadge() {
  return (
    <span className="absolute inset-0 flex items-center justify-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm ring-1 ring-white/30">
        <svg className="ml-1 h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5.14v13.72a1 1 0 001.5.86l11-6.86a1 1 0 000-1.72l-11-6.86A1 1 0 008 5.14z" />
        </svg>
      </span>
    </span>
  );
}

export default function GalleryGrid({ items, variant = 'dark' }: { items: Item[]; variant?: 'dark' | 'light' }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex === null ? null : items[openIndex];

  const step = useCallback(
    (dir: 1 | -1) => setOpenIndex(i => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openIndex, step]);

  return (
    <>
      <ul className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 [&>li]:mb-3 sm:[&>li]:mb-4">
        {items.map((item, i) => (
          <li key={item.id} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className={`group relative block w-full overflow-hidden rounded-xl text-left ring-1 ${
                variant === 'dark' ? 'bg-[#18313B] ring-white/10' : 'bg-gray-100 ring-black/5'
              }`}
              aria-label={`Open ${item.title || (item.kind === 'video' ? 'video' : 'photo')}`}
            >
              {item.kind === 'video' ? (
                <>
                  <video src={`${item.url}#t=0.5`} className="w-full h-auto" muted playsInline preload="metadata" />
                  <PlayBadge />
                </>
              ) : (
                <Image
                  src={item.url}
                  alt={item.title || item.caption || 'Church photo'}
                  width={800}
                  height={600}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  unoptimized={item.url.startsWith('http')}
                />
              )}
              {(item.title || item.caption) && (
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-3 pb-2.5 pt-8 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {item.title || item.caption}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            onClick={() => setOpenIndex(null)}
          >
            <div className="flex items-center justify-between px-4 py-3 text-white/80 text-sm">
              <span>
                {openIndex! + 1} / {items.length}
              </span>
              <button type="button" onClick={() => setOpenIndex(null)} className="rounded-full p-2 hover:bg-white/10" aria-label="Close">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div className="relative flex flex-1 items-center justify-center px-2 sm:px-16 min-h-0" onClick={e => e.stopPropagation()}>
              {open.kind === 'video' ? (
                <video key={open.id} src={open.url} controls autoPlay playsInline className="max-h-full max-w-full rounded-lg" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={open.url} alt={open.title || open.caption || 'Church photo'} className="max-h-full max-w-full rounded-lg object-contain" />
              )}
              {items.length > 1 && (
                <>
                  <button type="button" onClick={() => step(-1)} className="absolute left-2 sm:left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white shadow-lg ring-1 ring-white/20 backdrop-blur transition hover:bg-[#FF602E] hover:ring-[#FF602E]" aria-label="Previous">
                    <ChevronLeftIcon className="h-6 w-6" strokeWidth={3} />
                  </button>
                  <button type="button" onClick={() => step(1)} className="absolute right-2 sm:right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white shadow-lg ring-1 ring-white/20 backdrop-blur transition hover:bg-[#FF602E] hover:ring-[#FF602E]" aria-label="Next">
                    <ChevronRightIcon className="h-6 w-6" strokeWidth={3} />
                  </button>
                </>
              )}
            </div>
            {(open.title || open.caption) && (
              <div className="px-4 py-4 text-center text-white" onClick={e => e.stopPropagation()}>
                {open.title && <p className="font-semibold">{open.title}</p>}
                {open.caption && <p className="mt-1 text-sm text-white/70">{open.caption}</p>}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
