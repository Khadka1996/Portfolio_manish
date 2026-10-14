import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiArrowLeft, FiArrowRight, FiExternalLink, FiGithub, FiServer } from 'react-icons/fi';
import NavBar from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import { projects, categories } from '../../data/projects';
import { SITE_URL, PERSON } from '../../site';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const findProject = async (params) => {
  const { slug } = await params;
  return projects.find((p) => p.slug === slug);
};

export async function generateMetadata({ params }) {
  const project = await findProject(params);
  if (!project) return {};
  const title = `${project.title} – ${project.tags.slice(0, 2).join(', ')} Project`;
  return {
    title,
    description: project.summary,
    keywords: [project.title, ...project.tags, PERSON.name, 'portfolio project'],
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: 'article',
      title: `${project.title} | ${PERSON.name}`,
      description: project.summary,
      url: `/work/${project.slug}`,
      ...(project.image && { images: [{ url: project.image.src, width: project.image.width, height: project.image.height, alt: project.title }] }),
    },
  };
}

export default async function ProjectPage({ params }) {
  const project = await findProject(params);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const category = categories.find((c) => c.id === project.category)?.label;
  const url = `${SITE_URL}/work/${project.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${url}#project`,
        name: project.title,
        headline: project.summary,
        description: project.overview,
        url,
        ...(project.image && { image: `${SITE_URL}${project.image.src}` }),
        keywords: project.tags.join(', '),
        genre: category,
        creator: { '@id': `${SITE_URL}/#person` },
        sameAs: [project.demoLink, project.codeLink].filter(Boolean),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_URL}/work` },
          { '@type': 'ListItem', position: 3, name: project.title, item: url },
        ],
      },
    ],
  };

  return (
    <div className="bg-transparent text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NavBar />

      <main id="main" className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <article className="max-w-5xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-[#1DCD9F]">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/work" className="hover:text-[#1DCD9F]">Work</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-gray-200">{project.title}</li>
            </ol>
          </nav>

          <header className="mb-10">
            <p className="text-[#1DCD9F] text-sm font-medium uppercase tracking-wider mb-3">{category}</p>
            <h1 className="text-3xl sm:text-3xl sm:text-4xl font-semibold mb-4 leading-tight">{project.title}</h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl">{project.summary}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.demoLink && (
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#1DCD9F] text-black font-medium hover:bg-[#169976] transition-colors">
                  <FiExternalLink aria-hidden="true" /> Visit live site
                </a>
              )}
              {project.codeLink && (
                <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/[0.06] font-medium hover:bg-white/[0.06] transition-colors">
                  <FiGithub aria-hidden="true" /> Source on GitHub
                </a>
              )}
            </div>
          </header>

          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 mb-12 bg-white/[0.03] backdrop-blur-[2px]">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} homepage screenshot`}
                fill
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover object-top"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#10241f] via-[#141414] to-[#0a0a0a]">
                <FiServer className="text-6xl text-[#1DCD9F]" aria-hidden="true" />
                <span className="text-gray-400">Backend / API project</span>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            <section className="lg:col-span-2" aria-labelledby="overview">
              <h2 id="overview" className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-gray-300 leading-relaxed mb-10">{project.overview}</p>

              <h2 className="text-2xl font-semibold mb-4">Key features</h2>
              <ul className="space-y-3">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-3 text-gray-300">
                    <span className="text-[#1DCD9F] mt-0.5" aria-hidden="true">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </section>

            <aside className="space-y-6">
              <div className="bg-white/[0.03] backdrop-blur-[2px] border border-white/10 rounded-2xl p-6">
                <h2 className="font-semibold mb-4">Tech stack</h2>
                <ul className="flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <li key={t} className="px-3 py-1 bg-[#1DCD9F]/10 text-[#1DCD9F] rounded-full text-sm">{t}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/[0.03] backdrop-blur-[2px] border border-white/10 rounded-2xl p-6 text-sm">
                <dl className="space-y-3">
                  <div><dt className="text-gray-500">Built by</dt><dd><Link href="/about" className="hover:text-[#1DCD9F]">{PERSON.name}</Link></dd></div>
                  <div><dt className="text-gray-500">Type</dt><dd>{category}</dd></div>
                  {project.demoLink && (
                    <div><dt className="text-gray-500">Live URL</dt><dd className="break-all"><a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="hover:text-[#1DCD9F]">{project.demoLink.replace(/^https?:\/\//, '')}</a></dd></div>
                  )}
                </dl>
              </div>
              <div className="bg-gradient-to-br from-[#1DCD9F]/15 to-transparent border border-[#1DCD9F]/30 rounded-2xl p-6">
                <p className="font-semibold mb-2">Need something similar?</p>
                <p className="text-sm text-gray-300 mb-4">I build fast, SEO-friendly websites and apps for businesses in Nepal and abroad.</p>
                <Link href="/contact" className="inline-flex items-center gap-2 text-[#1DCD9F] font-medium hover:underline">
                  Let&apos;s talk <FiArrowRight aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>

          <nav aria-label="More projects" className="mt-16 pt-8 border-t border-white/10 grid sm:grid-cols-2 gap-4">
            <Link href={`/work/${prev.slug}`} className="group p-5 rounded-xl bg-white/[0.03] backdrop-blur-[2px] border border-white/10 hover:border-[#1DCD9F]/60 transition-colors">
              <span className="text-sm text-gray-500 flex items-center gap-1"><FiArrowLeft aria-hidden="true" /> Previous</span>
              <span className="font-semibold group-hover:text-[#1DCD9F]">{prev.title}</span>
            </Link>
            <Link href={`/work/${next.slug}`} className="group p-5 rounded-xl bg-white/[0.03] backdrop-blur-[2px] border border-white/10 hover:border-[#1DCD9F]/60 transition-colors sm:text-right">
              <span className="text-sm text-gray-500 flex items-center gap-1 sm:justify-end">Next <FiArrowRight aria-hidden="true" /></span>
              <span className="font-semibold group-hover:text-[#1DCD9F]">{next.title}</span>
            </Link>
          </nav>
        </article>
      </main>

      <WhatsAppButton />
      <Footer />
    </div>
  );
}
