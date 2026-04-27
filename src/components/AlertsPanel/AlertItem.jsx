/* src/components/AlertsPanel/AlertItem.jsx
   Single alert row inside the alerts panel.
   Props:
     alert     - alert object
     onResolve - (id) => void
*/
import React from "react";
import { formatTime } from "../../utils/helpers";

const TYPE_META = {
  sqli:  { icon: "⚡", bg: "rgba(255,59,92,.15)"   },
  xss:   { icon: "⚠",  bg: "rgba(255,122,47,.15)"  },
  brute: { icon: "🔓", bg: "rgba(255,214,10,.10)"  },
  bot:   { icon: "🤖", bg: "rgba(168,85,247,.15)"  },
  scan:  { icon: "🔍", bg: "rgba(0,212,255,.12)"   },
};

const AlertItem = ({ alert, onResolve }) => {
  const meta = TYPE_META[alert.type] || TYPE_META.sqli;
  const ts   = alert.timestamp ? formatTime(alert.timestamp) : "now";

  return (
    <div
      className="slide-down"
      style={{
        display:      "flex",
        alignItems:   "flex-start",
        gap:          10,
        padding:      10,
        borderRadius: 7,
        border:       "1px solid var(--border)",
        background:   "var(--bg2)",
      }}
    >
      {/* icon */}
      <div style={{ width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, background: meta.bg }}>
        {meta.icon}
      </div>

      {/* text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text1)", marginBottom: 2 }}>
          {alert.title}
        </div>
        <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "monospace", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {alert.detail}
        </div>
      </div>

      {/* time + resolve */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
        <span style={{ fontSize: 10, color: "var(--text3)", fontFamily: "monospace" }}>{ts}</span>
        {onResolve && alert._id && (
          <button
            onClick={() => onResolve(alert._id)}
            style={{ background: "transparent", border: "1px solid var(--border)", color: "var(--text3)", fontSize: 9, padding: "1px 5px", borderRadius: 3, cursor: "pointer", fontFamily: "monospace" }}
          >
            Resolve
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertItem;
