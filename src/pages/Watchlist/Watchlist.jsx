/* src/pages/Watchlist/Watchlist.jsx
   IP list is derived from logs (no /ips endpoint on backend).
   Block/remove actions are local-only (no backend IP management endpoint).
*/
import React from "react";
import IPWatchlist from "../../components/IPWatchlist/IPWatchlist";
import AlertsPanel from "../../components/AlertsPanel/AlertsPanel";

const Watchlist = () => (
  <div className="fade-in">
    <div style={{ marginBottom: 20 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: 1, color: "var(--text1)", margin: 0 }}>IP Watchlist</h1>
      <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "monospace", marginTop: 2 }}>
        IPs extracted from your real log data · block/remove actions are local only
      </div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <IPWatchlist />
      <AlertsPanel />
    </div>
  </div>
);

export default Watchlist;
