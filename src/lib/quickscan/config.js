export const QUICKSCAN_VERSION = "quickscan-v5-personal-branching";

export const STEP_IDS = [
  "intro",
  "v0-profiel",
  "v1-proces",
  "v2-knelpunt",
  "v3-uren",
  "v3-uurwaarde",
  "v4-tools",
  "v5-ai",
  "v5-ai-frictie",
  "v6-urgentie",
  "gate",
  "resultaat",
];

export const PROCESS_OPTIONS = [
  { value: "klantcontact", label: "Klantcontact en opvolging" },
  { value: "administratie", label: "Administratie en invoer" },
  { value: "content", label: "Content en marketing" },
  { value: "offertes", label: "Offertes en documenten" },
  { value: "planning", label: "Planning en interne afstemming" },
  { value: "data", label: "Data en rapportages" },
];

export const PROCESS_LABELS = Object.fromEntries(PROCESS_OPTIONS.map((option) => [option.value, option.label]));

export const PAIN_POINT_OPTIONS_BY_PROCESS = {
  klantcontact: [
    { value: "losse-vragen-berichten", label: "Ik beantwoord steeds dezelfde vragen" },
    { value: "leads-niet-opgevolgd", label: "Opvolging schiet er bij in" },
    { value: "leads-buiten-kantooruren", label: "Buiten kantooruren mis ik leads" },
    { value: "informatie-verspreid", label: "Informatie staat verspreid" },
    { value: "overdracht-kost-tijd", label: "Overdracht kost te veel tijd" },
  ],
  administratie: [
    { value: "gegevens-overzetten", label: "Ik voer te veel gegevens handmatig in" },
    { value: "invoer-controles", label: "Controle kost elke week veel tijd" },
    { value: "documenten-facturen", label: "Facturen en documenten blijven liggen" },
    { value: "overzichten-maken", label: "Overzichten maken duurt te lang" },
    { value: "fouten-herstellen", label: "Fouten herstellen kost te veel tijd" },
  ],
  content: [
    { value: "briefings-input", label: "Ik weet niet goed wat ik moet maken" },
    { value: "content-handwerk", label: "Het kost te veel tijd per stuk content" },
    { value: "feedback-afstemming", label: "Consistentie lukt niet" },
    { value: "publicatie-planning", label: "Publiceren en plannen kost te veel tijd" },
    { value: "campagnes-doorvertalen", label: "Campagnes doorvertalen kost te veel werk" },
  ],
  offertes: [
    { value: "offertes-opstellen", label: "Offertes maken duurt te lang" },
    { value: "documenten-aanpassen", label: "Documenten aanpassen blijft handwerk" },
    { value: "versies-feedback", label: "Feedback en versies lopen door elkaar" },
    { value: "dossiers-opbouwen", label: "Dossiers opbouwen kost veel tijd" },
    { value: "informatie-opnieuw-invullen", label: "Gegevens opnieuw invullen kost tijd" },
  ],
  planning: [
    { value: "planning-handwerk", label: "Plannen kost te veel heen-en-weer" },
    { value: "overdracht-onduidelijk", label: "Overdracht is niet duidelijk genoeg" },
    { value: "taken-versnipperd", label: "Taken en afspraken raken verspreid" },
    { value: "losse-berichten", label: "Veel afstemming loopt via losse berichten" },
    { value: "opvolging-niet-strak", label: "Opvolging schiet er bij in" },
  ],
  data: [
    { value: "data-verzamelen", label: "Data verzamelen kost te veel tijd" },
    { value: "rapportages-langzaam", label: "Rapportages maken duurt te lang" },
    { value: "te-veel-bronnen", label: "Informatie staat in te veel systemen" },
    { value: "controle-opschoning", label: "Controleren en opschonen kost veel werk" },
    { value: "inzicht-te-laat", label: "Inzicht komt te laat beschikbaar" },
  ],
};

