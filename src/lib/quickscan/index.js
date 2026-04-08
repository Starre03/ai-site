import {
  AI_SCORES,
  DIMENSION_LEAK_LIBRARY,
  DIMENSION_META,
  DISCLAIMER_TEXT,
  HOUR_MAP,
  LEAK_LIBRARY,
  LIMITATIONS_TEXT,
  PAIN_POINT_LABELS,
  QUICKSCAN_VERSION,
  SAVINGS_SCENARIOS,
  SCORE_COPY,
  SERVICE_LABELS,
  SERVICE_SUMMARIES,
  TEAM_SCORES,
  TIME_SCORES,
  WORK_FOCUS_SCORES,
} from "./config.js";

const HOURLY_RATE = 55;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

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

function getLevelFromValue(value) {
  if (value <= 8) {
    return "Low";
  }

  if (value <= 16) {
    return "Mid";
  }

  return "High";
}

export function quickscanLog(event, payload = {}) {
  console.log(
    JSON.stringify({
      event,
      ...payload,
    }),
  );
}

export function calculateDimensions(answers) {
  let D1 = 0;
  let D2 = 0;
  let D3 = 0;
  let D4 = 0;

  const teamScore = TEAM_SCORES[answers.teamSize] || {};
  D1 += teamScore.d1 || 0;
  D4 += teamScore.d4 || 0;

  D1 += TIME_SCORES[answers.weeklyHours] || 0;

  const selectedTools = Array.isArray(answers.tools) ? answers.tools : [];
  const toolCount = selectedTools.filter((tool) => tool !== "geen").length;
  D2 += Math.min(toolCount * 3, 18);

  if (selectedTools.includes("crm")) {
    D2 += 2;
  }

  if (selectedTools.includes("boekhouden")) {
    D2 += 2;
  }

  if (selectedTools.length === 0 || selectedTools.includes("geen")) {
    D2 += 1;
  }

  D2 = Math.min(D2, 25);

  D3 += AI_SCORES[answers.aiUsage] || 0;

  const workFocusScore = WORK_FOCUS_SCORES[answers.workFocus] || {};
  D4 += workFocusScore.d4 || 0;

  D4 += 3;

  return {
    D1: Math.min(D1, 25),
    D2: Math.min(D2, 25),
    D3: Math.min(D3, 25),
    D4: Math.min(D4, 25),
  };
}

export function calculateTotalScore(dimensions) {
  return clamp(dimensions.D1 + dimensions.D2 + dimensions.D3 + dimensions.D4, 20, 85);
}

export function getTier(total) {
  if (total <= 30) {
    return { key: "startfase", label: "Startfase" };
  }

  if (total <= 55) {
    return { key: "bewust", label: "Bewust" };
  }

  if (total <= 75) {
    return { key: "klaar", label: "Klaar voor actie" };
  }

  return { key: "voorloper", label: "Voorloper" };
}

export function getDimensionInterpretations(dimensions) {
  return Object.entries(dimensions).map(([key, value]) => {
    const level = getLevelFromValue(value);
    const copyKey = level === "Low" ? "low" : level === "Mid" ? "mid" : "high";

    return {
      key,
      value,
      level,
      label: DIMENSION_META[key].label,
      interpretation: DIMENSION_META[key][copyKey],
    };
  });
}

export function getSavingsRange(answers, scenarioKey) {
  const scenario = SAVINGS_SCENARIOS[scenarioKey] || SAVINGS_SCENARIOS.gemiddeld;
  const weeklyHours = HOUR_MAP[answers.weeklyHours] || 0;
  const weeklyLow = roundToHalf(weeklyHours * scenario.low);
  const weeklyHigh = roundToHalf(weeklyHours * scenario.high);
  const monthlyLow = roundToTens(weeklyHours * HOURLY_RATE * scenario.low * 4.33);
  const monthlyHigh = roundToTens(weeklyHours * HOURLY_RATE * scenario.high * 4.33);
  const formulaText = `Berekening: ~${formatHoursNumber(weeklyHours)} uur/week × €55/u × ${Math.round(
    scenario.low * 100,
  )}-${Math.round(scenario.high * 100)}% × 4,33`;

  return {
    scenario: scenarioKey,
    scenarioLabel: scenario.label,
    percentage: scenario.percentage,
    weeklyHours,
    weeklyLow,
    weeklyHigh,
    weeklySavingsLabel: formatImpactRange(weeklyLow, weeklyHigh),
    hourlyRate: HOURLY_RATE,
    monthlyLow,
    monthlyHigh,
    formulaText,
    limitationsText: LIMITATIONS_TEXT,
    disclaimerText: DISCLAIMER_TEXT,
  };
}

