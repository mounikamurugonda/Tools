-- Create the users table
create table if not exists public.users (
  id uuid not null default gen_random_uuid (),
  email text not null,
  name text null,
  image text null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone null,
  constraint users_pkey primary key (id),
  constraint users_email_key unique (email)
) tablespace pg_default;

-- Set up Row Level Security (RLS)
-- Enable RLS
alter table public.users enable row level security;

-- Policy: Allow service role (server-side) full access
-- Service role bypasses RLS by default, but we can add explicit policies
create policy if not exists "Service role has full access"
  on public.users
  as permissive
  for all
  to service_role
  using (true)
  with check (true);

-- Policy: Allow public read access (optional, adjust as needed)
create policy if not exists "Allow public read access"
  on public.users
  for select
  using (true);

-- Allow authenticated users to update their own data (if using client-side auth)
create policy if not exists "Allow individual update"
  on public.users
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

