"use client";
import { useState } from 'react';
import type { ChurchEvent } from '@/lib/content-types';
import { formatDate } from '../_lib/api';
import { useCollection } from '../_lib/hooks';
import MediaPicker from '../_components/MediaPicker';
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
  TextArea,
  TextInput,
  Toggle,
  useAction,
} from '../_components/ui';

type Form = {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  flierImage: string;
  active: boolean;
  sortOrder: number;
};

const emptyForm = (sortOrder: number): Form => ({
  title: '',
  date: '',
  time: '',
  location: 'Bettendorf Community Center',
  description: '',
  flierImage: '',
  active: true,
  sortOrder,
});

function toForm(item: ChurchEvent, patch: Partial<Form> = {}): Form {
  return {
    title: item.title,
    date: item.date ?? '',
    time: item.time ?? '',
    location: item.location ?? '',
    description: item.description ?? '',
    flierImage: item.flierImage ?? '',
    active: item.active,
    sortOrder: item.sortOrder,
    ...patch,
  };
}

export default function EventsManager() {
  const events = useCollection('events');
  const run = useAction();
  const [editingId, setEditingId] = useState<string | 'new' | null>(null);
  const [form, setForm] = useState<Form>(emptyForm(0));
  const [saving, setSaving] = useState(false);

  function open(item?: ChurchEvent) {
    setEditingId(item?.id ?? 'new');
    setForm(item ? toForm(item) : emptyForm(events.items.length));
  }

  const set = <K extends keyof Form>(key: K, value: Form[K]) => setForm(prev => ({ ...prev, [key]: value }));

  async function save() {
    setSaving(true);
    const ok = await run(
      () => (editingId === 'new' ? events.create(form) : events.update(editingId!, form)),
      'Event saved.'
    );
    setSaving(false);
    if (ok) setEditingId(null);
  }

  async function move(item: ChurchEvent, direction: -1 | 1) {
    const list = [...events.items];
    const index = list.findIndex(e => e.id === item.id);
    const target = index + direction;
    if (target < 0 || target >= list.length) return;
    [list[index], list[target]] = [list[target], list[index]];
    await run(async () => {
      await Promise.all(list.map((e, i) => (e.sortOrder === i ? null : events.update(e.id, toForm(e, { sortOrder: i })))));
      await events.reload();
    });
  }

  function toggleActive(item: ChurchEvent) {
    return run(
      () => events.update(item.id, toForm(item, { active: !item.active })),
      item.active ? 'Hidden from the home page.' : 'Now showing on the home page.'
    );
  }

  return (
    <>
      <PageHeader
        title="Events & Fliers"
        description="Fliers shown in the “Upcoming events” section of the home page. Active fliers rotate in the order below."
        actions={<Button onClick={() => open()}>New event</Button>}
      />

      {events.error ? (
        <ErrorBlock message={events.error} onRetry={events.reload} />
      ) : events.loading && events.items.length === 0 ? (
        <LoadingBlock />
      ) : events.items.length === 0 ? (
        <EmptyState title="No events yet" description="Add your Sunday service flier or an upcoming event." action={<Button onClick={() => open()}>New event</Button>} />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {events.items.map((item, i) => (
            <div key={item.id} className={`overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 ${item.active ? '' : 'opacity-70'}`}>
              {item.flierImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.flierImage} alt="" className="aspect-[4/3] w-full bg-gray-100 object-cover" />
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center bg-gray-100 text-sm text-gray-400">No flier</div>
              )}
              <div className="space-y-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  {item.active ? <Badge tone="green">Showing</Badge> : <Badge>Hidden</Badge>}
                </div>
                <p className="text-xs text-gray-500">
                  {[item.date && formatDate(item.date), item.time, item.location].filter(Boolean).join(' · ') || 'No date set'}
                </p>
                <div className="flex flex-wrap items-center gap-1 pt-1">
                  <Button variant="secondary" size="sm" onClick={() => open(item)}>Edit</Button>
                  <Button variant="ghost" size="sm" onClick={() => toggleActive(item)}>{item.active ? 'Hide' : 'Show'}</Button>
                  <Button variant="ghost" size="sm" disabled={i === 0} onClick={() => move(item, -1)} aria-label="Move earlier">↑</Button>
                  <Button variant="ghost" size="sm" disabled={i === events.items.length - 1} onClick={() => move(item, 1)} aria-label="Move later">↓</Button>
                  <ConfirmDelete onConfirm={() => run(() => events.remove(item.id), 'Event deleted.')} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Drawer
        open={editingId !== null}
        onClose={() => setEditingId(null)}
        title={editingId === 'new' ? 'New event' : 'Edit event'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
            <Button onClick={save} loading={saving}>Save event</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <p className="mb-1.5 text-sm font-medium text-gray-700">Flier</p>
            <MediaPicker value={form.flierImage} onChange={url => set('flierImage', url)} kinds={['image']} aspect="aspect-[4/3]" />
          </div>
          <Field label="Title">
            <TextInput value={form.title} onChange={e => set('title', e.target.value)} placeholder="Sunday Service" />
          </Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Date (optional)" hint="Leave empty for weekly events.">
              <TextInput type="date" value={form.date} onChange={e => set('date', e.target.value)} />
            </Field>
            <Field label="Time">
              <TextInput value={form.time} onChange={e => set('time', e.target.value)} placeholder="10am – 11:30am" />
            </Field>
          </div>
          <Field label="Location">
            <TextInput value={form.location} onChange={e => set('location', e.target.value)} />
          </Field>
          <Field label="Description (optional)">
            <TextArea rows={3} value={form.description} onChange={e => set('description', e.target.value)} />
          </Field>
          <Toggle checked={form.active} onChange={v => set('active', v)} label="Show on the home page" />
        </div>
      </Drawer>
    </>
  );
}
