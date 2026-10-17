"use client";
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { MediaItem, MediaKind } from '@/lib/content-types';
import { validateMedia } from '@/lib/media-rules';

type ApiResponse<T> = { success: true; data: T } | { success: false; message?: string };

export async function api<T>(url: string, init?: RequestInit & { json?: unknown }): Promise<T> {
  const { json, ...rest } = init ?? {};
  const res = await fetch(url, {
    credentials: 'same-origin',
    cache: 'no-store',
    ...rest,
    headers: {
      ...(json !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...rest.headers,
    },
    body: json !== undefined ? JSON.stringify(json) : rest.body,
  });
  let payload: ApiResponse<T> | null = null;
  try {
    payload = (await res.json()) as ApiResponse<T>;
  } catch {
    // non-JSON response
  }
  if (!res.ok || !payload || !payload.success) {
    const message = payload && !payload.success && payload.message ? payload.message : `Request failed (${res.status})`;
    throw new Error(message);
  }
  return payload.data;
}

type UploadTicket =
  | { mode: 'supabase'; path: string; token: string; publicUrl: string; bucket: string }
  | { mode: 'local'; path: string };

let browserSupabase: SupabaseClient | null = null;
function getBrowserSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error('Supabase is configured on the server but NEXT_PUBLIC_SUPABASE_ANON_KEY is missing.');
  }
  browserSupabase ??= createClient(url, anonKey, { auth: { persistSession: false } });
  return browserSupabase;
}

function uploadLocal(file: File, path: string, onProgress?: (pct: number) => void) {
  return new Promise<{ url: string; path: string }>((resolve, reject) => {
    const form = new FormData();
    form.append('file', file);
    form.append('path', path);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/admin/uploads/local');
    xhr.withCredentials = true;
    xhr.upload.onprogress = e => {
      if (e.lengthComputable) onProgress?.(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      try {
        const json = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && json.success) resolve(json.data);
        else reject(new Error(json.message || `Upload failed (${xhr.status})`));
      } catch {
        reject(new Error(`Upload failed (${xhr.status})`));
      }
    };
    xhr.onerror = () => reject(new Error('Network error while uploading.'));
    xhr.send(form);
  });
}

export interface UploadOptions {
  allowed?: MediaKind[];
  title?: string;
  caption?: string;
  showInGallery?: boolean;
  onProgress?: (pct: number | null) => void;
}

/** Uploads a file (Supabase or local disk) and registers it in the media library. */
export async function uploadMedia(file: File, options: UploadOptions = {}): Promise<MediaItem> {
  const mimeType = file.type || guessMime(file.name);
  const problem = validateMedia(mimeType, file.size, options.allowed);
  if (problem) throw new Error(problem);

  const { kind, ticket } = await api<{ kind: MediaKind; ticket: UploadTicket }>('/api/admin/uploads', {
    method: 'POST',
    json: { fileName: file.name, mimeType, size: file.size },
  });

  let url: string;
  let path: string;
  if (ticket.mode === 'supabase') {
    options.onProgress?.(null);
    const { error } = await getBrowserSupabase()
      .storage.from(ticket.bucket)
      .uploadToSignedUrl(ticket.path, ticket.token, file, { contentType: mimeType });
    if (error) throw new Error(`Upload failed: ${error.message}`);
    url = ticket.publicUrl;
    path = ticket.path;
  } else {
    ({ url, path } = await uploadLocal(file, ticket.path, pct => options.onProgress?.(pct)));
  }

  return api<MediaItem>('/api/admin/media', {
    method: 'POST',
    json: {
      url,
      path,
      kind,
      mimeType,
      size: file.size,
      title: options.title ?? file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '),
      caption: options.caption ?? '',
      showInGallery: options.showInGallery ?? false,
    },
  });
}

function guessMime(name: string) {
  const ext = name.split('.').pop()?.toLowerCase();
  const map: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    gif: 'image/gif',
    heic: 'image/heic',
    mp4: 'video/mp4',
    mov: 'video/quicktime',
    webm: 'video/webm',
    pdf: 'application/pdf',
  };
  return (ext && map[ext]) || '';
}

export function formatDate(iso?: string, withTime = false) {
  if (!iso) return '—';
  const d = new Date(iso.length === 10 ? `${iso}T12:00:00` : iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...(withTime ? { hour: 'numeric', minute: '2-digit' } : {}),
  });
}

export function formatMoney(amount: number, currency = 'usd') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.toUpperCase() }).format(amount);
}

export function todayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function downloadCsv(fileName: string, rows: Array<Record<string, unknown>>) {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const escape = (v: unknown) => {
    const s = v === undefined || v === null ? '' : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = [headers.join(','), ...rows.map(r => headers.map(h => escape(r[h])).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(link.href);
}
