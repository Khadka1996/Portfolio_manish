'use client';

import React from 'react';
import { motion } from 'framer-motion';
import NavBar from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const PrivacyPage = () => {
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
            <h1 className="text-3xl sm:text-4xl font-semibold mb-4">Privacy <span className="text-[#1DCD9F]">Policy</span></h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              We respect your privacy and are committed to protecting your personal data.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-4 sm:px-6 lg:px-8 bg-transparent pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-white/[0.03] backdrop-blur-[2px] rounded-xl p-8 md:p-12 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="prose prose-invert max-w-none">
              <h2 className="text-xl font-semibold text-[#1DCD9F] mb-4">1. Introduction</h2>
              <p className="text-gray-300 mb-6">
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully. If you do not agree with the terms of this policy, please do not access the site.
              </p>

              <h2 className="text-xl font-semibold text-[#1DCD9F] mb-4">2. Data Collection</h2>
              <p className="text-gray-300 mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="text-gray-300 mb-6 list-disc pl-6 space-y-2">
                <li>Register on our website</li>
                <li>Fill out contact forms</li>
                <li>Subscribe to our newsletter</li>
                <li>Participate in surveys or promotions</li>
              </ul>

              <h2 className="text-xl font-semibold text-[#1DCD9F] mb-4">3. Use of Information</h2>
              <p className="text-gray-300 mb-6">
                We may use the information we collect for various purposes, including to:
              </p>
              <ul className="text-gray-300 mb-6 list-disc pl-6 space-y-2">
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you for customer service and updates</li>
              </ul>

              <h2 className="text-xl font-semibold text-[#1DCD9F] mb-4">4. Cookies and Tracking</h2>
              <p className="text-gray-300 mb-6">
                We may use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>

              <h2 className="text-xl font-semibold text-[#1DCD9F] mb-4">5. Third-Party Services</h2>
              <p className="text-gray-300 mb-6">
                We may employ third-party companies and individuals to facilitate our website, provide services on our behalf, or assist us in analyzing how our website is used. These third parties have access to your personal information only to perform these tasks and are obligated not to disclose or use it for any other purpose.
              </p>

              <h2 className="text-xl font-semibold text-[#1DCD9F] mb-4">6. Data Security</h2>
              <p className="text-gray-300 mb-6">
                We implement appropriate technical and organizational measures to maintain the safety of your personal information. However, no Internet transmission or electronic storage is ever completely secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-xl font-semibold text-[#1DCD9F] mb-4">7. Changes to This Policy</h2>
              <p className="text-gray-300 mb-6">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
              </p>

              <h2 className="text-xl font-semibold text-[#1DCD9F] mb-4">8. Contact Us</h2>
              <p className="text-gray-300">
                If you have any questions about this Privacy Policy, please contact us through the contact form on our website.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
<WhatsAppButton/>
      <Footer />
    </div>
  );
};

export default PrivacyPage;