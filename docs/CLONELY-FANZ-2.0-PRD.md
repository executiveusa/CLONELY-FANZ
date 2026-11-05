# CLONELY-FANZ 2.0 — Internal Adult AI Creator Studio

**Date:** 2026-11-04  
**Status:** DESIGNED / landing-page source IMPLEMENTED (pending build and owner review)  
**Mode:** Brownfield  
**Classification:** USE — owned creator operations, not customer acquisition for a SaaS  
**Canonical repository:** `executiveusa/CLONELY-FANZ`  
**Initial character:** Mila `CC-001`, authority `executiveusa/cryptocuties`  
**Production engine:** `executiveusa/buffer-blaster-`  
**Agent conductor:** Hermes operating through existing Buffer Blaster bridge and a future scoped CLONELY-FANZ tool manifest  
**Primary distribution / monetization:** Fanvue, pending verified owner account and authorization.

## 1. Product lock

- **Outcome:** operate one original, clearly disclosed 21+ fictional AI creator from character canon through an approved published asset and a verifiable platform revenue event.
- **Target user:** the internal owner/operator. The public landing page serves adult fans, not prospective SaaS customers.
- **Public primary action now:** discover Mila and understand that she is fictional. Once the verified profile is available, the primary action changes to **Find Mila on Fanvue**.
- **Internal primary action:** operator requests a campaign in conversational language; Hermes prepares a rights-checked production plan; operator approves spend/publishing; the backend executes and records receipts.
- **Commercial proof:** first settled fan purchase in the Fanvue earnings statement; each subsequent experiment records media cost, distribution cost, attributable conversion, refund, and net contribution. Never treat clicks, generated takes, or simulated fans as revenue.
- **Constraints:** 21+ original or licensed adult characters only; clear AI disclosure; no real-person cloning without verified identity/rights; no externalized adult media in family-safe Crypto Cuties repo; no unapproved wallet charges, sending, posting, or credential access; regional laws and platform policies govern distribution.
- **Protected assets:** Mila CC-001 identity spec, personality, wardrobe, release locks, video reference, approval gates, source-person privacy. Existing source photos from a real individual are NOT an allowable output input.
- **Owner control:** CLONELY-FANZ code, selected domain/hosting, own Supabase schema, private asset vault, Hermes capabilities and secret manager; Buffer Blaster retains its own canonical UGC/media receipts. A publication approval is always attributable to a person.
- **Rollback target:** main branch head `ec4d50278c1bbe3edf35ed651b19eca6c08de4e8` at design time; reverify the actual baseline SHA before merge/deploy.

## 2. What this is / is not

**Is:** A private operator console and a character-led public publisher microsite. It owns platform account mappings, editorial calendars, rights/disclosure records, publication receipts, and revenue analytics. It integrates the established creative systems.

**Is not:** Another UGC renderer, an open marketplace, customer-facing avatar SaaS, a cloned OnlyFans interface with its own adult payment processing, an unmoderated public companion chat site, or an excuse to deploy untrusted uncensored-model agents with financial authority.

**Guiding positioning:** "Original digital personalities, built with human direction."

## 3. Milestone and proof gates

| Stage | Deliverable | Required evidence | Authority |
|---|---|---|---|
| 0 | Mobile-first Mila editorial landing | 320/390/1440 pixel browser tests, no overflow, link and gate tests, reviewed source | CLONELY-FANZ |
| 1 | Approved public Mila image + verified Fanvue destination | owner-promoted canon image hash, rights reference, real Fanvue profile URL, production smoke test | Crypto Cuties + Fanvue |
| 2 | One consistent still + 10-second video through Buffer Blaster | matching CC-001 identity, documented model/provider, cost and artifact hashes, human QC | Buffer Blaster |
| 3 | One approved Fanvue media release | KYC/profile verified, platform approval, upload/creation receipt, no prohibited content | Fanvue |
| 4 | Repeatable content and analytics loop | one settled revenue event, attributable media source, measured costs, postmortem | CLONELY-FANZ |
| 5 | Controlled conversational agent for fan messages | lawful/authorized integration, scope-limited API, disclosure, opt-out, privacy test | Fanvue |

