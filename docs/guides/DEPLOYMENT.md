# Deployment Guide — CyberShield X Frontend

---

## Build for production

```bash
cd cybershield-frontend
npm run build
```

This creates a `build/` folder with static files ready to serve.

---

## Option A — Serve with any static host

The `build/` output is plain HTML/CSS/JS — host it anywhere:

| Host | Command / Steps |
|------|----------------|
| **Vercel** | `vercel --prod` from project root |
| **Netlify** | Drag `build/` into Netlify dashboard, or `netlify deploy --prod --dir=build` |
| **GitHub Pages** | `npm install -D gh-pages`, add `"homepage"` to `package.json`, run `npm run deploy` |
| **AWS S3** | `aws s3 sync build/ s3://your-bucket --delete` + enable static website hosting |
| **Nginx** | Copy `build/` to `/var/www/html`, use config below |

### Nginx config (React SPA)

```nginx
server {
  listen 80;
  server_name yourdomain.com;
  root /var/www/cybershield;
  index index.html;

  # All routes fall back to index.html (needed for SPA)
  location / {
    try_files $uri $uri/ /index.html;
  }

  # Cache static assets
  location ~* \.(js|css|png|jpg|svg|ico|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

---

## Option B — Serve from the Express backend

Add this to your `server.js` after all API routes:

```js
const path = require("path");

// Serve React build
app.use(express.static(path.join(__dirname, "../frontend/build")));

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
```

Then build the frontend and deploy everything together.

---

## Environment variables for production

Set these before running `npm run build`:

```env
REACT_APP_API_URL=https://api.yourdomain.com/api
```

On Vercel / Netlify, add them in the project settings UI.  
On a VPS, export them before building:

```bash
export REACT_APP_API_URL=https://api.yourdomain.com/api
npm run build
```

> **Important:** React embeds env vars at build time — you must rebuild if you change them.

---

## HTTPS

Always serve over HTTPS in production. Use:
- **Vercel / Netlify:** HTTPS is automatic.
- **VPS:** Use [Certbot](https://certbot.eff.org/) with Nginx to get a free Let's Encrypt certificate.

---

## Performance tips

| Tip | Benefit |
|-----|---------|
| Increase poll interval in `useDashboard.js` | Reduces backend load in production |
| Add a CDN in front of your static host | Faster global delivery |
| Use `gzip` / `brotli` on Nginx | Cuts JS bundle size by ~70% |
| Lazy-load heavy pages with `React.lazy` | Faster initial paint |
