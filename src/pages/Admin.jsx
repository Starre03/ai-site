import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider.jsx";
import { GlowCard, PageSection, Reveal, SectionHeading, Tag, usePageSeo } from "../components/ui";
import {
  AI_FOLLOWUP_LABELS,
  AI_USAGE_LABELS,
  PAIN_POINT_LABELS,
  PROCESS_LABELS,
  QUESTIONS,
  TOOL_LABELS,
  URGENCY_LABELS,
} from "../lib/quickscan/config.js";
import { supabase } from "../lib/supabase/client.js";
import { BODY, C } from "../lib/theme";

const WEEKLY_HOURS_LABELS = Object.fromEntries(
  (QUESTIONS.find((question) => question.id === "weeklyHours")?.options || []).map((option) => [option.value, option.label]),
);

const STATUS_OPTIONS = ["new", "contacted", "closed"];

const STATUS_META = {
  new: {
    label: "Nieuw",
    color: C.primaryLight,
    background: "rgba(14,165,233,0.12)",
    border: "rgba(14,165,233,0.26)",
  },
  contacted: {
    label: "In behandeling",
    color: C.accent,
    background: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.28)",
  },
  closed: {
    label: "Gesloten",
    color: "#34D399",
    background: "rgba(52,211,153,0.12)",
    border: "rgba(52,211,153,0.28)",
  },
};

const CONTACT_FILTER_OPTIONS = [
  { value: "all", label: "Alle" },
  { value: "new", label: "Nieuw" },
  { value: "contacted", label: "In behandeling" },
  { value: "closed", label: "Gesloten" },
];

const actionButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 12,
  border: "none",
  padding: "12px 16px",
  fontFamily: BODY,
  fontSize: "0.88rem",
  fontWeight: 700,
  cursor: "pointer",
};

const tableCellStyle = {
  padding: "16px 14px",
  borderTop: `1px solid ${C.border}`,
  verticalAlign: "top",
  fontFamily: BODY,
  fontSize: "0.86rem",
  lineHeight: 1.6,
  color: C.textSoft,
};

const modalCardStyle = {
  width: "min(980px, 100%)",
  margin: "4rem auto",
  background: "rgba(11,17,32,0.96)",
  border: `1px solid ${C.borderLight}`,
  boxShadow: "0 28px 120px rgba(2,8,23,0.55)",
};

const secondaryButtonStyle = {
  ...actionButtonStyle,
  background: "rgba(255,255,255,0.04)",
  color: C.text,
  border: `1px solid ${C.borderLight}`,
  padding: "10px 14px",
  fontSize: "0.8rem",
};

const controlInputStyle = {
  width: "100%",
  minHeight: 44,
  borderRadius: 12,
  border: `1px solid ${C.borderLight}`,
  background: "rgba(11,17,32,0.72)",
  color: C.text,
  padding: "12px 14px",
  fontSize: "0.88rem",
  fontFamily: BODY,
  outline: "none",
};

