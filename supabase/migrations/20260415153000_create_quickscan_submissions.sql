create extension if not exists pgcrypto;

create table if not exists public.quickscan_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  scan_completed boolean not null default true,
  analysis_version integer not null default 1 check (analysis_version >= 1),
  source text not null default 'quickscan-preview',
  version text,

  name text not null check (btrim(name) <> ''),
  company_name text not null check (btrim(company_name) <> ''),
  email text not null check (btrim(email) <> ''),
  marketing_opt_in boolean not null default false,
  website_url text,

  process_type text not null check (btrim(process_type) <> ''),
  process_label text not null check (btrim(process_label) <> ''),
  pain_point text not null check (btrim(pain_point) <> ''),
  pain_point_label text not null check (btrim(pain_point_label) <> ''),
  weekly_hours text not null check (btrim(weekly_hours) <> ''),
  weekly_hours_label text not null check (btrim(weekly_hours_label) <> ''),

  hourly_value numeric(10,2),
  hourly_value_input_mode text check (hourly_value_input_mode is null or hourly_value_input_mode in ('manual', 'range')),
  hourly_value_bucket text,
  hourly_value_label text,

  tool_keys text[] not null default '{}',

  ai_usage text not null check (btrim(ai_usage) <> ''),
  ai_usage_label text not null check (btrim(ai_usage_label) <> ''),
  ai_issue text,
  ai_issue_label text,
  urgency text not null check (btrim(urgency) <> ''),
  urgency_label text not null check (btrim(urgency_label) <> ''),

  recommended_next_step text,
  main_ai_opportunity text,

  total_score integer check (total_score is null or (total_score >= 0 and total_score <= 100)),
  classification text check (
    classification is null
    or classification in (
      'Grote AI-kans',
      'Sterke AI-kans',
      'Duidelijke AI-kans',
      'AI-kans in opbouw',
      'Verkenningsfase'
    )
  ),
  monthly_savings_low integer,
  monthly_savings_high integer,

  answers jsonb not null default '{}'::jsonb,
  analysis jsonb not null default '{}'::jsonb,
  score_data jsonb not null default '{}'::jsonb
);

comment on table public.quickscan_submissions is 'Inzendingen van de STARRE.AI quickscan.';
comment on column public.quickscan_submissions.answers is 'Ruwe en gelabelde quickscan-antwoorden per invuller.';
comment on column public.quickscan_submissions.analysis is 'Afgeleide analyse-data, conclusies, routing en CTA-context.';
comment on column public.quickscan_submissions.score_data is 'Score-engine output, inclusief dimensies, totaalscore en besparingsrange.';

create index if not exists idx_quickscan_submissions_total_score
  on public.quickscan_submissions (total_score);

create index if not exists idx_quickscan_submissions_created_at_desc
  on public.quickscan_submissions (created_at desc);

create index if not exists idx_quickscan_submissions_process_type
  on public.quickscan_submissions (process_type);

create index if not exists idx_quickscan_submissions_email
  on public.quickscan_submissions (email);

create index if not exists idx_quickscan_submissions_recommended_next_step
  on public.quickscan_submissions (recommended_next_step);

alter table public.quickscan_submissions enable row level security;
