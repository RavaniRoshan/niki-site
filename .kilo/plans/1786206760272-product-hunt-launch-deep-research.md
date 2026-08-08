# Deep Research + Gap Analysis: Niki for Code — Product Hunt Launch, OSS GTM Readiness

**Date:** 2026-08-08 · **Depth:** deep · **Method:** 7 parallel research subagents (overlooked pre-launch, launch-day mechanics, Cloudflare/big-co OSS playbooks, OSS GTM readiness, PH-for-OSS, failure postmortems, post-launch lifecycle) + 1 codebase-readiness inventory subagent → 1 adversarial verification subagent → resolutions folded in. This file is both the research report and the implementation-ready plan; writes were restricted to the plan directory (move to `research/` if desired).

**Companion docs (already in repo):** `research/product-hunt-launch-planning.md` (wide-depth, 2026-08-05 — the ranking/mechanics backbone; this report adds the *deep* layer: overlooked items, corporate OSS playbooks, and project gaps) and `plans/2026-08-03-niki-for-code-product-hunt-launch.md` (operational plan). **This report does not repeat what those already cover; it extends them and lists only what is NOT yet done.**

---

# EXECUTION PLAN — Self-contained scope (agent can do this alone, zero user input)

**Contract.** Only files inside this repo are touched. No external accounts, no secrets, no network publishes, no user actions required. Everything external stays in the "Out of scope" list at the end. Defaults are locked below — do not ask; if a default proves wrong, note it in the plan status, don't stop.

**Locked defaults**
- Canonical URL: `https://niki-site.vercel.app/` (one source: `SITE_URL` in `src/seo.jsx` + static files). A custom domain later = 1-line change + sitemap/robots/llms.
- Self-hosted availability = "clone + `cargo build` today"; prebuilt binaries, installers, brew/winget/scoop/cargo packages = **"coming soon"** everywhere.
- Product Hunt: no live PH URL exists; the old `products/niki-2` link and API badge are **dead and must be removed**. Site CTAs point to waitlist + GitHub until the real listing exists.
- Waitlist = managed-cloud beta + launch-day updates only; self-hosted is *not* gated.

**Ordered tasks (each ends with its verification; run 1→10 in order):**

1. **Domain swap — replace every `niki.ai` with `https://niki-site.vercel.app`** (no trailing slash in `seo.jsx`): `src/seo.jsx:3` (+ derived `OG_IMAGE`), `index.html:13,25,26,35` and JSON-LD `@id`/`url`/`logo` (`index.html:44,46,47,51,52,55,59,63,71,76`), `public/sitemap.xml:4,10,16` (then add `/producthunt`, `/privacy` with fresh `lastmod`), `public/robots.txt:4`, `public/llms.txt` (canonical rows).
   *Verify:* `grep -rn "niki.ai" src index.html public` → 0 hits.
2. **Remove dead Product Hunt references:** `src/components/ProductHunt.jsx:3-4` (delete `PH_URL`/`PH_BADGE_URL`), `:17-28` — replace badge + "Follow on PH" with: copy "Product Hunt launch — soon. Try Niki now for free, self-hosted" + primary CTA `Link to="/waitlist?segment=Product Hunt launch"` (URL-encoded) + secondary `#start` "Install now"; keep `data-od-id="producthunt"`. `Footer.jsx:12` — remove PH anchor, add `Privacy`. 
   *Verify:* `grep -rn "producthunt\.com" src` → 0 hits (comment not required).
3. **Install/Downloads truthfulness:** `src/components/Install.jsx:8-19` — drop the two `INSTALLERS` rows pointing at `raw.githubusercontent.com/.../install.sh|install.ps1` (do not exist) → replace with a "coming soon" note (no fake code); keep steps 2-4 and add **step 1 = clone + `cargo build --release`** (`FAQ` already says this is the working path). `DownloadsPage.jsx` — title (`:77` Seo, `:88` H1) "Union Downloads" → "Niki — Downloads"; add `available:false` per `BINARIES`/`INSTALLERS`/`PACKAGES` (all currently false: v0.2.0 has no assets publicly) → render all rows disabled with "Coming soon" badge, no download anchor; only "GitHub Releases" and the result of step 1 (clone & build) behave as active links with `data-od-id` anchors retained.
   *Verify:* build + preview; no `raw.githubusercontent` left in `src`; every Download button disabled.
4. **Waitlist alignment + consent:** `Waitlist.jsx` — heading `:114` → "Self-hosted is ready. The waitlist is for the cloud beta."; body `:115-119` → "Self-hosted Niki is available now — clone, build, and run. The waitlist opens access to the managed cloud beta and launch-day updates; no spam."; remove "invite-based/slots open" phrasing; add required consent checkbox (`name="consent"`, own validation + error, sent as Formspree field) with fineprint linking `/privacy`.
   *Verify:* submit in preview with consent and without — errors/success behave; entered data visible in form state.
