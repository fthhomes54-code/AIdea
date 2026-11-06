-- Adult posts visible only to members who opted in (Settings > show adult)
drop policy if exists "Posts viewable by everyone" on posts;
create policy "Posts viewable by everyone" on posts for select using (
  auth.uid() = author_id
  or (status = 'live' and (nsfw = false or exists (select 1 from profiles pr where pr.id = auth.uid() and pr.show_adult)))
);
