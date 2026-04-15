import {
  AI_FOLLOWUP_LABELS,
  AI_USAGE_LABELS,
  DISCLAIMER_TEXT,
  HOUR_MAP,
  HOURLY_VALUE_OPTIONS,
  HOURLY_VALUE_RANGE_MAP,
  LIMITATIONS_TEXT,
  PAIN_POINT_LABELS,
  PAIN_POINT_OPTIONS_BY_PROCESS,
  PROCESS_LABELS,
  QUICKSCAN_VERSION,
  SAVINGS_SCENARIOS,
  SERVICE_LABELS,
  TOOL_LABELS,
  URGENCY_LABELS,
} from "./config.js";

const MONTH_FACTOR = 4.33;

const D1_Q1_BASE = {
  "Administratie en invoer": 8,
  "Content en marketing": 8,
  "Klantcontact en opvolging": 7,
  "Data en rapportages": 7,
  "Offertes en documenten": 6,
  "Planning en interne afstemming": 4,
};

const D1_Q3_SCORES = {
  "Minder dan 2 uur": 2,
  "2-5 uur": 5,
  "5-10 uur": 8,
  "10-20 uur": 11,
  "20-50 uur": 14,
  "50 uur of meer": 17,
};

const D2_Q1_BASE = {
  "Administratie en invoer": 9,
  "Content en marketing": 9,
  "Klantcontact en opvolging": 8,
  "Offertes en documenten": 8,
  "Data en rapportages": 7,
  "Planning en interne afstemming": 3,
};

const D2_Q2_SCORES_BY_PROCESS = {
  "Klantcontact en opvolging": {
    "losse-vragen-berichten": 16,
    "Ik beantwoord steeds dezelfde vragen": 16,
    "leads-buiten-kantooruren": 14,
    "Buiten kantooruren mis ik leads": 14,
    "leads-niet-opgevolgd": 12,
    "Opvolging schiet er bij in": 12,
    "informatie-verspreid": 10,
    "Informatie staat verspreid": 10,
    "Elk gesprek begint bij nul": 10,
    "overdracht-kost-tijd": 8,
    "Overdracht kost te veel tijd": 8,
    "Te veel kanalen om bij te houden": 8,
  },
  "Administratie en invoer": {
    "gegevens-overzetten": 16,
    "Ik voer te veel gegevens handmatig in": 16,
    "Invoer kost te veel handwerk": 16,
    "fouten-herstellen": 14,
    "Fouten herstellen kost te veel tijd": 14,
    "Fouten door handmatig overtypen": 14,
    "overzichten-maken": 14,
    "Overzichten maken duurt te lang": 14,
    "Systemen praten niet met elkaar": 14,
    "documenten-facturen": 11,
    "Facturen en documenten blijven liggen": 11,
    "Documenten zoeken kost te veel tijd": 11,
    "invoer-controles": 9,
    "Controle kost elke week veel tijd": 9,
    "Goedkeuringsprocessen lopen vast": 9,
  },
  "Content en marketing": {
    "content-handwerk": 15,
    "Het kost te veel tijd per stuk content": 15,
    "publicatie-planning": 14,
    "Publiceren en plannen kost te veel tijd": 14,
    "feedback-afstemming": 13,
    "Consistentie lukt niet": 13,
    "campagnes-doorvertalen": 12,
    "Campagnes doorvertalen kost te veel werk": 12,
    "briefings-input": 9,
    "Ik weet niet goed wat ik moet maken": 9,
    "Ideeën uitwerken naar content kost tijd": 9,
  },
  "Offertes en documenten": {
    "offertes-opstellen": 16,
    "Offertes maken duurt te lang": 16,
    "Elke offerte opnieuw beginnen": 16,
    "documenten-aanpassen": 14,
    "Documenten aanpassen blijft handwerk": 14,
    "Contracten aanpassen kost te veel tijd": 14,
    "dossiers-opbouwen": 12,
    "Dossiers opbouwen kost veel tijd": 12,
    "Opvolging na offerte schiet er bij in": 12,
    "informatie-opnieuw-invullen": 11,
    "Gegevens opnieuw invullen kost tijd": 11,
    "Vertalen naar meerdere talen": 11,
    "versies-feedback": 10,
    "Feedback en versies lopen door elkaar": 10,
    "Versies en wijzigingen bijhouden": 10,
  },
  "Planning en interne afstemming": {
    "losse-berichten": 12,
    "Veel afstemming loopt via losse berichten": 12,
    "Updates doorkommuniceren gaat mis": 12,
    "planning-handwerk": 10,
    "Plannen kost te veel heen-en-weer": 10,
    "Vergaderingen afstemmen kost te veel": 10,
    "opvolging-niet-strak": 10,
    "Opvolging schiet er bij in": 10,
    "Actiepunten worden niet opgevolgd": 10,
    "taken-versnipperd": 9,
    "Taken en afspraken raken verspreid": 9,
    "Overzicht ontbreekt wie wat doet": 9,
    "overdracht-onduidelijk": 7,
    "Overdracht is niet duidelijk genoeg": 7,
    "Prioriteiten schuiven constant": 7,
  },
  "Data en rapportages": {
    "rapportages-langzaam": 16,
    "Rapportages maken duurt te lang": 16,
    "Rapporten handmatig opmaken": 16,
    "data-verzamelen": 15,
    "Data verzamelen kost te veel tijd": 15,
    "Data uit meerdere bronnen samenvoegen": 15,
    "te-veel-bronnen": 13,
    "Informatie staat in te veel systemen": 13,
    "Dashboards zijn verouderd": 13,
    "inzicht-te-laat": 12,
    "Inzicht komt te laat beschikbaar": 12,
    "Inzichten komen te laat": 12,
    "controle-opschoning": 11,
    "Controleren en opschonen kost veel werk": 11,
    "Analyses kosten te veel tijd": 11,
  },
};

const D3_Q7_SCORES = {
  "Dit wil ik zo snel mogelijk verbeteren": 18,
  "Dit wil ik binnenkort verbeteren": 13,
  "Wel belangrijk, maar geen haast": 7,
  "Nu nog niet zo belangrijk": 2,
};

const D3_Q6_SCORES = {
  "Nog niet": 7,
  "Af en toe": 6,
  Regelmatig: 4,
  "Vast onderdeel van dit werk": 2,
};

const D4_Q4_SCORES = {
  "€100+": 13,
  "€75-€100": 10,
  "€50-€75": 7,
  "€25-€50": 4,
};

const D4_Q3_SCORES = {
  "Minder dan 2 uur": 1,
  "2-5 uur": 2,
  "5-10 uur": 4,
  "10-20 uur": 6,
  "20-50 uur": 9,
  "50 uur of meer": 12,
};

const Q3_NUMERIC_HOURS = {
  "Minder dan 2 uur": 1.5,
  "2-5 uur": 3.5,
  "5-10 uur": 7.5,
  "10-20 uur": 15,
  "20-50 uur": 35,
  "50 uur of meer": 50,
};

