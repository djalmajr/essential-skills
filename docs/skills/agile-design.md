# agile-design

Prototype screens, states, and flows in **any design tool** (Paper, Figma, Pen.dev, Penpot, Excalidraw, tldraw, or another canvas). The skill owns the process: a tool-neutral canvas organization, stable screen and state IDs, one paired note per frame, and a prototype index that planning and implementation read. It does not own a component catalog, a capture pipeline, or a design-to-code mapping.

## Use it when

- validating a UI flow in a design tool before production implementation;
- creating screens or behavior-changing states (loading, empty, error, confirmation, dialogs);
- organizing an existing design file so stories can cite it;
- aligning requirements, stories, and business rules with design screens.

Do not use it for browser HTML prototypes (`/agile-proto`), production UI under the root `DESIGN.md` contract (`/design-workflow`), backend integration, or delivery tracking.

## Invoke

```text
/agile-design onboarding wizard with account, team, and review states
```

The tool is inferred from the project (existing file, link in planning docs, or MCP connected in the session); otherwise the skill asks.

## Contract

- IDs are assigned before drawing (`<initiative>-<screen>`, `<initiative>-<screen>-<state>`) and never change after a story cites them.
- One page or board per functional section; screens in rows of at most three; states next to their screen in trigger order.
- Every screen and state has one paired note (`templates/screen-note.md`) with refs, trigger, actions with destination IDs, visible rules, and open questions.
- `planning/<initiative>/design/README.md` (`templates/prototype-index.md`) lists tool, file, identity source, flows, screens, states, and validation.
- Root `DESIGN.md` is the identity source when it exists; otherwise a short brief is recorded in the index.
- Internal commentary stays in notes and the index, never in the product surface.

## Validation

IDs and names match between tool and index; every action has a destination ID; every flow walks end to end; every referenced planning ID exists; behavior-changing states have their own frame; no overlaps; no placeholder copy. Gaps are warnings and debt, not blockers.

## Chaining

- **Before:** `/agile-intake`, `/agile-epic` (requirement and story IDs).
- **After:** `/agile-epic` or `/agile-story` with **Prototype refs**; `/design-workflow` for production UI; `/ux-flows` for the flow catalog.

Tool mechanics per design tool: `skills/agile-design/references/tools.md`.
