"use client";
import { useMemo, useState } from 'react';
import { downloadCsv, formatDate } from '../_lib/api';
import { useCollection } from '../_lib/hooks';
import { Button, ConfirmDelete, EmptyState, ErrorBlock, LoadingBlock, PageHeader, SearchInput, useAction, useToast } from '../_components/ui';

export default function SubscribersManager() {
  const subscribers = useCollection('subscribers');
  const run = useAction();
  const toast = useToast();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return subscribers.items.filter(s => !q || s.email.includes(q));
  }, [subscribers.items, query]);

  return (
    <>
      <PageHeader
        title="Newsletter"
        description="People who subscribed from the website footer."
        actions={
          <>
            <Button
              variant="secondary"
              disabled={filtered.length === 0}
              onClick={() => {
                void navigator.clipboard.writeText(filtered.map(s => s.email).join(', ')).then(() => toast('Emails copied — paste them into BCC.'));
              }}
            >
              Copy emails
            </Button>
            <Button
              variant="secondary"
              disabled={filtered.length === 0}
              onClick={() => downloadCsv('subscribers.csv', filtered.map(s => ({ email: s.email, subscribed: s.createdAt })))}
            >
              Export CSV
            </Button>
          </>
        }
      />

      <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
        <div className="flex items-center justify-between gap-3 border-b border-gray-100 p-4">
          <SearchInput value={query} onChange={setQuery} placeholder="Search email" />
          <span className="text-sm text-gray-500">{filtered.length} subscribers</span>
        </div>
        {subscribers.error ? (
          <div className="p-4"><ErrorBlock message={subscribers.error} onRetry={subscribers.reload} /></div>
        ) : subscribers.loading && subscribers.items.length === 0 ? (
          <LoadingBlock />
        ) : subscribers.items.length === 0 ? (
          <div className="p-4"><EmptyState title="No subscribers yet" /></div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {filtered.map(s => (
              <li key={s.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <a href={`mailto:${s.email}`} className="truncate text-sm font-medium text-gray-900 hover:text-[#FF602E]">{s.email}</a>
                  <p className="text-xs text-gray-500">Subscribed {formatDate(s.createdAt)}</p>
                </div>
                <ConfirmDelete label="Remove" onConfirm={() => run(() => subscribers.remove(s.id), 'Subscriber removed.')} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
