import { revalidatePath } from 'next/cache';
import type { ZodType } from 'zod';
import type { SettingKey, SettingsMap } from '@/lib/content-types';
import { HttpError, requireAdmin } from '@/lib/server/auth';
import { bulletinSchema, heroSchema } from '@/lib/server/content';
import { handle, ok, parseBody } from '@/lib/server/http';
import { store } from '@/lib/server/store';

type Ctx = { params: Promise<{ key: string }> };

const SCHEMAS: Record<SettingKey, ZodType> = {
  hero: heroSchema,
  bulletin: bulletinSchema,
};

function settingKey(key: string): SettingKey {
  if (!(key in SCHEMAS)) throw new HttpError(404, `Unknown setting "${key}".`);
  return key as SettingKey;
}

export const dynamic = 'force-dynamic';

export const GET = handle(async (_request: Request, { params }: Ctx) => {
  await requireAdmin();
  const key = settingKey((await params).key);
  return ok(await store.getSetting(key));
});

export const PUT = handle(async (request: Request, { params }: Ctx) => {
  await requireAdmin();
  const key = settingKey((await params).key);
  const value = (await parseBody(request, SCHEMAS[key])) as SettingsMap[typeof key];
  const saved = await store.setSetting(key, value);
  revalidatePath('/', 'layout');
  return ok(saved);
});
