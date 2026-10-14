'use client';

import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin, FiDownload } from 'react-icons/fi';

const PHONE = '9779823153502';

const channels = [
  { icon: FiMail, label: 'Email', value: 'mnzkhadka1996@gmail.com', href: 'mailto:mnzkhadka1996@gmail.com' },
  { icon: FiPhone, label: 'Phone / WhatsApp', value: '+977 9823153502', href: 'tel:+9779823153502' },
  { icon: FiMapPin, label: 'Location', value: 'Anamnagar, Kathmandu, Nepal' },
];

const inputClass =
  'w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 transition';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Name: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };

  return (
    <section id="contact" className="text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="reveal max-w-7xl mx-auto glass rounded-3xl overflow-hidden relative">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" aria-hidden="true" />
        <div className="relative grid lg:grid-cols-2 gap-10 p-7 sm:p-10">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-semibold">Let&apos;s build something great together</h2>
            <p className="mt-3 text-[0.95rem] text-gray-400 leading-relaxed max-w-md">
              Have a project, a role or just an idea? Send a message — I usually reply within a few hours.
            </p>
            <ul className="mt-8 space-y-4">
              {channels.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] border border-white/10 text-accent">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="text-sm">
                    <span className="block text-xs text-gray-500">{label}</span>
                    {href ? <a href={href} className="hover:text-accent transition-colors">{value}</a> : value}
                  </span>
                </li>
              ))}
            </ul>
            <a href="/manish.pdf" download="Manish_Khadka_CV.pdf" className="btn-ghost mt-8">
              <FiDownload aria-hidden="true" /> Download CV (PDF)
            </a>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="home-name" className="block mb-1.5 text-xs text-gray-400">Name</label>
                <input id="home-name" name="name" required value={form.name} onChange={handleChange} className={inputClass} placeholder="Your name" autoComplete="name" />
              </div>
              <div>
                <label htmlFor="home-email" className="block mb-1.5 text-xs text-gray-400">Email</label>
                <input id="home-email" type="email" name="email" required value={form.email} onChange={handleChange} className={inputClass} placeholder="you@company.com" autoComplete="email" />
              </div>
            </div>
            <div>
              <label htmlFor="home-message" className="block mb-1.5 text-xs text-gray-400">Message</label>
              <textarea id="home-message" name="message" rows={6} required value={form.message} onChange={handleChange} className={inputClass} placeholder="Tell me about your project…" />
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              <FaWhatsapp aria-hidden="true" /> Send via WhatsApp
            </button>
            <p className="text-xs text-gray-600 text-center">
              Prefer email? Write to <a href="mailto:mnzkhadka1996@gmail.com" className="text-gray-400 hover:text-accent">mnzkhadka1996@gmail.com</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
