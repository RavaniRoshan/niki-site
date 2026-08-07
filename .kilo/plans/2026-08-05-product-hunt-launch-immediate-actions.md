# Plan: Niki for Code — Product Hunt Launch Immediate Actions

**Goal:** Prepare positioning, assets, and first comment for a Product Hunt launch of "Niki for Code"
**Depth:** Immediate next actions (not a full launch timeline)
**Reference style:** charmbracelet/crush + claude-code terminal GIFs via VHS
**Constraint:** Demo must be a single "full-fledged" GIF (not Loom), replicating a video with deep narrative flow

---

## Phase 1: Positioning (do first — gates everything)

### 1.1 Product Name
**Use:** `Niki for Code`
- Avoids collision with the unrelated "Niki" shopping product on PH
- Clear category signal (this is the coding variant)
- Matches existing plan: `plans/2026-08-03-niki-for-code-product-hunt-launch.md`

### 1.2 Tagline (≤60 chars)
**Recommended:** `Multi-agent AI coding that ships pull requests, not prompts` (58 chars)

**Alternatives (pick one):**
| Tagline | Chars | Notes |
|---------|-------|-------|
| `Multi-agent AI coding that ships pull requests, not prompts` | 58 | Names mechanism + differentiates from chat tools |
| `5 AI agents. 1 task. Reviewable pull request.` | 46 | Concrete, numeric, outcome-first |
| `Hermetic AI agents that produce reviewable PRs` | 46 | Technical, emphasizes sandbox safety |
| `Describe it. Niki ships the pull request.` | 41 | Current tagline — simple, proven |

**PH CEO guidance applied:** Names the *mechanism* (multi-agent pipeline), not the category ("AI agent studio"). Avoids "world's first" and buzzwords.

### 1.3 Description (≤500 chars)
**Recommended:**
```
Niki is an open-source multi-agent coding system. Describe what you want in natural language, and a team of 5 AI agents — Planner, Coder, Tester, Red Team, and Reviewer — collaborates to produce a reviewable git pull request. Hermetic by default: runs in a Podman/Docker sandbox, never touches your working tree. BYOK: use Anthropic, OpenAI, Google, or local models. Free and self-hosted. Cloud beta coming soon.
```
(498 chars)

### 1.4 Launch Tags (3)
Verify slugs against producthunt.com/topics before submitting. Likely candidates:
1. `AI Coding Agents`
2. `AI Agents`
3. `Code Review Tools`

**Backup options:** `Vibe Coding Tools`, `AI Workflow Automation`, `Engineering & Development`

### 1.5 Shoutouts (3)
Free cross-promo — vendors may retweet your launch:
1. **Rust** (the language Niki is built in)
2. **Anthropic** (primary model provider)
3. **Podman** (hermetic sandbox runtime)

**Alternative:** GitHub (for open-source hosting), Docker, OpenAI

---

## Phase 2: Demo GIF — "Full-Fledged Video-Like GIF"

This is the centerpiece asset. The user wants a **narrative-driven GIF** that tells the complete Niki story — not a 10-second feature snippet, but a 30-60 second "movie" showing the full agent pipeline from natural language to pull request.

### 2.1 Tool: VHS by charmbracelet
- **Why:** Scripted `.tape` files = reproducible, version-controlled, CI-friendly
- **Install:** `brew install vhs ttyd ffmpeg` (or `go install github.com/charmbracelet/vhs@latest`)
- **Output:** GIF + MP4 from the same tape

### 2.2 Visual Style (inspired by crush + claude-code)

| Property | Value | Rationale |
|----------|-------|-----------|
| **Dimensions** | 1270×760 | Product Hunt gallery spec |
| **Font** | JetBrains Mono, 22px | Developer-focused, excellent legibility |
| **Theme** | Catppuccin Mocha | Warm, modern, high contrast on dark |
| **Window bar** | Colorful (macOS traffic lights) | Polished "floating window" look |
| **Border radius** | 10px | Soft, modern |
| **Margin** | 0 (fill = theme bg) | Clean edge-to-edge |
| **Padding** | 30px | Breathing room |
| **Framerate** | 24 FPS | Smooth, manageable file size |
| **Typing speed** | 40ms/char | Natural, not sluggish |
| **Cursor blink** | true | Authentic feel |
| **Playback speed** | 1.0x | Real-time for narrative |
| **Loop offset** | 30% | Start on an interesting frame, not blank |

### 2.3 GIF Content — The Narrative Arc

The GIF should tell a **complete story** in ~45-60 seconds:

**Scene 1: The Ask (0-5s)**
```
$ niki "Add a GET /health endpoint with JSON response and 200 status"
```
- User types a natural language request
- Clean prompt, no boilerplate

