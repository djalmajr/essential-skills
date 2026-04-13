# Getting Started

How to onboard into the agile + AI workflow, choose the right skill, and validate ideas with prototypes before committing to implementation.

**Skills covered:** onboarding, proto, router

---

## Quick reference: Which skill do I use?

### Decision tree

```mermaid
flowchart TD
    A[New problem or request] --> B{Is the problem clear?}
    B -- No --> C["/intake"]
    B -- Yes --> D{What size?}
    D -- "Small, localized" --> E["/task"]
    D -- "Medium, several files" --> F["/epic"]
    D -- "Large, needs decomposition" --> F
    C --> H{Intake recommends...}
    H -- Strategic --> I["/roadmap"]
    I --> F
    H -- Needs decomposition --> F
    H -- Clear enough --> D

    L[Need to track progress?] --> M{What kind?}
    M -- Quick checkpoint --> N["/status<br>(checkpoint)"]
    M -- Period consolidation --> O["/status<br>(consolidation)"]
    M -- Delivery closure --> P["/status<br>(closure)"]

    Q[Need a ceremony?] --> R{Where in cycle?}
    R -- Starting sprint --> S["/planning"]
    R -- Sprint ended --> T["/review then /retro"]
    R -- Backlog unclear --> F
```

### Cheat sheet

| I need to... | Use |
|---|---|
| Capture a vague problem | `/intake` |
| Decide which skill to use | `/router` |
| Plan a small, localized change | `/task` |
| Decompose and structure a large initiative | `/epic` |
| Set strategic direction | `/roadmap` (then `/epic`) |
| Validate planning artifacts | `/refinement` (planning lint mode) |
| Review code before committing | `/refinement` (code review mode) |
| Quick daily checkpoint | `/status` (checkpoint mode) |
| Period/milestone consolidation | `/status` (consolidation mode) |
| Close a delivery formally | `/status` (closure mode) |
| Plan a sprint | `/planning` |
| Demo deliveries to stakeholders | `/review` |
| Get sprint numbers | `/metrics` |
| Reflect and improve | `/retro` |
| Validate a UI flow interactively | `/proto` |
| Onboard a new team member | `/onboarding` |

---

## Scenario A -- Onboarding a new backend developer

A new backend dev joins the team and needs to learn the flow.

### The 5-day trail

```
/onboarding
```

**Day 1 -- Understand the model:**
- Walk through the complete flow: intake -> roadmap -> epic -> task -> execution -> status -> retro
- Explain role division: human decides, AI structures
- Show the decision tree above
- List all available skills

**Day 2 -- Practical exercise (intake + planning):**
- Pick a real small problem (e.g., "add rate limiting to the API")
- Run `/intake rate limiting` -> skill asks questions, structures the problem
- Use `/router` to decide: it's a small change -> `/task`
- Create the plan. Mentor reviews.

**Day 3 -- Practical exercise (TDD + execution):**
- Implement the rate limiting plan using TDD with AI as pair
- Write failing test (red), implement (green), refactor
- Run lint, typecheck, tests
- Run `/refinement` (code review mode) -- review the diff together

**Day 4 -- Practical exercise (tracking):**
- Generate a `/status` checkpoint for the rate limiting work
- Simulate a `/status` consolidation for the week
- Close with `/status` closure mode

**Day 5 -- Full solo cycle:**
- The dev picks a new problem and runs the entire cycle independently:
  intake -> task -> TDD -> status -> closure
- Mentor validates and gives final feedback

### Onboarding checklist

- [ ] Understands the complete flow (intake to retro)
- [ ] Knows how to choose the right artifact (decision tree)
- [ ] Can create a task or epic with AI support
- [ ] Knows how to use TDD with AI as pair
- [ ] Can generate status checkpoints and closure reports
- [ ] Understands the human vs AI responsibility division
- [ ] Knows which skills exist and when to use each
- [ ] Completed at least one full cycle with supervision

---

## Scenario B -- Onboarding a new scrum master

A new scrum master joins and needs to learn the ceremony skills.

```
/onboarding
```

The trail adapts for a management profile:

- **Focus:** `/roadmap`, `/epic`, `/planning`, `/retro`, `/status`
- **Less:** TDD implementation details
- **More:** Structuring backlogs, running ceremonies, tracking progress
- **Exercise:** Conduct a real `/epic` decomposition for a backlog item, then run `/planning` with AI support
- **Same checklist** but with management emphasis

---

## Scenario C -- Prototyping before implementing

The design team wants to validate a 4-step onboarding wizard before engineering builds it.

### Create the prototype

```
/proto onboarding wizard with 4 steps
```

The skill creates a standalone interactive prototype in `client-proto/`:
- `routes/onboarding/step-1.js` -- Account info
- `routes/onboarding/step-2.js` -- Team setup
- `routes/onboarding/step-3.js` -- Integration preferences
- `routes/onboarding/step-4.js` -- Confirmation

**Stack:** z-proto + daisyUI + Preact/htm + Tailwind v4. Zero build tools.

All forms are pre-filled with mock data. Run `bunx serve -s .` -> stakeholders click through the wizard.

### Validate and transition to real implementation

Stakeholders approve the flow but request changes:
- Merge steps 2 and 3 (too granular)
- Add a "skip for now" option on step 2

Update the prototype, re-validate, then:

```
/epic onboarding wizard implementation
```

The epic references the prototype as the validated design. Story acceptance criteria match the prototype behavior.

### Key rules for prototypes

- **Self-contained:** `client-proto/` has its own files, no build tools
- **daisyUI components:** Use the component wrappers provided
- **Icons via `<Icon>`:** Use `<Icon icon="lucide:search" />`, never `lucide-react`
- **Mock data inline:** Forms pre-filled, lists hardcoded
- **Prototypes are throwaway:** Don't architect for reuse

---

## Using the router when unsure

Don't know which skill to use?

```
/router add multi-language support to onboarding
```

The router evaluates: "Multi-language touches i18n, translation files, UI components, content management. This is a large initiative -- I recommend structuring it as an `/epic`."

The router covers three areas:
- **Planning:** What artifact do I need? (task, epic, roadmap, intake)
- **Ceremonies:** Where am I in the sprint cycle? (planning, review, retro)
- **Tracking:** How do I report progress? (status checkpoint, consolidation, closure)

---

## Key takeaways

1. **Onboarding is practice, not reading:** The new member does real work from Day 2
2. **Adapt by role:** Devs focus on TDD, managers focus on ceremonies
3. **Prototype before implementing:** Validate UI flows interactively, then transition to real epics
4. **When in doubt, use the router:** `/router` guides you to the right skill
5. **The decision tree is your compass:** Print it, bookmark it, reference it until it's second nature
6. **Epic handles decomposition:** Large items go through `/epic` for decomposition into stories
