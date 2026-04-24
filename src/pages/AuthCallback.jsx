import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlowCard, PageSection, Reveal, Tag, usePageSeo } from "../components/ui";
import { BODY, C } from "../lib/theme";
import { DEFAULT_AUTH_REDIRECT, normalizeAuthRedirectPath } from "../lib/supabase/auth.js";
import { hasSupabaseConfig, supabase } from "../lib/supabase/client.js";

function readCallbackParams() {
  const searchParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));

  return {
    code: searchParams.get("code"),
    error: searchParams.get("error_description") || searchParams.get("error") || hashParams.get("error_description") || hashParams.get("error") || "",
    next: normalizeAuthRedirectPath(searchParams.get("next") || hashParams.get("next") || DEFAULT_AUTH_REDIRECT),
  };
}

export default function AuthCallbackPage() {
  usePageSeo({
    title: "StarLeo | Auth callback",
    description: "Afronden van de loginflow voor de interne StarLeo-omgeving.",
    noindex: true,
  });

  const navigate = useNavigate();
  const retryPath = typeof window === "undefined" ? DEFAULT_AUTH_REDIRECT : readCallbackParams().next;
  const [state, setState] = useState({
    phase: "loading",
    message: "De loginflow wordt afgerond.",
  });

  useEffect(() => {
    let active = true;

    async function finishLogin() {
      if (!hasSupabaseConfig() || !supabase) {
        setState({
          phase: "error",
          message: "Supabase auth is niet geconfigureerd in deze omgeving.",
        });
        return;
      }

      const { code, error, next } = readCallbackParams();

      if (error) {
        setState({
          phase: "error",
          message: error,
        });
        return;
      }

      if (!code) {
        const { data } = await supabase.auth.getSession();

        if (!active) return;

        if (data.session?.user) {
          navigate(next, { replace: true });
          return;
        }

        setState({
          phase: "error",
          message: "De loginlink bevat geen geldige code. Vraag een nieuwe magic link aan.",
        });
        return;
      }

      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

      if (!active) return;

      if (exchangeError) {
        setState({
          phase: "error",
          message: exchangeError.message,
        });
        return;
      }

      navigate(next, { replace: true });
    }

    finishLogin();

    return () => {
      active = false;
    };
  }, [navigate]);

  return (
    <PageSection bg={C.bg} pad="8.5rem clamp(1.5rem, 5vw, 5rem) 5rem" minH="100vh" centerY>
      <Reveal>
        <div style={{ maxWidth: 560, margin: "0 auto", width: "100%" }}>
          <Tag>Authenticatie</Tag>
          <GlowCard style={{ background: "rgba(15,23,42,0.86)", boxShadow: "0 24px 80px rgba(2,8,23,0.34)" }}>
            <div style={{ padding: "1.8rem" }}>
              <h1
                style={{
                  margin: 0,
                  color: C.text,
                  fontFamily: BODY,
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                {state.phase === "loading" ? "Sessie afronden" : "Login mislukt"}
              </h1>
              <p
                style={{
                  margin: "14px 0 0",
                  color: state.phase === "loading" ? C.textSoft : C.accent,
                  fontFamily: BODY,
                  fontSize: "0.94rem",
                  lineHeight: 1.75,
                }}
              >
                {state.message}
              </p>
              {state.phase === "error" ? (
                <div style={{ marginTop: 18 }}>
                  <Link
                    to={`/login?error=callback&next=${encodeURIComponent(retryPath)}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "12px 16px",
                      borderRadius: 12,
                      background: C.primary,
                      color: "#fff",
                      textDecoration: "none",
                      fontFamily: BODY,
                      fontSize: "0.88rem",
                      fontWeight: 700,
                    }}
                  >
                    Nieuwe link aanvragen
                  </Link>
                </div>
              ) : null}
            </div>
          </GlowCard>
        </div>
      </Reveal>
    </PageSection>
  );
}
