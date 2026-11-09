// Monta public/og.jpg (1200x630, < 300 KB): fundo ilustrado + retrato na moldura em arco + nome.
// O nome entra aqui (e não no prompt) porque o modelo de imagem erra grafia.
//
//   npm run make:og
//
// Fundo: src/assets/img/gen/og.webp (gerado com `npm run gen:image -- og`); sem ele, usa azul-marinho liso.

import { existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const ROOT = resolve(import.meta.dirname, '..');
const BG = join(ROOT, 'src/assets/img/gen/og.webp');
const PROFILE = join(ROOT, 'src/assets/img/profile.png');
const OUT = join(ROOT, 'public/og.jpg');
const MAX_BYTES = 300 * 1024;

const W = 1200;
const H = 630;
const NAVY = '#0b1320';
const GOLD = '#d9b45a';
const GOLD_SOFT = '#e8cc82';
const TEXT = '#ecf0f6';
const MUTED = '#a0acbe';

// Arco do retrato
const aw = 340;
const ah = 450;
const ax = 880 - aw / 2;
const ay = 115;

/** Caminho de um arco (topo semicircular, base reta) com folga `p` em volta do retrato. */
const archPath = (p) => {
  const x0 = ax - p;
  const x1 = ax + aw + p;
  const r = (aw + 2 * p) / 2;
  const top = ay - p;
  const bottom = ay + ah + p;
  return `M ${x0} ${bottom} V ${top + r} A ${r} ${r} 0 0 1 ${x1} ${top + r} V ${bottom} Z`;
};

const base = existsSync(BG)
  ? sharp(BG).resize(W, H, { fit: 'cover' })
  : sharp({ create: { width: W, height: H, channels: 3, background: NAVY } });

// Retrato (PNG transparente) sobre degradê azul, recortado no formato do arco
const portraitBg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${aw}" height="${ah}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e3a60"/><stop offset="1" stop-color="#28507e"/></linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/></svg>`,
);
const archMask = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${aw}" height="${ah}">
    <path d="M 0 ${ah} V ${aw / 2} A ${aw / 2} ${aw / 2} 0 0 1 ${aw} ${aw / 2} V ${ah} Z" fill="#fff"/></svg>`,
);
const face = await sharp(PROFILE).resize(aw, ah, { fit: 'cover', position: 'bottom' }).toBuffer();
const portrait = await sharp(portraitBg)
  .composite([{ input: face }, { input: archMask, blend: 'dest-in' }])
  .png()
  .toBuffer();

// Moldura dupla + nome + stack
const overlay = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs><linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${NAVY}" stop-opacity=".92"/><stop offset=".5" stop-color="${NAVY}" stop-opacity=".85"/><stop offset=".62" stop-color="${NAVY}" stop-opacity="0"/>
    </linearGradient></defs>
    <!-- escurece o lado do texto para manter o contraste sobre o fundo ilustrado -->
    <rect width="${W}" height="${H}" fill="url(#shade)"/>
    <path d="${archPath(8)}" fill="${NAVY}"/>
    <path d="${archPath(22)}" fill="none" stroke="${GOLD}" stroke-width="3"/>
    <path d="${archPath(12)}" fill="none" stroke="${GOLD_SOFT}" stroke-width="2"/>
    <polygon points="80,214 89,205 98,214 89,223" fill="${GOLD}"/>
    <text x="112" y="224" font-family="Consolas, 'JetBrains Mono', monospace" font-size="30" fill="${GOLD}">elciojunior.com</text>
    <text x="80" y="330" font-family="Georgia, 'Fraunces', serif" font-weight="700" font-size="84" fill="${TEXT}">Elcio Júnior</text>
    <text x="80" y="392" font-family="Consolas, 'JetBrains Mono', monospace" font-size="30" fill="${MUTED}" xml:space="preserve">.NET  •  Angular  •  AI</text>
  </svg>`,
);

const composed = await base
  .composite([{ input: overlay }, { input: portrait, left: ax, top: ay }])
  .flatten({ background: NAVY })
  .png()
  .toBuffer();

// Menor qualidade que ainda caiba em 300 KB (WhatsApp ignora prévias maiores)
for (let quality = 88; quality >= 50; quality -= 6) {
  await sharp(composed).jpeg({ quality, progressive: true, mozjpeg: true }).toFile(OUT);
  const size = statSync(OUT).size;
  if (size <= MAX_BYTES) {
    console.log(`${OUT}: ${W}x${H}, ${Math.round(size / 1024)} KB (qualidade ${quality})`);
    process.exit(0);
  }
}
console.error('Não consegui deixar o og.jpg abaixo de 300 KB.');
process.exit(1);
