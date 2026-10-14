import NavBar from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ProjectGrid from '../components/ProjectGrid';
import { projects } from '../data/projects';
import { SITE_URL, PERSON } from '../site';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `Projects by ${PERSON.name}`,
  itemListElement: projects.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'CreativeWork',
      name: p.title,
      description: p.summary,
      url: p.demoLink || p.codeLink,
      keywords: p.tags.join(', '),
      creator: { '@id': `${SITE_URL}/#person` },
    },
  })),
};

export default function WorkPage() {
  return (
    <div className="bg-transparent text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NavBar />

      <section id="main" className="pt-32 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow enter enter-1">Portfolio</p>
          <h1 className="enter enter-2 mt-3 text-3xl sm:text-4xl font-semibold mb-4">
            My <span className="text-[#1DCD9F]">Work</span>
          </h1>
          <p className="enter enter-3 text-gray-400 text-[0.95rem]">
            {projects.length} projects across full stack web apps, websites and backend APIs — built with Next.js,
            React, TypeScript, Node.js, Spring Boot, MongoDB and PostgreSQL.
          </p>
        </div>
      </section>

      <section className="pt-6 pb-20 px-4 sm:px-6 lg:px-8 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <ProjectGrid projects={projects} showFilters />
        </div>
      </section>

      <WhatsAppButton />
      <Footer />
    </div>
  );
}
