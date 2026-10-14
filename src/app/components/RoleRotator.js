'use client';

import { useEffect, useState } from 'react';

const roles = [
  'Full Stack Developer',
  'Next.js & React Engineer',
  'TypeScript Developer',
  'Node.js Backend Engineer',
  'Java Spring Boot Developer',
];

export default function RoleRotator() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % roles.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-accent">
      <span key={i} className="inline-block animate-role">{roles[i]}</span>
      <span className="ml-0.5 inline-block w-[2px] h-[1em] align-[-0.12em] bg-accent animate-pulse" aria-hidden="true" />
    </span>
  );
}
