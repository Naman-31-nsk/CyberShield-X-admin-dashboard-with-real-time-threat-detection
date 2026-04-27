/* src/pages/Settings/ToggleRow.jsx
   A labelled on/off toggle used throughout Settings.
   Props:
     label       - string
     description - string
     defaultOn   - boolean
*/
import React, { useState } from "react";

const ToggleRow = ({ label, description, defaultOn = false }) => {
  const [on, setOn] = useState(defaultOn);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 0", borderBottom: "1px solid var(--border)" }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text1)" }}>{label}</div>
        <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "monospace", marginTop: 2 }}>{description}</div>
      </div>

      {/* pill toggle */}
      <div
        onClick={() => setOn(!on)}
        style={{ width: 40, height: 22, borderRadius: 11, cursor: "pointer", background: on ? "var(--green)" : "var(--bg3)", border: "1px solid var(--border2)", position: "relative", transition: "background .2s", flexShrink: 0 }}
      >
        <div style={{ position: "absolute", top: 2, left: on ? 18 : 2, width: 16, height: 16, borderRadius: "50%", background: on ? "#080c14" : "var(--text3)", transition: "left .2s" }} />
      </div>
    </div>
  );
};

export default ToggleRow;
