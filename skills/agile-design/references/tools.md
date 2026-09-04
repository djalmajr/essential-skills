# Tool adapters

How the tool-neutral organization in `SKILL.md` maps onto each design tool, and how the agent operates it. Use the tool the project already uses. When several are available, prefer the one with an MCP connection in the current session.

| Concept in SKILL.md | Paper | Figma | Pen.dev (`.pen`) | Penpot | Excalidraw / tldraw |
|---|---|---|---|---|---|
| Functional section | Page | Page or Section | Section frame | Page | Region of the canvas with a title |
| Screen / state | Artboard | Frame | Frame | Board | Rectangle group with a title |
| Paired note | Text block beside the artboard, or a comment thread | Text layer or sticky beside the frame | Note frame | Text beside the board | Text element beside the group |
| Reusable piece | Component | Component / variant | Reusable node with `ref` | Component | Library item or duplicated group |
| Identity source | Tokens in the file, seeded from `DESIGN.md` | Variables / styles, seeded from `DESIGN.md` | Variables, seeded from `DESIGN.md` | Tokens / typographies | Palette recorded in the index |

## Operating each tool

**Paper.** Use the Paper MCP tools. Load the guide once per session, read basic info and selection, write one visual group per call, name artboards with the ID convention, and finish with the tool's completion call. Fonts and tokens come from the file or from `DESIGN.md`.

**Figma.** Load the `figma-use` skill before any write call, and `figma-generate-design` when composing full pages. Name frames and pages with the ID convention. Use the file's variables for identity; do not hardcode values that `DESIGN.md` already defines.

**Pen.dev.** Use the Pencil MCP tools only; never read or write `.pen` files with generic file tools. Frames, notes, and sections follow the naming in `SKILL.md`. Use variables for identity.

**Penpot.** Use the Penpot MCP when connected; otherwise instruct the user through the UI. Boards are screens; text beside boards are notes.

**Excalidraw / tldraw.** Use the `excalidraw` skill or the `tldraw-offline` agent. Group each screen and put its title and ID in a text element; keep notes as adjacent text. These tools suit wireframe fidelity.

**Another tool.** Apply the same concepts: one container per section, one frame per screen or state, one note per frame, IDs in names. Record the tool and the file location in the prototype index.

## Common rules across tools

- The prototype index under `planning/<initiative>/design/README.md` is the artifact planning reads; the design file is the visual source.
- Do not export screenshots as the primary record. Export by ID only for stakeholder review.
- Do not maintain a catalog that mirrors a code component library, and do not record design-layer-to-code mappings.
- When the tool has native prototyping links, wire actions to destination frames; the note still lists destination IDs so the flow is readable without the tool.
