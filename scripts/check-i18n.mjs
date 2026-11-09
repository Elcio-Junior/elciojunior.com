// Confere se PT e EN têm o mesmo conteúdo estruturado: mesmas chaves, mesmo
// tamanho de listas e nenhum texto vazio. Falha (exit 1) se algo faltar num idioma.
// Uso: npm run check:i18n  (o Node importa os .ts direto, removendo os tipos)

import { ptBr } from '../src/i18n/pt-br.ts';
import { en } from '../src/i18n/en.ts';
import { experience } from '../src/data/experience.ts';
import { projects } from '../src/data/projects.ts';
import { education } from '../src/data/education.ts';
import { stack } from '../src/data/stack.ts';

const LOCALES = ['pt-br', 'en'];
const errors = [];

const kind = (v) => (Array.isArray(v) ? 'array' : v === null ? 'null' : typeof v);

/** Compara a forma de dois valores (um por idioma). */
function compare(a, b, path) {
  const [ka, kb] = [kind(a), kind(b)];
  if (ka !== kb) return errors.push(`${path}: tipo diferente (pt-br: ${ka}, en: ${kb})`);

  if (ka === 'string') {
    if (!a.trim()) errors.push(`${path}: texto vazio em pt-br`);
    if (!b.trim()) errors.push(`${path}: texto vazio em en`);
  } else if (ka === 'array') {
    if (a.length !== b.length) errors.push(`${path}: ${a.length} itens em pt-br, ${b.length} em en`);
    for (let i = 0; i < Math.min(a.length, b.length); i++) compare(a[i], b[i], `${path}[${i}]`);
  } else if (ka === 'object') {
    for (const key of Object.keys(a)) {
      if (!(key in b)) errors.push(`${path}.${key}: falta em en`);
      else compare(a[key], b[key], `${path}.${key}`);
    }
    for (const key of Object.keys(b)) if (!(key in a)) errors.push(`${path}.${key}: falta em pt-br`);
  }
}

/** Para dados do tipo Localized<T> ({ 'pt-br': ..., en: ... }) em qualquer profundidade. */
function checkLocalized(value, path) {
  if (kind(value) === 'array') return value.forEach((v, i) => checkLocalized(v, `${path}[${i}]`));
  if (kind(value) !== 'object') return;
  const keys = Object.keys(value);
  if (LOCALES.some((l) => keys.includes(l))) {
    for (const l of LOCALES) if (!(l in value)) errors.push(`${path}: falta o idioma ${l}`);
    if (LOCALES.every((l) => l in value)) compare(value['pt-br'], value.en, path);
    return;
  }
  for (const key of keys) checkLocalized(value[key], `${path}.${key}`);
}

compare(ptBr, en, 'i18n');
checkLocalized({ experience, projects, education, stack }, 'data');

if (errors.length) {
  console.error(`check:i18n falhou (${errors.length}):\n` + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}
console.log('check:i18n ok: PT e EN completos.');
