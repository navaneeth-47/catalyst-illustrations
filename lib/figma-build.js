// ============================================================================
// Catalyst illustration builder: paste this whole file as the `code` of ONE
// `use_figma` call. Edit only the CONFIG block and the BUILDS section.
//
// What it does:
//   1. Switches to the target frame's page.
//   2. Turns each SVG body into a Figma node (380x235) via createNodeFromSvg.
//   3. Binds EVERY solid paint and gradient stop to the "Illus Global Colors"
//      variables, by name, falling back to importing them by key.
//   4. Audits for Black fills (must be 0) and unbound colours (must be []).
//   5. Places each node in a free slot inside the target frame.
// Returns [{id, name, pos, unbound, blackFills}].
// ============================================================================

// ---------------- CONFIG ----------------
const TARGET_ID = '12833:6324';   // grid frame to draw into (see config/figma-target.json)
const START_Y   = 1650;           // where to start searching for a free slot
const W_CANVAS = 380, H_CANVAS = 235;

// ---------------- PALETTE (write these hexes in SVG) ----------------
const K = '#101F3E';   // Black: STROKES ONLY
const PB = '#2A65F0';  // Primary-Blue: 1-2 key elements
const W = '#FFFFFF';   // White: object bodies
const WS = '#FFFFFE';  // marker -> White-Static (glyphs on Primary)
const T = '#E8F0FE';   // Tint-blue: inner fills, bars
const BG = '#F3F7FF';  // Bg-Blue: blob, gradient fade-to
const VAR_SPEC = {
  [K]:  ['--zcat-illus-Black',        'c8eac20da9d39fbaf63f45dddfda9dd8f4e28b9a'],
  [PB]: ['--zcat-illus-Primary-Blue', '62e0f9abec876ac8005752c99e8668747afe62f4'],
  [W]:  ['--zcat-illus-White',        '895f67d0d150e0b4423a130a0c53e13eb4c7db66'],
  [WS]: ['--zcat-illus-White-Static', '9e126294ae536fa69a5760b2ac48e6a49e915594'],
  [T]:  ['--zcat-illus-Tint-blue',    '6552c0c3e2fa48ad8ae78d6edc9d66c2e9ac6c0a'],
  [BG]: ['--zcat-illus-Bg-Blue',      '3ab661ebf91efff754c37a85100a9df2018d88d3'],
};

// ---------------- HELPERS (use inside SVG bodies) ----------------
const BLOB = 'M59.6998 117.735H177.802C178.47 117.735 179.121 117.642 179.749 117.464C180.376 117.642 181.027 117.735 181.695 117.735H249.182C254.199 117.735 258.266 112.464 258.266 105.962C258.266 99.4593 254.199 94.188 249.182 94.188H241.395C236.378 94.188 232.31 88.9172 232.31 82.4148C232.31 75.9124 236.378 70.6413 241.395 70.6413H266.054C271.071 70.6413 275.139 65.3701 275.139 58.8677C275.139 52.3654 271.071 47.0942 266.054 47.0942H237.502C242.519 47.0942 246.586 41.823 246.586 35.3207C246.586 28.8183 242.519 23.5471 237.502 23.5471H154.441C159.458 23.5471 163.525 18.2759 163.525 11.7736C163.525 5.2712 159.458 0 154.441 0H80.465C75.4476 0 71.3802 5.2712 71.3802 11.7736C71.3802 18.2759 75.4476 23.5471 80.465 23.5471H28.5521C23.5347 23.5471 19.4673 28.8183 19.4673 35.3207C19.4673 41.823 23.5347 47.0942 28.5521 47.0942H60.9977C66.0151 47.0942 70.0824 52.3654 70.0824 58.8677C70.0824 65.3701 66.0151 70.6413 60.9977 70.6413H9.08479C4.06738 70.6413 0 75.9124 0 82.4148C0 88.9172 4.06738 94.188 9.08479 94.188H59.6998C54.6824 94.188 50.615 99.4593 50.615 105.962C50.615 112.464 54.6824 117.735 59.6998 117.735ZM271.245 117.735C276.262 117.735 280.33 112.464 280.33 105.962C280.33 99.4602 276.262 94.1889 271.245 94.1889C266.227 94.1889 262.16 99.4602 262.16 105.962C262.16 112.464 266.227 117.735 271.245 117.735Z';
// blob(ty): standard background, MUST be the first element of every body
const blob = (ty = 60) => `<path transform="translate(0 ${ty}) scale(1.3523)" d="${BLOB}" fill="${BG}"/>`;
// sp(x,y): 24x24 "+" sparkle with centre gap
const sp = (x, y) => `<path d="M${x+12} ${y}V${y+8}M${x+12} ${y+16}V${y+24}M${x} ${y+12}H${x+8}M${x+16} ${y+12}H${x+24}" stroke="${K}" stroke-width="1" stroke-linecap="round"/>`;
// dash('M300 200H316'): short decorative dash
const dash = (d) => `<path d="${d}" stroke="${K}" stroke-width="1" stroke-linecap="round"/>`;
// S(w): Black outline attrs for MAIN structures. SW(colour,w): stroke-only attrs
const S = (w) => ` stroke="${K}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const SW = (c, w) => ` stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round" fill="none"`;
// grad(x1,y1,x2,y2): userSpace linear gradient Bg-Blue (start) -> Primary (end)
let gi = 0, defs = '';
const grad = (x1, y1, x2, y2, from = BG, to = PB) => { const id = 'g' + (gi++); defs += `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" gradientUnits="userSpaceOnUse"><stop stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient>`; return `url(#${id})`; };
// head(tx,ty,dx,dy,size): open chevron arrowhead with tip at (tx,ty) pointing along (dx,dy)
const head = (tx, ty, dx, dy, s = 6) => { const L = Math.hypot(dx, dy); dx /= L; dy /= L; const bx = tx - dx * s * 1.1, by = ty - dy * s * 1.1, px = -dy * s, py = dx * s; return `M${(bx+px).toFixed(1)} ${(by+py).toFixed(1)}L${tx} ${ty}L${(bx-px).toFixed(1)} ${(by-py).toFixed(1)}`; };
// flow(x1,y1,x2,y2,w): gradient line + Primary chevron (wrap in <g opacity="0.5">)
const flow = (x1, y1, x2, y2, w = 2) => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${grad(x1,y1,x2,y2)}" stroke-width="${w}" stroke-linecap="round"/><path d="${head(x2,y2,x2-x1,y2-y1)}"${SW(PB,w)}/>`;
// arc(x1,y1,cx,cy,x2,y2,w): curved gradient arrow (quadratic) with chevron
const arc = (x1, y1, cx, cy, x2, y2, w = 3) => `<path d="M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}" stroke="${grad(x1,y1,x2,y2)}" stroke-width="${w}" stroke-linecap="round" fill="none"/><path d="${head(x2,y2,x2-cx,y2-cy,7)}"${SW(PB,w)}/>`;

