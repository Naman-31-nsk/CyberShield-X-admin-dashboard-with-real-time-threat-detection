# CyberShield X — Frontend Documentation

> **Admin dashboard** for a backend cybersecurity system that detects and blocks API attacks in real time.

---

## What is this?

CyberShield X is a React frontend that visualises threats, logs, suspicious IPs, and system health for a Node.js + MongoDB backend API.  
It works in two modes:

| Mode | How it works |
|------|-------------|
| **Demo mode** | Runs offline with seed data. Attack simulation buttons generate fake events locally. No backend needed. |
| **Live mode** | Connects to your Express API at `REACT_APP_API_URL`. All data is real; simulation fires a `POST /api/simulate` request. |

The dashboard switches between modes automatically — if the API is unreachable it falls back to demo data silently.

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| UI framework | React 18 |
| Styling | Tailwind CSS + CSS custom properties |
| Charts | Recharts (AreaChart, PieChart) |
| HTTP | Axios (pre-configured instance in `src/utils/api.js`) |
| State | React Context + custom `useDashboard` hook |
| Fonts | Rajdhani (headings) + JetBrains Mono (data) |

---

## Folder structure

```
src/
├── components/
│   ├── common/          # Panel, Badge, FilterTab, StatusDot
│   ├── Sidebar/         # Sidebar, NavIcon
│   ├── StatCards/       # StatCard, StatCards
│   ├── Charts/          # TimeSeriesChart, AttackDonut, EndpointBars
│   ├── SimButtons/      # SimButton, SimButtons
│   ├── LogsTable/       # LogRow, LogsTable
│   ├── AlertsPanel/     # AlertItem, AlertsPanel
│   ├── IPWatchlist/     # IPRow, IPWatchlist
│   └── SystemHealth/    # HealthItem, SystemHealth
├── pages/
│   ├── Overview/        # Full dashboard
│   ├── Analytics/       # Charts only
│   ├── Logs/            # Expanded log table
│   ├── Watchlist/       # IP management
│   └── Settings/        # Config + feature flags
├── context/             # DashboardContext.jsx
├── hooks/               # useDashboard.js
├── utils/               # api.js  constants.js  helpers.js
└── styles/              # global.css  tokens.js
```

---

## Quick start

```bash
# 1. Install
cd cybershield-frontend
npm install

# 2. Configure (optional — works without it in demo mode)
cp .env.example .env
# Edit .env: set REACT_APP_API_URL=http://localhost:5000/api

# 3. Run
npm start
# Opens at http://localhost:3000
```

---

## Pages

| Page | Route key | Description |
|------|-----------|-------------|
| Overview | `overview` | All panels combined — the main admin view |
| Live Logs | `logs` | Full-page filterable log table |
| Analytics | `analytics` | Time series + donut + endpoint charts |
| IP Watchlist | `watchlist` | IP management + active alerts |
| Settings | `settings` | API config, thresholds, feature toggles |

---

## Further reading

| Document | Location |
|----------|----------|
| Integration guide | `docs/guides/INTEGRATION.md` |
| API reference | `docs/api/API_REFERENCE.md` |
| Component guide | `docs/guides/COMPONENTS.md` |
| Deployment | `docs/guides/DEPLOYMENT.md` |
