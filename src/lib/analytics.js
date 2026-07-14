const EVENT_PROPERTY_ALLOWLIST = {
  cta_click: ["ctaType", "primaryService", "secondaryService"],
  footer_quickscan_click: ["location"],
  form_start: ["formId", "formKind"],
  form_submit_attempt: ["formId", "formKind"],
  form_submit_failed: ["formId", "formKind", "skipped", "errorClass"],
  form_submit_success: ["formId", "formKind"],
  home_cta_quickscan_click: ["location"],
  home_hero_quickscan_click: ["location"],
  nav_quickscan_click: ["location"],
  optin_toggle: ["checked"],
  scan_complete: ["submissionStatus", "attempts"],
  scan_start: ["version"],
  spam_honeypot_blocked: ["form", "formId", "formKind"],
  step_view: ["stepId"],
};

function normalizeValue(value) {
  if (typeof value === "boolean") return value;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") return value.trim().slice(0, 120);
  return undefined;
}

function normalizePayload(eventName, payload = {}) {
  const allowedProperties = EVENT_PROPERTY_ALLOWLIST[eventName] || [];

  return Object.fromEntries(
    allowedProperties
      .map((property) => [property, normalizeValue(payload[property])])
      .filter(([, value]) => value !== undefined && value !== ""),
  );
}

export function trackEvent(eventName, payload = {}) {
  if (!eventName || typeof window === "undefined" || !EVENT_PROPERTY_ALLOWLIST[eventName]) {
    return;
  }

  const detail = normalizePayload(eventName, payload);

  window.dispatchEvent(new CustomEvent("starleo:analytics", { detail: { event: eventName, ...detail } }));

  if (typeof window.plausible === "function") {
    window.plausible(eventName, { props: detail });
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...detail });
  }

  if (import.meta.env.DEV && import.meta.env.VITE_ANALYTICS_DEBUG === "true") {
    console.info("[analytics]", eventName, detail);
  }
}
