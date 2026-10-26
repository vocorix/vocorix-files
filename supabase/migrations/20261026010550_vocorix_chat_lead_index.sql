-- Cover the lead_id foreign key for efficient joins and deletes.
create index if not exists chat_conversations_lead_id_idx on public.chat_conversations (lead_id);
