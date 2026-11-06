# 03 — CLONELY FANZ: Frontend integration, mobile verification and release plan
**Mode:** Brownfield. **Source repo:** `executiveusa/CLONELY-FANZ` (public), `main` plus reversible feature branch. **Hosting:** existing owner-controlled Vercel project `clonely-fanz`. **Outcome:** A 21+ visitor can watch, skip, replay, and understand Mila's short intro on a 320px phone, with genuine head/heel framing, mouth-synced kiss, readable centered wordmark and clear next action. **Content policy:** LOCKED visual identity and brand; specifically approved new hero host story only. **Commercial proof:** real private-studio inquiry destination and measured usage, not invented revenue.

## Current system — inspected 2026-11-06
- `package.json`: Vite 8, React 19, React Router 7, TypeScript public build. Scripts `npm run build`, `npm run audit:landing`, `npm run typecheck`. Don't add new animation libraries.
- `src/components/landing/LandingPage.tsx`: 21+ gate, session confirmation, header, hero, Meet Mila feature, collections, disclosure, footer. Age gate is a **self-attestation only**; it is not identity verification.
- `src/components/landing/CinematicHero.tsx`: current `canPlay` gate, video `currentTime` kiss cue, sessionStorage “seen”, replay, reduced-motion test, fallback.
- `src/components/landing/cinematic-hero.css`: existing contain positioning, CSS fallback kiss SVG, possible WebM overlay, `cf-wordmark`. Wordmark last-child currently applies `margin-left:.27em` while header/footer have other overrides; a common component-level fix is needed.
- Current draft video is external CloudFront media gated by `VITE_MILA_HERO_PREVIEW`. No production approval. Existing preview / production domains require verification; Vercel SSO is expected.
- Fanvue is `NOT_CONNECTED`; agent research `disabled`; no real earnings.

### Architecture / truth map
| Surface | Component | Handler | Destination | State |
|---|---|---|---|---|
| 21+ acknowledgment | LandingPage | `confirmAge` | local session state | PARTIAL: must verify on real mobile |
| Hero playback | CinematicHero | video `play/onTimeUpdate` | approved owned-media URL | PARTIAL: source clip fails head/heel QA |
| Kiss/wordmark | CinematicHero + CSS | clock cue and overlay | on-page visual | BROKEN: effect's spatial origin relative to lips |
| Replay | CinematicHero | `replay` | local media state | PARTIAL: ensure one-shot and replay semantics |
| Discover Mila | hero anchor | `href=#mila` | section | VERIFY live |
| Fanvue CTA | LandingPage | validated URL | external owner link | UNVERIFIED / disabled absent account |
| Private studio inquiry | not yet wired | unknown | owner-controlled CRM | UNKNOWN — don't invent |

## Work in six isolated slices
### Slice A — source media and framing (no site change)
- [ ] Inspect 9:16 source reference for preexisting crop; confirm full head/hair and heels in original still.
- [ ] Cost preflight and generate **one** 9:16 8s base. Confirm returned dimensions (previous model returned square despite requested 16:9).
- [ ] Create frame contact sheet at 0,1,2,3,4,5,6,6.5,7,7.5,end. Reject any source crop/identity drift.
- [ ] Store approved original and optimized versions in owner-controlled media storage; keep Higgsfield vendor URLs as temporary preview-only.
- [ ] Two distinct stills: hero poster matching frame and second editorial pose from canonical ZIP.

### Slice B — mouth-registered HyperFrames kiss
- [ ] Keep accepted temporal offset and existing 2.45-second motion; bind kiss *origin* to tracked lips, not fixed viewport percentage.
- [ ] On each target device compute video `object-fit:contain` scale and offset; map normalized mouth coordinates into displayed pixels.
- [ ] Test exact release frame and first 8 effect frames at 320×568, 390×844 and desktop.
- [ ] Keep one canonical base-video clock; pause/resume/seek/replay reset both video and kiss consistently.
- [ ] Avoid opaque WebM overlays; verify actual alpha or use CSS/SVG compositing.

### Slice C — true wordmark lockup
- [ ] Create one reusable CSS wordmark for intro, header and footer. Remove compensating `margin-left` hacks from `.cf-wordmark span:last-child`; center using grid, `justify-items:center`, `text-align:center` and appropriate `letter-spacing`.
- [ ] Test actual font with 200% text resize, 320px phone and long fallback font chain; keep both lines fully visible.
- [ ] Capture intro end frame and header/footer comparison. Never substitute text with a baked graphic that cannot scale.

