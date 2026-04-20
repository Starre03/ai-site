import IntakeForm from "../components/IntakeForm";
import { contactSteps } from "../content/siteContent";
import Faq from "../components/Faq";
import { BODY, C } from "../lib/theme";
import { BulletList, GlowCard, PageHero, PageSection, PrimaryButton, Reveal, SectionHeading, usePageSeo } from "../components/ui";

const integrationsFaqItems = [
  {
    q: "Wat is het verschil met custom software laten bouwen?",
    a: "Wij bouwen geen software. We richten bestaande tools als Claude en ChatGPT in op uw situatie. Dat is sneller, goedkoper en minder risicovol dan maatwerksoftware laten ontwikkelen.",
  },
  {
    q: "Welke systemen kunnen worden gekoppeld?",
    a: "De meeste gangbare tools hebben een API of webhook die we kunnen gebruiken: e-mail, CRM, Google Workspace, SharePoint en meer. We kijken per situatie wat haalbaar is.",
  },
  {
    q: "Hoe lang duurt een implementatie?",
    a: "Een standaard integratie is in één week ingericht. Bij complexere situaties met meerdere koppelingen spreken we de doorlooptijd vooraf met u af.",
  },
  {
    q: "Wat als medewerkers het niet gebruiken?",
    a: "Adoptie is onderdeel van onze aanpak. We trainen het team, maken het zo laagdrempelig mogelijk en evalueren na twee weken of er bijsturing nodig is.",
  },
];

