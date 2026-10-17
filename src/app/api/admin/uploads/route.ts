import { z } from 'zod';
import { HttpError, requireAdmin } from '@/lib/server/auth';
import { handle, ok, parseBody } from '@/lib/server/http';
import { createUploadTicket } from '@/lib/server/storage';
import { mediaKindFor, validateMedia } from '@/lib/media-rules';

const schema = z.object({
  fileName: z.string().min(1).max(300),
  mimeType: z.string().max(120),
  size: z.number().int().positive(),
});

/** Step 1 of an upload: validate the file and hand back where to send it. */
export const POST = handle(async (request: Request) => {
  await requireAdmin();
  const { fileName, mimeType, size } = await parseBody(request, schema);
  const problem = validateMedia(mimeType, size);
  if (problem) throw new HttpError(400, problem);
  const kind = mediaKindFor(mimeType)!;
  return ok({ kind, ticket: await createUploadTicket(kind, fileName) });
});
