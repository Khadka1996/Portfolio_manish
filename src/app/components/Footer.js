import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiMail } from 'react-icons/fi';

const columns = [
  {
    title: 'Navigate',
    links: [
      { name: 'Home', href: '/' },
      { name: 'Work', href: '/work' },
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Services', href: '/services' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Featured',
    links: [
      { name: 'Wonder Travelers', href: '/work/wonder-travelers' },
      { name: 'Visa Sponsor Jobs', href: '/work/visa-sponsor-jobs' },
      { name: 'The Everest News', href: '/work/the-everest-news' },
      { name: 'Himalaya Threads', href: '/work/himalaya-threads' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Download CV', href: '/manish.pdf' },
      { name: 'RSS feed', href: '/blog/rss.xml' },
      { name: 'llms.txt', href: '/llms.txt' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  },
];

const socials = [
  { icon: FaGithub, href: 'https://github.com/Khadka1996', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/manishkhadka1996/', label: 'LinkedIn' },
  { icon: FaXTwitter, href: 'https://x.com/maneez_khadka', label: 'X (Twitter)' },
  { icon: FiMail, href: 'mailto:mnzkhadka1996@gmail.com', label: 'Email' },
];

const Footer = () => (
  <footer className="relative text-white border-t border-white/[0.06] bg-[#05060a]/60 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="text-base font-medium">Manish Khadka</p>
          <p className="mt-2 text-sm text-gray-500 max-w-xs leading-relaxed">
            Full Stack Developer in Kathmandu, Nepal — building fast, SEO-friendly web apps with Next.js, React,
            Node.js and Spring Boot.
          </p>
          <ul className="mt-5 flex gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="me noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-gray-500 mb-4">{col.title}</p>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between gap-3 text-xs text-gray-600">
        <p>© {new Date().getFullYear()} Manish Khadka. All rights reserved.</p>
        <p>Designed &amp; built in Kathmandu with Next.js · Hosted on Vercel</p>
      </div>
    </div>
  </footer>
);

export default Footer;
