import { useState } from "react";
import { BODY, C } from "../lib/theme";
import { Reveal, SectionHeading } from "./ui";

export default function Faq({
  items,
  tag = "FAQ",
  title,
  text,
}) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <SectionHeading
        tag={tag}
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
      <div style={{ marginTop: 28, maxWidth: 760 }}>
        {items.map((item, index) => (
          <Reveal key={item.q} delay={0.08 + index * 0.03}>
            <div style={{ borderBottom: `1px solid ${C.border}` }}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
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
                  color: C.text,
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
                  maxHeight: openIndex === index ? 240 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.4s cubic-bezier(.22,1,.36,1)",
                }}
              >
                <p
                  style={{
                    color: C.textSoft,
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
