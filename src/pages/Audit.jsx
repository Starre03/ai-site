import IntakeForm from "../components/IntakeForm";
import { BODY, C } from "../lib/theme";
import { BulletList, GlowCard, PageHero, PageSection, PrimaryButton, Reveal, SectionHeading, usePageSeo } from "../components/ui";

export default function AuditPage() {
  usePageSeo({
    title: "starre.ai | AI audit voor bedrijven, workflow analyse en implementatie roadmap",
    description:
      "AI audit voor bedrijven die eerst duidelijkheid willen over AI implementatie. Inclusief workflow analyse, bottleneck analyse, AI kansen, tooladvies en implementatie roadmap.",
  });

  return (
    <>
      <PageHero
        badge="Zelfstandige dienst · AI audit"
        title={
          <>
            AI audit voor bedrijven die eerst duidelijkheid willen
            <span style={{ color: C.primary }}> over AI implementatie.</span>
          </>
        }
        text="De AI audit van starre.ai is een zelfstandige dienst voor bedrijven die eerst willen weten waar AI het meeste oplevert. Je krijgt workflow analyse, bottleneck analyse, AI kansen, tooladvies en een concrete implementatie roadmap zonder verplicht vervolgtraject."
        actions={[
          <PrimaryButton key="intake" href="#intake" onClick={(event) => {
            event.preventDefault();
            document.getElementById("intake")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}>
            Plan AI audit →
          </PrimaryButton>,
          <PrimaryButton key="services" secondary to="/ai-integraties">
            Bekijk AI integraties
          </PrimaryButton>,
        ]}
        aside={
          <GlowCard style={{ background: C.bg2, maxWidth: 360 }}>
            <div style={{ padding: "1.35rem" }}>
              <div style={{ color: C.primary, fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: BODY }}>
                Resultaat
              </div>
              <p style={{ color: C.text, fontFamily: BODY, fontWeight: 600, marginTop: 12 }}>
                Geen losse ideeën, maar een bruikbaar besluitdocument voor AI implementatie.
              </p>
              <p style={{ color: C.textSoft, fontFamily: BODY, lineHeight: 1.75, fontSize: "0.82rem", marginTop: 10 }}>
                Inclusief workflow analyse, bottleneck analyse, AI kansen, tooladvies, prioriteiten en implementatie roadmap.
              </p>
            </div>
          </GlowCard>
        }
      />

      <PageSection bg={C.bg2}>
        <SectionHeading
          tag="Wat je krijgt"
          title={<>Een AI audit die niet blijft hangen in inspiratie, maar eindigt in prioriteiten en keuzes</>}
          text="Het resultaat moet bruikbaar zijn voor directie, operations en teams die echt met AI aan de slag willen. Daarom is deze AI consultancy bewust concreet, zakelijk en gericht op uitvoerbare keuzes."
        />
        <div className="card-grid-two" style={{ marginTop: 28 }}>
          {[
            {
              title: "Workflow analyse",
              body: "We brengen in kaart waar werk blijft hangen, waar teamleden handmatig herhalen en waar beslissingen of overdrachten vertraging veroorzaken.",
            },
            {
              title: "Bottleneck inzicht",
              body: "Je krijgt concreet zicht op welke processen vertragen, hoeveel ruis er zit in intake, support, documentverwerking of interne kennisvragen en waar de meeste winst haalbaar is.",
            },
            {
              title: "Concrete AI kansen",
              body: "Geen inspiratiesessie, maar praktische kansen per proces: wat kan met een kennisassistent, wat vraagt om integraties en wat hoort eerder bij agents.",
            },
            {
              title: "Roadmap en prioriteiten",
              body: "We sluiten af met een nuchtere volgorde: wat eerst doen, wat later doen, wat niet doen en welke tools of modellen logisch zijn.",
            },
          ].map((item, index) => (
            <Reveal key={item.title} delay={0.12 + index * 0.05} fill>
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

      <PageSection bg={C.bg}>
        <div className="two-col" style={{ alignItems: "start" }}>
          <div>
            <SectionHeading
              tag="Voor wie"
              title={<>Voor bedrijven die AI serieus willen inzetten, maar eerst scherpte nodig hebben</>}
              text="Deze dienst past wanneer de urgentie er al is, maar er nog onvoldoende zekerheid is over welke AI implementatie eerst moet, welke tools logisch zijn en waar de grootste winst ligt."
            />
          </div>
          <Reveal delay={0.18}>
            <GlowCard style={{ background: C.bg2 }}>
              <div style={{ padding: "1.35rem" }}>
                <BulletList
                  items={[
                    "Je hebt meerdere ideeën, maar geen duidelijke volgorde",
                    "Je team ziet kansen, maar niemand wil gokken op de verkeerde tool",
                    "Er is behoefte aan een onderbouwde AI roadmap",
                    "Je wilt later zelf of met iemand anders implementeren",
                  ]}
                />
              </div>
            </GlowCard>
          </Reveal>
        </div>
      </PageSection>

      <PageSection bg={C.bg2}>
        <div className="two-col" style={{ alignItems: "start" }}>
          <div>
            <SectionHeading
              tag="Uitkomst"
              title={<>Na de AI audit weet je waar je moet starten, wat je moet laten liggen en wat het kan opleveren</>}
              text="Dat is precies waarom deze dienst los waarde heeft. Je koopt duidelijkheid, prioritering en een betere basis voor AI implementatie."
            />
          </div>
          <Reveal delay={0.18}>
            <GlowCard style={{ background: C.bg }}>
              <div style={{ padding: "1.35rem" }}>
                <BulletList
                  items={[
                    "Een overzicht van bottlenecks en processen waar AI impact maakt",
                    "Een shortlist van haalbare use-cases voor AI audit, integraties of agents",
                    "Tooladvies voor Claude, ChatGPT / OpenAI of OpenClaw waar relevant",
                    "Een implementatie roadmap met prioriteiten, volgorde en realistische volgende stap",
                  ]}
                />
              </div>
            </GlowCard>
          </Reveal>
        </div>
      </PageSection>

      <IntakeForm
        preferredRoute="AI Audit"
        title={
          <>
            Start met een AI audit die
            <em style={{ color: C.primary, fontStyle: "italic" }}> richting, prioriteit en onderbouwing oplevert</em>
          </>
        }
        text="Gebruik dit formulier om context mee te geven voor je AI audit. Dan kunnen we tijdens het gesprek direct inzoomen op processen, bottlenecks en de beste implementatierichting."
      />
    </>
  );
}
