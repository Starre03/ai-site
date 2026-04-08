import { BODY, C } from "../../lib/theme";

export default function ProgressBar({ currentIndex, totalSteps, label = "Quickscan" }) {
  const activeStep = Math.max(0, Math.min(currentIndex, totalSteps));

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: C.textSoft,
          fontSize: "0.82rem",
          fontFamily: BODY,
        }}
      >
        <span>{label}</span>
        <span>
          Stap {activeStep} / {totalSteps}
        </span>
      </div>
      <div
        style={{
          height: 8,
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
