-- Create base table compatible with Supabase Auth
create table if not exists public.base (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  nodes jsonb default '[]'::jsonb,
  edges jsonb default '[]'::jsonb,
  viewport jsonb default '{}'::jsonb,
  preference jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.base enable row level security;

create policy "Users can view their own base"
  on public.base for select
  using (auth.uid() = user_id);

create policy "Users can insert their own base"
  on public.base for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own base"
  on public.base for update
  using (auth.uid() = user_id);
