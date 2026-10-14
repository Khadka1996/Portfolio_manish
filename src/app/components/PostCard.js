import Link from 'next/link';
import { FiArrowUpRight, FiCpu, FiCode, FiSearch, FiZap, FiServer, FiShield, FiCloud, FiBriefcase, FiBookOpen } from 'react-icons/fi';
import { formatDate } from '@/lib/format';

// Per-category art: gradient + icon, so cards look distinct without image downloads
export const categoryStyle = {
  AI: { icon: FiCpu, gradient: 'from-violet-600/40 via-fuchsia-500/10', glow: 'bg-violet-500/30' },
  'Web Development': { icon: FiCode, gradient: 'from-sky-500/40 via-cyan-500/10', glow: 'bg-sky-400/30' },
  SEO: { icon: FiSearch, gradient: 'from-amber-500/40 via-orange-500/10', glow: 'bg-amber-400/30' },
  Performance: { icon: FiZap, gradient: 'from-emerald-500/40 via-teal-500/10', glow: 'bg-emerald-400/30' },
  Backend: { icon: FiServer, gradient: 'from-rose-500/35 via-red-500/10', glow: 'bg-rose-400/30' },
  Security: { icon: FiShield, gradient: 'from-red-600/40 via-rose-500/10', glow: 'bg-red-500/30' },
  DevOps: { icon: FiCloud, gradient: 'from-indigo-500/40 via-blue-500/10', glow: 'bg-indigo-400/30' },
  Career: { icon: FiBriefcase, gradient: 'from-lime-500/35 via-emerald-500/10', glow: 'bg-lime-400/30' },
  'Case Study': { icon: FiBookOpen, gradient: 'from-teal-500/40 via-accent/10', glow: 'bg-teal-400/30' },
};
const fallback = { icon: FiCode, gradient: 'from-accent/30 via-accent/5', glow: 'bg-accent/30' };

export function CoverArt({ category, className = '', iconSize = 'h-10 w-10' }) {
  const { icon: Icon, gradient, glow } = categoryStyle[category] || fallback;
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} to-transparent ${className}`} aria-hidden="true">
      {/* faint star dust */}
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.7)_0.6px,transparent_0.6px)] [background-size:22px_22px]" />
      <div className={`absolute -right-6 -bottom-6 h-32 w-32 rounded-full blur-2xl ${glow}`} />
      <Icon className={`absolute right-6 bottom-5 ${iconSize} text-white/80 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`} />
      <span className="absolute left-5 top-4 rounded-full border border-white/15 bg-black/30 backdrop-blur px-2.5 py-0.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/85">
        {category}
      </span>
    </div>
  );
}

export default function PostCard({ post, large = false }) {
  return (
    <article className="group relative h-full flex flex-col glass glass-hover rounded-2xl overflow-hidden">
      <CoverArt category={post.category} className={large ? 'h-44' : 'h-36'} />
      <div className="flex flex-1 flex-col p-5">
        <h3 className={`${large ? 'text-lg' : 'text-[1.02rem]'} font-semibold leading-snug group-hover:text-accent transition-colors`}>
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 text-[0.92rem] text-gray-400 leading-relaxed line-clamp-3">{post.description}</p>
        <div className="mt-auto pt-5 flex items-center justify-between gap-3 text-xs text-gray-500">
          <span className="font-mono">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min
          </span>
          <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}
