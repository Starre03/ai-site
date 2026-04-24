import { useEffect, useMemo, useState } from "react";
import { BODY, C } from "../../lib/theme";
import { pageCardStyle } from "./styles.js";

function buildMessages(companyName) {
  const name = (companyName || "").trim();
  const forCompany = name ? ` voor ${name}` : "";

  return [
    "Antwoorden verwerken…",
    `Bedrijfsprofiel${forCompany} analyseren…`,
    "Tijdlekken in kaart brengen…",
    "Geldbesparing uitrekenen…",
    "AI-kansen tegen elkaar wegen…",
    "Aanbevelingen op maat opstellen…",
    `Persoonlijk rapport${forCompany} klaarzetten…`,
  ];
}

export default function CalculatingScreen({ durationMs = 5600, companyName, messages }) {
  const resolvedMessages = useMemo(
    () => (Array.isArray(messages) && messages.length > 0 ? messages : buildMessages(companyName)),
    [messages, companyName],
  );
  const trimmedCompany = (companyName || "").trim();
  const headline = trimmedCompany
    ? `We stellen het AI-rapport voor ${trimmedCompany} samen`
    : "We stellen jouw persoonlijke AI-rapport samen";
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const step = Math.max(500, Math.floor(durationMs / resolvedMessages.length));
    const interval = setInterval(() => {
      setMessageIndex((current) => (current + 1 < resolvedMessages.length ? current + 1 : current));
    }, step);
    return () => clearInterval(interval);
  }, [durationMs, resolvedMessages.length]);

  return (
    <section
      style={{
        ...pageCardStyle,
        display: "grid",
        gap: "clamp(22px, 3vh, 32px)",
        justifyItems: "center",
        textAlign: "center",
        minHeight: "min(62vh, 640px)",
        alignContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "auto -80px -160px auto",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(14,165,233,0.22), transparent 70%)",
          pointerEvents: "none",
          filter: "blur(8px)",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "relative",
          width: 96,
          height: 96,
          display: "grid",
          placeItems: "center",
        }}
      >
        <span
          className="quickscan-pulse-ring"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2px solid rgba(56,189,248,0.45)",
          }}
        />
        <span
          className="quickscan-pulse-ring"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2px solid rgba(56,189,248,0.3)",
            animationDelay: "0.6s",
          }}
        />
        <span
          className="quickscan-orbit"
          style={{
            position: "absolute",
            inset: 8,
            borderRadius: "50%",
            border: "2px solid transparent",
            borderTopColor: "rgba(56,189,248,0.95)",
            borderRightColor: "rgba(125,211,252,0.5)",
          }}
        />
        <span
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, rgba(125,211,252,0.9), rgba(14,165,233,0.35))",
            boxShadow: "0 0 36px rgba(14,165,233,0.55)",
          }}
        />
      </div>

      <div style={{ display: "grid", gap: "clamp(8px, 1.2vh, 10px)", justifyItems: "center" }}>
        <h2
          style={{
            fontSize: "clamp(1.6rem, min(4vw, 6vh), 2.4rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            margin: 0,
            fontFamily: BODY,
          }}
        >
          {headline}
        </h2>
        <p
          style={{
            margin: 0,
            maxWidth: 520,
            color: C.textSoft,
            fontFamily: BODY,
            fontSize: "clamp(0.94rem, min(1.55vw, 2.1vh), 1rem)",
            lineHeight: 1.6,
          }}
        >
          Onze modellen wegen je antwoorden tegen elkaar af en zoeken de grootste kansen. Nog een paar seconden.
        </p>
      </div>

      <div
        style={{
          width: "min(440px, 100%)",
          display: "grid",
          gap: "clamp(10px, 1.4vh, 12px)",
          justifyItems: "stretch",
        }}
      >
        <div
          style={{
            height: 10,
            borderRadius: 999,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.06)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            className="quickscan-loader-bar"
            style={{
              height: "100%",
              borderRadius: 999,
              background: "linear-gradient(90deg, rgba(56,189,248,0.95), rgba(125,211,252,0.95))",
              boxShadow: "0 0 18px rgba(56,189,248,0.35)",
              "--qs-loader-duration": `${durationMs}ms`,
            }}
          />
        </div>

        <div
          style={{
            minHeight: 28,
            display: "grid",
            placeItems: "center",
          }}
        >
          <span
            key={messageIndex}
            className="quickscan-loader-message"
            style={{
              color: "#8FD8FF",
              fontFamily: BODY,
              fontSize: "clamp(0.9rem, min(1.3vw, 1.8vh), 0.98rem)",
              fontWeight: 600,
              letterSpacing: "0.01em",
            }}
          >
            {resolvedMessages[messageIndex]}
          </span>
        </div>
      </div>
    </section>
  );
}
