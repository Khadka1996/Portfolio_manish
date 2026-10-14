'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { FaWhatsapp, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import NavBar from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: false,
  });
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: false, error: false });

    try {
      // Create WhatsApp message
      const phoneNumber = '9779823153502'; // Your WhatsApp number without '+'
      const message = `Name: ${formData.name}%0AEmail: ${formData.email}%0AMessage: ${formData.message}`;
      
      // Check if user is on mobile device
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      // Create WhatsApp link based on device
      const whatsappLink = isMobile 
        ? `whatsapp://send?phone=${phoneNumber}&text=${message}`
        : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
      
      // Open WhatsApp
      window.open(whatsappLink, '_blank');
      
      // Reset form
      formRef.current.reset();
      setFormStatus({ submitting: false, success: true, error: false });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, success: false }));
      }, 5000);
    } catch (error) {
      setFormStatus({ submitting: false, success: false, error: true });
    }
  };

  const contactMethods = [
    {
      icon: <FiMail className="text-2xl text-[#1DCD9F]" />,
      title: "Email Me",
      info: "mnzkhadka1996@gmail.com",
      action: "mailto:mnzkhadka1996@gmail.com",
      actionLabel: "Send Email"
    },
    {
      icon: <FiPhone className="text-2xl text-[#1DCD9F]" />,
      title: "Call Me",
      info: "+977 9823153502",
      action: "tel:+9779823153502",
      actionLabel: "Call Now"
    },
    {
      icon: <FaWhatsapp className="text-2xl text-[#1DCD9F]" />,
      title: "WhatsApp",
      info: "+977 9823153502",
      action: "https://wa.me/9779823153502",
      actionLabel: "Chat Now"
    },
    {
      icon: <FiMapPin className="text-2xl text-[#1DCD9F]" />,
      title: "Location",
      info: "Kathmandu, Nepal",
      action: "https://maps.google.com?q=Kathmandu",
      actionLabel: "View Map"
    }
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin className="text-xl" />,
      url: "https://www.linkedin.com/in/manishkhadka1996/",
      label: "LinkedIn"
    },
    {
      icon: <FaGithub className="text-xl" />,
      url: "https://github.com/Khadka1996",
      label: "GitHub"
    },
    {
      icon: <FaTwitter className="text-xl" />,
      url: "https://x.com/maneez_khadka",
      label: "Twitter"
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
            <h1 className="text-3xl sm:text-4xl font-semibold mb-4">Get In <span className="text-[#1DCD9F]">Touch</span></h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Have a project in mind or want to collaborate? Reach out through any of these channels.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white/[0.03] backdrop-blur-[2px] rounded-xl p-8 border border-white/10 hover:border-[#1DCD9F] transition-all duration-500"
              >
                <div className="flex justify-center mb-6">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">{method.title}</h3>
                <p className="text-gray-400 mb-6 text-center">{method.info}</p>
                <div className="text-center">
                  <a 
                    href={method.action} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2.5 bg-white/[0.06] text-white rounded-full hover:bg-[#1DCD9F] transition-colors duration-300"
                  >
                    {method.actionLabel}
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="bg-white/[0.03] backdrop-blur-[2px] rounded-xl p-8 md:p-12 border border-white/10 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-2 text-[#1DCD9F]">Send Me a Message</h2>
            <p className="text-gray-400 mb-8">Fill out the form below and I&apos;ll get back to you as soon as possible.</p>
            
            {formStatus.success && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-900/30 border border-green-500 rounded-lg flex items-center gap-3"
              >
                <FiCheckCircle className="text-green-500 text-xl" />
                <span>Your message has been sent successfully!</span>
              </motion.div>
            )}
            
            {formStatus.error && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded-lg flex items-center gap-3"
              >
                <FiAlertCircle className="text-red-500 text-xl" />
                <span>There was an error sending your message. Please try again.</span>
              </motion.div>
            )}
            
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-gray-400">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/[0.06] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DCD9F] transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-gray-400">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/[0.06] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DCD9F] transition-all"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 text-gray-400">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/[0.06] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DCD9F] transition-all"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={formStatus.submitting}
                className="px-8 py-3.5 bg-gradient-to-r from-[#1DCD9F] to-[#169976] text-white rounded-full font-medium hover:from-[#169976] hover:to-[#1DCD9F] transition-all duration-300 flex items-center gap-2 mx-auto disabled:opacity-70"
              >
                {formStatus.submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaWhatsapp />
                    Send via WhatsApp
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] backdrop-blur-[2px] rounded-xl p-12 border border-white/10"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Connect <span className="text-[#1DCD9F]">With Me</span></h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Follow me on social media to stay updated with my latest projects and insights.
            </p>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -5 }}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/[0.06] hover:bg-[#1DCD9F] text-white p-4 rounded-full transition-colors duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <WhatsAppButton/>
      <Footer />
    </div>
  );
};

export default ContactPage;