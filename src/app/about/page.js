import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiDownload, FiAward, FiBookOpen, FiCheck } from 'react-icons/fi';
import NavBar from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import SectionHeading from '../components/SectionHeading';
import Manish from '../assets/user2.jpg';
import {
  skillGroups,
  experience,
  education,
  achievements,
  interests,
  academicProjects,
  quickFacts,
  languages,
} from '../data/profile';
import { featuredProjects } from '../data/projects';

export default function AboutPage() {
  return (
    <>
      <NavBar />
      <main id="main" className="text-white">
        {/* Intro */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.6fr] gap-12 items-start">
            <div className="enter enter-1 relative mx-auto lg:mx-0 w-60 h-60 sm:w-72 sm:h-72">
              <div className="absolute inset-0 rounded-3xl bg-accent/20 blur-3xl" aria-hidden="true" />
              <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/15 bg-white">
                <Image src={Manish} alt="Manish Khadka, Full Stack Developer" fill priority placeholder="blur" sizes="288px" className="object-cover" />
              </div>
            </div>

            <div>
              <p className="eyebrow enter enter-1">About me</p>
              <h1 className="enter enter-2 mt-3 text-3xl sm:text-4xl font-semibold leading-tight">
                I&apos;m <span className="text-gradient">Manish Khadka</span> — a full stack developer from Kathmandu.
              </h1>
              <div className="enter enter-3 mt-5 space-y-4 text-[0.95rem] leading-relaxed text-gray-400">
                <p>
                  I build fast, SEO-friendly web apps with Next.js, React and TypeScript, and secure backends with
                  Node.js, Express and Java Spring Boot. Over the last two years I&apos;ve shipped 15+ production
                  projects — news portals, education platforms, travel and e-commerce sites, and government
                  dashboards — and I handle deployment on Vercel, VPS and cPanel.
                </p>
                <p>
                  I started with Java and Spring Boot at Intersect Info Developers, moved deeper into React at
                  Softech Foundation, and have since worked freelance with clients like The Everest News and Drishya
                  Education. I care about clean architecture, performance and interfaces that feel effortless.
                </p>
              </div>
              <div className="enter enter-4 mt-7 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">Work with me <FiArrowRight aria-hidden="true" /></Link>
                <a href="/manish.pdf" download="Manish_Khadka_CV.pdf" className="btn-ghost"><FiDownload aria-hidden="true" /> Download CV</a>
              </div>
            </div>
          </div>

          <dl className="enter enter-5 max-w-7xl mx-auto mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.08]">
            {quickFacts.map((f) => (
              <div key={f.label} className="px-6 py-4 bg-[#07080d]/90">
                <dt className="font-mono text-[0.7rem] uppercase tracking-wider text-gray-500">{f.label}</dt>
                <dd className="mt-1 text-sm text-gray-200">
                  {f.href ? <a href={f.href} className="hover:text-accent">{f.value}</a> : f.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Skills */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <SectionHeading eyebrow="Skills" title="Languages, frameworks & tools I use in production" />
            <div className="grid md:grid-cols-2 gap-4">
              {skillGroups.map((g) => (
                <div key={g.title} className="reveal glass glass-hover rounded-2xl p-6">
                  <h3 className="text-sm font-medium mb-4">{g.title}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {g.skills.map((s) => <li key={s} className="chip">{s}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience + Education */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
            <div>
              <SectionHeading eyebrow="Experience" title="Work history" />
              <ol className="relative border-l border-white/10 ml-1.5 space-y-6">
                {experience.map((e) => (
                  <li key={e.role} className="reveal pl-7 relative">
                    <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_10px_#1DCD9F]" aria-hidden="true" />
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-medium">{e.role}</h3>
                      <span className="font-mono text-xs text-gray-500">{e.period}</span>
                    </div>
                    <p className="text-sm text-accent/90 mb-2">{e.company}</p>
                    <ul className="space-y-1.5 text-sm text-gray-400">
                      {e.points.map((p) => (
                        <li key={p} className="flex gap-2"><span className="text-gray-600" aria-hidden="true">—</span>{p}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <SectionHeading eyebrow="Education" title="Degrees & schooling" />
              <ol className="relative border-l border-white/10 ml-1.5 space-y-6">
                {education.map((e) => (
                  <li key={e.degree} className="reveal pl-7 relative">
                    <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-violet-300 shadow-[0_0_10px_#c4b5fd]" aria-hidden="true" />
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-medium">{e.degree}</h3>
                      <span className="font-mono text-xs text-gray-500">{e.status}</span>
                    </div>
                    <p className="text-sm text-gray-400">{e.institution}</p>
                    {e.note && <p className="mt-1 text-xs text-gray-500">Courses: {e.note}</p>}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Achievements + interests */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-4">
            <div className="reveal glass rounded-2xl p-7">
              <h2 className="flex items-center gap-2 font-medium"><FiAward className="text-accent" aria-hidden="true" /> Achievements</h2>
              <ul className="mt-5 space-y-3 text-sm text-gray-300">
                {achievements.map((a) => (
                  <li key={a} className="flex gap-3"><FiCheck className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />{a}</li>
                ))}
              </ul>
            </div>
            <div className="reveal glass rounded-2xl p-7">
              <h2 className="flex items-center gap-2 font-medium"><FiBookOpen className="text-accent" aria-hidden="true" /> Interests &amp; languages</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {interests.map((i) => <li key={i} className="chip">{i}</li>)}
              </ul>
              <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-wider text-gray-500">Languages</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {languages.map((l) => <li key={l} className="chip">{l}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <SectionHeading eyebrow="Projects" title="Highlights & academic work">
              A few highlights from my client work, plus Java Spring Boot projects from my BCA studies.
            </SectionHeading>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredProjects.slice(0, 3).map((p) => (
                <Link key={p.slug} href={`/work/${p.slug}`} className="reveal glass glass-hover rounded-2xl p-6 group">
                  <p className="font-mono text-[0.7rem] uppercase tracking-wider text-accent">Client work</p>
                  <h3 className="mt-2 font-medium group-hover:text-accent transition-colors">{p.title}</h3>
                  <p className="mt-2 text-sm text-gray-400">{p.summary}</p>
                </Link>
              ))}
              {academicProjects.map((p) => (
                <div key={p.title} className="reveal glass rounded-2xl p-6">
                  <p className="font-mono text-[0.7rem] uppercase tracking-wider text-violet-300">Academic</p>
                  <h3 className="mt-2 font-medium">{p.title}</h3>
                  <p className="mt-2 text-sm text-gray-400">{p.text}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => <li key={t} className="chip !text-[0.7rem] !py-0.5">{t}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <figure className="reveal max-w-3xl mx-auto text-center">
            <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed text-gray-200">
              “I care about secure code, fast databases and interfaces that feel effortless. Every project is a chance
              to solve a real problem well — and to learn something new.”
            </blockquote>
            <figcaption className="mt-5 font-mono text-xs uppercase tracking-wider text-gray-500">— Manish Khadka</figcaption>
          </figure>
        </section>
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
