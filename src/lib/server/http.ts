import 'server-only';
import { NextResponse } from 'next/server';
import { ZodError, type ZodType } from 'zod';
import { HttpError } from './auth';

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function fail(status: number, message: string, details?: unknown) {
  return NextResponse.json({ success: false, message, ...(details ? { details } : {}) }, { status });
}

/** Wraps a route handler so thrown HttpErrors / validation errors become JSON responses. */
export function handle<Args extends unknown[]>(fn: (...args: Args) => Promise<Response>) {
  return async (...args: Args): Promise<Response> => {
    try {
      return await fn(...args);
    } catch (error) {
      if (error instanceof HttpError) return fail(error.status, error.message);
      if (error instanceof ZodError) {
        const first = error.issues[0];
        const field = first?.path.join('.');
        return fail(400, field ? `${field}: ${first.message}` : first?.message ?? 'Invalid input', error.issues);
      }
      console.error('[api] unexpected error', error);
      return fail(500, error instanceof Error ? error.message : 'Something went wrong.');
    }
  };
}

export async function parseBody<T>(request: Request, schema: ZodType<T>): Promise<T> {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    throw new HttpError(400, 'Request body must be valid JSON.');
  }
  return schema.parse(json);
}
