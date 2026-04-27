/* src/components/common/FilterTab.jsx
   Horizontal tab strip for filtering lists.
   Props:
     tabs    - [{ key, label }]
     active  - currently active key
     onChange - (key) => void
*/
import React from "react";

const FilterTab = ({ tabs, active, onChange }) => (
  <div style={{ display: "flex", gap: 4 }}>
    {tabs.map(({ key, label }) => (
      <button
        key={key}
        onClick={() => onChange(key)}
        style={{
          padding:      "4px 10px",
          borderRadius: 5,
          fontSize:     11,
          cursor:       "pointer",
          fontFamily:   "monospace",
          letterSpacing:".5px",
          transition:   "all .15s",
          background:   active === key ? "var(--bg2)"   : "transparent",
          border:       active === key ? "1px solid var(--border2)" : "1px solid transparent",
          color:        active === key ? "var(--accent)" : "var(--text3)",
        }}
      >
        {label}
      </button>
    ))}
  </div>
);

export default FilterTab;
