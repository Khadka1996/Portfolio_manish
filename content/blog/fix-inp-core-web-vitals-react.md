---
title: How to Fix INP in React and Next.js Apps (Core Web Vitals Guide)
description: Interaction to Next Paint is the Core Web Vital most React sites fail. Here's how to measure it, find the slow interactions, and fix them with transitions, yielding and less JavaScript.
date: 2026-09-24
tags: [Performance, React, Next.js, SEO]
category: Performance
popular: true
---

**Interaction to Next Paint (INP)** replaced First Input Delay as a Core Web Vital in March 2024, and it's the metric I see React sites fail most often. LCP is about loading; INP is about **how quickly the page responds when someone taps, clicks or types** — for the whole visit, not just the first interaction.

Google's thresholds:

| INP | Rating |
|---|---|
| ≤ 200 ms | Good |
| 200–500 ms | Needs improvement |
| > 500 ms | Poor |

On mid-range Android phones — the reality for most users in Nepal and South Asia — a React app that feels instant on a MacBook can easily sit at 400 ms+.

## Step 1: Measure real users, not just Lighthouse

Lighthouse can't measure INP because it doesn't interact with your page. Use field data:

- **Search Console → Core Web Vitals report** (real Chrome users)
- **Vercel Speed Insights** or the `web-vitals` library:

```js
import { onINP } from 'web-vitals/attribution';

onINP(({ value, attribution }) => {
  // attribution tells you which element and which phase was slow
  navigator.sendBeacon('/api/vitals', JSON.stringify({
    value,
    target: attribution.interactionTarget,
    inputDelay: attribution.inputDelay,
    processing: attribution.processingDuration,
    presentation: attribution.presentationDelay,
  }));
});
```

INP has three phases: **input delay** (main thread busy), **processing** (your event handlers), and **presentation delay** (rendering the next frame). The attribution tells you which one to fix.

## Step 2: Find the slow interaction

In Chrome DevTools → Performance, record while clicking the slow element. Look for long tasks (red corners, > 50 ms) right after the click. Usual suspects in React apps:

- filtering/sorting a big list on every keystroke
- re-rendering an entire page because of one piece of state
- heavy third-party scripts (chat widgets, analytics, ads)
- hydration still running when the user first taps

## Step 3: Fix it

### Mark non-urgent updates as transitions

Typing should update the input instantly; filtering 2,000 items can wait a frame:

```jsx
import { useState, useTransition } from 'react';

function Search({ items }) {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(items);
  const [isPending, startTransition] = useTransition();

  function onChange(e) {
    const q = e.target.value;
    setQuery(q);                         // urgent
    startTransition(() => {              // interruptible
      setFiltered(items.filter((i) => i.title.toLowerCase().includes(q.toLowerCase())));
    });
  }

  return (
    <>
      <input value={query} onChange={onChange} />
      <List items={filtered} dimmed={isPending} />
    </>
  );
}
```

`useDeferredValue` achieves the same when you don't control the state update.

### Yield to the main thread in long handlers

If a click handler must do real work, give the browser a chance to paint first:

```js
async function onSave() {
  showSpinner();
  await scheduler.yield?.() ?? new Promise((r) => setTimeout(r, 0));
  doExpensiveWork();
}
```

### Ship less JavaScript

The fastest code is code you don't send:

- Keep components as **Server Components** unless they need interactivity.
- Replace heavy animation libraries with CSS where possible. On this portfolio, moving entrance animations to CSS cut the homepage's first-load JavaScript by about 30%.
- Import icons individually and enable `optimizePackageImports` in Next.js.
- Lazy-load below-the-fold widgets with `next/dynamic`.

### Virtualise long lists

Rendering 5,000 DOM nodes is slow no matter how good your React code is. Use a virtualised list for long tables and feeds.

### Tame third-party scripts

Load analytics, chat and ads with `next/script` and `strategy="lazyOnload"` or after interaction. Chat widgets and ad scripts can easily add hundreds of milliseconds of main-thread work — measure each one in the Performance panel.

### Use the React Compiler

Automatic memoisation prevents many unnecessary re-renders without manual `useMemo`. See my [React 19 guide](/blog/react-19-features-production).

## Step 4: Verify in the field

Field data takes ~28 days to fully reflect changes in Search Console. Track your own `web-vitals` beacons to see improvements within days.

## Key takeaways

- INP measures responsiveness across the whole visit; aim for ≤ 200 ms on real phones.
- Measure with field data and attribution, not just Lighthouse.
- Use transitions/deferred values for non-urgent updates and yield in long handlers.
- The biggest wins usually come from shipping less JavaScript.
