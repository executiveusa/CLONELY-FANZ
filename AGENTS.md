# CLONELY-FANZ / AGENTS.md

A private 21+ synthetic creator studio with a public character-led landing page. This is **not a customer-facing SaaS**. Agents must read the repository PRD and ICM character source before any plan or code changes.

## Cold-start read order

1. `docs/CLONELY-FANZ-2.0-PRD.md` — current scope, data authority, hard gates and staged roll-out.
2. `src/App.tsx`, `src/components/landing/LandingPage.tsx`, `src/components/landing/landing-page.css` — public frontend.
3. `executiveusa/cryptocuties` → `AGENTS.md` → `icm/characters/CC-001-MILA/CHARACTER.yaml`, `PERSONA.md`, `PRODUCTION.md`, `QUALITY-GATE.yaml`. Read canon only; don't rewrite it in this repo.
4. `executiveusa/buffer-blaster-` → `docs/UGC_EVOLUTION_PLAN.md`, `api/services/ugc_factory.py`, `api/routers/studio.py`, `api/services/hermes_bridge.py`. Reuse provider-neutral generation, wallet and receipts.
5. Fanvue official policies, API access policy and creator verification before platform work. **API is not universally available**.

## Canonical domain boundaries

- Crypto Cuties controls Mila's identity and public canon image approval. Reference-pool photos are NOT promoted canon.
- Buffer Blaster controls paid video/image generation, asset lineage and production receipts.
- Fanvue controls subscriptions, fan payments, payouts and first-party conversations.
- CLONELY-FANZ controls adult-specific editorial plans, verified platform mapping and publication/revenue receipts.
- Hermes is a scoped conductor, not a bypass for approvals or a privileged direct database shell.

## Non-negotiable checks before a change

- Source inspection and `main` commit SHA recorded.
- No secrets, private source likeness, government documents, creator credentials or fan messages committed.
- No adult media placed in public GitHub by default.
- No unverified social URLs, unsupported revenue claims or fake-success buttons.
- No character that looks under 21. Never impersonate a real person without their verified, documented consent.
- No external messages, publishing, money movement, or paid model requests without authorizing human approval and a cost cap.
- No weakening or bypassing platform policies or moderation with abliterated model variants. Model output is untrusted data.
- Authoritative receipts, no duplicate status store, no private frontend token.
- Every feature gets a walk test, a negative-path test, independent review, and a rollback target.

## Minimal command interface (proposed, not implemented)

- `character.inspect(id)`: safe read-only metadata and proof refs.
- `media.plan(character, brief, platform)`: rights-checked Buffer Blaster dry-run and cost estimate.
- `media.render(approved_plan_id)`: spend-gated, server-side, idempotent production.
- `review.propose(asset_id)`: audit queue only.
- `publish.prepare(asset_id, target)`: platform-specific draft and compliance preview.
- `publish.execute(approval_id)`: available only for actual authorized provider + scoped approval; otherwise explicit `BLOCKED`.
- `analytics.read(character_id)`: dated, sourced receipts; never guessed revenue.

## Walk-test acceptance

A cold Hermes/Claude/ChatGPT agent can discover this file, identify the four data authorities, read Mila's canon without modifying it, prepare a no-spend plan, receive an explicit `BLOCKED` without a Fanvue credential/approval, and read an evidence-based analytics state. No tool can self-approve its own work.

## Release status

Landing source is an implementation proposal. No deployment, full Vite build, KYC, Fanvue account connection, revenue, or backend completion is claimed by this file. See `docs/CLONELY-FANZ-2.0-PRD.md` for exact status.
