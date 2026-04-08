import { BODY, C } from "../../lib/theme";
import { SERVICE_LABELS } from "../../lib/quickscan/config.js";
import { getPrimaryButtonStyle, getSecondaryButtonStyle, pageCardStyle } from "./styles.js";

export default function NextStepCTA({ routing, onClick }) {
  return (
    <section
      id="quickscan-contact"
      style={{ ...pageCardStyle, display: "grid", gap: 18, justifyItems: "center", textAlign: "center" }}
    >
      <div style={{ display: "grid", gap: 10, maxWidth: 760 }}>
        <h3 style={{ margin: 0, fontSize: "1.45rem", letterSpacing: "-0.03em", fontFamily: BODY, color: C.text }}>
          Beste volgende stap
        </h3>
        <p style={{ color: C.textSoft, lineHeight: 1.7, fontFamily: BODY, margin: 0 }}>
          Voor jullie lijkt <strong style={{ color: C.text }}>{SERVICE_LABELS[routing.primaryService]}</strong> nu het meest logisch.
        </p>
        <p style={{ color: C.textMuted, lineHeight: 1.65, fontFamily: BODY, margin: 0 }}>{routing.body}</p>
      </div>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
        <a href={routing.href} style={getPrimaryButtonStyle(false)} onClick={() => onClick("plan-gesprek")}>
          Plan een gesprek
        </a>
        <a href={routing.href} style={getSecondaryButtonStyle(false)} onClick={() => onClick("neem-contact-op")}>
          Neem contact op
        </a>
      </div>

      <div style={{ color: C.textSoft, fontFamily: BODY, textAlign: "center" }}>{routing.microcopy}</div>
    </section>
  );
}