export const TOOL_OPTIONS_BY_PROCESS = {
  content: [
    { value: "social-media", label: "Social media" },
    { value: "meta-google-ads", label: "Meta Ads / Google Ads" },
    { value: "canva-design", label: "Canva / design tools" },
    { value: "emailmarketing", label: "E-mailmarketing" },
    { value: "contentplanning-notion", label: "Contentplanning / Notion" },
    { value: "google-docs-drive", label: "Google Docs / Drive" },
    { value: "anders-geen", label: "Anders / geen vaste tools" },
  ],
  klantcontact: [
    { value: "email", label: "E-mail" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "crm", label: "CRM" },
    { value: "agenda-planning", label: "Agenda / planning" },
    { value: "supporttool", label: "Supporttool" },
    { value: "anders-geen", label: "Anders / geen vaste tools" },
  ],
  administratie: [
    { value: "excel-sheets", label: "Excel / Sheets" },
    { value: "boekhouding", label: "Boekhouding" },
    { value: "erp-administratiepakket", label: "ERP / administratiepakket" },
    { value: "email", label: "E-mail" },
    { value: "documentopslag", label: "Documentopslag" },
    { value: "microsoft-365", label: "Microsoft 365" },
    { value: "anders-geen", label: "Anders / geen vaste tools" },
  ],
  offertes: [
    { value: "microsoft-365-word-excel", label: "Microsoft 365 / Word / Excel" },
    { value: "google-docs-drive", label: "Google Docs / Drive" },
    { value: "pdf-documenttools", label: "PDF / documenttools" },
    { value: "esigning-akkoordtools", label: "E-signing / akkoordtools" },
    { value: "crm", label: "CRM" },
    { value: "documentopslag", label: "Documentopslag" },
    { value: "anders-geen", label: "Anders / geen vaste tools" },
  ],
  planning: [
    { value: "agenda-planning", label: "Agenda / planning" },
    { value: "projectmanagement", label: "Projectmanagement" },
    { value: "email", label: "E-mail" },
    { value: "whatsapp-chat", label: "WhatsApp / chat" },
    { value: "microsoft-google-docs", label: "Microsoft 365 / Google Docs" },
    { value: "anders-geen", label: "Anders / geen vaste tools" },
  ],
  data: [
    { value: "excel-sheets", label: "Excel / Sheets" },
    { value: "dashboards-bi", label: "Dashboards / BI" },
    { value: "crm", label: "CRM" },
    { value: "erp-administratiepakket", label: "ERP / administratiepakket" },
    { value: "microsoft-google-docs", label: "Microsoft 365 / Google Docs" },
    { value: "anders-geen", label: "Anders / geen vaste tools" },
  ],
};

const AI_USAGE_TITLE_BY_PAIN_POINT = {
  "losse-vragen-berichten": "Gebruik je al AI bij het beantwoorden van terugkerende vragen?",
  "leads-niet-opgevolgd": "Gebruik je al AI bij lead- en klantopvolging?",
  "leads-buiten-kantooruren": "Gebruik je al AI bij het opvangen van leads buiten kantooruren?",
  "informatie-verspreid": "Gebruik je al AI bij het bundelen van klantinformatie?",
  "overdracht-kost-tijd": "Gebruik je al AI bij overdracht en opvolging?",
  "gegevens-overzetten": "Gebruik je al AI bij invoer en verwerking van gegevens?",
  "invoer-controles": "Gebruik je al AI bij controles en checks?",
  "documenten-facturen": "Gebruik je al AI bij facturen en documentverwerking?",
  "overzichten-maken": "Gebruik je al AI bij het maken van overzichten?",
  "fouten-herstellen": "Gebruik je al AI bij foutcontrole en correcties?",
  "briefings-input": "Gebruik je al AI bij het bedenken van content?",
  "content-handwerk": "Gebruik je al AI bij het maken van content?",
  "feedback-afstemming": "Gebruik je al AI om content consistenter te maken?",
  "publicatie-planning": "Gebruik je al AI bij publicatie en planning?",
  "campagnes-doorvertalen": "Gebruik je al AI bij het doorvertalen van campagnes?",
  "offertes-opstellen": "Gebruik je al AI bij het opstellen van offertes?",
  "documenten-aanpassen": "Gebruik je al AI bij het aanpassen van documenten?",
  "versies-feedback": "Gebruik je al AI bij versiebeheer en feedbackverwerking?",
  "dossiers-opbouwen": "Gebruik je al AI bij het opbouwen van dossiers?",
  "informatie-opnieuw-invullen": "Gebruik je al AI bij het hergebruiken van gegevens in documenten?",
  "planning-handwerk": "Gebruik je al AI bij planning en afstemming?",
  "overdracht-onduidelijk": "Gebruik je al AI bij overdracht tussen mensen?",
  "taken-versnipperd": "Gebruik je al AI bij het bundelen van taken en afspraken?",
  "losse-berichten": "Gebruik je al AI bij interne afstemming via berichten?",
  "opvolging-niet-strak": "Gebruik je al AI bij interne opvolging?",
  "data-verzamelen": "Gebruik je al AI bij het verzamelen van data?",
  "rapportages-langzaam": "Gebruik je al AI bij het maken van rapportages?",
  "te-veel-bronnen": "Gebruik je al AI bij het combineren van informatie uit meerdere systemen?",
  "controle-opschoning": "Gebruik je al AI bij controle en opschoning van data?",
  "inzicht-te-laat": "Gebruik je al AI om sneller inzicht uit data te halen?",
};

