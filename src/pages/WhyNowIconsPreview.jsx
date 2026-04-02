import { BODY, C } from "../lib/theme";
import { GlowCard, Reveal, SmoothSection, Tag, usePageSeo } from "../components/ui";

const cardTitles = [
  "Bespaar tijd en geld",
  "Vergroot capaciteit",
  "Werk consistenter",
  "Verhoog klanttevredenheid",
];

function HairlineIcon({ kind }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 22 22",
    fill: "none",
    stroke: C.primary,
    strokeWidth: 1.55,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (kind === "time") {
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="6.9" />
        <path d="M11 7.5v3.7l2.4 1.5" />
        <path d="M6.5 4.9h2" />
      </svg>
    );
  }
  if (kind === "capacity") {
    return (
      <svg {...common}>
        <rect x="4" y="10.3" width="3.5" height="6" rx="1" />
        <rect x="9.25" y="7.2" width="3.5" height="9.1" rx="1" />
        <rect x="14.5" y="4.2" width="3.5" height="12.1" rx="1" />
      </svg>
    );
  }
  if (kind === "consistency") {
    return (
      <svg {...common}>
        <path d="M11 4l5.5 2.2v3.5c0 3.2-2.1 5.8-5.5 7.4-3.4-1.6-5.5-4.2-5.5-7.4V6.2L11 4z" />
        <path d="M8.3 11.2l1.8 1.8 3.7-3.8" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M7.2 13.4c1 .8 2.3 1.3 3.8 1.3 1.6 0 2.8-.5 3.8-1.3" />
      <path d="M7.7 9.1h.01" />
      <path d="M14.3 9.1h.01" />
      <path d="M11 18c3.9 0 7-3.1 7-7s-3.1-7-7-7-7 3.1-7 7 3.1 7 7 7z" />
    </svg>
  );
}

function SolidGlyphIcon({ kind }) {
  const wrap = {
    width: 22,
    height: 22,
    viewBox: "0 0 22 22",
    fill: C.primary,
  };

  if (kind === "time") {
    return (
      <svg {...wrap}>
        <path d="M11 3.8a7.2 7.2 0 1 0 0 14.4 7.2 7.2 0 0 0 0-14.4Zm.9 3.2v3.5l2.6 1.5-.9 1.4-3.3-2V7h1.6Z" />
      </svg>
    );
  }
  if (kind === "capacity") {
    return (
      <svg {...wrap}>
        <path d="M4.2 10.6h3.4v6H4.2v-6Zm5.1-3.1h3.4v9.1H9.3V7.5Zm5.1-3h3.4v12.1h-3.4V4.5Z" />
      </svg>
    );
  }
  if (kind === "consistency") {
    return (
      <svg {...wrap}>
        <path d="M11 3.8 17 6.2v3.5c0 3.5-2.2 6.2-6 8-3.8-1.8-6-4.5-6-8V6.2l6-2.4Zm-1.1 8.8 4-4-.9-.9-3.1 3.2-1.7-1.6-.9.9 2.6 2.4Z" />
      </svg>
    );
  }
  return (
    <svg {...wrap}>
      <path d="M11 3.8a7.2 7.2 0 1 0 0 14.4 7.2 7.2 0 0 0 0-14.4Zm-3.2 5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9Zm6.4 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9Zm-6.2 3.8h6c-.7 1.2-1.9 1.8-3 1.8s-2.3-.6-3-1.8Z" />
    </svg>
  );
}

