import { BODY, C } from "../lib/theme";
import { GlowCard, PageHero, PageSection, PrimaryButton, Reveal, SectionHeading, usePageSeo } from "../components/ui";

export default function AboutPage() {
  usePageSeo({
    title: "StarLeo | Over StarLeo",
    description:
      "Over StarLeo. Een zelfstandige AI studio voor bedrijven die AI audit, implementatie, workshops en OpenClaw agents concreet willen inzetten.",
  });

  return (
    <>
      <PageHero
        badge="Over StarLeo"
        title={
          <>
            Een zelfstandige AI studio voor bedrijven die
            <span style={{ color: C.primary }}> duidelijkheid en uitvoering zoeken.</span>
          </>
        }
        text="StarLeo helpt bedrijven om AI niet als losse trend te benaderen, maar als praktische stap in processen, support, documenten, kenniswerk en agent workflows. Klein in opzet, scherp in uitvoering en bewust concreet in positionering."
        actions={[
          <PrimaryButton key="intake" to="/">
            Terug naar home
          </PrimaryButton>,
          <PrimaryButton key="audit" secondary to="/ai-audit">
            Bekijk diensten
          </PrimaryButton>,
        ]}
        aside={
          <GlowCard style={{ background: C.bg2, maxWidth: 360 }}>
            <div style={{ padding: "1.35rem" }}>
              <div style={{ color: C.primary, fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: BODY }}>
                Positionering
              </div>
              <p style={{ color: C.text, fontFamily: BODY, fontWeight: 600, marginTop: 12 }}>
                Geen groot bureau met lagen ertussen, maar een directe partner voor AI audit, implementatie, workshops en OpenClaw agent systems.
              </p>
            </div>
          </GlowCard>
        }
      />

      <PageSection bg={C.bg2}>
        <SectionHeading
          tag="Werkwijze"
          title={<>Scherp op inhoud, helder in keuzes en gericht op werk dat echt beter moet draaien</>}
          text="StarLeo is gebouwd voor bedrijven die niet nóg een AI-tool zoeken, maar duidelijkheid, structuur en bruikbare implementatie. Daarom zijn de diensten bewust concreet en nuchter opgezet."
        />
        <div className="card-grid-two" style={{ marginTop: 28 }}>
          {[
            {
              title: "Eerst helderheid, dan uitvoering",
              body: "Soms begint dat met een audit, soms met een workshop en soms direct met implementatie. Het uitgangspunt is altijd: welke stap levert nu de meeste waarde op?",
            },
            {
              title: "Geen opgeblazen bureauverhaal",
              body: "De site en aanpak voelen premium, maar de positionering blijft bewust geloofwaardig: directe samenwerking, inhoudelijke scherpte en focus op processen die echt winst opleveren.",
            },
            {
              title: "AI die past in bestaand werk",
              body: "Niet bouwen om het bouwen, maar AI toepassen waar support, documenten, intake, interne kennis of opvolging nu te veel handmatig werk vragen.",
            },
            {
              title: "OpenClaw waar het echt logisch is",
              body: "Agents horen pas in beeld wanneer werk niet mag stoppen bij een antwoord, maar door moet naar routing, opvolging en uitvoering.",
            },
          ].map((item, index) => (
            <Reveal key={item.title} delay={0.12 + index * 0.04} fill>
              <GlowCard style={{ background: C.bg, height: "100%" }}>
                <div style={{ padding: "1.35rem", height: "100%" }}>
                  <h3 style={{ color: C.text, fontFamily: BODY, fontSize: "0.95rem", fontWeight: 600 }}>{item.title}</h3>
                  <p style={{ color: C.textSoft, fontFamily: BODY, fontSize: "0.82rem", lineHeight: 1.75, marginTop: 10 }}>
                    {item.body}
                  </p>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </PageSection>
    </>
  );
}
