---
name: agile-onboarding
description: Onboarding guide for new team members in the agile flow with AI. Use when someone new joins the team and needs to understand how the planning, execution, and tracking flow works with AI agents.
compatibility: opencode
metadata:
  audience: engineering
  workflow: onboarding
---

# Onboarding

Use this skill to guide new team members through the agile + AI flow, in a practical and progressive way.

## Objective

- Provide context about the operational model (Light Scrum + AI as pair)
- Teach the artifact flow in practice, not theory
- Ensure the new member can operate autonomously in 1-2 sprints
- Avoid onboarding being just documentation — it must include practice

## When to use

- New dev or manager joins the team
- Someone changes roles (dev becomes tech lead, for example)
- The team adopts the flow for the first time
- Someone needs retraining after time away

## Onboarding trail

### Day 1: Understand the model

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
       E --> H[scan-review]
       F --> H
       G --> H
       H --> I{daily or status or post-impl}
       I --> J[retro]
   ```

2. Explain the role division:
   - Human: decides, validates, controls git, communicates
   - AI: structures, implements, verifies, reports

3. Show the decision tree:
   - When to use simple plan vs story vs epic
   - Scope assessment (small to large)

4. Show the available skills and how to invoke each one.

### Day 2: Practical exercise — intake and planning

**Objective:** create an intake and a simple plan with AI support.

Suggested exercise:

1. The new member chooses a small, real problem (bug, improvement, task)
2. Uses the `intake` skill to structure the problem
3. Decides the correct artifact with the decision tree
4. Uses `scrum-planning` to create the plan or story
5. The mentor/tech lead reviews and gives feedback

### Day 3: Practical exercise — execution with TDD

**Objective:** implement something using the plan -> TDD -> verification flow.

Suggested exercise:

1. Take the plan created on day 2
2. Implement using TDD with AI as pair:
   - Describe the expected behavior
   - AI writes the test (red)
   - AI implements (green)
   - Dev requests refactoring if necessary
3. Run verifications (lint, types, tests)
4. Review the diff before committing

### Day 4: Practical exercise — tracking

**Objective:** generate daily and close with post-implementation report.

1. Use `delivery-management` to generate the daily delivery
2. Simulate a status report
3. Close the delivery with post-implementation report
4. Review the complete chain: plan -> execution -> daily -> report

### Day 5: Reflection and autonomy

**Objective:** assess if the new member is ready to operate autonomously.

1. The new member conducts an intake alone
2. Creates plan or story without mentor help
3. Implements with TDD
4. Closes with report
5. Mentor validates and gives final feedback

## Onboarding checklist

- [ ] Understands the complete flow (intake to retro)
- [ ] Knows how to choose the right artifact (decision tree)
- [ ] Can create plan or story with AI support
- [ ] Knows how to use TDD with AI as pair
- [ ] Knows how to generate daily and post-implementation report
- [ ] Understands the responsibility division (human vs AI)
- [ ] Knows which skills are available and when to use each one
- [ ] Completed at least one full cycle (intake -> report) with supervision

## Adaptation by profile

### For devs
- Focus on: TDD, pair programming with AI, quality gates, git workflow
- Extra exercise: implement a small feature from scratch using the flow

### For managers / scrum masters
- Focus on: roadmap, refinement, sprint planning, retro, status reports
- Extra exercise: conduct a refinement and sprint planning with AI support

### For tech leads
- Both focuses: planning and execution
- Extra exercise: review AI-generated code and give constructive feedback

## Rules

- Onboarding is not passive. The new member must practice, not just read.
- The mentor does not do it for the new member — guides and reviews.
- Onboarding mistakes are opportunities, not failures. The environment must be safe to experiment.
- If the new member cannot complete the checklist in 5 working days, the problem may be the process, not the person. Discuss in retro.

## Relationship with the flow

This skill acts as the entry point to all others. After onboarding, the member should be able to invoke `scrum-planning`, `tdd`, `delivery-management`, and `scrum-ceremonies` autonomously.
