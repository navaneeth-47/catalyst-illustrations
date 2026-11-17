# Catalyst Illustration Style Guide

These rules were learned from the existing ~70 Catalyst illustrations and from repeated design-review feedback. **Treat every rule as hard** unless it says otherwise.

## 1. Palette (only these 6, always bound to variables)

The variables live in the local collection **"Illus Global Colors"**.

| Variable | Hex | Use |
|---|---|---|
| `--zcat-illus-Black` | `#101F3E` | **Strokes only.** Outlines, glyph lines, sparkles, dashes. |
| `--zcat-illus-Primary-Blue` | `#2A65F0` | Hero accent: badge, active item, key node, arrowheads, flow gradients. |
| `--zcat-illus-White` | `#FFFFFF` | Object bodies: cards, windows, devices, circles. |
| `--zcat-illus-White-Static` | `#FFFFFF` | Glyphs/ticks drawn **on top of Primary**. Write `#FFFFFE` in the SVG; the builder maps it. |
| `--zcat-illus-Tint-blue` | `#E8F0FE` | Inner fills, skeleton bars, panels, halos, bands. |
| `--zcat-illus-Bg-Blue` | `#F3F7FF` | Background blob, and the "fade-to" colour for gradients on the blob. |

Red (`Red-1` / `Red-4`) is used **only** for genuine error states.

No other colours are allowed: no greys, off-blues, purples, teals or oranges. When you translate a reference image, drop its colours entirely.

## 2. Hard rules

1. **Zero Black fills.** Black is never a fill, at any size or opacity. This covers knobs, dots, ticks, bars, toggles and glyphs. Show on/off with White vs Tint vs Primary instead.
2. **Primary-Blue budget is about 7–8% of the artwork,** measured over artwork plus blob, not the empty canvas. That is roughly 4–4.5% of the 380×235 canvas.
   - Reach it by giving Primary to only **a couple of key elements**, for example the hero badge plus one active item.
   - **Never shrink objects** to hit the budget.
   - Check with `python3 tools/primary_share.py screenshot.png`.
3. **Don't overuse Black lines.**
   - Black outlines go on main structures only: windows, cards, devices, shields, circles, tubes, and their dividers, plus arrows, sparkles and dashes.
   - Inner elements are **stroke-free fills**, separated by Tint / White / Primary contrast. Inner elements include bubbles, dots, slots, bars, buttons and graph nodes.
4. **Keep it simple, but not too minimal.**
   - Use few, large shapes and at most ~3 bubbles or rows per container. Avoid avatars, vents and micro-icons unless they are essential.
   - Still tell the story: put real content in containers, use flow cues (packets, arrows) and add one "moment of action" accent.
5. **No text, no shadows, and no outline-free floating clutter.**
6. **Every paint is bound** to a variable, including gradient stops.

## 3. Geometry

- **Canvas:** 380×235. Keep the hero centred near (190, 120).
- **Strokes. Hard rule: always 1.4px unless the user specifies otherwise.**
  - Every Black stroke is 1.4px with round caps and joins: outlines, dividers, connector lines, glyph lines, sparkles and dashes.
  - The builder enforces this automatically.
  - Exceptions:
    - Coloured accent strokes keep their designed width: Primary flow lines and arrows at 2–3px, White-Static glyphs on Primary.
    - Thick "band" strokes (> 4px) used to draw handles and palms keep their width.
- **Corner radii:** 5–8 for containers, 3 for bars, 1.5–2 for tiny cells.
- **Skeleton bars:** Tint, 3–6px tall, fully rounded.

## 4. Composition recipe

1. **Background blob:** use [assets/standard-blob.svg](../assets/standard-blob.svg) in Bg-Blue. It must be the first child, named `Background`.
   - **Hard rule: always resize the blob to suit the illustration.** Never leave it full-width by default, because on compact pieces it looks far too big.
   - **Width:** about 1.3× the artwork width, keeping the aspect ratio. The minimum is 220 and the maximum is the 380 canvas.
   - **Placement:** centre it horizontally behind the hero, sitting slightly low so it grounds the hero.
   - Ignore sparkles, dashes and dots when measuring the artwork.
   - The builder's `fitBlob()` does this automatically. If you hand-edit an illustration, re-check the blob.
2. **Hero object:** White body with a Black outline and a Tint inner panel.
3. **1–2 Primary accents,** such as a badge with a White-Static glyph, an active node, a key arrow, or a gauge.
4. **Flow and story cues:** gradient lines with Primary chevron heads, or light Primary connection lines at group opacity 0.4–0.55.
5. **Decoration:** 2 sparkles (a "+" with a gap in the centre) and 1–2 short dashes, placed in empty corners.
6. **Optional:** small Tint dots, or a secondary White card with a 1px outline.

## 5. Gradients (allowed for flow)

- Fade **Primary into the colour behind it**: Bg-Blue on the blob, White inside cards.
- Bind both stops at alpha 1. Control strength with **node or group opacity**.
- **Never rely on stop alpha or paint alpha.** Variable-bound stops lose their alpha when the node is cloned or copied, and the fade turns solid.

## 6. Transparency

Light lines use **group opacity** (`<g opacity="0.45">`), never paint alpha.

## 7. Reviewing before you hand off

Check every item on this list:

- [ ] The builder returned `unbound: []` and `blackFills: 0`.
- [ ] The screenshot reads clearly at 380×235. The hero is obvious within a second.
- [ ] Primary appears on only 1–2 key elements, or is measured at ≤ 8%.
- [ ] Black outlines appear only on main structures.
- [ ] Nothing ends in empty space: connectors land on objects and arrows point at something.
- [ ] The blob is behind everything, and the sparkles and dash don't collide with objects.
- [ ] The layer is named meaningfully, e.g. `Security – Secure Code`.

## 8. Avoid redundant designs (layout variety)

Reuse **parts** and **quality**, never **layouts**.

| Reuse freely | Never copy |
|---|---|
| Shape kit (cloud, monitor, gear, shield, badge, server, window, connectors), stroke and fill rules, spacing, Primary budget, blob fitting | The overall arrangement of an existing recipe or illustration |

Recipes in `examples/` are **quality references**. Study them for finish and problem-solving, but don't use them as templates.

Before composing, pick one **layout type** that fits the story:

1. **Hub & spokes:** a centre object with radiating nodes.
2. **Left → right flow:** inputs → core → outputs.
3. **Loop / cycle:** objects around a centre, with arrows that circulate.
4. **Branching tree:** one source fanning down or out.
5. **Hero + badge:** one big object with a Primary badge or accent overlapping it.
6. **Overlap / layered:** 2–3 objects stacked in depth, like a window over a card over a device.
7. **Stack / layers:** vertical layers or tiers.
8. **Before / after or exchange:** two objects with something passing between them.
9. **Container + contents:** a cloud, window or shield holding the story.

**Difference check before building:**
- Look at the 6–8 most recent illustrations in the frame, and avoid the layout type used most among them.
- Make sure the new piece doesn't share layout type, hero shape *and* position with its nearest neighbour. If it would, rearrange it.

## 9. Where illustrations live

New illustrations always go into **illustration-master → page "New" → frame "AI Illustration" (`12835:21`)**. The frame is laid out in rows, with a 40px gap between items, rows about 460px apart, and an Inter 12 caption 82px below each illustration.

Because every paint is bound to the Illus variables, switching the frame's variable mode (Light / Dark) re-themes all the illustrations.
