import 'server-only';
import type { CollectionName } from '@/lib/content-types';
import { store } from '../store';
import legacy from './legacy-content.json';

const SERMON_DETAILS: Record<string, { preacher?: string; scripture?: string; excerpt?: string }> = {
  '2026-05-03': {
    preacher: 'Pastor Emmanuel Bolaji',
    scripture: '1 Samuel 15:22',
    excerpt:
      "Obedience is the master key of God's Kingdom. It is the bridge between instruction and manifestation, between promise and performance, between hearing God and experiencing God.",
  },
  '2025-07-27': {
    scripture: 'Luke 13:10-13',
    excerpt:
      'Freedom is the absence of restraint. Discover the difference between religious freedom and the spiritual freedom that comes by faith in the Lord Jesus Christ.',
  },
  '2025-07-20': {
    scripture: 'Luke 13:10-13',
    excerpt:
      'Freedom signifies the power to act, speak, or think without undue restraint. Learn how to activate your freedom and work out your salvation with reverence.',
  },
};

const seeders: Partial<Record<CollectionName, () => Promise<void>>> = {
  async devotionals() {
    for (const d of legacy.devotionals) {
      await store.insert('devotionals', { date: d.date, title: d.title, body: d.body, status: 'published' });
    }
  },
  async sermons() {
    for (const s of legacy.sermons) {
      await store.insert('sermons', {
        date: s.date,
        title: s.title,
        body: s.body,
        status: 'published',
        ...SERMON_DETAILS[s.date],
      });
    }
  },
  async events() {
    const fliers = ['/Sunday-Flier.jpeg', '/Sunday-Flier-2.jpeg'];
    for (const [i, flierImage] of fliers.entries()) {
      await store.insert('events', {
        title: 'Sunday Service',
        time: '10am – 11:30am',
        location: 'Bettendorf Community Center',
        flierImage,
        active: true,
        sortOrder: i,
      });
    }
  },
};

const inFlight = new Map<string, Promise<void>>();

/** Loads the original hard-coded content the first time a collection is read. */
export async function ensureSeeded(collection: CollectionName) {
  const seeder = seeders[collection];
  if (!seeder) return;
  const flag = `seeded:v1:${collection}`;
  let pending = inFlight.get(flag);
  if (!pending) {
    pending = (async () => {
      if (await store.getFlag(flag)) return;
      await store.setFlag(flag, new Date().toISOString());
      await seeder();
    })().finally(() => inFlight.delete(flag));
    inFlight.set(flag, pending);
  }
  await pending;
}
