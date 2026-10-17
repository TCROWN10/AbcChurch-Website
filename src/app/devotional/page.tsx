import DevotionalList from './DevotionalList';
import { getPublishedDevotionals } from '@/lib/server/content';

export const dynamic = 'force-dynamic';

export default async function DevotionalPage() {
  const devotionals = await getPublishedDevotionals();
  return (
    <DevotionalList
      devotionals={devotionals.map(d => ({
        date: d.date,
        title: d.title,
        memoryVerse: d.memoryVerse,
        coverImage: d.coverImage,
      }))}
    />
  );
}
