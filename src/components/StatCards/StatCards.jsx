/* src/components/StatCards/StatCards.jsx
   Stats are DERIVED from /api/logs (no /stats endpoint on backend).
   totalThreats    = BLOCKED + FLAGGED count
   blockedRequests = BLOCKED count
   uniqueIPs       = distinct IPs in logs
   activeAlerts    = BLOCKED entries with HIGH risk
*/
import React from "react";
import StatCard from "./StatCard";
import { useDashboardCtx } from "../../context/DashboardContext";

const CARD_CONFIG = [
  { key: "totalThreats",    label: "Total Threats",    accent: "#ff3b5c", delta: "▲ from live logs",     deltaUp: true  },
  { key: "blockedRequests", label: "Blocked Requests", accent: "#00d4ff", delta: "▼ hard blocked by IDS", deltaUp: false },
  { key: "uniqueIPs",       label: "Unique IPs",       accent: "#ff7a2f", delta: "▲ distinct sources",    deltaUp: true  },
  { key: "activeAlerts",    label: "Active Alerts",    accent: "#ffd60a", delta: "▲ HIGH risk blocked",   deltaUp: true  },
];

const StatCards = () => {
  const { stats } = useDashboardCtx();
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
      {CARD_CONFIG.map(({ key, label, accent, delta, deltaUp }) => (
        <StatCard key={key} label={label} value={stats[key] ?? 0} accent={accent} delta={delta} deltaUp={deltaUp} />
      ))}
    </div>
  );
};

export default StatCards;
