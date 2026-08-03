# Product Hunt Launch Plan: Niki for Code

## Summary

Prepare `niki-site` for a Product Hunt launch in 4-6 weeks, positioning Niki as an open-source, self-hosted multi-agent coding system with an optional managed-cloud beta. The Product Hunt listing title will be **Niki for Code** to avoid collision with the unrelated existing "Niki" shopping product. The target is qualified self-hosted installs, not raw waitlist volume.

## Marketing Site

- Replace every `niki.ai` reference with `https://niki-site.vercel.app/` in canonical tags, sitemap, robots, JSON-LD, Open Graph, Twitter cards, manifest, and `llms.txt`. Do not launch while any public link points to the parked `niki.ai` domain.
- Remove the incorrect Product Hunt link everywhere. Add the new Product Hunt URL only after its maker-owned draft is verified.
- Rebuild the homepage around one conversion hierarchy: **Install Niki** as primary, **Watch real run** as secondary, and **Join cloud beta** as tertiary.
- Preserve the technical terminal identity, but make it agency-grade through a stronger visual system: real run footage, artifact/diff previews, pipeline visualization, clear outcome before/after, developer workflow proof, consistent type/layout rhythm, polished interactive states, and mobile-first spacing.
- Add a real demo section: task prompt, live CLI sequence, generated branch, test result, reviewer verdict, and inspectable `report.md`/diff screenshots from one reproducible run.
- Replace generic feature claims with evidence-linked proof. Every visible capability claim must match a reproducible repository demo or release documentation.
- Add dedicated sections for who Niki is for, when not to use it, supported environments/providers, security boundaries, expected setup time, and FAQ objections.
- Create a plain-language privacy page covering Formspree and Vercel Analytics. Route support to GitHub Issues/Discussions and link both from the footer and waitlist confirmation.
- Keep the waitlist only for managed-cloud beta; clearly state that self-hosted Niki is available immediately.

## Conversion, Measurement, and Technical Quality

- Instrument a funnel for hero CTA, install-tab selection, command copy, GitHub click, demo playback/completion, cloud-beta start/submit, and Product Hunt referral traffic.
- Add UTM preservation and a Product Hunt-specific referral view so installs and beta submissions can be attributed to launch traffic.
- Ensure stable social previews using a real raster 1200x630 launch image rather than the current SVG, with a distinct launch message and readable mobile-safe text.
- Run production checks for Lighthouse performance, accessibility, SEO, keyboard navigation, reduced motion, form errors, and browser/mobile viewport screenshots.
- Verify Vercel production deployment, canonical redirects, sitemap availability, social-preview scraping, Formspree delivery, analytics events, and GitHub support links before submission.

## Product Hunt Assets and Operations

- Create the new maker-owned draft under a personal Product Hunt account with the direct Vercel landing-page URL, title **Niki for Code**, concise developer-focused tagline, relevant topics, maker profiles, and the correct product category.
- Produce a launch asset pack: logo/icon, five or more authentic product-gallery images, short demo video, animated workflow capture where useful, maker first comment, FAQ answers, and approved response templates for common installation/security/pricing questions.
- Submit only after the self-hosted v2 path is publicly usable. Product Hunt favors live products; an email-only launch is not eligible for featured placement.
- Schedule a full 24-hour maker coverage rota: publish at the selected Product Hunt day boundary, post the prepared maker comment immediately, respond substantively to every comment, help installation blockers, and share the launch link through legitimate community channels without asking for votes.
- Treat Product of the Day as an outcome, not a guarantee. Optimize for authentic comments, completed installs, clear proof, and fast maker interaction; avoid coordinated or incentivized voting.

## Main Repository Recommendations

- Publish a tagged, reproducible v2 release with release notes, checksum/binary or clearly reliable build path, and a tested quick-start that a new developer can complete from scratch.
- Make the README launch-ready: one-minute value proposition, short demo GIF/video, exact prerequisites, install/run/verify commands, troubleshooting, supported platforms, provider-cost guidance, and clear prototype limitations.
- Add a "Product Hunt demo" fixture repository or scripted demo so every visual claim can be regenerated consistently.
- Maintain visible issue templates, a launch support label, contribution guidance, security reporting instructions, and a short roadmap that distinguishes shipped v2 features from cloud-beta plans.
- Ensure CI is green on the supported install paths and publish a concise verification matrix for Rust, container runtime, operating system, and provider combinations.

## Test Plan

- Validate every site CTA reaches the intended install, demo, beta, support, or Product Hunt destination.
- Test the install flow from a clean machine or environment and confirm the demo produces the advertised branch, tests, review output, and artifacts.
- Capture visual regression screenshots across desktop and mobile, including the fixed nav, launch hero, video/demo, waitlist, footer, and dark mode.
- Verify metadata and structured data against the deployed Vercel URL, then validate Product Hunt gallery/video rendering and maker-account ownership before scheduling.

## Assumptions

- `https://niki-site.vercel.app/` is the final public launch URL for this release.
- Niki's current multi-agent, sandbox, BYOK, branch, and artifact claims will be verified against a reproducible demo before publication.
- The public offer is self-hosted v2 now, with managed-cloud beta access collected through the waitlist.
- The main repository remains recommendation-only; no repository download or edits are part of this plan.
