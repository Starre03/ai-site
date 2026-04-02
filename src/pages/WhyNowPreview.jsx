import { BODY, C } from "../lib/theme";
import { GlowCard, Reveal, SmoothSection, Tag, usePageSeo } from "../components/ui";
const proofCards = [
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

export default function WhyNowPreviewPage() {
  usePageSeo({
    title: "StarLeo | Waarom nu preview",
    description: "Preview van het witte waarom-nu blok met METR-chart en overtuigingsblokken voor StarLeo.",
  });

  return (
    <SmoothSection bg={C.lightBg} zIndex={4} minH="110vh" center>
      <div style={{ maxWidth: 1120, margin: "0 auto", textAlign: "center" }}>
        <Reveal delay={0.04}>
          <Tag>Waarom nu</Tag>
        </Reveal>

        <Reveal delay={0.1}>
          <h1
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
          </h1>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 18, marginTop: 30 }}>
          {proofCards.map((item, index) => (
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