function isAgentWorkflow(result) {
  const toolCount = (result.answers.tools || []).filter((tool) => tool !== "geen").length;
  const agentPainPoint = ["losse-emails", "leads-opvolging", "planning-vast"].includes(result.answers.painPoint);
  const agentWorkFocus = result.answers.workFocus === "intake-planning-opvolging";

  return (
    result.score.total >= 68 &&
    result.score.D2 >= 12 &&
    result.score.D3 >= 12 &&
    result.score.D4 >= 12 &&
    toolCount >= 3 &&
    (agentPainPoint || agentWorkFocus)
  );
}

function shouldAuditOverride(result) {
  return (
    result.score.total < 60 ||
    result.answers.painPoint === "meerdere-dingen" ||
    result.score.D2 <= 8 ||
    result.score.D3 <= 8
  );
}

export function getPrimaryService(result) {
  if (shouldAuditOverride(result)) {
    return "audit";
  }

  if (isAgentWorkflow(result)) {
    return "agents";
  }

  return "integrations";
}

export function getSecondaryService(result) {
  const primaryService = getPrimaryService(result);
  const toolCount = (result.answers.tools || []).filter((tool) => tool !== "geen").length;
  const workflowHeavyPainPoint = ["losse-emails", "leads-opvolging", "planning-vast"].includes(result.answers.painPoint);

  if (primaryService === "audit") {
    if (workflowHeavyPainPoint && toolCount >= 2) {
      return "agents";
    }

    if (result.answers.painPoint !== "meerdere-dingen") {
      return "integrations";
    }

    return null;
  }

  if (primaryService === "agents") {
    return "integrations";
  }

  if (toolCount >= 4 && workflowHeavyPainPoint) {
    return "agents";
  }

  return "audit";
}

export function getOpportunityLabel(result) {
  switch (result.answers.painPoint) {
    case "losse-emails":
      return "Inboxverwerking verbeteren";
    case "handmatige-admin":
      return "Administratie stroomlijnen";
    case "data-rapportage":
      return "Rapportage versnellen";
    case "content-blijft-liggen":
      return "Contentproces versnellen";
    case "leads-opvolging":
      return "Leadopvolging verbeteren";
    case "campagnes-tijd":
      return "Campagnes slimmer uitvoeren";
    case "documenten-dossiers":
      return "Documentverwerking versnellen";
    case "planning-vast":
      return "Planning stroomlijnen";
    default:
      return "Proces eerst scherpstellen";
  }
}

export function getCTA(result) {
  const primaryService = getPrimaryService(result);
  const secondaryService = getSecondaryService(result);
  const auditOverride = shouldAuditOverride(result);
  const recommendedPlanType =
    primaryService === "audit"
      ? "analyse-en-prioritering"
      : primaryService === "agents"
        ? "agentflow-ontwerp"
        : "gerichte-implementatie";

  return {
    primaryService,
    secondaryService,
    auditOverride,
    recommendedCTA: "quickscan-contact",
    recommendedPlanType,
    buttonLabel: "Neem contact met ons op",
    href: "#quickscan-contact",
    body:
      primaryService === "audit"
        ? "Een eerste contactgesprek helpt bepalen welk proces eerst moet worden uitgewerkt en of een AI Audit nu de juiste stap is."
        : primaryService === "agents"
          ? "Een eerste contactgesprek helpt toetsen of een agentflow met AI Agents / OpenClaw past bij de huidige systemen en het proces."
          : "Een eerste contactgesprek helpt bepalen welk proces het meest geschikt is voor een gerichte AI-integratie.",
    auditPrompt:
      "Als je eerst meer scherpte, onderbouwing of prioritering wilt, is een AI Audit de logische vervolgstap.",
    microcopy:
      "Eerste contactgesprek · Online of op locatie · Rustige verkenning van scope, proces en passende vervolgstap",
  };
}

