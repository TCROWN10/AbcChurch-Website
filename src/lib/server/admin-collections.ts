import 'server-only';
import { z, type ZodType } from 'zod';
import type { CollectionMap, CollectionName, UserRecord } from '@/lib/content-types';
import { HttpError, hashPassword, toPublicUser } from './auth';
import {
  devotionalSchema,
  eventSchema,
  mediaCreateSchema,
  mediaUpdateSchema,
  sermonSchema,
} from './content';
import { ensureSeeded } from './seed';
import { deleteStoredFile } from './storage';
import { store, type ListOptions } from './store';

interface CollectionConfig<C extends CollectionName> {
  list: ListOptions<C>;
  create?: ZodType;
  update?: ZodType;
  canDelete: boolean;
  /** Editing/deleting requires SUPER_ADMIN (listing only needs ADMIN). */
  superAdminOnly?: boolean;
  /** Throws an HttpError when the change would break an invariant. */
  validate?: (data: Record<string, unknown>, id?: string) => Promise<void>;
  serialize?: (row: CollectionMap[C]) => unknown;
  beforeUpdate?: (data: Record<string, unknown>, existing: CollectionMap[C], actor: UserRecord) => Promise<Record<string, unknown>>;
  beforeDelete?: (existing: CollectionMap[C], actor: UserRecord) => Promise<void>;
}

function uniqueDate(collection: 'devotionals' | 'sermons', label: string) {
  return async (data: Record<string, unknown>, id?: string) => {
    if (typeof data.date !== 'string') return;
    const clash = await store.findOne(collection, { date: data.date });
    if (clash && clash.id !== id) {
      throw new HttpError(409, `There is already a ${label} for ${data.date} ("${clash.title}"). Pick another date or edit that one.`);
    }
  };
}

const userUpdateSchema = z
  .object({
    role: z.enum(['MEMBER', 'ADMIN', 'SUPER_ADMIN']).optional(),
    newPassword: z.string().min(8, 'Password must be at least 8 characters').max(200).optional(),
  })
  .refine(v => v.role || v.newPassword, 'Nothing to update');

const prayerUpdateSchema = z.object({
  status: z.enum(['PENDING', 'READ', 'ARCHIVED']).optional(),
  notes: z.string().max(4000).optional(),
  isPublic: z.boolean().optional(),
});

export const ADMIN_COLLECTIONS: { [C in CollectionName]: CollectionConfig<C> } = {
  devotionals: {
    list: { orderBy: 'date', desc: true },
    create: devotionalSchema,
    update: devotionalSchema,
    canDelete: true,
    validate: uniqueDate('devotionals', 'devotional'),
  },
  sermons: {
    list: { orderBy: 'date', desc: true },
    create: sermonSchema,
    update: sermonSchema,
    canDelete: true,
    validate: uniqueDate('sermons', 'sermon'),
  },
  events: {
    list: { orderBy: 'sortOrder', desc: false },
    create: eventSchema,
    update: eventSchema,
    canDelete: true,
  },
  media: {
    list: { orderBy: 'createdAt', desc: true },
    create: mediaCreateSchema,
    update: mediaUpdateSchema,
    canDelete: true,
    beforeDelete: async item => deleteStoredFile(item.path),
  },
  donations: {
    list: { orderBy: 'createdAt', desc: true },
    canDelete: false,
  },
  prayer_requests: {
    list: { orderBy: 'createdAt', desc: true },
    update: prayerUpdateSchema,
    canDelete: true,
  },
  subscribers: {
    list: { orderBy: 'createdAt', desc: true },
    canDelete: true,
  },
  users: {
    list: { orderBy: 'createdAt', desc: true },
    update: userUpdateSchema,
    canDelete: true,
    superAdminOnly: true,
    serialize: toPublicUser,
    async beforeUpdate(data, existing, actor) {
      if (existing.id === actor.id && data.role && data.role !== actor.role) {
        throw new HttpError(400, "You can't change your own role.");
      }
      const patch: Record<string, unknown> = {};
      if (data.role) patch.role = data.role;
      if (typeof data.newPassword === 'string') patch.passwordHash = await hashPassword(data.newPassword);
      return patch;
    },
    async beforeDelete(existing, actor) {
      if (existing.id === actor.id) throw new HttpError(400, "You can't delete your own account.");
    },
  },
};

export function getCollectionConfig(name: string) {
  if (!(name in ADMIN_COLLECTIONS)) throw new HttpError(404, `Unknown collection "${name}".`);
  return { name: name as CollectionName, config: ADMIN_COLLECTIONS[name as CollectionName] as CollectionConfig<CollectionName> };
}

export async function listForAdmin(name: CollectionName) {
  await ensureSeeded(name);
  const { config } = getCollectionConfig(name);
  const rows = await store.list(name, config.list as ListOptions<CollectionName>);
  return config.serialize ? rows.map(r => config.serialize!(r)) : rows;
}
