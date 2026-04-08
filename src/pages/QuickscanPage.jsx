import { useEffect, useMemo, useRef, useState } from "react";
import DimensionBreakdown from "../components/quickscan/DimensionBreakdown.jsx";
import GateForm from "../components/quickscan/GateForm.jsx";
import ProgressBar from "../components/quickscan/ProgressBar.jsx";
import QuestionStep from "../components/quickscan/QuestionStep.jsx";
import SavingsCard from "../components/quickscan/SavingsCard.jsx";
import ScoreHero from "../components/quickscan/ScoreHero.jsx";
import { getPrimaryButtonStyle, pageCardStyle } from "../components/quickscan/styles.js";
import { usePageSeo } from "../components/ui";
import iconCost from "../assets/quickscan-icon-cost.png";
import iconEfficiency from "../assets/quickscan-icon-efficiency.png";
import iconTime from "../assets/quickscan-icon-time.png";
import { BODY, C } from "../lib/theme";
import { QUESTIONS, QUICKSCAN_VERSION, STEP_IDS } from "../lib/quickscan/config.js";
import { buildSubmissionPayload, createQuickscanResult, quickscanLog } from "../lib/quickscan/index.js";

function createInitialAnswers() {
  return {
    sector: "",
    teamSize: "",
    workFocus: "",
    weeklyHours: "",
    tools: [],
    aiUsage: "",
    painPoint: "",
  };
}

async function submitQuickscanPreview(payload) {
  quickscanLog("scan_complete", { payload });
  return payload;
}

