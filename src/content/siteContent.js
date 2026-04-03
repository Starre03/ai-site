export const serviceMenuLinks = [
  {
    label: "AI Audit",
    to: "/ai-audit",
    description: "Workflow analyse, bottlenecks, AI kansen en een heldere roadmap.",
  },
  {
    label: "AI Implementatie",
    to: "/ai-integraties",
    description: "Claude, ChatGPT en OpenAI integraties voor support, documenten en kenniswerk.",
  },
  {
    label: "OpenClaw Agents",
    to: "/ai-agents",
    description: "Agent systems voor inbox, intake, opvolging en routing die echt werk uitvoeren.",
  },
  {
    label: "AI Workshop",
    to: "/ai-workshop",
    description: "Praktische sessie over hoe AI werkt, hoe je beter prompt en waar het direct bruikbaar is.",
  },
];

export const solutionMenuLinks = [
  {
    label: "Support automation",
    to: "/ai-integraties",
    description: "Snellere supportflows, antwoordconcepten en betere categorisering.",
  },
  {
    label: "Document AI",
    to: "/ai-integraties",
    description: "Documentanalyse, samenvattingen, controles en actiepunten uit dossiers of contracten.",
  },
  {
    label: "Inbox & intake",
    to: "/ai-agents",
    description: "OpenClaw flows voor mail begrijpen, intake starten en opvolging klaarzetten.",
  },
  {
    label: "AI roadmap",
    to: "/ai-audit",
    description: "Bepaal eerst waar AI het meeste oplevert voordat je gaat bouwen.",
  },
];

export const serviceCards = [
  {
    slug: "/ai-audit",
    eyebrow: "Dienst 01",
    title: "AI Audit",
    summary:
      "AI audit voor bedrijven die eerst duidelijkheid willen over AI implementatie, workflow bottlenecks, toolkeuze en een haalbare roadmap.",
    points: [
      "Workflow analyse en bottleneck analyse",
      "AI kansen per team of proces",
      "Tooladvies en prioriteiten",
      "Los af te nemen, zonder bouwverplichting",
    ],
  },
  {
    slug: "/ai-integraties",
    eyebrow: "Dienst 02",
    title: "AI Implementatie",
    summary:
      "Claude integratie, ChatGPT integratie en OpenAI integratie voor support, kenniswerk, documentanalyse en bestaande bedrijfsprocessen.",
    points: [
      "AI kennisassistenten op eigen data",
      "Document AI en samenvattingen",
      "AI support automation en workflows",
      "Direct bruikbaar in bestaande processen",
    ],
  },
  {
    slug: "/ai-agents",
    eyebrow: "Dienst 03",
    title: "OpenClaw Agents",
    summary:
      "OpenClaw setup en AI agents voor inbox automation, lead qualification, intake automation en support routing die echt werk uitvoeren.",
    points: [
      "Inbox-, intake- en lead agents",
      "Multi-agent samenwerking",
      "CRM, inbox en routing koppelingen",
      "Acties klaarzetten of uitvoeren",
    ],
  },
  {
    slug: "/ai-workshop",
    eyebrow: "Dienst 04",
    title: "AI Workshop",
    summary:
      "Praktische AI workshop voor teams die willen begrijpen hoe AI werkt, hoe je er goed mee werkt en waar het direct bruikbaar is in dagelijkse processen.",
    points: [
      "Uitleg over AI, prompting en modelgedrag",
      "Tips en tricks voor dagelijks gebruik",
      "Use-cases per team of rol",
      "Sterk voor adoptie en AI-geletterdheid",
    ],
  },
];

