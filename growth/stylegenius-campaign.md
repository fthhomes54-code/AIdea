# AIdea Weekend Launch: StyleGenius News Promoter Campaign (DRAFT)
**Status:** draft only. Nothing has been posted, sent, scheduled or changed on the site. Every item needs Don's OK.
**Window:** Sat Nov 7 to Sun Nov 8, 2026, all times Central (CT). **Budget:** $0.
**Main CTA:** "Join AIdea free and post your AI art" → https://aidea-six.vercel.app/signup · StyleGenius News is the promoter only.
**Secondary CTA (only where it fits, never competing):** https://stylegenius-app.vercel.app

## 0. Verified facts vs. assumptions
Last re-verified **Fri Nov 6, 8:10 PM CT**. Sources:
- **[LIVE]** means the public pages at aidea-six.vercel.app.
- **[CODE]** means the local repo `/workspace/aidea`. The relevant commits are d9cd797 (Terms pledge and tagline) and 620190c (badges, points and the challenge banner).
- **[DB]** means a read-only read of the live `creator_stats` view definition in the AIdea Supabase project.

What's verified:
- **[LIVE]** `/`, `/signup`, `/upload`, `/rules` and `/u/stylegeniusnews` all return HTTP 200.
- **[LIVE]** The site footer tagline reads "A home where AI art belongs."
- **[LIVE+CODE]** The Terms page (effective Nov 6, 2026) has the pledge: "We will never penalize, demote, hide or shadow ban a post or account because it was made with AI… The only reason content is limited or removed is a clear break of the rules below, and we will tell you when that happens." The same Terms still say "we may remove content or accounts that break the rules." **Copy may only promise that AI work isn't penalized *for being AI*. It must never promise immunity from moderation.**
- **[LIVE+CODE]** The home page shows the challenge banner "Golden Hour Challenge, this weekend." It links to `/?q=goldenhour`.
- **[DB+CODE] Badges and points (exact rules):**
  - **Founding Creator:** goes to the first 50 accounts *ever*, ranked by the time of their first live post. It is not limited to the weekend. The banner says "first 50 creators to post… for good." **About 2 slots were already taken** by accounts that posted before the weekend (likely including stylegeniusnews; the read-only count showed 2 creators with live posts). So the honest phrasing is "among the first 50 creators."
  - **Golden Hour 2026:** you get it with ≥1 live post tagged `goldenhour` created Sat Nov 7 12:00 AM CST to before Mon Nov 9 12:00 AM CST (the window is 06:00Z Nov 7 to 06:00Z Nov 9). ⚠️ The upload form lowercases tags but does **not** strip "#". Creators must type `goldenhour` **without the #** in the tags box, or the post won't count. I'd suggest a site fix that strips "#"; that's Don's decision, and I didn't change anything.
  - **First Post, 10 Posts, 25 Posts:** based on the number of live posts. Only the highest tier shows.
  - **Points:** 10 per live post, plus 2 per like *received on your own live posts*. The creator earns the points, not the person who likes. Points are display-only on profiles. They have no cash value, prizes or payment, and the copy must never imply any.
- **[CODE]** Profiles still have Follow and follower counts. This campaign does **not** ask anyone to follow StyleGenius News; SGN is only the promoter.
- **Not verified:** Google and email signup working end to end, and a test upload. Test them before launch.
- **Positioning:** "A home where AI art belongs" and "a safe haven for AI creators." This is now backed by the live Terms, limited to the AI medium itself.

## 1. Goals and measurement ($0, manual tally)
| Metric | Definition | How counted |
|---|---|---|
| **New AIdea sign-ups** (goal ≥10, stretch 20) | Distinct new AIdea accounts created from Sat Nov 7 12:00 AM CT through Sun Nov 8 11:59 PM CT | Take a baseline profile count Fri night (a read-only check showed 4 profiles at 8:10 PM CT). Then check the profile count at each checkpoint, read-only, only if Don OKs it. Otherwise, write down the new usernames seen. |
| **New creators posting** (goal 10) | Distinct accounts other than stylegeniusnews with their **first** live post inside that window | Write down usernames from the Newest feed and `/?q=goldenhour`. Optional read-only `creator_stats` count, if Don OKs it. |
| Golden Hour entries (supporting) | Live posts tagged `goldenhour` in the window | `/?q=goldenhour` |
| Channel source | Where people came from | Self-reported (welcome comment or reply). The `?ref=` tags aren't tracked by any verified analytics, so treat them as labels only. |
These are goals, not forecasts. Tally file: `/workspace/aidea/growth/tally.csv`, with columns `time_ct,profiles_total,new_signups,new_creator_usernames,goldenhour_posts,notes`. The final tally is after Sun Nov 8, 11:59 PM CT.

