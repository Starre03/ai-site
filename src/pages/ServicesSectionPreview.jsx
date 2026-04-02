import { Link } from "react-router-dom";
import { BODY, C } from "../lib/theme";
import { GlowCard, Reveal, SmoothSection, Tag, usePageSeo } from "../components/ui";

const cards = [
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
    desc: "Wij zetten agentflows op voor inbox, intake, opvolging en taken die niet meer handmatig hoeven.",
    to: "/ai-agents",
  },
  {
    title: "AI Workshop",
    desc: "Wij leren teams hoe AI werkt, hoe u beter prompt en hoe AI direct bruikbaar wordt in dagelijks werk.",
    to: "/ai-workshop",
  },
];

export default function ServicesSectionPreviewPage() {
  usePageSeo({
    title: "StarLeo | Dienstenblok preview",
    description: "Preview van een compacte witte diensten-sectie direct onder de hero.",
  });

  return (
    <SmoothSection bg={C.lightBg} zIndex={2} minH="108vh" center>
      <div style={{ maxWidth: 1160, margin: "0 auto", textAlign: "center" }}>
        <Reveal delay={0.04}>
          <Tag>Onze diensten</Tag>
        </Reveal>

        <Reveal delay={0.1}>
          <h1
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
          </h1>
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
          {cards.map((card, index) => (
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
