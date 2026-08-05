# Product Hunt Launch Plan & Research: Niki

**Depth:** Wide · **Objective:** Rank #1 / maximize visibility · **Date:** 2026-08-05
**Product:** Niki — an AI software‑engineering / product agent *studio* (self‑serve: a team of AI agents — planner, coder, tester, reviewer, security, synthesizer — that build software). Closest category analogues: AI coding agents, dev tools, vibe‑coding tools.
**Method:** 6 parallel research subagents (ranking, timing, pre‑launch audience, launch‑day assets, post‑launch amplification, tools/pitfalls) → 1 adversarial verification subagent → 1 targeted re‑verification pass on the highest‑risk flags. All primary search was delegated; this document only decomposes, verifies, and synthesizes.
**Companion file:** `plans/2026-08-03-niki-for-code-product-hunt-launch.md` (the existing operational launch plan). This report is the research backbone; where they agree, the plan already encodes the recommendation.

---

## Executive Summary

Product Hunt's ranking is *not* something you "game" with a vote count — PH explicitly publishes no formula and runs active anti‑manipulation that strips inauthentic votes. The real gate for a #1 is two‑step: first **get featured** (human editorial, ~10% of launches in the most recent hard data we found, and possibly lower now), then win the daily points race on the Featured homepage. For Niki specifically, the single biggest risk is **not** upvotes — it is the **featuring gate**, because PH does not feature "Services," waitlisted‑only products, or "minimal, undifferentiated… immediate monetization" products, and the AI‑coding category is the most saturated surface on the site. Niki's existing plan (open‑source, self‑hosted, live product with optional cloud beta) already positions it safely as a *product*, not a service, which is the correct defensive move. The launch should be built on a **real owned audience + a pre‑written maker first comment + same‑day real‑time comment engagement + legitimate external amplification (X/LinkedIn/HN staggered)**, never on vote‑buying, pods, or explicit upvote asks. Timing is genuinely contested: weekdays maximize traffic, weekends are cheaper to *win* — so the date must be chosen against Niki's actual warm‑audience size, not a rule of thumb. Almost every specific numeric claim about the algorithm (vote thresholds, hourly velocity caps, detection rates) comes from vendors who *sell* launch/upvote services and should be discounted to near‑zero.

---

## Background / Key Terms (verified against PH primary sources)

- **The 24‑hour cycle is Pacific.** Launches go live at **00:01 PT** and the day runs midnight‑to‑midnight PT. Scheduling is now **day‑only** (pick a date within 30 days; PH auto‑publishes at midnight PT) — the old "pick 12:01am / Launch now" controls are gone from the live form (help.producthunt.com/2724119, updated Feb 2026; producthunt.com/changes).
- **Ranking = "points," not raw upvotes.** PH: *"One upvote does not always equal one point"*; inputs are upvotes, comments, time‑since‑submission, and undisclosed factors. PH refuses to publish weights (help.producthunt.com/484938; producthunt.com/launch/launch-day-questions).
- **Featured is a human editorial gate.** Criteria: **Useful, Novel, High Craft, Creative** — a product need not ace all four. Being featured puts you on the homepage leaderboard and the Daily Digest; being *unfeatured* means no leaderboard and, practically, no path to #1 (help.producthunt.com/9883485).
- **Self‑hunting is the norm.** PH's own data: 79% of featured posts are self‑hunted; 60% of #1 Product‑of‑the‑Day winners are self‑hunted. PH states a hunter confers no ranking advantage (producthunt.com/launch/before-launch).
- **Maker first comment correlates with winning.** 70% of POTD/Week/Month winners had one; PH says ask for **feedback, not upvotes** (producthunt.com/launch/preparing-for-launch). *Caveat: this is a base rate, not proof of causation (see Disagreements).*
- **Asset specs (PH primary):** gallery **2 images min, 1270×760**; thumbnail **240×240, <3MB** (a separate field — the first gallery image is *not* the thumbnail); GIF thumbnails animate **on hover**, not autoplay; ~53% of POTD since 2021 include a video (correlational, YouTube‑only, allow ~12h processing); tagline **≤60 chars**; description **≤500 chars** (live Launch Guide — a third‑party "260 char" claim traces to a low‑quality audit repo and should be ignored); **up to 3 launch tags**; **up to 3 Shoutouts** (tools used to build it — a free promo surface).
- **Anti‑manipulation is real and enforced.** Automated detection + community reports + manual review remove non‑genuine votes; "avoid overtly coordinated campaigns." Paying for hunts/upvotes, giveaways that reward upvotes, and asking directly for upvotes are all policy violations that can lead to unfeatured/removed/ban (help.producthunt.com/11869098, 3615694, 484935; producthunt.com/launch).

