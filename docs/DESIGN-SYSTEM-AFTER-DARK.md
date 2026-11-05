# CLONELY FANZ — AFTER DARK / Art Direction & Motion System v1

**Status:** Production design specification; no approval to merge/deploy. **Mode:** Existing-product redesign on PR #39. **Product:** Self-operated 21+ synthetic AI-creator studio, Mila CC-001 first. **Goal:** A premium, responsive, cinematic editorial homepage that introduces Mila and moves qualified visitors to an owner-verified creator destination without implying unavailable capabilities.

## 1. Creative thesis
A niche perfume campaign meets an arthouse film title sequence. Provocation by restraint, not generic adult-industry pink, neon, or card grids. One hero performance, not a collage of AI models. Hero impression -> character credibility -> editorial releases -> verified off-site subscription CTA. No fake testimonials, revenue, social proof, invented Fanvue URL, checkout, live agent, chat or account functionality.

**Design promise:** Human-led art direction and technically precise layout. Never fake a full character performance with placeholders. The current page is a temporary editorial bridge, not a finished cinematic artifact.

## 2. Source research and reuse decisions
- Hallmark (Nutlope/hallmark): use the anti-slop **Floor** as evaluation and design audit, not an unreviewed code install. Measure contrast, focus, reduced motion, mobile breakpoints, invented facts. Reject repetitive eyebrow labels, giant lettertracked all-caps microcopy, colored words inside every headline, empty art frames and inert CTAs. Credit its MIT implementation separately if code is copied; review and pin commits first. https://github.com/Nutlope/hallmark
- Details Inspo: reference hero composition, exceptional type ratios, transitions and actionable patterns; do not copy third-party exact layouts or code without rights. https://www.details.so/inspo
- Design Spells: use one intentional reveal detail, carefully motion-designed hover states and soft page transitions. Avoid novelty interaction overload. https://designspells.com/
- Refero: compare editorial framing and navigation hierarchy once authenticated references can actually be reviewed; its home content wasn't machine-readable in this research, so no unsupported claims about examples. https://refero.design/
- MotionVideo: study **kinetic type, shapes, high-end feature teasers, UGC creator promos**, and prompt-oriented motion reference; use as vocabulary, not a template dump. https://motionvideo.xyz/en

## 3. Brand system
**Brand name:** CLONELY FANZ (all caps in formal master; 'Clonely Fanz' in prose). **Campaign direction:** AFTER DARK. **Tone:** intelligent, intimate, composed, cinematic, European editorial. **Typography:** select a licensed display Didone or an approved modern high-contrast serif for wordmark and 1–2 page headlines; e.g. evaluate Bodoni Moda under its actual license. Pair with Inter/Inter Display for navigation, button labels and metadata. No Impact, off-the-shelf techno type, faux handwritten font, or synthetic glitter scripts. **Do not ship typography dependent on unlicensed fonts.**

**Master wordmark:** two-line spaced serif, CLONELY / FANZ. Optical adjustments for CL, ON, LY and ANZ pairs. Secondary horizontal lockup for sticky header, CF monogram for favicon, a single sculptural red kiss-seal accent. Text must be real vector paths/text; AI raster is mood/reference only. Use no stock lips illustration or generic heart.
**Palette:**
- Ink / near-black `#100D10`
- Ivory `#EEE5DC`
- Lacquer / oxblood `#A82E49`
- Soft pewter `#8F777C`
- Hairline `#3D3035`
- Optional warm-gold highlight `#BE9C73` only in photographed lighting, not all borders.
Use deep blacks with subtle grain on media only; color must not destroy reading contrast.

**Visual rules:** cinematic photography first; one large expressive composition per viewport; 12-column grid desktop; text max-width 60ch; content never trapped under fixed UI. Keep text and action in HTML, not video. Editorial cadence varies: 100vh immersive scene; dark quiet interstitial; portrait portrait; concise chapter rows; real close.

