# Design prototype: <Initiative>

**Tool:** <Paper | Figma | Pen.dev | Penpot | other>
**File / link:** <path or URL>
**Identity source:** <root `DESIGN.md` | brief below | tool defaults>
**Planning refs:** <intake / roadmap / epic paths>

## Brief (only when there is no root `DESIGN.md`)

- Palette:
- Type scale:
- Spacing:
- Tone / voice:

## Flows

### <Flow name> (<flow-id>)

Goal: <what the user achieves>

1. `<screen-id>` — <one line>
2. `<screen-id-state>` — <one line>
3. `<screen-id>` — <one line>

## Screens and states

| ID | Type | Section / page | Note summary | Refs |
|---|---|---|---|---|
| `<screen-id>` | screen | <section> | <one line> | REQ-.., ST-.., BR-.. |
| `<screen-id-state>` | state | <section> | <one line> | REQ-.., ST-.., BR-.. |

## Reusable pieces

| Name | Where | Used by |
|---|---|---|
| <Shell / Nav / Card> | <page or section> | `<screen-id>`, … |

## Validation

- [ ] Every screen and state has a stable ID, a matching name in the tool, and one paired note
- [ ] Every action points to an existing destination ID or is marked out of scope
- [ ] Every flow walks from entry to exit using only IDs in this index
- [ ] Every referenced requirement, story, and business-rule ID exists in planning
- [ ] Identity follows `DESIGN.md` or the brief above
- [ ] No overlapping frames; sections ordered by flow
- [ ] Visible copy has no internal notes, IDs, or placeholder text

## Open questions

- <question> — <who decides>

## Recommended next step

- `/agile-epic` or `/agile-story` with these IDs under **Prototype refs**

<!-- Save to: planning/<initiative>/design/README.md -->
