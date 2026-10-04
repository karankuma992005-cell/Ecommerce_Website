/**
 * Product illustrations are generated as inline SVG data URIs so every image
 * loads instantly, works offline and can never be a broken external URL.
 */
const DARK = '#0b1220';
const rects = (items) => items.join('');

const shapes = {
  phone: (c, a) =>
    `<rect x="265" y="120" width="270" height="560" rx="48" fill="${c}"/>` +
    `<rect x="278" y="133" width="244" height="534" rx="38" fill="${DARK}"/>` +
    `<rect x="286" y="141" width="228" height="518" rx="31" fill="${a}"/>` +
    `<circle cx="400" cy="440" r="110" fill="#fff" opacity=".14"/><circle cx="470" cy="290" r="58" fill="#fff" opacity=".1"/>` +
    `<rect x="360" y="156" width="80" height="24" rx="12" fill="${DARK}"/>` +
    `<rect x="340" y="628" width="120" height="6" rx="3" fill="#fff" opacity=".55"/>`,

  laptop: (c, a) =>
    `<rect x="170" y="180" width="460" height="300" rx="20" fill="${c}"/>` +
    `<rect x="188" y="198" width="424" height="264" rx="8" fill="${DARK}"/>` +
    `<rect x="188" y="198" width="424" height="264" rx="8" fill="${a}" opacity=".9"/>` +
    `<circle cx="400" cy="340" r="86" fill="#fff" opacity=".14"/><rect x="230" y="236" width="150" height="14" rx="7" fill="#fff" opacity=".35"/>` +
    `<path d="M110 500 H690 L664 546 Q658 556 644 556 H156 Q142 556 136 546 Z" fill="${c}"/>` +
    `<rect x="340" y="500" width="120" height="12" rx="6" fill="#000" opacity=".18"/>`,

  headphones: (c, a) =>
    `<path d="M236 450 V380 A164 164 0 0 1 564 380 V450" fill="none" stroke="${c}" stroke-width="34" stroke-linecap="round"/>` +
    `<rect x="176" y="390" width="104" height="220" rx="48" fill="${c}"/><rect x="520" y="390" width="104" height="220" rx="48" fill="${c}"/>` +
    `<rect x="262" y="420" width="30" height="160" rx="15" fill="${a}"/><rect x="508" y="420" width="30" height="160" rx="15" fill="${a}"/>` +
    `<circle cx="214" cy="500" r="16" fill="${a}" opacity=".7"/><circle cx="586" cy="500" r="16" fill="${a}" opacity=".7"/>`,

  earbuds: (c, a) =>
    `<rect x="240" y="380" width="320" height="250" rx="96" fill="${c}" stroke="#cbd5e1" stroke-width="4"/>` +
    `<path d="M240 480 H560" stroke="#cbd5e1" stroke-width="4"/><circle cx="400" cy="480" r="14" fill="${a}"/>` +
    `<g fill="${c}" stroke="#cbd5e1" stroke-width="4"><circle cx="318" cy="210" r="48"/><rect x="304" y="236" width="28" height="112" rx="14"/>` +
    `<circle cx="482" cy="210" r="48"/><rect x="468" y="236" width="28" height="112" rx="14"/></g>`,

  watch: (c, a) =>
    `<rect x="332" y="70" width="136" height="660" rx="44" fill="${a}"/>` +
    `<rect x="266" y="262" width="268" height="276" rx="70" fill="${c}"/><rect x="530" y="352" width="18" height="64" rx="9" fill="${c}"/>` +
    `<rect x="284" y="280" width="232" height="240" rx="56" fill="${DARK}"/>` +
    `<circle cx="400" cy="400" r="86" fill="none" stroke="${a}" stroke-width="10"/><path d="M400 400 V340 M400 400 L440 424" stroke="#fff" stroke-width="10" stroke-linecap="round"/>` +
    `<circle cx="400" cy="400" r="9" fill="#fff"/>`,

  camera: (c, a) =>
    `<rect x="150" y="270" width="500" height="330" rx="40" fill="${c}"/>` +
    `<path d="M300 270 L330 214 H470 L500 270Z" fill="${c}"/><rect x="540" y="296" width="76" height="40" rx="12" fill="${a}"/>` +
    `<circle cx="400" cy="440" r="128" fill="${DARK}"/><circle cx="400" cy="440" r="92" fill="${a}"/><circle cx="400" cy="440" r="48" fill="${DARK}"/>` +
    `<circle cx="372" cy="410" r="14" fill="#fff" opacity=".55"/><circle cx="196" cy="318" r="14" fill="${a}"/>`,

  console: (c, a) =>
    `<path d="M310 130 H490 Q520 130 520 160 V640 Q520 670 490 670 H310 Q280 670 280 640 V160 Q280 130 310 130Z" fill="${c}"/>` +
    `<rect x="332" y="130" width="136" height="540" fill="${a}" opacity=".28"/>` +
    `<rect x="300" y="190" width="200" height="8" rx="4" fill="#000" opacity=".25"/>` +
    `<circle cx="400" cy="580" r="22" fill="${a}"/><rect x="340" y="250" width="120" height="8" rx="4" fill="#000" opacity=".2"/>`,

  box: (c, a) =>
    `<rect x="230" y="150" width="340" height="500" rx="26" fill="${c}"/>` +
    `<circle cx="400" cy="270" r="92" fill="${DARK}"/>` +
    rects(Array.from({ length: 5 }, (_, i) => `<rect x="${340 + i * 30}" y="238" width="14" height="64" rx="7" fill="${a}"/>`)) +
    `<rect x="260" y="470" width="280" height="8" rx="4" fill="#fff" opacity=".18"/><rect x="260" y="500" width="280" height="8" rx="4" fill="#fff" opacity=".18"/>` +
    `<circle cx="400" cy="590" r="18" fill="${a}"/>`,

  keyboard: (c, a) => {
    const keys = [];
    for (let r = 0; r < 4; r += 1) {
      for (let k = 0; k < 12; k += 1) {
        const bottom = r === 3;
        if (bottom && (k < 3 || k > 8)) continue;
        if (bottom && k > 3 && k < 9) continue;
        keys.push(`<rect x="${138 + k * 44}" y="${296 + r * 56}" width="38" height="46" rx="9" fill="${a}"/>`);
      }
    }
    keys.push(`<rect x="270" y="464" width="260" height="46" rx="9" fill="${a}"/>`);
    return `<rect x="104" y="262" width="592" height="272" rx="28" fill="${c}"/>${keys.join('')}`;
  },

  mouse: (c, a) =>
    `<path d="M400 150 C520 150 566 256 566 380 V470 C566 590 504 660 400 660 C296 660 234 590 234 470 V380 C234 256 280 150 400 150Z" fill="${c}"/>` +
    `<path d="M400 160 V360 M240 370 H560" stroke="#000" stroke-opacity=".28" stroke-width="5"/>` +
    `<rect x="384" y="236" width="32" height="76" rx="16" fill="${a}"/><rect x="262" y="410" width="22" height="90" rx="11" fill="${a}"/>`,

  powerbank: (c, a) =>
    `<rect x="248" y="130" width="304" height="540" rx="48" fill="${c}"/>` +
    `<rect x="362" y="130" width="76" height="16" rx="8" fill="${DARK}"/>` +
    `<rect x="290" y="210" width="220" height="150" rx="22" fill="${DARK}" opacity=".35"/>` +
    rects([0, 1, 2, 3].map((i) => `<circle cx="${320 + i * 54}" cy="570" r="12" fill="${a}"/>`)) +
    `<path d="M412 240 L378 292 H402 L392 332 L428 276 H404Z" fill="${a}"/>`,

  speaker: (c, a) => {
    const dots = [];
    for (let r = 0; r < 5; r += 1) for (let k = 0; k < 14; k += 1) dots.push(`<circle cx="${236 + k * 24}" cy="${340 + r * 26}" r="6" fill="${a}" opacity=".55"/>`);
    return (
      `<rect x="160" y="270" width="480" height="260" rx="130" fill="${c}"/>${dots.join('')}` +
      `<circle cx="256" cy="490" r="12" fill="${a}"/><rect x="340" y="480" width="120" height="20" rx="10" fill="${a}" opacity=".4"/>` +
      `<circle cx="544" cy="490" r="12" fill="${a}"/>`
    );
  },

  hub: (c, a) =>
    `<path d="M650 400 H730" stroke="${a}" stroke-width="16" stroke-linecap="round"/>` +
    `<rect x="120" y="320" width="540" height="160" rx="34" fill="${c}"/>` +
    rects(Array.from({ length: 5 }, (_, i) => `<rect x="${164 + i * 92}" y="378" width="62" height="26" rx="6" fill="${DARK}"/>`)) +
    `<rect x="164" y="426" width="440" height="8" rx="4" fill="${a}" opacity=".6"/>`,

  charger: (c, a) =>
    `<path d="M600 560 Q690 600 730 700" fill="none" stroke="${a}" stroke-width="14" stroke-linecap="round"/>` +
    `<circle cx="400" cy="400" r="240" fill="${c}"/><circle cx="400" cy="400" r="176" fill="${a}" opacity=".35"/>` +
    `<circle cx="400" cy="400" r="104" fill="${c}"/><path d="M412 340 L372 408 H400 L388 462 L430 392 H402Z" fill="${a}"/>`,
};

const VIEWS = [
  { bg: '#eef2f8', wrap: (s) => s },
  { bg: '#e4eaf4', wrap: (s) => `<g transform="rotate(-9 400 400) translate(34 24) scale(.92)">${s}</g>` },
  { bg: '#f6f8fb', wrap: (s) => `<g transform="translate(-140 -140) scale(1.35)">${s}</g>` },
];

const toDataUri = (svg) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

export function buildImages(shape, { body, accent }) {
  const draw = shapes[shape];
  return VIEWS.map(({ bg, wrap }) =>
    toDataUri(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><rect width="800" height="800" fill="${bg}"/>` +
        `<ellipse cx="400" cy="738" rx="210" ry="20" fill="#0b1b3a" opacity=".08"/>${wrap(draw(body, accent))}</svg>`,
    ),
  );
}

/** Transparent artwork (no background) used by the hero visual. */
export const buildHeroArt = (shape, { body, accent }) =>
  toDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">${shapes[shape](body, accent)}</svg>`);
