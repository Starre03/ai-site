import { Link } from "react-router-dom";
import InteractiveDemo from "../components/InteractiveDemo";
import Faq from "../components/Faq";
import IntakeForm from "../components/IntakeForm";
import { homeFaq, serviceCards } from "../content/siteContent";
import { BODY, C, shell } from "../lib/theme";
import {
  BulletList,
  GlowCard,
  MiniNote,
  PrimaryButton,
  Reveal,
  SectionHeading,
  SmoothSection,
  TyperText,
  usePageSeo,
} from "../components/ui";
import METRSection from "../components/METRSection";

function Hero() {
  return (
    <SmoothSection bg={C.bg} zIndex={1} minH="120vh">
      <div className="ambient ambient-left" />
      <div style={{ maxWidth: 900 }}>
        <Reveal>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: C.primaryDim,
              border: `1px solid ${C.primary}15`,
              borderRadius: 100,
              padding: "6px 16px",
              fontSize: "0.72rem",
              color: C.primaryLight,
              fontWeight: 500,
              fontFamily: BODY,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: C.primary,
                boxShadow: `0 0 8px ${C.primary}`,
              }}
            />
            AI consultancy & implementatie
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1
            style={{
              fontFamily: BODY,
              fontSize: "clamp(2.5rem, 6vw, 4.9rem)",
              lineHeight: 1.05,
              fontWeight: 700,
              margin: "22px 0 0",
              letterSpacing: "-0.03em",
              color: C.text,
              maxWidth: 860,
            }}
          >
            AI audit, AI integraties en OpenClaw AI agents
            <span style={{ display: "block", color: C.primary }}>
              <TyperText
                items={[
                  "ontdek welke taken AI morgen al kan overnemen",
                  "ontdek waar AI uw team uren per week bespaart",
                  "voor een AI agent die uw inbox beheert en prioriteert",
                  "voor een AI agent die contracten analyseert op risico's",
                  "laat AI uw kwartaalcijfers analyseren en samenvatten",
                  "van maandelijkse rapportages naar realtime dashboards met AI",
                  "voor een AI agent die uw volledige leadopvolging automatiseert",
                ]}
              />
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p style={{ ...shell.sectionText, maxWidth: 610, marginTop: 20, fontSize: "1rem" }}>
            Wij brengen in kaart waar AI rendeert, bouwen de implementatie en zorgen dat het draait. Zodat uw team tijd overhoudt voor het werk dat er echt toe doet.
          </p>
        </Reveal>
        <Reveal delay={0.22}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
            <PrimaryButton href="#intake" onClick={(event) => {
              event.preventDefault();
              document.getElementById("intake")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}>
              Plan AI intake →
            </PrimaryButton>
            <PrimaryButton secondary to="/ai-integraties">
              Bekijk AI integraties
            </PrimaryButton>
          </div>
          <MiniNote>AI implementatie voor bedrijven die geen losse tools zoeken, maar resultaat.</MiniNote>
        </Reveal>
      </div>
    </SmoothSection>
  );
}

