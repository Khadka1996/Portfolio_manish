---
title: Building an SEO-Friendly News Portal with Next.js: Lessons from The Everest News
description: Architecture and SEO lessons from building Nepali and English news portals with Next.js, Express and MongoDB — article schema, sitemaps for thousands of URLs, Unicode slugs, image performance and editor workflows.
date: 2026-09-27
tags: [Next.js, SEO, Case Study, MongoDB]
category: Case Study
featured: true
---

News websites are one of the hardest SEO challenges: thousands of pages, content that changes every hour, heavy images, and competition from established outlets. I built **The Everest News** — a Nepali-language portal and its English edition — with a Next.js frontend, an Express + MongoDB backend and a separate admin CMS. These are the lessons that mattered most.

## Architecture

```text
Editors ──▶ Admin CMS (React) ──▶ Express API ──▶ MongoDB
                                      │
Readers ◀── Next.js (SSR/ISR) ◀───────┘
```

- **MongoDB** fits articles well: each article is one document with its category, tags, author and images embedded.
- **Next.js** renders pages on the server so search engines get full HTML.
- The **admin CMS** is a separate app, so editor traffic never slows down readers.

## 1. Server-render every article

Google can render JavaScript, but news needs to be indexed **fast**. Server-rendered or statically generated pages with on-demand revalidation give you the best of both: fast HTML for crawlers and fresh content for readers. The pattern that works well: when an editor publishes, the API calls the frontend to revalidate that article and the homepage.

## 2. NewsArticle structured data

```js
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: article.title,
  image: [article.imageUrl],
  datePublished: article.publishedAt,
  dateModified: article.updatedAt,
  author: [{ '@type': 'Person', name: article.authorName }],
  publisher: { '@type': 'Organization', name: 'The Everest News' },
};
```

Accurate `datePublished` and `dateModified` matter a lot for news — never fake "updated" dates to look fresh.

## 3. Sitemaps that scale

A single sitemap file is limited to 50,000 URLs. For a growing news site:

- Split sitemaps by month or category and list them in a **sitemap index**.
- Maintain a separate **news sitemap** covering only recent articles.
- Generate them dynamically from the database, cached for a few minutes.

## 4. Nepali (Devanagari) URLs and slugs

Nepali titles raise a real question: Devanagari slugs or English transliteration? Unicode URLs work in browsers and search engines, but they become long percent-encoded strings when shared. A pragmatic approach is a short, stable ID in the URL plus an optional readable slug — the ID guarantees the link never breaks even if the title is edited.

Also set `<html lang="ne">` for the Nepali edition and `lang="en"` for the English one, and link the editions with `hreflang` where articles are true translations.

## 5. Images are the performance bottleneck

News pages are image-heavy. The biggest performance wins come from:

- serving modern formats (WebP/AVIF) at the right size with `next/image`
- giving every image explicit dimensions to avoid layout shift (CLS)
- marking only the lead image as high priority and lazy-loading the rest
- compressing uploads on the server when editors add them

## 6. Category and tag pages are SEO assets

Category pages ("Politics", "Sports") and tag pages can rank for broad searches — if they have real content: a heading, a short description and a well-structured list of recent articles. Thin, duplicate tag pages should be `noindex`.

## 7. Editor workflow is part of SEO

Most SEO problems on news sites are editorial, not technical. Build the CMS to help editors:

- required fields for title, summary and featured image
- a character counter for SEO titles and descriptions
- automatic slug generation with manual override
- previews before publishing

## 8. Ads without destroying Core Web Vitals

Ads pay for news. To keep them from wrecking performance, reserve fixed space for ad slots (no layout shift), load ad scripts after the main content, and avoid stacking multiple ad networks on one page.

## Key takeaways

- Server-render articles and revalidate on publish.
- Use accurate `NewsArticle` schema and scalable sitemaps.
- Decide on a URL strategy for non-Latin titles early; IDs keep links stable.
- Images and ads decide your Core Web Vitals.
- Build SEO into the editor workflow.

Need a news portal or content-heavy website? [Get in touch](/contact).