const Q3_VALUE_TO_LABEL = {
  "<2": "Minder dan 2 uur",
  "2-5": "2-5 uur",
  "5-10": "5-10 uur",
  "10-20": "10-20 uur",
  "20-50": "20-50 uur",
  "50+": "50 uur of meer",
};

const Q4_NUMERIC_RATE = {
  "€25-€50": 37.5,
  "€50-€75": 62.5,
  "€75-€100": 87.5,
  "€100+": 100,
};

const SCORE_CLASSIFICATIONS = [
  { min: 80, label: "Grote AI-kans" },
  { min: 65, label: "Sterke AI-kans" },
  { min: 45, label: "Duidelijke AI-kans" },
  { min: 25, label: "AI-kans in opbouw" },
  { min: 0, label: "Verkenningsfase" },
];

const AI_FACTORS = {
  "nog-niet": 1,
  "af-en-toe": 0.85,
  regelmatig: 0.65,
  "vast-onderdeel": 0.4,
};

const CTA_BY_URGENCY = {
  laag: {
    ctaType: "soft",
    label: "Bewaar dit rapport",
    emailFollowUpAfterDays: 14,
    showPhone: false,
  },
  interessant: {
    ctaType: "exploratory",
    label: "Plan een oriëntatiegesprek",
    emailFollowUpAfterDays: null,
    showPhone: false,
  },
  verbeteren: {
    ctaType: "intake",
    label: "Plan een gesprek deze week",
    emailFollowUpAfterDays: null,
    showPhone: false,
  },
  "snel-beter": {
    ctaType: "direct",
    label: "Plan een gesprek deze week",
    emailFollowUpAfterDays: null,
    showPhone: false,
  },
};

const PRIMARY_CONCLUSIONS = {
  klantcontact: "Je grootste winst zit nu in klantcontact en opvolging.",
  administratie: "Je grootste winst zit nu in administratie en invoer.",
  content: "Je grootste winst zit nu in content en marketing.",
  offertes: "Je grootste winst zit nu in offertes en documentwerk.",
  planning: "Je grootste winst zit nu in planning en interne afstemming.",
  data: "Je grootste winst zit nu in data en rapportages.",
};

const PRIMARY_CONCLUSION_DETAILS = {
  "losse-vragen-berichten": "het beantwoorden van terugkerende vragen",
  "leads-niet-opgevolgd": "lead- en klantopvolging",
  "leads-buiten-kantooruren": "opvolging buiten kantooruren",
  "informatie-verspreid": "het zoeken en bundelen van klantinformatie",
  "overdracht-kost-tijd": "overdracht en opvolging",
  "gegevens-overzetten": "handmatige invoer en verwerking",
  "invoer-controles": "controles en administratie",
  "documenten-facturen": "document- en factuurverwerking",
  "overzichten-maken": "het maken van overzichten",
  "fouten-herstellen": "foutcontrole en herstel",
  "briefings-input": "briefing en voorbereiding",
  "content-handwerk": "contentproductie",
  "feedback-afstemming": "consistentie en vaste contentlijnen",
  "publicatie-planning": "publicatie en planning",
  "campagnes-doorvertalen": "campagne-uitvoer",
  "offertes-opstellen": "offerte-opbouw",
  "documenten-aanpassen": "documentaanpassingen",
  "versies-feedback": "feedback en versiebeheer",
  "dossiers-opbouwen": "dossieropbouw",
  "informatie-opnieuw-invullen": "het opnieuw invullen van gegevens",
  "planning-handwerk": "heen-en-weer in planning en afstemming",
  "overdracht-onduidelijk": "overdracht tussen mensen",
  "taken-versnipperd": "taken en afspraken",
  "losse-berichten": "interne afstemming via losse berichten",
  "opvolging-niet-strak": "interne opvolging",
  "data-verzamelen": "dataverzameling",
  "rapportages-langzaam": "rapportage-opbouw",
  "te-veel-bronnen": "het bundelen van informatie uit verschillende bronnen",
  "controle-opschoning": "controle en opschoning",
  "inzicht-te-laat": "analyse en rapportage",
};

const PAIN_POINT_SUMMARIES = {
  "losse-vragen-berichten":
    "Losse vragen en berichten maken opvolging minder strak. Daardoor gaat tijd verloren aan zoeken, beoordelen en opnieuw afstemmen.",
  "leads-niet-opgevolgd":
    "Leadopvolging vraagt nu te veel handmatige aandacht. Daardoor blijven kansen langer liggen dan nodig.",
  "leads-buiten-kantooruren":
    "Aanvragen buiten kantooruren worden niet altijd direct opgepakt. Daardoor kan opvolging later starten dan nodig.",
  "informatie-verspreid":
    "Informatie staat te verspreid om snel te handelen. Dat kost overzicht, opvolging en snelheid.",
  "handmatig-antwoorden":
    "Terugkerende antwoorden kosten nu veel handwerk. Juist daar zit directe ruimte voor versnelling.",
  "overdracht-kost-tijd":
    "Overdracht kost nu te veel losse afstemming. Dat maakt klantcontact afhankelijker van handmatige opvolging.",
  "invoer-controles":
    "Invoer en controles vragen nu veel repeterend werk. Dat maakt het proces traag en foutgevoelig.",
  "gegevens-overzetten":
    "Veel tijd gaat verloren aan overzetten, controleren en corrigeren. Dat maakt dit proces traag en foutgevoelig.",
  "documenten-facturen":
    "Documenten en facturen vragen nu te veel handmatige verwerking. Daardoor blijft administratief werk onnodig hangen.",
  "overzichten-maken":
    "Overzichten kosten nu te veel handmatig uitzoekwerk. Daardoor komt inzicht later beschikbaar dan nodig.",
  "fouten-herstellen":
    "Fouten herstellen kost vaak meer tijd dan het werk direct goed inrichten. Hier zit ruimte voor standaardisatie en controle.",
  "briefings-input":
    "Voorbereiding, afstemming en uitwerking kosten nu onnodig veel handwerk. Juist daar zit directe ruimte voor versnelling.",
  "content-handwerk":
    "Content maken vraagt nu te veel losse handmatige stappen. Daardoor stokt de uitvoering sneller dan nodig.",
  "feedback-afstemming":
    "Consistentie kost nu te veel correctie- en afstemwerk. Vaste formats en een scherpere lijn kunnen de uitvoering duidelijk versnellen.",
  "publicatie-planning":
    "Publicatie en planning kosten nu te veel handwerk. Juist de vertaalslag naar kanalen kan slimmer worden ingericht.",
  "campagnes-doorvertalen":
    "Campagnes doorvertalen vraagt nu te veel herhaalwerk. Varianten, formats en kanaalversies kunnen strakker worden opgebouwd.",
  "offertes-opstellen":
    "Offertes opstellen kost nu te veel handmatige opbouw. Vaste onderdelen en klantinformatie kunnen slimmer samenkomen.",
  "documenten-aanpassen":
    "Documenten aanpassen blijft te veel handwerk. Daardoor kost elke klantvariant opnieuw tijd.",
  "versies-feedback":
    "Versiebeheer, aanpassingen en afstemming vertragen de doorlooptijd. Daardoor blijft werk onnodig lang liggen.",
  "dossiers-opbouwen":
    "Dossiers opbouwen kost nu te veel verzamelwerk. Informatie kan consistenter en sneller worden samengebracht.",
  "informatie-opnieuw-invullen":
    "Informatie wordt te vaak opnieuw ingevuld. Dat vergroot de kans op fouten en onnodig dubbel werk.",
  "planning-handwerk":
    "Planning vraagt nu te veel handmatige afstemming. Dat kost tijd en maakt opvolging kwetsbaar.",
  "overdracht-onduidelijk":
    "Overdracht tussen mensen is niet scherp genoeg. Daardoor blijven acties en verantwoordelijkheden sneller liggen.",
  "taken-versnipperd":
    "Werk en communicatie lopen via te veel losse lijnen. Dat kost overzicht, opvolging en snelheid.",
  "losse-berichten":
    "Losse berichten maken interne afstemming rommelig. Daardoor moeten afspraken en acties steeds opnieuw worden teruggezocht.",
  "opvolging-niet-strak":
    "Opvolging loopt niet strak genoeg mee met het werk. Dat maakt het proces afhankelijk van handmatige reminders.",
  "data-verzamelen":
    "Data verzamelen kost nu te veel tijd. De grootste winst zit in bronnen sneller bundelen en voorbereiden.",
  "rapportages-langzaam":
    "Rapportages maken duurt te lang. Terugkerende opbouw en samenvatting kunnen strakker worden ingericht.",
  "te-veel-bronnen":
    "Informatie komt uit te veel bronnen. Daardoor gaat tijd verloren aan samenvoegen, controleren en interpreteren.",
  "controle-opschoning":
    "Controle en opschoning kosten veel werk. Hier zit ruimte om fouten en afwijkingen eerder zichtbaar te maken.",
  "inzicht-te-laat":
    "Inzicht komt te laat beschikbaar om snel te sturen. Snellere rapportage en signalering kunnen direct waarde toevoegen.",
};

