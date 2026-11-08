// Todo o conteúdo do site fica aqui.
window.SITE = {
  links: [
    { label: "GitHub", url: "https://github.com/Elcio-Junior" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/elcio-juniorr" },
    { label: "E-mail", url: "mailto:elciojr15@hotmail.com" }
  ],
  stack: [
    { pt: "Backend", en: "Backend", items: ["C#", ".NET 9/8/6", "ASP.NET Core Web API", "Entity Framework Core", "Dapper", "OData", "CQRS", "DDD", "BFF", "REST APIs"] },
    { pt: "Frontend", en: "Frontend", items: ["Angular 20", "Signals", "Standalone", "Zoneless", "TypeScript", "RxJS", "Nx", "NgRx", "PrimeNG", "Angular Material", "Tailwind CSS", "Blazor WebAssembly", "MudBlazor", "React"] },
    { pt: "Banco de dados", en: "Databases", items: ["SQL Server", "PostgreSQL", "MongoDB", "Redis"] },
    { pt: "IA e automação", en: "AI & automation", items: ["Anthropic Claude API", "Prompt engineering", "Guardrails", "n8n", "Webhooks", "Telegram Bot API", "WhatsApp API (OpenWA)"] },
    { pt: "Cloud e DevOps", en: "Cloud & DevOps", items: ["Docker", "Docker Compose", "Traefik", "Linux (Ubuntu)", "Azure Functions", "Azure Blob Storage", "Azure Queue", "AWS", "GitLab CI/CD", "Azure DevOps", "Jenkins"] },
    { pt: "Autenticação", en: "Authentication", items: ["Keycloak", "JWT", "OAuth (Google)", "SSO"] },
    { pt: "Testes", en: "Testing", items: ["Jest", "Jasmine/Karma", "xUnit", "MSTest", "SpecFlow/BDD"] }
  ],
  pt: {
    "meta.description": "Elcio Júnior, engenheiro de software full-stack com .NET, Angular e IA aplicada.",
    "avatar.alt": "Ilustração de Elcio Júnior",
    "nav.stack": "Stack", "nav.experience": "Experiência", "nav.contact": "Contato",
    "hero.eyebrow": "Olá, eu sou",
    "hero.name": "Elcio Júnior",
    "hero.role": "Engenheiro de Software Full-Stack | .NET • Angular • IA aplicada",
    "hero.summary": [
      "Engenheiro full-stack com mais de 10 anos de experiência em C#/.NET e Angular. Atuo em todo o ciclo de software, da análise de requisitos e arquitetura até testes, CI/CD e entrega, em produtos privados e em projetos governamentais. Já liderei o front-end de produtos multicanal e orientei desenvolvedores juniores.",
      "Gosto de construir sistemas bem estruturados que resolvem problemas concretos. Hoje combino desenvolvimento web com IA aplicada: assistentes com LLMs, guardrails de escopo, controle de custo por usuário e automações com n8n, rodando na minha própria infraestrutura com Docker e Traefik. Moro em Portugal e trabalho remotamente."
    ],
    "hero.location": "Viseu, Portugal",
    "hero.cta1": "Fale comigo", "hero.cta2": "Ver experiência",
    "stack.title": "Tech stack",
    "experience.title": "Experiência",
    "experience.items": [
      { meta: "dez/2025 — atual", title: "Desenvolvedor Front-end / Tech Lead · Raftech (alocado na TIMWE)", text: "Liderei o front-end do Etisalat eHub (Emirados Árabes), um marketplace multicanal com checkout, pagamentos, SSO e suporte bilíngue EN/AR com RTL. Também trabalhei em webviews de gamificação para a XL Axiata (Indonésia) e a DITO (Filipinas) e no back office global LMT." },
      { meta: "mai/2024", title: "Desenvolvedor Front-end · PNUD (Projeto SISPREQ)", text: "Aplicação em Angular 17 com NgRx, Keycloak e Docker, em arquitetura de camadas." }, // TODO: confirmar data de saída
      { meta: "fev/2023 — mai/2024", title: "Engenheiro de Software · Instituto Atlântico (projeto governamental)", text: "Atuação full-stack em arquitetura BFF com .NET 8 e Angular, usando Dapper, EF e SQL Server." },
      { meta: "jun/2021 — fev/2023", title: "Engenheiro de Software · Instituto Atlântico (Dell HTaaS)", text: "Plataforma global de monitoramento da Dell, com Angular e .NET 6/8, testes BDD e CI/CD no GitLab." },
      { meta: "set/2020 — jul/2021", title: "Engenheiro de Software · AYESA (ENEL)", text: "Sistema de gestão de obras da ENEL com C# .NET, WCF e SSIS." },
      { meta: "mar/2019 — set/2020", title: "Engenheiro de Software · Conveste Serviços Financeiros", text: "APIs em ASP.NET Core com CQRS e DDD, Azure Functions e CI/CD no Azure DevOps." },
      { meta: "set/2017 — mar/2019", title: "Engenheiro de Software · Grupo Work Show", text: "APIs REST da plataforma de streaming Skuta, a Workcard e landing pages." },
      { meta: "set/2015 — ago/2016", title: "Desenvolvedor · Gopag", text: "Plataforma de transações por maquininha de cartão." }
    ],
    "projects.title": "Projetos",
    "projects.items": [
      { meta: "jun/2026 — atual", title: "Obra no Bolso AI", text: "Sistema full-stack de gestão financeira de obras em .NET 9, Blazor WebAssembly, EF Core e PostgreSQL. Tem login com Google + JWT, isolamento de dados por usuário (multi-tenant) e um assistente de IA no Telegram, feito com a API do Claude, com guardrails de escopo e cota de uso por usuário." },
      { meta: "Infraestrutura", title: "Infraestrutura e automação em VPS", text: "VPS Linux com Docker e Traefik (HTTPS automático), rodando n8n, um gateway de WhatsApp (OpenWA) e PostgreSQL. Os serviços se integram por webhooks para automatizar atendimentos, sem guardar dados pessoais no histórico." }
    ],
    "education.title": "Formação",
    "education.items": [
      { meta: "2022", title: "Pós-graduação em Arquitetura de Software", text: "PUC-PR" },
      { meta: "2018", title: "Tecnologia em Análise e Desenvolvimento de Sistemas", text: "UniGoiás" }
    ],
    "contact.title": "Contato",
    "contact.text": "Vamos conversar? Me encontre nos canais abaixo."
  },
  en: {
    "meta.description": "Elcio Júnior, full-stack software engineer working with .NET, Angular and applied AI.",
    "avatar.alt": "Illustration of Elcio Júnior",
    "nav.stack": "Stack", "nav.experience": "Experience", "nav.contact": "Contact",
    "hero.eyebrow": "Hi, I'm",
    "hero.name": "Elcio Júnior",
    "hero.role": "Full-Stack Software Engineer | .NET • Angular • Applied AI",
    "hero.summary": [
      "Full-stack engineer with over 10 years of experience in C#/.NET and Angular. I work across the whole software lifecycle, from requirements analysis and architecture to testing, CI/CD and delivery, on private products and government projects. I have led the front-end of multichannel products and mentored junior developers.",
      "I like building well-structured systems that solve concrete problems. Today I combine web development with applied AI: LLM-powered assistants, scope guardrails, per-user cost control and automations with n8n, running on my own infrastructure with Docker and Traefik. I live in Portugal and work remotely."
    ],
    "hero.location": "Viseu, Portugal",
    "hero.cta1": "Get in touch", "hero.cta2": "See experience",
    "stack.title": "Tech stack",
    "experience.title": "Experience",
    "experience.items": [
      { meta: "Dec 2025 — present", title: "Front-end Developer / Tech Lead · Raftech (assigned to TIMWE)", text: "Led the front-end of Etisalat eHub (UAE), a multichannel marketplace with checkout, payments, SSO and bilingual EN/AR support with RTL. Also worked on gamification webviews for XL Axiata (Indonesia) and DITO (Philippines) and on the global LMT back office." },
      { meta: "May 2024", title: "Front-end Developer · UNDP (SISPREQ Project)", text: "Angular 17 application with NgRx, Keycloak and Docker, in a layered architecture." },
      { meta: "Feb 2023 — May 2024", title: "Software Engineer · Instituto Atlântico (government project)", text: "Full-stack work on a BFF architecture with .NET 8 and Angular, using Dapper, EF and SQL Server." },
      { meta: "Jun 2021 — Feb 2023", title: "Software Engineer · Instituto Atlântico (Dell HTaaS)", text: "Dell's global monitoring platform, with Angular and .NET 6/8, BDD tests and CI/CD on GitLab." },
      { meta: "Sep 2020 — Jul 2021", title: "Software Engineer · AYESA (ENEL)", text: "ENEL's construction management system with C# .NET, WCF and SSIS." },
      { meta: "Mar 2019 — Sep 2020", title: "Software Engineer · Conveste Serviços Financeiros", text: "ASP.NET Core APIs with CQRS and DDD, Azure Functions and CI/CD on Azure DevOps." },
      { meta: "Sep 2017 — Mar 2019", title: "Software Engineer · Grupo Work Show", text: "REST APIs for the Skuta streaming platform, Workcard and landing pages." },
      { meta: "Sep 2015 — Aug 2016", title: "Developer · Gopag", text: "Card-machine transaction platform." }
    ],
    "projects.title": "Projects",
    "projects.items": [
      { meta: "Jun 2026 — present", title: "Obra no Bolso AI", text: "Full-stack system for construction project finances in .NET 9, Blazor WebAssembly, EF Core and PostgreSQL. It has Google + JWT login, per-user data isolation (multi-tenant) and an AI assistant on Telegram built with the Claude API, with scope guardrails and a per-user usage quota." },
      { meta: "Infrastructure", title: "VPS infrastructure and automation", text: "Linux VPS with Docker and Traefik (automatic HTTPS), running n8n, a WhatsApp gateway (OpenWA) and PostgreSQL. The services integrate through webhooks to automate customer service, without storing personal data in the history." }
    ],
    "education.title": "Education",
    "education.items": [
      { meta: "2022", title: "Postgraduate degree in Software Architecture", text: "PUC-PR" },
      { meta: "2018", title: "Associate degree in Systems Analysis and Development", text: "UniGoiás" }
    ],
    "contact.title": "Contact",
    "contact.text": "Let's talk? Find me on the channels below."
  }
};
