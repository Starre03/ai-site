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

const DASHBOARD_URL = "https://starreai.com/admin";
const SERVICES_URL = "https://starreai.com/#diensten";
const REPLY_TO_EMAIL = "info@starreai.com";
const EMAIL_TEXT_COLOR = "#E8EEF8";
const EMAIL_SUBTEXT_COLOR = "#94A3B8";
const CTA_STYLE = [
  "display:inline-block",
  "background:#0ea5e9",
  "color:#ffffff",
  "padding:14px 28px",
  "border-radius:10px",
  "font-weight:700",
  "font-size:15px",
  "text-decoration:none",
].join(";");

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildEmailHtml({ preheader, bodyHtml }: { preheader: string; bodyHtml: string }) {
  return `<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>StarLeo</title>
  </head>
  <body style="margin:0;padding:0;background:#0B1120;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:${EMAIL_TEXT_COLOR};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
    <div style="padding:32px 16px;">
      <div style="max-width:600px;margin:0 auto;background:#111827;border-radius:16px;overflow:hidden;">
        <div style="padding:32px;color:#0ea5e9;font-size:1.3rem;font-weight:800;">StarLeo</div>
        <div style="padding:0 32px 32px;color:${EMAIL_TEXT_COLOR};font-size:15px;line-height:1.7;">
          ${bodyHtml}
        </div>
        <div style="border-top:1px solid rgba(255,255,255,0.08);padding:24px 32px;color:#64748B;font-size:12px;line-height:1.7;">
          <div>© 2026 StarLeo · starreai.com</div>
          <div>AI audit, implementatie & agents voor bedrijven</div>
        </div>
      </div>
    </div>
  </body>
</html>`;
}

