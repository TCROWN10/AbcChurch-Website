"use client";
import { useMemo, useState } from 'react';
import type { Donation, DonationStatus } from '@/lib/content-types';
import { downloadCsv, formatDate, formatMoney } from '../_lib/api';
import { useCollection } from '../_lib/hooks';
import { Badge, Button, Card, EmptyState, ErrorBlock, LoadingBlock, PageHeader, SearchInput, Select } from '../_components/ui';

type Range = 'month' | '30' | 'year' | 'all';
type View = 'gifts' | 'donors';

function inRange(d: Donation, range: Range) {
  if (range === 'all') return true;
  const when = new Date(d.paidAt ?? d.createdAt);
  const now = new Date();
  if (range === 'month') return when.getFullYear() === now.getFullYear() && when.getMonth() === now.getMonth();
  if (range === 'year') return when.getFullYear() === now.getFullYear();
  return now.getTime() - when.getTime() <= 30 * 24 * 60 * 60 * 1000;
}

const STATUS_TONE: Record<DonationStatus, 'green' | 'orange' | 'red'> = { completed: 'green', pending: 'orange', failed: 'red' };

export default function DonationsView() {
  const donations = useCollection('donations');
  const [view, setView] = useState<View>('gifts');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<DonationStatus | 'all'>('completed');
  const [category, setCategory] = useState('all');
  const [range, setRange] = useState<Range>('all');

  const categories = useMemo(() => Array.from(new Set(donations.items.map(d => d.category))).sort(), [donations.items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return donations.items.filter(
      d =>
        (status === 'all' || d.status === status) &&
        (category === 'all' || d.category === category) &&
        inRange(d, range) &&
        (!q || d.donorEmail.toLowerCase().includes(q) || (d.donorName ?? '').toLowerCase().includes(q))
    );
  }, [donations.items, query, status, category, range]);

  const total = filtered.filter(d => d.status === 'completed').reduce((t, d) => t + d.amount, 0);

  const donors = useMemo(() => {
    const map = new Map<string, { email: string; name?: string; total: number; count: number; last: string; recurring: boolean; member: boolean }>();
    for (const d of filtered) {
      if (d.status !== 'completed') continue;
      const key = d.donorEmail.toLowerCase();
      const when = d.paidAt ?? d.createdAt;
      const entry = map.get(key) ?? { email: d.donorEmail, name: d.donorName, total: 0, count: 0, last: when, recurring: false, member: false };
      entry.total += d.amount;
      entry.count += 1;
      if (when > entry.last) entry.last = when;
      entry.name ||= d.donorName;
      entry.recurring ||= d.isRecurring;
      entry.member ||= Boolean(d.userId);
      map.set(key, entry);
    }
    return Array.from(map.values()).sort((a, b) => b.total - a.total);
  }, [filtered]);

  function exportCsv() {
    if (view === 'donors') {
      downloadCsv(
        'donors.csv',
        donors.map(d => ({ name: d.name ?? '', email: d.email, total: d.total.toFixed(2), gifts: d.count, last_gift: d.last, recurring: d.recurring, member: d.member }))
      );
    } else {
      downloadCsv(
        'donations.csv',
        filtered.map(d => ({
          date: d.paidAt ?? d.createdAt,
          name: d.donorName ?? '',
          email: d.donorEmail,
          amount: d.amount.toFixed(2),
          currency: d.currency,
          category: d.category,
          recurring: d.isRecurring ? d.frequency ?? 'yes' : 'one-time',
          status: d.status,
          member: Boolean(d.userId),
        }))
      );
    }
  }

  return (
    <>
      <PageHeader
        title="Donations"
        description="Every gift made through the website's Give page. Gifts are processed securely by Stripe."
        actions={<Button variant="secondary" onClick={exportCsv} disabled={filtered.length === 0}>Export CSV</Button>}
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card><p className="text-sm text-gray-500">Total received</p><p className="mt-1 text-2xl font-bold text-gray-900">{formatMoney(total)}</p></Card>
        <Card><p className="text-sm text-gray-500">Gifts</p><p className="mt-1 text-2xl font-bold text-gray-900">{filtered.filter(d => d.status === 'completed').length}</p></Card>
        <Card><p className="text-sm text-gray-500">Donors</p><p className="mt-1 text-2xl font-bold text-gray-900">{donors.length}</p></Card>
      </div>

      <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
        <div className="flex flex-col gap-3 border-b border-gray-100 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="inline-flex w-fit rounded-lg bg-gray-100 p-1">
            {(['gifts', 'donors'] as const).map(v => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className={`rounded-md px-4 py-1.5 text-sm font-semibold transition ${view === v ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
              >
                {v === 'gifts' ? 'All gifts' : 'By donor'}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <SearchInput value={query} onChange={setQuery} placeholder="Search name or email" />
            <Select<Range>
              aria-label="Date range"
              value={range}
              onChange={setRange}
              className="sm:w-36"
              options={[
                { value: 'all', label: 'All time' },
                { value: 'month', label: 'This month' },
                { value: '30', label: 'Last 30 days' },
                { value: 'year', label: 'This year' },
              ]}
            />
            <Select
              aria-label="Fund"
              value={category}
              onChange={setCategory}
              className="sm:w-40"
              options={[{ value: 'all', label: 'All funds' }, ...categories.map(c => ({ value: c, label: c }))]}
            />
            {view === 'gifts' && (
              <Select<DonationStatus | 'all'>
                aria-label="Status"
                value={status}
                onChange={setStatus}
                className="sm:w-36"
                options={[
                  { value: 'completed', label: 'Completed' },
                  { value: 'pending', label: 'Pending' },
                  { value: 'failed', label: 'Failed' },
                  { value: 'all', label: 'Any status' },
                ]}
              />
            )}
          </div>
        </div>

        {donations.error ? (
          <div className="p-4"><ErrorBlock message={donations.error} onRetry={donations.reload} /></div>
        ) : donations.loading && donations.items.length === 0 ? (
          <LoadingBlock />
        ) : donations.items.length === 0 ? (
          <div className="p-4"><EmptyState title="No donations yet" description="When someone gives on the website, it will show up here with their name, email and amount." /></div>
        ) : view === 'gifts' ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3">Donor</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Fund</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(d => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{d.donorName || '—'} {d.userId && <Badge tone="blue">Member</Badge>}</p>
                      <a href={`mailto:${d.donorEmail}`} className="text-xs text-gray-500 hover:text-[#FF602E]">{d.donorEmail}</a>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900">{formatMoney(d.amount, d.currency)}</td>
                    <td className="px-4 py-3 text-gray-700">{d.category}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-700">{d.isRecurring ? `Recurring (${d.frequency})` : 'One-time'}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-500">{formatDate(d.paidAt ?? d.createdAt, true)}</td>
                    <td className="px-4 py-3"><Badge tone={STATUS_TONE[d.status]}>{d.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <p className="py-10 text-center text-sm text-gray-500">No donations match these filters.</p>}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3">Donor</th>
                  <th className="px-4 py-3">Total given</th>
                  <th className="px-4 py-3">Gifts</th>
                  <th className="px-4 py-3">Last gift</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {donors.map(d => (
                  <tr key={d.email} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{d.name || '—'}</p>
                      <a href={`mailto:${d.email}`} className="text-xs text-gray-500 hover:text-[#FF602E]">{d.email}</a>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900">{formatMoney(d.total)}</td>
                    <td className="px-4 py-3 text-gray-700">{d.count}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-500">{formatDate(d.last)}</td>
                    <td className="space-x-1 whitespace-nowrap px-4 py-3">
                      {d.member && <Badge tone="blue">Member</Badge>}
                      {d.recurring && <Badge tone="green">Recurring</Badge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {donors.length === 0 && <p className="py-10 text-center text-sm text-gray-500">No completed gifts match these filters.</p>}
          </div>
        )}
      </div>
    </>
  );
}
