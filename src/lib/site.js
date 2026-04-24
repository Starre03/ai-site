export const siteConfig = {
  brandName: "StarLeo",
  legalName: "StarLeo",
  domain: "starreai.com",
  productionOrigin: "https://starreai.com",
  contactEmail: "info@starreai.com",
  notificationFrom: "StarLeo Notificaties <noreply@starreai.com>",
  personalFrom: "Menno van StarLeo <noreply@starreai.com>",
  linkedinUrl: "https://linkedin.com/company/starleo-ai",
  sameAs: ["https://www.linkedin.com/company/starleo-ai"],
};

export function getCanonicalUrl(pathname = "/") {
  const cleanPath = String(pathname || "/").split("?")[0].split("#")[0] || "/";
  return new URL(cleanPath, siteConfig.productionOrigin).toString();
}

export function getCurrentCanonicalUrl() {
  if (typeof window === "undefined") {
    return siteConfig.productionOrigin;
  }

  return getCanonicalUrl(window.location.pathname);
}
