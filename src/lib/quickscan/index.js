import {
  AI_FOLLOWUP_LABELS,
  AI_USAGE_LABELS,
  DISCLAIMER_TEXT,
  HOUR_MAP,
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

const PROCESS_HOURLY_RATES = {
  klantcontact: 45,
  administratie: 45,
  content: 55,
  offertes: 55,
  planning: 50,
  data: 55,
};

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
    "Feedback en afstemming vertragen de uitvoering. Meer structuur kan de doorlooptijd duidelijk verkorten.",
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

function getHourlyRate(answers) {
  const rates = getSelectedProcessTypes(answers)
    .map((processType) => PROCESS_HOURLY_RATES[processType])
    .filter(Boolean);

  if (rates.length === 0) {
    return 50;
  }

  return Math.round(rates.reduce((sum, rate) => sum + rate, 0) / rates.length);
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
  const timeOpportunity = getTimeOpportunity(answers);
  const scenario = SAVINGS_SCENARIOS[scenarioKey] || SAVINGS_SCENARIOS.gemiddeld;
  const hourlyRate = getHourlyRate(answers);
  const scenarioLow = roundToHalf(timeOpportunity.potentialWeeklyHours * scenario.low);
  const scenarioHigh = roundToHalf(timeOpportunity.potentialWeeklyHours * scenario.high);
  const monthlyLow = roundToTens(scenarioLow * hourlyRate * MONTH_FACTOR);
  const monthlyHigh = roundToTens(scenarioHigh * hourlyRate * MONTH_FACTOR);
  const yearlyLow = monthlyLow * 12;
  const yearlyHigh = monthlyHigh * 12;
  const formulaText = `Berekening: ~${formatHoursNumber(scenarioLow)}-${formatHoursNumber(scenarioHigh)} uur/week × €${hourlyRate}/u × 4,33`;
  const timeInfoText = `Berekend op basis van ${formatHoursNumber(timeOpportunity.weeklyHours)} uur/week × gemiddeld uurtarief MKB (€45-55/u) × 4,3 weken`;

  return {
    scenario: scenarioKey,
    scenarioLabel: scenario.label,
    weeklyHours: timeOpportunity.weeklyHours,
    weeklyLow: scenarioLow,
    weeklyHigh: scenarioHigh,
    weeklySavingsLabel: formatImpactRange(scenarioLow, scenarioHigh),
    hourlyRate,
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

  return ranked.slice(0, 3).map((item) => item.title);
}

export function getPrimaryConclusion(result) {
  const companyName = result.answers.companyName || "je bedrijf";
  const focusLabel = PROCESS_LABELS[getFocusProcessType(result.answers)]?.toLowerCase() || "het gekozen proces";

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
      summary: result.diagnosis.summary,
      readinessLabel: result.diagnosis.readinessLabel,
      opportunityLabel: result.opportunityLabel,
    },
    recommendations: result.recommendations,
    routing: result.routing,
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
  const timeOpportunity = getTimeOpportunity(normalizedAnswers);
  const savings = getSavingsRange(normalizedAnswers, scenarioKey);
  const moneyOpportunity = {
    monthlyLow: savings.monthlyLow,
    monthlyHigh: savings.monthlyHigh,
    monthlyLabel: savings.monthlyLabel,
    yearlyLow: savings.yearlyLow,
    yearlyHigh: savings.yearlyHigh,
    yearlyLabel: savings.yearlyLabel,
    hourlyRate: savings.hourlyRate,
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
    opportunityLabel: mainAiOpportunity,
    processLabel: PROCESS_LABELS[getFocusProcessType(normalizedAnswers)] || "",
    processLabels: getProcessLabelList(normalizedAnswers),
    hero: {
      headline: primaryConclusion,
      summary: diagnosis.summary,
    },
  };
}
