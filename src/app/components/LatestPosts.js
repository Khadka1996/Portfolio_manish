import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import PostCard from './PostCard';
import { getAllPosts } from '@/lib/blog';

export default function LatestPosts() {
  const posts = getAllPosts().slice(0, 3);
  return (
    <section id="blog" className="text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Writing" title="Latest from the blog">
            Practical guides on AI, Next.js, SEO and backend engineering.
          </SectionHeading>
          <Link href="/blog" className="reveal mb-10 inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-accent transition-colors">
            All articles <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {posts.map((p) => <PostCard key={p.slug} post={p} large />)}
        </div>
      </div>
    </section>
  );
}
