import { SITE_URL } from "./site";
import { projects } from "./data/projects";
import { getAllPosts, getAllTags } from "@/lib/blog";

const routes = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/work", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/blog", priority: 0.9, changeFrequency: "weekly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap() {
  const lastModified = new Date();
  return [
    ...routes.map(({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
    ...projects.map((p) => ({
      url: `${SITE_URL}/work/${p.slug}`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
      ...(p.image && { images: [`${SITE_URL}${p.image.src}`] }),
    })),
    ...getAllPosts().map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(`${p.updated}T00:00:00Z`),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...getAllTags()
      .filter((t) => t.count >= 2)
      .map((t) => ({ url: `${SITE_URL}/blog/tag/${t.slug}`, lastModified, changeFrequency: "weekly", priority: 0.5 })),
  ];
}
