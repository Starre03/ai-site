import { useEffect, useRef, useState } from "react";
import { useVisible } from "../../lib/hooks";
import { BODY, C } from "../../lib/theme";
import { SERVICE_LABELS } from "../../lib/quickscan/config.js";
import { getPrimaryButtonStyle, getSecondaryButtonStyle, pageCardStyle } from "./styles.js";

function formatCurrency(value) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function parseNumericToken(token) {
  if (token.includes(",")) {
    return parseFloat(token.replace(/\./g, "").replace(",", "."));
  }
  return parseInt(token.replace(/\./g, ""), 10);
}

function formatNumericLike(value, original) {
  if (original.includes(",")) {
    const decimals = original.split(",")[1]?.length ?? 0;
    return value.toLocaleString("nl-NL", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
  if (original.includes(".")) {
    return Math.round(value).toLocaleString("nl-NL");
  }
  return String(Math.round(value));
}

function useCountUpNumber(target, active, duration = 1200) {
  const [value, setValue] = useState(active ? 0 : target);

  useEffect(() => {
    if (!active) return undefined;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || typeof target !== "number" || !Number.isFinite(target)) {
      setValue(target);
      return undefined;
    }

    const start = performance.now();
    let frame = 0;

    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);

      if (t >= 1) {
        setValue(target);
        return;
      }

      setValue(target * eased);
      frame = requestAnimationFrame(tick);
    };

    setValue(0);
    frame = requestAnimationFrame(tick);

    return () => {
      if (frame) cancelAnimationFrame(frame);
    };
  }, [target, active, duration]);

  return value;
}

function useCountUpString(finalValue, active, duration = 1200) {
  const [display, setDisplay] = useState(finalValue);

  useEffect(() => {
    if (typeof finalValue !== "string") {
      setDisplay(finalValue);
      return undefined;
    }

    if (!active) {
      return undefined;
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplay(finalValue);
      return undefined;
    }

    const regex = /(\d+(?:[.,]\d+)*)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(finalValue)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: "text", value: finalValue.slice(lastIndex, match.index) });
      }
      const target = parseNumericToken(match[0]);
      parts.push({
        type: "number",
        target: Number.isFinite(target) ? target : 0,
        original: match[0],
      });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < finalValue.length) {
      parts.push({ type: "text", value: finalValue.slice(lastIndex) });
    }

    const hasNumeric = parts.some((part) => part.type === "number");
    if (!hasNumeric) {
      setDisplay(finalValue);
      return undefined;
    }

    const start = performance.now();
    let frame = 0;

    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);

      if (t >= 1) {
        setDisplay(finalValue);
        return;
      }

      const next = parts
        .map((part) =>
          part.type === "text" ? part.value : formatNumericLike(part.target * eased, part.original),
        )
        .join("");
      setDisplay(next);
      frame = requestAnimationFrame(tick);
    };

    setDisplay(
      parts
        .map((part) => (part.type === "text" ? part.value : formatNumericLike(0, part.original)))
        .join(""),
    );
    frame = requestAnimationFrame(tick);

    return () => {
      if (frame) cancelAnimationFrame(frame);
    };
  }, [finalValue, active, duration]);

  return display;
}

