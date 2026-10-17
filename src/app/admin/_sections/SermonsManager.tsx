"use client";
import { useEffect, useState } from 'react';
import type { BulletinSettings, PublishStatus, Sermon } from '@/lib/content-types';
import { api, todayIso } from '../_lib/api';
import { useCollection } from '../_lib/hooks';
import MediaPicker from '../_components/MediaPicker';
import PostList from '../_components/PostList';
import RichTextEditor from '../_components/RichTextEditor';
import { Button, Card, Drawer, Field, LoadingBlock, PageHeader, TextArea, TextInput, useAction } from '../_components/ui';

type Form = {
  date: string;
  title: string;
  preacher: string;
  scripture: string;
  excerpt: string;
  body: string;
  coverImage: string;
  videoUrl: string;
  status: PublishStatus;
};

const emptyForm = (): Form => ({
  date: todayIso(),
  title: '',
  preacher: '',
  scripture: '',
  excerpt: '',
  body: '',
  coverImage: '',
  videoUrl: '',
  status: 'published',
});

function isEmbedLink(url: string) {
  return /youtu\.?be|vimeo\.com|facebook\.com|fb\.watch/.test(url);
}

function BulletinCard() {
  const [bulletin, setBulletin] = useState<BulletinSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const run = useAction();

  useEffect(() => {
    api<BulletinSettings>('/api/admin/settings/bulletin').then(setBulletin).catch(() => undefined);
  }, []);

  if (!bulletin) return <Card title="Weekly bulletin"><LoadingBlock /></Card>;

  const set = <K extends keyof BulletinSettings>(key: K, value: BulletinSettings[K]) => setBulletin({ ...bulletin, [key]: value });

  async function save() {
    if (!bulletin) return;
    setSaving(true);
    await run(
      () => api<BulletinSettings>('/api/admin/settings/bulletin', { method: 'PUT', json: { ...bulletin, updatedLabel: bulletin.updatedLabel ?? '' } }).then(setBulletin),
      'Bulletin updated on the sermon page.'
    );
    setSaving(false);
  }

  return (
    <Card title="Weekly bulletin" actions={<Button size="sm" onClick={save} loading={saving}>Save bulletin</Button>}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Field label="Title">
            <TextInput value={bulletin.title} onChange={e => set('title', e.target.value)} />
          </Field>
          <Field label="Short note (optional)" hint='e.g. "Sunday, December 7"'>
            <TextInput value={bulletin.updatedLabel ?? ''} onChange={e => set('updatedLabel', e.target.value)} />
          </Field>
          <div>
            <p className="mb-1.5 text-sm font-medium text-gray-700">Bulletin PDF</p>
            <MediaPicker value={bulletin.pdfUrl} onChange={url => set('pdfUrl', url)} kinds={['document']} aspect="aspect-[3/1]" />
          </div>
        </div>
        <div>
          <p className="mb-1.5 text-sm font-medium text-gray-700">Preview image</p>
          <p className="mb-2 text-xs text-gray-500">A screenshot of the first page, shown on the sermon page.</p>
          <MediaPicker value={bulletin.previewImage} onChange={url => set('previewImage', url)} kinds={['image']} aspect="aspect-[4/3]" />
        </div>
      </div>
    </Card>
  );
}

