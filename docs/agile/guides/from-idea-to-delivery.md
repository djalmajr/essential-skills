# From Idea to Delivery

End-to-end scenarios showing how skills chain together to take a problem from first contact to formal closure. Each scenario uses a different domain and team size to show flexibility.

**Skills covered:** intake, planning-router, task-plan, story, scan-review, daily, delivery, post-impl

---

## Scenario A — Urgent bug fix (solo dev)

A security report arrives: "Password reset tokens never expire — users can reuse old links indefinitely."

### Step 1: Capture the problem

```
/intake password reset tokens not expiring
```

The skill asks clarifying questions. You provide:
- **Problem:** Tokens never expire. Security risk — any old link still works.
- **Who's affected:** All users with password reset capability.
- **Urgency:** High — security vulnerability.
- **Constraints:** Must not break existing valid tokens in the next 24h.

The intake structures: context (security bug), objective (tokens expire after 1h), value signal (close vulnerability).

**Recommendation:** "This is small, clear, and localized → `/task-plan` directly."

### Step 2: Route to the right artifact

Since intake already recommended `/task-plan`, you skip the router. But if unsure:

```
/planning-router password reset token expiry
```

The router evaluates: "1 area, few files, simple validation. This is a small, localized change → `/task-plan`."

### Step 3: Create the execution plan

```
/task-plan password reset tokens not expiring
```

The skill explores the codebase and produces:

- **Context:** AS-IS: tokens valid forever. TO-BE: tokens expire after 1 hour.
- **Files:** `src/auth/tokens.ts` (alter), `src/auth/password-reset.ts` (alter), `src/__tests__/auth/tokens.test.ts` (alter)
- **Tasks:**
  - `[ ]` Add `EXPIRY_MS` constant to `tokens.ts`
  - `[ ]` Update `createResetToken` to include expiry timestamp
  - `[ ]` Add `isTokenExpired` check in `verifyResetToken`
  - `[ ]` Write tests for expired tokens
  - `[ ]` Run lint, typecheck, tests
- **Verification:** `bun run lint`, `tsc --noEmit`, `bun test`, manual test in staging

You confirm. Implementation begins.

### Step 4: Review before committing

```
/scan-review
```

The skill reads the diff and applies the checklist:
- **Security:** inputs validated, no injection, no hardcoded secrets — all pass
- **Coherence:** follows existing token pattern — pass
- **Over-engineering:** no unnecessary abstractions — pass
- **Scope:** only token expiry, no unrelated changes — pass
- **Quality:** tests cover expired and valid scenarios — pass

Result: all clear, no red flags.

### Step 5: Close the delivery

```
/post-impl password-reset-expiry
```

The skill compares plan vs reality:
- **Delivered:** all 5 tasks completed
- **Pending:** none
- **Verification:** lint pass, typecheck pass, tests pass (12 tests, 2 new)
- **Risks:** monitor password reset flow in prod for 48h
- **Next step:** none — delivery closed

**Total time: ~45 minutes from report to closure.**

---

## Scenario B — Medium feature (dev in a team)

Product requests: "When an order status changes, send an email notification to the customer."

### Step 1: Intake

```
/intake order status email notifications
```

Clarifying questions reveal:
- Statuses that trigger emails: `confirmed`, `shipped`, `delivered`, `cancelled`
- Email templates: one per status, using existing template engine
- Constraint: must not slow down order processing (async)
- Out of scope: SMS, push notifications, notification preferences

**Recommendation:** "This is a vertical delivery with several files and moderate validation → `/story`."

### Step 2: Detail the story

```
/story order status notifications
```

The skill maps:
- **In scope:** Event listener for status changes, email sender, 4 templates, tests
- **Out of scope:** SMS, push, preferences UI
- **Files:** `src/orders/events.ts` (alter), `src/notifications/email-sender.ts` (create), `src/notifications/templates/` (create 4), `src/__tests__/notifications/` (create)
- **Acceptance criteria:**
  - AC1: Status change to `confirmed` triggers confirmation email within 5s
  - AC2: Status change to `shipped` includes tracking number in email
  - AC3: Status change to `cancelled` triggers cancellation email with refund info
  - AC4: Email sending is async — order API response time unchanged
  - AC5: Failed email send is retried 3x, then logged as error (no user-facing failure)
- **Tasks:** 8 tasks in vertical slices (event listener → sender → templates → tests)
- **Verification:** `bun test`, manual email check in staging with Mailtrap

You confirm. Implementation begins.

### Step 3: Daily tracking (3 days)

**Day 1:**
```
/daily order-notifications
```
- Completed: event listener, email sender skeleton
- Blockers: none
- Next step: implement confirmation and shipped templates

**Day 2:**
```
/daily order-notifications
```
- Completed: 4 email templates, unit tests for sender
- Blocker: Mailtrap credentials not in staging env — owner: devops, action: Slack message sent
- Next step: integration tests once staging is configured

**Day 3:**
```
/daily order-notifications
```
- Completed: integration tests, all AC verified in staging
- Blockers: resolved (devops added Mailtrap creds)
- Next step: scan-review and close

### Step 4: Review and close

```
/scan-review order-notifications
```

Flags one issue: duplicated email validation logic in sender and templates. Fix: extract to shared utility. Re-review passes.

```
/post-impl order-notifications
```

- **Delivered:** all 8 tasks, all 5 AC met
- **Scope change:** none
- **Verification:** lint, typecheck, tests all pass. Manual: 4 emails received in staging.
- **Next step:** monitor email delivery rate in prod for 1 week

---

## Scenario C — Quick fix without intake

A designer reports: "The submit button on the settings page says 'Salvar' but should say 'Save Changes'."

This is trivial — no intake needed.

```
/task-plan fix submit button label on settings page
```

The skill produces a 3-task plan:
1. `[ ]` Change label in `src/pages/settings/SettingsForm.tsx`
2. `[ ]` Update snapshot test
3. `[ ]` Run `bun test`

Implement, verify, commit. No daily, no post-impl — proportional to the size.

---

## Scenario D — Uncertain scope (delivery router)

Someone asks: "What's the status on the auth refactor?"

You're not sure whether to do a daily, a status report, or close it out.

```
/delivery
```

The router asks: "What type of tracking? Quick daily, period consolidation, or closure?"

You explain: "We're 1 week into a 2-week effort and the PM asked where we are."

**Recommendation:** `/status-report` — this is a mid-flight consolidation, not a daily checkpoint.

```
/status-report auth-refactor
```

The report consolidates: 3 of 7 stories completed, 1 blocker (SSO provider API), 2 pending decisions (migration strategy, backward compat). Next steps with owners and dates.

---

## Key takeaways

1. **Proportional artifacts:** Small changes → task-plan, medium deliveries → story, trivial → task-plan without intake
2. **Intake is optional:** Skip it when the problem is already clear
3. **Scan-review before committing:** Catches scope creep, security issues, over-engineering
4. **Daily tracks real state:** Blockers have owners and actions, not just "blocked on X"
5. **Post-impl closes the loop:** Compares plan vs reality honestly
6. **Delivery router when unsure:** Guides you to daily vs status-report vs post-impl
