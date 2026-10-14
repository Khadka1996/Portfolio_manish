---
title: Model Context Protocol (MCP) Explained for Web Developers — With a Working Server
description: What MCP is, why it became the standard way to connect AI models to tools in 2026, and how to build a small MCP server in Node.js — plus the security rules you shouldn't skip.
date: 2026-10-08
tags: [AI, MCP, Node.js, Backend]
category: AI
featured: true
popular: true
---

If you've used an AI assistant that can read your GitHub issues, query a database or search your company docs, there's a good chance it was talking to those systems through the **Model Context Protocol (MCP)**. Anthropic introduced MCP as an open standard in late 2024, and by 2026 it's the default way AI tools connect to the outside world.

As a web developer, you already understand the idea — MCP is to AI tools roughly what REST conventions are to web APIs.

## The problem MCP solves

Before MCP, every AI app needed custom integrations: one for Slack, another for Postgres, another for Jira. With *M* AI clients and *N* tools, that's *M × N* integrations.

MCP turns it into *M + N*:

- **Clients** (Claude, IDEs, agent frameworks) speak MCP once.
- **Servers** wrap a tool or data source once.
- Any client can use any server.

## Core concepts

An MCP server can expose three kinds of things:

| Primitive | What it is | Example |
|---|---|---|
| **Tools** | Functions the model can call | `create_invoice`, `search_orders` |
| **Resources** | Read-only data the client can load | a file, a DB row, API docs |
| **Prompts** | Reusable prompt templates | "summarise this pull request" |

Servers talk to clients over a **transport**: `stdio` for local tools launched as a subprocess, or **Streamable HTTP** for remote servers.

## Building a tiny MCP server in Node.js

Let's expose a "project lookup" tool — the kind of thing I'd build to let an assistant answer questions about a client's portfolio.

```bash
npm init -y
npm install @modelcontextprotocol/sdk zod
```

```js
// server.mjs
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const projects = [
  { name: 'Wonder Travelers', stack: ['Next.js', 'Express', 'MongoDB', 'Redis'] },
  { name: 'Visa Sponsor Jobs', stack: ['Next.js', 'TypeScript'] },
];

const server = new McpServer({ name: 'portfolio', version: '1.0.0' });

server.registerTool(
  'find_projects',
  {
    title: 'Find projects',
    description: 'Find portfolio projects that use a given technology',
    inputSchema: { technology: z.string().describe('e.g. "Redis" or "Next.js"') },
  },
  async ({ technology }) => {
    const matches = projects.filter((p) =>
      p.stack.some((s) => s.toLowerCase() === technology.toLowerCase())
    );
    return {
      content: [{ type: 'text', text: JSON.stringify(matches, null, 2) }],
    };
  }
);

await server.connect(new StdioServerTransport());
```

Point an MCP-capable client at `node server.mjs`, and the model can now call `find_projects` when a user asks "which of your projects use Redis?".

> SDK APIs evolve quickly — check the official MCP TypeScript SDK README for the current method names before copying this into production.

## Designing good MCP tools

The model only knows what your descriptions tell it. A few rules I follow:

1. **Name tools by intent**, not implementation: `search_orders`, not `run_sql`.
2. **Write descriptions for a smart new teammate**: what it does, when to use it, what it returns.
3. **Validate every input** with a schema. Treat model-provided arguments exactly like user input.
4. **Return compact results.** Big JSON blobs waste context window and money.
5. **Prefer several narrow tools over one "do anything" tool.**

## Security: the part people skip

An MCP server runs with whatever permissions you give it. In 2026 the community is learning this the hard way.

- **Least privilege.** A reporting tool needs read-only DB credentials, not admin.
- **Never trust tool output blindly.** Content fetched from the web or a ticket can contain prompt-injection text ("ignore previous instructions…"). Your client should treat tool results as *data*, not instructions.
- **Audit third-party servers** before installing them, just like npm packages (see my [npm supply-chain checklist](/blog/npm-supply-chain-security-checklist)).
- **Require confirmation for destructive actions** — deleting records, sending emails, making payments.
- **Log every tool call** in production so you can trace what happened.

## When *not* to use MCP

MCP shines when many AI clients need the same tools. If you're building a single web app feature — like the AI assistant on this site — calling the model API directly with your own tool definitions is simpler. Some teams have also pulled back from connecting dozens of servers, because each tool description costs tokens on every request. Connect what the task needs.

## Key takeaways

- MCP standardises how AI models use tools, resources and prompts.
- A useful server can be ~40 lines of Node.js.
- Tool names and descriptions are your "API docs" for the model — write them carefully.
- Treat MCP servers as privileged code: least privilege, validation, confirmation and logging.
