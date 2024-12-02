-- Reset schema for client submissions
drop table if exists public.client_submissions cascade;

-- Create client submissions table (no auth required)
create table public.client_submissions (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now() not null,
  status text not null check (status in ('pending', 'approved', 'rejected')) default 'pending',
  -- Client Info
  client_name text not null,
  client_email text not null,
  client_phone text not null,
  client_address text not null,
  emergency_contact text,
  emergency_phone text,
  -- Pet Info
  pet_name text not null,
  pet_type text not null,
  pet_breed text,
  pet_age integer,
  medical_info text,
  feeding_instructions text,
  behavioral_notes text,
  -- Additional Info
  notes text,
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz
);

-- Enable RLS
alter table public.client_submissions enable row level security;

-- RLS Policies for client submissions
create policy "Client submissions insertable by anyone"
  on public.client_submissions for insert
  with check (true);

create policy "Client submissions viewable by authenticated users"
  on public.client_submissions for select
  using (auth.role() = 'authenticated');

create policy "Client submissions updatable by admins"
  on public.client_submissions for update
  using (exists (select 1 from public.admin_users where id = auth.uid()));

-- Function to approve and import client submission
create or replace function approve_client_submission(
  submission_id uuid,
  admin_id uuid
) returns uuid language plpgsql security definer as $$
declare
  new_client_id uuid;
  new_pet_id uuid;
  submission record;
begin
  -- Get submission data
  select * into submission
  from public.client_submissions
  where id = submission_id and status = 'pending';
  
  if not found then
    raise exception 'Submission not found or already processed';
  end if;

  -- Create client
  insert into public.clients (
    name,
    email,
    phone,
    address,
    emergency_contact,
    emergency_phone,
    created_by
  ) values (
    submission.client_name,
    submission.client_email,
    submission.client_phone,
    submission.client_address,
    submission.emergency_contact,
    submission.emergency_phone,
    admin_id
  ) returning id into new_client_id;

  -- Create pet
  insert into public.pets (
    client_id,
    name,
    type,
    breed,
    age,
    medical_info,
    feeding_instructions,
    behavioral_notes,
    created_by
  ) values (
    new_client_id,
    submission.pet_name,
    submission.pet_type,
    submission.pet_breed,
    submission.pet_age,
    submission.medical_info,
    submission.feeding_instructions,
    submission.behavioral_notes,
    admin_id
  ) returning id into new_pet_id;

  -- Update submission status
  update public.client_submissions
  set 
    status = 'approved',
    reviewed_by = admin_id,
    reviewed_at = now()
  where id = submission_id;

  return new_client_id;
end;
$$;