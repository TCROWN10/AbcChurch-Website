"use client";
import { useEffect, useRef, useState } from 'react';
import type { MediaItem, MediaKind } from '@/lib/content-types';
import { MEDIA_RULES } from '@/lib/media-rules';
import { api, uploadMedia } from '../_lib/api';
import { Button, Drawer, EmptyState, LoadingBlock, Spinner, TextInput, useToast } from './ui';

const ACCEPT: Record<MediaKind, string> = {
  image: 'image/*',
  video: 'video/mp4,video/webm,video/quicktime',
  document: 'application/pdf',
};

export function MediaPreview({ url, kind, className = '' }: { url: string; kind: MediaKind; className?: string }) {
  if (kind === 'video') {
    return <video src={url} className={`bg-black object-cover ${className}`} muted playsInline controls preload="metadata" />;
  }
  if (kind === 'document') {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={`flex flex-col items-center justify-center gap-2 bg-gray-100 text-sm font-medium text-gray-700 ${className}`}>
        <svg className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        Open PDF
      </a>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} alt="" className={`bg-gray-100 object-cover ${className}`} />;
}

export function useUploader() {
  const [progress, setProgress] = useState<number | null | undefined>(undefined);
  const toast = useToast();
  const uploading = progress !== undefined;

  async function upload(file: File, options: Parameters<typeof uploadMedia>[1] = {}) {
    setProgress(0);
    try {
      return await uploadMedia(file, { ...options, onProgress: setProgress });
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Upload failed.', 'error');
      return null;
    } finally {
      setProgress(undefined);
    }
  }

  return { upload, uploading, progress };
}

export function UploadProgress({ progress }: { progress: number | null | undefined }) {
  if (progress === undefined) return null;
  return (
    <div className="flex items-center gap-3 text-sm text-gray-600">
      <Spinner className="h-4 w-4 text-[#FF602E]" />
      {progress === null ? 'Uploading…' : `Uploading… ${progress}%`}
      {progress !== null && (
        <span className="h-1.5 w-32 overflow-hidden rounded-full bg-gray-200">
          <span className="block h-full bg-[#FF602E] transition-all" style={{ width: `${progress}%` }} />
        </span>
      )}
    </div>
  );
}

export function MediaLibraryDrawer({ open, onClose, kinds, onPick }: {
  open: boolean;
  onClose: () => void;
  kinds: MediaKind[];
  onPick: (item: MediaItem) => void;
}) {
  const [items, setItems] = useState<MediaItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const kindKey = kinds.join(',');

  useEffect(() => {
    if (!open) return;
    setItems(null);
    const wanted = kindKey.split(',');
    api<MediaItem[]>('/api/admin/media')
      .then(all => setItems(all.filter(m => wanted.includes(m.kind))))
      .catch(e => setError(e instanceof Error ? e.message : 'Could not load media.'));
  }, [open, kindKey]);

  return (
    <Drawer open={open} onClose={onClose} title="Choose from media library" wide>
      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : !items ? (
        <LoadingBlock />
      ) : items.length === 0 ? (
        <EmptyState title="Nothing here yet" description="Files you upload anywhere in the dashboard are saved to the library." />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onPick(item);
                onClose();
              }}
              className="group overflow-hidden rounded-xl bg-white text-left ring-1 ring-gray-200 hover:ring-2 hover:ring-[#FF602E]"
            >
              {item.kind === 'video' ? (
                <video src={item.url} className="aspect-video w-full bg-black object-cover" muted preload="metadata" />
              ) : item.kind === 'document' ? (
                <div className="flex aspect-video w-full items-center justify-center bg-gray-100 text-xs font-semibold text-gray-600">PDF</div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.url} alt="" className="aspect-video w-full object-cover" />
              )}
              <p className="truncate px-3 py-2 text-xs text-gray-700">{item.title || item.path.split('/').pop()}</p>
            </button>
          ))}
        </div>
      )}
    </Drawer>
  );
}

interface MediaPickerProps {
  value?: string;
  onChange: (url: string, item?: MediaItem) => void;
  kinds?: MediaKind[];
  /** Kind used for previewing the current value. */
  previewKind?: MediaKind;
  allowLink?: boolean;
  aspect?: string;
}

export default function MediaPicker({ value, onChange, kinds = ['image'], previewKind, allowLink = true, aspect = 'aspect-video' }: MediaPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [linkMode, setLinkMode] = useState(false);
  const [dragging, setDragging] = useState(false);
  const { upload, uploading, progress } = useUploader();
  const shownKind = previewKind ?? kinds[0];

  async function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    const item = await upload(file, { allowed: kinds });
    if (item) onChange(item.url, item);
  }

  return (
    <div className="space-y-3">
      <div
        onDragOver={e => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => {
          e.preventDefault();
          setDragging(false);
          void handleFiles(e.dataTransfer.files);
        }}
        className={`relative overflow-hidden rounded-xl border-2 border-dashed transition-colors ${
          dragging ? 'border-[#FF602E] bg-orange-50' : 'border-gray-300 bg-gray-50'
        }`}
      >
        {value ? (
          <MediaPreview url={value} kind={shownKind} className={`w-full ${aspect}`} />
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className={`flex w-full flex-col items-center justify-center gap-2 px-4 text-center text-sm text-gray-500 ${aspect}`}
          >
            <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <span>
              <span className="font-semibold text-[#FF602E]">Click to upload</span> or drag and drop
            </span>
            <span className="text-xs text-gray-400">{kinds.map(k => MEDIA_RULES[k].label).join(' · ')}</span>
          </button>
        )}
      </div>

      <UploadProgress progress={progress} />

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" size="sm" onClick={() => inputRef.current?.click()} loading={uploading}>
          {value ? 'Replace' : 'Upload'}
        </Button>
        <Button variant="secondary" size="sm" onClick={() => setLibraryOpen(true)}>
          Choose from library
        </Button>
        {allowLink && (
          <Button variant="ghost" size="sm" onClick={() => setLinkMode(v => !v)}>
            {linkMode ? 'Hide link' : 'Use a link'}
          </Button>
        )}
        {value && (
          <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => onChange('')}>
            Remove
          </Button>
        )}
      </div>

      {linkMode && (
        <TextInput
          value={value ?? ''}
          onChange={e => onChange(e.target.value)}
          placeholder="https://… or /images/…"
        />
      )}

      <input
        ref={inputRef}
        type="file"
        accept={kinds.map(k => ACCEPT[k]).join(',')}
        className="hidden"
        onChange={e => {
          void handleFiles(e.target.files);
          e.target.value = '';
        }}
      />
      <MediaLibraryDrawer open={libraryOpen} onClose={() => setLibraryOpen(false)} kinds={kinds} onPick={item => onChange(item.url, item)} />
    </div>
  );
}
