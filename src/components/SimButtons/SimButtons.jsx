/* src/components/SimButtons/SimButtons.jsx
   Row of attack simulation buttons.
   Each one POSTs a real malicious payload to /api/protect/<endpoint>
   which passes through:
     rateLimiter → idsMiddleware (ruleEngine + Gemini AI) → logs it

   Requires an API key to be set (API Keys page).
*/
import React from "react";
import SimButton from "./SimButton";
import { useDashboardCtx } from "../../context/DashboardContext";
import { SIM_BUTTONS } from "../../utils/constants";

const SimButtons = () => {
  const { simulate, simulating, apiKey } = useDashboardCtx();

  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
      {!apiKey && (
        <span style={{ fontSize: 11, color: "var(--yellow)", fontFamily: "monospace", marginRight: 4 }}>
          ⚠ Generate an API key first
        </span>
      )}
      {SIM_BUTTONS.map(({ type, label, hoverHex }) => (
        <SimButton
          key={type}
          label={label}
          hoverHex={hoverHex}
          onClick={() => simulate(type)}
          disabled={simulating || !apiKey}
        />
      ))}
    </div>
  );
};

export default SimButtons;
