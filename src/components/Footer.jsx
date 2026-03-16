import { Link } from "react-router-dom";
import { BODY, C } from "../lib/theme";
import { BrandMark } from "./ui";

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: `1px solid ${C.border}`,
        padding: "1.6rem clamp(1.5rem, 5vw, 5rem) 4rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
        background: C.bg,
      }}
    >
      <div>
        <BrandMark />
        <br />
        <span style={{ color: C.textMuted, fontSize: "0.68rem", fontFamily: BODY }}>
          © 2026 · starre.ai
        </span>
      </div>
      <div style={{ display: "flex", gap: 20 }}>
        <a
          href="mailto:info@starre.ai"
          style={{ color: C.textMuted, textDecoration: "none", fontSize: "0.76rem", fontFamily: BODY }}
        >
          E-mail
        </a>
        <a
          href="https://linkedin.com/company/starre-ai"
          target="_blank"
          rel="noreferrer"
          style={{ color: C.textMuted, textDecoration: "none", fontSize: "0.76rem", fontFamily: BODY }}
        >
          LinkedIn
        </a>
        <Link
          to="/privacy"
          style={{ color: C.textMuted, textDecoration: "none", fontSize: "0.76rem", fontFamily: BODY }}
        >
          Privacy
        </Link>
        <Link
          to="/voorwaarden"
          style={{ color: C.textMuted, textDecoration: "none", fontSize: "0.76rem", fontFamily: BODY }}
        >
          Voorwaarden
        </Link>
      </div>
    </footer>
  );
}