export default function QuickscanPage() {
  usePageSeo({
    title: "STARRE.AI | Quickscan",
    description: "Quickscan voor een eerste indicatie van AI-volwassenheid, procesfrictie en mogelijke vervolgstappen.",
  });

  const [screenIndex, setScreenIndex] = useState(0);
  const [scenario, setScenario] = useState("gemiddeld");
  const [answers, setAnswers] = useState(createInitialAnswers);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    marketingOptIn: false,
  });
  const [errors, setErrors] = useState({});
  const [submittedContact, setSubmittedContact] = useState(null);
  const lastStepRef = useRef(null);

  const currentStepId = STEP_IDS[screenIndex];
  const currentQuestion = QUESTIONS.find((question) => question.stepId === currentStepId) || null;
  const assessment = useMemo(() => createQuickscanResult(answers, scenario), [answers, scenario]);
  const submissionPayload = useMemo(
    () => (submittedContact ? buildSubmissionPayload(assessment, submittedContact) : null),
    [assessment, submittedContact],
  );

  useEffect(() => {
    if (lastStepRef.current === currentStepId) {
      return;
    }

    lastStepRef.current = currentStepId;
    quickscanLog("step_view", { stepId: currentStepId });
  }, [currentStepId]);

  function handleStart() {
    quickscanLog("scan_start", { version: QUICKSCAN_VERSION });
    setScreenIndex(1);
  }

  function handleBack() {
    setErrors({});
    setScreenIndex((current) => Math.max(0, current - 1));
  }

  function handleNext() {
    setErrors({});
    setScreenIndex((current) => Math.min(STEP_IDS.length - 1, current + 1));
  }

  function handleSingleSelect(key, value) {
    setAnswers((current) => ({
      ...current,
      [key]: value,
    }));
    setErrors({});
    setScreenIndex((current) => Math.min(STEP_IDS.length - 1, current + 1));
  }

  function handleToolToggle(value) {
    setAnswers((current) => {
      const currentTools = current.tools || [];

      if (value === "geen") {
        return {
          ...current,
          tools: currentTools.includes("geen") ? [] : ["geen"],
        };
      }

      const withoutNone = currentTools.filter((tool) => tool !== "geen");

      if (withoutNone.includes(value)) {
        return {
          ...current,
          tools: withoutNone.filter((tool) => tool !== value),
        };
      }

      if (withoutNone.length >= 6) {
        return current;
      }

      return {
        ...current,
        tools: [...withoutNone, value],
      };
    });
  }

  function handleScenarioChange(nextScenario) {
    setScenario(nextScenario);
    quickscanLog("scenario_change", {
      scenario: nextScenario,
      monthlyLow: createQuickscanResult(answers, nextScenario).savings.monthlyLow,
      monthlyHigh: createQuickscanResult(answers, nextScenario).savings.monthlyHigh,
    });
  }

  function handleContactChange(key, value) {
    setContact((current) => ({
      ...current,
      [key]: value,
    }));
    setErrors((current) => ({
      ...current,
      [key]: "",
    }));
  }

  function handleOptInToggle() {
    setContact((current) => {
      const nextValue = !current.marketingOptIn;
      quickscanLog("optin_toggle", { checked: nextValue });

      return {
        ...current,
        marketingOptIn: nextValue,
      };
    });
  }

  async function handleGateSubmit(event) {
    event.preventDefault();

    const nextErrors = {};

    if (!contact.name.trim()) {
      nextErrors.name = "Vul je naam in.";
    }

    if (!contact.email.trim()) {
      nextErrors.email = "Vul je e-mailadres in.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) {
      nextErrors.email = "Gebruik een geldig e-mailadres.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const nextContact = {
      name: contact.name.trim(),
      email: contact.email.trim(),
      marketingOptIn: contact.marketingOptIn,
    };
    const payload = buildSubmissionPayload(assessment, nextContact);

    await submitQuickscanPreview(payload);
    setSubmittedContact(nextContact);
    setScreenIndex(STEP_IDS.length - 1);
  }

  function handleReset() {
    setAnswers(createInitialAnswers());
    setContact({
      name: "",
      email: "",
      marketingOptIn: false,
    });
    setSubmittedContact(null);
    setScenario("gemiddeld");
    setErrors({});
    setScreenIndex(1);
  }

  function handleEditGate() {
    setScreenIndex(STEP_IDS.length - 2);
  }

  function handleCtaClick(ctaType = assessment.routing.recommendedCTA) {
    quickscanLog("cta_click", {
      ctaType,
      primaryService: assessment.routing.primaryService,
      secondaryService: assessment.routing.secondaryService,
    });
  }

  const progressIndex = Math.min(screenIndex, QUESTIONS.length + 1);
  const showProgress = screenIndex > 0 && screenIndex < STEP_IDS.length - 1;

  const pageStyle = {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, rgba(14,165,233,0.16), transparent 26%), radial-gradient(circle at bottom right, rgba(34,197,94,0.1), transparent 22%), linear-gradient(180deg, #07111F 0%, #0B1120 42%, #08111D 100%)",
    color: C.text,
    fontFamily: BODY,
    padding: "96px 24px 56px",
  };

  const frameStyle = {
    width: "min(1120px, 100%)",
    margin: "0 auto",
    display: "grid",
    gap: 24,
  };

  return (
    <div style={pageStyle}>
      <div style={frameStyle}>
        {showProgress ? <ProgressBar currentIndex={progressIndex} totalSteps={QUESTIONS.length + 1} /> : null}

        {currentStepId === "intro" ? (
          <section style={{ ...pageCardStyle, display: "grid", gap: 28, overflow: "hidden", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: "auto -60px -120px auto",
                width: 280,
                height: 280,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(14,165,233,0.18), transparent 68%)",
                pointerEvents: "none",
              }}
            />
            <div style={{ display: "grid", gap: 16, maxWidth: 1280, margin: "0 auto", textAlign: "center", justifyItems: "center" }}>
              <h1
                style={{
                  fontSize: "clamp(2.3rem, 6vw, 4.6rem)",
                  lineHeight: 0.96,
                  letterSpacing: "-0.04em",
                  margin: 0,
                  maxWidth: 1320,
                }}
              >
                <span style={{ display: "block" }}>Zie in 2 minuten</span>
                <span style={{ display: "block" }}>waar je bedrijf</span>
                <span style={{ display: "block" }}>tijd en geld laat liggen.</span>
              </h1>
              <p style={{ color: C.textSoft, fontSize: "1rem", lineHeight: 1.7, margin: 0, maxWidth: 620 }}>
                Ontdek welke processen je vandaag efficiënter kunt inrichten met AI.
              </p>
            </div>

            <div style={{ display: "grid", gap: 10, justifyItems: "center" }}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                <button type="button" onClick={handleStart} style={getPrimaryButtonStyle(false)}>
                  Start quickscan
                </button>
              </div>
            </div>

	            <div
	              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 14,
                width: "min(580px, 100%)",
                margin: "0 auto",
              }}
	            >
	              {[
                { key: "time", label: "Tijd besparen", icon: iconTime },
                { key: "efficiency", label: "Efficiënter werken", icon: iconEfficiency },
                { key: "cost", label: "Kosten verlagen", icon: iconCost },
	              ].map((item) => (
                <div
                  key={item.key}
                  style={{
                    display: "grid",
                    justifyItems: "center",
                    alignContent: "start",
                    gap: 10,
                    color: C.textSoft,
                    fontSize: "0.98rem",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 86,
                      height: 66,
                    }}
                  >
                    <img
                      src={item.icon}
                      alt=""
                      aria-hidden="true"
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                        objectFit: "contain",
                      }}
                    />
                  </span>
                  <span style={{ lineHeight: 1.45 }}>{item.label}</span>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {currentQuestion ? (
            <QuestionStep
              question={currentQuestion}
              answers={answers}
            onSingleSelect={handleSingleSelect}
            onToolToggle={handleToolToggle}
            onClearTools={() => setAnswers((current) => ({ ...current, tools: [] }))}
              onBack={handleBack}
              onNext={handleNext}
            />
        ) : null}

        {currentStepId === "gate" ? (
          <GateForm
            contact={contact}
            errors={errors}
            assessment={assessment}
            onChange={handleContactChange}
            onToggleOptIn={handleOptInToggle}
            onBack={handleBack}
            onSubmit={handleGateSubmit}
          />
        ) : null}

        {currentStepId === "resultaat" && submittedContact && submissionPayload ? (
          <section style={{ display: "grid", gap: 18 }}>
            <ScoreHero result={assessment} recommendations={assessment.recommendations} onCtaClick={handleCtaClick} />
            <SavingsCard savings={assessment.savings} onScenarioChange={handleScenarioChange} />
            <DimensionBreakdown items={assessment.dimensionInterpretations} />

            <section style={{ ...pageCardStyle, display: "grid", gap: 12 }}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button type="button" style={{ ...getPrimaryButtonStyle(false), background: "rgba(255,255,255,0.08)", boxShadow: "none" }} onClick={handleReset}>
                  Opnieuw doorlopen
                </button>
                <button
                  type="button"
                  style={{
                    padding: "14px 18px",
                    borderRadius: 14,
                    border: "1px solid rgba(255,255,255,0.18)",
                    background: "rgba(255,255,255,0.06)",
                    color: C.text,
                    cursor: "pointer",
                    fontFamily: BODY,
                    fontSize: "0.95rem",
                  }}
                  onClick={handleEditGate}
                >
                  Gegevens aanpassen
                </button>
              </div>
              <div style={{ color: C.textSoft, lineHeight: 1.7 }}>
                Analyse gekoppeld aan {submissionPayload.contact.email}. De live koppeling voor rapport, CRM of opvolging kan later op deze payload worden aangesloten.
              </div>
            </section>
          </section>
        ) : null}
      </div>
    </div>
  );
}
