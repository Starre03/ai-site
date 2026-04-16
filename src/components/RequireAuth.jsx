import { Navigate, useLocation } from "react-router-dom";
import { BODY, C } from "../lib/theme";
import { DEFAULT_AUTH_REDIRECT, normalizeAuthRedirectPath } from "../lib/supabase/auth.js";
import { PageSection } from "./ui";
import { useAuth } from "./AuthProvider.jsx";

function AuthGateMessage({ title, text }) {
  return (
    <PageSection bg={C.bg} pad="8.5rem clamp(1.5rem, 5vw, 5rem) 5rem" minH="100vh" centerY>
      <div
        style={{
          maxWidth: 520,
          margin: "0 auto",
          padding: "1.8rem",
          borderRadius: 24,
          background: "rgba(15,23,42,0.76)",
          border: `1px solid ${C.border}`,
          boxShadow: "0 24px 80px rgba(2,8,23,0.28)",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: C.text,
            fontFamily: BODY,
            fontSize: "1.4rem",
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            margin: "12px 0 0",
            color: C.textSoft,
            fontFamily: BODY,
            fontSize: "0.94rem",
            lineHeight: 1.75,
          }}
        >
          {text}
        </p>
      </div>
    </PageSection>
  );
}

export default function RequireAuth({ children }) {
  const location = useLocation();
  const { isAuthenticated, isConfigured, status } = useAuth();

  if (!isConfigured || status === "unavailable") {
    return <Navigate to="/login?error=unavailable" replace />;
  }

  if (status === "loading") {
    return <AuthGateMessage title="Sessie controleren" text="Authenticatie wordt geladen voordat deze route wordt vrijgegeven." />;
  }

  if (!isAuthenticated) {
    const next = normalizeAuthRedirectPath(
      `${location.pathname}${location.search}${location.hash}` || DEFAULT_AUTH_REDIRECT,
    );

    return <Navigate to={`/login?next=${encodeURIComponent(next)}`} replace />;
  }

  return children;
}
