import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import Nav from "./components/Nav";
import { C, shell } from "./lib/theme";
import AgentsPage from "./pages/Agents";
import AboutPage from "./pages/About";
import AuditPage from "./pages/Audit";
import BrandPreviewPage from "./pages/BrandPreview";
import ExamplesSectionPreviewPage from "./pages/ExamplesSectionPreview";
import Home from "./pages/Home";
import HomeFlowPreviewPage from "./pages/HomeFlowPreview";
import HowWeWorkPreviewPage from "./pages/HowWeWorkPreview";
import IntegrationsPage from "./pages/Integrations";
import NotFoundPage from "./pages/NotFound";
import PrivacyPage from "./pages/Privacy";
import ServicesSectionPreviewPage from "./pages/ServicesSectionPreview";
import ProblemSectionPreviewPage from "./pages/ProblemSectionPreview";
import TermsPage from "./pages/Terms";
import WhyNowPreviewPage from "./pages/WhyNowPreview";
import WhyNowIconsPreviewPage from "./pages/WhyNowIconsPreview";
import IntakeCtaPreviewPage from "./pages/IntakeCtaPreview";
import WorkshopPage from "./pages/Workshop";

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
          <Route path="/home-flow-preview" element={<HomeFlowPreviewPage />} />
          <Route path="/how-we-work-preview" element={<HowWeWorkPreviewPage />} />
          <Route path="/ai-audit" element={<AuditPage />} />
          <Route path="/ai-integraties" element={<IntegrationsPage />} />
          <Route path="/ai-agents" element={<AgentsPage />} />
          <Route path="/ai-workshop" element={<WorkshopPage />} />
          <Route path="/over" element={<AboutPage />} />
          <Route path="/brand-preview" element={<BrandPreviewPage />} />
          <Route path="/examples-section-preview" element={<ExamplesSectionPreviewPage />} />
          <Route path="/services-section-preview" element={<ServicesSectionPreviewPage />} />
          <Route path="/problem-section-preview" element={<ProblemSectionPreviewPage />} />
          <Route path="/why-now-preview" element={<WhyNowPreviewPage />} />
          <Route path="/why-now-icons-preview" element={<WhyNowIconsPreviewPage />} />
          <Route path="/intake-cta-preview" element={<IntakeCtaPreviewPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/voorwaarden" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
