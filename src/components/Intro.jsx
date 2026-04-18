import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BODY, C } from "../lib/theme";

// "Stellar Birth" — a pin-sharp supernova collapses into existence, a 360°
// firework burst of streaks + diffraction-spiked stars crystallises into
// the StarLeo wordmark, and an anamorphic lens flare sweeps the horizon.
// Zero `filter: blur` on primary elements — everything is rendered with
// crisp 1px strokes and layered tight shadows so it reads as high-def /
// cinematic rather than fuzzy.  ~3.5s end-to-end.

const PARTICLE_COUNT = 96;
const RAY_COUNT = 28;
const BG_STAR_COUNT = 80;

function buildParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    // Even angular distribution with tiny deterministic jitter.
    const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + ((i * 0.37) % 0.22);
    // Three depth layers — near, mid, far — so the burst has perspective.
    const layer = i % 3;
    const base = layer === 0 ? 260 : layer === 1 ? 440 : 620;
    const distance = base + ((i * 47) % 120);
    // A few bright "hero" stars get diffraction spikes.  Keep this small
    // — too many cross-rays turns into visual noise.
    const bright = i % 7 === 0;
    const size = bright ? 3.5 : [1.5, 1.5, 2, 2, 2.5][i % 5];
    const duration = 0.9 + (((i * 13) % 60) / 100); // 0.90–1.50s
    const delay = ((i * 7) % 16) / 100; // 0–0.16s
    const accent = i % 5 === 0;
    return {
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
      size,
      duration,
      delay,
      bright,
      accent,
    };
  });
}

function buildRays() {
  // Evenly distributed rays with tiny angular jitter + varied lengths so
  // the burst has organic variance without looking mechanical.  Slight
  // stagger in delay makes it read as a firework "launch", not a single
  // synchronous flash.
  return Array.from({ length: RAY_COUNT }, (_, i) => {
    const baseAngle = (i / RAY_COUNT) * 360;
    const jitter = ((i * 37) % 9) - 4; // -4..+4 deg
    const angle = baseAngle + jitter;
    // Three length tiers — variety keeps it lively.
    const tier = i % 3;
    const length = tier === 0 ? 360 : tier === 1 ? 460 : 560;
    const duration = 0.85 + (((i * 19) % 35) / 100); // 0.85–1.20s
    const delay = ((i * 11) % 14) / 100;              // 0–0.14s
    return { angle, length, duration, delay };
  });
}

function buildBackgroundStars() {
  // Deterministic pseudo-random placement — consistent across renders,
  // no hydration mismatch, no Math.random.
  return Array.from({ length: BG_STAR_COUNT }, (_, i) => {
    const top = ((i * 53) % 97) / 97;   // 0–1
    const left = ((i * 131) % 101) / 101;
    const size = [1, 1, 1, 1.25, 1.5, 1.5, 2, 2.5][i % 8];
    const opacity = 0.35 + ((i * 11) % 45) / 100; // 0.35–0.80
    const duration = 3 + ((i * 19) % 40) / 10;    // 3.0–7.0s
    const delay = ((i * 29) % 30) / 10;           // 0–3s
    const bright = i % 9 === 0;
    return { top, left, size, opacity, duration, delay, bright };
  });
}

