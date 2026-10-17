export const SECTIONS = [
  { id: 'overview', label: 'Dashboard', group: 'General' },
  { id: 'hero', label: 'Home Hero', group: 'Website' },
  { id: 'devotionals', label: 'Devotionals', group: 'Website' },
  { id: 'sermons', label: 'Sermons & Bulletin', group: 'Website' },
  { id: 'gallery', label: 'Photos & Videos', group: 'Website' },
  { id: 'events', label: 'Events & Fliers', group: 'Website' },
  { id: 'donations', label: 'Donations', group: 'People' },
  { id: 'members', label: 'Members & Sign-ins', group: 'People' },
  { id: 'prayers', label: 'Prayer Requests', group: 'People' },
  { id: 'subscribers', label: 'Newsletter', group: 'People' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

export function isSectionId(value: string): value is SectionId {
  return SECTIONS.some(s => s.id === value);
}
