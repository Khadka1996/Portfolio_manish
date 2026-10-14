import { SITE_URL } from "../site";

export const metadata = {
  title: "About Manish Khadka – Full Stack Developer, Kathmandu",
  description: "About Manish Khadka: Full Stack Developer from Kathmandu, Nepal. Experience at Intersect Info Developers and Softech Foundation, BCA graduate, skilled in Next.js, React, TypeScript, Node.js and Java Spring Boot.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    title: "About Manish Khadka",
    description: "Full Stack Developer from Kathmandu, Nepal — experience, education and skills.",
    url: "/about",
    firstName: "Manish",
    lastName: "Khadka",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/about#profile`,
  url: `${SITE_URL}/about`,
  name: "About Manish Khadka",
  mainEntity: { "@id": `${SITE_URL}/#person` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
    ],
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
