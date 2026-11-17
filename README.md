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
3. **Open the illustration-master file in Figma** when Claude asks. You need edit access:
   https://www.figma.com/design/4b0Qe4JYow6jNjOvKbLbIX/illustration-master?node-id=12835-21
   New illustrations are added to the frame **"AI Illustration"** on page **"New"**, at the end of the last row, each with a caption.
4. **Ask for an illustration.** For example:
   - "Empty state for *no API keys yet*"
   - "Illustration for WebSocket data streams"
   - "Redesign this in our style" (attach an image)
   - "Design these 3 separately" (attach a reference sheet)

Claude then builds each illustration as a 380×235 node in the AI Illustration frame. It checks the result with a screenshot and reports the node IDs.

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

## Using another Figma file (only if you explicitly ask)

By default, Claude always draws into illustration-master → AI Illustration. If you explicitly ask for another place, give Claude the link to that frame or page. You need edit access to that file. The builder finds the colours in this order:

1. **Local variables** named `--zcat-illus-*`, for example in a copy of illustration-master.
2. **The published Illus library**, if it is enabled in the file. The variables are imported by key.
3. **Neither of these:** the builder **creates a local "Illus Global Colors" collection**. It has the same 6 variable names, with Light and Dark modes and values copied from illustration-master. The illustrations stay on-palette and switch to dark mode correctly.
   - Limitation: these local copies are not linked to the library. If the master colours change later, re-bind or update the copies.
   - On Figma plans limited to one mode per collection, only the Light mode is created.

Placement adapts to the target:
- **A frame:** the first free slot. If there is none, a new row goes below the content and the frame grows.
- **An auto-layout frame:** the frame positions the illustration itself.
- **A page:** to the right of the existing content.
