// Static blog: Markdown files in /content/blog, read at build time.
import fs from 'node:fs';
import path from 'node:path';
import { Marked } from 'marked';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

// Minimal front-matter parser: `key: value` lines and `tags: [a, b]` lists.
function parseFrontMatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error('Blog post is missing front matter');
  const data = {};
  for (const line of match[1].split('\n')) {
    const i = line.indexOf(':');
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map((v) => v.trim()).filter(Boolean);
    } else if (value === 'true' || value === 'false') {
      value = value === 'true';
    } else {
      value = value.replace(/^["']|["']$/g, '');
    }
    data[key] = value;
  }
  return { data, body: match[2] };
}

function renderMarkdown(body) {
  const headings = [];
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const plain = text.replace(/<[^>]+>/g, '');
        const id = slugify(plain);
        if (depth === 2 || depth === 3) headings.push({ id, text: plain, depth });
        return `<h${depth} id="${id}"><a href="#${id}" class="anchor" aria-hidden="true">#</a>${text}</h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href) && !href.includes('khadka-manish.com.np');
        const t = title ? ` title="${title}"` : '';
        return external
          ? `<a href="${href}"${t} target="_blank" rel="noopener noreferrer">${text}</a>`
          : `<a href="${href}"${t}>${text}</a>`;
      },
    },
  });
  const html = marked.parse(body);
  return { html, headings };
}

let cache;

export function getAllPosts() {
  if (cache) return cache;
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));
  cache = files
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
      const { data, body } = parseFrontMatter(raw);
      const { html, headings } = renderMarkdown(body);
      const words = body.split(/\s+/).filter(Boolean).length;
      return {
        slug: file.replace(/\.md$/, ''),
        title: data.title,
        description: data.description,
        date: data.date,
        updated: data.updated || data.date,
        tags: data.tags || [],
        category: data.category || 'Engineering',
        featured: Boolean(data.featured),
        popular: Boolean(data.popular),
        readingMinutes: Math.max(1, Math.round(words / 220)),
        words,
        html,
        headings,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return cache;
}

export const getPost = (slug) => getAllPosts().find((p) => p.slug === slug);

export function getAllTags() {
  const counts = new Map();
  for (const p of getAllPosts()) for (const t of p.tags) counts.set(t, (counts.get(t) || 0) + 1);
  return [...counts.entries()].map(([tag, count]) => ({ tag, slug: slugify(tag), count })).sort((a, b) => b.count - a.count);
}

export const getPostsByTag = (tagSlug) => getAllPosts().filter((p) => p.tags.some((t) => slugify(t) === tagSlug));

export function getRelatedPosts(post, limit = 3) {
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: p.tags.filter((t) => post.tags.includes(t)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || (a.p.date < b.p.date ? 1 : -1))
    .slice(0, limit)
    .map((x) => x.p);
}

export { formatDate } from './format';
