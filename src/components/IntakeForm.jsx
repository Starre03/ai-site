import { useMemo, useState } from "react";
import { intakeSteps } from "../content/siteContent";
import { BODY, C } from "../lib/theme";
import { GlowCard, PrimaryButton, Reveal, SectionHeading } from "./ui";

function InputField({ field, value, onChange, selected, onToggle, error }) {
  const chipStyle = (isSelected) => ({
    padding: "7px 14px",
    borderRadius: 7,
    cursor: "pointer",
    fontFamily: BODY,
    fontSize: "0.77rem",
    border: `1px solid ${isSelected ? `${C.primary}55` : C.border}`,
    background: isSelected ? C.primary : "transparent",
    color: isSelected ? C.bg : C.textMuted,
    fontWeight: isSelected ? 600 : 400,
    transition: "all 0.3s cubic-bezier(.22,1,.36,1)",
    boxShadow: isSelected ? `0 0 0 1px ${C.primary} inset, 0 10px 30px ${C.primary}22` : "none",
  });

  if (field.type === "chips") {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {field.options.map((option) => (
          <button key={option} type="button" onClick={() => onChange(field.id, option)} style={chipStyle(value === option)}>
            {option}
          </button>
        ))}
      </div>
    );
  }

  if (field.type === "multi") {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {field.options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button key={option} type="button" onClick={() => onToggle(field.id, option)} style={chipStyle(isSelected)}>
              {isSelected ? "✓ " : ""}
              {option}
            </button>
          );
        })}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <textarea
        value={value}
        onChange={(event) => onChange(field.id, event.target.value)}
        placeholder={field.placeholder}
        rows={4}
        style={{
          width: "100%",
          padding: "12px 14px",
          background: C.bg,
          border: `1px solid ${error ? C.danger : C.border}`,
          borderRadius: 10,
          color: C.text,
          fontSize: "0.86rem",
          outline: "none",
          fontFamily: BODY,
          resize: "vertical",
        }}
      />
    );
  }

  return (
    <input
      type={field.type}
      value={value}
      onChange={(event) => onChange(field.id, event.target.value)}
      placeholder={field.placeholder}
      style={{
        width: "100%",
        padding: "11px 14px",
        background: C.bg,
        border: `1px solid ${error ? C.danger : C.border}`,
        borderRadius: 10,
        color: C.text,
        fontSize: "0.86rem",
        outline: "none",
        fontFamily: BODY,
      }}
    />
  );
}

