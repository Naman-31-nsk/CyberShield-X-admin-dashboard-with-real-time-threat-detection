# API Reference — sharmaharsh8695/Cyber_Shield Backend

Base URL: `http://localhost:3000/api` (set via `REACT_APP_API_URL`)
Auth: all protected routes require `x-api-key: <your-key>` header.

---

## Authentication

### POST `/api/auth/generate-key`
Creates a new API key. No auth required.

**Request**
```json
{ "name": "My Dashboard", "targetUrl": "https://your-real-api.com" }
```
- `targetUrl` is **required** — allowed requests are proxied here

**Response**
```json
{
  "success": true,
  "apiKey": "abc123def456...",
  "targetUrl": "https://your-real-api.com",
  "createdAt": "2024-01-15T14:00:00.000Z"
}
```

---

## Logs

### GET `/api/logs`
Returns all logs for the authenticated API key.

**Headers**: `x-api-key: <your-key>`

**Response**
```json
{
  "success": true,
  "count": 12,
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

**Log `type` values** (from ruleEngine.js + ids-middleware.js):

| type | Source | Meaning |
|------|--------|---------|
| `SQL_INJECTION` | ruleEngine | Matched SQLi regex |
| `XSS` | ruleEngine | Matched XSS regex |
| `COMMAND_INJECTION` | ruleEngine | Matched `;` `\|\|` `&&` |
| `PATH_TRAVERSAL` | ruleEngine | Matched `../` |
| `RATE_LIMIT_EXCEEDED` | rateLimiter | >10 req/min from IP |
| `NORMAL` | ids-middleware | Clean request |
| AI reason string | Gemini AI | Free-text classification reason |

**Log `action` values**:

| action | Meaning |
|--------|---------|
| `BLOCKED` | Request rejected, 403 returned |
| `FLAGGED` | Suspicious but forwarded with `X-IDS-Warning` header |
| `ALLOWED` | Clean request, forwarded to targetUrl |

**Log `risk` values**: `HIGH` · `MEDIUM` · `LOW`

---

## Protect (IDS Gateway)

### ANY METHOD `/api/protect/*`
Routes all traffic through the full IDS pipeline.

**Headers**: `x-api-key: <your-key>`

**Pipeline**:
1. `authMiddleware` — validates API key
2. `rateLimiter` — max 10 req/min per IP (429 if exceeded)
3. `idsMiddleware` — runs ruleEngine, then Gemini AI
4. `forwardRequest` — proxies to `targetUrl` if allowed

**Blocked response (403)**:
```json
{
  "success": false,
  "blocked": true,
  "decision": "BLOCK",
  "reason": "SQL_INJECTION",
  "risk": "HIGH"
}
```

**Rate limited response (429)**:
```json
{
  "success": false,
  "blocked": true,
  "reason": "RATE_LIMIT_EXCEEDED",
  "message": "Too many requests"
}
```

**Allowed response**: passes through from targetUrl unchanged.

---

## Test Log

### GET `/api/test-log`
Creates a test NORMAL log entry. Useful for verifying auth.

**Headers**: `x-api-key: <your-key>`

**Response**: `{ "message": "Log created" }`

---

## What does NOT exist (derive in frontend)

| Endpoint | Status | Frontend workaround |
|----------|--------|---------------------|
| `/api/stats` | ❌ Does not exist | Derived from `/api/logs` count |
| `/api/alerts` | ❌ Does not exist | Filtered from logs (BLOCKED + FLAGGED) |
| `/api/ips` | ❌ Does not exist | Grouped from logs by IP |
| `/api/health` | ❌ Does not exist | Derived from log metrics |
| `/api/simulate` | ❌ Does not exist | Frontend POSTs real payloads to `/api/protect` |
