# Onboarding

Guides new members through the agile workflow with AI, in a practical and progressive way.

## When to use

- New dev or manager joins the team
- Someone changes role (dev → tech lead)
- Team adopts the workflow for the first time
- Need for refresher after time away

## Recommended duration

**3 days** for complete operationalization.

## Onboarding Trail

### Day 1: Understand the Model

**Objective:** know what exists and why.

1. Present the complete flow:
   ```mermaid
   flowchart LR
       A[intake] --> B[roadmap]
       B --> C[refinement]
       C --> D{epic or story or plan}
       D --> E[epic]
       D --> F[story]
       D --> G[plan]
       E -.-> H[scan-review]
       F -.-> H
       G -.-> H
       H --> I{daily or status or post-impl}
       I --> J[retro]
   ```

2. Explain the role division:
   - **Human:** decides, validates, controls git, communicates
   - **AI:** structures, implements, verifies, reports

3. Show the decision tree:
   - When to use simple plan vs story vs epic
   - Light sizing (XS to XL)

4. Present available skills.

### Day 2: Practical Exercise — Intake and Planning

**Objective:** create an intake and a plan with AI support.

1. New member chooses a small, real problem
2. Uses `/intake` to structure
3. Decides the correct artifact with `/scrum-planning`
4. Uses `/plan` to create a plan
5. Mentor reviews and gives feedback

### Day 3: Practical Exercise — Execution with TDD

**Objective:** implement with AI support following the flow.

1. Uses the plan created on day 2
2. Executes with TDD (red-green-refactor)
3. Uses `/scan-review` before committing
4. Mentor reviews code and flow

## Onboarding deliverables

By the end, the new member should know:
- [ ] When to use each skill
- [ ] How to create intake, plan, and story
- [ ] How to track deliveries with daily/status
- [ ] How to close deliveries with post-impl
- [ ] How to use scan-review before committing

## Tip

Onboarding is not just documentation — it must include **practice**. Theory without execution doesn't stick.
