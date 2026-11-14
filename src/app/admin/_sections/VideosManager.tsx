"use client";
import { useMemo, useState } from 'react';
import type { MediaItem, Sermon } from '@/lib/content-types';
import { isEmbedLink } from '@/lib/video-embed';
import { formatDate, todayIso } from '../_lib/api';
import { useCollection } from '../_lib/hooks';
import VideoSourceField from '../_components/VideoSourceField';
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
  TextInput,
  Toggle,
  useAction,
} from '../_components/ui';

type Destination = 'sermon' | 'gallery';

type Form = {
  destination: Destination;
  date: string;
  title: string;
  preacher: string;
  videoUrl: string;
  showInGallery: boolean;
};

const emptyForm = (): Form => ({
  destination: 'sermon',
  date: todayIso(),
  title: '',
  preacher: 'Pastor Emmanuel Bolaji',
  videoUrl: '',
  showInGallery: true,
});

export default function VideosManager() {
  const sermons = useCollection('sermons');
  const media = useCollection('media');
  const run = useAction();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Form>(emptyForm);
  const [saving, setSaving] = useState(false);

  const sermonVideos = useMemo(
    () => sermons.items.filter(s => Boolean(s.videoUrl)).sort((a, b) => b.date.localeCompare(a.date)),
    [sermons.items]
  );
  const galleryVideos = useMemo(
    () => media.items.filter(m => m.kind === 'video').sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [media.items]
  );

  const set = <K extends keyof Form>(key: K, value: Form[K]) => setForm(prev => ({ ...prev, [key]: value }));

  function startPost() {
    setForm(emptyForm());
    setOpen(true);
  }

  async function publish() {
    if (!form.videoUrl.trim()) {
      await run(async () => {
        throw new Error('Add a video link or upload a file first.');
      });
      return;
    }
    if (form.destination === 'sermon' && !form.title.trim()) {
      await run(async () => {
        throw new Error('Add a title for the sermon video.');
      });
      return;
    }

    setSaving(true);
    const ok = await run(async () => {
      if (form.destination === 'sermon') {
        const existing = sermons.items.find(s => s.date === form.date);
        const payload = {
          date: form.date,
          title: form.title.trim(),
          preacher: form.preacher.trim(),
          scripture: existing?.scripture ?? '',
          excerpt: existing?.excerpt ?? '',
          body: existing?.body ?? '',
          coverImage: existing?.coverImage ?? '',
          videoUrl: form.videoUrl.trim(),
          status: 'published' as const,
        };
        if (existing) await sermons.update(existing.id, payload);
        else await sermons.create(payload);
      } else {
        if (isEmbedLink(form.videoUrl)) {
          throw new Error('Gallery clips need an uploaded video file. For YouTube/Facebook links, choose “Sunday sermon page”.');
        }
        const existing = media.items.find(m => m.url === form.videoUrl);
        if (!existing) {
          throw new Error('Upload the video file first, then click Publish.');
        }
        await media.update(existing.id, {
          title: form.title.trim() || existing.title || 'Church video',
          caption: existing.caption ?? '',
          showInGallery: form.showInGallery,
        });
      }
    }, form.destination === 'sermon' ? 'Sermon video published.' : 'Video posted to the gallery.');
    setSaving(false);
    if (ok) {
      setOpen(false);
      await Promise.all([sermons.reload(), media.reload()]);
    }
  }

  async function removeSermonVideo(sermon: Sermon) {
    await run(
      () =>
        sermons.update(sermon.id, {
          date: sermon.date,
          title: sermon.title,
          preacher: sermon.preacher ?? '',
          scripture: sermon.scripture ?? '',
          excerpt: sermon.excerpt ?? '',
          body: sermon.body,
          coverImage: sermon.coverImage ?? '',
          videoUrl: '',
          status: sermon.status,
        }),
      'Video removed from sermon.'
    );
  }

  async function removeGalleryVideo(item: MediaItem) {
    await run(() => media.remove(item.id), 'Video deleted.');
  }

  const loading = (sermons.loading || media.loading) && sermonVideos.length === 0 && galleryVideos.length === 0;
  const error = sermons.error || media.error;

  return (
    <>
      <PageHeader
        title="Videos"
        description="Post a Sunday sermon recording or a short clip for the gallery. Paste a YouTube/Facebook link, or upload the file."
        actions={<Button onClick={startPost}>Post a video</Button>}
      />

      <div className="mb-6 rounded-2xl border border-[#FF602E]/30 bg-orange-50/60 p-5">
        <p className="text-sm font-semibold text-gray-900">Fastest way to post</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-gray-700">
          <li>Upload the service to YouTube or Facebook (or keep the MP4 ready).</li>
          <li>Click <strong>Post a video</strong>.</li>
          <li>Choose Sermon page or Gallery, add the title, paste the link or upload, then Publish.</li>
        </ol>
      </div>

      {error ? (
        <ErrorBlock message={error} onRetry={() => void Promise.all([sermons.reload(), media.reload()])} />
      ) : loading ? (
        <LoadingBlock />
      ) : (
        <div className="space-y-8">
          <section>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-gray-900">Sermon videos</h2>
              <Button variant="secondary" size="sm" onClick={startPost}>
                Post sermon video
              </Button>
            </div>
            {sermonVideos.length === 0 ? (
              <EmptyState
                title="No sermon videos yet"
                description="Post your first Sunday recording — it will appear on the Sermon page."
              />
            ) : (
              <ul className="divide-y divide-gray-100 overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200">
                {sermonVideos.map(s => (
                  <li key={s.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900">{s.title}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(s.date)}
                        {s.preacher ? ` · ${s.preacher}` : ''}
                        {isEmbedLink(s.videoUrl || '') ? ' · Link' : ' · Uploaded file'}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone={s.status === 'published' ? 'green' : 'gray'}>{s.status}</Badge>
                      <Button variant="secondary" size="sm" onClick={() => window.open(`/sermon/${s.date}`, '_blank')}>
                        View
                      </Button>
                      <ConfirmDelete label="Remove video" onConfirm={() => removeSermonVideo(s)} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-gray-900">Gallery videos</h2>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setForm({ ...emptyForm(), destination: 'gallery' });
                  setOpen(true);
                }}
              >
                Post gallery video
              </Button>
            </div>
            {galleryVideos.length === 0 ? (
              <EmptyState title="No gallery videos yet" description="Short clips from services and events can live here." />
            ) : (
              <ul className="divide-y divide-gray-100 overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200">
                {galleryVideos.map(item => (
                  <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900">{item.title || 'Untitled video'}</p>
                      <p className="text-xs text-gray-500">{formatDate(item.createdAt, true)}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {item.showInGallery ? <Badge tone="green">Public</Badge> : <Badge>Library only</Badge>}
                      <Button variant="secondary" size="sm" onClick={() => window.open('/gallery', '_blank')}>
                        Gallery
                      </Button>
                      <ConfirmDelete onConfirm={() => removeGalleryVideo(item)} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Post a video"
        wide
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={publish} loading={saving}>
              Publish
            </Button>
          </>
        }
      >
        <div className="space-y-5">
          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">Where should it appear?</p>
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setForm(prev => ({ ...prev, destination: 'sermon', videoUrl: '' }))}
                className={`flex-1 rounded-md px-3 py-2 text-sm font-semibold transition ${
                  form.destination === 'sermon' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Sunday sermon page
              </button>
              <button
                type="button"
                onClick={() => setForm(prev => ({ ...prev, destination: 'gallery', videoUrl: '' }))}
                className={`flex-1 rounded-md px-3 py-2 text-sm font-semibold transition ${
                  form.destination === 'gallery' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Photo & video gallery
              </button>
            </div>
          </div>

          {form.destination === 'sermon' ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Service date">
                <TextInput type="date" value={form.date} onChange={e => set('date', e.target.value)} />
              </Field>
              <Field label="Preacher">
                <TextInput value={form.preacher} onChange={e => set('preacher', e.target.value)} />
              </Field>
              <Field label="Title" className="sm:col-span-2" hint="If a sermon already exists for this date, the video is added to it.">
                <TextInput
                  value={form.title}
                  onChange={e => set('title', e.target.value)}
                  maxLength={200}
                  placeholder="Obedience: The gateway to Glory…"
                />
              </Field>
            </div>
          ) : (
            <div className="space-y-4">
              <Field label="Title (optional)">
                <TextInput
                  value={form.title}
                  onChange={e => set('title', e.target.value)}
                  maxLength={160}
                  placeholder="Youth night highlight"
                />
              </Field>
              <Toggle
                checked={form.showInGallery}
                onChange={v => set('showInGallery', v)}
                label="Show on the public gallery"
              />
            </div>
          )}

          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">Video</p>
            <VideoSourceField
              key={form.destination}
              value={form.videoUrl}
              onChange={url => set('videoUrl', url)}
              allowLink={form.destination === 'sermon'}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
}
