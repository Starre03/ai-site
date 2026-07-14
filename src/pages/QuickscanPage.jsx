import { useEffect, useMemo, useRef, useState } from "react";
import CalculatingScreen from "../components/quickscan/CalculatingScreen.jsx";
import GateForm from "../components/quickscan/GateForm.jsx";
import ProgressBar from "../components/quickscan/ProgressBar.jsx";
import QuestionStep from "../components/quickscan/QuestionStep.jsx";
import ScoreHero from "../components/quickscan/ScoreHero.jsx";
import { getPrimaryButtonStyle, pageCardStyle } from "../components/quickscan/styles.js";
import { usePageSeo } from "../components/ui";
import benefitCostIcon from "../assets/quickscan-benefit-cost.png";
import benefitEfficiencyIcon from "../assets/quickscan-benefit-efficiency.png";
import benefitTimeIcon from "../assets/quickscan-benefit-time.png";
import { BODY, C } from "../lib/theme";
import {
  getAiFollowupQuestionTitle,
  getAiUsageQuestionTitle,
  getHourlyValueQuestionTitle,
  getPainPointOptions,
  getPainPointQuestionTitle,
  getToolOptions,
  QUESTIONS,
  QUICKSCAN_VERSION,
  STEP_IDS,
} from "../lib/quickscan/config.js";
import { buildSubmissionPayload, createQuickscanResult, quickscanLog } from "../lib/quickscan/index.js";
import { createIdempotencyKey } from "../lib/submission.js";
import { saveQuickscanSubmission } from "../lib/supabase/quickscan.js";

function createInitialAnswers() {
  return {
    name: "",
    companyName: "",
    processType: "",
    painPoint: "",
    weeklyHours: "",
    hourlyValueRange: "",
    hourlyValueManual: "",
    tools: [],
    aiUsage: "",
    aiIssue: "",
    urgency: "",
  };
}

async function submitQuickscanPreview(payload) {
  const submission = await saveQuickscanSubmission(payload);

  quickscanLog("scan_complete", {
    submissionStatus: submission.ok ? "saved" : submission.skipped ? "skipped" : "failed",
    attempts: submission.attempts || null,
  });

  return submission;
}

function getDynamicQuestion(stepId, answers) {
  const baseQuestion = QUESTIONS.find((question) => question.stepId === stepId) || null;

  if (!baseQuestion) {
    return baseQuestion;
  }

  if (baseQuestion.id === "tools") {
    return {
      ...baseQuestion,
      options: getToolOptions(answers.processType),
    };
  }

  if (baseQuestion.id === "hourlyValue") {
    return {
      ...baseQuestion,
      title: getHourlyValueQuestionTitle(answers.painPoint, answers.processType),
    };
  }

  if (baseQuestion.id === "aiUsage") {
    return {
      ...baseQuestion,
      title: getAiUsageQuestionTitle(answers.painPoint),
    };
  }

  if (baseQuestion.id === "aiIssue") {
    return {
      ...baseQuestion,
      title: getAiFollowupQuestionTitle(answers.painPoint),
    };
  }

  if (baseQuestion.id !== "painPoint") {
    return baseQuestion;
  }

  return {
    ...baseQuestion,
    title: getPainPointQuestionTitle(answers.processType),
    options: getPainPointOptions(answers.processType),
  };
}

function getFlowStepIds(answers) {
  const shouldAskAiFollowup = ["regelmatig", "vast-onderdeel"].includes(answers.aiUsage);

  return STEP_IDS.filter((stepId) => shouldAskAiFollowup || stepId !== "v5-ai-frictie");
}

