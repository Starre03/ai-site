import { BODY, C } from "../lib/theme";
import { PrimaryButton, Reveal, SmoothSection, Tag, usePageSeo } from "../components/ui";

export default function QuickscanPage() {
  usePageSeo({
    title: "StarLeo | AI Quickscan",
    description: "Gratis AI quickscan voor bedrijven die snel willen zien waar AI tijd en geld kan besparen.",
  });

  return (
    <SmoothSection bg={C.bg} zIndex={1} minH="100vh" center>
      <div className="ambient ambient-left" />
      <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
        <Reveal delay={0.06}>
          <Tag>AI Quickscan</Tag>
        </Reveal>
        <Reveal delay={0.12}>
          <h1
            style={{
              fontFamily: BODY,
              fontSize: "clamp(2.4rem, 6vw, 4.8rem)",
              lineHeight: 1.04,
              fontWeight: 700,
              margin: 0,
              letterSpacing: "-0.03em",
              color: C.text,
            }}
          >
            De gratis quickscan
            <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>
              komt hier als volgende stap.
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p
            style={{
              color: C.textSoft,
              fontFamily: BODY,
              fontSize: "1rem",
              lineHeight: 1.82,
              maxWidth: 700,
              margin: "22px auto 0",
            }}
          >
            Hier komt straks een korte AI quickscan waarmee ondernemers direct een score, eerste conclusie en inzicht
            krijgen in waar AI tijd en geld kan besparen in hun bedrijf.
          </p>
        </Reveal>
        <Reveal delay={0.26}>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
            <PrimaryButton to="/">Terug naar home</PrimaryButton>
          </div>
        </Reveal>
      </div>
    </SmoothSection>
  );
}
