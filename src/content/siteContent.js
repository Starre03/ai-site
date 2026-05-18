export const serviceMenuLinks = [
  {
    label: "AI Audit",
    to: "/ai-audit",
    description: "Workflow analyse, bottlenecks, AI kansen en een heldere roadmap.",
  },
  {
    label: "AI Implementatie",
    to: "/ai-integraties",
    description: "Claude, ChatGPT en OpenAI praktisch ingericht voor support, documenten en kenniswerk.",
  },
  {
    label: "AI Automatisering",
    to: "/ai-automatisering",
    description: "AI-agenten, koppelingen en maatwerkcode voor processen die zelfstandig doorlopen.",
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
      "Claude, ChatGPT en OpenAI goed ingericht voor support, kenniswerk, documentanalyse en bestaande bedrijfsprocessen.",
    points: [
      "AI kennisassistenten op eigen data",
      "Document AI en samenvattingen",
      "AI support automation en workflows",
      "Direct bruikbaar in bestaande processen",
    ],
  },
  {
    slug: "/ai-automatisering",
    eyebrow: "Dienst 03",
    title: "AI Automatisering",
    summary:
      "AI automatisering voor terugkerende processen. Van losse AI-agent tot volledige workflow met koppelingen en maatwerkcode.",
    points: [
      "AI-agenten voor losse processtappen",
      "Volledige workflows met maatwerkcode",
      "CRM, inbox, documenten en dashboards koppelen",
      "Human-in-the-loop waar controle nodig blijft",
    ],
  },
];

export const homeFaq = [
  {
    q: "Wat is een AI audit voor bedrijven precies?",
    a: "Een AI audit brengt in kaart waar AI in uw bedrijf het meeste oplevert. StarLeo kijkt naar workflows, bottlenecks, AI kansen, tooladvies en een logische implementatie roadmap. De audit is een zelfstandige dienst en hoeft niet gevolgd te worden door implementatie.",
  },
  {
    q: "Wanneer kiest u voor AI implementatie en wanneer voor AI automatisering?",
    a: "AI implementatie is geschikt wanneer Claude, ChatGPT of bestaande AI-tools goed moeten worden ingericht in uw werk. AI automatisering past wanneer een proces zelfstandig moet doorlopen met AI-agenten, koppelingen en waar nodig maatwerkcode.",
  },
  {
    q: "Wat valt onder AI automatisering?",
    a: "Dat kan een losse AI-agent zijn die een taak uitvoert, maar ook een volledig geautomatiseerd proces met formulieren, CRM, inbox, documenten, dashboards en maatwerkcode. We kiezen de vorm die past bij het proces.",
  },
  {
    q: "Kunnen we ook direct starten met AI implementatie of automatisering?",
    a: "Ja. U hoeft niet altijd via een vaste funnel te gaan. Sommige bedrijven starten met een AI audit, anderen kiezen direct voor Claude, ChatGPT of een concrete automatisering van een proces.",
  },
  {
    q: "Is AI implementatie ook geschikt voor MKB en groeiende teams?",
    a: "Ja. Juist MKB-bedrijven profiteren vaak snel van AI implementatie omdat support, documentwerk, intake en interne kennisprocessen relatief veel handmatig werk bevatten.",
  },
  {
    q: "Hoe snel kan AI support automation, document AI of automatisering live zijn?",
    a: "Een AI audit kan snel gepland worden. Een gerichte AI implementatie of eerste automatisering is vaak binnen enkele weken operationeel, afhankelijk van koppelingen, data en interne afstemming.",
  },
  {
    q: "Wat kost een AI Audit?",
    a: "De AI Audit is een vaste opdracht met een helder tarief. Neem contact op voor de actuele prijs — we stemmen de scope altijd af op de grootte en complexiteit van uw bedrijf.",
  },
  {
    q: "Hoe snel kunnen we starten?",
    a: "Na een eerste gesprek kunnen we binnen één à twee weken starten. De AI Audit duurt gemiddeld twee tot drie weken. Een eerste AI automatisering of losse AI-agent is doorgaans binnen enkele weken live.",
  },
  {
    q: "Werkt dit ook voor kleinere bedrijven?",
    a: "Ja. De meeste klanten zijn mkb-bedrijven met 5 tot 50 medewerkers. Juist bij die bedrijven levert AI snel aantoonbaar resultaat omdat processen nog niet overgeautomatiseerd zijn.",
  },
  {
    q: "Wat heb ik nodig om te starten?",
    a: "Alleen een goed gesprek. We beginnen altijd met begrijpen hoe uw bedrijf nu werkt, waar de druk zit en wat u wilt bereiken. Van daaruit bepalen we samen de beste route.",
  },
];

