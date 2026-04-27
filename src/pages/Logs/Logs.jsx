/* src/pages/Logs/Logs.jsx
   Full-page live logs view.
*/
import React from "react";
import LogsTable  from "../../components/LogsTable/LogsTable";
import SimButtons from "../../components/SimButtons/SimButtons";

const Logs = () => (
  <div className="fade-in">
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, gap: 12 }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: 1, color: "var(--text1)", margin: 0 }}>Live Logs</h1>
        <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "monospace", marginTop: 2 }}>
          Real-time API request log — auto-updates on each attack
        </div>
      </div>
      <SimButtons />
    </div>
    <LogsTable />
  </div>
);

export default Logs;
