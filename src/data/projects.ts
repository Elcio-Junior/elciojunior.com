import type { Localized } from '../i18n/locales';
import type { TimelineItem } from './types';

export const projects: Localized<TimelineItem[]> = {
  'pt-br': [
    { meta: 'jun/2026 — atual', title: 'Obra no Bolso AI', text: 'Sistema full-stack de gestão financeira de obras em .NET 9, Blazor WebAssembly, EF Core e PostgreSQL. Tem login com Google + JWT, isolamento de dados por usuário (multi-tenant) e um assistente de IA no Telegram, feito com a API do Claude, com guardrails de escopo e cota de uso por usuário.' },
    { meta: 'Infraestrutura', title: 'Infraestrutura e automação em VPS', text: 'VPS Linux com Docker e Traefik (HTTPS automático), rodando n8n, um gateway de WhatsApp (OpenWA) e PostgreSQL. Os serviços se integram por webhooks para automatizar atendimentos, sem guardar dados pessoais no histórico.' },
  ],
  en: [
    { meta: 'Jun 2026 — present', title: 'Obra no Bolso AI', text: 'Full-stack system for construction project finances in .NET 9, Blazor WebAssembly, EF Core and PostgreSQL. It has Google + JWT login, per-user data isolation (multi-tenant) and an AI assistant on Telegram built with the Claude API, with scope guardrails and a per-user usage quota.' },
    { meta: 'Infrastructure', title: 'VPS infrastructure and automation', text: 'Linux VPS with Docker and Traefik (automatic HTTPS), running n8n, a WhatsApp gateway (OpenWA) and PostgreSQL. The services integrate through webhooks to automate customer service, without storing personal data in the history.' },
  ],
};
