import { HttpError, requireAdmin } from '@/lib/server/auth';
import { handle, ok } from '@/lib/server/http';
import { store } from '@/lib/server/store';

type Ctx = { params: Promise<{ id: string }> };

export const DELETE = handle(async (_request: Request, { params }: Ctx) => {
  await requireAdmin();
  const { id } = await params;
  if (!(await store.remove('prayer_requests', id))) throw new HttpError(404, 'Prayer request not found.');
  return ok({ id });
});
