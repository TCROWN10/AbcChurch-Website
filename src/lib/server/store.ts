import 'server-only';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import type { SupabaseClient } from '@supabase/supabase-js';
import { Pool } from 'pg';
import {
  DEFAULT_SETTINGS,
  type BaseRecord,
  type CollectionMap,
  type CollectionName,
  type SettingKey,
  type SettingsMap,
} from '@/lib/content-types';
import { databaseKind, postgresConfig } from './config';
import { getSupabaseAdmin } from './supabase';

type Row<C extends CollectionName> = CollectionMap[C];
export type NewRecord<C extends CollectionName> = Omit<Row<C>, keyof BaseRecord>;
type Where<C extends CollectionName> = Partial<Record<keyof Row<C>, string | number | boolean>>;

export interface ListOptions<C extends CollectionName> {
  where?: Where<C>;
  orderBy?: keyof Row<C>;
  desc?: boolean;
  limit?: number;
}

interface Driver {
  all(collection: CollectionName, where?: Record<string, unknown>): Promise<BaseRecord[]>;
  get(collection: CollectionName, id: string): Promise<BaseRecord | null>;
  insert(collection: CollectionName, record: BaseRecord): Promise<void>;
  replace(collection: CollectionName, record: BaseRecord): Promise<void>;
  remove(collection: CollectionName, id: string): Promise<boolean>;
  getSetting(key: string): Promise<unknown | undefined>;
  setSetting(key: string, value: unknown): Promise<void>;
}

/* ----------------------------- Local JSON driver ---------------------------- */

interface LocalDb {
  records: Partial<Record<CollectionName, BaseRecord[]>>;
  settings: Record<string, unknown>;
}

/** On Vercel the deploy filesystem is read-only; keep the CMS JSON under /tmp so seeding works. */
const dataRoot =
  process.env.DATA_DIR ||
  process.env.RAILWAY_VOLUME_MOUNT_PATH ||
  (process.env.VERCEL ? '/tmp/data' : path.join(process.cwd(), 'data'));
const DATA_FILE = path.join(dataRoot, 'cms.json');

const globalForStore = globalThis as unknown as { __cmsWriteChain?: Promise<unknown> };

async function readLocal(): Promise<LocalDb> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw) as LocalDb;
    return { records: parsed.records ?? {}, settings: parsed.settings ?? {} };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return { records: {}, settings: {} };
    throw error;
  }
}

