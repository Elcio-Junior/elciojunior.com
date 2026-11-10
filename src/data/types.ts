import type { SimpleIcon } from 'simple-icons';
import type { Localized } from '../i18n/locales';

export interface TimelineItem {
  /** Linha pequena acima do título (data, categoria). Opcional: a experiência não mostra datas. */
  meta?: string;
  title: string;
  text: string;
}

/** Emblema desenhado para cada andar da torre da stack (ver src/components/stack-emblems.ts). */
export type StackEmblem = 'frontend' | 'web' | 'auth' | 'backend' | 'ai' | 'testing' | 'cloud' | 'database';

export interface StackItem {
  name: string;
  /** Logo do pacote Simple Icons. Sem logo (conceitos ou marcas fora do pacote), a tag mostra um losango. */
  icon?: SimpleIcon;
}

export interface StackCategory {
  name: Localized<string>;
  emblem: StackEmblem;
  items: StackItem[];
}

export type SocialIcon = 'github' | 'linkedin' | 'email' | 'whatsapp';

export interface SocialLink {
  label: string;
  url: string;
  /** Ícone mostrado nos atalhos abaixo do retrato (SocialIcons.astro). */
  icon: SocialIcon;
}
