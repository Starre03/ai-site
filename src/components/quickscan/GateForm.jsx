import { Link } from "react-router-dom";
import { BODY, C } from "../../lib/theme";
import { OPT_IN_TEXT, PAIN_POINT_LABELS } from "../../lib/quickscan/config.js";
import {
  getPrimaryButtonStyle,
  getSecondaryButtonStyle,
  pageCardStyle,
  sectionTitleStyle,
} from "./styles.js";

const fieldStyle = {
  width: "100%",
  padding: "clamp(11px, 1.5vh, 12px) clamp(14px, 1.8vw, 15px)",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(10,16,31,0.8)",
  color: C.text,
  fontFamily: BODY,
  fontSize: "clamp(0.92rem, min(1.5vw, 2vh), 0.96rem)",
};

export default function GateForm({ contact, errors, assessment, onChange, onToggleOptIn, onBack, onSubmit }) {
  const teaserLabel = PAIN_POINT_LABELS[assessment?.answers?.painPoint] || "Meerdere dingen tegelijk";
  const teaserDegrees = Math.max(24, ((assessment?.score?.total || 20) / 100) * 360);

  return (
    <section
      style={{
        ...pageCardStyle,
        display: "grid",
        gap: "clamp(16px, 2.2vh, 22px)",
        maxWidth: 760,
        margin: "0 auto",
        minHeight: "min(72vh, 760px)",
        alignContent: "center",
      }}
    >
      <div style={{ display: "grid", gap: "clamp(14px, 2vh, 18px)" }}>
        <div style={{ display: "grid", gap: "clamp(8px, 1.2vh, 8px)", justifyItems: "center", textAlign: "center" }}>
          <h2
            style={{
              ...sectionTitleStyle,
              fontSize: "clamp(1.9rem, min(4.8vw, 6.2vh), 3.3rem)",
              textAlign: "center",
            }}
          >
            Ontvang je analyse
          </h2>
          <p
            style={{
              color: C.textSoft,
              fontFamily: BODY,
              fontSize: "clamp(0.93rem, min(1.5vw, 2vh), 0.98rem)",
              lineHeight: 1.65,
              margin: 0,
              maxWidth: 620,
            }}
          >
            Je ziet direct je score, besparingspotentieel en passende vervolgstap.
          </p>
        </div>

        <div
          style={{
            maxWidth: 680,
            margin: "0 auto",
            width: "100%",
            borderRadius: 18,
            padding: "clamp(8px, 1.2vh, 10px) clamp(12px, 1.8vw, 14px)",
            background: "linear-gradient(180deg, rgba(14,165,233,0.08), rgba(255,255,255,0.03))",
            border: "1px solid rgba(56,189,248,0.18)",
            display: "flex",
            alignItems: "center",
            gap: "clamp(10px, 1.4vh, 12px)",
          }}
        >
          <div
            style={{
              width: "clamp(44px, min(4.5vw, 5.6vh), 54px)",
              height: "clamp(44px, min(4.5vw, 5.6vh), 54px)",
              minWidth: "clamp(44px, min(4.5vw, 5.6vh), 54px)",
              borderRadius: "50%",
              background: `conic-gradient(#38BDF8 ${teaserDegrees}deg, rgba(255,255,255,0.08) 0deg)`,
              display: "grid",
              placeItems: "center",
            }}
          >
            <div
              style={{
                width: "clamp(32px, min(3.2vw, 4.1vh), 40px)",
                height: "clamp(32px, min(3.2vw, 4.1vh), 40px)",
                borderRadius: "50%",
                background: "rgba(8,14,28,0.96)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            />
          </div>
          <div
            style={{
              color: C.text,
              fontFamily: BODY,
              fontSize: "clamp(0.9rem, min(1.4vw, 1.95vh), 0.96rem)",
              fontWeight: 600,
              lineHeight: 1.4,
            }}
          >
            Je grootste tijdlek: <span style={{ color: "#EAF6FF" }}>{teaserLabel}</span>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          style={{
            display: "grid",
            gap: "clamp(10px, 1.4vh, 12px)",
            width: "100%",
            maxWidth: 680,
            margin: "0 auto",
            textAlign: "left",
          }}
        >
          <div style={{ display: "grid", gap: "clamp(6px, 0.9vh, 8px)" }}>
            <label htmlFor="quickscan-name" style={{ color: C.textMuted, fontFamily: BODY, fontSize: "clamp(0.84rem, min(1.2vw, 1.7vh), 0.88rem)" }}>
              Naam
            </label>
            <input
              id="quickscan-name"
              type="text"
              placeholder="Je naam"
              value={contact.name}
              onChange={(event) => onChange("name", event.target.value)}
              style={fieldStyle}
            />
            {errors.name ? <span style={{ color: "#FCA5A5", fontSize: "0.88rem", fontFamily: BODY }}>{errors.name}</span> : null}
          </div>

          <div style={{ display: "grid", gap: "clamp(6px, 0.9vh, 8px)" }}>
            <label htmlFor="quickscan-email" style={{ color: C.textMuted, fontFamily: BODY, fontSize: "clamp(0.84rem, min(1.2vw, 1.7vh), 0.88rem)" }}>
              E-mailadres
            </label>
            <input
              id="quickscan-email"
              type="email"
              placeholder="naam@bedrijf.nl"
              value={contact.email}
              onChange={(event) => onChange("email", event.target.value)}
              style={fieldStyle}
            />
            {errors.email ? <span style={{ color: "#FCA5A5", fontSize: "0.88rem", fontFamily: BODY }}>{errors.email}</span> : null}
          </div>

          <label
            style={{
              display: "flex",
              gap: "clamp(8px, 1.2vh, 10px)",
              alignItems: "flex-start",
              padding: "clamp(8px, 1.2vh, 10px) clamp(10px, 1.4vw, 12px)",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
              lineHeight: 1.5,
              color: C.textSoft,
              fontFamily: BODY,
              fontSize: "clamp(0.86rem, min(1.3vw, 1.8vh), 0.9rem)",
            }}
          >
            <input type="checkbox" checked={contact.marketingOptIn} onChange={onToggleOptIn} style={{ marginTop: 4 }} />
            <span>{OPT_IN_TEXT}</span>
          </label>

          <div style={{ display: "flex", gap: "clamp(10px, 1.4vh, 12px)", flexWrap: "wrap", justifyContent: "center" }}>
            <button type="button" style={getSecondaryButtonStyle()} onClick={onBack}>
              Vorige
            </button>
            <button type="submit" style={getPrimaryButtonStyle(false)}>
              Toon analyse
            </button>
          </div>
        </form>

        <p
          style={{
            color: C.textMuted,
            fontFamily: BODY,
            fontSize: "clamp(0.78rem, min(1.15vw, 1.6vh), 0.82rem)",
            lineHeight: 1.5,
            margin: 0,
            textAlign: "center",
          }}
        >
          Je score wordt automatisch berekend op basis van je antwoorden. Lees voor meer informatie ons{" "}
          <Link to="/privacy" style={{ color: "rgba(125, 211, 252, 0.9)", fontFamily: BODY }}>
            Privacybeleid
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
