# elciojunior.com

Site pessoal de apresentação de Elcio Júnior, feito em **Astro** com saída **estática** e **TypeScript strict**.
O plano de evolução por fases está em [docs/PLANO-MIGRACAO-ASTRO.md](docs/PLANO-MIGRACAO-ASTRO.md).

## Comandos

```bash
npm install        # dependências (Node: versão em .nvmrc)
npm run dev        # servidor local em http://localhost:4321
npm run check:i18n # confere se PT e EN têm as mesmas chaves e nenhum texto vazio
npm run build      # check:i18n + astro check (tipos) + build em dist/
npm run preview    # serve o dist/ para conferir o build
```

## Onde fica cada coisa

| O quê | Onde |
|---|---|
| Textos de interface (menu, hero, títulos, botões, meta) | `src/i18n/pt-br.ts` e `src/i18n/en.ts` (tipo em `src/i18n/types.ts`) |
| Experiência, projetos e formação | `src/data/experience.ts`, `projects.ts`, `education.ts` |
| Tech stack | `src/data/stack.ts` |
| Links de contato | `src/data/links.ts` |
| Estilos (tema claro/escuro, paleta azul + dourado) | `src/styles/global.css` |
| Componentes da página | `src/components/` (a página inteira é montada em `HomePage.astro`) |
| Rotas | `src/pages/index.astro` (pt-br, em `/`) e `src/pages/en/index.astro` (en, em `/en/`) |
| Foto/ilustração | `src/assets/img/` (otimizada pelo `<Image>` do Astro) |
| Favicons, robots.txt, CNAME | `public/` |
| Arte original do favicon (2000×2000, não entra no build) | `src/assets/img/favicon-source.webp` |
| Fontes (Fraunces e JetBrains Mono, hospedadas no site) | pacotes `@fontsource*`, importados em `src/layouts/Base.astro` |

## Regras

- **Todo texto é renderizado no HTML durante o build.** Não preencher conteúdo via JavaScript no navegador: Google, LinkedIn e WhatsApp precisam ver o texto no HTML.
- Scripts de cliente só para o que é interativo (tema, fundo animado, reveal, menu ativo), dentro do próprio componente.
- **Conteúdo sempre em PT e EN na mesma alteração.** O tipo `UIStrings` e o `Localized<T>` fazem o build falhar se faltar um idioma.
- Manter as classes CSS e IDs existentes; o `global.css` depende deles.
- Respeitar `prefers-reduced-motion` em qualquer animação nova.
- Acessibilidade: `alt` em toda imagem, contraste AA, navegação por teclado.
- **Não copiar nada do repositório `akitaonrails/ai-toolkit-web`** (é UNLICENSED): nem código, nem prompts, nem imagens. Ele serve só de referência de abordagem.
- Nada de segredos no repositório (`.env` está no `.gitignore`).
- Commits pequenos e descritivos, em português; um PR por fase do plano.
