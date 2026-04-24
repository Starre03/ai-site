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
  errors = {},
  onProfileChange,
  onSingleSelect,
  onHourlyValueRangeSelect,
  onHourlyValueManualChange,
  onToolToggle,
  onClearTools,
  onBack,
  onNext,
}) {
  const isMulti = question.kind === "multi";
  const selectedValues = Array.isArray(answers[question.id]) ? answers[question.id] : [];
  const selectedTools = answers.tools || [];
  const toolCount = selectedTools.filter((tool) => tool !== "anders-geen").length;
  const isToolsStep = question.id === "tools";
  const answerGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
    gap: "clamp(10px, 1.6vh, 14px)",
    width: "min(1028px, 100%)",
    margin: "0 auto",
  };

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

  const manualHourlyValue = answers.hourlyValueManual || "";
  const selectedHourlyRange = answers.hourlyValueRange || "";

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
        <div
          style={{
            display: "grid",
            gap: "clamp(8px, 1.2vh, 10px)",
            justifyItems: "center",
            textAlign: "center",
          }}
        >
          <h2 style={{ ...sectionTitleStyle, textAlign: "center" }}>{question.title}</h2>
          {question.description ? (
            <p style={{ color: C.textSoft, fontSize: "clamp(0.92rem, min(1.45vw, 2vh), 1rem)", fontFamily: BODY, lineHeight: 1.6, margin: 0 }}>
              {question.description}
            </p>
          ) : null}
        </div>

        {question.kind === "profile" ? (
          <div style={{ display: "grid", gap: "clamp(10px, 1.4vh, 12px)" }}>
            <div style={{ display: "grid", gap: "clamp(6px, 0.9vh, 8px)" }}>
              <label htmlFor="quickscan-profile-name" style={{ color: C.textMuted, fontFamily: BODY, fontSize: "clamp(0.84rem, min(1.2vw, 1.7vh), 0.88rem)" }}>
                Naam
              </label>
              <input
                id="quickscan-profile-name"
                type="text"
                placeholder="Je naam"
                value={answers.name || ""}
                onChange={(event) => onProfileChange("name", event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "quickscan-profile-name-error" : undefined}
                style={fieldStyle}
              />
              {errors.name ? <span id="quickscan-profile-name-error" style={{ color: "#FCA5A5", fontSize: "0.88rem", fontFamily: BODY }}>{errors.name}</span> : null}
            </div>

            <div style={{ display: "grid", gap: "clamp(6px, 0.9vh, 8px)" }}>
              <label htmlFor="quickscan-profile-company" style={{ color: C.textMuted, fontFamily: BODY, fontSize: "clamp(0.84rem, min(1.2vw, 1.7vh), 0.88rem)" }}>
                Bedrijfsnaam
              </label>
              <input
                id="quickscan-profile-company"
                type="text"
                placeholder="Bedrijfsnaam"
                value={answers.companyName || ""}
                onChange={(event) => onProfileChange("companyName", event.target.value)}
                aria-invalid={Boolean(errors.companyName)}
                aria-describedby={errors.companyName ? "quickscan-profile-company-error" : undefined}
                style={fieldStyle}
              />
              {errors.companyName ? <span id="quickscan-profile-company-error" style={{ color: "#FCA5A5", fontSize: "0.88rem", fontFamily: BODY }}>{errors.companyName}</span> : null}
            </div>
          </div>
        ) : null}

        {question.kind === "single" ? (
          <div style={answerGridStyle}>
            {question.options.map((option, index) => {
              const isLastOddItem = question.options.length % 2 === 1 && index === question.options.length - 1 && question.options.length > 1;

              return (
              <button
                key={option.value}
                type="button"
                style={{
                  ...getChipStyle({ active: answers[question.id] === option.value }),
                  gridColumn: isLastOddItem ? "1 / -1" : undefined,
                  width: isLastOddItem ? "calc(50% - 7px)" : "100%",
                  justifySelf: isLastOddItem ? "center" : "stretch",
                }}
                aria-pressed={answers[question.id] === option.value}
                onClick={() => onSingleSelect(question.id, option.value)}
              >
                {option.label}
              </button>
              );
            })}
          </div>
        ) : null}

        {question.kind === "hourly-value" ? (
          <div style={{ display: "grid", gap: "clamp(14px, 2vh, 16px)", justifyItems: "center" }}>
            <div style={answerGridStyle}>
              {question.options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  style={getChipStyle({ active: selectedHourlyRange === option.value && !manualHourlyValue })}
                  aria-pressed={selectedHourlyRange === option.value && !manualHourlyValue}
                  onClick={() => onHourlyValueRangeSelect(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div style={{ width: "min(1028px, 100%)", display: "grid", gap: "clamp(8px, 1.2vh, 10px)", justifyItems: "center" }}>
              <span style={{ color: C.textSoft, fontFamily: BODY, fontSize: "clamp(0.88rem, min(1.35vw, 1.9vh), 0.92rem)" }}>
                Of vul zelf een uurwaarde in
              </span>
              <div style={{ width: "min(320px, 100%)", position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: C.textSoft,
                    fontFamily: BODY,
                    fontSize: "clamp(0.92rem, min(1.5vw, 2vh), 0.96rem)",
                    pointerEvents: "none",
                  }}
                >
                  €
                </span>
                <input
                  inputMode="numeric"
                  type="text"
                  placeholder="Bijvoorbeeld 65"
                  value={manualHourlyValue}
                  onChange={(event) => onHourlyValueManualChange(event.target.value)}
                  aria-invalid={Boolean(errors.hourlyValue)}
                  aria-describedby={errors.hourlyValue ? "quickscan-hourly-error" : undefined}
                  style={{
                    ...fieldStyle,
                    paddingLeft: 34,
                    textAlign: "left",
                  }}
                />
              </div>
              {errors.hourlyValue ? <span id="quickscan-hourly-error" style={{ color: "#FCA5A5", fontSize: "0.88rem", fontFamily: BODY }}>{errors.hourlyValue}</span> : null}
            </div>
          </div>
        ) : null}

        {isMulti ? (
          <>
            <div style={answerGridStyle}>
              {question.options.map((option) => {
                const active = selectedValues.includes(option.value);
                const disabled =
                  Boolean(question.maxSelections) && !active && selectedValues.length >= question.maxSelections;

                return (
                  <button
                    key={option.value}
                    type="button"
                    style={getChipStyle({ active, disabled })}
                    disabled={disabled}
                    aria-pressed={active}
                    onClick={() => onToolToggle(question.id, option.value)}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: "clamp(10px, 1.4vh, 12px)", flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ color: C.textSoft, fontSize: "clamp(0.88rem, min(1.4vw, 1.9vh), 0.92rem)", fontFamily: BODY }}>
                {isToolsStep
                  ? `Geselecteerd: ${selectedTools.includes("anders-geen") ? "Anders / geen vaste tools" : toolCount}`
                  : `Geselecteerd: ${selectedValues.length}${question.maxSelections ? ` / ${question.maxSelections}` : ""}`}
              </div>
              {errors[question.id] ? <span style={{ color: "#FCA5A5", fontSize: "0.88rem", fontFamily: BODY }}>{errors[question.id]}</span> : null}
              {isToolsStep ? (
                <button type="button" style={getSecondaryButtonStyle()} onClick={onClearTools}>
                  Wis selectie
                </button>
              ) : null}
            </div>
          </>
        ) : null}

        <div style={{ display: "flex", gap: "clamp(10px, 1.4vh, 12px)", flexWrap: "wrap", justifyContent: "center" }}>
          <button type="button" style={getSecondaryButtonStyle()} onClick={onBack}>
            Vorige
          </button>
          {question.kind === "profile" || question.kind === "hourly-value" || isMulti ? (
            <button type="button" style={getPrimaryButtonStyle(false)} onClick={onNext}>
              Verder
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
