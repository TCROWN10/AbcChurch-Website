import Image from 'next/image';
import GalleryGrid from '@/components/ui/GalleryGrid';
import { getGalleryMedia } from '@/lib/server/content';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Gallery | All Believers Christian Church' };

export default async function GalleryPage() {
  const items = await getGalleryMedia();
  const photos = items.filter(i => i.kind === 'image').length;
  const videos = items.filter(i => i.kind === 'video').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#0C232B]">
      <div className="relative w-full h-[280px] sm:h-[320px] md:h-[400px] flex items-center justify-center">
        <Image src="/images/content/Connect-page.png" alt="" fill style={{ objectFit: 'cover' }} priority />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4 md:px-6">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white drop-shadow mb-2">GALLERY</h1>
          <p className="text-sm sm:text-base text-[#FFDECC]">Moments from our church family</p>
        </div>
      </div>

      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 py-20 text-center">
            <p className="text-lg font-semibold text-white">Photos and videos are coming soon</p>
            <p className="mt-1 text-sm text-white/60">Check back after our next service.</p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-white/60">
              {photos} {photos === 1 ? 'photo' : 'photos'}
              {videos > 0 && ` · ${videos} ${videos === 1 ? 'video' : 'videos'}`}
            </p>
            <GalleryGrid items={items} />
          </>
        )}
      </main>
    </div>
  );
}
