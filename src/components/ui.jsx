import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSectionProgress, useVisible } from "../lib/hooks";
import { BODY, C, DISPLAY, shell } from "../lib/theme";

export function Reveal({ children, delay = 0, y = 28, fill = false }) {
  const [ref, visible] = useVisible();

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : `translateY(${y}px) scale(0.985)`,
        filter: visible ? "blur(0px)" : "blur(10px)",
        transition: `opacity 1.05s cubic-bezier(.16,1,.3,1) ${delay}s, transform 1.05s cubic-bezier(.16,1,.3,1) ${delay}s, filter 1.05s cubic-bezier(.16,1,.3,1) ${delay}s`,
        willChange: "transform, opacity, filter",
        ...(fill ? { height: "100%" } : {}),
      }}
    >
      {children}
    </div>
  );
}

export function SmoothSection({
  id,
  children,
  bg = C.bg,
  zIndex = 1,
  minH = "120vh",
  center = false,
  blendFrom,
}) {
  const ref = useRef(null);
  const progress = useSectionProgress(ref);
  const exit = Math.max(0, (progress - 0.6) / 0.4);
  const fadeOut = 1 - exit * exit;
  const drift = exit * -30;

  return (
    <section ref={ref} id={id} style={{ minHeight: minH, position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: center ? "center" : undefined,
          textAlign: center ? "center" : undefined,
          padding: "6rem clamp(1.5rem, 5vw, 5rem)",
          background: blendFrom
            ? `linear-gradient(to bottom, ${blendFrom} 0%, ${bg} 12%)`
            : bg,
          zIndex,
          opacity: fadeOut,
          transform: `translateY(${drift}px) translateZ(0)`,
          willChange: "transform, opacity",
        }}
      >
        <div style={shell.content}>{children}</div>
      </div>
    </section>
  );
}

export function PageSection({ children, bg = C.bg, pad = "9rem clamp(1.5rem, 5vw, 5rem)" }) {
  return (
    <section style={{ position: "relative", background: bg, padding: pad }}>
      <div style={shell.content}>{children}</div>
    </section>
  );
}

export function GlowCard({ children, style = {}, light = false }) {
  const ref = useRef(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false });

  return (
    <div
      ref={ref}
      onMouseMove={(event) => {
        const rect = ref.current.getBoundingClientRect();
        setGlow({
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100,
          on: true,
        });
      }}
      onMouseLeave={() => setGlow((current) => ({ ...current, on: false }))}
      style={{
        position: "relative",
        borderRadius: 18,
        overflow: "hidden",
        transition: "transform 0.4s cubic-bezier(.22,1,.36,1)",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -1,
          borderRadius: 18,
          pointerEvents: "none",
          background: `radial-gradient(220px at ${glow.x}% ${glow.y}%, ${C.primary}15, transparent 70%)`,
          opacity: glow.on ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 18,
          pointerEvents: "none",
          border: `1px solid ${glow.on ? `${C.primary}20` : light ? C.lightCardBorder : C.border}`,
          transition: "border-color 0.6s ease",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

export function Tag({ children }) {
  return (
    <div
      style={{
        fontSize: "0.68rem",
        textTransform: "uppercase",
        letterSpacing: "0.2em",
        color: C.primary,
        fontWeight: 600,
        marginBottom: 12,
        fontFamily: BODY,
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 20,
          height: 1,
          background: C.primary,
          marginRight: 10,
          verticalAlign: "middle",
          opacity: 0.5,
        }}
      />
      {children}
    </div>
  );
}

export function PrimaryButton({ children, to, href, onClick, secondary = false }) {
  const style = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "16px 36px",
    borderRadius: 12,
    fontWeight: 600,
    fontSize: "0.92rem",
    textDecoration: "none",
    fontFamily: BODY,
    border: secondary ? `1px solid ${C.borderLight}` : "none",
    background: secondary ? "rgba(255,255,255,0.02)" : C.primary,
    color: "#fff",
    cursor: "pointer",
    boxShadow: secondary ? "none" : `0 4px 24px ${C.primary}25`,
    transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
  };

  if (to) {
    return (
      <Link className="lift-on-hover" to={to} style={style}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a className="lift-on-hover" href={href} onClick={onClick} style={style}>
        {children}
      </a>
    );
  }

  return (
    <button className="lift-on-hover" onClick={onClick} style={style}>
      {children}
    </button>
  );
}

export function usePageSeo({ title, description }) {
  useEffect(() => {
    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }

    meta.setAttribute("content", description);
  }, [description, title]);
}

export function TyperText({
  items,
  typingSpeed = 46,
  deletingSpeed = 20,
  pause = 2100,
  primaryCursor = true,
}) {
  const [index, setIndex] = useState(0);
  const [chars, setChars] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = items[index];
    const delay = !deleting && chars === current.length ? pause : deleting ? deletingSpeed : typingSpeed;

    const timeout = setTimeout(() => {
      if (!deleting && chars < current.length) {
        setChars((value) => value + 1);
        return;
      }

      if (!deleting && chars === current.length) {
        setDeleting(true);
        return;
      }

      if (deleting && chars > 0) {
        setChars((value) => value - 1);
        return;
      }

      setDeleting(false);
      setIndex((value) => (value + 1) % items.length);
    }, delay);

    return () => clearTimeout(timeout);
  }, [chars, deleting, deletingSpeed, index, items, pause, typingSpeed]);

  return (
    <span>
      {items[index].slice(0, chars)}
      <span className={`cursor-blink ${primaryCursor ? "primary" : ""}`} />
    </span>
  );
}

