# Mila CC-001 — Platform & Niche Eligibility, Agent-Reach, Fanvue Read-only Baseline

**Status as of 2026-11-05:** Registry created; Agent-Reach toolkit **registered and disabled**, Fanvue account **not connected**, no verified live business metrics. No content was published or external messages sent. This is part of the existing private creator-studio workstream, not a consumer marketplace.

## Platform and niche registry

Canonical machine-readable registry: [platform-niche-registry.json](platform-niche-registry.json).

| Channel / activity | Classification | Eligibility / guard |
| --- | --- | --- |
| Fanvue — adult fictional Mila subscriptions, PPV, eligible voice and inbound engagements | **Direct revenue** | Conditional: verified human operator/KYC, clear AI disclosure, account/feature approval |
| X — properly labeled creator posts | **Audience acquisition** | Conditional: approved account, automation rules, no unsolicited DMs, correct content labels |
| Instagram — SFW fashion/editorial | **Audience acquisition** | Conditional: platform-specific sexual content and promotional restrictions |
| TikTok — non-explicit cosplay/storytelling | **Audience acquisition** | Conditional: AI label and approved content; not erotic promotion |
| YouTube — non-explicit fiction / audio | **Audience acquisition** | Conditional: no sexual-gratification content, realistic AI disclosure, monetization not assumed |
| Patreon — original illustrated adult comics, subject to rules | **Eligible secondary commerce** | Conditional: illustrated rather than hyperrealistic synthetic adult characters, and no adult AI chat generators |
| Private studio licensed production and authorized voice IP | **Eligible secondary commerce** | Conditional: rights, contracts, processor eligibility, creator consent |
| Fansly — photorealistic Mila | **Blocked** | Fansly prohibits substantially AI-generated lifelike people |
| Patreon — photorealistic adult Mila subscriptions | **Blocked** | Synthetic hyperrealistic adult content not eligible absent real verified consenting subject |
| Reddit via cookies / commercial lead scraping | **Blocked** | Explicit Reddit access permission and compliance required; unauthorized scraping/unsolicited DMs prohibited |
| Fake paid engagement / deceptive chats / automated coercive financial demands | **Blocked** | Platform, safety and financial harm restrictions |

The JSON holds 20 specific opportunities across 10 platforms and 8 niches. Every entry has a category, conditional/blocked gate, and source links where the evidence is externally verifiable. Conditional is **not** permission to publish. New accounts, API scopes, jurisdiction and monetization features require verification.

## Why Agent-Reach, and what it does NOT do

