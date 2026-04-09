export const QUICKSCAN_VERSION = "quickscan-v2-preview";

export const STEP_IDS = [
  "intro",
  "v1-sector",
  "v2-team",
  "v3-werk",
  "v4-uren",
  "v5-tools",
  "v6-ai",
  "v7-pijnpunt",
  "gate",
  "resultaat",
];

export const QUESTIONS = [
  {
    id: "sector",
    stepId: "v1-sector",
    kind: "single",
    title: "In welke sector is je bedrijf actief?",
    options: [
      { value: "zakelijke-dienstverlening", label: "Zakelijke dienstverlening" },
      { value: "financieel-administratief", label: "Financieel en administratief" },
      { value: "bouw-en-techniek", label: "Bouw en techniek" },
      { value: "zorg-en-welzijn", label: "Zorg en welzijn" },
      { value: "retail-en-ecommerce", label: "Retail en e-commerce" },
      { value: "marketing-en-communicatie", label: "Marketing en communicatie" },
      { value: "logistiek-en-industrie", label: "Logistiek en industrie" },
      { value: "vastgoed", label: "Vastgoed" },
      { value: "overig", label: "Overig" },
    ],
  },
  {
    id: "teamSize",
    stepId: "v2-team",
    kind: "single",
    title: "Hoe groot is het team dat met dit werk te maken heeft?",
    description: "We gebruiken dit als indicatie voor schaal, overdracht en uitvoerdruk.",
    options: [
      { value: "zzp", label: "ZZP" },
      { value: "2-5", label: "2-5 mensen" },
      { value: "6-15", label: "6-15 mensen" },
      { value: "16-50", label: "16-50 mensen" },
      { value: "50+", label: "50+ mensen" },
    ],
  },
  {
    id: "workFocus",
    stepId: "v3-werk",
    kind: "single",
    title: "Met welk type werk is je team binnen dit proces het meest bezig?",
    description: "Kies het soort werk waar nu de meeste tijd en aandacht in gaat zitten.",
    options: [
      { value: "klantcontact-support", label: "Klantcontact en opvolging" },
      { value: "administratie-invoer", label: "Administratie en controles" },
      { value: "data-rapportage", label: "Rapportage en overzicht" },
      { value: "marketing-content-ads", label: "Content en marketing" },
      { value: "documenten-dossiers", label: "Documenten en dossiers" },
      { value: "intake-planning-opvolging", label: "Planning en intake" },
    ],
  },
  {
    id: "weeklyHours",
    stepId: "v4-uren",
    kind: "single",
    title: "Hoeveel uur per week gaat naar terugkerend, repetitief werk?",
    description: "Denk aan terugkerende handelingen zoals controleren, invoeren, beantwoorden, overtypen, samenvatten of doorzetten.",
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
    stepId: "v5-tools",
    kind: "multi",
    title: "Welke systemen spelen in dit werk nu echt een rol?",
    description: "Kies maximaal 6. Denk aan de tools waar informatie binnenkomt, wordt verwerkt of wordt doorgezet.",
    options: [
      { value: "crm", label: "CRM" },
      { value: "boekhouden", label: "Boekhouding" },
      { value: "email", label: "E-mail (Outlook/Gmail)" },
      { value: "planning", label: "Planning" },
      { value: "office", label: "Microsoft 365" },
      { value: "google-workspace", label: "Google Workspace" },
      { value: "projectmanagement", label: "Projecttool" },
      { value: "support", label: "Support" },
      { value: "erp", label: "ERP" },
      { value: "cms-webshop", label: "Website / webshop" },
      { value: "marketing", label: "Social media" },
      { value: "chat", label: "WhatsApp" },
      { value: "geen", label: "Geen van deze" },
    ],
  },
  {
    id: "aiUsage",
    stepId: "v6-ai",
    kind: "single",
    title: "Hoe wordt AI hier nu al gebruikt?",
    description: "Zo schatten we in hoeveel basis er al is voor een volgende stap.",
    options: [
      { value: "niet", label: "Nog niet in gebruik" },
      { value: "experimenteer", label: "Af en toe gebruikt voor losse taken" },
      { value: "regelmatig", label: "Regelmatig ingezet in enkele stappen" },
      { value: "structureel", label: "Vast onderdeel van een proces" },
    ],
  },
  {
    id: "painPoint",
    stepId: "v7-pijnpunt",
    kind: "single",
    title: "Waar zit op dit moment de meeste frictie?",
    description: "Kies de frictie die nu het meest merkbaar is in tempo, kwaliteit of opvolging.",
    options: [
      { value: "losse-emails", label: "Te veel losse e-mails" },
      { value: "handmatige-admin", label: "Te veel administratie" },
      { value: "data-rapportage", label: "Rapportages kosten tijd" },
      { value: "content-blijft-liggen", label: "Content blijft liggen" },
      { value: "leads-opvolging", label: "Leads worden niet opgevolgd" },
      { value: "campagnes-tijd", label: "Campagnes kosten tijd" },
      { value: "documenten-dossiers", label: "Documenten kosten tijd" },
      { value: "planning-vast", label: "Planning loopt vast" },
      { value: "meerdere-dingen", label: "Meerdere dingen tegelijk" },
    ],
  },
];

