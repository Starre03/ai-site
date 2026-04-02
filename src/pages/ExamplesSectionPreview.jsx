import { useEffect, useState } from "react";
import { BODY, C } from "../lib/theme";
import { GlowCard, Reveal, SmoothSection, Tag, usePageSeo } from "../components/ui";

function DemoPreview({ item, resetKey, label, answerLabel, approvalMessage, followUp, autoDetected = false }) {
  const [qChars, setQChars] = useState(0);
  const [aChars, setAChars] = useState(0);
  const [approvalChars, setApprovalChars] = useState(0);
  const [fChars, setFChars] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showApproval, setShowApproval] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);

  useEffect(() => {
    setQChars(0);
    setAChars(0);
    setApprovalChars(0);
    setFChars(0);
    setShowAnswer(false);
    setShowApproval(false);
    setShowFollowUp(false);
  }, [resetKey]);

  useEffect(() => {
    if (qChars < item.prompt.length) {
      const timer = setTimeout(() => setQChars((current) => current + 1), 24);
      return () => clearTimeout(timer);
    }

    if (!showAnswer) {
      const timer = setTimeout(() => setShowAnswer(true), 420);
      return () => clearTimeout(timer);
    }

    if (aChars < item.answer.length) {
      const timer = setTimeout(() => setAChars((current) => current + 1), 16);
      return () => clearTimeout(timer);
    }

    if (approvalMessage && !showApproval) {
      const timer = setTimeout(() => setShowApproval(true), 440);
      return () => clearTimeout(timer);
    }

    if (approvalMessage && showApproval && approvalChars < approvalMessage.length) {
      const timer = setTimeout(() => setApprovalChars((current) => current + 1), 17);
      return () => clearTimeout(timer);
    }

    if (followUp && showApproval && approvalChars === approvalMessage.length && !showFollowUp) {
      const timer = setTimeout(() => setShowFollowUp(true), 440);
      return () => clearTimeout(timer);
    }

    if (followUp && showFollowUp && fChars < followUp.length) {
      const timer = setTimeout(() => setFChars((current) => current + 1), 16);
      return () => clearTimeout(timer);
    }
  }, [item, qChars, aChars, showAnswer, approvalMessage, showApproval, approvalChars, followUp, showFollowUp, fChars]);

  return (
    <div style={{ padding: "1.35rem", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: C.primary,
            boxShadow: `0 0 6px ${C.primary}60`,
            animation: "pulse 1.5s ease infinite",
          }}
        />
        <span style={{ fontSize: "0.64rem", color: C.textMuted, fontFamily: BODY }}>{label}</span>
      </div>
      <div
        style={{
          padding: "10px 14px",
          background: autoDetected ? C.primaryDim : C.bg3,
          borderRadius: autoDetected ? "10px 10px 2px 10px" : "10px 10px 10px 2px",
          border: `1px solid ${C.border}`,
          fontSize: "0.8rem",
          color: C.text,
          marginBottom: 10,
          fontFamily: BODY,
          minHeight: 52,
          lineHeight: 1.65,
        }}
      >
        {autoDetected ? (
          <span style={{ color: C.primary, fontSize: "0.6rem", fontWeight: 600, display: "block", marginBottom: 4, letterSpacing: "0.05em" }}>
            {answerLabel}
          </span>
        ) : null}
        {item.prompt.slice(0, qChars)}
        {qChars < item.prompt.length ? <span className="cursor-blink" /> : null}
      </div>
      <div
        style={{
          padding: showAnswer ? "10px 14px" : "0 14px",
          maxHeight: showAnswer ? 240 : 0,
          overflow: "hidden",
          background: C.primaryDim,
          borderRadius: "10px 10px 2px 10px",
          fontSize: "0.8rem",
          color: C.text,
          lineHeight: 1.65,
          fontFamily: BODY,
          transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
          opacity: showAnswer ? 1 : 0,
          flex: showAnswer ? 1 : undefined,
        }}
      >
        <span style={{ color: C.primary, fontSize: "0.6rem", fontWeight: 600, display: "block", marginBottom: 4, letterSpacing: "0.05em" }}>
          {answerLabel}
        </span>
        {item.answer.slice(0, aChars)}
        {showAnswer && aChars < item.answer.length ? <span className="cursor-blink primary" /> : null}
      </div>
      {approvalMessage ? (
        <div
          style={{
            marginTop: 10,
            padding: showApproval ? "10px 14px" : "0 14px",
            background: C.bg3,
            borderRadius: "10px 10px 10px 2px",
            border: `1px solid ${C.border}`,
            fontSize: "0.76rem",
            color: C.text,
            lineHeight: 1.65,
            fontFamily: BODY,
            maxHeight: showApproval ? 120 : 0,
            overflow: "hidden",
            opacity: showApproval ? 1 : 0,
            transition: "all 0.35s cubic-bezier(.22,1,.36,1)",
          }}
        >
          {approvalMessage.slice(0, approvalChars)}
          {showApproval && approvalChars < approvalMessage.length ? <span className="cursor-blink" /> : null}
        </div>
      ) : null}
      {followUp ? (
        <div
          style={{
            marginTop: 10,
            padding: showFollowUp ? "10px 14px" : "0 14px",
            maxHeight: showFollowUp ? 140 : 0,
            overflow: "hidden",
            background: C.primaryDim,
            borderRadius: "10px 10px 2px 10px",
            fontSize: "0.8rem",
            color: C.text,
            lineHeight: 1.65,
            fontFamily: BODY,
            transition: "all 0.35s cubic-bezier(.22,1,.36,1)",
            opacity: showFollowUp ? 1 : 0,
          }}
        >
          <span style={{ color: C.primary, fontSize: "0.6rem", fontWeight: 600, display: "block", marginBottom: 4, letterSpacing: "0.05em" }}>
            {answerLabel}
          </span>
          {followUp.slice(0, fChars)}
          {showFollowUp && fChars < followUp.length ? <span className="cursor-blink primary" /> : null}
        </div>
      ) : null}
    </div>
  );
}

