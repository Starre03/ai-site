import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IntakeForm from "../components/IntakeForm";
import { contactSteps } from "../content/siteContent";
import { BODY, C, shell } from "../lib/theme";
import {
  GlowCard,
  PageSection,
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
];

const trustedBrands = [
  {
    name: "CareUp",
    logo: "https://careup.online/wp-content/uploads/2025/12/cropped-CareUp_logo_nieuw-300x97-1.png",
    url: "https://careup.online",
    showName: false,
    logoHeight: 40,
  },
  {
    name: "De ShirtPrintShop",
    logo: "https://shirtprintshop.nl/wp-content/uploads/2020/09/SPS-logo.png",
    url: "https://shirtprintshop.nl",
    showName: false,
    logoHeight: 56,
  },
  {
    name: "Mizo",
    logo: "https://mizo-ai.com/image_3300.png",
    url: "https://mizo-ai.com/en",
    showName: true,
    logoHeight: 44,
  },
];

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

const processCards = [
  {
    title: "Inzicht",
    bullets: [
      "Wij brengen in kaart waar tijd, capaciteit of kwaliteit het meeste te winnen heeft.",
      "Wij kijken waar processen vastlopen en waar AI direct waarde kan toevoegen.",
      "Wij maken zichtbaar welk proces als eerste de meeste winst oplevert.",
    ],
  },
  {
    title: "Keuze",
    bullets: [
      "Samen bepalen we of audit, implementatie of een agentflow nu de logische stap is.",
      "U kiest wat past bij het team, het proces en de gewenste uitkomst.",
      "Wij houden de eerste stap klein genoeg om beheersbaar te blijven, maar groot genoeg om waarde te leveren.",
    ],
  },
  {
    title: "Uitvoering",
    bullets: [
      "Wij bouwen alleen wat echt nodig is en in bestaand werk past.",
      "AI wordt ingebouwd in support, documentwerk, intake of opvolging.",
      "Het doel is altijd een oplossing die betrouwbaar werkt en praktisch blijft voor het team.",
    ],
  },
];

const promiseCards = [
  {
    title: "Werkende processen in plaats van losse demo's",
    bullets: [
      "Wij vertalen AI naar processen die dagelijks terugkomen.",
      "Niet iets naast het werk, maar iets dat echt ín het werk landt.",
      "Zo wordt AI bruikbaar voor support, documenten, intake en opvolging.",
    ],
  },
  {
    title: "Tastbare voortgang zonder groot voortraject",
    bullets: [
      "U hoeft niet eerst een groot AI-programma te starten.",
      "Een eerste stap kan al direct tijd, capaciteit of kwaliteit opleveren.",
      "Zo blijft de route overzichtelijk en de investering beheersbaar.",
    ],
  },
  {
    title: "Direct contact en korte lijnen",
    bullets: [
      "Geen lagen ertussen, maar direct schakelen over keuzes en uitwerking.",
      "Daardoor kunnen wij sneller bijsturen op wat wel en niet werkt.",
      "Dat maakt het proces overzichtelijker en betrouwbaarder.",
    ],
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
          <p
            style={{
              color: C.text,
              fontSize: "1.04rem",
              fontWeight: 500,
              lineHeight: 1.78,
              maxWidth: 700,
              margin: "20px auto 0",
              fontFamily: BODY,
            }}
          >
            Benieuwd hoe AI in uw bedrijf tijd en kosten kan besparen?
          </p>
        </Reveal>
        <Reveal delay={0.22}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 22 }}>
            <PrimaryButton to="/quickscan">Start de gratis quickscan →</PrimaryButton>
          </div>
        </Reveal>
      </div>
    </SmoothSection>
  );
}

