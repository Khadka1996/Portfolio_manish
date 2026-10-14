---
title: Build an AI Assistant for Your Website with Claude and Next.js (Streaming, Caching, Rate Limits)
description: Step-by-step tutorial for adding a streaming AI chat assistant to a Next.js site using the Anthropic SDK — grounded in your own content, with prompt caching to cut costs and basic abuse protection.
date: 2026-10-13
tags: [AI, Next.js, Claude, Tutorial]
category: AI
featured: true
popular: true
---

An AI assistant that answers visitors' questions from your own content is one of the most useful AI features you can add to a website. In this tutorial I'll show how to build one with Claude and Next.js — the approach works for a portfolio, a business site, a documentation portal or an e-commerce FAQ.

## The architecture

```text
Browser ──POST /api/assistant──▶ Next.js route handler ──▶ Claude API
   ▲                                   │
   └──────── streamed text ◀───────────┘
```

- The **API key stays on the server** (never in client code).
- The server builds a **system prompt** containing the site's knowledge.
- The response **streams** back so users see words immediately.

## Do you need a vector database?

For a small site, **no**. "RAG" (retrieval-augmented generation) with embeddings and a vector store makes sense when your content is far larger than what fits in a prompt. A portfolio, a services site or a product FAQ easily fits in the model's context window — so I put the whole knowledge base in the system prompt and use **prompt caching** so it's cheap.

## 1. Install the SDK

```bash
npm install @anthropic-ai/sdk
```

Add `ANTHROPIC_API_KEY` to your environment (in Vercel: Project → Settings → Environment Variables).

## 2. Build the knowledge base

Generate it from the same data your pages use, so it never goes stale:

```js
// lib/knowledge.js
import { projects } from '@/app/data/projects';

export function buildKnowledge() {
  return projects
    .map((p) => `## ${p.title}\n${p.overview}\nStack: ${p.tags.join(', ')}`)
    .join('\n\n');
}
```

## 3. The streaming route handler

```js
// app/api/assistant/route.js
import Anthropic from '@anthropic-ai/sdk';
import { buildKnowledge } from '@/lib/knowledge';

const client = new Anthropic();
const SYSTEM = `You are the assistant on example.com. Answer only using
the knowledge below. If something isn't covered, say so and suggest the
contact page.\n\n${buildKnowledge()}`;

export async function POST(req) {
  const { messages } = await req.json();

  const stream = client.messages.stream({
    model: 'claude-opus-5-5',
    max_tokens: 2048,
    output_config: { effort: 'low' },          // quick chat answers
    system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
    messages,
  });

  const encoder = new TextEncoder();
  const body = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
          controller.enqueue(encoder.encode(event.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
```

Key details:

- **`cache_control` on the system prompt** — after the first request, the knowledge base is read from cache at a fraction of the price.
- **Keep the system prompt identical between requests.** Putting a timestamp in it would break caching.
- **`effort: 'low'`** keeps chat answers fast and cheap; raise it for harder tasks.

## 4. Read the stream in the browser

```js
const res = await fetch('/api/assistant', {
  method: 'POST',
  body: JSON.stringify({ messages }),
});
const reader = res.body.getReader();
const decoder = new TextDecoder();
let answer = '';
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  answer += decoder.decode(value, { stream: true });
  setAnswer(answer); // update UI progressively
}
```

## 5. Protect your wallet

A public AI endpoint is an open invitation to abuse. At minimum:

- **Validate input**: cap message length and conversation length on the server.
- **Rate limit** per IP (an in-memory map works for a demo; use Redis or your platform's firewall rules in production).
- **Set a spending limit** in the Anthropic Console.
- **Constrain the scope** in the system prompt so it can't be used as a free general-purpose chatbot.

## 6. Make it safe and honest

- Tell the model to answer only from the provided knowledge and to admit when it doesn't know.
- Don't put secrets or private data in the system prompt — assume users can extract it.
- Label it clearly as an AI assistant.

## What it costs

With a cached knowledge base, `low` effort and short answers, a personal site's assistant typically costs very little per conversation. Check current pricing on Anthropic's site, watch usage in the Console for the first weeks, and adjust limits.

## Key takeaways

- Small sites don't need a vector database: put the knowledge in a cached system prompt.
- Stream responses for a fast-feeling UI.
- Keep the API key server-side and add rate limits and input caps.
- Ground the assistant in your own content and let it say "I don't know".
