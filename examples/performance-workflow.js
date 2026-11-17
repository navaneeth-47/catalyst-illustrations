// Approved recipes: paste into the BUILDS section of lib/figma-build.js.

// Performance: browser window with a Primary speed gauge; flow lines streaming past
builds.push(['Performance – Speed', () => `
${blob(58)}
<g opacity="0.55">${flow(40,36,312,36)}${flow(40,204,312,204)}${flow(280,104,310,104)}${flow(280,142,310,142)}</g>
<rect x="62" y="102" width="32" height="5" rx="2.5" fill="${T}"/><rect x="62" y="140" width="32" height="5" rx="2.5" fill="${T}"/>
<rect x="110" y="56" width="160" height="128" rx="8" fill="${W}"${S(1.5)}/>
<circle cx="124" cy="70" r="3" fill="${T}"/><circle cx="136" cy="70" r="3" fill="${T}"/><circle cx="148" cy="70" r="3" fill="${T}"/>
<path d="M110 83H270"${S(1)}/>
<rect x="122" y="94" width="136" height="78" rx="5" fill="${T}"/>
<path d="M156 160A34 34 0 0 1 224 160Z" fill="${PB}"/>
<path d="M190 160L207 140" stroke="${WS}" stroke-width="2.5" stroke-linecap="round"/>
<circle cx="190" cy="160" r="4" fill="${WS}"/>
<rect x="150" y="160" width="80" height="5" rx="2.5" fill="${W}"/>
${sp(18,150)}${sp(336,160)}${dash('M330 76H346')}`]);

// Workflow: S-path on a Tint band from a start node to an end node
builds.push(['Workflow – Process Path', () => `
${blob(62)}
<g opacity="0.55">${flow(104,112,104,212)}${flow(282,44,282,160)}${flow(228,16,228,48)}${flow(148,204,148,226)}</g>
<path d="M214 70H152A28 28 0 0 0 152 126H220A28 28 0 0 1 220 182H176"${SW(T,22)}/>
<path d="M214 70H152A28 28 0 0 0 152 126H220A28 28 0 0 1 220 182H178" fill="none"${S(1.5)}/>
<path d="M164 182L178 174V190Z" fill="${PB}" stroke="${PB}" stroke-width="1.5" stroke-linejoin="round"/>
<rect x="214" y="56" width="28" height="28" rx="5" fill="${W}"${S(1.5)}/>
<circle cx="228" cy="70" r="6" fill="${PB}"/>
<rect x="134" y="168" width="28" height="28" rx="5" fill="${W}"${S(1.5)}/>
<rect x="142" y="176" width="12" height="12" rx="2" fill="${T}"/>
${sp(40,52)}${sp(320,186)}${dash('M318 114H334')}`]);

// Goal / growth: target with a Primary bullseye and a rising arrow
builds.push(['Growth – Target Goal', () => {
  const up = (x1,y1,cx,cy,x2,y2) => `<path d="M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}" stroke="${grad(x1,y1,x2,y2)}" stroke-width="2" fill="none" stroke-linecap="round"/><path d="${head(x2,y2,x2-cx,y2-cy)}"${SW(PB,2)}/>`;
  return `
${blob(64)}
<g opacity="0.5">${up(118,230,118,198,136,180)}${up(160,232,158,208,164,190)}${up(220,232,222,208,216,190)}${up(262,230,262,198,244,180)}</g>
<circle cx="190" cy="118" r="62" fill="${W}"${S(1.5)}/>
<path d="M190 48V64M120 118H136M244 118H260"${S(1.5)}/>
<circle cx="190" cy="118" r="48" fill="${T}"/>
<circle cx="190" cy="118" r="24" fill="none" stroke="${W}" stroke-width="8"/>
<circle cx="190" cy="118" r="6" fill="${PB}"/>
<rect x="187" y="150" width="6" height="78" rx="3" fill="${grad(190,228,190,150)}"/>
<path d="M190 130L176 152H204Z" fill="${PB}" stroke="${PB}" stroke-width="2" stroke-linejoin="round"/>
${sp(56,36)}${sp(310,42)}${dash('M306 200H322')}`; }]);
