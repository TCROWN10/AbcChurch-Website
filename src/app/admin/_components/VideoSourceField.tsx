"use client";
import { useState } from 'react';
import { isEmbedLink, resolveVideo } from '@/lib/video-embed';
import MediaPicker from './MediaPicker';
import { TextInput } from './ui';

type Mode = 'link' | 'upload';

function initialMode(url: string): Mode {
  if (!url) return 'link';
  return isEmbedLink(url) ? 'link' : 'upload';
}

export default function VideoSourceField({
  value,
  onChange,
  allowLink = true,
}: {
  value: string;
  onChange: (url: string) => void;
  /** Set false for gallery clips that need a real video file. */
  allowLink?: boolean;
}) {
  const [mode, setMode] = useState<Mode>(() => (allowLink ? initialMode(value) : 'upload'));
  const preview = value ? resolveVideo(value) : null;
  const linkLooksValid = !value || isEmbedLink(value);
  const activeMode = allowLink ? mode : 'upload';

  function switchMode(next: Mode) {
    setMode(next);
    onChange('');
  }

  return (
    <div className="space-y-3">
      {allowLink && (
        <div className="flex rounded-lg bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => switchMode('link')}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-semibold transition ${
              activeMode === 'link' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Paste a link
          </button>
          <button
            type="button"
            onClick={() => switchMode('upload')}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-semibold transition ${
              activeMode === 'upload' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Upload a file
          </button>
        </div>
      )}

      {activeMode === 'link' ? (
        <div className="space-y-2">
          <TextInput
            value={isEmbedLink(value) || !value ? value : ''}
            onChange={e => onChange(e.target.value.trim())}
            placeholder="https://youtube.com/watch?v=… or Facebook / Vimeo link"
          />
          <p className="text-xs text-gray-500">
            Easiest option: upload the service to YouTube or Facebook, then paste the link here.
          </p>
          {value && !linkLooksValid && (
            <p className="text-xs text-amber-700">
              That doesn&apos;t look like a YouTube, Facebook, or Vimeo link. Switch to Upload a file if you have a video
              file instead.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <MediaPicker value={isEmbedLink(value) ? '' : value} onChange={url => onChange(url)} kinds={['video']} allowLink={false} />
          <p className="text-xs text-gray-500">
            MP4, WebM, or MOV · up to 200 MB. On the live site, large files need Vercel Blob — otherwise paste a YouTube
            link (recommended).
          </p>
        </div>
      )}

      {preview && (activeMode === 'link' ? isEmbedLink(value) : !isEmbedLink(value) && value) && (
        <div className="overflow-hidden rounded-xl bg-black ring-1 ring-gray-200 aspect-video">
          {preview.type === 'embed' ? (
            <iframe
              src={preview.src}
              title="Video preview"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video src={preview.src} controls playsInline preload="metadata" className="h-full w-full" />
          )}
        </div>
      )}
    </div>
  );
}
