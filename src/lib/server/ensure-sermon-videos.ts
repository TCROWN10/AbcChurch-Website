import 'server-only';
import { store } from './store';

/** Compressed clips shipped under public/videos/ (served by the CDN, no upload size limit). */
export const SERMON_CLIP = {
  date: '2026-05-03',
  url: '/videos/abcchurch-clip-2.mp4',
  path: 'videos/abcchurch-clip-2.mp4',
  size: 13064008,
  title: 'Obedience: The gateway to Glory, Guidance and Greatness',
  caption: 'Sunday service · May 3, 2026',
} as const;

export const GALLERY_CLIPS = [
  {
    url: '/videos/abcchurch-clip-1.mp4',
    path: 'videos/abcchurch-clip-1.mp4',
    size: 3466861,
    title: 'ABC Church service clip',
    caption: 'Sunday service highlight',
  },
  {
    url: SERMON_CLIP.url,
    path: SERMON_CLIP.path,
    size: SERMON_CLIP.size,
    title: SERMON_CLIP.title,
    caption: SERMON_CLIP.caption,
  },
] as const;

const SEED_FLAG = 'seeded:v1:sermon-videos-2026-05-03';

let pending: Promise<void> | null = null;

/**
 * Attaches the May 3 sermon MP4 and gallery clips once per database.
 * Safe when the sermon was already seeded without a videoUrl.
 */
export async function ensureSermonVideos() {
  if (!pending) {
    pending = (async () => {
      if (await store.getFlag(SEED_FLAG)) return;

      const sermon = await store.findOne('sermons', { date: SERMON_CLIP.date });
      if (sermon && !sermon.videoUrl) {
        await store.update('sermons', sermon.id, { videoUrl: SERMON_CLIP.url });
      }

      const existingMedia = await store.list('media');
      const urls = new Set(existingMedia.map(m => m.url));
      for (const clip of GALLERY_CLIPS) {
        if (urls.has(clip.url)) continue;
        await store.insert('media', {
          url: clip.url,
          path: clip.path,
          kind: 'video',
          mimeType: 'video/mp4',
          size: clip.size,
          title: clip.title,
          caption: clip.caption,
          showInGallery: true,
        });
      }

      await store.setFlag(SEED_FLAG, new Date().toISOString());
    })().finally(() => {
      pending = null;
    });
  }
  await pending;
}
