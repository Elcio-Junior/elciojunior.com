import type { Localized } from '../i18n/locales';

export interface TimelineItem {
  meta: string;
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
