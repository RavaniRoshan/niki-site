# Mobile Responsiveness Plan — Niki Site

## Goal
Make the Niki marketing site fully usable on phones (320–430px) and tablets (768–850px) **without regressing the desktop layout**. Target: no horizontal page scroll, all interactive controls ≥44px tap targets, anchor links land below the fixed nav, demo media readable, and the comparison table + forms usable on touch.

## How this plan was produced
- Parallel codebase audit across 5 component groups (TopNav/Hero, FeatureScroller/HowItWorks, Pipeline/Demo/WhatIsNiki, Pricing/Compare/Install, Footer/Cta/Waitlist/Faq + global typography), each returning file:line evidence.
- Direct re-verification of the two highest-severity findings against `src/styles.css`.
- Confidence is high: every finding cites a concrete line; this is a codebase audit, not web research, so claims are not inference.

## Severity roll-up

### HIGH — broken or unusable on mobile
1. **TopNav overflow + 769–850px dead zone** — `src/styles.css:124-133` (`.topnav-inner` is `display:flex; justify-content:space-between` with no `flex-wrap`/`min-width:0`) and `:175-178` (`.topnav-links` only hides at ≤768px, `.nav-toggle` only appears ≤768px). At 769–850px the full 7-link desktop cluster stays visible beside the wordmark + button cluster and overflows. At ≤375px the ASCII wordmark (`white-space:pre`, cannot shrink) + theme-toggle + GitHub CTA + nav-toggle exceed the viewport → page-level horizontal scroll (no `overflow-x:hidden` exists on `html`/`body`).
2. **`.hiw-grid` never collapses** — `src/styles.css:1019-1025` is `grid-template-columns: repeat(2, 1fr)` with **no** max-width override anywhere (only `:1092-1094` changes media *height*). At 375px each card ≈149px wide, ≈99px usable text; long token `Planner/Coder/Tester/Red/Reviewer` is clipped by `.hiw-card { overflow:hidden }` (`:1029`).
3. **Compare table "stacked" layout is dead** — `src/styles.css:473-475` sets `td` percentage widths (specificity 0,2,1) that outrank the mobile `.ds-table td { width:100% }` inside `@media (max-width:640px)` (specificity 0,1,1; media queries add no specificity). Cells render ~92/118/118px inside a 327px row → values in thin ribbons, ~65% of viewport blank. `Compare.jsx:21` is a real `<table>` with no `overflow-x` wrapper.
4. **Waitlist segment radios break focus** — `src/styles.css:858` `.wl-seg-card input { position:absolute }` but `.wl-seg-card` has no `position:relative` (`:841-851`), so radios anchor to the document's initial containing block. `Waitlist.jsx:64-65` calls `el.focus()` on a hidden radio on validation fail → browser scrolls to document top, away from the form. Functional break on the primary conversion form.

### MEDIUM
- **Fixed-nav offset mismatch** — nav is ~101px tall (6-line ASCII wordmark) but `body { padding-top:61px }` (`:57`) and `scroll-padding-top:80px` (`:49`) → every `#why`/`#faq`/`#start` anchor lands under the nav on mobile.
- **Install tabs overflow** — `.tabs` `src/styles.css:309-313` is `display:flex` with no `flex-wrap`/`overflow-x:auto`; `.tab { white-space:nowrap }` (`:322`) → ~320px min-content vs 327px available; overflows at 360px with no fallback.
- **Install snippet unusable on touch** — `.install-snippet code { overflow-x:auto }` (`:344-345`) shows only ~231px of an 826px command; the `select+copy` fallback is hard to use by touch.
- **Tap targets < 44px** — `.nav-toggle` 36px (`:183-184`), `.theme-toggle` 36px (`:692`), `.copy-btn` ~32px (`:347-356`), `.hiw-pause` ~39px (`:1001-1010`). `.btn` computes ~42px (just under).
- **`h2.heading` has no hierarchy** — `--fs-heading:16px` (`:30`) equals `.body`; section headings in CtaStrip/Faq/Waitlist/AudienceCli render at body size on mobile.
- **Pricing enterprise CTA clipped** — `.tier-cta .btn` "Join enterprise waitlist" ≈272px vs ~277px available; `.tiers { overflow:hidden }` (`:757`) silently clips it (no scroll).
- **Compare 641–850px has no inter-column gutter** — `:461-462`/`:474` only col-2 has padding → columns visually collide.
- **FeatureScroller active nav item off-screen** — `.fs-nav-list` is a horizontal `overflow-x:auto` row (`:972-974`) but `FeatureScroller.jsx:38-52` never scrolls the active item into view; IntersectionObserver only updates `active`.
- **Cover-cropped demo media** — `.fs-card-media` (`:956-961`, `:985`) and `.hiw-card-media` (`:1034-1040`, `:1092-1094`) use fixed heights + `object-fit:cover` on 1200×750 landscape clips → ~60% of the terminal frame width is cropped on mobile.

