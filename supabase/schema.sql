-- Run this entire file once in Supabase Dashboard > SQL Editor > New query.
create extension if not exists pgcrypto;

create table if not exists public.gallery_albums (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_photos (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references public.gallery_albums(id) on delete cascade,
  title text not null,
  description text not null default '',
  storage_path text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.downloads (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  type text not null default 'PDF',
  date date not null default current_date,
  file_size text not null default '',
  storage_path text,
  created_at timestamptz not null default now()
);

alter table public.gallery_albums enable row level security;
alter table public.gallery_photos enable row level security;
alter table public.downloads enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.gallery_albums, public.gallery_photos, public.downloads to anon, authenticated;

drop policy if exists "Public can view albums" on public.gallery_albums;
create policy "Public can view albums" on public.gallery_albums for select using (true);
drop policy if exists "Public can view gallery photos" on public.gallery_photos;
create policy "Public can view gallery photos" on public.gallery_photos for select using (true);
drop policy if exists "Public can view downloads" on public.downloads;
create policy "Public can view downloads" on public.downloads for select using (true);

insert into storage.buckets (id, name, public) values ('gallery', 'gallery', true) on conflict (id) do update set public = true;
insert into storage.buckets (id, name, public) values ('documents', 'documents', true) on conflict (id) do update set public = true;