export function getTopLeaks(result) {
  const weeklyHours = HOUR_MAP[result.answers.weeklyHours] || 0;
  const baseLeak = LEAK_LIBRARY[result.answers.painPoint] || LEAK_LIBRARY["meerdere-dingen"];
  const lowestDimensions = Object.entries(result.dimensions)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 2)
    .map(([key]) => key);

  const impactRanges = [
    [Math.max(0.5, roundToHalf(weeklyHours * 0.28)), Math.max(1, roundToHalf(weeklyHours * 0.42))],
    [Math.max(0.5, roundToHalf(weeklyHours * 0.18)), Math.max(1, roundToHalf(weeklyHours * 0.28))],
    [Math.max(0.5, roundToHalf(weeklyHours * 0.12)), Math.max(1, roundToHalf(weeklyHours * 0.2))],
  ];

  const items = [
    {
      key: result.answers.painPoint,
      title: baseLeak.title,
      problem: baseLeak.problem,
      why: baseLeak.why,
    },
    ...lowestDimensions.map((dimension) => ({
      key: dimension,
      title: DIMENSION_LEAK_LIBRARY[dimension].title,
      problem: DIMENSION_LEAK_LIBRARY[dimension].problem,
      why: DIMENSION_LEAK_LIBRARY[dimension].why,
    })),
  ];

  return items.map((item, index) => {
    const [low, high] = impactRanges[index];

    return {
      ...item,
      impactHoursLow: low,
      impactHoursHigh: high,
      impactLabel: formatImpactRange(low, high),
    };
  });
}

function getRecommendationTemplates(primaryService, painPoint) {
  const baseService = primaryService === "audit" ? "audit" : primaryService === "agents" ? "agents" : "integrations";
  const baseType =
    primaryService === "audit"
      ? "AI Audit"
      : primaryService === "agents"
        ? "AI Agents / OpenClaw"
        : "AI Integratie";

  const processRecommendations = {
    "losse-emails": [
      ["Inbox prioriteren", "AI kan berichten sneller ordenen op urgentie, onderwerp en vervolgstap."],
      ["Antwoorden voorbereiden", "Conceptreacties besparen tijd op terugkerende vragen en standaardreacties."],
      ["Doorzetten en labelen", "Berichten kunnen direct naar de juiste persoon of status worden gezet."],
    ],
    "handmatige-admin": [
      ["Gegevens overnemen", "Terugkerende invoer kan sneller uit documenten, mails of formulieren worden gehaald."],
      ["Controles versnellen", "AI kan afwijkingen of ontbrekende velden eerder signaleren."],
      ["Status bijwerken", "Terugkerende updates in systemen kosten minder handmatig werk."],
    ],
    "data-rapportage": [
      ["Data samenbrengen", "Bronnen kunnen sneller worden gecombineerd tot één werkbaar overzicht."],
      ["Rapporten voorbereiden", "Terugkerende samenvattingen en eerste analyses zijn sneller beschikbaar."],
      ["Afwijkingen signaleren", "AI kan sneller patronen, uitzonderingen en open acties markeren."],
    ],
    "content-blijft-liggen": [
      ["Briefing uitwerken", "Van input naar een duidelijke contentopzet kost minder handmatig uitzoekwerk."],
      ["Concepten opstellen", "Eerste versies voor posts, mails of pagina's zijn sneller klaar."],
      ["Publicatie voorbereiden", "Varianten, aanpassingen en kanaalspecifieke versies kosten minder tijd."],
    ],
    "leads-opvolging": [
      ["Leads prioriteren", "AI kan sneller bepalen welke aanvragen eerst aandacht nodig hebben."],
      ["Opvolging voorbereiden", "Conceptmails, samenvattingen en next steps kunnen direct klaarstaan."],
      ["CRM bijwerken", "Gegevens en contactmomenten kunnen consistenter worden vastgelegd."],
    ],
    "campagnes-tijd": [
      ["Campagnes opzetten", "Briefings, formats en eerste varianten zijn sneller voorbereid."],
      ["Varianten maken", "Aanpassingen per doelgroep of kanaal kosten minder handmatig werk."],
      ["Resultaten samenvatten", "AI kan prestaties sneller vertalen naar een eerste overzicht."],
    ],
    "documenten-dossiers": [
      ["Documenten uitlezen", "Belangrijke gegevens zijn sneller uit offertes, pdf's of dossiers gehaald."],
      ["Samenvatten", "Lange documenten kunnen direct worden teruggebracht tot de kern."],
      ["Aanvullen en controleren", "Terugkerende controles en vergelijkingen kosten minder tijd."],
    ],
    "planning-vast": [
      ["Afspraken plannen", "Beschikbaarheid en voorstellen kunnen sneller worden verwerkt."],
      ["Wijzigingen verwerken", "Verzetten, bevestigen en afstemmen kost minder handmatig schakelen."],
      ["Terugkoppeling versturen", "Updates naar klanten of collega's kunnen direct worden voorbereid."],
    ],
    "meerdere-dingen": [
      ["Proces in kaart", "Eerst scherp krijgen waar de meeste tijd en fouten nu echt ontstaan."],
      ["Focus aanbrengen", "Een eerste use case kiezen voorkomt versnippering in de aanpak."],
      ["Prioriteit bepalen", "Beter eerst één route kiezen dan op meerdere plekken tegelijk starten."],
    ],
  };

  return (processRecommendations[painPoint] || processRecommendations["meerdere-dingen"]).map(([title, why]) => ({
    title,
    why,
    implementationType: baseType,
    complexity: primaryService === "agents" ? "Hoog" : primaryService === "audit" ? "Laag" : "Middel",
    service: baseService,
  }));
}

