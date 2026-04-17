import { useNavigate } from "react-router-dom";
import { useScrollToggle } from "../lib/hooks";
import { BODY, C } from "../lib/theme";

export default function StickyButton() {
  const show = useScrollToggle(0.7);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/quickscan");
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 18,
        right: 18,
        zIndex: 999,
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.5s cubic-bezier(.22,1,.36,1)",
        pointerEvents: show ? "all" : "none",
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
        Start quickscan
      </button>
    </div>
  );
}
