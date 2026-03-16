import { BODY, C } from "../lib/theme";
import { PageSection, Reveal, SectionHeading, usePageSeo } from "../components/ui";

export default function TermsPage() {
  usePageSeo({
    title: "starre.ai | Algemene Voorwaarden",
    description: "Algemene voorwaarden van starre.ai voor AI audit, AI integraties en OpenClaw AI agent dienstverlening.",
  });

  const sections = [
    {
      title: "1. Definities",
      text: "In deze algemene voorwaarden wordt verstaan onder: Opdrachtnemer: starre.ai. Opdrachtgever: de natuurlijke of rechtspersoon die een overeenkomst aangaat met starre.ai. Diensten: alle werkzaamheden die starre.ai verricht, waaronder AI audit, AI integraties en OpenClaw AI agent setups. Overeenkomst: elke afspraak tussen opdrachtgever en starre.ai over het leveren van diensten.",
    },
    {
      title: "2. Toepasselijkheid",
      text: "Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, offertes en overeenkomsten tussen starre.ai en opdrachtgever. Afwijkingen zijn alleen geldig indien schriftelijk overeengekomen. De toepasselijkheid van eventuele inkoop- of andere voorwaarden van opdrachtgever wordt uitdrukkelijk van de hand gewezen.",
    },
    {
      title: "3. Aanbiedingen en offertes",
      text: "Alle aanbiedingen en offertes van starre.ai zijn vrijblijvend, tenzij uitdrukkelijk anders vermeld. Een overeenkomst komt tot stand op het moment dat opdrachtgever een offerte schriftelijk of per e-mail accepteert, of wanneer starre.ai feitelijk met de uitvoering van de opdracht begint.",
    },
    {
      title: "4. Uitvoering van de overeenkomst",
      text: "starre.ai voert de diensten uit naar beste inzicht en vermogen, conform de eisen van goed vakmanschap. De overeenkomst betreft een inspanningsverplichting, geen resultaatsverplichting. starre.ai heeft het recht om werkzaamheden te laten uitvoeren door derden indien dit de kwaliteit of voortgang ten goede komt.",
    },
    {
      title: "5. Medewerking opdrachtgever",
      text: "Opdrachtgever zorgt ervoor dat alle gegevens, systemen, toegang en documentatie die nodig zijn voor de uitvoering tijdig beschikbaar zijn. Vertragingen door het ontbreken van benodigde informatie of medewerking komen voor rekening van opdrachtgever.",
    },
    {
      title: "6. Tarieven en betaling",
      text: "Tarieven worden vooraf overeengekomen per offerte of opdrachtbevestiging. Alle genoemde bedragen zijn exclusief btw, tenzij anders vermeld. Betaling dient te geschieden binnen 14 dagen na factuurdatum, tenzij anders overeengekomen. Bij overschrijding van de betalingstermijn is opdrachtgever van rechtswege in verzuim en is starre.ai gerechtigd wettelijke rente en incassokosten in rekening te brengen.",
    },
    {
      title: "7. Intellectueel eigendom",
      text: "Alle rechten op door starre.ai ontwikkelde of ter beschikking gestelde materialen, waaronder rapporten, code, configuraties en documentatie, berusten bij starre.ai, tenzij schriftelijk anders overeengekomen. Na volledige betaling verkrijgt opdrachtgever een gebruiksrecht voor het overeengekomen doel. Het is opdrachtgever niet toegestaan materialen te verveelvoudigen, openbaar te maken of aan derden ter beschikking te stellen zonder voorafgaande schriftelijke toestemming.",
    },
    {
      title: "8. Vertrouwelijkheid",
      text: "Beide partijen zijn verplicht tot geheimhouding van alle vertrouwelijke informatie die zij in het kader van de overeenkomst van elkaar ontvangen. Deze verplichting geldt ook na beeindiging van de overeenkomst.",
    },
    {
      title: "9. Aansprakelijkheid",
      text: "De aansprakelijkheid van starre.ai is beperkt tot het bedrag dat in het desbetreffende geval onder de beroepsaansprakelijkheidsverzekering wordt uitbetaald, vermeerderd met het eigen risico. Indien geen uitkering plaatsvindt, is de aansprakelijkheid beperkt tot het factuurbedrag van de betreffende opdracht, met een maximum van het bedrag dat in de drie maanden voorafgaand aan de schadeveroorzakende gebeurtenis door opdrachtgever is betaald. starre.ai is niet aansprakelijk voor indirecte schade, waaronder gevolgschade, gederfde winst of gemiste besparingen.",
    },
    {
      title: "10. Overmacht",
      text: "In geval van overmacht is starre.ai niet gehouden tot het nakomen van enige verplichting. Onder overmacht wordt verstaan elke omstandigheid buiten de macht van starre.ai die nakoming van de overeenkomst geheel of gedeeltelijk verhindert, waaronder storingen in systemen van derden, internetverbindingen, stroomuitval en wijzigingen in API-voorwaarden van derde partijen.",
    },
    {
      title: "11. Opzegging en ontbinding",
      text: "Beide partijen kunnen de overeenkomst schriftelijk opzeggen met inachtneming van een opzegtermijn van 14 dagen. Bij tussentijdse opzegging is opdrachtgever gehouden tot betaling van de tot dat moment verrichte werkzaamheden. starre.ai is gerechtigd de overeenkomst met onmiddellijke ingang te ontbinden indien opdrachtgever niet aan betalingsverplichtingen voldoet of indien omstandigheden dit rechtvaardigen.",
    },
    {
      title: "12. Toepasselijk recht en geschillen",
      text: "Op alle overeenkomsten tussen starre.ai en opdrachtgever is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement waar starre.ai is gevestigd.",
    },
    {
      title: "13. Wijzigingen",
      text: "starre.ai behoudt zich het recht voor deze algemene voorwaarden te wijzigen. De meest recente versie is altijd beschikbaar op deze pagina. Bij wezenlijke wijzigingen wordt opdrachtgever hiervan op de hoogte gesteld.",
    },
  ];

  return (
    <PageSection bg={C.bg} pad="8.5rem clamp(1.5rem, 5vw, 5rem) 5rem">
      <SectionHeading
        tag="Voorwaarden"
        title="Algemene Voorwaarden"
        text="Van toepassing op alle diensten van starre.ai."
      />
      <div style={{ marginTop: 32, maxWidth: 720 }}>
        {sections.map((section, index) => (
          <Reveal key={section.title} delay={0.06 + index * 0.02}>
            <div style={{ marginBottom: 28 }}>
              <h3
                style={{
                  fontFamily: BODY,
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: C.text,
                  marginBottom: 8,
                }}
              >
                {section.title}
              </h3>
              <p
                style={{
                  fontFamily: BODY,
                  fontSize: "0.84rem",
                  lineHeight: 1.75,
                  color: C.textSoft,
                }}
              >
                {section.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </PageSection>
  );
}
