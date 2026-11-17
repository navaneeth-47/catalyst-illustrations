---
name: catalyst-illustration
description: Draw a new Catalyst empty-state / spot illustration (or restyle a reference image) directly in Figma via the Figma MCP, in the Catalyst house style. Use whenever the user asks for an illustration, icon-scene, empty state, or "redesign this in our style".
---

# Catalyst illustration workflow

## 0. Preconditions

- **Figma MCP is connected** (`use_figma`, `get_screenshot`, `create_session`). If it is not, tell the user how to connect, using the steps in CLAUDE.md, and stop.
- **Also load the Figma plugin skills `figma-use` and `figma-generate-design`** if they are available. Pass `skillNames: "figma-use,figma-generate-design"` on every `use_figma` call.
- **Target:**
  - Read [config/figma-target.json](../../../config/figma-target.json). If the user gave a Figma link, parse the fileKey and node-id from it (change `-` to `:` in the node-id).
  - Call `create_session(fileKey, task)` once and reuse its sessionId.

## 1. Understand the request

- Find the **single story** in one sentence, e.g. "data flows from client to server through a persistent pipe".
- Choose a **hero object** and **1–2 Primary accents**.
- Choose the **flow cues**: gradient arrows or light connection lines.
- **Reference images:**
  - Keep the idea and the composition.
  - Drop their colours, 3D and isometric look, glow, and the density of detail.
  - Draw front view unless the user asks for perspective.
- **Multiple references** ("design these 6 separately"): build each as its own 380×235 node. They can all go in one `use_figma` call via several `builds.push`.

## 2. Compose

Read [style/STYLE_GUIDE.md](../../../style/STYLE_GUIDE.md) and the closest recipe in [examples/](../../../examples/).

Work on a 380×235 canvas, with the hero around (190, 120) and roughly 280×180 of artwork. Build it in layers, bottom to top:

1. `blob(58–64)`
2. faint flow and decoration groups (`<g opacity="0.45–0.6">`)
3. hero body (White + `S(1.5)`)
4. inner Tint panels and bars
5. Primary accent(s) and White-Static glyphs
6. `sp()` ×2 and `dash()` ×1–2 in empty corners

Some constraints matter most:

- **Black only on strokes.** Inner elements are stroke-free.
- Black icon glyphs on a White node are fine at 1–1.2px.
- **Connectors must land on objects,** and arrows must point at something. Leave about 8–12px of clearance between arrows and objects.

## 3. Build

- Copy the full [lib/figma-build.js](../../../lib/figma-build.js).
- Set `TARGET_ID`. Replace the sample in BUILDS with your `builds.push(['Category – Name', () => \`...svg...\`])` entries.
- Send it as one `use_figma` call. The script is atomic, so on error, fix the problem and resend.
- **Set the target:**
  - `TARGET_ID` is the frame or page ID. Use `''` for the current page.
  - `START_Y` is `1650` only for the illustration-master grid. Use `0` everywhere else.
- **Check `varSource` in the result:**
  - `local` or `library`: fine.
  - `created`: the file had no Illus colours, so a local collection was made. Mention this to the user.
  - To refuse instead of creating colours, set `CREATE_VARS_IF_MISSING = false`.
- Required result for every node: `unbound: []` and `blackFills: 0`. Otherwise fix the body and rebuild. Delete the bad node first with `(await figma.getNodeByIdAsync(id)).remove()`.
- If `grewFrame` is `true`, there was no free slot, so the frame was extended to fit a new row. Mention this to the user.

## 4. Review (mandatory)

1. Run `get_screenshot` on each node at `maxDimension: 500`, using `enableBase64Response: true` if you can't fetch URLs.
2. Check it against STYLE_GUIDE §7. Look specifically for:
   - collisions
   - lines ending in empty space
   - too much Primary
   - Black lines on inner elements
   - illegible glyphs
   - an empty, under-told scene
3. Fix the problems and take one more screenshot.
4. Optional Primary measurement: save the screenshot and run `python3 tools/primary_share.py shot.png`. The target is ≤ 8% of the artwork.

## 5. Report

Tell the user, for each illustration:

- the **node IDs, names and positions**
- what it shows, in one line
- rule compliance: no Black fills, all colours bound, Primary limited

Offer one concrete tweak. Do not modify nodes the user has moved into other frames unless asked.

## 6. Keeping the kit consistent

When the user approves a new piece or gives new style feedback:

- Add the recipe to `examples/`.
- Add the rule to `style/STYLE_GUIDE.md`, so later sessions stay consistent.
