---
title: Redis Caching Patterns for Node.js APIs: Cache-Aside, TTL Jitter, Stampedes and Rate Limits
description: Practical Redis patterns for Express and Node.js APIs — cache-aside, invalidation, avoiding cache stampedes, and rate limiting — with production-ready code.
date: 2026-09-05
tags: [Redis, Node.js, Backend, Performance]
category: Backend
---

Redis is the first thing I reach for when an API gets slow under load. I use it in several of my backends — including the Wonder Travelers API and a multi-vendor marketplace API — for caching, rate limiting and real-time features.

But a cache done wrong gives you **stale data, thundering herds and bugs that only happen in production.** These are the patterns I rely on.

## Setup

```bash
npm install redis
```

```js
// redis.js
import { createClient } from 'redis';

export const redis = createClient({ url: process.env.REDIS_URL });
redis.on('error', (err) => console.error('Redis error', err));
await redis.connect();
```

## Pattern 1: Cache-aside (lazy loading)

The application checks the cache first, falls back to the database, then fills the cache.

```js
async function getArticle(id) {
  const key = `article:${id}`;
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const article = await Article.findById(id).lean();
  if (article) {
    await redis.set(key, JSON.stringify(article), { EX: 300 }); // 5 minutes
  }
  return article;
}
```

Simple and resilient: if Redis is down, you can fall back to the database (wrap the Redis calls in try/catch).

## Pattern 2: Invalidate on write

TTLs alone mean users see stale data until expiry. When data changes, delete the key:

```js
async function updateArticle(id, data) {
  const article = await Article.findByIdAndUpdate(id, data, { new: true }).lean();
  await redis.del(`article:${id}`);
  await redis.del('articles:latest'); // any list that includes it
  return article;
}
```

Delete rather than overwrite — it avoids race conditions where an older write lands after a newer one.

## Pattern 3: Add jitter to TTLs

If you cache 1,000 items at the same moment with the same TTL, they all expire together and hit your database at once. Randomise:

```js
const ttl = 300 + Math.floor(Math.random() * 60); // 5–6 minutes
await redis.set(key, value, { EX: ttl });
```

## Pattern 4: Prevent cache stampedes

When a popular key expires, hundreds of concurrent requests miss the cache and all query the database. Use a short lock so only one request rebuilds:

```js
async function getWithLock(key, ttl, loader) {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const lockKey = `lock:${key}`;
  const gotLock = await redis.set(lockKey, '1', { NX: true, EX: 10 });

  if (!gotLock) {
    await new Promise((r) => setTimeout(r, 100));
    return getWithLock(key, ttl, loader); // retry; usually filled by now
  }

  try {
    const fresh = await loader();
    await redis.set(key, JSON.stringify(fresh), { EX: ttl });
    return fresh;
  } finally {
    await redis.del(lockKey);
  }
}
```

(Add a retry limit in production so a stuck lock can't loop forever.)

## Pattern 5: Rate limiting with `INCR`

A fixed-window limiter in a few lines:

```js
export async function rateLimit(req, res, next) {
  const key = `rl:${req.ip}:${Math.floor(Date.now() / 60000)}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 60);
  if (count > 100) return res.status(429).json({ error: 'Too many requests' });
  next();
}
```

For smoother limits, look at sliding-window or token-bucket algorithms.

## What *not* to cache

- **User-specific data under a shared key.** Always include the user ID in the key — or don't cache it.
- **Data that must be strongly consistent**, like account balances or stock levels at checkout.
- **Huge objects.** Cache the fields you actually return.

## Monitoring

Track your **hit rate** (`INFO stats` → `keyspace_hits` / `keyspace_misses`). Below ~80% for hot endpoints usually means keys are too specific or TTLs too short. Set `maxmemory` and an eviction policy like `allkeys-lru` so Redis never runs out of memory.

## Key takeaways

- Cache-aside + delete-on-write covers most needs.
- Add TTL jitter and stampede protection for popular keys.
- Use Redis for rate limiting too — it's a few lines.
- Never put user-specific data under shared keys; monitor hit rate and memory.
