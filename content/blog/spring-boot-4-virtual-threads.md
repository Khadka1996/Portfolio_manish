---
title: Spring Boot 4 and Virtual Threads: When They Help, When They Don't
description: A Java developer's guide to virtual threads in Spring Boot 4 on Java 21–25 — how to enable them, what changed with pinning in recent JDKs, and how to decide if your API will actually get faster.
date: 2026-09-12
tags: [Java, Spring Boot, Backend, Performance]
category: Backend
---

I started my career writing Spring Boot APIs, and the biggest change in the Java world in the last few years is **virtual threads** (Project Loom). With Spring Boot 4 (built on Spring Framework 7) and Java 25 now an LTS release, they're mature enough to use in production — but they're not a magic "make it faster" switch.

## The problem virtual threads solve

A traditional Spring MVC app on Tomcat uses one **platform thread per request**. Platform threads are expensive (roughly a megabyte of stack each), so Tomcat caps them — 200 by default. If each request spends most of its time **waiting** on a database or HTTP call, those 200 threads sit idle while new requests queue.

Virtual threads are cheap, JVM-managed threads. You can have hundreds of thousands. When one blocks on I/O, the JVM parks it and reuses the underlying carrier thread.

**Result:** blocking, readable code with much higher concurrency — without rewriting to reactive WebFlux.

## Enabling them

Since Spring Boot 3.2 it's a single property (and it carries into Spring Boot 4):

```properties
# application.properties
spring.threads.virtual.enabled=true
```

This makes Tomcat (or Jetty) handle each request on a virtual thread and applies them to `@Async` tasks, scheduled tasks and several other executors.

## Will my API get faster?

It depends on **where the time goes**:

| Workload | Virtual threads help? |
|---|---|
| Mostly waiting on DB / HTTP calls | **Yes** — more concurrent requests on the same hardware |
| CPU-heavy (image processing, encryption, big calculations) | **No** — you're limited by CPU cores |
| Low traffic (< 200 concurrent requests) | Little difference |
| Calling many slow downstream APIs | **Yes**, often dramatically |

Virtual threads improve **throughput under concurrency**, not the latency of a single request. One request still takes as long as the slowest database query.

## Watch out: the database pool becomes the bottleneck

With 10,000 virtual threads and a HikariCP pool of 10 connections, 9,990 requests wait for a connection. That's fine — it's just honest about your real limit. Tune the pool to what your database can handle, and consider:

- Faster queries and proper indexes (always the best fix)
- Caching hot reads in Redis (see my [Redis caching patterns](/blog/redis-caching-patterns-nodejs) — the ideas apply to Java too)
- Rate limiting expensive endpoints

## Pinning: what changed

Early on, a virtual thread that blocked **inside a `synchronized` block** stayed "pinned" to its carrier thread, which could cause stalls under load. The common advice was to replace `synchronized` with `ReentrantLock`.

[JEP 491](https://openjdk.org/jeps/491) (delivered in JDK 24) removed most of that pinning for `synchronized`. If you run Spring Boot 4 on **Java 25**, you largely get this fix for free — another good reason to move to the newest LTS. Native code and some older libraries can still pin, so monitor with JFR (`jdk.VirtualThreadPinned` events) if you see unexpected stalls.

## Other gotchas

- **`ThreadLocal` overuse.** Each virtual thread has its own `ThreadLocal`s. Caching heavy objects in them (an old trick for platform threads) wastes memory with thousands of threads.
- **Don't pool virtual threads.** Create one per task; that's the point.
- **Thread-pool settings stop meaning much.** Limits like Tomcat's max threads don't behave the same way once requests run on virtual threads — control concurrency with semaphores, connection pools and rate limits instead.

## A quick benchmark recipe

Before and after enabling the property:

1. Deploy to a staging environment that matches production.
2. Load test a realistic endpoint (with real DB calls) using k6 or Gatling.
3. Compare throughput, p95 latency and error rate at increasing concurrency.

If p95 latency stays flat as concurrency grows, you've got your win. If it doesn't change, your bottleneck is elsewhere — usually the database.

## Key takeaways

- Virtual threads give you high concurrency with simple blocking code.
- Enable with `spring.threads.virtual.enabled=true`.
- They help I/O-bound APIs, not CPU-bound work.
- On Java 24+ the `synchronized` pinning problem is largely solved — prefer Java 25 LTS.
- Your database pool and query speed are the real limits; measure before and after.
