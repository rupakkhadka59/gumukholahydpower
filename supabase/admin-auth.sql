-- Run once in Supabase Dashboard > SQL Editor after schema.sql.
-- Create exactly one user first in Authentication > Users, then run:
-- select public.configure_single_admin('admin@example.com');
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
grant select on public.profiles to authenticated;

drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile" on public.profiles for select to authenticated using ((select auth.uid()) = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id) on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- The partial unique index makes it impossible for this project to have more than
-- one administrator, even if a profile is edited outside the setup function.
create unique index if not exists one_admin_profile
  on public.profiles (is_admin)
  where is_admin = true;

create or replace function public.configure_single_admin(admin_email text)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  admin_id uuid;
begin
  select id into admin_id
  from auth.users
  where lower(email) = lower(trim(admin_email))
    and deleted_at is null
  limit 1;

  if admin_id is null then
    raise exception 'No active Auth user found for %', admin_email;
  end if;

  update public.profiles set is_admin = false where is_admin = true;
  insert into public.profiles (id, is_admin)
    values (admin_id, true)
    on conflict (id) do update set is_admin = true;
end;
$$;

revoke all on function public.configure_single_admin(text) from public;

-- After creating the Auth user above, execute this once with that user's email:
-- select public.configure_single_admin('admin@example.com');
