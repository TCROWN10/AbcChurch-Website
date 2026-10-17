"use client";
import { useMemo, useRef, useState } from 'react';
import type { MediaItem } from '@/lib/content-types';
import { formatBytes, MEDIA_RULES } from '@/lib/media-rules';
import { formatDate, uploadMedia } from '../_lib/api';
import { useCollection } from '../_lib/hooks';
import { MediaPreview } from '../_components/MediaPicker';
import {
  Badge,
  Button,
  ConfirmDelete,
  Drawer,
  EmptyState,
  ErrorBlock,
  Field,
  LoadingBlock,
  PageHeader,
  Spinner,
  TextArea,
  TextInput,
  Toggle,
  useAction,
  useToast,
} from '../_components/ui';

type Filter = 'gallery' | 'image' | 'video' | 'document' | 'all';

const FILTERS: Array<{ id: Filter; label: string }> = [
  { id: 'all', label: 'Everything' },
  { id: 'gallery', label: 'On public gallery' },
  { id: 'image', label: 'Photos' },
  { id: 'video', label: 'Videos' },
  { id: 'document', label: 'PDFs' },
];

type QueueItem = { name: string; progress: number | null; error?: string; done?: boolean };

export default function GalleryManager() {
  const media = useCollection('media');
  const run = useAction();
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [publishUploads, setPublishUploads] = useState(true);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [dragging, setDragging] = useState(false);
  const [editing, setEditing] = useState<MediaItem | null>(null);
  const [saving, setSaving] = useState(false);

  const visible = useMemo(
    () =>
      media.items.filter(m =>
        filter === 'all' ? true : filter === 'gallery' ? m.showInGallery : m.kind === filter
      ),
    [media.items, filter]
  );

  async function uploadAll(files: FileList | null) {
    if (!files || files.length === 0) return;
    const list = Array.from(files);
    setQueue(list.map(f => ({ name: f.name, progress: 0 })));
    let uploaded = 0;
    for (const [i, file] of list.entries()) {
      const update = (patch: Partial<QueueItem>) =>
        setQueue(prev => prev.map((q, j) => (j === i ? { ...q, ...patch } : q)));
      try {
        await uploadMedia(file, {
          showInGallery: publishUploads && !file.type.includes('pdf'),
          onProgress: progress => update({ progress }),
        });
        uploaded++;
        update({ done: true, progress: 100 });
      } catch (e) {
        update({ error: e instanceof Error ? e.message : 'Upload failed' });
      }
    }
    await media.reload();
    if (uploaded) toast(`${uploaded} file${uploaded === 1 ? '' : 's'} uploaded.`);
    setTimeout(() => setQueue(prev => prev.filter(q => q.error)), 2500);
  }

  async function saveEdit() {
    if (!editing) return;
    setSaving(true);
    const ok = await run(
      () => media.update(editing.id, { title: editing.title ?? '', caption: editing.caption ?? '', showInGallery: editing.showInGallery }),
      'Saved.'
    );
    setSaving(false);
    if (ok) setEditing(null);
  }

  return (
    <>
      <PageHeader
        title="Photos & Videos"
        description="Upload pictures and videos from church. Anything marked “On public gallery” shows on the Gallery page and the home page."
        actions={<Button onClick={() => inputRef.current?.click()}>Upload files</Button>}
      />

      <div
        onDragOver={e => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => {
          e.preventDefault();
          setDragging(false);
          void uploadAll(e.dataTransfer.files);
        }}
        className={`mb-6 rounded-2xl border-2 border-dashed p-6 text-center transition-colors ${
          dragging ? 'border-[#FF602E] bg-orange-50' : 'border-gray-300 bg-white'
        }`}
      >
        <p className="text-sm text-gray-600">
          <button type="button" onClick={() => inputRef.current?.click()} className="font-semibold text-[#FF602E] hover:underline">
            Choose photos or videos
          </button>{' '}
          or drag them here. You can select many at once.
        </p>
        <p className="mt-1 text-xs text-gray-400">
          {MEDIA_RULES.image.label} · {MEDIA_RULES.video.label}
        </p>
        <div className="mt-4 flex justify-center">
          <Toggle checked={publishUploads} onChange={setPublishUploads} label="Show new uploads on the public gallery" />
        </div>
        {queue.length > 0 && (
          <ul className="mx-auto mt-4 max-w-lg space-y-2 text-left">
            {queue.map((q, i) => (
              <li key={`${q.name}-${i}`} className="flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-2 text-xs">
                {q.error ? (
                  <span className="text-red-600">✕</span>
                ) : q.done ? (
                  <span className="text-emerald-600">✓</span>
                ) : (
                  <Spinner className="h-3.5 w-3.5 text-[#FF602E]" />
                )}
                <span className="min-w-0 flex-1 truncate text-gray-700">{q.name}</span>
                <span className={q.error ? 'text-red-600' : 'text-gray-500'}>
                  {q.error ?? (q.done ? 'Done' : q.progress === null ? 'Uploading…' : `${q.progress}%`)}
                </span>
              </li>
            ))}
          </ul>
        )}
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,video/mp4,video/webm,video/quicktime,application/pdf"
          className="hidden"
          onChange={e => {
            void uploadAll(e.target.files);
            e.target.value = '';
          }}
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map(f => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
              filter === f.id ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {media.error ? (
        <ErrorBlock message={media.error} onRetry={media.reload} />
      ) : media.loading && media.items.length === 0 ? (
        <LoadingBlock />
      ) : visible.length === 0 ? (
        <EmptyState title="Nothing here yet" description="Upload photos and videos from services, events and outreach." />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {visible.map(item => (
            <div key={item.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
              <MediaPreview url={item.url} kind={item.kind} className="aspect-video w-full" />
              <div className="space-y-2 p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="min-w-0 truncate text-sm font-semibold text-gray-900">{item.title || 'Untitled'}</p>
                  {item.showInGallery ? <Badge tone="green">Public</Badge> : <Badge>Library only</Badge>}
                </div>
                {item.caption && <p className="line-clamp-2 text-xs text-gray-600">{item.caption}</p>}
                <p className="text-xs text-gray-400">
                  {formatBytes(item.size)} · {formatDate(item.createdAt)}
                </p>
                <div className="flex flex-wrap items-center gap-1 pt-1">
                  <Button variant="secondary" size="sm" onClick={() => setEditing(item)}>Edit</Button>
                  {item.kind !== 'document' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        run(() => media.update(item.id, { title: item.title ?? '', caption: item.caption ?? '', showInGallery: !item.showInGallery }),
                          item.showInGallery ? 'Removed from public gallery.' : 'Now showing on the public gallery.')
                      }
                    >
                      {item.showInGallery ? 'Hide' : 'Show on site'}
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const link = new URL(item.url, window.location.origin).toString();
                      void navigator.clipboard.writeText(link).then(() => toast('Link copied.'));
                    }}
                  >
                    Copy link
                  </Button>
                  <ConfirmDelete onConfirm={() => run(() => media.remove(item.id), 'Deleted.')} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Drawer
        open={editing !== null}
        onClose={() => setEditing(null)}
        title="Edit photo or video"
        footer={
          <>
            <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={saveEdit} loading={saving}>Save</Button>
          </>
        }
      >
        {editing && (
          <div className="space-y-4">
            <MediaPreview url={editing.url} kind={editing.kind} className="aspect-video w-full rounded-xl" />
            <Field label="Title">
              <TextInput value={editing.title ?? ''} maxLength={160} onChange={e => setEditing({ ...editing, title: e.target.value })} />
            </Field>
            <Field label="Caption" hint="Shown when someone opens the photo on the gallery page.">
              <TextArea rows={3} maxLength={500} value={editing.caption ?? ''} onChange={e => setEditing({ ...editing, caption: e.target.value })} />
            </Field>
            {editing.kind !== 'document' && (
              <Toggle checked={editing.showInGallery} onChange={v => setEditing({ ...editing, showInGallery: v })} label="Show on the public gallery" />
            )}
          </div>
        )}
      </Drawer>
    </>
  );
}
