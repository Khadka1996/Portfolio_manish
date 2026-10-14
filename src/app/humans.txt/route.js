import { PERSON, SITE_URL } from '../site';

export const dynamic = 'force-static';

export function GET() {
  const body = `/* TEAM */
Developer & designer: ${PERSON.name}
Role: ${PERSON.jobTitle}
Contact: ${PERSON.email}
GitHub: ${PERSON.sameAs[0]}
LinkedIn: ${PERSON.sameAs[1]}
From: Kathmandu, Nepal

/* SITE */
Url: ${SITE_URL}
Standards: HTML5, CSS3, schema.org JSON-LD
Components: Next.js, React, Tailwind CSS, Framer Motion
Fonts: Poppins
Hosting: Vercel
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
