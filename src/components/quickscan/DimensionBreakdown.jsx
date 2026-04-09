import { BODY, C } from "../../lib/theme";
import { pageCardStyle } from "./styles.js";

const DIMENSION_COLORS = {
  D1: "#38BDF8",
  D2: "#22C55E",
  D3: "#F59E0B",
  D4: "#F97316",
};

export default function DimensionBreakdown({ items }) {
  return (
    <section style={{ ...pageCardStyle, display: "grid", gap: "clamp(14px, 2vh, 18px)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "clamp(10px, 1.4vh, 12px)", flexWrap: "wrap" }}>
        <h3 style={{ margin: 0, fontSize: "clamp(1.2rem, min(2.2vw, 3vh), 1.4rem)", letterSpacing: "-0.02em", fontFamily: BODY, color: C.text }}>Dimensies</h3>
        <span style={{ color: C.textMuted, fontSize: "clamp(0.84rem, min(1.3vw, 1.8vh), 0.9rem)", fontFamily: BODY }}>Low 0-8 / Mid 9-16 / High 17-25</span>
      </div>
      <div style={{ display: "grid", gap: "clamp(10px, 1.6vh, 14px)" }}>
        {items.map((item) => (
          <div key={item.key} style={{ display: "grid", gap: "clamp(6px, 0.9vh, 8px)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "clamp(10px, 1.4vh, 12px)", flexWrap: "wrap" }}>
              <strong style={{ fontFamily: BODY, color: C.text, fontSize: "clamp(0.95rem, min(1.55vw, 2vh), 1rem)" }}>{item.label}</strong>
              <span style={{ color: C.textSoft, fontFamily: BODY, fontSize: "clamp(0.88rem, min(1.35vw, 1.85vh), 0.95rem)" }}>
                {item.value}/25 · {item.level}
              </span>
            </div>
            <div style={{ height: "clamp(10px, 1.4vh, 12px)", borderRadius: 999, background: "rgba(255,255,255,0.06)" }}>
              <div
                style={{
                  width: `${(item.value / 25) * 100}%`,
                  height: "100%",
                  borderRadius: 999,
                  background: DIMENSION_COLORS[item.key],
                }}
              />
            </div>
            <div style={{ color: C.textSoft, lineHeight: 1.65, fontFamily: BODY, fontSize: "clamp(0.9rem, min(1.4vw, 1.95vh), 0.98rem)" }}>{item.interpretation}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
