import type { MediaKind } from './content-types';

const MB = 1024 * 1024;

export const MEDIA_RULES: Record<MediaKind, { mimePrefixes: string[]; maxBytes: number; label: string }> = {
  image: { mimePrefixes: ['image/'], maxBytes: 15 * MB, label: 'Images up to 15 MB' },
  video: { mimePrefixes: ['video/mp4', 'video/webm', 'video/quicktime'], maxBytes: 200 * MB, label: 'MP4/WebM/MOV videos up to 200 MB' },
  document: { mimePrefixes: ['application/pdf'], maxBytes: 25 * MB, label: 'PDFs up to 25 MB' },
};

export function mediaKindFor(mimeType: string): MediaKind | null {
  for (const [kind, rule] of Object.entries(MEDIA_RULES) as [MediaKind, (typeof MEDIA_RULES)[MediaKind]][]) {
    if (rule.mimePrefixes.some(p => mimeType.startsWith(p))) return kind;
  }
  return null;
}

/** Returns an error message, or null when the file is acceptable. */
export function validateMedia(mimeType: string, size: number, allowed?: MediaKind[]): string | null {
  const kind = mediaKindFor(mimeType);
  if (!kind || (allowed && !allowed.includes(kind))) {
    const kinds = (allowed ?? (Object.keys(MEDIA_RULES) as MediaKind[])).join(', ');
    return `Unsupported file type (${mimeType || 'unknown'}). Allowed: ${kinds}.`;
  }
  if (size > MEDIA_RULES[kind].maxBytes) {
    return `File is too large. ${MEDIA_RULES[kind].label}.`;
  }
  return null;
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < MB) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / MB).toFixed(1)} MB`;
}
