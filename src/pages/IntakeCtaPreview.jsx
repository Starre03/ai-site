import { BODY, C } from "../lib/theme";
import { GlowCard, PrimaryButton, Reveal, SmoothSection, Tag, usePageSeo } from "../components/ui";

export default function IntakeCtaPreviewPage() {
  usePageSeo({
    title: "StarLeo | Intake CTA preview",
    description: "Preview van een premium intake CTA-blok voor StarLeo.",
  });

  return (
    <section
      style={{
        background: C.lightBg,
        padding: "1.4rem clamp(1.5rem, 5vw, 5rem) 1.8rem",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto", width: "100%" }}>
        <Reveal delay={0.06}>
          <GlowCard
            style={{
              background:
                `radial-gradient(circle at 18% 22%, ${C.primary}18, transparent 30%), radial-gradient(circle at 82% 78%, ${C.primary}10, transparent 28%), linear-gradient(135deg, ${C.bg2} 0%, ${C.bg} 100%)`,
              boxShadow: `0 20px 56px rgba(2, 8, 23, 0.18)`,
            }}
          >
            <div
              style={{
                padding: "clamp(1.45rem, 2.4vw, 2rem)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Reveal delay={0.14}>
                <Tag>Plan een intake</Tag>
              </Reveal>

              <Reveal delay={0.2}>
                <h1
                  style={{
                    fontFamily: BODY,
                    fontSize: "clamp(1.45rem, 3vw, 2.5rem)",
                    lineHeight: 1.12,
                    fontWeight: 700,
                    margin: "0 auto",
                    letterSpacing: "-0.03em",
                    color: C.text,
                    maxWidth: 700,
                  }}
                >
                  Klaar om te zien waar <span style={{ color: C.primary }}>AI</span> voor uw bedrijf het meeste oplevert?
                </h1>
              </Reveal>

              <Reveal delay={0.34}>
                <div style={{ display: "flex", justifyContent: "center", marginTop: 18 }}>
                  <PrimaryButton href="#intake" onClick={(event) => event.preventDefault()}>
                    Plan AI intake →
                  </PrimaryButton>
                </div>
              </Reveal>
            </div>
          </GlowCard>
        </Reveal>
      </div>
    </section>
  );
}