function SummaryCard({ label, value, note, details, accent = false, animationDelay = "0ms" }) {
  const [showDetails, setShowDetails] = useState(false);
  const [cardRef, visible] = useVisible(0.1);
  const hasAnimatedRef = useRef(false);
  const shouldAnimate = visible || hasAnimatedRef.current;
  useEffect(() => {
    if (visible) {
      hasAnimatedRef.current = true;
    }
  }, [visible]);
  const animatedValue = useCountUpString(value, shouldAnimate);

  return (
    <div
      ref={cardRef}
      className="quickscan-pop"
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
        animationDelay,
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
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        {label}
        {details ? (
          <span
            style={{ position: "relative", display: "inline-flex" }}
            onMouseEnter={() => setShowDetails(true)}
            onMouseLeave={() => setShowDetails(false)}
            onFocus={() => setShowDetails(true)}
            onBlur={() => setShowDetails(false)}
          >
            <button
              type="button"
              aria-label={`Toon berekening voor ${label.toLowerCase()}`}
              title="Toon berekening"
              onClick={() => setShowDetails((current) => !current)}
              style={{
                cursor: "pointer",
                color: "#8FD8FF",
                width: 14,
                height: 14,
                padding: 0,
                borderRadius: "50%",
                border: "1px solid rgba(125,211,252,0.45)",
                display: "inline-grid",
                placeItems: "center",
                fontSize: "0.56rem",
                lineHeight: 1,
                letterSpacing: 0,
                textTransform: "none",
                background: "rgba(14,165,233,0.08)",
              }}
            >
              i
            </button>
            {showDetails ? (
              <span
                role="tooltip"
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 2,
                  width: "min(280px, 72vw)",
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid rgba(125,211,252,0.18)",
                  background: "rgba(7,17,31,0.96)",
                  boxShadow: "0 16px 34px rgba(0,0,0,0.35)",
                  color: C.textSoft,
                  fontFamily: BODY,
                  fontSize: "0.76rem",
                  lineHeight: 1.45,
                  textTransform: "none",
                  letterSpacing: 0,
                  fontWeight: 500,
                }}
              >
                {details}
              </span>
            ) : null}
          </span>
        ) : null}
      </span>
      <strong style={{ color: C.text, fontFamily: BODY, fontSize: "clamp(1.05rem, min(2vw, 2.8vh), 1.28rem)", lineHeight: 1.15 }}>{animatedValue}</strong>
      {note ? (
        <span
          style={{
            color: C.textSoft,
            fontSize: "clamp(0.82rem, min(1.2vw, 1.65vh), 0.88rem)",
            lineHeight: 1.4,
            whiteSpace: "pre-line",
          }}
        >
          {note}
        </span>
      ) : null}
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

const CLASSIFICATION_DESCRIPTIONS = {
  "Grote AI-kans": "Er ligt nu een duidelijke en direct relevante AI-kans in je proces.",
  "Sterke AI-kans": "Je hebt een sterke AI-kans, met concrete winst in tijd en efficiëntie.",
  "Duidelijke AI-kans": "Er zijn duidelijke AI-kansen zichtbaar, vooral in repetitief of handmatig werk.",
  "AI-kans in opbouw": "Er zijn aanknopingspunten voor AI, maar de directe winst lijkt nog beperkter.",
  Verkenningsfase: "Je zit nog in een vroege fase waarin AI vooral interessant is om te verkennen.",
};

const SCORE_DIMENSIONS = [
  { key: "d1_tijdverlies", label: "Tijdverlies" },
  { key: "d2_automatiseerbaarheid", label: "Automatiseerbaarheid" },
  { key: "d3_koopbereidheid", label: "Koopbereidheid" },
  { key: "d4_geldverlies", label: "Geldverlies" },
];

function getDimensionLevel(value) {
  if (value >= 17) return "Hoog";
  if (value >= 9) return "Gemiddeld";
  return "Laag";
}

function getDimensionExplanation(key, value) {
  const level = getDimensionLevel(value);

  if (key === "d1_tijdverlies") {
    if (level === "Hoog") return "Er gaat nu structureel veel tijd verloren in terugkerend werk.";
    if (level === "Gemiddeld") return "Er zit merkbare tijdsdruk in dit proces, maar niet op elk onderdeel even zwaar.";
    return "Het directe tijdverlies lijkt nu beperkter of meer geconcentreerd op een kleiner onderdeel.";
  }

  if (key === "d2_automatiseerbaarheid") {
    if (level === "Hoog") return "Dit werk leent zich relatief goed voor standaardisatie, AI-ondersteuning of automatisering.";
    if (level === "Gemiddeld") return "Er liggen kansen voor AI, maar waarschijnlijk niet overal even direct of schaalbaar.";
    return "Een deel van dit werk vraagt waarschijnlijk nog meer maatwerk of afstemming dan automatisering.";
  }

  if (key === "d3_koopbereidheid") {
    if (level === "Hoog") return "Je antwoorden laten zien dat er duidelijke bereidheid is om dit echt te verbeteren.";
    if (level === "Gemiddeld") return "Er is interesse om te verbeteren, maar de stap naar uitvoering lijkt nog deels verkennend.";
    return "De behoefte lijkt nu nog minder urgent of vooral bedoeld om eerst te oriënteren.";
  }

  if (key === "d4_geldverlies") {
    if (level === "Hoog") return "De verloren tijd vertaalt zich waarschijnlijk direct naar merkbare financiële impact.";
    if (level === "Gemiddeld") return "Er zit een duidelijke kostencomponent in dit proces, maar die loopt nog niet maximaal op.";
    return "De financiële impact lijkt aanwezig, maar nu nog relatief beperkt vergeleken met andere processen.";
  }

  return "";
}

