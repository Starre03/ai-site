import { BODY, C } from "../../lib/theme";
import { PAIN_POINT_LABELS, SERVICE_LABELS } from "../../lib/quickscan/config.js";
import { getPrimaryButtonStyle, getSecondaryButtonStyle, pageCardStyle } from "./styles.js";

function formatCurrency(value) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function SummaryCard({ label, value, note, accent = false }) {
  return (
    <div
      style={{
        padding: "clamp(14px, 1.9vh, 16px) clamp(15px, 1.8vw, 18px)",
        borderRadius: 20,
        background: accent
          ? "linear-gradient(180deg, rgba(14,165,233,0.12), rgba(14,165,233,0.04))"
          : "rgba(255,255,255,0.04)",
        border: `1px solid ${accent ? "rgba(56,189,248,0.28)" : "rgba(255,255,255,0.08)"}`,
        display: "grid",
        gap: "clamp(4px, 0.7vh, 6px)",
        minHeight: "clamp(104px, 15vh, 118px)",
        alignContent: "space-between",
        textAlign: "center",
        boxShadow: accent ? "0 18px 36px rgba(14,165,233,0.1)" : "none",
      }}
    >
      <span
        style={{
          color: "#38BDF8",
          fontSize: "clamp(0.78rem, min(1.1vw, 1.5vh), 0.82rem)",
          fontFamily: BODY,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        {label}
      </span>
      <strong style={{ color: C.text, fontFamily: BODY, fontSize: "clamp(1.05rem, min(2vw, 2.8vh), 1.28rem)", lineHeight: 1.15 }}>{value}</strong>
      {note ? <span style={{ color: C.textSoft, fontSize: "clamp(0.82rem, min(1.2vw, 1.65vh), 0.88rem)", lineHeight: 1.4 }}>{note}</span> : null}
    </div>
  );
}

function getCompactTitle(title) {
  return title
    .replace(/^Begin met (een |één )?/i, "")
    .replace(/^Ontwerp eerst /i, "")
    .replace(/^Breng eerst /i, "")
    .replace(/^Gebruik /i, "")
    .replace(/^Maak /i, "")
    .replace(/^Bepaal pas daarna of /i, "")
    .replace(/^Toets daarna /i, "")
    .replace(/\s+strak in kaart$/i, "")
    .replace(/\.$/, "");
}

function getMicroTitle(title) {
  const compact = getCompactTitle(title).toLowerCase();

  if (compact.includes("beslismomenten")) {
    return "Proces in kaart";
  }

  if (compact.includes("leadopvolging")) {
    return "Leadopvolging";
  }

  if (compact.includes("campagnes")) {
    return "Campagnes";
  }

  if (compact.includes("data") || compact.includes("rapportage")) {
    return "Rapportage";
  }

  if (compact.includes("inbox") || compact.includes("e-mail")) {
    return "Inbox";
  }

  if (compact.includes("document")) {
    return "Documenten";
  }

  if (compact.includes("planning")) {
    return "Planning";
  }

  if (compact.includes("content")) {
    return "Content";
  }

  if (compact.includes("integratie")) {
    return "Integratie";
  }

  return getCompactTitle(title);
}

export default function ScoreHero({ result, recommendations, onCtaClick }) {
  const bottleneckLabel = PAIN_POINT_LABELS[result.answers.painPoint] || "het huidige proces";
  const titleText =
    result.answers.painPoint === "meerdere-dingen"
      ? `Het grootste verlies zit nu in ${result.opportunityLabel.toLowerCase()}.`
      : `Het grootste verlies zit nu in ${bottleneckLabel.toLowerCase()}.`;

  return (
    <section
      style={{
        ...pageCardStyle,
        display: "grid",
        gap: "clamp(16px, 2.2vh, 22px)",
        justifyItems: "center",
        textAlign: "center",
      }}
    >
      <div style={{ display: "grid", gap: "clamp(8px, 1.2vh, 10px)", width: "min(920px, 100%)", justifyItems: "center" }}>
        <h2
          style={{
            fontSize: "clamp(1.8rem, min(4.6vw, 8vh), 4rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.05em",
            margin: 0,
            fontFamily: BODY,
            maxWidth: 900,
          }}
        >
          {titleText}
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
          gap: "clamp(10px, 1.6vh, 14px)",
          width: "min(920px, 100%)",
        }}
      >
        <SummaryCard label="Tijd" value={result.savings.weeklySavingsLabel} note="Mogelijke ruimte per week" accent />
        <SummaryCard
          label="Geld"
          value={`${formatCurrency(result.savings.monthlyLow)} - ${formatCurrency(result.savings.monthlyHigh)} p/m`}
          note="Potentieel per maand"
          accent
        />
        <SummaryCard label="Kans" value={result.opportunityLabel} note="Waar de meeste AI-kans zit" accent />
      </div>

      <div
        style={{
          width: "min(920px, 100%)",
          display: "grid",
          gap: "clamp(10px, 1.5vh, 12px)",
        }}
      >
        <div
          style={{
            padding: "clamp(14px, 1.9vh, 16px) clamp(15px, 1.8vw, 18px)",
            borderRadius: 20,
            background: "linear-gradient(180deg, rgba(14,165,233,0.07), rgba(255,255,255,0.03))",
            border: "1px solid rgba(56,189,248,0.16)",
            display: "grid",
            gap: "clamp(10px, 1.5vh, 12px)",
            textAlign: "center",
            boxShadow: "0 18px 36px rgba(14,165,233,0.06)",
          }}
        >
          <div style={{ display: "grid", gap: 4, justifyItems: "center" }}>
            <strong style={{ color: "#EAF6FF", fontFamily: BODY, fontSize: "1.05rem" }}>
              Waar <span style={{ color: "#38BDF8" }}>AI</span> direct kan helpen
            </strong>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
              gap: "clamp(8px, 1.2vh, 10px)",
            }}
          >
            {recommendations.slice(0, 3).map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                style={{
                  display: "grid",
                  gap: "clamp(5px, 0.8vh, 6px)",
                  padding: "clamp(10px, 1.4vh, 12px) clamp(12px, 1.6vw, 14px)",
                  borderRadius: 16,
                  background: "rgba(7,17,31,0.42)",
                  border: "1px solid rgba(125,211,252,0.1)",
                  textAlign: "center",
                }}
              >
                <details style={{ color: C.textSoft, fontFamily: BODY }}>
                  <summary
                    style={{
                      cursor: "pointer",
                      fontSize: "clamp(0.94rem, min(1.6vw, 2.1vh), 1rem)",
                      color: "#F3FAFF",
                      listStyle: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      justifyContent: "center",
                      width: "100%",
                      fontWeight: 600,
                      lineHeight: 1.3,
                    }}
                  >
                    <span>{getMicroTitle(item.title)}</span>
                    <span style={{ color: "#8FD8FF", fontSize: "0.9rem" }}>▾</span>
                  </summary>
                  <div style={{ marginTop: 8, fontSize: "0.88rem", lineHeight: 1.55 }}>{item.why}</div>
                </details>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            padding: "clamp(14px, 1.9vh, 16px) clamp(15px, 1.8vw, 18px)",
            borderRadius: 20,
            background: "linear-gradient(180deg, rgba(14,165,233,0.08), rgba(255,255,255,0.03))",
            border: "1px solid rgba(56,189,248,0.18)",
            display: "grid",
            gap: "clamp(10px, 1.5vh, 12px)",
            alignContent: "start",
            textAlign: "center",
            boxShadow: "0 18px 36px rgba(14,165,233,0.07)",
          }}
        >
          <div
            style={{
              color: "#F3FAFF",
              fontFamily: BODY,
              lineHeight: 1.6,
              fontSize: "clamp(0.96rem, min(1.65vw, 2.2vh), 1.02rem)",
              fontWeight: 600,
            }}
          >
            Aanbevolen vervolgstap: {SERVICE_LABELS[result.routing.primaryService]}.
          </div>
          <div style={{ display: "flex", gap: "clamp(10px, 1.4vh, 12px)", flexWrap: "wrap", justifyContent: "center" }}>
            <a href={result.routing.href} style={getPrimaryButtonStyle(false)} onClick={() => onCtaClick("plan-gesprek")}>
              Plan een gesprek
            </a>
            <a href={result.routing.href} style={getSecondaryButtonStyle(false)} onClick={() => onCtaClick("neem-contact-op")}>
              Bel ons
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
