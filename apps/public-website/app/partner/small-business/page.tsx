import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Package, CheckCircle2, Clock, Shield, Zap, BarChart3, CreditCard, Users, Bell, Calendar, MapPin, TrendingUp, DollarSign, Smartphone, Mail, MessageSquare } from 'lucide-react';

export default function SmallBusinessPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-green-500 via-green-600 to-green-700 pt-24 pb-0">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 -left-40 w-96 h-96 bg-green-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-end max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="text-white pb-16">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-white/30">
                <Package className="w-5 h-5 text-green-100" />
                <span className="font-medium">Small Business Plan</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
                Delivery Made Simple
                <span className="block text-green-100">For Growing Businesses</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-green-50 mb-10 leading-relaxed">
                Everything you need to start delivering to your customers today. No setup fees, 
                no monthly charges, just simple pay-as-you-go pricing.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/partner/individual"
                  className="inline-flex items-center justify-center px-10 py-5 bg-white text-green-600 rounded-xl font-bold hover:bg-yellow-300 hover:text-gray-900 transition-all transform hover:scale-105 shadow-2xl text-lg"
                >
                  Get Started Free
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
                <Link 
                  href="#features"
                  className="inline-flex items-center justify-center px-10 py-5 bg-transparent text-white rounded-xl font-bold hover:bg-white/10 transition-all border-2 border-white backdrop-blur-sm text-lg"
                >
                  See All Features
                </Link>
              </div>
            </div>

            {/* Right Content - Hero Image (Extends into next section) */}
            <div className="flex items-end justify-center relative">
              <div className="absolute inset-0 bg-linear-to-t from-green-200/40 via-green-300/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
              <Image 
                src="/handing-over.svg" 
                alt="Small Business Delivery" 
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
                Perfect For Your Business
              </h2>
              <p className="text-xl text-gray-600">
                Trusted by businesses just like yours across Ghana
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Package className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Restaurants & Cafés</h3>
                <p className="text-gray-600">
                  Hot food delivery with guaranteed freshness. Perfect for local eateries and quick service restaurants.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Smartphone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">E-commerce Stores</h3>
                <p className="text-gray-600">
                  Seamless integration with your online store. Handle order fulfillment with ease.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Retail Shops</h3>
                <p className="text-gray-600">
                  Extend your reach beyond your storefront. Offer local delivery to nearby customers.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Startups</h3>
                <p className="text-gray-600">
                  Scale without infrastructure. Focus on your product while we handle logistics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black mb-4 text-gray-900">
                Everything You Need to Deliver
              </h2>
              <p className="text-xl text-gray-600">
                Powerful features designed specifically for small businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="bg-linear-to-br from-green-50 to-white rounded-2xl p-8 border border-green-100">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <Clock className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">5-Minute Setup</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Create your account and start booking deliveries immediately. No complicated onboarding, 
                  no paperwork, no waiting. Your business can start delivering within minutes of signing up.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <span>Simple registration form</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <span>Instant account activation</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <span>No verification delays</span>
                  </li>
                </ul>
              </div>

              {/* Feature 2 */}
              <div className="bg-linear-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <MapPin className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-Time GPS Tracking</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Watch your deliveries in real-time on an interactive map. Know exactly where your rider is 
                  at any moment. Share live tracking links with your customers for complete transparency.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>Live rider location updates</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>Customer tracking links</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>ETA calculations</span>
                  </li>
                </ul>
              </div>

              {/* Feature 3 */}
              <div className="bg-linear-to-br from-purple-50 to-white rounded-2xl p-8 border border-purple-100">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <Calendar className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Flexible Scheduling</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Book deliveries for right now, later today, or schedule for future dates. Set up recurring 
                  deliveries for regular customers. Complete control over your delivery timing.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                    <span>Same-day delivery</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                    <span>Schedule for future dates</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                    <span>Recurring delivery options</span>
                  </li>
                </ul>
              </div>

              {/* Feature 4 */}
              <div className="bg-linear-to-br from-red-50 to-white rounded-2xl p-8 border border-red-100">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Full Insurance Coverage</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Every package is automatically insured at no extra cost. Complete protection against damage, 
                  loss, or theft. Peace of mind for you and your customers on every single delivery.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0" />
                    <span>Automatic insurance on all deliveries</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0" />
                    <span>Fast claims process</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0" />
                    <span>No additional premiums</span>
                  </li>
                </ul>
              </div>

              {/* Feature 5 */}
              <div className="bg-linear-to-br from-yellow-50 to-white rounded-2xl p-8 border border-yellow-100">
                <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
                  <Bell className="w-7 h-7 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Notifications</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Automated SMS and email notifications keep you and your customers informed at every step. 
                  Pickup confirmations, delivery updates, and proof of delivery—all automated.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-yellow-600 shrink-0" />
                    <span>Pickup confirmations</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-yellow-600 shrink-0" />
                    <span>Delivery status updates</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-yellow-600 shrink-0" />
                    <span>Proof of delivery photos</span>
                  </li>
                </ul>
              </div>

              {/* Feature 6 */}
              <div className="bg-linear-to-br from-cyan-50 to-white rounded-2xl p-8 border border-cyan-100">
                <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-7 h-7 text-cyan-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Business Analytics</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Comprehensive dashboard showing all your delivery metrics. Track performance, identify trends, 
                  and make data-driven decisions to grow your business.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0" />
                    <span>Delivery performance metrics</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0" />
                    <span>Customer satisfaction scores</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0" />
                    <span>Export detailed reports</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-linear-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black mb-4 text-gray-900">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-gray-600">
                No hidden fees. No monthly charges. Just pay per delivery.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-12 border-2 border-green-200">
              <div className="text-center mb-10">
                <div className="inline-flex items-baseline gap-2 mb-4">
                  <span className="text-6xl font-black text-gray-900">Pay As You Go</span>
                </div>
                <p className="text-xl text-gray-600">Perfect for businesses handling 1-50 deliveries per day</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div>
                  <h4 className="font-bold text-gray-900 mb-4 text-lg">What's Included:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                      <span>Real-time GPS tracking</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                      <span>Full insurance coverage</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                      <span>Customer notifications</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                      <span>Business analytics dashboard</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-4 text-lg">Support & Service:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                      <span>Email support (response within 4 hours)</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                      <span>Live chat support (9am-6pm)</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                      <span>Knowledge base access</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                      <span>Business onboarding guide</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6 mb-8 border border-green-100">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  No Hidden Costs
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    <span>No setup fees or activation charges</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    <span>No monthly subscription or minimum commitments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    <span>No cancellation fees—pause anytime</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    <span>All features included at no extra cost</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/partner/individual"
                className="block w-full text-center px-10 py-5 bg-linear-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg text-xl"
              >
                Start Your Free Account Now
                <ArrowRight className="inline-block ml-3 w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black mb-4 text-gray-900">
                How It Works
              </h2>
              <p className="text-xl text-gray-600">
                Start delivering in 3 simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-6 shadow-xl">
                  1
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Create Account</h3>
                <p className="text-gray-600 leading-relaxed">
                  Sign up with your business email and basic information. Takes less than 2 minutes to complete.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-6 shadow-xl">
                  2
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Book Delivery</h3>
                <p className="text-gray-600 leading-relaxed">
                  Enter pickup and delivery addresses. A rider is automatically assigned within seconds.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-6 shadow-xl">
                  3
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Track & Complete</h3>
                <p className="text-gray-600 leading-relaxed">
                  Monitor your delivery in real-time. Get automatic notifications and proof of delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black mb-4 text-gray-900">
                We're Here to Help
              </h2>
              <p className="text-xl text-gray-600">
                Get support whenever you need it
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Email Support</h3>
                <p className="text-gray-600 mb-4">
                  Average response time: 4 hours
                </p>
                <a href="mailto:support@riderguy.com" className="text-green-600 font-semibold hover:underline">
                  support@riderguy.com
                </a>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Live Chat</h3>
                <p className="text-gray-600 mb-4">
                  Available 9am-6pm WAT, Monday-Saturday
                </p>
                <button className="text-green-600 font-semibold hover:underline">
                  Start Chat
                </button>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Knowledge Base</h3>
                <p className="text-gray-600 mb-4">
                  Guides, tutorials, and FAQs
                </p>
                <Link href="/help" className="text-green-600 font-semibold hover:underline">
                  Browse Articles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-linear-to-br from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-black mb-6">
              Ready to Start Delivering?
            </h2>
            <p className="text-2xl text-green-50 mb-10 leading-relaxed">
              Join hundreds of businesses already using RiderGuy. No credit card required to get started.
            </p>
            <Link
              href="/partner/individual"
              className="inline-flex items-center justify-center px-12 py-6 bg-white text-green-600 rounded-xl font-bold hover:bg-yellow-300 hover:text-gray-900 transition-all transform hover:scale-105 shadow-2xl text-xl"
            >
              Create Free Account
              <ArrowRight className="ml-3 w-7 h-7" />
            </Link>
            <p className="mt-6 text-green-100">
              Takes less than 5 minutes • No setup fees • Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
