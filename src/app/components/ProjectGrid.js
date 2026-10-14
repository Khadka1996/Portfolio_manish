'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiExternalLink, FiGithub, FiServer, FiArrowRight } from 'react-icons/fi';
import { categories } from '@/app/data/projects';

const ProjectThumb = ({ project }) =>
  project.image ? (
    <Image
      src={project.image}
      alt={`${project.title} – project screenshot`}
      fill
      sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
      placeholder="blur"
      className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-700 ease-out"
    />
  ) : (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-accent/10 via-transparent to-violet-500/10">
      <FiServer className="text-4xl text-[#1DCD9F]" aria-hidden="true" />
      <span className="px-6 text-center text-sm font-medium text-gray-300">{project.title}</span>
    </div>
  );

export default function ProjectGrid({ projects, showFilters = false }) {
  const [active, setActive] = useState('all');
  const visible = active === 'all' ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter projects">
          {categories.map((c) => (
            <button
              key={c.id}
              aria-pressed={active === c.id}
              onClick={() => setActive(c.id)}
              className={`px-3.5 py-1.5 rounded-full text-[0.82rem] border transition-colors duration-200 ${
                active === c.id ? 'bg-white text-black border-white' : 'border-white/10 text-gray-400 hover:text-white hover:border-white/25'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map((project) => (
          <li key={project.slug} className="reveal">
            <article className="group relative h-full flex flex-col glass rounded-2xl overflow-hidden transition-all duration-500 hover:border-accent/40 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(29,205,159,0.25)]">
              <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06]">
                <ProjectThumb project={project} />
              </div>
              <div className="flex flex-col flex-1 p-5">
                <h3 className="text-base font-medium mb-1.5 group-hover:text-accent transition-colors">
                  {/* Stretched link: whole card opens the case study */}
                  <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
                    {project.title}
                  </Link>
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.summary}</p>
                <ul className="flex flex-wrap gap-1.5 mb-5" aria-label="Technologies">
                  {project.tags.slice(0, 4).map((tag) => (
                    <li key={tag} className="chip !text-[0.7rem] !px-2 !py-0.5">
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-2">
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-accent text-black hover:bg-white transition-colors"
                      aria-label={`Open live demo of ${project.title}`}
                    >
                      <FiExternalLink aria-hidden="true" /> Live Demo
                    </a>
                  )}
                  {project.codeLink && (
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border border-white/15 text-white hover:border-white/40 transition-colors"
                      aria-label={`View source code of ${project.title} on GitHub`}
                    >
                      <FiGithub aria-hidden="true" /> Code
                    </a>
                  )}
                  <span className="ml-auto inline-flex items-center gap-1 text-xs text-gray-500 group-hover:text-accent transition-colors" aria-hidden="true">
                    Details <FiArrowRight />
                  </span>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
