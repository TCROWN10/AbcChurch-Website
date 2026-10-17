import 'server-only';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import type { MediaKind } from '@/lib/content-types';
import { isSupabaseEnabled, supabaseConfig, uploadDir } from './config';
import { getSupabaseAdmin } from './supabase';
import { HttpError } from './auth';

export const LOCAL_UPLOAD_DIR = path.resolve(uploadDir);
/** Served by src/app/media/[...path]/route.ts */
const LOCAL_URL_PREFIX = '/media/';

/** Resolves a stored path inside the upload directory, or null if it would escape it. */
export function resolveLocalUpload(storagePath: string): string | null {
  const target = path.resolve(LOCAL_UPLOAD_DIR, storagePath);
  return target.startsWith(LOCAL_UPLOAD_DIR + path.sep) ? target : null;
}

function slugify(fileName: string) {
  const ext = path.extname(fileName).toLowerCase().replace(/[^.a-z0-9]/g, '');
  const base = path
    .basename(fileName, path.extname(fileName))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return `${base || 'file'}${ext}`;
}

export function buildStoragePath(kind: MediaKind, fileName: string) {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${kind}s/${now.getFullYear()}/${month}/${randomUUID().slice(0, 8)}-${slugify(fileName)}`;
}

export type UploadTicket =
  | { mode: 'supabase'; path: string; token: string; publicUrl: string; bucket: string }
  | { mode: 'local'; path: string };

/** Prepares an upload. Supabase uploads go straight from the browser using a signed token. */
export async function createUploadTicket(kind: MediaKind, fileName: string): Promise<UploadTicket> {
  const storagePath = buildStoragePath(kind, fileName);
  if (!isSupabaseEnabled) return { mode: 'local', path: storagePath };

  const supabase = getSupabaseAdmin();
  const bucket = supabaseConfig.bucket;
  const { data, error } = await supabase.storage.from(bucket).createSignedUploadUrl(storagePath);
  if (error || !data) throw new HttpError(500, `Could not prepare upload: ${error?.message ?? 'unknown error'}`);
  const { data: pub } = supabase.storage.from(bucket).getPublicUrl(storagePath);
  return { mode: 'supabase', path: data.path, token: data.token, publicUrl: pub.publicUrl, bucket };
}

const STORAGE_PATH_PATTERN = /^(images|videos|documents)\/\d{4}\/\d{2}\/[a-z0-9]{8}-[a-z0-9-]+(\.[a-z0-9]+)?$/;

export async function saveLocalUpload(storagePath: string, bytes: ArrayBuffer): Promise<string> {
  const target = STORAGE_PATH_PATTERN.test(storagePath) ? resolveLocalUpload(storagePath) : null;
  if (!target) throw new HttpError(400, 'Invalid upload path.');
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, Buffer.from(bytes));
  return `${LOCAL_URL_PREFIX}${storagePath}`;
}

export async function deleteStoredFile(storagePath: string) {
  if (!storagePath) return;
  try {
    if (isSupabaseEnabled) {
      await getSupabaseAdmin().storage.from(supabaseConfig.bucket).remove([storagePath]);
    } else {
      const target = resolveLocalUpload(storagePath);
      if (target) await fs.rm(target, { force: true });
    }
  } catch (error) {
    console.warn('[storage] failed to delete file', storagePath, error);
  }
}
