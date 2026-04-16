function getSubmissionSource() {
  if (typeof window === "undefined") {
    return "website";
  }

  const hostname = window.location.hostname;

  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.startsWith("192.168.") ||
    hostname.startsWith("10.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname)
  ) {
    return "website-local";
  }

  if (hostname.endsWith(".vercel.app")) {
    return "website-preview";
  }

  return "website";
}

export function buildIntakeSubmissionPayload({ formId, formKind = "intake", preferredRoute, steps, answers }) {
  const normalizedAnswers = answers || {};

  return {
    formId,
    formKind,
    preferredRoute: preferredRoute || normalizedAnswers.route || null,
    contact: {
      name: String(normalizedAnswers.name || "").trim(),
      companyName: String(normalizedAnswers.company || "").trim(),
      email: String(normalizedAnswers.email || "").trim(),
      phone: String(normalizedAnswers.phone || "").trim(),
    },
    answers: normalizedAnswers,
    meta: {
      submittedAt: new Date().toISOString(),
      source: getSubmissionSource(),
      pagePath: typeof window !== "undefined" ? window.location.pathname : "",
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      stepCount: Array.isArray(steps) ? steps.length : 0,
    },
  };
}
