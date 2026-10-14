import { SITE_URL } from "./site";

const PRIVATE = ["/dashboard", "/login", "/register", "/api/"];

// Search and AI crawlers explicitly welcome so the profile shows up in search and AI answers
const AI_BOTS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User", "anthropic-ai",
  "PerplexityBot", "Perplexity-User",
  "Google-Extended", "Applebot", "Applebot-Extended",
  "Bingbot", "DuckDuckBot", "YandexBot", "CCBot", "meta-externalagent",
];

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE },
      { userAgent: AI_BOTS, allow: "/", disallow: PRIVATE },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
