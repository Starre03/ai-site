import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import Nav from "./components/Nav";
import RequireAuth from "./components/RequireAuth.jsx";
import { C, shell } from "./lib/theme";
import AgentsPage from "./pages/Agents";
import AdminPage from "./pages/Admin";
import AboutPage from "./pages/About";
import AuditPage from "./pages/Audit";
import AuthCallbackPage from "./pages/AuthCallback";
import FaqPage from "./pages/FaqPage";
import Home from "./pages/Home";
import IntegrationsPage from "./pages/Integrations";
import NotFoundPage from "./pages/NotFound";
import PrivacyPage from "./pages/Privacy";
import QuickscanPage from "./pages/QuickscanPage";
import TermsPage from "./pages/Terms";
import LoginPage from "./pages/Login";

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    }
  }, [location.hash, location.pathname]);

  return null;
}

export default function App() {
  const [ready, setReady] = useState(() => {
    if (typeof window === "undefined") return false;
    // Dev escape: ?intro=1 forces the intro to play on localhost so we can
    // iterate on the animation; otherwise localhost skips it for fast reloads.
    const forceIntro = typeof window !== "undefined" && window.location.search.includes("intro");
    if (forceIntro) return false;
    return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  });

  return (
    <div style={shell.page}>
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: `radial-gradient(circle at 10% 15%, ${C.primary}08, transparent 28%), radial-gradient(circle at 90% 80%, ${C.primary}06, transparent 30%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <ScrollManager />
      {!ready ? <Intro onDone={() => setReady(true)} /> : null}
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-audit" element={<AuditPage />} />
          <Route path="/ai-integraties" element={<IntegrationsPage />} />
          <Route path="/ai-agents" element={<AgentsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route
            path="/admin"
            element={(
              <RequireAuth>
                <AdminPage />
              </RequireAuth>
            )}
          />
          <Route path="/over" element={<AboutPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/quickscan" element={<QuickscanPage />} />
          <Route path="/voorwaarden" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
