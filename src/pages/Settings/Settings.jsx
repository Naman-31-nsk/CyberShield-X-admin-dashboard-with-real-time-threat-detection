/* src/pages/Settings/Settings.jsx
   Settings wired to the real backend config.
*/
import React from "react";
import Panel         from "../../components/common/Panel";
import SettingsField from "./SettingsField";
import ToggleRow     from "./ToggleRow";
import { useDashboardCtx } from "../../context/DashboardContext";

const SectionLabel = ({ children }) => (
  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 2, fontFamily: "monospace", marginBottom: 12, marginTop: 20, borderBottom: "1px solid var(--border)", paddingBottom: 6 }}>
    {children}
  </div>
);

const TOGGLES = [
  { label: "Rule-Based IDS",     description: "SQLi / XSS / Cmd Injection / Path Traversal pattern matching",   defaultOn: true  },
  { label: "Gemini AI Analysis", description: "Secondary AI check for suspicious payloads (needs GEMINI_API_KEY)", defaultOn: true  },
  { label: "Rate Limiting",      description: "Max 10 requests/minute per IP (configured in rateLimiter.js)",    defaultOn: true  },
  { label: "Request Forwarding", description: "Forward allowed requests to targetUrl via proxy-service.js",       defaultOn: true  },
  { label: "Fail-Open Mode",     description: "Allow requests through if IDS throws an error (current default)",  defaultOn: true  },
  { label: "Log Normal Traffic", description: "Log ALLOWED requests in addition to blocked/flagged ones",         defaultOn: true  },
];

const Settings = () => {
  const { apiKey, targetUrl } = useDashboardCtx();

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: 1, color: "var(--text1)", margin: 0 }}>Settings</h1>
        <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "monospace", marginTop: 2 }}>
          Backend configuration reference — edit .env and source files to change these
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Panel title="Backend Config" tag="READ-ONLY REFERENCE">
          <SectionLabel>Current Connection</SectionLabel>
          <SettingsField label="API Base URL"   defaultValue={process.env.REACT_APP_API_URL || "https://cyber-shield-sage.vercel.app/api"} mono />
          <SettingsField label="Active API Key" defaultValue={apiKey || "Not set — go to API Keys page"} mono />
          <SettingsField label="Target URL"     defaultValue={targetUrl || "Not set"} mono />

          <SectionLabel>Rate Limiter (src/middleware/rateLimiter.js)</SectionLabel>
          <SettingsField label="Window size"    defaultValue="60000 ms (1 minute)" />
          <SettingsField label="Max requests"   defaultValue="10 per IP per window" />
          <SettingsField label="On exceed"      defaultValue="BLOCK → 429 + log RATE_LIMIT_EXCEEDED" />

          <SectionLabel>IDS Rule Engine (src/services/ruleEngine.js)</SectionLabel>
          <SettingsField label="SQL_INJECTION"     defaultValue="(\bor\b|\band\b).*(=|<|>)" mono />
          <SettingsField label="XSS"               defaultValue="<script.*?>.*?</script>" mono />
          <SettingsField label="COMMAND_INJECTION"  defaultValue="(;|\|\||&&)" mono />
          <SettingsField label="PATH_TRAVERSAL"     defaultValue="\.\.\/" mono />

          <SectionLabel>AI Service (src/services/ai-service.js)</SectionLabel>
          <SettingsField label="Model"   defaultValue="gemini-3-flash-preview" mono />
          <SettingsField label="Timeout" defaultValue="3000 ms" />
          <SettingsField label="Output"  defaultValue="classification + risk + reason (JSON)" />
        </Panel>

        <Panel title="Feature Toggles" tag="SOURCE FILES">
          <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "monospace", marginBottom: 14, padding: "8px 12px", background: "var(--bg2)", borderRadius: 6, border: "1px solid var(--border)" }}>
            These reflect current backend behaviour. To actually toggle them, edit the corresponding source files in your backend.
          </div>
          {TOGGLES.map((t) => <ToggleRow key={t.label} {...t} />)}

          <SectionLabel>Environment Variables (.env)</SectionLabel>
          <pre style={{ background: "var(--bg0)", border: "1px solid var(--border)", borderRadius: 6, padding: "12px 14px", fontSize: 11, color: "var(--green)", fontFamily: "monospace", lineHeight: 1.8, marginTop: 4 }}>
{`PORT=3000
GEMINI_API_KEY=your_gemini_key_here`}
          </pre>
        </Panel>
      </div>
    </div>
  );
};

export default Settings;
