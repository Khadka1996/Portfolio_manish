// src/app/components/Form.js
import React, { useState } from 'react';
import { FaTimes, FaCheckCircle, FaSpinner,FaArrowRight } from 'react-icons/fa';

const Form = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    office: '',
    destination: '',
    year: '',
    intake: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors.email = 'Please enter a valid email';
    if (!formData.mobile.match(/^\d{10}$/)) newErrors.mobile = 'Enter a valid 10-digit mobile number';
    if (!formData.office) newErrors.office = 'Please select an office';
    if (!formData.destination) newErrors.destination = 'Please select a destination';
    if (!formData.year) newErrors.year = 'Please select a year';
    if (!formData.intake) newErrors.intake = 'Please select an intake';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const message = `Study Abroad Inquiry:%0AName: ${encodeURIComponent(formData.name)}%0AEmail: ${encodeURIComponent(formData.email)}%0AMobile: +977${formData.mobile}%0ANearest Office: ${encodeURIComponent(formData.office)}%0ADestination: ${encodeURIComponent(formData.destination)}%0AYear: ${formData.year}%0AIntake: ${encodeURIComponent(formData.intake)}`;
    const whatsappUrl = `https://${
      typeof window !== 'undefined' && window.innerWidth > 768 ? 'web' : 'api'
    }.whatsapp.com/send?phone=+9779823153502&text=${message}`;

    try {
      window.open(whatsappUrl, '_blank');
      setSuccess(true);
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          mobile: '',
          office: '',
          destination: '',
          year: '',
          intake: '',
        });
        setSuccess(false);
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-center z-50 px-4 py-6 md:py-8 transition-opacity duration-300 overflow-y-auto">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg md:max-w-[600px] lg:max-w-[700px] max-h-[90vh] overflow-y-auto relative transform transition-all duration-300 scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-teal-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-teal-600 hover:text-teal-800 transition-colors duration-200 z-10"
          aria-label="Close form"
        >
          <FaTimes size={18} />
        </button>

        {/* Form Header */}
        <h2 className="text-2xl lg:text-3xl font-bold text-teal-900 mb-2 text-center sticky top-0 bg-white z-10">
          Free Study Abroad Consultation
        </h2>
        <p className="text-gray-600 text-center mb-6 text-sm lg:text-base sticky top-10 bg-white z-10">
          Let’s start your journey to study abroad with Drishya Education!
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-teal-800 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-teal-50 border border-teal-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 placeholder-gray-400 text-gray-800 text-sm"
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-teal-800 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-teal-50 border border-teal-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 placeholder-gray-400 text-gray-800 text-sm"
              placeholder="Enter your email address"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Mobile Field */}
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-teal-800 mb-1.5">
              Mobile Number
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-teal-100 text-teal-700 text-sm font-medium border border-r-0 border-teal-200 rounded-l-md">
                +977
              </span>
              <input
                type="tel"
                name="mobile"
                id="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-teal-50 border border-teal-200 rounded-r-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 placeholder-gray-400 text-gray-800 text-sm"
                placeholder="Enter your mobile number"
              />
            </div>
            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
          </div>

          {/* Office Field */}
          <div>
            <label htmlFor="office" className="block text-sm font-medium text-teal-800 mb-1.5">
              Nearest Office
            </label>
            <select
              name="office"
              id="office"
              value={formData.office}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-teal-50 border border-teal-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 text-gray-800 text-sm"
            >
              <option value="" disabled>
                Select an office
              </option>
              <option value="kathmandu">Kathmandu</option>
              <option value="pokhara">Pokhara</option>
            </select>
            {errors.office && <p className="text-red-500 text-xs mt-1">{errors.office}</p>}
          </div>

          {/* Destination Field */}
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-teal-800 mb-1.5">
              Preferred Study Destination
            </label>
            <select
              name="destination"
              id="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-teal-50 border border-teal-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 text-gray-800 text-sm"
            >
              <option value="" disabled>
                Select a destination
              </option>
              <option value="australia">Australia</option>
              <option value="canada">Canada</option>
              <option value="germany">Germany</option>
              <option value="newzealand">New Zealand</option>
              <option value="uk">UK</option>
              <option value="usa">USA</option>
            </select>
            {errors.destination && <p className="text-red-500 text-xs mt-1">{errors.destination}</p>}
          </div>

          {/* Year and Intake Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-teal-800 mb-1.5">
                Preferred Study Year
              </label>
              <select
                name="year"
                id="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-teal-50 border border-teal-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 text-gray-800 text-sm"
              >
                <option value="" disabled>
                  Select a year
                </option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
              {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
            </div>

            <div>
              <label htmlFor="intake" className="block text-sm font-medium text-teal-800 mb-1.5">
                Preferred Study Intake
              </label>
              <select
                name="intake"
                id="intake"
                value={formData.intake}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-teal-50 border border-teal-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 text-gray-800 text-sm"
              >
                <option value="" disabled>
                  Select an intake
                </option>
                <option value="january">January</option>
                <option value="april">April</option>
                <option value="july">July</option>
                <option value="september">September</option>
                <option value="october">October</option>
              </select>
              {errors.intake && <p className="text-red-500 text-xs mt-1">{errors.intake}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="sticky bottom-0 bg-white pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-teal-600 text-white font-medium py-3 px-6 rounded-md hover:bg-teal-700 transition duration-200 flex items-center justify-center space-x-2 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md'
              }`}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  <span>Submitting...</span>
                </>
              ) : success ? (
                <>
                  <FaCheckCircle className="mr-2" />
                  <span>Submitted!</span>
                </>
              ) : (
                <>
                  <span>Submit Inquiry</span>
                  <FaArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;