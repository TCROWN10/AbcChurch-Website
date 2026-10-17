import { revalidatePath } from 'next/cache';
import { HttpError, requireAdmin, requireSuperAdmin } from '@/lib/server/auth';
import { getCollectionConfig } from '@/lib/server/admin-collections';
import { handle, ok, parseBody } from '@/lib/server/http';
import { store } from '@/lib/server/store';

type Ctx = { params: Promise<{ collection: string; id: string }> };

async function authorize(collection: string) {
  const { name, config } = getCollectionConfig(collection);
  const actor = await (config.superAdminOnly ? requireSuperAdmin() : requireAdmin());
  return { name, config, actor };
}

export const PUT = handle(async (request: Request, { params }: Ctx) => {
  const { collection, id } = await params;
  const { name, config, actor } = await authorize(collection);
  if (!config.update) throw new HttpError(405, `${collection} can't be edited.`);
  const existing = await store.get(name, id);
  if (!existing) throw new HttpError(404, 'Item not found.');

  let data = (await parseBody(request, config.update)) as Record<string, unknown>;
  await config.validate?.(data, id);
  if (config.beforeUpdate) data = await config.beforeUpdate(data, existing, actor);

  const updated = await store.update(name, id, data);
  revalidatePath('/', 'layout');
  return ok(config.serialize && updated ? config.serialize(updated) : updated);
});

export const DELETE = handle(async (_request: Request, { params }: Ctx) => {
  const { collection, id } = await params;
  const { name, config, actor } = await authorize(collection);
  if (!config.canDelete) throw new HttpError(405, `${collection} can't be deleted.`);
  const existing = await store.get(name, id);
  if (!existing) throw new HttpError(404, 'Item not found.');
  await config.beforeDelete?.(existing, actor);
  await store.remove(name, id);
  revalidatePath('/', 'layout');
  return ok({ id });
});
