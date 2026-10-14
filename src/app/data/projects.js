// Single source of truth for projects shown on Home, Work and About pages
import WonderTravelers from '@/app/assets/projects/wondertravelers.webp';
import JobFinding from '@/app/assets/projects/job-finding.webp';
import HimalayaThreads from '@/app/assets/projects/himalaya-threads.webp';
import StudyInNepal from '@/app/assets/projects/study-in-nepal.webp';
import DigitalNepal from '@/app/assets/projects/digital-nepal.webp';
import ChronoVault from '@/app/assets/projects/chronovault.webp';
import Everestkit from '@/app/assets/projects/everestkit.webp';
import MapOfNepal from '@/app/assets/projects/map-of-nepal.webp';
import KantipurStudio from '@/app/assets/projects/kantipur-studio.webp';
import Drishya from '@/app/assets/projects/drishya.webp';
import EnglishNews from '@/app/assets/projects/englishNews.webp';
import NepaliNews from '@/app/assets/projects/nepaliNews.webp';
import Intersect from '@/app/assets/projects/intersect.webp';
import Movie from '@/app/assets/projects/movie.webp';

const GH = 'https://github.com/Khadka1996';

export const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'fullstack', label: 'Full Stack Apps' },
  { id: 'web', label: 'Websites' },
  { id: 'backend', label: 'APIs & Backend' },
];

