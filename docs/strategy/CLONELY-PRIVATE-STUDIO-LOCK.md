# CLONELY FANZ — Locked Private Studio Business Strategy

**Decision date:** 2026-11-05. **Status:** BUSINESS POSITIONING LOCKED (not implementation approval).
**Authority:** Owner's direction to retain the preceding strategic model, plus evaluate autonomous creator agents as an addition.

## Non-negotiable business baseline
1. **CLONELY FANZ is a selective, private AI creator studio**, not an open consumer subscription platform and not a generic AI influencer self-service SaaS.
2. **SELL:** Private managed creator production/operations for approved adult creators and creator businesses. Initial hypotheses: one fixed-scope 10–14-day identity/launch pilot in the $1,500–$3,000 range; later optional monthly operations retainer of $750–$2,000. These are *unvalidated price hypotheses*, not observed customer sales or forecasts.
3. **USE / EXPERIMENT:** Studio-owned Mila / CC-001 is the first fictional adult AI character and a measurable IP/monetization experiment; no ten-character expansion without economics.
4. **MERGE/USE:** Shared, owner-controlled content-production and operations backend. Reuse existing creator/media and automation tools, including an agent orchestration layer *only after inventory and security review*. Avoid replacing Fanvue's subscriber payments, verified identity process, built-in messaging and agency controls.
5. **PARK:** Open subscription marketplace, fan-payment competitor, general-purpose persona SaaS, large avatar roster, unauthorized social-growth automation.
6. Three workstreams only: **one paid managed-services offer, one shared production platform, one bounded Mila pilot**. Agentic creator capability lives inside the latter two; it does not become a fourth product.
7. Two-path public site, after release approval: **Discover Mila** (fans) and **Private Studio / Request Access** (qualified B2B operators). Existing website / Vercel release remains under its own review gates.
8. No public claim of sales, paid fans, zero-touch agent operations, or finished technical integrations without directly verified evidence.

## Agentic addendum — hypothesis, NOT shipped capability
Each virtual creator would have a persistent, permissioned **character operator agent**. It can plan campaigns, maintain character canon and memory, prepare content, use isolated browser/computer tools for permitted tasks, analyze authorized account analytics, and queue approved posts or inbound replies.

**Never equate avatar animation with agent autonomy:** the visible character, behavioral policy, identity/memory state, tool execution harness, and owner's authorization are distinct layers.

### Capability and human boundary
- **Auto on approved data:** analyze prior own posts, drafts, performance, and authorized sources; build editorial calendars; generate variants; deduplicate content and tag provenance; schedule internal jobs; report KPIs.
- **Approval or constrained authorization required:** publish platform posts, reply to fans (inbound only, policy-compliant AI disclosure), initiate paid offers, alter account configuration. Prefer official API actions and platform-native tools.
- **Owner only:** approve KYC, credentials, contracts, payee/bank, pricing bounds, budget increases, final sensitive content, payout requests, private identity disclosure and legal decisions. Maintain a visible kill switch and immutable action log.
- **Blocked:** collecting sensitive user profiles, unauthorized Reddit scraping/commercial API use, unsolicited bot DMs/comments, bot account creation, engagement manipulation, CAPTCHA evasion, impersonation of a real person, hiding AI identity, autonomous transfer of funds, moderation bypass.

### Technical constraints
- Single **owner/Instinct controller** governs one **Mila agent identity**; Pi can be an execution runtime (SDK/RPC/custom tools) rather than a duplicate owner-level orchestrator. Evaluate existing Agent Zero and current tool stack before adopting Pi; no tool installation on production merely from this strategy document.
- Workspaces and credentials isolated by creator; read-only first; scoped OAuth with token vault; per-tool policy, time/action/rate/cost limits; plan/review/execute/receipt; replayable logs and rollback, stop button.
- Prefer first-party Fanvue creator agent for routine account actions where available; use permitted Fanvue API capabilities for missing cross-platform functions, subject to official API policy and consent.
- Use dedicated sandboxed computer/browser for permitted UI-only workflows only when an official API is unavailable and terms permit. No production credential sharing with unreviewed Pi extensions.
- Reddit commercial use requires explicit written authorization. No unrestricted Reddit scraping/outreach.

## Measurable bounded test (proposal, not commitment to build)
- Baseline: measure current human minutes and expenses per reviewed content piece, time from content draft to scheduled post, platform errors, safety interventions, and authentic opt-in conversions.
- Run a 7-day **shadow-mode** Mila agent: research only from permitted sources, draft editorial calendar, generate 5 reviewable post packages, inspect analytics if authorized, and propose (not execute) all external actions.
- Upgrade to small auto-publish pilot only after official platform access, content approval, safety policy tests, 0 unauthorized actions, and independent review.
- Decision metric: >=50% reduction in measured human operations minutes per accepted content package with **0 unauthorized interactions**, controlled per-output cost and no increase in moderation incidents. These are proposed thresholds.
- Revenue test stays **one paid outside managed-services pilot** within 30 days; otherwise revisit positioning.

## Project status and release controls
- Site PR #39 already merged to main; current security/crop PR #44 is separate and remains draft at time of decision.
- This branch only adds strategic documentation; it must not alter business baseline site code, enable adult promotion, connect accounts or deploy.
- Owner approval and independent security/legal review required before turning on live autonomously acting agents.
- Rollback: disable creator agent's tool policy and schedules; revoke scoped tokens; preserve logs; return to human-reviewed content workflow.

## Sources consulted (2026-11-05)
- [Fanvue: AI tools / Creator Agent](https://help.fanvue.com/en/articles/9539500-ai-tools-on-fanvue)
- [Fanvue: AI content and disclosure](https://help.fanvue.com/en/articles/9538738-ai-content-on-fanvue-what-s-allowed)
- [Fanvue: API access policy](https://legal.fanvue.com/api-policy)
- [Pi: official project and extension model](https://pi.dev/)
- [OpenClaw: isolated browser](https://docs.openclaw.ai/browser)
- [Reddit: Responsible Builder Policy](https://support.reddithelp.com/hc/en-us/articles/42728983564564-Responsible-Builder-Policy)
- [Reddit: Don't break the site](https://support.reddithelp.com/hc/en-us/articles/360043512931-Don-t-break-the-site)
- [fanv.ai: auto-publishing and creator service](https://fanv.ai/)
- [Vibe AI founder postmortem](https://www.gravity.fast/blog/vibe-ai-postmortem/)

## Related
- [Platform roadmap #15](https://github.com/executiveusa/CLONELY-FANZ/issues/15) documents a **superseded open persona-builder direction**, not current locked positioning; do not execute it without a new owner decision.
- [Mila release checklist #41](https://github.com/executiveusa/CLONELY-FANZ/issues/41) remains active.
- [Safe-hero/dependency draft PR #44](https://github.com/executiveusa/CLONELY-FANZ/pull/44) remains separate.