export default function SermonsManager() {
  const sermons = useCollection('sermons');
  const run = useAction();
  const [editingId, setEditingId] = useState<string | 'new' | null>(null);
  const [form, setForm] = useState<Form>(emptyForm);
  const [saving, setSaving] = useState(false);

  function open(item?: Sermon) {
    setEditingId(item?.id ?? 'new');
    setForm(
      item
        ? {
            date: item.date,
            title: item.title,
            preacher: item.preacher ?? '',
            scripture: item.scripture ?? '',
            excerpt: item.excerpt ?? '',
            body: item.body,
            coverImage: item.coverImage ?? '',
            videoUrl: item.videoUrl ?? '',
            status: item.status,
          }
        : emptyForm()
    );
  }

  const set = <K extends keyof Form>(key: K, value: Form[K]) => setForm(prev => ({ ...prev, [key]: value }));

  async function save(status: PublishStatus) {
    setSaving(true);
    const payload = { ...form, status };
    const ok = await run(
      () => (editingId === 'new' ? sermons.create(payload) : sermons.update(editingId!, payload)),
      status === 'published' ? 'Sermon published.' : 'Draft saved.'
    );
    setSaving(false);
    if (ok) setEditingId(null);
  }

  return (
    <>
      <PageHeader
        title="Sermons & Bulletin"
        description="Post Sunday messages with notes, a video recording, and the weekly bulletin."
        actions={<Button onClick={() => open()}>New sermon</Button>}
      />

      <div className="space-y-6">
        <PostList
          noun="sermon"
          rows={sermons.items.map(s => ({
            id: s.id,
            date: s.date,
            title: s.title,
            status: s.status,
            subtitle: [s.preacher, s.scripture, s.videoUrl ? 'Has video' : ''].filter(Boolean).join(' · '),
          }))}
          loading={sermons.loading}
          error={sermons.error}
          onRetry={sermons.reload}
          onCreate={() => open()}
          onEdit={id => open(sermons.items.find(s => s.id === id))}
          onDelete={id => run(() => sermons.remove(id), 'Sermon deleted.')}
          viewHref={row => `/sermon/${row.date}`}
        />
        <BulletinCard />
      </div>

      <Drawer
        open={editingId !== null}
        onClose={() => setEditingId(null)}
        title={editingId === 'new' ? 'New sermon' : 'Edit sermon'}
        wide
        footer={
          <>
            <Button variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
            <Button variant="secondary" onClick={() => save('draft')} loading={saving}>
              {form.status === 'published' && editingId !== 'new' ? 'Unpublish' : 'Save as draft'}
            </Button>
            <Button onClick={() => save('published')} loading={saving}>
              {form.status === 'published' && editingId !== 'new' ? 'Update' : 'Publish'}
            </Button>
          </>
        }
      >
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Date">
              <TextInput type="date" value={form.date} onChange={e => set('date', e.target.value)} />
            </Field>
            <Field label="Title" className="sm:col-span-2">
              <TextInput value={form.title} onChange={e => set('title', e.target.value)} maxLength={200} />
            </Field>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Preacher">
              <TextInput value={form.preacher} onChange={e => set('preacher', e.target.value)} placeholder="Pastor Emmanuel Bolaji" />
            </Field>
            <Field label="Main scripture">
              <TextInput value={form.scripture} onChange={e => set('scripture', e.target.value)} placeholder="1 Samuel 15:22" />
            </Field>
          </div>
          <Field label="Short summary" hint="Shown on the sermon list (up to 600 characters).">
            <TextArea rows={3} value={form.excerpt} maxLength={600} onChange={e => set('excerpt', e.target.value)} />
          </Field>

          <div className="rounded-xl bg-white p-4 ring-1 ring-gray-200">
            <p className="text-sm font-medium text-gray-700">Sermon video (optional)</p>
            <p className="mb-3 text-xs text-gray-500">Paste a YouTube, Facebook or Vimeo link, or upload the video file.</p>
            <TextInput
              value={isEmbedLink(form.videoUrl) ? form.videoUrl : ''}
              onChange={e => set('videoUrl', e.target.value)}
              placeholder="https://youtube.com/watch?v=…"
            />
            {!isEmbedLink(form.videoUrl) && (
              <div className="mt-3">
                <MediaPicker value={form.videoUrl} onChange={url => set('videoUrl', url)} kinds={['video']} allowLink={false} />
              </div>
            )}
          </div>

          <div>
            <p className="mb-1.5 text-sm font-medium text-gray-700">Sermon notes</p>
            <RichTextEditor resetKey={editingId ?? 'closed'} value={form.body} onChange={html => set('body', html)} placeholder="Write or paste the sermon notes…" />
          </div>
          <div>
            <p className="mb-1.5 text-sm font-medium text-gray-700">Cover photo (optional)</p>
            <MediaPicker value={form.coverImage} onChange={url => set('coverImage', url)} kinds={['image']} />
          </div>
        </div>
      </Drawer>
    </>
  );
}
