import { useEffect, useState } from "react";
import { demoTabs } from "../content/siteContent";
import { BODY, C } from "../lib/theme";
import { GlowCard, Reveal, SectionHeading } from "./ui";

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
      const timer = setTimeout(() => setQChars((current) => current + 1), 24);
      return () => clearTimeout(timer);
    }

    if (!showAnswer) {
      const timer = setTimeout(() => setShowAnswer(true), 400);
      return () => clearTimeout(timer);
    }

    if (aChars < item.answer.length) {
      const timer = setTimeout(() => setAChars((current) => current + 1), 14);
      return () => clearTimeout(timer);
    }
  }, [item, qChars, aChars, showAnswer]);

  return (
    <div style={{ padding: "1.35rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
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
        <span style={{ fontSize: "0.64rem", color: C.textMuted, fontFamily: BODY }}>Tastbare workflow</span>
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
        <span
          style={{
            color: C.primary,
            fontSize: "0.6rem",
            fontWeight: 600,
            display: "block",
            marginBottom: 4,
            letterSpacing: "0.05em",
          }}
      >
          starre.ai FLOW
        </span>
        {item.answer.slice(0, aChars)}
        {showAnswer && aChars < item.answer.length ? <span className="cursor-blink primary" /> : null}
      </div>
    </div>
  );
}

export default function InteractiveDemo() {
  const [active, setActive] = useState(0);
  const [previewKey, setPreviewKey] = useState(0);
  const item = demoTabs[active];

  return (
    <>
      <SectionHeading
        tag="Voorbeelden"
        light
        title={
          <>
            Zo zien de drie diensten van starre.ai eruit
            <em style={{ color: C.primary, fontStyle: "italic" }}> zodra AI echt in het werk landt</em>
          </>
        }
        text="Van AI audit tot Claude integratie en OpenClaw AI agents: hieronder zie je hoe AI implementatie eruitziet zodra support, documentprocessen, leads of intake echt slimmer worden ingericht."
      />
      <Reveal delay={0.16}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 26 }}>
          {demoTabs.map((tab, index) => (
            <button
              key={tab.label}
              onClick={() => {
                setActive(index);
                setPreviewKey((current) => current + 1);
              }}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                cursor: "pointer",
                fontFamily: BODY,
                fontSize: "0.78rem",
                border: `1px solid ${active === index ? C.primary : C.border}`,
                background: active === index ? C.primary : C.bg2,
                color: active === index ? "#fff" : C.textSoft,
                boxShadow: active === index ? `0 4px 12px ${C.primary}30` : "none",
                fontWeight: active === index ? 600 : 400,
                transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.22}>
        <div className="two-col" style={{ marginTop: 24, alignItems: "stretch" }}>
          <div>
            <h3 style={{ color: C.lightText, fontFamily: BODY, fontSize: "1.08rem", fontWeight: 600 }}>
              {item.title}
            </h3>
            <p style={{ color: C.lightTextSoft, fontFamily: BODY, lineHeight: 1.8, fontSize: "0.86rem", marginTop: 12 }}>
              {active === 0
                ? "Voor bedrijven die eerst een AI audit willen: waar zitten de bottlenecks, welke AI kansen zijn haalbaar en welke implementatievolgorde levert het meeste op."
                : active === 1
                  ? "Voor teams die Claude of ChatGPT praktisch willen inzetten in support, documentanalyse, kenniswerk en bestaande workflows zonder direct een agentlaag op te zetten."
                  : "Voor organisaties die OpenClaw AI agents willen inzetten voor inbox automation, lead qualification, intake automation en support routing met meerdere samenwerkende agents."}
            </p>
          </div>
          <GlowCard style={{ background: C.bg }}>
            <DemoPreview item={item} resetKey={previewKey} />
          </GlowCard>
        </div>
      </Reveal>
    </>
  );
}