export const demoTabs = [
  {
    label: "AI Audit",
    title: "AI audit voor bedrijven die eerst helder willen krijgen waar AI rendeert",
    prompt: "Analyseer ons klantproces van intake tot opvolging en laat zien welke AI implementatie nu het meeste oplevert.",
    answer:
      "Workflowscan afgerond. Grootste winst zit in intake, documentverwerking en support triage. Advies: start met een AI audit voor prioritering, daarna AI implementatie voor documentanalyse. Verwachte besparing: 11-16 uur per week.",
  },
  {
    label: "AI Implementatie",
    title: "Claude en ChatGPT implementatie voor support, document AI en kenniswerk",
    prompt: "Vat deze klantmail samen, haal actiepunten eruit en controleer relevante documentatie voordat u een supportantwoord voorbereidt.",
    answer:
      "Documenten geraadpleegd. Antwoordconcept klaar met correcte voorwaarden, samenvatting voor het team toegevoegd en ticket automatisch gelabeld als 'contractvraag - prioriteit hoog'. De AI implementatie heeft context opgehaald uit de kennisbank en documentatie.",
  },
  {
    label: "AI Automatisering",
    title: "AI automatisering die processen zelfstandig laat doorlopen",
    prompt: "Nieuwe lead via inbox: beoordeel fit, start intake automation, verzamel context uit CRM en bereid opvolging voor.",
    answer:
      "Lead verrijkt met CRM-data. Intakevragen verstuurd, urgentie ingeschat als hoog, conceptantwoord voorbereid en follow-up taak klaargezet voor sales. De automatisering combineert AI-agenten, koppelingen en vaste procesregels.",
  },
];

export const intakeSteps = [
  {
    title: "Bedrijf",
    description: "Eerst de basis. Zo kunnen we inschatten voor wat voor type bedrijf en team we AI implementatie beoordelen.",
    fields: [
      { id: "name", label: "Naam", type: "text", placeholder: "Uw volledige naam", required: true },
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
        options: ["AI Audit", "AI Implementatie", "AI Automatisering", "Weet ik nog niet"],
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
    description: "Laatste stap. Hiermee zorgen we dat we snel en persoonlijk kunnen opvolgen met de juiste AI audit, implementatie of automatisering.",
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
          "AI Automatisering",
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

export const contactSteps = [
  {
    title: "Contact",
    description: "",
    fields: [
      { id: "name", label: "Naam", type: "text", placeholder: "Uw naam", required: true },
      { id: "company", label: "Bedrijf", type: "text", placeholder: "Naam van uw bedrijf", required: true },
      { id: "email", label: "E-mail", type: "email", placeholder: "naam@bedrijf.nl", required: true },
      { id: "phone", label: "Telefoon (optioneel)", type: "text", placeholder: "+31 6 ..." },
      {
        id: "message",
        label: "Waar kunnen wij u mee helpen?",
        type: "textarea",
        required: true,
        placeholder: "Licht kort toe waar u hulp bij zoekt of waar u vragen over heeft.",
      },
    ],
  },
];
