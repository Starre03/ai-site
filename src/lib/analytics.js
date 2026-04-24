function normalizePayload(payload = {}) {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  );
}

export function trackEvent(eventName, payload = {}) {
  if (!eventName || typeof window === "undefined") {
    return;
  }

  const detail = normalizePayload(payload);

  window.dispatchEvent(new CustomEvent("starleo:analytics", { detail: { event: eventName, ...detail } }));

  if (typeof window.plausible === "function") {
    window.plausible(eventName, { props: detail });
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...detail });
  }

  if (import.meta.env.DEV) {
    console.info("[analytics]", eventName, detail);
  }
}
