# Mila V6 — Approved Voice, First Talking Host Test

**Status:** protected preview only, not released. **Decision:** user approved the new voice recording and asked to lock it. Canonical source is `05-MILA-VOICE-LOCK-V1.md`. Do not choose another voice for the film.

## Production receipts

- Original 15s Mila Selva & Sea UGC: Seedance 2.5 job `9214e0ff-d65b-4dff-be9e-c9150a45e488` (2026-09-18).
- Owner-approved voice WAV: Seed Audio job `5783c4da-4144-46c5-8e84-67e3801b2483`, 6.644s, 24kHz, 2ch. This is the **authority** for this passage.
- Talking head: Higgsfield Wan 2.7 job `af457a00-fbc1-40fa-bdee-8fff72c0309f`, generated 7.036s with audio reference, 960×960 **square despite 9:16 request**. Cost estimate **10.5 credits**, one generation only.
- An audio-envelope correlation check between output video and authority WAV at 100 Hz was `0.985`, no measurable offset in this check. That confirms near-identical speech timing/energy, not a formal acoustic identity score or guaranteed per-phoneme sync.
- Scene analysis identified exactly the intended line. It described a chest-up woman in red lace, so visual review must ensure canonical dress/face and hands are acceptable.
- V5 intro 13s plus speaking scene 7s -> V6 review export **19.644s**, 720×1280 24fps, with 0.45s crossfade and exact approved WAV reinserted for soundtrack. Source talking square was **contained** against a soft blurred backdrop, not cropped to fill the vertical canvas.
- Review file: https://d2ol7oe51mr4n9.cloudfront.net/user_33irX78ICVwRYWpFZ5l6a5vZbf5/4d585f27-851d-499c-b7b8-c9cad6ea72cd.mp4

## Site preview behavior

- Existing `?milaFilm=v4`: unchanged V5 kiss hold and wordmark review.
- New `?milaFilm=v6` and preview environment flag `VITE_MILA_HERO_PREVIEW=true`: plays V6 assembly.
- Player remains **muted** until user presses “Hear Mila”; “Mute Mila” restores silence.
- Timed readable caption line appears for each narration segment and user can replay.
- Baked review clip excludes legacy JS/CSS kiss overlay to avoid a duplicate lip effect.
- 21+ self-attestation preserved; site is still a private creator studio, not a fan marketplace.
- No merge or public production deployment authorized.

## Remaining objective gates

1. **Voice:** listen against original user-uploaded Sea & Selva and verify timbre (waveform only proves aligned phrase timing).
2. **Face/outfit:** compare V6 spoken clip to Mila canon; its red lace chest-up framing risks reading as a bralette rather than the complete red dress. A generated talking head is not visual sign-off.
3. **Mobile:** inspect protected preview on 320×568, 390×844 and 430×932 portrait; check media `object-fit:contain`, caption, tap target, audio unmute and no scroll overlap.
4. **Accessibility:** review real captions against audio phonemes and contrast; support reduced motion, replay and an understandable no-audio fallback.
5. **Release:** CI plus independent browser reviewer and owner signoff before merge/promotion. The `READY` status of deployment cannot substitute for device testing.

**Rollback:** revert the isolated V6 commits on PR #50 or open the unchanged `?milaFilm=v4` preview. All previous generated assets remain intact.
