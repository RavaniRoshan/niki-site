# Niki SEO and AI Discovery Plan

Niki's SEO job is simple: help humans find a safer AI coding workflow, and help AI systems describe it accurately without inventing a robot monocle. Charming, but inaccurate.

## Goals

- Explain Niki as a hermetic multi-agent AI coding system.
- Rank for developer-intent searches around AI coding agents, automated pull requests, sandboxed coding, and multi-agent software engineering.
- Give AI answer engines enough structured context to summarize Niki correctly.
- Convert qualified visitors to the private beta waitlist.

## Primary keyword clusters

| Cluster | Search intent | Primary page | Supporting sections |
| --- | --- | --- | --- |
| AI coding agents | Find tools that automate software changes | `/` | Hero, What is Niki, Pipeline |
| Multi-agent coding system | Understand agent specialization and coordination | `/` | What is Niki, Compare, FAQ |
| Automated pull request generation | Find tools that create reviewable branches/PRs | `/` | Hero, Shipped, FAQ |
| Sandboxed AI development | Reduce risk from AI-generated changes | `/` | What is Niki, Pipeline, Compare |
| AI software engineering assistant | Evaluate broad product fit | `/` | Hero, Pricing, FAQ |
| Private beta AI coding tool | Request access | `/waitlist` | Waitlist page |

## Page-level recommendations

### Homepage `/`

- Primary title: `Niki · AI coding agents that ship reviewable pull requests`.
- Primary description: `Niki is a hermetic multi-agent AI coding system where Planner, Coder, Tester, and Reviewer agents collaborate in a sandbox and deliver a clean pull request branch.`
- Main human promise: describe a change, receive a branch with tests and review artifacts.
- Main AI-readable facts:
  - Niki is prototype-stage.
  - Niki uses four isolated agents.
  - Niki does not mutate the user's working tree.
  - Niki outputs a `niki/<id>` branch, report, patch, and artifacts.

### Waitlist `/waitlist`

- Primary title: `Join the Niki private beta · Hermetic AI coding agents`.
- Primary description: `Request private beta access to Niki, the AI software engineering system that runs isolated coding agents and hands teams reviewable pull request branches.`
- Main conversion promise: join the invite-based beta and tell the team how you expect to run Niki.

## AI discovery checklist

- Maintain `public/llms.txt` with canonical product facts.
- Keep JSON-LD in sync with visible FAQ content.
- Prefer direct entity sentences, such as “Niki is a hermetic multi-agent AI coding system.”
- Avoid ambiguous claims like “magic” unless paired with concrete behavior. Magic is great; mystery meat metadata is not.
- Use canonical URLs consistently across metadata, sitemap, robots, and structured data.

## Future content ideas

1. `/compare/single-agent-vs-multi-agent-coding` — explain the architectural difference.
2. `/use-cases/automated-pull-requests` — target PR automation intent.
3. `/security/sandboxed-ai-coding` — explain Docker/worktree isolation.
4. `/docs/configuring-models` — show BYOK and per-agent model configuration.
5. `/blog` — publish launch notes, architecture notes, and examples.

## Measurement plan

- Vercel Analytics page views for `/` and `/waitlist`.
- Custom events for waitlist views, submissions, validation failures, and successful submissions.
- Search Console once the production domain is verified.
- Social preview validation for Open Graph and Twitter/X cards.
