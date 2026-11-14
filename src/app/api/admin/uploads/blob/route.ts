import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { HttpError, requireAdmin } from '@/lib/server/auth';
import { isBlobEnabled } from '@/lib/server/config';
import { MEDIA_RULES } from '@/lib/media-rules';

export const runtime = 'nodejs';

/**
 * Client uploads large files (videos) straight to Vercel Blob, bypassing the
 * ~4.5 MB serverless request body limit that causes HTTP 413.
 */
export async function POST(request: Request): Promise<NextResponse> {
  if (!isBlobEnabled) {
    return NextResponse.json(
      { success: false, message: 'Vercel Blob is not configured. Set BLOB_READ_WRITE_TOKEN.' },
      { status: 503 }
    );
  }

  try {
    await requireAdmin();
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 401;
    const message = error instanceof Error ? error.message : 'Please sign in to continue.';
    return NextResponse.json({ success: false, message }, { status });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [
          'image/jpeg',
          'image/png',
          'image/webp',
          'image/gif',
          'image/heic',
          'video/mp4',
          'video/webm',
          'video/quicktime',
          'application/pdf',
        ],
        maximumSizeInBytes: MEDIA_RULES.video.maxBytes,
        addRandomSuffix: false,
      }),
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Blob upload failed.';
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
