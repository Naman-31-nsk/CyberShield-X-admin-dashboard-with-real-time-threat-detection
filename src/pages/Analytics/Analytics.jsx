/* src/pages/Analytics/Analytics.jsx
   Focused analytics view with all three charts expanded.
*/
import React from "react";
import TimeSeriesChart from "../../components/Charts/TimeSeriesChart";
import AttackDonut     from "../../components/Charts/AttackDonut";
import EndpointBars    from "../../components/Charts/EndpointBars";
import SimButtons      from "../../components/SimButtons/SimButtons";

const Analytics = () => (
  <div className="fade-in">
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, gap: 12 }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: 1, color: "var(--text1)", margin: 0 }}>Analytics</h1>
        <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "monospace", marginTop: 2 }}>
          Attack patterns, distribution, and targeted endpoints
        </div>
      </div>
      <SimButtons />
    </div>

    {/* full-width timeseries */}
    <div style={{ marginBottom: 20 }}>
      <TimeSeriesChart />
    </div>

    {/* donut + endpoint bars side by side */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <AttackDonut />
      <EndpointBars />
    </div>
  </div>
);

export default Analytics;
