export type Role = 'MEMBER' | 'ADMIN' | 'SUPER_ADMIN';

export type PublishStatus = 'draft' | 'published';

export interface BaseRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserRecord extends BaseRecord {
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  role: Role;
  lastLoginAt?: string;
}

export type PublicUser = Omit<UserRecord, 'passwordHash'>;

export interface Devotional extends BaseRecord {
  date: string; // YYYY-MM-DD
  title: string;
  memoryVerse?: string;
  bibleReading?: string;
  body: string; // sanitized HTML
  coverImage?: string;
  status: PublishStatus;
}

export interface Sermon extends BaseRecord {
  date: string;
  title: string;
  preacher?: string;
  scripture?: string;
  excerpt?: string;
  body: string;
  coverImage?: string;
  videoUrl?: string;
  status: PublishStatus;
}

export type MediaKind = 'image' | 'video' | 'document';

export interface MediaItem extends BaseRecord {
  url: string;
  path: string;
  kind: MediaKind;
  mimeType: string;
  size: number;
  title?: string;
  caption?: string;
  showInGallery: boolean;
}

export interface ChurchEvent extends BaseRecord {
  title: string;
  date?: string;
  time?: string;
  location?: string;
  description?: string;
  flierImage?: string;
  active: boolean;
  sortOrder: number;
}

export type DonationStatus = 'pending' | 'completed' | 'failed';

export interface Donation extends BaseRecord {
  amount: number;
  currency: string;
  category: string;
  isRecurring: boolean;
  frequency?: 'weekly' | 'monthly' | 'yearly';
  donorName?: string;
  donorEmail: string;
  userId?: string;
  status: DonationStatus;
  stripeSessionId?: string;
  stripeSubscriptionId?: string;
  paidAt?: string;
}

export type PrayerRequestStatus = 'PENDING' | 'READ' | 'ARCHIVED';

export interface PrayerRequestRecord extends BaseRecord {
  requesterName: string;
  requesterEmail: string;
  title: string;
  content: string;
  isPublic: boolean;
  status: PrayerRequestStatus;
  notes?: string;
}

export interface Subscriber extends BaseRecord {
  email: string;
}

export interface CollectionMap {
  users: UserRecord;
  devotionals: Devotional;
  sermons: Sermon;
  media: MediaItem;
  events: ChurchEvent;
  donations: Donation;
  prayer_requests: PrayerRequestRecord;
  subscribers: Subscriber;
}

export type CollectionName = keyof CollectionMap;

export interface HeroSettings {
  backgroundType: 'image' | 'video';
  backgroundUrl: string;
  posterUrl?: string;
  overlayOpacity: number; // 0-80
  headline: string;
  tagline: string[];
  verse: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface BulletinSettings {
  pdfUrl: string;
  previewImage: string;
  title: string;
  updatedLabel?: string;
}

export interface SettingsMap {
  hero: HeroSettings;
  bulletin: BulletinSettings;
}

export type SettingKey = keyof SettingsMap;

export const DEFAULT_SETTINGS: SettingsMap = {
  hero: {
    backgroundType: 'image',
    backgroundUrl: '/images/hero-bg.jpg',
    overlayOpacity: 0,
    headline: 'J.E.S.U.S -C.H.R.I.S.T',
    tagline: ['CARING', 'CALLING', 'COMING'],
    verse:
      'Behold, I stand at the door and knock. If anyone hears My voice and opens the door, I will come in to him and dine with him, and he with Me. (Revelation 3:20)',
  },
  bulletin: {
    pdfUrl: '/DEC 7TH BULLWTIN.pdf',
    previewImage: '/bulletin-screenshot.png',
    title: 'Weekly Bulletin',
  },
};
