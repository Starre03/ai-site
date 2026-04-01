import { BODY, C, DISPLAY, shell } from "../lib/theme";
import { GlowCard, PageSection, Reveal, SectionHeading } from "../components/ui";

function Wordmark({ variant = "core", light = false, scale = 1 }) {
  const color = light ? C.lightText : C.text;
  const accent = C.primary;
  const sub = light ? C.lightTextSoft : C.textSoft;

  if (variant === "starleo-core") {
    return (
      <div style={{ transform: `scale(${scale})`, transformOrigin: "left center" }}>
        <div style={{ fontFamily: BODY, fontSize: "2.32rem", fontWeight: 700, letterSpacing: "-0.048em", color }}>
          Star<span style={{ color: accent }}>Leo</span>
        </div>
        <div style={{ fontFamily: BODY, fontSize: "0.8rem", letterSpacing: "0.01em", color: sub, marginTop: 6, fontWeight: 500 }}>
          Benut de kracht van AI.
        </div>
      </div>
    );
  }

  if (variant === "starleo-solid") {
    return (
      <div style={{ transform: `scale(${scale})`, transformOrigin: "left center" }}>
        <div style={{ fontFamily: BODY, fontSize: "2.28rem", fontWeight: 700, letterSpacing: "-0.05em", color }}>
          StarLeo
        </div>
        <div style={{ fontFamily: BODY, fontSize: "0.8rem", letterSpacing: "0.01em", color: sub, marginTop: 6, fontWeight: 500 }}>
          Benut de kracht van AI.
        </div>
      </div>
    );
  }

  if (variant === "starleo-editorial") {
    return (
      <div style={{ transform: `scale(${scale})`, transformOrigin: "left center" }}>
        <div style={{ fontFamily: DISPLAY, fontSize: "2.52rem", lineHeight: 1, color }}>
          Star<span style={{ color: accent }}>Leo</span>
        </div>
        <div style={{ fontFamily: BODY, fontSize: "0.8rem", color: sub, marginTop: 8, letterSpacing: "0.01em", fontWeight: 500 }}>
          Benut de kracht van AI.
        </div>
      </div>
    );
  }

  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: "left center" }}>
      <div style={{ fontFamily: BODY, fontSize: "2.35rem", fontWeight: 700, letterSpacing: "-0.045em", color }}>
        Star<span style={{ color: accent }}>Leo</span>
      </div>
      <div style={{ fontFamily: BODY, fontSize: "0.8rem", letterSpacing: "0.01em", color: sub, marginTop: 6, fontWeight: 500 }}>
        Benut de kracht van AI.
      </div>
    </div>
  );
}

function Monogram({ light = false }) {
  const bg = light ? "#FFFFFF" : C.bg2;
  const stroke = light ? C.lightText : C.text;

  return (
    <div
      style={{
        width: 128,
        height: 128,
        borderRadius: 28,
        background: bg,
        border: `1px solid ${light ? C.lightCardBorder : C.border}`,
        display: "grid",
        placeItems: "center",
        position: "relative",
        overflow: "hidden",
        boxShadow: light ? "0 12px 34px rgba(15,23,42,0.06)" : "0 18px 50px rgba(2,6,23,0.35)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 30% 25%, ${C.primary}20, transparent 40%), radial-gradient(circle at 70% 75%, ${C.primary}12, transparent 35%)`,
        }}
      />
      <div
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "baseline",
          gap: "0.01em",
          fontFamily: BODY,
          fontSize: "2.28rem",
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        <span style={{ color: stroke, display: "inline-block", textAlign: "center", letterSpacing: "-0.06em" }}>S</span>
        <span style={{ color: C.primary, display: "inline-block", textAlign: "center", letterSpacing: "-0.08em", marginLeft: "-0.04em" }}>L</span>
      </div>
    </div>
  );
}