Stages 1–5 are not claimed to be implemented. Don't move monetization/marketing ahead of owner KYC, accepted media, and platform authorization.

## 4. System ownership (no duplicate engine)

```text
PUBLIC FAN FRONT DOOR
  CLONELY-FANZ / → Mila character page → verified Fanvue profile
  No private assets, API keys or explicit media in public app bundle

PRIVATE OWNER STUDIO
  CLONELY-FANZ /studio/* (future; owner auth and role checks)
    ↓ scoped request / user-approved rights and budget
  Hermes supervisor (tools/ICM, no direct database or payout credentials)
    ↓ canonical profile lookup
  Crypto Cuties ICM — CC-001 Mila canonical identity (READ-ONLY)
    ↓ approved references + plan
  Buffer Blaster FastAPI / REST / MCP / CLI — AUTHORITATIVE UGC PIPELINE
    ↓ provider-neutral plan → wallet → generation → QC → artifact receipt
  CLONELY-FANZ distribution ledger — publish approval, Fanvue profile mapping
    ↓ platform-approved interface OR manual operator upload
  Fanvue (actual accounts, fan transactions, payouts, first-party AI tools)
    ↓ platform export / API only when authorized
  CLONELY-FANZ analytics — attribution and net revenue receipts
```

The character canon lives in Crypto Cuties; media generation spends and takes live in Buffer Blaster; authorized subscription/payout data lives in Fanvue. CLONELY-FANZ stores links/references and business analysis, not forged duplicate financial truth.

## 5. Character package for Mila

Read in order:
1. `executiveusa/cryptocuties/AGENTS.md` and `icm/README.md`.
2. `icm/characters/CC-001-MILA/CHARACTER.yaml` — physical, voice, language, platform and approval lock.
3. `icm/characters/CC-001-MILA/PERSONA.md` — style, behavior and disclosures.
4. `icm/characters/CC-001-MILA/PRODUCTION.md` — UGC process and 9:16 production rules.
5. `icm/characters/CC-001-MILA/QUALITY-GATE.yaml` — model drift and quality thresholds.
6. `icm/characters/CC-001-MILA/reference-pool-higgsfield-2026-09/INDEX.md` — **REFERENCE POOL ONLY, no approved public canon**.

CLONELY-FANZ may link to **approved** identity assets through signed/private server-side references. The age presentation, rights, and canon may not be rewritten by creative prompts or autonomous A/B tests. Build separate adult-specific campaigns and distribution decisions in CLONELY-FANZ; do **not** copy sensitive fan conversations or mature campaign data back into the public/family-safe Crypto Cuties repo.

### Canon and media contract

```json
{
  "character_id": "CC-001",
  "canon_repo": "executiveusa/cryptocuties",
  "canon_version": "1.0.0",
  "visual_anchor_sha256": "REQUIRED_BEFORE_PUBLISH",
  "approved_public_media_id": null,
  "legal_age_min": 21,
  "verified_original_or_licensed_identity": true,
  "ai_disclosure_required": true,
  "content_category": "platform_approved_only",
  "voice_consent_receipt": null,
  "promotion_status": "BLOCKED_PENDING_CANON_ASSET"
}
```

The `verified_original_or_licensed_identity` field above is a required target-state contract, not a claim that rights have been independently audited.

## 6. Landing page creative direction

**Territory chosen:** Magazine noir: crimson typography, dark editorial stage, ivory copy, oversized character signature. Avoid SaaS cards, purple blobs, generic avatars, fake social proof, and an unverified payout pitch.

**Public site IA:**
- `/` and `/landing`: Mila-first editorial front door with age acknowledgment.
- `/#mila`: canonical identity, lore, language and actual platform CTA when available.
- `/#collection`: character-led content concepts.
- `/#disclosure`: AI identity disclosure.
- `/legacy`: prior gallery prototype retained temporarily for comparison only; mark/quarantine before public release.
- `/studio/*`: future **private** operator surface, after proper server-side authorization. Existing `/dashboard/*` must not be treated as secure without a wiring audit.

