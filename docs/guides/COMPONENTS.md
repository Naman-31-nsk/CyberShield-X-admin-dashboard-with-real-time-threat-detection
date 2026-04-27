# Component Guide — CyberShield X

Every component is self-contained in its own folder with a clear single responsibility.  
All data comes from `DashboardContext` — components never fetch data themselves.

---

## Common components (`src/components/common/`)

### `Panel`
Base card shell used by every dashboard section.

```jsx
import Panel from "../common/Panel";

<Panel title="My Section" tag="LIVE">
  {/* children */}
</Panel>
```

| Prop | Type | Description |
|------|------|-------------|
| `title` | string | Displayed in uppercase header |
| `tag` | string | Small badge on the right of the header |
| `action` | ReactNode | Optional controls (buttons, tabs) placed left of tag |
| `children` | ReactNode | Panel body |
| `style` | object | Extra styles on the wrapper div |

---

### `RiskBadge` / `ActionBadge`
Coloured pill labels for risk levels and actions.

```jsx
import { RiskBadge, ActionBadge } from "../common/Badge";

<RiskBadge risk="CRITICAL" />   // red
<RiskBadge risk="HIGH" />       // orange
<RiskBadge risk="MEDIUM" />     // yellow
<RiskBadge risk="LOW" />        // green

<ActionBadge action="BLOCKED" />       // red
<ActionBadge action="RATE LIMITED" />  // yellow
<ActionBadge action="MONITORED" />     // cyan
<ActionBadge action="ALLOWED" />       // green
```

---

### `FilterTab`
Horizontal tab strip for filtering lists.

```jsx
import FilterTab from "../common/FilterTab";

<FilterTab
  tabs={[{ key: "all", label: "All" }, { key: "sqli", label: "SQL" }]}
  active="all"
  onChange={(key) => setFilter(key)}
/>
```

---

### `StatusDot`
Small coloured indicator dot, optionally pulsing.

```jsx
import StatusDot from "../common/StatusDot";

<StatusDot color="var(--green)" pulse />   // pulsing green
<StatusDot color="var(--red)"   size={8} />
```

---

## Sidebar (`src/components/Sidebar/`)

### `Sidebar`
Left navigation rail. Reads `stats.activeAlerts` from context to show the badge.

```jsx
<Sidebar activePage="overview" onNavigate={(key) => setPage(key)} />
```

### `NavIcon`
Internal — renders a 16×16 SVG icon for a given nav key. Used only by Sidebar.

---

## StatCards (`src/components/StatCards/`)

### `StatCards`
Renders the 4-card grid. No props — reads `stats` from context.

### `StatCard`
Single metric card. Used by `StatCards`.

| Prop | Type | Description |
|------|------|-------------|
| `label` | string | Small uppercase label |
| `value` | number \| string | Big number displayed |
| `accent` | CSS color | Corner blob + value colour |
| `delta` | string | Small status line below value |
| `deltaUp` | boolean | Red when `true`, green when `false` |

---

## Charts (`src/components/Charts/`)

### `TimeSeriesChart`
24-hour area chart (attacks vs blocked). Reads `timeSeries` from context.

### `AttackDonut`
Donut chart of attack-type distribution. Reads `distribution` from context.

### `EndpointBars`
CSS progress bars for top targeted endpoints. Reads `endpoints` from context.

All three charts include fallback demo data when the array from context is empty.

---

## SimButtons (`src/components/SimButtons/`)

### `SimButtons`
Row of four attack demo buttons. Reads `simulate` and `simulating` from context.

### `SimButton`
Single button with hover colour. Props: `label`, `hoverHex`, `onClick`, `disabled`.

---

## LogsTable (`src/components/LogsTable/`)

### `LogsTable`
Filterable table with per-type tabs. Reads `logs` from context.  
Shows up to 25 rows; new rows flash cyan on entry.

### `LogRow`
Single table row. Props: `log` object.

---

## AlertsPanel (`src/components/AlertsPanel/`)

### `AlertsPanel`
Scrollable list with "Clear All" and per-item "Resolve" buttons.  
Reads `alerts`, `resolveAlert`, `resolveAll` from context.

### `AlertItem`
Single alert card. Props: `alert`, `onResolve`.

---

## IPWatchlist (`src/components/IPWatchlist/`)

### `IPWatchlist`
Filterable IP list with Block and Remove actions.  
Reads `ips`, `blockIP`, `removeIP` from context.

### `IPRow`
Single IP row. Props: `ip`, `onBlock`, `onRemove`.

---

## SystemHealth (`src/components/SystemHealth/`)

### `SystemHealth`
3×2 grid of metric tiles. Reads `health` from context.  
Falls back to demo values when health is `null`.

### `HealthItem`
Single tile. Props: `name`, `value`, `pct`, `ok`, `color`.

---

## How to add a new component

1. Create a folder: `src/components/MyWidget/`
2. Add `MyWidget.jsx` with the component
3. If it needs dashboard data, import from context:
   ```js
   import { useDashboardCtx } from "../../context/DashboardContext";
   const { logs } = useDashboardCtx();
   ```
4. Drop it into any page under `src/pages/`.

---

## Design tokens

All colours reference CSS variables defined in `src/styles/global.css`:

| Variable | Value | Use |
|----------|-------|-----|
| `--bg0` | `#080c14` | Page background |
| `--bg1` | `#0d1421` | Panel background |
| `--bg2` | `#111927` | Inner card / row |
| `--accent` | `#00d4ff` | Cyan highlight |
| `--red` | `#ff3b5c` | Threats / blocked |
| `--orange` | `#ff7a2f` | High risk |
| `--yellow` | `#ffd60a` | Medium risk |
| `--green` | `#00ff88` | Safe / OK |
| `--purple` | `#a855f7` | Bot traffic |
| `--text1` | `#e2eaf5` | Primary text |
| `--text2` | `#8ba0bc` | Secondary text |
| `--text3` | `#4a6080` | Muted / labels |