const OPPORTUNITY_TITLES = {
  klantcontact: {
    default: "Klantopvolging versnellen",
    "leads-niet-opgevolgd": "Leads strakker opvolgen",
    "handmatig-antwoorden": "Reacties en opvolging structureren",
    "informatie-verspreid": "Contactinformatie centraliseren",
  },
  administratie: {
    default: "Administratie en invoer versnellen",
    "gegevens-overzetten": "Handmatige invoer verminderen",
    "invoer-controles": "Controles en verwerking stroomlijnen",
    "fouten-herstellen": "Foutgevoelig werk verminderen",
  },
  content: {
    default: "Content en marketing versnellen",
    "campagnes-doorvertalen": "Campagne-uitvoer stroomlijnen",
    "content-handwerk": "Contentproductie structureren",
    "feedback-afstemming": "Content consistenter uitwerken",
    "publicatie-planning": "Publicatie en planning stroomlijnen",
  },
  offertes: {
    default: "Documentwerk versnellen",
    "offertes-opstellen": "Offerteproces stroomlijnen",
    "documenten-aanpassen": "Documentcreatie standaardiseren",
    "versies-feedback": "Feedbackrondes verkorten",
  },
  planning: {
    default: "Planning en overdracht verbeteren",
    "taken-versnipperd": "Taken en afspraken centraliseren",
    "losse-berichten": "Interne afstemming stroomlijnen",
    "opvolging-niet-strak": "Opvolging en planning aanscherpen",
  },
  data: {
    default: "Rapportages versnellen",
    "inzicht-te-laat": "Inzicht sneller beschikbaar maken",
    "te-veel-bronnen": "Dataverwerking stroomlijnen",
    "controle-opschoning": "Controlewerk verminderen",
  },
};

const TOOL_SPECIFIC_OPPORTUNITY_TITLES = {
  content: [
    { tools: ["social-media", "contentplanning-notion"], title: "Social content en planning versnellen" },
    { tools: ["meta-google-ads"], title: "Campagnevarianten sneller uitwerken" },
    { tools: ["emailmarketing"], title: "E-mailcampagnes sneller opbouwen" },
    { tools: ["canva-design"], title: "Design- en contentproductie versnellen" },
  ],
  klantcontact: [
    { tools: ["whatsapp"], title: "WhatsApp-opvolging stroomlijnen" },
    { tools: ["crm"], title: "CRM-opvolging strakker maken" },
    { tools: ["supporttool"], title: "Supportvragen sneller afhandelen" },
    { tools: ["agenda-planning"], title: "Opvolging en planning verbinden" },
  ],
  administratie: [
    { tools: ["boekhouding"], title: "Boekhoudverwerking versnellen" },
    { tools: ["excel-sheets"], title: "Excel-invoer en controles verminderen" },
    { tools: ["erp-administratiepakket"], title: "ERP-verwerking slimmer inrichten" },
    { tools: ["documentopslag"], title: "Documentverwerking stroomlijnen" },
  ],
  offertes: [
    { tools: ["esigning-akkoordtools"], title: "Akkoordflow versnellen" },
    { tools: ["microsoft-365-word-excel"], title: "Offertes en documenten standaardiseren" },
    { tools: ["google-docs-drive"], title: "Documentfeedback sneller verwerken" },
    { tools: ["crm"], title: "Klantgegevens direct in offertes gebruiken" },
  ],
  planning: [
    { tools: ["projectmanagement"], title: "Taken en opvolging centraliseren" },
    { tools: ["agenda-planning"], title: "Planning sneller afstemmen" },
    { tools: ["whatsapp-chat"], title: "Losse afstemming naar structuur brengen" },
    { tools: ["microsoft-google-docs"], title: "Overdracht en afspraken bundelen" },
  ],
  data: [
    { tools: ["dashboards-bi"], title: "Dashboard-updates versnellen" },
    { tools: ["excel-sheets"], title: "Excel-rapportages sneller opbouwen" },
    { tools: ["crm", "erp-administratiepakket"], title: "Data uit systemen slimmer bundelen" },
    { tools: ["microsoft-google-docs"], title: "Rapportage-input centraliseren" },
  ],
};