5. **Privacy page:** new `src/components/PrivacyPage.jsx` (lazy route in `main.jsx`), plain-language: what data (Formspree submissions incl. team size/stack/segment/consent), Vercel Analytics (page views, no PII), localStorage theme; who sees it (no selling); how to ask to delete (GitHub issue). Link from `Footer` (step 2) + waitlist fineprint.
6. **`/producthunt` landing page:** new `src/components/ProductHuntPage.jsx` (lazy route `main.jsx`): 5-second value prop, one `DemoClip`, CTAs "Install now" (`#start`/`/downloads`) and "Join cloud beta" (Waitlist with `?segment=Product Hunt launch`), heading hook "Backed by open source". Visible only via link/UTM — no nav entry (SEO: noindexed via `Seo` robots? optional; sitemap: add).
   *Verify:* route renders; `?segment=Product Hunt launch` preselected; that capture's `?utm...` retained (step 8).
6. **Raster OG image:** add `tools/render_og_image.py` (Pillow — already a dep of `tools/render_agent_demo.py`; fonts from `tools/fonts`) → `public/og-image.png` (1200×630; Niki wordmark + "AI coding agents that ship reviewable pull requests", bg `#f7f2ea`, dark text) fixed output; flip `src/seo.jsx:5` + `index.html:26,35` to `og-image.png`.
   *Verify:* file exists; `python3 tools/render_og_image.py` regenerates; social card view in preview.
7. **Funnel events + UTM capture:** `src/analytics.jsx` — export a `track(name, opts)` re-exposing `@vercel/analytics` and wire: hero CTA (`Hero.jsx:68` + GitHub anchor), Install `copy-btn` click (`Install.jsx:66`), `DownloadsPage` `download-*` anchors (disabled → "coming soon click"), DemoClip play (`DemoClip`), waitlist events already there. `src/lib/utm.js` — on load read `utm_source/medium/campaign` + `ref=producthunt` from URL → localStorage; `Waitlist.jsx` embed hidden fields `utm_source/medium/campaign` so every Formspree submission is attributed; `track('ph_referral')` when source==producthunt.
   *Verify:* in dev with `?utm_source=producthunt&segment=Product Hunt launch`, submit → Formspree payload includes the hidden fields; `ph_referral` event logged.
8. **Routing/404/CI:** `main.jsx` — catch-all `<Route path="*">` → new tiny `NotFound` component (404 semantic, link home, `Seo` with robots noindex). Add `vercel.json` (SPA rewrite `{source:"/(.*)",destination:"/index.html"}` + minimal security headers). `package.json` — add `typecheck` (`tsc --noEmit`), `lint` (`eslint` + minimal flat config in devDeps, react/react-hooks) ; add `.github/workflows/ci.yml` (npm ci → typecheck → lint → build) as files-only (runs on next push; no action needed now).
   *Verify:* `npm run build` + `npm run typecheck` pass; curl the preview for `/privacy`, `/producthunt`, `/does-not-exist` (returns index → Vercel serves SPA; real 404 handled by client).

**Out of scope (needs user/owner; do NOT attempt):** creating the PH account/listing/forum thread; domain purchase or GSC verification for the Vercel host; publishing real installers/binaries or release assets (main repo); email sending platform + SPF/DKIM (getlaunchlist items from research); Telegram/Discord community; PH asset-gallery upload; anything futurity-dependent on launch date (day of week vs audience sizing). These are flagged in the plan status file, not executed.

**Estimated verification loop (self-run):** `npm run build` && `npm run typecheck` && `npm run lint` && preview + the greps above, every time 3-4 steps complete.

**Key risks:** step 3 removes URLs a user may have bookmarked (they 404 anyway — fix is net positive); step 7 touches shared `analytics.jsx` (narrow diff, keep the existing export shape); consent checkbox changes Formspree schema (additive field only). None block the run; note anything surprising in the plan status.

---

## 1. Executive Summary

A Product Hunt launch is a two-stage machine: **(1) human editorial featuring** (most submissions never get it; "Services", waitlist-only, and generic "AI wrapper"-looking products are the classic rejects) and **(2) winning the daily points race** — where points = upvotes + meaningful engagement, the maker first comment, and real-time comment presence. Nothing found in the deep layer changes that; what the deep layer adds is *plumbing*: the launch's actual win/loss is decided by ~30 mundane items most founders overlook — email deliverability, account aging, the "GET IT" click, mobile, the live-edit reset, a verified install path, a privacy page, and a nurture sequence — more than by vote strategy. Cloudflare's playbook (announce intent in a named "Week" post, ship code + license + tutorial + CONTRIBUTING + HN by an engineer on release day, keep DevRel channels running, monthly drumbeat between releases) shows the launch is one touchpoint of a platform campaign, not an event. For Niki specifically, the **dominant uncovered gaps are truthfulness and plumbing, not PH mechanics**: the site still canonically points at the parked `niki.ai` domain, links to a dead old Product Hunt listing, advertises installers/binaries that do not exist publicly, has no privacy page, no raster social image, no `/producthunt` landing, instrumentation limited to the waitlist form, and no email/post-launch machine at all. These are the items you "haven't done yet," listed with priorities below.

---

## 2. Background / Key Terms (state of the platform, Aug 2026 — verified this round)

