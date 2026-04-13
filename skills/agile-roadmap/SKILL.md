---
name: agile-roadmap
description: Structures quarterly roadmaps and roadmaps by epic. Use when you need to organize direction, priorities, phases, dependencies, and connection between roadmap, epics, and stories.
compatibility: opencode
metadata:
  audience: engineering
  workflow: roadmap-planning
---

# Roadmap Planning

Use this skill to transform broad objectives into clear, prioritized roadmaps connected to the executable backlog.

Initial context received via slash: $ARGUMENTS

If `$ARGUMENTS` is filled, use as starting point (e.g., intake, initiative list, period).
If empty, ask for the roadmap objective.

## Language

Write the artifact in the user's language. If the user communicates in Portuguese, write in Portuguese with correct grammar and accents. If in English, write in English. When in doubt, ask the user which language to use. Templates are in English — translate headers and content to match.

## Scope
- `quarterly roadmap`: direction alignment, period objectives, and macro priorities
- `roadmap by epic`: phases, stories, unblocks, and delivery order for an initiative

## Operating rules
- Roadmap must focus on results and capabilities, not extensive technical lists.
- Every roadmap item must indicate expected value, dependencies, and progress signal.
- The roadmap must show what is a commitment, what is a risk, and what is outside the period.
- Whenever possible, each initiative should point to a corresponding epic.

## How to build quarterly roadmap
1. Declare the period objective.
2. List 2-5 main initiatives.
3. Order initiatives by dependency and value.
4. Register risks, constraints, and items outside commitment.
5. Validate that the quarter's narrative is observable.

## How to build roadmap by epic
1. Declare the epic objective.
2. Define phases or delivery waves.
3. Relate stories by phase.
4. Make unblocks, risks, and intermediate validations explicit.
5. Confirm that the roadmap guides execution without replacing plans.

## Where to save

- Quarterly roadmap: `planning/roadmaps/Q<N>-YYYY.md`
- Initiative roadmap: `planning/<initiative>/roadmap.md`

## Collaborative work

When the team has 2+ developers, the roadmap should:
- Identify parallel tracks (e.g., Backend, Frontend, AI Engineering) so devs can work simultaneously
- Define interface contracts between tracks to minimize blocking
- Show which stories/phases can run in parallel in the timeline
- Ask about team size and composition during roadmap creation

## Chaining

At the end of the roadmap, offer **only** `/epic`:
- "Do you want me to run `/epic` to decompose the first initiative into stories?"

> **Important:** The roadmap identifies initiatives at a macro level. Each initiative should be decomposed via `/epic` before execution.

## Template

Use `~/.agents/templates/roadmap.md` as base.

## Relationship with the flow

```mermaid
flowchart LR
    A["/intake"] --> B["/roadmap"]
    B --> C["/epic"]
    C --> D["/task"]
    D --> E[execution]
    E --> F["/status"]
```

This skill connects strategy and execution. For decomposition, use `/epic`. For execution planning, use `/task`.
