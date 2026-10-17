import { HttpError, requireAdmin } from '@/lib/server/auth';
import { isSupabaseEnabled } from '@/lib/server/config';
import { handle, ok } from '@/lib/server/http';
import { saveLocalUpload } from '@/lib/server/storage';
import { validateMedia } from '@/lib/media-rules';

/** Disk upload (Railway volume or local dev folder), used when Supabase storage isn't configured. */
export const POST = handle(async (request: Request) => {
  await requireAdmin();
  if (isSupabaseEnabled) throw new HttpError(400, 'Uploads go directly to Supabase storage.');
  const form = await request.formData();
  const file = form.get('file');
  const storagePath = form.get('path');
  if (!(file instanceof File) || typeof storagePath !== 'string') {
    throw new HttpError(400, 'Missing file or path.');
  }
  const problem = validateMedia(file.type, file.size);
  if (problem) throw new HttpError(400, problem);
  const url = await saveLocalUpload(storagePath, await file.arrayBuffer());
  return ok({ url, path: storagePath });
});
