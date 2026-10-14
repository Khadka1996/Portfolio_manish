import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiArrowLeft, FiArrowRight, FiClock, FiCalendar } from 'react-icons/fi';
import { FaXTwitter, FaLinkedin, FaFacebook, FaWhatsapp } from 'react-icons/fa6';
import NavBar from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import PostCard from '../../components/PostCard';
import Manish from '../../assets/user2.jpg';
import { getAllPosts, getPost, getRelatedPosts, formatDate, slugify } from '@/lib/blog';
import { SITE_URL, PERSON } from '../../site';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: PERSON.name, url: SITE_URL }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [PERSON.name],
      tags: post.tags,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === post.slug);
  const newer = posts[index - 1];
  const older = posts[index + 1];
  const related = getRelatedPosts(post);
  const url = `${SITE_URL}/blog/${post.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: post.title,
        description: post.description,
        url,
        mainEntityOfPage: url,
        image: `${url}/opengraph-image`,
        datePublished: post.date,
        dateModified: post.updated,
        wordCount: post.words,
        keywords: post.tags.join(', '),
        articleSection: post.category,
        inLanguage: 'en',
        author: { '@id': `${SITE_URL}/#person`, name: PERSON.name, url: `${SITE_URL}/about` },
        publisher: { '@id': `${SITE_URL}/#person` },
        isPartOf: { '@id': `${SITE_URL}/blog#blog` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  const share = [
    { icon: FaXTwitter, label: 'Share on X', href: `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}` },
    { icon: FaLinkedin, label: 'Share on LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { icon: FaFacebook, label: 'Share on Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { icon: FaWhatsapp, label: 'Share on WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${post.title} ${url}`)}` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NavBar />
      <main id="main" className="text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-gray-300 line-clamp-1">{post.title}</li>
            </ol>
          </nav>

          <header className="max-w-3xl">
            <p className="eyebrow enter enter-1">{post.category}</p>
            <h1 className="enter enter-2 mt-3 text-3xl sm:text-4xl font-semibold leading-tight">{post.title}</h1>
            <p className="enter enter-3 mt-4 text-[1.02rem] text-gray-400 leading-relaxed">{post.description}</p>
            <div className="enter enter-4 mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-gray-400">
              <Link href="/about" className="flex items-center gap-2.5 hover:text-white">
                <span className="relative h-8 w-8 overflow-hidden rounded-full bg-white border border-white/15">
                  <Image src={Manish} alt="" fill sizes="32px" className="object-cover" />
                </span>
                {PERSON.name}
              </Link>
              <span className="flex items-center gap-1.5"><FiCalendar aria-hidden="true" /><time dateTime={post.date}>{formatDate(post.date)}</time></span>
              <span className="flex items-center gap-1.5"><FiClock aria-hidden="true" />{post.readingMinutes} min read</span>
            </div>
            <ul className="enter enter-5 mt-5 flex flex-wrap gap-2" aria-label="Tags">
              {post.tags.map((t) => (
                <li key={t}><Link href={`/blog/tag/${slugify(t)}`} className="chip hover:text-white hover:border-accent/50">#{t}</Link></li>
              ))}
            </ul>
          </header>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_240px] gap-12">
            <article className="prose-blog max-w-3xl min-w-0" dangerouslySetInnerHTML={{ __html: post.html }} />

            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {post.headings.length > 0 && (
                  <nav aria-label="Table of contents" className="glass rounded-2xl p-5">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-gray-500 mb-3">On this page</p>
                    <ul className="space-y-2 text-sm">
                      {post.headings.map((h) => (
                        <li key={h.id} className={h.depth === 3 ? 'pl-3' : ''}>
                          <a href={`#${h.id}`} className="text-gray-400 hover:text-accent transition-colors">{h.text}</a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
                <div className="glass rounded-2xl p-5">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-gray-500 mb-3">Share</p>
                  <ul className="flex gap-2">
                    {share.map(({ icon: Icon, label, href }) => (
                      <li key={label}>
                        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/30">
                          <Icon className="h-4 w-4" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>

          {/* Author box */}
          <section className="reveal max-w-3xl mt-16 glass rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-start" aria-label="About the author">
            <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-white border border-white/15">
              <Image src={Manish} alt="Manish Khadka" fill sizes="64px" className="object-cover" />
            </span>
            <div>
              <p className="font-medium">Written by {PERSON.name}</p>
              <p className="mt-1 text-sm text-gray-400 leading-relaxed">
                Full Stack Developer in Kathmandu, Nepal. I build fast, SEO-friendly web apps with Next.js, React,
                TypeScript, Node.js and Java Spring Boot. 15+ projects shipped for news, education, travel and
                e-commerce clients.
              </p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm">
                <Link href="/about" className="text-accent hover:underline">More about me</Link>
                <Link href="/work" className="text-accent hover:underline">See my work</Link>
                <Link href="/contact" className="text-accent hover:underline">Hire me</Link>
              </div>
            </div>
          </section>

          {/* Older / newer */}
          <nav aria-label="More articles" className="max-w-3xl mt-8 grid sm:grid-cols-2 gap-4">
            {older ? (
              <Link href={`/blog/${older.slug}`} className="group glass glass-hover rounded-xl p-5">
                <span className="text-xs text-gray-500 flex items-center gap-1"><FiArrowLeft aria-hidden="true" /> Previous</span>
                <span className="mt-1 block text-sm font-medium group-hover:text-accent">{older.title}</span>
              </Link>
            ) : <span />}
            {newer && (
              <Link href={`/blog/${newer.slug}`} className="group glass glass-hover rounded-xl p-5 sm:text-right">
                <span className="text-xs text-gray-500 flex items-center gap-1 sm:justify-end">Next <FiArrowRight aria-hidden="true" /></span>
                <span className="mt-1 block text-sm font-medium group-hover:text-accent">{newer.title}</span>
              </Link>
            )}
          </nav>

          {related.length > 0 && (
            <section className="mt-16" aria-labelledby="related">
              <h2 id="related" className="section-title mb-6">Related articles</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {related.map((p) => <PostCard key={p.slug} post={p} />)}
              </div>
            </section>
          )}
        </div>
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
