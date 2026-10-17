import HomeContent from './HomeContent';
import { getActiveEvents, getGalleryMedia } from '@/lib/server/content';
import { store } from '@/lib/server/store';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [hero, events, gallery] = await Promise.all([
    store.getSetting('hero'),
    getActiveEvents(),
    getGalleryMedia(8),
  ]);
  return <HomeContent hero={hero} events={events} gallery={gallery} />;
}
