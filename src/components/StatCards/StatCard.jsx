/* src/components/StatCards/StatCard.jsx
   Single metric card with accent corner, value and delta row.
   Props:
     label   - string
     value   - number | string
     accent  - CSS color
     delta   - string (e.g. "▲ +127 last hour")
     deltaUp - boolean (red when true, green when false)
*/
import React from "react";
import { fmt } from "../../utils/helpers";

const StatCard = ({ label, value, accent, delta, deltaUp = true }) => (
  <div
    style={{
      background:   "var(--bg1)",
      border:       "1px solid var(--border)",
      borderRadius: 10,
      padding:      16,
      position:     "relative",
      overflow:     "hidden",
    }}
  >
    {/* Corner accent blob */}
    <div
      style={{
        position:     "absolute",
        top:          0,
        right:        0,
        width:        60,
        height:       60,
        borderRadius: "0 10px 0 60px",
        background:   accent,
        opacity:      0.15,
      }}
    />

    <div style={{ fontSize: 11, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "1.5px", fontFamily: "monospace", marginBottom: 8 }}>
      {label}
    </div>

    <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1, fontFamily: "monospace", color: accent }}>
      {typeof value === "number" ? fmt(value) : value}
    </div>

    <div style={{ fontSize: 11, color: deltaUp ? "var(--red)" : "var(--green)", marginTop: 6, fontFamily: "monospace" }}>
      {delta}
    </div>
  </div>
);

export default StatCard;