## 4. Homepage sequence & exact functional intent
0. **Age / disclosure gate:** retain existing 21+ self-attestation but do not call it identity verification; verify local legal requirements before adult release. Provide non-coercive exit. Motion never plays behind the unopened gate.
1. **Arrival ident (0–4 s, first session only):** near-black canvas, oxblood lacquer kinetic stroke, CF kiss-seal forms, ivory vector wordmark reveals in two beats; transition by aperture/fade into hero. Skip immediately on pointer/keyboard, reduced-motion bypass. Never block content/network on video.
2. **Hero / Mila:** landscape 16:9 image-to-video master with Mila right-of-center, left-side text. Show a refined title such as 'MEET MILA.' with understated deck: 'An original AI muse. A world of her own.' CTAs only to an actually existing internal character section or verified external Fanvue URL. AI-fiction disclosure visible. On mobile use a separate portrait crop/poster; no center crop that cuts off her face.
3. **The close-up:** single high-resolution identity-locked portrait, small quiet story in ≤70 words; adult fictional creator, what she publishes and why audience should care.
4. **The editorial:** only real approved images or releases, maximum three stills/video thumbnails with meaningful captions; no fake collection cards.
5. **Beyond the frame:** short reel/about-the-character proof, optional behind-the-scenes showing disclosed synthetic workflow; no misleading claims of lived experience.
6. **Final invitation:** one clear subscription/offsite CTA after URL/KYC/policy verification; until verified, 'Discover Mila' internal anchor. Footer with age, AI disclosure, contact, privacy/terms as they become real. No fabricated statistics or subscriber counts.

## 5. Motion score
- **00:00–00:00.4** black and restrained lacquer line; no spinner.
- **00:00.4–00:01.45** wordmark first line letter reveal with proper kerning.
- **00:01.45–00:02.65** 'FANZ' resolves; kiss seal catches delicate moving light.
- **00:02.65–00:04.00** dissolve ident into hero master, text remains HTML.
- **Hero 8 seconds** (existing docs/MILA-HERO-MOTION-001.md): Mila turns, makes eye contact, blows a kiss and returns to resting pose. Silence, seamless loop; no exaggerated floating hearts or simulated lens text. Exact identity review is a release gate.
- **Scroll:** single quiet dissolve to portrait, asymmetric reveal on chapters, intersection-triggered opacity and <12px translate with graceful no-JS fallback. No scroll hijacking or aggressive parallax.
- **Micro:** button underline/directional shift at 140–180ms, hover focus visible, single cinematic mask 500–700ms, 60 fps CSS properties transforms/opacity only where possible.
- **Reduced motion:** statically render logo/poster, no intro, no loops, no movement to complete task.
- **Performance:** no autoplay sound, no loading overlay that blocks page; preload poster, not heavy video; serve responsive AV1/WebM/MP4 and CSS fallback, limit first-party hero master size via bitrate budget to be established after actual clip test; defer all offscreen video.

## 6. Production routes and evidence
A. **fal:** Generated wordmark concept image using `google/nano-banana-2.1`, 2K PNG, result job `01a1aa14-5da7-7311-8889-538dc8b67367`, URL `https://v3b.fal.media/files/b/0ab1348a/4xCsPqgj7u45dglILEZdb_WmM2kpFL.png`. This is **concept art only**, not canonical vector or production license clearance.
B. **Vector master:** handcrafted, deterministic SVG + PNG generated in the current conversation, exact lettering; transfer approved SVG to assets/brand/master, refine optical kerning with actual licensed type before production.
C. **Higgsfield intro ambience:** Seedance 2.5, 4 s 720p 16:9, no generated text/audio, job `fa10a341-075a-4ecd-8b86-ac08036d47f7`. Quote 28 credits; status at submission **pending**, **do not claim final video**. Frame-accurate text will be composited in code/video editor over approved ambience, not generated in model.
D. **Mila hero:** existing Higgsfield element `Mila-CC001`, id `e2fdd869-0444-4faa-ac94-fc29dfd8d9fb` and approved source reference IDs in assets/manifests/mila-cc001-reference-inventory.json. Separate hero render quoted at 56 credits, **not yet generated**. Canonical private source identity cannot enter public repo. Human approves scene and derivative.
E. **HeyGen/Hyperframes:** use for longer presenter/narrative edits only if its actual capabilities are verified and adds value; not required for this logo ident. Avoid tool duplication.
F. **Asset ledger:** for every result, record provider/job/prompt/seed/source IDs/license/approval/date/revision/output hash/derivative path. Archive actual videos in owner-controlled storage and deploy versioned derivatives; no fragile vendor CDN hard-coded as the public hero dependency.

