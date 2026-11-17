# Approved recipes ("Star" layers)

The designer marks approved illustrations in illustration-master (page **New**) by adding **"Star"** as a prefix or suffix to the layer name. **These are the quality bar.**

Recipes live in Figma, not here, so they always reflect the latest hand edits.

- **Before composing:** list them live with a read-only `use_figma` call on page `12766:1993`, filtering names with `/^\s*star|star\s*$/i`. Then screenshot the 2–4 closest to the brief.
- **If you need exact geometry:** call `node.exportAsync({format:'SVG_STRING'})` on that node.
- **Use them for quality, not layout.** See STYLE_GUIDE §8.

## Snapshot (2026-11-17), 40 recipes

### Designer originals (Frame 2367): the truest reference for the house style

Data Store · No Search Results · Recurring Schedule · Cron Scheduler · Empty Data · Functions · Chat · Support · Chatbot · NoSQL Database · File Upload · Deleted Files · Rules · Publishers · Database Sync · Quick Search · Data Pipeline

### AI-generated pieces approved (frame AI Illustration)

Row-Level Security · Workflow Automation · Table Security · User Management · WebSocket Live Signal · Data API Endpoint · Phishing Protection · Secure Code · Performance Speed · Vector Lifecycle · Vector Search · Embedding Pipeline · Bug Tracking · Cross-Platform Launch · API Gateway Integration · JSON Response · API Call · Authentication Token · Third-Party API Integration · Token Refresh · API Gateway Bridge · AI MCP Access · Growth Target

## What the Star set teaches (measured)

1. **Thin strokes:** the originals use **0.8–1px** outlines almost everywhere. Use 1px for main outlines, and go above 1.2px only for deliberate emphasis such as arrows or handles.
2. **Few, big objects:** 1–2 large hero objects filling about 55–65% of the artwork, often **overlapping for depth**. Examples:
   - a database with a table in front
   - two stacked databases with a clock badge
   - three overlapping chat bubbles
   - a robot head over its body
3. **Diagonal Tint shading:** a soft diagonal Tint sweep or shaded side inside main objects, such as the lower-right triangle in a window or the right side of a cylinder. It adds depth without gradients.
4. **Primary is tiny and precise:** eyes, one header bar, one badge, one glyph. Usually 1–2 Primary shapes.
5. **Minimal networks:** connector lines and node webs are rare. The story comes from the objects themselves.
6. **Decoration:** 2 sparkles plus a **double dash**, two short stacked lines of different length such as `M44 70H62 M50 76H62`.
7. **A badge on a corner or meeting point:** a Primary circle with a White-Static glyph and a White ring, overlapping the hero's edge.

Reference build that follows these learnings: **"New recipe result"** (node `13386:2`), AI access through MCP.
