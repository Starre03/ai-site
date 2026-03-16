import { useVisible } from "../lib/hooks";
import { BODY, C } from "../lib/theme";
import { GlowCard, Reveal, SectionHeading, SmoothSection } from "./ui";

function METRChart() {
  const [ref, visible] = useVisible(0.2);

  const models = [
    { name: "GPT-2", date: "2019-02", mins: 0.15 },
    { name: "GPT-3", date: "2020-06", mins: 0.5 },
    { name: "GPT-3.5", date: "2022-12", mins: 1.5 },
    { name: "GPT-4", date: "2023-03", mins: 3.5 },
    { name: "GPT-4 Turbo", date: "2023-11", mins: 7 },
    { name: "Claude 3 Opus", date: "2024-03", mins: 10 },
    { name: "GPT-4o", date: "2024-05", mins: 8 },
    { name: "Claude 3.5 Sonnet", date: "2024-10", mins: 15 },
    { name: "o1", date: "2024-12", mins: 25 },
    { name: "Claude 3.7 Sonnet", date: "2025-03", mins: 50 },
    { name: "o3", date: "2025-04", mins: 55 },
    { name: "GPT-5", date: "2025-08", mins: 137 },
    { name: "Claude Sonnet 4.5", date: "2025-10", mins: 95 },
    { name: "Claude Opus 4.5", date: "2025-12", mins: 289 },
    { name: "GPT-5.2", date: "2026-02", mins: 394 },
    { name: "Claude Opus 4.6", date: "2026-02", mins: 870 },
  ];

  const chartW = 520;
  const chartH = 280;
  const padL = 52;
  const padR = 16;
  const padB = 50;
  const padT = 24;
  const w = chartW - padL - padR;
  const h = chartH - padB - padT;

  const startDate = new Date("2019-01-01").getTime();
  const endDate = new Date("2026-06-01").getTime();
  const toX = (dateStr) => {
    const date = new Date(dateStr).getTime();
    return padL + ((date - startDate) / (endDate - startDate)) * w;
  };

  const minLog = Math.log10(0.1);
  const maxLog = Math.log10(1500);
  const toY = (mins) => padT + h - ((Math.log10(mins) - minLog) / (maxLog - minLog)) * h;

  const trendPoints = [];
  for (let index = 0; index <= 50; index += 1) {
    const t = startDate + (index / 50) * (endDate - startDate);
    const yearsFrom2019 = (t - startDate) / (365.25 * 24 * 3600 * 1000);
    const mins = 0.15 * Math.pow(2, yearsFrom2019 / (7 / 12));
    if (mins < 1500) trendPoints.push({ x: padL + (index / 50) * w, y: toY(mins) });
  }

  const trendPath = trendPoints
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)},${point.y.toFixed(1)}`)
    .join(" ");
  const dataPath = models
    .map((model, index) => `${index === 0 ? "M" : "L"}${toX(model.date).toFixed(1)},${toY(model.mins).toFixed(1)}`)
    .join(" ");
  const areaPath =
    trendPath +
    ` L${trendPoints[trendPoints.length - 1].x.toFixed(1)},${(padT + h).toFixed(1)} L${padL},${(padT + h).toFixed(1)} Z`;

  const yLabels = [
    { mins: 0.1, label: "6s" },
    { mins: 1, label: "1 min" },
    { mins: 10, label: "10 min" },
    { mins: 60, label: "1 uur" },
    { mins: 600, label: "10 uur" },
  ];

  const xLabels = ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"];

  return (
    <div ref={ref} style={{ maxWidth: chartW + 20, margin: "0 auto", width: "100%" }}>
      <div style={{ fontSize: "0.72rem", color: C.textSoft, fontFamily: BODY, marginBottom: 8, fontWeight: 500 }}>
        50% Task-Completion Time Horizon
      </div>
      <svg
        viewBox={`0 0 ${chartW} ${chartH}`}
        style={{ width: "100%", overflow: "visible" }}
        role="img"
        aria-label="METR Time Horizons grafiek: exponentiële groei in AI-capaciteit van seconden naar uren"
      >
        <defs>
          <linearGradient id="metrGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.primary} stopOpacity="0.12" />
            <stop offset="100%" stopColor={C.primary} stopOpacity="0" />
          </linearGradient>
        </defs>

        {yLabels.map(({ mins }) => (
          <g key={mins}>
            <line x1={padL} y1={toY(mins)} x2={chartW - padR} y2={toY(mins)} stroke={C.border} strokeWidth="0.5" />
            <text
              x={padL - 6}
              y={toY(mins) + 3}
              textAnchor="end"
              fill={C.textMuted}
              fontSize="8"
              fontFamily="DM Sans, sans-serif"
            >
              {mins >= 60 ? `${mins / 60}u` : mins >= 1 ? `${mins}m` : `${Math.round(mins * 60)}s`}
            </text>
          </g>
        ))}

        {xLabels.map((year) => (
          <text
            key={year}
            x={toX(`${year}-07`)}
            y={chartH - 28}
            textAnchor="middle"
            fill={C.textMuted}
            fontSize="8"
            fontFamily="DM Sans, sans-serif"
          >
            {year}
          </text>
        ))}

        <path d={areaPath} fill="url(#metrGrad)" style={{ opacity: visible ? 1 : 0, transition: "opacity 1.5s ease 0.3s" }} />
        <path d={trendPath} fill="none" stroke={C.textMuted} strokeWidth="1" strokeDasharray="4 3" style={{ opacity: visible ? 0.4 : 0, transition: "opacity 1s ease 0.2s" }} />
        <path
          d={dataPath}
          fill="none"
          stroke={C.primary}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 1200,
            strokeDashoffset: visible ? 0 : 1200,
            transition: "stroke-dashoffset 2.5s cubic-bezier(.22,1,.36,1) 0.4s",
          }}
        />

        {models.map((model, index) => {
          const cx = toX(model.date);
          const cy = toY(model.mins);
          const isRecent = index >= models.length - 3;
          return (
            <g key={model.name}>
              <circle
                cx={cx}
                cy={cy}
                r={isRecent ? 3.5 : 2.5}
                fill={C.primary}
                stroke={isRecent ? C.primaryLight : "none"}
                strokeWidth={isRecent ? 1 : 0}
                style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${0.5 + index * 0.1}s` }}
              />
              {isRecent ? (
                <text
                  x={cx}
                  y={cy - 8}
                  textAnchor="middle"
                  fill={C.primaryLight}
                  fontSize="7"
                  fontFamily="DM Sans, sans-serif"
                  fontWeight="600"
                  style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${0.5 + index * 0.1}s` }}
                >
                  {model.name.replace("Claude ", "")}
                </text>
              ) : null}
            </g>
          );
        })}

        <text
          x={10}
          y={padT + h / 2}
          textAnchor="middle"
          fill={C.textMuted}
          fontSize="7"
          fontFamily="DM Sans, sans-serif"
          transform={`rotate(-90, 10, ${padT + h / 2})`}
        >
          Taakduur (menselijke expert)
        </text>
      </svg>
      <div style={{ textAlign: "center", marginTop: 8, fontSize: "0.6rem", color: C.textMuted, fontFamily: BODY }}>
        Bron: METR.org · Task-Completion Time Horizons of Frontier AI Models
      </div>
    </div>
  );
}

export default function METRSection() {
  return (
    <SmoothSection bg={C.bg} zIndex={5} minH="130vh">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />
      <SectionHeading
        tag="Waarom nu"
        title={
          <>
            AI wordt elk jaar beter.
            <em style={{ color: C.primary, fontStyle: "italic" }}> Het verschil zit nu in AI implementatie.</em>
          </>
        }
        text="Frontier-modellen schuiven snel op van secondenwerk naar taken waar normaal minuten of uren menselijke aandacht voor nodig zijn. Voor bedrijven en MKB-teams betekent dat: AI voor bedrijven is geen toekomstmuziek meer, maar een implementatievraag."
        width={760}
      />
      <div className="two-col" style={{ alignItems: "center", marginTop: 30 }}>
        <Reveal delay={0.18}>
          <GlowCard style={{ background: C.bg2 }}>
            <div style={{ padding: "1.5rem" }}>
              <METRChart />
            </div>
          </GlowCard>
        </Reveal>
        <div style={{ display: "grid", gap: 10 }}>
          {[
            {
              title: "De techniek versnelt, maar rendement ontstaat pas in bedrijfsprocessen",
              text: "Bedrijven die nu alleen experimenteren met losse tools bouwen zelden een voorsprong op. Bedrijven die AI implementatie koppelen aan support, documentprocessen, intake en workflows wel.",
            },
            {
              title: "Daarom werkt starre.ai met drie diensten die los te starten zijn",
              text: "Soms is een AI audit de beste eerste stap. Soms kun je direct door met een Claude integratie of ChatGPT integratie. En soms is het momentum er voor OpenClaw AI agents die werk uitvoeren.",
            },
            {
              title: "Niet meer tools kopen, maar slimmer automatiseren",
              text: "De winst zit niet in nog een AI-tool toevoegen. De winst zit in tijd terugpakken, bottlenecks doorbreken en AI workflow automatisering inzetten op plekken waar teams nu handmatig blijven hangen.",
            },
          ].map((item, index) => (
            <Reveal key={item.title} delay={0.24 + index * 0.08}>
              <GlowCard style={{ background: index === 1 ? C.bg3 : C.bg2 }}>
                <div style={{ padding: "1.35rem" }}>
                  <h3 style={{ color: C.text, fontFamily: BODY, fontSize: "0.94rem", fontWeight: 600 }}>{item.title}</h3>
                  <p style={{ color: C.textSoft, fontFamily: BODY, fontSize: "0.82rem", lineHeight: 1.75, marginTop: 10 }}>
                    {item.text}
                  </p>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </SmoothSection>
  );
}