const HOURLY_VALUE_TITLE_BY_PAIN_POINT = {
  "losse-vragen-berichten": "Wat is een uur klantvragen beantwoorden ongeveer waard?",
  "leads-niet-opgevolgd": "Wat is een uur lead- en klantopvolging ongeveer waard?",
  "leads-buiten-kantooruren": "Wat is een uur leadopvolging buiten kantooruren ongeveer waard?",
  "informatie-verspreid": "Wat is een uur klantinformatie uitzoeken ongeveer waard?",
  "overdracht-kost-tijd": "Wat kost een uur overdracht en opvolging ongeveer?",
  "gegevens-overzetten": "Wat kost een uur invoer en verwerking ongeveer?",
  "invoer-controles": "Wat kost een uur controles en administratie ongeveer?",
  "documenten-facturen": "Wat kost een uur document- en factuurverwerking ongeveer?",
  "overzichten-maken": "Wat kost een uur overzichten maken ongeveer?",
  "fouten-herstellen": "Wat kost een uur fouten controleren en herstellen ongeveer?",
  "briefings-input": "Wat is een uur contentvoorbereiding ongeveer waard?",
  "content-handwerk": "Wat is een uur content maken ongeveer waard?",
  "feedback-afstemming": "Wat is een uur content consistent uitwerken ongeveer waard?",
  "publicatie-planning": "Wat is een uur publiceren en plannen ongeveer waard?",
  "campagnes-doorvertalen": "Wat is een uur campagne-uitvoer ongeveer waard?",
  "offertes-opstellen": "Wat is een uur offertewerk ongeveer waard?",
  "documenten-aanpassen": "Wat is een uur documentwerk ongeveer waard?",
  "versies-feedback": "Wat is een uur feedback en versiebeheer ongeveer waard?",
  "dossiers-opbouwen": "Wat is een uur dossieropbouw ongeveer waard?",
  "informatie-opnieuw-invullen": "Wat kost een uur gegevens opnieuw invullen ongeveer?",
  "planning-handwerk": "Wat kost een uur plannen en afstemmen ongeveer?",
  "overdracht-onduidelijk": "Wat kost een uur overdracht en afstemming ongeveer?",
  "taken-versnipperd": "Wat kost een uur taken en afspraken organiseren ongeveer?",
  "losse-berichten": "Wat kost een uur interne afstemming ongeveer?",
  "opvolging-niet-strak": "Wat kost een uur interne opvolging ongeveer?",
  "data-verzamelen": "Wat is een uur data verzamelen ongeveer waard?",
  "rapportages-langzaam": "Wat is een uur rapportagewerk ongeveer waard?",
  "te-veel-bronnen": "Wat is een uur informatie bundelen ongeveer waard?",
  "controle-opschoning": "Wat is een uur data opschonen ongeveer waard?",
  "inzicht-te-laat": "Wat is een uur analyse en rapportage ongeveer waard?",
};

const HOURLY_VALUE_TITLE_BY_PROCESS = {
  klantcontact: "Wat is een uur klantcontact en opvolging ongeveer waard?",
  administratie: "Wat kost een uur administratie en invoer ongeveer?",
  content: "Wat is een uur content en marketing ongeveer waard?",
  offertes: "Wat is een uur offerte- en documentwerk ongeveer waard?",
  planning: "Wat kost een uur planning en interne afstemming ongeveer?",
  data: "Wat is een uur data en rapportages ongeveer waard?",
};

