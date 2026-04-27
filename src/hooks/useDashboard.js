/* src/hooks/useDashboard.js
   ─────────────────────────────────────────────────────────────
   Wired to the real CyberShield backend:

   Endpoints used:
     POST  /api/auth/generate-key  → create API key
     GET   /api/logs               → all logs for this key
     POST  /api/protect            → simulate attack (real IDS pipeline)

   Data model from backend logs-service.js:
   {
     id, apiKey, ip, endpoint, method,
     type,      ← SQL_INJECTION | XSS | COMMAND_INJECTION | PATH_TRAVERSAL | RATE_LIMIT_EXCEEDED | NORMAL
     action,    ← BLOCKED | FLAGGED | ALLOWED
     risk,      ← HIGH | MEDIUM | LOW  (or undefined for NORMAL)
     timestamp
   }

   Stats are DERIVED from log data (no /stats endpoint exists).
   ─────────────────────────────────────────────────────────────
*/
import { useState, useEffect, useCallback, useRef } from "react";
import api from "../utils/api";
import { attackLabel, attackColor } from "../utils/helpers";

/* ── attack payloads sent to /api/protect ─────────────────── */
const ATTACK_PAYLOADS = {
  sqli: {
    body:     { username: "admin' OR 1=1 --", password: "x" },
    endpoint: "/api/protect/login",
  },
  xss: {
    body:     { comment: "<script>alert('xss')</script>" },
    endpoint: "/api/protect/comments",
  },
  cmd: {
    body:     { input: "; rm -rf / || echo pwned" },
    endpoint: "/api/protect/run",
  },
  path: {
    body:     { file: "../../etc/passwd" },
    endpoint: "/api/protect/files",
  },
};

/* ── normalise a raw backend log entry ────────────────────── */
const normaliseLog = (raw) => ({
  _id:         raw.id || Math.random().toString(36).slice(2),
  timestamp:   raw.timestamp,
  ip:          raw.ip   || "—",
  endpoint:    raw.endpoint || "—",
  method:      raw.method   || "GET",
  attackType:  raw.type     || "NORMAL",
  attackLabel: attackLabel(raw.type),
  riskLevel:   raw.risk     || (raw.action === "ALLOWED" ? "LOW" : "HIGH"),
  action:      raw.action   || "ALLOWED",
  color:       attackColor(raw.type),
  isNew:       false,
});

/* ── derive stats from a log array ───────────────────────── */
const deriveStats = (logs) => ({
  totalThreats:    logs.filter((l) => l.action === "BLOCKED" || l.action === "FLAGGED").length,
  blockedRequests: logs.filter((l) => l.action === "BLOCKED").length,
  uniqueIPs:       new Set(logs.map((l) => l.ip)).size,
  activeAlerts:    logs.filter((l) => l.action === "BLOCKED" && l.riskLevel === "HIGH").length,
});

/* ── derive time series (last 24 h, hourly buckets) ─────── */
const deriveTimeSeries = (logs) => {
  const now    = Date.now();
  const hours  = Array.from({ length: 24 }, (_, i) => {
    const h = new Date(now - (23 - i) * 3600000);
    return { hour: `${String(h.getHours()).padStart(2, "0")}:00`, attacks: 0, blocked: 0 };
  });
  logs.forEach((l) => {
    const age = now - new Date(l.timestamp).getTime();
    if (age > 24 * 3600000) return;
    const idx = Math.floor((24 * 3600000 - age) / 3600000);
    const slot = hours[Math.min(idx, 23)];
    if (slot) {
      if (l.action !== "ALLOWED") slot.attacks++;
      if (l.action === "BLOCKED") slot.blocked++;
    }
  });
  return hours;
};

