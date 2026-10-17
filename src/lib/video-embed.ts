export type VideoSource =
  | { type: 'embed'; src: string }
  | { type: 'file'; src: string };

/** Turns a YouTube / Vimeo link into an embeddable URL, or treats anything else as a direct video file. */
export function resolveVideo(url: string): VideoSource {
  try {
    const parsed = new URL(url, 'https://local.invalid');
    const host = parsed.hostname.replace(/^www\.|^m\./, '');

    if (host === 'youtu.be') {
      return { type: 'embed', src: `https://www.youtube.com/embed/${parsed.pathname.slice(1)}` };
    }
    if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      const id =
        parsed.searchParams.get('v') ||
        parsed.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/)?.[1];
      if (id) return { type: 'embed', src: `https://www.youtube.com/embed/${id}` };
    }
    if (host === 'vimeo.com') {
      const id = parsed.pathname.match(/^\/(\d+)/)?.[1];
      if (id) return { type: 'embed', src: `https://player.vimeo.com/video/${id}` };
    }
    if (host === 'facebook.com' || host === 'fb.watch') {
      return {
        type: 'embed',
        src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false`,
      };
    }
  } catch {
    // fall through
  }
  return { type: 'file', src: url };
}