export const projects = [
  {
    slug: 'wonder-travelers',
    title: 'Wonder Travelers',
    summary: 'Nepal travel guide with 50+ destinations, travel blogs, photo sales and documentaries.',
    overview:
      'Wonder Travelers is a full stack travel platform promoting sustainable tourism in Nepal. The Next.js 15 + TypeScript frontend serves destination guides, travel stories, documentaries and a photo store, while a separate Express 5 API handles authentication, content, uploads and real-time features. The backend uses MongoDB with Mongoose, Redis for caching, Socket.io for live updates, Sharp for image processing, Zod for validation and Swagger for API documentation.',
    category: 'fullstack',
    featured: true,
    image: WonderTravelers,
    demoLink: 'https://wondertravelers.vercel.app',
    codeLink: `${GH}/wondertravelers`,
    tags: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Express', 'MongoDB', 'Socket.io', 'Redis'],
    features: [
      'Destination guides, blogs and photo gallery',
      'Real-time features with Socket.io',
      'Redis caching and JWT authentication',
      'Image processing pipeline with Sharp',
      'Swagger-documented REST API',
    ],
  },
  {
    slug: 'visa-sponsor-jobs',
    title: 'Visa Sponsor Jobs',
    summary: 'Job board for visa-sponsored jobs across the UK, Australia, Canada, USA, UAE and 180+ countries.',
    overview:
      'Visa Sponsor Jobs helps people find employers that sponsor work visas. Built on Next.js 16 and React 19 with TypeScript, it focuses on fast search and filtering across countries and job categories, with SEO-friendly listing pages so individual jobs and countries can rank in search engines.',
    category: 'fullstack',
    featured: true,
    image: JobFinding,
    demoLink: 'https://job-finding-pi.vercel.app',
    codeLink: `${GH}/job-finding`,
    tags: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Country and category search with fast filters',
      'Job bookmarks and direct apply links',
      'SEO-optimized job listing pages',
      'Fully responsive UI',
    ],
  },
  {
    slug: 'himalaya-threads',
    title: 'Himalaya Threads',
    summary: 'E-commerce store for Kathmandu-crafted clothing with cart, wishlist and NPR pricing.',
    overview:
      'Himalaya Threads is an e-commerce storefront for a Kathmandu clothing brand. It uses Next.js 15 and TypeScript, Zustand for cart and wishlist state, Radix primitives for accessible components and Framer Motion for an editorial, fashion-magazine feel. Prices are shown in Nepali Rupees.',
    category: 'fullstack',
    featured: true,
    image: HimalayaThreads,
    demoLink: 'https://clothing-ecommerce-xi.vercel.app',
    codeLink: `${GH}/clothing-ecommerce`,
    tags: ['Next.js 15', 'TypeScript', 'Zustand', 'Tailwind CSS', 'Framer Motion'],
    features: [
      'Product catalog with categories',
      'Cart and wishlist state with Zustand',
      'Editorial-style product pages',
      'Smooth animations with Framer Motion',
    ],
  },
  {
    slug: 'study-in-nepal',
    title: 'Study in Nepal',
    summary: 'Education portal helping international students find universities, colleges and courses in Nepal.',
    overview:
      'Study in Nepal is an education portal for international students choosing Nepal. It lists universities, colleges, programs and admission guidance, with type-safe inquiry and booking forms validated by Zod. Built with Next.js 14, TypeScript and Tailwind CSS.',
    category: 'web',
    featured: true,
    image: StudyInNepal,
    demoLink: 'https://study-in-nepal.vercel.app',
    codeLink: `${GH}/study-in-nepal`,
    tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Zod'],
    features: [
      'University, college and program listings',
      'Validated inquiry and booking forms',
      'Admissions guidance content',
      'Responsive, accessible layout',
    ],
  },
  {
    slug: 'digital-nepal',
    title: 'Digital Nepal Portal',
    summary: 'Central administration dashboard concept for citizen records, provinces and local government data.',
    overview:
      "Digital Nepal Portal is a design preview of a central administration system for Nepal's citizen ecosystem. It shows national statistics and drills down from province to district, municipality and ward, with Leaflet maps and Recharts visualisations. Built with Next.js 14 and TypeScript.",
    category: 'fullstack',
    featured: true,
    image: DigitalNepal,
    demoLink: 'https://digital-nepal-demo.vercel.app',
    codeLink: `${GH}/digital-nepal-demo`,
    tags: ['Next.js 14', 'TypeScript', 'Leaflet', 'Recharts', 'Tailwind CSS'],
    features: [
      'National statistics dashboard',
      'Province → district → ward drill-down',
      'Interactive maps with Leaflet',
      'Data visualisation with Recharts',
    ],
  },
  {
    slug: 'the-everest-news',
    title: 'The Everest News (Nepali)',
    summary: 'Live Nepali news portal with category-wise news, comments and an admin CMS.',
    overview:
      'The Everest News is a live Nepali-language news portal (theeverestnews.com). I built the Next.js frontend, the Express and MongoDB backend and a separate admin CMS for editors to publish, categorise and manage articles, with SEO-friendly article pages.',
    category: 'fullstack',
    featured: true,
    image: NepaliNews,
    demoLink: 'https://theeverestnews.com',
    codeLink: `${GH}/The-Everest-News`,
    tags: ['Next.js', 'Node.js', 'Express', 'MongoDB'],
    features: [
      'News categories and breaking news',
      'Admin dashboard for editors',
      'Comment system',
      'SEO-friendly article pages',
    ],
  },
  {
    slug: 'chronovault',
    title: 'ChronoVault',
    summary: 'Marketplace for rare antiques, vintage coins and collectibles with provenance details.',
    overview:
      'ChronoVault is a marketplace concept for rare antiques, vintage coins and collectibles. Built with Next.js 16 and React 19, it uses Leaflet to show where items come from and Recharts for price trends, with sections that build collector trust.',
    category: 'web',
    image: ChronoVault,
    demoLink: 'https://chrono-vault-nine.vercel.app',
    codeLink: `${GH}/chrono-vault`,
    tags: ['Next.js 16', 'React 19', 'Tailwind CSS', 'Leaflet', 'Recharts'],
    features: [
      'Collection and category browsing',
      'Item origin maps with Leaflet',
      'Price trend charts',
      'Collector trust and verification sections',
    ],
  },
  {
    slug: 'everestkit',
    title: 'Everestkit',
    summary: 'Online tools platform with PDF merge/split, image cropping, blogs and advertising services.',
    overview:
      'Everestkit is a productivity platform with free online tools (PDF merge and split, image cropping) together with a blog, digital services and advertising pages. Built with Next.js 15 on the frontend and a Node.js/Express backend, with Chart.js for analytics.',
    category: 'fullstack',
    image: Everestkit,
    demoLink: 'https://updated-blog-chi.vercel.app',
    codeLink: `${GH}/updatedBlog`,
    tags: ['Next.js 15', 'Node.js', 'Express', 'Chart.js', 'Tailwind CSS'],
    features: [
      'PDF merge and split tools',
      'Image cropping tool',
      'Blog with admin panel',
      'Advertising partner pages',
    ],
  },
  {
    slug: 'the-everest-news-english',
    title: 'The Everest News (English)',
    summary: 'English edition of The Everest News for a global readership.',
    overview:
      'The English edition of The Everest News, sharing the same backend as the Nepali site. It adds category sorting, a breaking news banner and search for readers outside Nepal.',
    category: 'web',
    image: EnglishNews,
    demoLink: 'https://english.theeverestnews.com',
    codeLink: `${GH}/The-Everest-News-English`,
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    features: [
      'Category sorting',
      'Breaking news banner',
      'Search functionality',
      'Shared backend with Nepali edition',
    ],
  },
  {
    slug: 'drishya-education',
    title: 'Drishya Education',
    summary: 'Educational consultancy website with study-abroad program listings and inquiry forms.',
    overview:
      'Drishya Education is a study-abroad consultancy website (drishyaeducation.com). It presents programs and destinations, collects student inquiries online and is optimized for local search so the consultancy can be found on Google.',
    category: 'web',
    image: Drishya,
    demoLink: 'https://drishyaeducation.com',
    tags: ['Next.js', 'Tailwind CSS', 'SEO'],
    features: ['Program listings', 'Online inquiry form', 'SEO optimized', 'Responsive design'],
  },
  {
    slug: 'map-of-nepal',
    title: 'Map of Nepal',
    summary: 'Interactive explorer for Nepal’s 7 provinces, districts and local governments.',
    overview:
      "Map of Nepal is an interactive explorer of Nepal's administrative structure: 7 provinces, 77 districts and their local governments. Users drill down with a sidebar and breadcrumbs on a clean Next.js and Tailwind CSS interface.",
    category: 'web',
    image: MapOfNepal,
    demoLink: 'https://map-of-nepal-next.vercel.app',
    codeLink: `${GH}/map-of-nepal-next`,
    tags: ['Next.js', 'Tailwind CSS', 'SVG Maps'],
    features: ['Province to municipality drill-down', 'Sidebar navigation', 'Breadcrumb hierarchy', 'Clean modern UI'],
  },
  {
    slug: 'kantipur-photo-studio',
    title: 'Kantipur Photo Studio',
    summary: 'Website for a Kathmandu photo studio offering portraits, weddings, events and on-location shoots.',
    overview:
      'Kantipur Photo Studio is a business website for a Kathmandu photography studio. It showcases services, a portfolio gallery and booking calls-to-action, built with Next.js 15, React 19, Tailwind CSS and Framer Motion.',
    category: 'web',
    image: KantipurStudio,
    demoLink: 'https://kantipurstudio.vercel.app',
    codeLink: `${GH}/kantipurstudio`,
    tags: ['Next.js 15', 'React 19', 'Tailwind CSS', 'Framer Motion'],
    features: ['Services and portfolio gallery', 'Date booking call-to-action', 'Chat assistant widget', 'Animated, responsive UI'],
  },
  {
    slug: 'intersect-info-developers',
    title: 'Intersect Info Developers',
    summary: 'Corporate website for a Kathmandu IT company offering software services.',
    overview:
      "Corporate website for Intersect Info Developers, the Kathmandu IT company where I worked as a Java Developer Intern. It presents the company's services, testimonials and a contact form.",
    category: 'web',
    image: Intersect,
    demoLink: 'https://intersect.com.np',
    tags: ['React', 'Node.js', 'Tailwind CSS'],
    features: ['Company overview', 'Service pages', 'Client testimonials', 'Contact form'],
  },
  {
    slug: 'watch-with-me',
    title: 'Watch With Me',
    summary: 'Movie streaming web app with search, genres and filtering.',
    overview:
      'Watch With Me is a movie streaming web app built with React. Users can search movies, browse by genre and stream on desktop or mobile.',
    category: 'web',
    image: Movie,
    demoLink: 'https://watch-with-me-seven.vercel.app',
    codeLink: `${GH}/Watch-with-me`,
    tags: ['React', 'Tailwind CSS', 'REST API'],
    features: ['Movie search', 'Genres and filtering', 'Streaming player', 'Mobile optimized'],
  },
  {
    slug: 'multivendor-api',
    title: 'Multivendor Marketplace API',
    summary: 'Backend for a multi-vendor marketplace using both MongoDB and PostgreSQL with Redis caching.',
    overview:
      'A backend API for a multi-vendor marketplace where many sellers list products in one store. Built with Express 5, it combines MongoDB and PostgreSQL, uses Redis (ioredis) for caching, JWT for role-based authentication and Swagger for documentation.',
    category: 'backend',
    codeLink: `${GH}/multivendor`,
    tags: ['Node.js', 'Express 5', 'MongoDB', 'PostgreSQL', 'Redis', 'Swagger'],
    features: ['Vendor, product and order APIs', 'JWT authentication and roles', 'Redis caching', 'Swagger API docs'],
  },
  {
    slug: 'blog-rest-api',
    title: 'High-Performance Blog API',
    summary: 'RESTful API for modern blogging platforms, built as a technical task for EB Pearls.',
    overview:
      'A high-performance RESTful blogging API built as a technical assessment for EB Pearls. It covers users, posts, JWT authentication and image uploads, with Multer handling uploads and Sharp optimizing images.',
    category: 'backend',
    codeLink: `${GH}/ebpearls-blog`,
    tags: ['Node.js', 'Express 5', 'MongoDB', 'JWT', 'Multer', 'Sharp'],
    features: ['CRUD for posts and users', 'JWT auth', 'Image uploads with Multer', 'Image optimization with Sharp'],
  },
  {
    slug: 'news-platform-api',
    title: 'News Platform (TypeScript)',
    summary: 'Next.js 16 news client with a TypeScript API using Prisma, Redis and Zod validation.',
    overview:
      'A TypeScript rewrite of a news platform: a Next.js 16 client and a separate API using Prisma ORM, Redis caching and Zod validation for type safety from database to UI.',
    category: 'backend',
    codeLink: `${GH}/news-server`,
    tags: ['TypeScript', 'Prisma', 'Redis', 'Zod', 'Next.js 16'],
    features: ['Type-safe API with Prisma', 'Request validation with Zod', 'Redis caching', 'Separate Next.js client'],
  },
  {
    slug: 'health-ai',
    title: 'Health AI Monitor',
    summary: 'Health monitoring app with a Python AI service and a Next.js TypeScript frontend.',
    overview:
      'Health AI is a health monitoring project pairing a Python AI service with a Next.js 14 + TypeScript dashboard for viewing health metrics.',
    category: 'fullstack',
    codeLink: `${GH}/health-ai`,
    tags: ['Python', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    features: ['Python AI backend', 'Next.js dashboard', 'Health metrics monitoring'],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
