import Link from 'next/link';
import NavBar from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import SectionHeading from '../components/SectionHeading';
import PostCard from '../components/PostCard';
import { getAllPosts, getAllTags } from '@/lib/blog';
import { SITE_URL, PERSON } from '../site';
import { FiRss } from 'react-icons/fi';

export const metadata = {
  title: 'Blog – AI, Next.js, React, SEO & Backend Engineering',
  description:
    'In-depth guides by Manish Khadka on AI coding agents, MCP, Next.js 16, React 19, SEO for AI search, Core Web Vitals, Node.js, Spring Boot, security and freelancing from Nepal.',
  alternates: { canonical: '/blog', types: { 'application/rss+xml': '/blog/rss.xml' } },
  openGraph: { title: 'Blog | Manish Khadka', url: '/blog' },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const featured = posts.filter((p) => p.featured).slice(0, 3);
  const popular = posts.filter((p) => p.popular && !featured.includes(p)).slice(0, 6);
  const tags = getAllTags();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog#blog`,
    name: `${PERSON.name} – Blog`,
    url: `${SITE_URL}/blog`,
    author: { '@id': `${SITE_URL}/#person` },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NavBar />
      <main id="main" className="text-white">
        <section className="pt-32 pb-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="eyebrow enter enter-1">Blog</p>
            <h1 className="enter enter-2 mt-3 max-w-3xl text-3xl sm:text-4xl font-semibold leading-tight">
              Practical guides on <span className="text-gradient">AI, the modern web</span> and shipping software
            </h1>
            <p className="enter enter-3 mt-4 max-w-2xl text-[0.95rem] text-gray-400 leading-relaxed">
              {posts.length} in-depth articles on AI coding agents, MCP, Next.js, React, SEO for AI search,
              performance, backend engineering and freelancing — written from real project experience.
            </p>
            <div className="enter enter-4 mt-6 flex flex-wrap gap-2">
              {tags.slice(0, 14).map((t) => (
                <Link key={t.slug} href={`/blog/tag/${t.slug}`} className="chip hover:border-accent/50 hover:text-white transition-colors">
                  #{t.tag} <span className="text-gray-500">{t.count}</span>
                </Link>
              ))}
              <a href="/blog/rss.xml" className="chip inline-flex items-center gap-1 hover:text-white"><FiRss aria-hidden="true" /> RSS</a>
            </div>
          </div>
        </section>

        <section className="py-10 px-4 sm:px-6 lg:px-8" aria-labelledby="featured">
          <div className="max-w-7xl mx-auto">
            <SectionHeading eyebrow="Featured" title={<span id="featured">Editor&apos;s picks</span>} />
            <div className="grid md:grid-cols-3 gap-4">
              {featured.map((p) => <PostCard key={p.slug} post={p} large />)}
            </div>
          </div>
        </section>

        <section className="py-10 px-4 sm:px-6 lg:px-8" aria-labelledby="popular">
          <div className="max-w-7xl mx-auto">
            <SectionHeading eyebrow="Trending" title={<span id="popular">Trending topics</span>}>
              Guides on the subjects developers and businesses are searching for in 2026.
            </SectionHeading>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {popular.map((p) => <PostCard key={p.slug} post={p} />)}
            </div>
          </div>
        </section>

        <section className="py-10 pb-20 px-4 sm:px-6 lg:px-8" aria-labelledby="all">
          <div className="max-w-7xl mx-auto">
            <SectionHeading eyebrow="Archive" title={<span id="all">All articles</span>} />
            <ol className="divide-y divide-white/[0.06] glass rounded-2xl overflow-hidden">
              {posts.map((p) => (
                <li key={p.slug} className="reveal">
                  <Link href={`/blog/${p.slug}`} className="group flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-5 py-4 hover:bg-white/[0.03] transition-colors">
                    <time dateTime={p.date} className="font-mono text-xs text-gray-500 sm:w-28 shrink-0">{p.date}</time>
                    <span className="flex-1 text-[0.95rem] group-hover:text-accent transition-colors">{p.title}</span>
                    <span className="font-mono text-[0.7rem] uppercase tracking-wider text-gray-500">{p.category}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
