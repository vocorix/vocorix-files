-- Vocorix private server-side data model. No browser-facing RLS policies are created.

create table if not exists public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) <= 254),
  company text,
  interest text not null check (interest in ('voice-ai', 'workflow-automation', 'system-integration', 'other')),
  message text not null check (char_length(message) between 20 and 3000),
  source_url text,
  user_agent text,
  status text not null default 'new' check (status in ('new', 'in_progress', 'qualified', 'closed', 'spam')),
  created_at timestamptz not null default now()
);
create index if not exists contact_leads_created_at_idx on public.contact_leads (created_at desc);
create index if not exists contact_leads_status_created_at_idx on public.contact_leads (status, created_at desc);

-- Hashes only are persisted; raw client IPs are not stored.
create table if not exists public.api_rate_limit_buckets (
  key_hash text primary key,
  window_started_at timestamptz not null default now(),
  hits integer not null default 0 check (hits >= 0)
);

create table if not exists public.chat_conversations (
  id uuid primary key default gen_random_uuid(),
  external_session_id text unique,
  lead_id uuid references public.contact_leads(id) on delete set null,
  status text not null default 'open' check (status in ('open', 'closed')),
  provider text,
  model text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists chat_conversations_created_at_idx on public.chat_conversations (created_at desc);
create index if not exists chat_conversations_status_updated_at_idx on public.chat_conversations (status, updated_at desc);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.chat_conversations(id) on delete cascade,
  role text not null check (role in ('system', 'user', 'assistant', 'tool')),
  content text not null check (char_length(content) <= 12000),
  provider text,
  model text,
  token_count integer check (token_count is null or token_count >= 0),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists chat_messages_conversation_created_idx on public.chat_messages (conversation_id, created_at asc);

create or replace function public.consume_api_rate_limit(
  p_key_hash text,
  p_window_seconds integer default 60,
  p_max_requests integer default 5
)
returns boolean language plpgsql security invoker set search_path = public, pg_temp
as $$
declare
  current_hits integer;
begin
  if p_key_hash is null or length(p_key_hash) < 32
     or p_window_seconds < 1 or p_window_seconds > 3600
     or p_max_requests < 1 or p_max_requests > 100 then
    raise exception 'Invalid rate limit parameters';
  end if;
  insert into public.api_rate_limit_buckets as bucket (key_hash, window_started_at, hits)
  values (p_key_hash, now(), 1)
  on conflict (key_hash) do update
    set window_started_at = case
          when bucket.window_started_at <= now() - make_interval(secs => p_window_seconds) then now()
          else bucket.window_started_at
        end,
        hits = case
          when bucket.window_started_at <= now() - make_interval(secs => p_window_seconds) then 1
          else bucket.hits + 1
        end
  returning hits into current_hits;
  return current_hits <= p_max_requests;
end;
$$;

alter table public.contact_leads enable row level security;
alter table public.api_rate_limit_buckets enable row level security;
alter table public.chat_conversations enable row level security;
alter table public.chat_messages enable row level security;

revoke all on table public.contact_leads from anon, authenticated;
revoke all on table public.api_rate_limit_buckets from anon, authenticated;
revoke all on table public.chat_conversations from anon, authenticated;
revoke all on table public.chat_messages from anon, authenticated;
grant all on table public.contact_leads to service_role;
grant all on table public.api_rate_limit_buckets to service_role;
grant all on table public.chat_conversations to service_role;
grant all on table public.chat_messages to service_role;

revoke all on function public.consume_api_rate_limit(text, integer, integer) from public, anon, authenticated;
grant execute on function public.consume_api_rate_limit(text, integer, integer) to service_role;
