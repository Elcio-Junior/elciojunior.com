import type { Localized } from '../i18n/locales';

export interface TimelineItem {
  /** Linha pequena acima do título (data, categoria). Opcional: a experiência não mostra datas. */
  meta?: string;
  title: string;
  text: string;
}

export interface StackCategory {
  name: Localized<string>;
  items: string[];
}

export interface SocialLink {
  label: string;
  url: string;
}
