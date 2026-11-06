-- AIdea Database Schema (Supabase / Postgres)
-- Run this in the Supabase SQL editor to bootstrap the project.

-- Profiles
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  display_name text,
  bio text,
  avatar_url text,
  banner_url text,
  social_links jsonb default '{}',
  created_at timestamptz default now()
);

-- Posts (art + video)
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references profiles(id) on delete cascade not null,
  media_type text not null check (media_type in ('art', 'video', 'project')),
  media_url text not null,
  thumbnail_url text,
  caption text,
  tags text[] default array[]::text[],
  nsfw boolean default false,
  likes_count int default 0,
  comments_count int default 0,
  saves_count int default 0,
  created_at timestamptz default now()
);

-- Shows (episodic containers)
create table if not exists shows (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  description text,
  cover_url text,
  tags text[] default array[]::text[],
  status text default 'ongoing' check (status in ('ongoing', 'completed')),
  created_at timestamptz default now()
);

-- Episodes (link posts to shows)
create table if not exists episodes (
  id uuid default gen_random_uuid() primary key,
  show_id uuid references shows(id) on delete cascade not null,
  post_id uuid references posts(id) on delete cascade not null,
  episode_number int not null,
  title text,
  created_at timestamptz default now(),
  unique (show_id, episode_number)
);

-- Social tables
create table if not exists follows (
  follower_id uuid references profiles(id) on delete cascade,
  following_id uuid references profiles(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (follower_id, following_id)
);

create table if not exists likes (
  user_id uuid references profiles(id) on delete cascade,
  post_id uuid references posts(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, post_id)
);

create table if not exists comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references posts(id) on delete cascade not null,
  author_id uuid references profiles(id) on delete cascade not null,
  body text not null,
  parent_id uuid references comments(id) on delete cascade,
  created_at timestamptz default now()
);

create table if not exists saves (
  user_id uuid references profiles(id) on delete cascade,
  post_id uuid references posts(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, post_id)
);

create table if not exists notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  type text not null,
  payload jsonb default '{}',
  read boolean default false,
  created_at timestamptz default now()
);

-- Full-text search on posts
create or replace function public.immutable_array_to_string(text[]) returns text
  language sql immutable as $$ select array_to_string($1, ' ') $$;
alter table posts add column if not exists search_vector tsvector
  generated always as (to_tsvector('english', coalesce(caption, '') || ' ' || public.immutable_array_to_string(tags))) stored;

create index if not exists posts_search_idx on posts using gin(search_vector);
create index if not exists posts_created_idx on posts (created_at desc);
create index if not exists posts_author_idx on posts (author_id);
create index if not exists posts_nsfw_idx on posts (nsfw) where nsfw = false;

-- RLS policies (basic)
alter table profiles enable row level security;
alter table posts enable row level security;
alter table shows enable row level security;
alter table episodes enable row level security;
alter table follows enable row level security;
alter table likes enable row level security;
alter table comments enable row level security;
alter table saves enable row level security;
alter table notifications enable row level security;

-- Public read, owner write for profiles
create policy "Profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Posts: public read (non-NSFW by default), owner write
create policy "Posts viewable by everyone" on posts for select using (nsfw = false or auth.uid() = author_id);
create policy "Users can insert own posts" on posts for insert with check (auth.uid() = author_id);
create policy "Users can update own posts" on posts for update using (auth.uid() = author_id);
create policy "Users can delete own posts" on posts for delete using (auth.uid() = author_id);

-- Shows: public read, owner write
create policy "Shows viewable by everyone" on shows for select using (true);
create policy "Users can insert own shows" on shows for insert with check (auth.uid() = author_id);
create policy "Users can update own shows" on shows for update using (auth.uid() = author_id);

-- Episodes: public read, owner write
create policy "Episodes viewable by everyone" on episodes for select using (true);
create policy "Users can insert own episodes" on episodes for insert
  with check (exists (select 1 from shows where shows.id = show_id and shows.author_id = auth.uid()));

-- Social: owner write
create policy "Follows viewable by everyone" on follows for select using (true);
create policy "Users can follow" on follows for insert with check (auth.uid() = follower_id);
create policy "Users can unfollow" on follows for delete using (auth.uid() = follower_id);

create policy "Likes viewable by everyone" on likes for select using (true);
create policy "Users can like" on likes for insert with check (auth.uid() = user_id);
create policy "Users can unlike" on likes for delete using (auth.uid() = user_id);

create policy "Comments viewable by everyone" on comments for select using (true);
create policy "Users can comment" on comments for insert with check (auth.uid() = author_id);
create policy "Users can delete own comments" on comments for delete using (auth.uid() = author_id);

create policy "Saves viewable by owner" on saves for select using (auth.uid() = user_id);
create policy "Users can save" on saves for insert with check (auth.uid() = user_id);
create policy "Users can unsave" on saves for delete using (auth.uid() = user_id);

create policy "Notifications viewable by owner" on notifications for select using (auth.uid() = user_id);
create policy "Users can mark read" on notifications for update using (auth.uid() = user_id);

-- Storage buckets (run in Supabase dashboard or via API)
-- insert into storage.buckets (id, name, public) values ('art', 'art', true);
-- insert into storage.buckets (id, name, public) values ('video', 'video', true);