function ProblemSection() {
  const items = [
    {
      title: "Er is wel interesse, maar geen route",
      desc: "Bedrijven hebben tools gezien en demo's gehad, maar missen overzicht: waar levert AI nu echt iets op en wat is ruis?",
    },
    {
      title: "Teams zitten vast in losse experimenten",
      desc: "Een paar prompts, een paar proefaccounts en verder weinig structurele impact. Daardoor blijft AI iets naast het werk in plaats van ín het werk.",
    },
    {
      title: "Bottlenecks blijven handmatig",
      desc: "Support, intake, documentwerk en interne kennisvragen kosten nog steeds te veel tijd omdat processen niet slim zijn ingericht.",
    },
    {
      title: "Niemand wil eerst een groot AI-programma",
      desc: "De beste start is meestal kleiner en concreter: audit, één integratie of één agentflow die tastbaar waarde levert.",
    },
  ];

  return (
    <SmoothSection bg={C.lightBg} zIndex={2} minH="120vh">
      <SectionHeading
        tag="Waarom bedrijven vastlopen"
        light
        title={
          <>
            Bedrijven weten dat AI bestaat,
            <em style={{ color: C.primary, fontStyle: "italic" }}> maar weten niet wat ze nu moeten implementeren.</em>
          </>
        }
        text="AI voor bedrijven is inmiddels overal zichtbaar. Toch blijven veel teams steken tussen losse demo's, proefaccounts en inspiratie. Het echte probleem is niet gebrek aan tools, maar gebrek aan duidelijkheid over welke AI implementatie nu direct waarde oplevert."
      />
      <div className="card-grid-two" style={{ marginTop: 40 }}>
        {items.map((item, index) => (
          <Reveal key={item.title} delay={0.14 + index * 0.06} fill>
            <GlowCard light style={{ background: C.lightCard, height: "100%", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <div style={{ padding: "1.8rem", height: "100%" }}>
                <h3 style={{ fontFamily: BODY, fontSize: "0.95rem", fontWeight: 600, color: C.lightText }}>{item.title}</h3>
                <p style={{ color: C.lightTextSoft, fontSize: "0.88rem", lineHeight: 1.75, marginTop: 10, fontFamily: BODY }}>
                  {item.desc}
                </p>
              </div>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </SmoothSection>
  );
}

function ServicesOverview() {
  return (
    <SmoothSection id="diensten" bg={C.bg} zIndex={3} minH="120vh">
      <SectionHeading
        tag="Vier diensten"
        title={
          <>
            Vier diensten voor bedrijven die AI
            <em style={{ color: C.primary, fontStyle: "italic" }}> echt willen inzetten</em>
          </>
        }
        text="Elke dienst van starre.ai is los af te nemen. Sommige bedrijven starten met een AI audit, anderen kiezen direct voor AI implementatie, OpenClaw agents of eerst een AI workshop om intern scherpte te krijgen."
        width={760}
      />
      <div className="card-grid-four" style={{ marginTop: 40 }}>
        {serviceCards.map((card, index) => (
          <Reveal key={card.slug} delay={0.12 + index * 0.05} fill>
            <GlowCard style={{ background: C.bg, height: "100%" }}>
              <div style={{ padding: "1.8rem", display: "flex", flexDirection: "column", gap: 14, height: "100%" }}>
                <div>
                  <div style={{ color: C.primary, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: BODY }}>
                    {card.eyebrow}
                  </div>
                  <h3 style={{ fontFamily: BODY, fontSize: "1rem", fontWeight: 600, marginTop: 10, color: C.text }}>
                    {card.title}
                  </h3>
                  <p style={{ color: C.textSoft, fontSize: "0.88rem", lineHeight: 1.75, marginTop: 10, fontFamily: BODY }}>
                    {card.summary}
                  </p>
                </div>
                <BulletList items={card.points} />
                <div style={{ marginTop: "auto" }}>
                  <Link
                    to={card.slug}
                    style={{
                      color: C.primaryLight,
                      textDecoration: "none",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      fontFamily: BODY,
                    }}
                  >
                    Naar {card.title} →
                  </Link>
                </div>
              </div>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </SmoothSection>
  );
}

export default function Home() {
  usePageSeo({
    title: "starre.ai | AI audit, AI integraties en OpenClaw AI agents voor bedrijven",
    description:
      "starre.ai helpt bedrijven met AI audit, AI consultancy, AI implementatie, Claude integraties, ChatGPT integraties en OpenClaw AI agents voor support, documentprocessen en workflow automatisering.",
  });

  return (
    <>
      <Hero />
      <ProblemSection />
      <ServicesOverview />
      <SmoothSection id="oplossingen" bg={C.lightBg} zIndex={4} minH="120vh">
        <InteractiveDemo />
      </SmoothSection>
      <METRSection />
      <section style={{ padding: "6rem clamp(1.5rem, 5vw, 5rem)", background: C.lightBg }}>
        <div style={{ ...shell.content, maxWidth: 880 }}>
          <Faq
            light
            items={homeFaq}
            title={
              <>
                Veelgestelde vragen over
                <em style={{ color: C.primary, fontStyle: "italic" }}> AI audit, AI integraties en OpenClaw AI agents</em>
              </>
            }
            text="Heldere antwoorden voor bedrijven die zoeken op AI audit, AI implementatie, Claude integratie, ChatGPT integratie, OpenClaw setup of AI agents voor bedrijven."
          />
        </div>
      </section>
      <IntakeForm />
    </>
  );
}
