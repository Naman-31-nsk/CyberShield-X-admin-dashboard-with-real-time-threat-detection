/* src/components/Charts/EndpointBars.jsx
   Horizontal bar chart for top targeted endpoints.
   Pure CSS bars — no chart library needed.
*/
import React from "react";
import Panel from "../common/Panel";
import { useDashboardCtx } from "../../context/DashboardContext";
import { fmt } from "../../utils/helpers";

/* colour based on relative hit intensity */
const barColor = (pct) => {
  if (pct > 0.7) return "var(--red)";
  if (pct > 0.4) return "var(--orange)";
  return "var(--accent)";
};

const EndpointBars = () => {
  const { endpoints } = useDashboardCtx();

  const max = endpoints.length ? Math.max(...endpoints.map((e) => e.count)) : 1;

  return (
    <Panel title="Targeted Endpoints" tag="TOP 7">
      {endpoints.map((ep) => {
        const pct = ep.count / max;
        return (
          <div
            key={ep.name}
            style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, fontSize: 12, fontFamily: "monospace" }}
          >
            {/* endpoint name */}
            <div
              title={ep.name}
              style={{ color: "var(--text2)", width: 130, flexShrink: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
            >
              {ep.name}
            </div>

            {/* track + fill */}
            <div style={{ flex: 1, height: 6, background: "var(--bg0)", borderRadius: 3, overflow: "hidden" }}>
              <div
                style={{
                  height:     "100%",
                  borderRadius: 3,
                  background: barColor(pct),
                  width:      `${Math.round(pct * 100)}%`,
                  transition: "width .5s ease",
                }}
              />
            </div>

            {/* hit count */}
            <div style={{ color: "var(--text3)", width: 44, textAlign: "right" }}>
              {fmt(ep.count)}
            </div>
          </div>
        );
      })}

      {endpoints.length === 0 && (
        <div style={{ color: "var(--text3)", fontSize: 12, fontFamily: "monospace", textAlign: "center", padding: 24 }}>
          No endpoint data yet
        </div>
      )}
    </Panel>
  );
};

export default EndpointBars;
