# Catalyst Illustration Generator

This repo is the single source of truth for producing **Catalyst empty-state / spot illustrations** in Figma, in one consistent house style. Claude draws them directly into Figma through the **Figma MCP** server.

## Session start: always do this first

1. **Check the Figma MCP connection.** Look for Figma MCP tools, such as `use_figma`, `get_screenshot` and `create_session`. They may be deferred, so search for them with ToolSearch (`select:...use_figma,...get_screenshot,...create_session`).
   - **If they are not available,** stop and tell the user how to connect:
     - **Claude Code CLI:** this repo ships `.mcp.json` with the official remote Figma server (`https://mcp.figma.com/mcp`). Run `/mcp`, pick **figma** and authenticate in the browser.
     - **claude.ai / desktop / VS Code:** enable the **Figma** connector in Settings → Connectors, then restart the session.
   - Do not draw anything until the connection works. Call `whoami` to confirm it.
2. **Ask which Figma file and frame to draw into.** The default is in [config/figma-target.json](config/figma-target.json). Confirm it, or ask for a Figma link if the user works in another file.
3. **Ask the user what illustration they want.** A short description is enough, for example "empty state for no API keys". A reference image also works; translate it into our style. Ask one clarifying question at most. Then build.

## How to build (summary)

The full procedure is in [.claude/skills/catalyst-illustration/SKILL.md](.claude/skills/catalyst-illustration/SKILL.md). Follow it every time. In short:

1. Read [style/STYLE_GUIDE.md](style/STYLE_GUIDE.md). Its rules are hard rules.
2. Sketch the composition in your head: hero object, 1–2 Primary accents, flow cues, blob, sparkles and a dash.
3. Copy [lib/figma-build.js](lib/figma-build.js).
   - Write your illustration as a `builds.push([name, () => svgBody])` entry.
   - Start from the closest recipe in [examples/](examples/).
   - Send it as the `code` of one `use_figma` call.
4. The script binds every colour to the Illus variables, audits Black fills and places the node in a free grid slot. Make sure `unbound` is `[]` and `blackFills` is `0`.
5. Take a `get_screenshot` of each new node and look at it critically. Fix anything that is off, then report the node IDs to the user.

## Non-negotiables

These are quick reminders. The style guide has the details.

- Use only the 6 Illus colour variables. Every paint must be bound.
- **Zero Black fills.** Black (`--zcat-illus-Black`) is only ever a stroke colour.
- **Primary-Blue covers about 7–8% of the artwork.** Give it to a couple of key elements. Never shrink objects to meet the budget.
- Black 1–1.5px outlines go on main structures only. Inner elements are stroke-free fills.
- Modern, clean, not detailed, but not too minimal either. Tell the story.
- Use the standard blob ([assets/standard-blob.svg](assets/standard-blob.svg)) as the background, filled with Bg-Blue.
- The canvas is 380×235. Use no text, no shadows and no off-palette colours.
- For gradients, fade Primary into the colour behind it, never via alpha.
