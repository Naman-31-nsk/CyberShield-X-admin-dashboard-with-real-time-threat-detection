# Quick Start — CyberShield X

Backend deployed at: https://cyber-shield-sage.vercel.app

---

## Backend is already live!

Your backend is deployed at:
```
https://cyber-shield-sage.vercel.app/api
```

---

## Run frontend locally

```bash
cd cybershield-frontend
npm install
npm start
```

Frontend will connect to the live backend automatically.

---

## Generate your API key

1. Open the dashboard → **API Keys** page
2. Enter a name and your target URL
3. Click **Generate API Key**
4. Key is saved to localStorage

This calls:
```
POST https://cyber-shield-sage.vercel.app/api/auth/generate-key
Body: { "name": "My App", "targetUrl": "https://httpbin.org" }
```

---

## Simulate attacks

Use the demo buttons — each fires a real payload through the live IDS:

| Button | Endpoint hit |
|--------|-------------|
| SQL Inject | POST /api/protect/login |
| XSS Attack | POST /api/protect/comments |
| Cmd Inject | POST /api/protect/run |
| Path Traversal | POST /api/protect/files |

---

## Environment variables

```env
REACT_APP_API_URL=https://cyber-shield-sage.vercel.app/api
```
