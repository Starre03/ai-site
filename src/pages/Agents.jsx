import IntakeForm from "../components/IntakeForm";
import { useState } from "react";
import { contactSteps } from "../content/siteContent";
import Faq from "../components/Faq";
import { BODY, C } from "../lib/theme";
import { GlowCard, PageHero, PageSection, PrimaryButton, Reveal, SectionHeading, usePageSeo } from "../components/ui";

const automationFaqItems = [
  {
    q: "Wat valt onder AI automatisering?",
    a: "AI automatisering kan een losse agent zijn die een taak uitvoert, maar ook een volledig proces met formulieren, CRM, inbox, documenten, dashboards en maatwerkcode. We kiezen de vorm die past bij uw proces.",
  },
  {
    q: "Wat is het verschil tussen OpenClaw agents en maatwerkautomatisering?",
    a: "OpenClaw agents zijn sterk voor losse taken of processtappen, zoals opvolging, triage, samenvatting of conceptoutput. Maatwerkautomatisering gebruiken we wanneer meerdere systemen, data en stappen betrouwbaar samen moeten werken.",
  },
  {
    q: "Zijn onze gegevens veilig?",
    a: "Ja. We werken met de beveiligde API's van Anthropic en OpenAI zonder dat uw data wordt gebruikt voor training. We tekenen een verwerkingsovereenkomst waar dat nodig is.",
  },
  {
    q: "Kunnen jullie ook het hele proces bouwen?",
    a: "Ja. Als een proces meer nodig heeft dan een losse agent, bouwen we de benodigde koppelingen, logica, interne tooling of dashboards met ervaren software engineers. Zo kan een proces echt end-to-end worden geautomatiseerd.",
  },
];

const automationRoutes = [
  {
    id: "agent",
    label: "OpenClaw agent",
    summary: "Voor één duidelijke taak of processtap die snel zelfstandig kan draaien.",
    steps: [
      "Trigger uit inbox, formulier of planning",
      "AI voert triage, samenvatting of opvolging uit",
      "Team keurt goed of krijgt alleen uitzonderingen",
    ],
  },
  {
    id: "workflow",
    label: "Proces op maat",
    summary: "Voor complete workflows waarin systemen, data en mensen samen moeten werken.",
    steps: [
      "Proces ontwerpen en systemen koppelen",
      "Maatwerkcode bouwt logica, dashboard en controles",
      "Workflow draait door met beheer en verbeteringen",
    ],
  },
];

function AutomationRoutePreview() {
  const [activeRoute, setActiveRoute] = useState("agent");
  const activeIndex = automationRoutes.findIndex((route) => route.id === activeRoute);
  const active = automationRoutes[activeIndex] || automationRoutes[0];

  return (
    <GlowCard style={{ background: C.bg2, maxWidth: 540, width: "100%" }}>
      <div style={{ padding: "1.35rem" }}>
        <div style={{ color: C.primary, fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: BODY }}>
          Kies uw route
        </div>

        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginTop: 14,
            padding: 4,
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 4,
              bottom: 4,
              left: `calc(${activeIndex * 50}% + 4px)`,
              width: "calc(50% - 8px)",
              borderRadius: 10,
              background: C.primary,
              boxShadow: `0 10px 26px ${C.primary}25`,
              transition: "left 420ms cubic-bezier(.22,1,.36,1)",
            }}
          />
          {automationRoutes.map((route) => {
            const selected = route.id === activeRoute;
            return (
              <button
                key={route.id}
                type="button"
                onClick={() => setActiveRoute(route.id)}
                style={{
                  position: "relative",
                  zIndex: 1,
                  border: "none",
                  background: "transparent",
                  color: selected ? "#fff" : C.textSoft,
                  fontFamily: BODY,
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  padding: "0.72rem 0.55rem",
                  cursor: "pointer",
                  transition: "color 220ms ease",
                }}
              >
                {route.label}
              </button>
            );
          })}
        </div>

        <div style={{ position: "relative", height: 28, margin: "12px 14px 0" }} aria-hidden="true">
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 13,
              height: 1,
              background: "linear-gradient(90deg, rgba(255,255,255,0.08), rgba(14,165,233,0.45), rgba(255,255,255,0.08))",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 7,
              left: activeIndex === 0 ? "0%" : "100%",
              width: 14,
              height: 14,
              borderRadius: 999,
              background: C.primary,
              boxShadow: `0 0 18px ${C.primary}88`,
              transform: "translateX(-50%)",
              transition: "left 520ms cubic-bezier(.22,1,.36,1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 9,
              width: 10,
              height: 10,
              borderRadius: 999,
              border: `1px solid ${C.primary}66`,
              background: C.bg2,
              transform: "translateX(-50%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 9,
              width: 10,
              height: 10,
              borderRadius: 999,
              border: `1px solid ${C.primary}66`,
              background: C.bg2,
              transform: "translateX(50%)",
            }}
          />
        </div>

        <div style={{ marginTop: 16, minHeight: 214 }}>
          <p
            key={`${active.id}-summary`}
            style={{
              margin: 0,
              color: C.text,
              fontFamily: BODY,
              fontSize: "0.86rem",
              lineHeight: 1.7,
              opacity: 1,
            }}
          >
            {active.summary}
          </p>

          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 10,
                top: 12,
                bottom: 12,
                width: 1,
                background: `linear-gradient(180deg, ${C.primary}66, rgba(255,255,255,0.08))`,
              }}
            />
            {active.steps.map((step, index) => (
              <div
                key={`${active.id}-${step}`}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  transform: "translateX(0)",
                  transition: `opacity 260ms ease ${index * 40}ms, transform 260ms ease ${index * 40}ms`,
                }}
              >
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
                    zIndex: 1,
                  }}
                >
                  {index + 1}
                </div>
                <div style={{ fontFamily: BODY, fontSize: "0.82rem", lineHeight: 1.6, color: C.textSoft }}>{step}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlowCard>
  );
}