export default function QuickscanPage() {
  usePageSeo({
    title: "StarLeo | Quickscan",
    description: "Quickscan voor een eerste indicatie van tijdlekken, proceskansen en mogelijke vervolgstappen.",
  });

  const [screenIndex, setScreenIndex] = useState(0);
  const [answers, setAnswers] = useState(createInitialAnswers);
  const [contact, setContact] = useState({
    email: "",
    marketingOptIn: false,
    website: "",
  });
  const [errors, setErrors] = useState({});
  const [gateSubmitting, setGateSubmitting] = useState(false);
  const [gateSubmitError, setGateSubmitError] = useState("");
  const [submittedContact, setSubmittedContact] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [goingBack, setGoingBack] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const lastStepRef = useRef(null);
  const gateSubmittingRef = useRef(false);
  const idempotencyKeyRef = useRef(createIdempotencyKey("quickscan"));
  const CALCULATION_DURATION_MS = 9600;

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const flowStepIds = useMemo(() => getFlowStepIds(answers), [answers]);
  const currentStepId = flowStepIds[Math.min(screenIndex, flowStepIds.length - 1)];
  const currentQuestion = useMemo(() => getDynamicQuestion(currentStepId, answers), [currentStepId, answers]);
  const assessment = useMemo(() => createQuickscanResult(answers), [answers]);
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
    setGoingBack(false);
    setScreenIndex(1);
  }

  function handleBack() {
    setErrors({});
    setGoingBack(true);
    setScreenIndex((current) => Math.max(0, current - 1));
  }

  function handleNext() {
    if (currentQuestion?.kind === "profile") {
      const nextErrors = {};

      if (!answers.name.trim()) {
        nextErrors.name = "Vul uw naam in.";
      }

      if (!answers.companyName.trim()) {
        nextErrors.companyName = "Vul uw bedrijfsnaam in.";
      }

      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        return;
      }
    }

    if (currentQuestion?.kind === "multi") {
      const selectedValues = Array.isArray(answers[currentQuestion.id]) ? answers[currentQuestion.id] : [];

      if (selectedValues.length === 0) {
        setErrors({
          [currentQuestion.id]: "Kies minimaal één optie.",
        });
        return;
      }
    }

    if (currentQuestion?.kind === "hourly-value") {
      const hasRange = Boolean(answers.hourlyValueRange);
      const hasManualValue = Number.parseFloat(answers.hourlyValueManual) > 0;

      if (!hasRange && !hasManualValue) {
        setErrors({
          hourlyValue: "Kies een range of vul zelf een uurwaarde in.",
        });
        return;
      }
    }

    setErrors({});
    setGoingBack(false);
    setScreenIndex((current) => Math.min(flowStepIds.length - 1, current + 1));
  }

  function handleProfileChange(key, value) {
    setAnswers((current) => ({
      ...current,
      [key]: value,
    }));
    setErrors((current) => ({
      ...current,
      [key]: "",
    }));
  }

  function handleSingleSelect(key, value) {
    setAnswers((current) => {
      const nextAnswers = {
        ...current,
        [key]: value,
      };

      if (key === "processType") {
        nextAnswers.painPoint = "";
        nextAnswers.tools = [];
      }

      if (key === "aiUsage" && !["regelmatig", "vast-onderdeel"].includes(value)) {
        nextAnswers.aiIssue = "";
      }

      return nextAnswers;
    });
    setErrors({});
    setGoingBack(false);
    setScreenIndex((current) => Math.min(getFlowStepIds({ ...answers, [key]: value }).length - 1, current + 1));
  }

  function handleHourlyValueRangeSelect(value) {
    setAnswers((current) => ({
      ...current,
      hourlyValueRange: current.hourlyValueRange === value ? "" : value,
      hourlyValueManual: "",
    }));
    setErrors((current) => ({
      ...current,
      hourlyValue: "",
    }));
  }

  function handleHourlyValueManualChange(value) {
    const sanitizedValue = value.replace(/[^\d]/g, "");

    setAnswers((current) => ({
      ...current,
      hourlyValueManual: sanitizedValue,
      hourlyValueRange: sanitizedValue ? "" : current.hourlyValueRange,
    }));
    setErrors((current) => ({
      ...current,
      hourlyValue: "",
    }));
  }

  function handleMultiToggle(key, value) {
    setAnswers((current) => {
      const currentValues = Array.isArray(current[key]) ? current[key] : [];

      if (value === "anders-geen") {
        return {
          ...current,
          [key]: currentValues.includes("anders-geen") ? [] : ["anders-geen"],
        };
      }

      const withoutNone = currentValues.filter((tool) => tool !== "anders-geen");

      if (withoutNone.includes(value)) {
        return {
          ...current,
          [key]: withoutNone.filter((tool) => tool !== value),
        };
      }

      return {
        ...current,
        [key]: [...withoutNone, value],
      };
    });
    setErrors((current) => ({
      ...current,
      [key]: "",
    }));
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
    if (gateSubmittingRef.current) return;

    const nextErrors = {};

    if (!contact.email.trim()) {
      nextErrors.email = "Vul uw e-mailadres in.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) {
      nextErrors.email = "Gebruik een geldig e-mailadres.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    if (contact.website) {
      quickscanLog("spam_honeypot_blocked", { form: "quickscan" });
      return;
    }

    gateSubmittingRef.current = true;
    setGateSubmitting(true);
    setGateSubmitError("");

    const nextContact = {
      name: answers.name.trim(),
      companyName: answers.companyName.trim(),
      email: contact.email.trim(),
      marketingOptIn: contact.marketingOptIn,
      website: "",
    };
    const basePayload = buildSubmissionPayload(assessment, nextContact);
    const payload = {
      ...basePayload,
      meta: {
        ...basePayload.meta,
        idempotencyKey: idempotencyKeyRef.current,
      },
    };

    setIsCalculating(true);
    const minDelay = new Promise((resolve) => setTimeout(resolve, CALCULATION_DURATION_MS));

    try {
      const submission = await submitQuickscanPreview(payload).catch(() => null);

      if (!submission?.ok) {
        setGateSubmitError("Uw analyse kon niet worden opgeslagen. Probeer het nog een keer.");
        setIsCalculating(false);
        return;
      }

      await minDelay;
      setSubmittedContact(nextContact);
      setScreenIndex(flowStepIds.length - 1);
      setIsCalculating(false);
    } finally {
      gateSubmittingRef.current = false;
      setGateSubmitting(false);
    }
  }

  function handleReset() {
    setAnswers(createInitialAnswers());
    setContact({
      email: "",
      marketingOptIn: false,
      website: "",
    });
    setSubmittedContact(null);
    setErrors({});
    setGateSubmitError("");
    setGateSubmitting(false);
    gateSubmittingRef.current = false;
    idempotencyKeyRef.current = createIdempotencyKey("quickscan");
    setScreenIndex(1);
  }

  function handleEditGate() {
    setSubmittedContact(null);
    setGateSubmitError("");
    idempotencyKeyRef.current = createIdempotencyKey("quickscan");
    setScreenIndex(flowStepIds.length - 2);
  }

  function handleCtaClick(ctaType = assessment.routing.recommendedCTA) {
    quickscanLog("cta_click", {
      ctaType,
      primaryService: assessment.routing.primaryService,
      secondaryService: assessment.routing.secondaryService,
    });
  }

  const progressIndex = currentQuestion ? QUESTIONS.findIndex((question) => question.stepId === currentStepId) + 1 : 0;
  const progressQuestionStepIds = flowStepIds.filter((stepId) => QUESTIONS.some((question) => question.stepId === stepId));
  const dynamicProgressIndex = currentQuestion ? progressQuestionStepIds.indexOf(currentStepId) + 1 : 0;
  const showProgress = Boolean(currentQuestion) && !isCalculating;

  const pageStyle = {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, rgba(14,165,233,0.16), transparent 26%), radial-gradient(circle at bottom right, rgba(34,197,94,0.1), transparent 22%), linear-gradient(180deg, #07111F 0%, #0B1120 42%, #08111D 100%)",
    color: C.text,
    fontFamily: BODY,
    padding: "clamp(72px, 10vh, 96px) clamp(16px, 3vw, 24px) clamp(40px, 6vh, 56px)",
  };

  const frameStyle = {
    width: "min(1120px, 100%)",
    margin: "0 auto",
    display: "grid",
    gap: "clamp(16px, 2.4vh, 24px)",
  };

  return (
    <div style={pageStyle}>
      <div style={frameStyle}>
        {showProgress ? <ProgressBar currentIndex={dynamicProgressIndex || progressIndex} totalSteps={progressQuestionStepIds.length} /> : null}

        {isCalculating ? (
          <CalculatingScreen
            durationMs={CALCULATION_DURATION_MS}
            companyName={answers.companyName}
          />
        ) : null}

        {!isCalculating && currentStepId === "intro" ? (
          <section
            style={{
              ...pageCardStyle,
              display: "grid",
              gap: "clamp(18px, 2.8vh, 28px)",
              overflow: "hidden",
              position: "relative",
              minHeight: "min(76vh, 760px)",
              alignContent: "center",
            }}
          >
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
            <div
              style={{
                display: "grid",
                gap: "clamp(12px, 1.8vh, 16px)",
                maxWidth: 1280,
                margin: "0 auto",
                textAlign: "center",
                justifyItems: "center",
              }}
            >
              <h1
                className={`quickscan-stagger${isMounted ? " is-mounted" : ""}`}
                style={{
                  fontSize: "clamp(2.15rem, min(6vw, 10.5vh), 4.6rem)",
                  lineHeight: 0.96,
                  letterSpacing: "-0.04em",
                  margin: 0,
                  maxWidth: 1320,
                  animationDelay: "0ms",
                }}
              >
                <span style={{ display: "block" }}>
                  Zie in <span style={{ color: "#38BDF8" }}>2</span> minuten
                </span>
                <span style={{ display: "block" }}>waar uw bedrijf</span>
                <span style={{ display: "block" }}>tijd en geld laat liggen.</span>
              </h1>
              <p
                className={`quickscan-stagger${isMounted ? " is-mounted" : ""}`}
                style={{
                  color: C.textSoft,
                  fontSize: "clamp(0.96rem, min(1.6vw, 2.4vh), 1rem)",
                  lineHeight: 1.7,
                  margin: 0,
                  maxWidth: 620,
                  animationDelay: "120ms",
                }}
              >
                U ziet waar tijd en geld te winnen valt, welke kansen er liggen en welke stap nu logisch is.
              </p>
            </div>

            <div
              className={`quickscan-stagger${isMounted ? " is-mounted" : ""}`}
              style={{
                display: "grid",
                gap: "clamp(8px, 1.2vh, 10px)",
                justifyItems: "center",
                animationDelay: "260ms",
              }}
            >
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                <button type="button" onClick={handleStart} style={getPrimaryButtonStyle(false)}>
                  Start quickscan
                </button>
              </div>
            </div>

            <div
              className={`quickscan-benefits quickscan-stagger${isMounted ? " is-mounted" : ""}`}
              style={{ animationDelay: "380ms" }}
            >
              {[
                { key: "time", icon: benefitTimeIcon, label: "Tijd besparen" },
                { key: "efficiency", icon: benefitEfficiencyIcon, label: "Efficiënter werken" },
                { key: "cost", icon: benefitCostIcon, label: "Kosten verlagen" },
              ].map((item) => (
                <div key={item.key} className="quickscan-benefit">
                  <span className="quickscan-benefit-icon" aria-hidden="true">
                    <img src={item.icon} alt="" />
                  </span>
                  <span className="quickscan-benefit-label">{item.label}</span>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {!isCalculating && currentQuestion ? (
          <QuestionStep
            key={currentQuestion.id}
            question={currentQuestion}
            answers={answers}
            errors={errors}
            goingBack={goingBack}
            onProfileChange={handleProfileChange}
            onSingleSelect={handleSingleSelect}
            onHourlyValueRangeSelect={handleHourlyValueRangeSelect}
            onHourlyValueManualChange={handleHourlyValueManualChange}
            onToolToggle={handleMultiToggle}
            onClearTools={() => setAnswers((current) => ({ ...current, tools: [] }))}
            onBack={handleBack}
            onNext={handleNext}
          />
        ) : null}

        {!isCalculating && currentStepId === "gate" ? (
          <GateForm
            contact={contact}
            errors={errors}
            assessment={assessment}
            onChange={handleContactChange}
            onToggleOptIn={handleOptInToggle}
            onBack={handleBack}
            onSubmit={handleGateSubmit}
            submitting={gateSubmitting}
            submitError={gateSubmitError}
          />
        ) : null}

        {!isCalculating && currentStepId === "resultaat" && submittedContact && submissionPayload ? (
          <section style={{ display: "grid", gap: "clamp(14px, 2vh, 18px)" }}>
            <ScoreHero result={assessment} recommendations={assessment.recommendations} onCtaClick={handleCtaClick} />

            <section style={{ ...pageCardStyle, display: "grid", gap: "clamp(10px, 1.5vh, 12px)" }}>
              <div style={{ display: "flex", gap: "clamp(10px, 1.4vh, 12px)", flexWrap: "wrap" }}>
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
              <div style={{ color: C.textSoft, lineHeight: 1.7, fontSize: "clamp(0.92rem, min(1.45vw, 2vh), 1rem)" }}>
                Uw analyse is veilig opgeslagen. U kunt de resultaten hierboven rustig bekijken.
              </div>
            </section>
          </section>
        ) : null}
      </div>
    </div>
  );
}