function getScoreAnalysisSummary(score) {
  const strongestDimension = [...SCORE_DIMENSIONS].sort((a, b) => score[b.key] - score[a.key])[0];
  const strongestLabel = strongestDimension?.label?.toLowerCase() || "de quickscan";
  const lowDimensions = SCORE_DIMENSIONS.filter((dimension) => getDimensionLevel(score[dimension.key]) === "Laag");

  if (score.d1_tijdverlies >= 17 && score.d2_automatiseerbaarheid >= 17 && score.d4_geldverlies >= 17) {
    return "Deze combinatie laat zien dat er nu niet alleen veel tijd weglekt, maar dat dit ook relatief goed te verbeteren is en direct financiële impact heeft.";
  }

  if (score.d2_automatiseerbaarheid >= 17 && score.d3_koopbereidheid >= 17) {
    return "De grootste kracht zit hier in werk dat goed automatiseerbaar is, gecombineerd met duidelijke bereidheid om daar echt iets mee te doen.";
  }

  if (lowDimensions.length >= 2) {
    return `De score laat vooral zien dat ${strongestLabel} nu het duidelijkste aangrijpingspunt is, terwijl andere onderdelen nog meer afhankelijk zijn van timing, focus of proceskeuzes.`;
  }

  return `De verdeling laat zien dat ${strongestLabel} nu het zwaarst weegt in de uitkomst en daarmee de meest logische plek is om verbetering of AI-ondersteuning te starten.`;
}

function getScoreStatusLine(score) {
  if (!score) return "";

  if (score.d1_tijdverlies >= 18 && score.d2_automatiseerbaarheid >= 18) {
    return "Je grootste winst zit nu in taken die veel tijd kosten en relatief goed te automatiseren zijn.";
  }

  if (score.d1_tijdverlies >= 16 && score.d4_geldverlies >= 16) {
    return "Je score laat zien dat er duidelijke AI-kansen liggen, vooral waar handmatig werk en geldverlies samenkomen.";
  }

  if (score.d2_automatiseerbaarheid >= 18) {
    return "Er ligt vooral winst in werk dat nu relatief goed te standaardiseren en te automatiseren is.";
  }

  if (score.d3_koopbereidheid >= 18) {
    return "Je antwoorden laten zien dat er niet alleen kans is, maar ook bereidheid om hier echt mee te bewegen.";
  }

  if (score.total_score >= 45) {
    return "Er liggen duidelijke AI-kansen, vooral in terugkerend werk waar nu nog veel handmatige tijd in gaat zitten.";
  }

  return "De quickscan ziet aanknopingspunten voor AI, maar de directe winst lijkt nu nog meer afhankelijk van focus en timing.";
}

function getLargestOpportunityLine(score) {
  if (!score) return "";

  const topScore = Math.max(
    score.d1_tijdverlies,
    score.d2_automatiseerbaarheid,
    score.d3_koopbereidheid,
    score.d4_geldverlies,
  );

  if (score.d1_tijdverlies === topScore && score.d4_geldverlies === topScore) {
    return "Grootste kans: Tijdverlies + Geldverlies";
  }

  if (score.d1_tijdverlies === topScore && score.d4_geldverlies >= topScore - 1) {
    return "Grootste kans zit in tijdverlies met directe financiële impact.";
  }

  if (score.d2_automatiseerbaarheid === topScore) {
    return "Grootste kans: Automatiseerbaarheid";
  }

  if (score.d3_koopbereidheid === topScore) {
    return "Grootste kans: Koopbereidheid";
  }

  if (score.d4_geldverlies === topScore) {
    return "Grootste kans: Geldverlies";
  }

  return "Grootste kans: Tijdverlies";
}