### LOW
- Footer last-row border asymmetry (`:673`); `.foot-bottom` ragged wrap (`:655-663`); `.hero-cta` tight at ≤360px (`:379`); `.faq-body` 32px indent never reduced (`:302`); `.wl-actions`/`.wl-success` padding (`:869`,`:874`); Product Hunt badge fixed `width:250px` distorts (`:624-627`); `--gutter:24px` (`:44`) never reduced (≈13% of a 375px viewport is padding); HowItWorks caption says "left" but nav is on top ≤919px (`HowItWorks.jsx:71`); `.fs-card-media` has no 641–850px height rule.

## Guiding principles (apply across all phases)
1. **Consolidate breakpoints.** Current CSS mixes 919/920, 850, 768, 640. Standardize to two: `≤850px` (tablet/large-phone) and `≤640px` (phone). Fold the `min-width:920px` fs two-column rule into `≥851px`. Document the tokens at the top of `styles.css`.
2. **Fix root causes, then add a backstop.** Add `html { overflow-x: hidden }` only *after* the overflowing elements are fixed, as a safety net — not as the fix.
3. **Long monospace tokens.** Add `overflow-wrap: break-word; word-break: break-word;` to text containers so `Planner/Coder/...`, `NIKI_CLOUD_ENDPOINT`, etc. never force page scroll. Avoid `white-space:nowrap` on anything that can hold long content (keep it only on controls that must not wrap).
4. **Reduce gutter on mobile.** `--gutter`: 24 → 20px at ≤850, → 16px at ≤640.
5. **44px tap targets** for every interactive control.
6. **Match nav offset.** Reconcile `body padding-top`, `scroll-padding-top`, and real nav height.

## Phased implementation plan

### Phase 0 — Foundation (global `src/styles.css`)
- Add breakpoint-token comment block + reduce `--gutter` responsively (P4 above).
- Add `overflow-wrap`/`word-break` to text blocks.
- Add `html { overflow-x: hidden }` backstop *last*, once root causes are fixed.
- Define a `.tap` (min-height:44px) helper or apply per-control.

### Phase 1 — TopNav (HIGH) — `styles.css:124-189`, `TopNav.jsx`
- Move the `.topnav-links { display:none }` + `.nav-toggle { display }` rule from `max-width:768px` to `max-width:850px` to close the 769–850 dead zone.
- `.topnav-inner`: add `flex-wrap:wrap` and `min-width:0` on flex children; reduce `gap` on mobile.
- Make the wordmark compact on ≤640px (swap ASCII block for a single-line wordmark via a CSS class) so nav height matches the scroll offset.
- Icon-only theme toggle on ≤480px (keep `aria-label`).
- Fix `body padding-top` / `scroll-padding-top` to the real nav height.

### Phase 2 — HowItWorks `.hiw-grid` (HIGH) — `styles.css:1019-1094`, `HowItWorks.jsx`
- Collapse `.hiw-grid` to `1fr` at `max-width:850px`.
- Replace fixed `height` + `object-fit:cover` with `aspect-ratio:16/10` + `object-fit:contain` (or a tuned cover) so 1200×750 clips aren't 62% cropped; let text wrap (`overflow-wrap`).
- Fix `HowItWorks.jsx:71` caption ("left" → "top") on mobile.

### Phase 3 — Compare table (HIGH) — `styles.css:455-501`, `Compare.jsx`
- Fix specificity so the stacked rule wins: e.g. `.ds-table td, .ds-table th { display:block; width:100% }` inside the `≤640px` media query with a higher-specificity selector, or restructure to class-based stacked cards.
- Add a column gutter at 641–850px (padding-right on first column).
- Verify no overflow at 360px.