function formatDate(value) {
  if (!value) return "Onbekend";

  return new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatCurrency(value) {
  if (!Number.isFinite(Number(value))) {
    return null;
  }

  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function formatSavingsRange(low, high, suffix = "") {
  const formattedLow = formatCurrency(low);
  const formattedHigh = formatCurrency(high);

  if (!formattedLow && !formattedHigh) {
    return "—";
  }

  if (formattedLow && formattedHigh) {
    return `${formattedLow} — ${formattedHigh}${suffix}`;
  }

  return `${formattedLow || formattedHigh}${suffix}`;
}

function truncateText(value, limit) {
  if (!value) return "—";
  if (value.length <= limit) return value;
  return `${value.slice(0, limit).trimEnd()}...`;
}

function formatScoreForCsv(row) {
  if (row.total_score == null && !row.classification) {
    return "";
  }

  if (row.total_score == null) {
    return row.classification || "";
  }

  return row.classification ? `${row.total_score} (${row.classification})` : String(row.total_score);
}

function escapeCsvValue(value) {
  const stringValue = String(value ?? "");
  return `"${stringValue.replace(/"/g, '""')}"`;
}

function downloadCsv(filename, headers, rows) {
  const csv = [headers, ...rows].map((columns) => columns.map(escapeCsvValue).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function countRowsInLastWeek(rows) {
  const threshold = Date.now() - 7 * 24 * 60 * 60 * 1000;

  return rows.filter((row) => {
    const timestamp = Date.parse(row.created_at || "");
    return Number.isFinite(timestamp) && timestamp >= threshold;
  }).length;
}

function getMostCommonValue(values) {
  const counts = new Map();

  values.filter(Boolean).forEach((value) => {
    counts.set(value, (counts.get(value) || 0) + 1);
  });

  let winner = "";
  let highestCount = 0;

  counts.forEach((count, value) => {
    if (count > highestCount) {
      winner = value;
      highestCount = count;
    }
  });

  return winner || "—";
}

function readLabeledAnswer(answer, fallbackValue = "", fallbackLabel = "") {
  if (!answer && !fallbackValue && !fallbackLabel) {
    return "—";
  }

  if (typeof answer === "object" && answer !== null) {
    return answer.label || answer.value || fallbackLabel || fallbackValue || "—";
  }

  return fallbackLabel || answer || fallbackValue || "—";
}

function getHourlyValueLabel(row) {
  const hourlyValue = row.answers?.hourlyValue;

  if (hourlyValue?.label) {
    return hourlyValue.label;
  }

  if (Number.isFinite(Number(hourlyValue?.value))) {
    return formatCurrency(hourlyValue.value);
  }

  if (row.hourly_value_label) {
    return row.hourly_value_label;
  }

  if (Number.isFinite(Number(row.hourly_value))) {
    return formatCurrency(row.hourly_value);
  }

  return "—";
}

function getToolLabelList(row) {
  const answerTools = Array.isArray(row.answers?.tools) ? row.answers.tools : [];

  if (answerTools.length > 0) {
    return answerTools
      .map((tool) => {
        if (typeof tool === "object" && tool !== null) {
          return tool.label || tool.key || "";
        }

        return TOOL_LABELS[tool] || tool;
      })
      .filter(Boolean)
      .join(", ");
  }

  if (Array.isArray(row.tool_keys) && row.tool_keys.length > 0) {
    return row.tool_keys.map((tool) => TOOL_LABELS[tool] || tool).join(", ");
  }

  return "—";
}

function getQuickscanSummary(row) {
  const summary = row.analysis?.summary || {};
  const money = row.analysis?.money || {};

  return {
    primaryConclusion: summary.primaryConclusion || row.analysis?.primaryConclusion || "—",
    summaryText: summary.summaryText || row.analysis?.summaryText || "—",
    mainAiOpportunity: summary.mainAiOpportunity || row.main_ai_opportunity || row.analysis?.mainAiOpportunity || "—",
    recommendedNextStep:
      summary.recommendedNextStep || row.recommended_next_step || row.analysis?.recommendedNextStep || "—",
    opportunityBullets: Array.isArray(summary.opportunityBullets) ? summary.opportunityBullets : [],
    monthlyLow: money.monthlyLow ?? row.monthly_savings_low ?? null,
    monthlyHigh: money.monthlyHigh ?? row.monthly_savings_high ?? null,
    yearlyLow: money.yearlyLow ?? null,
    yearlyHigh: money.yearlyHigh ?? null,
  };
}

function buildStats(quickscans, contacts) {
  return [
    {
      label: "Totaal quickscans",
      value: String(quickscans.length),
    },
    {
      label: "Totaal contactformulieren",
      value: String(contacts.length),
    },
    {
      label: "Nieuwe leads deze week",
      value: String(countRowsInLastWeek([...quickscans, ...contacts])),
    },
    {
      label: "Meest aanbevolen dienst",
      value: getMostCommonValue(quickscans.map((row) => row.recommended_next_step)),
      compact: true,
    },
  ];
}

function StatCard({ label, value, compact = false, delay = 0 }) {
  return (
    <Reveal delay={delay} fill>
      <GlowCard style={{ background: C.bg2, height: "100%" }}>
        <div style={{ padding: "1.4rem", height: "100%" }}>
          <div
            style={{
              color: C.textMuted,
              fontFamily: BODY,
              fontSize: "0.74rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {label}
          </div>
          <div
            style={{
              marginTop: 14,
              color: C.text,
              fontFamily: BODY,
              fontSize: compact ? "1rem" : "clamp(1.8rem, 3vw, 2.5rem)",
              lineHeight: 1.15,
              fontWeight: 700,
              wordBreak: "break-word",
            }}
          >
            {value}
          </div>
        </div>
      </GlowCard>
    </Reveal>
  );
}

function StatusBadge({ value }) {
  const meta = STATUS_META[value] || STATUS_META.new;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
        padding: "6px 10px",
        border: `1px solid ${meta.border}`,
        background: meta.background,
        color: meta.color,
        fontFamily: BODY,
        fontSize: "0.74rem",
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {meta.label}
    </span>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <div
        style={{
          color: C.textMuted,
          fontFamily: BODY,
          fontSize: "0.74rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: C.textSoft,
          fontFamily: BODY,
          fontSize: "0.92rem",
          lineHeight: 1.75,
          wordBreak: "break-word",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function QuickscanDetailsModal({ submission, onClose }) {
  const summary = getQuickscanSummary(submission);
  const answers = submission.answers || {};
  const processTypeLabel = readLabeledAnswer(
    answers.processType,
    submission.process_type,
    PROCESS_LABELS[submission.process_type] || submission.process_label,
  );
  const painPointLabel = readLabeledAnswer(
    answers.painPoint,
    submission.pain_point,
    PAIN_POINT_LABELS[submission.pain_point] || submission.pain_point_label,
  );
  const weeklyHoursLabel = readLabeledAnswer(
    answers.weeklyHours,
    submission.weekly_hours,
    WEEKLY_HOURS_LABELS[submission.weekly_hours] || submission.weekly_hours_label,
  );
  const aiUsageLabel = readLabeledAnswer(
    answers.aiUsage,
    submission.ai_usage,
    AI_USAGE_LABELS[submission.ai_usage] || submission.ai_usage_label,
  );
  const aiIssueLabel = readLabeledAnswer(
    answers.aiIssue,
    submission.ai_issue,
    AI_FOLLOWUP_LABELS[submission.ai_issue] || submission.ai_issue_label,
  );
  const urgencyLabel = readLabeledAnswer(
    answers.urgency,
    submission.urgency,
    URGENCY_LABELS[submission.urgency] || submission.urgency_label,
  );

  return (
    <div
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2200,
        background: "rgba(2,8,23,0.82)",
        backdropFilter: "blur(8px)",
        padding: "0 1.5rem",
        overflowY: "auto",
      }}
    >
      <GlowCard style={modalCardStyle}>
        <div style={{ padding: "1.8rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 16,
            }}
          >
            <div>
              <Tag>Quickscan Details</Tag>
              <h2
                style={{
                  margin: "8px 0 0",
                  color: C.text,
                  fontFamily: BODY,
                  fontSize: "clamp(1.6rem, 3vw, 2.3rem)",
                  lineHeight: 1.05,
                  fontWeight: 700,
                }}
              >
                {submission.name}
              </h2>
              <p
                style={{
                  margin: "10px 0 0",
                  color: C.textSoft,
                  fontFamily: BODY,
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                }}
              >
                {submission.company_name || "—"} · {submission.email || "—"}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              style={{
                ...actionButtonStyle,
                background: "rgba(255,255,255,0.05)",
                color: C.text,
                border: `1px solid ${C.borderLight}`,
                padding: "10px 14px",
              }}
            >
              Sluiten
            </button>
          </div>

          <div className="card-grid-two" style={{ marginTop: 28 }}>
            <GlowCard style={{ background: C.bg2, height: "100%" }}>
              <div style={{ padding: "1.4rem", display: "grid", gap: 18 }}>
                <Tag>Profiel</Tag>
                <InfoBlock label="Naam" value={submission.name || "—"} />
                <InfoBlock label="Bedrijf" value={submission.company_name || "—"} />
                <InfoBlock
                  label="Email"
                  value={
                    submission.email ? (
                      <a href={`mailto:${submission.email}`} style={{ color: C.primaryLight, textDecoration: "none" }}>
                        {submission.email}
                      </a>
                    ) : (
                      "—"
                    )
                  }
                />
                <InfoBlock
                  label="Website"
                  value={
                    submission.website_url ? (
                      <a
                        href={submission.website_url}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: C.primaryLight, textDecoration: "none" }}
                      >
                        {submission.website_url}
                      </a>
                    ) : (
                      "—"
                    )
                  }
                />
              </div>
            </GlowCard>

            <GlowCard style={{ background: C.bg2, height: "100%" }}>
              <div style={{ padding: "1.4rem", display: "grid", gap: 18 }}>
                <Tag>Analyse</Tag>
                <InfoBlock label="Primary conclusion" value={summary.primaryConclusion} />
                <InfoBlock label="Summary text" value={summary.summaryText} />
                <InfoBlock label="Main AI opportunity" value={summary.mainAiOpportunity} />
                <InfoBlock label="Recommended next step" value={summary.recommendedNextStep} />
                <InfoBlock
                  label="Opportunity bullets"
                  value={
                    summary.opportunityBullets.length > 0 ? (
                      <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
                        {summary.opportunityBullets.map((bullet) => (
                          <li key={bullet} style={{ marginBottom: 6 }}>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "—"
                    )
                  }
                />
                <InfoBlock
                  label="Besparing per maand"
                  value={formatSavingsRange(summary.monthlyLow, summary.monthlyHigh, "/mnd")}
                />
                <InfoBlock
                  label="Besparing per jaar"
                  value={formatSavingsRange(summary.yearlyLow, summary.yearlyHigh, "/jr")}
                />
              </div>
            </GlowCard>
          </div>

          <GlowCard style={{ background: C.bg2, marginTop: 24 }}>
            <div style={{ padding: "1.4rem" }}>
              <Tag>Antwoorden</Tag>
              <div className="card-grid-two" style={{ marginTop: 18 }}>
                <InfoBlock label="Process type" value={processTypeLabel} />
                <InfoBlock label="Pain point" value={painPointLabel} />
                <InfoBlock label="Weekly hours" value={weeklyHoursLabel} />
                <InfoBlock label="Hourly value" value={getHourlyValueLabel(submission)} />
                <InfoBlock label="AI usage" value={aiUsageLabel} />
                <InfoBlock label="AI issue" value={aiIssueLabel} />
                <InfoBlock label="Urgency" value={urgencyLabel} />
                <InfoBlock label="Tools" value={getToolLabelList(submission)} />
              </div>
            </div>
          </GlowCard>
        </div>
      </GlowCard>
    </div>
  );
}

export default function AdminPage() {
  usePageSeo({
    title: "StarLeo | Dashboard",
    description: "Intern dashboard voor quickscan- en contactinzendingen.",
  });

  const navigate = useNavigate();
  const { signOut, status, user } = useAuth();
  const [activeTab, setActiveTab] = useState("quickscan");
  const [quickscans, setQuickscans] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [signOutError, setSignOutError] = useState("");
  const [signOutPending, setSignOutPending] = useState(false);
  const [selectedQuickscan, setSelectedQuickscan] = useState(null);
  const [statusError, setStatusError] = useState("");
  const [pendingStatusIds, setPendingStatusIds] = useState({});
  const [quickscanQuery, setQuickscanQuery] = useState("");
  const [contactStatusFilter, setContactStatusFilter] = useState("all");

  useEffect(() => {
    if (selectedQuickscan) {
      const previousOverflow = document.body.style.overflow;
      const handleEscape = (event) => {
        if (event.key === "Escape") {
          setSelectedQuickscan(null);
        }
      };

      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);

      return () => {
        document.body.style.overflow = previousOverflow;
        window.removeEventListener("keydown", handleEscape);
      };
    }

    return undefined;
  }, [selectedQuickscan]);

  useEffect(() => {
    if (status !== "ready" || !supabase) {
      return undefined;
    }

    let active = true;

    async function loadData() {
      setLoading(true);
      setLoadError("");

      const [quickscanResult, contactResult] = await Promise.all([
        supabase.from("quickscan_submissions").select("*").order("created_at", { ascending: false }),
        supabase.from("intake_submissions").select("*").order("created_at", { ascending: false }),
      ]);

      if (!active) {
        return;
      }

      if (quickscanResult.error) {
        setLoadError(`quickscan_submissions: ${quickscanResult.error.message}`);
        setLoading(false);
        return;
      }

      if (contactResult.error) {
        setLoadError(`intake_submissions: ${contactResult.error.message}`);
        setLoading(false);
        return;
      }

      setQuickscans(quickscanResult.data || []);
      setContacts(contactResult.data || []);
      setLoading(false);
    }

    loadData();

    return () => {
      active = false;
    };
  }, [status]);

  async function handleSignOut() {
    setSignOutPending(true);
    setSignOutError("");

    const { error } = await signOut();

    if (error) {
      setSignOutError(error.message);
      setSignOutPending(false);
      return;
    }

    navigate("/login", { replace: true });
  }

  async function handleStatusUpdate(id, nextStatus) {
    const currentSubmission = contacts.find((submission) => submission.id === id);

    if (!currentSubmission || currentSubmission.status === nextStatus || !supabase) {
      return;
    }

    setStatusError("");
    setPendingStatusIds((current) => ({ ...current, [id]: true }));
    setContacts((current) =>
      current.map((submission) => (submission.id === id ? { ...submission, status: nextStatus } : submission)),
    );

    const { error } = await supabase.from("intake_submissions").update({ status: nextStatus }).eq("id", id);

    if (error) {
      setContacts((current) =>
        current.map((submission) =>
          submission.id === id ? { ...submission, status: currentSubmission.status } : submission,
        ),
      );
      setStatusError(`Status-update mislukt: ${error.message}`);
    }

    setPendingStatusIds((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }

  const stats = buildStats(quickscans, contacts);
  const filteredQuickscans = useMemo(() => {
    const term = quickscanQuery.trim().toLowerCase();

    if (!term) {
      return quickscans;
    }

    return quickscans.filter((submission) =>
      [submission.name, submission.company_name, submission.email]
        .some((value) => String(value || "").toLowerCase().includes(term)),
    );
  }, [quickscans, quickscanQuery]);
  const filteredContacts = useMemo(() => {
    if (contactStatusFilter === "all") {
      return contacts;
    }

    return contacts.filter((submission) => (submission.status || "new") === contactStatusFilter);
  }, [contacts, contactStatusFilter]);

  function handleQuickscanExport() {
    downloadCsv(
      `quickscans-${new Date().toISOString().slice(0, 10)}.csv`,
      ["datum", "naam", "bedrijf", "e-mail", "score", "aanbevolen stap"],
      filteredQuickscans.map((submission) => [
        formatDate(submission.created_at),
        submission.name || "",
        submission.company_name || "",
        submission.email || "",
        formatScoreForCsv(submission),
        submission.recommended_next_step || "",
      ]),
    );
  }

  function handleContactExport() {
    downloadCsv(
      `contact-${new Date().toISOString().slice(0, 10)}.csv`,
      ["datum", "naam", "bedrijf", "e-mail", "status", "bericht"],
      filteredContacts.map((submission) => [
        formatDate(submission.created_at),
        submission.name || "",
        submission.company_name || "",
        submission.email || "",
        STATUS_META[submission.status || "new"]?.label || submission.status || "",
        truncateText(submission.message || "", 100),
      ]),
    );
  }

  return (
    <PageSection bg={C.bg} pad="8.5rem clamp(1.5rem, 5vw, 5rem) 5rem" minH="100vh">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <SectionHeading
          tag="Dashboard"
          title="Interne submissions in één overzicht."
          text="Quickscan- en contactinzendingen worden hier live uit Supabase geladen en direct beheerd."
          width={760}
        />
        <Reveal delay={0.06}>
          <div style={{ display: "grid", justifyItems: "end", gap: 10 }}>
            <div
              style={{
                color: C.textMuted,
                fontFamily: BODY,
                fontSize: "0.78rem",
                lineHeight: 1.5,
                textAlign: "right",
              }}
            >
              Ingelogd als {user?.email || "onbekend account"}
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              disabled={signOutPending}
              style={{
                ...actionButtonStyle,
                background: C.primary,
                color: "#fff",
                opacity: signOutPending ? 0.72 : 1,
              }}
            >
              {signOutPending ? "Uitloggen..." : "Uitloggen"}
            </button>
            {signOutError ? (
              <div
                style={{
                  color: C.accent,
                  fontFamily: BODY,
                  fontSize: "0.8rem",
                  lineHeight: 1.6,
                  maxWidth: 260,
                  textAlign: "right",
                }}
              >
                {signOutError}
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>

      <div className="card-grid-four" style={{ marginTop: 28 }}>
        {stats.map((item, index) => (
          <StatCard key={item.label} {...item} delay={0.04 + index * 0.04} />
        ))}
      </div>

      <Reveal delay={0.22}>
        <div
          style={{
            display: "inline-flex",
            gap: 10,
            padding: 8,
            borderRadius: 18,
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${C.border}`,
            marginTop: 34,
            flexWrap: "wrap",
          }}
        >
          {[
            { id: "quickscan", label: "Quickscan", count: quickscans.length },
            { id: "contact", label: "Contact", count: contacts.length },
          ].map((tab) => {
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  border: "none",
                  borderRadius: 12,
                  background: active ? C.primary : "transparent",
                  color: active ? "#fff" : C.textSoft,
                  padding: "10px 18px",
                  fontFamily: BODY,
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <span>{tab.label}</span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 26,
                      padding: "2px 8px",
                      borderRadius: 999,
                      background: active ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.05)",
                      color: active ? "#fff" : C.textMuted,
                      fontSize: "0.76rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {tab.count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {loading ? (
        <Reveal delay={0.28}>
          <GlowCard style={{ background: C.bg2, marginTop: 24 }}>
            <div style={{ padding: "1.5rem", color: C.textSoft, fontFamily: BODY, fontSize: "0.94rem" }}>
              Dashboardgegevens laden...
            </div>
          </GlowCard>
        </Reveal>
      ) : null}

      {!loading && loadError ? (
        <Reveal delay={0.28}>
          <GlowCard style={{ background: "rgba(239,68,68,0.08)", marginTop: 24 }}>
            <div style={{ padding: "1.5rem" }}>
              <div style={{ color: C.text, fontFamily: BODY, fontSize: "1rem", fontWeight: 700 }}>
                Dashboardquery mislukt
              </div>
              <div
                style={{
                  marginTop: 10,
                  color: C.accent,
                  fontFamily: BODY,
                  fontSize: "0.9rem",
                  lineHeight: 1.75,
                }}
              >
                {loadError}
              </div>
            </div>
          </GlowCard>
        </Reveal>
      ) : null}

      {!loading && !loadError && activeTab === "quickscan" ? (
        <Reveal delay={0.28}>
          <GlowCard style={{ background: C.bg2, marginTop: 24 }}>
            <div style={{ padding: "1.4rem 1.4rem 1rem" }}>
              <Tag>Quickscan</Tag>
              <p
                style={{
                  margin: "10px 0 0",
                  color: C.textSoft,
                  fontFamily: BODY,
                  fontSize: "0.92rem",
                  lineHeight: 1.75,
                }}
              >
                {filteredQuickscans.length} van {quickscans.length} inzendingen, gesorteerd op meest recent.
              </p>
            </div>
            <div
              style={{
                padding: "0 1.4rem 1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <label style={{ display: "grid", gap: 8, flex: "1 1 320px", maxWidth: 460 }}>
                <span
                  style={{
                    color: C.textMuted,
                    fontFamily: BODY,
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Zoek op naam, bedrijf of e-mail
                </span>
                <input
                  type="search"
                  value={quickscanQuery}
                  onChange={(event) => setQuickscanQuery(event.target.value)}
                  placeholder="Zoek quickscans..."
                  style={controlInputStyle}
                />
              </label>
              <button
                type="button"
                onClick={handleQuickscanExport}
                disabled={filteredQuickscans.length === 0}
                style={{
                  ...secondaryButtonStyle,
                  opacity: filteredQuickscans.length === 0 ? 0.5 : 1,
                  cursor: filteredQuickscans.length === 0 ? "default" : "pointer",
                }}
              >
                Exporteer CSV
              </button>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 980 }}>
                <thead>
                  <tr>
                    {["Naam + bedrijf", "Email", "Aanbevolen stap", "Besparing", "Score", "Datum", ""].map((header) => (
                      <th
                        key={header || "actions"}
                        style={{
                          padding: "0 14px 14px",
                          textAlign: "left",
                          color: C.textMuted,
                          fontFamily: BODY,
                          fontSize: "0.74rem",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredQuickscans.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ ...tableCellStyle, color: C.textMuted }}>
                        {quickscans.length === 0 ? "Nog geen quickscan-inzendingen gevonden." : "Geen quickscans gevonden voor deze zoekopdracht."}
                      </td>
                    </tr>
                  ) : (
                    filteredQuickscans.map((submission) => (
                      <tr key={submission.id}>
                        <td style={tableCellStyle}>
                          <div style={{ color: C.text, fontWeight: 700 }}>{submission.name || "—"}</div>
                          <div style={{ marginTop: 2 }}>{submission.company_name || "—"}</div>
                        </td>
                        <td style={tableCellStyle}>
                          {submission.email ? (
                            <a href={`mailto:${submission.email}`} style={{ color: C.primaryLight, textDecoration: "none" }}>
                              {submission.email}
                            </a>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td style={tableCellStyle}>{submission.recommended_next_step || "—"}</td>
                        <td style={tableCellStyle}>
                          {formatSavingsRange(submission.monthly_savings_low, submission.monthly_savings_high, "/mnd")}
                        </td>
                        <td style={tableCellStyle}>
                          <span style={{ color: C.text, fontWeight: 700 }}>{submission.total_score ?? "—"}</span>
                          <span style={{ margin: "0 6px", color: C.textMuted }}>·</span>
                          <span>{submission.classification || "—"}</span>
                        </td>
                        <td style={tableCellStyle}>{formatDate(submission.created_at)}</td>
                        <td style={tableCellStyle}>
                          <button
                            type="button"
                            onClick={() => setSelectedQuickscan(submission)}
                            style={{
                              ...actionButtonStyle,
                              background: "rgba(14,165,233,0.1)",
                              color: C.primaryLight,
                              border: `1px solid ${C.primary}25`,
                              padding: "10px 14px",
                            }}
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </GlowCard>
        </Reveal>
      ) : null}

      {!loading && !loadError && activeTab === "contact" ? (
        <Reveal delay={0.28}>
          <GlowCard style={{ background: C.bg2, marginTop: 24 }}>
            <div style={{ padding: "1.4rem 1.4rem 1rem" }}>
              <Tag>Contact</Tag>
              <p
                style={{
                  margin: "10px 0 0",
                  color: C.textSoft,
                  fontFamily: BODY,
                  fontSize: "0.92rem",
                  lineHeight: 1.75,
                }}
              >
                {filteredContacts.length} van {contacts.length} inzendingen, gesorteerd op meest recent.
              </p>
              {statusError ? (
                <div
                  style={{
                    marginTop: 12,
                    color: C.accent,
                    fontFamily: BODY,
                    fontSize: "0.84rem",
                    lineHeight: 1.7,
                  }}
                >
                  {statusError}
                </div>
              ) : null}
            </div>
            <div
              style={{
                padding: "0 1.4rem 1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <label style={{ display: "grid", gap: 8, minWidth: 220 }}>
                <span
                  style={{
                    color: C.textMuted,
                    fontFamily: BODY,
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Statusfilter
                </span>
                <select
                  value={contactStatusFilter}
                  onChange={(event) => setContactStatusFilter(event.target.value)}
                  style={controlInputStyle}
                >
                  {CONTACT_FILTER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                onClick={handleContactExport}
                disabled={filteredContacts.length === 0}
                style={{
                  ...secondaryButtonStyle,
                  opacity: filteredContacts.length === 0 ? 0.5 : 1,
                  cursor: filteredContacts.length === 0 ? "default" : "pointer",
                }}
              >
                Exporteer CSV
              </button>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1100 }}>
                <thead>
                  <tr>
                    {["Naam + bedrijf", "Email", "Formuliertype", "Bericht", "Status", "Datum", "Update status"].map((header) => (
                      <th
                        key={header}
                        style={{
                          padding: "0 14px 14px",
                          textAlign: "left",
                          color: C.textMuted,
                          fontFamily: BODY,
                          fontSize: "0.74rem",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ ...tableCellStyle, color: C.textMuted }}>
                        {contacts.length === 0 ? "Nog geen contactinzendingen gevonden." : "Geen contactinzendingen gevonden voor dit filter."}
                      </td>
                    </tr>
                  ) : (
                    filteredContacts.map((submission) => (
                      <tr key={submission.id} style={{ opacity: pendingStatusIds[submission.id] ? 0.72 : 1 }}>
                        <td style={tableCellStyle}>
                          <div style={{ color: C.text, fontWeight: 700 }}>{submission.name || "—"}</div>
                          <div style={{ marginTop: 2 }}>{submission.company_name || "—"}</div>
                        </td>
                        <td style={tableCellStyle}>
                          {submission.email ? (
                            <a href={`mailto:${submission.email}`} style={{ color: C.primaryLight, textDecoration: "none" }}>
                              {submission.email}
                            </a>
                          ) : (
                            "—"
                          )}
                          <div style={{ marginTop: 4 }}>{submission.phone || "—"}</div>
                        </td>
                        <td style={tableCellStyle}>{submission.form_kind || "—"}</td>
                        <td style={tableCellStyle}>{truncateText(submission.message || "", 80)}</td>
                        <td style={tableCellStyle}>
                          <StatusBadge value={submission.status} />
                        </td>
                        <td style={tableCellStyle}>{formatDate(submission.created_at)}</td>
                        <td style={tableCellStyle}>
                          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            {STATUS_OPTIONS.map((statusOption) => {
                              const active = submission.status === statusOption;

                              return (
                                <button
                                  key={statusOption}
                                  type="button"
                                  disabled={pendingStatusIds[submission.id]}
                                  onClick={() => handleStatusUpdate(submission.id, statusOption)}
                                  style={{
                                    ...actionButtonStyle,
                                    padding: "8px 10px",
                                    fontSize: "0.76rem",
                                    border: `1px solid ${active ? STATUS_META[statusOption].border : C.border}`,
                                    background: active ? STATUS_META[statusOption].background : "transparent",
                                    color: active ? STATUS_META[statusOption].color : C.textSoft,
                                  }}
                                >
                                  {STATUS_META[statusOption].label}
                                </button>
                              );
                            })}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </GlowCard>
        </Reveal>
      ) : null}

      {selectedQuickscan ? (
        <QuickscanDetailsModal submission={selectedQuickscan} onClose={() => setSelectedQuickscan(null)} />
      ) : null}
    </PageSection>
  );
}
