# Plano: migrar elciojunior.com para Astro + fluxo de imagens com IA

> Documento de trabalho para o Claude Code. Execute fase por fase, cada uma numa branch própria com PR, e só avance depois que a anterior for revisada e mesclada.

## Contexto

### Estado atual (commit `1ba7fa1`)
- Página única em HTML/CSS/JS puros, sem build e sem dependências (~470 linhas):
  - `index.html`: esqueleto com `data-i18n` vazios.
  - `js/content.js`: todo o conteúdo (`window.SITE`) em PT e EN, mais `links` e `stack`.
  - `js/main.js`: monta o conteúdo no navegador, troca idioma e tema, cria o fundo animado de código, faz o reveal ao rolar e destaca o link ativo do menu.
  - `css/style.css`: tema claro/escuro por `data-theme`, paleta azul + dourado, arco do avatar, losangos e raios.
  - `assets/`: `profile.png`, favicons e `avatar.svg`.
- **Problema principal:** o HTML entregue chega sem texto, porque tudo é preenchido via JS. O Google, o LinkedIn e o WhatsApp veem uma página vazia, e o inglês não tem URL própria.
- Pendência de conteúdo: `content.js` tem `// TODO: confirmar data de saída` na experiência do PNUD.

### Decisões já tomadas
| Tema | Decisão |
|---|---|
| Framework | **Astro** (versão estável mais recente), saída **estática** |
| Linguagem | **TypeScript** |
| Hospedagem | **GitHub Pages**, publicado por **GitHub Actions** |
| Domínio | `elciojunior.com`, **registrado na Hostinger**; o DNS **continua na Hostinger** (sem trocar nameservers) |
| Idiomas | `pt-br` (padrão, em `/`) e `en` (em `/en/`) |
| Imagens | Geradas com a API do Google Gemini (`gemini-3-pro-image`), fora do build, revisadas a olho e versionadas |
| VPS própria | **Não** usar para este site |

### Decisões pendentes (perguntar ao Elcio quando chegar a hora)
- [ ] **Direção de arte** das imagens (fase 4). Opções levantadas:
  1. **Azulejo português**: cobalto e branco com detalhes dourados; liga Viseu/Portugal à paleta atual.
  2. **Planta técnica (blueprint)**: traço de engenharia em azul.
  3. **Gravura editorial** em 2 ou 3 cores.
  - Evitar o estilo "pôster art déco de Feira Mundial, azul-marinho e latão" do site do Fabio Akita (ailair.akitaonrails.com), que é a identidade dele. Os toques atuais de arco, losango e raios já lembram esse site; ao definir a direção de arte, considerar diferenciar.
- [ ] **Chave da API do Gemini** (fase 4): o Elcio cria em https://aistudio.google.com/apikey.
- [ ] O site atual está num plano de hospedagem da Hostinger? Se sim, ele pode cancelar depois da fase 5.
- [ ] Ele usa e-mail no domínio? Se usa, **não tocar** em registros MX/TXT na Hostinger.

### Referência de inspiração
O método foi inspirado em `akitaonrails/ai-toolkit-web` (Astro + imagens geradas com Gemini). O repositório é **UNLICENSED**: dá para estudar a abordagem, mas **não copiar** código, prompts (`_style.txt`) nem imagens. Tudo aqui deve ser escrito do zero.

---

## Estrutura alvo

