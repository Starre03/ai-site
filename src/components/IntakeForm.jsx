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
    border: `1px solid ${isSelected ? `${C.primary}40` : C.border}`,
    background: isSelected ? C.primaryDim : "transparent",
    color: isSelected ? C.primaryLight : C.textMuted,
    fontWeight: isSelected ? 600 : 400,
    transition: "all 0.3s cubic-bezier(.22,1,.36,1)",
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

export default function IntakeForm({ id = "intake", preferredRoute, title, text }) {
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState(() => (preferredRoute ? { route: preferredRoute } : {}));

  const current = intakeSteps[step];

  const progressLabel = useMemo(
    () => `Stap ${step + 1} van ${intakeSteps.length}: ${current.title}`,
    [current.title, step],
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

  const jump = (direction) => {
    setAnimating(true);
    setTimeout(() => {
      setStep((currentStep) => currentStep + direction);
      setAnimating(false);
    }, 180);
  };

  const validate = () => {
    const nextErrors = {};

    if (!data.name?.trim()) nextErrors.name = "Naam is nodig";
    if (!data.company?.trim()) nextErrors.company = "Bedrijf is nodig";
    if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      nextErrors.email = "Vul een geldig e-mailadres in";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
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
        <Reveal delay={0.18}>
          <GlowCard style={{ background: C.bg2, marginTop: 24 }}>
            <div style={{ padding: "clamp(1.2rem, 3vw, 2rem)" }}>
              <div style={{ marginBottom: 18 }}>
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                  }}
                >
                  {intakeSteps.map((_, index) => (
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
                <div style={{ fontSize: "0.65rem", color: C.textMuted, fontFamily: BODY, marginTop: 6 }}>{progressLabel}</div>
                <div style={{ fontSize: "0.75rem", color: C.textSoft, fontFamily: BODY, marginTop: 10, lineHeight: 1.6 }}>
                  {current.description}
                </div>
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
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
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
                <PrimaryButton onClick={() => (step < intakeSteps.length - 1 ? jump(1) : submit())}>
                  {submitting ? "Versturen..." : step < intakeSteps.length - 1 ? "Volgende stap →" : "Verstuur intake →"}
                </PrimaryButton>
              </div>
            </div>
          </GlowCard>
        </Reveal>
      </div>
    </section>
  );
}
