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
    <section style={{ ...pageCardStyle, display: "grid", gap: 18 }}>
      <div style={{ display: "grid", gap: 8 }}>
        <h3 style={{ margin: 0, fontSize: "1.4rem", letterSpacing: "-0.02em", fontFamily: BODY, color: C.text }}>
          Indicatief besparingspotentieel
        </h3>
        <div style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1, letterSpacing: "-0.05em", fontFamily: BODY, color: C.text }}>
          {formatCurrency(savings.monthlyLow)} - {formatCurrency(savings.monthlyHigh)} / maand
        </div>
        <div style={{ color: C.textSoft, fontFamily: BODY }}>{savings.formulaText}</div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
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

      <div style={{ display: "grid", gap: 8, color: C.textSoft, lineHeight: 1.7, fontFamily: BODY }}>
        <div>{savings.limitationsText}</div>
        <div>{savings.disclaimerText}</div>
      </div>
    </section>
  );
}
