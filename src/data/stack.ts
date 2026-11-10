import {
  siAngular, siAnthropic, siAstro, siBlazor, siClaude, siDocker, siDotnet, siGithubactions, siGithubpages, siGitlab,
  siGoogle, siGooglegemini, siHostinger, siJasmine, siJenkins, siJest, siJsonwebtokens, siKeycloak, siMongodb, siN8n,
  siNgrx, siNodedotjs, siNx, siPostgresql, siPrimeng, siReact, siReactivex, siRedis, siSharp, siTailwindcss, siTelegram,
  siTraefikproxy, siTypescript, siUbuntu, siWhatsapp,
} from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';
import type { StackCategory, StackItem } from './types';

const i = (name: string, icon?: SimpleIcon): StackItem => ({ name, icon });

/**
 * A ordem é a da torre, de cima para baixo: o primeiro andar é o topo e o último é a base.
 * Marcas que o Simple Icons não traz (C#, SQL Server, Azure, AWS...) ficam sem `icon` e mostram o losango.
 */
export const stack: StackCategory[] = [
  {
    name: { 'pt-br': 'Frontend', en: 'Frontend' },
    emblem: 'frontend',
    items: [
      i('Angular 20', siAngular), i('Signals'), i('Standalone'), i('Zoneless'), i('TypeScript', siTypescript), i('RxJS', siReactivex),
      i('Nx', siNx), i('NgRx', siNgrx), i('PrimeNG', siPrimeng), i('Angular Material'), i('Tailwind CSS', siTailwindcss),
      i('Blazor WebAssembly', siBlazor), i('MudBlazor'), i('React', siReact), i('Astro', siAstro), i('SSG'),
    ],
  },
  {
    name: { 'pt-br': 'Web e SEO', en: 'Web & SEO' },
    emblem: 'web',
    items: [i('SEO'), i('Open Graph'), i('JSON-LD (Schema.org)'), i('hreflang'), i('Sitemap'), i('i18n'), i('WCAG'), i('Sharp', siSharp)],
  },
  {
    name: { 'pt-br': 'Autenticação', en: 'Authentication' },
    emblem: 'auth',
    items: [i('Keycloak', siKeycloak), i('JWT', siJsonwebtokens), i('OAuth (Google)', siGoogle), i('SSO')],
  },
  {
    name: { 'pt-br': 'Backend', en: 'Backend' },
    emblem: 'backend',
    items: [
      i('C#'), i('.NET 9/8/6', siDotnet), i('ASP.NET Core Web API', siDotnet), i('Entity Framework Core'), i('Dapper'), i('OData'),
      i('CQRS'), i('DDD'), i('BFF'), i('REST APIs'),
    ],
  },
  {
    name: { 'pt-br': 'IA e automação', en: 'AI & automation' },
    emblem: 'ai',
    items: [
      i('Anthropic Claude API', siAnthropic), i('Claude Code', siClaude), i('Gemini API', siGooglegemini), i('Prompt engineering'),
      i('Guardrails'), i('n8n', siN8n), i('Webhooks'), i('Telegram Bot API', siTelegram), i('WhatsApp API (OpenWA)', siWhatsapp),
    ],
  },
  {
    name: { 'pt-br': 'Testes', en: 'Testing' },
    emblem: 'testing',
    items: [i('Jest', siJest), i('Jasmine/Karma', siJasmine), i('xUnit'), i('MSTest'), i('SpecFlow/BDD')],
  },
  {
    name: { 'pt-br': 'Cloud e DevOps', en: 'Cloud & DevOps' },
    emblem: 'cloud',
    items: [
      i('Docker', siDocker), i('Docker Compose', siDocker), i('Traefik', siTraefikproxy), i('Linux (Ubuntu)', siUbuntu),
      i('Node.js', siNodedotjs), i('Azure Functions'), i('Azure Blob Storage'), i('Azure Queue'), i('AWS'),
      i('GitHub Actions', siGithubactions), i('GitHub Pages', siGithubpages), i('DNS (Hostinger)', siHostinger),
      i('GitLab CI/CD', siGitlab), i('Azure DevOps'), i('Jenkins', siJenkins),
    ],
  },
  {
    name: { 'pt-br': 'Banco de dados', en: 'Databases' },
    emblem: 'database',
    items: [i('SQL Server'), i('PostgreSQL', siPostgresql), i('MongoDB', siMongodb), i('Redis', siRedis)],
  },
];
