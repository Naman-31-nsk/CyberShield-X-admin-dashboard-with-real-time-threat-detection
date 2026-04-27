/* src/components/SimButtons/SimButton.jsx
   Single simulation button — fires a REAL attack payload at /api/protect.
   The backend IDS pipeline (rule engine + Gemini AI) processes it and
   logs the result. The frontend then re-fetches logs to show the event.
*/
import React, { useState } from "react";

const SimButton = ({ label, hoverHex, onClick, disabled }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="Sends a real attack payload to your /api/protect endpoint"
      style={{
        background:    "var(--bg2)",
        border:        `1px solid ${hovered ? hoverHex : "var(--border2)"}`,
        color:         hovered ? hoverHex : "var(--text2)",
        padding:       "7px 14px",
        borderRadius:  6,
        cursor:        disabled ? "not-allowed" : "pointer",
        fontSize:      12,
        fontFamily:    "monospace",
        letterSpacing: ".5px",
        transition:    "all .2s",
        opacity:       disabled ? 0.55 : 1,
        whiteSpace:    "nowrap",
      }}
    >
      {disabled ? "⏳ …" : label}
    </button>
  );
};

export default SimButton;
