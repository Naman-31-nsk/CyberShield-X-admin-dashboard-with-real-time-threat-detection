/* src/App.jsx */
import React, { useState } from "react";
import { DashboardProvider } from "./context/DashboardContext";
import Sidebar   from "./components/Sidebar/Sidebar";
import Overview  from "./pages/Overview/Overview";
import Analytics from "./pages/Analytics/Analytics";
import Watchlist from "./pages/Watchlist/Watchlist";
import APIKeys   from "./pages/APIKeys/APIKeys";
import Settings  from "./pages/Settings/Settings";
import "./styles/global.css";

/* Live Logs page removed from routing */
const PAGES = {
  overview:  Overview,
  analytics: Analytics,
  watchlist: Watchlist,
  apikeys:   APIKeys,
  settings:  Settings,
};

const App = () => {
  const [activePage, setActivePage] = useState("apikeys");
  const Page = PAGES[activePage] || Overview;

  return (
    <DashboardProvider>
      <div className="scan-line" aria-hidden="true" />
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <Sidebar activePage={activePage} onNavigate={setActivePage} />
        <main style={{ flex: 1, overflowY: "auto", background: "var(--bg0)", padding: 20 }}>
          <Page />
        </main>
      </div>
    </DashboardProvider>
  );
};

export default App;
