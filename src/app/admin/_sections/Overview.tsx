"use client";
import { useCallback, useEffect, useState } from 'react';
import type { Devotional, Donation, PublicUser } from '@/lib/content-types';
import { displayName } from '@/lib/auth/auth-context';
import { api, formatDate, formatMoney } from '../_lib/api';
import { Badge, Button, Card, ErrorBlock, LoadingBlock, PageHeader } from '../_components/ui';
import type { SectionId } from '../_lib/sections';

interface Stats {
  counts: Record<'members' | 'devotionals' | 'sermons' | 'media' | 'pendingPrayers' | 'subscribers' | 'donors', number>;
  donations: { totalAllTime: number; totalThisMonth: number; countThisMonth: number; recurringActive: number };
  recentDonations: Donation[];
  recentMembers: PublicUser[];
  recentLogins: PublicUser[];
  latestDevotional: Devotional | null;
  setup: {
    database: 'postgres' | 'supabase' | 'local';
    storage: 'supabase' | 'volume' | 'local';
    stripe: boolean;
    stripeWebhook: boolean;
  };
}

function StatCard({ label, value, sub, onClick }: { label: string; value: React.ReactNode; sub?: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl bg-white p-5 text-left shadow-sm ring-1 ring-gray-200 transition hover:ring-[#FF602E]/60"
    >
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
      {sub && <p className="mt-1 text-xs text-gray-500">{sub}</p>}
    </button>
  );
}

function SetupRow({ ok, label, help }: { ok: boolean; label: string; help: string }) {
  return (
    <li className="flex items-start gap-3 py-2.5">
      <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs text-white ${ok ? 'bg-emerald-500' : 'bg-amber-500'}`}>
        {ok ? '✓' : '!'}
      </span>
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {!ok && <p className="text-xs text-gray-500">{help}</p>}
      </div>
    </li>
  );
}

export default function Overview({ go }: { go: (id: SectionId) => void }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setError(null);
    api<Stats>('/api/admin/stats').then(setStats).catch(e => setError(e.message));
  }, []);

  useEffect(load, [load]);

  if (error) return <ErrorBlock message={error} onRetry={load} />;
  if (!stats) return <LoadingBlock />;

  const { counts, donations, setup } = stats;

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Everything happening on the church website at a glance."
        actions={
          <>
            <Button variant="secondary" onClick={() => go('hero')}>Edit home hero</Button>
            <Button onClick={() => go('devotionals')}>Write devotional</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Given this month" value={formatMoney(donations.totalThisMonth)} sub={`${donations.countThisMonth} gifts`} onClick={() => go('donations')} />
        <StatCard label="Given all time" value={formatMoney(donations.totalAllTime)} sub={`${counts.donors} donors`} onClick={() => go('donations')} />
        <StatCard label="Members" value={counts.members} sub={`${counts.subscribers} newsletter subscribers`} onClick={() => go('members')} />
        <StatCard label="Prayer requests" value={counts.pendingPrayers} sub="waiting to be read" onClick={() => go('prayers')} />
        <StatCard label="Devotionals" value={counts.devotionals} sub={stats.latestDevotional ? `Latest: ${formatDate(stats.latestDevotional.date)}` : undefined} onClick={() => go('devotionals')} />
        <StatCard label="Sermons" value={counts.sermons} onClick={() => go('sermons')} />
        <StatCard label="Photos & videos" value={counts.media} onClick={() => go('gallery')} />
        <StatCard label="Recurring gifts" value={donations.recurringActive} sub="active subscriptions" onClick={() => go('donations')} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card title="Recent donations" className="xl:col-span-2" actions={<Button variant="ghost" size="sm" onClick={() => go('donations')}>View all</Button>}>
          {stats.recentDonations.length === 0 ? (
            <p className="text-sm text-gray-500">No completed donations yet.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {stats.recentDonations.map(d => (
                <li key={d.id} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900">{d.donorName || d.donorEmail}</p>
                    <p className="truncate text-xs text-gray-500">
                      {d.category} · {formatDate(d.paidAt ?? d.createdAt, true)}
                      {d.isRecurring && ` · ${d.frequency}`}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{formatMoney(d.amount, d.currency)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Website setup">
          <ul className="divide-y divide-gray-100">
            <SetupRow
              ok={setup.database !== 'local'}
              label={
                setup.database === 'postgres'
                  ? 'Content saved in PostgreSQL'
                  : setup.database === 'supabase'
                    ? 'Content saved in Supabase'
                    : 'Content saved on this computer (development)'
              }
              help="Add a PostgreSQL database (DATABASE_URL) before going live so posts aren't lost on redeploy."
            />
            <SetupRow
              ok={setup.storage !== 'local'}
              label={
                setup.storage === 'supabase'
                  ? 'Photos & videos stored in Supabase'
                  : setup.storage === 'volume'
                    ? 'Photos & videos stored on a persistent volume'
                    : 'Photos & videos stored on this computer (development)'
              }
              help="Attach a Railway volume so uploads survive redeploys."
            />
            <SetupRow ok={setup.stripe} label="Online giving (Stripe)" help="Add STRIPE_SECRET_KEY to accept donations." />
            <SetupRow ok={setup.stripeWebhook} label="Stripe webhook" help="Add STRIPE_WEBHOOK_SECRET so recurring gifts are recorded automatically." />
          </ul>
        </Card>

        <Card title="New members" actions={<Button variant="ghost" size="sm" onClick={() => go('members')}>View all</Button>}>
          <UserList users={stats.recentMembers} field="createdAt" empty="No one has signed up yet." />
        </Card>

        <Card title="Recent sign-ins" actions={<Button variant="ghost" size="sm" onClick={() => go('members')}>View all</Button>}>
          <UserList users={stats.recentLogins} field="lastLoginAt" empty="No sign-ins yet." />
        </Card>

        <Card title="Latest devotional">
          {stats.latestDevotional ? (
            <div>
              <p className="text-xs text-gray-500">{formatDate(stats.latestDevotional.date)}</p>
              <p className="mt-1 font-semibold text-gray-900">{stats.latestDevotional.title}</p>
              <div className="mt-3 flex gap-2">
                <Badge tone={stats.latestDevotional.status === 'published' ? 'green' : 'gray'}>{stats.latestDevotional.status}</Badge>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No devotionals yet.</p>
          )}
        </Card>
      </div>
    </>
  );
}

function UserList({ users, field, empty }: { users: PublicUser[]; field: 'createdAt' | 'lastLoginAt'; empty: string }) {
  if (users.length === 0) return <p className="text-sm text-gray-500">{empty}</p>;
  return (
    <ul className="divide-y divide-gray-100">
      {users.map(u => (
        <li key={u.id} className="flex items-center justify-between gap-3 py-2.5">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-gray-900">{displayName(u)}</p>
            <p className="truncate text-xs text-gray-500">{u.email}</p>
          </div>
          <span className="whitespace-nowrap text-xs text-gray-500">{formatDate(u[field], true)}</span>
        </li>
      ))}
    </ul>
  );
}
