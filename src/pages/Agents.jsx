import IntakeForm from "../components/IntakeForm";
import { contactSteps } from "../content/siteContent";
import { BODY, C } from "../lib/theme";
import { BulletList, GlowCard, PageHero, PageSection, PrimaryButton, Reveal, SectionHeading, TyperText, usePageSeo } from "../components/ui";

export default function AgentsPage() {
  usePageSeo({
    title: "OpenClaw AI Agents voor bedrijven — Inbox & lead automation | StarLeo",
    description:
      "OpenClaw AI agents en agent systems voor bedrijven. Voor inbox automation, lead qualification, intake automation, support routing en AI workflow automatisering.",
  });

  return (
    <>
      <PageHero
        badge="OpenClaw setups · AI Agents"
        minH="100vh"
        centerY
        titleSize="clamp(2.2rem, 5vw, 4.15rem)"
        titleMaxWidth={760}
        textMaxWidth={600}
        fullCenter
        title={
          <>
            OpenClaw AI agents voor inbox automation,
            <span style={{ color: C.primary }}> lead qualification en support routing.</span>
          </>
        }
        text="StarLeo bouwt OpenClaw setups en AI agents voor bedrijven die meer willen dan losse AI antwoorden. Dit gaat over mail begrijpen, intake automation, leads analyseren, support routeren en acties klaarzetten of uitvoeren via moderne agent systems."
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
                OpenClaw concreet
              </div>
              <p style={{ color: C.text, fontFamily: BODY, fontWeight: 600, marginTop: 12 }}>
                Inbox lezen, mail begrijpen, intake starten, CRM checken en opvolging klaarzetten.
              </p>
              <p style={{ color: C.textSoft, fontFamily: BODY, lineHeight: 1.75, fontSize: "0.82rem", marginTop: 10 }}>
                <TyperText
                  items={[
                    "Mail begrijpen en routing starten",
                    "Leads analyseren en intake automation starten",
                    "Support routeren en opvolging klaarzetten",
                  ]}
                  primaryCursor={false}
                />
              </p>
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
        <div className="two-col" style={{ alignItems: "start" }}>
          <div>
            <SectionHeading
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
          </div>
          <Reveal delay={0.18}>
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
          </Reveal>
        </div>
      </PageSection>

      <PageSection bg={C.lightBg} minH="100vh" centerY>
        <div className="two-col" style={{ alignItems: "start" }}>
          <div>
            <SectionHeading
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
          </div>
          <Reveal delay={0.18}>
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
          </Reveal>
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
