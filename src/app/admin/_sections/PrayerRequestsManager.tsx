"use client";
import { useMemo, useState } from 'react';
import type { PrayerRequestRecord, PrayerRequestStatus } from '@/lib/content-types';
import { formatDate } from '../_lib/api';
import { useCollection } from '../_lib/hooks';
import { Badge, Button, ConfirmDelete, EmptyState, ErrorBlock, LoadingBlock, PageHeader, SearchInput, TextArea, useAction } from '../_components/ui';

const TABS: Array<{ id: PrayerRequestStatus | 'all'; label: string }> = [
  { id: 'PENDING', label: 'New' },
  { id: 'READ', label: 'Prayed for' },
  { id: 'ARCHIVED', label: 'Archived' },
  { id: 'all', label: 'All' },
];

function PrayerCard({ item, onUpdate, onDelete }: {
  item: PrayerRequestRecord;
  onUpdate: (patch: Partial<Pick<PrayerRequestRecord, 'status' | 'notes' | 'isPublic'>>, message: string) => Promise<unknown>;
  onDelete: () => Promise<unknown>;
}) {
  const [notes, setNotes] = useState(item.notes ?? '');
  const [showNotes, setShowNotes] = useState(Boolean(item.notes));

  return (
    <li className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-gray-900">{item.title}</p>
          <p className="mt-0.5 text-xs text-gray-500">
            {item.requesterName} ·{' '}
            <a href={`mailto:${item.requesterEmail}`} className="hover:text-[#FF602E]">{item.requesterEmail}</a> · {formatDate(item.createdAt, true)}
          </p>
        </div>
        <div className="flex gap-1.5">
          {item.isPublic ? <Badge tone="blue">Shared publicly</Badge> : <Badge>Private</Badge>}
          <Badge tone={item.status === 'PENDING' ? 'orange' : item.status === 'READ' ? 'green' : 'gray'}>
            {TABS.find(t => t.id === item.status)?.label}
          </Badge>
        </div>
      </div>
      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-gray-700">{item.content}</p>

      {showNotes && (
        <div className="mt-4 space-y-2">
          <TextArea rows={2} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Private notes for the prayer team" />
          <Button size="sm" variant="secondary" onClick={() => onUpdate({ notes }, 'Notes saved.')}>Save notes</Button>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-gray-100 pt-3">
        {item.status !== 'READ' && (
          <Button size="sm" onClick={() => onUpdate({ status: 'READ' }, 'Marked as prayed for.')}>Mark as prayed for</Button>
        )}
        {item.status !== 'ARCHIVED' && (
          <Button size="sm" variant="secondary" onClick={() => onUpdate({ status: 'ARCHIVED' }, 'Archived.')}>Archive</Button>
        )}
        {item.status !== 'PENDING' && (
          <Button size="sm" variant="ghost" onClick={() => onUpdate({ status: 'PENDING' }, 'Moved back to new.')}>Mark as new</Button>
        )}
        {item.isPublic && (
          <Button size="sm" variant="ghost" onClick={() => onUpdate({ isPublic: false }, 'Removed from the public prayer wall.')}>Hide from website</Button>
        )}
        {!showNotes && <Button size="sm" variant="ghost" onClick={() => setShowNotes(true)}>Add note</Button>}
        <span className="ml-auto"><ConfirmDelete onConfirm={onDelete} /></span>
      </div>
    </li>
  );
}

export default function PrayerRequestsManager() {
  const prayers = useCollection('prayer_requests');
  const run = useAction();
  const [tab, setTab] = useState<PrayerRequestStatus | 'all'>('PENDING');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return prayers.items.filter(
      p =>
        (tab === 'all' || p.status === tab) &&
        (!q || [p.title, p.content, p.requesterName, p.requesterEmail].some(v => v.toLowerCase().includes(q)))
    );
  }, [prayers.items, tab, query]);

  return (
    <>
      <PageHeader title="Prayer Requests" description="Requests sent from the Connect page. Only requests marked “shared publicly” appear on the website." />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {TABS.map(t => {
            const count = t.id === 'all' ? prayers.items.length : prayers.items.filter(p => p.status === t.id).length;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                  tab === t.id ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50'
                }`}
              >
                {t.label} <span className="opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
        <SearchInput value={query} onChange={setQuery} placeholder="Search requests" />
      </div>

      {prayers.error ? (
        <ErrorBlock message={prayers.error} onRetry={prayers.reload} />
      ) : prayers.loading && prayers.items.length === 0 ? (
        <LoadingBlock />
      ) : filtered.length === 0 ? (
        <EmptyState title={tab === 'PENDING' ? 'All caught up' : 'Nothing here'} description="New prayer requests will appear here." />
      ) : (
        <ul className="space-y-4">
          {filtered.map(item => (
            <PrayerCard
              key={item.id}
              item={item}
              onUpdate={(patch, message) => run(() => prayers.update(item.id, patch), message)}
              onDelete={() => run(() => prayers.remove(item.id), 'Prayer request deleted.')}
            />
          ))}
        </ul>
      )}
    </>
  );
}
