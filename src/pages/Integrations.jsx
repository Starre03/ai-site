import IntakeForm from "../components/IntakeForm";
import { BODY, C } from "../lib/theme";
import { BulletList, GlowCard, PageHero, PageSection, PrimaryButton, Reveal, SectionHeading, usePageSeo } from "../components/ui";

export default function IntegrationsPage() {
  usePageSeo({
    title: "starre.ai | AI implementatie, Claude integratie, ChatGPT integratie en OpenAI integratie",
    description:
      "AI integraties voor bedrijven met Claude, ChatGPT en OpenAI. Voor support, documentanalyse, AI kennisassistenten en workflow verbetering in bestaande processen.",
  });

  return (
    <>
      <PageHero
        badge="AI implementatie · Claude integratie · ChatGPT integratie · OpenAI integratie"
        title={
          <>
            AI implementatie voor support,
            <span style={{ color: C.primary }}> document AI en kenniswerk.</span>
          </>
        }
        text="starre.ai bouwt Claude integraties, ChatGPT integraties en OpenAI integraties voor bedrijven die support, documentanalyse, interne kennis en bestaande workflows slimmer willen maken. Geen OpenClaw hier, maar gerichte AI implementatie binnen bestaand werk."
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
                Positionering
              </div>
              <p style={{ color: C.text, fontFamily: BODY, fontWeight: 600, marginTop: 12 }}>
                Geen OpenClaw hier. Deze dienst draait bewust om Claude, ChatGPT en OpenAI integraties.
              </p>
              <p style={{ color: C.textSoft, fontFamily: BODY, lineHeight: 1.75, fontSize: "0.82rem", marginTop: 10 }}>
                Voor AI kennisassistenten, documentanalyse, support automation en AI in bestaande processen.
              </p>
            </div>
          </GlowCard>
        }
      />

      <PageSection bg={C.bg2}>
        <SectionHeading
          tag="Wat we bouwen"
          title={
            <>
              Claude en ChatGPT integraties voor bedrijven die
              <em style={{ color: C.primary, fontStyle: "italic" }}> sneller, consistenter en slimmer willen werken</em>
            </>
          }
          text="Het verschil met AI agents is bewust scherp. Deze dienst helpt teams beter werken met AI in support, documentprocessen en interne workflows. Dit is geen OpenClaw agentlaag, maar praktische AI implementatie in bestaande systemen."
        />
        <div className="card-grid-two" style={{ marginTop: 28 }}>
          {[
            {
              title: "Kennisassistenten",
              body: "Zoek en antwoord op basis van interne documentatie, procedures, handleidingen of projectinformatie, zodat teams minder tijd kwijt zijn aan zoeken en afstemmen.",
            },
            {
              title: "Documentanalyse",
              body: "Laat Claude of ChatGPT documenten samenvatten, vergelijken, actiepunten extraheren of vertalen naar bruikbare output voor sales, operations of support.",
            },
            {
              title: "Support workflows",
              body: "Bereid antwoorden voor, categoriseer vragen, haal context uit bestaande bronnen op en maak support consistenter zonder elk ticket volledig handmatig te behandelen.",
            },
            {
              title: "Interne tools",
              body: "Voeg AI toe aan interne dashboards, portals of operationele tools zodat teams sneller kunnen beoordelen, samenvatten, vinden en beslissen.",
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
              tag="Waar dit goed werkt"
              title={<>De juiste dienst als support, kenniswerk en documentprocessen slimmer moeten zonder agentlaag</>}
              text="Kies AI integraties wanneer de bottleneck zit in informatie ophalen, antwoorden voorbereiden, documenten beoordelen of interne context gebruiken. Niet wanneer je al toe bent aan OpenClaw AI agents die taken doorzetten of uitvoeren."
            />
          </div>
          <Reveal delay={0.18}>
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
          </Reveal>
        </div>
      </PageSection>

      <PageSection bg={C.bg2}>
        <div className="two-col" style={{ alignItems: "start" }}>
          <div>
            <SectionHeading
              tag="Use-cases"
              title={<>Van AI support automation tot document AI en interne kennisassistenten</>}
              text="Deze dienst is er voor bedrijven die zoekintentie hebben rond Claude integratie, ChatGPT integratie, OpenAI integratie, document AI en AI voor kenniswerk."
            />
          </div>
          <Reveal delay={0.18}>
            <GlowCard style={{ background: C.bg }}>
              <div style={{ padding: "1.35rem" }}>
                <BulletList
                  items={[
                    "Supportteams die sneller en consistenter willen reageren met AI context uit documentatie",
                    "Documentprocessen waar samenvatten, vergelijken of informatie extraheren veel tijd kost",
                    "Interne teams die een AI kennisassistent willen op policies, handleidingen of dossiers",
                    "Bedrijven die AI implementatie willen toevoegen aan bestaande processen zonder OpenClaw agent setup",
                  ]}
                />
              </div>
            </GlowCard>
          </Reveal>
        </div>
      </PageSection>

      <IntakeForm
        preferredRoute="AI Integraties"
        title={
          <>
            Verken AI integraties die
            <em style={{ color: C.primary, fontStyle: "italic" }}> morgen al waarde kunnen hebben in je team</em>
          </>
        }
        text="De intake helpt ons bepalen welk support-, document- of kennisproces het meest geschikt is voor een eerste Claude integratie, ChatGPT integratie of bredere OpenAI implementatie."
      />
    </>
  );
}
