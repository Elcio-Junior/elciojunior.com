import { defaultLocale, type Locale } from './locales';
import { en } from './en';
import { ptBr } from './pt-br';
import type { UIStrings } from './types';

export { defaultLocale, locales, type Locale, type Localized } from './locales';
export type { UIStrings } from './types';

const dictionaries: Record<Locale, UIStrings> = { 'pt-br': ptBr, en };

/** Textos de interface do idioma. */
export function useTranslations(locale: Locale): UIStrings {
  return dictionaries[locale];
}

/** Caminho da página inicial de um idioma: "/" para o padrão, "/en/" para os outros. */
export function homePath(locale: Locale): string {
  return locale === defaultLocale ? '/' : `/${locale}/`;
}

/** O outro idioma (o site tem só dois). */
export function otherLocale(locale: Locale): Locale {
  return locale === 'pt-br' ? 'en' : 'pt-br';
}
