---
title: SEO in the Age of AI Search: What Actually Works in 2026
description: Google AI Overviews, ChatGPT search and Perplexity are changing how people find websites. Here's a developer's checklist for being found — and cited — by both search engines and AI assistants.
date: 2026-10-10
tags: [SEO, AI, Next.js, Web Development]
category: SEO
featured: true
popular: true
---

"Do I need a new strategy for AI search?" is the question I get most from clients this year. Google AI Overviews and AI Mode, ChatGPT search, Perplexity and Claude now answer many questions directly — sometimes without a click.

The honest answer: **mostly no — but the fundamentals matter more than ever.** Google's own AI search guidance (published in May 2026) frames optimising for generative search as simply *good SEO*. What changed is how unforgiving AI systems are of slow, thin or hard-to-parse sites.

Here's the checklist I use, and that I applied to this very website.

## 1. Let the right crawlers in

You can't be cited if you're blocked. Check `robots.txt` **and** your CDN/firewall rules. Many AI companies run separate bots for training, indexing and live fetching:

```txt
User-Agent: *
Allow: /
Disallow: /dashboard

User-Agent: GPTBot
User-Agent: OAI-SearchBot
User-Agent: ClaudeBot
User-Agent: PerplexityBot
Allow: /
```

In Next.js, generate it from `app/robots.js` so it stays in version control.

## 2. Server-render everything you want cited

AI crawlers are often less patient with JavaScript than Googlebot. If your content only appears after client-side fetching, it may never be seen. On this site, project pages and blog posts are statically generated — the full text is in the initial HTML.

Quick test: `curl https://yoursite.com/page | grep "a sentence from your content"`.

## 3. Structure content so it can be quoted

AI answers are built from **passages**. Make yours easy to extract:

- One clear `<h1>`, logical `<h2>`/`<h3>` hierarchy.
- Short paragraphs that make one point each.
- Answer the question in the first sentence of a section, then elaborate.
- Use lists and tables for comparisons.
- Add an FAQ section for questions people actually ask.

## 4. Structured data (JSON-LD)

Schema.org markup removes ambiguity about *what* a page is and *who* it's about. For a personal or business site, the essentials:

- `Person` or `Organization` (with `sameAs` links to your LinkedIn, GitHub, etc.)
- `WebSite`
- `Article`/`BlogPosting` for posts, with author and dates
- `BreadcrumbList`
- `FAQPage` for FAQ sections

```jsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
/>
```

## 5. Be an entity, not just a website

AI systems try to understand **entities** — people, companies, products — and how they connect. Help them:

- Use the **same name and headline everywhere** (site, LinkedIn, GitHub, X).
- Link your profiles with `rel="me"` and `sameAs`.
- Get mentioned on other credible sites: client websites ("Built by…"), community posts, interviews.

Earned mentions are the closest thing AI search has to backlinks.

## 6. llms.txt: nice to have, not magic

`/llms.txt` is a proposed Markdown file summarising your site for language models. It isn't an official standard, and Google has not said it uses it. I still publish one on this site because it's cheap and gives assistants a clean, accurate summary. Just don't expect it to move rankings on its own.

## 7. Freshness and accuracy

AI answers favour content that's current and specific. Put dates on posts, update them when facts change, and avoid vague filler. A specific paragraph backed by real numbers from your own work is far more citable than generic advice.

## 8. Core Web Vitals still matter

Speed affects rankings, user experience and crawl efficiency. Aim for good LCP, CLS and especially [INP](/blog/fix-inp-core-web-vitals-react). Compress images, ship less JavaScript, and render on the server.

## 9. Measure the new traffic

- **Google Search Console** shows AI Overview impressions within normal search data.
- Watch referrals from `chatgpt.com`, `perplexity.ai` and similar in your analytics.
- Search your name and your key topics in several assistants every month and note who gets cited.

## The checklist

1. Crawlers allowed in `robots.txt` and CDN rules
2. Content server-rendered
3. Clean heading structure and quotable passages
4. JSON-LD for Person/Organization, Article, Breadcrumbs, FAQ
5. Consistent identity across the web + `sameAs`
6. Optional `llms.txt`
7. Dated, specific, updated content
8. Good Core Web Vitals
9. Search Console + referral tracking

AI search didn't replace SEO. It raised the bar for doing the basics properly.
