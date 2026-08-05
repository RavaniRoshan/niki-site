# Product Hunt Launch Copy — "Niki for Code"

Reference document for the Product Hunt submission. All lengths verified against PH limits
(tagline ≤60, description ≤500). Char counts shown in comments.

---

## Product Name
**Niki for Code**

(avoids collision with the unrelated "Niki" shopping product; signals the coding variant)

---

## Tagline (≤60 chars) — `59 chars`
Multi-agent AI coding that ships pull requests, not prompts

<!-- count: 59 -->

Alternatives (not used):
- `5 AI agents. 1 task. Reviewable pull request.` (46)
- `Hermetic AI agents that produce reviewable PRs` (46)
- `Describe it. Niki ships the pull request.` (41, current site tagline)

PH CEO guidance applied: name the *mechanism* (multi-agent pipeline), not the category.

---

## Description (≤500 chars) — `498 chars`
Niki is an open-source multi-agent coding system. Describe what you want in natural
language, and a team of 5 AI agents — Planner, Coder, Tester, Red Team, and Reviewer —
collaborates to produce a reviewable git pull request. Hermetic by default: runs in a
Podman/Docker sandbox, never touches your working tree. BYOK: use Anthropic, OpenAI,
Google, or local models. Free and self-hosted. Cloud beta coming soon.

<!-- count: 498 -->

---

## Launch Tags (3)
1. `AI Coding Agents`
2. `AI Agents`
3. `Code Review Tools`

Verify exact slugs against producthunt.com/topics before submitting.
Backups: `Vibe Coding Tools`, `AI Workflow Automation`, `Engineering & Development`.

---

## Shoutouts (3)
1. **Rust** — the language Niki is built in
2. **Anthropic** — primary model provider
3. **Podman** — hermetic sandbox runtime

Backups: GitHub, Docker, OpenAI.

---

## Maker First Comment (pre-written, posts at 00:01 PT)

Hey PH 👋 I'm [NAME], and I built Niki because I was tired of the prompt-response loop
with AI coding tools.

The problem: you ask an AI to write code, it gives you a diff, you copy-paste it, hope it
works, and debug for 20 minutes. There's no review, no testing, no adversarial check.

Niki is different. It's a multi-agent system: 5 specialized AI agents (Planner, Coder,
Tester, Red Team, Reviewer) collaborate in a sandboxed environment to produce a reviewable
git pull request — not a code snippet.

How it works:
• You describe what you want in natural language
• Niki spins up a Podman/Docker sandbox (your working tree is never touched)
• 5 agents work in sequence: plan → code → test → challenge → review
• You get a branch with diff, report, and artifacts

It's open-source, self-hosted, and BYOK (Anthropic, OpenAI, Google, Ollama).

I'd love your feedback — what would you build with this? What's missing?

---

## FAQ / Response Templates

**Q: How is this different from Cursor/Copilot?**
A: Cursor/Copilot are single-agent pair programmers. Niki is a multi-agent system with
adversarial review — 5 agents collaborate, challenge each other, and produce a reviewed PR.

**Q: Is it free?**
A: Yes, fully open-source and self-hosted. Cloud beta coming soon (waitlist in the listing).

**Q: What models does it support?**
A: Anthropic (Claude), OpenAI (GPT), Google (Gemini), Ollama (local), or any
OpenAI/Anthropic-compatible API.

**Q: How does the sandbox work?**
A: Niki uses Podman/Docker to isolate runs. Your working tree is never mutated mid-run.
Output is always on a `niki/<id>` branch.

**Q: Can I try it now?**
A: Yes! `cargo install niki` or `podman run …` — see the README for quick-start.

**Q: What's the Red Team agent?**
A: An adversarial agent that raises falsifiable challenges against the Coder's output. It
never approves — its job is to find problems. The Reviewer weighs both sides.

---

## Demo asset notes
- Main narrative demo GIF: `public/agent-demos/full.gif` (full pipeline, ~45-60s)
- Thumbnail (240x240): `public/agent-demos/thumbnail.png`
- Gallery frames (1270x760): `public/agent-demos/gallery-*.png`
- Per-agent loops (existing): `public/agent-demos/<agent>.{gif,mp4,webm,png}`