**Hero:** "NOT BORN. CREATED." / "Meet Mila. A fictional AI personality with a distinct style, point of view, and a world of her own." The approved Mila image is an owner-supplied `VITE_MILA_CANON_HERO_URL`. Missing image must show an honest branded placeholder, not an unsourced portrait.

**Fanvue CTA:** `VITE_MILA_FANVUE_URL` must be an HTTPS Fanvue domain URL and must be verified in the owner's real profile before shipping. If absent, the page shows plain launch status instead of a fake or dead purchase button.

**Age gate:** self-attestation of age >= 21, no claim of actual age verification. Production may require a stronger jurisdiction-specific age assurance provider; must be assessed by owner/legal before serving age-restricted content. Public landing should remain non-explicit.

**Design checks:** responsive 320/360/375/390/414/430/768/1024/1440, 200% zoom, no overflow, keyboard, reduced motion, readable text, 44px targets and non-JS essential content. One conversion; no fake reviews, metrics, pricing or brand logos.

## 7. Private frontend architecture

`/studio` is not the public landing route. Build a compact operator console with:

1. **Command (Hermes):** "Make Mila three tasteful teaser variants for this week; budget <= X; no publish until I approve." Show interpreted action, estimated spend, generated plan, approval actions and receipts.
2. **Characters:** name, canon hash, protected fields, provider-compatible reference images, policy class, approved platform destinations, publishing state.
3. **Content desk:** calendar, UGC briefs, image/still candidates, video takes, storyboard and revision notes; view media lineage without exposing private blob URLs publicly.
4. **Review queue:** blocked/pending/approved/rejected, cost and legal ramifications, reviewer identity, one-click cancel or rollback when available.
5. **Distribution:** per-platform preview and content policy, target account, account verification and publishing status (native authorized API vs operator upload).
6. **Revenue:** source-of-truth Fanvue imports and fees, paid subscribers, PPV events, refunds, media production cost, per-character net contribution.
7. **Operations:** model/provider availability, daily spend cap, rights expiries, error retries, policy versions, failures, audit logs.

All operational data comes from an authoritative backend. Never show fake operational status based on frontend local state. Hide specialist settings behind progressive disclosure. Reuse existing authenticated UI components where secure; don't reimplement Buffer Blaster's video editor or operator wallet.

## 8. Backend data ownership and schema

Recommended namespace: PostgreSQL schema `clonely`, with Supabase RLS at every table and service-role access kept server-only.

| Table | Purpose | Key fields |
|---|---|---|
| `characters` | links to immutable ICM character package | `id`, `icm_repo`, `icm_ref`, `canon_sha256`, `age_policy`, `status` |
| `assets` | content-to-original rights and immutable media refs | `id`, `character_id`, `buffer_asset_id`, `sha256`, `rights_id`, `classification`, `created_at` |
| `content_briefs` | content production intents | `id`, `character_id`, `concept`, `niche`, `target_platform`, `cost_cap_cents`, `status` |
| `production_refs` | Buffer Blaster correlation IDs (not duplicated takes) | `brief_id`, `buffer_job_id`, `receipt_id`, `state` |
| `policy_reviews` | audited moderation/rights decisions | `asset_id`, `policy_version`, `reviewer_id`, `result`, `reasons`, `timestamp` |
| `platform_accounts` | actual approved channels, scopes, non-secret handle | `id`, `platform`, `character_id`, `account_ref`, `status`, `scopes` |
| `publish_jobs` | approved publication intent | `id`, `asset_id`, `account_id`, `approved_by`, `approval_at`, `state`, `idempotency_key` |
| `publish_receipts` | external platform response and public URL | `job_id`, `provider_post_id`, `published_at`, `verification_state` |
| `revenue_imports` | Fanvue account export/API data only | `source`, `source_event_id`, `character_id`, `amount_minor`, `currency`, `event_type`, `occurred_at` |
| `cost_ledger` | associated costs and budget events | `source_receipt_id`, `character_id`, `amount_minor`, `currency`, `type` |
| `agent_runs` | command / invocation receipts | `id`, `actor`, `tool`, `scope`, `intent`, `input_hash`, `output_hash`, `state`, `approval_id` |
| `rights_records` | age, ownership, consents, jurisdiction metadata | `subject_kind`, `consent_digest`, `approved_by`, `valid_from`, `valid_until`, `storage_ref` |

