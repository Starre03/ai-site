import { useCallback, useEffect, useRef, useState } from "react";
import { C, DISPLAY } from "../lib/theme";

export default function Intro({ onDone }) {
  const [phase, setPhase] = useState(0);
  const [target, setTarget] = useState(null);
  const logoRef = useRef(null);
  const done = useRef(false);

  const finish = useCallback(() => {
    if (!done.current) {
      done.current = true;
      onDone();
    }
  }, [onDone]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 500),
      setTimeout(() => setPhase(3), 1100),
      setTimeout(() => {
        const navLogo = document.getElementById("nav-logo");
        const introLogo = logoRef.current;

        if (navLogo && introLogo) {
          const navRect = navLogo.getBoundingClientRect();
          const introRect = introLogo.getBoundingClientRect();
          setTarget({
            x: navRect.left + navRect.width / 2 - (introRect.left + introRect.width / 2),
            y: navRect.top + navRect.height / 2 - (introRect.top + introRect.height / 2),
          });
        }

        setPhase(4);
      }, 1700),
      setTimeout(() => setPhase(5), 2100),
      setTimeout(() => finish(), 2600),
    ];

    return () => timers.forEach(clearTimeout);
  }, [finish]);

  const introSize = typeof window !== "undefined" ? Math.min(window.innerWidth * 0.07, 88) : 88;
  const navSize = 18.4;
  const scaleRatio = navSize / introSize;

  return (
    <div
      onClick={finish}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        cursor: "pointer",
        background: phase >= 4 ? "transparent" : C.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: phase >= 5 ? 0 : 1,
        pointerEvents: phase >= 5 ? "none" : "all",
        transition: `opacity ${phase >= 5 ? 0.6 : 0.3}s ease, background 1s ease`,
      }}
    >
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            borderRadius: "50%",
            border: `1px solid ${C.primary}`,
            width: phase >= 4 ? 2000 + index * 400 : phase >= 2 ? 80 + index * 80 : 0,
            height: phase >= 4 ? 2000 + index * 400 : phase >= 2 ? 80 + index * 80 : 0,
            opacity: phase >= 2 && phase < 5 ? 0.04 + 0.02 * (3 - index) : 0,
            transition: `all ${phase >= 4 ? 1.2 : 0.7 + index * 0.1}s cubic-bezier(.22,1,.36,1) ${index * 0.04}s`,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          borderRadius: "50%",
          width: phase >= 4 ? "300vw" : phase >= 2 ? 200 : 10,
          height: phase >= 4 ? "300vh" : phase >= 2 ? 200 : 10,
          background: `radial-gradient(circle, ${C.primary}${phase >= 4 ? "04" : "10"} 0%, transparent 70%)`,
          filter: `blur(${phase >= 4 ? 100 : 50}px)`,
          transition: `all ${phase >= 4 ? 1 : 0.6}s cubic-bezier(.22,1,.36,1)`,
        }}
      />
      <div
        ref={logoRef}
        style={{
          fontFamily: DISPLAY,
          fontWeight: 400,
          letterSpacing: "-0.02em",
          position: "relative",
          zIndex: 2,
          fontSize: "clamp(3rem, 7vw, 5.5rem)",
          transform:
            phase >= 4 && target
              ? `translate(${target.x}px, ${target.y}px) scale(${scaleRatio})`
              : phase >= 1
                ? "none"
                : "translateY(20px)",
          transformOrigin: "center center",
          opacity: phase >= 5 ? 0 : phase >= 1 ? 1 : 0,
          transition: "all 0.7s cubic-bezier(.22,1,.36,1)",
        }}
      >
        {"starre".split("").map((char, index) => (
          <span
            key={index}
            style={{
              display: "inline-block",
              opacity: phase >= 1 ? 1 : 0,
              transform: phase >= 1 ? "none" : "translateY(14px)",
              transition: `all 0.45s cubic-bezier(.22,1,.36,1) ${0.15 + index * 0.04}s`,
            }}
          >
            {char}
          </span>
        ))}
        <span
          style={{
            color: C.primary,
            display: "inline-block",
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "scale(1)" : "scale(0)",
            transition: "all 0.35s cubic-bezier(.34,1.56,.64,1) 0.06s",
            textShadow: `0 0 20px ${C.primary}40`,
          }}
        >
          .ai
        </span>
      </div>
      <div
        style={{
          fontSize: "0.75rem",
          color: "#94A3B8",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          marginTop: 18,
          zIndex: 2,
          opacity: phase >= 3 && phase < 4 ? 1 : 0,
          transform: phase >= 4 ? "translateY(-30px)" : phase >= 3 ? "none" : "translateY(10px)",
          transition: "all 0.5s cubic-bezier(.22,1,.36,1)",
        }}
      >
        starre.ai · AI audit · integraties · agents
      </div>
    </div>
  );
}
