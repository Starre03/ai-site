import IntakeForm from "../components/IntakeForm";
import { contactSteps } from "../content/siteContent";
import Faq from "../components/Faq";
import { BODY, C } from "../lib/theme";
import { BulletList, GlowCard, PageHero, PageSection, PrimaryButton, Reveal, SectionHeading, usePageSeo } from "../components/ui";

const auditFaqItems = [
  {
    q: "Wat levert een AI audit concreet op?",
    a: "Een audit laat zien waar AI direct tijd of kosten bespaart in uw processen. U krijgt een helder rapport met prioriteiten, geen abstracte aanbevelingen maar concrete stappen die u morgen kunt zetten.",
  },
  {
    q: "Hoe lang duurt een audit?",
    a: "Een standaard audit duurt één tot twee weken, afhankelijk van de complexiteit van uw processen en het aantal documenten dat we bekijken.",
  },
  {
    q: "Wat hebben jullie van ons nodig?",
    a: "Toegang tot een aantal voorbeelddocumenten of procesbeschrijvingen en een intakegesprek van een uur. Meer hebben we niet nodig om te starten.",
  },
  {
    q: "Wat is het verschil met zelf ChatGPT gebruiken?",
    a: "ChatGPT gebruiken is een goed begin. Een audit kijkt verder: welke processen lenen zich écht voor AI, wat zijn de risico's en hoe zorgt u dat uw team het structureel gebruikt in plaats van incidenteel.",
  },
];

