import Link from 'next/link';
import { FiArrowRight, FiArrowUpRight, FiRss } from 'react-icons/fi';
import NavBar from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { CoverArt } from '../components/PostCard';
import BlogExplorer from '../components/BlogExplorer';
import { getAllPosts, formatDate } from '@/lib/blog';
import { SITE_URL, PERSON } from '../site';

export const metadata = {
  title: 'Blog – AI, Next.js, React, SEO & Backend Engineering',
  description:
    'In-depth guides by Manish Khadka on AI coding agents, MCP, Next.js 16, React 19, SEO for AI search, Core Web Vitals, Node.js, Spring Boot, security and freelancing from Nepal.',
  alternates: { canonical: '/blog', types: { 'application/rss+xml': '/blog/rss.xml' } },
  openGraph: { title: 'Blog | Manish Khadka', url: '/blog' },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const [spotlight, ...rest] = posts.filter((p) => p.featured);
  const sideFeatures = rest.slice(0, 2);
  // Only what the client filter needs (no rendered HTML)
  const summaries = posts.map(({ slug, title, description, date, category, readingMinutes, tags }) => ({
    slug, title, description, date, category, readingMinutes, tags,
  }));

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
        {/* Hero */}
        <section className="pt-32 sm:pt-36 pb-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="eyebrow enter enter-1">The blog</p>
              <h1 className="enter enter-2 mt-3 text-4xl sm:text-5xl font-semibold leading-[1.08]">
                Notes on <span className="text-gradient">AI, the modern web</span> and shipping software
              </h1>
              <p className="enter enter-3 mt-5 text-[1.05rem] text-gray-400 leading-relaxed max-w-2xl">
                In-depth, practical guides on AI coding agents, Next.js, React, SEO for AI search, performance and
                backend engineering — written from real project work in Kathmandu.
              </p>
            </div>
            <div className="enter enter-4 flex items-center gap-3 text-sm text-gray-400">
              <span className="font-mono">{posts.length} articles</span>
              <span className="h-4 w-px bg-white/10" aria-hidden="true" />
              <a href="/blog/rss.xml" className="inline-flex items-center gap-1.5 hover:text-white"><FiRss aria-hidden="true" /> RSS</a>
            </div>
          </div>
        </section>

        {/* Spotlight */}
        {spotlight && (
          <section className="pb-16 px-4 sm:px-6 lg:px-8" aria-label="Featured articles">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.6fr_1fr] gap-5">
              <article className="enter enter-4 group relative glass glass-hover rounded-3xl overflow-hidden flex flex-col">
                <CoverArt category={spotlight.category} className="h-56 sm:h-72" iconSize="h-16 w-16" />
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <p className="font-mono text-xs text-gray-500">
                    <time dateTime={spotlight.date}>{formatDate(spotlight.date)}</time> · {spotlight.readingMinutes} min read
                  </p>
                  <h2 className="mt-3 text-2xl sm:text-3xl font-semibold leading-tight group-hover:text-accent transition-colors">
                    <Link href={`/blog/${spotlight.slug}`} className="after:absolute after:inset-0 after:content-['']">
                      {spotlight.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-gray-400 leading-relaxed">{spotlight.description}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-accent">
                    Read article <FiArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </article>

              <div className="grid gap-5">
                {sideFeatures.map((p) => (
                  <article key={p.slug} className="enter enter-5 group relative glass glass-hover rounded-3xl overflow-hidden grid grid-cols-[110px_1fr] sm:grid-cols-[150px_1fr]">
                    <CoverArt category={p.category} className="h-full min-h-[150px]" iconSize="h-8 w-8" />
                    <div className="p-5 flex flex-col">
                      <p className="font-mono text-[0.7rem] text-gray-500">{p.readingMinutes} min read</p>
                      <h2 className="mt-2 text-[1.05rem] font-semibold leading-snug group-hover:text-accent transition-colors">
                        <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0 after:content-['']">{p.title}</Link>
                      </h2>
                      <FiArrowUpRight className="mt-auto pt-3 h-7 w-7 text-gray-500 group-hover:text-accent" aria-hidden="true" />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Browse: category tabs + search */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8" aria-labelledby="browse">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <p className="eyebrow">Browse</p>
              <h2 id="browse" className="mt-3 section-title">All articles</h2>
            </div>
            <BlogExplorer posts={summaries} />
          </div>
        </section>

        {/* CTA */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8">
          <div className="reveal max-w-7xl mx-auto glass rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute -top-20 -left-10 h-60 w-60 rounded-full bg-violet-500/15 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <h2 className="text-xl sm:text-2xl font-semibold">Need help building something like this?</h2>
              <p className="mt-2 text-gray-400">I build fast, SEO-friendly web apps for businesses in Nepal and abroad.</p>
            </div>
            <Link href="/contact" className="relative btn-primary shrink-0">Start a project <FiArrowRight aria-hidden="true" /></Link>
          </div>
        </section>
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
