# AIdea

**Where AI Creation Is the Feature, Not the Liability.**

A social network for AI art, AI video, AI projects, and AI-hosted shows. Built with Next.js 15, Supabase, and Vercel.

AIdea is the hub. Creators post here, then share their videos and art out to Facebook, Instagram, TikTok, YouTube, X, WhatsApp, Telegram, Reddit, and more in one click.

## Status

Foundation scaffold. Landing page shows the target UI direction: video-first social feed with outbound share.

## UI Direction

- **Video-first**: Videos are the main focus. Large thumbnails with play buttons, duration badges, YouTube-style presentation.
- **Facebook-style social interface**: Feed of cards with creator avatar, name, timestamp, caption, like / comment / share / save actions.
- **Hub model**: Share buttons on every post let creators push content to major platforms (Facebook, Instagram, TikTok, YouTube, X, WhatsApp, Telegram, Reddit) plus copy link.
- **Clean card structure** (similar to RentHub): Simple, readable cards. No clutter. Mobile-friendly.
- Content-type filters: Art, Video, Show, Project.
- Discovery: Newest, Trending, Following.
- Optional style tags + freeform tags.

## Stack

- **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS
- **Backend:** Supabase (Postgres, Storage, Auth, Edge Functions)
- **Hosting:** Vercel (auto-deploy from `main`)
- **Email:** Resend

## Setup

1. Clone the repo.
2. Copy `.env.local.example` to `.env.local` and fill in Supabase keys.
3. Run `supabase/schema.sql` in the Supabase SQL editor.
4. Create storage buckets `art` and `video` (public).
5. `npm install && npm run dev`.

## Features (MVP)

- Profiles with avatar, banner, bio, social links
- Art uploads (jpg, png, webp, gif) + video uploads (mp4, webm, 500MB max)
- Global feed + For You ranked feed (video-first cards)
- Content-type filters: Art, Video, Show, Project
- Discovery: Newest, Trending, Following
- Optional style tags (Realistic, Anime, Cyberpunk, Fantasy, Abstract, Photorealistic) + freeform tags
- Shows with seasons/episodes
- Follow, like, comment, save
- Outbound share to Facebook, Instagram, TikTok, YouTube, X, WhatsApp, Telegram, Reddit + copy link
- Tag pages + full-text search
- NSFW opt-in toggle (default off); hard floor for minors/harm/hate/violence

## Content Policy

- Adult/rated-R content allowed with self-tagging. Not a porn site.
- Profanity allowed. Hate speech, threats, and content involving minors banned instantly.
- See PRD section 13 for full policy.

## Next Steps

- [ ] Connect Vercel project
- [ ] Wire up upload pipeline + thumbnail generation
- [ ] Build the actual feed + show pages with video-first cards and share menus
- [ ] Soft launch

---

Owned by Mike Roach (Don De Juan). Zero budget. Organic first.
