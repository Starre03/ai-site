export const DEFAULT_AUTH_REDIRECT = "/admin";

export function normalizeAuthRedirectPath(value) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return DEFAULT_AUTH_REDIRECT;
  }

  return value;
}

export function readAuthRedirectFromSearch(search) {
  return normalizeAuthRedirectPath(new URLSearchParams(search).get("next"));
}

export function buildAuthCallbackUrl(next = DEFAULT_AUTH_REDIRECT) {
  const safeNext = normalizeAuthRedirectPath(next);

  if (typeof window === "undefined") {
    return `/auth/callback?next=${encodeURIComponent(safeNext)}`;
  }

  const url = new URL("/auth/callback", window.location.origin);
  url.searchParams.set("next", safeNext);
  return url.toString();
}