function TrustedBannerSection() {
  const brands = [...trustedBrands, ...trustedBrands, ...trustedBrands, ...trustedBrands];

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
            <style>{`
              .trusted-marquee {
                display: flex;
                align-items: center;
                gap: 0;
                width: max-content;
                min-width: 100%;
                padding: 1.35rem 0;
                animation: trusted-marquee 26s linear infinite;
              }

              @keyframes trusted-marquee {
                from {
                  transform: translateX(0);
                }
                to {
                  transform: translateX(-25%);
                }
              }
            `}</style>
            <div className="trusted-marquee">
              {brands.map((brand, index) => (
                <a
                  key={`${brand.name}-${index}`}
                  href={brand.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={brand.name}
                  style={{
                    minWidth: 220,
                    padding: "0 2rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    textDecoration: "none",
                  }}
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    style={{
                      display: "block",
                      height: brand.logoHeight || 44,
                      width: "auto",
                      maxWidth: 180,
                      objectFit: "contain",
                    }}
                  />
                  {brand.showName ? (
                    <span style={{
                      color: "#4E6784",
                      fontFamily: BODY,
                      fontWeight: 600,
                      fontSize: "0.78rem",
                      letterSpacing: "-0.01em",
                    }}>
                      {brand.name}
                    </span>
                  ) : null}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HowWeWorkSection() {
  const [activeTab, setActiveTab] = useState("werkwijze");
  const isProcess = activeTab === "werkwijze";
  const cards = isProcess ? processCards : promiseCards;

  return (
    <PageSection bg={C.lightBg} pad="clamp(3.5rem, 8vw, 3.6rem) clamp(1.5rem, 5vw, 5rem) clamp(4.5rem, 9vw, 7rem)">
      <div style={{ maxWidth: 1120, margin: "0 auto", textAlign: "center" }}>
        <Reveal delay={0.04}>
          <Tag>Zo werken wij</Tag>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: BODY,
              fontSize: "clamp(2.15rem, 4.8vw, 4.15rem)",
              lineHeight: 1.06,
              fontWeight: 700,
              margin: "0 auto",
              letterSpacing: "-0.03em",
              color: C.lightText,
              maxWidth: 920,
            }}
          >
            Duidelijk in keuze.
            <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>Concreet in uitvoering.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p
            style={{
              color: C.lightTextSoft,
              fontSize: "0.98rem",
              lineHeight: 1.8,
              maxWidth: 820,
              margin: "22px auto 0",
              fontFamily: BODY,
            }}
          >
            Zo houden wij AI overzichtelijk: eerst helder krijgen waar AI waarde toevoegt, daarna samen kiezen en gericht uitvoeren.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 30 }}>
            {[
              { id: "werkwijze", label: "Werkwijze" },
              { id: "beloftes", label: "Beloftes" },
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    borderRadius: 18,
                    padding: "0.95rem 1.35rem",
                    border: `1px solid ${active ? C.primary : C.lightBorder}`,
                    background: active ? C.primary : C.lightCard,
                    color: active ? "#ffffff" : C.lightTextSoft,
                    fontFamily: BODY,
                    fontSize: "1rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 180ms ease",
                    boxShadow: active ? `0 10px 24px ${C.primary}26, inset 0 0 0 1px ${C.primary}` : "none",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="card-grid-three" style={{ marginTop: 28 }}>
          {cards.map((item, index) => (
            <Reveal key={item.title} delay={0.28 + index * 0.05} fill>
              <GlowCard light style={{ background: C.lightCard, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", height: "100%" }}>
                <div style={{ padding: "1.5rem", textAlign: "left", height: "100%" }}>
                  <h3
                    style={{
                      margin: 0,
                      color: C.lightText,
                      fontFamily: BODY,
                      fontSize: "1.02rem",
                      fontWeight: 700,
                      lineHeight: 1.35,
                    }}
                  >
                    {item.title}
                  </h3>
                  <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
                    {item.bullets.slice(0, 2).map((bullet) => (
                      <p
                        key={bullet}
                        style={{
                          margin: 0,
                          color: C.lightTextSoft,
                          fontFamily: BODY,
                          fontSize: "0.88rem",
                          lineHeight: 1.72,
                        }}
                      >
                        {bullet}
                      </p>
                    ))}
                  </div>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </PageSection>
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
            Drie manieren waarop wij AI
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
            U kunt starten met een audit, direct kiezen voor implementatie of een agentflow laten bouwen.
          </p>
        </Reveal>
        <div className="card-grid-three" style={{ marginTop: 28 }}>
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
    <PageSection bg={C.lightBg} pad="clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 5rem) clamp(3.25rem, 7vw, 3.8rem)">
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
        <div className="card-grid-two" style={{ marginTop: 30 }}>
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
    </PageSection>
  );
}

function IntakeCtaSection() {
  return (
    <section
      style={{
        background: C.lightBg,
        padding: "clamp(3.25rem, 7vw, 4rem) clamp(1.5rem, 5vw, 5rem) clamp(3.25rem, 7vw, 4.1rem)",
      }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto", width: "100%" }}>
        <Reveal delay={0.06}>
          <GlowCard
            style={{
              background:
                `radial-gradient(circle at 18% 22%, ${C.primary}18, transparent 30%), radial-gradient(circle at 82% 78%, ${C.primary}10, transparent 28%), linear-gradient(135deg, ${C.bg2} 0%, ${C.bg} 100%)`,
              boxShadow: `0 18px 44px rgba(2, 8, 23, 0.14)`,
            }}
          >
            <div
              style={{
                padding: "clamp(1.25rem, 1.9vw, 1.7rem) clamp(1.2rem, 1.8vw, 1.8rem)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Reveal delay={0.14}>
                <Tag>Gratis quickscan</Tag>
              </Reveal>
              <Reveal delay={0.2}>
                <h2
                  style={{
                    fontFamily: BODY,
                    fontSize: "clamp(1.3rem, 2.5vw, 2.15rem)",
                    lineHeight: 1.12,
                    fontWeight: 700,
                    margin: "0 auto",
                    letterSpacing: "-0.03em",
                    color: C.text,
                  maxWidth: 620,
                }}
                >
                  Benieuwd waar <span style={{ color: C.primary }}>AI</span> uw bedrijf tijd en kosten kan besparen?
                </h2>
              </Reveal>
              <Reveal delay={0.34}>
                <div style={{ display: "flex", justifyContent: "center", marginTop: 18 }}>
                  <PrimaryButton to="/quickscan">Start de gratis quickscan →</PrimaryButton>
                </div>
              </Reveal>
            </div>
          </GlowCard>
        </Reveal>
      </div>
    </section>
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
      <TrustedBannerSection />
      <ServicesOverview />
      <WhyNowSection />
      <IntakeCtaSection />
      <HowWeWorkSection />
      <IntakeForm
        id="contact"
        centered
        tagLabel="Contact"
        title={
          <>
            Neem contact op.
            <em style={{ color: C.primary, fontStyle: "italic", display: "block" }}>Dan denken wij met u mee.</em>
          </>
        }
        text=""
        trustPoints={[]}
        steps={contactSteps}
        submitLabel="Verstuur bericht →"
        doneTitle="Uw bericht is verstuurd"
        doneText="We nemen contact op om uw vraag of situatie verder te bespreken."
        submissionKind="contact"
      />
    </>
  );
}