const BULLET_LIBRARY = {
  klantcontact: [
    { title: "Veelgestelde vragen sneller afhandelen", tools: ["supporttool", "email", "whatsapp"] },
    { title: "Leads strakker opvolgen", tools: ["crm", "agenda-planning"] },
    { title: "Reacties en overdracht stroomlijnen", tools: ["email", "whatsapp", "supporttool"] },
    { title: "Informatie centraler beschikbaar maken", tools: ["crm"] },
    { title: "Klantcontact minder handmatig maken", tools: ["email", "whatsapp"] },
  ],
  administratie: [
    { title: "Invoer en controles versnellen", tools: ["excel-sheets", "boekhouding", "erp-administratiepakket"] },
    { title: "Gegevens minder vaak overzetten", tools: ["excel-sheets", "erp-administratiepakket"] },
    { title: "Verwerking standaardiseren", tools: ["boekhouding", "microsoft-365", "documentopslag"] },
    { title: "Foutgevoelig werk verminderen", tools: ["boekhouding", "excel-sheets"] },
    { title: "Overzichten sneller opbouwen", tools: ["excel-sheets", "erp-administratiepakket"] },
  ],
  content: [
    { title: "Briefings sneller uitwerken", tools: ["google-docs-drive", "contentplanning-notion"] },
    { title: "Contentproductie versnellen", tools: ["canva-design", "google-docs-drive"] },
    { title: "Publicatie en planning stroomlijnen", tools: ["social-media", "contentplanning-notion"] },
    { title: "Campagnes sneller doorvertalen", tools: ["meta-google-ads", "emailmarketing"] },
    { title: "Design- en copywerk versnellen", tools: ["canva-design", "social-media"] },
  ],
  offertes: [
    { title: "Offertes sneller opstellen", tools: ["microsoft-365-word-excel", "google-docs-drive", "crm"] },
    { title: "Documenten standaardiseren", tools: ["microsoft-365-word-excel", "pdf-documenttools"] },
    { title: "Feedbackrondes verkorten", tools: ["google-docs-drive", "esigning-akkoordtools"] },
    { title: "Versiebeheer stroomlijnen", tools: ["documentopslag", "google-docs-drive"] },
    { title: "Informatie minder vaak invullen", tools: ["crm", "microsoft-365-word-excel"] },
  ],
  planning: [
    { title: "Planning overzichtelijker maken", tools: ["agenda-planning"] },
    { title: "Overdracht tussen mensen verbeteren", tools: ["projectmanagement", "microsoft-google-docs"] },
    { title: "Taken en afspraken centraliseren", tools: ["projectmanagement"] },
    { title: "Interne afstemming versnellen", tools: ["whatsapp-chat", "email"] },
    { title: "Opvolging strakker organiseren", tools: ["agenda-planning", "projectmanagement"] },
  ],
  data: [
    { title: "Data sneller verzamelen", tools: ["excel-sheets", "crm", "erp-administratiepakket"] },
    { title: "Rapportages sneller opbouwen", tools: ["dashboards-bi", "excel-sheets"] },
    { title: "Informatie beter bundelen", tools: ["crm", "erp-administratiepakket", "microsoft-google-docs"] },
    { title: "Inzicht eerder beschikbaar maken", tools: ["dashboards-bi"] },
    { title: "Controlewerk verminderen", tools: ["excel-sheets", "erp-administratiepakket"] },
  ],
};

const PAIN_POINT_BULLET_PRIORITY = {
  "losse-vragen-berichten": "Veelgestelde vragen sneller afhandelen",
  "leads-niet-opgevolgd": "Leads strakker opvolgen",
  "informatie-verspreid": "Informatie centraler beschikbaar maken",
  "handmatig-antwoorden": "Klantcontact minder handmatig maken",
  "overdracht-kost-tijd": "Reacties en overdracht stroomlijnen",
  "invoer-controles": "Invoer en controles versnellen",
  "gegevens-overzetten": "Gegevens minder vaak overzetten",
  "documenten-facturen": "Verwerking standaardiseren",
  "overzichten-maken": "Overzichten sneller opbouwen",
  "fouten-herstellen": "Foutgevoelig werk verminderen",
  "briefings-input": "Briefings sneller uitwerken",
  "content-handwerk": "Contentproductie versnellen",
  "feedback-afstemming": "Publicatie en planning stroomlijnen",
  "publicatie-planning": "Publicatie en planning stroomlijnen",
  "campagnes-doorvertalen": "Campagnes sneller doorvertalen",
  "offertes-opstellen": "Offertes sneller opstellen",
  "documenten-aanpassen": "Documenten standaardiseren",
  "versies-feedback": "Feedbackrondes verkorten",
  "dossiers-opbouwen": "Informatie minder vaak invullen",
  "informatie-opnieuw-invullen": "Informatie minder vaak invullen",
  "planning-handwerk": "Planning overzichtelijker maken",
  "overdracht-onduidelijk": "Overdracht tussen mensen verbeteren",
  "taken-versnipperd": "Taken en afspraken centraliseren",
  "losse-berichten": "Interne afstemming versnellen",
  "opvolging-niet-strak": "Opvolging strakker organiseren",
  "data-verzamelen": "Data sneller verzamelen",
  "rapportages-langzaam": "Rapportages sneller opbouwen",
  "te-veel-bronnen": "Informatie beter bundelen",
  "controle-opschoning": "Controlewerk verminderen",
  "inzicht-te-laat": "Inzicht eerder beschikbaar maken",
};

const RECOMMENDATION_EXPLANATIONS = {
  "Veelgestelde vragen sneller afhandelen": "Terugkerende vragen kunnen sneller worden herkend, voorbereid en afgehandeld.",
  "Leads strakker opvolgen": "Nieuwe aanvragen kunnen sneller worden geprioriteerd en klaargezet voor opvolging.",
  "Reacties en overdracht stroomlijnen": "Reacties, samenvattingen en overdracht kunnen consistenter worden voorbereid.",
  "Informatie centraler beschikbaar maken": "Belangrijke klantinformatie hoeft minder vaak handmatig te worden gezocht.",
  "Klantcontact minder handmatig maken": "Herhaalwerk in contactmomenten kan beter worden voorbereid en vastgelegd.",
  "Invoer en controles versnellen": "Terugkerende invoer en checks kunnen sneller en consistenter worden uitgevoerd.",
  "Gegevens minder vaak overzetten": "Informatie hoeft minder vaak handmatig tussen bestanden of systemen te worden verplaatst.",
  "Verwerking standaardiseren": "Vaste stappen kunnen voorspelbaarder worden ingericht en gecontroleerd.",
  "Foutgevoelig werk verminderen": "Afwijkingen en ontbrekende gegevens kunnen eerder zichtbaar worden.",
  "Overzichten sneller opbouwen": "Terugkerende overzichten kunnen sneller worden voorbereid uit bestaande input.",
  "Briefings sneller uitwerken": "Losse input kan sneller worden vertaald naar een bruikbare briefing of opzet.",
  "Contentproductie versnellen": "Eerste concepten, varianten en formats kunnen sneller klaarliggen.",
  "Publicatie en planning stroomlijnen": "Kanaalversies en planning kunnen minder handmatig worden voorbereid.",
  "Campagnes sneller doorvertalen": "Campagnevarianten kunnen sneller worden aangepast per kanaal of doelgroep.",
  "Design- en copywerk versnellen": "Design-input en copy kunnen sneller naar bruikbare content worden vertaald.",
  "Offertes sneller opstellen": "Vaste onderdelen en klantinformatie kunnen sneller worden samengebracht.",
  "Documenten standaardiseren": "Documenten kunnen consistenter worden opgebouwd vanuit vaste formats.",
  "Feedbackrondes verkorten": "Aanpassingen en goedkeuringen kunnen overzichtelijker worden voorbereid.",
  "Versiebeheer stroomlijnen": "Versies, opmerkingen en status kunnen minder snel door elkaar lopen.",
  "Informatie minder vaak invullen": "Klant- en projectgegevens kunnen vaker hergebruikt worden.",
  "Planning overzichtelijker maken": "Afspraken en beschikbaarheid kunnen sneller worden verwerkt.",
  "Overdracht tussen mensen verbeteren": "Acties, status en eigenaar kunnen duidelijker worden vastgelegd.",
  "Taken en afspraken centraliseren": "Losse taken en afspraken komen sneller in één werkbaar overzicht.",
  "Interne afstemming versnellen": "Losse berichten kunnen sneller worden omgezet naar duidelijke acties.",
  "Opvolging strakker organiseren": "Vervolgacties kunnen minder afhankelijk worden van handmatige reminders.",
  "Data sneller verzamelen": "Bronnen kunnen sneller worden samengebracht voor analyse of rapportage.",
  "Rapportages sneller opbouwen": "Terugkerende rapportages kunnen sneller worden voorbereid.",
  "Informatie beter bundelen": "Data uit meerdere plekken kan sneller tot één overzicht komen.",
  "Inzicht eerder beschikbaar maken": "Belangrijke signalen en uitzonderingen kunnen sneller zichtbaar worden.",
  "Controlewerk verminderen": "Checks en opschoning kunnen consistenter worden voorbereid.",
};