Keep government IDs and model releases encrypted in a separate private compliance vault—not ordinary app tables or GitHub. Do not ingest fan DMs, payment cards or financial-account data without an explicit lawful integration and documented privacy controls. Use unique constraints on external events and idempotency keys. Never interpret imported, stale, or estimated data as a settled payout.

## 9. API and services — target contracts

Routes are **planned**, not presently proven operational:

```text
GET    /api/v1/public/characters/mila           # published, allowlisted metadata only
GET    /api/v1/studio/characters                 # owner-only character links
POST   /api/v1/studio/briefs                     # create rights-checked content brief
POST   /api/v1/studio/briefs/:id/plan            # plan -> BB dry-run, estimate
POST   /api/v1/studio/briefs/:id/render          # approval + wallet + delegated BB request
GET    /api/v1/studio/jobs/:id                   # status, receipts, media refs
POST   /api/v1/studio/assets/:id/review          # compliance and human QC
POST   /api/v1/studio/publishing/prepare         # target policy and preview, no execution
POST   /api/v1/studio/publishing/:id/approve     # actor, scope, timeout, immutable digest
POST   /api/v1/studio/publishing/:id/execute     # provider capability check + idempotency
GET    /api/v1/studio/publishing/:id/receipt     # read-back after actual platform action
POST   /api/v1/studio/platform-imports/fanvue   # operator upload or authorized API import
GET    /api/v1/studio/revenue                    # only evidence-backed events
POST   /api/v1/agent/intent                      # Hermes interprets command; no direct execution
GET    /api/v1/agent/capabilities                # capability/approval manifest
```

Make private APIs deny by default: owner JWT / scoped service token, request quotas, expensive-action budget reservation, audit, structured error, CSP and strict CORS, secret vault references rather than raw keys. Providers and explicit model generation must be contacted server-side. No autonomous code shell with Fanvue secrets or private fan data.

### Fanvue access constraint

Fanvue's September 22, 2026 help article says general API keys are **not yet universally available** and access is gradually rolled out. Plan two adapter states:

- `manual_receipt_mode`: Hermes prepares approved content and a ready-to-upload package. The owner publishes through official Fanvue UI and records the post URL/receipt, or delegates within Fanvue's own first-party Creator Agent.
- `oauth_app_mode`: only after real OAuth/PKCE app registration, permissions and access are granted; use approved endpoints and retain audit/pause controls.

A draft publisher cannot claim an account connection is working until a real authorized upload and read-back completes. Do not automate login with stored passwords, steal browser sessions, or bypass the platform's rollout.

## 10. Agent architecture and skill tests

```text
OWNER → Hermes command surface
   ├─ Character Librarian (read-only ICM) → immutable Mila spec
   ├─ Producer (dry-run) → Buffer Blaster /api/studio/ugc/factory/plan
   ├─ Budget Gate → existing server wallet; pre-reservation on paid renders
   ├─ Media Director → approved model provider / output checks / receipts
   ├─ Rights & Policy Reviewer → 21+ age presentation, likeness, copyright, disclosure, niche and target platform check
   ├─ Content Editor → variants, mobile safe zone and platform copy
   ├─ Publisher → drafts; actual publish only with explicit authorization and platform support
   ├─ Revenue Analyst → Fanvue payout/import receipts and experiment costs
   └─ Auditor → tests and immutable action log
```

Hermes should have a narrow typed tool surface rather than raw production credentials. A text request may initiate read-only scans, plan creation, and draft content; publishing, spending, changing character identity, initiating DM automation, changing payouts, and changing legal permissions need owner approval. Fan conversations, if ever implemented, need platform authorization, separate user memories, transparent AI disclosure and clear opt-out.

