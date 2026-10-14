---
title: Deploying Next.js in 2026: Vercel vs VPS vs cPanel (Costs, Speed and Trade-offs)
description: An honest comparison of the three ways I deploy Next.js apps for clients — Vercel, a self-managed VPS, and cPanel shared hosting — with setup steps, costs and when to choose each.
date: 2026-09-15
tags: [Next.js, DevOps, Deployment, Web Development]
category: DevOps
popular: true
---

Clients in Nepal often ask why they should pay for "cloud hosting" when a local cPanel plan is cheaper. I've deployed Next.js apps on all three — **Vercel**, **self-managed VPS** and **cPanel** — and each is the right answer for someone.

## Option 1: Vercel

**Best for:** most Next.js sites, portfolios, marketing sites, startups.

```bash
npm i -g vercel
vercel        # preview deployment
vercel --prod # production
```

Or connect your GitHub repo and every push deploys automatically.

**Pros**

- Zero server management; HTTPS, CDN, image optimisation and caching built in.
- Every new Next.js feature (Cache Components, streaming, ISR) works first.
- Preview URLs for every pull request — clients love reviewing these.

**Cons**

- Costs can grow with heavy traffic, image optimisation or long-running functions — watch usage.
- Not ideal for long-running background jobs or WebSocket servers (pair it with a separate backend).

## Option 2: VPS (DigitalOcean, Hetzner, Linode, local providers)

**Best for:** apps with a custom backend, WebSockets, cron jobs, or predictable heavy traffic.

Use Next.js **standalone output** to get a minimal server bundle:

```js
// next.config.mjs
export default { output: 'standalone' };
```

```bash
npm ci && npm run build
cp -r .next/static .next/standalone/.next/
cp -r public .next/standalone/
node .next/standalone/server.js
```

Run it with a process manager and put Nginx in front:

```bash
pm2 start .next/standalone/server.js --name web
pm2 save && pm2 startup
```

```nginx
server {
  server_name example.com;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

Add HTTPS with Certbot (`certbot --nginx`). Docker is a great alternative to PM2 if you prefer containers.

**Pros:** full control, predictable monthly cost, run your API, Redis and database on the same box.

**Cons:** you own security updates, backups, monitoring and scaling. Put a CDN (e.g. Cloudflare) in front for static assets.

## Option 3: cPanel shared hosting

**Best for:** very small sites where the client already has cPanel hosting and budget is tight.

Many cPanel hosts offer **"Setup Node.js App"** (Phusion Passenger). The flow:

1. Build locally with `output: 'standalone'`.
2. Upload the standalone folder (plus `.next/static` and `public`).
3. In cPanel → Setup Node.js App, set the startup file to `server.js` and the Node version.
4. Restart the app.

**Pros:** cheap, familiar to many Nepali businesses, local support and billing in NPR.

**Cons:** limited memory and CPU, often older Node versions, slower builds, and some hosts kill long-running processes. Server-side features may be constrained. For a static marketing site, consider `output: 'export'` instead and upload plain HTML.

## Quick comparison

| | Vercel | VPS | cPanel |
|---|---|---|---|
| Setup effort | Very low | High | Medium |
| Maintenance | None | You | Low–medium |
| Next.js feature support | Full | Full | Partial |
| Cost at low traffic | Free–low | Low | Very low |
| Cost at high traffic | Can grow | Predictable | Not suitable |
| Background jobs / WebSockets | Limited | Yes | Limited |

## What I recommend to clients

- **Portfolio, company or marketing site:** Vercel.
- **News portal or app with its own Express/Spring Boot API:** frontend on Vercel, API + database on a VPS — or everything on a VPS if traffic is high and steady.
- **Tiny brochure site with existing cPanel hosting:** static export on cPanel.

Whatever you choose: automate deployments from Git, keep environment variables out of the repo, and **test your backups by restoring them**.
