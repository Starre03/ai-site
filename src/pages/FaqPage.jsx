import { useEffect } from "react";
import Faq from "../components/Faq";
import { homeFaq } from "../content/siteContent";
import { C, shell } from "../lib/theme";
import { usePageSeo } from "../components/ui";

export default function FaqPage() {
  usePageSeo({
    title: "FAQ over AI audit, implementatie & agents | StarLeo",
    description:
      "Veelgestelde vragen over AI audit, AI implementatie en OpenClaw agents voor bedrijven.",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-schema";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: homeFaq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
    document.head.appendChild(script);

    return () => document.getElementById("faq-schema")?.remove();
  }, []);

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
