"use client";
import { useState } from 'react';
import type { Devotional, PublishStatus } from '@/lib/content-types';
import { todayIso } from '../_lib/api';
import { useCollection } from '../_lib/hooks';
import MediaPicker from '../_components/MediaPicker';
import PostList from '../_components/PostList';
import RichTextEditor from '../_components/RichTextEditor';
import { Button, Drawer, Field, PageHeader, TextArea, TextInput, useAction } from '../_components/ui';

type Form = {
  date: string;
  title: string;
  memoryVerse: string;
  bibleReading: string;
  body: string;
  coverImage: string;
  status: PublishStatus;
};

const emptyForm = (): Form => ({
  date: todayIso(),
  title: '',
  memoryVerse: '',
  bibleReading: '',
  body: '',
  coverImage: '',
  status: 'published',
});

export default function DevotionalsManager() {
  const devotionals = useCollection('devotionals');
  const run = useAction();
  const [editingId, setEditingId] = useState<string | 'new' | null>(null);
  const [form, setForm] = useState<Form>(emptyForm);
  const [saving, setSaving] = useState(false);

  function open(item?: Devotional) {
    setEditingId(item?.id ?? 'new');
    setForm(
      item
        ? {
            date: item.date,
            title: item.title,
            memoryVerse: item.memoryVerse ?? '',
            bibleReading: item.bibleReading ?? '',
            body: item.body,
            coverImage: item.coverImage ?? '',
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
      () => (editingId === 'new' ? devotionals.create(payload) : devotionals.update(editingId!, payload)),
      status === 'published' ? 'Devotional published.' : 'Draft saved.'
    );
    setSaving(false);
    if (ok) setEditingId(null);
  }

  return (
    <>
      <PageHeader
        title="Daily Devotionals"
        description="Write or paste today's devotional. Pasting straight from WhatsApp keeps *bold* and _italic_ formatting."
        actions={<Button onClick={() => open()}>New devotional</Button>}
      />

      <PostList
        noun="devotional"
        rows={devotionals.items.map(d => ({ id: d.id, date: d.date, title: d.title, status: d.status, subtitle: d.memoryVerse }))}
        loading={devotionals.loading}
        error={devotionals.error}
        onRetry={devotionals.reload}
        onCreate={() => open()}
        onEdit={id => open(devotionals.items.find(d => d.id === id))}
        onDelete={id => run(() => devotionals.remove(id), 'Devotional deleted.')}
        viewHref={row => `/devotional/${row.date}`}
      />

      <Drawer
        open={editingId !== null}
        onClose={() => setEditingId(null)}
        title={editingId === 'new' ? 'New devotional' : 'Edit devotional'}
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
            <Field label="Date" className="sm:col-span-1">
              <TextInput type="date" value={form.date} onChange={e => set('date', e.target.value)} required />
            </Field>
            <Field label="Title" className="sm:col-span-2">
              <TextInput value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Sing For Joy" maxLength={200} />
            </Field>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Memory verse (optional)">
              <TextArea rows={3} value={form.memoryVerse} onChange={e => set('memoryVerse', e.target.value)} placeholder="Psalm 95:1 — Come, let us sing for joy to the Lord…" />
            </Field>
            <Field label="Bible reading (optional)">
              <TextArea rows={3} value={form.bibleReading} onChange={e => set('bibleReading', e.target.value)} placeholder="Psalm 95:1-7" />
            </Field>
          </div>
          <div>
            <p className="mb-1.5 text-sm font-medium text-gray-700">Message</p>
            <RichTextEditor
              resetKey={editingId ?? 'closed'}
              value={form.body}
              onChange={html => set('body', html)}
              placeholder="Write or paste the devotional here…"
            />
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
