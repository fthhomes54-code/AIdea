-- Admin = signed in as stylegeniusnews@gmail.com (or a +alias of it)
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(lower(auth.jwt()->>'email') ~ '^stylegeniusnews(\+[^@]*)?@gmail\.com$', false)
$$;
grant execute on function public.is_admin() to anon, authenticated;

-- Nobody can make themselves admin via profile edits
create or replace function public.lock_profile_admin() returns trigger language plpgsql as $$
begin new.is_admin := old.is_admin; return new; end $$;
drop trigger if exists lock_profile_admin_trg on profiles;
create trigger lock_profile_admin_trg before update on profiles for each row execute function public.lock_profile_admin();

-- Reports
create table if not exists reports (
  id uuid default gen_random_uuid() primary key,
  reporter_id uuid references profiles(id) on delete cascade not null default auth.uid(),
  post_id uuid references posts(id) on delete cascade,
  comment_id uuid references comments(id) on delete cascade,
  reason text not null check (reason in ('spam','adult_untagged','hate','minors','copyright','deepfake','other')),
  details text check (length(details) <= 500),
  status text not null default 'open' check (status in ('open','actioned','dismissed')),
  created_at timestamptz default now(),
  check (post_id is not null or comment_id is not null)
);
create unique index if not exists reports_once_post on reports (reporter_id, post_id) where post_id is not null;
create unique index if not exists reports_once_comment on reports (reporter_id, comment_id) where comment_id is not null;
alter table reports enable row level security;
drop policy if exists "members report" on reports;
create policy "members report" on reports for insert to authenticated with check (reporter_id = auth.uid());
drop policy if exists "admin reads reports" on reports;
create policy "admin reads reports" on reports for select using (public.is_admin());
drop policy if exists "admin updates reports" on reports;
create policy "admin updates reports" on reports for update using (public.is_admin());

-- Auto-hide a post after 3 different members report it
create or replace function public.auto_hide() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.post_id is not null and (select count(distinct reporter_id) from reports where post_id = new.post_id and status = 'open') >= 3 then
    update posts set status = 'hidden' where id = new.post_id and status = 'live';
  end if;
  return new;
end $$;
drop trigger if exists auto_hide_trg on reports;
create trigger auto_hide_trg after insert on reports for each row execute function public.auto_hide();

-- Admin moderation powers
drop policy if exists "admin sees all posts" on posts;
create policy "admin sees all posts" on posts for select using (public.is_admin());
drop policy if exists "admin moderates posts" on posts;
create policy "admin moderates posts" on posts for update using (public.is_admin());
drop policy if exists "admin deletes comments" on comments;
create policy "admin deletes comments" on comments for delete using (public.is_admin());

-- Spam limits (enforced in the database)
create or replace function public.rate_limit() returns trigger
language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); n int; age interval;
begin
  if uid is null or public.is_admin() then return new; end if;
  if tg_table_name = 'posts' then
    select now() - created_at into age from auth.users where id = uid;
    select count(*) into n from posts where author_id = uid and created_at > now() - interval '24 hours';
    if n >= (case when age < interval '7 days' then 5 else 20 end) then
      raise exception 'Upload limit reached (% per day for %). Try again tomorrow.', (case when age < interval '7 days' then 5 else 20 end), (case when age < interval '7 days' then 'new accounts' else 'members' end) using errcode = 'P0001';
    end if;
  elsif tg_table_name = 'comments' then
    select count(*) into n from comments where author_id = uid and created_at > now() - interval '1 minute';
    if n >= 5 then raise exception 'Slow down: max 5 comments a minute.' using errcode = 'P0001'; end if;
    select count(*) into n from comments where author_id = uid and created_at > now() - interval '24 hours';
    if n >= 200 then raise exception 'Daily comment limit reached.' using errcode = 'P0001'; end if;
  elsif tg_table_name = 'follows' then
    select count(*) into n from follows where follower_id = uid and created_at > now() - interval '1 hour';
    if n >= 100 then raise exception 'Follow limit reached for this hour.' using errcode = 'P0001'; end if;
  elsif tg_table_name = 'reports' then
    select count(*) into n from reports where reporter_id = uid and created_at > now() - interval '24 hours';
    if n >= 30 then raise exception 'Report limit reached for today.' using errcode = 'P0001'; end if;
  end if;
  return new;
end $$;
drop trigger if exists rl_posts on posts;
create trigger rl_posts before insert on posts for each row execute function public.rate_limit();
drop trigger if exists rl_comments on comments;
create trigger rl_comments before insert on comments for each row execute function public.rate_limit();
drop trigger if exists rl_follows on follows;
create trigger rl_follows before insert on follows for each row execute function public.rate_limit();
drop trigger if exists rl_reports on reports;
create trigger rl_reports before insert on reports for each row execute function public.rate_limit();

alter table comments add constraint comments_body_len check (length(body) between 1 and 1000) not valid;
alter table follows add constraint no_self_follow check (follower_id <> following_id) not valid;