export const HOURLY_VALUE_OPTIONS = [
  { value: "25-50", label: "€25-€50" },
  { value: "50-75", label: "€50-€75" },
  { value: "75-100", label: "€75-€100" },
  { value: "100+", label: "€100+" },
];

const AI_FOLLOWUP_TITLE_BY_PAIN_POINT = {
  "losse-vragen-berichten": "Wat werkt nog niet goed aan hoe je AI terugkerende vragen laat ondersteunen?",
  "leads-niet-opgevolgd": "Wat werkt nog niet goed aan hoe je AI voor opvolging inzet?",
  "leads-buiten-kantooruren": "Wat werkt nog niet goed aan hoe je AI buiten kantooruren inzet?",
  "informatie-verspreid": "Wat werkt nog niet goed aan hoe je AI informatie laat bundelen?",
  "overdracht-kost-tijd": "Wat werkt nog niet goed aan hoe je AI bij overdracht inzet?",
  "gegevens-overzetten": "Wat werkt nog niet goed aan hoe je AI bij invoer inzet?",
  "invoer-controles": "Wat werkt nog niet goed aan hoe je AI voor controles inzet?",
  "documenten-facturen": "Wat werkt nog niet goed aan hoe je AI voor documenten en facturen inzet?",
  "overzichten-maken": "Wat werkt nog niet goed aan hoe je AI voor overzichten inzet?",
  "fouten-herstellen": "Wat werkt nog niet goed aan hoe je AI voor foutcontrole inzet?",
  "briefings-input": "Wat werkt nog niet goed aan hoe je AI voor contentideeën inzet?",
  "content-handwerk": "Wat werkt nog niet goed aan hoe je AI bij content maken inzet?",
  "feedback-afstemming": "Wat werkt nog niet goed aan hoe je AI voor contentafstemming inzet?",
  "publicatie-planning": "Wat werkt nog niet goed aan hoe je AI bij publicatie en planning inzet?",
  "campagnes-doorvertalen": "Wat werkt nog niet goed aan hoe je AI voor campagnes inzet?",
  "offertes-opstellen": "Wat werkt nog niet goed aan hoe je AI voor offertes inzet?",
  "documenten-aanpassen": "Wat werkt nog niet goed aan hoe je AI voor documenten inzet?",
  "versies-feedback": "Wat werkt nog niet goed aan hoe je AI voor versiebeheer inzet?",
  "dossiers-opbouwen": "Wat werkt nog niet goed aan hoe je AI voor dossiers inzet?",
  "informatie-opnieuw-invullen": "Wat werkt nog niet goed aan hoe je AI gegevens laat hergebruiken?",
  "planning-handwerk": "Wat werkt nog niet goed aan hoe je AI voor planning inzet?",
  "overdracht-onduidelijk": "Wat werkt nog niet goed aan hoe je AI voor overdracht inzet?",
  "taken-versnipperd": "Wat werkt nog niet goed aan hoe je AI taken en afspraken laat bundelen?",
  "losse-berichten": "Wat werkt nog niet goed aan hoe je AI bij interne berichten inzet?",
  "opvolging-niet-strak": "Wat werkt nog niet goed aan hoe je AI voor interne opvolging inzet?",
  "data-verzamelen": "Wat werkt nog niet goed aan hoe je AI voor dataverzameling inzet?",
  "rapportages-langzaam": "Wat werkt nog niet goed aan hoe je AI voor rapportages inzet?",
  "te-veel-bronnen": "Wat werkt nog niet goed aan hoe je AI informatie uit systemen combineert?",
  "controle-opschoning": "Wat werkt nog niet goed aan hoe je AI voor data-opschoning inzet?",
  "inzicht-te-laat": "Wat werkt nog niet goed aan hoe je AI sneller inzicht laat geven?",
};

