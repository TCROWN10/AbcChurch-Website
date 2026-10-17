import 'server-only';
import { z } from 'zod';
import type { ChurchEvent, Devotional, MediaItem, Sermon } from '@/lib/content-types';
import { store } from './store';
import { ensureSeeded } from './seed';
import { sanitizeRichText } from './sanitize';

/* ------------------------------- Public reads ------------------------------- */

export async function getPublishedDevotionals(): Promise<Devotional[]> {
  await ensureSeeded('devotionals');
  return store.list('devotionals', { where: { status: 'published' }, orderBy: 'date', desc: true });
}

export async function getDevotionalByDate(date: string): Promise<Devotional | null> {
  await ensureSeeded('devotionals');
  return store.findOne('devotionals', { date, status: 'published' });
}

export async function getPublishedSermons(): Promise<Sermon[]> {
  await ensureSeeded('sermons');
  return store.list('sermons', { where: { status: 'published' }, orderBy: 'date', desc: true });
}

export async function getSermonByDate(date: string): Promise<Sermon | null> {
  await ensureSeeded('sermons');
  return store.findOne('sermons', { date, status: 'published' });
}

export async function getActiveEvents(): Promise<ChurchEvent[]> {
  await ensureSeeded('events');
  return store.list('events', { where: { active: true }, orderBy: 'sortOrder', desc: false });
}

export async function getGalleryMedia(limit?: number): Promise<MediaItem[]> {
  return store.list('media', { where: { showInGallery: true }, orderBy: 'createdAt', desc: true, limit });
}

/* ------------------------------ Admin schemas ------------------------------- */

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use the format YYYY-MM-DD');
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform(v => (v ? v : undefined));
const mediaUrl = z
  .string()
  .trim()
  .max(2000)
  .refine(v => v === '' || v.startsWith('/') || /^https?:\/\//.test(v), 'Must be an uploaded file or a full https:// link')
  .optional()
  .transform(v => (v ? v : undefined));
const richText = z
  .string()
  .max(200_000)
  .transform(v => sanitizeRichText(v));
const status = z.enum(['draft', 'published']);

export const devotionalSchema = z.object({
  date: isoDate,
  title: z.string().trim().min(2, 'Title is required').max(200),
  memoryVerse: optionalText(1000),
  bibleReading: optionalText(4000),
  body: richText.refine(v => v.replace(/<[^>]+>/g, '').trim().length > 0, 'Write the devotional message'),
  coverImage: mediaUrl,
  status,
});

export const sermonSchema = z.object({
  date: isoDate,
  title: z.string().trim().min(2, 'Title is required').max(200),
  preacher: optionalText(120),
  scripture: optionalText(200),
  excerpt: optionalText(600),
  body: richText,
  coverImage: mediaUrl,
  videoUrl: mediaUrl,
  status,
});

export const eventSchema = z.object({
  title: z.string().trim().min(2, 'Title is required').max(160),
  date: isoDate.optional().or(z.literal('').transform(() => undefined)),
  time: optionalText(80),
  location: optionalText(200),
  description: optionalText(2000),
  flierImage: mediaUrl,
  active: z.boolean(),
  sortOrder: z.number().int().min(0).max(1000),
});

export const mediaCreateSchema = z.object({
  url: z.string().min(1).max(2000),
  path: z.string().min(1).max(500),
  kind: z.enum(['image', 'video', 'document']),
  mimeType: z.string().max(120),
  size: z.number().int().nonnegative(),
  title: optionalText(160),
  caption: optionalText(500),
  showInGallery: z.boolean(),
});

export const mediaUpdateSchema = z.object({
  title: optionalText(160),
  caption: optionalText(500),
  showInGallery: z.boolean(),
});

export const heroSchema = z.object({
  backgroundType: z.enum(['image', 'video']),
  backgroundUrl: z.string().trim().min(1, 'Choose a background').max(2000),
  posterUrl: mediaUrl,
  overlayOpacity: z.number().min(0).max(80),
  headline: z.string().trim().min(1, 'Headline is required').max(80),
  tagline: z.array(z.string().trim().min(1).max(30)).max(5),
  verse: z.string().trim().max(600),
  ctaLabel: optionalText(40),
  ctaHref: optionalText(300),
});

export const bulletinSchema = z.object({
  pdfUrl: z.string().trim().min(1, 'Upload the bulletin PDF').max(2000),
  previewImage: z.string().trim().min(1, 'Upload a preview image').max(2000),
  title: z.string().trim().min(1).max(120),
  updatedLabel: optionalText(80),
});
