# Plan: Enlarged "How It Works" Section + Per-Agent Demo GIFs

**Status:** Research complete. Awaiting a goal to begin implementation.
**Depends on:** `research/how-it-works-layout.md` (findings + adversarial verification).
**Product reality check:** Niki's real default pipeline is **5 agents**
(`Planner → Coder → Tester → Red → Reviewer`); `Red` is on by default; `Synthesizer` and
`SecurityAuditor` are opt-in. The Tester **simulates** tests (does not execute them).

---

## Goal of the work

Replace the single summary `demo.gif` with an **enlarged, broader "How It Works"** section that:
- explains the multi-agent choreography clearly,
- gives **each agent (and each opt-in mode/specialty) its own focused demo clip** modeled on
  `public/demo.gif`, and
- does so responsibly: accessible (WCAG 2.2.2 pause), performant (video not GIF, lazy, bounded
  concurrency), and honest (Tester = reasoning, not execution).

---

## Layout decision (what we will build)

Two-part section, plus an opt-in modes area:

### Part A — Pipeline map (always-visible anchor)
- SVG connected-node graph of the **5 default agents** with animated handoff edges
  (`stroke-dashoffset` draw-on, then calm dashed flow). Replaces the current static 4-cell
  `Pipeline.jsx` grid.
- Uses an **explicit, non-colliding** glyph/color table (do NOT blindly copy `theme.rs`; its
  `role_glyph()` collides Planner/Reviewer on `◆` and Red/SecurityAuditor on red).
- Accessibility: nodes `<ol>`-style, `aria-current` on the active node, edges `aria-hidden`,
  `prefers-reduced-motion` shows final static graph.

### Part B — Agent deep-dive (single-active media)
- **Recommended pattern: sticky-media "process" layout.** Left = sticky media panel that shows the
  *active* agent's clip; right = scrollable numbered step list (one block per agent) with explanation.
  Scroll-spy crossfades the active clip; **only one clip plays at a time** (satisfies attention budget,
  WCAG concurrency cap, payload).
- **Fallback pattern: tabbed panel** (one media area; active tab's clip plays; identical dims/framing
  across clips). Use if sticky-scroll proves fragile.
- **Rejected:** a grid of 7 simultaneously autoplaying loops.

### Part C — Opt-in / advanced modes (below the fold, lazy)
- Tabbed/collapsed area: Synthesizer (parallel merge), SecurityAuditor, solo fast-path, custom
  `[pipeline]`, sandbox backends. Each its own clip, lazy-loaded, paused offscreen.

### Cross-cutting requirements
- **Global pause/stop control** for all loops (WCAG 2.2.2). Plus per-section `controls` on the
  `<video>` fallback.
- **`prefers-reduced-motion`** static fallback via `<picture>` source swap (or JS `matchMedia` +
  `change` listener): show poster/first frame, never autoplay.
- **Format:** MP4 (H.264, even dims) + WebM (VP9) primary; GIF only as the hero/fallback. Poster added
  only where the clip is the LCP element (above the fold). `width`/`height` set explicitly.
- **Mobile:** single column, media above/below text, legible fixed column count, 2× export,
  tap-to-play or static poster, **no scrollytelling** on mobile.
- **Honest copy:** Tester framed as "reasons about tests against the diff (simulated)"; Reviewer shows
  Red reconciliation; Red framed as adversarial.

---

## Asset plan (per clip)

| # | Agent | One specific focus | Honest framing |
|---|---|---|---|
| 1 | Planner ◈ | Emits `TaskSpec` (files_to_modify, acceptance) | "Plans — writes no code" |
| 2 | Coder ⟠ | Applies `CodeDiff` to sandbox copy | "Edits the copy, not your tree" |
| 3 | Tester ◉ | Shows `TestReport` | "Reasons about tests vs the diff (simulated)" |
| 4 | Red ✗ | Lists `RedChallenge` items | "Adversarial — finds what others missed" |
| 5 | Reviewer ◆ | `ReviewVerdict` + scores + Red reconciliation | "Approves or bounces back" |
| 6 | Synthesizer ⧉ | Merges parallel coder diffs | opt-in (parallel mode) |
| 7 | SecurityAuditor ⚷ | `SecurityVerdict` findings | opt-in |
| 8 | Solo | single-agent fast-path | trades away Red/Blue |

Each clip: ~4–6 s, ≤ ~400 KB (MP4+WebM), 1200×750 source, JetBrains Mono, dark charcoal `#121111`
TUI frame, matching the existing `demo.gif`.

---

## Generation approach (reusable, brand-matched, no live keys needed)

A renderer script `tools/render_agent_demo.*` that:
1. Paints representative TUI frames with **Pillow + JetBrains Mono** (`tools/fonts/`) — same look as the
   current synthetic `demo.gif`.
2. Encodes MP4 via `ffmpeg` (`-vf "crop=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -pix_fmt yuv420p`)
   and WebM via `ffmpeg` (VP9), plus an optimized GIF via `gifsicle -O3` and a poster PNG.
3. Is parameterized per agent (glyph, color, artifact text) so all 8 clips share one frame system.

Alternative (only if a real capture is desired later): `vhs` tape files producing GIF/MP4/WebM in CI —
requires the live CLI + sandbox + API keys, so not the default for this pass.

---

## Required content fixes (flagged by research, must ship with the section)
- Update `src/components/Pipeline.jsx` copy `Planner → Coder → Tester → Reviewer` → include **Red**
  (default pipeline is 5 agents). Reconcile the static grid to the new SVG map.
- Recommend the product README correct "Tester generates and runs tests" → "reasons about tests" and
  document Red/Blue (on by default). Out of repo scope for the site, but noted for the owner.

---

## Verification criteria (how we'll know it's done)
- Build passes (`npm run build`); no console errors.
- Each agent/mode has its own clip; Part B plays only the active clip at a time.
- Global pause control stops all loops; keyboard-operable.
- `prefers-reduced-motion: reduce` shows static frames, no autoplay.
- Lighthouse: no "Use video formats for animated content"; no LCP regression vs current 271 KB
  baseline (total below-fold payload budget ~2 MB, lazy).
- Mobile (≤390 px): text legible, no scrollytelling, tap-to-play works.
- Copy matches real behavior (5-agent default; Tester simulated).

---

## Open limitations carried from research
- No published A/B or conversion data compares one-GIF-per-agent vs a single summary — recommendation
  rests on pattern frequency + a11y/perf constraints.
- Whether `prefers-reduced-motion` alone satisfies WCAG 2.2.2 is a live debate; we do not rely on it.
- `<video>` vs animated AVIF/WebP for many small terminal loops is contested; MP4+WebM+GIF chosen for
  glyph fidelity.
- "Specialty" is not a repo term; mapped here to opt-in agents/modes.