**Scene 2: Agent Pipeline Initializes (5-12s)**
```
◈ Planning...     Planner reads task, emits TaskSpec
⟠ Coding...       Coder produces unified diff in sandbox
◉ Testing...      Tester reasons about test coverage
✗ Challenging...  Red team raises falsifiable objections
◆ Reviewing...    Reviewer weighs Coder vs Red, approves
```
- Show each agent glyph + name + action
- Use Niki's actual colors: blue `#3b9eff`, pink `#ff5cc8`, green `#30d158`, red `#ff453a`, yellow `#ffd60a`
- Each agent step gets 2-3 seconds

**Scene 3: The Diff (12-20s)**
```
✓ Branch created: niki/add-health-endpoint

  src/routes/health.rs | 12 ++++++++++++
  1 file changed, 12 insertions(+)

  @@ -0,0 +1,12 @@
  +use actix_web::{get, HttpResponse, Responder};
  +
  +#[get("/health")]
  +async fn health() -> impl Responder {
  +    HttpResponse::Ok().json(serde_json::json!({
  +        "status": "ok",
  +        "version": env!("CARGO_PKG_VERSION")
  +    }))
  +}
```
- Show the actual diff with line numbers
- Show the branch name
- Show file changes summary

**Scene 4: The Report (20-30s)**
```
✓ Report: report.md
  - Task: Add GET /health endpoint
  - Agents: Planner → Coder → Tester → Red → Reviewer
  - Red challenges: 2 raised, 2 resolved
  - Test coverage: 100% of new code
  - Status: APPROVED

✓ Artifacts: artifacts/task.json, artifacts/diff.json
```
- Show the audit trail
- Show challenge resolution
- Show approval status

**Scene 5: Ready to Ship (30-35s)**
```
  git checkout niki/add-health-endpoint
  git diff main...niki/add-health-endpoint

  → Review the branch. Merge when ready.
```
- Clean exit state
- Clear next step

**Scene 6: Loop (35s+)**
- GIF loops back to Scene 1

### 2.4 VHS Tape Script (template)

```tape
Output niki-demo.gif
Output niki-demo.mp4

Set Width 1270
Set Height 760
Set FontSize 22
Set FontFamily "JetBrains Mono"
Set Theme "Catppuccin Mocha"
Set TypingSpeed 40ms
Set Framerate 24
Set Padding 30
Set Margin 0
Set MarginFill "#1E1E2E"
Set BorderRadius 10
Set WindowBar Colorful
Set CursorBlink true
Set PlaybackSpeed 1.0
Set LoopOffset 30%

# --- Hidden: setup ---
Hide
Sleep 500ms
Show

# --- Scene 1: The Ask ---
Type "niki "
Type@40ms '"Add a GET /health endpoint with JSON response and 200 status"'
Enter
Sleep 3s

# --- Scene 2: Agent Pipeline ---
# (This depends on how Niki's actual output looks — 
#  capture a real run and adapt the tape)

# --- Scene 3: The Diff ---
# (Show branch name, file changes, diff)

# --- Scene 4: The Report ---
# (Show report.md contents)

# --- Scene 5: Ready to Ship ---
Type "git checkout niki/add-health-endpoint"
Enter
Sleep 2s

# --- Loop ---
Sleep 2s
```

### 2.5 Critical: Capture Real Output First

**Before writing the tape, run a real Niki task and capture the terminal output.** The GIF must show *authentic* Niki output, not mockups. Steps:

1. Run `niki "Add a GET /health endpoint..."` on a real project
2. Capture the full terminal output (use `script` or `asciinema`)
3. Study the exact formatting, colors, agent glyphs, diff style
4. Write the VHS tape to match the real output exactly

### 2.6 File Size Optimization

PH limits GIFs to 3MB. A 45-60s GIF at 1270×760 will exceed this without optimization:

```bash
# Step 1: Generate high-quality GIF
vhs niki-demo.tape

# Step 2: Optimize with gifsicle
gifsicle --optimize=3 --lossy=80 niki-demo.gif -o niki-demo-optimized.gif

# Step 3: If still too large, reduce FPS or trim
ffmpeg -i niki-demo.gif -vf "fps=15" niki-demo-15fps.gif

# Step 4: Also produce MP4 (smaller, autoplay on most platforms)
# MP4 is not limited to 3MB on PH gallery
```

**Fallback:** If the full narrative GIF can't fit in 3MB, split into:
- **Primary:** 1270×760 MP4 (no size limit on PH for video)
- **Secondary:** 960×540 GIF for README/GitHub (5MB limit)

---

## Phase 3: Gallery Frames (5-8 images, 1270×760 each)

Each frame = one idea. Order matters (first frame = first impression).