### Slice D — age-gated playback and accessible controls
- [ ] Clicking `I am 21 or older` initiates intro exactly once per entry or intentional replay; avoid flash and arbitrary splash delay.
- [ ] `canPlay` must not be conflated with “already seen”; visitor can replay explicitly. Autoplay starts **muted + playsInline**; user may turn on audio with a 44×44 button.
- [ ] Add **Skip intro**, **Replay intro**, **Play/Pause**, **Sound on/off**, and visible captions/transcript. All have keyboard focus, accessible names, real state transitions. Do not block page scrolling for a 90s film.
- [ ] Hero readable and actionable if network fails, video stalls, JavaScript delays, or reduced motion is set.
- [ ] For reduced motion, no decorative kiss animation; show poster/brand and direct visitor to content.
- [ ] Preserve native touch scroll, safe-area insets and background visibility; no scroll-jacking.

### Slice E — Mila's host explanation and proof
- [ ] Hero copy evolves to “Welcome to Clonely Fanz. Meet your host, Mila.” after approved content review.
- [ ] Add second Mila still and “Watch Mila in action” section with labeled **SIMULATED WORKFLOW** until real receipts exist.
- [ ] Explain research, creation, approved interactions and measurements without claiming live Fanvue account or actual payouts.
- [ ] Keep the private creator-studio offer primary. No fan marketplace or owner-data collection beyond necessary consent.
- [ ] A B2B inquiry CTA only goes to an owner-verified endpoint; otherwise present an honest “inquiries opening soon” state.

### Slice F — performance, independent review and protected preview
- [ ] Preserve the smallest existing runtime dependency closure. Use native React/CSS; don't add GSAP/Framer/Lenis for simple motion.
- [ ] Preload only immediate poster; video metadata first; lazy-load long montage and second below-fold images.
- [ ] Compression target proposal: short hero source under ~5 MB and avoid giant 90s autoplay download; measure actual payload/quality at phone sizes, not enforce an arbitrary cap that wrecks faces.
- [ ] Run `npm ci`, `npm run typecheck`, `npm run build`, `npm run audit:landing` and relevant CI; add explicit assertions for safe contain and 21+ trigger.
- [ ] Restricted Vercel preview only; verify the **exact commit SHA**, CDN asset URLs, 21+ transition, video playback, console, no 404, and SSO protection. “READY” alone is not verification.
- [ ] Independent reviewer scores value, clarity, craft, interaction, accessibility, performance, truth, sovereignty, release (target ≥8.5/10, no P0/P1). Owner approves before public promotion.

## Mobile proof matrix (based on MISSION_MOBILE_POLISH_V2)
| Device | Viewport | Required checks |
|---|---:|---|
| Small Android | 320×568, 360×800 | complete head and heels, safe areas, button ≥44px, no horizontal overflow |
| Compact iPhone | 375×812 | gate focus, close, one-time intro, replay |
| Standard iPhone | 390×844 | lip-anchored kiss, centered wordmark, captions |
| Large phones | 414×896, 430×932 | center composition, native scroll, portrait fit |
| Tablet portrait | 768×1024 | photo grid, CTA, responsive video |
| Tablet landscape | 1024×768 | no cropped face/text overlap |
| Desktop | 1440×900 | full poster, controlled letterbox/ambient background, readable brand |
| Landscape phone | physical orientation | accessible player controls, no blank viewport |

**Before/after evidence:** actual screenshots, DOM scrollWidth/clientWidth, network 404s, video `readyState`, media dimensions, exact kiss frame, hit-area sizes, console logs, reduced-motion behavior, and interaction path. At each viewport inspect top, midpage and footer. Screenshot alone is insufficient.

## Release ledger (DECISION · CHANGE · PROOF · RISK · ROLLBACK · NEXT)
- **Decision:** NOT READY for public; ready to start isolated media regeneration.
- **Changes in this PR:** documentation only, no new code, assets, paid model execution, OAuth, production rollout.
- **Proof:** current files above, prior generated video dimensions, existing 21+ and overlay implementation, source mission QA matrix.
- **Risk:** source may again crop; kiss coordinates are unverified; current UI may hide content on narrow screens; synthetic-workflow depiction must be truthful.
- **Rollback:** source baseline is previous `main` before any later code PR; version and keep the currently SSO-protected preview / existing media in owner storage. Revert one isolated PR at a time.
- **NEXT:** Get one full-length, head-and-heel-safe 9:16 source clip and exact mouth-release frame; then implement lip-anchored kiss on a preview branch.
- **Human approvals:** source visual QA, media/voice/character rights, verified CTA destination, legal age/account policy, and independent preview review before launch.
