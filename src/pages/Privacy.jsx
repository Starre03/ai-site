import { BODY, C } from "../lib/theme";
import { siteConfig } from "../lib/site";
import { PageSection, Reveal, SectionHeading, usePageSeo } from "../components/ui";

export default function PrivacyPage() {
  usePageSeo({
    title: "StarLeo | Privacyverklaring",
    description: "Privacyverklaring van StarLeo. Hoe wij omgaan met persoonsgegevens die via het intakeformulier en de website worden verzameld.",
  });

  const sections = [
    {
      title: "1. Wie is verantwoordelijk?",
      text: `${siteConfig.legalName} is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in deze privacyverklaring. Voor vragen over deze verklaring kunt u contact opnemen via ${siteConfig.contactEmail}.`,
    },
    {
      title: "2. Welke gegevens verzamelen wij?",
      text: "Via het intakeformulier en de quickscan verzamelen wij: naam, bedrijfsnaam, e-mailadres, telefoonnummer (optioneel), bedrijfsgrootte, AI use-cases, huidige tools, quickscan-antwoorden en eventuele extra context die u zelf invult. Daarnaast kunnen wij privacyvriendelijke webstatistieken en funnel-events verwerken, zoals paginabezoeken en formulierstappen, zonder advertentiecookies.",
    },
    {
      title: "3. Waarvoor gebruiken wij deze gegevens?",
      text: "Wij gebruiken uw gegevens uitsluitend om contact met u op te nemen naar aanleiding van uw intake, om het gesprek inhoudelijk voor te bereiden, en om onze dienstverlening te verbeteren. Wij delen uw gegevens niet met derden voor marketingdoeleinden.",
    },
    {
      title: "4. Hoe lang bewaren wij gegevens?",
      text: "Intakegegevens bewaren wij maximaal 12 maanden na het laatste contact, tenzij er een actieve samenwerking uit voortvloeit. Webstatistieken worden geanonimiseerd bewaard.",
    },
    {
      title: "5. Beveiliging",
      text: "Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen tegen ongeoorloofde toegang, verlies of misbruik.",
    },
    {
      title: "6. Uw rechten",
      text: `U heeft het recht om uw gegevens in te zien, te corrigeren of te laten verwijderen. Ook kunt u bezwaar maken tegen de verwerking of verzoeken om gegevensoverdracht. Neem hiervoor contact op via ${siteConfig.contactEmail}.`,
    },
    {
      title: "7. Cookies",
      text: "Deze website gebruikt geen advertentiecookies. Eventuele analytics worden privacyvriendelijk ingericht en gebruikt om de website, quickscan en formulieren betrouwbaarder te maken.",
    },
    {
      title: "8. Wijzigingen",
      text: "Wij kunnen deze privacyverklaring aanpassen. De meest recente versie is altijd beschikbaar op deze pagina.",
    },
  ];

  return (
    <PageSection bg={C.bg} pad="8.5rem clamp(1.5rem, 5vw, 5rem) 5rem">
      <SectionHeading
        tag="Privacy"
        title="Privacyverklaring"
        text="Hoe StarLeo omgaat met uw gegevens."
      />
      <div style={{ marginTop: 32, maxWidth: 720 }}>
        {sections.map((section, index) => (
          <Reveal key={section.title} delay={0.06 + index * 0.03}>
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
