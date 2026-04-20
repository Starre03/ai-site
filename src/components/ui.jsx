import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  bgLayer = null,
}) {
  const ref = useRef(null);
  const progress = useSectionProgress(ref);
  const exit = Math.max(0, (progress - 0.6) / 0.4);
  const fadeOut = 1 - exit * exit;
  const drift = exit * -30;

  return (
    <section
      ref={ref}
      id={id}
      style={{
        minHeight: minH,
        position: "relative",
        background: bg,
        overflow: bgLayer ? "hidden" : undefined,
      }}
    >
      {bgLayer}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          minHeight: "100vh",
          zIndex,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: center ? "center" : undefined,
            textAlign: center ? "center" : undefined,
            padding: "clamp(4rem, 9vw, 6rem) clamp(1.25rem, 5vw, 5rem)",
            opacity: fadeOut,
            transform: `translateY(${drift}px) translateZ(0)`,
            willChange: "transform, opacity",
          }}
        >
          <div style={shell.content}>{children}</div>
        </div>
      </div>
    </section>
  );
}

export function PageSection({
  children,
  bg = C.bg,
  pad = "clamp(4.75rem, 10vw, 9rem) clamp(1.25rem, 5vw, 5rem)",
  minH,
  centerY = false,
}) {
  return (
    <section
      style={{
        position: "relative",
        background: bg,
        padding: pad,
        minHeight: minH,
        display: centerY ? "flex" : undefined,
        flexDirection: centerY ? "column" : undefined,
        justifyContent: centerY ? "center" : undefined,
        alignItems: centerY ? "center" : undefined,
      }}
    >
      <div style={{ ...shell.content, width: "100%" }}>{children}</div>
    </section>
  );
}

export function PageFade({ children }) {
  const location = useLocation();

  return (
    <div
      key={location.pathname}
      style={{
        animation: "pageFadeIn 220ms ease-out both",
      }}
    >
      {children}
    </div>
  );
}