---

## Findings by Sub‑Question

### 1. How the ranking algorithm works (and what actually moves it)
- **Confirmed inputs:** upvotes, comments, time‑since‑submission, + undisclosed (PH primary). No published weights.
- **Vote quality is real (on the record).** PH team member Mike Kerzhner, in a public forum thread: a vote from a brand‑new Gmail account with no contribution history counts for **0 points**; a vote from a legitimate, history‑rich account "carries significant weight." Per‑vote values are not published (producthunt.com/p/producthunt/vote-selling-on-product-hunt).
- **Featuring is the real gate.** Most launches are *not* featured; only featured products compete on the leaderboard. This is why "just get more upvotes" is the wrong mental model (help.producthunt.com/9883485).
- **First‑hours mechanic — UNDERMINED.** The widely repeated "PH hides counts and randomizes the top 5 for the first 4 hours" is a **citation cascade**: the only primary source is PH's *Let's talk about spam* (Mar 23, 2023), which describes a **2‑hour** randomized sort as a **test**, says nothing about hiding counts, and nothing about a top‑5 lock. PH's Mar 27, 2026 "Random Day" announced *all‑points‑hidden* as a **novel one‑day experiment** — which implies it is **not** routine. **Treat the 4‑hour claim as unverified; do not anchor the plan to it.**
- **The "first 4 hours / first 60–90 min momentum" targets (150–200 votes, 50–100 engagers)** all derive from that unverified mechanic plus vendor blogs. Keep the *spirit* (front‑load authentic engagement) but don't treat the numbers as authoritative.
- **Contested quantitatively:** #1 upvote thresholds range from ~300 to ~1,800 across vendor sources; "front‑load vs. steady pace" is argued both ways with zero PH corroboration. **All such numbers are vendor‑supplied and should be discounted.**

### 2. Optimal timing & scheduling
- **Auto‑midnight PT, day‑only scheduling is now enforced** (producthunt.com/changes; help.producthunt.com/2724119, Feb 2026). You pick a *day*, not a time.
- **Best day is genuinely contested and the question is misframed.** Sources measure *different things*:
  - **Traffic/front‑page reach:** Tues–Thu win (tinylaunch 170k launches; shutakamizawa 5,000 launches).
  - **Cheapness to win / median upvotes:** Sunday wins in two 2026 large‑N datasets (anysite.io 3,869 launches; maggiemchen.com 3,311 featured launches — Sunday median 195 vs Tuesday 108).
  - **PH's own position:** "there is no golden‑ticket answer… the best day is the day you're most prepared," and weekend launches get **15% more 'Visit' clicks** (producthunt.com/launch/preparing-for-launch).
  - **Implication for Niki:** "max visibility" (traffic) and "rank #1" (winnability) point to *different days*. If Niki has a large warm audience, a weekday is realistic; if not, a quieter day (Sun/Fri/Sat) is the smarter bet for the badge. **This is a decision the team must make against audience size, not a rule.**
