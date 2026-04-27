/* src/components/IPWatchlist/IPRow.jsx
   One row in the IP watchlist.
   Props:
     ip       - ip record object
     onBlock  - (ip) => void
     onRemove - (ip) => void
*/
import React from "react";
import { fmt } from "../../utils/helpers";

const IPRow = ({ ip, onBlock, onRemove }) => {
  const isBlocked = ip.status === "blocked";

  return (
    <div
      style={{
        display:      "flex",
        alignItems:   "center",
        gap:          10,
        padding:      "8px 10px",
        borderRadius: 6,
        background:   "var(--bg2)",
        border:       "1px solid var(--border)",
        fontFamily:   "monospace",
        fontSize:     12,
      }}
    >
      {/* status dot */}
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: isBlocked ? "var(--red)" : "var(--yellow)", flexShrink: 0 }} />

      {/* ip address */}
      <span style={{ color: "var(--text1)", fontWeight: 500, flex: 1 }}>{ip.ip}</span>

      {/* country */}
      <span style={{ color: "var(--text3)", fontSize: 10, width: 24 }}>{ip.country}</span>

      {/* hit count */}
      <span style={{ color: "var(--text2)", fontSize: 11, marginRight: 4 }}>{fmt(ip.hits)} hits</span>

      {/* status badge */}
      <span
        style={{
          fontSize:     10,
          padding:      "2px 7px",
          borderRadius: 4,
          background:   isBlocked ? "rgba(255,59,92,.15)"  : "rgba(255,214,10,.10)",
          color:        isBlocked ? "var(--red)"            : "var(--yellow)",
          border:       isBlocked ? "1px solid rgba(255,59,92,.3)" : "1px solid rgba(255,214,10,.25)",
        }}
      >
        {ip.status?.toUpperCase()}
      </span>

      {/* action buttons */}
      <div style={{ display: "flex", gap: 4 }}>
        {!isBlocked && (
          <button
            onClick={() => onBlock(ip.ip)}
            style={{ background: "rgba(255,59,92,.1)", border: "1px solid rgba(255,59,92,.2)", color: "var(--red)", fontSize: 10, padding: "1px 6px", borderRadius: 3, cursor: "pointer" }}
          >
            Block
          </button>
        )}
        <button
          onClick={() => onRemove(ip.ip)}
          style={{ background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--text3)", fontSize: 10, padding: "1px 6px", borderRadius: 3, cursor: "pointer" }}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default IPRow;
