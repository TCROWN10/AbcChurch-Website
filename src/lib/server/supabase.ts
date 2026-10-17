import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { supabaseConfig } from './config';

let client: SupabaseClient | null = null;

/** Service-role client: bypasses row-level security, so it must never reach the browser. */
export function getSupabaseAdmin(): SupabaseClient {
  if (!client) {
    client = createClient(supabaseConfig.url, supabaseConfig.serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}
