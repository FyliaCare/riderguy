'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function JoinPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    hasMotorcycle: '',
    experience: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Connect to auth service at http://localhost:4001/api/auth/register
    console.log('Registration data:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-green-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to RiderGuy!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for joining us. We'll review your application and get back to you within 24-48 hours.
          </p>
          <p className="text-gray-600">
            Check your email at <strong>{formData.email}</strong> for next steps.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Join RiderGuy
            </h1>
            <p className="text-xl text-gray-600">
              Start your journey to a better delivery career today
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What You'll Get
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                <span className="text-gray-700">Professional training programs</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                <span className="text-gray-700">Digital wallet with instant payments</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                <span className="text-gray-700">Healthcare and insurance access</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                <span className="text-gray-700">Supportive rider community</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                <span className="text-gray-700">XP rewards and recognition</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                <span className="text-gray-700">24/7 support and emergency help</span>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Application Form
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone */}
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition"
                  placeholder="+234 123 456 7890"
                />
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition"
                  placeholder="Lagos, Abuja, etc."
                />
              </div>

              {/* Has Motorcycle */}
              <div>
                <label htmlFor="hasMotorcycle" className="block text-sm font-medium text-gray-700 mb-2">
                  Do you own a motorcycle? *
                </label>
                <select
                  id="hasMotorcycle"
                  name="hasMotorcycle"
                  required
                  value={formData.hasMotorcycle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition"
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes, I own a motorcycle</option>
                  <option value="no">No, I don't own one yet</option>
                  <option value="planning">Planning to get one soon</option>
                </select>
              </div>

              {/* Experience */}
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Experience *
                </label>
                <select
                  id="experience"
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition"
                >
                  <option value="">Select your experience level</option>
                  <option value="none">No experience</option>
                  <option value="less-than-6">Less than 6 months</option>
                  <option value="6-12">6 months to 1 year</option>
                  <option value="1-2">1-2 years</option>
                  <option value="2-plus">More than 2 years</option>
                </select>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-600"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the RiderGuy Terms of Service and Privacy Policy. I understand that my application will be reviewed and I may be contacted for additional information.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Submit Application
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center text-gray-600">
            <p>
              Have questions? Contact us at{' '}
              <a href="mailto:support@riderguy.com" className="text-green-600 font-medium hover:underline">
                support@riderguy.com
              </a>
              {' '}or call{' '}
              <a href="tel:+2341234567890" className="text-green-600 font-medium hover:underline">
                +234 123 456 7890
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
