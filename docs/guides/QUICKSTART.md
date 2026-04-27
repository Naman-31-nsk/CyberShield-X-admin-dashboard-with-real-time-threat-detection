# Quick Start — CyberShield X Frontend

Wired to: https://github.com/sharmaharsh8695/Cyber_Shield

---

## Prerequisites

- Node.js 18+
- Your Cyber_Shield backend running on port 3000
- A Gemini API key (for AI detection in the backend)

---

## 1. Start the backend first

```bash
cd Cyber_Shield

# Create .env
echo "PORT=3000" > .env
echo "GEMINI_API_KEY=your_key_here" >> .env

npm install
npm run dev
# Backend running on http://localhost:3000
```

**Add CORS** to `src/index.js` (needed for browser requests):
```js
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));
// Note: frontend runs on :3000, but if you use npm start it's :3001 by default
// Set origin to wherever your React app runs
```

---

## 2. Start the frontend

```bash
cd cybershield-frontend
cp .env.example .env
# Edit .env: REACT_APP_API_URL=http://localhost:3000/api
npm install
npm start
# Opens http://localhost:3001
```

---

## 3. Generate your API key (first thing to do)

The dashboard opens on the **API Keys** page.

1. Enter a **Client Name** (any label)
2. Enter your **Target URL** — the real API you want to protect (e.g. `https://httpbin.org`)
3. Click **⚡ Generate API Key**
4. Your key is saved automatically to `localStorage`

---

## 4. Simulate attacks

Once you have a key, use the buttons in the dashboard header:

- **⚡ SQL Inject** → sends `{ username: "admin' OR 1=1 --" }` → triggers `SQL_INJECTION`
- **⚠ XSS Attack** → sends `{ comment: "<script>..." }` → triggers `XSS`
- **💀 Cmd Inject** → sends `{ input: "; rm -rf /" }` → triggers `COMMAND_INJECTION`
- **📂 Path Traversal** → sends `{ file: "../../etc/passwd" }` → triggers `PATH_TRAVERSAL`

Each attack goes through the **real IDS pipeline** on your backend:
```
rateLimiter → ruleEngine → Gemini AI → log → 403 Blocked
```

The frontend re-fetches logs after each simulation and updates all charts and stats.

---

## 5. Understanding the data flow

```
[Dashboard] --GET /api/logs (x-api-key)--> [Backend]
            <-- { success, count, data: [...logs] } --

[Dashboard] --POST /api/protect/login (x-api-key)--> [rateLimiter]
                                                  --> [ruleEngine]
                                                  --> [Gemini AI]
                                                  --> [log entry created]
                                                  <-- 403 { blocked: true }

[Dashboard polls every 10s] --GET /api/logs--> [fresh log data]
```

All stats, charts, IP list, and alerts are **computed from `/api/logs`** — there are no separate endpoints for them.