export default function ExamplesSectionPreviewPage() {
  const [active, setActive] = useState(0);
  const [previewKey, setPreviewKey] = useState(0);

  const previewItems = [
    {
      title: "AI implementatie voor support, documenten en kennisprocessen",
      prompt: "Vat deze klantmail samen, haal actiepunten eruit en controleer de relevante documentatie voordat je een antwoord voorbereidt.",
      answer:
        "Samenvatting gemaakt. Actiepunten herkend en relevante documentatie gekoppeld. Conceptantwoord voorbereid met juiste voorwaarden en vervolgstap voor het team toegevoegd.",
      label: "Claude cowork",
      answerLabel: "CLAUDE COWORK",
      approvalMessage: "",
      followUp: "",
      autoDetected: false,
    },
    {
      title: "OpenClaw agents voor inbox, intake en opvolging",
      prompt: "Nieuwe lead gedetecteerd. Ik controleer fit, haal CRM-context op, start de intake en stel een vervolgactie voor.",
      answer:
        "Lead herkend en CRM-context opgehaald. Bedrijf matcht met doelgroep, intakevoorstel staat klaar en opvolging is voorgesteld. Toestemming gevraagd om intake te versturen en een taak voor sales aan te maken.",
      label: "OpenClaw agent",
      answerLabel: "OPENCLAW AGENT",
      approvalMessage: "Akkoord. Verstuur de intake en maak de taak voor sales aan.",
      followUp: "Akkoord ontvangen. Intake verstuurd, sales-taak aangemaakt en leadstatus bijgewerkt naar 'opvolging actief'.",
      autoDetected: true,
    },
  ];

  const current = previewItems[active];

  const tabLabels = ["AI Integraties", "AI Agents"];

  usePageSeo({
    title: "StarLeo | Voorbeeldenblok preview",
    description: "Donkere voorbeelden-sectie preview voor StarLeo.",
  });

  return (
    <SmoothSection bg={C.bg} zIndex={3} minH="118vh" center>
      <div className="ambient ambient-left" />
      <div style={{ maxWidth: 1140, margin: "0 auto", textAlign: "center" }}>
        <Reveal delay={0.04}>
          <Tag>Voorbeelden in de praktijk</Tag>
        </Reveal>

        <Reveal delay={0.1}>
          <h1
            style={{
              fontFamily: BODY,
              fontSize: "clamp(2rem, 4.8vw, 4.25rem)",
              lineHeight: 1.06,
              fontWeight: 700,
              margin: "0 auto",
              letterSpacing: "-0.03em",
              color: C.text,
              maxWidth: 960,
            }}
          >
            Zo ziet AI eruit
            <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
              zodra het echt in processen landt.
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p
            style={{
              color: C.textSoft,
              fontSize: "0.96rem",
              lineHeight: 1.78,
              maxWidth: 760,
              margin: "20px auto 0",
              fontFamily: BODY,
            }}
          >
            Concrete voorbeelden van hoe AI processen efficiënter maakt.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 26 }}>
            {tabLabels.map((tab, index) => (
              <button
                key={tab}
                onClick={() => {
                  setActive(index);
                  setPreviewKey((current) => current + 1);
                }}
                style={{
                  padding: "9px 18px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontFamily: BODY,
                  fontSize: "0.8rem",
                  border: `1px solid ${active === index ? C.primary : C.border}`,
                  background: active === index ? C.primary : C.bg2,
                  color: active === index ? "#fff" : C.textSoft,
                  boxShadow: active === index ? `0 4px 16px ${C.primary}25` : "none",
                  fontWeight: active === index ? 600 : 400,
                  transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              marginTop: 26,
              alignItems: "stretch",
              gap: 28,
            }}
          >
            <GlowCard style={{ background: C.bg2, height: "100%" }}>
              <div
                style={{
                  padding: "1.35rem",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ color: C.primary, fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: BODY }}>
                  Wat er gebeurt
                </div>
                <h3 style={{ color: C.text, fontFamily: BODY, fontSize: "1.08rem", fontWeight: 700, margin: "12px 0 0" }}>
                  {active === 0 ? "Van handmatig werk naar slimme ondersteuning" : "Van handmatig opvolgen naar automatische uitvoering"}
                </h3>
                <p style={{ color: C.textSoft, fontFamily: BODY, lineHeight: 1.8, fontSize: "0.9rem", marginTop: 14 }}>
                  {active === 0
                    ? "Wij koppelen AI aan bestaand werk, zodat support, documentwerk en kennisprocessen sneller, consistenter en betrouwbaarder verlopen."
                    : "Wij zetten agents in die signalen herkennen, context ophalen en vervolgstappen automatisch of na akkoord uitvoeren."}
                </p>
              </div>
            </GlowCard>
            <GlowCard style={{ background: C.bg, height: "100%" }}>
              <DemoPreview
                item={current}
                resetKey={previewKey}
                label={current.label}
                answerLabel={current.answerLabel}
                approvalMessage={current.approvalMessage}
                followUp={current.followUp}
                autoDetected={current.autoDetected}
              />
            </GlowCard>
          </div>
        </Reveal>
      </div>
    </SmoothSection>
  );
}
