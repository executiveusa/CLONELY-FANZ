# CLONELY FANZ — Emil Kowalski Full Audit Remediation

Status: **Code repaired on draft PR #39; production release NOT authorized.**
Date: 2026-11-05
Source: emilkowalski/skills (design engineering, animation review, choreography, performance, mobile native).
Branch: `feat/clonely-mila-studio-pivot-20261104`.

## Decision
USE Emil's design skills as design-review criteria, not as a new runtime dependency. Keep Mila as the only public creator. Private studio code remains in this repository but is excluded from public entrypoint, typecheck, and bundle; its original full typecheck has historical failures and must not be treated as production-ready.

## Changes implemented (audit findings)
1. **Video clock:** source MP4 remains canonical. A `KISS_CUE_SECONDS` timestamp controls one animation event. A configurable `VITE_MILA_KISS_CUE_SECONDS` allows frame-accurate calibration (0–7 seconds).
2. **Transparent WebM drift:** optional HyperFrames overlay preloads hidden, seeks to `baseVideo.currentTime - cue`, corrects drift >140ms, pauses when base pauses/offscreen, ends when sequence completes, and can fail over to CSS.
3. **Replay lifecycle:** explicit `idle → active → complete` phase, one-shot session flag, reset on looping/seek/replay, autoplay-blocked manual play control.
4. **Still fallback:** canonical approved poster via `VITE_MILA_CANON_HERO_URL`; review-only single Mila canonical reference when `VITE_MILA_HERO_PREVIEW=true`. Reduced motion disables video and flying overlay.
5. **One motion owner:** reusable editable HyperFrames HTML and alpha WebM option, with deterministic CSS/SVG backup only. No additional runtime animation dependency.
6. **Brand consistency:** replaced old dense landing CSS with AFTER DARK tokens and editorial Didot/Georgia fallbacks. Removed obsolete Impact hero styling.
7. **Motion performance:** removed animated blur from the site and HyperFrames GSAP timeline; used transform and opacity instead, and constrained `will-change` to moving elements.
8. **Input polish:** hover effects gated behind fine pointers; touch action and short `:active` feedback; responsive sizing and safe-area padding.
9. **Public package:** removed the global React SplashCursor and unnecessary development Tempo code; removed Tempo's React Router 6 peer dependency conflict and reconciled the lockfile.
10. **SEO and source trust:** replaced generic meta text, branded SVG favicon, set noindex while preview remains unreleased; removed injected Tempo external script.
11. **Route isolation:** public build now imports only the public home and landing page; legacy dashboard, pricing, crypto, social and other code remain unshipped, not silently called secure. Server-side enforcement and a future dedicated private studio app require separate audit.
12. **Age gate:** session check now runs before first paint, preventing a flash of the gated page. Keyboard focus goes to the public header after acknowledgement. This is still self-attestation, not regional legal age verification.
13. **Build correctness:** removed Tailwind v3-style PostCSS processing against v4; public uses dedicated CSS. Build is `npm run typecheck && vite build` and typecheck is scoped to the actual public entry. Historical legacy errors remain reported via `npm run typecheck:legacy` rather than hidden by modifying deprecated code blindly.
14. **CI:** new GitHub Actions workflow installs dependencies without peer bypass, typechecks public entry, builds, runs source release assertions, and smoke tests served Vite output over HTTP.

## Verified CI proof
Run `42108074526`: `npm ci`, public `tsc -p tsconfig.public.json --noEmit`, Vite build, static release assertions — **all passed**. Later workflow adds an HTTP smoke test; record the newest successful run separately. CodeRabbit earlier reported success; there are no human reviewers attached yet.

## Required reviewer checks that code alone cannot prove
- **Mila film:** compare the submitted 8-second Higgsfield clip frame by frame against canonical identity and the actual kiss moment; tune `VITE_MILA_KISS_CUE_SECONDS`. Do not claim exact synchronization before video inspection.
- **HyperFrames render:** one rendered alpha WebM exists in the local review package, not in GitHub/CDN. Host an approved hash-verified asset in owner-controlled media storage; set `VITE_KISS_OVERLAY_VIDEO_URL` for preview. CLI render/lint/validate/inspect was not available in this runtime.
- **Real browser/device:** check desktop Chromium/Safari/Firefox, 320px and 390px phones, notches, taps, overlay transparency and fallback, text contrast, reduced-motion, age gate focus, video stalls, and keyboard operation.
- **Security/legal:** server-side permission policies for eventual private studio, real regional age assurance obligations, rights to Mila reference assets, and publishing-platform rules. The public page has no payment or live Fanvue link unless approved.
- **Deployment:** Vercel account status still reports failure; neither connected Vercel profile returned a project matching 'clonely' by name. No preview URL or production verification can be claimed from this audit.

## Local preview configuration
```env
VITE_MILA_HERO_PREVIEW=true
# optional if alpha WebM is uploaded and approved:
VITE_KISS_OVERLAY_VIDEO_URL=https://owner-controlled-media.example/review/kiss.webm
# optional: set after frame inspection:
VITE_MILA_KISS_CUE_SECONDS=5.45
```
All `VITE_` values are public build-time configuration, never credentials.

## Release gate
- Green CI for the exact PR SHA, with HTTP smoke step.
- Independent reviewer checks animations, accessibility and production risk.
- Final asset hosted on owner-controlled CDN/storage with metadata and source hashes.
- Owner approves Mila visual identity and final animation timing.
- Owner explicitly authorizes merge and deployment.

## Rollback
No merge or deployment occurred. Keep `main` unchanged. If reviewed animation quality is poor, leave `VITE_KISS_OVERLAY_VIDEO_URL` unset and use deterministic fallback. If media is not approved, unset `VITE_MILA_HERO_PREVIEW` and `VITE_MILA_HERO_VIDEO_URL`. To revert code, revert the feature branch commits or close PR #39.

## Commercial impact
No sales or Fanvue revenue observed. The fixed public path is a more credible first brand experience, but conversions require verified Fanvue onboarding, analytics, and consent/compliance approval before any public promotion.
