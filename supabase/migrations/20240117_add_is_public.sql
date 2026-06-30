-- Add is_public column to snippets table
alter table public.snippets 
add column if not exists is_public boolean default false;

-- Add description column just in case we want to show it in library
alter table public.snippets 
add column if not exists description text;

-- Index for querying public snippets
create index if not exists snippets_is_public_idx on public.snippets (is_public);
