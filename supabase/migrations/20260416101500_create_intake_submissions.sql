create table if not exists public.intake_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  form_kind text not null default 'intake',
  source text not null default 'website',
  page_path text,
  page_url text,
  preferred_route text,
  name text not null,
  company_name text not null,
  email text not null,
  phone text,
  message text,
  status text not null default 'new',
  answers jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists intake_submissions_created_at_idx
  on public.intake_submissions (created_at desc);

create index if not exists intake_submissions_form_kind_idx
  on public.intake_submissions (form_kind);

create index if not exists intake_submissions_preferred_route_idx
  on public.intake_submissions (preferred_route);

create index if not exists intake_submissions_email_idx
  on public.intake_submissions (email);

alter table public.intake_submissions enable row level security;