function PaletteChip({ label, value, color }) {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ height: 88, borderRadius: 18, background: color, border: `1px solid ${C.border}` }} />
      <div style={{ fontFamily: BODY, fontSize: "0.86rem", fontWeight: 600, color: C.text }}>{label}</div>
      <div style={{ fontFamily: BODY, fontSize: "0.76rem", color: C.textSoft }}>{value}</div>
    </div>
  );
}

function DirectionCard({ title, subtitle, children, note }) {
  return (
    <GlowCard style={{ background: C.bg2, height: "100%" }}>
      <div style={{ padding: "1.5rem", display: "grid", gap: 18, height: "100%" }}>
        <div>
          <div style={{ fontFamily: BODY, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.primary }}>
            Richting
          </div>
          <h3 style={{ fontFamily: BODY, fontSize: "1.15rem", color: C.text, marginTop: 10, fontWeight: 700 }}>{title}</h3>
          <p style={{ fontFamily: BODY, fontSize: "0.88rem", color: C.textSoft, lineHeight: 1.72, marginTop: 8 }}>{subtitle}</p>
        </div>
        <div>{children}</div>
        <div style={{ fontFamily: BODY, fontSize: "0.8rem", color: C.textSoft, lineHeight: 1.7 }}>{note}</div>
      </div>
    </GlowCard>
  );
}

function ScoreRow({ label, a, b, c }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
        gap: 14,
        padding: "12px 0",
        borderTop: `1px solid ${C.lightBorder}`,
        alignItems: "center",
      }}
    >
      <div style={{ fontFamily: BODY, fontSize: "0.86rem", color: C.lightText, fontWeight: 600 }}>{label}</div>
      {[a, b, c].map((value) => (
        <div key={`${label}-${value}`} style={{ fontFamily: BODY, fontSize: "0.82rem", color: C.lightTextSoft }}>
          {value}
        </div>
      ))}
    </div>
  );
}

function NavPreview({ label }) {
  return (
    <div
      style={{
        background: "rgba(11,17,32,0.98)",
        border: `1px solid ${C.border}`,
        borderRadius: 18,
        padding: "18px 22px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 18,
        boxShadow: "0 18px 40px rgba(2,6,23,0.28)",
      }}
    >
      <div>{label}</div>
      <div style={{ display: "flex", gap: 28, alignItems: "center", fontFamily: BODY, color: C.textSoft, fontSize: "0.92rem" }}>
        <span>Diensten</span>
        <span>Oplossingen</span>
        <span>Over</span>
        <span
          style={{
            background: C.primary,
            color: "#fff",
            padding: "10px 16px",
            borderRadius: 12,
            fontWeight: 600,
          }}
        >
          Plan AI intake
        </span>
      </div>
    </div>
  );
}

