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
        badge="AI implementatie · Claude · ChatGPT · OpenAI"
        minH="100vh"
        centerY
        titleSize="clamp(2.2rem, 5vw, 4.15rem)"
        titleMaxWidth={760}
        textMaxWidth={600}
        fullCenter
        title={
          <>
            Claude en ChatGPT integreren in uw bedrijf —
            <span style={{ color: C.primary }}> zodat het direct iets oplevert.</span>
          </>
        }
        text="Wij richten Claude en ChatGPT in voor uw support, documentprocessen of interne kenniswerk. Geen software bouwen — maar de juiste tool, goed ingericht op uw situatie, zodat uw team er morgen al mee kan werken."
        actions={[
          <PrimaryButton key="intake" href="#intake" onClick={(event) => {
            event.preventDefault();
            document.getElementById("intake")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}>
            Bespreek AI integraties →
          </PrimaryButton>,
          <PrimaryButton key="agents" secondary to="/ai-agents">
            Vergelijk met AI agents
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
                Wat Claude en ChatGPT al kunnen doen
                <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
                  zonder iets te bouwen.
                </span>
              </>
            }
            text="De kracht zit al in de tools zelf. Wij zorgen voor de juiste inrichting, de juiste context en de koppeling met uw processen — zodat het daadwerkelijk werkt voor uw team."
          />
          <div className="card-grid-two" style={{ marginTop: 28 }}>
            {[
              {
                title: "Documenten samenvatten en analyseren",
                body: "Claude leest contracten, rapporten, dossiers of handleidingen en geeft direct een samenvatting, actiepunten of antwoord op een specifieke vraag. Bespaart uren per week.",
              },
              {
                title: "Vragen beantwoorden op uw eigen kennisbank",
                body: "Koppel uw documentatie, FAQ of procedures aan Claude — en uw team of klanten krijgen direct het juiste antwoord, zonder te zoeken of collega's lastig te vallen.",
              },
              {
                title: "Support consistenter en sneller maken",
                body: "ChatGPT of Claude bereidt antwoorden voor op binnenkomende vragen, op basis van uw eigen documentatie. Uw team controleert en verstuurt — sneller, consistenter.",
              },
              {
                title: "Interne informatie toegankelijk maken",
                body: "Beleid, procedures, eerdere projecten — Claude maakt het doorzoekbaar en begrijpelijk. Nieuwe medewerkers vinden antwoorden zelf, zonder steeds te hoeven vragen.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={0.12 + index * 0.05} fill>
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
            tag="Waar dit goed werkt"
            title={
              <>
                Claude of ChatGPT goed inrichten is al genoeg.
                <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
                  Geen agentlaag, geen grote herbouw.
                </span>
              </>
            }
            text="Kies deze dienst als de tools er al zijn — of kunnen komen — maar de inrichting, context en koppeling aan uw processen nog ontbreekt. Geen softwareontwikkeling, maar slimme implementatie van wat er al is."
          />
          <Reveal delay={0.18}>
            <div style={{ marginTop: 32 }}>
              <GlowCard style={{ background: C.bg2 }}>
                <div style={{ padding: "1.35rem" }}>
                  <BulletList
                    items={[
                      "Supportteams met veel terugkerende vragen of documentchecks",
                      "Kennisintensieve teams die werken met policies, contracten of dossiers",
                      "Interne processen waar informatie uit meerdere bronnen samenkomt",
                      "Organisaties die AI in hun bestaande stack willen opnemen zonder grote herbouw",
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
