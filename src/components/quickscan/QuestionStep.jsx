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

  return (
    <section
      style={{
        ...pageCardStyle,
        display: "grid",
        gap: 28,
        maxWidth: 860,
        margin: "0 auto",
      }}
    >
      <div style={{ display: "grid", gap: 22 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <h2 style={sectionTitleStyle}>{question.title}</h2>
        </div>

        {question.kind === "single" ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
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
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 14,
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

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ color: C.textSoft, fontSize: "0.92rem", fontFamily: BODY }}>
                Geselecteerd: {selectedTools.includes("geen") ? "Geen van deze" : toolCount}
                {!selectedTools.includes("geen") ? " / 6" : ""}
              </div>
              <button type="button" style={getSecondaryButtonStyle()} onClick={onClearTools}>
                Wis selectie
              </button>
            </div>
          </>
        ) : null}

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
