import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
};
const MAX_PAYLOAD_BYTES = 64 * 1024;
const ALLOWED_ORIGINS = new Set([
  "https://starreai.com",
  "https://www.starreai.com",
  "https://starre.ai",
  "https://www.starre.ai",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

const DASHBOARD_URL = "https://starreai.com/admin";
const QUICKSCAN_URL = "https://starreai.com/quickscan";
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

function isAllowedOrigin(origin: string | null) {
  if (!origin) return true;
  if (ALLOWED_ORIGINS.has(origin)) return true;

  try {
    const url = new URL(origin);
    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
      return ["http:", "https:"].includes(url.protocol);
    }
    return url.protocol === "https:" && url.hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

function corsForRequest(req: Request) {
  const origin = req.headers.get("origin");
  return {
    ...corsHeaders,
    "Access-Control-Allow-Origin": origin && isAllowedOrigin(origin) ? origin : "https://starreai.com",
  };
}

function jsonResponse(req: Request, body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsForRequest(req),
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

function buildKeyValueRows(items: Array<{ label: string; value: string }>) {
  return items
    .map(
      (item) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:${EMAIL_SUBTEXT_COLOR};font-size:13px;vertical-align:top;width:170px;">${escapeHtml(item.label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:${EMAIL_TEXT_COLOR};font-size:14px;line-height:1.6;">${escapeHtml(item.value)}</td>
        </tr>`,
    )
    .join("");
}

async function sendEmail(payload: Record<string, unknown>) {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");

  if (!resendApiKey) {
    console.error("[intake-submit] Missing RESEND_API_KEY; skipping email");
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
      console.error("[intake-submit] Resend email failed", response.status, await response.text());
    }
  } catch (error) {
    console.error("[intake-submit] Resend email request failed", error);
  }
}

function buildAdminNotificationHtml(row: Record<string, unknown>) {
  return buildEmailHtml({
    preheader: `Nieuw contactformulier van ${row.name ?? ""} ontvangen`,
    bodyHtml: `
      <h1 style="margin:0 0 20px;color:${EMAIL_TEXT_COLOR};font-size:28px;line-height:1.15;">Nieuw contactformulier ontvangen</h1>
      <table style="width:100%;border-collapse:collapse;margin:0 0 28px;">
        ${buildKeyValueRows([
          { label: "Naam", value: String(row.name || "—") },
          { label: "Bedrijf", value: String(row.company_name || "—") },
          { label: "Email", value: String(row.email || "—") },
          { label: "Telefoon", value: String(row.phone || "—") },
          { label: "Formuliertype", value: String(row.form_kind || "—") },
        ])}
      </table>
      <h2 style="margin:0 0 14px;color:${EMAIL_TEXT_COLOR};font-size:20px;line-height:1.25;">Bericht</h2>
      <div style="margin:0 0 28px;padding:20px;border-radius:12px;background:rgba(255,255,255,0.04);color:${EMAIL_TEXT_COLOR};font-size:14px;line-height:1.7;">
        ${escapeHtml(row.message || "—").replaceAll("\n", "<br />")}
      </div>
      <a href="${DASHBOARD_URL}" style="${CTA_STYLE}">Bekijk in dashboard</a>
    `,
  });
}

function buildCustomerConfirmationHtml(row: Record<string, unknown>) {
  return buildEmailHtml({
    preheader: `Bedankt voor uw bericht, ${row.name ?? ""}`,
    bodyHtml: `
      <p style="margin:0 0 18px;">Beste ${escapeHtml(row.name)},</p>
      <p style="margin:0 0 18px;">Bedankt voor uw bericht. Fijn dat u contact opneemt met StarLeo.</p>
      <p style="margin:0 0 18px;">
        We hebben uw aanvraag ontvangen en nemen zo spoedig mogelijk, uiterlijk binnen één werkdag,
        persoonlijk contact met u op om uw situatie te bespreken.
      </p>
      <p style="margin:0 0 24px;">
        Heeft u in de tussentijd een aanvullende vraag? Stuur gerust een mail naar <a href="mailto:info@starreai.com" style="color:#0ea5e9;text-decoration:none;">info@starreai.com</a>.
      </p>
      <p style="margin:0 0 24px;">
        <a href="${QUICKSCAN_URL}" style="${CTA_STYLE}">Start alvast de gratis quickscan</a>
      </p>
      <p style="margin:0 0 6px;">Met vriendelijke groet,</p>
      <p style="margin:0 0 6px;">Menno van der Starre</p>
      <p style="margin:0 0 6px;">StarLeo — AI audit, implementatie & agents</p>
      <p style="margin:0;"><a href="https://starreai.com" style="color:#0ea5e9;text-decoration:none;">starreai.com</a></p>
    `,
  });
}

async function sendIntakeEmails(row: Record<string, unknown>) {
  const notificationEmail = Deno.env.get("NOTIFICATION_EMAIL");

  await Promise.allSettled([
    (async () => {
      if (!notificationEmail) {
        console.error("[intake-submit] Missing NOTIFICATION_EMAIL; skipping admin notification");
        return;
      }

      await sendEmail({
        from: "StarLeo Notificaties <noreply@starreai.com>",
        to: notificationEmail,
        subject: `Nieuw contactformulier: ${row.name} van ${row.company_name}`,
        html: buildAdminNotificationHtml(row),
      });
    })(),
    (async () => {
      if (!row.email) {
        console.error("[intake-submit] Missing recipient email; skipping confirmation");
        return;
      }

      await sendEmail({
        from: "Menno van StarLeo <noreply@starreai.com>",
        to: row.email,
        subject: `Bedankt voor uw bericht, ${row.name}`,
        html: buildCustomerConfirmationHtml(row),
      });
    })(),
  ]);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePayload(payload: any) {
  const email = String(payload?.contact?.email || "").trim();
  const missing = [
    !payload?.contact?.name?.trim() && "contact.name",
    !payload?.contact?.companyName?.trim() && "contact.companyName",
    !payload?.contact?.email?.trim() && "contact.email",
    !payload?.answers && "answers",
  ].filter(Boolean);

  if (email && !isValidEmail(email)) {
    missing.push("contact.email_invalid");
  }

  if (payload?.formKind === "contact" && !String(payload?.answers?.message || "").trim()) {
    missing.push("answers.message");
  }

  if (String(payload?.contact?.name || "").length > 120) missing.push("contact.name_too_long");
  if (String(payload?.contact?.companyName || "").length > 160) missing.push("contact.companyName_too_long");
  if (email.length > 254) missing.push("contact.email_too_long");
  if (String(payload?.contact?.phone || "").length > 40) missing.push("contact.phone_too_long");
  if (String(payload?.answers?.message || payload?.answers?.notes || "").length > 4000) {
    missing.push("answers.message_too_long");
  }
  if (String(payload?.answers?.website || "").trim()) missing.push("spam_honeypot");

  return {
    valid: missing.length === 0,
    missing,
  };
}

function buildMetadata(payload: any) {
  return {
    formId: payload.formId || "",
    submittedAt: payload.meta?.submittedAt || null,
    pagePath: payload.meta?.pagePath || "",
    pageUrl: payload.meta?.pageUrl || "",
    stepCount: payload.meta?.stepCount ?? null,
  };
}

function mapPayloadToRow(payload: any) {
  const answers = payload.answers || {};

  return {
    form_kind: payload.formKind || "intake",
    source: payload.meta?.source || "website",
    page_path: payload.meta?.pagePath || null,
    page_url: payload.meta?.pageUrl || null,
    preferred_route: payload.preferredRoute || answers.route || null,
    name: String(payload.contact?.name || "").trim(),
    company_name: String(payload.contact?.companyName || "").trim(),
    email: String(payload.contact?.email || "").trim(),
    phone: String(payload.contact?.phone || "").trim() || null,
    message: String(answers.message || answers.notes || "").trim() || null,
    status: "new",
    answers,
    metadata: buildMetadata(payload),
  };
}

Deno.serve(async (req) => {
  if (!isAllowedOrigin(req.headers.get("origin"))) {
    return new Response(JSON.stringify({ error: "Origin not allowed" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsForRequest(req) });
  }

  if (req.method !== "POST") {
    return jsonResponse(req, { error: "Method not allowed" }, 405);
  }

  try {
    const contentLength = Number(req.headers.get("content-length") || 0);
    if (contentLength > MAX_PAYLOAD_BYTES) {
      return jsonResponse(req, { error: "Payload too large" }, 413);
    }

    const payload = await req.json();
    const validation = validatePayload(payload);

    if (!validation.valid) {
      return jsonResponse(
        req,
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
      return jsonResponse(req, { error: "Missing Supabase function environment" }, 500);
    }

    const serviceClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const row = mapPayloadToRow(payload);
    const { data, error } = await serviceClient.from("intake_submissions").insert(row).select("id").single();

    if (error) {
      console.error("[intake-submit] insert failed", error);
      return jsonResponse(req, { error: "Insert failed" }, 500);
    }

    await sendIntakeEmails(row);

    return jsonResponse(req, {
      ok: true,
      id: data?.id || null,
    });
  } catch (error) {
    console.error("[intake-submit] unexpected error", error);
    return jsonResponse(req, { error: "Unexpected function error" }, 500);
  }
});
