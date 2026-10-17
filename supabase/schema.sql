-- Run once in the Supabase dashboard: SQL Editor → New query → paste → Run.
-- The website talks to these tables only from the server (service role key),
-- so Row Level Security is enabled with no public policies.

create table if not exists public.records (
  id uuid primary key,
  collection text not null,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists records_collection_idx on public.records (collection);
create index if not exists records_data_idx on public.records using gin (data jsonb_path_ops);

create table if not exists public.settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.records enable row level security;
alter table public.settings enable row level security;

-- Public bucket for photos, videos and bulletin PDFs (files are readable by anyone
-- with the link; only the server can create upload links).
insert into storage.buckets (id, name, public, file_size_limit)
values ('media', 'media', true, 209715200)
on conflict (id) do update set public = true, file_size_limit = excluded.file_size_limit;
