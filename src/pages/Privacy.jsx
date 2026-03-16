import { BODY, C } from "../lib/theme";
import { PageSection, Reveal, SectionHeading, usePageSeo } from "../components/ui";

export default function PrivacyPage() {
  usePageSeo({
    title: "starre.ai | Privacyverklaring",
    description: "Privacyverklaring van starre.ai. Hoe wij omgaan met persoonsgegevens die via het intakeformulier en de website worden verzameld.",
  });

  const sections = [
    {
      title: "1. Wie is verantwoordelijk?",
      text: "starre.ai is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in deze privacyverklaring. Voor vragen over deze verklaring kun je contact opnemen via info@starre.ai.",
    },
    {
      title: "2. Welke gegevens verzamelen wij?",
      text: "Via het intakeformulier verzamelen wij: naam, bedrijfsnaam, e-mailadres, telefoonnummer (optioneel), bedrijfsgrootte, AI use-cases, huidige tools en eventuele extra context die je zelf invult. Daarnaast verwerken wij standaard webstatistieken zoals paginabezoeken.",
    },
    {
      title: "3. Waarvoor gebruiken wij deze gegevens?",
      text: "Wij gebruiken je gegevens uitsluitend om contact met je op te nemen naar aanleiding van je intake, om het gesprek inhoudelijk voor te bereiden, en om onze dienstverlening te verbeteren. Wij delen je gegevens niet met derden voor marketingdoeleinden.",
    },
    {
      title: "4. Hoe lang bewaren wij gegevens?",
      text: "Intakegegevens bewaren wij maximaal 12 maanden na het laatste contact, tenzij er een actieve samenwerking uit voortvloeit. Webstatistieken worden geanonimiseerd bewaard.",
    },
    {
      title: "5. Beveiliging",
      text: "Wij nemen passende technische en organisatorische maatregelen om je persoonsgegevens te beschermen tegen ongeoorloofde toegang, verlies of misbruik.",
    },
    {
      title: "6. Jouw rechten",
      text: "Je hebt het recht om je gegevens in te zien, te corrigeren of te laten verwijderen. Ook kun je bezwaar maken tegen de verwerking of verzoeken om gegevensoverdracht. Neem hiervoor contact op via info@starre.ai.",
    },
    {
      title: "7. Cookies",
      text: "Deze website gebruikt geen tracking cookies. Wij maken geen gebruik van advertentiecookies of third-party analytics die persoonsgegevens verwerken.",
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
        text="Hoe starre.ai omgaat met je gegevens."
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
