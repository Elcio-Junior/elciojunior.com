// Gera ilustrações com a API do Gemini, sempre na mesma direção de arte.
// Roda só localmente (fora do build e do CI); as imagens escolhidas são commitadas.
//
//   npm run gen:image -- <id> [--aspect 3:4] [--n 3] [--model gemini-3-pro-image]
//       lê scripts/prompts/<id>.txt + _style.txt e salva N variações em src/assets/img/gen/_drafts/<id>-<n>.png
//   npm run gen:image -- <id> --pick <n>
//       promove a variação escolhida para src/assets/img/gen/<id>.webp
//       (o id "og" vira a base do public/og.jpg: rode depois `npm run make:og`)
//
// A chave fica em GEMINI_API_KEY (variável de ambiente ou .env, que está no .gitignore).

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import sharp from 'sharp';

const ROOT = resolve(import.meta.dirname, '..');
const PROMPTS = join(ROOT, 'scripts/prompts');
const GEN = join(ROOT, 'src/assets/img/gen');
const DRAFTS = join(GEN, '_drafts');
const ASPECTS = ['1:1', '2:3', '3:2', '3:4', '4:3', '4:5', '5:4', '9:16', '16:9', '21:9'];

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    aspect: { type: 'string' },
    n: { type: 'string', default: '3' },
    pick: { type: 'string' },
    model: { type: 'string', default: 'gemini-3-pro-image' },
  },
});

const id = positionals[0];
if (!id || !/^[a-z0-9-]+$/.test(id)) fail('Uso: npm run gen:image -- <id> [--aspect 3:4] [--n 3] | --pick <n>');

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

// ---------- --pick: promove uma variação ----------
if (values.pick) {
  const draft = join(DRAFTS, `${id}-${values.pick}.png`);
  if (!existsSync(draft)) fail(`Não achei ${draft}`);
  mkdirSync(GEN, { recursive: true });
  const out = join(GEN, `${id}.webp`);
  await sharp(draft).webp({ quality: 88 }).toFile(out);
  console.log(`Escolhida: ${draft}\n-> ${out}`);
  if (id === 'og') console.log('Agora rode: npm run make:og');
  process.exit(0);
}

// ---------- geração ----------
try {
  process.loadEnvFile(join(ROOT, '.env'));
} catch {}
const key = process.env.GEMINI_API_KEY;
if (!key) fail('Defina GEMINI_API_KEY no .env (nunca no repositório).');

const promptFile = join(PROMPTS, `${id}.txt`);
if (!existsSync(promptFile)) fail(`Não achei ${promptFile}`);
const prompt = `${readFileSync(promptFile, 'utf8').trim()}\n\n${readFileSync(join(PROMPTS, '_style.txt'), 'utf8').trim()}`;

const aspect = values.aspect ?? (id === 'og' ? '16:9' : '3:4');
if (!ASPECTS.includes(aspect)) fail(`--aspect inválido. Use um destes: ${ASPECTS.join(', ')}`);
const n = Number(values.n);
if (!Number.isInteger(n) || n < 1 || n > 6) fail('--n deve ser de 1 a 6');

mkdirSync(DRAFTS, { recursive: true });
const url = `https://generativelanguage.googleapis.com/v1beta/models/${values.model}:generateContent`;

for (let i = 1; i <= n; i++) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'x-goog-api-key': key, 'content-type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: aspect } },
    }),
  });
  const json = await res.json();
  if (!res.ok) fail(`Erro ${res.status} ${json.error?.status ?? ''}: ${json.error?.message ?? ''}`);

  const image = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData)?.inlineData;
  if (!image) {
    console.warn(`Variação ${i}: a resposta veio sem imagem (${json.candidates?.[0]?.finishReason ?? 'sem motivo'}).`);
    continue;
  }
  const out = join(DRAFTS, `${id}-${i}.png`);
  // normaliza para PNG, qualquer que seja o formato devolvido
  await sharp(Buffer.from(image.data, 'base64')).png().toFile(out);
  const { width, height } = await sharp(out).metadata();
  console.log(`${out} (${width}x${height})`);
}
console.log(`\nRevise as variações a olho e promova uma com: npm run gen:image -- ${id} --pick <n>`);