## 2. Two separate CTAs (never merge them)
- **Main CTA (sign-ups):** "Join AIdea free and post your AI art" → https://aidea-six.vercel.app/signup (Google or email).
- **Creator CTA (posting):** "Post your AI art or video and tag it goldenhour" → https://aidea-six.vercel.app/upload (after signup). Type `goldenhour` in the tags box, without the #.
- StyleGenius home (https://stylegenius-app.vercel.app) appears only as a sign-off, never as a competing CTA.

## 3. Concept and hooks
**Concept: "A Home Where AI Art Belongs."** Goldie and Suki open the doors to a free place built for AI creators, where AI is the medium, not the problem.
Hooks:
1. "Tired of hiding the AI in your AI art? Don't."
2. "A home where AI art belongs. Free. Nothing for sale."
3. "Written into the Terms: your work is never penalized or shadow banned for being made with AI."
4. "Be one of the first 50 creators. Founding Creator badge, for good."
5. "Golden Hour Challenge, this weekend: post warm golden light and tag it goldenhour."
6. "Goldie and Suki just moved in. Your art's next."

## 4. Schedule (CT), prioritized
Priority order: 1) the X launch thread and Goldie/Suki post, 2) the Golden Hour challenge, 3) opt-in email, 4) Reddit/hubs, only in venues Chief verifies.
**Fri Nov 6 (tonight)**
- Record the baseline counts and test signup with Google and with email.
- Don approves this doc, then Chief's venue list.
**Sat Nov 7**
- 9:00 AM: X launch post (X1) with the Goldie/Suki announcement image.
- 9:15 AM: publish the welcome/challenge post on AIdea after approval; pin only if a pin feature is verified.
- 10:00 AM: email E1 to the opt-in audience only (§7).
- 11 AM–4 PM: Reddit/hub posts in batches. Each one is tailored to its venue and only goes in a venue on Chief's verified-eligible list (§8).
- 12:00 PM: X2 (challenge).
- 3:00 PM: X3 (creator spotlight, if anyone has posted; otherwise the Daily Ten banner).
- 6:00 PM: tally, then reply personally to every new creator, both on AIdea and to X mentions.
- 8:00 PM: X4 (Saturday wrap, with real numbers only).
**Sun Nov 8**
- 10:00 AM: X5 ("still time" for Golden Hour, which ends Sunday 11:59 PM CT).
- 11 AM–3 PM: second Reddit/hub wave, only in different verified venues. No reposting the same text.
- 1:00 PM: X6 (spotlights of real posts, with the creators' permission).
- 7:00 PM: X7 (closing and thank-you, with the honest tally).
- 9:00 PM: preliminary tally; close the weekend window at 11:59 PM CT, then deliver the final tally when available.

## 5. Badges and the weekend challenge (LIVE, per [DB+CODE] in §0)
- **Founding Creator:** for the first 50 creators ever to post. Copy says "be among the first 50". Never say "first 10", and never guarantee a slot, since some are already taken.
- **Golden Hour 2026 badge:** post AI art or video with warm golden light, tagged `goldenhour`, between Sat 12:00 AM and Sun 11:59 PM CT.
- **Post badges and points:** mention them lightly ("earn badges and points as you post"). Points are bragging rights only, with no value.
- **Optional $0 extra:** a thank-you or spotlight post from @StyleGeniusNews, featuring only creators who say yes.

## 6. X drafts (@StyleGeniusNews) for Don's review
**X1 (launch, with the announcement image):**
> Goldie & Suki have news. 🥂
> AIdea is open: a home where AI art belongs. Free to join, nothing for sale, and your work is never penalized for being made with AI.
> Join AIdea free and post your AI art 👇
> https://aidea-six.vercel.app/signup?ref=x

**X2 (challenge):**
> Golden Hour Challenge ✨ this weekend on AIdea.
> Post AI art or video with warm golden light and tag it goldenhour by Sunday 11:59 PM CT to earn the Golden Hour badge. The first 50 creators ever to post get the Founding Creator badge.
> https://aidea-six.vercel.app/signup?ref=x

**X3 (spotlight or banner):**
> The first creators are moving in 👀 [quote or link a real post, with permission]
> Your turn: join free and post → https://aidea-six.vercel.app/signup?ref=x

**X4 (Sat wrap):** "Day one of the Golden Hour Challenge on AIdea: [N] creators posted. Thank you. Still open all day Sunday → https://aidea-six.vercel.app/signup" (real N only)

**X5:** "Sunday reset ☕ Golden Hour runs until 11:59 PM CT tonight. One post tagged goldenhour earns the badge. Join free: https://aidea-six.vercel.app/signup?ref=x"

**X6:** a spotlight thread of real posts, with consent.

**X7 (Sun evening, before close):** "Last call ✨ Golden Hour closes at 11:59 PM CT. To everyone who posted: you built the first room in the house. 🥂 https://aidea-six.vercel.app/signup · More from Goldie & Suki: https://stylegenius-app.vercel.app"

Hosts are presented in character only. Never label Goldie or Suki as AI. AIdea itself may be accurately described as a home for AI art and video.

## 7. Email (from stylegeniusnews@gmail.com), opt-in only
- **Audience:** only people who already opted in to StyleGenius News email. No such list has been verified. If none exists, skip email, and do not scrape or cold-email anyone.
- **Subject:** Goldie & Suki found a new home (and saved you a seat)
- **Body:**
> Hi {first name},
> This weekend we're opening the doors at AIdea, a free home where AI art belongs. Nothing for sale, and it's in the Terms that your work is never penalized or shadow banned for being made with AI.
> **Join AIdea free and post your AI art:** https://aidea-six.vercel.app/signup?ref=email
> **Golden Hour Challenge:** post something with warm golden light by Sunday 11:59 PM CT, tag it goldenhour, and earn the Golden Hour badge. The first 50 creators ever to post also get the Founding Creator badge.
> See you inside,
> Goldie & Suki, StyleGenius News
> *You're getting this because you signed up for StyleGenius News updates. Reply "unsubscribe" to stop.*

## 8. Reddit and AI-art hubs (CONDITIONAL on Chief's verified rules)
- Venue rules live in Chief's `/workspace/aidea/growth/weekend-plan.md` (I didn't edit it). Every post below depends on a venue row there being verified and approved.
- **~100 posts is a stretch ceiling, not a target or permission.** Post only in venues verified to allow self-promo or new-platform posts (for example a designated weekly thread), within each venue's limits. Write a distinct post per venue, never paste the same text across subs, and pace them out. Don't use alt accounts, vote solicitation or DMs. Post from an account that meets the venue's karma and age rules. If a venue bans links, use a no-link version or skip it.
- **Template A (showcase-first, best default):**
  - Title: "[Venue-appropriate title about the piece itself]"
  - Body: share a real piece and the process. One line at the end: "I've been posting my AI work on AIdea, a free home for AI creators (nothing for sale). Happy to answer questions." Add the link only if the rules allow it.