export default function Intro({ onDone }) {
  const [phase, setPhase] = useState(0);
  const [target, setTarget] = useState(null);
  const logoRef = useRef(null);
  const done = useRef(false);
  const particles = useMemo(buildParticles, []);
  const rays = useMemo(buildRays, []);
  const bgStars = useMemo(buildBackgroundStars, []);

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
      setTimeout(() => setPhase(1), 120 * mult),   // core pulse + starfield on
      setTimeout(() => setPhase(2), 700 * mult),   // supernova burst + flare
      setTimeout(() => setPhase(3), 1480 * mult),  // logo letters materialise
      setTimeout(() => setPhase(4), 2180 * mult),  // tagline + meteor streak
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
      }, 2820 * mult),
      setTimeout(() => setPhase(6), 3320 * mult),
      setTimeout(finish, 3780 * mult),
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
        // Solid near-black sky with a single subtle gradient — no diffuse
        // washes over the whole frame (that's what reads as "blurry").
        background: exiting
          ? "transparent"
          : "radial-gradient(ellipse 60% 50% at 50% 50%, #0f1a2e 0%, #080d1a 60%, #04070f 100%)",
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
      {/* Self-contained keyframe — core pulse is local to the intro. */}
      <style>{`
        @keyframes intro-core-pulse {
          0%   { width: 4px;  height: 4px;  opacity: 0.65; }
          55%  { width: 22px; height: 22px; opacity: 1; }
          100% { width: 12px; height: 12px; opacity: 1; }
        }
      `}</style>

      {/* Static depth starfield — grounds the frame in a real night sky
          from the very first frame.  Fades slightly during the burst. */}
      <div
        className="intro-starfield"
        aria-hidden
        style={{
          opacity: exiting ? 0 : burst ? 0.55 : 1,
          transition: "opacity 0.9s ease",
        }}
      >
        {bgStars.map((s, i) => (
          <span
            key={i}
            className={`intro-bgstar${s.bright ? " is-bright" : ""}`}
            style={{
              top: `${s.top * 100}%`,
              left: `${s.left * 100}%`,
              "--s-size": `${s.size}px`,
              "--s-opacity": s.opacity,
              "--s-dur": `${s.duration}s`,
              "--s-delay": `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Core singularity — pin-sharp radial gradient, crisp edge, tight
          layered shadows for glow (not a single diffuse halo). */}
      <div
        className="intro-core"
        aria-hidden
        style={{
          "--core-size": burst ? "14px" : "8px",
          animation: phase === 1 ? "intro-core-pulse 0.6s ease-out 1 both" : undefined,
          opacity: gone || formed ? 0 : 1,
          transition: "opacity 0.6s ease, box-shadow 0.6s ease",
        }}
      />

      {/* Anamorphic lens flare — the single cinematic "lens" moment.
          Fires at burst; 1px horizontal streak that scales across the
          viewport, then a shorter vertical companion. */}
      <div
        className={`intro-flare${burst && !exiting ? " is-active" : ""}`}
        aria-hidden
      />
      <div
        className={`intro-flare-v${burst && !exiting ? " is-active" : ""}`}
        aria-hidden
      />

      {/* Firework rays — pin-sharp streaks shoot radially outward from
          the core with a bright leading tip and tapered trail.  Reads
          as a cinematic firework launch, not a blurry ring. */}
      {rays.map((r, i) => (
        <span
          key={`ray-${i}`}
          className={`intro-ray${burst && !exiting ? " is-active" : ""}`}
          aria-hidden
          style={{
            "--ray-angle": `${r.angle}deg`,
            "--ray-len": `${r.length}px`,
            "--ray-dur": `${r.duration}s`,
            "--ray-delay": `${r.delay}s`,
          }}
        />
      ))}

      {/* Supernova — 96 particles fly 360° outward.  Bright ones get
          real diffraction spikes via CSS pseudo-elements. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          pointerEvents: "none",
        }}
      >
        {particles.map((p, i) => {
          const classes = [
            "intro-particle",
            p.bright ? "is-bright" : "",
            burst ? "is-active" : "",
            exiting ? "is-fading" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <span
              key={i}
              className={classes}
              style={{
                "--p-size": `${p.size}px`,
                "--p-color": p.accent ? C.primaryLight : "#ffffff",
                "--p-dur": `${p.duration}s`,
                "--p-delay": `${p.delay}s`,
                "--dx": `${p.dx}px`,
                "--dy": `${p.dy}px`,
              }}
            />
          );
        })}
      </div>

      {/* Wordmark — letters crystallise via opacity + translate + scale ONLY.
          No `filter: blur()` (that was the main cause of the unsharp look).
          Glow is produced by tightly-layered text-shadows that read as
          defined light, not a diffuse halo. */}
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
              transform: formed
                ? "translateY(0) scale(1)"
                : "translateY(10px) scale(0.88)",
              transition: `opacity 0.5s cubic-bezier(.22,1,.36,1) ${i * 0.055}s, transform 0.5s cubic-bezier(.22,1,.36,1) ${i * 0.055}s, text-shadow 0.6s ease ${i * 0.055}s`,
              textShadow: formed
                ? `0 0 1px rgba(255,255,255,0.85),
                   0 0 6px rgba(186,230,253,0.55),
                   0 0 18px ${C.primary}66,
                   0 0 36px ${C.primary}33`
                : "none",
              willChange: "opacity, transform",
            }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* Tagline — crisp type, no blur, fades in after the wordmark. */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          marginTop: 22,
          fontSize: "0.95rem",
          color: "#cbd5e1",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontFamily: BODY,
          fontWeight: 500,
          opacity: tagline && !exiting ? 1 : 0,
          transform: tagline ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.45s cubic-bezier(.22,1,.36,1), transform 0.45s cubic-bezier(.22,1,.36,1)",
          textShadow: "0 0 8px rgba(14,165,233,0.25)",
        }}
      >
        Benut de kracht van AI.
      </div>

    </div>
  );
}
