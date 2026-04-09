import { BODY, C } from "../../lib/theme";
import { SAVINGS_SCENARIOS } from "../../lib/quickscan/config.js";
import { getChipStyle, pageCardStyle } from "./styles.js";

function formatCurrency(value) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function SavingsCard({ savings, onScenarioChange }) {
  return (
    <section style={{ ...pageCardStyle, display: "grid", gap: "clamp(14px, 2vh, 18px)" }}>
      <div style={{ display: "grid", gap: "clamp(6px, 0.9vh, 8px)" }}>
        <h3 style={{ margin: 0, fontSize: "clamp(1.2rem, min(2.2vw, 3vh), 1.4rem)", letterSpacing: "-0.02em", fontFamily: BODY, color: C.text }}>
          Indicatief besparingspotentieel
        </h3>
        <div style={{ fontSize: "clamp(1.8rem, min(5vw, 7vh), 3.2rem)", lineHeight: 1, letterSpacing: "-0.05em", fontFamily: BODY, color: C.text }}>
          {formatCurrency(savings.monthlyLow)} - {formatCurrency(savings.monthlyHigh)} / maand
        </div>
        <div style={{ color: C.textSoft, fontFamily: BODY, fontSize: "clamp(0.9rem, min(1.5vw, 2vh), 1rem)" }}>{savings.formulaText}</div>
      </div>

      <div style={{ display: "flex", gap: "clamp(8px, 1.2vh, 10px)", flexWrap: "wrap" }}>
        {Object.entries(SAVINGS_SCENARIOS).map(([key, scenario]) => (
          <button
            key={key}
            type="button"
            style={getChipStyle({ active: savings.scenario === key, subtle: true })}
            onClick={() => onScenarioChange(key)}
          >
            {scenario.label}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gap: "clamp(6px, 0.9vh, 8px)", color: C.textSoft, lineHeight: 1.7, fontFamily: BODY, fontSize: "clamp(0.9rem, min(1.45vw, 1.95vh), 1rem)" }}>
        <div>{savings.limitationsText}</div>
        <div>{savings.disclaimerText}</div>
      </div>
    </section>
  );
}