## 7. Component/engineering plan
- Keep current React/Vite integration, routes, gate, canon env flags, and legacy rollback. No stack rewrite.
- New isolated components: `BrandWordmark` SVG, `ArrivalIdent` first-session+skip, `CinematicHero` with HTML copy and picture/video sources, `EditorialSequence`, `MotionPreference` hook, `CharacterDisclosure`.
- Design tokens in one scoped CSS module or custom properties; font files included only with licenses; all styles isolated `.clonely-site`.
- Video src via manifest of approved derivatives, not dynamic arbitrary URL input; maintain existing verified fanvue URL gating.
- Layer order: age gate -> ident overlay (only after age approval) -> hero; keyboard skip and no motion trap. Document scroll restoration and focus transfer.
- No new animation library until a measured need; CSS motion and Web Animations can cover most. Add GSAP only if evidence shows native primitives cannot accomplish a specified choreography.
- Reuse Buffer Blaster UGC pipeline for source media only after inspection of the code and source licensing, not by copying code blindly.

## 8. Walk tests / acceptance gates
1. **Functional:** gate and exit, internal CTA, verified external CTA, keyboard/focus management and nav all pass; no fake API calls; no simulated money actions.
2. **Visual:** actual React screenshots 320, 375, 390, 768, 1024, 1440, 1920 px, desktop/mobile portrait; type breaks intentional; 21+ and AI disclosure legible.
3. **Media:** exact Mila ID, realistic five-finger hand, age clearly adult, consistent jewelry and facial geometry; external source rights confirmed; no synthetic text errors; sound-on/sound-off assessment.
4. **Animation:** skip in <100 ms, initial focus available, no reduced-motion autoplay, no FOUC on fonts, no scroll trapping.
5. **Tech:** Vite build, tests, lint, no new vulnerability, accessible contrast; mobile LCP/CLS measured in browser using actual asset sizes, no budget invention.
6. **Governance:** Hallmark floor audit, independent reviewer, owner sign-off on wordmark, Mila media and Fanvue destination; Vercel account deployment block solved before saying live.
7. **Rollback:** revert from PR to main baseline `ec4d50278c1bbe3edf35ed651b19eca6c08de4e8` or disable new media/ident flags; continue static poster mode as fallback.

## 9. Ordered implementation, one measured slice at a time
- Slice 1: approve exact wordmark vector and media usage; font license; audit existing landing (done: major visual shortcomings identified). Proof: logo lockups 3 sizes, accessibility, signed approval.
- Slice 2: integrate intro with deterministic SVG motion and graceful static fallback, gated by flag. Proof: browser video/screenshots + interaction tests.
- Slice 3: approve Mila hero and generate exactly one canonical 8s render, transcode, load and mobile test. Proof: identity QC and performance numbers.
- Slice 4: build complete editorial page from actually approved images, validate CTAs/disclosures, run independent review, preview.
- Slice 5: after human authorization, merge/deploy and verify live externally. Payment, account registration, Fanvue API automation and mature content compliance stay separately gated.

**Classification:** USE existing repository; MERGE new brand system into PR #39; PARK extra characters and tools. **Revenue hypothesis:** verified Fanvue profile link and conversion tracking for a single Mila funnel, no fabricated 30-day projections. **Commercial proof:** tracked opt-in visits, click-throughs and platform-reported paid subscriptions after approved setup.

## 10. Owner sign-offs still required
Exact final wordmark, fonts/license, approved Mila image/video public derivative and voice, intro render approval, Fanvue profile owner verification and URL, age/legal review, release and deployment. No agent autonomously spends paid production budget for retakes or publishes adult media.
