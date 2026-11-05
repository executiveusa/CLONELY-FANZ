# CLONELY FANZ — HyperFrames Motion Delivery / Review Gate

## Deliverables
- Editable HyperFrames source: `motion/hyperframes/kiss-to-wordmark/index.html`
- Brand specification: `motion/hyperframes/kiss-to-wordmark/DESIGN.md`
- Frontend: `src/components/landing/CinematicHero.tsx` supports external transparent WebM; `cinematic-hero.css` renders it over the base video with unchanged accessible HTML CTAs; fallback is existing SVG/CSS animation.
- Rendered review assets: `clonely-kiss-overlay-alpha.webm` (1280×720, 30 fps, 2.466s, WebM VP9 with alpha_mode=1) and `clonely-kiss-overlay-review.mp4` (dark-background preview). Rendered offline by `render_fallback.py`; **the HyperFrames CLI itself was not run** because the npm registry was unreachable.
- Review package (generated in conversation): `CLONELY-FANZ-HyperFrames-hero-package.zip`; download to obtain the actual WebM, MP4, HTML, DESIGN.md, and renderer. This conversation archive is **not** a public CDN.

## Production architecture

Mila source video remains unchanged: Higgsfield Seedance 2.5 job `aec257c7-b66c-45d0-8aaa-aad101695819` (8 seconds, 720p, 16:9). Motion starts at provisional source video clock 5.45 seconds and lasts 2.45 seconds. Exact kiss timing **not frame-verified** yet. The alpha video has its own wordmark, spelled CLONELY FANZ; CSS fallback contains the same exact wordmark.

### Review setup
1. Upload the owner-approved alpha WebM to an owner-controlled HTTPS asset location (e.g. production asset storage dedicated to this studio) only after approval; do not commit protected source-media files from Crypto Cuties. The public clip is synthetic non-explicit branding but is still a draft.
2. Configure only a **preview build**:
```sh
VITE_MILA_HERO_PREVIEW=true
VITE_KISS_OVERLAY_VIDEO_URL=https://your-controlled-asset-host.example/your-reviewed-overlay.webm
```
`VITE_MILA_HERO_PREVIEW=true` enables the already-generated draft Mila clip in the component and the optional WebM. `VITE_KISS_OVERLAY_VIDEO_URL` must be a real HTTPS location, not the example above; do not set it before upload. These public VITE flags must not contain tokens/secrets.
3. Start a local preview. The overlay autoplays muted only after the base video passes 5.45 seconds, a single time per session, with a replay button. On broken WebM it falls back to deterministic SVG/CSS.
4. Inspect visual framing and timing at 320, 390, 768, 1440 pixels, browser refresh and repeat, keyboard access, reduced motion (static poster), overlay on alpha-capable and non-capable browsers, and any unexpected animation bleed.
5. After real-video frame inspection, adjust timeline in both the editable HyperFrames project and the frontend source. Re-render and QA before enabling outside preview.

### Rendering on an environment with HyperFrames CLI
```sh
cd motion/hyperframes/kiss-to-wordmark
npx hyperframes lint
npx hyperframes validate
npx hyperframes inspect
npx hyperframes render --format webm --output kiss-to-wordmark-final.webm
```
The committed source uses GSAP 3.14.2 from jsDelivr. A production build should pin/vendor and audit approved dependencies. Validate clip transparency on export; do not silently replace with an opaque black background.

## Verified in this task
- Generated offline alpha WebM with VP9 `alpha_mode=1`, 1280x720, 2.466 seconds and dark-background MP4 review; decoded sample frames observed for typography.
- Editable HyperFrames HTML and DESIGN.md saved as GitHub source.
- Optional overlay playback added in separate JSX media layer; CSS fallback preserved and no new dependency.
- No Vercel deploy or PR merge.

## Still required before release
- HyperFrames CLI lint/validate/inspect against actual library runtime, after npm access is restored.
- Full React/Vite lint/build/browser test on the PR branch; local attachment zip predates the feature branch and is not a valid current build baseline.
- Frame-by-frame Mila kiss and canonical face quality review, source footage rights, owner approval of animation and exact impact.
- Owner-controlled hosted WebM and optimized video/poster, with media hashes and cache policy.
- Independent reviewer and explicit release approval. Vercel account blocked previously.

## Rollback
Unset `VITE_KISS_OVERLAY_VIDEO_URL` to fall back to CSS animation; unset `VITE_MILA_HERO_VIDEO_URL` and disable `VITE_MILA_HERO_PREVIEW` to restore the static poster state. If the new hero itself needs rollback, revert the landing component integration in PR #39 without touching `main`.
