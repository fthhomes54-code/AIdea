# AIdea Weekend Launch Plan (StyleGenius News presents)

# AIdea Weekend Launch: StyleGenius News Promoter Campaign (DRAFT)
**Status:** draft only. Nothing has been posted, sent, scheduled or changed on the site. Every item needs Don's OK.
**Window:** Sat Nov 7 to Sun Nov 8, 2026, all times Central (CT). **Budget:** $0.
**Main CTA (AIdea):** https://aidea-six.vercel.app · **First creator:** https://aidea-six.vercel.app/u/stylegeniusnews
**Secondary CTA (only where it fits, never competing):** https://stylegenius-app.vercel.app

## 0. Verified facts vs. assumptions
Checked Nov 6, 7:47 PM CT:
- These pages return HTTP 200: `/`, `/u/stylegeniusnews`, `/signup`, `/upload`, `/rules`.
- The live home page shows Home, Shorts, Trending, Following, Library and Upload, with All/Video/Art filters and Newest/Trending/Following.
- From the code (README and `app/u/[username]`), profiles have a **Follow** button and show "N followers · N posts". The README lists art (jpg/png/webp/gif) and video (mp4/webm) uploads, like/comment/save, outbound share buttons and tags, plus a NSFW opt-in that's off by default.
- **Confirmed by Don: "subscriber" = a new AIdea account (Google or email sign-up).** We are promoting AIdea itself; StyleGenius News is only the promoter brand. AIdea channel follows are tracked as a secondary metric.
- **Not verified:** that Google and email signup both work end to end. Test once before launch.
- **No badge, challenge or reward feature exists.** The Founding Creator badge is only a proposal (see §5).
- **Positioning:** use "a safe haven for AI creators" and "a home where AI art belongs" (welcome without stigma).
  - ⚠️ Owner policy confirmation needed: do NOT promise "never penalized, shadow-banned or removed for being AI" until Don confirms that as written policy. Rules and moderation still apply (no hate, threats or minors, and NSFW must be self-tagged).

## 1. Goals and measurement ($0, manual tally)
| Metric | Definition | How counted |
|---|---|---|
| New AIdea sign-ups (goal ≥10, stretch 20) | Distinct new AIdea accounts created between Sat 12:00 AM and Sun 11:59 PM CT | Record baseline Friday and checkpoints through Sunday 11:59 PM CT. Public follower-count change measures net growth only, not distinct new accounts; verify individual follows/account creation only if authorized records support it. |
| Creators posting (goal 10) | Distinct accounts other than stylegeniusnews with ≥1 post in the window | Scroll the Newest feed and write down usernames. Optional: Supabase read-only count, if Don OKs it. |
| Channel source | Where they came from | Ask in the welcome comment, and use per-channel link variants like `?ref=x`, `?ref=reddit-<sub>` and `?ref=email`. Query parameters alone do not measure attribution. Record self-reported sources; link-based attribution requires verified analytics. |
These are goals, not forecasts. Keep the tally in `/workspace/aidea/growth/tally.csv` with the columns `time_ct,followers,creator_posts,new_creator_usernames,notes`.

## 2. Two separate CTAs (never merge them)
- **Primary CTA:** "Join AIdea free and post your AI art" → https://aidea-six.vercel.app/signup (Google or email). Secondary: follow creators you like on AIdea.
- **Creator CTA:** "Post your AI art or AI video on AIdea" → /upload (after signup). Use #FoundingWeekend as a free-text tag (the tags are free text, so this works with no build).

## 3. Concept and hooks
**Concept: "A Home Where AI Art Belongs."** Goldie and Suki open the doors to a free place built for AI creators, where the AI isn't the problem, it's the medium.
Hooks:
1. "Tired of hiding the AI in your AI art? Don't."
2. "A home where AI art belongs. Free. No selling."
3. "Founding Weekend: be one of the first 10 creators on AIdea."
4. "Goldie and Suki just moved in. Your art's next."
5. "Post it proud: AI art and AI video, welcome here."
6. (Weekend challenge) "Theme: *Golden Hour*. One image or short clip. Tag #FoundingWeekend."

