export const C = {
  bg: "#0B1120",
  bgAlt: "#111827",
  bg2: "#0F172A",
  bg3: "#1E293B",
  surface: "#1E293B",
  surfaceLight: "#334155",
  primary: "#0EA5E9",
  primaryLight: "#38BDF8",
  primaryDim: "rgba(14,165,233,0.07)",
  primaryGlow: "rgba(14,165,233,0.12)",
  text: "#F1F5F9",
  textSoft: "#94A3B8",
  textMuted: "#64748B",
  border: "rgba(255,255,255,0.06)",
  borderLight: "rgba(255,255,255,0.1)",
  accent: "#F59E0B",
  danger: "#EF4444",

  // Light section colors (blue-tinted theme)
  lightBg: "#F0F4F8",
  lightText: "#0C2D4A",
  lightTextSoft: "#3D5A80",
  lightTextMuted: "#6B8DB5",
  lightBorder: "rgba(14,165,233,0.12)",
  lightCard: "#FFFFFF",
  lightCardBorder: "rgba(14,165,233,0.08)",
};

export const DISPLAY = "'DM Serif Display', Georgia, serif";
export const BODY = "'DM Sans', -apple-system, sans-serif";

export const shell = {
  page: {
    overflowX: "hidden",
    position: "relative",
    minHeight: "100vh",
    background: C.bg,
  },
  content: {
    position: "relative",
    zIndex: 2,
    width: "min(1120px, 100%)",
    margin: "0 auto",
  },
  sectionTitle: {
    fontFamily: BODY,
    fontSize: "clamp(1.9rem, 4.2vw, 3rem)",
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
    color: C.text,
  },
  sectionText: {
    color: C.textSoft,
    lineHeight: 1.78,
    fontSize: "0.9rem",
    fontFamily: BODY,
    maxWidth: 640,
  },
};
