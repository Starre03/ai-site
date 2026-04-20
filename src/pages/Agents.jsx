import IntakeForm from "../components/IntakeForm";
import { contactSteps } from "../content/siteContent";
import Faq from "../components/Faq";
import { BODY, C } from "../lib/theme";
import { BulletList, GlowCard, PageHero, PageSection, PrimaryButton, Reveal, SectionHeading, usePageSeo } from "../components/ui";

const agentFaqItems = [
  {
    q: "Wat is precies een AI agent?",
    a: "Een AI agent is software die zelfstandig taken uitvoert op basis van een trigger zoals een binnenkomende e-mail of een ingevuld formulier. Hij beslist, handelt en rapporteert zonder dat iemand elke stap hoeft te begeleiden.",
  },
  {
    q: "Hoe lang duurt het om een agent te bouwen?",
    a: "Een eenvoudige agent is in één tot drie weken live. Complexere workflows met meerdere stappen of koppelingen duren langer en dat bespreken we vooraf eerlijk met u.",
  },
  {
    q: "Zijn onze gegevens veilig?",
    a: "Ja. We werken met de beveiligde API's van Anthropic en OpenAI zonder dat uw data wordt gebruikt voor training. We tekenen een verwerkingsovereenkomst waar dat nodig is.",
  },
  {
    q: "Wat als de agent een fout maakt?",
    a: "Agents worden altijd gebouwd met een escalatiepad: bij twijfel of een onverwachte situatie wordt een mens ingeschakeld. We bouwen geen systemen die volledig autonoom werken zonder menselijke controle.",
  },
];

