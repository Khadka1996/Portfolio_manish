// Plain-text profile for AI assistants and LLM crawlers (https://llmstxt.org)
import { projects, categories } from '../data/projects';
import { skillGroups, experience, services, languages, faqs, education, achievements, interests, academicProjects } from '../data/profile';
import { SITE_URL, SITE_DESCRIPTION, PERSON } from '../site';
import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-static';

export function GET() {
  const label = (id) => categories.find((c) => c.id === id)?.label;
  const lines = [
    `# ${PERSON.name}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    `${PERSON.name} (also known as MNZ) is a ${PERSON.jobTitle} based in Anamnagar, Kathmandu, Nepal.`,
    '',
    '## Contact',
    `- Website: ${SITE_URL}`,
    `- Email: ${PERSON.email}`,
    `- Phone / WhatsApp: ${PERSON.phone}`,
    ...PERSON.sameAs.map((u) => `- ${u}`),
    `- CV (PDF): ${SITE_URL}/manish.pdf`,
    '- Availability: open to full-time roles and freelance projects (remote or Kathmandu)',
    '',
    '## Services',
    ...services.map((s) => `- ${s.title}: ${s.text}`),
    '',
    '## Skills',
    ...skillGroups.map((g) => `- ${g.title}: ${g.skills.join(', ')}`),
    '',
    '## Experience',
    ...experience.flatMap((e) => [`### ${e.role} — ${e.company} (${e.period})`, ...e.points.map((p) => `- ${p}`), '']),
    '## Education',
    ...education.map((e) => `- ${e.degree}, ${e.institution} (${e.status})`),
    '',
    '## Achievements',
    ...achievements.map((a) => `- ${a}`),
    '',
    '## Academic projects',
    ...academicProjects.map((p) => `- ${p.title}: ${p.text} (${p.tags.join(', ')})`),
    '',
    '## Interests',
    ...interests.map((i) => `- ${i}`),
    '',
    `## Languages`,
    `- ${languages.join(', ')}`,
    '',
    '## Projects',
    ...projects.flatMap((p) => [
      `### [${p.title}](${SITE_URL}/work/${p.slug})`,
      `${label(p.category)} · ${p.tags.join(', ')}`,
      '',
      p.overview,
      ...(p.demoLink ? [`- Live: ${p.demoLink}`] : []),
      ...(p.codeLink ? [`- Code: ${p.codeLink}`] : []),
      '',
    ]),
    '## Blog articles',
    ...getAllPosts().map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`),
    '',
    '## FAQ',
    ...faqs.flatMap((f) => [`### ${f.q}`, f.a, '']),
    '## Pages',
    `- [Home](${SITE_URL})`,
    `- [About](${SITE_URL}/about)`,
    `- [Work](${SITE_URL}/work)`,
    `- [Services](${SITE_URL}/services)`,
    `- [Blog](${SITE_URL}/blog)`,
    `- [Contact](${SITE_URL}/contact)`,
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