| # | Frame | Content | Notes |
|---|-------|---------|-------|
| 1 | **Hero / Positioning** | "Describe it. Niki ships the pull request." + terminal mockup showing agent pipeline | First impression — make it count |
| 2 | **The Ask** | User types natural language request in terminal | Shows simplicity |
| 3 | **Agent Pipeline** | 5 agents running: Planner → Coder → Tester → Red → Reviewer | Shows the mechanism |
| 4 | **The Diff** | Actual code diff with line numbers, branch name | Shows real output |
| 5 | **The Report** | audit trail, challenge resolution, approval status | Shows transparency |
| 6 | **Hermetic Sandbox** | Diagram: Podman/Docker isolation, working tree untouched | Shows safety |
| 7 | **BYOK** | Provider logos: Anthropic, OpenAI, Google, Ollama | Shows flexibility |
| 8 | **Open Source** | GitHub repo, MIT/BUSL license, self-hosted | Shows trust |

**Production method:** Use the same VHS tape approach, or create static frames in Figma/Canva at 1270×760. Export as PNG (not GIF — PH gallery images should be static PNGs, not animated GIFs, for faster loading).

---

## Phase 4: Thumbnail (240×240)

- **Format:** PNG, <3MB
- **Content:** Niki logo/icon on a dark background
- **Style:** Clean, recognizable at small size
- **Font:** JetBrains Mono or Niki's brand font
- **Colors:** Catppuccin Mocha palette or Niki's brand colors

---

## Phase 5: First Comment (pre-written, ≤500 chars)

PH's first comment is the single best-evidenced lever (70% of winners had one). Pre-write it in the submission flow so it publishes at 00:01 PT.

**Structure:** Personal story → problem → solution → what's different → CTA (feedback, not upvotes)

**Draft:**
```
Hey PH 👋 I'm [Name], and I built Niki because I was tired of the prompt-response loop with AI coding tools.

The problem: you ask an AI to write code, it gives you a diff, you copy-paste it, hope it works, and debug for 20 minutes. There's no review, no testing, no adversarial check.

Niki is different. It's a multi-agent system: 5 specialized AI agents (Planner, Coder, Tester, Red Team, Reviewer) collaborate in a sandboxed environment to produce a reviewable git pull request — not a code snippet.

How it works:
• You describe what you want in natural language
• Niki spins up a Podman/Docker sandbox (your working tree is never touched)
• 5 agents work in sequence: plan → code → test → challenge → review
• You get a branch with diff, report, and artifacts

It's open-source, self-hosted, and BYOK (Anthropic, OpenAI, Google, Ollama).

I'd love your feedback — what would you build with this? What's missing?
```

---

## Phase 6: FAQ / Response Templates

Pre-write answers for common PH comments:

| Question | Response |
|----------|----------|
| "How is this different from Cursor/Copilot?" | Cursor/Copilot are single-agent pair programmers. Niki is a multi-agent system with adversarial review — 5 agents collaborate, challenge each other, and produce a reviewed PR. |
| "Is it free?" | Yes, fully open-source and self-hosted. Cloud beta coming soon (waitlist in the listing). |
| "What models does it support?" | Anthropic (Claude), OpenAI (GPT), Google (Gemini), Ollama (local), or any OpenAI/Anthropic-compatible API. |
| "How does the sandbox work?" | Niki uses Podman/Docker to isolate runs. Your working tree is never mutated mid-run. Output is always on a `niki/<id>` branch. |
| "Can I try it now?" | Yes! `cargo install niki` or `podman run ...` — see the README for quick-start. |
| "What's the Red Team agent?" | An adversarial agent that raises falsifiable challenges against the Coder's output. It never approves — its job is to find problems. The Reviewer weighs both sides. |

---

## Open Questions for the User

1. **Tagline:** Which of the four options resonates? Or do you want to iterate?
2. **Demo GIF task:** What specific Niki task should the GIF demo? (e.g., "Add GET /health", "Fix the login bug", "Add dark mode") — needs to be a real, reproducible run.
3. **Agent colors:** The existing components use specific colors per agent (blue/pink/green/red/yellow). Should the GIF match these exactly?
4. **Shoutouts:** Rust + Anthropic + Podman — or different picks?
5. **Gallery frames:** Static PNGs or should some be animated GIFs?
6. **Timeline:** How soon do you want the demo GIF and gallery frames ready?

---

## Execution Order

1. **Immediate (today):** Confirm tagline, description, tags, shoutouts
2. **Day 1-2:** Set up VHS, run a real Niki task, capture output
3. **Day 2-3:** Write VHS tape, produce demo GIF, optimize for PH
4. **Day 3-4:** Create 5-8 gallery frames (static PNGs)
5. **Day 4-5:** Create 240×240 thumbnail
6. **Day 5:** Pre-write first comment + FAQ templates
7. **Day 6:** Test everything against PH submission form
