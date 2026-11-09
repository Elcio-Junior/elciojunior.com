// @ts-check
import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // URL pública: usada para gerar os links absolutos de hreflang (e, na fase 3, canonical e sitemap)
  site: 'https://elciojunior.com',
  output: 'static',
  i18n: {
    defaultLocale: 'pt-br',
    locales: ['pt-br', 'en'],
    // PT fica na raiz (/), EN em /en/
    routing: { prefixDefaultLocale: false },
  },
});
