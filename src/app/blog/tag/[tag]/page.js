import Link from 'next/link';
import { notFound } from 'next/navigation';
import NavBar from '../../../components/Header';
import Footer from '../../../components/Footer';
import WhatsAppButton from '../../../components/WhatsAppButton';
import PostCard from '../../../components/PostCard';
import { getAllTags, getPostsByTag } from '@/lib/blog';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t.slug }));
}

const findTag = async (params) => {
  const { tag } = await params;
  return getAllTags().find((t) => t.slug === tag);
};

export async function generateMetadata({ params }) {
  const tag = await findTag(params);
  if (!tag) return {};
  return {
    title: `${tag.tag} Articles`,
    description: `${tag.count} article${tag.count > 1 ? 's' : ''} about ${tag.tag} by Manish Khadka — practical guides with code examples.`,
    alternates: { canonical: `/blog/tag/${tag.slug}` },
    // Thin tag pages stay out of the index; they still pass link equity
    robots: tag.count < 2 ? { index: false, follow: true } : undefined,
  };
}

export default async function TagPage({ params }) {
  const tag = await findTag(params);
  if (!tag) notFound();
  const posts = getPostsByTag(tag.slug);

  return (
    <>
      <NavBar />
      <main id="main" className="text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
            <Link href="/blog" className="hover:text-white">Blog</Link> <span aria-hidden="true">/</span> Tags
          </nav>
          <p className="eyebrow">Topic</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold">#{tag.tag}</h1>
          <p className="mt-3 text-gray-400">{posts.length} article{posts.length > 1 ? 's' : ''}</p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
          <div className="mt-12 flex flex-wrap gap-2">
            {getAllTags().map((t) => (
              <Link key={t.slug} href={`/blog/tag/${t.slug}`} className={`chip hover:text-white ${t.slug === tag.slug ? '!border-accent/60 !text-white' : ''}`}>
                #{t.tag}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