```
elciojunior.com/
├── .github/workflows/deploy.yml   # build + deploy no GitHub Pages
├── astro.config.mjs               # site, i18n, sitemap
├── package.json
├── tsconfig.json
├── CLAUDE.md                      # regras do projeto (criar na fase 1)
├── public/
│   ├── CNAME                      # "elciojunior.com"
│   ├── favicon.ico, favicon-32.png, icon-512.png, apple-touch-icon.png
│   └── robots.txt
├── src/
│   ├── data/                      # conteúdo tipado (vem do content.js)
│   │   ├── links.ts
│   │   ├── stack.ts
│   │   ├── experience.ts          # { pt: [...], en: [...] }
│   │   ├── projects.ts
│   │   └── education.ts
│   ├── i18n/
│   │   ├── pt-br.ts               # textos de interface
│   │   ├── en.ts
│   │   └── index.ts               # t(locale, key), helpers de rota
│   ├── layouts/Base.astro         # <head>, SEO, script de tema
│   ├── components/
│   │   ├── Header.astro           # brand, nav, botão de idioma (link), botão de tema
│   │   ├── Hero.astro
│   │   ├── Section.astro          # título com losango + slot
│   │   ├── About.astro
│   │   ├── StackGrid.astro
│   │   ├── Timeline.astro         # experiência, projetos e formação
│   │   ├── Contact.astro
│   │   ├── CodeBackground.astro   # fundo animado (script de cliente)
│   │   └── Footer.astro
│   ├── pages/
│   │   ├── index.astro            # pt-br
│   │   └── en/index.astro         # en
│   ├── styles/global.css          # o style.css atual
│   └── assets/img/                # profile.png (otimizado pelo Astro) e gen/
├── scripts/
│   ├── gen-image.mjs              # fase 4
│   └── prompts/
│       ├── _style.txt             # direção de arte (fase 4)
│       └── <id>.txt
└── docs/
    ├── PLANO-MIGRACAO-ASTRO.md    # este arquivo
    ├── images.md                  # fluxo de imagens (fase 4)
    └── deploy.md                  # GitHub Pages + DNS Hostinger (fase 5)
```

---

## Fase 1: migração 1:1 para Astro (sem mudar o visual)

**Branch:** `feat/astro-migracao`

**Objetivo:** o site gerado pelo Astro deve ficar **visualmente idêntico** ao atual, em PT, nos temas claro e escuro, no desktop e no celular.

Tarefas:
1. Iniciar o projeto Astro na raiz (template mínimo, TypeScript `strict`). Adicionar `.nvmrc` com a versão LTS do Node. Atualizar o `.gitignore` com `node_modules/`, `dist/`, `.astro/` e `.env`.
2. Mover `css/style.css` para `src/styles/global.css`, sem alterar regras, e importar no `Base.astro`. Manter as fontes atuais (Fraunces + JetBrains Mono). Opcional: trocar o Google Fonts por `@fontsource` para não depender de terceiros.
3. Quebrar `index.html` nos componentes listados acima, mantendo **as mesmas classes CSS e IDs** para o CSS continuar valendo.
4. Converter `js/content.js` em módulos tipados em `src/data/` e `src/i18n/`, com interfaces (`ExperienceItem { meta; title; text }` etc.). **Todo o texto deve ser renderizado no HTML durante o build**, sem `data-i18n` preenchido por JS.
5. Scripts de cliente: manter só o que é interativo, como `<script>` dentro dos componentes:
   - Script anti-flash de tema no `<head>`, com `is:inline`, igual ao atual.
   - Botão de tema (alternar `data-theme` e salvar no `localStorage`).
   - Fundo de código animado (`buildCodeBg`) no `CodeBackground.astro`.
   - Reveal com `IntersectionObserver` e link ativo do menu.
   - O ano do rodapé passa a ser gerado no build.
6. Avatar: `src/assets/img/profile.png` com `<Image>` do `astro:assets`, mantendo `width`/`height` e `alt`.
7. Favicons em `public/`.
8. Remover `index.html`, `js/` e `css/` antigos **só depois** de conferir a paridade.
9. Criar `CLAUDE.md` com as regras: comandos (`npm run dev/build/preview`), onde fica cada tipo de conteúdo, "todo texto renderizado no build", "não copiar nada do ai-toolkit-web", e conteúdo em PT e EN sempre juntos.

**Critérios de aceite:**
- `npm run build` sem erros nem avisos de tipo.
- `dist/index.html` contém o nome, o resumo, todas as experiências e projetos **em texto**. Verificar com `grep` em `dist/index.html`.
- Comparação visual com o site atual (Playwright ou print manual), PT, claro/escuro, 1280px e 390px.
- Fundo animado, troca de tema, reveal e menu ativo funcionando.
- Lighthouse: Performance ≥ 95, Acessibilidade ≥ 95, SEO ≥ 95.

