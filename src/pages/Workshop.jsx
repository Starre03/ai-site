import IntakeForm from "../components/IntakeForm";
import { BODY, C } from "../lib/theme";
import { BulletList, GlowCard, PageHero, PageSection, PrimaryButton, Reveal, SectionHeading, usePageSeo } from "../components/ui";

export default function WorkshopPage() {
  usePageSeo({
    title: "StarLeo | AI workshop voor teams en management",
    description:
      "AI workshop voor bedrijven die willen begrijpen hoe AI werkt, hoe je beter prompt en hoe AI direct bruikbaar is in support, documenten, kenniswerk en dagelijkse taken.",
  });

  return (
    <>
      <PageHero
        badge="Kennissessie · AI workshop"
        title={
          <>
            AI workshop voor teams die willen leren
            <span style={{ color: C.primary }}> hoe AI werkt en hoe je er goed mee werkt.</span>
          </>
        }
        text="De AI workshop van StarLeo is bedoeld voor teams of management die AI beter willen begrijpen in de praktijk. Denk aan hoe modellen werken, hoe je beter prompt, waar AI sterk of juist zwak in is en hoe je het slim toepast in support, documenten, kenniswerk en dagelijkse workflows."
        actions={[
          <PrimaryButton key="intake" href="#intake" onClick={(event) => {
            event.preventDefault();
            document.getElementById("intake")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}>
            Plan AI workshop →
          </PrimaryButton>,
          <PrimaryButton key="audit" secondary to="/ai-audit">
            Bekijk AI audit
          </PrimaryButton>,
        ]}
        aside={
          <GlowCard style={{ background: C.bg2, maxWidth: 360 }}>
            <div style={{ padding: "1.35rem" }}>
              <div style={{ color: C.primary, fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: BODY }}>
                Focus van de sessie
              </div>
              <p style={{ color: C.text, fontFamily: BODY, fontWeight: 600, marginTop: 12 }}>
                Minder theorie om de theorie, meer uitleg, prompting, voorbeelden en praktische AI-geletterdheid voor het echte werk.
              </p>
              <p style={{ color: C.textSoft, fontFamily: BODY, lineHeight: 1.75, fontSize: "0.82rem", marginTop: 10 }}>
                Sterk voor teams die eerst beter willen leren werken met AI voordat ze tools kiezen of processen gaan implementeren.
              </p>
            </div>
          </GlowCard>
        }
      />

      <PageSection bg={C.bg2}>
        <SectionHeading
          tag="Wat je krijgt"
          title={<>Een AI workshop die uitlegt hoe AI werkt en hoe teams er slimmer mee leren werken</>}
          text="Deze sessie is geen verkapte implementatiepitch. Het doel is dat mensen begrijpen wat AI doet, hoe prompting werkt, hoe je betere output krijgt en waar AI in hun dagelijkse werk direct bruikbaar is."
        />
        <div className="card-grid-two" style={{ marginTop: 28 }}>
          {[
            {
              title: "Hoe AI werkt in de praktijk",
              body: "We leggen helder uit wat modellen als Claude en ChatGPT doen, waar ze sterk in zijn, waar ze fouten maken en waarom de kwaliteit van je input zo veel verschil maakt.",
            },
            {
              title: "Prompting en betere output",
              body: "Teams leren hoe je slimmer prompt, hoe je context meegeeft, hoe je output aanscherpt en hoe je voorkomt dat AI te vaag, te generiek of onbruikbaar antwoordt.",
            },
            {
              title: "Tips en tricks voor dagelijks gebruik",
              body: "Van samenvatten en herschrijven tot analyseren, structureren en voorbereiden: we laten zien hoe AI praktisch helpt in support, documenten, kenniswerk en terugkerende taken.",
            },
            {
              title: "Toepassingen voor je eigen team",
              body: "We vertalen AI naar je eigen praktijk: welke toepassingen zijn nu relevant, wat is vooral hype en waar kan een team morgen al slimmer mee werken.",
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
              tag="Wanneer dit past"
              title={<>Kies een workshop als teams eerst beter moeten leren werken met AI voordat je gaat bouwen</>}
              text="Voor veel organisaties is dit de juiste eerste stap wanneer er veel interesse is in AI, maar mensen nog te weinig begrijpen hoe ze er goed mee werken, wat realistisch is en hoe je AI vertaalt naar hun eigen rol."
            />
          </div>
          <Reveal delay={0.18}>
            <GlowCard style={{ background: C.bg2 }}>
              <div style={{ padding: "1.35rem" }}>
                <BulletList
                  items={[
                    "Je wilt teams leren hoe ze beter met AI werken in hun dagelijkse taken",
                    "Er is veel nieuwsgierigheid, maar nog weinig praktische kennis over prompting en modelgedrag",
                    "Je wilt AI begrijpelijk en bruikbaar maken zonder meteen een implementatietraject te starten",
                    "Je zoekt een zakelijke sessie met uitleg, voorbeelden en direct toepasbare tips",
                  ]}
                />
              </div>
            </GlowCard>
          </Reveal>
        </div>
      </PageSection>

      <IntakeForm />
    </>
  );
}