**Model router:**
- `planning`: provider-neutral capable tool-calling model selected for structured JSON and reliability.
- `creative_drafts`: optional local/hosted Dolphin or abliterated DeepSeek family for character voice exploration; output is untrusted, no tool privileges. Verify actual model card, quantization, license, context limits, quality and hardware before pinning.
- `policy_guard`: deterministic rules plus human review, deliberately independent of text-model refusal behavior.
- `media_render`: existing Buffer Blaster capability registry; providers declare actual license, content acceptance and rights policy; skip prohibited providers instead of bypassing their safeguards.
- `critical_actions`: guarded FastAPI services with server-side authorization, receipts, and owner-controlled off-switch.

**Cold-agent walk test:**
1. Read `AGENTS.md` → ICM router → `docs/CLONELY-FANZ-2.0-PRD.md`.
2. Ask "What does Mila look like?" → return `CC-001` spec with protected fields and exact ICM source.
3. Ask "Produce a 10-second teaser" → creates a dry-run BB plan with budget estimate, no spend.
4. Ask "Publish on Fanvue" → without verified account or approval returns `BLOCKED_NO_PLATFORM_AUTH`, no network post.
5. Ask "What did yesterday's campaign earn?" → returns only imported and dated Fanvue receipts or `NO_VERIFIED_DATA`.
6. Attempt to override canon, disable disclosure, create underage-looking identity, or access a different character's fan data → deterministic rejection and logged incident.
7. Any missing key/endpoint/provider/asset → `BLOCKED` not a fake success.

## 11. Monetization and channel selection (research snapshot, Nov 2026)

| Platform | Assessment | Mechanic | Constraint / next evidence |
|---|---|---|---|
| Fanvue | **PRIMARY** | subscriptions, PPV, tips, AI messaging/voice tools | Real KYC, explicit AI disclosure, account policy, verified creator profile; API waitlist |
| X | **DISTRIBUTION** | labeled consensual adult/AI media and audience discovery | Adult material disallowed in prominent header/avatar and paid ads; adult accounts not guaranteed monetization |
| Bluesky | **DISTRIBUTION** | labeled fictional adult media, link to permitted destination | Label accurately, anti-spam and minor restrictions |
| Reddit | **CONDITIONAL DISCOVERY** | per-community permitted content and authentic participation | Reddit now requires AI transparency; no automated account creation, spam DMs, unauthorized scraping; subreddit rules differ |
| Instagram / TikTok / YouTube | **SAFE-ONLY ACQUISITION** | compliant fully clothed editorial/behind-the-scenes, no mature content | Paid promotion or links may be restricted; review per-account, per-policy before use |
| OnlyFans | **NOT FOR FULLY SYNTHETIC CREATOR** | only verified human creator with permitted clearly-labeled AI enhancement | Its creator guidance excludes wholly AI identities; review only if business model materially changes |
| Fansly | **NOT FOR PHOTOREALISTIC AI** | no suitable lifelike AI character publishing | July 8, 2026 official prohibition |
| LoyalFans | **NOT FOR PHOTOREALISTIC AI** | no suitable photorealistic AI use | current published AUP/TOS prohibits lifelike generated media |
| ManyVids / other adult stores | **UNVERIFIED / PARK** | possible media/direct sale | no operational approval established; obtain written AI and payment policy before integrating |
| Owned website | **SAFE PUBLIC FUNNEL** | character discovery and permitted off-site conversion | avoid unlicensed adult payment checkout; jurisdiction-specific age assurance |

**Findom niche:** Fanvue identifies Financial Domination as high-risk/restricted and requires consent. No coercion, blackmail, extortion, debt pressure, false identity, financial advice impersonation, mental-health targeting, or requests to route payments off platform. Treat as a **blocked experiment until Fanvue confirms the intended exact content format in writing**. Start the Mila launch in a lower-risk adult glamour/editorial lane and test other lawful niches only after policy approval.

**Revenue model:** gross Fanvue receipts → platform commission/refunds/taxes → net payout → generation/hosting/marketing costs → contribution margin. Fanvue's published standard split is 80% to creator/20% to platform, but do not substitute theoretical share for actual payout statements. Launch KPI: one actual paying supporter and positive measured contribution margin after media spend; do not fabricate expected earnings.

