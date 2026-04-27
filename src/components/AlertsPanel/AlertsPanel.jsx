/* src/components/AlertsPanel/AlertsPanel.jsx
   Scrollable list of real-time security alerts
   with resolve-all and per-item resolve.
*/
import React from "react";
import Panel     from "../common/Panel";
import AlertItem from "./AlertItem";
import { useDashboardCtx } from "../../context/DashboardContext";

const AlertsPanel = () => {
  const { alerts, resolveAlert, resolveAll } = useDashboardCtx();

  const countBadge = (
    <span style={{ fontSize: 10, fontFamily: "monospace", padding: "2px 8px", borderRadius: 4, background: "rgba(255,59,92,.15)", color: "var(--red)", border: "1px solid rgba(255,59,92,.3)" }}>
      {alerts.length} ACTIVE
    </span>
  );

  const clearBtn = alerts.length > 0 && (
    <button
      onClick={resolveAll}
      style={{ background: "transparent", border: "1px solid var(--border2)", color: "var(--text3)", fontSize: 10, padding: "2px 8px", borderRadius: 4, cursor: "pointer", fontFamily: "monospace" }}
    >
      Clear All
    </button>
  );

  return (
    <Panel
      title="Real-Time Alerts"
      action={
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {clearBtn}
          {countBadge}
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 300, overflowY: "auto" }}>
        {alerts.length === 0 && (
          <div style={{ textAlign: "center", color: "var(--text3)", fontSize: 12, fontFamily: "monospace", padding: 28 }}>
            No active alerts — system clean
          </div>
        )}
        {alerts.map((alert, i) => (
          <AlertItem key={alert._id || i} alert={alert} onResolve={resolveAlert} />
        ))}
      </div>
    </Panel>
  );
};

export default AlertsPanel;