## 4. Schedule (CT), prioritized
Priority order: 1) the X launch thread and Goldie/Suki post, 2) the challenge, 3) opt-in email, 4) Reddit/hubs, only in venues Chief verifies.
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
- 10:00 AM: X5 ("still time" plus the challenge).
- 11 AM–3 PM: second Reddit/hub wave, only in different verified venues. No reposting the same text.
- 1:00 PM: X6 (spotlights of real posts, with the creators' permission).
- 7:00 PM: X7 (closing and thank-you, with the honest tally).
- 9:00 PM: preliminary tally; close the weekend window at 11:59 PM CT, then deliver the final tally when available.

## 5. Founding Creator badge (PROPOSAL, does not exist yet)
- Proposal: the first 10 distinct creators who post during Founding Weekend get "Founding Creator" recognition.
- $0, no-build version: a public thank-you post from @StyleGeniusNews naming them (with consent), plus a manual list in `tally.csv`.
- Optional later build: a profile badge. That needs a site change and Don's approval, and it is **not** promised in the copy. The copy says "recognized as Founding Creators", not "get a badge".

## 6. X drafts (@StyleGeniusNews) for Don's review
**X1 (launch, with the announcement image):**
> Goldie & Suki have news. 🥂
> AIdea is open: a home where AI art and AI video belong. Free to join, nothing for sale.
> Follow us there and come post with us this weekend 👇
> https://aidea-six.vercel.app/u/stylegeniusnews?ref=x

**X2 (challenge):**
> Founding Weekend Challenge ✨ Theme: *Golden Hour*.
> Post one AI image or short AI video on AIdea, tag #FoundingWeekend, and the first 10 creators get recognized as Founding Creators.
> https://aidea-six.vercel.app?ref=x

**X3 (spotlight or banner):**
> First creators are moving in. Look at this 👀 [quote or link a real post, with permission]
> Your turn → https://aidea-six.vercel.app?ref=x

**X4 (Sat wrap):** "Day one of AIdea's Founding Weekend: [N] creators posted. Thank you. Tomorrow's still open. https://aidea-six.vercel.app #FoundingWeekend" (use the real N only)

**X5:** "Sunday reset ☕ Still time to be a Founding Creator. One post, tag #FoundingWeekend. https://aidea-six.vercel.app?ref=x"

**X6:** a spotlight thread of real posts, with consent.

**X7:** "Founding Weekend is a wrap. To everyone who posted: you built the first room in the house. 🥂 Follow along: https://aidea-six.vercel.app/u/stylegeniusnews?ref=x · More from us: https://stylegenius-app.vercel.app"

Hosts are presented in character only. Never label Goldie or Suki as AI.

## 7. Email (from stylegeniusnews@gmail.com), opt-in only
- **Audience:** only people who already opted in to StyleGenius News email. No such list has been verified. If none exists, skip email, and do not scrape or cold-email anyone.
- **Subject:** Goldie & Suki found a new home (and saved you a seat)
- **Body:**
> Hi {first name},
> This weekend we're opening the doors at AIdea, a free home where AI art and AI video belong. No selling, just creators.
> **Follow us there:** https://aidea-six.vercel.app/u/stylegeniusnews?ref=email
> **Make something?** Post one piece this weekend, tag #FoundingWeekend, and you could be one of our first 10 Founding Creators.
> See you inside,
> Goldie & Suki, StyleGenius News
> *You're getting this because you signed up for StyleGenius News updates. Reply "unsubscribe" to stop.*

## 8. Reddit and AI-art hubs (CONDITIONAL on Chief's verified rules)
- Chief's venue research (`/workspace/aidea/growth/weekend-plan.md`) **wasn't on the box when this was written**. I didn't create or overwrite it.
- **~100 posts is a stretch ceiling, not a target or permission.** Post only in venues verified to allow self-promo or new-platform posts (for example a designated weekly thread), within each venue's limits. Write a distinct post per venue, never paste the same text across subs, and pace them out. Don't use alt accounts, vote solicitation or DMs. Post from an account that meets the venue's karma and age rules. If a venue bans links, use a no-link version or skip it.
- **Template A (showcase-first, best default):**
  - Title: "[Venue-appropriate title about the piece itself]"
  - Body: share a real piece and the process. One line at the end: "I've been posting my AI work on AIdea, a free spot built for AI creators (no selling). Happy to answer questions." Add the link only if the rules allow it.
- **Template B (only in verified self-promo threads):**
  - "We're opening AIdea this weekend, a free home where AI art and AI video belong. Founding Weekend challenge: theme *Golden Hour*, tag #FoundingWeekend. Feedback welcome, especially on what would make you post there. https://aidea-six.vercel.app?ref=reddit-<venue>"
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
- [ ] Don approves the positioning, plus the exact "safe haven" promise (§0 ⚠️).
- [x] Subscriber = new AIdea sign-up (Don, Nov 6). Take the Fri baseline of AIdea accounts and posts.
- [ ] Test Google and email signup, and a test upload.
- [ ] Chief's verified venue list (weekend-plan.md), approved row by row.
- [ ] Approve or edit X1–X7 (who posts, and when).
- [ ] Decide whether an opt-in email list exists; if not, drop email.
- [ ] Decide the Founding Creator recognition: a thank-you post only, or a badge build later.
- [ ] Approve the image picks; photo posts remain clean except for the approved corner logo, with words in captions.
- [ ] A reply/moderation owner for Sat and Sun.

---

# AIdea grassroots weekend plan
Saturday November 7–Sunday November 8, 2026. All times CST (America/Chicago, UTC−6). Research prepared November 6. Budget $0. Research/drafts ONLY: nothing sent, posted, joined or purchased.

## Goals and gates
By Sunday 9 PM CST: at least 10 distinct NEW registered members AND 10 distinct new members publishing original art/video. Prefer the same ten completing both steps. “Subscriber” means free registered member here, not paid subscription; channel follows tracked separately. Existing StyleGenius posts/test accounts do not count. Aim for 20 registrations to buffer activation loss. Hypothesis, not forecast: 100 relevant visits × 20% registrations × 50% first-post rate = 10 posters; at 10% signup rate need 200 visits. No guaranteed result.

Don must approve each exact outgoing message, venue/recipient and asset. Moderator permission is an additional gate. Parent should use DraftExternalMessage for proposed sends under Don's name; no connector drafts or sending in this task. No scraping emails, bulk cold DMs, copy-paste crossposts, vote exchanges, alternate accounts or filter evasion. Stop on refusal/removal; at most three technical attempts per thing. Facebook groups excluded.

Positioning: **A welcoming home for AI art and AI video.** Proposed stronger policy, requiring Don's approval and moderation-policy verification: “We don't penalize work just because it's AI-generated; community and safety rules still apply.” Do NOT claim “never shadow banned,” guaranteed reach, absolute safety or immunity from moderation. None is substantiated. Never characterize StyleGenius hosts as AI. Free Google/email signup, no selling: https://aidea-six.vercel.app . First example channel: https://aidea-six.vercel.app/u/stylegeniusnews . Contact: stylegeniusnews@gmail.com .

## 1. Verified target table
Existence verified through public search/fetch evidence below; rules may change. Unknown means HOLD, not permission. Sizes are displayed/indexed snapshots, not reach estimates. Unless explicitly stated, numeric karma/account-age thresholds were NOT established; check current rules and posting UI before approval. A = documented promotion route; B = permission required/uncertain; C = value-only, no recruitment.

|Community / priority|URL / size found|Promotion rule and source|Best approach|
|---|---|---|---|
|r/aiArt — A|https://www.reddit.com/r/aiArt/ ; size not verified|Promotion only in designated thread; no selling; thread permits project/site links, **no repost for seven days**. Art needs generator flair. Aug 2026 update disallows repeated near-identical model/character posts. [R1,R2]|One founder comment in current designated promo thread. Verify old thread is open or find replacement; no main-feed ad.|
|r/StableDiffusion — A conditional|https://www.reddit.com/r/StableDiffusion/ ; size not verified|Local/open-source generation focus; limited free-tool promo once/tool/update. Project/startup promotion megathread allows direct link + honest description, no shorteners/auto-subscribe links. [R3,R4]|AIdea is a sharing site, NOT a local generator: don't stretch exemption. Current project-promo thread only if still available and in scope; otherwise ask mods. February 2025 thread is evidence, NOT November destination.|
|r/midjourney — C|https://www.reddit.com/r/midjourney/ ; indexed old sidebar 1,163,042 readers, stale|MJ-related only, no advertising/spam, social links in comments; that is not blanket recruitment permission. Credit/permission required. [R5]|Real original MJ process discussion only; no AIdea invitation without mod permission.|
|r/AIArtwork — B|https://www.reddit.com/r/AIArtwork/ ; size not verified|2026 announcements allow discussion, prohibit debates, restrict NSFW. Current promo policy unverified; rules fetch timed out. Old contest tolerance is not current permission. [R6]|Ask mods; SFW; confirm flair/account requirements before any recruitment.|
|r/aivideo — C/B|https://www.reddit.com/r/aivideo/ ; size not verified|Live wiki: new accounts can submit; one native full-motion video/day, longer than 8 seconds, no loops/slideshows/tests/ads/partial uploads. Own-video comments allow content promotion to approved social sites; tool/service promotion prohibited. [R7]|Do NOT submit picture/dialogue episode as video. Only complete rights-cleared film; ask if AIdea qualifies as allowed content destination before linking.|
|r/sdforall — B|https://www.reddit.com/r/sdforall/ ; size not verified|2022 mod direction requires flair and prompt or help request; image alone removed. Current external promo policy unverified. [R8]|Useful real SD workflow; no disguised ad. Ask staff before invitation.|
|r/SunoAI — B, low fit|https://www.reddit.com/r/SunoAI/ ; size not verified|External/self-promotion banned without prior moderator approval. [R9]|Only relevant to makers of music visuals; AIdea isn't described as audio hosting. Request resource-hub consideration; otherwise skip.|
|Midjourney official Discord — B|https://discord.com/invite/midjourney ; size not verified|Official docs verify server. General guidelines require SFW, permission for reposts, honest provenance; server promo rules not established. [H1,H2]|Ask staff for authorized project channel. No generator-channel link drops/member DMs.|
|Stable Diffusion official Discord — B|https://discord.com/invite/stablediffusion ; 314,714 members on discovery snapshot|Official Stability.AI community; server-specific promo permission unverified. Discord anti-spam applies. [H3,H4]|Read rules; staff permission for project-feedback channel.|
|Civitai — B|https://civitai.com/ ; size not verified|Anti-spam notice: new-account limits based on age/positive interactions; outbound URL blocklists. Numeric limits unpublished; blanket promo permission not established. [H5]|Useful original workflow article only under current rules/staff permission. No repeated image comments or DM campaign; never obfuscate blocked URL.|
|Lemmy AI Art & Image Generation — B|https://lemmy.world/c/ai_art ; size not verified|Existence indexed; direct fetch returned 500; promo policy unknown. [H6]|Hold until live sidebar/mod permission. Federated mirrors count as same community.|
|DeviantArt Ai-Elite — B|https://www.deviantart.com/ai-elite/about ; 3.1K members / 3.8K watchers|AI-art-focused journals; strongest work, correct galleries, no multi-image/text-in-image/framed creations. External promo permission unknown. DA etiquette bans spam/repetitive commercial contact. [H7,H8]|Ask admin about one invitation journal; Daily Ten text-heavy image isn't suitable gallery submission.|
|Tumblr Generative AI — C|https://www.tumblr.com/communities/generative-ai-community/about ; size not verified|About explicitly says no spam/self-promotion/unrelated links; apply stricter text despite shorter “limit promos” guideline. [H9]|Link-free helpful discussion only, not recruitment or promo replies.|
|Are We Art Yet? collective/Discord — B|https://are-we-art-yet.tumblr.com/ ; size not verified|Public page links Discord, emphasizes ethical creation/artist objections; recruitment rules unverified. [H10]|Organizer permission first. No implied endorsement or invented shared political identity.|
|NightCafe Lounge Discord — B|https://nightcafe.studio/blogs/blog/how-to-create-ai-art-using-nightcafes-online-ai-art-generator ; size not verified|Official article links Lounge; server promotion policy unverified. [H11]|Use official invite route; staff permission; don't hijack challenges/support channels or spend credits.|

Not counted: r/promptshare could not be verified after two targeted searches. X hashtag search gave no useful verification; X policy fetch returned 403. No X community/hashtag is claimed as verified. Tumblr directories are discovery pages, not approved placements.

### Don's 100-distinct-venue stretch request
Research/qualify **100 distinct venue candidates**, not automatically 100 posts. This file verifies 15 destinations; only two document potentially usable promotion routes. It does NOT claim 100 verified venues or 100 compliant invitation drafts. Most venues above require permission; filling quota by ignoring rules would harm AIdea.
Research allocations (NOT verified venues): 25 Reddit, 25 Discord, 10 Civitai/editorial spaces, 10 independent forums/Lemmy, 10 DeviantArt groups, 10 Tumblr communities, 10 X communities. Redistribute if genuine distinct venues don't exist; don't count hashtags, federated mirrors or individual creators as separate community placements. Each candidate needs canonical URL, current activity, rule quote/source/date CST, account eligibility, staff approval if needed, unique value/asset and exact Don-approved copy. Reject and log unsuitable candidates. No fictional filler list.
Realistic initial execution: 2–6 highly relevant approved placements plus 15–30 permission-based individual conversations, contingent on responses and approvals. Ten engaged creators matter more than 100 link drops.
Coordination: /workspace/aidea/growth/stylegenius-campaign.md was NOT present when checked. Recheck before execution. StyleGenius promoter owns voice/creative tailoring; main agent owns rule verification, approval ledger, onboarding measurement. Deduplicate by canonical venue and recipient. No coordination already claimed and no blanket permission to send.

## 2. Hour-by-hour schedule
All outward actions contingent on exact approval; otherwise use that hour for research/drafts. Don approves offers/policy/text; main agent handles qualification/tracking; promoter prepares unique creative/copy. No promised autonomous monitoring.

|CST hour|Saturday Nov 7|Sunday Nov 8|
|---|---|---|
|8–9 AM|Record baseline IDs/counts. Test mobile Google/email signup and first upload using existing authorized test account.|Count unique new members/first posters and exact gap.|
|9–10 AM|Verify current aiArt/SD promo threads, age/karma/flair gates; package drafts for Don.|Recheck rules/approvals; never repeat aiArt within seven days.|
|10–11 AM|Qualify 10–15 further distinct venues; promoter tailors draft/asset.|Qualify 10–15 additional venues; prioritize audiences actually converting.|
|11 AM–noon|If approved, one aiArt designated-thread comment.|One different approved placement, not recycled text.|
|Noon–1 PM|Break; review signup errors.|Break; inspect upload/playback friction.|
|1–2 PM|If approved, current SD promotion-thread comment; otherwise hold.|Help genuine interested members with first upload, with approved replies.|
|2–3 PM|Prepare 10 named, personalized warm/opt-in creator invitations.|Prepare 5–10 further warm/permission-based drafts; no scraped list.|
|3–4 PM|Send only individually approved text to approved named recipients.|Only separately approved new invitations, not repeat contact with silent people.|
|4–5 PM|Qualify 10–15 more candidates; log rejects too.|Continue toward 100 examined candidates, not fabricated approved posts.|
|5–6 PM|Voluntary creator onboarding window.|Activation office hour for members wanting help posting.|
|6–7 PM|One staff-approved Discord/project placement if Don also approves.|One additional relevant approved placement only; no last-minute blast.|
|7–8 PM|Review feedback; draft personal welcomes. Features require creator consent.|Ask satisfied consenting members if they want to share their own link with one interested friend; no quota/reward.|
|8–9 PM|Checkpoint target: 10–12 members / 5 first posters; troubleshoot if behind.|Final onboarding and count; goal ≥10 members AND ≥10 distinct first posters.|
|9–10 PM|Prepare Sunday approval packet; stop outreach for night.|Report actual results, sources and gaps; archive opt-outs and lessons.|

If Saturday has <5 registrations, inspect value/signup flow and prioritize warm leads. If ≥10 members but <5 posters, Sunday is activation-first. Pause campaign on broken signup/upload. No unapproved sends to meet quota.

## 3. Unique venue-tailored drafts
ALL UNAPPROVED. Staff request ≠ permission to send. Unknown-rule venues have staff-request drafts, not falsely “ready” campaign posts. Brackets require true details. Only authorized original assets; never invent workflow facts. For outbound messages parent should call DraftExternalMessage with exact recipient/channel/text/context.

### r/aiArt — designated promotion thread only
Hi, I'm Don. I'm building AIdea, a free place to share AI art and AI videos. I'm looking for a small first group of creators who want to post one piece and help shape the experience—not buy anything or move their whole portfolio. A finished image and a sentence about how you made it is plenty. Google or email signup: https://aidea-six.vercel.app . Our first channel is StyleGenius News. Questions or upload trouble? stylegeniusnews@gmail.com . It's early, and honest feedback is welcome.

### r/StableDiffusion — current project-promotion thread only
AIdea — free art/video sharing; looking for feedback from local-model creators
I'm Don, the founder. This is a sharing app, not an image generator, model host or paid SD service. I'd like a few SD/Flux creators to publish one original result and optionally include model/process notes so viewers can understand the choices behind it. Google/email membership, no selling. We're small and I can't promise an audience; I can listen to feedback on publishing. https://aidea-six.vercel.app — stylegeniusnews@gmail.com . What detail would make an art gallery useful to you?

### r/AIArtwork — moderator request
Hi mods, I'm Don, building AIdea, a free AI-art/video-sharing site. I saw your update allowing discussion and your no-debate rule. May I share one transparent founder invitation for a small creator-feedback weekend? One original piece, direct site link, no sales or repeated posts. If there's a thread, flair or account requirement, I'll follow it; if recruitment isn't welcome, I won't post. Review URL: https://aidea-six.vercel.app . Contact: stylegeniusnews@gmail.com .

### r/midjourney — value-only, NO invitation/link
What do you keep consistent when turning a Midjourney image into a series? I'm interested in editing decisions more than a perfect first generation: what do you lock first—palette, lighting, composition or character reference? [Add only a real owned MJ example and its actual settings.] I'd like to compare practical approaches, not just finished results.
No AIdea mention or promotional follow-up. Without actual example, retain as discussion draft.

### r/aivideo — staff clarification
Hi mods, I'm checking before submitting. I run AIdea, a free social sharing site for AI art/video. Your wiki permits promoting one's content in comments on one's own complete video but prohibits service ads. Would a direct link to that same film's AIdea post qualify as an allowed social content link? I won't post a signup ad, slideshow or partial trailer. If this destination isn't allowed, I'll leave it out. Don — stylegeniusnews@gmail.com .
Separate video caption only IF eligible original film exists: “[Actual film title] — [true one-sentence premise]. Made with [real tools]; [one genuine workflow decision].” Current picture/dialogue episode is NOT eligible video.

### r/sdforall — staff request
Hi mods—your direction post asks for flair plus prompts or help requests. I'd like to share a genuine SD workflow with its prompt and ask for critique, and disclose that I'm also building AIdea, a free sharing site. Is any outside-community invitation allowed, or should the workflow stay entirely link-free? Happy to do the latter. Please let me know current flair/account requirements. Don — stylegeniusnews@gmail.com .

### r/SunoAI — resource-hub request
Hi mods, I read that external promotion needs prior approval. AIdea is my free art/video-sharing app, not an audio host. Would it fit the resource hub specifically for Suno creators who also make original accompanying visuals? If outside scope, no problem—I won't post promotional comments. Review URL: https://aidea-six.vercel.app ; Don, stylegeniusnews@gmail.com .

### Midjourney Discord — staff request
Hi team, could you point me to your rule on external creator-community invitations? I'm Don, building a free place for AI art/video called AIdea. I'd only share one invitation in an explicitly permitted channel, with an original image and a useful process explanation. No bot automation or member DMs. If outside recruitment isn't allowed, I'll respect that. Contact: stylegeniusnews@gmail.com .

### Stable Diffusion Discord — staff request
Hello! Is there an approved project-feedback channel for a free art-sharing app? I'm testing whether AIdea's publishing flow works well for local-model artists who want to show an image alongside process notes. I'd invite a few volunteers transparently, not drop links into generation/help channels. Please let me know whether that's welcome and what rules apply. Don — stylegeniusnews@gmail.com .

### Civitai — staff/article proposal
I'd like to write an original practical note on presenting an AI image: final result, model/version, optional prompt, edit choices and credit. I also run AIdea, a free art/video-sharing app. Can that article transparently mention the app once, or should it remain entirely on Civitai without an outside invitation? I won't distribute links through image comments or repeated messages. Don — stylegeniusnews@gmail.com .

### Lemmy ai_art — moderator request
Hi, I'm Don. Is a one-time founder invitation to a free AI-art/video site appropriate here? I'd state the limitations honestly: it's new, the audience is small, and I'm asking for one original upload plus feedback. I don't want to flood federated communities or repost across mirrors. If you prefer process discussion only, I'll keep the site link out. Review URL: https://aidea-six.vercel.app .

### DeviantArt Ai-Elite — admin request
Hi Ai-Elite team, I read that journals should focus on AI-art topics and gallery submissions should be selective. Would you allow one disclosed journal invitation to AIdea, my free AI-art/video-sharing app? The idea is to ask creators to share one favorite piece and discuss presentation—not fill your gallery with promotional cards. No feature promises or sales. If outside-community invites aren't allowed, I won't submit. Don — stylegeniusnews@gmail.com .

### Tumblr Generative AI — value-only, no promotion
What information makes another creator's process note useful to you? My short list is model/version, the most important prompt decision, and what changed in editing. A final image doesn't need a huge recipe, but one concrete choice makes it easier to learn from. What would you add?
No AIdea mention, signup invitation or promotional replies in this no-self-promotion community.

### Are We Art Yet? — organizer request
Hi, I'm Don. Your emphasis on responsible creation and respecting artists' objections caught my attention. I'm building AIdea, a free place to share AI art/videos, and would like to learn whether a small, transparent creator-feedback invitation fits your community. I'm not proposing NFTs, sales or an endorsement from your collective. If outside invitations aren't welcome, I'll respect that. Review URL: https://aidea-six.vercel.app ; stylegeniusnews@gmail.com .

### NightCafe Lounge — staff request
Hi Lounge team, I found you through NightCafe's official guide. Before sharing anything, is there a channel permitting a one-time invitation to test a free art-sharing site? I'd like NightCafe creators' feedback on presenting one favorite piece and a short process note on AIdea. I won't promote the app in challenge or support threads. Don — stylegeniusnews@gmail.com .

### Optional offer, NOT in default drafts
Requires Don's OK, actual feature build, eligibility terms and creator consent: “The first 50 creators to join and publish an original piece can opt into a Founding Creator badge. Selected work may be featured with permission.” Do not imply badge already exists, guarantee homepage exposure to all 50, or invent scarcity counters. Zero-cost fallback: personal feedback on one post, only if Don can actually deliver it.

## 4. Five individual DM/email templates
Personalize truthful brackets; obtain named-recipient/exact-message approval. Prefer warm contacts, explicit collaboration-contact routes or people asking for sharing options. Public email visibility alone isn't opt-in. No scraping, sequences or repeated weekend follow-up to silence. Respect applicable outreach rules; don't invent a required postal address or compliant signature.

### 1. Warm creator email
To: [named existing contact / verified email]
From/reply-to: stylegeniusnews@gmail.com
Subject: Would you try one art post on AIdea?
Hi [name], [genuine shared context]. I'm opening AIdea, a free membership app for AI art/videos. Your [specific piece] made me think you'd be a good early tester. Would you be open to posting one original work this weekend and telling me what felt easy or awkward? Google/email signup: https://aidea-six.vercel.app . No purchase or portfolio move needed. No pressure—tell me if you'd rather not receive invitations like this.
Don

### 2. Permission-first creator DM
To: [named creator on permitted channel, explicitly open to collaboration inquiries]
Hi [name], I liked [specific visual decision] in [actual piece]. I saw you're open to collaboration inquiries. I'm building AIdea, a free home for AI art/video. Would it be OK to send a short invitation to try one upload? Totally fine if not. —Don (stylegeniusnews@gmail.com)

### 3. Filmmaker email
To: [named filmmaker's suitable collaboration contact]
From/reply-to: stylegeniusnews@gmail.com
Subject: A small publishing test for your AI short
Hi [name], [specific observation about their film]. I'm looking for a few filmmakers to test AIdea with one original video. It's a free art/video-sharing app, and I'd especially value feedback on playback and presentation. Interested this weekend? https://aidea-six.vercel.app . I can't promise reach; I'm asking for honest feedback. If not relevant, no need to reply and I won't follow up.
Don

### 4. Reply to someone requesting sharing options
To: [named creator in opted-in conversation]
You asked for places welcoming AI work. I run AIdea, so full disclosure: this is my app. It's free, supports art/video and uses Google/email signup. If you want to try it, start with one piece you have the right to share: https://aidea-six.vercel.app . Happy to hear what you think. Questions: stylegeniusnews@gmail.com . —Don

### 5. Activation help after signup/accepting help
To: [named member requesting or accepting help]
Hi [name], thanks for giving AIdea a try. If you'd still like to publish this weekend, one favorite original image or video and a short caption is enough. Did anything block the upload? Tell me what screen you're on, or reply to stylegeniusnews@gmail.com . No passwords or private files needed. If you'd rather browse for now, that's fine too. —Don

## 5. Quick conversion changes — proposals only, not deployed
P0: test mobile Google/email return path, useful signup errors, first-upload success and video playback. Preserve approved banner and uncropped heads. Clear in-app “Share your first creation” action and small honest “Free membership • AI art & video welcome” explanation; don't turn it into a landing page. Link actual safety rules/contact.
P1 with approval/build: consent-based featured-creators row and transparent selection, return-to-upload after signup, first-post checklist, shareable creator/post links and optional invite links. Test any referral parameter before using it; UTM query strings don't imply conversion analytics exist. Manual source question is adequate at $0. No email addresses in public invite URLs.
P2: review AI-welcoming moderation statement with safety exceptions, reporting and review contact. Never guarantee “never shadow banned,” fabricate follower counts or promise badges/reach/human review that don't exist. Do not feature/repost anyone's art without permission.

## 6. Tracking checklist
- [ ] Baseline member/post IDs before launch; exclude staff/tests/seeds. Distinct NEW first posters, not ten posts by one person.
- [ ] Venue ledger: canonical URL; rule URL + quote + verified CST time; displayed size/date; current thread/channel; age/karma/flair requirement; moderator permission evidence; owner; overlap; unique draft/asset rights; Don approval ID; published URL/time (blank until actually sent); visits if measurable; registrations; distinct first posters; opt-outs/removals.
- [ ] Keep researched venue, draft, invite sent, visit, registration, follow and first published post as seven DIFFERENT metrics. Deduplicate people without unnecessary personal data.
- [ ] Reconcile stylegenius-campaign.md if it appears; one owner per venue/recipient. No duplicate contact from main agent and promoter.
- [ ] Every outgoing item: true founder disclosure, value specific to venue, actual rules checked, correct flair, direct URL, no AI-host claim, sales, invented scarcity, unsupported reach/policy promises or unbuilt badge.
- [ ] Saturday 8 PM CST checkpoint; Sunday noon CST gap check; Sunday 9 PM CST final results versus 10/10.
- [ ] <5 Saturday registrations: inspect signup/value and warm leads. ≥10 members but <5 posters: voluntary onboarding first. Broken signup/upload: pause promotion.
- [ ] Stop on opt-out/refusal/removal/URL block; never evade or repost. No weekend follow-up to silent cold recipients. No coordinated upvotes or moderator pressure.
- [ ] Missed target: report actual gap and next test; no paid fallback, fake progress or 100-post blast.

## Sources and limitations
WebSearch/WebFetch research; old indexed rules/counts can be stale. Unknown numeric account gates and current promo thread availability remain blockers, not assumed permission.
R1 aiArt promo thread (direct fetched): https://www.reddit.com/r/aiArt/comments/1040fpe/ongoing_selfpromotion_thread_promote_your/
R2 aiArt indexed sidebar: https://old.reddit.com/r/aiArt/comments/17zmx1n/unreleased_1980s_anime_movies_which_one_would_you/ ; Aug 2026 model repetition update: https://www.reddit.com/r/aiArt/comments/1vz2yzb/new_rule_update/
R3 SD rules: https://www.reddit.com/r/StableDiffusion/comments/1f4zznt/updated_rules_for_this_subreddit/
R4 SD monthly guidelines (direct fetched): https://www.reddit.com/r/StableDiffusion/comments/1ip0s39/monthly_promotion_megathread_february_2025/
R5 MJ indexed sidebar: https://old.reddit.com/r/midjourney/
R6 AIArtwork: https://www.reddit.com/r/AIArtwork/comments/1smqcnb/a_couple_of_announcements/ ; https://www.reddit.com/r/AIArtwork/comments/1sunncd/new_policy_on_nsfw_please_read/ (current rules fetch timed out)
R7 aivideo live wiki, prefer over inconsistent historical removal comments: https://www.reddit.com/r/aivideo/wiki/rules/
R8 sdforall direction (direct fetched): https://www.reddit.com/r/sdforall/comments/y5vk7q/direction_adjustments/
R9 SunoAI (direct fetched): https://www.reddit.com/r/SunoAI/comments/1lft4ok/selfpromotion_promotion_spam_of_external_tools_is/
H1 official MJ Discord route: https://docs.midjourney.com/hc/en-us/articles/32631709682573-Discord-Quick-Start
H2 MJ guidelines (direct fetched): https://docs.midjourney.com/hc/en-us/articles/32013696484109-Community-Guidelines
H3 official SD discovery (direct fetched): https://discord.com/servers/stable-diffusion-1002292111942635562
H4 Discord general rules (search evidence): https://discord.com/guidelines/
H5 Civitai anti-spam (direct fetched): https://civitai.com/articles/8256/anti-spam-measures
H6 Lemmy indexed community: https://lemmy.world/c/ai_art (direct fetch 500)
H7 Ai-Elite rules/count (direct fetched): https://www.deviantart.com/ai-elite/about
H8 DA etiquette (indexed): https://www.deviantart.com/about/policy/etiquette
H9 Tumblr strict no-promotion rules (direct fetched): https://www.tumblr.com/communities/generative-ai-community/about
H10 AWAY: https://are-we-art-yet.tumblr.com/ ; organizer invitation: https://www.tumblr.com/reachartwork/692541478643302400/join-the-are-we-art-yet-discord-server
H11 NightCafe official Lounge route: https://nightcafe.studio/blogs/blog/how-to-create-ai-art-using-nightcafes-online-ai-art-generator
