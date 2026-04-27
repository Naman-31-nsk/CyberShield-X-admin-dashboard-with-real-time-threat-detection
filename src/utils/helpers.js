/* src/utils/helpers.js */

export const randomIP = () =>
  `${rnd(10,220)}.${rnd(0,255)}.${rnd(0,255)}.${rnd(1,254)}`;

export const rnd = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const formatTime = (d) =>
  d ? new Date(d).toLocaleTimeString("en", { hour12: false }) : "—";

export const fmt = (n) => Number(n || 0).toLocaleString();

export const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

/** Derive attack label from a raw type string returned by the backend */
export const attackLabel = (type = "") => {
  const map = {
    SQL_INJECTION:      "SQL Injection",
    XSS:                "XSS",
    COMMAND_INJECTION:  "Cmd Injection",
    PATH_TRAVERSAL:     "Path Traversal",
    RATE_LIMIT_EXCEEDED:"Rate Limit",
    NORMAL:             "Normal",
  };
  return map[type] || type;
};

/** Derive accent colour from attack type */
export const attackColor = (type = "") => {
  const map = {
    SQL_INJECTION:      "#ff3b5c",
    XSS:                "#ff7a2f",
    COMMAND_INJECTION:  "#ffd60a",
    PATH_TRAVERSAL:     "#a855f7",
    RATE_LIMIT_EXCEEDED:"#00d4ff",
    NORMAL:             "#00ff88",
  };
  return map[type] || "#8ba0bc";
};