### Research sources (verify again before launch)

- Fanvue AI policy: https://help.fanvue.com/en/articles/9538738-ai-content-on-fanvue-what-s-allowed
- Fanvue AI verification: https://help.fanvue.com/en/articles/9539091-verifying-your-ai-account-and-anyone-you-feature
- Fanvue creator monetization: https://help.fanvue.com/en/articles/7860505-about-fanvue
- Fanvue AI tools: https://help.fanvue.com/en/articles/9539500-ai-tools-on-fanvue
- Fanvue API access: https://help.fanvue.com/en/articles/11363222-creator-settings-request-api-keys
- Fanvue API usage policy: https://legal.fanvue.com/api-policy
- Fanvue restricted categories: https://help.fanvue.com/en/articles/11702560-what-can-t-i-sell-on-fanvue
- Fansly AI policy: https://help.fansly.com/en/articles/12315578-ai-generated-content-on-fansly
- LoyalFans acceptable use: https://www.loyalfans.com/legal/acceptable-use-policy
- X adult content: https://help.x.com/en/rules-and-policies/adult-content
- X creator monetization: https://help.x.com/en/rules-and-policies/content-monetization-standards
- Reddit AI disclosures: https://support.reddithelp.com/hc/en-us/articles/41180423371156-Manipulated-Content-and-Misleading-Behavior
- Reddit API/bots: https://support.reddithelp.com/hc/en-us/articles/360043512931-Don-t-break-the-site
- Bluesky guidelines: https://bsky.social/about/support/community-guidelines

## 12. SamurAIGPT repo disposition (inspected at main)

| Repo | Classification | Disposition / reason |
|---|---|---|
| `SamurAIGPT/AI-Influencer-Generator` | PARK | Repo has only three files on inspected tree, with README describing notebooks elsewhere; not an implemented product to clone |
| `SamurAIGPT/ai-character-studio` | USE AS REFERENCE | Reusable generation UI patterns and job/webhook concepts, but carries SaaS credit billing, mock chat fallbacks; inspect licensing and security before any code patch |
| `SamurAIGPT/postiz-cheap` | PARK | Duplicates Buffer Blaster publisher; README admits due posts triggered during GET and demo authentication fallback; not reliable unattended scheduler |
| `SamurAIGPT/AI-Faceless-Video-Generator` | PARK | Basic GPT/gTTS/SadTalker prototype; weaker than existing BB provider pipeline |
| `SamurAIGPT/Clip-Anything` | MERGE PATTERN ONLY | Extract rights-safe clip selection ideas if Buffer Blaster lacks it; no duplicate video editor; code/third-party licenses must be independently checked |
| `SamurAIGPT/Generative-Media-Skills` | USE AS REFERENCE | JSON/CLI schema patterns can improve Buffer Blaster's existing MCP/skills contracts; depends on MuAPI and does not become another authority |
| `SamurAIGPT/seedance-2.0-watermark-remover` | ARCHIVE FROM SCOPE | Do not remove disclosure/provenance/watermarks in order to evade AI labeling, platform policy or content provenance |

Do not merge forks wholesale, install their tools in production or use their credentials before dependency/license/security review. Preserve the original authors' attribution and licenses.

## 13. Risk register

- **R1 highest:** real approved Mila hero image missing, despite `CANON_LOCKED` metadata. Must promote one after owner review; no reference-pool image silently becomes canon.
- **R2:** Fanvue API access not confirmed. Keep `manual_receipt_mode` until an actual authorized API app/creator key is granted.
- **R3:** Any 21+ age acknowledgment does not replace legally required age assurance. Regional legal review before publishing restricted content.
- **R4:** Findom is a restricted platform category; no campaign until written confirmation of actual permissible format.
- **R5:** Payment processors/platforms can reject generated content or suspend accounts; build one channel before investing in others.
- **R6:** Local abliterated LLMs do not enforce consent, fairness, disclosure, spend limits or tool authorization. Deterministic gates and access controls remain mandatory.
- **R7:** CLONELY legacy Supabase mock and console-only purchase handlers are not production services; isolate/remove misleading public routes after regression review.
- **R8:** Private references, voices, source photos, model releases, KYC and fan data must never enter public repos or generated content without rights approval.
- **R9:** Provider commercial use rights and model licenses vary. Check prior to each provider enablement; no safety-gate evasion.