// ============================================================================
// BUILDS: one entry per illustration. Body = SVG markup for a 380x235 canvas.
// Start from the closest recipe in examples/. Keep blob() first.
// ============================================================================
const builds = [];
builds.push(['Category – Name', () => `
${blob(60)}
<!-- hero: White body + Black 1.5 outline -->
<rect x="110" y="56" width="160" height="128" rx="8" fill="${W}"${S(1.5)}/>
<rect x="122" y="94" width="136" height="78" rx="5" fill="${T}"/>
<!-- 1-2 Primary accents -->
<circle cx="190" cy="133" r="22" fill="${PB}"/>
<path d="M180 133L187 140L200 126"${SW(WS,2.5)}/>
${sp(30,150)}${sp(330,40)}${dash('M306 200H322')}`]);

// ============================================================================
// ENGINE: do not edit below
// ============================================================================
const target = await figma.getNodeByIdAsync(TARGET_ID);
if (!target) throw new Error('Target frame ' + TARGET_ID + ' not found; ask the user for a frame link');
let pg = target; while (pg.type !== 'PAGE') pg = pg.parent; await figma.setCurrentPageAsync(pg);

const locals = await figma.variables.getLocalVariablesAsync('COLOR');
const vars = {};
for (const [hex, [name, key]] of Object.entries(VAR_SPEC)) {
  vars[hex] = locals.find(v => v.name === name) || null;
  if (!vars[hex]) { try { vars[hex] = await figma.variables.importVariableByKeyAsync(key); } catch (e) { vars[hex] = null; } }
}
const missingVars = Object.entries(vars).filter(([, v]) => !v).map(([h]) => VAR_SPEC[h][0]);
if (missingVars.length) throw new Error('Missing Illus variables: ' + missingVars.join(', '));

const toHex = c => '#' + [c.r, c.g, c.b].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
const rgb = h => ({ r: parseInt(h.slice(1, 3), 16) / 255, g: parseInt(h.slice(3, 5), 16) / 255, b: parseInt(h.slice(5, 7), 16) / 255 });
const baseHex = h => h === WS ? W : h;

const out = [];
for (const [name, fn] of builds) {
  defs = ''; gi = 0;
  const body = fn();
  const svg = `<svg width="${W_CANVAS}" height="${H_CANVAS}" viewBox="0 0 ${W_CANVAS} ${H_CANVAS}" fill="none" xmlns="http://www.w3.org/2000/svg"><defs>${defs}</defs>${body}</svg>`;
  const node = figma.createNodeFromSvg(svg);
  target.appendChild(node);
  node.name = name; node.fills = []; node.clipsContent = false;
  node.children[0].name = 'Background';

  const unbound = []; let blackFills = 0;
  for (const n of [node, ...node.findAll(() => true)]) {
    for (const prop of ['fills', 'strokes']) {
      if (!(prop in n) || n[prop] === figma.mixed || !n[prop].length) continue;
      n[prop] = n[prop].map(pt => {
        if (pt.type === 'SOLID') {
          const h = toHex(pt.color), v = vars[h];
          if (!v) { unbound.push(n.name + ':' + h); return pt; }
          if (prop === 'fills' && h === K) blackFills++;
          const b = figma.variables.setBoundVariableForPaint({ ...pt, color: rgb(baseHex(h)) }, 'color', v);
          return { ...b, opacity: pt.opacity ?? 1 };   // binding resets opacity: re-apply
        }
        if (pt.type.startsWith('GRADIENT')) {
          return { ...pt, gradientStops: pt.gradientStops.map(s => {
            const h = toHex(s.color), v = vars[h];
            if (!v) { unbound.push('gradient:' + h); return s; }
            return { ...s, color: { ...rgb(baseHex(h)), a: 1 }, boundVariables: { color: figma.variables.createVariableAlias(v) } };
          }) };
        }
        return pt;
      });
    }
  }

  // free-slot placement inside the target frame
  const others = target.children.filter(c => c.id !== node.id);
  const free = (x, y) => !others.some(c => c.x < x + node.width + 40 && c.x + c.width + 40 > x && c.y < y + node.height + 40 && c.y + c.height + 40 > y);
  let spot = null;
  for (let y = START_Y; y < target.height - node.height && !spot; y += 150)
    for (let x = 40; x < target.width - node.width; x += 20) if (free(x, y)) { spot = [x, y]; break; }
  if (spot) { node.x = spot[0]; node.y = spot[1]; }
  out.push({ id: node.id, name, pos: spot, unbound, blackFills });
}
return out;