export const PREVIEW_ITEMS = [
  "Totaalscore met maturity label",
  "4 dimensies met korte duiding",
  "Indicatief besparingspotentieel met formule",
  "Concrete route richting audit, integraties of AI Agents / OpenClaw",
];

export const TEAM_SCORES = {
  zzp: { d1: 3, d4: 2 },
  "2-5": { d1: 5, d4: 4 },
  "6-15": { d1: 8, d4: 5 },
  "16-50": { d1: 6, d4: 4 },
  "50+": { d1: 4, d4: 3 },
};

export const TIME_SCORES = {
  "<2": 2,
  "2-5": 5,
  "5-10": 8,
  "10-20": 12,
  "20+": 15,
};

export const TOOL_OPTIONS = QUESTIONS.find((question) => question.id === "tools")?.options ?? [];

export const AI_SCORES = {
  niet: 2,
  experimenteer: 8,
  regelmatig: 15,
  structureel: 22,
};

export const WORK_FOCUS_SCORES = {
  "klantcontact-support": { d4: 6 },
  "administratie-invoer": { d4: 8 },
  "data-rapportage": { d4: 6 },
  "marketing-content-ads": { d4: 5 },
  "documenten-dossiers": { d4: 7 },
  "intake-planning-opvolging": { d4: 10 },
};

export const HOUR_MAP = {
  "<2": 1,
  "2-5": 3.5,
  "5-10": 7.5,
  "10-20": 15,
  "20+": 25,
};

export const SAVINGS_SCENARIOS = {
  conservatief: { label: "Conservatief 30%", percentage: 0.3, low: 0.3, high: 0.35 },
  gemiddeld: { label: "Gemiddeld 40%", percentage: 0.4, low: 0.4, high: 0.45 },
  optimistisch: { label: "Optimistisch 50%", percentage: 0.5, low: 0.5, high: 0.55 },
};

export const PAIN_POINT_LABELS = {
  "losse-emails": "Losse e-mails en inboxwerk",
  "handmatige-admin": "Administratie en handmatig werk",
  "data-rapportage": "Rapportages en data-overzicht",
  "content-blijft-liggen": "Content en marketinguitvoer",
  "leads-opvolging": "Leadopvolging",
  "campagnes-tijd": "Campagnes en marketinguitvoer",
  "documenten-dossiers": "Offertes, documenten en dossiers",
  "planning-vast": "Planning en afstemming",
  "meerdere-dingen": "Meerdere dingen tegelijk",
};

export const SERVICE_LABELS = {
  audit: "AI Audit",
  integrations: "AI Integraties",
  agents: "AI Agents / OpenClaw",
};

export const SERVICE_SUMMARIES = {
  audit: "Eerst proces, tooling en haalbaarheid scherp krijgen voordat er iets wordt gebouwd.",
  integrations: "Gerichte AI-koppelingen bouwen in een afgebakend proces met duidelijke invoer en uitvoer.",
  agents: "Een workflow-aanpak met AI Agents / OpenClaw voor intake, routing, opvolging en orkestratie.",
};