function roundToTens(value) {
  return Math.round(value / 10) * 10;
}

function roundToHalf(value) {
  return Math.round(value * 2) / 2;
}

function formatHoursNumber(value) {
  if (Number.isInteger(value)) {
    return String(value);
  }

  return value.toFixed(1).replace(".0", "").replace(".", ",");
}

function formatImpactRange(low, high) {
  return `~${formatHoursNumber(low)}-${formatHoursNumber(high)} uur/week`;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function mapCustomHourlyRateToBucket(rate) {
  if (rate >= 100) return "€100+";
  if (rate >= 75) return "€75-€100";
  if (rate >= 50) return "€50-€75";
  return "€25-€50";
}

function clampDimensionScore(value) {
  return Math.min(value, 25);
}

function classifyScore(totalScore) {
  return SCORE_CLASSIFICATIONS.find((item) => totalScore >= item.min)?.label || "Verkenningsfase";
}

function resolveProcessLabel(processType) {
  if (!processType) return null;
  if (PROCESS_LABELS[processType]) return PROCESS_LABELS[processType];
  if (Object.values(PROCESS_LABELS).includes(processType)) return processType;
  return null;
}

function resolveWeeklyHoursLabel(weeklyHours) {
  if (!weeklyHours) return null;
  if (Q3_VALUE_TO_LABEL[weeklyHours]) return Q3_VALUE_TO_LABEL[weeklyHours];
  if (Object.keys(Q3_NUMERIC_HOURS).includes(weeklyHours)) return weeklyHours;
  return null;
}

function resolveAiUsageLabel(aiUsage) {
  if (!aiUsage) return null;
  if (AI_USAGE_LABELS[aiUsage]) return AI_USAGE_LABELS[aiUsage];
  if (Object.values(AI_USAGE_LABELS).includes(aiUsage)) return aiUsage;
  return null;
}

function resolveUrgencyLabel(urgency) {
  if (!urgency) return null;
  if (URGENCY_LABELS[urgency]) return URGENCY_LABELS[urgency];
  if (Object.values(URGENCY_LABELS).includes(urgency)) return urgency;
  return null;
}

function resolveHourlyBucketLabel(answers) {
  const manualValue = Number.parseFloat(answers.hourlyValueManual);

  if (Number.isFinite(manualValue) && manualValue > 0) {
    return mapCustomHourlyRateToBucket(manualValue);
  }

  const rangeValue = answers.hourlyValueRange;
  const rangeOption = HOURLY_VALUE_OPTIONS.find((option) => option.value === rangeValue);

  if (rangeOption) {
    return rangeOption.label;
  }

  if (Object.keys(D4_Q4_SCORES).includes(rangeValue)) {
    return rangeValue;
  }

  return null;
}

function resolveNumericHourlyRate(answers) {
  const manualValue = Number.parseFloat(answers.hourlyValueManual);

  if (Number.isFinite(manualValue) && manualValue > 0) {
    return manualValue;
  }

  const bucketLabel = resolveHourlyBucketLabel(answers);
  return bucketLabel ? Q4_NUMERIC_RATE[bucketLabel] || null : null;
}

function resolvePainPointScore(processLabel, painPoint) {
  if (!processLabel || !painPoint) return null;
  const processScores = D2_Q2_SCORES_BY_PROCESS[processLabel];

  if (!processScores) return null;

  if (processScores[painPoint] != null) {
    return processScores[painPoint];
  }

  const livePainPointLabel = PAIN_POINT_LABELS[painPoint];

  if (livePainPointLabel && processScores[livePainPointLabel] != null) {
    return processScores[livePainPointLabel];
  }

  return null;
}

function getMissingScoreFields(answers) {
  const processLabel = resolveProcessLabel(answers.processType);
  const weeklyHoursLabel = resolveWeeklyHoursLabel(answers.weeklyHours);
  const aiUsageLabel = resolveAiUsageLabel(answers.aiUsage);
  const urgencyLabel = resolveUrgencyLabel(answers.urgency);
  const hourlyBucketLabel = resolveHourlyBucketLabel(answers);
  const numericHourlyRate = resolveNumericHourlyRate(answers);
  const painPointScore = resolvePainPointScore(processLabel, answers.painPoint);

  return {
    processLabel,
    weeklyHoursLabel,
    aiUsageLabel,
    urgencyLabel,
    hourlyBucketLabel,
    numericHourlyRate,
    painPointScore,
    missing: [
      !processLabel && "Q1 processType",
      !answers.painPoint && "Q2 painPoint",
      answers.painPoint && painPointScore == null && "Q2 painPoint mapping",
      !weeklyHoursLabel && "Q3 weeklyHours",
      !hourlyBucketLabel && "Q4 hourlyValue",
      !(Number.isFinite(numericHourlyRate) && numericHourlyRate > 0) && "Q4 numeric hourly value",
      !aiUsageLabel && "Q6 aiUsage",
      !urgencyLabel && "Q7 urgency",
    ].filter(Boolean),
  };
}

export function getQuickscanScoreResult(answers, options = {}) {
  const { logErrors = false } = options;
  const scoreState = getMissingScoreFields(answers);

  if (scoreState.missing.length > 0) {
    if (logErrors) {
      console.warn("[quickscan-score] Incomplete or invalid scoring input", {
        missing: scoreState.missing,
        answers,
      });
    }

    return null;
  }

  const {
    processLabel,
    weeklyHoursLabel,
    aiUsageLabel,
    urgencyLabel,
    hourlyBucketLabel,
    numericHourlyRate,
    painPointScore,
  } = scoreState;

  const d1_tijdverlies = clampDimensionScore(D1_Q1_BASE[processLabel] + D1_Q3_SCORES[weeklyHoursLabel]);
  const d2_automatiseerbaarheid = clampDimensionScore(D2_Q1_BASE[processLabel] + painPointScore);
  const d3_koopbereidheid = clampDimensionScore(D3_Q7_SCORES[urgencyLabel] + D3_Q6_SCORES[aiUsageLabel]);
  const d4_geldverlies = clampDimensionScore(D4_Q4_SCORES[hourlyBucketLabel] + D4_Q3_SCORES[weeklyHoursLabel]);
  const total_score = Math.min(d1_tijdverlies + d2_automatiseerbaarheid + d3_koopbereidheid + d4_geldverlies, 100);
  const classification = classifyScore(total_score);
  const hours = Q3_NUMERIC_HOURS[weeklyHoursLabel];
  const monthly_savings_low = roundToTens(hours * 0.4 * numericHourlyRate * MONTH_FACTOR);
  const monthly_savings_high = roundToTens(hours * 0.65 * numericHourlyRate * MONTH_FACTOR);

  return {
    d1_tijdverlies,
    d2_automatiseerbaarheid,
    d3_koopbereidheid,
    d4_geldverlies,
    total_score,
    classification,
    monthly_savings_low,
    monthly_savings_high,
  };
}

function getSelectedProcessTypes(answers) {
  if (Array.isArray(answers.processTypes) && answers.processTypes.length > 0) {
    return answers.processTypes;
  }

  return answers.processType ? [answers.processType] : [];
}

function getPrimaryProcessType(answers) {
  return getSelectedProcessTypes(answers)[0] || "klantcontact";
}

function getPainPointProcessType(painPoint) {
  return (
    Object.entries(PAIN_POINT_OPTIONS_BY_PROCESS).find(([, options]) =>
      options.some((option) => option.value === painPoint),
    )?.[0] || null
  );
}

function getFocusProcessType(answers) {
  return getPainPointProcessType(answers.painPoint) || getPrimaryProcessType(answers);
}

function hasAnySelectedProcess(answers, processTypes) {
  return getSelectedProcessTypes(answers).some((processType) => processTypes.includes(processType));
}

function getProcessLabelList(answers) {
  return getSelectedProcessTypes(answers)
    .map((processType) => PROCESS_LABELS[processType])
    .filter(Boolean);
}

function formatProcessList(answers) {
  const labels = getProcessLabelList(answers).map((label) => label.toLowerCase());

  if (labels.length <= 1) {
    return labels[0] || "het gekozen proces";
  }

  return `${labels.slice(0, -1).join(", ")} en ${labels[labels.length - 1]}`;
}

function getAiFactor(aiUsage) {
  return AI_FACTORS[aiUsage] ?? 1;
}

function getSelectedTools(answers) {
  return Array.isArray(answers.tools) ? answers.tools : [];
}

function getToolsCount(answers) {
  return getSelectedTools(answers).filter((tool) => tool !== "anders-geen").length;
}

function getToolsFactor(answers) {
  const toolsCount = getToolsCount(answers);

  if (toolsCount === 0) {
    return 1;
  }

  if (toolsCount <= 2) {
    return 0.85;
  }

  if (toolsCount <= 4) {
    return 0.7;
  }

  return 0.55;
}

function hasMultipleTools(answers) {
  return getToolsCount(answers) >= 2;
}

function hasAnyTool(answers, tools) {
  return getSelectedTools(answers).some((tool) => tools.includes(tool));
}

function getToolSpecificOpportunityTitle(answers, processType) {
  const options = TOOL_SPECIFIC_OPPORTUNITY_TITLES[processType] || [];
  const selectedTools = getSelectedTools(answers);
  const ranked = options
    .map((option) => ({
      ...option,
      matchCount: option.tools.filter((tool) => selectedTools.includes(tool)).length,
    }))
    .filter((option) => option.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount || b.tools.length - a.tools.length);

  return ranked[0]?.title || null;
}

function getHourlyValueInput(answers) {
  const manualValue = Number.parseFloat(answers.hourlyValueManual);

  if (Number.isFinite(manualValue) && manualValue > 0) {
    return {
      source: "manual",
      low: manualValue,
      high: manualValue,
      label: `€${Math.round(manualValue)}`,
    };
  }

  return HOURLY_VALUE_RANGE_MAP[answers.hourlyValueRange] || {
    source: "range",
    low: 50,
    high: 75,
    label: "€50-€75",
  };
}

export function quickscanLog(event, payload = {}) {
  console.log(
    JSON.stringify({
      event,
      ...payload,
    }),
  );
}

export function getTimeOpportunity(answers) {
  const weeklyHours = HOUR_MAP[answers.weeklyHours] || 0;
  const potentialWeeklyHours = weeklyHours * getToolsFactor(answers) * getAiFactor(answers.aiUsage);
  const low = roundToHalf(potentialWeeklyHours * 0.8);
  const high = roundToHalf(potentialWeeklyHours);

  return {
    weeklyHours,
    toolsCount: getToolsCount(answers),
    toolsFactor: getToolsFactor(answers),
    aiFactor: getAiFactor(answers.aiUsage),
    potentialWeeklyHours,
    low,
    high,
    label: formatImpactRange(low, high),
  };
}

export function getSavingsRange(answers, scenarioKey = "gemiddeld") {
  const scoreResult = getQuickscanScoreResult(answers);
  const timeOpportunity = getTimeOpportunity(answers);
  const hourlyValue = getHourlyValueInput(answers);
  const monthlyLow = scoreResult?.monthly_savings_low ?? 0;
  const monthlyHigh = scoreResult?.monthly_savings_high ?? 0;
  const yearlyLow = monthlyLow * 12;
  const yearlyHigh = monthlyHigh * 12;
  const scoreHoursLabel = resolveWeeklyHoursLabel(answers.weeklyHours) || "";
  const numericHours = scoreHoursLabel ? Q3_NUMERIC_HOURS[scoreHoursLabel] : timeOpportunity.weeklyHours;
  const numericRate = resolveNumericHourlyRate(answers);
  const rateLabel =
    Number.isFinite(Number.parseFloat(answers.hourlyValueManual)) && Number.parseFloat(answers.hourlyValueManual) > 0
      ? `€${formatHoursNumber(Number.parseFloat(answers.hourlyValueManual))}`
      : hourlyValue.label;
  const formulaText = `Indicatie op basis van jouw input (${formatHoursNumber(numericHours)} uur/week × ${rateLabel} × 4,3 weken)`;
  const timeInfoText = formulaText;

  return {
    scenario: scenarioKey,
    scenarioLabel: SAVINGS_SCENARIOS[scenarioKey]?.label || SAVINGS_SCENARIOS.gemiddeld.label,
    weeklyHours: timeOpportunity.weeklyHours,
    weeklyLow: timeOpportunity.low,
    weeklyHigh: timeOpportunity.high,
    weeklySavingsLabel: timeOpportunity.label,
    hourlyValue,
    monthlyLow,
    monthlyHigh,
    monthlyLabel: `${formatCurrency(monthlyLow)} - ${formatCurrency(monthlyHigh)} p/m`,
    yearlyLow,
    yearlyHigh,
    yearlyLabel: `${formatCurrency(yearlyLow)} - ${formatCurrency(yearlyHigh)} per jaar`,
    formulaText,
    timeInfoText,
    limitationsText: LIMITATIONS_TEXT,
    disclaimerText: DISCLAIMER_TEXT,
  };
}

export function getMainAiOpportunity(result) {
  const focusProcessType = getFocusProcessType(result.answers);
  const processOptions = OPPORTUNITY_TITLES[focusProcessType] || OPPORTUNITY_TITLES.klantcontact;
  const painPointTitle = processOptions[result.answers.painPoint] || processOptions.default;
  const toolSpecificTitle = getToolSpecificOpportunityTitle(result.answers, focusProcessType);

  if (toolSpecificTitle) {
    return toolSpecificTitle;
  }

  if (focusProcessType === "content") {
    if (hasAnyTool(result.answers, ["meta-google-ads", "emailmarketing"])) {
      return "Campagne-uitvoer stroomlijnen";
    }

    if (hasAnyTool(result.answers, ["canva-design"])) {
      return "Contentproductie structureren";
    }
  }

  if (focusProcessType === "data" && hasAnyTool(result.answers, ["dashboards-bi"])) {
    return "Inzicht sneller beschikbaar maken";
  }

  return painPointTitle;
}

export function getOpportunityBullets(result) {
  const selectedTools = getSelectedTools(result.answers);
  const focusProcessType = getFocusProcessType(result.answers);
  const selectedProcessTypes = [
    focusProcessType,
    ...getSelectedProcessTypes(result.answers).filter((processType) => processType !== focusProcessType),
  ].filter(Boolean);
  const library = selectedProcessTypes.flatMap((processType, processIndex) =>
    (BULLET_LIBRARY[processType] || []).map((item, index) => ({
      ...item,
      index,
      processIndex,
    })),
  );
  const priorityTitle = PAIN_POINT_BULLET_PRIORITY[result.answers.painPoint];

  const ranked = library
    .map((item, index) => ({
      ...item,
      index,
      toolMatchCount: item.tools.filter((tool) => selectedTools.includes(tool)).length,
      painPointMatch: item.title === priorityTitle ? 1 : 0,
    }))
    .sort(
      (a, b) =>
        b.painPointMatch - a.painPointMatch ||
        b.toolMatchCount - a.toolMatchCount ||
        a.processIndex - b.processIndex ||
        a.index - b.index,
    );

  return ranked
    .filter((item, index, items) => items.findIndex((other) => other.title === item.title) === index)
    .slice(0, 3)
    .map((item) => item.title);
}

export function getPrimaryConclusion(result) {
  const companyName = result.answers.companyName || "je bedrijf";
  const focusLabel = PROCESS_LABELS[getFocusProcessType(result.answers)]?.toLowerCase() || "het gekozen proces";
  const painPointDetail = PRIMARY_CONCLUSION_DETAILS[result.answers.painPoint];

  if (painPointDetail) {
    return `Het grootste verlies bij ${companyName} zit nu in ${focusLabel}, vooral in ${painPointDetail}.`;
  }

  return `Het grootste verlies bij ${companyName} zit nu in ${focusLabel}.`;
}

function getConclusionSummary(result) {
  const summary =
    PAIN_POINT_SUMMARIES[result.answers.painPoint] ||
    "De gekozen stap vraagt nu waarschijnlijk te veel handwerk of afstemming. Daar zit ruimte om het proces slimmer in te richten.";
  const secondaryProcessTypes = getSelectedProcessTypes(result.answers).filter(
    (processType) => processType !== getFocusProcessType(result.answers),
  );
  const secondaryText = secondaryProcessTypes.length
    ? ` Ook ${secondaryProcessTypes.map((processType) => PROCESS_LABELS[processType]?.toLowerCase()).filter(Boolean).join(" en ")} telt mee in deze analyse.`
    : "";
  const aiIssueText = result.answers.aiIssue
    ? ` Je gaf ook aan dat ${AI_FOLLOWUP_LABELS[result.answers.aiIssue]?.toLowerCase()} bij AI-gebruik nog niet goed werkt.`
    : "";

  return `${summary}${secondaryText}${aiIssueText}`;
}

export function getRecommendedNextStep(result) {
  const { answers } = result;
  const selectedToolCount = getToolsCount(answers);

  if (answers.aiUsage === "vast-onderdeel" && answers.aiIssue === "kwaliteit-wisselvallig") {
    return "optimization";
  }

  if (answers.aiIssue === "team-gebruikt-niet") {
    return "advice";
  }

  if (answers.aiIssue === "verder-automatiseren" && hasAnySelectedProcess(answers, ["planning", "klantcontact"])) {
    return "agents";
  }

  if (selectedToolCount >= 5 && answers.aiUsage === "vast-onderdeel") {
    return "optimization";
  }

  if ((selectedToolCount === 0 || answers.tools.includes("anders-geen")) && ["nog-niet", "af-en-toe"].includes(answers.aiUsage)) {
    return "audit";
  }

  if (
    hasAnySelectedProcess(answers, ["planning", "klantcontact"]) &&
    hasAnyTool(answers, ["crm", "whatsapp", "whatsapp-chat", "agenda-planning", "projectmanagement"]) &&
    ["verbeteren", "snel-beter"].includes(answers.urgency)
  ) {
    return "agents";
  }

  if (
    hasAnySelectedProcess(answers, ["content"]) &&
    hasAnyTool(answers, ["social-media", "canva-design", "emailmarketing", "meta-google-ads"])
  ) {
    return selectedToolCount <= 1 && answers.aiUsage === "nog-niet" ? "audit" : "integrations";
  }

  if (hasMultipleTools(answers)) {
    return "integrations";
  }

  if (answers.tools.includes("anders-geen")) {
    return "audit";
  }

  return "integrations";
}

export function getPrimaryService(result) {
  return getRecommendedNextStep(result);
}

export function getSecondaryService(result) {
  const primaryService = getPrimaryService(result);

  if (primaryService === "audit" && hasMultipleTools(result.answers)) {
    return "integrations";
  }

  if (primaryService === "integrations" && hasAnySelectedProcess(result.answers, ["planning", "klantcontact"])) {
    return "agents";
  }

  if (primaryService === "agents") {
    return "integrations";
  }

  return null;
}

export function getOpportunityLabel(result) {
  return getMainAiOpportunity(result);
}

function getRecommendationExplanation(title) {
  return RECOMMENDATION_EXPLANATIONS[title] || "Deze stap kan het proces sneller, consistenter en minder handmatig maken.";
}

export function getRecommendations(result) {
  const timeOpportunity = getTimeOpportunity(result.answers);
  const impactRanges = [
    [Math.max(0.5, roundToHalf(timeOpportunity.low * 0.34)), Math.max(0.5, roundToHalf(timeOpportunity.high * 0.44))],
    [Math.max(0.5, roundToHalf(timeOpportunity.low * 0.24)), Math.max(0.5, roundToHalf(timeOpportunity.high * 0.34))],
    [Math.max(0.5, roundToHalf(timeOpportunity.low * 0.18)), Math.max(0.5, roundToHalf(timeOpportunity.high * 0.28))],
  ];

  return getOpportunityBullets(result).map((title, index) => {
    const [low, high] = impactRanges[index];

    return {
      title,
      why: getRecommendationExplanation(title),
      implementationType: SERVICE_LABELS[result.routing.primaryService],
      complexity: result.routing.primaryService === "audit" ? "Laag" : result.routing.primaryService === "agents" ? "Hoog" : "Middel",
      service: result.routing.primaryService,
      serviceLabel: SERVICE_LABELS[result.routing.primaryService],
      impactHoursLow: low,
      impactHoursHigh: high,
      impactLabel: formatImpactRange(low, high),
    };
  });
}

export function getCTA(result) {
  const primaryService = getPrimaryService(result);
  const secondaryService = getSecondaryService(result);
  const urgencyCta = CTA_BY_URGENCY[result.answers.urgency] || CTA_BY_URGENCY.verbeteren;

  return {
    primaryService,
    secondaryService,
    auditOverride: primaryService === "audit",
    recommendedCTA: urgencyCta.ctaType,
    recommendedPlanType:
      primaryService === "audit"
        ? "analyse-en-prioritering"
        : primaryService === "agents"
          ? "agentflow-ontwerp"
          : primaryService === "optimization" || primaryService === "advice"
            ? "gerichte-optimalisatie"
            : "gerichte-implementatie",
    buttonLabel: urgencyCta.label,
    primaryButtonLabel: urgencyCta.label,
    emailFollowUpAfterDays: urgencyCta.emailFollowUpAfterDays,
    showPhone: urgencyCta.showPhone,
    phonePending: urgencyCta.ctaType === "intake" || urgencyCta.ctaType === "direct",
    href: "#quickscan-contact",
    body:
      primaryService === "audit"
        ? "Een eerste contactgesprek helpt scherp krijgen waar de meeste tijd weglekt en welke quick wins realistisch zijn."
        : primaryService === "agents"
          ? "Een eerste contactgesprek helpt toetsen of een agentflow past bij de huidige tools, opvolging en overdracht."
          : primaryService === "optimization" || primaryService === "advice"
            ? "Een eerste contactgesprek helpt bepalen waar optimalisatie nog zinvol is zonder het bestaande proces onnodig te verstoren."
            : "Een eerste contactgesprek helpt bepalen welke koppeling of automatisering het meest logisch is.",
    auditPrompt: "Als je eerst meer scherpte of prioritering wilt, is een AI Audit de logische vervolgstap.",
    microcopy: "Eerste contactgesprek · Online of op locatie · Rustige verkenning van scope, proces en passende vervolgstap",
  };
}

function getReadinessLabel(result) {
  return SERVICE_LABELS[result.routing.primaryService] || "Vervolgstap bepalen";
}

export function buildSubmissionPayload(result, contact) {
  const submittedAt = new Date().toISOString();
  const score = result.score || getQuickscanScoreResult(result.answers, { logErrors: true });

  return {
    answers: result.answers,
    primaryConclusion: result.primaryConclusion,
    timeOpportunity: result.timeOpportunity,
    moneyOpportunity: result.moneyOpportunity,
    mainAiOpportunity: result.mainAiOpportunity,
    opportunityBullets: result.opportunityBullets,
    recommendedNextStep: result.recommendedNextStep,
    ctaType: result.ctaType,
    savings: result.savings,
    diagnosis: {
      processLabel: PROCESS_LABELS[result.answers.processType] || "",
      processLabels: getProcessLabelList(result.answers),
      painPointLabel: PAIN_POINT_LABELS[result.answers.painPoint] || "",
      aiUsageLabel: AI_USAGE_LABELS[result.answers.aiUsage] || "",
      aiIssueLabel: AI_FOLLOWUP_LABELS[result.answers.aiIssue] || "",
      urgencyLabel: URGENCY_LABELS[result.answers.urgency] || "",
      toolLabels: result.answers.tools.map((tool) => TOOL_LABELS[tool] || tool),
      hourlyValueLabel: result.savings.hourlyValue.label,
      summary: result.diagnosis.summary,
      readinessLabel: result.diagnosis.readinessLabel,
      opportunityLabel: result.opportunityLabel,
    },
    recommendations: result.recommendations,
    routing: result.routing,
    score,
    contact: {
      name: contact.name.trim(),
      companyName: contact.companyName?.trim() || result.answers.companyName || "",
      email: contact.email.trim(),
      marketingOptIn: contact.marketingOptIn,
    },
    meta: {
      submittedAt,
      source: "quickscan-preview",
      version: QUICKSCAN_VERSION,
    },
  };
}

export function createQuickscanResult(answers, scenarioKey = "gemiddeld") {
  const normalizedProcessTypes = Array.isArray(answers.processTypes)
    ? answers.processTypes
    : answers.processType
      ? [answers.processType]
      : [];
  const normalizedAnswers = {
    name: answers.name || "",
    companyName: answers.companyName || "",
    processTypes: normalizedProcessTypes,
    processType: normalizedProcessTypes[0] || "",
    painPoint: answers.painPoint || "",
    weeklyHours: answers.weeklyHours || "",
    hourlyValueRange: answers.hourlyValueRange || "",
    hourlyValueManual: answers.hourlyValueManual || "",
    tools: Array.isArray(answers.tools) ? answers.tools : [],
    aiUsage: answers.aiUsage || "",
    aiIssue: answers.aiIssue || "",
    urgency: answers.urgency || "",
  };

  const baseResult = {
    answers: normalizedAnswers,
  };
  const routing = getCTA(baseResult);
  const resultContext = { ...baseResult, routing };
  const score = getQuickscanScoreResult(normalizedAnswers);
  const timeOpportunity = getTimeOpportunity(normalizedAnswers);
  const savings = getSavingsRange(normalizedAnswers, scenarioKey);
  const moneyOpportunity = {
    monthlyLow: savings.monthlyLow,
    monthlyHigh: savings.monthlyHigh,
    monthlyLabel: savings.monthlyLabel,
    yearlyLow: savings.yearlyLow,
    yearlyHigh: savings.yearlyHigh,
    yearlyLabel: savings.yearlyLabel,
    hourlyValue: savings.hourlyValue,
  };
  const mainAiOpportunity = getMainAiOpportunity(resultContext);
  const opportunityBullets = getOpportunityBullets(resultContext);
  const primaryConclusion = getPrimaryConclusion(resultContext);
  const diagnosis = {
    summary: getConclusionSummary(resultContext),
    readinessLabel: getReadinessLabel(resultContext),
  };
  const recommendations = getRecommendations(resultContext);

  return {
    answers: normalizedAnswers,
    primaryConclusion,
    timeOpportunity,
    moneyOpportunity,
    mainAiOpportunity,
    opportunityBullets,
    recommendedNextStep: routing.primaryService,
    ctaType: routing.recommendedCTA,
    savings,
    diagnosis,
    recommendations,
    routing,
    score,
    opportunityLabel: mainAiOpportunity,
    processLabel: PROCESS_LABELS[getFocusProcessType(normalizedAnswers)] || "",
    processLabels: getProcessLabelList(normalizedAnswers),
    hero: {
      headline: primaryConclusion,
      summary: diagnosis.summary,
    },
  };
}
