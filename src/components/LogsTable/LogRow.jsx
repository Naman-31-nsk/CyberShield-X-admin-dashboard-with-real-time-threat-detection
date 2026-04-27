/* src/components/LogsTable/LogRow.jsx
   Single row — uses backend field names:
     type   → attackType/attackLabel
     action → BLOCKED | FLAGGED | ALLOWED
     risk   → HIGH | MEDIUM | LOW
*/
import React from "react";
import { RiskBadge, ActionBadge } from "../common/Badge";
import { formatTime } from "../../utils/helpers";

const TD = ({ children, style = {} }) => (
  <td style={{
    padding: "8px 10px",
    borderBottom: "1px solid rgba(30,45,74,.5)",
    color: "var(--text2)", verticalAlign: "middle",
    fontSize: 12, fontFamily: "monospace", ...style,
  }}>
    {children}
  </td>
);

const LogRow = ({ log }) => (
  <tr className={log.isNew ? "flash-row" : ""}>
    <TD>{formatTime(log.timestamp)}</TD>
    <TD style={{ color: "var(--accent)" }}>{log.ip}</TD>
    <TD style={{ maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{log.endpoint}</TD>
    <TD style={{ color: log.color || "var(--text2)", fontWeight: 600 }}>{log.attackLabel}</TD>
    <TD><RiskBadge risk={log.riskLevel || "LOW"} /></TD>
    <TD><ActionBadge action={log.action} /></TD>
  </tr>
);

export default LogRow;
