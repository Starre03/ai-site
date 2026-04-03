import { useState } from "react";
import { BODY, C } from "../lib/theme";
import { GlowCard, Reveal, SmoothSection, Tag, usePageSeo } from "../components/ui";

const steps = [
  {
    title: "Inzicht",
    bullets: [
      "We brengen in kaart waar tijd, capaciteit of kwaliteit het meeste te winnen heeft.",
      "We kijken waar processen vastlopen en waar AI direct waarde kan toevoegen.",
      "We maken zichtbaar welk proces als eerste de meeste winst oplevert.",
    ],
  },
  {
    title: "Keuze",
    bullets: [
      "Samen bepalen we of audit, implementatie of een agentflow nu de logische stap is.",
      "U kiest wat past bij het team, het proces en de gewenste uitkomst.",
      "We houden de eerste stap klein genoeg om beheersbaar te blijven, maar groot genoeg om waarde te leveren.",
    ],
  },
  {
    title: "Uitvoering",
    bullets: [
      "We bouwen alleen wat echt nodig is en in bestaand werk past.",
      "AI wordt ingebouwd in support, documentwerk, intake of opvolging.",
      "Het doel is altijd een oplossing die betrouwbaar werkt en praktisch blijft voor het team.",
    ],
  },
];

const promises = [
  {
    title: "Duidelijke keuzes in plaats van AI-ruis",
    bullets: [
      "U krijgt helder waar AI nu echt waarde toevoegt.",
      "We maken ook duidelijk wat nog niet logisch is om te bouwen.",
      "Daardoor hoeft u niet te gokken tussen losse tools en ideeën.",
    ],
  },
  {
    title: "Werkende processen in plaats van losse demo's",
    bullets: [
      "We vertalen AI naar processen die dagelijks terugkomen.",
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
      "Daardoor kunnen we sneller bijsturen op wat wel en niet werkt.",
      "Dat maakt het proces overzichtelijker en betrouwbaarder.",
    ],
  },
];

const tabs = [
  { id: "werkwijze", label: "Werkwijze" },
  { id: "beloftes", label: "Beloftes" },
];

function BulletList({ items, dark = false }) {
  return (
    <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
      {items.map((item, index) => (
        <div
          key={item.title}
          style={{
            display: "grid",
            gap: 10,
            paddingTop: index === 0 ? 0 : 14,
            borderTop: index === 0 ? "none" : `1px solid ${dark ? C.border : C.lightBorder}`,
            textAlign: "left",
          }}
        >
          <h3
            style={{
              margin: 0,
              color: dark ? C.text : C.lightText,
              fontFamily: BODY,
              fontSize: "1.04rem",
              fontWeight: 700,
              lineHeight: 1.35,
            }}
          >
            {item.title}
          </h3>
          <div style={{ display: "grid", gap: 9 }}>
            {item.bullets.map((bullet) => (
              <div key={bullet} style={{ display: "grid", gridTemplateColumns: "18px 1fr", gap: 10, alignItems: "start" }}>
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 999,
                    background: `${C.primary}${dark ? "16" : "12"}`,
                    color: C.primary,
                    display: "grid",
                    placeItems: "center",
                    fontSize: "0.74rem",
                    fontWeight: 700,
                    marginTop: 2,
                  }}
                >
                  •
                </div>
                <p
                  style={{
                    margin: 0,
                    color: dark ? C.textSoft : C.lightTextSoft,
                    fontFamily: BODY,
                    fontSize: "0.9rem",
                    lineHeight: 1.78,
                  }}
                >
                  {bullet}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HowWeWorkPreviewPage() {
  const [activeTab, setActiveTab] = useState("werkwijze");

  usePageSeo({
    title: "StarLeo | Werkwijze preview",
    description: "Preview van een gecombineerd wit trust- en werkwijzeblok voor de homepage van StarLeo.",
  });

  const isProcess = activeTab === "werkwijze";

  return (
    <SmoothSection bg={C.lightBg} zIndex={2} minH="110vh" center>
      <div style={{ maxWidth: 1120, margin: "0 auto", textAlign: "center" }}>
        <Reveal delay={0.04}>
          <Tag>Zo werken wij</Tag>
        </Reveal>

        <Reveal delay={0.1}>
          <h1
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
          </h1>
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
            Zo houden we AI overzichtelijk: eerst helder krijgen waar AI waarde toevoegt, daarna samen kiezen en gericht uitvoeren.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 30 }}>
            {tabs.map((tab) => {
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 18,
            marginTop: 28,
          }}
        >
          {(isProcess ? steps : promises).slice(0, 3).map((item, index) => (
            <Reveal key={item.title} delay={0.28 + index * 0.05} fill>
              <GlowCard light style={{ background: C.lightCard, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", height: "100%" }}>
                <div style={{ padding: "1.5rem", textAlign: "left", height: "100%" }}>
                  <div
                    style={{
                      color: C.primary,
                      fontFamily: BODY,
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  >
                    {isProcess ? `Stap ${index + 1}` : `Punt ${index + 1}`}
                  </div>
                  <h3
                    style={{
                      margin: "14px 0 0",
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
    </SmoothSection>
  );
}