export default function AgentsPage() {
  usePageSeo({
    title: "AI Automatisering voor bedrijven — Agents, koppelingen & maatwerkcode | StarLeo",
    description:
      "AI automatisering voor bedrijven. Van OpenClaw agents voor losse taken tot volledige procesautomatisering met koppelingen, dashboards en maatwerkcode.",
  });

  return (
    <>
      <PageHero
        minH="100vh"
        centerY
        titleSize="clamp(2.2rem, 5vw, 4.15rem)"
        titleMaxWidth={760}
        textMaxWidth={600}
        fullCenter
        title={
          <>
            AI automatisering die processen
            <span style={{ display: "block" }}>zelfstandig laat doorlopen.</span>
            <span style={{ display: "block", color: C.primary }}>Met agents, koppelingen en maatwerkcode.</span>
          </>
        }
        text="Wij automatiseren terugkerende processen met AI agents, bestaande tools en waar nodig maatwerkcode. Soms is een losse OpenClaw agent genoeg. Soms bouwen we de volledige workflow, inclusief koppelingen, dashboards en controlepunten."
        actions={[
          <PrimaryButton key="intake" href="#intake" onClick={(event) => {
            event.preventDefault();
            document.getElementById("intake")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}>
            Bespreek AI automatisering →
          </PrimaryButton>,
          <PrimaryButton key="integrations" secondary to="/ai-integraties">
            Bekijk AI implementatie
          </PrimaryButton>,
        ]}
        aside={<AutomationRoutePreview />}
      />

      <PageSection bg={C.lightBg} minH="100vh" centerY>
        <div style={{ maxWidth: 1120, margin: "0 auto", textAlign: "center" }}>
          <SectionHeading
            tag="Wat we automatiseren"
            centered
            light
            title={
              <>
                Van losse taak tot volledig proces.
                <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
                  Wij bouwen wat nodig is.
                </span>
              </>
            }
            text="AI automatisering hoeft niet altijd groot te beginnen. We kunnen een losse agent instellen voor een terugkerende taak, maar ook een volledige workflow bouwen met code, API-koppelingen en menselijke controle waar dat nodig blijft."
          />
          <div className="card-grid-two" style={{ marginTop: 28 }}>
            {[
              {
                title: "OpenClaw agents instellen",
                body: "Voor losse taken zoals inbox triage, leadopvolging, samenvattingen, conceptantwoorden, rapportvoorbereiding of taakroutering.",
              },
              {
                title: "Maatwerkcode bouwen",
                body: "Als een proces meer nodig heeft dan een agent, bouwen we gerichte software die data, stappen en beslissingen betrouwbaar laat samenwerken.",
              },
              {
                title: "Systemen koppelen",
                body: "We verbinden formulieren, CRM, inbox, documenten, planningen en dashboards zodat informatie automatisch door het proces beweegt.",
              },
              {
                title: "Interne tools en dashboards",
                body: "Wanneer teams overzicht nodig hebben, bouwen we eenvoudige tools of dashboards waarin AI-output, status en controles samenkomen.",
              },
              {
                title: "Human-in-the-loop",
                body: "Automatisering hoeft niet blind te werken. We bouwen controlepunten in zodat uw team kan goedkeuren, corrigeren of escaleren.",
              },
              {
                title: "Beheer en doorontwikkeling",
                body: "Na livegang kunnen we blijven verbeteren, nieuwe stappen toevoegen en automatiseringen aanpassen wanneer uw proces verandert.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={0.12 + index * 0.04} fill>
                <GlowCard
                  light
                  style={{ background: C.lightCard, height: "100%", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
                >
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
            tag="Wanneer dit past"
            title={
              <>
                Kies AI automatisering zodra werk
                <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
                  structureel zelfstandig moet doorlopen.
                </span>
              </>
            }
            text="Deze dienst past wanneer werk niet mag blijven hangen in losse prompts, losse tools of handmatig overzetten. Dan bouwen we de laag die het proces bewaakt, doorzet en afrondt."
          />
          <div className="card-grid-two" style={{ marginTop: 32 }}>
            {[
              {
                title: "Een losse agent is genoeg",
                body: "Voor afgebakende taken zoals samenvatten, beoordelen, opvolgen, concepten maken of informatie verzamelen.",
              },
              {
                title: "Het hele proces moet lopen",
                body: "Voor workflows waarin input, beoordeling, output, opvolging en rapportage automatisch op elkaar moeten aansluiten.",
              },
              {
                title: "Systemen praten niet met elkaar",
                body: "Voor situaties waarin informatie steeds handmatig tussen inbox, CRM, documenten, spreadsheets of dashboards wordt overgezet.",
              },
              {
                title: "Controle blijft belangrijk",
                body: "Voor processen waar AI veel mag voorbereiden of uitvoeren, maar waar mensen bij uitzonderingen of besluiten betrokken blijven.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={0.18 + index * 0.05} fill>
                <GlowCard style={{ background: C.bg2, height: "100%" }}>
                  <div style={{ padding: "1.35rem", height: "100%", textAlign: "left" }}>
                    <h3 style={{ color: C.primary, fontFamily: BODY, fontSize: "0.95rem", fontWeight: 600, lineHeight: 1.35 }}>{item.title}</h3>
                    <p style={{ color: C.text, fontFamily: BODY, fontSize: "0.82rem", lineHeight: 1.75, marginTop: 10 }}>
                      {item.body}
                    </p>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection bg={C.lightBg} minH="100vh" centerY>
        <div style={{ maxWidth: 1120, margin: "0 auto", textAlign: "center" }}>
          <SectionHeading
            centered
            light
            tag="Agents of maatwerk"
            title={
              <>
                Niet elk proces vraagt dezelfde oplossing.
                <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
                  Daarom bouwen we in lagen.
                </span>
              </>
            }
            text="Soms is OpenClaw de snelste route: een agent die één duidelijk stuk werk uitvoert. Als het proces breder is, voegen we koppelingen, eigen logica, dashboards of maatwerksoftware toe."
          />
          <div className="card-grid-two" style={{ marginTop: 32 }}>
            {[
              {
                title: "OpenClaw voor losse onderdelen",
                body: "Sterk wanneer één taak of processtap terugkomt: triage, opvolging, samenvatting, conceptoutput of interne voorbereiding.",
              },
              {
                title: "Code voor volledige workflows",
                body: "Sterk wanneer meerdere systemen, datastromen, uitzonderingen en acties betrouwbaar samen moeten werken.",
              },
              {
                title: "Keuze op basis van proces",
                body: "We starten niet vanuit een favoriete tool, maar vanuit wat het proces nodig heeft om sneller, consistenter en betrouwbaarder te lopen.",
              },
              {
                title: "Engineeringteam achter de hand",
                body: "Voor maatwerk werken we met ervaren software engineers, zodat complexe automatisering niet blijft steken in een prototype.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={0.18 + index * 0.05} fill>
                <GlowCard
                  light
                  style={{ background: C.lightCard, height: "100%", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
                >
                  <div style={{ padding: "1.35rem", height: "100%", textAlign: "left" }}>
                    <h3 style={{ color: C.primary, fontFamily: BODY, fontSize: "0.95rem", fontWeight: 600, lineHeight: 1.35 }}>{item.title}</h3>
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
          <Faq
            centered
            items={automationFaqItems}
            title={
              <>
                Veelgestelde vragen over
                <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
                  AI automatisering.
                </span>
              </>
            }
            text="Heldere antwoorden over agents, maatwerkcode, veiligheid en wanneer volledige automatisering zinvol is."
          />
        </div>
      </PageSection>

      <IntakeForm
        preferredRoute="AI Automatisering"
        centered
        tagLabel="Contact"
        steps={contactSteps}
        submissionKind="contact"
        title={
          <>
            Interesse in AI automatisering?
            <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
              Laat het ons weten.
            </span>
          </>
        }
        text="Vertel kort welk proces u wilt automatiseren. Dan kijken we samen of een losse agent, een koppeling of maatwerkautomatisering het beste past."
        submitLabel="Verstuur bericht →"
        doneTitle="Bericht ontvangen"
        doneText="We nemen contact op om uw situatie en wensen verder te bespreken."
      />
    </>
  );
}
