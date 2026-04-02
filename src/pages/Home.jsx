import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Faq from "../components/Faq";
import IntakeForm from "../components/IntakeForm";
import { homeFaq } from "../content/siteContent";
import { BODY, C, shell } from "../lib/theme";
import {
  GlowCard,
  PrimaryButton,
  Reveal,
  SectionHeading,
  SmoothSection,
  Tag,
  usePageSeo,
} from "../components/ui";

const heroLines = [
  "voor rapportages, marktonderzoek en documentwerk",
  "voor teams die wekelijks uren willen terugwinnen",
  "voor een agent die uw inbox beheert en prioriteert",
  "voor contracten die AI direct op risico's controleert",
  "voor kwartaalcijfers die AI automatisch analyseert en samenvat",
  "voor leadopvolging die volledig automatisch verloopt",
];

const serviceCards = [
  {
    title: "AI Audit",
    desc: "Wij brengen in kaart waar AI waarde toevoegt, waar bottlenecks zitten en wat de slimste eerste stap is.",
    to: "/ai-audit",
  },
  {
    title: "AI Implementatie",
    desc: "Wij integreren AI in bestaande support-, document- en kennisprocessen.",
    to: "/ai-integraties",
  },
  {
    title: "OpenClaw Agents",
    desc: "Wij zetten agentflows op voor inbox, intake, opvolging en taken die niet handmatig hoeven te blijven.",
    to: "/ai-agents",
  },
  {
    title: "AI Workshop",
    desc: "Wij leren teams hoe AI werkt, hoe u beter prompt en hoe AI direct bruikbaar wordt in dagelijks werk.",
    to: "/ai-workshop",
  },
];

const exampleTabs = ["AI Integraties", "AI Agents"];

const whyNowCards = [
  {
    icon: "time",
    title: "Bespaar tijd en geld",
    text: "AI haalt terugkerend werk uit support, documentwerk, intake en opvolging. Dat bespaart uren, verlaagt kosten en maakt ruimte voor werk met meer waarde.",
  },
  {
    icon: "capacity",
    title: "Vergroot capaciteit",
    text: "Teams kunnen meer werk verwerken zonder dat de druk direct stijgt of extra FTE de enige oplossing wordt.",
  },
  {
    icon: "consistency",
    title: "Werk consistenter",
    text: "Minder losse acties, minder zoekwerk en minder afhankelijkheid van wie toevallig tijd of context heeft.",
  },
  {
    icon: "satisfaction",
    title: "Verhoog klanttevredenheid",
    text: "Snellere reacties, betere opvolging en consistenter klantcontact zorgen voor een professionelere ervaring zonder extra druk op het team.",
  },
];

const exampleItems = [
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
    summary: "Wij koppelen AI aan bestaand werk, zodat support, documentwerk en kennisprocessen sneller, consistenter en betrouwbaarder verlopen.",
    miniTitle: "Van handmatig werk naar slimme ondersteuning",
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
    summary: "Wij zetten agents in die signalen herkennen, context ophalen en vervolgstappen automatisch of na akkoord uitvoeren.",
    miniTitle: "Van handmatig opvolgen naar automatische uitvoering",
  },
];

function FadeSwitcher() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeOut = setTimeout(() => setVisible(false), 2600);
    const swap = setTimeout(() => {
      setIndex((current) => (current + 1) % heroLines.length);
      setVisible(true);
    }, 3350);

    return () => {
      clearTimeout(fadeOut);
      clearTimeout(swap);
    };
  }, [index]);

  return (
    <span
      style={{
        display: "inline-block",
        minHeight: "2.2em",
        maxWidth: 1120,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        filter: visible ? "blur(0px)" : "blur(4px)",
        transition: "opacity 0.95s cubic-bezier(.22,1,.36,1), transform 0.95s cubic-bezier(.22,1,.36,1), filter 0.95s cubic-bezier(.22,1,.36,1)",
        lineHeight: 1.06,
      }}
    >
      {heroLines[index]}
    </span>
  );
}

function Hero() {
  return (
    <SmoothSection bg={C.bg} zIndex={1} minH="120vh" center>
      <div className="ambient ambient-left" />
      <div style={{ maxWidth: 980, margin: "0 auto", textAlign: "center" }}>
        <Reveal delay={0.08}>
          <h1
            style={{
              fontFamily: BODY,
              fontSize: "clamp(2.6rem, 6.2vw, 5.1rem)",
              lineHeight: 1.04,
              fontWeight: 700,
              margin: 0,
              letterSpacing: "-0.03em",
              color: C.text,
              maxWidth: 1120,
              marginInline: "auto",
            }}
          >
            Benut de kracht van AI
            <span
              style={{
                display: "block",
                color: C.primary,
                fontSize: "0.68em",
                marginTop: "0.08em",
              }}
            >
              <FadeSwitcher />
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 30 }}>
            <PrimaryButton href="#intake" onClick={(event) => {
              event.preventDefault();
              document.getElementById("intake")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}>
              Plan AI intake →
            </PrimaryButton>
            <PrimaryButton secondary href="#diensten" onClick={(event) => {
              event.preventDefault();
              document.getElementById("diensten")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}>
              Bekijk mogelijkheden
            </PrimaryButton>
          </div>
        </Reveal>
      </div>
    </SmoothSection>
  );
}

