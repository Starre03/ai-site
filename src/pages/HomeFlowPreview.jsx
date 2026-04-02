import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { demoTabs } from "../content/siteContent";
import { BODY, C } from "../lib/theme";
import { GlowCard, PrimaryButton, Reveal, SmoothSection, Tag, usePageSeo } from "../components/ui";

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

function PreviewHero() {
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
            <PrimaryButton href="#intake" onClick={(event) => event.preventDefault()}>
              Plan AI intake →
            </PrimaryButton>
            <PrimaryButton secondary href="#diensten" onClick={(event) => event.preventDefault()}>
              Bekijk mogelijkheden
            </PrimaryButton>
          </div>
        </Reveal>
      </div>
    </SmoothSection>
  );
}

function PreviewServices() {
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
            U kunt starten met een audit, direct kiezen voor implementatie, een agentflow laten bouwen of eerst een
            workshop doen.
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

function DemoPreview({ item, resetKey }) {
  const [qChars, setQChars] = useState(0);
  const [aChars, setAChars] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setQChars(0);
    setAChars(0);
    setShowAnswer(false);
  }, [resetKey]);

  useEffect(() => {
    if (qChars < item.prompt.length) {
      const timer = setTimeout(() => setQChars((current) => current + 1), 18);
      return () => clearTimeout(timer);
    }

    if (!showAnswer) {
      const timer = setTimeout(() => setShowAnswer(true), 280);
      return () => clearTimeout(timer);
    }

    if (aChars < item.answer.length) {
      const timer = setTimeout(() => setAChars((current) => current + 1), 11);
      return () => clearTimeout(timer);
    }
  }, [item, qChars, aChars, showAnswer]);

  return (
    <div style={{ padding: "1.35rem" }}>
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
        <span style={{ fontSize: "0.64rem", color: C.textMuted, fontFamily: BODY }}>Voorbeeldworkflow</span>
      </div>
      <div
        style={{
          padding: "10px 14px",
          background: C.bg3,
          borderRadius: "10px 10px 10px 2px",
          border: `1px solid ${C.border}`,
          fontSize: "0.8rem",
          color: C.text,
          marginBottom: 10,
          fontFamily: BODY,
          minHeight: 52,
          lineHeight: 1.65,
        }}
      >
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
        }}
      >
        <span style={{ color: C.primary, fontSize: "0.6rem", fontWeight: 600, display: "block", marginBottom: 4, letterSpacing: "0.05em" }}>
          STARLEO FLOW
        </span>
        {item.answer.slice(0, aChars)}
        {showAnswer && aChars < item.answer.length ? <span className="cursor-blink primary" /> : null}
      </div>
    </div>
  );
}

function PreviewExamples() {
  const [active, setActive] = useState(0);
  const [previewKey, setPreviewKey] = useState(0);
  const item = demoTabs[active];

  const summaries = [
    "Eerst helder krijgen waar AI het meeste oplevert, welke bottlenecks het belangrijkst zijn en welke route logisch is.",
    "AI praktisch integreren in support, documenten en kennisprocessen zonder meteen een complete agentlaag op te zetten.",
    "Agentflows inzetten voor inbox, intake, opvolging en taken die niet meer handmatig hoeven te blijven.",
  ];

  return (
    <SmoothSection bg={C.bg} zIndex={3} minH="118vh" center>
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
            Geen losse demo's, maar concrete voorbeelden van hoe audit, implementatie en agents werk slimmer laten lopen.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 26 }}>
            {demoTabs.map((tab, index) => (
              <button
                key={tab.label}
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
                {tab.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="two-col" style={{ marginTop: 26, alignItems: "stretch", gap: 28 }}>
            <div style={{ textAlign: "left" }}>
              <h3 style={{ color: C.text, fontFamily: BODY, fontSize: "1.18rem", fontWeight: 700, margin: 0 }}>
                {item.title}
              </h3>
              <p style={{ color: C.textSoft, fontFamily: BODY, lineHeight: 1.82, fontSize: "0.92rem", marginTop: 14 }}>
                {summaries[active]}
              </p>
            </div>
            <GlowCard style={{ background: C.bg }}>
              <DemoPreview item={item} resetKey={previewKey} />
            </GlowCard>
          </div>
        </Reveal>
      </div>
    </SmoothSection>
  );
}

export default function HomeFlowPreviewPage() {
  usePageSeo({
    title: "StarLeo | Homepage flow preview",
    description: "Volledige preview van de nieuwe homepage-flow voor StarLeo.",
  });

  return (
    <>
      <PreviewHero />
      <PreviewServices />
      <PreviewExamples />
    </>
  );
}
