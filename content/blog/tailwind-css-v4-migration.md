---
title: Tailwind CSS v4: What Changed and How to Migrate a Real Project
description: Tailwind CSS v4 moved configuration into CSS, rebuilt the engine and added modern CSS features. Here's what changed, how to migrate a Next.js project from v3, and the gotchas to watch for.
date: 2026-08-25
tags: [CSS, Tailwind CSS, Frontend, Next.js]
category: Web Development
---

Most of my newer projects — Visa Sponsor Jobs, Himalaya Threads, ChronoVault — run on **Tailwind CSS v4**. It's not just a version bump: configuration moved into CSS, the engine was rewritten for speed, and it leans on modern CSS like cascade layers and container queries.

## The headline changes

1. **CSS-first configuration.** No more `tailwind.config.js` by default — you define your theme in CSS.
2. **One import.** `@import "tailwindcss";` replaces the three `@tailwind` directives.
3. **Automatic content detection.** You usually don't need to list your template paths.
4. **A much faster engine.** Full and incremental builds are dramatically quicker.
5. **Modern CSS built in.** Container queries, `color-mix()`, cascade layers and wide-gamut colours work out of the box.

## Before and after

**v3:**

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: { extend: { colors: { accent: '#1DCD9F' } } },
};
```

**v4:**

```css
/* globals.css */
@import "tailwindcss";

@theme {
  --color-accent: #1DCD9F;
  --font-sans: "Inter", system-ui, sans-serif;
}
```

Every theme value becomes a real **CSS variable** (`var(--color-accent)`), which you can use anywhere — handy for canvas animations, inline styles and third-party components.

## Migrating a Next.js project

1. Run the official upgrade tool on a clean Git branch:

   ```bash
   npx @tailwindcss/upgrade
   ```

2. Install the PostCSS plugin:

   ```js
   // postcss.config.mjs
   export default { plugins: { '@tailwindcss/postcss': {} } };
   ```

3. Replace the `@tailwind` directives with `@import "tailwindcss";`.
4. Move your theme from the JS config into `@theme`. (You can still load a JS config with `@config` while migrating.)
5. Run the app and check every page visually.

## Gotchas I hit

- **Renamed utilities.** Some scales shifted (for example shadow, blur and rounded sizes), and a few utilities were renamed. The upgrade tool handles most of them; review the diff.
- **Default border colour** changed to `currentColor`. Add explicit border colours where you relied on the old grey.
- **`@apply` in CSS modules or component styles** needs `@reference` to the main stylesheet so it knows your theme.
- **Browser support.** v4 targets modern browsers (it relies on features like `@property` and cascade layers). If you must support very old browsers, stay on v3.4.

## Container queries without a plugin

My favourite new feature: components that adapt to **their container**, not the viewport.

```html
<div class="@container">
  <article class="grid @md:grid-cols-2 gap-4">…</article>
</div>
```

Perfect for cards that appear in both a wide grid and a narrow sidebar.

## Should you migrate?

- **New projects:** use v4.
- **Existing v3 projects:** migrate when you have time to visually check every page. There's no urgency if v3 works for you — this very portfolio still runs v3 happily.

## Key takeaways

- Theme lives in CSS with `@theme`; tokens become CSS variables.
- `@import "tailwindcss"` and automatic content detection simplify setup.
- Use the official upgrade tool, then review visual changes carefully.
- Container queries are built in and worth adopting.
