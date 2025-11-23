import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Building2, CheckCircle2, Zap, Shield, BarChart3, Users, Webhook, Server, HeadphonesIcon, Globe, Lock, TrendingUp, Award, Clock, Package, Code, Database, Settings } from 'lucide-react';

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-600 via-cyan-500 to-blue-700 pt-24 pb-0">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 -left-40 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-end max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="text-white pb-16">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-white/30">
                <Building2 className="w-5 h-5 text-cyan-100" />
                <span className="font-medium">Enterprise Solutions</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
                Enterprise-Grade Logistics
                <span className="block text-cyan-100">At Scale</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-cyan-50 mb-10 leading-relaxed">
                Power your high-volume delivery operations with dedicated resources, custom integrations, 
                and priority support built for enterprise businesses.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/partner/enterprise"
                  className="inline-flex items-center justify-center px-10 py-5 bg-white text-blue-600 rounded-xl font-bold hover:bg-yellow-300 hover:text-gray-900 transition-all transform hover:scale-105 shadow-2xl text-lg"
                >
                  Request Enterprise Demo
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
                <Link 
                  href="#features"
                  className="inline-flex items-center justify-center px-10 py-5 bg-transparent text-white rounded-xl font-bold hover:bg-white/10 transition-all border-2 border-white backdrop-blur-sm text-lg"
                >
                  See Enterprise Features
                </Link>
              </div>
            </div>

            {/* Right Content - Hero Image (Extends into next section) */}
            <div className="flex items-end justify-center relative">
              <div className="absolute inset-0 bg-linear-to-t from-cyan-200/40 via-blue-300/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
              <Image 
                src="/maps-bike.svg" 
                alt="Enterprise Delivery Solutions" 
                width={700} 
                height={700}
                className="relative z-10 w-full max-w-2xl h-auto drop-shadow-2xl"
                style={{ 
                  marginBottom: '-2rem',
                  filter: 'contrast(1.1) saturate(1.15) brightness(1.05)'
                }}
                priority
                quality={100}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black mb-4 text-gray-900">
                Built for Enterprise Scale
              </h2>
              <p className="text-xl text-gray-600">
                Trusted by Ghana's leading enterprises and multinational corporations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Retail Chains</h3>
                <p className="text-gray-600">
                  Multi-location franchises handling hundreds of deliveries daily across multiple cities.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Package className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">E-commerce Platforms</h3>
                <p className="text-gray-600">
                  Online marketplaces requiring seamless API integration and automated fulfillment.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Healthcare & Pharma</h3>
                <p className="text-gray-600">
                  Medical supplies, pharmaceuticals, and healthcare logistics with strict compliance.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">High-Volume Businesses</h3>
                <p className="text-gray-600">
                  Any business handling 50+ deliveries per day requiring dedicated infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black mb-4 text-gray-900">
                Enterprise-Exclusive Features
              </h2>
              <p className="text-xl text-gray-600">
                Advanced capabilities designed for large-scale operations
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="bg-linear-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Dedicated Fleet & Priority Dispatch</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Reserve riders and vehicles exclusively for your business. Your deliveries get priority assignment 
                  with guaranteed capacity during peak hours. No more waiting for available riders.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>Reserved rider pool</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>Priority dispatch queue</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>Guaranteed capacity SLA</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>Branded rider uniforms (optional)</span>
                  </li>
                </ul>
              </div>

              {/* Feature 2 */}
              <div className="bg-linear-to-br from-purple-50 to-white rounded-2xl p-8 border border-purple-100">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <Code className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Custom API Integration & Webhooks</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Seamlessly connect your existing systems with our RESTful API. Get real-time updates via webhooks. 
                  Full developer documentation and dedicated technical support for integration.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                    <span>RESTful API with full documentation</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                    <span>Webhook notifications</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                    <span>Custom endpoint configuration</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                    <span>Dedicated developer support</span>
                  </li>
                </ul>
              </div>

              {/* Feature 3 */}
              <div className="bg-linear-to-br from-green-50 to-white rounded-2xl p-8 border border-green-100">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Volume-Based Pricing & Custom Contracts</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Significant discounts based on your delivery volume. Flexible contract terms tailored to your 
                  business needs. Volume commitments unlock even deeper savings—up to 40% off standard rates.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <span>Tiered volume discounts (up to 40%)</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <span>Custom pricing structures</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <span>Flexible payment terms</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <span>Monthly invoicing options</span>
                  </li>
                </ul>
              </div>

              {/* Feature 4 */}
              <div className="bg-linear-to-br from-cyan-50 to-white rounded-2xl p-8 border border-cyan-100">
                <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-7 h-7 text-cyan-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Analytics & Business Intelligence</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Comprehensive reporting suite with predictive analytics. Custom dashboards showing metrics that 
                  matter to your business. Export data in any format for further analysis.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0" />
                    <span>Custom dashboard builder</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0" />
                    <span>Predictive analytics & forecasting</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0" />
                    <span>Automated report scheduling</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0" />
                    <span>Data export (CSV, JSON, API)</span>
                  </li>
                </ul>
              </div>

              {/* Feature 5 */}
              <div className="bg-linear-to-br from-yellow-50 to-white rounded-2xl p-8 border border-yellow-100">
                <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-7 h-7 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Dedicated Account Management</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Personal account manager who understands your business inside-out. Strategic planning sessions, 
                  performance optimization, and quarterly business reviews to ensure you're getting maximum value.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-yellow-600 shrink-0" />
                    <span>Named account manager</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-yellow-600 shrink-0" />
                    <span>Quarterly business reviews</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-yellow-600 shrink-0" />
                    <span>Strategic planning support</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-yellow-600 shrink-0" />
                    <span>Performance optimization</span>
                  </li>
                </ul>
              </div>

              {/* Feature 6 */}
              <div className="bg-linear-to-br from-red-50 to-white rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <HeadphonesIcon className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">24/7 Priority Support & SLA Guarantees</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Round-the-clock phone, email, and chat support with guaranteed response times. Dedicated support 
                  hotline for urgent issues. Service Level Agreements with uptime guarantees.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0" />
                    <span>24/7 phone support hotline</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0" />
                    <span>15-minute response time SLA</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0" />
                    <span>Priority ticket resolution</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0" />
                    <span>99.9% uptime guarantee</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Enterprise Benefits */}
      <section className="py-24 bg-linear-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black mb-4 text-gray-900">
                Additional Enterprise Benefits
              </h2>
              <p className="text-xl text-gray-600">
                Everything in Small Business, plus these exclusive features
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <Lock className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-3">Enhanced Security</h3>
                <p className="text-gray-600 text-sm">
                  SSO integration, IP whitelisting, and advanced security protocols for enterprise compliance.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <Database className="w-10 h-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-3">Data Retention</h3>
                <p className="text-gray-600 text-sm">
                  Extended data retention policies and on-demand historical data access for compliance.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <Settings className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-3">Custom Workflows</h3>
                <p className="text-gray-600 text-sm">
                  Tailored delivery workflows, custom approval processes, and multi-location management.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <Webhook className="w-10 h-10 text-cyan-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-3">White-Label Options</h3>
                <p className="text-gray-600 text-sm">
                  Custom branding, branded tracking pages, and white-label customer communications.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <Server className="w-10 h-10 text-red-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-3">Infrastructure Priority</h3>
                <p className="text-gray-600 text-sm">
                  Dedicated infrastructure resources ensuring optimal performance during peak times.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <Clock className="w-10 h-10 text-yellow-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-3">Flexible Scheduling</h3>
                <p className="text-gray-600 text-sm">
                  Advanced scheduling engine with multi-stop routes, time windows, and route optimization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-linear-to-br from-blue-600 to-cyan-600 rounded-3xl p-12 text-white shadow-2xl">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-black mb-4">Enterprise Success Story</h2>
                <p className="text-xl text-cyan-100">How a leading retailer scaled to 500+ daily deliveries</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-10">
                <div className="text-center">
                  <div className="text-5xl font-black mb-2">500+</div>
                  <div className="text-cyan-100">Daily Deliveries</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-black mb-2">35%</div>
                  <div className="text-cyan-100">Cost Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-black mb-2">99.2%</div>
                  <div className="text-cyan-100">On-Time Rate</div>
                </div>
              </div>

              <blockquote className="text-xl italic text-center mb-6">
                &quot;RiderGuy's enterprise solution transformed our logistics operations. The dedicated fleet 
                and API integration allowed us to scale from 50 to 500 daily deliveries seamlessly.&quot;
              </blockquote>

              <div className="text-center">
                <p className="font-bold text-lg">— Head of Operations, Leading Retail Chain</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black mb-4 text-gray-900">
                Getting Started with Enterprise
              </h2>
              <p className="text-xl text-gray-600">
                Our onboarding process ensures smooth integration
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6 shadow-xl">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Contact Sales</h3>
                <p className="text-gray-600">
                  Schedule a consultation to discuss your specific needs and requirements.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6 shadow-xl">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Proposal</h3>
                <p className="text-gray-600">
                  Receive tailored pricing and feature package designed for your business.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6 shadow-xl">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Integration Setup</h3>
                <p className="text-gray-600">
                  Work with our technical team to integrate APIs and configure your account.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6 shadow-xl">
                  4
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Go Live</h3>
                <p className="text-gray-600">
                  Launch with dedicated support and ongoing account management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-linear-to-br from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-black mb-6">
              Ready to Scale Your Deliveries?
            </h2>
            <p className="text-2xl text-cyan-50 mb-10 leading-relaxed">
              Talk to our enterprise team about custom solutions for your business.
            </p>
            <Link
              href="/partner/enterprise"
              className="inline-flex items-center justify-center px-12 py-6 bg-white text-blue-600 rounded-xl font-bold hover:bg-yellow-300 hover:text-gray-900 transition-all transform hover:scale-105 shadow-2xl text-xl"
            >
              Request Enterprise Demo
              <ArrowRight className="ml-3 w-7 h-7" />
            </Link>
            <p className="mt-6 text-cyan-100">
              Typical response time: 4 hours • Custom pricing • Dedicated onboarding
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
