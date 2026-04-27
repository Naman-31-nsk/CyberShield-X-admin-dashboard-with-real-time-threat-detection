/* src/components/LogsTable/LogsTable.jsx
   Filterable table backed by real /api/logs data.
   Filter keys match backend `type` field values.
*/
import React, { useState } from "react";
import Panel     from "../common/Panel";
import FilterTab from "../common/FilterTab";
import LogRow    from "./LogRow";
import { useDashboardCtx } from "../../context/DashboardContext";

const TABS = [
  { key: "all",               label: "All"       },
  { key: "SQL_INJECTION",     label: "SQLi"      },
  { key: "XSS",               label: "XSS"       },
  { key: "COMMAND_INJECTION", label: "CmdInject" },
  { key: "PATH_TRAVERSAL",    label: "PathTraversal" },
  { key: "RATE_LIMIT_EXCEEDED",label: "RateLimit" },
  { key: "NORMAL",            label: "Normal"    },
];

const TH = ({ children }) => (
  <th style={{ textAlign: "left", padding: "8px 10px", color: "var(--text3)", fontWeight: 500, letterSpacing: ".5px", borderBottom: "1px solid var(--border)", textTransform: "uppercase", fontSize: 10, fontFamily: "monospace", whiteSpace: "nowrap" }}>
    {children}
  </th>
);

const LogsTable = () => {
  const { logs, fetchLogs } = useDashboardCtx();
  const [filter, setFilter]  = useState("all");

  const filtered = filter === "all" ? logs : logs.filter((l) => l.attackType === filter);

  const countTag = (
    <span style={{ fontSize: 10, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "rgba(0,212,255,.1)", color: "var(--accent)", border: "1px solid rgba(0,212,255,.2)" }}>
      {filtered.length} ENTRIES
    </span>
  );

  const refreshBtn = (
    <button onClick={fetchLogs} style={{ background: "var(--bg2)", border: "1px solid var(--border2)", color: "var(--text3)", fontSize: 10, padding: "2px 8px", borderRadius: 4, cursor: "pointer", fontFamily: "monospace" }}>
      ↻ Refresh
    </button>
  );

  return (
    <Panel
      title="Live Request Log"
      action={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {refreshBtn}
          <FilterTab tabs={TABS} active={filter} onChange={setFilter} />
          {countTag}
        </div>
      }
      style={{ marginBottom: 20 }}
    >
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Time", "IP Address", "Endpoint", "Attack Type", "Risk Level", "Action"].map((h) => (
                <TH key={h}>{h}</TH>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 30).map((log, i) => (
              <LogRow key={log._id || i} log={log} />
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: 28, textAlign: "center", color: "var(--text3)", fontSize: 12, fontFamily: "monospace" }}>
                  {logs.length === 0
                    ? "No logs yet — generate an API key, then simulate an attack"
                    : "No logs match this filter"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Panel>
  );
};

export default LogsTable;