- **Scheduling:** day-only, auto-publishes 00:01 Pacific; schedule up to 1 month ahead; a "delete" self-destruct button exists for accidental launches (producthunt.com/changes; /launch/preparing-for-launch).
- **"Coming Soon"/teaser pages are DEAD** (retired Aug 28, 2025) — replaced by **one Product Forum thread per product**, where pre-launch followers accumulate; on launch day, maker's followers are emailed **only if the post reaches the homepage**; hunter's followers get *no* notification (platform change years ago). Self-hunt is normal; hunting cannot be paid. (help.producthunt.com 479557; producthunt.com/changes; verified by verifier)
- **Points formula (official, per changelog Dec 11, 2024):** "primarily upvotes, with comments as an additional factor" — comments literally move the score.
- **First-hours mechanic corrected:** the "PH hides counts for the first 4 hours" claim traces only to PH's 2023 spam post (a *test* of randomized ordering, first 2h, later 4h) and a one-off Mar 2026 "Random Day" experiment. **Do not plan on count-hiding; do plan on the early window mattering** (first ~2h momentum, comments velocity) and watch live via hunted.space. [V-1]
- **Featured ≈ the entire gate:** official criteria Useful / Novel / High Craft / Creative; non-featured launches get little traffic (third-party estimates ~70% less — vendor figure, low confidence). ~730+ products/day in Mar 2026 → treat featuring as hard.
- **Shoutouts: 3 per launch** (current guide; a 2023 "sky is the limit" changelog line was re-scoped — use 3). [V]
- **Relaunch rule (official, article updated Jul 7, 2026):** same product/company ≥6 months AND a "significant" update; new UI/pricing ≠ significant; approval doesn't guarantee featuring.
- **Vendor-bias caveat (reconfirmed):** every precise "algorithm" number (vote thresholds, velocity caps, detection rates, "40-50×", "2.7×") comes from businesses that sell launches. Treat entire classes as marketing. [V]

## 3. Findings by Sub-Question

### SQ1 — What is routinely OVERLOOKED pre-launch (the plumbing layer)
**Highest-evidence items (2+ independent corroborations):**
- **Email delivery is four separate jobs** — waitlist confirmation/nurture, announcements, lifecycle onboarding, transactional — and must not share sending reputation; cold-domain one-shot blasts get mostly spam-boxed. Warm the domain (SPF/DKIM/DMARC), send soft-launch to a small list 1-2 days early (also catches broken links), drop bots/disposals, prepare confirmation-emails as *machinery*, never as an afterthought (getlaunchlist.com/blog/email-tools-product-launch; waitlister.me test if you have list).
- **Account posture:** supporters' fresh accounts get votes zeroed; warm **pre-existing PH accounts (30d+ is the operational norm; PH min 1 week, recommends 3+ months for maker)** — formerly "30 days" is invented precision: the "established" part matters. Maker profile photo/bio + genuine hunting weeks before. [V]
- **"GET IT"/visit-before-vote:** fans must click the product button before upvoting; ask for "check it out + leave a comment," not votes (reddit r/Entrepreneur twvudv; PH guidelines).
- **Analytics before, not after:** UTM + a PH-scoped page + pre-configured dashboards; the launch cannot be judged without source-level conversion data (launchpact; waitlister; plausible post).
- **Short links as a backdoor control**: every pre-sent outreach via a link you own lets you swap destination mid-day (dub.co/blog).
- **Live-edit reset:** editing a live listing reportedly kills the trending/score — verify everything, never "fix" a typo live (flowjam; waitlister — vendor, but repeatedly cited).
- **Mobile:** ~60% of PH traffic is mobile; both the listing assets and the site must be phone-proof; real mid-launch "your site is broken on mobile" comment happened to Mine (reddit; waitlister).
- **Social card:** the listing's featured image becomes every share card; use a self-explaining product image (plausible).
- **Comment-response staffing:** 2-3 people on shifts, pre-written answers to anticipated questions; "ignoring comments" is the called #1 failure (lennysnewsletter; stripo; launchpact).
- **Contingency:** votes get stripped post-day (320→210 anecdote); the launch-page promo momentum is ~2 weeks then you need the rest of the machine (plausible "spike/nope" teardown).
**Weak/contested:** "30% of PH traffic is EU / GDPR checkbox" — single flippant vendor source; keep the checkbox anyway, drop the stat. Video "2.7× upvotes" — **dropped** [V]; official data: ~53% of POTD since 2021 include a video (optional); Dub sees low watch-through.
**Red-flag (contradiction, resolved):** "the Coming Soon teaser is the most underrated asset" — **dead feature**; change came Aug 2025. Failure material re-credited to product forum threads. [V]

### SQ2 — Launch-day & post-launch PH mechanics people get wrong

