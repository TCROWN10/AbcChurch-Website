import { requireAdmin, toPublicUser } from '@/lib/server/auth';
import { databaseKind, hasPersistentUploads, isSupabaseEnabled, stripeConfig } from '@/lib/server/config';
import { handle, ok } from '@/lib/server/http';
import { ensureSeeded } from '@/lib/server/seed';
import { store } from '@/lib/server/store';

export const dynamic = 'force-dynamic';

export const GET = handle(async () => {
  await requireAdmin();
  await Promise.all([ensureSeeded('devotionals'), ensureSeeded('sermons'), ensureSeeded('events')]);

  const [users, donations, devotionals, sermons, media, prayers, subscribers] = await Promise.all([
    store.list('users'),
    store.list('donations'),
    store.list('devotionals', { orderBy: 'date', desc: true }),
    store.list('sermons'),
    store.list('media'),
    store.list('prayer_requests'),
    store.list('subscribers'),
  ]);

  const completed = donations.filter(d => d.status === 'completed');
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);
  const thisMonth = completed.filter(d => new Date(d.paidAt ?? d.createdAt) >= monthStart);
  const sum = (list: typeof completed) => Math.round(list.reduce((t, d) => t + d.amount, 0) * 100) / 100;

  return ok({
    counts: {
      members: users.length,
      devotionals: devotionals.length,
      sermons: sermons.length,
      media: media.length,
      pendingPrayers: prayers.filter(p => p.status === 'PENDING').length,
      subscribers: subscribers.length,
      donors: new Set(completed.map(d => d.donorEmail)).size,
    },
    donations: {
      totalAllTime: sum(completed),
      totalThisMonth: sum(thisMonth),
      countThisMonth: thisMonth.length,
      recurringActive: completed.filter(d => d.isRecurring).length,
    },
    recentDonations: completed.slice(0, 5),
    recentMembers: users.slice(0, 5).map(toPublicUser),
    recentLogins: users
      .filter(u => u.lastLoginAt)
      .sort((a, b) => (b.lastLoginAt ?? '').localeCompare(a.lastLoginAt ?? ''))
      .slice(0, 5)
      .map(toPublicUser),
    latestDevotional: devotionals[0] ?? null,
    setup: {
      database: databaseKind,
      storage: isSupabaseEnabled ? 'supabase' : hasPersistentUploads ? 'volume' : 'local',
      stripe: Boolean(stripeConfig.secretKey),
      stripeWebhook: Boolean(stripeConfig.webhookSecret),
    },
  });
});
