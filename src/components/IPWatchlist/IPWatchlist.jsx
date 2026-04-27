/* src/components/IPWatchlist/IPWatchlist.jsx
   Filterable list of blocked and monitored IPs
   with block / remove actions.
*/
import React, { useState } from "react";
import Panel   from "../common/Panel";
import FilterTab from "../common/FilterTab";
import IPRow   from "./IPRow";
import { useDashboardCtx } from "../../context/DashboardContext";

const TABS = [
  { key: "all",     label: "All"     },
  { key: "blocked", label: "Blocked" },
  { key: "watch",   label: "Watch"   },
];

const IPWatchlist = () => {
  const { ips, blockIP, removeIP } = useDashboardCtx();
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? ips : ips.filter((ip) => ip.status === filter);

  return (
    <Panel
      title="IP Watchlist"
      action={<FilterTab tabs={TABS} active={filter} onChange={setFilter} />}
      tag={`${ips.length} IPs`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 300, overflowY: "auto" }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", color: "var(--text3)", fontSize: 12, fontFamily: "monospace", padding: 28 }}>
            No IPs in this category
          </div>
        )}
        {filtered.map((ip, i) => (
          <IPRow key={ip.ip || i} ip={ip} onBlock={blockIP} onRemove={removeIP} />
        ))}
      </div>
    </Panel>
  );
};

export default IPWatchlist;
