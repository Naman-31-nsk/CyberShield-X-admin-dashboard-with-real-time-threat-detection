# CyberShield X — Admin Dashboard

Real-time API threat detection and monitoring dashboard.

**Live demo:** Deployed on Vercel

## Tech Stack
- React 18, Recharts, Axios
- CSS Variables (dark cyber theme)
- Wired to [Cyber_Shield backend](https://github.com/sharmaharsh8695/Cyber_Shield)

## Local Setup

```bash
npm install
cp .env.example .env
# Edit .env: set REACT_APP_API_URL to your backend URL
npm start
```

## Vercel Deployment

1. Import this repo on [vercel.com](https://vercel.com)
2. Framework: **Create React App** (auto-detected)
3. Add environment variable:
   - `REACT_APP_API_URL` = your backend API URL
4. Click Deploy

## Environment Variables

| Variable | Description |
|---|---|
| `REACT_APP_API_URL` | Backend API base URL e.g. `https://your-backend.railway.app/api` |
| `REACT_APP_API_KEY` | Optional — can also be generated via the API Keys page |

## Features
- Real-time threat monitoring
- SQL Injection, XSS, Command Injection, Path Traversal detection
- Google Gemini AI-powered analysis
- Live attack simulation
- IP Watchlist management
- System health monitoring
