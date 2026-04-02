import { BODY, C } from "../lib/theme";
import { GlowCard, PrimaryButton, Reveal, SmoothSection, Tag, usePageSeo } from "../components/ui";

const cards = [
  {
    title: "Er is te veel gezien, maar te weinig gekozen",
    desc: "Bedrijven hebben al tools, demo's en voorbeelden gezien, maar missen nog overzicht over waar AI nu echt waarde toevoegt en wat vooral ruis is.",
  },
  {
    title: "AI blijft hangen in losse experimenten",
    desc: "Een paar prompts en proefaccounts leveren zelden structurele winst op. Daardoor blijft AI iets naast het werk, in plaats van iets dat het werk echt versnelt.",
  },
  {
    title: "Handmatig werk blijft onnodig bestaan",
    desc: "Support, intake, documentwerk en interne opvolging kosten nog steeds te veel tijd, terwijl daar juist vaak de eerste snelle AI-winst zit.",
  },
  {
    title: "Niemand wil direct een groot traject kopen",
    desc: "De meeste bedrijven zoeken geen groot AI-programma, maar een logische eerste stap: audit, implementatie of een agentflow die direct tastbaar resultaat oplevert.",
  },
];

export default function ProblemSectionPreviewPage() {
  usePageSeo({
    title: "StarLeo | Witte sectie preview",
    description: "Preview van het gecentreerde probleemblok op de homepage voor StarLeo.",
  });

  return (
    <SmoothSection bg={C.lightBg} zIndex={2} minH="120vh" center>
      <div style={{ maxWidth: 1120, margin: "0 auto", textAlign: "center" }}>
        <Reveal delay={0.04}>
          <Tag>Waarom bedrijven vastlopen</Tag>
        </Reveal>

        <Reveal delay={0.1}>
          <h1
            style={{
              fontFamily: BODY,
              fontSize: "clamp(2.3rem, 5.2vw, 4.7rem)",
              lineHeight: 1.07,
              fontWeight: 700,
              margin: "0 auto",
              letterSpacing: "-0.03em",
              color: C.lightText,
              maxWidth: 980,
            }}
          >
            Bedrijven weten dat AI bestaat,
            <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
              maar weten niet waar ze vandaag moeten beginnen.
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p
            style={{
              color: C.lightTextSoft,
              fontSize: "1rem",
              lineHeight: 1.8,
              maxWidth: 760,
              margin: "24px auto 0",
              fontFamily: BODY,
            }}
          >
            Het probleem is meestal niet dat bedrijven niets van AI weten. Het probleem is dat ze nog niet scherp hebben waar AI
            direct tijd terugwint, welk proces als eerste aangepakt moet worden en welke route logisch is.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 30 }}>
            <PrimaryButton href="#diensten" onClick={(event) => event.preventDefault()}>
              Bekijk mogelijkheden
            </PrimaryButton>
          </div>
        </Reveal>

        <div className="card-grid-two" style={{ marginTop: 44 }}>
          {cards.map((item, index) => (
            <Reveal key={item.title} delay={0.18 + index * 0.05} fill>
              <GlowCard light style={{ background: C.lightCard, height: "100%", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <div style={{ padding: "2rem", height: "100%", textAlign: "left" }}>
                  <h3 style={{ fontFamily: BODY, fontSize: "1rem", fontWeight: 600, color: C.lightText }}>{item.title}</h3>
                  <p style={{ color: C.lightTextSoft, fontSize: "0.92rem", lineHeight: 1.82, marginTop: 12, fontFamily: BODY }}>
                    {item.desc}
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
