// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // URL pública: base dos links absolutos (canonical, hreflang, og:url, sitemap)
  site: 'https://elciojunior.com',
  output: 'static',
  i18n: {
    defaultLocale: 'pt-br',
    locales: ['pt-br', 'en'],
    // PT fica na raiz (/), EN em /en/
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    // Gera /sitemap-index.xml com as duas versões ligadas por hreflang (a 404 fica de fora)
    sitemap({
      i18n: { defaultLocale: 'pt-br', locales: { 'pt-br': 'pt-BR', en: 'en' } },
    }),
  ],
});
