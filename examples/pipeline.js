// Approved recipes: paste into the BUILDS section of lib/figma-build.js.

// Lifecycle loop: doc -> pipeline (Primary) -> database around a cloud
builds.push(['Pipeline – Vector Lifecycle', () => `
${blob(60)}
<circle cx="92" cy="58" r="5" fill="${T}"/><circle cx="314" cy="30" r="4" fill="${T}"/>
${arc(134,74,170,38,214,50)}${arc(286,100,300,140,274,166)}${arc(206,196,144,202,118,150)}
<path d="M160 146H214A14 14 0 0 0 214 118A20 20 0 0 0 176 110A17 17 0 0 0 160 146Z" fill="${T}"${S(1.5)}/>
<circle cx="116" cy="110" r="30" fill="${W}"${S(1.5)}/>
<rect x="104" y="96" width="18" height="23" rx="2" fill="${T}"${S(1.2)}/>
<rect x="110" y="102" width="18" height="23" rx="2" fill="${W}"${S(1.2)}/>
<path d="M116 110L122 116M122 110L116 116"${SW(K,1.2)}/>
<circle cx="254" cy="70" r="30" fill="${PB}"/>
<path d="M243 60Q251 60 252 70Q251 80 243 80M241 70H266M261 65L266 70L261 75"${SW(WS,1.8)}/>
<circle cx="240" cy="60" r="2.6"${SW(WS,1.5)}/><circle cx="240" cy="80" r="2.6"${SW(WS,1.5)}/><circle cx="238" cy="70" r="2.6"${SW(WS,1.5)}/>
<circle cx="240" cy="178" r="30" fill="${W}"${S(1.5)}/>
<path d="M228 168V188A12 4 0 0 0 252 188V168Z" fill="${T}"/>
<path d="M228 168V188A12 4 0 0 0 252 188V168M228 178A12 4 0 0 0 252 178"${SW(K,1.2)}/>
<ellipse cx="240" cy="168" rx="12" ry="4" fill="${W}"${S(1.2)}/>
${sp(36,150)}${sp(326,110)}${dash('M60 210H76')}`]);

// Search: magnifier over a vector graph (light Primary edges, one Primary node)
builds.push(['Pipeline – Vector Search', () => {
  const cx = 150, cy = 112, d = [0.7071, 0.7071];
  const seg = (a, b, w) => { const p = (t, s) => [(cx + d[0]*t - d[1]*s).toFixed(1), (cy + d[1]*t + d[0]*s).toFixed(1)]; return `M${[p(a,-w),p(b,-w),p(b,w),p(a,w)].map(v=>v.join(' ')).join('L')}Z`; };
  const N = { a:[146,76], b:[116,100], c:[184,102], d:[150,122], e:[120,144], f:[160,152] };
  const E = [['a','b'],['a','c'],['b','d'],['c','d'],['d','f'],['b','e'],['e','f'],['c','f'],['a','d']];
  return `
${blob(62)}
<path d="${seg(64,82,8)}" fill="${T}"${S(1.5)}/>
<path d="${seg(82,150,11)}" fill="${W}"${S(1.5)}/>
<path d="${seg(92,140,3)}" fill="${T}"/>
<circle cx="${cx}" cy="${cy}" r="64" fill="${W}"${S(1.5)}/>
<circle cx="${cx}" cy="${cy}" r="52" fill="${T}"/>
<g opacity="0.45"><path d="${E.map(([u,v])=>`M${N[u].join(' ')}L${N[v].join(' ')}`).join('')}"${SW(PB,1.6)}/></g>
${['a','b','c','e','f'].map(k=>`<circle cx="${N[k][0]}" cy="${N[k][1]}" r="${k==='b'||k==='e'?4.5:5.5}" fill="${W}"/>`).join('')}
<circle cx="150" cy="122" r="8" fill="${PB}"/>
<circle cx="284" cy="78" r="38" fill="${W}"${S(1)}/>
<g opacity="0.45"><path d="M298 58L268 90L284 108Z"${SW(PB,1.6)}/></g>
<circle cx="298" cy="58" r="5" fill="${PB}"/><circle cx="268" cy="90" r="4" fill="${T}"/><circle cx="284" cy="108" r="4" fill="${T}"/>
<g opacity="0.5"><path d="M78 164L60 196L94 190Z"${SW(PB,1.6)}/><circle cx="78" cy="164" r="3.5" fill="${PB}"/><circle cx="60" cy="196" r="4" fill="${PB}"/><circle cx="94" cy="190" r="3.5" fill="${PB}"/></g>
${sp(308,160)}${sp(30,36)}${dash('M322 210H338')}`; }]);

// Embedding at scale: docs -> Primary core -> vector-row cards
builds.push(['Pipeline – Embedding Scale', () => {
  const doc = (x, y) => `<path d="M${x} ${y}H${x+24}L${x+34} ${y+10}V${y+42}H${x}Z" fill="${W}"${S(1.5)}/><path d="M${x+24} ${y}V${y+10}H${x+34}"${SW(K,1)}/>
<rect x="${x+6}" y="${y+17}" width="20" height="3" rx="1.5" fill="${T}"/><rect x="${x+6}" y="${y+24}" width="22" height="3" rx="1.5" fill="${T}"/><rect x="${x+6}" y="${y+31}" width="14" height="3" rx="1.5" fill="${T}"/>`;
  const card = (y, hi) => { let s = `<rect x="266" y="${y-16}" width="88" height="32" rx="5" fill="${W}"${S(1.5)}/>`;
    for (let i = 0; i < 5; i++) s += `<rect x="${271+i*16}" y="${y-10}" width="14" height="8" rx="1.5" fill="${hi && i === 0 ? PB : T}"/>`;
    for (let i = 0; i < 4; i++) s += `<rect x="${271+i*16}" y="${y+2}" width="14" height="8" rx="1.5" fill="${T}"/>`; return s; };
  const pts = [-90,-18,54,126,198].map(a => [190 + 16*Math.cos(a*Math.PI/180), 118 + 16*Math.sin(a*Math.PI/180)].map(v => +v.toFixed(1)));
  const c0 = [192, 120];
  const glyph = `<path d="M${pts.map(q=>q.join(' ')).join('L')}Z${pts.map(q=>`M${c0.join(' ')}L${q.join(' ')}`).join('')}"${SW(WS,1.5)}/>` +
    [...pts, c0].map(q => `<circle cx="${q[0]}" cy="${q[1]}" r="3" fill="${PB}" stroke="${WS}" stroke-width="1.5"/>`).join('');
  const busL = 'M74 60H100Q110 60 110 70V166Q110 176 100 176H74M74 118H150';
  const busR = 'M230 118H252M262 60Q252 60 252 70V166Q252 176 262 176';
  return `
${blob(60)}
<path d="${busL}"${SW(T,8)}/><path d="${busR}"${SW(T,8)}/>
<path d="${busL}" stroke="${grad(74,0,150,0)}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="${busR}" stroke="${grad(266,0,230,0)}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
${doc(40,39)}${doc(40,97)}${doc(40,155)}
<circle cx="190" cy="118" r="46" fill="${T}"/>
<circle cx="190" cy="118" r="34" fill="${PB}"/>
${glyph}
${card(60,false)}${card(118,true)}${card(176,false)}
${sp(176,12)}${sp(178,184)}${dash('M330 24H346')}${dash('M24 214H40')}`; }]);
