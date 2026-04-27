/* src/components/common/Badge.jsx
   Two badge variants:
     <RiskBadge risk="CRITICAL|HIGH|MEDIUM|LOW" />
     <ActionBadge action="BLOCKED|RATE LIMITED|MONITORED|ALLOWED" />
*/
import React from "react";
import { RISK_COLOR, ACTION_COLOR } from "../../utils/constants";

export const RiskBadge = ({ risk }) => {
  const s = RISK_COLOR[risk] || RISK_COLOR.LOW;
  return (
    <span
      style={{
        display:       "inline-block",
        padding:       "2px 8px",
        borderRadius:  4,
        fontSize:      10,
        fontWeight:    600,
        letterSpacing: ".5px",
        fontFamily:    "monospace",
        background:    s.bg,
        color:         s.hex,
        border:        `1px solid ${s.border}`,
      }}
    >
      {risk}
    </span>
  );
};

export const ActionBadge = ({ action }) => {
  const s = ACTION_COLOR[action] || ACTION_COLOR["MONITORED"];
  return (
    <span
      style={{
        display:      "inline-block",
        padding:      "2px 8px",
        borderRadius: 4,
        fontSize:     10,
        fontFamily:   "monospace",
        background:   s.bg,
        color:        s.color,
        border:       `1px solid ${s.border}`,
      }}
    >
      {action}
    </span>
  );
};