[Agent-Reach](https://github.com/Panniantong/Agent-Reach) (upstream 1.6.1 as inspected; MIT license) is a **read/research toolkit**, not a platform publishing, subscriber messaging, or money-transfer tool. Its upstream CLI can connect to websites and optionally authenticated platforms. Upstream warns that authenticated browser mode can copy Chrome sessions into a dedicated browser. That behavior is incompatible with the default security posture for Mila.

**Added to Mila toolkit:** `agents/mila/toolkit/agent-reach.json` and `scripts/mila-agent-reach.mjs`. The adapter currently only accepts `doctor` or a `read` command restricted to allowlisted official policy/help HTTPS domains, with isolated HOME, no inherited credentials/proxy variables, timeout, truncated output, and **disabled** gate. It cannot publish, DM, execute arbitrary commands, or use Reddit. It is a tool registration, **not a live installation**.

If independently reviewed and installed in an **isolated throwaway worker** from a pinned upstream revision, an owner can explicitly edit the manifest `enabled` flag and set `MILA_AGENT_REACH_READONLY=true`; then `node scripts/mila-agent-reach.mjs doctor` validates availability. Never run upstream default setup or browser cookie migration against a normal logged-in desktop or production owner browser. Review release integrity, transitive dependencies and session behavior first.

**Do not conflate Agent-Reach and Fanvue:** Agent-Reach has no authorized Fanvue financial connector. Fanvue read-only access requires *your own* registered OAuth 2.0 PKCE application, the owner's consent, minimum read scopes and server-side token storage per [Fanvue API policy](https://legal.fanvue.com/api-policy).

## Fanvue baseline — exact workflow

1. Owner verifies a Fanvue creator account approved for Mila as fully fictional AI content, and completes required real-human KYC; status is **unverified**.
2. Owner/developer registers an app under their own Fanvue developer account with an owner-controlled redirect domain. Obtain approved *read-only* scopes to retrieve own user identity, subscriber/follower counts, tracking links and earnings/insights only. **Do not request chat-posting, media-writing, payout, marketing or admin scopes.** The available endpoint-specific scope names must be confirmed from the current developer console, not guessed here.
3. Keep client secret/tokens in a restricted server-side vault. No `VITE_` environment variable, repo commit, copied cookies, public Supabase row or browser localStorage may contain them.
4. Before OAuth setup, an owner may export a single aggregate Fanvue report, manually verify it, fill only the non-identifying aggregate template `ops/mila/fanvue-export-template.json` (real dates and real metrics; keep unknown numbers null), and import privately:
   ```bash
   node scripts/mila-fanvue-baseline.mjs status
   node scripts/mila-fanvue-baseline.mjs import /safe/path/to/owner-approved-aggregate.json
   ```
   This writes **`.private/mila/fanvue-baseline.json` only** (gitignored, create-only). The script rejects obvious fan IDs, chat contents, credentials and other identifying keys, and refuses made-up zero defaults.
5. Once independently reviewed OAuth integration is available, capture a report-period snapshot with provenance, minimal aggregate metrics, local encrypted storage, no individual fan data, and an approval/audit trail. Do not enable publishing until a distinct owner approval and platform policy review.

## Baseline metrics

**Revenue:** verified gross creator earnings, platform fees, refunds, net payouts; do not double-subtract platform fees from net payouts.
**Audience:** followers, paid subscribers, tracked visits, purchase count, posts published.
**Costs:** content generation expenses, agent runtime costs, measured human operations minutes. Unknown values remain null.
**KPIs:** subscriber conversion rate only when matched denominators exist; contribution only when payout/cost metrics complete; human minute reduction only with measured baseline and same-quality accepted output.

### Current verified baseline

```json
{
  "creator_id": "MILA-CC-001",
  "fanvue_account_verified": false,
  "fanvue_oauth_connected": false,
  "published_post_count": null,
  "verified_follower_count": null,
  "verified_subscriber_count": null,
  "verified_earnings": null,
  "data_status": "NOT_AVAILABLE"
}
```

All nulls above mean **unmeasured**, *not* zero. No account connection or actual Fanvue export was available during this change.

## Acceptance and rollback

- [x] Private-studio strategy is unchanged.
- [x] Registry created with precise classifications and platform-specific caveats.
- [x] Agent-Reach adapter registered with restricted policy; disabled by default.
- [x] Local read-only aggregate import path and secret-safe ignore path specified.
- [ ] Approve and connect actual Fanvue account via official OAuth 2.0 PKCE.
- [ ] Import first real metrics with source and period.
- [ ] Run isolated, licensed and reviewed Agent-Reach instance under controlled identities.
- [ ] Test authenticated browser workflows and actual headless agent in sandbox.
- [ ] Independent code/security review before deployment.
- [ ] Owner authorizes any publisher permissions as separate approval.

**Rollback:** Delete toolkit manifest and local adapter, disable its flag, revoke any future OAuth tokens, and stop the worker. No production state should be affected because no integrations were enabled here.

## Policy sources
- [Fanvue AI content](https://help.fanvue.com/en/articles/9538738-ai-content-on-fanvue-what-s-allowed)
- [Fanvue API authorization and scopes](https://legal.fanvue.com/api-policy)
- [Fansly AI limits](https://help.fansly.com/en/articles/12315578-ai-generated-content-on-fansly)
- [Patreon AI adult categories](https://support.patreon.com/hc/en-us/articles/34055590411789-Understanding-Patreon-s-AI-policies-for-Adult-18-creators)
- [Reddit Responsible Builder Policy](https://support.reddithelp.com/hc/en-us/articles/42728983564564-Responsible-Builder-Policy)
- [X adult-content policy](https://help.x.com/en/rules-and-policies/adult-content)
- [YouTube sexual content policy](https://support.google.com/youtube/answer/2802002)
- [TikTok realistic AI content labeling](https://support.tiktok.com/en/using-tiktok/creating-videos/ai-generated-content)