---

## Fase 2: i18n com rotas reais

**Branch:** `feat/i18n-rotas`

1. Configurar `i18n` no `astro.config.mjs`: `defaultLocale: 'pt-br'`, `locales: ['pt-br', 'en']`, `routing: { prefixDefaultLocale: false }`.
2. `src/pages/index.astro` (PT) e `src/pages/en/index.astro` (EN) usam os mesmos componentes, recebendo `locale`.
3. `<html lang>` correto (`pt-BR` / `en`), `<title>` e `meta description` por idioma.
4. O botão de idioma vira um `<a href>` para a outra versão (PT ↔ EN), sem JS.
5. `<link rel="alternate" hreflang="pt-BR|en|x-default">` nas duas páginas.
6. Script de verificação simples (`scripts/check-i18n.mjs`): falha se alguma chave existir num idioma e faltar no outro. Adicionar como `npm run check:i18n`.
7. Resolver o `TODO` da data de saída do PNUD (perguntar ao Elcio).

**Critérios de aceite:** `/` e `/en/` com todo o conteúdo no HTML; `check:i18n` passando; troca de idioma funcionando sem JS.

---

## Fase 3: SEO e compartilhamento

**Branch:** `feat/seo`

1. `site: 'https://elciojunior.com'` no `astro.config.mjs` e integração `@astrojs/sitemap`.
2. Open Graph e Twitter Card por idioma: `og:title`, `og:description`, `og:url`, `og:locale` (+ `og:locale:alternate`) e `og:image`.
   - Até a fase 4, a `og:image` pode ser provisória (ex.: avatar sobre um fundo da paleta). Tamanho **1200×630**, JPEG com **menos de 300 KB** para a prévia aparecer no WhatsApp.
3. JSON-LD `Person` (nome, cargo, local Viseu/Portugal, `sameAs` com GitHub e LinkedIn).
4. `canonical` por página e `robots.txt` apontando para o sitemap.
5. Página 404 (`src/pages/404.astro`) nos dois idiomas ou bilíngue.

**Critérios de aceite:** validar a prévia no depurador do LinkedIn (Post Inspector) e no do Facebook, e ver o JSON-LD sem erros no Rich Results Test, já com o site no ar (ou com a URL temporária do Pages).

---

## Fase 4: fluxo de imagens com Gemini

**Branch:** `feat/imagens-ia`  ·  **Pré-requisitos:** direção de arte escolhida e chave da API.

### Princípios
- **Uma única direção de arte**, em `scripts/prompts/_style.txt`, anexada automaticamente a todo prompt. Os prompts individuais descrevem **só o conteúdo**, nunca o estilo.
- A geração roda **localmente**, fora do build e do CI. As imagens resultantes são commitadas.
- **Nada vai ao ar sem revisão a olho**: o modelo pode errar grafia, inventar texto ou desenhar algo errado.
- Pôsteres e ilustrações **sem nenhum texto**, para não precisar traduzir. Se um dia houver diagramas com rótulos, gerar uma cópia por idioma e conferir rótulo por rótulo.
- A chave fica em `GEMINI_API_KEY` (variável de ambiente ou `.env`, que está no `.gitignore`), **nunca no repositório**.

### Tarefas
1. `scripts/gen-image.mjs <id> [--aspect 3:4|16:9] [--n 3]`:
   - Lê `scripts/prompts/<id>.txt` e junta com `_style.txt`.
   - Chama a API do Gemini (modelo de imagem `gemini-3-pro-image`; conferir o nome e o SDK atuais na documentação oficial antes de implementar).
   - Gera N variações em `src/assets/img/gen/_drafts/<id>-<n>.png` para escolha.
   - `--pick <n>` promove a escolhida para `src/assets/img/gen/<id>.webp` (convertida com `sharp`).
   - `_drafts/` fica fora do git.
