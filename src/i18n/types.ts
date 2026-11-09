/** Textos de interface. Toda chave precisa existir em pt-br.ts e en.ts. */
export interface UIStrings {
  htmlLang: string;
  title: string;
  metaDescription: string;
  /** Formato do Open Graph, ex.: pt_BR */
  ogLocale: string;
  ogImageAlt: string;
  /** Cargo usado no JSON-LD (Person.jobTitle) */
  jobTitle: string;
  notFound: { title: string; heading: string; text: string; back: string };
  avatarAlt: string;
  nav: { stack: string; experience: string; contact: string };
  langSwitch: { label: string; aria: string };
  themeToggleAria: string;
  hero: {
    eyebrow: string;
    name: string;
    role: string;
    summary: string[];
    location: string;
    ctaContact: string;
    ctaExperience: string;
  };
  sections: {
    stack: string;
    experience: string;
    projects: string;
    education: string;
    contact: string;
  };
  contactText: string;
}