## 14. Implementation plan — PR-sized tasks

**PR 1 — Current change:** isolated `/` landing, preserve old `Home` on `/legacy`, no backend mutation, add custom CSS without new dependencies. Confirm preview behavior; no public deployment until approval.

**PR 2 — Asset/policy truth:** owner selects an approved Mila anchor hash; put derivative in approved asset storage; verify real Fanvue profile; separate canonical rights from adult output; verify age-assurance requirements and social meta. Add automated test ensuring unapproved media URLs and unverified Fanvue links never display.

**PR 3 — Studio data contracts:** private owner auth + empty real backend state, Postgres `clonely` migration and RLS, cost model, ICM read-only lookup, receipts. Tests prove cross-character isolation and deny-by-default.

**PR 4 — Buffer Blaster reuse:** typed gateway calls to existing plan/render/cost/wallet/status and Hermes receipt. One approved Mila 9:16 teaser generated through real provider, failed cases and provenance verified.

**PR 5 — Fanvue release:** actual KYC, rights, content compliance and owner approval; manual publish receipt first. API only if formally enabled; import payout/insights through lawful interface.

**PR 6 — Learning loop:** measured organic channels, consistent AI labels, UTM links, no spam. Experiment on creative hook or thumbnail while keeping Mila's appearance fixed. Track cost per accepted asset and settled revenue, not vanity counts.

Parallelism: PR 2 legal/profile/asset review can occur independently from PR 3 schema design. PR 4 requires 2 + 3; PR 5 requires 2 + 4; PR 6 requires 5. Limit retries to three per PR, then log blocked state and move on.

## 15. Release and walk-test acceptance

- Build existing repository with lockfile and run lint/typecheck; fix all newly introduced errors, baseline older errors recorded separately.
- Capture 320, 360, 375, 390, 414, 430, 768, 1024 and 1440 CSS pixel screenshots; no clipping/overflow; test keyboard and zoom/reduced motion.
- Age gate keeps visitor out until explicit acknowledgment, supports exit, and is not described as robust verification.
- All visible CTA/link destinations work; no arbitrary Fanvue URL is hardcoded. Verified HTTPS Fanvue target only.
- No explicit media appears on public landing by accident; invalid `VITE_MILA_CANON_HERO_URL` falls back to honest placeholder.
- Studio requests without owner auth get 401/403, provider credentials never exposed, costs blocked without approval, jobs idempotent, receipts read back.
- Independent human/specialist review for design, accessibility, security, character canon, legal restrictions, regional compliance and money flow.
- Production is called `PRODUCTION VERIFIED` only after exact deployed revision and critical paths pass live smoke tests. Record SHA and rollback.

## 16. Decision/status ledger

**Decision:** USE original app; MERGE orchestration through BB; do not build another SaaS or renderer.  
**Changes:** React landing implementation and CSS; root route switched in proposed patch; spec for private studio and Fanvue adapters.  
**Proof today:** inspected current GitHub files and policies, transpilation syntax checked, stand-alone rendered HTML viewport review (if performed). This is not an app build or live deployment test.  
**Status:** source **IMPLEMENTED**, local app **UNTESTED** without npm dependencies; **NOT PRODUCTION VERIFIED**.  
**Commercial impact:** enables a character-led conversion funnel and a cheaper first test by reusing BB; no revenue yet verified.  
**Risks:** missing approved Mila hero, Fanvue account/API access, age/regional legality, payment terms and provider rights.  
**Rollback:** revert the branch's landing/App patch or restore main SHA recorded above.  
**Next:** owner-approved Mila canon asset + real Fanvue destination, then test an end-to-end content release through Buffer Blaster and Fanvue.  
**Human approval:** public image, age-verification approach, adult content policy, actual publishing, platform credentials and spending.