2. Escrever `_style.txt` com a direção de arte escolhida (paleta coerente com `--blue`/`--gold` do CSS, ou uma paleta nova, ajustando o CSS junto).
3. Imagens a criar (sem texto):
   - Um pôster **3:4** por seção: `poster-about`, `poster-stack`, `poster-experience`, `poster-projects`, `poster-contact`.
   - `og` em **16:9**, recortada para `public/og.jpg` em 1200×630, com menos de 300 KB.
   - Opcional: uma versão ilustrada do avatar no mesmo estilo.
4. Integrar no layout com `<Image>`/`<Picture>` (WebP/AVIF, responsivo, `alt` descritivo em PT e EN).
5. Documentar tudo em `docs/images.md`: como gerar, regras de revisão, formatos e o custo (centavos por imagem).

**Critérios de aceite:** todas as imagens revisadas, sem texto espúrio; página continua com Lighthouse ≥ 95; `alt` nos dois idiomas.

---

## Fase 5: deploy no GitHub Pages + domínio da Hostinger

**Branch:** `ci/github-pages` (o workflow pode entrar já na fase 1 para gerar a URL de teste `elcio-junior.github.io/elciojunior.com`, mas o domínio só é apontado aqui).

### No repositório
1. `.github/workflows/deploy.yml` usando a action oficial do Astro (`withastro/action`) + `actions/deploy-pages`, disparado em push na `main` e manualmente (`workflow_dispatch`).
2. `public/CNAME` com `elciojunior.com`.
3. `astro.config.mjs` com `site: 'https://elciojunior.com'` e **sem** `base` (o domínio próprio serve na raiz).
   - Atenção: enquanto o domínio não estiver configurado, a URL de teste fica sob `/elciojunior.com/`, e caminhos absolutos podem quebrar nela. Para testes, usar `npm run preview` localmente.

### No GitHub (passos manuais do Elcio)
1. Settings → Pages → Source: **GitHub Actions**.
2. Settings → Pages → Custom domain: `elciojunior.com`.
3. **Verificar o domínio** na conta (Settings da conta → Pages → Add a verified domain), para evitar que outra pessoa sequestre o domínio. Isso pede um registro TXT na Hostinger.
4. Depois que o DNS propagar, marcar **Enforce HTTPS**.

### Na Hostinger (DNS do domínio)
Antes de mudar, **anotar/printar todos os registros atuais**. Não mexer em MX, TXT de SPF/DKIM/DMARC nem em nada de e-mail.

| Tipo | Nome | Valor |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | elcio-junior.github.io |
| TXT | `_github-pages-challenge-Elcio-Junior` | (valor que o GitHub mostrar) |

- Remover os registros **A/AAAA/CNAME antigos** de `@` e `www` que apontam para a hospedagem atual.
- Opcional, para IPv6: AAAA para `2606:50c0:8000::153`, `8001::153`, `8002::153` e `8003::153`.
- Conferir os IPs na documentação oficial do GitHub Pages ("Managing a custom domain") no momento da troca.

### Depois
- Testar `https://elciojunior.com`, `https://www.elciojunior.com` (deve redirecionar) e `/en/`.
- Escrever `docs/deploy.md` com este passo a passo.
- Se a hospedagem antiga da Hostinger servia só este site, avaliar o cancelamento (o domínio continua registrado lá).

---

## Fase 6 (opcional, futuro)
- Uma página por projeto (`/projetos/obra-no-bolso-ai`), com Content Collections.
- Blog em Markdown/MDX com RSS.
- Testes de regressão visual com Playwright no CI.

---

## Convenções gerais
- Commits pequenos e descritivos; um PR por fase, com prints antes/depois.
- Conteúdo sempre em PT **e** EN na mesma alteração.
- Nada de segredos no repositório.
- Acessibilidade: contraste AA, `alt` em toda imagem, navegação por teclado e `prefers-reduced-motion` respeitado no fundo animado e nas animações de reveal.
