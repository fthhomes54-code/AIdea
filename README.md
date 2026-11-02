# AIdea

**Where AI Creation Is the Feature, Not the Liability.**

A social network for AI art, AI video, and AI-hosted shows. Built with Next.js 15, Supabase, and Vercel. Dark base, electric blue, gold — StyleGenius DNA.

## Status

Foundation scaffold is live. Landing page with social share buttons (Facebook, X, Reddit, WhatsApp, Telegram) is on the first page for immediate visibility.

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
- Mood filters: Dangerous, Chill, Cocky, Sleek, Raw
- Shows with seasons/episodes
- Follow, like, comment, save
- Tag pages + trending + full-text search
- Social share buttons on landing page
- NSFW opt-in toggle (default off); hard floor for minors/harm/hate/violence

## Content Policy

- Adult/rated-R content allowed with self-tagging. Not a porn site.
- Profanity allowed. Hate speech, threats, demonic incitement, and content involving minors banned instantly.
- See PRD section 13 for full policy.

## Next Steps

- [ ] Connect Vercel project
- [ ] Wire up upload pipeline + thumbnail generation
- [ ] Build feed + show pages
- [ ] Soft launch to StyleGenius/RentHub audience

---

Owned by Mike Roach (Don De Juan). Zero budget. Organic first.