export const QUESTIONS = [
  {
    id: "profile",
    stepId: "v0-profiel",
    kind: "profile",
    title: "Eerst even je gegevens.",
  },
  {
    id: "processType",
    stepId: "v1-proces",
    kind: "single",
    title: "Welk proces zou je als eerste willen verbeteren?",
    options: PROCESS_OPTIONS,
  },
  {
    id: "painPoint",
    stepId: "v2-knelpunt",
    kind: "single",
    title: "Waar loopt dit nu het meest vast?",
    options: [],
  },
  {
    id: "weeklyHours",
    stepId: "v3-uren",
    kind: "single",
    title: "Hoeveel tijd gaat hier per week naartoe?",
    options: [
      { value: "<2", label: "Minder dan 2 uur" },
      { value: "2-5", label: "2-5 uur" },
      { value: "5-10", label: "5-10 uur" },
      { value: "10-20", label: "10-20 uur" },
      { value: "20-50", label: "20-50 uur" },
      { value: "50+", label: "50 uur of meer" },
    ],
  },
  {
    id: "hourlyValue",
    stepId: "v3-uurwaarde",
    kind: "hourly-value",
    title: "Wat is ongeveer een uur in jouw bedrijf waard?",
    description: "Schatting is prima. Dit gebruiken we alleen voor een realistischer indicatie.",
    options: HOURLY_VALUE_OPTIONS,
  },
  {
    id: "tools",
    stepId: "v4-tools",
    kind: "multi",
    title: "Welke tools of kanalen gebruik je nu voor dit werk?",
    options: [],
  },
  {
    id: "aiUsage",
    stepId: "v5-ai",
    kind: "single",
    title: "Gebruik je hier al AI voor?",
    options: [
      { value: "nog-niet", label: "Nog niet" },
      { value: "af-en-toe", label: "Af en toe" },
      { value: "regelmatig", label: "Regelmatig" },
      { value: "vast-onderdeel", label: "Vast onderdeel van dit werk" },
    ],
  },
  {
    id: "aiIssue",
    stepId: "v5-ai-frictie",
    kind: "single",
    title: "Wat werkt nog niet goed aan hoe je AI nu inzet?",
    options: [
      { value: "kwaliteit-wisselvallig", label: "Kwaliteit is wisselvallig" },
      { value: "handwerk-eromheen", label: "Te veel handmatig werk er omheen" },
      { value: "team-gebruikt-niet", label: "Mijn team gebruikt het niet" },
      { value: "verder-automatiseren", label: "Ik wil verder automatiseren" },
    ],
  },
  {
    id: "urgency",
    stepId: "v6-urgentie",
    kind: "single",
    title: "Hoe belangrijk is het om dit binnenkort te verbeteren?",
    options: [
      { value: "laag", label: "Nu nog niet zo belangrijk" },
      { value: "interessant", label: "Wel belangrijk, maar geen haast" },
      { value: "verbeteren", label: "Dit wil ik binnenkort verbeteren" },
      { value: "snel-beter", label: "Dit wil ik zo snel mogelijk verbeteren" },
    ],
  },
];

export const getPainPointOptions = (processType) =>
  (Array.isArray(processType) ? processType : [processType])
    .filter(Boolean)
    .flatMap((type) => PAIN_POINT_OPTIONS_BY_PROCESS[type] || [])
    .filter((option, index, options) => options.findIndex((item) => item.value === option.value) === index);

export const getToolOptions = (processType) =>
  (Array.isArray(processType) ? processType : [processType])
    .filter(Boolean)
    .flatMap((type) => TOOL_OPTIONS_BY_PROCESS[type] || [])
    .filter((option, index, options) => options.findIndex((item) => item.value === option.value) === index);

export const getPainPointQuestionTitle = (processType) => {
  const selectedTypes = Array.isArray(processType) ? processType.filter(Boolean) : [processType].filter(Boolean);
  const label = PROCESS_LABELS[selectedTypes[0]]?.toLowerCase();
  return label ? `Waar zit de meeste frictie in ${label}?` : "Waar zit de meeste frictie in dit proces?";
};

export const getAiUsageQuestionTitle = (painPoint) =>
  AI_USAGE_TITLE_BY_PAIN_POINT[painPoint] || "Gebruik je hier al AI voor?";

export const getAiFollowupQuestionTitle = (painPoint) =>
  AI_FOLLOWUP_TITLE_BY_PAIN_POINT[painPoint] || "Wat werkt nog niet goed aan hoe je AI nu inzet?";

export const getHourlyValueQuestionTitle = (painPoint, processType) =>
  HOURLY_VALUE_TITLE_BY_PAIN_POINT[painPoint] ||
  HOURLY_VALUE_TITLE_BY_PROCESS[processType] ||
  "Wat is een uur van dit werk ongeveer waard?";

