import { Link } from "react-router-dom";
import { trackEvent } from "../lib/analytics";
import { siteConfig } from "../lib/site";
import { BODY, C } from "../lib/theme";
import { BrandMark } from "./ui";

export default function Footer() {
  const serviceLinks = [
    { label: "AI Audit", to: "/ai-audit" },
    { label: "AI Implementatie", to: "/ai-integraties" },
    { label: "OpenClaw Agents", to: "/ai-agents" },
    { label: "Gratis quickscan", to: "/quickscan" },
  ];

  const aboutLinks = [
    { label: "Over", to: "/over" },
    { label: "FAQ", to: "/faq" },
    { label: "Privacy", to: "/privacy" },
    { label: "Voorwaarden", to: "/voorwaarden" },
  ];

  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: `1px solid ${C.border}`,
        padding: "2rem clamp(1.5rem, 5vw, 5rem) 4rem",
        background: C.bg,
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gap: 26 }}>
        <div
          style={{
            border: `1px solid ${C.border}`,
            borderRadius: 18,
            background: "rgba(255,255,255,0.02)",
            padding: "1rem 1.1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div style={{ color: C.text, fontFamily: BODY, fontSize: "0.98rem", fontWeight: 700 }}>
            Klaar om AI concreet in te zetten?
          </div>
          <Link
            to="/quickscan"
            className="lift-on-hover"
            onClick={() => trackEvent("footer_quickscan_click", { location: "footer_cta" })}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.9rem 1.2rem",
              borderRadius: 12,
              textDecoration: "none",
              background: C.primary,
              color: "#fff",
              fontFamily: BODY,
              fontSize: "0.86rem",
              fontWeight: 700,
              boxShadow: `0 10px 32px ${C.primary}25`,
            }}
          >
            Start quickscan →
          </Link>
        </div>

        <div className="card-grid-three" style={{ gap: 24 }}>
          <div style={{ display: "grid", gap: 10 }}>
            <div>
              <BrandMark />
            </div>
            <div style={{ color: C.textMuted, fontSize: "0.82rem", lineHeight: 1.7, fontFamily: BODY, maxWidth: 280 }}>
              AI audit, implementatie &amp; agents voor bedrijven
            </div>
            <div style={{ color: C.textMuted, fontSize: "0.76rem", lineHeight: 1.7, fontFamily: BODY }}>
              KvK: 42033972
            </div>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              style={{ color: C.textMuted, textDecoration: "none", fontSize: "0.76rem", lineHeight: 1.7, fontFamily: BODY }}
            >
              {siteConfig.contactEmail}
            </a>
            <div style={{ color: C.textMuted, fontSize: "0.72rem", lineHeight: 1.7, fontFamily: BODY }}>
              © 2026 · {siteConfig.brandName}
            </div>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ color: C.text, fontSize: "0.84rem", fontWeight: 700, fontFamily: BODY }}>Diensten</div>
            <div style={{ display: "grid", gap: 10 }}>
              {serviceLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{ color: C.textMuted, textDecoration: "none", fontSize: "0.78rem", fontFamily: BODY }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ color: C.text, fontSize: "0.84rem", fontWeight: 700, fontFamily: BODY }}>Over StarLeo</div>
            <div style={{ display: "grid", gap: 10 }}>
              {aboutLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{ color: C.textMuted, textDecoration: "none", fontSize: "0.78rem", fontFamily: BODY }}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: C.textMuted, textDecoration: "none", fontSize: "0.78rem", fontFamily: BODY }}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