export default function AuditPage() {
  usePageSeo({
    title: "AI Audit voor bedrijven — Workflow analyse & roadmap | StarLeo",
    description:
      "AI audit voor bedrijven die eerst duidelijkheid willen over AI implementatie. Inclusief workflow analyse, bottleneck analyse, AI kansen, tooladvies en implementatie roadmap.",
  });

  return (
    <>
      <PageHero
        badge="Zelfstandige dienst · AI audit"
        pad="clamp(5.75rem, 10vw, 7.4rem) clamp(1.5rem, 5vw, 5rem) clamp(4rem, 8vw, 4.6rem)"
        minH="100vh"
        centerY
        titleSize="clamp(2.2rem, 5vw, 4.15rem)"
        titleMaxWidth={760}
        textMaxWidth={600}
        fullCenter
        title={
          <>
            AI audit voor bedrijven die eerst willen weten
            <span style={{ color: C.primary }}> waar AI het meeste oplevert.</span>
          </>
        }
        text="Krijg scherp waar AI in uw bedrijf direct waarde toevoegt, welke processen eerst aandacht verdienen en welke volgende stap logisch is. Zonder direct een implementatietraject in te hoeven."
        actions={[
          <PrimaryButton key="intake" href="#intake" onClick={(event) => {
            event.preventDefault();
            document.getElementById("intake")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}>
            Plan AI audit →
          </PrimaryButton>,
          <PrimaryButton key="services" secondary to="/ai-integraties">
            Vergelijk met implementatie
          </PrimaryButton>,
        ]}
        aside={
          <GlowCard style={{ background: C.bg2, maxWidth: 360 }}>
            <div style={{ padding: "1.25rem 1.25rem 1.1rem" }}>
              <div style={{ color: C.primary, fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: BODY }}>
                Hoe een audit werkt
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
                {[
                  "Intake: uw processen en documenten in kaart brengen",
                  "Analyse: Claude beoordeelt risico's en kansen",
                  "Rapport: concreet advies, direct toepasbaar",
                ].map((step, index) => (
                  <div key={step} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div
                      style={{
                        minWidth: 22,
                        height: 22,
                        borderRadius: 999,
                        background: C.primary,
                        color: "#fff",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 1,
                        flexShrink: 0,
                      }}
                    >
                      {index + 1}
                    </div>
                    <div style={{ fontFamily: BODY, fontSize: "0.82rem", lineHeight: 1.6, color: C.textSoft }}>{step}</div>
                  </div>
                ))}
              </div>
            </div>
          </GlowCard>
        }
      />

      <PageSection bg={C.lightBg} minH="100vh" centerY>
        <div style={{ maxWidth: 1120, margin: "0 auto", textAlign: "center" }}>
          <SectionHeading
            tag="Wat u krijgt"
            light
            centered
            title={
              <>
                Geen inspiratiesessie, maar een audit die eindigt
                <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
                  in prioriteiten en uitvoerbare keuzes.
                </span>
              </>
            }
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
                body: "U krijgt concreet zicht op welke processen vertragen, hoeveel ruis er zit in intake, support, documentverwerking of interne kennisvragen en waar de meeste winst haalbaar is.",
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
                <GlowCard light style={{ background: C.lightCard, height: "100%", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                  <div style={{ padding: "1.35rem", height: "100%" }}>
                    <h3 style={{ color: C.primary, fontFamily: BODY, fontSize: "0.95rem", fontWeight: 600 }}>{item.title}</h3>
                    <p style={{ color: C.lightTextSoft, fontFamily: BODY, fontSize: "0.82rem", lineHeight: 1.75, marginTop: 10 }}>
                      {item.body}
                    </p>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection bg={C.bg} minH="100vh" centerY>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <SectionHeading
            centered
            tag="Voor wie"
            title={
              <>
                Voor bedrijven die AI serieus willen inzetten,
                <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
                  maar eerst scherpte nodig hebben.
                </span>
              </>
            }
            text="Deze dienst past wanneer de urgentie er al is, maar er nog onvoldoende zekerheid is over welke AI implementatie eerst moet, welke tools logisch zijn en waar de grootste winst ligt."
          />
          <Reveal delay={0.18}>
            <div style={{ marginTop: 32 }}>
              <GlowCard style={{ background: C.bg2 }}>
                <div style={{ padding: "1.35rem" }}>
                  <BulletList
                    items={[
                      "U hebt meerdere ideeën, maar geen duidelijke volgorde",
                      "Uw team ziet kansen, maar niemand wil gokken op de verkeerde tool",
                      "Er is behoefte aan een onderbouwde AI roadmap",
                      "U wilt later zelf of met iemand anders implementeren",
                    ]}
                  />
                </div>
              </GlowCard>
            </div>
          </Reveal>
        </div>
      </PageSection>

      <PageSection bg={C.lightBg} minH="100vh" centerY>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <SectionHeading
            centered
            tag="Hoe de audit werkt"
            light
            title={
              <>
                Van intake naar analyse naar prioriteiten.
                <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
                  Snel en zonder omwegen.
                </span>
              </>
            }
            text="De audit is bedoeld om snel bruikbare scherpte te geven. Geen lang traject vooraf, maar een duidelijke analyse, een heldere sessie en een besluitdocument waar u echt verder mee kunt."
          />
          <Reveal delay={0.18}>
            <div style={{ marginTop: 32 }}>
              <GlowCard light style={{ background: C.lightCard, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <div style={{ padding: "1.35rem" }}>
                  <div style={{ display: "grid", gap: 14 }}>
                    {[
                      ["1. Intake en context", "We bespreken processen, huidige knelpunten, teams, systemen en wat er al is geprobeerd."],
                      ["2. Analyse van workflows", "We kijken waar handmatig werk, vertraging en overdrachtsmomenten onnodig veel tijd kosten."],
                      ["3. AI kansen en keuzes", "We bepalen welke toepassingen logisch zijn en wat nu vooral afleiding of te vroeg is."],
                      ["4. Roadmap en advies", "U krijgt een helder overzicht van prioriteiten, vervolgstappen en toolrichting."],
                    ].map(([title, body]) => (
                      <div key={title}>
                        <div style={{ color: C.lightText, fontFamily: BODY, fontSize: "0.84rem", fontWeight: 700 }}>{title}</div>
                        <p style={{ color: C.lightTextSoft, fontFamily: BODY, fontSize: "0.8rem", lineHeight: 1.72, marginTop: 6 }}>{body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </GlowCard>
            </div>
          </Reveal>
        </div>
      </PageSection>

      <PageSection bg={C.bg} minH="100vh" centerY>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <SectionHeading
            centered
            tag="Uitkomst"
            title={
              <>
                Na de audit weet u precies waar te starten
                <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
                  en wat u kunt laten liggen.
                </span>
              </>
            }
            text="Dat is precies waarom deze dienst los waarde heeft. U koopt duidelijkheid, prioritering en een betere basis voor AI implementatie."
          />
          <Reveal delay={0.18}>
            <div style={{ marginTop: 32 }}>
              <GlowCard style={{ background: C.bg2 }}>
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
            </div>
          </Reveal>
        </div>
      </PageSection>

      <PageSection bg={C.lightBg} minH="100vh" centerY>
        <div style={{ maxWidth: 1120, margin: "0 auto", textAlign: "center" }}>
          <SectionHeading
            tag="Waarom eerst een AI audit"
            light
            centered
            title={
              <>
                Eerst helderheid over waar AI waarde toevoegt.
                <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
                  Daarna implementatie.
                </span>
              </>
            }
            width={860}
          />
          <div className="card-grid-three" style={{ marginTop: 32 }}>
            {[
              {
                title: "Lage instap zonder verplicht vervolg",
                intro: "U hoeft niet eerst een implementatietraject in. De audit is los af te nemen en geeft eerst helderheid over waar AI in uw bedrijf logisch is.",
                points: [
                  "Geen verplicht vervolgtraject",
                  "Eerst duidelijkheid voordat u verder investeert",
                  "Sterk als onafhankelijke eerste stap",
                ],
              },
              {
                title: "Sterk als eerste stap in oriëntatie",
                intro: "Juist in de oriëntatiefase helpt een audit om sneller te zien waar AI relevant is en waar u nog niet mee hoeft te beginnen.",
                points: [
                  "Brengt prioriteiten en focus aan",
                  "Maakt interne gesprekken concreter",
                  "Geeft richting voor implementatie of agents",
                ],
              },
              {
                title: "Waar AI echt waarde toevoegt",
                intro: "U krijgt helder waar AI in uw bedrijf bruikbaar is en welke processen het meeste kunnen opleveren.",
                points: [
                  "Inzicht in waar AI direct tijd kan terugwinnen",
                  "Duidelijk welke processen de meeste winst opleveren",
                  "Sneller zien waar automatisering, integratie of agents logisch zijn",
                ],
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={0.12 + index * 0.05} fill>
                <GlowCard
                  light
                  style={{
                    background: C.lightCard,
                    height: "100%",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  }}
                >
                  <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: 14, height: "100%" }}>
                    <div>
                      <h3 style={{ color: C.primary, fontFamily: BODY, fontSize: "1rem", fontWeight: 700 }}>{item.title}</h3>
                      <div
                        style={{
                          marginTop: 10,
                          color: C.primary,
                          fontFamily: BODY,
                          fontSize: "0.72rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          fontWeight: 700,
                        }}
                      >
                        Voordeel
                      </div>
                      <p style={{ color: C.lightTextSoft, fontFamily: BODY, fontSize: "0.84rem", lineHeight: 1.75, marginTop: 10 }}>
                        {item.intro}
                      </p>
                    </div>
                    <BulletList items={item.points} light />
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection bg={C.bg} minH="100vh" centerY>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <Faq
            items={auditFaqItems}
            title={
              <>
                Veelgestelde vragen over
                <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
                  een AI audit.
                </span>
              </>
            }
            text="Heldere antwoorden over doorlooptijd, benodigde input en wat een audit toevoegt ten opzichte van zelf experimenteren."
          />
        </div>
      </PageSection>

      <IntakeForm
        preferredRoute="AI Audit"
        centered
        tagLabel="Contact"
        steps={contactSteps}
        submissionKind="contact"
        title={
          <>
            Interesse in een AI audit?
            <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
              Laat het ons weten.
            </span>
          </>
        }
        text="Vertel kort uw situatie. Dan bespreken we samen of een AI audit de juiste eerste stap is."
        submitLabel="Verstuur bericht →"
        doneTitle="Bericht ontvangen"
        doneText="We nemen contact op om uw situatie en wensen verder te bespreken."
      />
    </>
  );
}
