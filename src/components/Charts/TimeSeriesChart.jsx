/* src/components/Charts/TimeSeriesChart.jsx
   24-hour area chart showing attacks vs blocked requests.
   Uses Recharts AreaChart.
*/
import React from "react";
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import Panel from "../common/Panel";
import { useDashboardCtx } from "../../context/DashboardContext";

/* ── Custom tooltip ─────────────────────────────────── */
const CyberTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#111927", border: "1px solid #1e2d4a", borderRadius: 6, padding: "8px 12px", fontFamily: "monospace", fontSize: 12 }}>
      <div style={{ color: "var(--text2)", marginBottom: 4 }}>{label}</div>
      {payload.map((p) => (
        <div key={p.name} style={{ color: p.color }}>
          {p.name}: <strong>{p.value}</strong>
        </div>
      ))}
    </div>
  );
};

/* ── Legend row ─────────────────────────────────────── */
const Legend = () => (
  <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
    {[
      { color: "#ff3b5c", label: "Attacks",       dash: false },
      { color: "#00d4ff", label: "Blocked",        dash: true  },
    ].map(({ color, label, dash }) => (
      <span key={label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text2)", fontFamily: "monospace" }}>
        <svg width="18" height="8">
          {dash
            ? <line x1="0" y1="4" x2="18" y2="4" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" />
            : <line x1="0" y1="4" x2="18" y2="4" stroke={color} strokeWidth="2" />}
        </svg>
        {label}
      </span>
    ))}
  </div>
);

/* ── Component ──────────────────────────────────────── */
const TimeSeriesChart = () => {
  const { timeSeries } = useDashboardCtx();

  return (
    <Panel title="Attacks Over Time" tag="LIVE · 24H">
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={timeSeries} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gradAttacks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#ff3b5c" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ff3b5c" stopOpacity={0}   />
            </linearGradient>
            <linearGradient id="gradBlocked" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#00d4ff" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}   />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,45,74,.6)" />

          <XAxis
            dataKey="hour"
            tick={{ fill: "#4a6080", fontSize: 10, fontFamily: "monospace" }}
            tickLine={false}
            interval={3}
          />
          <YAxis
            tick={{ fill: "#4a6080", fontSize: 10, fontFamily: "monospace" }}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip content={<CyberTooltip />} />

          <Area
            type="monotone"
            dataKey="attacks"
            name="Attacks"
            stroke="#ff3b5c"
            strokeWidth={2}
            fill="url(#gradAttacks)"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="blocked"
            name="Blocked"
            stroke="#00d4ff"
            strokeWidth={1.5}
            fill="url(#gradBlocked)"
            dot={false}
            strokeDasharray="4 4"
          />
        </AreaChart>
      </ResponsiveContainer>
      <Legend />
    </Panel>
  );
};

export default TimeSeriesChart;