export default function AgentsPage() {
  usePageSeo({
    title: "OpenClaw AI Agents voor bedrijven — Inbox & lead automation | StarLeo",
    description:
      "OpenClaw AI agents en agent systems voor bedrijven. Voor inbox automation, lead qualification, intake automation, support routing en AI workflow automatisering.",
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
            Een digitale werknemer die uw werk
            <span style={{ color: C.primary }}> zelfstandig overneemt.</span>
          </>
        }
        text="Wij bouwen AI agents die e-mails begrijpen, leads kwalificeren, support routeren en taken uitvoeren zonder dat iemand er elke keer bij hoeft te zijn. Geen losse AI antwoorden, maar een agent die echt werk afhandelt."
        actions={[
          <PrimaryButton key="intake" href="#intake" onClick={(event) => {
            event.preventDefault();
            document.getElementById("intake")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}>
            Bespreek OpenClaw setup →
          </PrimaryButton>,
          <PrimaryButton key="audit" secondary to="/ai-audit">
            Start met AI audit
          </PrimaryButton>,
        ]}
        aside={
          <GlowCard style={{ background: C.bg2, maxWidth: 380 }}>
            <div style={{ padding: "1.35rem" }}>
              <div style={{ color: C.primary, fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: BODY }}>
                Wat een agent zelfstandig doet
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
                {[
                  "Triggert op een e-mail, formulier of event",
                  "Voert taken uit: opzoeken, samenvatten, versturen",
                  "Rapporteert terug of escaleert bij twijfel",
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
            tag="Wat OpenClaw doet"
            centered
            light
            title={
              <>
                OpenClaw is geen losse demo.
                <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
                  Een agent system dat werk doorzet en uitvoert.
                </span>
              </>
            }
            text="Daarmee verschilt deze dienst fundamenteel van AI integraties. Integraties helpen medewerkers sneller werken. OpenClaw AI agents pakken werk op, routeren het door, verrijken context en zetten vervolgstappen klaar of voeren ze uit."
          />
          <div className="card-grid-two" style={{ marginTop: 28 }}>
            {[
              {
                title: "Mail checken en begrijpen",
                body: "Een inbox-agent leest binnenkomende mails, herkent intentie en bepaalt of het gaat om support, sales, intake, opvolging of escalatie.",
              },
              {
                title: "Conceptantwoorden voorbereiden",
                body: "Een antwoord-agent verzamelt context uit documentatie of systemen en zet een passend antwoord klaar voor review of directe verzending.",
              },
              {
                title: "Leads analyseren en intake starten",
                body: "Een lead-agent beoordeelt fit, haalt context uit CRM, stuurt intakevragen uit en zet de juiste vervolgstappen klaar voor sales of operations.",
              },
              {
                title: "Samenwerkende agents",
                body: "Verschillende agents kunnen achter elkaar of parallel werken: inbox-agent, CRM-agent, support-agent en routing-agent binnen één flow.",
              },
              {
                title: "Support categoriseren en routeren",
                body: "Tickets of mails worden automatisch gelabeld, verrijkt en doorgestuurd naar de juiste queue, persoon of vervolgactie.",
              },
              {
                title: "Acties voorstellen of uitvoeren",
                body: "Afhankelijk van het proces kunnen agents taken klaarzetten, statussen updaten, workflows triggeren of voorstellen doen voordat een medewerker bevestigt.",
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
                Kies AI agents als werk niet stopt bij een antwoord.
                <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
                  Het moet door naar actie.
                </span>
              </>
            }
            text="Zodra inbox, support, intake, leadopvolging of routing deels zelfstandig moeten verlopen, is dit de logische dienst. Dan heeft u geen losse integratie meer nodig, maar een OpenClaw setup met samenwerkende agents."
          />
          <Reveal delay={0.18}>
            <div style={{ marginTop: 32 }}>
              <GlowCard style={{ background: C.bg2 }}>
                <div style={{ padding: "1.35rem" }}>
                  <BulletList
                    items={[
                      "U wilt inbox, leads of supportstromen slimmer afhandelen",
                      "Meerdere systemen moeten samenwerken in één flow",
                      "Taken moeten worden doorgezet of uitgevoerd, niet alleen beoordeeld",
                      "U zoekt een concrete OpenClaw setup in plaats van een losse AI demo",
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
            light
            tag="Waarom OpenClaw"
            title={
              <>
                Meerdere agents die tegelijk kijken, redeneren en handelen.
                <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
                  Dat is het verschil met een losse integratie.
                </span>
              </>
            }
            text="Dat maakt OpenClaw interessant voor bedrijven die nieuwsgierig zijn naar moderne AI agents voor bedrijven, AI automatisering en agent systems die samenwerken tussen inbox, CRM, routing en opvolging."
          />
          <Reveal delay={0.18}>
            <div style={{ marginTop: 32 }}>
              <GlowCard light style={{ background: C.lightCard, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <div style={{ padding: "1.35rem" }}>
                  <div style={{ color: C.lightTextSoft }}>
                  <BulletList
                    light
                    items={[
                      "Een inbox-agent kan mail begrijpen terwijl een CRM-agent context ophaalt en een routing-agent de volgende stap voorbereidt",
                      "Lead qualification, intake automation en support routing kunnen binnen één OpenClaw setup samenkomen",
                      "Agents kunnen acties klaarzetten of uitvoeren in plaats van alleen suggesties teruggeven",
                      "Dit maakt OpenClaw krachtig voor AI workflow automatisering met echte bedrijfslogica",
                    ]}
                  />
                  </div>
                </div>
              </GlowCard>
            </div>
          </Reveal>
        </div>
      </PageSection>

      <PageSection bg={C.bg} minH="100vh" centerY>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <Faq
            items={agentFaqItems}
            title={
              <>
                Veelgestelde vragen over
                <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
                  AI agents en OpenClaw setups.
                </span>
              </>
            }
            text="Heldere antwoorden over bouwtijd, veiligheid en hoe een agent zich gedraagt in de praktijk."
          />
        </div>
      </PageSection>

      <IntakeForm
        preferredRoute="AI Agents"
        centered
        tagLabel="Contact"
        steps={contactSteps}
        submissionKind="contact"
        title={
          <>
            Interesse in een OpenClaw setup?
            <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
              Laat het ons weten.
            </span>
          </>
        }
        text="Vertel kort welk proces u wilt automatiseren. Dan kijken we samen of een OpenClaw setup past."
        submitLabel="Verstuur bericht →"
        doneTitle="Bericht ontvangen"
        doneText="We nemen contact op om uw situatie en wensen verder te bespreken."
      />
    </>
  );
}
