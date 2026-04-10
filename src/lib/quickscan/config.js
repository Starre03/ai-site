export const QUICKSCAN_VERSION = "quickscan-v4-process-tools-flow-preview";

export const STEP_IDS = [
  "intro",
  "v1-proces",
  "v2-knelpunt",
  "v3-uren",
  "v4-tools",
  "v5-ai",
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
    { value: "losse-vragen-berichten", label: "Te veel losse vragen en berichten" },
    { value: "leads-niet-opgevolgd", label: "Leads worden niet goed opgevolgd" },
    { value: "informatie-verspreid", label: "Informatie staat verspreid" },
    { value: "handmatig-antwoorden", label: "Te veel handmatig antwoorden" },
    { value: "overdracht-kost-tijd", label: "Overdracht kost te veel tijd" },
  ],
  administratie: [
    { value: "invoer-controles", label: "Invoer en controles kosten te veel tijd" },
    { value: "gegevens-overzetten", label: "Gegevens moeten handmatig worden overgezet" },
    { value: "documenten-facturen", label: "Documenten en facturen kosten veel werk" },
    { value: "overzichten-maken", label: "Overzichten maken kost te veel tijd" },
    { value: "fouten-herstellen", label: "Fouten herstellen kost te veel tijd" },
  ],
  content: [
    { value: "briefings-input", label: "Briefings en input kosten te veel tijd" },
    { value: "content-handwerk", label: "Content maken kost te veel handwerk" },
    { value: "feedback-afstemming", label: "Feedback en afstemming vertragen alles" },
    { value: "publicatie-planning", label: "Publicatie en planning kosten te veel tijd" },
    { value: "campagnes-doorvertalen", label: "Campagnes doorvertalen kost te veel werk" },
  ],
  offertes: [
    { value: "offertes-opstellen", label: "Offertes opstellen kost te veel tijd" },
    { value: "documenten-aanpassen", label: "Documenten aanpassen blijft handwerk" },
    { value: "versies-feedback", label: "Versies en feedback vertragen het proces" },
    { value: "dossiers-opbouwen", label: "Dossiers opbouwen kost te veel tijd" },
    { value: "informatie-opnieuw-invullen", label: "Informatie moet steeds opnieuw worden ingevuld" },
  ],
  planning: [
    { value: "planning-handwerk", label: "Planning kost veel handmatig werk" },
    { value: "overdracht-onduidelijk", label: "Overdracht tussen mensen is onduidelijk" },
    { value: "taken-versnipperd", label: "Taken en afspraken raken versnipperd" },
    { value: "losse-berichten", label: "Veel afstemming gaat via losse berichten" },
    { value: "opvolging-niet-strak", label: "Opvolging loopt niet strak genoeg" },
  ],
  data: [
    { value: "data-verzamelen", label: "Data verzamelen kost te veel tijd" },
    { value: "rapportages-langzaam", label: "Rapportages maken duurt te lang" },
    { value: "te-veel-bronnen", label: "Informatie komt uit te veel bronnen" },
    { value: "controle-opschoning", label: "Controle en opschoning kost veel werk" },
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

export const QUESTIONS = [
  {
    id: "processType",
    stepId: "v1-proces",
    kind: "single",
    title: "Waar gaat binnen je bedrijf nu de meeste tijd naartoe?",
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
      { value: "20+", label: "20 uur of meer" },
    ],
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
    id: "urgency",
    stepId: "v6-urgentie",
    kind: "single",
    title: "Hoe belangrijk is het om dit binnenkort te verbeteren?",
    options: [
      { value: "laag", label: "Lage prioriteit" },
      { value: "interessant", label: "Interessant, maar geen haast" },
      { value: "verbeteren", label: "Ik wil dit verbeteren" },
      { value: "snel-beter", label: "Dit moet snel beter" },
    ],
  },
];

export const getPainPointOptions = (processType) =>
  PAIN_POINT_OPTIONS_BY_PROCESS[processType] || PAIN_POINT_OPTIONS_BY_PROCESS.klantcontact;

export const getToolOptions = (processType) =>
  TOOL_OPTIONS_BY_PROCESS[processType] || TOOL_OPTIONS_BY_PROCESS.klantcontact;

export const getPainPointQuestionTitle = (processType) => {
  const label = PROCESS_LABELS[processType]?.toLowerCase();
  return label ? `Waar loopt ${label} nu het meest vast?` : "Waar loopt dit nu het meest vast?";
};

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

export const URGENCY_LABELS = {
  laag: "Lage prioriteit",
  interessant: "Interessant, maar geen haast",
  verbeteren: "Ik wil dit verbeteren",
  "snel-beter": "Dit moet snel beter",
};

export const HOUR_MAP = {
  "<2": 1.5,
  "2-5": 3.5,
  "5-10": 7.5,
  "10-20": 15,
  "20+": 25,
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
