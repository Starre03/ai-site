import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const WEEKLY_HOURS_LABELS: Record<string, string> = {
  "<2": "Minder dan 2 uur",
  "2-5": "2-5 uur",
  "5-10": "5-10 uur",
  "10-20": "10-20 uur",
  "20-50": "20-50 uur",
  "50+": "50 uur of meer",
};

const SERVICE_LABELS: Record<string, string> = {
  audit: "AI Audit",
  integrations: "AI Integraties",
  agents: "AI Agents / OpenClaw",
  optimization: "Gerichte optimalisatie",
  advice: "Strategisch advies",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function buildAiAnalysis(payload: any) {
  return {
    opening: payload.primaryConclusion || "",
    kosten: payload.moneyOpportunity?.monthlyLabel || "",
    aanbeveling: payload.recommendedNextStep || "",
    websiteInzicht: payload.mainAiOpportunity || "",
  };
}

function buildLabeledValue(key?: string, label?: string) {
  if (!key && !label) {
    return null;
  }

  return {
    key: key || "",
    label: label || "",
  };
}

function buildToolEntries(payload: any) {
  const keys = Array.isArray(payload.answers?.tools) ? payload.answers.tools : [];
  const labels = Array.isArray(payload.diagnosis?.toolLabels) ? payload.diagnosis.toolLabels : [];

  return keys.map((key: string, index: number) => ({
    key,
    label: labels[index] || key,
  }));
}

function resolveHourlyValueDetails(payload: any) {
  const manualValue = Number.parseFloat(payload.answers?.hourlyValueManual);
  const explicitLabel = payload.diagnosis?.hourlyValueLabel || payload.moneyOpportunity?.hourlyValue?.label || null;
  const explicitBucket = payload.moneyOpportunity?.hourlyValue?.label || null;

  if (Number.isFinite(manualValue) && manualValue > 0) {
    return {
      value: manualValue,
      mode: "manual",
      bucket: explicitBucket,
      label: `€${Math.round(manualValue)}`,
    };
  }

  const rangeValue = payload.moneyOpportunity?.hourlyValue;
  const low = Number(rangeValue?.low);
  const high = Number(rangeValue?.high);

  if (Number.isFinite(low) && Number.isFinite(high) && low > 0 && high > 0) {
    return {
      value: (low + high) / 2,
      mode: "range",
      bucket: explicitBucket,
      label: explicitLabel,
    };
  }

  return {
    value: null,
    mode: null,
    bucket: null,
    label: explicitLabel,
  };
}

function buildAnswersJson(payload: any, hourlyValue: any, toolEntries: Array<{ key: string; label: string }>) {
  const answers = payload.answers || {};

  return {
    processType: buildLabeledValue(answers.processType, payload.diagnosis?.processLabel),
    painPoint: buildLabeledValue(answers.painPoint, payload.diagnosis?.painPointLabel),
    weeklyHours: buildLabeledValue(
      answers.weeklyHours,
      WEEKLY_HOURS_LABELS[answers.weeklyHours] || answers.weeklyHours || "",
    ),
    hourlyValue: {
      mode: hourlyValue.mode,
      bucket: hourlyValue.bucket,
      label: hourlyValue.label,
      value: hourlyValue.value,
    },
    tools: toolEntries,
    aiUsage: buildLabeledValue(answers.aiUsage, payload.diagnosis?.aiUsageLabel),
    aiIssue: buildLabeledValue(answers.aiIssue, payload.diagnosis?.aiIssueLabel),
    urgency: buildLabeledValue(answers.urgency, payload.diagnosis?.urgencyLabel),
  };
}

function buildAnalysisJson(payload: any) {
  const nextStepKey = payload.recommendedNextStep || "";
  const nextStepLabel = SERVICE_LABELS[nextStepKey] || nextStepKey;

  return {
    summary: {
      primaryConclusion: payload.primaryConclusion || "",
      summaryText: payload.diagnosis?.summary || "",
      mainAiOpportunity: payload.mainAiOpportunity || "",
      recommendedNextStep: nextStepLabel,
      opportunityBullets: payload.opportunityBullets || [],
    },
    money: {
      monthlyLow: payload.score?.monthly_savings_low ?? payload.moneyOpportunity?.monthlyLow ?? null,
      monthlyHigh: payload.score?.monthly_savings_high ?? payload.moneyOpportunity?.monthlyHigh ?? null,
      monthlyLabel: payload.moneyOpportunity?.monthlyLabel || "",
      yearlyLow: payload.moneyOpportunity?.yearlyLow ?? null,
      yearlyHigh: payload.moneyOpportunity?.yearlyHigh ?? null,
      yearlyLabel: payload.moneyOpportunity?.yearlyLabel || "",
      hourlyValue: payload.moneyOpportunity?.hourlyValue || null,
    },
    cta: {
      type: payload.ctaType || "",
      nextStepLabel,
      buttonLabel: payload.routing?.primaryButtonLabel || payload.routing?.buttonLabel || "",
      body: payload.routing?.body || "",
      microcopy: payload.routing?.microcopy || "",
      showPhone: Boolean(payload.routing?.showPhone),
    },
    diagnosis: payload.diagnosis || {},
    recommendations: payload.recommendations || [],
    routing: payload.routing || {},
    aiAnalysis: buildAiAnalysis(payload),
  };
}

function mapPayloadToRow(payload: any) {
  const answers = payload.answers || {};
  const hourlyValue = resolveHourlyValueDetails(payload);
  const toolEntries = buildToolEntries(payload);
  const nextStepKey = payload.recommendedNextStep || null;
  const nextStepLabel = nextStepKey ? SERVICE_LABELS[nextStepKey] || nextStepKey : null;

  return {
    name: payload.contact?.name || "",
    company_name: payload.contact?.companyName || "",
    email: payload.contact?.email || "",
    marketing_opt_in: Boolean(payload.contact?.marketingOptIn),
    website_url: payload.contact?.websiteUrl || null,
    scan_completed: true,
    analysis_version: 1,
    process_type: answers.processType || null,
    process_label: payload.diagnosis?.processLabel || "",
    pain_point: answers.painPoint || null,
    pain_point_label: payload.diagnosis?.painPointLabel || "",
    weekly_hours: answers.weeklyHours || null,
    weekly_hours_label: WEEKLY_HOURS_LABELS[answers.weeklyHours] || answers.weeklyHours || "",
    hourly_value: hourlyValue.value,
    hourly_value_input_mode: hourlyValue.mode,
    hourly_value_bucket: hourlyValue.bucket,
    hourly_value_label: hourlyValue.label,
    tool_keys: toolEntries.map((entry) => entry.key),
    ai_usage: answers.aiUsage || null,
    ai_usage_label: payload.diagnosis?.aiUsageLabel || "",
    ai_issue: answers.aiIssue || null,
    ai_issue_label: payload.diagnosis?.aiIssueLabel || "",
    urgency: answers.urgency || null,
    urgency_label: payload.diagnosis?.urgencyLabel || "",
    recommended_next_step: nextStepLabel,
    main_ai_opportunity: payload.mainAiOpportunity || null,
    total_score: payload.score?.total_score ?? null,
    classification: payload.score?.classification ?? null,
    monthly_savings_low: payload.score?.monthly_savings_low ?? payload.moneyOpportunity?.monthlyLow ?? null,
    monthly_savings_high: payload.score?.monthly_savings_high ?? payload.moneyOpportunity?.monthlyHigh ?? null,
    answers: buildAnswersJson(payload, hourlyValue, toolEntries),
    analysis: buildAnalysisJson(payload),
    score_data: payload.score || {},
    source: payload.meta?.source || "quickscan-preview",
    version: payload.meta?.version || null,
  };
}

function validatePayload(payload: any) {
  const missing = [
    !payload?.contact?.name?.trim() && "contact.name",
    !payload?.contact?.companyName?.trim() && "contact.companyName",
    !payload?.contact?.email?.trim() && "contact.email",
    !payload?.answers?.processType && "answers.processType",
    !payload?.answers?.painPoint && "answers.painPoint",
    !payload?.answers?.weeklyHours && "answers.weeklyHours",
    !payload?.answers?.aiUsage && "answers.aiUsage",
    !payload?.answers?.urgency && "answers.urgency",
  ].filter(Boolean);

  return {
    valid: missing.length === 0,
    missing,
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const payload = await req.json();
    const validation = validatePayload(payload);

    if (!validation.valid) {
      return jsonResponse(
        {
          error: "Invalid payload",
          missing: validation.missing,
        },
        400,
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") || Deno.env.get("LOCAL_SUPABASE_URL");
    const serviceRoleKey =
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("LOCAL_SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      return jsonResponse({ error: "Missing Supabase function environment" }, 500);
    }

    const serviceClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const row = mapPayloadToRow(payload);
    const { data, error } = await serviceClient
      .from("quickscan_submissions")
      .insert(row)
      .select("id")
      .single();

    if (error) {
      console.error("[quickscan-submit] insert failed", error);
      return jsonResponse({ error: "Insert failed" }, 500);
    }

    return jsonResponse({
      ok: true,
      id: data?.id || null,
    });
  } catch (error) {
    console.error("[quickscan-submit] unexpected error", error);
    return jsonResponse({ error: "Unexpected function error" }, 500);
  }
});
