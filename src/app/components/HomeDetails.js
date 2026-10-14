import Link from 'next/link';
import { FiCode, FiGlobe, FiServer, FiZap, FiArrowRight, FiPlus } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import { services, experience, faqs } from '@/app/data/profile';

const icons = [FiCode, FiGlobe, FiServer, FiZap];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function HomeDetails() {
  return (
    <>
      <section id="services" className="text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="What I do" title="From idea to production">
            I design, build and launch web products that load fast, rank well and are easy to maintain.
          </SectionHeading>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s, i) => {
              const Icon = icons[i];
              return (
                <li key={s.title} className="reveal glass glass-hover rounded-2xl p-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent mb-5">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3 className="text-[0.95rem] font-medium mb-2">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="experience" className="text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-10">
          <div>
            <SectionHeading eyebrow="Experience" title="Where I've worked">
              Two internships and two years of freelance work for clients across Nepal.
            </SectionHeading>
            <Link href="/about" className="reveal inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-accent transition-colors">
              Full background &amp; education <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ol className="relative border-l border-white/10 ml-1.5 space-y-8">
            {experience.map((e) => (
              <li key={e.role} className="reveal pl-7 relative">
                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_10px_#1DCD9F]" aria-hidden="true" />
                <div className="glass rounded-2xl p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-medium">{e.role}</h3>
                    <span className="font-mono text-xs text-gray-500">{e.period}</span>
                  </div>
                  <p className="text-sm text-accent/90 mt-0.5 mb-3">{e.company}</p>
                  <ul className="space-y-1.5 text-sm text-gray-400">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-2"><span className="text-gray-600" aria-hidden="true">—</span>{p}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="faq" className="text-white py-20 px-4 sm:px-6 lg:px-8">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <div className="max-w-3xl mx-auto">
          <SectionHeading eyebrow="FAQ" title="Questions people ask me" align="center" />
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={f.q} open={i === 0} className="reveal group glass rounded-xl px-5 py-4 open:border-accent/30">
                <summary className="cursor-pointer list-none flex justify-between items-center gap-4">
                  <h3 className="text-[0.95rem] font-medium">{f.q}</h3>
                  <FiPlus className="shrink-0 text-accent transition-transform duration-300 group-open:rotate-45" aria-hidden="true" />
                </summary>
                <p className="mt-3 text-sm text-gray-400 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