export function GlowCard({ children, style = {}, light = false, className = "" }) {
  const ref = useRef(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false });

  // Subtle 3D tilt based on mouse offset from card center (max ~3deg).
  const tiltX = glow.on ? (50 - glow.y) * 0.06 : 0;
  const tiltY = glow.on ? (glow.x - 50) * 0.06 : 0;

  return (
    <div
      className={`${className} glowcard-tilt ${glow.on ? "glowcard-hover-active" : ""}`.trim()}
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
        transformStyle: "preserve-3d",
        transform: glow.on
          ? `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-2px)`
          : "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)",
        transition: "transform 0.5s cubic-bezier(.22,1,.36,1), box-shadow 0.5s cubic-bezier(.22,1,.36,1)",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -1,
          borderRadius: 18,
          pointerEvents: "none",
          background: `radial-gradient(260px at ${glow.x}% ${glow.y}%, ${C.primary}1f, transparent 70%)`,
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
          border: `1px solid ${glow.on ? `${C.primary}35` : light ? C.lightCardBorder : C.border}`,
          boxShadow: glow.on
            ? (light ? "0 18px 48px rgba(14, 165, 233, 0.14)" : `0 18px 44px ${C.primary}22`)
            : "none",
          transition: "border-color 0.6s ease, box-shadow 0.6s ease",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

export function SectionGlow({ bg = C.lightBg }) {
  return (
    <div
      style={{
        background: bg,
        position: "relative",
        zIndex: 3,
        padding: "18px clamp(1.5rem, 5vw, 5rem)",
      }}
      aria-hidden="true"
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="section-glow-row">
          <div className="section-glow-divider" />
          <span className="section-glow-dot" />
        </div>
      </div>
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

function renderBtnChildren(children) {
  if (typeof children !== "string") return children;
  // Split off trailing arrow-like glyph so we can animate it (idle nudge).
  const match = children.match(/^(.*?)(\s*)([\u2190-\u21FF])\s*$/);
  if (!match) return children;
  const [, body, gap, arrow] = match;
  return (
    <>
      {body}
      {gap}
      <span className="chev-nudge" aria-hidden="true">{arrow}</span>
    </>
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
    transition: "transform 0.4s cubic-bezier(.22,1,.36,1), box-shadow 0.4s cubic-bezier(.22,1,.36,1), background 0.3s ease",
  };

  const className = secondary ? "lift-on-hover" : "btn-premium";
  const rendered = renderBtnChildren(children);

  if (to) {
    return (
      <Link className={className} to={to} style={style}>
        {rendered}
      </Link>
    );
  }

  if (href) {
    return (
      <a className={className} href={href} onClick={onClick} style={style}>
        {rendered}
      </a>
    );
  }

  return (
    <button className={className} onClick={onClick} style={style}>
      {rendered}
    </button>
  );
}

export function usePageSeo({ title, description }) {
  useEffect(() => {
    const normalizedTitle = title.replace(/starre\.ai/gi, "StarLeo");
    const currentUrl = window.location.href;

    const upsertMeta = (selector, attribute, value) => {
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, value);
        document.head.appendChild(meta);
      }
      return meta;
    };

    const upsertLink = (selector, relValue) => {
      let link = document.querySelector(selector);
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", relValue);
        document.head.appendChild(link);
      }
      return link;
    };

    document.title = normalizedTitle;

    upsertMeta('meta[name="description"]', "name", "description").setAttribute("content", description);
    upsertMeta('meta[property="og:title"]', "property", "og:title").setAttribute("content", normalizedTitle);
    upsertMeta('meta[property="og:description"]', "property", "og:description").setAttribute("content", description);
    upsertMeta('meta[property="og:url"]', "property", "og:url").setAttribute("content", currentUrl);
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title").setAttribute("content", normalizedTitle);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description").setAttribute("content", description);
    upsertLink('link[rel="canonical"]', "canonical").setAttribute("href", currentUrl);
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

export function SectionHeading({ tag, title, text, width = 640, light = false, centered = false }) {
  return (
    <>
      <Reveal>
        <div style={centered ? { textAlign: "center" } : undefined}>
          <Tag>{tag}</Tag>
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <h2
          style={{
            ...shell.sectionTitle,
            maxWidth: width,
            ...(light ? { color: C.lightText } : {}),
            ...(centered ? { margin: "0 auto", textAlign: "center" } : {}),
          }}
        >
          {title}
        </h2>
      </Reveal>
      {text ? (
        <Reveal delay={0.12}>
          <p
            style={{
              ...shell.sectionText,
              maxWidth: Math.min(width, 560),
              ...(centered ? { margin: "14px auto 0", textAlign: "center" } : { marginTop: 14 }),
              ...(light ? { color: C.lightTextSoft } : {}),
            }}
          >
            {text}
          </p>
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

export function PageHero({
  badge,
  title,
  text,
  actions,
  aside,
  pad = "clamp(6rem, 10vw, 8.5rem) clamp(1.25rem, 5vw, 5rem) clamp(4rem, 8vw, 5rem)",
  titleSize = "clamp(2.4rem, 6vw, 4.6rem)",
  titleMaxWidth = 760,
  textMaxWidth = 620,
  align = "end",
  minH,
  centerY = false,
  fullCenter = false,
}) {
  if (fullCenter) {
    return (
      <PageSection pad={pad} minH={minH} centerY={centerY}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
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
                fontSize: titleSize,
                lineHeight: 1.06,
                fontWeight: 700,
                margin: "22px auto 0",
                letterSpacing: "-0.02em",
                color: C.text,
                maxWidth: titleMaxWidth,
                textAlign: "center",
              }}
            >
              {title}
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p
              style={{
                ...shell.sectionText,
                maxWidth: textMaxWidth,
                margin: "20px auto 0",
                fontSize: "1rem",
                textAlign: "center",
              }}
            >
              {text}
            </p>
          </Reveal>
          {actions ? (
            <Reveal delay={0.2}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28, justifyContent: "center" }}>
                {actions}
              </div>
            </Reveal>
          ) : null}
          {aside ? (
            <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
              <Reveal delay={0.28}>{aside}</Reveal>
            </div>
          ) : null}
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection pad={pad} minH={minH} centerY={centerY}>
      <div className="two-col" style={{ alignItems: align, gap: 24 }}>
        <div style={{ maxWidth: titleMaxWidth }}>
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
                fontSize: titleSize,
                lineHeight: 1.06,
                fontWeight: 700,
                margin: "22px 0 0",
                letterSpacing: "-0.02em",
                color: C.text,
                maxWidth: titleMaxWidth,
              }}
            >
              {title}
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p style={{ ...shell.sectionText, maxWidth: textMaxWidth, marginTop: 20, fontSize: "1rem" }}>{text}</p>
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
    <span style={{ display: "inline-flex", flexDirection: "column", lineHeight: 1 }}>
      <span style={{ fontFamily: BODY, fontSize: "1.02rem", fontWeight: 700, letterSpacing: "-0.04em", color: C.text }}>
        Star<span style={{ color: C.primary }}>Leo</span>
      </span>
    </span>
  );
}

export function MiniNote({ children }) {
  return (
    <div style={{ fontSize: "0.7rem", color: C.textMuted, marginTop: 8, fontFamily: BODY }}>{children}</div>
  );
}