/** Serializes read-modify-write cycles so concurrent requests don't clobber each other. */
function mutateLocal<T>(fn: (db: LocalDb) => T): Promise<T> {
  const run = async () => {
    const db = await readLocal();
    const result = fn(db);
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    const tmp = `${DATA_FILE}.${process.pid}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(db, null, 2));
    await fs.rename(tmp, DATA_FILE);
    return result;
  };
  const next = (globalForStore.__cmsWriteChain ?? Promise.resolve()).then(run, run);
  globalForStore.__cmsWriteChain = next.catch(() => undefined);
  return next;
}

function matches(record: BaseRecord, where?: Record<string, unknown>) {
  if (!where) return true;
  return Object.entries(where).every(([k, v]) => (record as unknown as Record<string, unknown>)[k] === v);
}

const localDriver: Driver = {
  async all(collection, where) {
    const db = await readLocal();
    return (db.records[collection] ?? []).filter(r => matches(r, where));
  },
  async get(collection, id) {
    const db = await readLocal();
    return (db.records[collection] ?? []).find(r => r.id === id) ?? null;
  },
  insert(collection, record) {
    return mutateLocal(db => {
      (db.records[collection] ??= []).push(record);
    });
  },
  replace(collection, record) {
    return mutateLocal(db => {
      const list = db.records[collection] ?? [];
      const index = list.findIndex(r => r.id === record.id);
      if (index >= 0) list[index] = record;
    });
  },
  remove(collection, id) {
    return mutateLocal(db => {
      const list = db.records[collection] ?? [];
      const index = list.findIndex(r => r.id === id);
      if (index < 0) return false;
      list.splice(index, 1);
      return true;
    });
  },
  async getSetting(key) {
    const db = await readLocal();
    return db.settings[key];
  },
  setSetting(key, value) {
    return mutateLocal(db => {
      db.settings[key] = value;
    });
  },
};

/* ------------------------------ Supabase driver ----------------------------- */

interface SupabaseRow {
  id: string;
  collection: string;
  data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

function fromRow(row: SupabaseRow): BaseRecord {
  return { ...row.data, id: row.id, createdAt: row.created_at, updatedAt: row.updated_at } as BaseRecord;
}

function toData(record: BaseRecord) {
  const { id: _id, createdAt: _c, updatedAt: _u, ...data } = record;
  return data;
}

function check<T>(result: { data: T; error: { message: string } | null }): T {
  if (result.error) throw new Error(`Supabase: ${result.error.message}`);
  return result.data;
}

function supabaseDriver(client: SupabaseClient): Driver {
  return {
    async all(collection, where) {
      let query = client.from('records').select('*').eq('collection', collection);
      for (const [k, v] of Object.entries(where ?? {})) {
        query = query.eq(`data->>${k}`, String(v));
      }
      const rows = check(await query) as SupabaseRow[];
      return rows.map(fromRow);
    },
    async get(collection, id) {
      const rows = check(
        await client.from('records').select('*').eq('collection', collection).eq('id', id).limit(1)
      ) as SupabaseRow[];
      return rows[0] ? fromRow(rows[0]) : null;
    },
    async insert(collection, record) {
      check(
        await client.from('records').insert({
          id: record.id,
          collection,
          data: toData(record),
          created_at: record.createdAt,
          updated_at: record.updatedAt,
        })
      );
    },
    async replace(collection, record) {
      check(
        await client
          .from('records')
          .update({ data: toData(record), updated_at: record.updatedAt })
          .eq('collection', collection)
          .eq('id', record.id)
      );
    },
    async remove(collection, id) {
      const rows = check(
        await client.from('records').delete().eq('collection', collection).eq('id', id).select('id')
      ) as { id: string }[];
      return rows.length > 0;
    },
    async getSetting(key) {
      const rows = check(await client.from('settings').select('value').eq('key', key).limit(1)) as {
        value: unknown;
      }[];
      return rows[0]?.value;
    },
    async setSetting(key, value) {
      check(
        await client.from('settings').upsert({ key, value, updated_at: new Date().toISOString() })
      );
    },
  };
}

/* ------------------------------ Postgres driver ----------------------------- */

const globalForPg = globalThis as unknown as { __cmsPgPool?: Pool; __cmsPgReady?: Promise<void> };

function getPool(): Pool {
  globalForPg.__cmsPgPool ??= new Pool({ connectionString: postgresConfig.url, max: 5 });
  return globalForPg.__cmsPgPool;
}

/** Creates the tables on first use, so a fresh Railway database needs no manual setup. */
async function pg(): Promise<Pool> {
  const pool = getPool();
  globalForPg.__cmsPgReady ??= pool
    .query(
      `create table if not exists records (
         id uuid primary key,
         collection text not null,
         data jsonb not null default '{}'::jsonb,
         created_at timestamptz not null default now(),
         updated_at timestamptz not null default now()
       );
       create index if not exists records_collection_idx on records (collection);
       create table if not exists settings (
         key text primary key,
         value jsonb not null,
         updated_at timestamptz not null default now()
       );`
    )
    .then(() => undefined)
    .catch(error => {
      globalForPg.__cmsPgReady = undefined;
      throw error;
    });
  await globalForPg.__cmsPgReady;
  return pool;
}

interface PgRow {
  id: string;
  data: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
}

function fromPgRow(row: PgRow): BaseRecord {
  return {
    ...row.data,
    id: row.id,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  } as BaseRecord;
}

const postgresDriver: Driver = {
  async all(collection, where) {
    const params: unknown[] = [collection];
    const clauses = ['collection = $1'];
    for (const [k, v] of Object.entries(where ?? {})) {
      params.push(k, String(v));
      clauses.push(`data->>$${params.length - 1} = $${params.length}`);
    }
    const { rows } = await (await pg()).query<PgRow>(
      `select id, data, created_at, updated_at from records where ${clauses.join(' and ')}`,
      params
    );
    return rows.map(fromPgRow);
  },
  async get(collection, id) {
    const { rows } = await (await pg()).query<PgRow>(
      'select id, data, created_at, updated_at from records where collection = $1 and id = $2',
      [collection, id]
    );
    return rows[0] ? fromPgRow(rows[0]) : null;
  },
  async insert(collection, record) {
    await (await pg()).query(
      'insert into records (id, collection, data, created_at, updated_at) values ($1, $2, $3, $4, $5)',
      [record.id, collection, JSON.stringify(toData(record)), record.createdAt, record.updatedAt]
    );
  },
  async replace(collection, record) {
    await (await pg()).query('update records set data = $3, updated_at = $4 where collection = $1 and id = $2', [
      collection,
      record.id,
      JSON.stringify(toData(record)),
      record.updatedAt,
    ]);
  },
  async remove(collection, id) {
    const result = await (await pg()).query('delete from records where collection = $1 and id = $2', [collection, id]);
    return (result.rowCount ?? 0) > 0;
  },
  async getSetting(key) {
    const { rows } = await (await pg()).query<{ value: unknown }>('select value from settings where key = $1', [key]);
    return rows[0]?.value;
  },
  async setSetting(key, value) {
    await (await pg()).query(
      `insert into settings (key, value, updated_at) values ($1, $2, now())
       on conflict (key) do update set value = excluded.value, updated_at = now()`,
      [key, JSON.stringify(value)]
    );
  },
};

function driver(): Driver {
  if (databaseKind === 'postgres') return postgresDriver;
  if (databaseKind === 'supabase') return supabaseDriver(getSupabaseAdmin());
  return localDriver;
}

/* --------------------------------- Public API -------------------------------- */

function sortRecords<T>(records: T[], orderBy?: keyof T, desc?: boolean): T[] {
  if (!orderBy) return records;
  return [...records].sort((a, b) => {
    const av = a[orderBy] as unknown;
    const bv = b[orderBy] as unknown;
    let cmp: number;
    if (typeof av === 'number' && typeof bv === 'number') cmp = av - bv;
    else cmp = String(av ?? '').localeCompare(String(bv ?? ''));
    return desc ? -cmp : cmp;
  });
}

export const store = {
  async list<C extends CollectionName>(collection: C, options: ListOptions<C> = {}): Promise<Row<C>[]> {
    const rows = (await driver().all(collection, options.where as Record<string, unknown>)) as Row<C>[];
    const sorted = sortRecords(rows, options.orderBy ?? ('createdAt' as keyof Row<C>), options.desc ?? true);
    return options.limit ? sorted.slice(0, options.limit) : sorted;
  },

  async get<C extends CollectionName>(collection: C, id: string): Promise<Row<C> | null> {
    return (await driver().get(collection, id)) as Row<C> | null;
  },

  async findOne<C extends CollectionName>(collection: C, where: Where<C>): Promise<Row<C> | null> {
    const rows = await driver().all(collection, where as Record<string, unknown>);
    return (rows[0] as Row<C>) ?? null;
  },

  async insert<C extends CollectionName>(collection: C, data: NewRecord<C>, at?: string): Promise<Row<C>> {
    const now = at ?? new Date().toISOString();
    const record = { ...data, id: randomUUID(), createdAt: now, updatedAt: now } as unknown as Row<C>;
    await driver().insert(collection, record as BaseRecord);
    return record;
  },

  async update<C extends CollectionName>(
    collection: C,
    id: string,
    patch: Partial<NewRecord<C>>
  ): Promise<Row<C> | null> {
    const existing = await driver().get(collection, id);
    if (!existing) return null;
    const updated = {
      ...existing,
      ...patch,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
    } as Row<C>;
    await driver().replace(collection, updated as BaseRecord);
    return updated;
  },

  async remove(collection: CollectionName, id: string): Promise<boolean> {
    return driver().remove(collection, id);
  },

  async getSetting<K extends SettingKey>(key: K): Promise<SettingsMap[K]> {
    const value = (await driver().getSetting(key)) as Partial<SettingsMap[K]> | undefined;
    return { ...DEFAULT_SETTINGS[key], ...(value ?? {}) };
  },

  async setSetting<K extends SettingKey>(key: K, value: SettingsMap[K]): Promise<SettingsMap[K]> {
    await driver().setSetting(key, value);
    return value;
  },

  /** Internal flags (e.g. seed markers) that aren't part of the public settings map. */
  async getFlag(key: string): Promise<unknown> {
    return driver().getSetting(`flag:${key}`);
  },

  async setFlag(key: string, value: unknown): Promise<void> {
    await driver().setSetting(`flag:${key}`, value);
  },
};
