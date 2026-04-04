import { BODY, C } from "../lib/theme";
import { GlowCard, PageSection, Reveal, SmoothSection, Tag, usePageSeo } from "../components/ui";

function AboutHero() {
  const topCards = [
    {
      title: "Wat wij doen",
      text: "Wij helpen bedrijven werk efficiënter en betrouwbaarder maken met oplossingen die echt onderdeel worden van het dagelijkse werk.",
    },
    {
      title: "Waarom wij dit doen",
      text: "Te veel bedrijven zien de potentie, maar missen overzicht, prioriteit en een route die in de praktijk ook echt werkt voor het team.",
    },
    {
      title: "Waar wij voor staan",
      text: "Voor directe samenwerking, korte lijnen en keuzes die concreet, uitvoerbaar en beheersbaar blijven voor het team.",
    },
  ];

  return (
    <SmoothSection bg={C.bg} zIndex={1} minH="100vh" center>
      <div className="ambient ambient-left" />
      <div style={{ maxWidth: 940, margin: "0 auto", textAlign: "center" }}>
        <Reveal delay={0.06}>
          <Tag>Over ons</Tag>
        </Reveal>
        <Reveal delay={0.12}>
          <h1
            style={{
              fontFamily: BODY,
              fontSize: "clamp(2.45rem, 6vw, 5rem)",
              lineHeight: 1.04,
              fontWeight: 700,
              margin: 0,
              letterSpacing: "-0.03em",
              color: C.text,
              maxWidth: 980,
              marginInline: "auto",
            }}
          >
            Duidelijk in aanpak.
            <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
              Serieus in uitvoering.
            </span>
          </h1>
        </Reveal>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 18,
            marginTop: 34,
          }}
        >
          {topCards.map((item, index) => (
            <Reveal key={item.title} delay={0.18 + index * 0.05} fill>
              <GlowCard style={{ background: C.bg2, height: "100%" }}>
                <div style={{ padding: "1.45rem", textAlign: "center", height: "100%" }}>
                  <h3
                    style={{
                      margin: 0,
                      color: C.text,
                      fontFamily: BODY,
                      fontSize: "1.02rem",
                      fontWeight: 700,
                      lineHeight: 1.35,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      margin: "12px 0 0",
                      color: C.textSoft,
                      fontFamily: BODY,
                      fontSize: "0.9rem",
                      lineHeight: 1.78,
                    }}
                  >
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

function AboutCore() {
  return (
    <PageSection bg={C.lightBg} pad="6rem clamp(1.5rem, 5vw, 5rem) 7rem">
      <div style={{ maxWidth: 1140, margin: "0 auto", textAlign: "center" }}>
        <Reveal delay={0.04}>
          <Tag>Wie wij zijn</Tag>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: BODY,
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              lineHeight: 1.08,
              fontWeight: 700,
              margin: "0 auto",
              letterSpacing: "-0.03em",
              color: C.lightText,
              maxWidth: 900,
            }}
          >
            Ontstaan vanuit interesse in
            <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
              bedrijfskunde, innovatie en AI.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <GlowCard light style={{ marginTop: 24, background: "#FFFFFF", boxShadow: "0 12px 26px rgba(2, 8, 23, 0.06)" }}>
            <div
              style={{
                padding: "2rem",
                maxWidth: 980,
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  color: C.primary,
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontFamily: BODY,
                  fontWeight: 700,
                }}
              >
                Onze achtergrond
              </div>
              <h3
                style={{
                  margin: "12px 0 0",
                  color: C.lightText,
                  fontFamily: BODY,
                  fontSize: "1.28rem",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  maxWidth: 760,
                  marginInline: "auto",
                }}
              >
                Wij helpen bedrijven AI beter begrijpen, slimmer toepassen en concreet integreren in dagelijks werk.
              </h3>
              <p
                style={{
                  margin: "14px 0 0",
                  color: C.lightTextSoft,
                  fontFamily: BODY,
                  fontSize: "0.92rem",
                  lineHeight: 1.9,
                  maxWidth: 860,
                  marginInline: "auto",
                }}
              >
                Wij zijn ontstaan vanuit bedrijfskundige interesse, passie voor efficientie en jarenlange betrokkenheid
                bij AI, automatisering en innovatie. Met een bachelor in bedrijfskunde en certificering via recente
                gerenommeerde AI-cursussen en leerprogramma&apos;s kijken wij niet alleen naar wat nieuw is, maar vooral
                naar wat relevant en werkbaar is voor bedrijven.
              </p>
              <p
                style={{
                  margin: "12px 0 0",
                  color: C.lightTextSoft,
                  fontFamily: BODY,
                  fontSize: "0.92rem",
                  lineHeight: 1.9,
                  maxWidth: 860,
                  marginInline: "auto",
                }}
              >
                Daarom helpen wij bedrijven om mee te bewegen met de ontwikkelingen, zonder overzicht te verliezen. Niet
                door alles tegelijk te willen, maar door AI begrijpelijk, bruikbaar en uitvoerbaar te maken in de
                praktijk.
              </p>
            </div>
          </GlowCard>
        </Reveal>
      </div>
    </PageSection>
  );
}

export default function AboutPage() {
  usePageSeo({
    title: "StarLeo | Over ons",
    description:
      "Over StarLeo. Wij helpen bedrijven AI beter begrijpen, slimmer toepassen en concreet integreren in dagelijks werk.",
  });

  return (
    <>
      <AboutHero />
      <AboutCore />
    </>
  );
}