export function getRecommendations(result) {
  const primaryService = getPrimaryService(result);
  const weeklyHours = HOUR_MAP[result.answers.weeklyHours] || 0;
  const impactRanges = [
    [Math.max(0.5, roundToHalf(weeklyHours * 0.18)), Math.max(1, roundToHalf(weeklyHours * 0.28))],
    [Math.max(0.5, roundToHalf(weeklyHours * 0.12)), Math.max(1, roundToHalf(weeklyHours * 0.22))],
    [Math.max(0.5, roundToHalf(weeklyHours * 0.08)), Math.max(1, roundToHalf(weeklyHours * 0.16))],
  ];

  return getRecommendationTemplates(primaryService, result.answers.painPoint).map((item, index) => {
    const [low, high] = impactRanges[index];

    return {
      ...item,
      impactHoursLow: low,
      impactHoursHigh: high,
      impactLabel: formatImpactRange(low, high),
      serviceLabel: SERVICE_LABELS[item.service],
    };
  });
}

function getHeroCopy(result) {
  const tierCopy = SCORE_COPY[result.score.tier.key];
  const routeKey = result.routing.primaryService;

  return {
    headline: tierCopy.headline[routeKey],
    summary: tierCopy.summary,
  };
}

function getReadinessLabel(result) {
  if (result.routing.primaryService === "audit") {
    return "Analyse eerst";
  }

  if (result.routing.primaryService === "agents") {
    return "Workflow-ready";
  }

  return "Implementatie-ready";
}

export function buildSubmissionPayload(result, contact) {
  const submittedAt = new Date().toISOString();

  return {
    answers: result.answers,
    score: {
      total: result.score.total,
      D1: result.score.D1,
      D2: result.score.D2,
      D3: result.score.D3,
      D4: result.score.D4,
      tier: result.score.tier.key,
      tierLabel: result.score.tier.label,
    },
    savings: result.savings,
    diagnosis: {
      topLeaks: result.diagnosis.topLeaks,
      summary: result.diagnosis.summary,
      readinessLabel: result.diagnosis.readinessLabel,
      opportunityLabel: result.opportunityLabel,
    },
    recommendations: result.recommendations,
    routing: result.routing,
    contact: {
      name: contact.name.trim(),
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
  const normalizedAnswers = {
    sector: answers.sector || "",
    teamSize: answers.teamSize || "",
    workFocus: answers.workFocus || "",
    weeklyHours: answers.weeklyHours || "",
    tools: Array.isArray(answers.tools) ? answers.tools : [],
    aiUsage: answers.aiUsage || "",
    painPoint: answers.painPoint || "meerdere-dingen",
  };

  const dimensions = calculateDimensions(normalizedAnswers);
  const total = calculateTotalScore(dimensions);
  const tier = getTier(total);
  const score = {
    total,
    ...dimensions,
    tier,
  };

  const baseResult = {
    answers: normalizedAnswers,
    dimensions,
    score,
  };

  const routing = getCTA(baseResult);
  const opportunityLabel = getOpportunityLabel({ ...baseResult, routing });
  const savings = getSavingsRange(normalizedAnswers, scenarioKey);
  const diagnosis = {
    topLeaks: getTopLeaks({ ...baseResult, routing }),
    summary: SERVICE_SUMMARIES[routing.primaryService],
    readinessLabel: getReadinessLabel({ ...baseResult, routing }),
  };
  const recommendations = getRecommendations({ ...baseResult, routing });
  const hero = getHeroCopy({ ...baseResult, routing });
  const dimensionInterpretations = getDimensionInterpretations(dimensions);

  return {
    answers: normalizedAnswers,
    score,
    savings,
    diagnosis,
    recommendations,
    routing,
    opportunityLabel,
    hero,
    dimensionInterpretations,
  };
}
