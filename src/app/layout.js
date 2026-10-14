// src/app/layout.js
import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, PERSON } from "./site";
import { skillGroups } from "./data/profile";
import CosmicBackground from "./components/CosmicBackground";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PERSON.name} | Full Stack Developer in Kathmandu, Nepal`,
    template: `%s | ${PERSON.name}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  keywords: [
    "Manish Khadka",
    "Full Stack Developer Nepal",
    "Web Developer Kathmandu",
    "Java Spring Boot Developer",
    "React Developer Nepal",
    "Next.js Developer",
    "TypeScript Developer",
    "Hire Web Developer Nepal",
    "Node.js Developer",
    "MERN Stack Developer",
    "Freelance Web Developer Nepal",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${PERSON.name} | Full Stack Developer`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@maneez_khadka",
    title: `${PERSON.name} | Full Stack Developer`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false },
  category: "technology",
  // Set these env vars in Vercel after verifying the site in Google Search Console / Bing Webmaster Tools
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport = {
  themeColor: "#05060a",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: PERSON.name,
      givenName: "Manish",
      familyName: "Khadka",
      alternateName: ["MNZ", "Manish Khadka Developer"],
      jobTitle: PERSON.jobTitle,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      mainEntityOfPage: `${SITE_URL}/about`,
      image: `${SITE_URL}/opengraph-image`,
      email: `mailto:${PERSON.email}`,
      telephone: PERSON.phone,
      nationality: { "@type": "Country", name: "Nepal" },
      homeLocation: { "@type": "Place", name: "Kathmandu, Nepal" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Anamnagar",
        addressLocality: "Kathmandu",
        addressRegion: "Bagmati",
        addressCountry: "NP",
      },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Ratna Rajya Laxmi Campus", address: "Kathmandu, Nepal" },
        { "@type": "EducationalOrganization", name: "Nepal Mega College", address: "Kathmandu, Nepal" },
      ],
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          name: "Bachelor of Computer Application (BCA)",
          recognizedBy: { "@type": "CollegeOrUniversity", name: "Ratna Rajya Laxmi Campus" },
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          name: "Master of Arts in Rural Development",
          recognizedBy: { "@type": "CollegeOrUniversity", name: "Ratna Rajya Laxmi Campus" },
        },
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "Full Stack Developer",
        occupationLocation: { "@type": "City", name: "Kathmandu" },
        skills: skillGroups.flatMap((g) => g.skills).join(", "),
      },
      affiliation: [
        { "@type": "Organization", name: "Intersect Info Developers", url: "https://intersect.com.np" },
        { "@type": "Organization", name: "Softech Foundation", url: "https://softechfoundation.com" },
      ],
      knowsLanguage: ["ne", "en"],
      knowsAbout: [
        "Java", "Spring Boot", "JavaScript", "TypeScript", "React", "Next.js",
        "Node.js", "Express.js", "MongoDB", "MySQL", "PostgreSQL", "Redis", "Prisma",
        "Tailwind CSS", "REST APIs", "Microservices", "Technical SEO", "Web Performance",
      ],
      sameAs: PERSON.sameAs,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable profile" />
        <link rel="author" href="/humans.txt" />
        <link rel="alternate" type="application/rss+xml" href="/blog/rss.xml" title="Manish Khadka – Blog" />
        {PERSON.sameAs.map((href) => (
          <link key={href} rel="me" href={href} />
        ))}
      </head>
      <body className="antialiased bg-[#05060a] text-white font-sans">
        <a href="#main" className="skip-link">Skip to content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CosmicBackground />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
