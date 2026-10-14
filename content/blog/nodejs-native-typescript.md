---
title: Node.js Runs TypeScript Natively Now — What Changes for Your Backend
description: Node.js can execute .ts files directly with type stripping. Here's what works, what doesn't (enums, namespaces), and how to set up a modern Express or API project without ts-node or a build step.
date: 2026-09-30
tags: [Node.js, TypeScript, Backend, JavaScript]
category: Backend
popular: true
---

For years, running TypeScript on the server meant `ts-node`, `tsx`, or a `tsc` build step. Modern Node.js can run `.ts` files **directly** through a feature called **type stripping**: Node removes the type annotations and runs the remaining JavaScript.

It started as an experimental flag in Node 22.6, became the default in 23.6, was backported to the Node 22 LTS line, and is reported as stable in the Node 24 LTS line. If you're starting a new API in late 2026, this is how I'd set it up.

## Hello, TypeScript — no build step

```ts
// server.ts
import express, { type Request, type Response } from 'express';

const app = express();

app.get('/health', (_req: Request, res: Response) => {
  res.json({ ok: true, uptime: process.uptime() });
});

app.listen(4000, () => console.log('API on :4000'));
```

```bash
node server.ts
```

That's it. No `dist/` folder for development.

## What type stripping does — and doesn't do

It **removes** types. It does **not**:

- **type-check** your code (you still need `tsc --noEmit` in CI)
- read `tsconfig.json` (paths, aliases, target settings are ignored)
- transform syntax that generates JavaScript

So these TypeScript features **don't work** with plain stripping:

| Feature | Why | Use instead |
|---|---|---|
| `enum` / `const enum` | generates code | union types or `as const` objects |
| `namespace` | generates code | ES modules |
| constructor parameter properties (`constructor(private x)`) | generates code | explicit fields |
| path aliases (`@/lib/...`) | tsconfig ignored | relative imports or package `imports` |
| legacy decorators | not erasable | avoid, or use a build step |

Turn on the compiler option that enforces this so your editor catches it:

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "nodenext",
    "noEmit": true,
    "erasableSyntaxOnly": true,
    "verbatimModuleSyntax": true,
    "allowImportingTsExtensions": true,
    "strict": true
  }
}
```

## Replace enums with `as const`

```ts
// Before
enum Role { Admin = 'admin', Editor = 'editor' }

// After
export const Role = { Admin: 'admin', Editor: 'editor' } as const;
export type Role = (typeof Role)[keyof typeof Role];
```

Same autocomplete, same type safety, zero generated code.

## Imports need real extensions

With ES modules in Node, write the actual file extension:

```ts
import { db } from './db.ts';
import type { User } from './types.ts';
```

Use `import type` for type-only imports — `verbatimModuleSyntax` will remind you.

## A production-ready `package.json`

```json
{
  "type": "module",
  "engines": { "node": ">=24" },
  "scripts": {
    "dev": "node --watch server.ts",
    "typecheck": "tsc --noEmit",
    "start": "node server.ts"
  }
}
```

`node --watch` replaces nodemon for most projects.

## Should you ship `.ts` straight to production?

For many internal APIs and small services — yes, it's simpler. For libraries you publish to npm, keep compiling to JavaScript with declaration files, because consumers may run older Node versions or bundlers.

If you deploy to a VPS or container, pin your Node version (`.nvmrc` or the Docker base image) so production and development strip types the same way.

## When I'd still use a build step

- You rely heavily on decorators (e.g. some ORMs or NestJS-style DI).
- You need path aliases across a large monorepo.
- You're bundling for edge runtimes or serverless cold-start size.

## Key takeaways

- `node file.ts` works in current Node LTS — no ts-node required.
- Type stripping removes types but **doesn't check them**: keep `tsc --noEmit` in CI.
- Avoid enums, namespaces and parameter properties; enable `erasableSyntaxOnly`.
- Use explicit `.ts` extensions and `import type`.
- Node 20 reached end of life in April 2026 — upgrade to an active LTS.