- **Maker first comment:** 70% of POTD/W/M had one; pre-write it at submission (it posts at go-live); "humble and helpful," ask for *feedback/commments*, not votes (PH guide; verified [V]).
- **Two official day-one duties:** get the word out + real-time comment presence; maker "Comment Inbox" now in the dashboard; launch-day dashboard tracks position/upvotes/comments/reviews + since **Dec 11, 2024** social-link tracking [V — the claim "Dec 2023" was a date error].
- **Responsiveness schools:** winner "batch every ~2h" (Lenny/Leo, 60+ #1 launches) vs "≤15-30-60 min" (smoll) — different tactics, no contradiction; the official line is "as close to real time as possible" [V].
- **Comments are the score:** rails "a combination of upvotes and meaningful engagement"; moderation (since 2026) bans AI comments and "congrats"-spam, hides junk threads — real thread engagement is the mechanic (help 11751186; 10030102).
- **Update posts:** every Product-Forum post notifies all followers; monthly changelog-style "what we shipped" is the documented cadence (help 11432379).
- **Email mechanics:** you **cannot export upvoter emails**; your own list is your only direct channel; upvoters auto-follow the product page → future updates/relaunch reach them for free (help 479557).
- **"Ask for upvotes" is sabotage:** "asking or incentivizing may trigger the algorithm to drop or remove" (help 484935); publish instead, share + invite feedback (dub.co: winners ask their own lists in public via feedback framing).
- **Badges:** Featured / Top-of-Day / Top-of-Week / product-page embed / Reviews; also emailed after launch; keep badge "live" on the site as social proof full-week; the two-week window officially closes the promo (help 2731070; PH post-launch page).
- **Repo as URL:** PH explicitly allows the primary link to be a GitHub repo (verified); no literal "View on GitHub" button exists in docs — do not plan around it [V].

### SQ3 — How Cloudflare / big companies launch open-source (the playbook, evidenced)

- **Named themed "Weeks" (Birthday/Platform/Developer Week) — one announcement per day; open-sourcing is a *campaign*, not an event** (blog.cloudflare.com/workers-open-source-announcement — Platform Week kick-off, May 2022; workerd was then shipped in **Birthday Week, Sep 2022** — announcement ≠ release) [V].
- **The release package:**
  - Architecture: hook/what-it's-for → deep technical explainer → honest "what it is *not*" section → "try it now" GitHub CTA → **license in the first paragraph** (Apache-2.0) → caveats (pre-1.0 API unstable) → "How to contribute" pointing at CONTRIBUTING/issues (workerd, pingora).
  - Predecessor post: "How we built Pingora" deep-dive published **2 years** before open-sourcing, ending with a "plan" teaser — the evergreen deep-dive IS the runway (blog.cloudflare.com/how-we-built-pingora...).
  - **HN by the engineer:** workerd posted by lead Kenton Varda; 689 pts; answered technical questions all day; credited 55+ co-authors — author-as-community-member (news.ycombinator.com/item?id=32994723) [V].
  - **Ecosystem echo same-day:** Pingora + ISRG/Prossimo "River" announced simultaneously [V].
  - **Community infra kept warm:** Ambassadors + Community Engineers, ~$2M OSS funding total, Discord, funding adjacent OSS (TanStack, Astro) — the channels exist *before* the launch and keep running *after* (community-program-refresh, dated 2026-08-07) [V].
- **Supabase's minute-by-minute day:** 7:30 reminder → 7:55 PH → 8:00 blog → 8:05 tweet → 8:10 "technical angels" → 8:15 Space… **and stop shipping to prod on launch day** (live-debugging burned them once), content written a week early, press ~3 weeks out, post-launch triage → retro read at next planning (supabase.com/blog/supabase-how-we-launch).
- **Drip between launches:** GitHub never quits the changelog; PostHog automates `#changelog` from PRs; Supabase re-announces features in monthly Beta Update *before* the week — "you can launch a new feature many times over" (published May 2026).
- **Counter-model:** PostHog: "pull, don't push" — no PR, no conferences, no Reddit/Discord activity; sponsors dev influencers (posthog.com/handbook). Proves multi-strategy space; Cloudflare/Supabase is the fitting one for an open-source dev tool.
- **Open-core framing:** GitLab CEO's ownership ("community keeps the company honest"); managed-cloud-of-OSS (Zulip/Supabase/Tailscale) is the model where the "free" product is fully open; BSL-1.1 is **not** an "open source" license by its own text — if Niki keeps BUSL-1.1, the code must NOT claim "open source" on PH; the listing must say "source-available / open-core" accurately [V — mariadb.com/bsl11].

### SQ4 — Open-source product GTM readiness (the checklist that converts curiosity into users)

- **GitHub's 4 required docs at launch:** LICENSE, README, CONTRIBUTING, CODE_OF_CONDUCT (+ clean name, no secrets in history, a marketing plan, someone owns community, ≥2 admins) (opensource.guide/starting-a-project).
- **README must answer what/why/how-to-start/where-to-help; say "not production-ready" when true; GIFs/visuals; examples with expected output** (makeareadme.com).
- **OpenSSF/CII tiers are the closest thing to a formal readiness scorecard:** passing = license, docs, HTTPS, searchable discussions, vuln process ≤14 days, install/uninstall convention, release notes; silver = quickstart, 1-year roadmap incl. "what we will NOT do", CI, 80% coverage, CoC, bus factor ≥2; gold = reproducible builds, review-within-5-years (bestpractices.coreinfrastructure.org).
- **Respond fast:** Mozilla study — contributors who got review within 48h return at much higher rates; write the promise ("expect a response within 7 days") (opensource.guide).
- **Telemetry:** announce before enabling, minimal + no PII, opt-out must work (`NO_ANALYTICS=1` convention), background + silent failure; Mockoon removed it entirely; ~90% of PostHog users opt out of sharing (homebrew docs, circleci, mockoon, posthog).
- **Changelog:** keepachangelog conventions (unreleased, grouped, conventions (unreleased, grouped, latest-first); raw git log is not one.
- **Feature requests become fuel:** public roadmap + Discussions + good-first-issue labels + issue templates (blank issues off, contact links) — GitHub mechanics that compound pre-launch trust.
- **No authoritative "install-to-first-success in X minutes" benchmark exists** — use OpenSSF silver's "quickstart" as the bar, and your own demo fixture as the proof. [V]

### SQ5 — Product Hunt for open-source / dev-tool products (what's actually different)

- **Two honest polarities (both true):**
  - *"Open source is basically a cheat code for first place"* — the COSS/Indie Hackers crowd rallies; Inbox Zero (OSS, funded) hit at #1 POTD with 1,000+ votes and stars 200→1,200 in the launch window — all with **not-high** budget (getinboxzero.com).
  - *"OSS halo doesn't carry a weak launch"* — Daytona (paid, fully OSS) missed #1, blamed assuming the community would come; OpenStatus landed #2 with zero prep but "brutal reality: spam invites, no sales"; and the "89% wouldn't launch again" honesty baseline (daytona.io, openstatus.dev, fromscratch.dev).
- **The truth diff:** the OSS trick only works when the community already exists (Kilo's 8,146-member Discord, Dub's 15k stars, Cal.com waitlist). A 0-star repo has **no cheat code** — it needs the plugin audience *or* the channel work. Niki's repo reasonably has few stars/can't be lectured on this; what to do: use a "waitlist + owned channels + open-source positioning" strategy combined.
- **Tagline/demo norms (dev-tools):** ≤60 chars, features-not-benefits, screenshots not stock, a real demo (Loom/Calorum-style personal demo; interactive embeds are blessed), first maker comment linking the repo; "View on GitHub" is not a thing; primary URL may be the repo; "Open Source" is an official topic tag only.
- **Metrics:** for OSS the KPI is stars+Downloads+Discord>signups; conversion numbers are still contested (see SQ7/SQ5).
- **Self-hunt is the 2026 norm** — hunter "3.2×" is old lore; PH guide even explains "why you shouldn't pay a hunter" [V].

### SQ6 — Failure post-mortems & sentiment (what people regret)

- **Top cited regret: talk to ten more users pre-launch** to find the sentence that lights eyes up — the launch becomes that sentence (r/indiehackers thread, 18yo solo, 353 comments).
- **Second regret: start the community earlier / build early advocates**; "community earlier" before day-1.
- **Third: first-run onboarding assumed the user already gets it** — the demo/setup must hold a fresh machine's hand (both OSS and this project's risk).
- **Fourth:** the backend can melt, egress bills surprise; have a roomy queue/waitlist.
- **Fifth: day-one silence is normal; the winners show up the week after tell, respond, iterate publicly** — "silence after launch is normal; winners keep showing up." (Same thread.)
- Older r/SaaS archives repeat: no audience, weak positioning, waitlist-only, wrong picture of working feature — same list as prior research. [Consistent]

### 7 — Post-launch lifecycle (D+1–D+90) — the part of the plan that decides whether the launch was worth its prep

- **The cliff is universal:** ~70–80% of traffic gone by D+3, ~95% by D+7, baseline by D+30; a "strong" launch spit is 5k–15k visit-day-1 — after launch the battle is conversion of the captured (backlinklog; launchpact).
- **Capture + follow-up is the machine that counts:**
  - Dedicated PH landing page with badge, 5s value prop, demo above fold, email capture while warm; then **<48h personal founder email to every captured address**; day-2 message: "what made you click?" (usedistro; launchpact).
  - Nurture: separate a sequence for PH-cohort (welcome → aha → social proof → feature highlight → 1:1 check-in → trial-reminder/discount → end), trigger-based, mixing an archingly "What were you hoping X would help with?" into the flow (uprowshub/encharge).
- **Ship something visible within a week:** feature-request triage + a "here's what your feedback changed" thread; weekly concise build updates D+30–90 (PH official; launchpact).
- **Reviews:** "leave a review" embed + email template to users; reviews never stop helping the product page's SEO (PH official).
- **Second wave:** key tech newsletters (TLDR/Console.dev/Pragmatic Engineer) pitch 2–6 weeks out and around D+1–7 with the rank as the hook; the "launch story" post re-spun; SEO recap content compounds (the only quantified one: 'post-launch SEO can bring 5–10× launch-day traffic' – analook; single-source claim).
- **Relaunch:** official 6-month "significant change" rule; community view: spend launch-week energy on follow-up, not re-launch bounce-back; success stories (AFFiNE 3 waves) exist but are outliers (label [V]).
- **Retention reality:** PH traffic churns ~within a month; do not build PPC offline on PH cohorts without retention data; measure by cohort.
- **Attribution:** Seek out. The thing to own — referent, activated, these first months — not votes.

**Vendor break (resolved by verifier [V]):** treat 1.4% (Plausible measured) vs 5–15% (vendors) as time; label sources; don't average.

---

## 4. What this project has NOT done yet (the gap list — verified in code)

Source: local read-only inventory subagent (file:line below) + the research. Only items **not** yet done are listed; "done" items are out of scope (see §8).

### P0 — launch blockers (do first; nothing on PH happens safely until these close)

1. **Still canonicals to `niki.ai` everywhere** — `index.html:13` canonical/og:url, `src/seo.jsx:3` `SITE_URL`, `public/sitemap.xml` (3 URLs), `public/robots.txt:4`, `public/llms.txt:7-8`, JSON-LD `@@id` graph (`index.html:38+`), ~30 references total. Plan said "do not launch while any public link points to parked niki.ai" — **0 of ~30 replaced.** Decide custom domain vs `niki-site.vercel.app` first, then replace all.
2. **Old dead PH link still live** — `src/components/ProductHunt.jsx:3-4,17-27` (products `niki-2` + `post_id=1214430` badge), `Footer.jsx:12`. Removing per plan is not done.
3. **Install/Downloads claims not true in public** — `Install.jsx:12,17` + `DownloadsPage.jsx:24-30` point at `raw.githubusercontent.com/RavaniRoshan/niki/.../install.sh` and v0.2.0 release assets; validation (2026-09-07 plan) found: **v0.2.0 has 0 binary assets, install.sh/install.ps1 don't exist, crates.io unclaimed, homebrew-tap 404, winget/scoop unpublished**; site shows them as ready, FAQ says binaries "on the way" (wfq.jsx:39-40) — internal contradiction; "Union Downloads" codename leaked in the H1/T1 (`DownloadsPage.jsx:77,88`). **Either publish the real artifacts or mark them hidden "coming soon" everywhere** — a public launch with 404 installs is the #1 class of "looked unready" failures in postmortems.
4. **No privacy page / no terms / no GDPR checkbox** on waitlist (Formspree + Vercel Analytics are collecting; the analyst has no disclosure at all) — `Waitlist.jsx` has no consent; no `/privacy` route (`main.jsx:42-46`).
5. **No raster OG/social image** — only `public/og-image.svg` (1200×630 SVG); verifier/other researched: the image becomes every share card; needs a real raster PNG with launch message.
6. **No `/producthunt` conversion page** — needed for UTM attribution, dedicated copy, email capture during launch; not routing.
7. **Funnel instrumentation is waitlist-only** — events: waitlist_viewed/submitted/failed/success/error (`Waitlist.jsx:75-105`). Missing: hero CTA, install-section selection, command copy, GitHub click, demo play/complete, download click. No UTM read/passthrough anywhere (only `?segment=`), no PH-referral view. Every element already has `data-od-id` hooks (Hero:68, Install:60-66) — wiring is the missing piece.
8. **Mixed waitlist story** — `Waitlist.jsx:114-119` "Private beta… invite-based" vs `Pricing.jsx 40-45` "self-host available today" vs PH section "be among the first to try" (gating). Must say: self-hosted = available immediately; waitlist = cloud beta + launch follow.
9. **No 404 route; no vercel.json** — SPA deep links hard-refresh depend on Vercel defaults; add catch-all + a 404.
10. **CI / quality gates: none** — `package.json` has dev/build/preview only (no lint/typecheck/test), no `.github/`, no Lighthouse harness. Whose launch reads "production-ready"? Google's first-run response checks fail our own roadmap promises.
11. **Truthfulness of "real run" demo** — `HowItWorks`/`DemoClip` are stylized per-agent animated clips, not the plan's "task prompt → live CLI run → generated branch → tests → reviewer → report.md/diff screenshots" reproducible run. PH/comment-driving and HN rules require something tryable/verifiable. Either make fixture + notes of the real run (expected F1 tools/render_agent_demo.py) or label clearly.

### P1 — before launch (D-30 → D-1)

12. **Stand up PH presence now** — maker account (own, not company) with photo/bio; start hunting/commenting in AI/dev topics immediately (1 week min, 3+ month recommended); 2-3 warm extra accounts (fresh-account votes get zeroed).
13. **Claim the product + build the pre-launch thread** — the product-forum thread replaces Coming Soon; plan: schedule the day within the 1-month window *after* thread followers accumulate.
14. **Asset pair with deadlines:** generate PH gallery (2+ images 1270×760 — 5-8 frames), thumbnail 240×240 <3MB (GIF hover = optional), poster — using `tools/render_agent_demo.py` (already supports `full/thumbnail/gallery`); a short screen-captured demo video (YouTube-public; allow 12h+ processing; captions > sound because autoplay is muted); tagline ≤60 chars features-not-benefits; description ≤500 chars; 3 launch tags (verify slugs on producthunt.com/topics); 3 shoutouts, pre-written maker first comment (in-flow, posts at 00:01), FAQ-reply templates.
15. **Email machinery built + tested** — the four jobs split; SPF/DKIM/DMARC on the sending domain; soft wave D-2/-3; waitlist confirmation fires; spam-test.
16. **Conversion surfaces:** `/producthunt` landing with badge + capture + 5s value prop; page must be mobile-minimal (≈60% PH inbound).
17. **Infrastructure/! stress:** load-check Formspree/vercel; set monitoring; rehearse launch-day analytics ("open dashboard with UTM filters"), pager for incident-escalation path. **Pre-check live page (SEO, Premium/OG, GSC live test, sitemap) for niki.ai→new domain.**
18. **Social cards:** pick the featured image to be the card image (self-explaining), not the logo.

### P3 — launch day (the proven runbook)

19. **00:01 PT auto-post** — everything pre-filled (no live edits; live-edit resets trending [vendor, treat with care: at minimum, zero-risk: verify before 23:59]); pre-written maker comment goes out at go-live; publish under your own maker account.
20. **Comment roster:** 2-3 humans on shifts across the 24h Pacific window; reply "as close to real-time as possible"; demo in replies; no AI-comment spam, no "thanks for the vote" spam.
21. **Engagement,** *not* asks: share link with "come rest-run it / feedback appreciated"; never "upvote"; no pods, no paid hunts, no vote-giveaways; the "GET IT visit" is included in the share copy (link = product page).
22. **Distribution:** staggered pushes (00:01 / 07:00 / 14:00 PT), Discord, X thread + LinkedIn essay, all via controlled short links; monitor via hunted.space.
23. **Screenshot + save the badge**; put the live-update badge on the site mid-day.

### P4 — post-launch (D+1..90: where the value compound)

24. D+1: thank-you + personal "what made you click" follow-up to signups (<48h); analytics dump → share photos.
25. 14-day nurture for PH cohort separately; one-question email ("What were you hoping Niki would do for you?") instead of a pitch.
26. D+3-7: **ship one visible thing** from feedback (README/issue templates/quickstart); "what you asked for, what we shipped" thread; weekly update rhythm thereafter.
27. D+2-4: Show HN with technical angle + tryable surface (self-host quickstart; note: HN hates walls + hype), per your plan (staggered, not same-day).
28. Newsletter pitch wave (TLDR/Console.dev/Bytes/Morning, 2-6 wks lead; the ranking # # the hook).
29. Reviews: "Leave a review" email to your users + badge.
30. Monthly "what shipped" Update post on the PH product hub; keep the launch page claiming; relaunch only ≥6 months with a "significant" change.
31. Post-launch SEO/ recap content ("how we launched Niki", case builds) — the compounding channel.
32. Contingency: if unfeatured (likely-featured odds low), already run the rest of plan (waitlist + owned channels + HN) — PH was 1 of 6 levers, not the only one.

### Decisions the team must make explicitly (not researched — ask-the-room)

- **Launch day** vs audience size ("Sunday = cheaper to win, Tue–Thu = traffic") — needs today's warm-list numbers. (From prior research.)
- **Domain:** custom domain vs `niki-site.vercel.app` as canonical — gate everything on this.
- **"Open source" / BUSL language:** with BUSL-1.1, PH listing should say "source-available open-core" — never "open source" (BSL's own text says it isn't OSI). Use a friendly license story: "the code is open; cloud is Zupa".
- **Hunter? No.** Self-hunt (official; 79/60% baseline); a maker-profile-person serves as the maker.

## 5. Already done (do NOT re-do — listed only to prevent duplication)

Homepage sections (hero/TUI, install tab, waitlist fine (form + validation + honeypot), pricing, FAQ, "who it's for", compare, pinned), mobile-responsive pass (incl. reduced-motion), Vercel Analytics mounted, waitlist funnel events, Formspree integration, SEO tooling (meta/OG/Twitter/JSON-LD/llms.txt/robots/sitemap — content all present, wrong domain), favicons, demo renderer pipeline (tools/render_agent_demo.py), launch copy doc (tagline/desc/tags/shoutouts in plans/product-hunt-launch-copy.md — **schedule the asset inline with it**), and the 2026-08-05 wide research + 2026-08-03 operational plan.

## 6. Disagreements & open questions (resolved + carried)

**Resolved by verification (V):** 4-hour count-hide = not current mechanism; Coming Soon = dead, use product-forum thread; shoutouts = 3; launch dashboard "Dec 2023" → Dec 11, 2024; Cloudflare "announced at Platform Week, shipped Birthday Week"; video "2.7×" unsupported; hunter "3.3×" stale; GDPR "30% EU" unsupported (keep the checkbox, drop the stat); "30-day" account age → "established accounts"; Kilo 4th-launch claim source = fmerian May-2026 post (consultant — treat as first-party marketing).

**Carried as limitations:**
- **Conversion:** 1.4% (measured, Plausible) vs 3-15% (vendors) vs "0 sales at top-5" (anecdote) — treated nothing as truth; instrument Niki's own.
- **PH backlink** dofollow/nofollow — unresolvable, treat as no SEO capital.
- **"Editing live listing resets score"** — vendor claims, no primary; assume risk and don't edit.
- **~60% mobile / -70-80% cliff numbers** — operational numbers from vendor/advice articles; directionally sound, not precise.
- **Second-launch attention** "diminishing" (practice) vs "compounding waves" (AFFiNE single case) — label as such.
- **Featured rate** (~10%, 2024) — now lower; plan as hard.

## 7. Sources

**Primary (PH):** producthunt.com/launch/* (preparing-for-launch, sharing-, launch-day-duties, days-after, two-weeks-post), producthunt.com/changes, help.producthunt.com/479557, /484934 (relaunch, Jul 2026), /484935, /11751186, /10030102, /11432379, /2731070, /9883485, /205. · **Big-co:** blog.cloudflare.com/workerd…) open-source-announce.png, pingora-open-source, how-we-built-pingora, community-program-refresh (08-2026); supabase.com/blog/supabase-how-we-launch; github.blog/changelog (postnov-2026); posthog.com/handbook/growth/marketing; nextjs.org/blog/next-15; tailwindcss.com/blog; protomaps.com/blog/open-core-to-open-source/; mariadb.com/bsl11/. · **OSS readiness:** opensource.guide/* (starting-a-project, best-practices, building-community, finding-users, code-of-conduct), makeareadme.com, keepachangelog.com, bestpractices.coreinfrastructure.org, docs.brew.sh/Analytics, docs.github.com (security policy, issue templates), mockoon.com/blog/telemetry-removed, github.com/circleci-public/…/12-analytics.md, opensourcesurvey.org/2017. · **First-hand maker retros:** dev.to/fmerian/how-kilo-code-launched (Kilo), dub.co/blog/product-hunt (Dub), getinboxzero.com/blog/how-my-open-source-saas-hit-first (Inbox Zero), papermark.com/blog (vote split), daytona.io/dotfiles/how-we-missed-1, openstatus.dev/blog/product-hunt-brutal-reality, docs.opensaas.sh/blogs…still-launch, corbado/guidde, lennysnewsletter.com/p/how-to-successfully-launch-on-product (Leo Videla), Stripo, Plausible (github: how-not-to-launch), r/indiehackers 1ruo4da (18yo thread), r/r/Entrepreneur twvudv, meysam.io, launchpact, flowjam, waitlister, smoll.com/guides, fromscratch.dev. · **Vendor/lit discount (quant claims):** getlaunchlist, waitlister, launchpact, uprowshub, flowjam, smoll — direction only.

## 8. Appendix A — Project gap status table (from code inventory)

| # | Item | Status | Evidence |
|---|---|---|---|
| 1 | Domain PTSD: canonical/OG/JSON-LD/sitemap/robots/llms ~30 refs | —— | index.html:13; src/seo.js:3; sitemap.xml:4,10,16; llms.txt:7-8 |
| 2 | Old PH link/badge (products niki-2, post_id 1214430) | — | ProductHunt.jsx:3-4; Footer.jsx:12 |
| 3 | Install truth (binaries/install.sh/ps1), "Union Downloads" | — | Install.jsx:12-17; DownloadsPage.jsx:77 |
| 4 | Privacy page + GDPR consent | — | no route; Waitlist.jsx |
| 5 | Raster OG image 1200×630 | partial (SVG) | public/og-image.svg |
| 6 | /producthunt landing | — | main.jsx:42-46 |
| 7 | Funnel events + UTM + PH ref | waitlist-only | Waitlist.jsx:75-105; lib/waitlist.js |
| 8 | Waitlist copy alignment | mixed | Waitlist.jsx:114; Pricing.jsx:40-45 |
| 9 | 404 route / vercel.json | — | main.jsx; none |
| 10 | CI/lint/typecheck/test/Lighthouse | — | package.json:7-11 |
| 11 | Real-run demo proof | blueprints only | HowItWorks/DemoClip |
| 12 | PH maker acct + age + activity | — | — (external) |
| 13 | Pre-launch thread + draft listing | — | draft not verified |
| 14 | PH asset pack (gallery/thumbnail/video/OG) | generator ready, files | tools/render_agent_demo.py |
| 15 | Email machinery (split/reputation/warm) | | — |
| 16 | Nurture/PH sequence | — | — |
| 17 | Reviews/badges after launch | — | — |
| 18 | Show HN surface (repo + quickstart) | — | plan only |
| 19 | Newsletter pitch | — | plan only |
| 20 | Changelog page on site | — | — |

## 9 — Appendix B — Verification audit trail (from adversarial pass)

Dropped: "hides counts 4h" (not current, prior — test); 2.7× video; "30% EU"; "30-day account"; "Dec 2023"→"2025"; "unlimited shoutouts" (→3). Fixed: Cloudflare announcement(M) vs release (Sep); ComingSoon (dead) → forum thread. Verifier-confirmed high-confidence core: points formula (comments factor), featured-gate criteria, 1-month scheduling window, 70% maker-first-comment, comment Inbox, badge set, "GET IT"-style visit weighting is unproven at API level. Residual single-source items noted in §6.

## 10 — Further research (when useful)

- One-stage: Niki's *owned-audience size* measure → then pick the launch day (Sunday=b lendable vs Tue-Thu=traffic).
- Telemetry: pick opt-out policy and publish it before adding any analytics beyond Vercel's.
- License story: BUSL vs OSI-compliant option for public positioning and stars (which drive the OSS vector).

---

*This document ends with the gap list, not recommendations of what to do — the recommendation is the list above (P0→P4). Implementation-ready next steps are 1-11 (P0) in one work session, then 12-18 (P2).*