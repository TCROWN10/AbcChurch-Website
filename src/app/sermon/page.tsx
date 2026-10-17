import SermonList from './SermonList';
import { getPublishedSermons } from '@/lib/server/content';
import { store } from '@/lib/server/store';

export const dynamic = 'force-dynamic';

const DEFAULT_IMAGE = '/images/content/Sermon-image.png';

export default async function SermonPage() {
  const [sermons, bulletin] = await Promise.all([getPublishedSermons(), store.getSetting('bulletin')]);
  return (
    <SermonList
      bulletin={bulletin}
      sermons={sermons.map(s => ({
        date: s.date,
        title: s.title,
        scripture: s.scripture,
        preacher: s.preacher,
        excerpt: s.excerpt,
        image: s.coverImage || DEFAULT_IMAGE,
        hasVideo: Boolean(s.videoUrl),
      }))}
    />
  );
}