export const DIMENSION_META = {
  D1: {
    label: "Werkdruk & schaal",
    low: "De omvang is nog beperkt. Een compacte, afgebakende eerste use case ligt het meest voor de hand.",
    mid: "Er is genoeg terugkerend werk om een eerste businesscase te onderbouwen.",
    high: "De schaal van het werk maakt snelle focus en standaardisatie extra waardevol.",
  },
  D2: {
    label: "Systemen & koppelkansen",
    low: "De digitale basis lijkt nog dun of versnipperd. Eerst structureren voorkomt losse AI-experimenten.",
    mid: "Er zijn al bruikbare systemen aanwezig, maar koppelingen en proceskeuzes vragen nog focus.",
    high: "De bestaande toolstack biedt duidelijke aanknopingspunten voor integratie of orkestratie.",
  },
  D3: {
    label: "AI-volwassenheid",
    low: "AI-gebruik is nog pril. Verwachtingen, werkwijze en risico's moeten eerst worden gekaderd.",
    mid: "Er is basiservaring aanwezig, maar nog niet overal dezelfde werkwijze of betrouwbaarheid.",
    high: "AI is al herkenbaar onderdeel van het werk, waardoor implementatie sneller kan landen.",
  },
  D4: {
    label: "Implementatiegereedheid",
    low: "De organisatie zit nog vooral in oriëntatie. Eerst scherpte en eigenaarschap, daarna uitvoering.",
    mid: "Er is bereidheid om te starten, maar keuzes en verantwoordelijkheden moeten nog concreet worden.",
    high: "Er lijkt genoeg draagvlak om van analyse naar een gerichte implementatiestap te gaan.",
  },
};

export const SCORE_COPY = {
  startfase: {
    headline: {
      audit: "Hier zit potentie, maar eerst moet duidelijk worden waar AI echt zin heeft.",
      integrations: "Er is een eerste kans zichtbaar, maar de basis vraagt nog ordening.",
      agents: "Er zit workflowpotentie in, maar een agentaanpak is nu nog te vroeg.",
    },
    summary:
      "De quickscan wijst vooral op analyse vooraf: eerst scherp krijgen waar het volume zit, welke systemen leidend zijn en welke eerste use case echt kansrijk is.",
  },
  bewust: {
    headline: {
      audit: "Er is een duidelijke aanleiding, maar eerst is meer scherpte nodig.",
      integrations: "Er ligt een eerste haalbare AI-kans, mits de scope strak blijft.",
      agents: "Er zijn duidelijke workflowsignalen, maar de route vraagt nog afbakening.",
    },
    summary:
      "Er is genoeg aanleiding om te starten, maar niet elk onderdeel is al even rijp. De grootste winst zit nu in focus, prioriteit en een scherpe eerste stap.",
  },
  klaar: {
    headline: {
      audit: "Er is al veel basis aanwezig, maar eerst valideren voorkomt een te brede start.",
      integrations: "Er lijkt genoeg basis voor een gerichte AI-implementatie in een concreet proces.",
      agents: "De organisatie lijkt rijp voor een slimmere workflowlaag boven meerdere systemen.",
    },
    summary:
      "Deze uitkomst wijst op een werkbare combinatie van procesdruk, digitale basis en uitvoerbereidheid. De vervolgstap kan concreet worden ingericht.",
  },
  voorloper: {
    headline: {
      audit: "Een audit is hier vooral nuttig om sneller en scherper te prioriteren.",
      integrations: "De basis oogt sterk genoeg om snel koppelkansen te prioriteren.",
      agents: "Dit profiel past goed bij AI Agents / OpenClaw voor routing en orkestratie.",
    },
    summary:
      "De quickscan laat zien dat zowel de volwassenheid als de digitale basis relatief sterk zijn. De nadruk mag liggen op tempo, governance en een scherp implementatiekader.",
  },
};

