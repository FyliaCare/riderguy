'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Building2 } from 'lucide-react';

export default function EnterprisePartnerPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    jobTitle: '',
    email: '',
    phone: '',
    companySize: '',
    industry: '',
    monthlyVolume: '',
    requirements: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Connect to backend API
    console.log('Enterprise Registration:', formData);
    
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Request Received!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your interest in RiderGuy Enterprise Solutions. A dedicated account executive will contact you within 24 hours at <strong>{formData.email}</strong> to schedule a personalized demo.
          </p>
          <p className="text-gray-600">
            We look forward to discussing how RiderGuy can transform your delivery operations.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Enterprise Solutions
            </h1>
            <p className="text-xl text-gray-600">
              Scale your delivery operations with RiderGuy's enterprise platform
            </p>
          </div>

          {/* Enterprise Benefits */}
          <div className="bg-linear-to-br from-blue-600 to-cyan-600 text-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">
              Enterprise Features
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-300 shrink-0 mt-1" />
                <span>Dedicated fleet & priority riders</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-300 shrink-0 mt-1" />
                <span>Custom API integration</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-300 shrink-0 mt-1" />
                <span>White-label solutions available</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-300 shrink-0 mt-1" />
                <span>Volume-based pricing discounts</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-300 shrink-0 mt-1" />
                <span>SLA guarantees & compensation</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-300 shrink-0 mt-1" />
                <span>Advanced analytics dashboard</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-300 shrink-0 mt-1" />
                <span>Dedicated account manager</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-300 shrink-0 mt-1" />
                <span>24/7 priority support hotline</span>
              </div>
            </div>
          </div>

          {/* Demo Request Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Request a Demo
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                  placeholder="Your Company Name"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    value={formData.contactName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                    placeholder="Full Name"
                  />
                </div>

                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    required
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                    placeholder="Your Position"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                    placeholder="+234 123 456 7890"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Size *
                  </label>
                  <select
                    id="companySize"
                    name="companySize"
                    required
                    value={formData.companySize}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                  >
                    <option value="">Select size</option>
                    <option value="50-200">50-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501-1000">501-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                    Industry *
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    required
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                  >
                    <option value="">Select industry</option>
                    <option value="logistics">Logistics & Transportation</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="food">Food & Beverage</option>
                    <option value="retail">Retail</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="technology">Technology</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="monthlyVolume" className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Monthly Delivery Volume *
                </label>
                <select
                  id="monthlyVolume"
                  name="monthlyVolume"
                  required
                  value={formData.monthlyVolume}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                >
                  <option value="">Select volume</option>
                  <option value="500-2000">500-2,000 deliveries</option>
                  <option value="2000-5000">2,000-5,000 deliveries</option>
                  <option value="5000-10000">5,000-10,000 deliveries</option>
                  <option value="10000+">10,000+ deliveries</option>
                </select>
              </div>

              <div>
                <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
                  Specific Requirements or Questions
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                  placeholder="Tell us about your delivery needs, integration requirements, or any specific questions..."
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-600"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to be contacted by RiderGuy regarding enterprise solutions and accept the Terms of Service and Privacy Policy.
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Request Demo & Pricing
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

          <div className="mt-8 text-center text-gray-600">
            <p>
              Need immediate assistance? Call our enterprise team at{' '}
              <a href="tel:+2341234567890" className="text-indigo-600 font-medium hover:underline">
                +234 123 456 7890
              </a>
              {' '}or email{' '}
              <a href="mailto:enterprise@riderguy.com" className="text-indigo-600 font-medium hover:underline">
                enterprise@riderguy.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
