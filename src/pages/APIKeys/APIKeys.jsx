/* src/pages/APIKeys/APIKeys.jsx
   Generate and manage API keys for the CyberShield backend.

   Flow:
     1. User enters a name + target URL
     2. Click "Generate Key" → POST /api/auth/generate-key
     3. Backend returns { apiKey, targetUrl, createdAt }
     4. Key is saved to localStorage and used for all future requests
     5. All /api/protect/* traffic is proxied to targetUrl

   The backend keeps keys in memory — they reset on server restart.
*/
import React, { useState } from "react";
import Panel from "../../components/common/Panel";
import { useDashboardCtx } from "../../context/DashboardContext";

const Field = ({ label, value, onChange, placeholder, mono = false, type = "text" }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: "block", fontSize: 11, color: "var(--text3)", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: 1, marginBottom: 5 }}>
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%", background: "var(--bg2)",
        border: "1px solid var(--border2)", borderRadius: 6,
        padding: "9px 12px", color: "var(--text1)",
        fontFamily: mono ? "monospace" : "inherit",
        fontSize: 13, outline: "none",
      }}
    />
  </div>
);

const CopyBox = ({ label, value }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 10, color: "var(--text3)", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: 1, marginBottom: 5 }}>{label}</div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <div style={{ flex: 1, background: "var(--bg0)", border: "1px solid var(--border)", borderRadius: 6, padding: "9px 12px", fontFamily: "monospace", fontSize: 12, color: "var(--accent)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value}
        </div>
        <button onClick={copy} style={{ background: "var(--bg2)", border: "1px solid var(--border2)", color: copied ? "var(--green)" : "var(--text2)", fontSize: 11, padding: "8px 14px", borderRadius: 6, cursor: "pointer", fontFamily: "monospace", whiteSpace: "nowrap" }}>
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
};

const HowItWorks = () => (
  <Panel title="How the Backend Works" tag="ARCHITECTURE">
    <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.8 }}>
      {[
        ["1. Generate a key", "POST /api/auth/generate-key → returns apiKey + stores targetUrl"],
        ["2. Protect your API", "Send all traffic through POST /api/protect/* instead of directly to your API"],
        ["3. IDS pipeline runs", "Every request passes: Rate Limiter → Rule Engine (SQLi/XSS/CmdInject/PathTraversal) → Gemini AI"],
        ["4. Decision made", "BLOCK (403) · FLAG (pass with warning header) · ALLOW (forwarded to targetUrl)"],
        ["5. Logged automatically", "Every decision is logged with IP, endpoint, attack type, risk, and action"],
        ["6. View in dashboard", "Logs appear in Live Logs and all stats are derived from them in real time"],
      ].map(([step, desc]) => (
        <div key={step} style={{ display: "flex", gap: 12, marginBottom: 10, padding: "8px 12px", background: "var(--bg2)", borderRadius: 6, border: "1px solid var(--border)" }}>
          <span style={{ color: "var(--accent)", fontFamily: "monospace", fontSize: 11, fontWeight: 600, flexShrink: 0, marginTop: 1 }}>{step}</span>
          <span style={{ color: "var(--text2)", fontSize: 12 }}>{desc}</span>
        </div>
      ))}
    </div>

    <div style={{ marginTop: 16, padding: "12px 16px", background: "rgba(255,214,10,.06)", border: "1px solid rgba(255,214,10,.2)", borderRadius: 8 }}>
      <div style={{ fontSize: 11, color: "var(--yellow)", fontFamily: "monospace", fontWeight: 600, marginBottom: 6 }}>⚠ IMPORTANT — In-Memory Storage</div>
      <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6 }}>
        Your backend stores API keys and logs <strong style={{ color: "var(--text1)" }}>in memory only</strong> (plain JS arrays — no database).
        All data is lost when the server restarts. To persist data, add MongoDB or a file-based store to <code style={{ color: "var(--accent)" }}>src/services/logs-service.js</code> and <code style={{ color: "var(--accent)" }}>src/services/apiKey-service.js</code>.
      </div>
    </div>
  </Panel>
);