export const homeFaq = [
  {
    q: "Wat is een AI audit voor bedrijven precies?",
    a: "Een AI audit brengt in kaart waar AI in jouw bedrijf het meeste oplevert. StarLeo kijkt naar workflows, bottlenecks, AI kansen, tooladvies en een logische implementatie roadmap. De audit is een zelfstandige dienst en hoeft niet gevolgd te worden door implementatie.",
  },
  {
    q: "Wanneer kies je voor AI integraties en wanneer voor AI agents?",
    a: "AI integraties zijn geschikt voor Claude of ChatGPT in support, kenniswerk, documentanalyse en interne workflows. AI agents zijn geschikt wanneer werk moet worden doorgezet, gerouteerd, opgevolgd of deels uitgevoerd via OpenClaw.",
  },
  {
    q: "Wat doet een OpenClaw setup concreet?",
    a: "Een OpenClaw setup laat meerdere AI agents samenwerken met inbox, CRM en workflowtools. Denk aan mail begrijpen, intake starten, leads analyseren, support routeren en opvolging klaarzetten of uitvoeren.",
  },
  {
    q: "Kunnen we ook direct starten met AI integraties of AI agents?",
    a: "Ja. Je hoeft niet altijd via een vaste funnel te gaan. Sommige bedrijven starten met een AI audit, anderen kiezen direct voor een Claude integratie, ChatGPT integratie of OpenClaw AI agents.",
  },
  {
    q: "Is AI implementatie ook geschikt voor MKB en groeiende teams?",
    a: "Ja. Juist MKB-bedrijven profiteren vaak snel van AI implementatie omdat support, documentwerk, intake en interne kennisprocessen relatief veel handmatig werk bevatten.",
  },
  {
    q: "Hoe snel kan AI support automation, document AI of een agentflow live zijn?",
    a: "Een AI audit kan snel gepland worden. Een gerichte AI integratie of eerste OpenClaw agentflow is vaak binnen enkele weken operationeel, afhankelijk van koppelingen, data en interne afstemming.",
  },
];

export const demoTabs = [
  {
    label: "AI Audit",
    title: "AI audit voor bedrijven die eerst helder willen krijgen waar AI rendeert",
    prompt: "Analyseer ons klantproces van intake tot opvolging en laat zien welke AI implementatie nu het meeste oplevert.",
    answer:
      "Workflowscan afgerond. Grootste winst zit in intake, documentverwerking en support triage. Advies: start met een AI audit voor prioritering, daarna een AI integratie voor documentanalyse. Verwachte besparing: 11-16 uur per week.",
  },
  {
    label: "AI Integraties",
    title: "Claude en ChatGPT integraties voor support, document AI en kenniswerk",
    prompt: "Vat deze klantmail samen, haal actiepunten eruit en controleer relevante documentatie voordat je een supportantwoord voorbereidt.",
    answer:
      "Documenten geraadpleegd. Antwoordconcept klaar met correcte voorwaarden, samenvatting voor het team toegevoegd en ticket automatisch gelabeld als 'contractvraag - prioriteit hoog'. De AI integratie heeft context opgehaald uit de kennisbank en documentatie.",
  },
  {
    label: "AI Agents",
    title: "OpenClaw AI agents die inbox, leads en support slimmer afhandelen",
    prompt: "Nieuwe lead via inbox: beoordeel fit, start intake automation, verzamel context uit CRM en bereid opvolging voor.",
    answer:
      "Lead verrijkt met CRM-data. Intakevragen verstuurd, urgentie ingeschat als hoog, conceptantwoord voorbereid en follow-up taak klaargezet voor sales. Twee OpenClaw agents hebben intake en CRM-check parallel afgehandeld.",
  },
];

