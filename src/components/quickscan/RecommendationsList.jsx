import { BODY, C } from "../../lib/theme";
import { pageCardStyle } from "./styles.js";

export default function RecommendationsList({ items }) {
  return (
    <section style={{ ...pageCardStyle, display: "grid", gap: 18, justifyItems: "center", textAlign: "center" }}>
      <div style={{ display: "grid", gap: 8, maxWidth: 760 }}>
        <h3 style={{ margin: 0, fontSize: "1.45rem", letterSpacing: "-0.03em", fontFamily: BODY, color: C.text }}>
          Wat nu direct beter kan
        </h3>
        <p style={{ margin: 0, color: C.textSoft, lineHeight: 1.65, fontFamily: BODY }}>
          Dit zijn de 3 meest logische verbeteringen op basis van je antwoorden.
        </p>
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        {items.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            style={{
              display: "grid",
              gap: 8,
              padding: "18px",
              borderRadius: 18,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              maxWidth: 860,
              textAlign: "left",
            }}
          >
            <strong style={{ fontSize: "1rem", color: C.text, fontFamily: BODY }}>{index + 1}. {item.title}</strong>
            <div style={{ color: C.textSoft, lineHeight: 1.65, fontFamily: BODY }}>{item.why}</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <span style={{ color: "#7DD3FC", fontFamily: BODY, fontSize: "0.9rem" }}>Impact: {item.impactLabel}</span>
              <span style={{ color: C.textSoft, fontFamily: BODY, fontSize: "0.9rem" }}>Aanpak: {item.implementationType}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
