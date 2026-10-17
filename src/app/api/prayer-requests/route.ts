import { z } from 'zod';
import { handle, ok, parseBody } from '@/lib/server/http';
import { store } from '@/lib/server/store';

export const dynamic = 'force-dynamic';

const schema = z.object({
  requesterName: z.string().trim().min(1, 'Name is required').max(120),
  requesterEmail: z.string().trim().toLowerCase().email('Enter a valid email address'),
  title: z.string().trim().min(1, 'Title is required').max(200),
  content: z.string().trim().min(1, 'Please share your prayer request').max(5000),
  isPublic: z.boolean().default(false),
});

/** Public wall of prayer requests the requester chose to share (emails are never exposed). */
export const GET = handle(async (request: Request) => {
  const limit = Math.min(Number(new URL(request.url).searchParams.get('limit')) || 20, 100);
  const rows = await store.list('prayer_requests', { where: { isPublic: true }, limit: limit * 2 });
  return ok(
    rows
      .filter(r => r.status !== 'ARCHIVED')
      .slice(0, limit)
      .map(({ requesterEmail: _email, notes: _notes, ...rest }) => ({ ...rest, requesterEmail: '' }))
  );
});

export const POST = handle(async (request: Request) => {
  const input = await parseBody(request, schema);
  const created = await store.insert('prayer_requests', { ...input, status: 'PENDING' });
  return ok(created, 201);
});
