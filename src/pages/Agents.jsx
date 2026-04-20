import IntakeForm from "../components/IntakeForm";
import { contactSteps } from "../content/siteContent";
import Faq from "../components/Faq";
import { BODY, C } from "../lib/theme";
import { GlowCard, PageHero, PageSection, PrimaryButton, Reveal, SectionHeading, usePageSeo } from "../components/ui";

const agentFaqItems = [
  {
    q: "Wat is precies een AI agent?",
    a: "Een AI agent voert zelfstandig taken uit op basis van een trigger, context en duidelijke regels. Denk aan content voorbereiden, inboxen opvolgen, informatie verzamelen of een volgende stap klaarzetten.",
  },
  {
    q: "Hoe lang duurt het om een agent te bouwen?",
    a: "Een eerste agent voor content, marketing of inboxwerk kan vaak binnen één tot drie weken live staan. Complexere flows met meerdere systemen of stappen vragen meer afstemming.",
  },
  {
    q: "Zijn onze gegevens veilig?",
    a: "Ja. We werken met de beveiligde API's van Anthropic en OpenAI zonder dat uw data wordt gebruikt voor training. We tekenen een verwerkingsovereenkomst waar dat nodig is.",
  },
  {
    q: "Wat als onze situatie afwijkt van een standaard setup?",
    a: "Dat bespreken we graag. We werken samen met ervaren software engineers die jarenlang hebben gebouwd bij innovatieve bedrijven, waardoor maatwerk ook mogelijk is als uw situatie daarom vraagt.",
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
            AI agents die processen
            <span style={{ display: "block" }}>zelfstandig uitvoeren</span>
            <span style={{ display: "block", color: C.primary }}>en laten doorlopen.</span>
          </>
        }
        text="Wij bouwen AI agents voor content, marketing, inboxen, opvolging en andere terugkerende processen. Waar mogelijk automatisch, en waar gewenst met human in the loop."
        actions={[
          <PrimaryButton key="intake" href="#intake" onClick={(event) => {
            event.preventDefault();
            document.getElementById("intake")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}>
            Bespreek AI agents →
          </PrimaryButton>,
          <PrimaryButton key="integrations" secondary to="/ai-integraties">
            Bekijk AI integraties
          </PrimaryButton>,
        ]}
        aside={
          <GlowCard style={{ background: C.bg2, maxWidth: 500, width: "100%" }}>
            <div style={{ padding: "1.35rem" }}>
              <div style={{ color: C.primary, fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: BODY }}>
                Wat een agent zelfstandig doet
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
                {[
                  "Verwerkt input uit briefing, inbox of formulier",
                  "Maakt content, zet taken klaar of bereidt een volgende stap voor",
                  "Stuurt door, rapporteert terug of vraagt om akkoord",
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
                OpenClaw helpt niet alleen met antwoorden.
                <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
                  Het voert werk ook echt uit.
                </span>
              </>
            }
            text="Juist daardoor is deze dienst sterk voor terugkerende processen waarin meerdere stappen op elkaar aansluiten. Agents kunnen informatie ophalen, formats vullen, acties klaarzetten en werk tussen systemen en mensen laten doorlopen."
          />
          <div className="card-grid-two" style={{ marginTop: 28 }}>
            {[
              {
                title: "Input omzetten in output",
                body: "Een agent zet een briefing of ruwe input om in concrete invalshoeken, formats en voorstellen voor content.",
              },
              {
                title: "Concepten voorbereiden",
                body: "Blogs, social posts, mailteksten of landingspagina's worden voorbereid in uw tone of voice, klaar voor review.",
              },
              {
                title: "Planning bewaken",
                body: "Een agent houdt onderwerpen, deadlines en opvolging bij, zodat contentproductie niet stilvalt.",
              },
              {
                title: "Inbox en reacties opvolgen",
                body: "Binnenkomende vragen, reacties of leads worden beoordeeld, beantwoord of doorgestuurd naar de juiste vervolgactie.",
              },
              {
                title: "Informatie verzamelen en verrijken",
                body: "Een agent haalt context uit documenten, eerdere content of systemen en gebruikt die direct in het volgende werk.",
              },
              {
                title: "Taken tussen systemen doorzetten",
                body: "OpenClaw kan acties klaarzetten of uitvoeren in CRM, planning, inbox of andere tools die in het proces meedraaien.",
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
                Kies AI agents zodra processen
                <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
                  zelfstandig moeten doorlopen.
                </span>
              </>
            }
            text="Deze dienst past wanneer werk niet mag blijven hangen in losse prompts of handmatig gedoe. Dan is het waardevol dat een agent niet alleen helpt, maar ook bewaakt, doorzet en afrondt."
          />
          <div className="card-grid-two" style={{ marginTop: 32 }}>
            {[
              {
                title: "Veel werk, weinig ritme",
                body: "Voor teams die genoeg ideeën hebben, maar moeite hebben om content consequent uit te werken en te publiceren.",
              },
              {
                title: "Van briefing naar output",
                body: "Voor processen waarin input steeds opnieuw moet worden omgezet in teksten, formats, analyses of vervolgstappen.",
              },
              {
                title: "Inbox en leads blijven liggen",
                body: "Voor organisaties waar aanvragen, reacties of opvolging te veel blijven wachten op handmatig werk.",
              },
              {
                title: "Werk moet doorlopen",
                body: "Voor situaties waarin taken automatisch naar de juiste persoon, tool of volgende stap moeten worden gestuurd.",
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
            tag="Waarom OpenClaw"
            title={
              <>
                Niet één prompt, maar agents die
                <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
                  samen werk laten doorlopen.
                </span>
              </>
            }
            text="OpenClaw wordt krachtig zodra meerdere stappen op elkaar moeten aansluiten. De ene agent verzamelt context, de volgende maakt output klaar en een derde bewaakt opvolging of publicatie."
          />
          <div className="card-grid-two" style={{ marginTop: 32 }}>
            {[
              {
                title: "Vaste structuur en tone of voice",
                body: "Agents kunnen werken met formats, richtlijnen en merkregels, zodat output consistenter wordt.",
              },
              {
                title: "Planning en opvolging",
                body: "Een agent kan deadlines bewaken, vervolgacties klaarzetten en signaleren wanneer iets blijft liggen.",
              },
              {
                title: "Samenwerking tussen tools",
                body: "Inbox, planning, documenten en CRM kunnen logisch op elkaar aansluiten binnen één flow.",
              },
              {
                title: "Maatwerk altijd bespreekbaar",
                body: "Als uw situatie afwijkt, kijken we samen wat slim is. Waar nodig werken we met ervaren engineers om maatwerk goed uit te voeren.",
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
