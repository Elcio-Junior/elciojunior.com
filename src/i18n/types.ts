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
  /** Texto alternativo dos pôsteres ilustrados de cada seção (descrever a imagem escolhida). */
  posters: { stack: string; experience: string; projects: string; education: string; contact: string };
  avatarAlt: string;
  nav: { stack: string; experience: string; contact: string };
  langSwitch: { label: string; aria: string };
  themeToggleAria: string;
  /** Botão flutuante que leva ao topo da página (BackToTop.astro). */
  backToTop: string;
  /** Atalhos com ícones abaixo do retrato: nome da lista e sufixo para links que abrem em nova aba. */
  socials: { aria: string; newTab: string };
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
