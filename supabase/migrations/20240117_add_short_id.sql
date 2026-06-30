-- Add short_id column to snippets table
alter table public.snippets 
add column if not exists short_id text unique;

-- Create an index for faster lookups
create index if not exists snippets_short_id_idx on public.snippets (short_id);
