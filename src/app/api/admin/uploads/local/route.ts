import { HttpError, requireAdmin } from '@/lib/server/auth';
import { isBlobEnabled, isSupabaseEnabled, VERCEL_BODY_LIMIT_BYTES } from '@/lib/server/config';
import { handle, ok } from '@/lib/server/http';
import { saveLocalUpload } from '@/lib/server/storage';
import { formatBytes, validateMedia } from '@/lib/media-rules';

export const runtime = 'nodejs';
export const maxDuration = 60;

/** Disk upload (Railway volume or local dev folder), used when cloud storage isn't configured. */
export const POST = handle(async (request: Request) => {
  await requireAdmin();
  if (isSupabaseEnabled) throw new HttpError(400, 'Uploads go directly to Supabase storage.');
  if (isBlobEnabled) throw new HttpError(400, 'Uploads go directly to Vercel Blob storage.');
  const form = await request.formData();
  const file = form.get('file');
  const storagePath = form.get('path');
  if (!(file instanceof File) || typeof storagePath !== 'string') {
    throw new HttpError(400, 'Missing file or path.');
  }
  if (process.env.VERCEL && file.size > VERCEL_BODY_LIMIT_BYTES) {
    throw new HttpError(
      413,
      `This file is ${formatBytes(file.size)}. Vercel blocks uploads over ${formatBytes(VERCEL_BODY_LIMIT_BYTES)} through the API. Add BLOB_READ_WRITE_TOKEN (Vercel Blob), or paste a YouTube/Facebook link instead.`
    );
  }
  const problem = validateMedia(file.type, file.size);
  if (problem) throw new HttpError(400, problem);
  const url = await saveLocalUpload(storagePath, await file.arrayBuffer());
  return ok({ url, path: storagePath });
});
