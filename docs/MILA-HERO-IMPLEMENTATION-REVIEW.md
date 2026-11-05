# CLONELY FANZ / Mila cinematic hero implementation

**Status:** Implemented on PR #39 feature branch; not merged; not deployed; media still awaiting visual QA.
**Date:** 2026-11-05
**Production gate:** OFF by default for draft media.

## Code delivered
- `src/components/landing/CinematicHero.tsx`: HTML copy, HTML-based exact branded wordmark, CSS vector lacquer kiss, video-clock event, replay button, reduced-motion and error fallback, IntersectionObserver pause/resume, one-time session replay behavior.
- `src/components/landing/cinematic-hero.css`: full-screen 16:9 video composition, crimson sculptural kiss-to-screen motion, elegant impact and deterministic wordmark reveal, mobile layout.
- `src/components/landing/LandingPage.tsx`: mounts the new component while preserving 21+ self-attestation, AI disclosure, offsite Fanvue URL validation, internal links, editorial sections.
- `src/components/landing/landing-page.css`: scoped AFTER DARK typography and branding polish.

## Media receipts
- Mila CC-001 eight-second 720p 16:9 generation, Higgsfield Seedance 2.5, job `aec257c7-b66c-45d0-8aaa-aad101695819`, **completed**. Draft URL: `https://d8j0ntlcm91z4.cloudfront.net/user_33irX78ICVwRYWpFZ5l6a5vZbf5/hf_20261105_053425_aec257c7-b66c-45d0-8aaa-aad101695819.mp4`. Quoted 56 credits. Canonical single image media reference `d981bf7c-3fa5-4708-bb52-328ff6e51273`.
- Four-second atmospheric logo ident Higgsfield job `fa10a341-075a-4ecd-8b86-ac08036d47f7`, completed but **not integrated**; pending editorial review.
- Hyperframes integration **not claimed**. Exact motion layer implemented locally as transparent SVG/CSS, avoiding generated misspelled logo text and adding no dependency.

## Enable reviewer preview
```sh
VITE_MILA_HERO_PREVIEW=true npm run dev
```
Only the explicit `VITE_MILA_HERO_PREVIEW=true` build is allowed to use the vendor-hosted draft clip. The default build does not load the draft URL. For a later approved production release, set `VITE_MILA_HERO_VIDEO_URL` to an approved, owner-controlled HTTPS MP4 asset and `VITE_MILA_CANON_HERO_URL` to an approved still/poster. These public `VITE_` values are not secrets. No draft is allowed in production by simply importing the component.

## Timeline to calibrate against inspected actual frames
- At **5.55s** the first kiss graphic triggers. `cf-fly` enlarges the lacquer emblem for 0.9s.
- At **6.30s** the impact bloom starts, followed by exact deterministic wordmark reveal at **6.50s**.
- The reveal fades before the video's 8s loop restart.
- Trigger is deliberately once per session; replay button resets session state for deliberate repetition.
- **Important:** actual video frames were not inspected: media host not reachable from available runtime; timing must be visually reviewed and adjusted after watching footage. These timestamp choices are not claimed to match actual lips/hands yet.

## Acceptance / proof
Static source readback checks passed: component import, age gate, no old fake hero stage, validated Fanvue URL, reduced motion behavior, deterministic logo spelling, event-driven kiss timing, session replay and media-error fallback. **Not yet tested**: `tsc`, full `vite build`, ESLint, browser animation and responsive screenshots, media QA, visual lip alignment, performance, regional legal assurance, independent reviewer. This PR remains a draft; Vercel deployment account has been blocked before.

## Open QA
1. Independently inspect Mila draft frame by frame against Crypto Cuties character quality gate (eyes, face, hair, jewelry, hands, pose, kiss clarity, source rights).
2. Acquire an approved poster and move approved video to owner-controlled storage with hash, optimize bitrate.
3. Run `npm ci`, `npm run build` (note repo script currently uses `tsc ; vite build` so TypeScript failures do not fail build step), `npm run lint`, responsive real browser and reduced-motion test. Treat TypeScript separately with `npx tsc --noEmit`.
4. Correct the kiss timing to match the rendered footage and test restart behavior.
5. Have a fresh-context independent reviewer check safety, accessibility and visual quality.
6. Owner approval then separate merge/deploy action. Roll back by disabling `VITE_MILA_HERO_VIDEO_URL` or reverting hero component in PR; preserve previous `main` baseline.

No deployment or merge performed.
