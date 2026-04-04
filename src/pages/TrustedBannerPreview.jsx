import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BODY, C } from "../lib/theme";
import { GlowCard, PrimaryButton, Reveal, SmoothSection, Tag, usePageSeo } from "../components/ui";

const heroLines = [
  "voor rapportages, marktonderzoek en documentwerk",
  "voor teams die wekelijks uren willen terugwinnen",
  "voor een agent die uw inbox beheert en prioriteert",
  "voor contracten die AI direct op risico's controleert",
  "voor kwartaalcijfers die AI automatisch analyseert en samenvat",
  "voor leadopvolging die volledig automatisch verloopt",
  "voor social content die automatisch wordt gemaakt en geplaatst",
  "voor marketingcampagnes die automatisch draaien",
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

const placeholderBrands = [
  { kind: "careup", name: "CareUp" },
  { kind: "shirtshop", name: "ShirtPrintShop" },
  { kind: "mizo", name: "Mizo" },
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
        transition:
          "opacity 0.95s cubic-bezier(.22,1,.36,1), transform 0.95s cubic-bezier(.22,1,.36,1), filter 0.95s cubic-bezier(.22,1,.36,1)",
        lineHeight: 1.06,
      }}
    >
      {heroLines[index]}
    </span>
  );
}

function PreviewHero() {
  return (
    <SmoothSection bg={C.bg} zIndex={1} minH="112vh" center>
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

function TrustedBanner() {
  const brands = [...placeholderBrands, ...placeholderBrands, ...placeholderBrands];

  return (
    <section
      style={{
        background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bg} 43%, ${C.lightBg} 43%, ${C.lightBg} 100%)`,
        padding: "0 0 3.15rem",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center", padding: "0 clamp(1.5rem, 5vw, 5rem)" }}>
        <Reveal delay={0.06}>
          <div style={{ paddingTop: 2 }}>
            <div
              style={{
                fontSize: "0.74rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "rgba(232,238,248,0.72)",
                fontFamily: BODY,
                fontWeight: 700,
              }}
            >
              Vertrouwd door innovatieve bedrijven
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div
            style={{
              position: "relative",
              marginTop: 16,
              overflow: "hidden",
              border: `1px solid ${C.lightBorder}`,
              borderRadius: 28,
              background: "linear-gradient(180deg, #FFFFFF 0%, #FBFDFE 100%)",
              boxShadow: "0 10px 24px rgba(2, 8, 23, 0.06)",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "0 auto 0 0",
                width: 140,
                background: `linear-gradient(90deg, ${C.lightBg} 0%, rgba(244,248,252,0) 100%)`,
                zIndex: 2,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: "0 0 0 auto",
                width: 140,
                background: `linear-gradient(270deg, ${C.lightBg} 0%, rgba(244,248,252,0) 100%)`,
                zIndex: 2,
              }}
            />
            <div className="trusted-marquee">
              {brands.map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  style={{
                    minWidth: brand.kind === "afbouw" ? 320 : 240,
                    padding: "0 1.8rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    whiteSpace: "nowrap",
                  }}
                >
                  <div
                    style={{
                      color: "#4E6784",
                      fontFamily: BODY,
                      fontWeight: 800,
                      fontSize:
                        brand.name.length > 16
                          ? "clamp(0.96rem, 1.5vw, 1.24rem)"
                          : "clamp(1rem, 1.75vw, 1.34rem)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                    }}
                  >
                    {brand.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PreviewServices() {
  return (
    <SmoothSection id="diensten" bg={C.lightBg} zIndex={2} minH="102vh" center>
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

export default function TrustedBannerPreviewPage() {
  usePageSeo({
    title: "StarLeo | Trusted partners preview",
    description: "Preview van een bewegende trusted-partners banner tussen de homepage hero en diensten-sectie.",
  });

  return (
    <>
      <style>{`
        .trusted-marquee {
          display: flex;
          align-items: center;
          width: max-content;
          padding: 1.4rem 0;
          animation: trusted-marquee 26s linear infinite;
        }

        @keyframes trusted-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
      <PreviewHero />
      <TrustedBanner />
      <PreviewServices />
    </>
  );
}