export default function IntegrationsPage() {
  usePageSeo({
    title: "Claude & ChatGPT integratie voor bedrijven — AI implementatie | StarLeo",
    description:
      "AI integraties voor bedrijven met Claude, ChatGPT en OpenAI. Voor support, documentanalyse, AI kennisassistenten en workflow verbetering in bestaande processen.",
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
            Claude en ChatGPT integreren
            <span style={{ display: "block" }}>
              zodat <span style={{ color: C.primary }}>AI</span> in uw bedrijf
            </span>
            <span style={{ display: "block", color: C.primary }}>direct waarde oplevert.</span>
          </>
        }
        text="Wij richten Claude en ChatGPT zo in dat analyses, rapportages en antwoorden sneller beschikbaar komen en direct bruikbaar zijn in uw dagelijkse werk. Geen maatwerksoftware, maar een slimme inrichting die meteen waarde toevoegt."
        actions={[
          <PrimaryButton key="intake" href="#intake" onClick={(event) => {
            event.preventDefault();
            document.getElementById("intake")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}>
            Bespreek AI integraties →
          </PrimaryButton>,
          <PrimaryButton key="agents" secondary to="/ai-agents">
            Bekijk AI agents
          </PrimaryButton>,
        ]}
        aside={
          <GlowCard style={{ background: C.bg2, maxWidth: 360 }}>
            <div style={{ padding: "1.35rem" }}>
              <div style={{ color: C.primary, fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: BODY }}>
                Van idee naar werkende integratie
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
                {[
                  "Intake: welk proces wilt u verbeteren?",
                  "Inrichting: Claude of ChatGPT correct instellen",
                  "Live: uw team werkt er de volgende dag al mee",
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
            tag="Wat het oplevert"
            centered
            light
            title={
              <>
                Wat <span style={{ color: C.primary }}>Claude</span> en <span style={{ color: C.primary }}>ChatGPT</span>
                <span style={{ display: "block" }}>nu al voor uw bedrijf</span>
                <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
                  kunnen betekenen.
                </span>
              </>
            }
            text="De kracht zit al in de tools zelf. Wij zorgen voor de juiste inrichting, context en toepassing, zodat uw team er direct waarde uit haalt."
          />
          <div className="card-grid-two" style={{ marginTop: 28 }}>
            {[
              {
                title: "Documenten sneller analyseren",
                body: "Claude leest contracten, rapporten, dossiers en handleidingen en zet de kern direct om in een heldere samenvatting, actiepunten of een concreet antwoord.",
              },
              {
                title: "Analyses en rapportages voorbereiden",
                body: "Claude en ChatGPT helpen bij het opstellen van kwartaalrapportages, managementsamenvattingen en analyses van cijfers, zodat inzichten sneller beschikbaar komen en minder handmatig werk vragen.",
              },
              {
                title: "Support consistenter en sneller maken",
                body: "Claude of ChatGPT bereidt antwoorden voor op vragen van klanten of collega's, op basis van uw eigen informatie. Uw team controleert en verstuurt, met meer snelheid en meer consistentie.",
              },
              {
                title: "Interne kennis direct bruikbaar maken",
                body: "Procedures, beleid en eerdere documenten worden sneller vindbaar en begrijpelijk, zodat medewerkers minder hoeven te zoeken en sneller met de juiste informatie verder kunnen.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={0.12 + index * 0.05} fill>
                <GlowCard
                  light
                  className="card-sweep"
                  style={{
                    background: C.lightCard,
                    height: "100%",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                    "--sweep-offset": `${index * 3}s`,
                  }}
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
            tag="Waar dit goed werkt"
            title={
              <>
                Claude of ChatGPT goed inrichten,
                <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
                  hiervoor is geen grote herstructurering nodig.
                </span>
              </>
            }
            text="Deze aanpak werkt goed wanneer Claude of ChatGPT snel waarde kan toevoegen binnen uw bestaande werkwijze. Met de juiste inrichting, context en toepassing wordt AI direct bruikbaar in het dagelijkse werk van uw team."
          />
          <div className="card-grid-two" style={{ marginTop: 32 }}>
            {[
              {
                title: "Veel terugkerende vragen",
                body: "Voor teams die vaak dezelfde vragen beantwoorden of steeds opnieuw dezelfde informatie opzoeken.",
              },
              {
                title: "Veel documenten en inhoud",
                body: "Voor organisaties die werken met contracten, rapportages, dossiers, beleid of andere kennisintensieve documenten.",
              },
              {
                title: "Informatie uit meerdere bronnen",
                body: "Voor situaties waarin informatie verspreid staat en sneller samengebracht en bruikbaar moet worden gemaakt.",
              },
              {
                title: "Wel implementeren, niet herbouwen",
                body: "Voor bedrijven die AI willen inzetten binnen hun bestaande werkwijze, zonder direct een groot traject te starten.",
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
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <SectionHeading
            centered
            light
            tag="Maatwerk"
            title={
              <>
                Heeft u iets specifieks in gedachten?
                <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
                  We kijken eerlijk naar wat haalbaar is.
                </span>
              </>
            }
            text="Standaard implementaties zijn een goed startpunt. Maar elke situatie is anders. Als uw vraag verder gaat — een specifieke koppeling, een afwijkend proces of een idee dat u wilt verkennen — bespreken we graag wat realistisch is. Geen verkooppraatje, maar een eerlijk gesprek over haalbaarheid."
          />
          <Reveal delay={0.18}>
            <div style={{ marginTop: 32 }}>
              <GlowCard light style={{ background: C.lightCard, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <div style={{ padding: "1.35rem" }}>
                  <div style={{ color: C.lightTextSoft }}>
                  <BulletList
                    light
                    items={[
                      "Specifieke koppeling met uw bestaande systemen",
                      "Inrichting op uw eigen documenten of kennisbank",
                      "Begeleiding bij adoptie en gebruik in uw team",
                      "Verkenning van wat verder mogelijk is",
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
            items={integrationsFaqItems}
            title={
              <>
                Veelgestelde vragen over
                <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
                  AI implementatie met Claude en ChatGPT.
                </span>
              </>
            }
            text="Korte antwoorden over koppelingen, doorlooptijd en hoe wij bestaande tools praktisch werkend maken."
          />
        </div>
      </PageSection>

      <IntakeForm
        preferredRoute="AI Integraties"
        centered
        tagLabel="Contact"
        steps={contactSteps}
        submissionKind="contact"
        title={
          <>
            Wilt u Claude of ChatGPT integreren?
            <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
              We bespreken graag de mogelijkheden.
            </span>
          </>
        }
        text="Beschrijf uw situatie kort. Dan kijken we samen welke integratie het meeste oplevert."
        submitLabel="Verstuur bericht →"
        doneTitle="Bericht ontvangen"
        doneText="We nemen contact op om uw situatie en wensen verder te bespreken."
      />
    </>
  );
}