export default function BrandPreviewPage() {
  return (
    <>
      <PageSection pad="7.6rem clamp(1.5rem, 5vw, 5rem) 5rem" minH="100vh" centerY>
        <div className="two-col" style={{ alignItems: "center", gap: 28 }}>
          <div>
            <Reveal>
              <div
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
                Branding preview · StarLeo
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 style={{ ...shell.sectionTitle, fontSize: "clamp(2.5rem, 6vw, 4.8rem)", maxWidth: 780, marginTop: 20 }}>
                Een merk richting voor <span style={{ color: C.primary }}>StarLeo</span> die premium, strak en geloofwaardig voelt.
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p style={{ ...shell.sectionText, marginTop: 20, maxWidth: 620, fontSize: "1rem" }}>
                Uit het logo-onderzoek komen steeds dezelfde regels terug: houd het simpel, direct leesbaar, schaalbaar naar klein formaat en sterk genoeg voor vertrouwen.
                Daarom test ik hier vooral woordmerken en geen ingewikkelde symbolen.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <GlowCard style={{ background: C.bg2 }}>
              <div style={{ padding: "1.75rem", display: "grid", gap: 20 }}>
                <Wordmark variant="starleo-core" scale={1.04} />
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
                  <Monogram />
                </div>
              </div>
            </GlowCard>
          </Reveal>
        </div>
      </PageSection>

      <PageSection bg={C.lightBg} minH="100vh" centerY>
        <SectionHeading
          tag="Logo richtingen"
          light
          title={<>Drie StarLeo-richtingen die professioneel ogen en vertrouwen wekken</>}
          text="Mijn voorkeur blijft een strak woordmerk met een subtiel kleuraccent. Dat werkt het best op site, offerte, favicon en toekomstige merkdragers."
        />
        <div className="card-grid-three" style={{ marginTop: 30 }}>
          <Reveal delay={0.08} fill>
            <DirectionCard
              title="1. StarLeo core"
              subtitle="Mijn voorkeursrichting. Clean, premium en direct leesbaar."
              note="Deze voelt het meest in balans: betrouwbaar voor zakelijke klanten, maar nog steeds onderscheidend genoeg als merk."
            >
              <div style={{ background: C.bg, borderRadius: 24, padding: "1.35rem" }}>
                <Wordmark variant="starleo-core" scale={0.92} />
              </div>
            </DirectionCard>
          </Reveal>

          <Reveal delay={0.14} fill>
            <DirectionCard
              title="2. StarLeo solid"
              subtitle="Volledig clean en zakelijk, zonder split in de naam."
              note="Sterk als je maximale rust wilt. Iets minder onderscheidend dan richting 1, maar nog steeds erg bruikbaar."
            >
              <div style={{ background: C.bg, borderRadius: 24, padding: "1.35rem" }}>
                <Wordmark variant="starleo-solid" scale={0.92} />
              </div>
            </DirectionCard>
          </Reveal>

          <Reveal delay={0.2} fill>
            <DirectionCard
              title="3. StarLeo editorial"
              subtitle="Luxer en iets meer merkgevoel, maar minder universeel."
              note="Mooi als merkuiting, maar voor pure conversie en zakelijke helderheid net iets minder sterk dan richting 1."
            >
              <div style={{ background: C.bg, borderRadius: 24, padding: "1.35rem" }}>
                <Wordmark variant="starleo-editorial" scale={0.92} />
              </div>
            </DirectionCard>
          </Reveal>
        </div>
      </PageSection>

      <PageSection minH="100vh" centerY>
        <div className="two-col" style={{ alignItems: "start", gap: 28 }}>
          <div>
            <SectionHeading
              tag="Kleur en merk"
              title={<>Wat sterke logo’s in jullie categorie gemeen hebben</>}
              text="Uit de onderzochte richtlijnen komen vooral deze punten terug: simpel houden, direct leesbaar zijn, niet te veel details, goed werken op klein formaat en één duidelijk kleuraccent gebruiken."
              width={760}
            />
            <div style={{ marginTop: 24, display: "grid", gap: 12 }}>
              {[
                "Woordmerk eerst, symbool pas als secundair merkonderdeel",
                "Favicon moet bij voorkeur uit 1 of 2 letters bestaan",
                "Gebruik maximaal 1 echt accentkleur voor herkenning",
                "Test logo altijd in navbar, browser tab en op mobiel",
              ].map((item) => (
                <div key={item} style={{ fontFamily: BODY, color: C.textSoft, display: "flex", gap: 10, lineHeight: 1.7 }}>
                  <span style={{ color: C.primary }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <Reveal delay={0.16}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
              <PaletteChip label="Midnight" value="#0B1120" color={C.bg} />
              <PaletteChip label="Signal Blue" value="#0EA5E9" color={C.primary} />
              <PaletteChip label="Slate Panel" value="#0F172A" color={C.bg2} />
              <PaletteChip label="Ice White" value="#F1F5F9" color={C.text} />
            </div>
          </Reveal>
        </div>
      </PageSection>

      <PageSection bg={C.lightBg} minH="100vh" centerY>
        <SectionHeading
          tag="Vertrouwen en conversie"
          light
          title={<>Welke richting het sterkst is voor vertrouwen, merkherkenning en conversie</>}
          text="Niet elk mooi logo verkoopt even goed. Voor jullie doelgroep weegt professionele uitstraling zwaarder dan creatieve originaliteit."
          width={820}
        />
        <Reveal delay={0.12}>
          <GlowCard light style={{ background: "#FFFFFF", boxShadow: "0 10px 34px rgba(15,23,42,0.06)", marginTop: 28 }}>
            <div style={{ padding: "1.6rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 14, paddingBottom: 12 }}>
                <div />
                <div style={{ fontFamily: BODY, fontSize: "0.78rem", color: C.lightText, fontWeight: 700 }}>StarLeo core</div>
                <div style={{ fontFamily: BODY, fontSize: "0.78rem", color: C.lightText, fontWeight: 700 }}>StarLeo solid</div>
                <div style={{ fontFamily: BODY, fontSize: "0.78rem", color: C.lightText, fontWeight: 700 }}>StarLeo editorial</div>
              </div>
              <ScoreRow label="Vertrouwen voor MKB" a="Zeer sterk" b="Sterk" c="Goed" />
              <ScoreRow label="Premium uitstraling" a="Zeer sterk" b="Sterk" c="Zeer sterk" />
              <ScoreRow label="Conversie op zakelijke site" a="Zeer sterk" b="Sterk" c="Goed" />
              <ScoreRow label="Schaalbaar naar klein formaat" a="Zeer sterk" b="Zeer sterk" c="Goed" />
              <ScoreRow label="Merkonderscheid" a="Sterk" b="Gemiddeld" c="Sterk" />
            </div>
          </GlowCard>
        </Reveal>
      </PageSection>

      <PageSection minH="100vh" centerY>
        <SectionHeading
          tag="Navbar preview"
          title={<>Wat er bovenin de site zou moeten staan</>}
          text="Voor de bovenbalk zou ik het veel cleaner houden dan in de hoofdbranding. Daar werkt een strak woordmerk beter dan een uitgebreid logo."
          width={760}
        />
        <div style={{ display: "grid", gap: 18, marginTop: 30 }}>
          <Reveal delay={0.1}>
            <NavPreview label={<Wordmark variant="starleo-core" scale={0.45} />} />
          </Reveal>
          <Reveal delay={0.16}>
            <NavPreview label={<Wordmark variant="starleo-solid" scale={0.45} />} />
          </Reveal>
          <Reveal delay={0.22}>
            <NavPreview label={<Wordmark variant="starleo-editorial" scale={0.45} />} />
          </Reveal>
        </div>
      </PageSection>

      <PageSection bg={C.lightBg} minH="100vh" centerY>
        <div className="two-col" style={{ alignItems: "center", gap: 30 }}>
          <div>
            <SectionHeading
              tag="Mijn advies"
              light
              title={<>Mijn advies: ga verder met StarLeo core</>}
              text="Dus: één strak woordmerk, één helder monogram en een korte Nederlandse merkregel. Dat geeft het meeste vertrouwen en blijft tegelijk modern genoeg voor AI-services."
              width={760}
            />
          </div>
          <Reveal delay={0.16}>
            <GlowCard light style={{ background: "#FFFFFF", boxShadow: "0 10px 34px rgba(15,23,42,0.06)" }}>
              <div style={{ padding: "1.7rem", display: "grid", gap: 18 }}>
                <Wordmark variant="starleo-core" light />
                <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
                  <Monogram light />
                  <div>
                    <div style={{ fontFamily: BODY, fontSize: "0.86rem", color: C.lightText, fontWeight: 700 }}>Aanbevolen merkstructuur</div>
                    <div style={{ fontFamily: BODY, fontSize: "0.84rem", color: C.lightTextSoft, lineHeight: 1.75, marginTop: 8 }}>
                      Hoofdmerk: StarLeo
                      <br />
                      Merkregel: Benut de kracht van AI.
                      <br />
                      Gebruik: woordmerk voor site, SL-monogram voor favicon en socials
                    </div>
                  </div>
                </div>
              </div>
            </GlowCard>
          </Reveal>
        </div>
      </PageSection>
    </>
  );
}
