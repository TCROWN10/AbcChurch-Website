"use client";
import { useMemo, useState } from 'react';
import type { PublishStatus } from '@/lib/content-types';
import { formatDate } from '../_lib/api';
import { Badge, Button, ConfirmDelete, EmptyState, ErrorBlock, LoadingBlock, SearchInput, Select } from './ui';

export interface PostRow {
  id: string;
  date: string;
  title: string;
  status: PublishStatus;
  subtitle?: string;
}

interface PostListProps {
  rows: PostRow[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => Promise<unknown>;
  viewHref: (row: PostRow) => string;
  noun: string;
  onCreate: () => void;
}

const PAGE = 25;

export default function PostList({ rows, loading, error, onRetry, onEdit, onDelete, viewHref, noun, onCreate }: PostListProps) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | PublishStatus>('all');
  const [limit, setLimit] = useState(PAGE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(r => {
      if (status !== 'all' && r.status !== status) return false;
      return !q || r.title.toLowerCase().includes(q) || r.date.includes(q) || r.subtitle?.toLowerCase().includes(q);
    });
  }, [rows, query, status]);

  if (error) return <ErrorBlock message={error} onRetry={onRetry} />;
  if (loading && rows.length === 0) return <LoadingBlock />;
  if (rows.length === 0) {
    return <EmptyState title={`No ${noun}s yet`} description={`Create your first ${noun} and it will appear on the website.`} action={<Button onClick={onCreate}>New {noun}</Button>} />;
  }

  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
      <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput value={query} onChange={setQuery} placeholder={`Search ${noun}s by title or date`} />
        <div className="flex items-center gap-3">
          <Select
            aria-label="Filter by status"
            value={status}
            onChange={setStatus}
            className="w-36"
            options={[
              { value: 'all', label: 'All' },
              { value: 'published', label: 'Published' },
              { value: 'draft', label: 'Drafts' },
            ]}
          />
          <span className="whitespace-nowrap text-sm text-gray-500">{filtered.length} total</span>
        </div>
      </div>

      <ul className="divide-y divide-gray-100">
        {filtered.slice(0, limit).map(row => (
          <li key={row.id} className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center">
            <button type="button" onClick={() => onEdit(row.id)} className="min-w-0 flex-1 text-left">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500">{formatDate(row.date)}</span>
                <Badge tone={row.status === 'published' ? 'green' : 'gray'}>{row.status === 'published' ? 'Published' : 'Draft'}</Badge>
              </div>
              <p className="mt-0.5 truncate font-semibold text-gray-900 hover:text-[#FF602E]">{row.title}</p>
              {row.subtitle && <p className="truncate text-xs text-gray-500">{row.subtitle}</p>}
            </button>
            <div className="flex flex-shrink-0 items-center gap-1">
              <Button variant="secondary" size="sm" onClick={() => onEdit(row.id)}>Edit</Button>
              {row.status === 'published' && (
                <a href={viewHref(row)} target="_blank" rel="noopener noreferrer" className="rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100">
                  View
                </a>
              )}
              <ConfirmDelete onConfirm={() => onDelete(row.id)} />
            </div>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && <p className="px-4 py-10 text-center text-sm text-gray-500">No {noun}s match your search.</p>}
      {limit < filtered.length && (
        <div className="border-t border-gray-100 p-3 text-center">
          <Button variant="ghost" size="sm" onClick={() => setLimit(l => l + PAGE)}>Show more</Button>
        </div>
      )}
    </div>
  );
}