function PremiumMarkIcon({ kind }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: C.primary,
    strokeWidth: 1.45,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (kind === "time") {
    return (
      <svg {...common}>
        <path d="M6.2 12c0-4 1.9-6.2 5.8-6.2s5.8 2.2 5.8 6.2-1.9 6.2-5.8 6.2S6.2 16 6.2 12Z" />
        <path d="M12 8.2v3.6l2.8 1.6" />
      </svg>
    );
  }
  if (kind === "capacity") {
    return (
      <svg {...common}>
        <path d="M5 16.8V13h3.2v3.8" />
        <path d="M10.4 16.8V9.3h3.2v7.5" />
        <path d="M15.8 16.8V6.2H19v10.6" />
        <path d="M4.5 18.2h15" />
      </svg>
    );
  }
  if (kind === "consistency") {
    return (
      <svg {...common}>
        <path d="M7 7.2 12 4l5 3.2v5.6L12 20l-5-7.2V7.2Z" />
        <path d="M9.2 12.1 11 14l3.8-4" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M7 14.3c1 1.3 2.6 2 5 2 2.3 0 4-.7 5-2" />
      <path d="M8 9.3h.01" />
      <path d="M16 9.3h.01" />
      <path d="M12 4.2c4.3 0 7.8 3.5 7.8 7.8S16.3 19.8 12 19.8 4.2 16.3 4.2 12 7.7 4.2 12 4.2Z" />
    </svg>
  );
}

function IconRow({ label, renderIcon }) {
  const kinds = ["time", "capacity", "consistency", "satisfaction"];
  return (
    <Reveal delay={0.08} fill>
      <GlowCard light style={{ background: C.lightCard, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div style={{ padding: "1.35rem 1.4rem", textAlign: "left" }}>
          <div
            style={{
              fontSize: "0.72rem",
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: C.primary,
              fontWeight: 700,
              fontFamily: BODY,
              marginBottom: 14,
            }}
          >
            {label}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
            {cardTitles.map((title, index) => (
              <div
                key={title}
                style={{
                  border: `1px solid ${C.lightCardBorder}`,
                  borderRadius: 14,
                  padding: "0.95rem 1rem",
                  minHeight: 86,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {renderIcon(kinds[index])}
                  <div style={{ color: C.primary, fontFamily: BODY, fontWeight: 700, fontSize: "0.92rem", lineHeight: 1.3 }}>
                    {title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlowCard>
    </Reveal>
  );
}

export default function WhyNowIconsPreviewPage() {
  usePageSeo({
    title: "StarLeo | Iconen preview",
    description: "Vergelijking van premium icon-richtingen voor het waarom-nu blok van StarLeo.",
  });

  return (
    <SmoothSection bg={C.lightBg} zIndex={4} minH="120vh" center>
      <div style={{ maxWidth: 1120, margin: "0 auto", textAlign: "center" }}>
        <Reveal delay={0.04}>
          <Tag>Iconen preview</Tag>
        </Reveal>

        <Reveal delay={0.1}>
          <h1
            style={{
              fontFamily: BODY,
              fontSize: "clamp(2rem, 4.5vw, 4rem)",
              lineHeight: 1.06,
              fontWeight: 700,
              margin: "0 auto",
              letterSpacing: "-0.03em",
              color: C.lightText,
              maxWidth: 860,
            }}
          >
            Drie iconrichtingen voor het
            <span style={{ color: C.primary }}> waarom-nu blok.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p
            style={{
              color: C.lightTextSoft,
              fontSize: "0.95rem",
              lineHeight: 1.8,
              maxWidth: 760,
              margin: "18px auto 0",
              fontFamily: BODY,
            }}
          >
            Alleen bedoeld om het gevoel te testen. Als geen van deze drie premium genoeg voelt, laten we het blok gewoon zonder iconen.
          </p>
        </Reveal>

        <div style={{ display: "grid", gap: 18, marginTop: 28 }}>
          <IconRow label="A · Hairline icons" renderIcon={(kind) => <HairlineIcon kind={kind} />} />
          <IconRow label="B · Solid glyphs" renderIcon={(kind) => <SolidGlyphIcon kind={kind} />} />
          <IconRow label="C · Premium marks" renderIcon={(kind) => <PremiumMarkIcon kind={kind} />} />
        </div>
      </div>
    </SmoothSection>
  );
}
