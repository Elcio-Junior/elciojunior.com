# Deploy: GitHub Pages + domínio da Hostinger

O site é publicado no **GitHub Pages** por um workflow do **GitHub Actions**. O domínio `elciojunior.com`
continua registrado na **Hostinger**, mas o DNS dele aponta para os servidores do GitHub.

```
push na main ──► GitHub Actions (build) ──► GitHub Pages ◄── DNS da Hostinger ◄── elciojunior.com
```

## Como publicar uma mudança

1. Trabalhe numa branch e abra um PR para a `main`.
2. Junte o PR com **Create a merge commit** e apague a branch.
3. O workflow **Deploy no GitHub Pages** roda sozinho (aba **Actions**, cerca de 2 minutos).
4. Verde = publicado. Vermelho = abrir o run e ler o log do job que falhou.

Também dá para publicar sem commit novo: aba **Actions** → *Deploy no GitHub Pages* → **Run workflow**.

### PRs empilhados (uma branch criada a partir da outra)

Junte **em ordem** e clique em **Delete branch** depois de cada merge: só assim o GitHub muda a base do PR seguinte
para a `main`. Se a branch não for apagada, o PR seguinte entra na branch anterior, e não na `main`.
Não use **Squash** em PRs empilhados: os PRs seguintes passam a dar conflito.

## O que está no repositório

| Arquivo | Para quê |
|---|---|
| `.github/workflows/deploy.yml` | Receita oficial do Astro: `withastro/action@v6` (instala, roda `npm run build`, envia o `dist/`) + `actions/deploy-pages@v5`. Node 26. Roda em push na `main` e manualmente. |
| `astro.config.mjs` | `site: 'https://elciojunior.com'` e **sem** `base` (domínio próprio serve na raiz). |
| `public/CNAME` | `elciojunior.com`. Com deploy por Actions o GitHub ignora este arquivo (o domínio vem da configuração do repositório); ele fica como registro. |

O endereço de teste `elcio-junior.github.io/elciojunior.com/` abre **sem estilos**: o site pede os arquivos na raiz
(`/_astro/...`) e ali ele mora numa subpasta. É esperado; para testar antes de publicar, use `npm run build && npm run preview`.

## Configuração no GitHub (feita uma vez)

- **Repositório** → Settings → Pages:
  - Source: **GitHub Actions**
  - Custom domain: `elciojunior.com`
  - **Enforce HTTPS**: marcado (fica disponível depois que o GitHub emite o certificado do Let's Encrypt, de minutos a 24 h)
- **Conta** (foto → Settings → Pages): domínio `elciojunior.com` **verificado**. Isso impede que outra conta do GitHub
  publique um site no domínio ou nos subdomínios diretos.

## DNS na Hostinger

Hostinger → Domínios → `elciojunior.com` → DNS / Nameservers. Nameservers: `horizon.dns-parking.com` e `orbit.dns-parking.com`.

| Tipo | Nome | Valor |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |
| CNAME | www | elcio-junior.github.io |
| TXT | `_github-pages-challenge-Elcio-Junior` | código de verificação do GitHub (**não apagar**) |

Antes da troca, o domínio tinha `A @ → 2.57.91.91` (hospedagem da Hostinger) e `CNAME www → elciojunior.com`.
Não havia MX nem TXT de e-mail.

Regras:
- **Não criar registros curinga** (`*.elciojunior.com`): o GitHub alerta que eles permitem sequestro de subdomínios.
- Se um dia configurar e-mail no domínio, os registros MX/SPF/DKIM/DMARC podem conviver com os de cima.
- IPs conferidos em https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
  (novembro de 2026). Se o GitHub mudar os IPs, atualizar aqui e na Hostinger.

## Como conferir

```powershell
Resolve-DnsName elciojunior.com -Type A -Server 8.8.8.8
Resolve-DnsName www.elciojunior.com -Type CNAME -Server 8.8.8.8
Resolve-DnsName _github-pages-challenge-Elcio-Junior.elciojunior.com -Type TXT -Server 8.8.8.8
```

Esperado no navegador:
- `https://elciojunior.com/` e `https://elciojunior.com/en/` abrem o site com cadeado;
- `http://...` e `https://www...` redirecionam para `https://elciojunior.com/`;
- um endereço inexistente mostra a página 404 bilíngue.

Antivírus que inspecionam HTTPS (como o Kaspersky) trocam o emissor do certificado mostrado no navegador e nos
testes locais; o nome do certificado (`elciojunior.com`) continua sendo o que importa.

## Depois do deploy

- Validar a prévia de compartilhamento no Post Inspector do LinkedIn (https://www.linkedin.com/post-inspector/)
  e no depurador do Facebook (https://developers.facebook.com/tools/debug/).
- Validar o JSON-LD no Rich Results Test (https://search.google.com/test/rich-results).
- Se a hospedagem antiga da Hostinger servia só este site, avaliar o cancelamento (o domínio continua registrado lá).
