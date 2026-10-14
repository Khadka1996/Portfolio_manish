---
title: JWT Authentication Done Right in 2026: Cookies, Refresh Rotation and Common Mistakes
description: A practical guide to secure JWT auth for Next.js, Express and Spring Boot apps — where to store tokens, how to rotate refresh tokens, which algorithms to allow, and the mistakes I see most often.
date: 2026-08-29
tags: [Security, Backend, Node.js, Next.js]
category: Security
---

Almost every app I build — news admin panels, e-commerce dashboards, client portals — needs authentication. JSON Web Tokens are the most common choice, and also the most commonly misused. Here's how I implement JWT auth in 2026.

## First: do you need JWTs at all?

For a single web app with one backend, **server-side sessions** (a random session ID in a cookie, session data in Redis or a database) are simpler and easier to revoke. JWTs shine when several services need to verify identity without calling a central session store.

If you're using a framework with a mature auth library, use it. If you're building it yourself, follow the rules below.

## Rule 1: Store tokens in httpOnly cookies, not localStorage

Anything in `localStorage` can be read by any JavaScript on your page — including a compromised npm dependency or an XSS bug. An `httpOnly` cookie can't be read by JavaScript at all.

```js
res.cookie('access_token', token, {
  httpOnly: true,
  secure: true,          // HTTPS only
  sameSite: 'lax',       // CSRF protection for most cases
  maxAge: 15 * 60 * 1000, // 15 minutes
  path: '/',
});
```

If your API is on a different domain than your frontend, you'll need `sameSite: 'none'` plus explicit CSRF protection — or better, put the API under the same site (e.g. `api.example.com` behind the same registrable domain, or proxied through `/api`).

## Rule 2: Short-lived access tokens, rotating refresh tokens

- **Access token:** 5–15 minutes. Sent on every request.
- **Refresh token:** days or weeks. Used only to get a new access token. Stored in a separate cookie scoped to the refresh endpoint (`path: '/api/auth/refresh'`).

**Rotate refresh tokens:** every time one is used, issue a new one and invalidate the old one. If an old refresh token is ever reused, assume theft and revoke the whole session family.

```js
// pseudo-code
const record = await RefreshToken.findOne({ tokenHash: hash(incoming) });
if (!record || record.revoked) {
  await RefreshToken.updateMany({ family: record?.family }, { revoked: true });
  throw new Unauthorized();
}
record.revoked = true;
await record.save();
const next = await issueRefreshToken({ userId: record.userId, family: record.family });
```

Store **hashes** of refresh tokens, never the raw values.

## Rule 3: Pin the algorithm and validate everything

Never let the token tell you how to verify it. With the `jose` library:

```js
import { jwtVerify } from 'jose';

const { payload } = await jwtVerify(token, secretKey, {
  algorithms: ['HS256'],             // explicit allow-list
  issuer: 'https://api.example.com',
  audience: 'example-web',
});
```

Check `exp`, `iss` and `aud`. Reject `alg: none`. Use a long random secret (32+ bytes) for HMAC, or asymmetric keys (RS256/ES256/EdDSA) when other services verify tokens.

## Rule 4: Keep the payload small and non-sensitive

JWTs are **signed, not encrypted** — anyone can decode them. Put the user ID and role in it. Never passwords, emails you don't need, or personal data.

## Rule 5: Authorise on the server, every time

The role in the token tells you *who* the user is. Your API must still check *what* they're allowed to do with the specific resource:

```js
const article = await Article.findById(req.params.id);
if (article.authorId !== user.id && user.role !== 'admin') {
  return res.status(403).end();
}
```

Most real-world breaches I read about aren't broken crypto — they're missing authorisation checks like this one.

## Rule 6: Plan for logout and revocation

Short access-token lifetimes limit damage. For instant revocation (password change, "log out everywhere"), keep a token version on the user record and include it in the JWT; bump it to invalidate all existing tokens.

## Mistakes I see most often

1. Tokens in `localStorage`
2. Access tokens that live for 30 days
3. No refresh-token rotation
4. Not restricting algorithms
5. Trusting the role in the token without checking resource ownership
6. Secrets committed to Git (rotate immediately if this happens)
7. Middleware that runs on every route, including public pages — which hurts performance and SEO

## Key takeaways

- Prefer sessions for simple apps; use JWTs when you need stateless verification across services.
- httpOnly + Secure + SameSite cookies; short access tokens; rotating refresh tokens.
- Pin algorithms and validate `exp`, `iss`, `aud`.
- Always enforce authorisation on the server.