function buildKeyValueRows(
  items: Array<{ label: string; value: string }>,
  valueStyle = `color:${EMAIL_TEXT_COLOR};font-size:14px;line-height:1.6;`,
) {
  return items
    .map(
      (item) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:${EMAIL_SUBTEXT_COLOR};font-size:13px;vertical-align:top;width:170px;">${escapeHtml(item.label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);${valueStyle}">${escapeHtml(item.value)}</td>
        </tr>`,
    )
    .join("");
}

function formatCurrency(value: unknown) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "—";
  }

  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(numericValue);
}

function formatSavingsRange(low: unknown, high: unknown, suffix = "") {
  const formattedLow = formatCurrency(low);
  const formattedHigh = formatCurrency(high);

  if (formattedLow === "—" && formattedHigh === "—") {
    return "—";
  }

  if (formattedLow !== "—" && formattedHigh !== "—") {
    return `${formattedLow} — ${formattedHigh}${suffix}`;
  }

  return `${formattedLow !== "—" ? formattedLow : formattedHigh}${suffix}`;
}

async function sendEmail(payload: Record<string, unknown>) {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");

  if (!resendApiKey) {
    console.error("[quickscan-submit] Missing RESEND_API_KEY; skipping email");
    return;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        reply_to: REPLY_TO_EMAIL,
      }),
    });

    if (!response.ok) {
      console.error("[quickscan-submit] Resend email failed", response.status, await response.text());
    }
  } catch (error) {
    console.error("[quickscan-submit] Resend email request failed", error);
  }
}

function buildAdminNotificationHtml(row: Record<string, unknown>) {
  return buildEmailHtml({
    preheader: `Nieuwe quickscan van ${row.name ?? ""} ontvangen`,
    bodyHtml: `
      <h1 style="margin:0 0 20px;color:${EMAIL_TEXT_COLOR};font-size:28px;line-height:1.15;">Nieuwe quickscan ontvangen</h1>
      <table style="width:100%;border-collapse:collapse;margin:0 0 28px;">
        ${buildKeyValueRows([
          { label: "Naam", value: String(row.name || "—") },
          { label: "Bedrijf", value: String(row.company_name || "—") },
          { label: "Email", value: String(row.email || "—") },
          { label: "Website", value: String(row.website_url || "—") },
        ])}
      </table>
      <h2 style="margin:0 0 14px;color:${EMAIL_TEXT_COLOR};font-size:20px;line-height:1.25;">Resultaten</h2>
      <table style="width:100%;border-collapse:collapse;margin:0 0 28px;">
        ${buildKeyValueRows([
          { label: "Aanbevolen stap", value: String(row.recommended_next_step || "—") },
          { label: "Besparing per maand", value: formatSavingsRange(row.monthly_savings_low, row.monthly_savings_high) },
          { label: "Score", value: String(row.total_score ?? "—") },
          { label: "Classificatie", value: String(row.classification || "—") },
        ])}
      </table>
      <a href="${DASHBOARD_URL}" style="${CTA_STYLE}">Bekijk in dashboard</a>
    `,
  });
}

function buildCustomerConfirmationHtml(row: Record<string, unknown>) {
  const recommendedStep = String(row.recommended_next_step || "—");
  const savingsPerMonth = formatSavingsRange(row.monthly_savings_low, row.monthly_savings_high, " per maand");
  const scoreLine = `${row.total_score ?? "—"} · ${row.classification || "—"}`;

  return buildEmailHtml({
    preheader: `Uw quickscan-resultaten voor ${row.company_name ?? ""}`,
    bodyHtml: `
      <p style="margin:0 0 18px;">Beste ${escapeHtml(row.name)},</p>
      <p style="margin:0 0 18px;">
        Bedankt voor het invullen van de AI-quickscan voor ${escapeHtml(row.company_name)}.
        We hebben uw antwoorden geanalyseerd — hieronder vindt u de belangrijkste inzichten.
      </p>
      <div style="margin:0 0 20px;padding:24px;border-radius:12px;background:rgba(14,165,233,0.08);">
        <div style="margin:0 0 12px;color:#0ea5e9;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Uw resultaat</div>
        <div style="margin:0 0 10px;color:${EMAIL_TEXT_COLOR};font-size:18px;font-weight:700;line-height:1.4;">
          Aanbevolen eerste stap: ${escapeHtml(recommendedStep)}
        </div>
        <div style="margin:0 0 8px;color:${EMAIL_TEXT_COLOR};font-size:15px;line-height:1.6;">
          Geschatte besparing: ${escapeHtml(savingsPerMonth)}
        </div>
        <div style="margin:0;color:${EMAIL_SUBTEXT_COLOR};font-size:14px;line-height:1.6;">
          Score: ${escapeHtml(scoreLine)}
        </div>
      </div>
      <p style="margin:0 0 18px;">
        Op basis van uw situatie adviseren wij te beginnen met ${escapeHtml(recommendedStep)}.
        Dit sluit het beste aan bij de processen en uitdagingen die u heeft beschreven.
      </p>
      <p style="margin:0 0 24px;">
        We nemen binnen één werkdag persoonlijk contact met u op om de mogelijkheden vrijblijvend te bespreken.
        Heeft u in de tussentijd vragen? Stuur gerust een mail naar <a href="mailto:info@starreai.com" style="color:#0ea5e9;text-decoration:none;">info@starreai.com</a>.
      </p>
      <p style="margin:0 0 24px;">
        <a href="${SERVICES_URL}" style="${CTA_STYLE}">Bekijk onze diensten</a>
      </p>
      <p style="margin:0 0 6px;">Met vriendelijke groet,</p>
      <p style="margin:0 0 6px;">Menno van der Starre</p>
      <p style="margin:0 0 6px;">StarLeo — AI audit, implementatie & agents</p>
      <p style="margin:0;"><a href="https://starreai.com" style="color:#0ea5e9;text-decoration:none;">starreai.com</a></p>
    `,
  });
}

async function sendQuickscanEmails(row: Record<string, unknown>) {
  const notificationEmail = Deno.env.get("NOTIFICATION_EMAIL");

  await Promise.allSettled([
    (async () => {
      if (!notificationEmail) {
        console.error("[quickscan-submit] Missing NOTIFICATION_EMAIL; skipping admin notification");
        return;
      }

      await sendEmail({
        from: "StarLeo Notificaties <noreply@starreai.com>",
        to: notificationEmail,
        subject: `Nieuwe quickscan: ${row.name} van ${row.company_name}`,
        html: buildAdminNotificationHtml(row),
      });
    })(),
    (async () => {
      if (!row.email) {
        console.error("[quickscan-submit] Missing recipient email; skipping confirmation");
        return;
      }

      await sendEmail({
        from: "Menno van StarLeo <noreply@starreai.com>",
        to: row.email,
        subject: `${row.name}, hier zijn uw quickscan-resultaten`,
        html: buildCustomerConfirmationHtml(row),
      });
    })(),
  ]);
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
    source: payload.meta?.source || "quickscan",
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

    await sendQuickscanEmails(row);

    return jsonResponse({
      ok: true,
      id: data?.id || null,
    });
  } catch (error) {
    console.error("[quickscan-submit] unexpected error", error);
    return jsonResponse({ error: "Unexpected function error" }, 500);
  }
});
