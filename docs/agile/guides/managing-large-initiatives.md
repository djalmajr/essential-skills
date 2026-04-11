# Managing Large Initiatives

End-to-end scenarios showing how to take a large initiative from strategic direction to coordinated execution across multiple stories. These skills bridge the gap between "we need to do X" and "here are the stories, in order, with dependencies."

**Skills covered:** intake, roadmap, refinement, epic, story, plan, status-report

---

## Scenario A — Strategic initiative: Payment system overhaul

The company needs to migrate from a legacy payment provider (15% transaction failure rate) to Stripe. This affects billing, invoices, payouts, and webhooks. Timeline: Q2 2026.

### Step 1: Capture the problem

```
/intake migrate payments to Stripe
```

The intake structures:
- **Problem:** Legacy provider has 15% failure rate, manual reconciliation, no webhook support
- **Objective:** Automated payments via Stripe with <1% failure rate
- **Value signal:** Unblock 3 enterprise deals worth $200K; reduce manual ops by 20h/week
- **Constraints:** No downtime during migration, PCI compliance required, Stripe SAML+OIDC only
- **Open questions:** Which Stripe plan tier? Audit requirements? Migration path for existing customers?

**Recommendation:** "This is a large, strategic problem → `/roadmap` to plan the quarters, then `/refinement` to break it down."

Save to: `planning/payment-migration/intake.md`

### Step 2: Build the roadmap

```
/roadmap payment-system-overhaul
```

The skill reads the intake and structures the initiative roadmap:

**Phase 1 (Weeks 1-3):** Foundation
- Stripe provider integration (unblocks everything)
- Webhook event handler (parallel with integration)
- *Validation:* First successful test transaction end-to-end

**Phase 2 (Weeks 4-6):** Core migration
- Payout reconciliation (depends on Phase 1)
- Customer migration (depends on Phase 1)
- *Validation:* First real customer transaction processed via Stripe

**Phase 3 (Week 7):** Cleanup
- Legacy provider decommission (depends on Phase 1+2)
- *Validation:* Zero transactions through legacy provider

**Critical path:** Stripe integration → webhook handler → payout reconciliation → legacy decommission

**Risks:** PCI audit in Q2 may conflict with Phase 2; Stripe API rate limits during migration batch

Save to: `planning/payment-system-overhaul/roadmap.md`

### Step 3: Refine into stories

```
/refinement payment-migration
```

The skill reads the intake and roadmap, then decomposes by vertical value slice:

| Story | Size | Dependencies | Phase |
|-------|------|-------------|-------|
| Stripe provider setup | S | None | 1 |
| Webhook event handler | M | Story 1 | 1 |
| Payout reconciliation | M | Stories 1, 2 | 2 |
| Customer migration | L | Story 1 | 2 |
| Legacy decommission | S | Stories 1-4 | 3 |

**Implementation order:** Story 1 first (unblocks all), Stories 2+3 in parallel after Story 1, Story 4 after Story 1, Story 5 last.

**Open decisions:** Customer migration strategy (big bang vs progressive rollout?), Stripe plan tier.

Save to: `planning/payment-migration/refinement.md`

### Step 4: Structure the epic

```
/epic payment-system-overhaul
```

The skill reads the refinement and builds the coordinated backlog:

- **Story 1:** Stripe provider integration (S, no deps) — Phase 1
- **Story 2:** Webhook event handler (M, depends on 1) ��� Phase 1
- **Story 3:** Payout reconciliation (M, depends on 1, 2) — Phase 2
- **Story 4:** Customer migration (L, depends on 1) — Phase 2
- **Story 5:** Legacy decommission (S, depends on 1-4) — Phase 3

Each story has: objective, size, dependencies, phase, and acceptance criteria summary.

Save to: `planning/payment-system-overhaul/epic.md`

### Step 5: Detail and execute stories

For each story in the epic, detail it with `/story` then create a `/plan`:

```
/story webhook event handler
```

The story maps: files, acceptance criteria (idempotency, signature verification, status updates), tasks, and verification.

```
/plan webhook-event-handler
```

The plan maps exact files, verifiable tasks, and a checklist for execution.

### Step 6: Track progress mid-initiative

Two weeks in, the product owner asks "where are we?"

```
/status-report payment-system-overhaul
```

The report consolidates from dailies, plans, and the epic:

- **Completed:** Story 1 (Stripe integration), Story 2 (Webhook handler) — 80% done, pending retry logic
- **In progress:** Story 3 (Payout reconciliation) — started, blocked on bank API docs
- **Deviations:** Story 2 scope expanded (added idempotency, approved mid-sprint)
- **Risks:** Bank API documentation delayed (owner: infra team, action: follow-up Monday)
- **Decisions needed:** Customer migration in Phase 2 or Phase 3?
- **Next steps:** Complete webhook retry logic (Friday), unblock bank API docs (Monday)

Save to: `planning/payment-system-overhaul/status-report-2026-04-25.md`

---

## Scenario B — Quarterly objective: Reduce onboarding drop-off by 40%

Product sets a Q2 OKR: "Reduce onboarding funnel drop-off from 60% to 36%."

### Step 1: Intake

```
/intake reduce onboarding drop-off by 40%
```

The intake captures: current funnel data (60% drop-off at step 3 of 5), hypotheses (too many form fields, no progress indicator, email verification friction), target (36% drop-off by end of Q2).

### Step 2: Roadmap

```
/roadmap Q2 onboarding optimization
```

The roadmap positions this alongside other Q2 initiatives:

- **Initiative 1:** Onboarding optimization (this) — primary metric: drop-off rate
- **Initiative 2:** Payments MVP — primary metric: first transaction
- **Initiative 3:** Infra reliability — primary metric: uptime

**Order:** Quick onboarding wins first (unblocks data collection), then deeper changes guided by analytics.

### Step 3: Refinement

```
/refinement onboarding drop-off
```

Decomposed by user value slice:

| Story | Size | Dependencies | Expected impact |
|-------|------|-------------|-----------------|
| Simplify signup form | S | None | -10% drop-off (remove 3 optional fields) |
| Add progress indicator | XS | None | -5% drop-off (reduce uncertainty) |
| Email verification reminders | M | Email service | -8% drop-off (recover abandoned signups) |
| Onboarding analytics dashboard | M | Story 3 | Measure actual impact |

**Critical path:** Stories 1+2 first (quick wins, no deps), then Story 3, then Story 4.

### Step 4: Epic (if needed)

With 4 stories, 2 of which are trivial, this doesn't need a full epic. Stories 1 and 2 go directly to `/plan`. Stories 3 and 4 get `/story` with acceptance criteria.

**Key insight:** Not every initiative needs every artifact. Use proportional tooling.

### Step 5: Status reports at milestones

After week 2 (quick wins shipped):
```
/status-report onboarding-optimization
```

- Completed: signup simplification (-12% drop-off, better than expected), progress indicator (-3% drop-off)
- In progress: email verification reminders
- Decision: with -15% already, do we still need the full -40% target or reallocate effort?

---

## Key takeaways

1. **Roadmap before refinement:** Strategic direction first, then decomposition
2. **Vertical slices, not layers:** "Stripe integration" (good) vs "backend changes" (bad)
3. **Epic coordinates, doesn't replace:** Each story still needs its own detail
4. **Status reports consolidate:** Mid-initiative visibility with facts, not intentions
5. **Proportional tooling:** Small initiative with clear stories? Skip the epic. Large initiative with dependencies? Use the full pipeline.
6. **Dependencies are explicit:** In the refinement, epic, and roadmap — never implicit
