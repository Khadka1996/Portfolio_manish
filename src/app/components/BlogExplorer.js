'use client';

import { useMemo, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import PostCard from './PostCard';

// Category tabs + instant search over all posts
export default function BlogExplorer({ posts }) {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');

  const categories = useMemo(() => {
    const counts = {};
    for (const p of posts) counts[p.category] = (counts[p.category] || 0) + 1;
    return [['All', posts.length], ...Object.entries(counts).sort((a, b) => b[1] - a[1])];
  }, [posts]);

  const q = query.trim().toLowerCase();
  const visible = posts.filter(
    (p) =>
      (category === 'All' || p.category === category) &&
      (!q || `${p.title} ${p.description} ${p.tags.join(' ')}`.toLowerCase().includes(q))
  );

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]" role="group" aria-label="Filter by category">
          {categories.map(([name, count]) => (
            <button
              key={name}
              onClick={() => setCategory(name)}
              aria-pressed={category === name}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${
                category === name ? 'border-white bg-white text-black' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
              }`}
            >
              {name} <span className={category === name ? 'text-black/50' : 'text-gray-600'}>{count}</span>
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-72 shrink-0">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" aria-hidden="true" />
          <label htmlFor="blog-search" className="sr-only">Search articles</label>
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            className="w-full rounded-full border border-white/10 bg-white/[0.03] py-2 pl-10 pr-9 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/60"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white" aria-label="Clear search">
              <FiX />
            </button>
          )}
        </div>
      </div>

      {visible.length > 0 ? (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((p) => (
            <li key={p.slug} className="reveal">
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="glass rounded-2xl p-10 text-center text-gray-400">
          No articles match “{query}”. Try another keyword.
        </p>
      )}
    </>
  );
}
