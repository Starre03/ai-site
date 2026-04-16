import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider.jsx";
import { GlowCard, PageSection, Reveal, Tag, usePageSeo } from "../components/ui";
import { BODY, C } from "../lib/theme";
import { DEFAULT_AUTH_REDIRECT, readAuthRedirectFromSearch } from "../lib/supabase/auth.js";

const inputStyle = {
  width: "100%",
  borderRadius: 14,
  border: `1px solid ${C.borderLight}`,
  background: "rgba(11,17,32,0.72)",
  color: C.text,
  padding: "14px 16px",
  fontSize: "0.96rem",
  lineHeight: 1.4,
  fontFamily: BODY,
};

const buttonStyle = {
  width: "100%",
  border: "none",
  borderRadius: 14,
  background: C.primary,
  color: "#fff",
  padding: "14px 18px",
  fontSize: "0.95rem",
  fontWeight: 700,
  fontFamily: BODY,
  cursor: "pointer",
  boxShadow: "0 18px 36px rgba(14,165,233,0.18)",
};

function mapLoginError(errorKey, authError) {
  if (authError) {
    return authError;
  }

  if (errorKey === "unavailable") {
    return "Authenticatie is nog niet beschikbaar. Controleer de Supabase env vars en redirect-instellingen.";
  }

  if (errorKey === "callback") {
    return "De loginlink kon niet worden afgerond. Vraag een nieuwe magic link aan.";
  }

  return "";
}

export default function LoginPage() {
  usePageSeo({
    title: "StarLeo | Inloggen",
    description: "Beveiligde login voor de interne StarLeo-omgeving.",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { authError, isAuthenticated, isConfigured, signInWithMagicLink, status } = useAuth();
  const nextPath = useMemo(() => readAuthRedirectFromSearch(location.search), [location.search]);
  const authQuery = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState("idle");
  const [feedback, setFeedback] = useState(mapLoginError(authQuery.get("error"), authError));

  useEffect(() => {
    if (isAuthenticated) {
      navigate(nextPath || DEFAULT_AUTH_REDIRECT, { replace: true });
    }
  }, [isAuthenticated, navigate, nextPath]);

  useEffect(() => {
    setFeedback(mapLoginError(authQuery.get("error"), authError));
  }, [authError, authQuery]);

  async function handleSubmit(event) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setFeedback("Vul een e-mailadres in.");
      return;
    }

    if (!isConfigured) {
      setFeedback("Supabase auth ontbreekt nog in deze omgeving.");
      return;
    }

    setPhase("submitting");
    setFeedback("");

    const { error } = await signInWithMagicLink(normalizedEmail, nextPath);

    if (error) {
      setFeedback(error.message);
      setPhase("idle");
      return;
    }

    setPhase("sent");
    setFeedback(`De magic link is verstuurd naar ${normalizedEmail}. Open de mail op dit apparaat om je sessie te starten.`);
  }

  return (
    <PageSection bg={C.bg} pad="8.5rem clamp(1.5rem, 5vw, 5rem) 5rem" minH="100vh" centerY>
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />
      <div className="two-col" style={{ alignItems: "stretch", gap: 24 }}>
        <Reveal>
          <div style={{ maxWidth: 560 }}>
            <Tag>Beveiligde toegang</Tag>
            <h1
              style={{
                margin: 0,
                color: C.text,
                fontFamily: BODY,
                fontSize: "clamp(2.3rem, 5vw, 4.6rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                fontWeight: 700,
              }}
            >
              Login voor de
              <span style={{ display: "block", color: C.primary, fontStyle: "italic" }}>interne omgeving.</span>
            </h1>
            <p
              style={{
                margin: "18px 0 0",
                color: C.textSoft,
                fontFamily: BODY,
                fontSize: "0.96rem",
                lineHeight: 1.85,
                maxWidth: 520,
              }}
            >
              Deze route gebruikt Supabase magic links. Alleen bestaande accounts krijgen toegang; nieuwe bezoekers
              worden niet automatisch aangemaakt.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <GlowCard style={{ background: "rgba(15,23,42,0.86)", boxShadow: "0 24px 80px rgba(2,8,23,0.34)" }}>
            <div style={{ padding: "1.8rem" }}>
              <div
                style={{
                  color: C.text,
                  fontFamily: BODY,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}
              >
                Verstuur magic link
              </div>
              <p
                style={{
                  margin: "10px 0 0",
                  color: C.textSoft,
                  fontFamily: BODY,
                  fontSize: "0.9rem",
                  lineHeight: 1.75,
                }}
              >
                Redirect na login: <span style={{ color: C.text }}>{nextPath || DEFAULT_AUTH_REDIRECT}</span>
              </p>
              <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14, marginTop: 22 }}>
                <label style={{ display: "grid", gap: 8 }}>
                  <span
                    style={{
                      color: C.text,
                      fontFamily: BODY,
                      fontSize: "0.84rem",
                      fontWeight: 600,
                    }}
                  >
                    E-mailadres
                  </span>
                  <input
                    autoComplete="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="jij@bedrijf.nl"
                    style={inputStyle}
                  />
                </label>
                <button type="submit" style={{ ...buttonStyle, opacity: phase === "submitting" ? 0.7 : 1 }} disabled={phase === "submitting" || status === "loading"}>
                  {phase === "submitting" ? "Link versturen..." : phase === "sent" ? "Nieuwe link versturen" : "Verstuur loginlink"}
                </button>
              </form>
              <p
                style={{
                  margin: "14px 0 0",
                  color: feedback ? (phase === "sent" ? C.primaryLight : C.accent) : C.textMuted,
                  fontFamily: BODY,
                  fontSize: "0.84rem",
                  lineHeight: 1.7,
                  minHeight: 48,
                }}
              >
                {feedback || "Gebruik een bestaand account in je Supabase project."}
              </p>
              <div style={{ marginTop: 8 }}>
                <Link
                  to="/"
                  style={{
                    color: C.textSoft,
                    textDecoration: "none",
                    fontFamily: BODY,
                    fontSize: "0.84rem",
                  }}
                >
                  Terug naar site
                </Link>
              </div>
            </div>
          </GlowCard>
        </Reveal>
      </div>
    </PageSection>
  );
}
