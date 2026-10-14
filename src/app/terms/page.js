'use client';

import React from 'react';
import { motion } from 'framer-motion';
import NavBar from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const TermsPage = () => {
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
            <h1 className="text-3xl sm:text-4xl font-semibold mb-4">Terms of <span className="text-[#1DCD9F]">Service</span></h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Please read these terms carefully before using our website.
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
              <h2 className="text-xl font-semibold text-[#1DCD9F] mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300 mb-6">
                By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this site.
              </p>

              <h2 className="text-xl font-semibold text-[#1DCD9F] mb-4">2. Use License</h2>
              <p className="text-gray-300 mb-4">
                Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
              </p>
              <p className="text-gray-300 mb-6">
                Under this license you may not:
              </p>
              <ul className="text-gray-300 mb-6 list-disc pl-6 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software</li>
                <li>Remove any copyright or other proprietary notations</li>
                <li>Transfer the materials to another person or "mirror" the materials</li>
              </ul>

              <h2 className="text-xl font-semibold text-[#1DCD9F] mb-4">3. Disclaimer</h2>
              <p className="text-gray-300 mb-6">
                The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>

              <h2 className="text-xl font-semibold text-[#1DCD9F] mb-4">4. Limitations</h2>
              <p className="text-gray-300 mb-6">
                In no event shall we be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
              </p>

              <h2 className="text-xl font-semibold text-[#1DCD9F] mb-4">5. Accuracy of Materials</h2>
              <p className="text-gray-300 mb-6">
                The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete or current.
              </p>

              <h2 className="text-xl font-semibold text-[#1DCD9F] mb-4">6. Links</h2>
              <p className="text-gray-300 mb-6">
                We have not reviewed all of the sites linked to its website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site.
              </p>

              <h2 className="text-xl font-semibold text-[#1DCD9F] mb-4">7. Modifications</h2>
              <p className="text-gray-300 mb-6">
                We may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
              </p>

              <h2 className="text-xl font-semibold text-[#1DCD9F] mb-4">8. Governing Law</h2>
              <p className="text-gray-300">
                These terms and conditions are governed by and construed in accordance with the laws of Nepal and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
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

export default TermsPage;