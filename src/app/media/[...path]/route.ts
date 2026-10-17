import { createReadStream, promises as fs } from 'node:fs';
import path from 'node:path';
import { Readable } from 'node:stream';
import { resolveLocalUpload } from '@/lib/server/storage';

export const dynamic = 'force-dynamic';

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
  '.heic': 'image/heic',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.pdf': 'application/pdf',
};

function notFound() {
  return new Response('Not found', { status: 404 });
}

/** Serves files uploaded to the local / Railway-volume upload directory, with range support for video. */
export async function GET(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await params;
  const filePath = resolveLocalUpload(segments.join('/'));
  if (!filePath) return notFound();

  let size: number;
  try {
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) return notFound();
    size = stat.size;
  } catch {
    return notFound();
  }

  const ext = path.extname(filePath).toLowerCase();
  const headers = new Headers({
    'Content-Type': MIME[ext] ?? 'application/octet-stream',
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'public, max-age=31536000, immutable',
    'X-Content-Type-Options': 'nosniff',
  });
  if (ext === '.svg') headers.set('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'");

  const range = request.headers.get('range')?.match(/^bytes=(\d*)-(\d*)$/);
  if (range && (range[1] || range[2])) {
    let start = range[1] ? Number(range[1]) : size - Number(range[2]);
    let end = range[1] && range[2] ? Number(range[2]) : size - 1;
    start = Math.max(0, start);
    end = Math.min(end, size - 1);
    if (start > end || start >= size) {
      return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${size}` } });
    }
    headers.set('Content-Range', `bytes ${start}-${end}/${size}`);
    headers.set('Content-Length', String(end - start + 1));
    const stream = Readable.toWeb(createReadStream(filePath, { start, end })) as ReadableStream;
    return new Response(stream, { status: 206, headers });
  }

  headers.set('Content-Length', String(size));
  const stream = Readable.toWeb(createReadStream(filePath)) as ReadableStream;
  return new Response(stream, { status: 200, headers });
}
