-- Create the favorite_tools table
-- Note: References public.users instead of auth.users because we are managing users in the public schema via NextAuth sync.
create table if not exists public.favorite_tools (
  user_id uuid not null references public.users(id) on delete cascade,
  tool_id text not null,
  created_at timestamp with time zone not null default now(),
  constraint favorite_tools_pkey primary key (user_id, tool_id)
) tablespace pg_default;

-- Setup RLS
alter table public.favorite_tools enable row level security;

-- Service Role has full access (bypasses RLS)
-- But adding explicit policy for clarity
create policy if not exists "Service role has full access"
  on public.favorite_tools
  as permissive
  for all
  to service_role
  using (true)
  with check (true);

-- If using client-side access, allow authenticated users to manage their own favorites
create policy if not exists "Users can manage own favorites"
  on public.favorite_tools
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

