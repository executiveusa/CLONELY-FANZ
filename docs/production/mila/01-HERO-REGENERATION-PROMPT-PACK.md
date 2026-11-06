# 01 — Mila CC-001: Mobile-first hero regeneration pack
**Mode:** Brownfield media correction, one bounded generation. **Status:** READY FOR GENERATION, not approved footage. **Content policy:** LOCKED existing character/wardrobe/brand. **Release:** protected preview only after QA.

## Why regenerate
The 2026-11-06 Kling 3.0 output was **960×960**, even though 16:9 was requested, and the visible figure was cut off above the head and below the feet. The later 1280×720 composite could not recover missing body pixels. The earlier kiss effect was positioned below her mouth. The subsequent composite's *timing* was accepted, not its origin position.

**Immutable decisions:** Mila's fictional adult identity, exact red dress, existing hairstyle/jewelry, dark burgundy studio, forward walk, one kiss, premium-personal tone, kiss/reveal cadence, CLONELY over centered FANZ, no other actors, no new narrative or visual motifs. No change to existing approved logic or older assets until the replacement passes.

**Source reference:** User-provided `MILA.zip` / selected full-body red-dress still, uploaded to Higgsfield as media `573dc56a-182e-42bf-b78f-520ac7acf758`. Companion red-dress portrait `dc325120-e82a-4ec3-b081-8352f9164ec6` may be used for identity checking only, not an unapproved second-video shot. Existing 8-second reference job `1d0f497a-216f-4cfa-9ffc-c3438a55a2b1`; composite v2 `0a825135-6bfa-4ee7-94fc-424527f08dda`. IDs are references, not proof of visual approval.

## Production order: minimize credit waste
1. Inspect source still *at target mobile crop* before any generation. If existing image already lacks visible hair/feet, reframe or extend a **still**, do not animate an intrinsically cropped reference.
2. Check **current** Higgsfield model constraints with `models_get`; inspect allowed image roles and aspect ratio. Prefer 9:16. Do **not** trust a requested aspect ratio: verify the *returned file dimensions* with `ffprobe`. If the model does not guarantee 9:16, select a model that explicitly supports it *before* spending.
3. Use one image-to-video shot, one output, exactly 8 seconds or nearest supported duration, **sound off**. Estimate cost first. No batch variants. Limit to **one paid generation before review**.
4. QA at frames 0, 1, 2, 3, 4, 5, 6, 6.5, 7, 7.5 and last available frame; contact sheet, source dimensions, head/heels visibility, hand anatomy and gesture.
5. Reuse existing 2.45-second kiss/wordmark animation and overlay timing only after source passes. Do not regenerate the lips FX or wordmark.
6. For compositing, bind FX to **the moving lip position** at the actual gesture frame, rather than hard-coded `left:56%;top:25%` or canvas-center. Record pixel coordinates normalized to source (u=x/W, v=y/H), then transform through exact `contain` geometry for 320×568, 360×800, 390×844, 430×932, 768×1024 and 1440×900.
7. The first visible kiss pixel appears at the mouth center at release, then travels outward and enlarges. Lock the accepted *time* but vary **only spatial origin / path**.
8. Composite preview with non-destructive 9:16 source and 16:9 desktop letterbox/background. Verify visual result before deployment.

## Prompt A — locked one-generation image-to-video
> **Use the uploaded canonical reference of the same fictional adult Mila**. Preserve her exact recognizable facial structure, hairstyle, fitted crimson-red dress, jewelry, footwear, burgundy/charcoal studio, premium natural UGC feel and overall eight-second walk–stop–blow-kiss cadence. Continuous fixed wide camera at a farther distance, no zoom/push-in, no cuts. **Vertical 9:16 camera composition**, subject centered full-length. At *all* times preserve all hair/head, both hands, full dress hem, both legs and both shoes, with at least 14% clean space above highest hair point and at least 12% clear floor below lowest heel; aim for figure occupying no more than 69% of image height so the entire body survives mobile viewport-safe rendering. Mila walks a few small steps from the shadowed studio toward camera without crossing out of the locked full-body frame, stops facing camera, looks directly at viewer, smiles warmly, raises one hand to lips, and blows one playful kiss toward camera near the last second. The hand moves anatomically naturally. Keep exact identity, dress, lighting and expression character. No second person, no text, no graphics, no logos, no speech, no sound, no scene change, no body crop, no camera zoom, no extra gestures.

### Prompt B — one optional revision ONLY if A fails
> Same exact reference, character, wardrobe and action as A. The only requested correction is **wider static full-length camera framing** and larger top/bottom floor margins. Keep subject centered within the **middle 65% of frame height** for the entire 8 seconds, including during walking and the hand-to-lips gesture. Do not change pace, face, lighting, costume or camera direction. Do not create a second version until reviewing the failed A contact sheet and recording the exact defect.

## Negative controls (prompt, not claims of model guarantee)
No cropped hair; no clipped forehead; no missing/merged shoes or toes; no edge-cut dress; no face or clothing drift; no excessive push-in; no floating hands; no disembodied lips; no extra kiss graphic generated inside source; no fake platform UI or earnings numbers in this hero.

## Kiss bind specification
- The synthetic kiss/lips overlay is **separate** from the source video. In the source clip, Mila only brings her fingers to mouth and blows; do not ask generator to create a cartoon kiss.
- Approved previous composite: FX started around **7.12 s** on its composite timeline; lock *relative cue* and adjust only if source gesture time shifts. The actual mouth-release frame remains subject to independent frame check.
- For each frame starting at release, choose center **P_lip(t)=(u,v)** from observed mouth geometry. Place SVG lipstick center there at scale ≈0.08–0.16 subject-relative, then tween outward toward visual foreground. The trajectory starts at the mouth, **not below the chin or from a static viewport coordinate**.
- Overlay and video share one clock. Recompute coordinates after `object-fit:contain`, safe-area offsets and mobile CSS. Do not use `object-fit:cover` on the subject.
- Use existing HyperFrames lacquer style and centered stacked CLONELY / FANZ wordmark. If original WebM is opaque, use known deterministic CSS/SVG layer or premultiply on a genuinely transparent output. Never obscure Mila with an opaque video rectangle.
- On motion-reduced clients, show fully visible still and static wordmark. Make captions/CTA available without motion.

## Objective preflight / approval gates
| Gate | Test | Reject if |
|---|---|---|
| Native format | ffprobe width/height ratio about 9:16 | Square returned or distorted |
| Identity | Human compare red dress, eyes, hair, accessories with canonical image at beginning/middle/end | Material drift |
| Headroom | At every sampled frame ≥10% above hair | Hair touches top/crops |
| Footroom | At every sampled frame ≥8% below heels | Feet clip or floor disappears |
| Safe zone | Center x within 40–60% of frame; body stays within inner 85% width | Hands/shoes leave picture |
| Timing | Hand touches lips and releases near end, once | No actual kiss gesture |
| FX geometry | First kiss effect pixel originates at lips after mapping through contain sizing | Kiss appears below face |
| Runtime | 320, 360, 390, 430 CSS px phones + desktop | Crops, overlaps, autoplay assumptions |
| Credits | Record estimated and actual credits before further generation | Repeated blind attempts |

**Motion output:** base `mila-red-dress-entrance-9x16-v3.mp4` + source metadata; rendered `mila-hyperframes-review-v3.mp4`; frame sheet and lip-path JSON. **Publish:** nowhere until QA. **Rollback:** restore v2 preview and retain all originals. **Evidence:** real ffprobe output, sampled frames, human sign-off, credit receipt.
