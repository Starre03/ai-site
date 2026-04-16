import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider.jsx";
import { GlowCard, PageSection, Reveal, SectionHeading, usePageSeo } from "../components/ui";
import { BODY, C } from "../lib/theme";

const actionButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 12,
  border: "none",
  padding: "12px 16px",
  fontFamily: BODY,
  fontSize: "0.88rem",
  fontWeight: 700,
  cursor: "pointer",
};

function formatDate(value) {
  if (!value) return "Onbekend";

  return new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function AdminPage() {
  usePageSeo({
    title: "StarLeo | Dashboard",
    description: "Afgeschermde interne omgeving voor StarLeo.",
  });

  const navigate = useNavigate();
  const { session, signOut, user } = useAuth();
  const [signOutError, setSignOutError] = useState("");
  const [signOutPending, setSignOutPending] = useState(false);

  async function handleSignOut() {
    setSignOutPending(true);
    setSignOutError("");

    const { error } = await signOut();

    if (error) {
      setSignOutError(error.message);
      setSignOutPending(false);
      return;
    }

    navigate("/login", { replace: true });
  }

  return (
    <PageSection bg={C.bg} pad="8.5rem clamp(1.5rem, 5vw, 5rem) 5rem" minH="100vh">
      <SectionHeading
        tag="Dashboard"
        title="Beveiligde omgeving staat klaar."
        text="Deze route is nu beschermd via Supabase auth. Koppel hier interne tooling, submissions-overzichten of beheerfuncties aan."
        width={780}
      />
      <div className="card-grid-two" style={{ marginTop: 32 }}>
        <Reveal delay={0.06} fill>
          <GlowCard style={{ background: C.bg2, height: "100%" }}>
            <div style={{ padding: "1.6rem", height: "100%" }}>
              <div
                style={{
                  color: C.primary,
                  fontFamily: BODY,
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                Huidige sessie
              </div>
              <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
                <div>
                  <div style={{ color: C.textMuted, fontFamily: BODY, fontSize: "0.78rem" }}>Gebruiker</div>
                  <div style={{ color: C.text, fontFamily: BODY, fontSize: "1rem", fontWeight: 600, marginTop: 4 }}>
                    {user?.email || "Onbekend account"}
                  </div>
                </div>
                <div>
                  <div style={{ color: C.textMuted, fontFamily: BODY, fontSize: "0.78rem" }}>User ID</div>
                  <div style={{ color: C.textSoft, fontFamily: BODY, fontSize: "0.86rem", marginTop: 4, wordBreak: "break-all" }}>
                    {user?.id || "Niet beschikbaar"}
                  </div>
                </div>
                <div>
                  <div style={{ color: C.textMuted, fontFamily: BODY, fontSize: "0.78rem" }}>Laatste login</div>
                  <div style={{ color: C.textSoft, fontFamily: BODY, fontSize: "0.86rem", marginTop: 4 }}>
                    {formatDate(user?.last_sign_in_at)}
                  </div>
                </div>
                <div>
                  <div style={{ color: C.textMuted, fontFamily: BODY, fontSize: "0.78rem" }}>Sessie verloopt</div>
                  <div style={{ color: C.textSoft, fontFamily: BODY, fontSize: "0.86rem", marginTop: 4 }}>
                    {formatDate(session?.expires_at ? session.expires_at * 1000 : null)}
                  </div>
                </div>
              </div>
            </div>
          </GlowCard>
        </Reveal>
        <Reveal delay={0.12} fill>
          <GlowCard style={{ background: "linear-gradient(180deg, rgba(14,165,233,0.14), rgba(14,165,233,0.04))", height: "100%" }}>
            <div style={{ padding: "1.6rem", height: "100%" }}>
              <div
                style={{
                  color: C.text,
                  fontFamily: BODY,
                  fontSize: "1rem",
                  fontWeight: 700,
                  lineHeight: 1.35,
                }}
              >
                Volgende stap
              </div>
              <p
                style={{
                  margin: "12px 0 0",
                  color: C.textSoft,
                  fontFamily: BODY,
                  fontSize: "0.9rem",
                  lineHeight: 1.78,
                }}
              >
                Gebruik deze route als basis voor een intern dashboard. De auth-flow is aanwezig; wat nog ontbreekt is
                de inhoud achter deze sessie.
              </p>
              <div style={{ display: "grid", gap: 10, marginTop: 20 }}>
                {[
                  "Submissions uit Supabase uitlezen achter RLS policies.",
                  "Admin-rollen koppelen aan specifieke accounts.",
                  "Beveiligde acties via Edge Functions of server-side endpoints laten lopen.",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                      color: C.textSoft,
                      fontFamily: BODY,
                      fontSize: "0.86rem",
                      lineHeight: 1.7,
                    }}
                  >
                    <span style={{ color: C.primary }}>•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={signOutPending}
                  style={{
                    ...actionButtonStyle,
                    background: C.primary,
                    color: "#fff",
                    opacity: signOutPending ? 0.72 : 1,
                  }}
                >
                  {signOutPending ? "Uitloggen..." : "Uitloggen"}
                </button>
              </div>
              {signOutError ? (
                <p
                  style={{
                    margin: "12px 0 0",
                    color: C.accent,
                    fontFamily: BODY,
                    fontSize: "0.82rem",
                    lineHeight: 1.6,
                  }}
                >
                  {signOutError}
                </p>
              ) : null}
            </div>
          </GlowCard>
        </Reveal>
      </div>
    </PageSection>
  );
}
