# Mila V5 — Kiss Hold → Morph → Centered Wordmark

**Status:** REVIEW CUT; not production-authorized. **Owner-approved unchanged:** original Mila V4 locked-camera 720×1280 clip, red lace dress, original hand-to-lips gesture, kiss start at 5.95 seconds, crimson lacquer lips aesthetic, same stacked CLONELY / FANZ typography, no extra model generation.

## Exact timeline

All times are on the **13.00-second finished video clock**, 24 fps. Start of effect remains at **5.95 seconds** after Mila’s V4 gesture; the effect’s spatial lip origin must be reviewed against the source frame.

| Clock | Local FX time | Animation |
|---|---:|---|
| 0.00–5.95 | Before overlay | Exact unchanged stationary Mila footage |
| 5.95–6.63 | 0.00–0.68 | Lacquer lips expand from provisional mouth anchor, floating toward viewer |
| 6.63–7.70 | 0.68–1.75 | **1.07-second visible kiss hold**: lip shape remains clear, not an instant logo |
| 7.70–8.87 | 1.75–2.92 | Kiss releases as red lacquer particles; particles travel from kiss silhouette toward wordmark glyph positions |
| 8.27–9.01 | 2.32–3.06 | Cream/ivory stacked CLONELY and FANZ become fully legible; FANZ centered geometrically |
| 9.01–13.00 | 3.06–7.05 | Hold clean centered stacked wordmark on oxblood-black stage |

The phrase “morph” is implemented as a **mask-driven particle transformation**, not a hard cut, opacity-only cross-fade, or new AI shot. A seeded set of 1,100 points sampled from the exact wordmark mask starts in the floating kiss footprint and converges on glyph pixels. The original lacquer lip painting is visible through the hold and fades as particles relocate.

## Technical implementation

- **Input:** canonical V4 locked-camera Higgsfield 720×1280, 8.042 seconds; no video model rerun.
- **Output:** MP4 H.264 720×1280, 24 fps, 13.00 seconds, mobile portrait.
- **Overlay:** PIL RGBA rendered to transparent frames in Higgsfield sandbox and composited with FFmpeg. The underlying V4 footage freezes after it ends; a dark stage fades in during the morph.
- **Kiss positioning:** provisional source pixel anchor is (360,315) at 720×1280, with ~30px lateral travel and ~35px upward movement; do not claim this is exact live lip tracking. **Required manual frame-level lip QA** before release. If misaligned, update only anchor path, not timing.
- **Wordmark:** `CLONELY` first line, `FANZ` second, both center anchored at x=360 (source video pixels); cream ivory, low gold rule.
- **Accessibility:** use the existing 21+ gated muted `playsInline` player and reduced-motion still. Provide skip/replay; avoid forcing autoplay audio.
- **Performance:** this is a baked one-video asset for isolated preview, not a second real-time overlay. Do not enable the old `cf-hyperframes-overlay` or CSS fallback concurrently, since it would display a duplicate kiss.
- **Preview switch:** feature flag `VITE_MILA_HERO_PREVIEW=true` and URL query `?milaFilm=v4`; URL query is a comparison route name, **not** a claim the underlying media is V4 (it now previews the V5 motion pass). The preview remains guarded by 21+; production remains on main unchanged.

## QA / release gate

1. Watch real review MP4 at native resolution; inspect first kiss pixel at 5.95s, full kiss shape at 6.63s and 7.3s, morph around 8.2s, centered crisp CLONELY / FANZ by 9.1s.
2. Confirm no kiss originates below lips, no floating/disconnected mouth anchor, no unexpected extra logo, no opaque rectangle while Mila is speaking.
3. Visual-test 320×568, 375×812, 390×844, 430×932 and desktop in browser; video must remain contained and head/feet visible; wordmark must be readable.
4. Run project CI; verify actual protected Vercel preview ref and media loads; get independent approval before merge or production.
5. **Rollback:** revert this PR commit or switch to existing V4 media URL; source V4 video is unchanged.

**Output media:** https://d2ol7oe51mr4n9.cloudfront.net/user_33irX78ICVwRYWpFZ5l6a5vZbf5/d9ffc42a-31bc-49f5-b7ad-0f1670cf2a28.mp4

**Commercial impact:** Creative-quality hypothesis only; no new customer, real earnings, approved Fanvue activity or launch claim.
