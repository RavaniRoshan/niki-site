# Research: Enlarged "How It Works" Section + Per-Agent Demo GIFs

**Scope:** UI/UX components, section layout, and per-agent demo-GIF choreography for expanding Niki's
landing-page "How It Works" section from one summary clip into focused demos — one per agent / specialty,
each modeled on the existing `public/demo.gif` (1200×750, 244 frames, JetBrains Mono, dark charcoal
`#121111` TUI).

**Method:** 5 parallel research subagents (UI patterns · dev-tool structures · GIF embedding/a11y ·
motion choreography · Niki's actual agents) + 1 adversarial verifier + 1 source-level re-verify of the
Tester execution claim.

---

## Executive summary

- The dominant, best-supported "How It Works" pattern is a **numbered step sequence** (3–5 steps), each
  step = bold title + one-line + tight bullets + **one visual** (source: saaslandingpage.com, Evil
  Martians). Tabs are wrong for *sequential* content (Material Design); scrolljacking is risky for
  task-oriented dev visitors (NN/g).
- For a **multi-agent pipeline** specifically, the strongest pattern is a **persistent pipeline map +
  a single-active-media deep-dive** (sticky media panel that crossfades per active step, or a tabbed
  panel). This satisfies "one GIF per agent" while avoiding 5–7 *simultaneously* autoplaying loops —
  which the verifier flags as a WCAG 2.2.2, attention-budget, and ~10× payload regression.
- **Niki's real default pipeline is 5 agents** (`Planner → Coder → Tester → Red → Reviewer`), not the 4
  the site currently advertises. `Red` (adversarial) is **on by default**; `Synthesizer` and
  `SecurityAuditor` are opt-in. The site's `Pipeline.jsx` copy is factually stale and should be
  reconciled.
- **The Tester does NOT run tests** — it *simulates* them from the diff (verified in source, high
  confidence). A Tester demo must be framed honestly as reasoning/analysis, not executed output. The
  current README overstates this too.
- Ship **MP4+WebM, not raw GIF**, with a poster, lazy-load + IntersectionObserver autoplay, a **global
  pause/stop control**, and a `prefers-reduced-motion` static fallback. Current single `demo.gif` is
  271 KB; 5–7 focused clips balloon to ~2–4 MB if done naively — budget and bound concurrency.

---

## Findings by sub-question

### 1. How It Works UI patterns (2024–2026)
- Numbered step sequence is the dominant format; per-step formula = bold title + one-liner + tight
  bullets + one supporting visual (source: saaslandingpage.com).
- Alternating image/text rows are an *expansion layer inside* steps, not a replacement for the sequence
  (source: saaslandingpage.com).
- Material Design: do **not** use tabs for ordered/sequential content — use steps/headings
  (source: m3.material.io via eleken.co).
- NN/g: accordions are risky when all content is needed / continuous reading — which describes a
  landing How-It-Works (source: nngroup.com/articles/accordions-on-desktop).
- Timeline / progress line = connective tissue over steps, not a standalone pattern
  (source: saaslandingpage.com).
- The "3-step rule" is asserted by practitioners, not evidenced; observed real pages use 3–4 with no
  comparison data (source: saaslandingpage.com; huemor.rocks).

### 2. Dev-tool / AI-agent structures
- Evil Martians study of 100+ devtool pages: canonical order Hero → Trust → Feature → Social proof →
  Supporting → CTA; "How it works" is an **add-on nested with/after the Feature block**, justified
  precisely when the product has "magic" (AI) not self-explanatory (source: evilmartians.com, Jul 2025).
- Step-by-step = the pipeline-specific feature format (numbered steps, short labels, small visuals);
  tabbed feature block is the alternative when stages fall into logical categories (source: evilmartians.com).
- Dev audiences trust architecture diagrams, honest trade-offs, benchmarks over marketing fluff
  (source: business.daily.dev). **Caveat:** the "96% assume companies lie" stat is unverifiable as cited.
- Comparable tools diverge: Factory.ai leads with a pipeline dashboard (6 stages); Devin.ai has **no**
  How-It-Works section (use-case-first). Neither publishes conversion data — illustrative only, n=2
  (sources: factory.ai, devin.ai).
- Recurring agent-page hierarchy: eyebrow label → argumentative H2 (a claim) → one-line scope →
  numbered stage cards (H3 verb + bullets) → per-stage micro-artifact → optional "why not the
  alternative" block (sources: factory.ai, arahi.ai, nanonets.com, agentx.so, jasper.ai).

### 3. Demo GIF/video embedding & accessibility
- Convert GIF→video: web.dev example 3.7 MB GIF → 551 KB MP4 → 341 KB WebM; use
  `<video autoplay loop muted playsinline>`; `libx264` needs even dimensions
  (source: web.dev/articles/replace-gifs-with-videos — **last updated 2018**, still numerically accurate).
- Terminal text recording (asciinema ~10 KB/min) is far smaller than GIF/video, but needs a JS player
  (asciinema.org or self-host); animated SVG is crisper but no copy/rewind; **VHS** gives reproducible
  scriptable terminal GIF/MP4/WebM for CI (sources: screensnap.pro, configcrate.com, sadmanca.github.io,
  lattice.uptownhr.com).
- Lazy-load: `loading="lazy"` + `preload="none"` defers below-fold media; IntersectionObserver enables
  autoplay on intersect; explicit `width`/`height` required to avoid reflow
  (source: web.dev/articles/lazy-loading-video).
- **WCAG 2.2.2 (Level A):** auto-starting moving content >5 s in parallel with other content needs
  pause/stop/hide; *scrolling into view counts as auto-start*; loops <5 s sidestep it; W3C best practice
  = **one control that pauses all loops** (source: w3.org/WAI/WCAG21/Understanding/pause-stop-hide).
- `prefers-reduced-motion` helps WCAG 2.3.3 but is **not sufficient** alone for 2.2.2 — explicit pause
  control still required (sources: blog.openreplay.com, accessscan.app). Verifier: the normative text's
  own note says the mechanism "may be relied upon to be provided by the platform/user agent" — a live
  counter-argument; treat as contested.
- WCAG 1.2.1: a silent terminal loop is "video-only" and needs a text alternative **unless** it is
  explicitly a "media alternative for text" (source: w3.org).
- Layout: alternating/split most common; tabbed needs **identical dimensions/framing** across assets;
  grid needs strictest consistency; dark themes make terminal captures pop; export 2× for retina
  (sources: screenhance.com, framiq.app). Some sources argue static screenshots beat autoplay on
  feature pages — but a 4–6 s loop is acceptable when motion is the point.

### 4. Motion choreography for a pipeline
- Stagger: one tunable interval (`--i * ~60–100 ms`), `animation-fill-mode: both`, delay 0 on first item
  (sources: carmenansio.com, logrocket). *Verifier note:* the "Material 20 ms" figure is from archived
  M2 and is a false conflict with current M3 — drop it.
- SVG handoff edges: `stroke-dasharray`/`dashoffset` draw-on; a two-line pattern (solid draw + dashed
  base) reads as "wire laid, then calm flow"; edge delay derived from node delay so a connector never
  draws before its endpoint exists (source: flaviocopes.com).
- Progress stepper states: pending / in-progress / completed / warning / failure; verb tense encodes
  state; never color-only; mark up as `<ol>`; `aria-current="step"`; `aria-live` summary
  (sources: patternfly, pluma.customer.io, redhat).
- Scroll-driven: `position: sticky` stage (scroll advances time) or native CSS `animation-timeline:
  view()` off main thread; restrict to transform/opacity (sources: codrops, css-tricks, chrome.dev).
- **Cohesion with many loops (weakest evidence):** global play manager with concurrency cap (~3); pause
  offscreen + on tab hide; "one ambient loop per scene"; all durations divide a common period for
  seamless looping (sources: primer.style, micro.bossadizenith.me, devsvideo/hyperframes). *Verifier:*
  this directly contradicts a 5–7 simultaneous-loop grid — the grid design is the weak point, not the
  principle.

### 5. Niki's actual agents (verified in source)
- `AgentRole` enum = **7 roles**: Planner, Coder, Tester, Reviewer, Synthesizer, SecurityAuditor, Red;
  each writes `artifacts/<role>.json` (source: src/artifacts/types.rs).
- Default pipeline = **Planner → Coder → Tester → Red → Reviewer** (5). `Red/Blue` is **on by default**
  (`default_red_blue_enabled() -> true`, called the product's "core thesis"); `SecurityAuditor` and
  `Parallel` are **opt-in** (config defaults `false`) (source: src/config/types.rs).
- Per-role glyph+color (`Theme::new()`): Planner ◈ blue, Coder ⟠ magenta, Tester ◉ green, Reviewer ◆
  yellow, Synthesizer ⧉ cyan, SecurityAuditor ⚷ red, Red ✗ red (source: src/display/theme.rs).
- **Documented conflict:** README headlines "Four specialized LLM agents" and omits Red/Blue entirely;
  roadmap lists "adversarial debate mode" as *not shipped* while code ships it on by default
  (source: github README vs src). The site's `Pipeline.jsx:37` also says "Planner → Coder → Tester →
  Reviewer" — stale.
- **Glyph/color ambiguity:** a second table `role_glyph()` in the same `theme.rs` returns Planner `◆`,
  Coder `⚡`, Tester `●`, Reviewer `◆` (Planner/Reviewer collide), and Red + SecurityAuditor are both
  red — so "match the CLI" is ambiguous; color alone cannot distinguish Red from SecurityAuditor.
- Modes (each demo-able): Topology Auto/Single/Multi; solo fast-path (collapses to one Coder, trades
  away Red/Blue); parallel coders → Synthesizer merge; Security pass (after Reviewer, non-gating);
  custom `[pipeline]` stages; sandbox backends podman/docker/worktree/cloud (source: src/config/types.rs,
  src/cli/run.rs).

---

## Adversarial verification — issues found & how they are resolved

The verifier found 2 blockers and several misrepresentations. Resolutions:

1. **WCAG 2.2.2 (BLOCKER).** A loop <5 s only sidesteps 2.2.2 by *period*, not by being endless; an
   endlessly looping clip in parallel with other content **fails 2.2.2 without a pause mechanism**, and
   going from 1 clip to 5–7 makes this materially worse. → **Resolution (carried into plan):** every
   loop section gets a global "pause all" control; use `<video>` with `controls` as the cross-browser
   autoplay fallback (which *is* a pause mechanism); keep each clip ≤ ~6 s; never rely on reduced-motion
   alone.
2. **Default pipeline is 5, not 4 (BLOCKER for copy).** → **Resolution (carried into plan):** the
   enlarged section's map and copy should depict the real default `Planner → Coder → Tester → Red →
   Reviewer`; flag the existing `Pipeline.jsx` + README correction as a required content task.
3. **Tester honesty (BLOCKER for framing).** Re-verified in source (`pipeline.rs` + `tester.md` +
   repo-wide grep): the Tester is a pure LLM call; no process is ever spawned; `Sandbox::exec` has zero
   callers in the pipeline; the schema cannot even carry executed output. → **Resolution:** the Tester
   demo is framed as *reasoning/simulated analysis*, never "ran tests"; copy mirrors this. (README's
   "generates and runs tests" is itself inaccurate and should be corrected.)
4. **arXiv scrollytelling paper misrepresented** (interactive pooled beat static; no "sticky-visual";
   no NASA-TLX "mental effort" result). → Down-weighted; scrollytelling treated as *optional, below the
   fold, mobile-avoided*, not a core recommendation.
5. **NN/g scrolljacking** dated 2023; the key dropped finding — *task-oriented users are highly annoyed
   by scrolljacking* — applies directly to dev visitors. → Reinforces: avoid scroll-rate hijacking;
   if used, preserve native scroll rate, below the fold, escape hatch, never on mobile.
6. **Evil Martians undercut:** the same study says "most pages avoid flashy interactions" and video is
   "a shortcut for teams without time." → The plan favors a restrained, diagram-led design over a
   flashy 7-loop grid.
7. **`poster` conflict is inside web.dev itself** (one article says omit for GIF-emulation; the LCP
   article says add for hero video). → Plan: omit poster for always-autoplay below-fold loops; add
   poster + preload for any above-the-fold LCP demo.
8. **`loading="lazy"` on `<video>` is not Baseline** (cross-browser fallback removes autoplay, adds
   `controls` — which conveniently also satisfies 2.2.2). → Plan uses the IO + `controls` fallback.
9. **Material 20 ms stagger is a false conflict** (archived M2). → Use 60–100 ms.
10. **One-loop-per-scene principle contradicts the 7-loop grid.** → Plan adopts a **single-active-media**
    deep-dive (sticky panel or tabs) so only the focused agent's clip plays.
11. **Glyph/color collision** in `theme.rs`. → Plan defines an explicit, non-colliding art-direction
    table for the web section (don't blindly "match the CLI"); distinguish Red vs SecurityAuditor by
    glyph + label, not color alone.
12. **Payload math (GAP).** Current `demo.gif` = 271 KB. 5–7 focused clips at ~500 KB/min GIF (or
    ~900 KB MP4+WebM each) = ~2–4 MB, a ~10× regression. → Plan budgets each clip ≤ ~400 KB (MP4+WebM),
    lazy + concurrency-capped, and reuses one shared TUI frame style.
13. **Mobile (GAP).** Terminal text at 360–390 px is unreadable. → Plan specifies fixed legible column
    count, 2× export, tap-to-play/static poster on mobile, and no scrollytelling on mobile.
14. **Core premise unproven by outcome data.** No source compares one-GIF-per-agent vs a single summary.
    → Stated plainly as a limitation; the recommendation rests on pattern frequency + a11y/perf
    constraints, not conversion evidence.

---

## Recommended layout decision (the "view layout" to implement)

A two-part **enlarged "How It Works"** section:

**A. Pipeline map (always visible anchor).** A connected node graph (SVG) of the 5 default agents with
animated handoff edges (`stroke-dashoffset` draw-on + calm dashed flow), using the explicit
non-colliding glyph/color table. One reusable overview that replaces today's static 4-cell grid.

**B. Agent deep-dive (single-active media).** Each agent gets its own focused demo clip + explanation.
To honor "one GIF per agent" without 5–7 simultaneous loops:
- **Recommended: sticky-media "process" layout** — left = sticky media panel showing the *active*
  agent's clip; right = scrollable numbered step list (one block per agent) with explanation. As the
  reader scrolls, the active step's media crossfades in; **only one clip plays at a time** (satisfies
  attention budget, WCAG concurrency, payload). Verified pattern: shadcn process2 / Buildkite interactive
  diagram.
- **Alternative: tabbed panel** — one media area, tabs switch agent; only the active tab's clip plays.
  Requires identical dimensions/framing across all clips (screenhance.com).
- **Rejected:** a grid of 7 simultaneously autoplaying loops.

**C. Opt-in / advanced modes** (Synthesizer merge, SecurityAuditor, solo fast-path, custom pipeline,
backends) — a secondary tabbed/collapsed area below the fold, each with its own clip, lazy-loaded.

**Cross-cutting requirements:** global pause/stop control; `prefers-reduced-motion` static fallback
(`<picture>` source swap or JS `matchMedia`); MP4+WebM (+ optional GIF for the hero) with poster only
where it's the LCP; `width`/`height` set; 2× retina export; dark TUI frame; honest Tester framing;
reconcile the 4→5 agent copy on the site and README.

---

## Asset plan (per clip)

| Clip | Agent | Focus (one specific thing) | Honest framing |
|---|---|---|---|
| 1 | Planner ◈ | Emits `TaskSpec` (files_to_modify, acceptance) | "Plans, writes no code" |
| 2 | Coder ⟠ | Applies `CodeDiff` to sandbox copy | "Edits the copy, not your tree" |
| 3 | Tester ◉ | Shows `TestReport` | "Reasons about tests against the diff (simulated)" |
| 4 | Red ✗ | Lists `RedChallenge` items | "Adversarial — finds what others missed" |
| 5 | Reviewer ◆ | `ReviewVerdict` + scores + Red reconciliation | "Approves or bounces back" |
| 6 | Synthesizer ⧉ | Merges parallel coder diffs | opt-in (parallel mode) |
| 7 | SecurityAuditor ⚷ | `SecurityVerdict` findings | opt-in |
| 8 | Solo | single-agent fast-path | trades away Red/Blue |

Generation: a reusable renderer (`tools/render_agent_demo.*`) that paints representative TUI frames with
**Pillow + JetBrains Mono** (already extracted to `tools/fonts`), matching the existing `demo.gif`
style, then encodes MP4 (ffmpeg) + optimized GIF (gifsicle) + poster PNG. Keeps demos reproducible and
on-brand without needing live API keys/sandbox.

---

## Toolchain (verified available)

- Node 24 + npm 11 — `npm install` and `npm run build` both pass.
- `ffmpeg` 7.0.2 (static) — encode MP4/WebM, even-dimension crop.
- `gifsicle` 1.92 — installed via `npm i gifsicle` (binary at
  `node_modules/gifsicle/vendor/gifsicle`); re-encoded `demo.gif` losslessly OK.
- Pillow 12.2 (Python 3.12) — reads/writes frames; used to render synthetic TUI frames.
- `vhs` 0.10.0 / `asciinema` 2.4.0 / `ttyd` 1.7.7 — available if a real terminal capture path is
  preferred later.
- JetBrains Mono Regular/Medium/Bold extracted to `tools/fonts/` and installed to `~/.fonts`.

## Disagreements & open questions
- Tabs vs steps for sequential content: Material says steps; some product pages use tabs for parallel
  variants. Resolved by using steps for the pipeline and tabs only for the *parallel opt-in modes*.
- Scrollytelling value: NN/g (negative for task-oriented users) vs a small 2026 lab study (positive for
  motivated learners). Resolved: allowed only below the fold, native-scroll-rate-preserving, mobile-off.
- `<video>` vs animated AVIF/WebP for many small loops is genuinely contested (web.dev vs CSS-Tricks);
  for terminal text, VP9/AV1 smearing of fine glyphs is a real risk, so MP4(H.264)+WebM(VP9) + GIF
  fallback is chosen for fidelity.
- Whether `prefers-reduced-motion` alone satisfies 2.2.2 remains a live accessibility debate; plan does
  not rely on it.
- "Specialty" is **not** a term in the Niki repo; the defensible unit is `AgentRole` (7) + orthogonal
  modes. The plan maps "specialty" → opt-in agents/modes.

## Full source list
- saaslandingpage.com/articles/10-brilliant-how-it-works-page-examples
- huemor.rocks/blog/best-content-for-a-homepage
- m3.material.io/components/tabs/overview (via eleken.co/blog-posts/tabs-ux)
- nngroup.com/articles/accordions-on-desktop ; nngroup.com/articles/scrolljacking-101
- evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025
- flow-agency.com/blog/b2b-saas-landing-page-best-practices
- factory.ai ; devin.ai ; arahi.ai/ai-agent-builder ; nanonets.com/products/agent-builder ;
  agentx.so/product/build-agents ; jasper.ai/agents
- web.dev/articles/replace-gifs-with-videos ; web.dev/articles/lazy-loading-video
- w3.org/WAI/WCAG21/Understanding/pause-stop-hide ; w3.org/WAI/WCAG21/Understanding/audio-only-and-video-only-prerecorded
- blog.openreplay.com/prefers-reduced-motion-accessible-animation ; accessscan.app/guides/reduced-motion-accessibility
- screenhance.com/blog/saas-feature-page-screenshots ; framiq.app/blog/best-saas-landing-pages-2026
- carmenansio.com/articles/art-of-css-motion ; logrocket.com/css-staggered-animations
- flaviocopes.com/animated-svg-connection-lines ; css-tricks.com/svg-line-animation-works
- patternfly progress-stepper design guidelines ; pluma.customer.io/components/stepper/accessibility
- codrops 2026 sticky-grid-scroll ; css-tricks.com/css-scroll-triggered-animations-first-look ;
  chrome.dev/docs/css-ui/scroll-driven-animations
- primer.style/accessibility/design-guidance/motion-and-animation ; micro.bossadizenith.me/writing/video-performance-on-micro
- github.com/RavaniRoshan/niki — src/artifacts/types.rs, src/orchestrator/pipeline.rs, src/config/types.rs,
  src/display/theme.rs, src/sandbox/mod.rs, prompts/tester.md, README.md (all via raw.githubusercontent.com)
- arxiv.org/html/2607.03023v1 (verifier: misrepresented by subagent 1)
