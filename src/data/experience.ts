import type { Localized } from '../i18n/locales';
import type { TimelineItem } from './types';

export const experience: Localized<TimelineItem[]> = {
  'pt-br': [
    { meta: 'dez/2025 — atual', title: 'Desenvolvedor Front-end / Tech Lead · Raftech (alocado na TIMWE)', text: 'Liderei o front-end do Etisalat eHub (Emirados Árabes), um marketplace multicanal com checkout, pagamentos, SSO e suporte bilíngue EN/AR com RTL. Também trabalhei em webviews de gamificação para a XL Axiata (Indonésia) e a DITO (Filipinas) e no back office global LMT.' },
    // TODO: confirmar a data de saída do PNUD (fase 2)
    { meta: 'mai/2024', title: 'Desenvolvedor Front-end · PNUD (Projeto SISPREQ)', text: 'Aplicação em Angular 17 com NgRx, Keycloak e Docker, em arquitetura de camadas.' },
    { meta: 'fev/2023 — mai/2024', title: 'Engenheiro de Software · Instituto Atlântico (projeto governamental)', text: 'Atuação full-stack em arquitetura BFF com .NET 8 e Angular, usando Dapper, EF e SQL Server.' },
    { meta: 'jun/2021 — fev/2023', title: 'Engenheiro de Software · Instituto Atlântico (Dell HTaaS)', text: 'Plataforma global de monitoramento da Dell, com Angular e .NET 6/8, testes BDD e CI/CD no GitLab.' },
    { meta: 'set/2020 — jul/2021', title: 'Engenheiro de Software · AYESA (ENEL)', text: 'Sistema de gestão de obras da ENEL com C# .NET, WCF e SSIS.' },
    { meta: 'mar/2019 — set/2020', title: 'Engenheiro de Software · Conveste Serviços Financeiros', text: 'APIs em ASP.NET Core com CQRS e DDD, Azure Functions e CI/CD no Azure DevOps.' },
    { meta: 'set/2017 — mar/2019', title: 'Engenheiro de Software · Grupo Work Show', text: 'APIs REST da plataforma de streaming Skuta, a Workcard e landing pages.' },
    { meta: 'set/2015 — ago/2016', title: 'Desenvolvedor · Gopag', text: 'Plataforma de transações por maquininha de cartão.' },
  ],
  en: [
    { meta: 'Dec 2025 — present', title: 'Front-end Developer / Tech Lead · Raftech (assigned to TIMWE)', text: 'Led the front-end of Etisalat eHub (UAE), a multichannel marketplace with checkout, payments, SSO and bilingual EN/AR support with RTL. Also worked on gamification webviews for XL Axiata (Indonesia) and DITO (Philippines) and on the global LMT back office.' },
    { meta: 'May 2024', title: 'Front-end Developer · UNDP (SISPREQ Project)', text: 'Angular 17 application with NgRx, Keycloak and Docker, in a layered architecture.' },
    { meta: 'Feb 2023 — May 2024', title: 'Software Engineer · Instituto Atlântico (government project)', text: 'Full-stack work on a BFF architecture with .NET 8 and Angular, using Dapper, EF and SQL Server.' },
    { meta: 'Jun 2021 — Feb 2023', title: 'Software Engineer · Instituto Atlântico (Dell HTaaS)', text: "Dell's global monitoring platform, with Angular and .NET 6/8, BDD tests and CI/CD on GitLab." },
    { meta: 'Sep 2020 — Jul 2021', title: 'Software Engineer · AYESA (ENEL)', text: "ENEL's construction management system with C# .NET, WCF and SSIS." },
    { meta: 'Mar 2019 — Sep 2020', title: 'Software Engineer · Conveste Serviços Financeiros', text: 'ASP.NET Core APIs with CQRS and DDD, Azure Functions and CI/CD on Azure DevOps.' },
    { meta: 'Sep 2017 — Mar 2019', title: 'Software Engineer · Grupo Work Show', text: 'REST APIs for the Skuta streaming platform, Workcard and landing pages.' },
    { meta: 'Sep 2015 — Aug 2016', title: 'Developer · Gopag', text: 'Card-machine transaction platform.' },
  ],
};
