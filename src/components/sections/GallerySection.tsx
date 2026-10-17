"use client";
import Link from 'next/link';
import GalleryGrid from '@/components/ui/GalleryGrid';
import { ArrowBadge } from '@/components/ui/Icons';
import type { MediaItem } from '@/lib/content-types';

export default function GallerySection({ items }: { items: MediaItem[] }) {
  if (items.length === 0) return null;
  return (
    <section className="w-full bg-white py-12 sm:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF602E]">Gallery</p>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-[#28505A]">Moments from church</h2>
          </div>
          <Link href="/gallery" className="group inline-flex items-center gap-3 text-base font-bold text-[#FF602E]">
            See all photos &amp; videos
            <ArrowBadge />
          </Link>
        </div>
        <GalleryGrid items={items} variant="light" />
      </div>
    </section>
  );
}
