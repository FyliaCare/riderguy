import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Package, Building2, CheckCircle2, Zap, Shield, BarChart3, HeadphonesIcon, Users, Wallet, TrendingUp, Sparkles, Star, Check } from 'lucide-react';

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Enhanced */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-600 via-cyan-500 to-blue-700 pt-24 pb-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-60 -left-40 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-white/30">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-white font-medium">Trusted by 500+ businesses across Africa</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight">
                Transform Your
                <span className="block bg-linear-to-r from-yellow-300 via-green-300 to-cyan-300 bg-clip-text text-transparent">
                  Delivery Experience
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-cyan-50 mb-10 leading-relaxed">
                Join Africa's fastest-growing delivery network. Scale your business with 
                enterprise-grade logistics at unbeatable prices.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Link 
                  href="/partner/individual"
                  className="group inline-flex items-center justify-center px-10 py-5 bg-white text-blue-600 rounded-xl font-bold hover:bg-yellow-300 hover:text-gray-900 transition-all transform hover:scale-105 shadow-2xl text-lg"
                >
                  Start Free Trial
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/partner/enterprise"
                  className="inline-flex items-center justify-center px-10 py-5 bg-transparent text-white rounded-xl font-bold hover:bg-white/10 transition-all border-2 border-white backdrop-blur-sm text-lg"
                >
                  Talk to Sales
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
              </div>

              {/* Social Proof Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
                <div>
                  <div className="text-3xl lg:text-4xl font-black text-white mb-2">45min</div>
                  <div className="text-cyan-100 text-sm lg:text-base">Avg Delivery Time</div>
                </div>
                <div>
                  <div className="text-3xl lg:text-4xl font-black text-white mb-2">98%</div>
                  <div className="text-cyan-100 text-sm lg:text-base">Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl lg:text-4xl font-black text-white mb-2">24/7</div>
                  <div className="text-cyan-100 text-sm lg:text-base">Support Available</div>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <Image 
                  src="/biker-business.svg" 
                  alt="RiderGuy Business Delivery Partner" 
                  width={600} 
                  height={480}
                  className="relative z-10 drop-shadow-2xl w-full max-w-xl h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Logo Carousel */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600 font-semibold mb-8 uppercase tracking-wider text-sm">
            Trusted by Leading Businesses
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="text-3xl font-black text-gray-400">SHOPRITE</div>
            <div className="text-3xl font-black text-gray-400">JUMIA</div>
            <div className="text-3xl font-black text-gray-400">KONGA</div>
            <div className="text-3xl font-black text-gray-400">PAYSTACK</div>
            <div className="text-3xl font-black text-gray-400">FLUTTERWAVE</div>
            <div className="text-3xl font-black text-gray-400">ANDELA</div>
          </div>
        </div>
      </section>

      {/* Partnership Options - Enhanced */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-4 text-gray-900">
                Choose Your Partnership Plan
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Select the plan that best fits your business needs and scale as you grow.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Small Business Plan */}
              <Link href="/partner/small-business" className="relative group block">
                <div className="absolute inset-0 bg-linear-to-br from-green-400 to-green-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-white border-2 border-gray-200 rounded-3xl p-10 hover:border-green-500 transition-all hover:shadow-2xl h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <Package className="w-10 h-10 text-green-600" />
                    <h3 className="text-3xl font-black text-gray-900">Small Business</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    Designed for growing businesses like restaurants, online stores, retail shops, and local services. 
                    Get started in minutes with our flexible pay-as-you-go model that scales with your delivery needs.
                  </p>

                  <div className="bg-green-50 rounded-xl p-6 mb-8 border border-green-100">
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">Perfect For:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                        <span>Restaurants & food delivery services</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                        <span>E-commerce & online retail stores</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                        <span>Local shops & boutiques</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                        <span>Startups & small teams (1-50 deliveries/day)</span>
                      </li>
                    </ul>
                  </div>

                  <h4 className="font-bold text-gray-900 mb-4 text-lg">Key Features:</h4>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-900 font-semibold block">Quick Setup</span>
                        <span className="text-gray-600 text-sm">Create your account and start delivering within 5 minutes. No complex onboarding process.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-900 font-semibold block">Real-Time Tracking</span>
                        <span className="text-gray-600 text-sm">Monitor every delivery with GPS tracking. Share live updates with your customers.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-900 font-semibold block">Flexible Scheduling</span>
                        <span className="text-gray-600 text-sm">Same-day, scheduled, or recurring deliveries. You choose when and how often.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-900 font-semibold block">Full Coverage</span>
                        <span className="text-gray-600 text-sm">Every package is insured. Damage or loss protection included at no extra cost.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-900 font-semibold block">Customer Support</span>
                        <span className="text-gray-600 text-sm">Email and chat support during business hours. Get help when you need it.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-900 font-semibold block">Analytics Dashboard</span>
                        <span className="text-gray-600 text-sm">Track performance metrics, delivery history, and customer satisfaction scores.</span>
                      </div>
                    </li>
                  </ul>

                  <div className="flex items-center justify-between px-8 py-4 bg-linear-to-r from-green-500 to-green-600 text-white rounded-xl font-bold group-hover:from-green-600 group-hover:to-green-700 transition-all shadow-lg text-lg">
                    <span>Get Started Now</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Enterprise Plan */}
              <Link href="/partner/enterprise-solutions" className="relative group block">
                <div className="absolute -inset-1 bg-linear-to-br from-blue-600 via-cyan-500 to-blue-700 rounded-3xl blur-xl opacity-30 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-linear-to-br from-blue-600 to-cyan-600 rounded-3xl p-10 hover:shadow-2xl transition-all text-white h-full">
                  <div className="absolute top-6 right-6">
                    <span className="inline-flex items-center gap-1 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                      <Star className="w-4 h-4" fill="currentColor" />
                      POPULAR
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Building2 className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-3xl font-black">Enterprise</h3>
                  </div>
                  
                  <p className="text-cyan-50 mb-6 text-lg leading-relaxed">
                    Built for businesses with high-volume delivery needs. Get dedicated resources, custom integrations, 
                    and priority support to power your large-scale logistics operations across multiple locations.
                  </p>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
                    <h4 className="font-bold text-white mb-3 text-lg">Perfect For:</h4>
                    <ul className="space-y-2 text-cyan-50">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
                        <span>Large retail chains & franchises</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
                        <span>E-commerce platforms & marketplaces</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
                        <span>Healthcare & pharmaceutical companies</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
                        <span>Businesses with 50+ deliveries/day</span>
                      </li>
                    </ul>
                  </div>

                  <h4 className="font-bold text-white mb-4 text-lg">Enterprise Features:</h4>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-300 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-white font-semibold block">Dedicated Fleet</span>
                        <span className="text-cyan-100 text-sm">Reserved riders and vehicles for your business. Priority dispatch and faster delivery times.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-300 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-white font-semibold block">Custom API Integration</span>
                        <span className="text-cyan-100 text-sm">Seamlessly connect your systems with our RESTful API. Webhooks for real-time updates.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-300 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-white font-semibold block">Volume Pricing</span>
                        <span className="text-cyan-100 text-sm">Significant discounts based on your delivery volume. Custom pricing tailored to your needs.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-300 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-white font-semibold block">Advanced Analytics</span>
                        <span className="text-cyan-100 text-sm">Comprehensive reporting, predictive analytics, and custom dashboards. Export data in any format.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-300 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-white font-semibold block">Account Manager</span>
                        <span className="text-cyan-100 text-sm">Dedicated account manager who understands your business. Strategic planning and optimization.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-300 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-white font-semibold block">24/7 Priority Support</span>
                        <span className="text-cyan-100 text-sm">Round-the-clock phone, email, and chat support. Guaranteed response times and SLA commitments.</span>
                      </div>
                    </li>
                  </ul>

                  <div className="flex items-center justify-between px-8 py-4 bg-white text-blue-600 rounded-xl font-bold group-hover:bg-yellow-300 group-hover:text-gray-900 transition-all shadow-lg text-lg">
                    <span>Contact Sales Team</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-4 text-gray-900">
                Loved by Businesses
              </h2>
              <p className="text-xl text-gray-600">
                See what our partners have to say
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  &quot;RiderGuy transformed our delivery operations. We went from 2-day deliveries to same-day, and our customer satisfaction doubled.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    AO
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Adebayo Okonkwo</div>
                    <div className="text-sm text-gray-600">CEO, FreshMart Lagos</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  &quot;The API integration was seamless. We now handle 500+ deliveries daily with complete visibility and control.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-linear-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    CN
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Chioma Nwosu</div>
                    <div className="text-sm text-gray-600">CTO, TechMall Nigeria</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  &quot;Best decision we made for scaling our restaurant. Affordable, reliable, and their support team is incredible.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    EM
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Emmanuel Musa</div>
                    <div className="text-sm text-gray-600">Owner, Suya Kingdom</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-4 text-gray-900">
                Why Partner With RiderGuy?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to scale your delivery operations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Benefit 1 */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-linear-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
                <p className="text-gray-600 leading-relaxed">
                  Average 45-minute delivery time across all major cities
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-linear-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fully Insured</h3>
                <p className="text-gray-600 leading-relaxed">
                  Complete insurance coverage on every single delivery
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-linear-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Real-Time Tracking</h3>
                <p className="text-gray-600 leading-relaxed">
                  Track every delivery in real-time with GPS precision
                </p>
              </div>

              {/* Benefit 4 */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-linear-to-br from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <HeadphonesIcon className="w-10 h-10 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
                <p className="text-gray-600 leading-relaxed">
                  Round-the-clock support team ready to help you
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-20 bg-linear-to-br from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-6xl font-black mb-2">100K+</div>
                <div className="text-cyan-100 text-lg">Deliveries Completed</div>
              </div>
              <div>
                <div className="text-6xl font-black mb-2">15</div>
                <div className="text-cyan-100 text-lg">Cities Covered</div>
              </div>
              <div>
                <div className="text-6xl font-black mb-2">99.8%</div>
                <div className="text-cyan-100 text-lg">On-Time Rate</div>
              </div>
              <div>
                <div className="text-6xl font-black mb-2">500+</div>
                <div className="text-cyan-100 text-lg">Business Partners</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-4 text-gray-900">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need in one platform
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Dashboard Management</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Intuitive dashboard to manage all your deliveries, track riders, and monitor performance in real-time.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Live delivery tracking</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Rider performance metrics</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Delivery history & reports</span>
                  </li>
                </ul>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-linear-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Flexible Billing</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Multiple payment options with transparent pricing. Pay only for what you use with no hidden charges.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Multiple payment methods</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Automated invoicing</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Expense tracking</span>
                  </li>
                </ul>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Analytics</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Deep insights into your delivery operations with comprehensive analytics and reporting tools.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Performance dashboards</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Custom reports</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Data export options</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-linear-to-br from-green-500 to-green-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-5xl font-black mb-6">
              Ready to Transform Your Deliveries?
            </h2>
            <p className="text-2xl text-green-50 mb-10 leading-relaxed">
              Join hundreds of businesses already scaling with RiderGuy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/partner/individual"
                className="inline-flex items-center justify-center px-10 py-5 bg-white text-green-600 rounded-xl font-bold hover:bg-yellow-300 hover:text-gray-900 transition-all transform hover:scale-105 shadow-2xl text-lg"
              >
                Start Your Free Trial
                <ArrowRight className="ml-3 w-6 h-6" />
              </Link>
              <Link 
                href="/partner/enterprise"
                className="inline-flex items-center justify-center px-10 py-5 bg-transparent text-white rounded-xl font-bold hover:bg-white/10 transition-all border-2 border-white backdrop-blur-sm text-lg"
              >
                Contact Enterprise Sales
                <ArrowRight className="ml-3 w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
