/* src/utils/constants.js */

export const ATTACK_TYPES = {
  SQL_INJECTION:      { label: "SQL Injection",    color: "#ff3b5c", risk: "HIGH"   },
  XSS:                { label: "XSS",              color: "#ff7a2f", risk: "HIGH"   },
  COMMAND_INJECTION:  { label: "Cmd Injection",    color: "#ffd60a", risk: "HIGH"   },
  PATH_TRAVERSAL:     { label: "Path Traversal",   color: "#a855f7", risk: "MEDIUM" },
  RATE_LIMIT_EXCEEDED:{ label: "Rate Limit",       color: "#00d4ff", risk: "MEDIUM" },
  NORMAL:             { label: "Normal",            color: "#00ff88", risk: "LOW"    },
  SUSPICIOUS:         { label: "Suspicious (AI)",  color: "#ff7a2f", risk: "MEDIUM" },
};

export const RISK_COLOR = {
  HIGH:     { hex: "#ff3b5c", bg: "rgba(255,59,92,.15)",  border: "rgba(255,59,92,.3)"   },
  MEDIUM:   { hex: "#ffd60a", bg: "rgba(255,214,10,.12)", border: "rgba(255,214,10,.25)" },
  LOW:      { hex: "#00ff88", bg: "rgba(0,255,136,.1)",   border: "rgba(0,255,136,.2)"   },
  CRITICAL: { hex: "#ff3b5c", bg: "rgba(255,59,92,.15)",  border: "rgba(255,59,92,.3)"   },
};

export const ACTION_COLOR = {
  "BLOCKED":   { bg: "rgba(255,59,92,.15)",  color: "#ff3b5c", border: "rgba(255,59,92,.3)"   },
  "FLAGGED":   { bg: "rgba(255,214,10,.12)", color: "#ffd60a", border: "rgba(255,214,10,.25)" },
  "ALLOWED":   { bg: "rgba(0,255,136,.08)",  color: "#00ff88", border: "rgba(0,255,136,.2)"   },
  "MONITORED": { bg: "rgba(0,212,255,.1)",   color: "#00d4ff", border: "rgba(0,212,255,.2)"   },
};

/* NAV — Live Logs removed */
export const NAV_ITEMS = [
  { key: "overview",  label: "Overview"    },
  { key: "analytics", label: "Analytics"   },
  { key: "watchlist", label: "IP Watchlist"},
  { key: "apikeys",   label: "API Keys"    },
  { key: "settings",  label: "Settings"    },
];

export const SIM_BUTTONS = [
  { type: "sqli", label: "⚡ SQL Inject",    hoverHex: "#ff3b5c" },
  { type: "xss",  label: "⚠ XSS Attack",    hoverHex: "#ff7a2f" },
  { type: "cmd",  label: "💀 Cmd Inject",    hoverHex: "#ffd60a" },
  { type: "path", label: "📂 Path Traversal",hoverHex: "#a855f7" },
];
