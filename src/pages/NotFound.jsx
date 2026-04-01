import { Link } from "react-router-dom";
import { BODY, C } from "../lib/theme";
import { PageSection, PrimaryButton, Reveal, usePageSeo } from "../components/ui";

export default function NotFoundPage() {
  usePageSeo({
    title: "StarLeo | Pagina niet gevonden",
    description: "Deze pagina bestaat niet. Ga terug naar de homepage van StarLeo.",
  });

  return (
    <PageSection bg={C.bg} pad="10rem clamp(1.5rem, 5vw, 5rem) 5rem">
      <Reveal>
        <div style={{ textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
          <div
            style={{
              fontFamily: BODY,
              fontSize: "clamp(4rem, 10vw, 7rem)",
              fontWeight: 700,
              color: C.primary,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              opacity: 0.3,
            }}
          >
            404
          </div>
          <h1
            style={{
              fontFamily: BODY,
              fontSize: "1.4rem",
              fontWeight: 700,
              color: C.text,
              marginTop: 16,
            }}
          >
            Pagina niet gevonden
          </h1>
          <p
            style={{
              fontFamily: BODY,
              fontSize: "0.88rem",
              color: C.textSoft,
              lineHeight: 1.7,
              marginTop: 12,
            }}
          >
            Deze pagina bestaat niet of is verplaatst.
          </p>
          <div style={{ marginTop: 28 }}>
            <PrimaryButton to="/">Terug naar home</PrimaryButton>
          </div>
        </div>
      </Reveal>
    </PageSection>
  );
}
