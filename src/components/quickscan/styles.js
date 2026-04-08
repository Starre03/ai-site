import { BODY, C } from "../../lib/theme";

export const pageCardStyle = {
  background: "linear-gradient(180deg, rgba(15,23,42,0.92), rgba(10,16,31,0.96))",
  borderRadius: 28,
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 30px 80px rgba(2,6,23,0.42)",
  padding: "clamp(22px, 4vw, 42px)",
};

export const panelCardStyle = {
  display: "grid",
  gap: 18,
  alignContent: "start",
  padding: "24px",
  borderRadius: 22,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
};

export const eyebrowStyle = {
  color: "#7DD3FC",
  fontSize: "0.85rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  fontFamily: BODY,
};

export const mutedTextStyle = {
  color: C.textSoft,
  fontSize: "0.98rem",
  lineHeight: 1.7,
  fontFamily: BODY,
};

export const sectionTitleStyle = {
  fontSize: "clamp(1.8rem, 4vw, 3rem)",
  lineHeight: 1.04,
  margin: 0,
  letterSpacing: "-0.03em",
  fontFamily: BODY,
  color: C.text,
};

export function getChipStyle({ active = false, subtle = false, disabled = false } = {}) {
  return {
    padding: subtle ? "10px 14px" : "16px 18px",
    borderRadius: 16,
    border: `1px solid ${
      active ? "rgba(56,189,248,0.52)" : subtle ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.14)"
    }`,
    background: active
      ? "linear-gradient(180deg, rgba(8,145,178,0.44), rgba(14,165,233,0.18))"
      : subtle
        ? "rgba(255,255,255,0.04)"
        : "rgba(9,14,28,0.82)",
    color: disabled ? "rgba(241,245,249,0.35)" : C.text,
    textAlign: "left",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "transform 160ms ease, border-color 160ms ease, background 160ms ease",
    fontFamily: BODY,
    fontSize: "0.98rem",
    lineHeight: 1.45,
    boxShadow: active ? "0 16px 40px rgba(14,165,233,0.12)" : "none",
  };
}

export function getPrimaryButtonStyle(disabled = false) {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "14px 20px",
    borderRadius: 14,
    border: "none",
    background: disabled ? "rgba(14,165,233,0.28)" : "linear-gradient(135deg, #0284C7, #0EA5E9)",
    color: "#FFFFFF",
    cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: BODY,
    fontSize: "0.95rem",
    fontWeight: 700,
    boxShadow: disabled ? "none" : "0 18px 40px rgba(14,165,233,0.24)",
    textDecoration: "none",
  };
}

export function getSecondaryButtonStyle(disabled = false) {
  return {
    padding: "14px 18px",
    borderRadius: 14,
    border: `1px solid ${disabled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.18)"}`,
    background: disabled ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.06)",
    color: disabled ? "rgba(241,245,249,0.4)" : C.text,
    cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: BODY,
    fontSize: "0.95rem",
  };
}
