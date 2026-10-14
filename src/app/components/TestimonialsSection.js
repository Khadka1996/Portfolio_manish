import Image from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import Drishya from '@/app/assets/logodrishya.png';
import Everest from '@/app/assets/logoeverest.png';

const partners = [
  {
    name: 'Intersect',
    url: 'https://intersect.com.np',
    testimonial: 'Working with this developer was a game-changer for our platform. The quality and attention to detail were exceptional.',
  },
  {
    name: 'Aadhya',
    url: 'https://aadhya.com.np',
    testimonial: 'Their technical expertise helped us solve complex challenges and deliver our product ahead of schedule.',
  },
  {
    name: 'Softech',
    url: 'https://softechfoundation.com/',
    testimonial: 'A true professional who delivered beyond our expectations. We continue to collaborate on new projects.',
  },
];

const people = [
  {
    name: 'Phurpa Sherpa',
    position: 'CEO, The Everest News',
    logo: Everest,
    url: 'https://theeverestnews.com',
    testimonial: "One of the most skilled developers I've worked with. Their ability to architect scalable solutions is impressive.",
  },
  {
    name: 'Kamal Tamang',
    position: 'CEO, Drishya Education',
    logo: Drishya,
    url: 'https://drishyaeducation.com',
    testimonial: 'Rarely do you find someone who combines technical depth with such strong communication skills. A pleasure to work with.',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="Testimonials" title="What clients & partners say" />

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {people.map((p) => (
            <figure key={p.name} className="reveal glass glass-hover rounded-2xl p-7 flex flex-col">
              <span className="font-serif text-5xl leading-none text-accent/40" aria-hidden="true">“</span>
              <blockquote className="mt-2 text-[1.02rem] leading-relaxed text-gray-200">{p.testimonial}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="relative h-10 w-10 overflow-hidden rounded-full bg-white border border-white/10">
                  <Image src={p.logo} alt="" fill sizes="40px" className="object-contain p-1" />
                </span>
                <span className="text-sm">
                  <span className="block font-medium">{p.name}</span>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent inline-flex items-center gap-1">
                    {p.position} <FiArrowUpRight aria-hidden="true" />
                  </a>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {partners.map((p) => (
            <figure key={p.name} className="reveal glass glass-hover rounded-2xl p-6">
              <blockquote className="text-sm leading-relaxed text-gray-400">“{p.testimonial}”</blockquote>
              <figcaption className="mt-5">
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-white hover:text-accent">
                  {p.name} <FiArrowUpRight aria-hidden="true" />
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
