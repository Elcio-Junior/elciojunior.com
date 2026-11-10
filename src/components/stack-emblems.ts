import type { StackEmblem } from '../data/types';

// Emblemas dos andares da torre da stack. Desenhados para o site no mesmo traço dos ícones sociais
// (viewBox 24, traço 1.6, cantos chanfrados art déco); a cor vem de currentColor e segue o tema.
export const stackEmblems: Record<StackEmblem, string> = {
  // janela de navegador com </>
  frontend:
    '<path d="M5 4h14l2 2v12l-2 2H5l-2-2V6z"/><path d="M3 9h18"/>' +
    '<path d="m10 12.5-2.2 2.2 2.2 2.2M14 12.5l2.2 2.2-2.2 2.2"/>',
  // globo que vira lupa (web + busca)
  web:
    '<circle cx="10.5" cy="10.5" r="7"/>' +
    '<path d="M3.5 10.5h14M10.5 3.5c-2.3 2-3.3 4.3-3.3 7s1 5 3.3 7M10.5 3.5c2.3 2 3.3 4.3 3.3 7s-1 5-3.3 7"/>' +
    '<path d="m15.7 15.7 4.8 4.8"/>',
  // cadeado chanfrado com fechadura em losango
  auth:
    '<path d="M8 10V7.5a4 4 0 0 1 8 0V10"/><path d="M6 10h12l1.5 1.5v7L18 20H6l-1.5-1.5v-7z"/>' +
    '<path d="m12 13.3 1.5 1.5-1.5 1.5-1.5-1.5z" fill="currentColor"/>',
  // dois servidores empilhados
  backend:
    '<path d="M5 3.5h14l1.5 1.5v3L19 9.5H5L3.5 8V5z"/><path d="M5 14.5h14l1.5 1.5v3L19 20.5H5L3.5 19v-3z"/>' +
    '<path d="M12 9.5v5M11 6.5h6M11 17.5h6"/>' +
    '<circle cx="7" cy="6.5" r=".7" fill="currentColor"/><circle cx="7" cy="17.5" r=".7" fill="currentColor"/>',
  // duas faíscas
  ai:
    '<path d="M10 3c.6 4 2 5.4 6 6-4 .6-5.4 2-6 6-.6-4-2-5.4-6-6 4-.6 5.4-2 6-6z"/>' +
    '<path d="M18 14c.3 1.8.9 2.4 2.7 2.7-1.8.3-2.4.9-2.7 2.7-.3-1.8-.9-2.4-2.7-2.7 1.8-.3 2.4-.9 2.7-2.7z"/>',
  // frasco de laboratório
  testing:
    '<path d="M9 3h6M10 3v6.2l-5.1 9a1.9 1.9 0 0 0 1.6 2.8h11a1.9 1.9 0 0 0 1.6-2.8l-5.1-9V3"/><path d="M7.4 15h9.2"/>',
  // nuvem com losango
  cloud:
    '<path d="M7 18.5h10.5a4 4 0 0 0 .4-8 5.5 5.5 0 0 0-10.6-1.3A4.7 4.7 0 0 0 7 18.5z"/>' +
    '<path d="m12 11.8 1.5 1.5-1.5 1.5-1.5-1.5z" fill="currentColor"/>',
  // cilindro de banco de dados
  database:
    '<ellipse cx="12" cy="5.5" rx="7" ry="2.5"/><path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13"/>' +
    '<path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/>',
};
