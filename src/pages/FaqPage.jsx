import Faq from "../components/Faq";
import { homeFaq } from "../content/siteContent";
import { C, shell } from "../lib/theme";
import { usePageSeo } from "../components/ui";

export default function FaqPage() {
  usePageSeo({
    title: "StarLeo | FAQ",
    description:
      "Veelgestelde vragen over AI audit, AI implementatie, OpenClaw agents en AI workshops voor bedrijven.",
  });

  return (
    <section style={{ padding: "7rem clamp(1.5rem, 5vw, 5rem)", background: C.lightBg }}>
      <div style={{ ...shell.content, maxWidth: 880 }}>
        <Faq
          light
          items={homeFaq}
          title={
            <>
              Veelgestelde vragen over
              <em style={{ color: C.primary, fontStyle: "italic" }}> AI audit, implementatie en OpenClaw agents</em>
            </>
          }
          text="Heldere antwoorden voor bedrijven die willen begrijpen welke stap het beste past en wat AI concreet kan opleveren."
        />
      </div>
    </section>
  );
}