export const LEAK_LIBRARY = {
  "losse-emails": {
    title: "Te veel losse e-mails lijken nog handmatig te worden verwerkt",
    problem: "Inboxwerk lijkt nog te afhankelijk van lezen, sorteren, prioriteren en handmatig doorzetten.",
    why: "Dat kost tijd omdat berichten eerst beoordeeld moeten worden voordat iemand kan reageren of iets kan oppakken.",
  },
  "handmatige-admin": {
    title: "Veel administratief werk lijkt nog handmatig te worden bijgehouden",
    problem: "Werk blijft waarschijnlijk hangen in invoeren, controleren, bijwerken en afstemmen tussen mensen of systemen.",
    why: "Dat kost tijd omdat dezelfde informatie op meerdere plekken terugkomt en steeds opnieuw moet worden bevestigd.",
  },
  "data-rapportage": {
    title: "Data en overzicht vragen waarschijnlijk te veel handmatig uitzoekwerk",
    problem: "Rapportage, controle of opvolging hangt vermoedelijk af van data uit meerdere bronnen die niet vanzelf samenkomen.",
    why: "Daardoor gaat tijd verloren aan zoeken, valideren en samenvoegen voordat iemand kan handelen.",
  },
  "content-blijft-liggen": {
    title: "Contentwerk blijft waarschijnlijk te vaak liggen tussen idee en publicatie",
    problem: "Content vraagt vermoedelijk veel afstemming, revisies en losse overdrachtsmomenten voordat iets echt live gaat.",
    why: "Daardoor stokt de uitvoering en blijft publicatie te afhankelijk van losse capaciteit of handmatig duwwerk.",
  },
  "leads-opvolging": {
    title: "Leads lijken nog te vaak te laat of onvolledig te worden opgevolgd",
    problem: "Nieuwe aanvragen of reacties vragen waarschijnlijk te veel handmatig sorteren, opvolgen en terugkoppelen.",
    why: "Dat kost tijd omdat opvolging niet strak genoeg meeloopt met inbox, planning of CRM.",
  },
  "campagnes-tijd": {
    title: "Campagnes vragen waarschijnlijk te veel losse handmatige stappen",
    problem: "Campagnewerk hangt vermoedelijk nog af van briefen, aanpassen, controleren en publiceren in losse rondes.",
    why: "Daardoor gaat tijd verloren aan schakelen tussen tools, versies en goedkeuringen.",
  },
  "documenten-dossiers": {
    title: "Documenten en dossiers vragen waarschijnlijk te veel handmatige verwerking",
    problem: "Offertes, documenten of dossiers kennen vermoedelijk nog veel uitzoekwerk, controle en terugkerende bewerkingen.",
    why: "Dat kost tijd omdat dezelfde controles of samenvattingen steeds opnieuw moeten gebeuren.",
  },
  "planning-vast": {
    title: "Planning lijkt nog te veel vast te lopen in afstemming en handmatig schuiven",
    problem: "Planningen, beschikbaarheid en opvolging vragen waarschijnlijk veel handmatig aanpassen, bevestigen en terugkoppelen.",
    why: "Dat kost tijd omdat wijzigingen over meerdere mensen, momenten of systemen lopen.",
  },
  "meerdere-dingen": {
    title: "De grootste vertraging zit waarschijnlijk niet op één plek, maar verspreid over meerdere stappen",
    problem: "De frictie lijkt nog niet scherp genoeg afgebakend om meteen naar één oplossing te springen.",
    why: "Dan wordt AI al snel op symptomen gezet in plaats van op het onderliggende proces.",
  },
};

export const DIMENSION_LEAK_LIBRARY = {
  D1: {
    title: "Schaal en verdeling van werk vragen om strakkere afbakening",
    problem: "De omvang van het werk is nog niet overal gestandaardiseerd of gelijk verdeeld.",
    why: "Daardoor blijft te veel kennis impliciet bij een paar mensen hangen.",
  },
  D2: {
    title: "Systemen lijken nog onvoldoende gekoppeld voor soepele uitvoering",
    problem: "Teams moeten waarschijnlijk context uit meerdere plekken ophalen voordat iets afgehandeld kan worden.",
    why: "Dat creëert dubbel werk, foutkans en onnodig schakelen tussen tools.",
  },
  D3: {
    title: "AI-gebruik is nog niet overal stabiel genoeg ingebed",
    problem: "Er lijkt nog verschil te zitten tussen losse experimenten en herhaalbaar dagelijks gebruik.",
    why: "Daardoor blijft AI-waarde afhankelijk van individuele medewerkers in plaats van van het proces.",
  },
  D4: {
    title: "De stap van inzicht naar uitvoering lijkt nog niet overal belegd",
    problem: "Eigenaarschap, prioriteit of tempo richting implementatie is waarschijnlijk nog niet overal helder.",
    why: "Zonder vaste eigenaar en duidelijke scope blijft voortgang hangen in intentie.",
  },
};

export const PRIVACY_MICROCOPY =
  "De score wordt automatisch berekend op basis van je antwoorden. Je gegevens gebruiken we om dit rapport te tonen en later te kunnen opvolgen. Marketing gebeurt alleen als je daar apart toestemming voor geeft.";

export const OPT_IN_TEXT =
  "Ik geef toestemming om updates en relevante informatie per e-mail te ontvangen.";

export const LIMITATIONS_TEXT =
  "Deze schatting houdt geen rekening met implementatiekosten, leercurve of bedrijfsspecifieke uitzonderingen.";

export const DISCLAIMER_TEXT =
  "Indicatieve schatting — Dit bedrag is een grove indicatie gebaseerd op uw opgegeven uren en een standaard uurtarief. Het werkelijke resultaat hangt af van uw specifieke situatie en de gekozen oplossing. Aan deze berekening kunnen geen rechten worden ontleend.";
