/* src/pages/Overview/Overview.jsx
   Primary dashboard view combining all sections.
*/
import React, { useState, useEffect } from "react";
import StatCards       from "../../components/StatCards/StatCards";
import SimButtons      from "../../components/SimButtons/SimButtons";
import TimeSeriesChart from "../../components/Charts/TimeSeriesChart";
import AttackDonut     from "../../components/Charts/AttackDonut";
import EndpointBars    from "../../components/Charts/EndpointBars";
import LogsTable       from "../../components/LogsTable/LogsTable";
import AlertsPanel     from "../../components/AlertsPanel/AlertsPanel";
import IPWatchlist     from "../../components/IPWatchlist/IPWatchlist";
import SystemHealth    from "../../components/SystemHealth/SystemHealth";

const LiveClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "monospace", marginTop: 2 }}>
      {time.toLocaleString("en", { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}
    </div>
  );
};

const Overview = () => (
  <div className="fade-in">
    {/* ── Page header ── */}
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, gap: 12 }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: 1, color: "var(--text1)", margin: 0 }}>Security Overview</h1>
        <LiveClock />
      </div>
      <SimButtons />
    </div>

    {/* ── Stat cards ── */}
    <StatCards />

    {/* ── Charts row ── */}
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14, marginBottom: 20 }}>
      <TimeSeriesChart />
      <AttackDonut />
    </div>

    {/* ── Endpoints + Alerts ── */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
      <EndpointBars />
      <AlertsPanel />
    </div>

    {/* ── Logs table ── */}
    <LogsTable />

    {/* ── IP Watchlist + System Health ── */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <IPWatchlist />
      <SystemHealth />
    </div>
  </div>
);

export default Overview;
