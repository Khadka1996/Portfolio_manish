import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiDownload, FiMapPin } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaJava, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiMongodb, SiTailwindcss, SiSpringboot } from 'react-icons/si';
import Manish from '../assets/user2.jpg';
import RoleRotator from './RoleRotator';

const stack = [
  { icon: SiNextdotjs, name: 'Next.js' },
  { icon: FaReact, name: 'React' },
  { icon: SiTypescript, name: 'TypeScript' },
  { icon: FaNodeJs, name: 'Node.js' },
  { icon: FaJava, name: 'Java' },
  { icon: SiSpringboot, name: 'Spring Boot' },
  { icon: SiMongodb, name: 'MongoDB' },
  { icon: SiTailwindcss, name: 'Tailwind' },
];

const stats = [
  { value: '15+', label: 'Projects shipped' },
  { value: '2+', label: 'Years building' },
  { value: '18', label: 'Case studies' },
  { value: '99.8%', label: 'API uptime' },
];

export default function BodySection() {
  return (
    <section className="relative overflow-x-clip pt-32 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 text-white" aria-labelledby="hero-title">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.25fr_1fr] gap-14 items-center">
        <div>
          <p className="enter enter-1 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-gray-300">
            <span className="status-dot relative h-1.5 w-1.5 rounded-full bg-accent" />
            Available for freelance &amp; full-time work
          </p>

          <h1 id="hero-title" className="mt-6 text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold leading-[1.05]">
            <span className="text-gradient">Manish Khadka</span>
          </h1>

          <p className="enter enter-2 mt-4 text-lg sm:text-xl text-gray-300 min-h-[1.75rem]">
            <RoleRotator />
          </p>

          <p className="enter enter-3 mt-5 max-w-xl text-[0.95rem] leading-relaxed text-gray-400">
            I design and build fast, SEO-friendly web products — from news portals and e-commerce stores to
            government dashboards — with Next.js, React and TypeScript on the front, and Node.js and Java Spring
            Boot behind them.
          </p>

          <p className="enter enter-3 mt-3 flex items-center gap-1.5 text-sm text-gray-500">
            <FiMapPin aria-hidden="true" /> Kathmandu, Nepal · working worldwide
          </p>

          <div className="enter enter-4 mt-8 flex flex-wrap items-center gap-3">
            <Link href="/work" className="btn-primary group">
              View my work <FiArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <a href="/manish.pdf" download="Manish_Khadka_CV.pdf" className="btn-ghost">
              <FiDownload aria-hidden="true" /> Download CV
            </a>
            <div className="flex items-center gap-1 ml-1">
              <a href="https://github.com/Khadka1996" target="_blank" rel="me noopener noreferrer" aria-label="GitHub" className="p-2 text-gray-400 hover:text-white transition-colors">
                <FaGithub className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/manishkhadka1996/" target="_blank" rel="me noopener noreferrer" aria-label="LinkedIn" className="p-2 text-gray-400 hover:text-white transition-colors">
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="enter enter-3 relative mx-auto w-64 h-64 sm:w-80 sm:h-80">
          {/* Orbits */}
          <div className="orbit absolute -inset-6 rounded-full border border-dashed border-white/10" aria-hidden="true">
            <span className="absolute left-1/2 -top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_12px_#1DCD9F]" />
          </div>
          <div className="orbit-reverse absolute -inset-14 rounded-full border border-white/[0.05]" aria-hidden="true">
            <span className="absolute -left-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-violet-300 shadow-[0_0_10px_#c4b5fd]" />
          </div>
          <div className="absolute inset-0 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
          <div className="relative h-full w-full overflow-hidden rounded-full border border-white/15 bg-white">
            <Image
              src={Manish}
              alt="Manish Khadka, Full Stack Developer in Kathmandu, Nepal"
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 640px) 320px, 256px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16">
        <dl className="enter enter-5 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.08]">
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-5 bg-[#07080d]/90">
              <dt className="text-xs text-gray-500 font-mono uppercase tracking-wider">{s.label}</dt>
              <dd className="mt-1 text-2xl sm:text-3xl font-semibold text-white">{s.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-gray-500" aria-label="Main technologies">
          {stack.map(({ icon: Icon, name }) => (
            <li key={name} className="flex items-center gap-2 hover:text-gray-200 transition-colors">
              <Icon className="h-4 w-4" aria-hidden="true" /> {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
