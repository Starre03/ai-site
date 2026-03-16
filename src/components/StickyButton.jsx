import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useScrollToggle } from "../lib/hooks";
import { BODY, C } from "../lib/theme";

function useIntakeVisible() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      const el = document.getElementById("intake");
      if (!el) {
        setVisible(false);
        return;
      }
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      setVisible(inView);
    };

    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  return visible;
}

export default function StickyButton() {
  const show = useScrollToggle(0.7);
  const intakeVisible = useIntakeVisible();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (location.pathname !== "/") {
      navigate("/#intake");
      setTimeout(() => {
        document.getElementById("intake")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      return;
    }

    document.getElementById("intake")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 18,
        right: 18,
        zIndex: 999,
        opacity: show && !intakeVisible ? 1 : 0,
        transform: show && !intakeVisible ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.5s cubic-bezier(.22,1,.36,1)",
        pointerEvents: show && !intakeVisible ? "all" : "none",
      }}
    >
      <button
        onClick={handleClick}
        style={{
          background: C.primary,
          color: "#fff",
          padding: "11px 20px",
          borderRadius: 9,
          fontWeight: 600,
          fontSize: "0.8rem",
          border: "none",
          cursor: "pointer",
          fontFamily: BODY,
          boxShadow: `0 6px 28px rgba(0,0,0,0.35), 0 0 20px ${C.primary}15`,
        }}
      >
        Plan intake
      </button>
    </div>
  );
}
