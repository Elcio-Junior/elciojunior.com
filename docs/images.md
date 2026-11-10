# Imagens geradas com IA (Gemini)

As ilustrações do site (um pôster por seção e a imagem de compartilhamento) são geradas com a API do Gemini,
**localmente**, fora do build e do CI. Só a versão escolhida e revisada é commitada.

## Pré-requisitos

1. Chave da API em https://aistudio.google.com/apikey, salva no `.env` da raiz:
   ```
   GEMINI_API_KEY=...
   ```
   O `.env` está no `.gitignore`. **Nunca** commitar a chave nem colá-la em issues/PRs.
2. **Faturamento ativo** no projeto da chave. No nível gratuito, a cota de imagens é zero (a API responde `429 RESOURCE_EXHAUSTED`).

## Direção de arte

Fica em [`scripts/prompts/_style.txt`](../scripts/prompts/_style.txt) e é anexada automaticamente a todo prompt:
art déco de pôster dos anos 30, azul-marinho + dourado (a mesma paleta do `global.css`), raios de sol, arcos, **sem nenhum texto e sem rostos**.

Os prompts individuais (`scripts/prompts/<id>.txt`) descrevem **só o conteúdo**, nunca o estilo.

| id | Proporção | Onde aparece |
|---|---|---|
| `poster-stack` | 3:4 | Seção Tech stack |
| `poster-experience` | 3:4 | Seção Experiência |
| `poster-projects` | 3:4 | Seção Projetos |
| `poster-education` | 3:4 | Seção Formação |
| `poster-contact` | 3:4 | Seção Contato |
| `og` | 16:9 | Fundo do `public/og.jpg` (prévia no WhatsApp/LinkedIn) |
| `back-to-top` | 1:1 | Ícone do botão flutuante "voltar ao topo" (`BackToTop.astro`), mostrado a 48–56px: formas grandes e simples |

O hero não tem pôster: ele já mostra o retrato ilustrado.

## Como gerar

```bash
# 3 variações em src/assets/img/gen/_drafts/<id>-1..3.png (pasta fora do git)
npm run gen:image -- poster-stack --n 3

# depois de olhar as variações, promove a escolhida para src/assets/img/gen/<id>.webp
npm run gen:image -- poster-stack --pick 2
```

Opções: `--aspect` (padrão 3:4; 16:9 para `og`), `--n` (1 a 6), `--model` (padrão `gemini-3-pro-image`;
`gemini-3.1-flash-image` é mais barato e mais rápido).

### Imagem de compartilhamento

```bash
npm run gen:image -- og --n 3
npm run gen:image -- og --pick 1
npm run make:og
```

O `make:og` monta o `public/og.jpg` (1200×630, abaixo de 300 KB) com o fundo escolhido, o retrato na moldura em arco
e o nome. O nome é escrito pelo script, não pelo modelo, porque o modelo erra grafia.

## Regras de revisão (antes de commitar)

- **Olhar cada variação a olho.** Descartar qualquer uma com letras, números, pseudo-texto, logotipos ou marcas d'água.
- Nada de rostos humanos (o único rosto do site é o retrato do hero).
- Conferir se a paleta conversa com o site no tema claro e no escuro.
- Conferir detalhes errados (objetos deformados, mãos, mapas absurdos).
- O texto alternativo de cada pôster fica em `src/i18n/pt-br.ts` e `src/i18n/en.ts` (`posters`), e precisa descrever
  a imagem escolhida. Se trocar a imagem, revise o `alt` nos dois idiomas.

## Formatos

- Rascunhos: PNG em `src/assets/img/gen/_drafts/` (ignorado pelo git).
- Escolhidas: WebP em `src/assets/img/gen/`. O `<Image>` do Astro gera as larguras responsivas no build.
- `public/og.jpg`: JPEG 1200×630, < 300 KB.

## Custo

Cada imagem custa alguns centavos de dólar, e o modelo Pro custa mais que o Flash.
Confira os preços atuais em https://ai.google.dev/gemini-api/docs/pricing e o consumo em https://ai.dev/rate-limit.
Gerar o site inteiro com 3 variações por imagem dá 18 imagens.