const APIKeys = () => {
  const { apiKey, keyName, setKeyName, targetUrl, setTargetUrl, generating, generateKey, error, keyGenerated } = useDashboardCtx();
  const [localName, setLocalName]   = useState(keyName);
  const [localTarget, setLocalTarget] = useState(targetUrl);

  const handleGenerate = () => {
    setKeyName(localName);
    setTargetUrl(localTarget);
    generateKey(localName, localTarget);
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: 1, color: "var(--text1)", margin: 0 }}>API Keys</h1>
        <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "monospace", marginTop: 2 }}>
          Generate your CyberShield API key to connect the dashboard to the backend
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* ── Generator panel ── */}
        <Panel title="Generate API Key" tag="POST /api/auth/generate-key">
          {error && (
            <div style={{ padding: "10px 14px", background: "rgba(255,59,92,.1)", border: "1px solid rgba(255,59,92,.3)", borderRadius: 6, color: "var(--red)", fontSize: 12, fontFamily: "monospace", marginBottom: 14 }}>
              {error}
            </div>
          )}

          <Field label="Client Name" value={localName} onChange={setLocalName} placeholder="e.g. My App Dashboard" />
          <Field label="Target URL (your real backend)" value={localTarget} onChange={setLocalTarget} placeholder="https://your-api.com" mono />

          <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "monospace", marginBottom: 14, padding: "8px 12px", background: "var(--bg2)", borderRadius: 6, border: "1px solid var(--border)", lineHeight: 1.6 }}>
            Traffic to <span style={{ color: "var(--accent)" }}>/api/protect/*</span> will be proxied to this URL after IDS inspection.
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating || !localTarget}
            style={{ background: generating ? "var(--bg3)" : "var(--accent)", color: "#080c14", border: "none", borderRadius: 6, padding: "10px 24px", fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: 15, cursor: generating || !localTarget ? "not-allowed" : "pointer", letterSpacing: 1, opacity: !localTarget ? 0.5 : 1, transition: "all .2s" }}
          >
            {generating ? "⏳ Generating…" : "⚡ Generate API Key"}
          </button>

          {keyGenerated && apiKey && (
            <div style={{ marginTop: 20, padding: "14px", background: "rgba(0,255,136,.05)", border: "1px solid rgba(0,255,136,.2)", borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: "var(--green)", fontFamily: "monospace", marginBottom: 10, fontWeight: 600 }}>✓ Key generated and saved to localStorage</div>
              <CopyBox label="API Key (x-api-key header)" value={apiKey} />
            </div>
          )}

          {apiKey && !keyGenerated && (
            <div style={{ marginTop: 16, padding: "12px", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "monospace", marginBottom: 8 }}>ACTIVE KEY (from localStorage)</div>
              <CopyBox label="Current API Key" value={apiKey} />
              <button onClick={() => { localStorage.removeItem("cs_api_key"); window.location.reload(); }} style={{ background: "transparent", border: "1px solid rgba(255,59,92,.3)", color: "var(--red)", fontSize: 10, padding: "4px 10px", borderRadius: 4, cursor: "pointer", fontFamily: "monospace", marginTop: 8 }}>
                Clear Key (logout)
              </button>
            </div>
          )}
        </Panel>

        {/* ── Usage panel ── */}
        <Panel title="Usage" tag="INTEGRATION">
          <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "monospace", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>
            1. Protect your API routes
          </div>
          <pre style={{ background: "var(--bg0)", border: "1px solid var(--border)", borderRadius: 6, padding: "12px 14px", fontSize: 11, color: "var(--accent)", fontFamily: "monospace", overflowX: "auto", marginBottom: 16, lineHeight: 1.7 }}>{`# Instead of calling your API directly:
GET https://your-api.com/users

# Route through CyberShield:
GET https://cyber-shield-sage.vercel.app/api/protect/users
Headers:
  x-api-key: ${apiKey || "<your-key-here>"}`}</pre>

          <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "monospace", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>
            2. .env file for this frontend
          </div>
          <pre style={{ background: "var(--bg0)", border: "1px solid var(--border)", borderRadius: 6, padding: "12px 14px", fontSize: 11, color: "#00ff88", fontFamily: "monospace", marginBottom: 16, lineHeight: 1.7 }}>{`REACT_APP_API_URL=https://cyber-shield-sage.vercel.app/api
REACT_APP_API_KEY=${apiKey || "<your-key-here>"}`}</pre>

          <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "monospace", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>
            3. Backend .env file
          </div>
          <pre style={{ background: "var(--bg0)", border: "1px solid var(--border)", borderRadius: 6, padding: "12px 14px", fontSize: 11, color: "#ffd60a", fontFamily: "monospace", lineHeight: 1.7 }}>{`PORT=3000
GEMINI_API_KEY=your_gemini_api_key_here`}</pre>
        </Panel>
      </div>

      <HowItWorks />
    </div>
  );
};

export default APIKeys;
