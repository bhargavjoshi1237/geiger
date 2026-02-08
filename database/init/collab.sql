create table public.collab (
  id uuid not null default gen_random_uuid (),
  host uuid null,
  joiners jsonb null default '{}'::jsonb,
  code text null,
  state_nodes text null,
  state_edges text null,
  preference jsonb null,
  created_at timestamp with time zone not null default now(),
  rollback jsonb null,
  constraint collab_pkey primary key (id),
  constraint collab_host_fkey foreign KEY (host) references auth.users (id)
) TABLESPACE pg_default;