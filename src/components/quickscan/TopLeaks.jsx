import { BODY, C } from "../../lib/theme";
import { pageCardStyle } from "./styles.js";

export default function TopLeaks({ items }) {
  return (
    <section style={{ ...pageCardStyle, display: "grid", gap: 16 }}>
      <h3 style={{ margin: 0, fontSize: "1.35rem", letterSpacing: "-0.02em", fontFamily: BODY, color: C.text }}>
        Waar nu waarschijnlijk tijd blijft hangen
      </h3>
      <div style={{ display: "grid", gap: 12 }}>
        {items.map((item, index) => (
          <div
            key={`${item.key}-${index}`}
            style={{
              display: "grid",
              gap: 8,
              padding: "16px",
              borderRadius: 16,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <strong style={{ fontSize: "0.95rem", color: C.text, fontFamily: BODY }}>
              {index + 1}. {item.title}
            </strong>
            <div style={{ color: C.textSoft, lineHeight: 1.65, fontFamily: BODY }}>{item.problem}</div>
            <div style={{ color: C.textMuted, lineHeight: 1.6, fontFamily: BODY }}>{item.why}</div>
            <div style={{ color: "#7DD3FC", fontFamily: BODY, fontSize: "0.92rem" }}>Potentiële impact: {item.impactLabel}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
