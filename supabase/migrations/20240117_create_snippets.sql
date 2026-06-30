-- Create the snippets table
create table if not exists public.snippets (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  type text not null, -- 'animate', 'type', 'image'
  title text,
  code_html text,
  code_css text,
  code_js text,
  config jsonb
);

-- Enable Row Level Security (RLS)
alter table public.snippets enable row level security;

-- Create policies (modify as needed for your auth requirements)
-- Implementation: Allow public read access to all snippets (for sharing)
create policy "Public snippets are viewable by everyone"
  on public.snippets for select
  using (true);

-- Implementation: Allow anyone (anon) to insert snippets (for saving without login)
-- Note: In a production app, you might want to restrict this or rate limit it.
create policy "Anyone can insert snippets"
  on public.snippets for insert
  with check (true);
