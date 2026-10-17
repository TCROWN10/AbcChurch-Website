import { revalidatePath } from 'next/cache';
import { HttpError, requireAdmin } from '@/lib/server/auth';
import { getCollectionConfig, listForAdmin } from '@/lib/server/admin-collections';
import { handle, ok, parseBody } from '@/lib/server/http';
import { store, type NewRecord } from '@/lib/server/store';
import type { CollectionName } from '@/lib/content-types';

type Ctx = { params: Promise<{ collection: string }> };

export const dynamic = 'force-dynamic';

export const GET = handle(async (_request: Request, { params }: Ctx) => {
  const { collection } = await params;
  const { name } = getCollectionConfig(collection);
  await requireAdmin();
  return ok(await listForAdmin(name));
});

export const POST = handle(async (request: Request, { params }: Ctx) => {
  await requireAdmin();
  const { collection } = await params;
  const { name, config } = getCollectionConfig(collection);
  if (!config.create) throw new HttpError(405, `New ${collection} can't be created from the dashboard.`);
  const data = (await parseBody(request, config.create)) as Record<string, unknown>;
  await config.validate?.(data);
  const created = await store.insert(name, data as NewRecord<CollectionName>);
  revalidatePath('/', 'layout');
  return ok(created, 201);
});
