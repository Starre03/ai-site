create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz not null default now(),
  note text
);

alter table public.admin_users enable row level security;

create or replace function public.is_admin_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

drop policy if exists "Authenticated users can read quickscan_submissions" on public.quickscan_submissions;
drop policy if exists "Authenticated users can read intake_submissions" on public.intake_submissions;
drop policy if exists "Authenticated users can update intake_submissions status" on public.intake_submissions;

create policy "Admins can read quickscan_submissions"
  on public.quickscan_submissions for select
  to authenticated
  using (public.is_admin_user());

create policy "Admins can read intake_submissions"
  on public.intake_submissions for select
  to authenticated
  using (public.is_admin_user());

create policy "Admins can update intake_submissions status"
  on public.intake_submissions for update
  to authenticated
  using (public.is_admin_user())
  with check (public.is_admin_user());

create policy "Admins can read admin_users"
  on public.admin_users for select
  to authenticated
  using (public.is_admin_user());
