// Approved recipes: paste into the BUILDS section of lib/figma-build.js.
// Shared helpers (blob, sp, dash, S, SW, grad, head, flow) come from the builder.

// Phishing guard: hook over a masked password field; check on the card behind
builds.push(['Security – Phishing Guard', () => `
${blob(60)}
<g opacity="0.6">${flow(104,24,104,62)}${flow(276,24,276,62)}</g>
<rect x="126" y="70" width="128" height="128" rx="6" fill="${W}"${S(1)}/>
<path d="M176 172L186 182L206 160"${SW(PB,3)}/>
<rect x="88" y="104" width="204" height="44" rx="8" fill="${W}"${S(1.5)}/>
<rect x="97" y="113" width="186" height="26" rx="5" fill="${T}"/>
${[118,154,190,226,262].map(x=>`<circle cx="${x}" cy="126" r="4.5" fill="${PB}"/>`).join('')}
<path d="M190 14V42" ${S(2)}/>
<circle cx="190" cy="50" r="8" fill="${W}"${S(2)}/>
<path d="M190 58V86A10 10 0 0 1 170 86V78" fill="none"${S(2)}/>
<path d="M164 86L170 77L176 86" fill="none"${S(2)}/>
${sp(30,150)}${sp(330,36)}${dash('M306 196H322')}`]);

// Secure code: code line above a shield with a Primary padlock
builds.push(['Security – Secure Code', () => `
${blob(60)}
<path d="M128 26L118 36L128 46M152 26L162 36L152 46" fill="none"${S(1.5)}/>
<circle cx="140" cy="36" r="3.5" fill="${PB}"/>
<rect x="174" y="33" width="22" height="6" rx="3" fill="${T}"/>
<rect x="204" y="33" width="58" height="6" rx="3" fill="${T}"/>
<rect x="118" y="54" width="110" height="6" rx="3" fill="${T}"/>
<rect x="236" y="54" width="26" height="6" rx="3" fill="${T}"/>
<path d="M190 70L244 84V130C244 166 222 192 190 206C158 192 136 166 136 130V84Z" fill="${W}"${S(1.5)}/>
<path d="M190 82L232 93V131C232 160 214 181 190 193C166 181 148 160 148 131V93Z" fill="${T}"/>
<path d="M177 128V118A13 13 0 0 1 203 118V128" fill="none"${S(2)}/>
<rect x="168" y="125" width="44" height="36" rx="6" fill="${PB}"/>
<path d="M181 143L188 150L200 137"${SW(WS,2.5)}/>
${sp(56,140)}${sp(304,160)}${dash('M74 206H92')}${dash('M290 98H306')}`]);

// Targeted attack: user in a target circle, gradient dart hitting it
builds.push(['Security – Targeted Attack', () => `
${blob(62)}
<g opacity="0.5">${flow(64,40,104,80)}${flow(326,152,272,152)}${flow(316,200,268,182)}</g>
<circle cx="180" cy="136" r="66" fill="${W}"${S(1.5)}/>
<circle cx="180" cy="136" r="54" fill="${T}"/>
<circle cx="180" cy="120" r="14" fill="${W}"/>
<path d="M156 178Q156 154 180 154Q204 154 204 178Z" fill="${W}"/>
<circle cx="144" cy="124" r="3" fill="${W}"/><circle cx="216" cy="124" r="3" fill="${W}"/><circle cx="180" cy="96" r="3" fill="${W}"/>
<path d="M318 12L234 96" stroke="${grad(318,12,234,96)}" stroke-width="3.5" stroke-linecap="round"/>
<path d="M222 108L238.9 102.4L227.6 91Z" fill="${PB}" stroke="${PB}" stroke-width="2" stroke-linejoin="round"/>
${sp(36,160)}${sp(330,62)}${dash('M60 116H76')}`]);
