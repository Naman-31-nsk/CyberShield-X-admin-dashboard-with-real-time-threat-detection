/* src/pages/Settings/SettingsField.jsx
   Labelled text/number input for settings forms.
   Props:
     label        - string
     defaultValue - string | number
     type         - input type (default "text")
     mono         - boolean, use mono font
*/
import React, { useState } from "react";

const SettingsField = ({ label, defaultValue = "", type = "text", mono = false }) => {
  const [val, setVal] = useState(defaultValue);

  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 11, color: "var(--text3)", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: 1, marginBottom: 5 }}>
        {label}
      </label>
      <input
        type={type}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        style={{
          width:        "100%",
          background:   "var(--bg2)",
          border:       "1px solid var(--border2)",
          borderRadius: 6,
          padding:      "8px 12px",
          color:        "var(--text1)",
          fontFamily:   mono ? "monospace" : "inherit",
          fontSize:     13,
          outline:      "none",
        }}
      />
    </div>
  );
};

export default SettingsField;
