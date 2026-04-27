/* src/components/SystemHealth/HealthItem.jsx
   One metric tile inside the System Health grid.
   Props:
     name   - string label
     value  - display value (string | number)
     pct    - 0-100 for progress bar
     ok     - boolean
     color  - bar / value colour
*/
import React from "react";

const HealthItem = ({ name, value, pct, ok, color }) => (
  <div
    style={{
      background:   "var(--bg2)",
      border:       "1px solid var(--border)",
      borderRadius: 8,
      padding:      12,
      textAlign:    "center",
    }}
  >
    {/* label */}
    <div style={{ fontSize: 10, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, fontFamily: "monospace" }}>
      {name}
    </div>

    {/* value */}
    <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "monospace", marginBottom: 4, color }}>
      {value}
    </div>

    {/* ok / warn badge */}
    <span
      style={{
        fontSize:     10,
        fontFamily:   "monospace",
        padding:      "2px 8px",
        borderRadius: 10,
        display:      "inline-block",
        background:   ok ? "rgba(0,255,136,.1)"  : "rgba(255,214,10,.1)",
        color:        ok ? "var(--green)"         : "var(--yellow)",
      }}
    >
      {ok ? "OK" : "WARN"}
    </span>

    {/* progress bar */}
    <div style={{ height: 3, borderRadius: 3, background: "var(--bg0)", marginTop: 8, overflow: "hidden" }}>
      <div
        style={{
          height:       "100%",
          borderRadius: 3,
          background:   color,
          width:        `${Math.min(Math.round(pct), 100)}%`,
          transition:   "width 1s ease",
        }}
      />
    </div>
  </div>
);

export default HealthItem;
