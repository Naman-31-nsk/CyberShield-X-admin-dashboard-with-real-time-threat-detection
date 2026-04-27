# Integration Guide — Wired to sharmaharsh8695/Cyber_Shield

This frontend is fully wired to your actual backend at:
https://github.com/sharmaharsh8695/Cyber_Shield

---

## Backend overview (what I found in your repo)

| File | Purpose |
|------|---------|
| `src/index.js` | Express server on `process.env.PORT`, prefix `/api` |
| `src/routes/index.js` | Mounts auth, logs, protect routes |
| `src/routes/auth-routes.js` | `POST /api/auth/generate-key` |
| `src/routes/logs-routes.js` | `GET /api/logs` (auth required) |
| `src/middleware/auth-middleware.js` | Reads `x-api-key` header |
| `src/middleware/rateLimiter.js` | 10 req/min per IP |
| `src/middleware/ids-middleware.js` | Rule engine + Gemini AI |
| `src/services/ruleEngine.js` | SQL_INJECTION, XSS, COMMAND_INJECTION, PATH_TRAVERSAL |
| `src/services/ai-service.js` | Gemini Flash API |
| `src/services/proxy-service.js` | Forwards allowed requests to targetUrl |
| `src/services/logs-service.js` | In-memory log array |
| `src/services/apiKey-service.js` | In-memory API key store |

---

## Step 1 — Start the backend

```bash
cd Cyber_Shield
cp .env.example .env    # or create .env manually
```

Create `.env`:
```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key_here
```

```bash
npm install
npm run dev    # nodemon src/index.js
```

---

## Step 2 — Configure the frontend

```bash
cd cybershield-frontend
cp .env.example .env
```

Edit `.env`:
```env
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_API_KEY=   # leave blank — generated via the API Keys page
```

```bash
npm install
npm start
```

---

## Step 3 — Generate your API key (in the dashboard)

1. Open **http://localhost:3000** (frontend)
2. You'll land on the **API Keys** page automatically
3. Enter a name and your **Target URL** (the real API you want to protect, e.g. `https://httpbin.org`)
4. Click **Generate API Key**
5. The key is saved to `localStorage` and used for all future requests

Internally this calls:
```
POST http://localhost:3000/api/auth/generate-key
Body: { "name": "My Dashboard", "targetUrl": "https://httpbin.org" }
```

Response:
```json
{ "success": true, "apiKey": "abc123...", "targetUrl": "https://httpbin.org", "createdAt": "..." }
```

---

## Step 4 — View real logs

The frontend calls `GET /api/logs` with your key every 10 seconds.

Response from your backend:
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": "1718000000000",
      "apiKey": "abc123...",
      "ip": "::1",
      "endpoint": "/api/protect/login",
      "method": "POST",
      "type": "SQL_INJECTION",
      "action": "BLOCKED",
      "risk": "HIGH",
      "timestamp": "2024-01-15T14:32:11.000Z"
    }
  ]
}
```

All stats (totalThreats, blockedRequests, uniqueIPs, activeAlerts) are **derived from this array** — there is no separate `/stats` endpoint on your backend.

---

## Step 5 — Simulate attacks (real pipeline)

Click the buttons in the dashboard header. Each one sends a real malicious payload to `/api/protect/*`:

| Button | Payload sent | Pattern triggered |
|--------|-------------|-------------------|
| ⚡ SQL Inject | `{ username: "admin' OR 1=1 --" }` | `SQL_INJECTION` regex |
| ⚠ XSS Attack | `{ comment: "<script>alert('xss')</script>" }` | `XSS` regex |
| 💀 Cmd Inject | `{ input: "; rm -rf /" }` | `COMMAND_INJECTION` regex |
| 📂 Path Traversal | `{ file: "../../etc/passwd" }` | `PATH_TRAVERSAL` regex |

The backend returns `403 Blocked` — the frontend treats this as success and re-fetches logs.

---

## Important limitations of the current backend

| Limitation | Impact | Fix |
|------------|--------|-----|
| In-memory storage | Logs and keys reset on restart | Add MongoDB to `logs-service.js` and `apiKey-service.js` |
| No `/stats` endpoint | Frontend derives stats from logs | Already handled — no change needed |
| No `/health` endpoint | Health panel shows derived metrics | Already handled |
| No `/ips` endpoint | IP list derived from logs | Already handled |
| No CORS middleware | Browser requests may fail | Add `cors` package to `server.js` |

---

## Adding CORS to your backend (required for browser requests)

```bash
cd Cyber_Shield
npm install cors
```

In `src/index.js`, add before routes:
```js
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));
```

---

## Attack type mapping

Your backend uses these exact strings in the `type` field:

| Backend `type` | Frontend label | Colour |
|----------------|----------------|--------|
| `SQL_INJECTION` | SQL Injection | Red |
| `XSS` | XSS | Orange |
| `COMMAND_INJECTION` | Cmd Injection | Yellow |
| `PATH_TRAVERSAL` | Path Traversal | Purple |
| `RATE_LIMIT_EXCEEDED` | Rate Limit | Cyan |
| `NORMAL` | Normal | Green |
| AI reason string | Suspicious (AI) | Orange |
