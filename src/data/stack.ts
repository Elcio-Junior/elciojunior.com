import type { StackCategory } from './types';

export const stack: StackCategory[] = [
  { name: { 'pt-br': 'Backend', en: 'Backend' }, items: ['C#', '.NET 9/8/6', 'ASP.NET Core Web API', 'Entity Framework Core', 'Dapper', 'OData', 'CQRS', 'DDD', 'BFF', 'REST APIs'] },
  { name: { 'pt-br': 'Frontend', en: 'Frontend' }, items: ['Angular 20', 'Signals', 'Standalone', 'Zoneless', 'TypeScript', 'RxJS', 'Nx', 'NgRx', 'PrimeNG', 'Angular Material', 'Tailwind CSS', 'Blazor WebAssembly', 'MudBlazor', 'React'] },
  { name: { 'pt-br': 'Banco de dados', en: 'Databases' }, items: ['SQL Server', 'PostgreSQL', 'MongoDB', 'Redis'] },
  { name: { 'pt-br': 'IA e automação', en: 'AI & automation' }, items: ['Anthropic Claude API', 'Prompt engineering', 'Guardrails', 'n8n', 'Webhooks', 'Telegram Bot API', 'WhatsApp API (OpenWA)'] },
  { name: { 'pt-br': 'Cloud e DevOps', en: 'Cloud & DevOps' }, items: ['Docker', 'Docker Compose', 'Traefik', 'Linux (Ubuntu)', 'Azure Functions', 'Azure Blob Storage', 'Azure Queue', 'AWS', 'GitLab CI/CD', 'Azure DevOps', 'Jenkins'] },
  { name: { 'pt-br': 'Autenticação', en: 'Authentication' }, items: ['Keycloak', 'JWT', 'OAuth (Google)', 'SSO'] },
  { name: { 'pt-br': 'Testes', en: 'Testing' }, items: ['Jest', 'Jasmine/Karma', 'xUnit', 'MSTest', 'SpecFlow/BDD'] },
];
