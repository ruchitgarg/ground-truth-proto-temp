create extension if not exists pgcrypto;

create table if not exists public.disease_hotspots (
  id uuid primary key default gen_random_uuid(),
  phone text,
  state text,
  district text,
  disease text,
  severity text,
  lat float8,
  lng float8,
  notes text,
  reported_at timestamptz default now(),
  source text default 'capture'
);

comment on column public.disease_hotspots.severity is 'high, medium, low';
comment on column public.disease_hotspots.source is 'capture, manual, inference';
