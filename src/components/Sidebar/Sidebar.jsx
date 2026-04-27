/* src/components/Sidebar/Sidebar.jsx
   Left navigation rail.
   Props:
     activePage  - string key of current page
     onNavigate  - (key) => void
*/
import React from "react";
import { NAV_ITEMS } from "../../utils/constants";
import { useDashboardCtx } from "../../context/DashboardContext";
import NavIcon  from "./NavIcon";
import StatusDot from "../common/StatusDot";

const Sidebar = ({ activePage, onNavigate }) => {
  const { stats } = useDashboardCtx();

  return (
    <aside
      style={{
        width:        220,
        minWidth:     220,
        background:   "var(--bg1)",
        borderRight:  "1px solid var(--border)",
        display:      "flex",
        flexDirection:"column",
        height:       "100vh",
      }}
    >
      {/* ── Logo ── */}
      <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: 2, color: "var(--accent)", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6 }}>
          <StatusDot color="var(--green)" pulse size={8} />
          CyberShield
        </div>
        <div style={{ fontSize: 11, color: "var(--text3)", letterSpacing: 1, fontFamily: "monospace", marginTop: 3 }}>
          v3.1.0 · ADMIN PANEL
        </div>
      </div>

      {/* ── Nav ── */}
      <nav style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
        {NAV_ITEMS.map(({ key, label }) => {
          const isActive = activePage === key;
          return (
            <div
              key={key}
              onClick={() => onNavigate(key)}
              style={{
                display:     "flex",
                alignItems:  "center",
                gap:         10,
                padding:     "10px 16px",
                cursor:      "pointer",
                color:       isActive ? "var(--accent)" : "var(--text2)",
                background:  isActive ? "linear-gradient(90deg,rgba(0,212,255,.08),transparent)" : "transparent",
                borderLeft:  isActive ? "2px solid var(--accent)" : "2px solid transparent",
                fontSize:    14,
                fontWeight:  500,
                letterSpacing: ".5px",
                transition:  "all .15s",
              }}
            >
              <NavIcon id={key} />
              {label}
              {key === "overview" && stats.activeAlerts > 0 && (
                <span style={{ marginLeft: "auto", background: "var(--red)", color: "#fff", fontSize: 10, padding: "1px 6px", borderRadius: 10, fontFamily: "monospace" }}>
                  {stats.activeAlerts}
                </span>
              )}
            </div>
          );
        })}
      </nav>

      {/* ── System status ── */}
      <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)" }}>
        {[
          { label: "API Engine Online", color: "var(--green)" },
          { label: "DB Connected",      color: "var(--green)" },
          { label: "Polling Active",    color: "var(--yellow)"},
        ].map(({ label, color }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "var(--text2)", fontFamily: "monospace", marginBottom: 5 }}>
            <StatusDot color={color} />
            {label}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