export const PAIN_POINT_LABELS = Object.fromEntries(
  Object.values(PAIN_POINT_OPTIONS_BY_PROCESS)
    .flat()
    .map((option) => [option.value, option.label]),
);

export const TOOL_LABELS = {
  email: "E-mail",
  whatsapp: "WhatsApp",
  "whatsapp-chat": "WhatsApp / chat",
  "excel-sheets": "Excel / Sheets",
  crm: "CRM",
  boekhouding: "Boekhouding",
  projectmanagement: "Projectmanagement",
  "social-media": "Social media",
  "meta-google-ads": "Meta Ads / Google Ads",
  "canva-design": "Canva / design tools",
  emailmarketing: "E-mailmarketing",
  "contentplanning-notion": "Contentplanning / Notion",
  "google-docs-drive": "Google Docs / Drive",
  "google-docs-word": "Google Docs / Word",
  "microsoft-365": "Microsoft 365",
  "microsoft-365-word-excel": "Microsoft 365 / Word / Excel",
  "microsoft-google-docs": "Microsoft 365 / Google Docs",
  "agenda-planning": "Agenda / planning",
  supporttool: "Supporttool",
  "erp-administratiepakket": "ERP / administratiepakket",
  documentopslag: "Documentopslag",
  "pdf-documenttools": "PDF / documenttools",
  "esigning-akkoordtools": "E-signing / akkoordtools",
  "dashboards-bi": "Dashboards / BI",
  "anders-geen": "Anders / geen vaste tools",
};

export const AI_USAGE_LABELS = {
  "nog-niet": "Nog niet",
  "af-en-toe": "Af en toe",
  regelmatig: "Regelmatig",
  "vast-onderdeel": "Vast onderdeel van dit werk",
};

export const AI_FOLLOWUP_OPTIONS = [
  { value: "kwaliteit-wisselvallig", label: "Kwaliteit is wisselvallig" },
  { value: "handwerk-eromheen", label: "Te veel handmatig werk er omheen" },
  { value: "team-gebruikt-niet", label: "Mijn team gebruikt het niet" },
  { value: "verder-automatiseren", label: "Ik wil verder automatiseren" },
];

export const AI_FOLLOWUP_LABELS = Object.fromEntries(AI_FOLLOWUP_OPTIONS.map((option) => [option.value, option.label]));

export const URGENCY_LABELS = {
  laag: "Nu nog niet zo belangrijk",
  interessant: "Wel belangrijk, maar geen haast",
  verbeteren: "Dit wil ik binnenkort verbeteren",
  "snel-beter": "Dit wil ik zo snel mogelijk verbeteren",
};

export const HOUR_MAP = {
  "<2": 1.5,
  "2-5": 3.5,
  "5-10": 7.5,
  "10-20": 15,
  "20-50": 35,
  "50+": 60,
};


export const HOURLY_VALUE_RANGE_MAP = {
  "25-50": { low: 25, high: 50, label: "€25-€50" },
  "50-75": { low: 50, high: 75, label: "€50-€75" },
  "75-100": { low: 75, high: 100, label: "€75-€100" },
  "100+": { low: 100, high: 125, label: "€100+" },
};

export const SAVINGS_SCENARIOS = {
  conservatief: { label: "Voorzichtig", low: 0.65, high: 0.8 },
  gemiddeld: { label: "Gemiddeld", low: 0.8, high: 1 },
  optimistisch: { label: "Ruimer", low: 1, high: 1.15 },
};

export const SERVICE_LABELS = {
  audit: "AI Audit",
  integrations: "AI Integraties",
  agents: "AI Agents / OpenClaw",
  optimization: "Gerichte optimalisatie",
  advice: "Strategisch advies",
};

export const OPT_IN_TEXT = "Ik geef toestemming om updates en relevante informatie per e-mail te ontvangen.";

export const LIMITATIONS_TEXT =
  "Deze schatting houdt geen rekening met implementatiekosten, leercurve of bedrijfsspecifieke uitzonderingen.";

export const DISCLAIMER_TEXT =
  "Indicatieve schatting — Dit bedrag is een grove indicatie gebaseerd op je opgegeven uren en een standaard uurtarief. Het werkelijke resultaat hangt af van je specifieke situatie en de gekozen oplossing. Aan deze berekening kunnen geen rechten worden ontleend.";
