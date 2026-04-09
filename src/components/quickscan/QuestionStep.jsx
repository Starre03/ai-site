import { BODY, C } from "../../lib/theme";
import {
  getChipStyle,
  getPrimaryButtonStyle,
  getSecondaryButtonStyle,
  pageCardStyle,
  sectionTitleStyle,
} from "./styles.js";

export default function QuestionStep({
  question,
  answers,
  onSingleSelect,
  onToolToggle,
  onClearTools,
  onBack,
  onNext,
}) {
  const isMulti = question.kind === "multi";
  const selectedTools = answers.tools || [];
  const toolCount = selectedTools.filter((tool) => tool !== "geen").length;
  const singleGrid = "repeat(auto-fit, minmax(min(100%, 220px), 1fr))";
  const multiGrid = "repeat(auto-fit, minmax(min(100%, 180px), 1fr))";

  return (
    <section
      style={{
        ...pageCardStyle,
        display: "grid",
        gap: "clamp(18px, 2.8vh, 28px)",
        maxWidth: 860,
        margin: "0 auto",
        minHeight: "min(72vh, 760px)",
        alignContent: "center",
      }}
    >
      <div style={{ display: "grid", gap: "clamp(16px, 2.2vh, 22px)" }}>
        <div style={{ display: "grid", gap: "clamp(8px, 1.2vh, 10px)" }}>
          <h2 style={sectionTitleStyle}>{question.title}</h2>
        </div>

        {question.kind === "single" ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: singleGrid,
              gap: "clamp(10px, 1.6vh, 14px)",
            }}
          >
            {question.options.map((option) => (
              <button
                key={option.value}
                type="button"
                style={getChipStyle({ active: answers[question.id] === option.value })}
                onClick={() => onSingleSelect(question.id, option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : null}

        {isMulti ? (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: multiGrid,
                gap: "clamp(10px, 1.6vh, 14px)",
              }}
            >
              {question.options.map((option) => {
                const active = selectedTools.includes(option.value);
                const disabled = !active && option.value !== "geen" && toolCount >= 6 && !selectedTools.includes("geen");

                return (
                  <button
                    key={option.value}
                    type="button"
                    style={getChipStyle({ active, disabled })}
                    disabled={disabled}
                    onClick={() => onToolToggle(option.value)}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: "clamp(10px, 1.4vh, 12px)", flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ color: C.textSoft, fontSize: "clamp(0.88rem, min(1.4vw, 1.9vh), 0.92rem)", fontFamily: BODY }}>
                Geselecteerd: {selectedTools.includes("geen") ? "Geen van deze" : toolCount}
                {!selectedTools.includes("geen") ? " / 6" : ""}
              </div>
              <button type="button" style={getSecondaryButtonStyle()} onClick={onClearTools}>
                Wis selectie
              </button>
            </div>
          </>
        ) : null}

        <div style={{ display: "flex", gap: "clamp(10px, 1.4vh, 12px)", flexWrap: "wrap" }}>
          <button type="button" style={getSecondaryButtonStyle()} onClick={onBack}>
            Vorige
          </button>
          {isMulti ? (
            <button type="button" style={getPrimaryButtonStyle(false)} onClick={onNext}>
              Verder
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