- **Template B (only in verified self-promo threads):**
  - "AIdea is a free home where AI art belongs. Its Terms pledge your work is never penalized or shadow banned for being made with AI (normal rules still apply). This weekend is the Golden Hour Challenge: tag your post goldenhour by Sun 11:59 PM CT for a badge. Feedback welcome. https://aidea-six.vercel.app/signup?ref=reddit-<venue>"
- **Template C (feedback ask, in subs that allow "rate my site"):** "Built a free platform for AI art and video creators. What would make you actually post there?"
- Each venue row needs: name, rule link, self-promo allowed (Y/N/thread), link allowed, account requirement, chosen template, and post time. Don or Chief approves each row.

## 9. Image picks (visually inspected Nov 6)
| Use | File | Notes |
|---|---|---|
| X1 Goldie/Suki announcement | `/workspace/stylegenius/ammo-pile/2026-10-31_hotel-lobby_charcoal-chalkstripe-3pc_suki-magenta-dress.jpg` | They're walking out through the lobby doors ("doors open"). Clean, full bodies, correct height gap. Keep the photo clean; announcement text belongs in its caption, not on the image. |
| X2 challenge | `/workspace/stylegenius/ammo-pile/2026-10-31_yacht-deck_navy-pinstripe-3pc_suki-cobalt-dress.jpg` | Suki is pointing ("your turn"), with golden ocean light; keep text in the caption. |
| Alternates | `.../ammo-pile/2026-10-31_piano-lounge_navy-pinstripe_suki-red-dress.jpg`, `.../2026-10-31_art-gallery_charcoal-windowpane_suki-emerald-dress.jpg` | The gallery fits "art belongs". Same files in `/workspace/aidea/seed-tagged/*.webp`. |
| Hero/banner | `/workspace/aidea/public/sgn/hero/banner.jpg` (1792×1008) | Elegant serif ribbon on dark. Good for X3 and X7. |
| Daily Ten | `/workspace/aidea/public/sgn/hero/daily-ten.jpg` (848×1257) | ⚠️ Not recommended. It has blocky sans text strips (it reads like the banned style), Goldie looks copper with a wide laugh (against rules #20/#33), and it shows a topics-style tagline. Use it only if Don explicitly wants it. |
Rules: keep the aspect ratio (crop or blur-pad, never stretch), never put text over faces, use only the top-right logo watermark (`/workspace/stylegenius/logo-sg-stacked/logo-v3.png`), no topic or product lists, and no blocky yellow text. Studio desk shots (`seeds/studio-thumbnails/`) are only for episode thumbnails, which this campaign doesn't use.

## 10. Approval checklist and dependencies
- [ ] Don approves the positioning. The pledge wording comes from the live Terms, scoped to "for being made with AI".
- [x] Subscriber = new AIdea sign-up (Don, Nov 6). Take the Fri baseline of AIdea accounts and posts.
- [ ] Test Google and email signup, and a test upload.
- [ ] Chief's verified venue list (weekend-plan.md), approved row by row.
- [ ] Approve or edit X1–X7 (who posts, and when).
- [ ] Decide whether an opt-in email list exists; if not, drop email.
- [ ] Decide whether to fix the "#goldenhour" tag (strip the #) before Sat 12:00 AM CT, or rely on the copy saying "type goldenhour without #".
- [ ] Confirm the copy on Founding Creator (first 50 ever, some slots taken) and on points (no value).
- [ ] OK a read-only Supabase count at the checkpoints, or use a manual tally only.
- [ ] Approve the image picks; photo posts remain clean except for the approved corner logo, with words in captions.
- [ ] A reply/moderation owner for Sat and Sun.
