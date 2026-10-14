'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

const socials = [
  { icon: FaGithub, href: 'https://github.com/Khadka1996', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/manishkhadka1996/', label: 'LinkedIn' },
];

// useLayoutEffect warns during SSR; fall back to useEffect there
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const NavBar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const [indicator, setIndicator] = useState(null);
  const linksRef = useRef({});
  const lastY = useRef(0);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname?.startsWith(href));
  const activeHref = navItems.find((i) => isActive(i.href))?.href;

  // Scroll state: glass background, hide on scroll down, reading progress
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 12);
      if (y > 160 && y > lastY.current + 4) setHidden(true);
      else if (y < lastY.current - 4 || y <= 160) setHidden(false);
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sliding active-link indicator
  useIsoLayoutEffect(() => {
    const measure = () => {
      const el = activeHref && linksRef.current[activeHref];
      setIndicator(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [activeHref]);

  // Close the mobile menu on navigation; lock page scroll while it's open
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // No transform class while visible: a transformed ancestor would trap the fixed mobile menu
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out ${hidden && !open ? '-translate-y-full' : ''}`}
    >
      <div className={`transition-all duration-500 ${scrolled ? 'px-3 pt-3' : 'px-0 pt-0'}`}>
        <nav
          aria-label="Main"
          className={`relative mx-auto max-w-7xl flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? 'h-14 rounded-2xl border border-white/[0.08] bg-[#07080d]/70 backdrop-blur-xl px-3 sm:px-4 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)]'
              : 'h-20 px-4 sm:px-6 lg:px-8 border border-transparent'
          }`}
        >
          <Link href="/" className="group flex items-center gap-2.5" aria-label="Manish Khadka – home">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] font-mono text-sm font-semibold text-accent transition-colors group-hover:border-accent/50">
              MK
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_#1DCD9F]" />
            </span>
            <span className="leading-tight">
              <span className="block text-[0.95rem] font-semibold tracking-tight text-white">Manish Khadka</span>
              <span className="hidden sm:block text-[0.68rem] font-mono uppercase tracking-[0.14em] text-gray-500">Full Stack Developer</span>
            </span>
          </Link>

          <div className="hidden lg:flex relative items-center rounded-full border border-white/[0.07] bg-white/[0.025] p-1">
            {indicator && (
              <span
                aria-hidden="true"
                className="absolute top-1 bottom-1 rounded-full bg-white/[0.09] border border-white/[0.08] transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                style={{ left: indicator.left, width: indicator.width }}
              />
            )}
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                ref={(el) => {
                  linksRef.current[item.href] = el;
                }}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`relative z-10 px-4 py-1.5 rounded-full text-[0.9rem] transition-colors duration-300 ${
                  isActive(item.href) ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="me noopener noreferrer" aria-label={label} className="p-2 text-gray-400 hover:text-white transition-colors">
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
            <Link href="/contact" className="btn-primary ml-2 !py-2 !px-4">
              Hire me <FiArrowUpRight aria-hidden="true" />
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-200"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>

          {/* reading progress */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute left-4 right-4 bottom-0 h-px origin-left bg-gradient-to-r from-accent via-violet-400 to-accent transition-opacity duration-300 ${scrolled ? 'opacity-70' : 'opacity-0'}`}
            style={{ transform: `scaleX(${progress})` }}
          />
        </nav>
      </div>

      {open && (
        <div id="mobile-menu" className="lg:hidden fixed inset-0 -z-10 bg-[#05060a]/95 backdrop-blur-xl pt-24 px-6 pb-10 flex flex-col">
          <ul className="space-y-1">
            {navItems.map((item, i) => (
              <li key={item.href} className="enter" style={{ animationDelay: `${i * 0.04}s` }}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`flex items-center justify-between py-3.5 text-2xl font-medium border-b border-white/[0.06] ${isActive(item.href) ? 'text-accent' : 'text-white'}`}
                >
                  {item.label}
                  <FiArrowUpRight className="text-gray-600" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <Link href="/contact" className="btn-primary w-full justify-center !py-3 text-base">Hire me</Link>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-gray-400">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="me noopener noreferrer" aria-label={label}><Icon className="h-5 w-5" /></a>
              ))}
              <a href="mailto:mnzkhadka1996@gmail.com" className="text-sm">mnzkhadka1996@gmail.com</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
