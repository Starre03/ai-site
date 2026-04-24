import { useState } from "react";
import { BODY, C } from "../lib/theme";
import { Reveal, SectionHeading } from "./ui";

export default function Faq({
  items,
  tag = "FAQ",
  title,
  text,
  light = false,
  centered = false,
  contentWidth = 760,
}) {
  const [openIndex, setOpenIndex] = useState(0);
  const colors = {
    text: light ? C.lightText : C.text,
    textSoft: light ? C.lightTextSoft : C.textSoft,
    border: light ? C.lightBorder : C.border,
  };

  return (
    <>
      <SectionHeading
        tag={tag}
        light={light}
        centered={centered}
        title={
          title || (
            <>
              Veelgestelde vragen over
              <em style={{ color: C.primary, fontStyle: "italic" }}> AI audit, integraties en AI agents</em>
            </>
          )
        }
        text={text}
      />
      <div style={{ margin: "28px auto 0", maxWidth: contentWidth }}>
        {items.map((item, index) => (
          <Reveal key={item.q} delay={0.08 + index * 0.03}>
            <div style={{ borderBottom: `1px solid ${colors.border}` }}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-panel-${index}`}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "16px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontFamily: BODY,
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  color: colors.text,
                }}
              >
                {item.q}
                <span
                  style={{
                    color: C.primary,
                    fontSize: "1rem",
                    transition: "transform 0.3s",
                    transform: openIndex === index ? "rotate(45deg)" : "none",
                    flexShrink: 0,
                    marginLeft: 12,
                  }}
                >
                  +
                </span>
              </button>
              <div
                style={{
                  maxHeight: openIndex === index ? 600 : 0,
                  opacity: openIndex === index ? 1 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.4s cubic-bezier(.22,1,.36,1), opacity 0.3s ease",
                }}
              >
                <p
                  id={`faq-panel-${index}`}
                  style={{
                    color: colors.textSoft,
                    fontSize: "0.82rem",
                    lineHeight: 1.7,
                    fontFamily: BODY,
                    paddingBottom: 16,
                  }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}
