create extension if not exists pgcrypto;

create table if not exists public.ground_truth_captures (
  id uuid primary key default gen_random_uuid(),
  fpo_id text null,
  phone text null,
  whatsapp_number text null,
  whatsapp_consent_at timestamptz null,
  language text not null,
  media_name text not null,
  media_size bigint not null,
  media_type text not null,
  lat double precision not null,
  lng double precision not null,
  accuracy double precision null,
  location_timestamp timestamptz not null,
  submitted_at timestamptz not null default now(),
  raw_payload jsonb null
);

alter table public.ground_truth_captures enable row level security;

-- Allow anonymous inserts/updates for this capture flow.
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname='public' and tablename='ground_truth_captures' and policyname='anon_insert_ground_truth_captures'
  ) then
    create policy anon_insert_ground_truth_captures
      on public.ground_truth_captures
      for insert
      to anon
      with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname='public' and tablename='ground_truth_captures' and policyname='anon_update_ground_truth_captures'
  ) then
    create policy anon_update_ground_truth_captures
      on public.ground_truth_captures
      for update
      to anon
      using (true)
      with check (true);
  end if;
end
$$;