export default function IntakeForm({
  id = "intake",
  preferredRoute,
  title,
  text,
  centered = false,
  trustPoints = [],
  steps = intakeSteps,
}) {
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState(() => (preferredRoute ? { route: preferredRoute } : {}));

  const current = steps[step];
  const isSingleStep = steps.length === 1;

  const progressLabel = useMemo(
    () => `Stap ${step + 1} van ${steps.length}: ${current.title}`,
    [current.title, step, steps.length],
  );

  const update = (idValue, nextValue) => {
    setData((currentData) => ({ ...currentData, [idValue]: nextValue }));
    setErrors((currentErrors) => ({ ...currentErrors, [idValue]: undefined }));
  };

  const toggle = (idValue, option) => {
    const active = data[idValue] || [];
    update(
      idValue,
      active.includes(option) ? active.filter((item) => item !== option) : [...active, option],
    );
  };

  const fieldIsEmpty = (field) => {
    const value = data[field.id];

    if (field.type === "multi") return !Array.isArray(value) || value.length === 0;
    if (field.type === "chips") return !value;
    return !String(value || "").trim();
  };

  const validateCurrentStep = () => {
    const nextErrors = {};

    current.fields.forEach((field) => {
      if (!field.required) return;

      if (field.type === "email") {
        const value = String(data[field.id] || "").trim();
        if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          nextErrors[field.id] = "Vul een geldig e-mailadres in";
        }
        return;
      }

      if (fieldIsEmpty(field)) {
        nextErrors[field.id] = `${field.label} is nodig`;
      }
    });

    setErrors((currentErrors) => ({ ...currentErrors, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  const jump = (direction) => {
    if (direction > 0 && !validateCurrentStep()) return;

    setAnimating(true);
    setTimeout(() => {
      setStep((currentStep) => currentStep + direction);
      setAnimating(false);
    }, 180);
  };

  const validate = () => {
    return validateCurrentStep();
  };

  const submit = async () => {
    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload = {
        ...data,
        submittedAt: new Date().toISOString(),
      };
      void payload;
      await new Promise((resolve) => setTimeout(resolve, 900));
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <section id={id} style={{ padding: "6rem clamp(1.5rem, 5vw, 5rem)", background: C.bg }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <GlowCard style={{ background: C.bg2 }}>
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: C.primaryDim,
                  color: C.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                  margin: "0 auto 16px",
                  boxShadow: `0 0 24px ${C.primary}15`,
                }}
              >
                ✓
              </div>
              <h2 style={{ fontFamily: BODY, fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
                Je intake voor StarLeo is binnen
              </h2>
              <p style={{ color: C.textSoft, marginTop: 12, lineHeight: 1.7, fontFamily: BODY }}>
                We gebruiken je antwoorden om direct inhoudelijk te spreken over AI audit, AI integraties of OpenClaw
                AI agents. Zo verlies je geen tijd aan een generiek eerste gesprek.
              </p>
            </div>
          </GlowCard>
        </div>
      </section>
    );
  }

  return (
    <section id={id} style={{ padding: "6rem clamp(1.5rem, 5vw, 5rem)", background: C.bg, position: "relative" }}>
      <div className="ambient ambient-right" />
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        {centered ? (
          <>
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "0.68rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: C.primary,
                    fontWeight: 600,
                    marginBottom: 12,
                    fontFamily: BODY,
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: 20,
                      height: 1,
                      background: C.primary,
                      marginRight: 10,
                      verticalAlign: "middle",
                      opacity: 0.5,
                    }}
                  />
                  Intake
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h2
                style={{
                  fontFamily: BODY,
                  fontSize: "clamp(2rem, 4.4vw, 3.25rem)",
                  fontWeight: 700,
                  lineHeight: 1.08,
                  letterSpacing: "-0.03em",
                  color: C.text,
                  textAlign: "center",
                  maxWidth: 760,
                  margin: "0 auto",
                }}
              >
                {title || (
                  <>
                    Plan uw AI intake.
                    <em style={{ color: C.primary, fontStyle: "italic", display: "block" }}>Dan spreken we direct concreet.</em>
                  </>
                )}
              </h2>
            </Reveal>
            {text ? (
              <Reveal delay={0.12}>
                <p
                  style={{
                    color: C.textSoft,
                    lineHeight: 1.78,
                    fontSize: "0.94rem",
                    fontFamily: BODY,
                    maxWidth: 660,
                    margin: "14px auto 0",
                    textAlign: "center",
                  }}
                >
                  {text}
                </p>
              </Reveal>
            ) : null}
            {trustPoints.length ? (
              <Reveal delay={0.16}>
                <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginTop: 22 }}>
                  {trustPoints.map((point) => (
                    <div
                      key={point}
                      style={{
                        padding: "9px 14px",
                        borderRadius: 999,
                        border: `1px solid ${C.border}`,
                        background: C.bg2,
                        color: C.textSoft,
                        fontSize: "0.8rem",
                        fontFamily: BODY,
                      }}
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </Reveal>
            ) : null}
          </>
        ) : (
          <SectionHeading
            tag="Intake"
            title={
              title || (
                <>
                  Eerst duidelijk krijgen wat nodig is,
                  <em style={{ color: C.primary, fontStyle: "italic" }}> daarna pas bouwen</em>
                </>
              )
            }
            text={
              text ||
              "Deze premium intake helpt StarLeo snel bepalen welke dienst past: AI audit, AI integraties of OpenClaw AI agents. Zo wordt het eerste gesprek direct concreet."
            }
          />
        )}
        <Reveal delay={0.18}>
          <GlowCard style={{ background: C.bg2, marginTop: centered ? 28 : 24 }}>
            <div style={{ padding: "clamp(1.2rem, 3vw, 2rem)" }}>
              <div style={{ marginBottom: 18 }}>
                {!isSingleStep ? (
                  <div
                    style={{
                      display: "flex",
                      gap: 4,
                    }}
                  >
                    {steps.map((_, index) => (
                      <div
                        key={index}
                        style={{
                          flex: 1,
                          height: 2,
                          borderRadius: 2,
                          background: index <= step ? C.primary : C.surface,
                          transition: "background 0.5s cubic-bezier(.22,1,.36,1)",
                          boxShadow: index <= step ? `0 0 6px ${C.primary}30` : "none",
                        }}
                      />
                    ))}
                  </div>
                ) : null}
                {!isSingleStep ? (
                  <div style={{ fontSize: "0.65rem", color: C.textMuted, fontFamily: BODY, marginTop: 6 }}>{progressLabel}</div>
                ) : null}
                {current.description ? (
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: C.textSoft,
                      fontFamily: BODY,
                      marginTop: 10,
                      lineHeight: 1.6,
                      textAlign: centered ? "center" : "left",
                    }}
                  >
                    {current.description}
                  </div>
                ) : null}
              </div>
              <div
                style={{
                  display: "grid",
                  gap: 18,
                  opacity: animating ? 0 : 1,
                  transform: animating ? "translateX(8px)" : "none",
                  transition: "all 0.18s ease",
                }}
              >
                {current.fields.map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      style={{
                        display: "block",
                        fontSize: "0.8rem",
                        color: C.text,
                        marginBottom: 8,
                        fontWeight: 500,
                        fontFamily: BODY,
                      }}
                    >
                      {field.label}
                      {field.required ? <span style={{ color: C.primary, marginLeft: 2 }}>*</span> : null}
                    </label>
                    <InputField
                      field={field}
                      value={data[field.id] || ""}
                      selected={data[field.id] || []}
                      onChange={update}
                      onToggle={toggle}
                      error={errors[field.id]}
                    />
                    {errors[field.id] ? (
                      <div style={{ fontSize: "0.72rem", color: C.danger, marginTop: 4, fontFamily: BODY }}>
                        {errors[field.id]}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: isSingleStep ? "center" : "space-between",
                  gap: 12,
                  marginTop: 24,
                  flexWrap: "wrap",
                }}
              >
                {!isSingleStep ? (
                  <button
                    type="button"
                    onClick={() => jump(-1)}
                    disabled={step === 0}
                    style={{
                      padding: "10px 18px",
                      borderRadius: 8,
                      border: `1px solid ${C.border}`,
                      background: "transparent",
                      color: step === 0 ? C.textMuted : C.text,
                      cursor: step === 0 ? "default" : "pointer",
                      fontSize: "0.82rem",
                      fontFamily: BODY,
                      opacity: step === 0 ? 0.35 : 1,
                    }}
                  >
                    ← Terug
                  </button>
                ) : null}
                <PrimaryButton onClick={() => (step < steps.length - 1 ? jump(1) : submit())}>
                  {submitting ? "Versturen..." : step < steps.length - 1 ? "Volgende stap →" : "Verstuur intake →"}
                </PrimaryButton>
              </div>
            </div>
          </GlowCard>
        </Reveal>
      </div>
    </section>
  );
}