function ScoreSection({ score, benchmark }) {
  const [sectionRef, visible] = useVisible(0.1);
  const hasAnimatedRef = useRef(false);
  const shouldAnimate = visible || hasAnimatedRef.current;
  useEffect(() => {
    if (visible) hasAnimatedRef.current = true;
  }, [visible]);

  const totalTarget = score ? Math.max(0, Math.min(100, score.total_score)) : 0;
  const animatedTotal = useCountUpNumber(totalTarget, shouldAnimate, 1400);

  if (!score) {
    return null;
  }

  const largestOpportunity = getLargestOpportunityLine(score).replace(/^Grootste kans:\s*/i, "");
  const progress = `${animatedTotal.toFixed(1)}%`;
  const displayedTotal = Math.round(animatedTotal);

  return (
    <div
      ref={sectionRef}
      style={{
        width: "min(920px, 100%)",
        padding: "clamp(14px, 1.9vh, 16px) clamp(15px, 1.8vw, 18px)",
        borderRadius: 20,
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.08)",
        display: "grid",
        gap: "clamp(12px, 1.7vh, 14px)",
        textAlign: "left",
      }}
    >
      <div
        style={{
          display: "grid",
          gap: "clamp(12px, 1.7vh, 14px)",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "grid",
            gap: 10,
            justifyItems: "start",
          }}
        >
          <span
            style={{
              color: C.textMuted,
              fontSize: "clamp(0.78rem, min(1.1vw, 1.5vh), 0.82rem)",
              fontFamily: BODY,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Quickscan-score
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div
              aria-hidden="true"
              className="quickscan-gauge-glow"
              style={{
                width: 92,
                height: 92,
                borderRadius: "50%",
                background: `conic-gradient(rgba(56,189,248,0.95) 0 ${progress}, rgba(255,255,255,0.08) ${progress} 100%)`,
                display: "grid",
                placeItems: "center",
                boxShadow: "0 18px 36px rgba(14,165,233,0.1)",
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "rgba(11,17,32,0.98)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "grid",
                  placeItems: "center",
                  textAlign: "center",
                }}
              >
                <strong
                  style={{
                    color: C.text,
                    fontFamily: BODY,
                    fontSize: "1.2rem",
                    lineHeight: 1,
                  }}
                >
                  {displayedTotal}
                </strong>
              </div>
            </div>

            <div style={{ display: "grid", gap: 6 }}>
              <strong
                style={{
                  color: C.text,
                  fontFamily: BODY,
                  fontSize: "clamp(1.2rem, min(2.1vw, 2.8vh), 1.55rem)",
                  lineHeight: 1.05,
                }}
              >
                {displayedTotal} / 100
              </strong>
              <span
                style={{
                  color: "#8FD8FF",
                  fontFamily: BODY,
                  fontSize: "clamp(0.95rem, min(1.4vw, 1.9vh), 1rem)",
                  fontWeight: 600,
                }}
              >
                {score.classification}
              </span>
              <span
                style={{
                  color: C.textSoft,
                  fontFamily: BODY,
                  fontSize: "clamp(0.86rem, min(1.2vw, 1.7vh), 0.9rem)",
                  lineHeight: 1.45,
                }}
              >
                Grootste kans: {largestOpportunity}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gap: 8, alignContent: "start" }}>
          <p
            style={{
              margin: 0,
              color: C.textSoft,
              fontFamily: BODY,
              fontSize: "clamp(0.88rem, min(1.3vw, 1.8vh), 0.94rem)",
              lineHeight: 1.55,
            }}
          >
            {getScoreStatusLine(score)}
          </p>
          {benchmark?.percentile && benchmark?.industryLabel ? (
            <span
              style={{
                color: C.textMuted,
                fontFamily: BODY,
                fontSize: "0.82rem",
                lineHeight: 1.45,
              }}
            >
              Benchmark beschikbaar voor {benchmark.industryLabel}: {benchmark.percentile}e percentiel
            </span>
          ) : null}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gap: "clamp(10px, 1.3vh, 12px)",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
        }}
      >
        {SCORE_DIMENSIONS.map((dimension, index) => {
          const value = score[dimension.key];
          const targetPct = Math.max(0, Math.min(100, (value / 25) * 100));
          const progress = shouldAnimate ? `${targetPct}%` : "0%";
          const level = getDimensionLevel(value);
          const explanation = getDimensionExplanation(dimension.key, value);

          return (
            <div
              key={dimension.key}
              className="quickscan-reveal"
              style={{
                display: "grid",
                gap: 6,
                animationDelay: `${600 + index * 120}ms`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    color: C.textSoft,
                    fontFamily: BODY,
                    fontSize: "clamp(0.84rem, min(1.2vw, 1.7vh), 0.9rem)",
                    lineHeight: 1.3,
                  }}
                >
                  {dimension.label}
                </span>
                <span
                  style={{
                    color: C.text,
                    fontFamily: BODY,
                    fontSize: "clamp(0.84rem, min(1.2vw, 1.7vh), 0.9rem)",
                    fontWeight: 600,
                  }}
                >
                  {value}/25
                </span>
              </div>
              <span
                style={{
                  color: "#8FD8FF",
                  fontFamily: BODY,
                  fontSize: "clamp(0.76rem, min(1.08vw, 1.5vh), 0.8rem)",
                  fontWeight: 600,
                }}
              >
                {level}
              </span>
              <div
                style={{
                  height: 8,
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.08)",
                  overflow: "hidden",
                }}
              >
                <div
                  className="quickscan-bar-fill"
                  style={{
                    width: progress,
                    height: "100%",
                    borderRadius: 999,
                    background: "linear-gradient(90deg, rgba(56,189,248,0.88), rgba(125,211,252,0.96))",
                    boxShadow: "0 0 18px rgba(56,189,248,0.18)",
                    transitionDelay: `${700 + index * 140}ms`,
                  }}
                />
              </div>
              <span
                style={{
                  color: C.textMuted,
                  fontFamily: BODY,
                  fontSize: "clamp(0.78rem, min(1.08vw, 1.5vh), 0.82rem)",
                  lineHeight: 1.5,
                }}
              >
                {explanation}
              </span>
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: "grid",
          gap: 8,
          padding: "clamp(10px, 1.4vh, 12px) clamp(12px, 1.6vw, 14px)",
          borderRadius: 16,
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <strong
          style={{
            color: "#EAF6FF",
            fontFamily: BODY,
            fontSize: "clamp(0.9rem, min(1.25vw, 1.7vh), 0.95rem)",
            lineHeight: 1.4,
          }}
        >
          Wat deze scoreverdeling zegt
        </strong>
        <p
          style={{
            margin: 0,
            color: C.textSoft,
            fontFamily: BODY,
            fontSize: "clamp(0.84rem, min(1.2vw, 1.65vh), 0.9rem)",
            lineHeight: 1.6,
          }}
        >
          {getScoreAnalysisSummary(score)}
        </p>
        <p
          style={{
            margin: 0,
            color: C.textMuted,
            fontFamily: BODY,
            fontSize: "clamp(0.8rem, min(1.15vw, 1.6vh), 0.84rem)",
            lineHeight: 1.5,
          }}
        >
          Deze quickscan-score is een interne inschatting op basis van je antwoorden en de onderliggende scoreverdeling.
        </p>
      </div>
    </div>
  );
}

export default function ScoreHero({ result, recommendations, onCtaClick }) {
  const titleText = result.primaryConclusion || result.hero?.headline || `Je grootste winst zit nu in ${result.opportunityLabel.toLowerCase()}.`;
  const scoreSummary = result.score
    ? `Quickscan-score: ${result.score.total_score}/100 · ${result.score.classification}`
    : null;
  const scoreOpportunity = result.score ? getLargestOpportunityLine(result.score) : null;

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
        {scoreSummary ? (
          <div
            className="quickscan-reveal"
            style={{
              display: "grid",
              gap: 4,
              justifyItems: "center",
              textAlign: "center",
              animationDelay: "0ms",
            }}
          >
            <span
              style={{
                color: "#8FD8FF",
                fontFamily: BODY,
                fontSize: "clamp(0.84rem, min(1.2vw, 1.65vh), 0.9rem)",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              {scoreSummary}
            </span>
            {scoreOpportunity ? (
              <span
                style={{
                  color: C.textSoft,
                  fontFamily: BODY,
                  fontSize: "clamp(0.82rem, min(1.15vw, 1.55vh), 0.88rem)",
                  lineHeight: 1.45,
                }}
              >
                {scoreOpportunity}
              </span>
            ) : null}
          </div>
        ) : null}
        <h2
          className="quickscan-reveal"
          style={{
            fontSize: "clamp(1.8rem, min(4.6vw, 8vh), 4rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.05em",
            margin: 0,
            fontFamily: BODY,
            maxWidth: 900,
            animationDelay: "120ms",
          }}
        >
          {titleText}
        </h2>
        {result.hero?.summary ? (
          <p
            className="quickscan-reveal"
            style={{
              color: C.textSoft,
              fontFamily: BODY,
              fontSize: "clamp(0.96rem, min(1.65vw, 2.2vh), 1.02rem)",
              lineHeight: 1.65,
              margin: 0,
              maxWidth: 760,
              animationDelay: "240ms",
            }}
          >
            {result.hero.summary}
          </p>
        ) : null}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
          gap: "clamp(10px, 1.6vh, 14px)",
          width: "min(920px, 100%)",
        }}
      >
        <SummaryCard
          label="Tijd"
          value={result.savings.weeklySavingsLabel}
          note="Mogelijke ruimte per week"
          accent
          animationDelay="360ms"
        />
        <SummaryCard
          label="Geld"
          value={`${formatCurrency(result.savings.monthlyLow)} - ${formatCurrency(result.savings.monthlyHigh)} p/m`}
          note={`${result.savings.yearlyLabel}\nDit is een indicatie op basis van jouw antwoorden en inschattingen.`}
          details={result.savings.timeInfoText}
          accent
          animationDelay="460ms"
        />
        <SummaryCard
          label="Kans"
          value={result.opportunityLabel}
          note="Waar de meeste AI-kans zit"
          accent
          animationDelay="560ms"
        />
      </div>

      <div
        style={{
          width: "min(920px, 100%)",
          display: "grid",
          gap: "clamp(10px, 1.5vh, 12px)",
        }}
      >
        <div
          className="quickscan-reveal"
          style={{
            padding: "clamp(14px, 1.9vh, 16px) clamp(15px, 1.8vw, 18px)",
            borderRadius: 20,
            background: "linear-gradient(180deg, rgba(14,165,233,0.07), rgba(255,255,255,0.03))",
            border: "1px solid rgba(56,189,248,0.16)",
            display: "grid",
            gap: "clamp(10px, 1.5vh, 12px)",
            textAlign: "center",
            boxShadow: "0 18px 36px rgba(14,165,233,0.06)",
            animationDelay: "680ms",
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
                className="quickscan-reveal"
                style={{
                  display: "grid",
                  gap: "clamp(5px, 0.8vh, 6px)",
                  padding: "clamp(10px, 1.4vh, 12px) clamp(12px, 1.6vw, 14px)",
                  borderRadius: 16,
                  background: "rgba(7,17,31,0.42)",
                  border: "1px solid rgba(125,211,252,0.1)",
                  textAlign: "center",
                  animationDelay: `${760 + index * 110}ms`,
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
          className="quickscan-reveal"
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
            animationDelay: "820ms",
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
              {result.routing.primaryButtonLabel || "Plan een gesprek"}
            </a>
            <a href={result.routing.href} style={getSecondaryButtonStyle(false)} onClick={() => onCtaClick("neem-contact-op")}>
              Bel ons
            </a>
          </div>
        </div>
      </div>

      <ScoreSection score={result.score} benchmark={result.scoreBenchmark} />
    </section>
  );
}
