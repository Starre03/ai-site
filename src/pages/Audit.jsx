import IntakeForm from "../components/IntakeForm";
import { contactSteps } from "../content/siteContent";
import Faq from "../components/Faq";
import { BODY, C } from "../lib/theme";
import { useVisible } from "../lib/hooks";
import { BulletList, GlowCard, PageHero, PageSection, PrimaryButton, Reveal, SectionHeading, usePageSeo } from "../components/ui";

const auditFlowSteps = [
  { title: "Intake en context", body: "We bespreken processen, knelpunten, teams, systemen en wat er al is geprobeerd." },
  { title: "Analyse van workflows", body: "We kijken waar handmatig werk, vertraging en overdrachten onnodig veel tijd kosten." },
  { title: "AI kansen en keuzes", body: "We bepalen welke toepassingen logisch zijn en wat nu vooral afleiding of te vroeg is." },
  { title: "Roadmap en advies", body: "U krijgt een helder overzicht van prioriteiten, vervolgstappen en toolrichting." },
];

function AuditFlow() {
  const [ref, visible] = useVisible(0.12);
  return (
    <div ref={ref} className={`audit-flow ${visible ? "is-visible" : ""}`}>
      <div className="audit-flow-line" />
      {auditFlowSteps.map((step, index) => (
        <div key={step.title} className="audit-flow-step">
          <div className="audit-flow-circle">{index + 1}</div>
          <div className="audit-flow-text">
            <div className="audit-flow-title">{step.title}</div>
            <p className="audit-flow-body">{step.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

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
    q: "Wat hebben wij van u nodig?",
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
        pad="clamp(5.75rem, 10vw, 7.4rem) clamp(1.5rem, 5vw, 5rem) clamp(4rem, 8vw, 4.6rem)"
        minH="100vh"
        centerY
        titleSize="clamp(2.2rem, 5vw, 4.15rem)"
        titleMaxWidth={760}
        textMaxWidth={600}
        fullCenter
        title={
          <>
            Weet waar <span style={{ color: C.primary }}>AI</span> in uw bedrijf direct iets oplevert.
          </>
        }
        text="Krijg helder waar AI in uw bedrijf direct rendeert, welke processen prioriteit verdienen en welke vervolgstap logisch is. Zonder direct een implementatietraject te hoeven starten."
        actions={[
          <PrimaryButton key="intake" href="#intake" onClick={(event) => {
            event.preventDefault();
            document.getElementById("intake")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}>
            Plan AI audit →
          </PrimaryButton>,
          <PrimaryButton key="services" secondary to="/ai-integraties">
            Bekijk implementatie
          </PrimaryButton>,
        ]}
        aside={
          <GlowCard style={{ background: C.bg2, maxWidth: 520, width: "100%" }}>
            <div style={{ padding: "1.25rem 1.25rem 1.1rem" }}>
              <div style={{ color: C.primary, fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: BODY }}>
                Hoe een audit werkt
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
                {[
                  "Intake: uw processen en documenten in kaart brengen",
                  "Analyse: wij brengen kansen en risico's in kaart",
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
                Een AI audit die eindigt in
                <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
                  analyse, rapportage en concrete prioriteiten.
                </span>
              </>
            }
            text="U krijgt een heldere analyse van uw processen, een concrete rapportage van kansen en knelpunten, en duidelijke prioriteiten voor de meest logische vervolgstap."
          />
          <div className="card-grid-two" style={{ marginTop: 28 }}>
            {[
              {
                title: "Workflow analyse",
                body: "We brengen in kaart waar werk blijft hangen, waar handmatig wordt herhaald en waar overdrachten onnodige vertraging veroorzaken.",
              },
              {
                title: "Bottleneck inzicht",
                body: "U ziet welke processen vertragen, waar ruis ontstaat en waar met AI de meeste winst haalbaar is.",
              },
              {
                title: "Concrete AI kansen",
                body: "U ziet per proces waar AI direct waarde toevoegt, welke tooling daarbij past en of een kennisassistent, integratie of agent de juiste aanpak is.",
              },
              {
                title: "Roadmap en prioriteiten",
                body: "U krijgt een heldere volgorde: wat eerst aandacht verdient, wat later kan volgen en welke stappen de meeste impact maken.",
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
            text="Deze dienst past wanneer de urgentie er al is, maar er nog onvoldoende zekerheid is over waar AI het meeste oplevert en welke stap logisch is om eerst te zetten."
          />
          <Reveal delay={0.18}>
            <div className="card-grid-two" style={{ marginTop: 32 }}>
              {[
                {
                  title: "Duidelijke volgorde",
                  body: "U ziet meerdere kansen, maar mist nog een heldere volgorde.",
                },
                {
                  title: "Eerste prioriteit",
                  body: "U wilt gericht kiezen waar AI als eerste moet bijdragen.",
                },
                {
                  title: "Onderbouwde roadmap",
                  body: "U heeft behoefte aan duidelijke prioriteiten en een onderbouwde roadmap.",
                },
                {
                  title: "Gerichte implementatie",
                  body: "U wilt later zelf of met een partner gericht implementeren.",
                },
              ].map((item, index) => (
                <Reveal key={item.title} delay={0.18 + index * 0.05} fill>
                  <GlowCard style={{ background: C.bg2, height: "100%" }}>
                    <div style={{ padding: "1.35rem", height: "100%" }}>
                      <h3 style={{ color: C.primary, fontFamily: BODY, fontSize: "0.95rem", fontWeight: 600 }}>{item.title}</h3>
                      <p style={{ color: C.text, fontFamily: BODY, fontSize: "0.82rem", lineHeight: 1.75, marginTop: 10 }}>
                        {item.body}
                      </p>
                    </div>
                  </GlowCard>
                </Reveal>
              ))}
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
          <div style={{ marginTop: 40 }}>
            <AuditFlow />
          </div>
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
            text="U krijgt duidelijke keuzes, concrete prioriteiten en een heldere basis om gericht met AI verder te gaan."
          />
          <Reveal delay={0.18}>
            <div className="card-grid-two" style={{ marginTop: 32 }}>
              {[
                {
                  title: "Bottlenecks en processen",
                  body: "U krijgt overzicht van waar processen vertragen en waar AI direct impact kan maken.",
                },
                {
                  title: "Kansrijke use-cases",
                  body: "U ziet welke toepassingen logisch zijn voor een audit, integratie of agent-aanpak.",
                },
                {
                  title: "Tool- en modeladvies",
                  body: "U krijgt advies over welke tooling of modellen passen bij uw situatie en doelen.",
                },
                {
                  title: "Roadmap en vervolgstap",
                  body: "U krijgt een concrete volgorde van prioriteiten en de meest logische volgende stap.",
                },
              ].map((item, index) => (
                <Reveal key={item.title} delay={0.18 + index * 0.05} fill>
                  <GlowCard style={{ background: C.bg2, height: "100%" }}>
                    <div style={{ padding: "1.35rem", height: "100%" }}>
                      <h3 style={{ color: C.primary, fontFamily: BODY, fontSize: "0.95rem", fontWeight: 600 }}>{item.title}</h3>
                      <p style={{ color: C.text, fontFamily: BODY, fontSize: "0.82rem", lineHeight: 1.75, marginTop: 10 }}>
                        {item.body}
                      </p>
                    </div>
                  </GlowCard>
                </Reveal>
              ))}
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
                title: "Los inzetbaar als eerste stap",
                points: [
                  "Geen verplicht vervolgtraject",
                  "Eerst duidelijkheid, daarna keuzes",
                  "Sterk als onafhankelijke eerste stap",
                ],
              },
              {
                title: "Sterk in de oriëntatiefase",
                points: [
                  "Brengt prioriteiten en focus aan",
                  "Maakt interne gesprekken concreter",
                  "Geeft richting voor implementatie of agents",
                ],
              },
              {
                title: "Waar AI echt waarde toevoegt",
                points: [
                  "Inzicht in waar AI direct tijd kan terugwinnen",
                  "Duidelijk welke processen de meeste winst opleveren",
                  "Sneller zien waar integratie of agents logisch zijn",
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
                  <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: 14, height: "100%", textAlign: "left" }}>
                    <h3 style={{ color: C.primary, fontFamily: BODY, fontSize: "1rem", fontWeight: 700, lineHeight: 1.35 }}>{item.title}</h3>
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
            centered
            contentWidth={800}
            title={
              <>
                Veelgestelde vragen over
                <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
                  de AI audit.
                </span>
              </>
            }
            text="Heldere antwoorden over doorlooptijd, benodigde input en wat een AI audit concreet toevoegt."
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
