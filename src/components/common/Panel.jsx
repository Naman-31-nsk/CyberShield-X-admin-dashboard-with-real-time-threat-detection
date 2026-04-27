/* src/components/common/Panel.jsx
   Base card shell used by every dashboard section.
   Props:
     title    - string, displayed in uppercase
     tag      - small badge text (e.g. "LIVE · 24H")
     action   - optional ReactNode for top-right controls
     children - panel body
     style    - extra styles applied to wrapper
*/
import React from "react";

const Panel = ({ title, tag, action, children, style = {} }) => (
  <div
    style={{
      background:   "var(--bg1)",
      border:       "1px solid var(--border)",
      borderRadius: 10,
      padding:      16,
      ...style,
    }}
  >
    {/* ── Header ── */}
    <div
      style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        marginBottom:   14,
        gap:            8,
      }}
    >
      <span
        style={{
          fontSize:      14,
          fontWeight:    600,
          letterSpacing: ".5px",
          color:         "var(--text1)",
          textTransform: "uppercase",
        }}
      >
        {title}
      </span>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {action}
        {tag && (
          <span
            style={{
              fontSize:   10,
              fontFamily: "monospace",
              padding:    "2px 8px",
              borderRadius: 4,
              background: "rgba(0,212,255,.1)",
              color:      "var(--accent)",
              border:     "1px solid rgba(0,212,255,.2)",
              whiteSpace: "nowrap",
            }}
          >
            {tag}
          </span>
        )}
      </div>
    </div>

    {/* ── Body ── */}
    {children}
  </div>
);

export default Panel;