- **Avoid collisions:** YC batch week, Apple/OpenAI ship days, US holidays/keynotes (maggiemchen.com; dev.to/kanta13jp1).
- **Category reality:** AI launches are ~49% of the field in H1 2026 (+29% upvotes) — crowded but rewarded; AI‑coding daily #1 in 2026 landed near ~590 upvotes (hunted.space).
- **Mar 26→27 2026 "Random Day"** was a one‑off points‑hidden experiment — note PH is actively experimenting with the mechanic, so verify live on launch day.

### 3. Pre‑launch preparation & audience (the part that actually wins)
- **Featured rate is the strategic premise and is stale.** The "~10% featured" figure is Sept‑2024 data; PH's own Mar‑2026 forum shows **730+ products in a single day**, so the true rate is plausibly far lower now. Plan as if featuring is *hard*.
- **Self‑hunt is fine and standard** (79%/60% PH data). A hunter *can* help as a catalyst (pressure‑tests copy, engages, promotes their network) but is **not required and must never be paid** (producthunt.com/launch/before-launch; fmerian awesome‑product‑hunt).
- **Coming Soon / Ship are dead.** Both discontinued (Ship ~2020‑21; Coming Soon/teaser Aug‑2025). The replacement is **PH followers + Product Forums + repeat launches** (producthunt.com/changes; producthunt.com/p/general). Build your own waitlist on your site; you own the data.
- **Account age matters.** New accounts wait **1 week** minimum; PH "highly recommends" joining **3+ months** ahead; be active (upvote/comment) so the anti‑bot system trusts you (producthunt.com/launch/before-launch; firsthand failures: reddit r/SaaS, meysam.io).
- **Warm, *established* PH accounts beat cold volume.** "100 engaged supporters > 400 cold contacts"; upvotes from new/inactive accounts are discounted or zeroed. Mobilize people who *already* have active PH accounts (awesome‑directories; reviewsell; Kerzhner forum).
- **Closest analogue — Kilo Code (#1 POTD, open‑source AI coding agent):** launched Sunday, ~5 days of *explicit* prep, **zero cold DMs**, activated owned channels (Discord 8k, X 6.5k, LinkedIn 1k) → 610–658 upvotes, #1 (dev.to/fmerian; hunted.space). **Important caveat:** Kilo's "5 days" worked *because* it had months of audience behind it. Niki's plan should state its owned‑audience baseline before assuming the "no‑plan, no‑DMs" approach transfers.
- **Dev‑tool copy rule:** kill buzzwords ("revolutionary AI‑powered platform"); lead with what it does, what it's built on, what it replaces; show the CLI/code (phlaunchkit; hackmamba). PH CEO's tagline guidance: avoid "world's first," *name the mechanism not the category*, and answer "who is this for / what problem?" (producthunt.com/p/general i‑m‑the‑product‑hunt‑ceo‑tell‑me‑your‑tagline).

### 4. Launch‑day assets & engagement (the highest‑evidence levers)
- **Maker first comment = the best‑evidenced lever.** 70% of winners had one; pre‑write it in the submission flow so it publishes at 00:01; keep it humble/helpful (anti‑marketing tone), tell the story, ask for **feedback not upvotes**; it's also PH's stated route into the Daily Digest (>500k readers) (producthunt.com/launch/preparing-for-launch, launch-day-duties). *Caveat: base‑rate, not proven causation.*
- **Respond to comments in real time.** PH lists comments as a ranking input and says being accessible is a top launch‑day duty. No official reply‑latency target exists (third‑party "<9/15/30 min" numbers are unverified). Staff the thread across time zones; answer every comment; demo the product *inside* replies where possible (producthunt.com/launch/sharing-your-launch, preparing-for-launch).
- **Gallery = the explainer for a dev product.** 2 images min (1270×760); show real workflow in a dev environment, one idea per frame, outcome‑first (hackmamba). Count is unspecified by PH; pick 5–8 quality frames.
- **Video/GIF:** ~53% of POTD include video (correlational). A short real‑product Loom‑style demo beats a cinematic brand reel for a technical tool. **Interactive Demo** embeds (Arcade/Storylane/Supademo etc., free for PH launches) are PH's blessed way to make a multi‑agent flow *clickable* — ideal for Niki's six‑agent pipeline (producthunt.com/launch/preparing-for-launch).
- **Thumbnail:** 240×240, <3MB; GIF animates on hover. PH notes **<1/3 of POTD use a GIF thumbnail** — so a GIF thumbnail is *not* required for success (producthunt.com/launch/preparing-for-launch).
- **Tagline:** ≤60 chars, no gimmicks; it's the main click driver (producthunt.com/launch/preparing-for-launch).
- **Launch tags:** up to 3. Likely fits: **AI Coding Agents, AI Agents, AI Code Editors, Code Review Tools, Vibe Coding Tools, AI Workflow Automation, Engineering & Development** — verify the exact current slugs against producthunt.com/topics before submitting (prior lists were unverified).
- **Shoutouts:** up to 3 tools used to build Niki — free cross‑promo that can trigger vendor retweets (dub.co used exactly this).

### 5. Post‑launch amplification & external traffic
- **PH's rule (primary):** share the link organically, engage in communities where you're *already* active; **do not** mass‑message, incentivize upvotes, or run coordinated voting (help.producthunt.com/2690626, 3615694, 484935).
- **Asking for upvotes — nuanced, not binary.** On‑platform/mass/incentivized asking is punished (paid hunters & giveaways → unfeatured/ban, confirmed). A public "we're live, would love your feedback" to your *own* audience is what winners (incl. #1 Dub.co) do, with no documented derank. **The safe, policy‑consistent framing: share the link and invite feedback/comments; never say "upvote."** (Note: a widely cited CTO "asking = punishment" quote is from **2015** and should carry near‑zero weight.)
- **X/Twitter:** a thoughtful personal thread (origin → problem → demo → differentiation → build‑in‑public retro → link) outperforms link‑dumping; visual tweets get 40–60% more clicks; quote‑tweet at T+3–4h. Direct PH links are *not* penalized (dub.co/blog/product-hunt debunks that myth).
- **LinkedIn:** underrated for B2B/dev tools; a ~1,000‑word first‑person essay with the link in a comment stays alive for days.
- **Hacker News (Show HN):** the highest‑value dev channel, but **staggered, not same‑day** (2–4 days after PH, with a *more technical* angle). HN forbids superlatives and "ask friends to upvote"; front‑page = 10k–50k visits but ~90% never reach it. **Niki‑specific risk:** HN's "ideally without signup barriers" rule and its known hostility to AI‑agent hype mean Niki needs a **tryable** surface (open‑source quick‑start / hosted playground) for Show HN to be viable (news.ycombinator.com/showhn; markepear.dev; smollaunch; youngju.dev).
- **Reddit:** r/programming effectively bans product promo ("this is not Product Hunt," rules verified May 30 2026); r/SideProject allows real‑product demos (no waitlist links). Median score across 402 founder posts was 2 — poor for customers, fine for peers (leadsrover; dev.to/michael-yousrie).
- **Newsletters:** TLDR / TLDR AI, Pragmatic Engineer, Bytes, Console.dev (30k+, one dev tool/week), Hacker Newsletter (curates from HN only). Pitch editors with a 5‑sentence summary + demo link; allow 2–6 weeks lead time.
- **Conversion is the part most launches get wrong.** Benchmarks disagree wildly (1–3% to 10–15% of PH visitors), and one set of 2026 founder data shows the *highest‑ranked launch had the lowest conversion* — the win is awareness, not customers. Build a **dedicated `niki-site.vercel.app/producthunt` page**, minimize signup friction, capture emails from non‑signups, send a personal founder email <48h, and embed the PH badge (happysupport; firsto; prems; fromscratch).
- **Durable assets:** the indexed PH page (ranks for your category for years), the badge, reviews on the PH page (reported up to 8× ongoing traffic), and the secondary news/roundup wave in D+1–7.

### 6. Tools, services & pitfalls
- **Prohibited (primary):** mass‑messaging, asking for upvotes, bots, incentivizing upvotes; human, non‑company profiles required; company accounts banned (help.producthunt.com/3615694; producthunt.com/launch).
- **Vote‑buying / pods:** PH detects and removes; escalation runs purge → unfeatured → removed → suspended. Real postmortems show mid‑launch vote drops (ACE Studio −400) and throttling from legit‑looking mass outreach (signals.sh; indiehackers; medium lachlan.chavasse). **Every "we'll get you #1" service is a scam or a policy violation.**
- **Outdated advice to delete from any plan:** Coming Soon (dead Aug 2025), Ship (dead ~2020‑21), "6‑month relaunch" (stricter: root‑domain 6‑month gap; new UI/pricing ≠ significant), "Kitty Points affect ranking" (they don't). The "<260 char description" and "2MB thumbnail" claims trace to one junk audit repo — use PH's 500 / 3MB.
- **Tools makers actually use (legitimate):** Dub (short links + attribution), Typefully (scheduling), CleanShot/Screen Studio (captures), Hunted.space (real‑time launch monitoring). PH now ships native equivalents: Launch Day dashboard, launch‑insights pages, leaderboard archive.
- **SendHunt / Hunterfolio / Nas.io:** no evidence these exist as PH services. TaskMagic is not a launch service. Don't plan around them.
- **Alternative surfaces (PH is still the largest):** HN Show HN, DevHunt, Peerlist Launchpad, Uneed, Fazier, MicroLaunch, BetaList, Indie Hackers (launchalmanac: "none has PH's audience").
- **Most‑cited failure modes:** bad timing, weak positioning, no distribution plan, no follow‑through; shipping a waitlist instead of live access; vague tagline; "like X but better"; going silent in comments; a signup flow that breaks under traffic; treating launch day as the finish line (welaunch.sh 15‑flop teardown).

---

## Analysis & Discussion

**The featuring gate is the whole game for Niki.** Upvote strategy is moot if Niki isn't featured. The risk vectors:
1. **"Services" disqualifier.** The current Featuring Guidelines list "Services" among non‑featured types. PH never defines it precisely, but the counter‑examples are digital *products*; an agency/done‑for‑you business is the intended target. Niki's existing plan (open‑source, self‑hosted, live product; cloud beta is *optional*, not the only offer) positions it correctly as a **product**, not a service. **Keep the self‑hosted v2 path publicly usable before submitting** — an email‑only launch is explicitly not feature‑eligible.
2. **"AI wrapper" / saturation.** The literal "we can't feature AI wrappers" line is a second‑hand CEO quote, *not* in the guidelines; the real language is "Value Over Monetization" + "Evolving Trends." Niki's defense is *differentiation*: a multi‑agent pipeline (planner→coder→tester→reviewer→security→synthesizer) with reproducible runs and open‑source code is materially more than a thin wrapper. Lead the tagline/description with the *mechanism*, not the category.
3. **Signup barrier vs. HN.** Niki needs signup to demo, which conflicts with HN's "no barriers" norm. Mitigate with a frictionless open‑source quick‑start and/or a hosted playground so Show HN has something tryable.

**Vendor bias is the dominant reliability problem.** Roughly every hard number about the algorithm (vote thresholds, hourly velocity caps, detection/penalty rates, "#1 needs N upvotes") comes from businesses that sell launch or upvote services (launchpact, uprowshub, signals.sh, getlaunchlist, submitator, foundra, gingiris, reviewsell). These are adversarially interested and frequently contradict each other. **Recommendation: ignore all such numbers; plan on authentic engagement + a real audience.**

**The goal contains an internal conflict.** "Max visibility" (traffic) and "rank #1" (winnability) pull toward different launch days and different audience strategies. The team should decide explicitly: if the priority is the *badge* (social proof, cheaper to win), pick a quieter day and optimize for a clean top‑5; if the priority is *raw reach*, pick a weekday and accept a harder fight that needs a larger warm list.

**Base rates ≠ causation.** The 70% first‑comment, 53% video, 79%/60% self‑hunt figures are all verified but are *base rates without controls*. Most launches are self‑hunted, so most featured launches would be self‑hunted regardless. Treat these as "do the table‑stakes thing," not "this is what wins."

---

## Recommendations (immediate actions)

**Positioning (do first — gates everything):**
- Submit as **Niki for Code** (avoids collision with the unrelated "Niki" shopping product, per existing plan).
- Keep the open‑source / self‑hosted v2 path **publicly usable** before submitting; cloud beta is optional, not the sole offer.
- Tagline (≤60): name the *mechanism* — e.g. lead with the multi‑agent pipeline + reproducible runs, not "AI agent studio."
- Description ≤500 chars; up to 3 launch tags (verify slugs on producthunt.com/topics); 3 Shoutouts.

**Pre‑launch (4–6 weeks, gated on audience size):**
- Stand up active maker accounts **now** (3+ months ideal; 1 week absolute minimum); be active on PH.
- Build your own waitlist on `niki-site.vercel.app`; own the data (Coming Soon/Ship are gone).
- Grow + warm the owned audience (Discord/X/LinkedIn/GitHub). The Kilo Code #1 was won on audience, not a 5‑day sprint — size Niki's honestly.
- Produce the asset pack: 5–8 gallery frames (outcome‑first, real dev environment), a short Loom‑style demo + an **Interactive Demo** of the agent pipeline, 240×240 thumbnail, pre‑written first comment, FAQ/response templates.
- Pre‑write a dedicated `…/producthunt` landing page with PH‑specific messaging and email capture.

**Launch day:**
- Auto‑publishes 00:01 PT on the chosen day; first comment goes live immediately.
- Staff a 24h comment rota across time zones; answer every comment; demo in replies.
- Activate X thread + LinkedIn essay at launch; use Dub short link; claim Shoutouts to trigger vendor retweets.
- Share the link and invite feedback — **never say "upvote."** No pods, no paid votes, no giveaways‑for‑upvotes.
- Verify the live homepage behavior that morning (the first‑hours mechanic is unconfirmed).

**Post‑launch:**
- Stagger Show HN 2–4 days later with a *technical* angle + a tryable surface.
- Pitch dev newsletters (Console.dev, TLDR) in the D+1–7 window using the ranking as the hook.
- Personal founder email to every PH signup <48h; embed PH badge; tag PH signups for a separate nurture sequence.
- Feed the secondary news/roundup wave with data and a first‑month retro.

---

## Disagreements & Open Questions

- **First‑hours mechanic:** The "4‑hour hidden‑count top‑5 lock" is unverified (only a 2023 2‑hour *test* + a 2026 one‑off experiment). **Status: carried as limitation** — verify live on launch day; don't anchor timing to it.
- **Best launch day:** Sunday (cheaper to win) vs Tue–Thu (more traffic) — different metrics. **Status: decision required from the team** against audience size; not resolvable by research.
- **"Asking for upvotes" enforcement:** On‑platform/mass/incentivized = punished (primary). Public share‑to‑own‑audience = done by winners, no documented derank. **Status: adopt the conservative, policy‑consistent framing** (share + invite feedback, never "upvote").
- **Featured rate:** "~10%" is Sept‑2024 data; 730+ products/day in Mar‑2026 suggests lower. **Status: carried as limitation** — plan as if featuring is hard.
- **"Services" disqualifier definition:** PH never defines it; Niki's self‑serve positioning is the mitigation. **Status: resolved by positioning**; confirm with a pre‑submission moderator review (submit ≥7 days early).
- **"No AI wrapper" as policy:** Not literal in guidelines; real language is "Value Over Monetization" / "Evolving Trends." **Status: corrected** — don't cite the CEO quote as policy.
- **Conversion benchmarks:** 1–3% vs 10–15% spread, unreconciled; "highest ranked = lowest conversion" undercuts the premise. **Status: carried as limitation** — optimize for awareness + email capture, not assumed conversion.
- **Description/thumbnail specs:** 500 chars / 3MB (PH primary) vs 260 / 2MB (junk repo). **Status: resolved** — use 500 / 3MB.
- **r/ProductHunt rules:** Not researched; check its sidebar before posting.
- **Niki's owned‑audience baseline:** Unknown to this research; determines whether the "no‑DM, low‑prep" Kilo approach is viable. **Status: open** — team must state current numbers.

---

## Full Source List

**Product Hunt primary (highest confidence):**
- producthunt.com/launch/how-product-hunt-works
- producthunt.com/launch/preparing-for-launch
- producthunt.com/launch/before-launch
- producthunt.com/launch/sharing-your-launch
- producthunt.com/launch/launch-day-duties
- producthunt.com/launch/launch-day-questions
- producthunt.com/launch (FAQ)
- producthunt.com/changes (changelog)
- help.producthunt.com/484938 (how homepage ranked)
- help.producthunt.com/9883485 (featuring guidelines)
- help.producthunt.com/3615694 (community guidelines)
- help.producthunt.com/11869098 (fair voting / anti‑spam)
- help.producthunt.com/4853541 (why upvotes went down)
- help.producthunt.com/2690626 (how to share)
- help.producthunt.com/484935 (ask friends/family to upvote?)
- help.producthunt.com/2724119 (schedule a post, Feb 2026)
- producthunt.com/p/producthunt/vote-selling-on-product-hunt (Kerzhner on vote weights)
- producthunt.com/p/general/product-hunt-discontinued-coming-soon-teaser-pages
- producthunt.com/p/general/i‑m‑the‑product‑hunt‑ceo‑tell‑me‑your‑tagline
- producthunt.com/p/dub/tools‑i‑use‑when‑launching‑on‑product‑hunt
- producthunt.com/stories/let‑s‑talk‑about‑spam (Mar 2023, 2‑hour test)
- producthunt.com/newsletters/archive/46593‑all‑the‑ai‑that‑launched‑in‑2025

**First‑hand maker retrospectives / high‑value:**
- tomdekan.com/articles/product‑hunt‑launch‑guide (Stackfix #1 POTD/POTW)
- docs.opensaas.sh/blog/2025‑05‑07‑you‑should‑still‑launch‑your‑product‑on‑ph
- dev.to/fmerian/how‑kilo‑code‑launched‑on‑product‑hunt‑24a2 (Kilo Code #1, closest analogue)
- hunted.space/dashboard/kilocode/launches/kilo‑code‑for‑jetbrains
- dub.co/blog/product‑hunt (#1 launch retro)
- dev.to/fmerian/24‑hours‑on‑product‑hunt‑4mlc
- www.corbado.com/blog/launch‑developer‑tool‑product‑hunt
- raw.githubusercontent.com/fmerian/awesome‑product‑hunt/main/product‑hunt‑launch‑guide.md
- www.guidde.com/blog/how‑we‑got‑to‑be‑1‑product‑of‑the‑day‑on‑product‑hunt
- www.indiehackers.com/post/postmortem‑of‑our‑product‑hunt‑launch‑5f2d4a86e5
- www.indiehackers.com/post/i‑launched‑on‑product‑hunt‑today‑with‑0‑followers‑0‑network‑and‑0‑users‑heres‑what‑i‑learned‑in‑12‑hours‑1c89889702
- www.reddit.com/r/SaaS/comments/1qox4le/what‑i‑learned‑from‑failing‑my‑product‑hunt‑launch
- meysam.io/blog/first‑producthunt‑launch‑flopped
- medium.com/@lachlan.chavasse/product‑hunt‑launch‑guide‑what‑not‑to‑do
- www.producthunt.com/p/general/notes‑from‑a‑failed‑product‑hunt‑launch‑2

**Large‑N / data analyses (treat as correlations, mixed confidence):**
- anysite.io/blog/who‑actually‑launched‑on‑product‑hunt‑in‑2026 (3,869 launches)
- maggiemchen.com/curious/product‑hunt.html (3,311 featured)
- tinylaunch.beehiiv.com/p/tinylog‑learnings‑from‑170k‑product‑hunt‑launches (170k)
- medium.com/@shutakamizawa/how‑analyzing‑5‑000‑product‑hunt‑launches (5,000)
- uprowshub.com/blog/product‑hunt‑50‑launches‑study (50)
- hunted.space/history, hunted.space/top‑products/2025/November/artificial‑intelligence

**External amplification (primary‑ish):**
- news.ycombinator.com/showhn, www.markepear.dev/blog/dev‑tool‑hacker‑news‑launch, hub.causo.ai/guides/show‑hn‑launch‑playbook
- www.youngju.dev/blog/culture/2026‑05‑14‑side‑project‑launch‑strategy (X/LinkedIn/HN/Reddit deep dive)
- leadsrover.io/subreddits/r/programming (r/programming promo ban), www.mediafa.st/subreddit/sideproject
- dev.to/michael‑yousrie/i‑measured‑402‑posts‑across‑4‑founder‑subreddits
- console.dev, github.com/XZXY‑AI/ccg-router (dev.to/Hashnode/TLDR sequence)

**Vendor / affiliate sources — QUANTITATIVE CLAIMS DISCOUNTED (conflict‑of‑interest):**
- launchpact.io, uprowshub.com, signals.sh, getlaunchlist.com, submitator.com, foundra.ai, gingiris.tools, reviewsell.com, blazonagency.com, remery.ai, screenhance.com, welaunch.sh, gleam.io, leadsrover.io, beforevc.com, crisp.share, firsto.co, prems.ai, dowhatmatter.com, phlaunchkit.com, smollaunch.com, hub.causo.ai, favours.dev, launchalmanac.com, pinggy.io

**Junk / superseded sources (do not use):**
- github.com/resolvicomai/kassinao (false 260‑char / 2MB claims)
- Any guide still recommending "Coming Soon" / "Ship" pages or a "12:01am time picker" (stale)

---

## Appendix A — Contested numbers (vendor‑supplied, discount heavily)

| Claim | Low end | High end | Source type |
|---|---|---|---|
| Upvotes for #1 POTD | ~300 | ~1,800 | all vendor |
| First‑4h target | 150 | 200 | vendor + unverified mechanic |
| "Safe" velocity | 25–50/hr | ≤100/hr | vendor; one scrubbed from cache |
| Pod detection rate | — | "85%" | vendor selling pacts |
| Penalty ratio | — | "2:1" | vendor |
| Conversion of PH visitors | 1–3% | 10–15% | vendor, unreconciled |
| Featured rate | ~10% (2024) | lower (2026, inferred) | one 2024 scrape |

## Appendix B — Verification audit notes (from adversarial pass)

- The "first 4 hours" randomization/count‑hide claim degrades to a 2023 *2‑hour test* under primary‑source check; the 2026 "Random Day" confirms count‑hiding is *not* routine.
- Description limit corrected to 500 chars and thumbnail to 3MB (third‑party repo was junk).
- "No AI wrapper" is not literal PH policy; the CEO quote is second‑hand.
- The "Services" disqualifier is real but targets agencies, not self‑serve products; Niki's open‑source positioning mitigates it.
- A 2015 CTO quote on upvote‑asking was being cited as current enforcement — downweight to ~zero.
- Almost all numeric algorithm claims originate from launch/upvote‑service vendors and should be ignored for planning.
