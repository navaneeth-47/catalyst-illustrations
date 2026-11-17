# Catalyst Illustrations

Generate **consistent Catalyst-style illustrations in Figma** by describing what you want to Claude. Claude draws them straight into the Figma file through the Figma MCP, and uses the house style, palette variables and recipes in this repo.

## Quick start

1. **Clone and open the repo in Claude Code:**
   ```bash
   git clone <this-repo-url> catalyst-illustrations
   cd catalyst-illustrations
   claude
   ```
2. **Connect Figma MCP.**
   - **Claude Code CLI:** the repo includes `.mcp.json`, which points to the official Figma remote MCP server. Run `/mcp`, select **figma** and sign in.
   - **Claude desktop / claude.ai / VS Code:** enable the **Figma** connector in Settings → Connectors.
3. **Ask for an illustration.** For example:
   - "Empty state for *no API keys yet*"
   - "Illustration for WebSocket data streams"
   - "Redesign this in our style" (attach an image)
   - "Design these 3 separately" (attach a reference sheet)

Claude then confirms the target Figma frame and builds each illustration as a 380×235 node. It checks the result with a screenshot and reports the node IDs.

## What's inside

| Path | Purpose |
|---|---|
| `CLAUDE.md` | Session instructions for Claude: check the MCP, ask for the prompt, build. |
| `.claude/skills/catalyst-illustration/SKILL.md` | The step-by-step build and review workflow. |
| `style/STYLE_GUIDE.md` | The house style. These are hard rules. |
| `lib/figma-build.js` | The `use_figma` script. It builds from SVG, binds all paints to variables, audits Black fills and places nodes. |
| `examples/*.js` | Approved recipes for reuse (security, performance, workflow, pipeline). |
| `assets/standard-blob.svg` | The standard background blob. |
| `config/figma-target.json` | The default Figma file, frame and variable collection. |
| `tools/primary_share.py` | Measures the Primary-Blue share of a screenshot (needs Pillow). |
| `.mcp.json` | The Figma MCP server config. |

## Style in one breath

The palette is **6 Illus variables only**. **Black is used for strokes only**, never fills. **Primary-Blue goes on only 1–2 key elements**, about 7–8% of the artwork.

Main structures get a White body and a 1.5px outline. Inner details are stroke-free Tint fills. Each piece sits on the standard Bg-Blue blob, with 2 sparkles and a dash.

Flow is shown with Primary gradients that fade into the background. There is no text and there are no shadows. The look is modern and clean, but always tells the story.

## Using another Figma file

Give Claude the Figma link of the frame to draw into. The target file must contain the **"Illus Global Colors"** variables, either locally or from a library. The builder finds them by name, or imports them by key.
