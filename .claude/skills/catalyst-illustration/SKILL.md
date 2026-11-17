---
name: catalyst-illustration
description: Draw a new Catalyst empty-state / spot illustration (or restyle a reference image) directly in Figma via the Figma MCP, in the Catalyst house style. Use whenever the user asks for an illustration, icon-scene, empty state, or "redesign this in our style".
---

# Catalyst illustration workflow

## 0. Preconditions

- **Figma MCP is connected** (`use_figma`, `get_screenshot`, `create_session`). If it is not, tell the user how to connect, using the steps in CLAUDE.md, and stop.
- **Also load the Figma plugin skills `figma-use` and `figma-generate-design`** if they are available. Pass `skillNames: "figma-use,figma-generate-design"` on every `use_figma` call.
- **The user has opened illustration-master:**
  - Always ask them to open https://www.figma.com/design/4b0Qe4JYow6jNjOvKbLbIX/illustration-master?node-id=12835-21 and confirm before you draw.
  - The fileKey is `4b0Qe4JYow6jNjOvKbLbIX`. The full target details are in [config/figma-target.json](../../../config/figma-target.json).
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

Read [style/STYLE_GUIDE.md](../../../style/STYLE_GUIDE.md), especially §8, layout variety.

- **Pick a layout type** that fits the story, and that hasn't dominated the frame's recent illustrations. Run a quick read-only `use_figma` call to list the names and positions of the last 8 nodes.
- **Look at the approved recipes for quality only:** finish, Primary use, how connectors land.
  - These are the layers in the Figma file whose names start or end with **"Star"**. List them live, then screenshot the 2–4 closest to the brief.
  - Read [examples/approved/INDEX.md](../../../examples/approved/INDEX.md) for what they teach: thin 1px strokes, 1–2 big overlapping objects, diagonal Tint shading, tiny Primary, double dash.
- **Don't copy a recipe's arrangement.** Build from the shape kit in `lib/figma-build.js`.

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

## 2b. Prefer the designer's own parts (highest quality)

Hand-drawn parts beat code-drawn shapes, so compose from the **designer's originals** whenever a needed object exists among the Star layers in Frame 2367:
- the robot chat bubble from Chat
- the robot from Chatbot
- the database cylinder from Data Store or Database Sync
- the window from Functions
- documents, folders and bins
- the Primary badge from Database Sync
- the blob and the double dash (`Line-8`)

How:
1. In one `use_figma` call, find the part by name inside its Star frame.
2. `clone()` it, `appendChild` it into a new 380×235 frame in AI Illustration, and `rescale()` or position it.
3. Remove any sub-parts you don't need. Check them first: groups sometimes contain extra objects.
4. Swap badge glyphs by keeping the badge circle and adding a White-Static glyph.
5. Apply the 1.4px stroke rule and fit the blob.

Composition: 1 big hero plus 1 overlapping secondary object, and a Primary badge on the seam where they meet.

Draw new shapes with the SVG builder only when no suitable part exists. Keep them few and large, in the same visual language as the parts.

Reference result: "New recipe result v2" (node `13388:2`). It's the Chat robot bubble over the Data Store cylinder, with the Database Sync badge turned into an MCP plug.

## 3. Build

- Copy the full [lib/figma-build.js](../../../lib/figma-build.js).
- Set `TARGET_ID`. Replace the sample in BUILDS with your `builds.push(['Category – Name', () => \`...svg...\`])` entries.
- Send it as one `use_figma` call. The script is atomic, so on error, fix the problem and resend.
- **The target is fixed:** `TARGET_ID = '12835:21'`, the frame "AI Illustration" on page "New" of illustration-master. Change it only if the user explicitly asks for another place.
- Placement is automatic: the end of the last row, a 40px gap, and a new row every 460px. A caption is added under each illustration, made from the part of the name after "–". Name builds `Category – Caption`.
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
