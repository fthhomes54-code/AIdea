-- AIdea: auth profile trigger, upload columns, media bucket, counters
alter table posts add column if not exists title text;
alter table posts add column if not exists storage_key text;
alter table posts add column if not exists thumb_key text;
alter table posts add column if not exists duration_s int;
alter table posts add column if not exists size_bytes bigint;
alter table posts add column if not exists views int default 0;
alter table posts add column if not exists status text default 'live' check (status in ('live','hidden','removed'));
alter table profiles add column if not exists is_admin boolean default false;
alter table profiles add column if not exists show_adult boolean default false;

drop policy if exists "Posts viewable by everyone" on posts;
create policy "Posts viewable by everyone" on posts for select
  using ((status = 'live' and nsfw = false) or auth.uid() = author_id);
drop policy if exists "Users can insert own profile" on profiles;
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

-- Auto-create profile on sign-up
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare base text; uname text; n int := 0;
begin
  base := lower(regexp_replace(coalesce(new.raw_user_meta_data->>'username', split_part(new.email,'@',1), 'user'), '[^a-z0-9_]', '', 'gi'));
  if length(base) < 3 then base := 'user' || base; end if;
  uname := base;
  while exists (select 1 from profiles where username = uname) loop
    n := n + 1; uname := base || n::text;
  end loop;
  insert into profiles (id, username, display_name, avatar_url)
  values (new.id, uname, coalesce(new.raw_user_meta_data->>'full_name', uname), new.raw_user_meta_data->>'avatar_url');
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- Like/comment counters
create or replace function public.bump_counts() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if tg_table_name = 'likes' then
    update posts set likes_count = likes_count + (case when tg_op='INSERT' then 1 else -1 end) where id = coalesce(new.post_id, old.post_id);
  elsif tg_table_name = 'comments' then
    update posts set comments_count = comments_count + (case when tg_op='INSERT' then 1 else -1 end) where id = coalesce(new.post_id, old.post_id);
  end if;
  return null;
end $$;
drop trigger if exists likes_count_trg on likes;
create trigger likes_count_trg after insert or delete on likes for each row execute function public.bump_counts();
drop trigger if exists comments_count_trg on comments;
create trigger comments_count_trg after insert or delete on comments for each row execute function public.bump_counts();

-- Media bucket (Supabase Free caps uploads at 50 MB)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media','media',true,52428800, array['image/jpeg','image/png','image/webp','image/gif','video/mp4','video/webm','video/quicktime'])
on conflict (id) do update set file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects for select using (bucket_id = 'media');
drop policy if exists "media owner insert" on storage.objects;
create policy "media owner insert" on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and auth.uid()::text = (storage.foldername(name))[1]);
drop policy if exists "media owner delete" on storage.objects;
create policy "media owner delete" on storage.objects for delete to authenticated
  using (bucket_id = 'media' and auth.uid()::text = (storage.foldername(name))[1]);
