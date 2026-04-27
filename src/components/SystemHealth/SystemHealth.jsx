/* src/components/SystemHealth/SystemHealth.jsx
   Health metrics derived from log data (no /health endpoint).
   reqPerMin is computed from logs in the last 60 seconds.
*/
import React from "react";
import Panel      from "../common/Panel";
import HealthItem from "./HealthItem";
import { useDashboardCtx } from "../../context/DashboardContext";

const buildItems = (health, logs) => {
  const reqPerMin = health?.reqPerMin ?? 0;
  const blocked   = logs.filter((l) => l.action === "BLOCKED").length;
  const total     = logs.length || 1;
  const blockRate = Math.round((blocked / total) * 100);

  return [
    { name: "API Engine",  value: "ONLINE",      pct: 100,       ok: true,              color: "var(--green)"  },
    { name: "IDS Engine",  value: "ACTIVE",       pct: 100,       ok: true,              color: "var(--green)"  },
    { name: "Gemini AI",   value: "CONNECTED",    pct: 100,       ok: true,              color: "var(--accent)" },
    { name: "Req / Min",   value: reqPerMin,      pct: Math.min((reqPerMin / 20) * 100, 100), ok: reqPerMin < 10, color: reqPerMin < 10 ? "var(--green)" : "var(--orange)" },
    { name: "Block Rate",  value: `${blockRate}%`,pct: blockRate, ok: blockRate > 0,     color: blockRate > 50 ? "var(--red)" : "var(--accent)" },
    { name: "Total Logs",  value: total - 1,      pct: Math.min(((total-1) / 100) * 100, 100), ok: true, color: "var(--green)" },
  ];
};

const SystemHealth = () => {
  const { health, logs } = useDashboardCtx();
  const items = buildItems(health, logs);
  const allOk  = items.every((i) => i.ok);

  return (
    <Panel title="System Health" tag={allOk ? "ALL SYSTEMS OK" : "UNDER LOAD"}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
        {items.map((item) => <HealthItem key={item.name} {...item} />)}
      </div>
    </Panel>
  );
};

export default SystemHealth;
