import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
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

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePayload(payload: any) {
  const missing = [
    !payload?.contact?.name?.trim() && "contact.name",
    !payload?.contact?.companyName?.trim() && "contact.companyName",
    !payload?.contact?.email?.trim() && "contact.email",
    !payload?.answers && "answers",
  ].filter(Boolean);

  if (payload?.contact?.email && !isValidEmail(String(payload.contact.email).trim())) {
    missing.push("contact.email_invalid");
  }

  if (payload?.formKind === "contact" && !String(payload?.answers?.message || "").trim()) {
    missing.push("answers.message");
  }

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
    const { data, error } = await serviceClient.from("intake_submissions").insert(row).select("id").single();

    if (error) {
      console.error("[intake-submit] insert failed", error);
      return jsonResponse({ error: "Insert failed" }, 500);
    }

    return jsonResponse({
      ok: true,
      id: data?.id || null,
    });
  } catch (error) {
    console.error("[intake-submit] unexpected error", error);
    return jsonResponse({ error: "Unexpected function error" }, 500);
  }
});