### Phase 4 — Waitlist form (HIGH) — `styles.css:808-877`, `Waitlist.jsx`
- Add `position:relative` to `.wl-seg-card` so absolutely-positioned radios anchor correctly.
- Fix `validate()` focus jump (`Waitlist.jsx:64-65`): focus a visible element or `scrollIntoView` the form, not a hidden radio at document top.
- `.wl-seg` → `repeat(2,1fr)` (or `auto-fit minmax`) at 641–850px so 4 segments don't orphan.
- `.wl-seg-card` tap target ≥44px.

### Phase 5 — FeatureScroller (MEDIUM) — `styles.css:888-987`, `FeatureScroller.jsx`
- Scroll the active `.fs-nav-item` into view when `active` changes (small JS addition in the `useEffect`/`setActive` path).
- Convert fixed media `height` to `aspect-ratio`; add scroll-snap / edge fade mask to `.fs-nav-list` for affordance.

### Phase 6 — Install (MEDIUM) — `styles.css:305-356`, `Install.jsx`
- `.tabs`: `overflow-x:auto` + `flex-wrap:wrap` fallback so it never forces page scroll at 360px.
- `.install-snippet`: keep `overflow-x:auto` but add a right-edge fade and ensure the copy button copies the full command; set `.copy-btn` ≥44px with a fixed `min-width` to avoid layout shift on label change.

### Phase 7 — Pricing (MEDIUM) — `styles.css:750-804`, `Pricing.jsx`
- `.tier-cta .btn` full-width (or reduced padding) on mobile so "Join enterprise waitlist" isn't clipped.
- Confirm all CTAs ≥44px.

### Phase 8 — Typography & hierarchy (MEDIUM/LOW)
- `.heading` (h2) → ~20–22px on mobile for hierarchy vs 16px body.
- Enforce 44px tap targets on nav-toggle, theme-toggle, copy-btn, hiw-pause.
- Reconcile `scroll-padding-top` with nav height.

### Phase 9 — Polish (LOW)
- Footer last-row border; `.foot-bottom` wrap; `.hero-cta` ≤360px; `.faq-body` indent; Product Hunt badge `max-width:100%; height:auto`; `.fs-card-media` 641–850 height rule; `.wl-actions` alignment.

## Testing / verification
- Browser device toolbar at **320, 360, 375, 390, 414, 768, 850px**.
- Checks: `document.scrollWidth ≤ innerWidth` (no horizontal scroll); all tap targets ≥44px; anchor links land below nav; Waitlist validates without scrolling to top; Compare stacks readably at 360px; demo media not overly cropped; `npm run build` passes.
- Optional: real-device spot check (iPhone SE / Pixel).

## Open questions / decisions to make during implementation
1. **Wordmark on mobile:** keep ASCII block (height cost) or swap to compact single-line wordmark ≤640px? *(Recommend compact.)*
2. **Compare 641–850px:** stacked cards (with fixed specificity) vs horizontal-scroll wrapper? *(Recommend stacked.)*
3. **Demo media crop:** `cover` (uniform card height, crops frame) vs `contain` (full demo visible, variable height) vs `aspect-ratio` + tuned cover? *(Needs design call; recommend aspect-ratio container.)*
4. **Breakpoint consolidation:** fold `920px` into `850px` to eliminate dead zones? *(Recommend yes.)*

## Files audited (source list)
- `src/styles.css` (1097 lines) — all layout/typography
- `src/components/TopNav.jsx`, `Hero.jsx`, `FeatureScroller.jsx`, `HowItWorks.jsx`, `DemoClip.jsx`
- `src/components/Pipeline.jsx`, `Demo.jsx`, `WhatIsNiki.jsx`
- `src/components/Pricing.jsx`, `Compare.jsx`, `Install.jsx`
- `src/components/Footer.jsx`, `CtaStrip.jsx`, `Waitlist.jsx`, `WaitlistPage.jsx`, `Faq.jsx`, `AudienceCli.jsx`
- `src/lib/waitlist.js`, `tailwind.config.js`