export const intakeSteps = [
  {
    title: "Bedrijf",
    description: "Eerst de basis. Zo kunnen we inschatten voor wat voor type bedrijf en team we AI implementatie beoordelen.",
    fields: [
      { id: "name", label: "Naam", type: "text", placeholder: "Je volledige naam", required: true },
      { id: "company", label: "Bedrijf", type: "text", placeholder: "Naam van het bedrijf", required: true },
      {
        id: "size",
        label: "Bedrijfsgrootte",
        type: "chips",
        options: ["1", "2-10", "11-50", "51-200", "200+"],
      },
    ],
  },
  {
    title: "Use-case",
    description: "Hier bepalen we waar AI het meeste waarde moet gaan leveren: support, documentprocessen, kenniswerk, intake of workflow automatisering.",
    fields: [
      {
        id: "aiGoals",
        label: "Use-case / waarvoor moet AI vooral ingezet worden?",
        type: "multi",
        options: [
          "Support",
          "Kenniswerk",
          "Documentanalyse",
          "Interne tools",
          "Inbox en intake",
          "Leadopvolging",
          "Workflow automatisering",
          "Nog in onderzoek",
        ],
      },
      {
        id: "primaryGoal",
        label: "Belangrijkste doel",
        type: "chips",
        options: [
          "Tijd terugwinnen",
          "AI implementatie kiezen",
          "Minder handmatig werk",
          "Snellere opvolging",
          "Betere documentverwerking",
        ],
      },
    ],
  },
  {
    title: "Systemen en planning",
    description: "Welke tools zijn er al en welke dienst lijkt nu het best te passen? Zo kunnen we het eerste gesprek direct inhoudelijk maken.",
    fields: [
      {
        id: "systems",
        label: "Huidige tools / systemen",
        type: "textarea",
        placeholder: "Bijvoorbeeld HubSpot, Gmail, Notion, Slack, AFAS, Zendesk, eigen tooling...",
      },
      {
        id: "route",
        label: "Welke dienst lijkt nu het best te passen?",
        type: "chips",
        options: ["AI Audit", "AI Implementatie", "OpenClaw Agents", "AI Workshop", "Weet ik nog niet"],
      },
      {
        id: "timeline",
        label: "Gewenst startmoment",
        type: "chips",
        options: ["Direct", "Binnen 1 maand", "Binnen 3 maanden", "Oriënterend"],
      },
    ],
  },
  {
    title: "Contact",
    description: "Laatste stap. Hiermee zorgen we dat we snel en persoonlijk kunnen opvolgen met de juiste AI audit, integratie of agent-aanpak.",
    fields: [
      { id: "email", label: "E-mail", type: "email", placeholder: "naam@bedrijf.nl", required: true },
      { id: "phone", label: "Telefoon (optioneel)", type: "text", placeholder: "+31 6 ...", optional: true },
      {
        id: "notes",
        label: "Extra context / huidige situatie",
        type: "textarea",
        placeholder: "Vertel kort wat er nu vastloopt, welke AI use-case prioriteit heeft of welke systemen belangrijk zijn.",
      },
    ],
  },
];

export const homeIntakeSteps = [
  {
    title: "Intake",
    description: "",
    fields: [
      { id: "name", label: "Naam", type: "text", placeholder: "Uw naam", required: true },
      { id: "company", label: "Bedrijf", type: "text", placeholder: "Naam van uw bedrijf", required: true },
      { id: "email", label: "E-mail", type: "email", placeholder: "naam@bedrijf.nl", required: true },
      { id: "phone", label: "Telefoon (optioneel)", type: "text", placeholder: "+31 6 ..." },
      {
        id: "interest",
        label: "Waar ligt uw interesse?",
        type: "multi",
        required: true,
        options: [
          "AI Audit",
          "AI Implementatie",
          "OpenClaw Agents",
          "AI Workshop",
          "Weet ik nog niet",
        ],
      },
      {
        id: "focus",
        label: "Welke mogelijkheden wilt u verkennen?",
        type: "multi",
        required: true,
        options: [
          "Support slimmer",
          "Documentwerk sneller",
          "Inbox & intake",
          "Leadopvolging",
          "Interne kennis",
          "AI verkennen",
        ],
      },
      {
        id: "notes",
        label: "Korte toelichting (optioneel)",
        type: "textarea",
        placeholder: "Licht kort toe waar uw interesse ligt of wat u graag wilt verkennen.",
      },
    ],
  },
];
