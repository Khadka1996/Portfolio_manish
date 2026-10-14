---
title: React 19 in Production: Actions, useOptimistic, the Compiler and View Transitions
description: The React 19 features that actually changed how I build forms, mutations and animations in 2026 — with copy-paste examples and the gotchas I hit on real projects.
date: 2026-10-02
tags: [React, Frontend, Next.js, JavaScript]
category: Web Development
popular: true
---

React 19 has been stable for a while now, and the 19.x line keeps adding polish — [React 19.3](https://react.dev/versions) (September 2026) made **View Transitions** and **Fragment Refs** stable. If you learned React with `useEffect` + `useState` for every form, a lot of that boilerplate is now unnecessary.

Here are the features I use on every new project.

## 1. Actions and `useActionState`: forms without the boilerplate

Old pattern: `useState` for loading, error and data, an `onSubmit` handler, `preventDefault`, try/catch…

New pattern:

```jsx
'use client';
import { useActionState } from 'react';

async function subscribe(prevState, formData) {
  const email = formData.get('email');
  const res = await fetch('/api/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
  if (!res.ok) return { error: 'Could not subscribe. Try again.' };
  return { success: true };
}

export default function Newsletter() {
  const [state, formAction, isPending] = useActionState(subscribe, {});

  return (
    <form action={formAction}>
      <input name="email" type="email" required />
      <button disabled={isPending}>{isPending ? 'Saving…' : 'Subscribe'}</button>
      {state.error && <p role="alert">{state.error}</p>}
      {state.success && <p>Thanks for subscribing!</p>}
    </form>
  );
}
```

Pending state, errors and results are handled by React. In Next.js, the action can be a **Server Action** and the form works even before JavaScript loads.

## 2. `useOptimistic`: instant UI for slow networks

On news sites with comment sections, users in Nepal are often on mobile data. Waiting 800 ms to see your own comment feels broken. `useOptimistic` shows the result immediately and rolls back if the request fails:

```jsx
'use client';
import { useOptimistic } from 'react';

export function Comments({ comments, addComment }) {
  const [optimistic, addOptimistic] = useOptimistic(
    comments,
    (current, newComment) => [...current, { ...newComment, pending: true }]
  );

  async function action(formData) {
    const text = formData.get('text');
    addOptimistic({ id: crypto.randomUUID(), text });
    await addComment(text); // server action
  }

  return (
    <>
      <ul>
        {optimistic.map((c) => (
          <li key={c.id} style={{ opacity: c.pending ? 0.6 : 1 }}>{c.text}</li>
        ))}
      </ul>
      <form action={action}>
        <input name="text" required />
        <button>Post</button>
      </form>
    </>
  );
}
```

## 3. `use()`: read promises and context anywhere

`use` can read a promise (suspending until it resolves) or a context — and unlike hooks, it can be called conditionally. It pairs nicely with server components passing promises down to client components.

## 4. `ref` is just a prop

No more `forwardRef` wrapper for simple components:

```jsx
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}
```

## 5. The React Compiler: stop hand-writing `useMemo`

The React Compiler automatically memoises components and values, so most hand-written `useMemo`/`useCallback` calls become unnecessary. Enable it, run your tests, and keep the [Rules of React](https://react.dev/reference/rules) — the compiler relies on them.

## 6. View Transitions (stable in 19.3)

Smooth, native-feeling transitions between UI states — without an animation library:

```jsx
import { ViewTransition } from 'react';

<ViewTransition>
  {isGrid ? <ProjectGrid /> : <ProjectList />}
</ViewTransition>
```

React coordinates the browser's View Transitions API with its own updates (including `startTransition` and Suspense reveals). It's a big win for perceived quality — and it costs far less JavaScript than heavier animation libraries.

## 7. Document metadata in components

You can render `<title>`, `<meta>` and `<link>` inside components and React hoists them to `<head>`. In Next.js you'll usually still use the Metadata API for SEO, but this is handy in plain React apps.

## Gotchas I hit

- **Old libraries.** Some older component libraries relied on removed legacy APIs (string refs, `defaultProps` on function components). Check your dependencies before upgrading.
- **Hydration errors are stricter and clearer.** Good — but they'll surface bugs you didn't know you had, like rendering `Date.now()` on the server.
- **Actions run in transitions.** Don't put blocking `alert()` calls or long synchronous work in them.

## Key takeaways

- Use `useActionState` + form actions instead of hand-rolled submit handlers.
- `useOptimistic` makes slow networks feel fast.
- Turn on the React Compiler and delete manual memoisation.
- Try View Transitions for polish with almost no bundle cost.
