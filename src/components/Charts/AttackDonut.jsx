/* src/components/Charts/AttackDonut.jsx
   Donut chart showing attack-type distribution.
   Uses Recharts PieChart.
*/
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Panel from "../common/Panel";
import { useDashboardCtx } from "../../context/DashboardContext";

const PALETTE = ["#ff3b5c", "#ff7a2f", "#ffd60a", "#a855f7", "#00d4ff"];
const LABEL_MAP = {
  sqli:  "SQL Injection",
  xss:   "XSS",
  brute: "Brute Force",
  bot:   "Bot Traffic",
  scan:  "Port Scan",
};

/* ── Tooltip ─────────────────────────────────────────── */
const CyberTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div style={{ background: "#111927", border: "1px solid #1e2d4a", borderRadius: 6, padding: "6px 10px", fontFamily: "monospace", fontSize: 12, color: "var(--text1)" }}>
      {name}: <strong>{value}</strong>
    </div>
  );
};

/* ── Component ───────────────────────────────────────── */
const AttackDonut = () => {
  const { distribution } = useDashboardCtx();

  const data = distribution.map((d, i) => ({
    name:  LABEL_MAP[d._id] || d._id,
    value: d.count,
    color: PALETTE[i % PALETTE.length],
  }));

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <Panel title="Attack Types" tag="DISTRIBUTION">
      {/* Custom legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
        {data.map(({ name, value, color }) => (
          <span
            key={name}
            style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "var(--text2)", fontFamily: "monospace" }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 2, background: color, flexShrink: 0 }} />
            {name} {total ? Math.round((value / total) * 100) : 0}%
          </span>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={42}
            outerRadius={68}
            dataKey="value"
            paddingAngle={2}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke="#080c14" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip content={<CyberTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </Panel>
  );
};

export default AttackDonut;