function ProblemSection() {
  const items = [
    {
      title: "Er is wel interesse, maar geen route",
      desc: "Bedrijven hebben tools gezien en demo's gehad, maar missen overzicht: waar levert AI nu echt iets op en wat is ruis?",
    },
    {
      title: "Teams zitten vast in losse experimenten",
      desc: "Een paar prompts, een paar proefaccounts en verder weinig structurele impact. Daardoor blijft AI iets naast het werk in plaats van ín het werk.",
    },
    {
      title: "Bottlenecks blijven handmatig",
      desc: "Support, intake, documentwerk en interne kennisvragen kosten nog steeds te veel tijd omdat processen niet slim zijn ingericht.",
    },
    {
      title: "Niemand wil eerst een groot AI-programma",
      desc: "De beste start is meestal kleiner en concreter: audit, één integratie of één agentflow die tastbaar waarde levert.",
    },
  ];

  return (
    <SmoothSection bg={C.lightBg} zIndex={2} minH="120vh">
      <SectionHeading
        tag="Waarom bedrijven vastlopen"
        light
        title={
          <>
            Bedrijven weten dat AI bestaat,
            <em style={{ color: C.primary, fontStyle: "italic" }}> maar weten niet wat ze nu moeten implementeren.</em>
          </>
        }
        text="AI voor bedrijven is inmiddels overal zichtbaar. Toch blijven veel teams steken tussen losse demo's, proefaccounts en inspiratie. Het echte probleem is niet gebrek aan tools, maar gebrek aan duidelijkheid over welke AI implementatie nu direct waarde oplevert."
      />
      <div className="card-grid-two" style={{ marginTop: 40 }}>
        {items.map((item, index) => (
          <Reveal key={item.title} delay={0.14 + index * 0.06} fill>
            <GlowCard light style={{ background: C.lightCard, height: "100%", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <div style={{ padding: "1.8rem", height: "100%" }}>
                <h3 style={{ fontFamily: BODY, fontSize: "0.95rem", fontWeight: 600, color: C.lightText }}>{item.title}</h3>
                <p style={{ color: C.lightTextSoft, fontSize: "0.88rem", lineHeight: 1.75, marginTop: 10, fontFamily: BODY }}>
                  {item.desc}
                </p>
              </div>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </SmoothSection>
  );
}

function ServicesOverview() {
  return (
    <SmoothSection id="diensten" bg={C.lightBg} zIndex={2} minH="108vh" center>
      <div style={{ maxWidth: 1160, margin: "0 auto", textAlign: "center" }}>
        <Reveal delay={0.04}>
          <Tag>Onze diensten</Tag>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: BODY,
              fontSize: "clamp(2rem, 4.4vw, 4rem)",
              lineHeight: 1.06,
              fontWeight: 700,
              margin: "0 auto",
              letterSpacing: "-0.03em",
              color: C.lightText,
              maxWidth: 920,
            }}
          >
            Vier manieren waarop wij AI
            <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
              praktisch in bedrijven inzetten.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p
            style={{
              color: C.lightTextSoft,
              fontSize: "0.94rem",
              lineHeight: 1.72,
              maxWidth: 780,
              margin: "18px auto 0",
              fontFamily: BODY,
            }}
          >
            U kunt starten met een audit, direct kiezen voor implementatie, een agentflow laten bouwen of eerst een workshop doen.
          </p>
        </Reveal>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 20,
            marginTop: 28,
          }}
        >
        {serviceCards.map((card, index) => (
          <Reveal key={card.title} delay={0.16 + index * 0.05} fill>
            <Link to={card.to} style={{ textDecoration: "none", display: "block", height: "100%" }}>
              <GlowCard light style={{ background: C.lightCard, height: "100%", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <div
                  style={{
                    padding: "1.4rem 1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    height: "100%",
                    textAlign: "left",
                  }}
                >
                  <h3 style={{ fontFamily: BODY, fontSize: "1.04rem", fontWeight: 700, color: C.primary, margin: 0 }}>
                    {card.title}
                  </h3>
                  <p style={{ color: C.lightTextSoft, fontSize: "0.89rem", lineHeight: 1.72, margin: 0, fontFamily: BODY }}>
                    {card.desc}
                  </p>
                </div>
              </GlowCard>
            </Link>
          </Reveal>
        ))}
      </div>
      </div>
    </SmoothSection>
  );
}

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

function ExamplesSection() {
  const [active, setActive] = useState(0);
  const [previewKey, setPreviewKey] = useState(0);
  const current = exampleItems[active];

  return (
    <SmoothSection id="oplossingen" bg={C.bg} zIndex={3} minH="118vh" center>
      <div className="ambient ambient-left" />
      <div style={{ maxWidth: 1140, margin: "0 auto", textAlign: "center" }}>
        <Reveal delay={0.04}>
          <Tag>Voorbeelden in de praktijk</Tag>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
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
          </h2>
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
            {exampleTabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => {
                  setActive(index);
                  setPreviewKey((currentKey) => currentKey + 1);
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
                  {current.miniTitle}
                </h3>
                <p style={{ color: C.textSoft, fontFamily: BODY, lineHeight: 1.8, fontSize: "0.9rem", marginTop: 14 }}>
                  {current.summary}
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

function SolidGlyphIcon({ kind }) {
  const wrap = {
    width: 20,
    height: 20,
    viewBox: "0 0 22 22",
    fill: C.primary,
    style: { display: "block", flexShrink: 0 },
  };

  if (kind === "time") {
    return (
      <svg {...wrap} aria-hidden="true">
        <path d="M11 3.8a7.2 7.2 0 1 0 0 14.4 7.2 7.2 0 0 0 0-14.4Zm.9 3.2v3.5l2.6 1.5-.9 1.4-3.3-2V7h1.6Z" />
      </svg>
    );
  }

  if (kind === "capacity") {
    return (
      <svg {...wrap} aria-hidden="true">
        <path d="M4.2 10.6h3.4v6H4.2v-6Zm5.1-3.1h3.4v9.1H9.3V7.5Zm5.1-3h3.4v12.1h-3.4V4.5Z" />
      </svg>
    );
  }

  if (kind === "consistency") {
    return (
      <svg {...wrap} aria-hidden="true">
        <path d="M11 3.8 17 6.2v3.5c0 3.5-2.2 6.2-6 8-3.8-1.8-6-4.5-6-8V6.2l6-2.4Zm-1.1 8.8 4-4-.9-.9-3.1 3.2-1.7-1.6-.9.9 2.6 2.4Z" />
      </svg>
    );
  }

  return (
    <svg {...wrap} aria-hidden="true">
      <path d="M11 3.8a7.2 7.2 0 1 0 0 14.4 7.2 7.2 0 0 0 0-14.4Zm-3.2 5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9Zm6.4 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9Zm-6.2 3.8h6c-.7 1.2-1.9 1.8-3 1.8s-2.3-.6-3-1.8Z" />
    </svg>
  );
}

function WhyNowSection() {
  return (
    <SmoothSection bg={C.lightBg} zIndex={4} minH="110vh" center>
      <div style={{ maxWidth: 1120, margin: "0 auto", textAlign: "center" }}>
        <Reveal delay={0.04}>
          <Tag>Waarom nu</Tag>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: BODY,
              fontSize: "clamp(2.2rem, 4.9vw, 4.5rem)",
              lineHeight: 1.06,
              fontWeight: 700,
              margin: "0 auto",
              letterSpacing: "-0.03em",
              color: C.lightText,
              maxWidth: 820,
            }}
          >
            Haal meer uit uw bedrijf met <span style={{ color: C.primary }}>AI.</span>
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 18, marginTop: 30 }}>
          {whyNowCards.map((item, index) => (
            <Reveal key={item.title} delay={0.16 + index * 0.05} fill>
              <GlowCard light style={{ background: C.lightCard, height: "100%", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <div style={{ padding: "1.5rem", height: "100%", textAlign: "left" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <SolidGlyphIcon kind={item.icon} />
                    <h3 style={{ margin: 0, color: C.primary, fontFamily: BODY, fontSize: "1.04rem", fontWeight: 700, lineHeight: 1.25 }}>
                      {item.title}
                    </h3>
                  </div>
                  <p style={{ margin: "12px 0 0", color: C.lightTextSoft, fontFamily: BODY, fontSize: "0.9rem", lineHeight: 1.8 }}>
                    {item.text}
                  </p>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </SmoothSection>
  );
}

export default function Home() {
  usePageSeo({
    title: "StarLeo | AI audit, AI integraties en OpenClaw AI agents voor bedrijven",
    description:
      "StarLeo helpt bedrijven met AI audit, AI consultancy, AI implementatie, Claude integraties, ChatGPT integraties en OpenClaw AI agents voor support, documentprocessen en workflow automatisering.",
  });

  return (
    <>
      <Hero />
      <ServicesOverview />
      <ExamplesSection />
      <WhyNowSection />
      <ProblemSection />
      <section style={{ padding: "6rem clamp(1.5rem, 5vw, 5rem)", background: C.lightBg }}>
        <div style={{ ...shell.content, maxWidth: 880 }}>
          <Faq
            light
            items={homeFaq}
            title={
              <>
                Veelgestelde vragen over
                <em style={{ color: C.primary, fontStyle: "italic" }}> AI audit, AI integraties en OpenClaw AI agents</em>
              </>
            }
            text="Heldere antwoorden voor bedrijven die zoeken op AI audit, AI implementatie, Claude integratie, ChatGPT integratie, OpenClaw setup of AI agents voor bedrijven."
          />
        </div>
      </section>
      <IntakeForm />
    </>
  );
}
