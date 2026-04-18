import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BODY, C } from "../lib/theme";

// "Stellar Birth" — a supernova collapses into existence, a 360° burst
// of stardust crystallises into the StarLeo wordmark, and a lone meteor
// sweeps across the sky to hand off into the hero. ~3.5s end-to-end.

const PARTICLE_COUNT = 72;

function buildParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    // Angular distribution with tiny jitter so the ring never feels mechanical.
    const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + ((i * 0.37) % 0.18);
    // Varied final distances give the burst depth — near, mid, far.
    const distance = 240 + ((i * 47) % 440);
    const size = [1.5, 2, 2, 2.5, 3, 3.5][i % 6];
    const duration = 0.85 + (((i * 13) % 55) / 100); // 0.85–1.40s
    const delay = ((i * 7) % 15) / 100; // 0–0.15s
    return {
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
      size,
      duration,
      delay,
      accent: i % 5 === 0,
    };
  });
}

export default function Intro({ onDone }) {
  const [phase, setPhase] = useState(0);
  const [target, setTarget] = useState(null);
  const logoRef = useRef(null);
  const done = useRef(false);
  const particles = useMemo(buildParticles, []);

  const finish = useCallback(() => {
    if (!done.current) {
      done.current = true;
      onDone();
    }
  }, [onDone]);

  useEffect(() => {
    // ?introslow=1 multiplies all phase durations for local debugging.
    const mult = typeof window !== "undefined" && window.location.search.includes("introslow")
      ? 4
      : 1;
    const timers = [
      setTimeout(() => setPhase(1), 100 * mult),   // core pulse
      setTimeout(() => setPhase(2), 680 * mult),   // supernova burst
      setTimeout(() => setPhase(3), 1420 * mult),  // logo letters materialise
      setTimeout(() => setPhase(4), 2150 * mult),  // tagline + meteor streak
      setTimeout(() => {
        // Capture nav position so the logo can fly home.
        const navLogo = document.getElementById("nav-logo");
        const introLogo = logoRef.current;
        if (navLogo && introLogo) {
          const navRect = navLogo.getBoundingClientRect();
          const introRect = introLogo.getBoundingClientRect();
          setTarget({
            x: navRect.left + navRect.width / 2 - (introRect.left + introRect.width / 2),
            y: navRect.top + navRect.height / 2 - (introRect.top + introRect.height / 2),
            scale: navRect.width / introRect.width,
          });
        }
        setPhase(5);
      }, 2800 * mult),
      setTimeout(() => setPhase(6), 3300 * mult),
      setTimeout(finish, 3750 * mult),
    ];
    return () => timers.forEach(clearTimeout);
  }, [finish]);

  // Phase-driven booleans — easier to reason about than magic numbers.
  const burst = phase >= 2;
  const formed = phase >= 3;
  const tagline = phase >= 4;
  const exiting = phase >= 5;
  const gone = phase >= 6;

  return (
    <div
      onClick={finish}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        cursor: "pointer",
        background: exiting ? "transparent" : C.bg,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        opacity: gone ? 0 : 1,
        pointerEvents: gone ? "none" : "all",
        transition: `opacity ${gone ? 0.45 : 0.3}s ease, background 0.9s ease`,
      }}
    >
      {/* Self-contained keyframes — intro has no external CSS dependency. */}
      <style>{`
        @keyframes intro-core-pulse {
          0%   { transform: translate(-50%,-50%) scale(0.8); opacity: 0.7; }
          55%  { transform: translate(-50%,-50%) scale(1.35); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(1.1); opacity: 1; }
        }
        @keyframes intro-meteor {
          0%   { transform: translate(0, 0) rotate(-32deg); opacity: 0; }
          12%  { opacity: 1; }
          100% { transform: translate(-120vw, 78vh) rotate(-32deg); opacity: 0; }
        }
      `}</style>

      {/* Deep-space nebula wash — appears subtly, blooms on burst, fades on exit. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            `radial-gradient(ellipse 62% 55% at 50% 50%, rgba(14,165,233,${burst ? 0.18 : 0.04}) 0%, transparent 70%),` +
            `radial-gradient(circle at 22% 20%, rgba(124,58,237,${burst ? 0.12 : 0.02}) 0%, transparent 48%),` +
            `radial-gradient(circle at 80% 80%, rgba(8,145,178,${burst ? 0.10 : 0.02}) 0%, transparent 48%)`,
          transition: "background 1s cubic-bezier(.22,1,.36,1)",
          opacity: exiting ? 0 : 1,
        }}
      />

      {/* Core singularity — the birth point. Pulses once, flashes, then settles. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: burst ? 22 : 8,
          height: burst ? 22 : 8,
          borderRadius: "50%",
          background: `radial-gradient(circle, #ffffff 0%, ${C.primaryLight} 35%, ${C.primary} 60%, transparent 82%)`,
          boxShadow: `0 0 ${burst ? 90 : 22}px ${burst ? 36 : 8}px ${C.primary}cc, 0 0 ${burst ? 220 : 46}px ${burst ? 64 : 14}px rgba(14,165,233,0.42)`,
          animation: phase === 1 ? "intro-core-pulse 0.58s ease-out 1 both" : undefined,
          transform: "translate(-50%, -50%)",
          opacity: gone ? 0 : exiting ? 0.25 : formed ? 0.55 : 1,
          transition: "all 0.6s cubic-bezier(.22,1,.36,1)",
        }}
      />

      {/* Shockwave rings — three concentric waves expand on burst. */}
      {[0, 1, 2].map((i) => (
        <div
          key={`ring-${i}`}
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 64,
            height: 64,
            borderRadius: "50%",
            border: `1px solid ${C.primary}`,
            transform: `translate(-50%,-50%) scale(${burst ? 20 + i * 7 : 0.15})`,
            opacity: burst && !exiting ? 0.34 - i * 0.09 : 0,
            transition: `transform ${1.05 + i * 0.18}s cubic-bezier(.18,.85,.32,1) ${i * 0.09}s, opacity ${0.9 + i * 0.12}s ease ${i * 0.09}s`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Supernova particle burst — 72 points fly 360° outward from the core. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          pointerEvents: "none",
        }}
      >
        {particles.map((p, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: p.accent ? C.primaryLight : "#ffffff",
              boxShadow: `0 0 6px 1px rgba(255,255,255,0.55), 0 0 14px 2px ${C.primary}44`,
              transform: burst
                ? `translate(${p.dx}px, ${p.dy}px) scale(1)`
                : "translate(0, 0) scale(0.15)",
              opacity: burst && !gone ? (exiting ? 0.25 : formed ? 0.45 : 0.92) : 0,
              transition: `transform ${p.duration}s cubic-bezier(.16,1,.3,1) ${p.delay}s, opacity ${exiting ? 0.9 : 0.5}s ease ${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Wordmark — letters crystallise from the debris, stagger in, subtly glow. */}
      <div
        ref={logoRef}
        style={{
          position: "relative",
          zIndex: 2,
          fontFamily: BODY,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          fontSize: "clamp(3rem, 7vw, 5rem)",
          transformOrigin: "center center",
          transform:
            exiting && target
              ? `translate(${target.x}px, ${target.y}px) scale(${target.scale})`
              : "none",
          opacity: gone ? 0 : 1,
          transition: "transform 0.8s cubic-bezier(.22,1,.36,1), opacity 0.5s ease",
        }}
      >
        {"StarLeo".split("").map((char, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              color: i >= 4 ? C.primary : C.text,
              opacity: formed ? 1 : 0,
              transform: formed ? "translateY(0) scale(1)" : "translateY(14px) scale(0.72)",
              filter: formed ? "blur(0)" : "blur(10px)",
              transition: `opacity 0.55s cubic-bezier(.22,1,.36,1) ${i * 0.055}s, transform 0.55s cubic-bezier(.22,1,.36,1) ${i * 0.055}s, filter 0.55s cubic-bezier(.22,1,.36,1) ${i * 0.055}s`,
              textShadow: formed
                ? `0 0 22px ${C.primary}55, 0 0 50px ${C.primary}22`
                : "none",
            }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* Tagline fades in underneath once the letters have landed. */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          marginTop: 22,
          fontSize: "0.95rem",
          color: "#94A3B8",
          letterSpacing: "0.02em",
          fontFamily: BODY,
          fontWeight: 500,
          opacity: tagline && !exiting ? 1 : 0,
          transform: tagline ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.5s cubic-bezier(.22,1,.36,1), transform 0.5s cubic-bezier(.22,1,.36,1)",
        }}
      >
        Benut de kracht van AI.
      </div>

      {/* Meteor streak — brand callback to the hero's shooting star, same diagonal. */}
      {tagline && !gone ? (
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "22%",
            left: "72%",
            width: 210,
            height: 2,
            background: `linear-gradient(270deg, #ffffff 0%, ${C.primaryLight} 28%, rgba(14,165,233,0.2) 62%, transparent 100%)`,
            borderRadius: 2,
            boxShadow: `0 0 12px 2px ${C.primary}aa, 0 0 28px 4px ${C.primary}55`,
            filter: "blur(0.5px)",
            transformOrigin: "0% 50%",
            animation: "intro-meteor 1.2s cubic-bezier(.55,.06,.68,.18) 1 both",
          }}
        />
      ) : null}
    </div>
  );
}
