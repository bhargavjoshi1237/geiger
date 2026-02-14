create table public.boards (
  id uuid not null default gen_random_uuid (),
  name text not null default 'Untitled Board'::text,
  description text null,
  nodes text null,
  edges text null,
  viewport text null,
  created_at timestamp with time zone null default CURRENT_TIMESTAMP,
  updated_at timestamp with time zone null default CURRENT_TIMESTAMP,
  user_id uuid null,
  constraint boards_pkey primary key (id),
  constraint boards_user_id_fkey foreign KEY (user_id) references auth.users (id)
) TABLESPACE pg_default;