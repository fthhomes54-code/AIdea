# AIdea

**Where AI Creation Is the Feature, Not the Liability.**

A social network for AI art, AI video, AI projects, and AI-hosted shows. Built with Next.js 15, Supabase, and Vercel.

## Status

Foundation scaffold. Landing page with content-type filters, discovery options, and social share buttons.

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
- Global feed + For You ranked feed
- Content-type filters: Art, Video, Show, Project
- Discovery: Newest, Trending, Following
- Optional style tags (Realistic, Anime, Cyberpunk, Fantasy, Abstract, Photorealistic) + freeform tags
- Shows with seasons/episodes
- Follow, like, comment, save
- Tag pages + full-text search
- Social share buttons on landing page
- NSFW opt-in toggle (default off); hard floor for minors/harm/hate/violence

## Content Policy

- Adult/rated-R content allowed with self-tagging. Not a porn site.
- Profanity allowed. Hate speech, threats, and content involving minors banned instantly.
- See PRD section 13 for full policy.

## Next Steps

- [ ] Connect Vercel project
- [ ] Wire up upload pipeline + thumbnail generation
- [ ] Build feed + show pages
- [ ] Soft launch

---

Owned by Mike Roach (Don De Juan). Zero budget. Organic first.