export function SectionHeading({ tag, title, text, width = 640, light = false }) {
  return (
    <>
      <Reveal>
        <Tag>{tag}</Tag>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 style={{ ...shell.sectionTitle, maxWidth: width, ...(light ? { color: C.lightText } : {}) }}>{title}</h2>
      </Reveal>
      {text ? (
        <Reveal delay={0.12}>
          <p style={{ ...shell.sectionText, maxWidth: Math.min(width, 560), marginTop: 14, ...(light ? { color: C.lightTextSoft } : {}) }}>{text}</p>
        </Reveal>
      ) : null}
    </>
  );
}

export function BulletList({ items, light = false }) {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {items.map((item) => (
        <div
          key={item}
          style={{ display: "flex", alignItems: "flex-start", gap: 8, color: light ? C.lightTextSoft : C.textSoft, fontFamily: BODY }}
        >
          <span style={{ color: C.primary, fontSize: "0.72rem", marginTop: 4 }}>✓</span>
          <span style={{ fontSize: "0.82rem", lineHeight: 1.7 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

export function StatPill({ value, label }) {
  return (
    <GlowCard style={{ background: C.bg2 }}>
      <div style={{ padding: "1.2rem 1rem", textAlign: "center" }}>
        <div
          style={{
            color: C.primary,
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2.3rem)",
            fontFamily: BODY,
            lineHeight: 1,
          }}
        >
          {value}
        </div>
        <div style={{ marginTop: 10, color: C.textSoft, fontSize: "0.78rem", lineHeight: 1.5, fontFamily: BODY }}>
          {label}
        </div>
      </div>
    </GlowCard>
  );
}

export function PageHero({ badge, title, text, actions, aside }) {
  return (
    <PageSection pad="8.5rem clamp(1.5rem, 5vw, 5rem) 5rem">
      <div className="two-col" style={{ alignItems: "end", gap: 24 }}>
        <div style={{ maxWidth: 760 }}>
          <Reveal>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: C.primaryDim,
                border: `1px solid ${C.primary}15`,
                borderRadius: 100,
                padding: "6px 16px",
                fontSize: "0.72rem",
                color: C.primaryLight,
                fontWeight: 500,
                fontFamily: BODY,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: C.primary,
                  boxShadow: `0 0 8px ${C.primary}`,
                }}
              />
              {badge}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              style={{
                fontFamily: BODY,
                fontSize: "clamp(2.4rem, 6vw, 4.6rem)",
                lineHeight: 1.06,
                fontWeight: 700,
                margin: "22px 0 0",
                letterSpacing: "-0.02em",
                color: C.text,
                maxWidth: 760,
              }}
            >
              {title}
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p style={{ ...shell.sectionText, maxWidth: 620, marginTop: 20, fontSize: "1rem" }}>{text}</p>
          </Reveal>
          {actions ? (
            <Reveal delay={0.2}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>{actions}</div>
            </Reveal>
          ) : null}
        </div>
        {aside ? <Reveal delay={0.24}>{aside}</Reveal> : null}
      </div>
    </PageSection>
  );
}

export function BrandMark() {
  return (
    <span style={{ fontFamily: DISPLAY, fontSize: "1.15rem", color: C.text }}>
      starre<span style={{ color: C.primary }}>.ai</span>
    </span>
  );
}

export function MiniNote({ children }) {
  return (
    <div style={{ fontSize: "0.7rem", color: C.textMuted, marginTop: 8, fontFamily: BODY }}>{children}</div>
  );
}
