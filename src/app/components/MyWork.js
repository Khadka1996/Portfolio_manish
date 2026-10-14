import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import ProjectGrid from './ProjectGrid';
import SectionHeading from './SectionHeading';
import { featuredProjects } from '@/app/data/projects';
import { skillGroups } from '@/app/data/profile';

export default function MyWork() {
  return (
    <>
      <section id="projects" className="text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Selected work" title="Featured projects">
              Real products I&apos;ve designed, built and shipped — news portals, e-commerce, travel platforms and
              government dashboards.
            </SectionHeading>
            <Link href="/work" className="reveal mb-10 inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-accent transition-colors">
              All 18 projects <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ProjectGrid projects={featuredProjects} />
        </div>
      </section>

      <section id="skills" className="text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Toolbox" title="Tech stack">
            The languages, frameworks and tools I use to build fast, secure and scalable applications.
          </SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillGroups.map((group) => (
              <div key={group.title} className="reveal glass glass-hover rounded-2xl p-6">
                <h3 className="text-sm font-medium text-white mb-4">{group.title}</h3>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((s) => (
                    <li key={s} className="chip">{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
