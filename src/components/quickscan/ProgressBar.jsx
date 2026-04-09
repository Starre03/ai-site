import { BODY, C } from "../../lib/theme";

export default function ProgressBar({ currentIndex, totalSteps, label = "Quickscan" }) {
  const activeStep = Math.max(0, Math.min(currentIndex, totalSteps));

  return (
    <div style={{ display: "grid", gap: "clamp(8px, 1.2vh, 10px)" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: C.textSoft,
          fontSize: "clamp(0.78rem, min(1.2vw, 1.7vh), 0.82rem)",
          fontFamily: BODY,
        }}
      >
        <span>{label}</span>
        <span>
          Vraag {activeStep} / {totalSteps}
        </span>
      </div>
      <div
        style={{
          height: "clamp(6px, 0.9vh, 8px)",
          borderRadius: 999,
          background: "rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${(activeStep / totalSteps) * 100}%`,
            height: "100%",
            borderRadius: 999,
            background: "linear-gradient(90deg, #06B6D4, #38BDF8)",
            transition: "width 220ms ease",
          }}
        />
      </div>
    </div>
  );
}