/* ── derive attack type distribution ─────────────────────── */
const deriveDistribution = (logs) => {
  const counts = {};
  logs.forEach((l) => {
    if (l.attackType !== "NORMAL") counts[l.attackType] = (counts[l.attackType] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([_id, count]) => ({ _id, count }))
    .sort((a, b) => b.count - a.count);
};

/* ── derive top endpoints ─────────────────────────────────── */
const deriveEndpoints = (logs) => {
  const counts = {};
  logs.filter((l) => l.action !== "ALLOWED").forEach((l) => {
    counts[l.endpoint] = (counts[l.endpoint] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 7);
};

/* ── derive unique IP list ────────────────────────────────── */
const deriveIPs = (logs) => {
  const ipMap = {};
  logs.forEach((l) => {
    if (!ipMap[l.ip]) {
      ipMap[l.ip] = { ip: l.ip, hits: 0, status: "watch", lastType: "NORMAL" };
    }
    ipMap[l.ip].hits++;
    if (l.action === "BLOCKED") ipMap[l.ip].status = "blocked";
    if (l.attackType !== "NORMAL") ipMap[l.ip].lastType = l.attackType;
  });
  return Object.values(ipMap).sort((a, b) => b.hits - a.hits).slice(0, 15);
};

/* ── main hook ────────────────────────────────────────────── */
const useDashboard = () => {
  const [apiKey,      setApiKey]   = useState(() => localStorage.getItem("cs_api_key") || "");
  const [keyName,     setKeyName]  = useState("CyberShield Dashboard");
  const [targetUrl,   setTargetUrl]= useState(() => localStorage.getItem("cs_target") || "https://httpbin.org");
  const [keyGenerated,setKeyGen]   = useState(false);
  const [generating,  setGenerating] = useState(false);

  const [rawLogs,     setRawLogs]  = useState([]);
  const [logs,        setLogs]     = useState([]);
  const [stats,       setStats]    = useState({ totalThreats: 0, blockedRequests: 0, uniqueIPs: 0, activeAlerts: 0 });
  const [timeSeries,  setTS]       = useState([]);
  const [distribution,setDist]     = useState([]);
  const [endpoints,   setEP]       = useState([]);
  const [ips,         setIPs]      = useState([]);
  const [alerts,      setAlerts]   = useState([]);
  const [health,      setHealth]   = useState({ api: { status: "online" }, database: { status: "connected" }, reqPerMin: 0, cpu: 0, memory: 0, uptime: "—" });

  const [loading,    setLoading]   = useState(false);
  const [simulating, setSim]       = useState(false);
  const [error,      setError]     = useState("");

  const pollRef = useRef(null);

  /* ── recompute derived state from raw logs ─────────────── */
  const recompute = useCallback((raw) => {
    const normalised = raw.map(normaliseLog);
    setLogs(normalised);
    setStats(deriveStats(normalised));
    setTS(deriveTimeSeries(normalised));
    setDist(deriveDistribution(normalised));
    setEP(deriveEndpoints(normalised));
    setIPs(deriveIPs(normalised));
    // Alerts = latest 20 blocked/flagged
    setAlerts(
      normalised
        .filter((l) => l.action === "BLOCKED" || l.action === "FLAGGED")
        .slice(0, 20)
        .map((l) => ({
          _id:       l._id,
          type:      l.attackType,
          title:     `${l.attackLabel} ${l.action}`,
          detail:    `${l.ip} → ${l.endpoint} · ${l.riskLevel} risk`,
          ip:        l.ip,
          endpoint:  l.endpoint,
          riskLevel: l.riskLevel,
          timestamp: l.timestamp,
        }))
    );
    // Health req/min
    const oneMinAgo = Date.now() - 60000;
    const rpm = normalised.filter((l) => new Date(l.timestamp).getTime() > oneMinAgo).length;
    setHealth((h) => ({ ...h, reqPerMin: rpm }));
  }, []);

  /* ── fetch logs from backend ───────────────────────────── */
  const fetchLogs = useCallback(async (key) => {
    const k = key || apiKey;
    if (!k) return;
    try {
      const res = await api.get("/logs", { headers: { "x-api-key": k } });
      const raw = res?.data || res || [];
      setRawLogs(raw);
      recompute(raw);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }, [apiKey, recompute]);

  /* ── generate API key ──────────────────────────────────── */
  const generateKey = useCallback(async (name, url) => {
    setGenerating(true);
    setError("");
    try {
      const res = await api.post("/auth/generate-key", { name: name || keyName, targetUrl: url || targetUrl });
      const key = res?.apiKey || res?.data?.apiKey;
      if (!key) throw new Error("No apiKey in response");
      localStorage.setItem("cs_api_key", key);
      localStorage.setItem("cs_target", url || targetUrl);
      setApiKey(key);
      setKeyGen(true);
      // start polling once we have a key
      await fetchLogs(key);
    } catch (err) {
      setError(`Key generation failed: ${err.message}`);
    } finally {
      setGenerating(false);
    }
  }, [keyName, targetUrl, fetchLogs]);

  /* ── poll every 10s when key exists ───────────────────── */
  useEffect(() => {
    if (!apiKey) return;
    fetchLogs(apiKey);
    pollRef.current = setInterval(() => fetchLogs(apiKey), 10000);
    return () => clearInterval(pollRef.current);
  }, [apiKey, fetchLogs]);

  /* ── simulate attack via real /api/protect ─────────────── */
  const simulate = useCallback(async (type) => {
    if (!apiKey) { setError("Generate an API key first (API Keys page)"); return; }
    setSim(true);
    try {
      const p = ATTACK_PAYLOADS[type] || ATTACK_PAYLOADS.sqli;
      await api.post(p.endpoint.replace("/api/protect", "/protect"), p.body, {
        headers: { "x-api-key": apiKey },
      });
    } catch (_) {
      // 403 is expected for blocked attacks — still a success
    }
    // Refresh logs after attack
    await fetchLogs(apiKey);
    setSim(false);
  }, [apiKey, fetchLogs]);

  /* ── manually resolve an alert (local only) ────────────── */
  const resolveAlert = useCallback((id) => {
    setAlerts((prev) => prev.filter((a) => a._id !== id));
    setStats((prev) => ({ ...prev, activeAlerts: Math.max(0, prev.activeAlerts - 1) }));
  }, []);

  const resolveAll = useCallback(() => {
    setAlerts([]);
    setStats((prev) => ({ ...prev, activeAlerts: 0 }));
  }, []);

  /* ── block / remove IP (local only — no backend endpoint) ─ */
  const blockIP  = useCallback((ip) => setIPs((prev) => prev.map((i) => i.ip === ip ? { ...i, status: "blocked" } : i)), []);
  const removeIP = useCallback((ip) => setIPs((prev) => prev.filter((i) => i.ip !== ip)), []);

  return {
    /* key management */
    apiKey, keyName, setKeyName, targetUrl, setTargetUrl,
    keyGenerated, generating, generateKey,
    /* data */
    logs, stats, alerts, ips, health,
    timeSeries, distribution, endpoints,
    /* status */
    loading, simulating, error,
    /* actions */
    simulate, resolveAlert, resolveAll, blockIP, removeIP,
    /* raw refresh */
    fetchLogs: () => fetchLogs(apiKey),
  };
};

export default useDashboard;
