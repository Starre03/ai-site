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
    <section style={{ ...pageCardStyle, display: "grid", gap: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <h3 style={{ margin: 0, fontSize: "1.4rem", letterSpacing: "-0.02em", fontFamily: BODY, color: C.text }}>Dimensies</h3>
        <span style={{ color: C.textMuted, fontSize: "0.9rem", fontFamily: BODY }}>Low 0-8 / Mid 9-16 / High 17-25</span>
      </div>
      <div style={{ display: "grid", gap: 14 }}>
        {items.map((item) => (
          <div key={item.key} style={{ display: "grid", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <strong style={{ fontFamily: BODY, color: C.text }}>{item.label}</strong>
              <span style={{ color: C.textSoft, fontFamily: BODY }}>
                {item.value}/25 · {item.level}
              </span>
            </div>
            <div style={{ height: 12, borderRadius: 999, background: "rgba(255,255,255,0.06)" }}>
              <div
                style={{
                  width: `${(item.value / 25) * 100}%`,
                  height: "100%",
                  borderRadius: 999,
                  background: DIMENSION_COLORS[item.key],
                }}
              />
            </div>
            <div style={{ color: C.textSoft, lineHeight: 1.65, fontFamily: BODY }}>{item.interpretation}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
