'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCode, FiLayers, FiSmartphone, FiDatabase, FiServer, FiShield, FiBarChart2 } from 'react-icons/fi';
import NavBar from '../components/Header';
import Footer from '../components/Footer';
import TestimonialsSection from '../components/TestimonialsSection';
import WhatsAppButton from '../components/WhatsAppButton';

const ServicesPage = () => {
  const services = [
    {
      title: "Web Development",
      icon: <FiCode className="text-4xl text-[#1DCD9F]" />,
      description: "Custom, responsive websites built with modern technologies like Next.js, React, and Tailwind CSS.",
      features: [
        "Custom website development",
        "E-commerce solutions",
        "CMS integration",
        "API development"
      ],
      technologies: ["Next.js", "React", "Tailwind CSS", "Node.js"]
    },
    {
      title: "SEO & Deployment",
      icon: <FiSmartphone className="text-4xl text-[#1DCD9F]" />,
      description: "Technical SEO, Core Web Vitals tuning and reliable hosting so your site is fast and easy to find on Google.",
      features: [
        "Technical SEO & structured data",
        "Core Web Vitals optimization",
        "Mobile-first responsive layouts",
        "Deployment & domain setup"
      ],
      technologies: ["Next.js", "Vercel", "VPS", "cPanel"]
    },
    {
      title: "Backend Development",
      icon: <FiServer className="text-4xl text-[#1DCD9F]" />,
      description: "Robust backend systems and APIs to power your applications with optimal performance.",
      features: [
        "RESTful API development",
        "Database design",
        "Authentication systems",
        "Cloud integration"
      ],
      technologies: ["Node.js", "Express", "Spring Boot", "Redis"]
    },
    {
      title: "UI/UX Design",
      icon: <FiLayers className="text-4xl text-[#1DCD9F]" />,
      description: "Beautiful, intuitive interfaces designed to enhance user experience and engagement.",
      features: [
        "User flows & wireframes",
        "Interactive prototypes",
        "Design systems",
        "Responsive design"
      ],
      technologies: ["Figma", "Canva", "Tailwind CSS", "Framer Motion"]
    },
    {
      title: "Database Solutions",
      icon: <FiDatabase className="text-4xl text-[#1DCD9F]" />,
      description: "Custom database architecture and optimization for your specific business needs.",
      features: [
        "Database design",
        "Query optimization",
        "Data migration",
        "Security implementation"
      ],
      technologies: ["MongoDB", "PostgreSQL", "MySQL", "Prisma"]
    },
    {
      title: "Performance Optimization",
      icon: <FiBarChart2 className="text-4xl text-[#1DCD9F]" />,
      description: "Make your applications faster and more efficient with our optimization services.",
      features: [
        "Code optimization",
        "Load time reduction",
        "Resource management",
        "Caching strategies"
      ],
      technologies: ["Lighthouse", "Webpack", "CDN", "Redis"]
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery",
      description: "We start by understanding your business goals, target audience, and project requirements."
    },
    {
      step: "02",
      title: "Planning",
      description: "Creating a detailed project roadmap with milestones, deliverables, and timelines."
    },
    {
      step: "03",
      title: "Design",
      description: "Crafting intuitive user interfaces and experiences that align with your brand."
    },
    {
      step: "04",
      title: "Development",
      description: "Building your solution with clean, maintainable code using modern technologies."
    },
    {
      step: "05",
      title: "Testing",
      description: "Rigorous quality assurance to ensure flawless performance across all devices."
    },
    {
      step: "06",
      title: "Launch & Support",
      description: "Deploying your project and providing ongoing maintenance and updates."
    }
  ];

  return (
    <div className="bg-transparent text-white">
      <NavBar />
      
      {/* Hero Section */}
      <section id="main" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl font-semibold mb-4">My <span className="text-[#1DCD9F]">Services</span></h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Comprehensive digital solutions tailored to your business needs. From concept to deployment, I deliver high-quality results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className=" px-4 sm:px-6 lg:px-8 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white/[0.03] backdrop-blur-[2px] rounded-xl p-8 border border-white/10 hover:border-[#1DCD9F] transition-all duration-500 group"
              >
                <div className="mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-[#1DCD9F] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3 text-[#1DCD9F]">Key Features</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-[#1DCD9F] mr-2">•</span>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-[#1DCD9F]">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-white/[0.06] rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">My <span className="text-[#1DCD9F]">Process</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A structured approach to ensure quality, efficiency, and successful project delivery.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-1/2 top-0 h-full w-0.5 bg-white/[0.06] transform -translate-x-1/2"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12 lg:mt-20'}`}
                >
                  {/* Timeline dot */}
                  <div className="hidden lg:block absolute top-1/2 w-4 h-4 rounded-full bg-[#1DCD9F] transform -translate-y-1/2"
                    style={{ 
                      left: index % 2 === 0 ? 'calc(100% - 2px)' : '-12px',
                      right: index % 2 === 0 ? '' : 'calc(100% - 2px)'
                    }}
                  ></div>
                  
                  <div className="bg-white/[0.03] backdrop-blur-[2px] p-8 rounded-xl border border-white/10 hover:border-[#1DCD9F] transition-all duration-500">
                    <span className="text-[#1DCD9F] font-bold text-lg">{step.step}</span>
                    <h3 className="text-xl font-bold mb-3 mt-2">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] backdrop-blur-[2px] rounded-xl p-12 border border-white/10"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Ready to start your project?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how I can help bring your ideas to life with custom digital solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-[#1DCD9F] to-[#169976] text-white rounded-full font-medium hover:from-[#169976] hover:to-[#1DCD9F] transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get in Touch
              </Link>
              <Link
                href="/work"
                className="px-8 py-4 border-2 border-[#1DCD9F] text-[#1DCD9F] rounded-full font-medium hover:bg-[#1DCD9F]/10 transition-all duration-300"
              >
                View My Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />
      <WhatsAppButton/>
      <Footer />
    </div>
  );
};

export default ServicesPage;