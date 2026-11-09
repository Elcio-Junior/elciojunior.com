export const locales = ['pt-br', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pt-br';

/** Valor com uma versão para cada idioma. */
export type Localized<T> = Record<Locale, T>;
