import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Users, Wallet, Award, Heart, TrendingUp, Shield, CheckCircle2, MapPin, Clock, Smartphone, HeadphonesIcon, BookOpen, Building2, Package, Zap, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-green-50 via-white to-green-50 pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Empowering <span className="text-green-600">Delivery Riders</span> Across Africa
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
                RiderGuy is revolutionizing the delivery ecosystem by providing riders with the tools, 
                training, and support they need to build sustainable careers and better lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href="/join"
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  Become a Rider
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link 
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-50 transition-all border-2 border-green-600"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-green-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
                <Image 
                  src="/biker-hero.png" 
                  alt="RiderGuy Biker" 
                  width={700} 
                  height={560}
                  className="relative z-10 drop-shadow-2xl w-full max-w-2xl h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About Us
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              RiderGuy was born from a simple observation: delivery riders are the backbone 
              of modern urban life, yet they often lack the support, training, and recognition 
              they deserve. We're changing that by building a comprehensive platform that treats 
              delivery work as a real profession.
            </p>
            <Link 
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Learn More About Our Story
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Vision
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We envision a future where every delivery rider has access to professional training, 
              financial stability, healthcare, and a supportive community. RiderGuy is building 
              the infrastructure that transforms delivery work from a gig into a dignified career 
              with growth opportunities and social protection.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What Makes RiderGuy Different
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive support for riders at every stage of their journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Professional Training */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Training</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive training programs covering road safety, customer service, 
                bike maintenance, and digital skills to excel in delivery work.
              </p>
            </div>

            {/* Digital Wallet */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Wallet className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Digital Wallet</h3>
              <p className="text-gray-600 leading-relaxed">
                Secure digital wallet for instant payments, savings goals, and financial 
                management tools designed specifically for riders.
              </p>
            </div>

            {/* Rider Community */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Rider Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with fellow riders, share experiences, get support, and build 
                lasting friendships within our vibrant community.
              </p>
            </div>

            {/* Welfare & Benefits */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Welfare & Benefits</h3>
              <p className="text-gray-600 leading-relaxed">
                Access to healthcare, emergency support, insurance options, and welfare 
                programs designed to protect riders and their families.
              </p>
            </div>

            {/* XP & Rewards */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">XP & Rewards</h3>
              <p className="text-gray-600 leading-relaxed">
                Earn experience points, unlock achievements, level up your profile, and 
                get rewarded for consistent quality service.
              </p>
            </div>

            {/* Real-time Dispatch */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Dispatch</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced dispatch system with real-time tracking, optimized routing, 
                and fair task distribution for maximum earnings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">RiderGuy By The Numbers</h2>
            <p className="text-green-100 text-lg">Making real impact across Africa</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-5xl font-bold mb-2">10,000+</div>
              <div className="text-green-100 text-lg">Active Riders</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-5xl font-bold mb-2">50,000+</div>
              <div className="text-green-100 text-lg">Deliveries Completed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-5xl font-bold mb-2">95%</div>
              <div className="text-green-100 text-lg">Satisfaction Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-green-100 text-lg">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How RiderGuy Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <Smartphone className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sign Up</h3>
              <p className="text-gray-600">
                Register online in minutes with your phone, ID, and basic information
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <BookOpen className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Trained</h3>
              <p className="text-gray-600">
                Complete our professional training program covering safety, service, and skills
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <CheckCircle2 className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Verified</h3>
              <p className="text-gray-600">
                Pass verification checks and receive your official RiderGuy certification
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <MapPin className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Start Earning</h3>
              <p className="text-gray-600">
                Accept deliveries, earn money, and access all platform benefits immediately
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/join"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Your Journey Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tools & Resources */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Essential Tools For Riders
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to succeed, all in one platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  <Smartphone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Mobile App</h3>
                  <p className="text-gray-600 text-sm">iOS & Android apps for accepting deliveries, navigation, and earnings tracking</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <Wallet className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Digital Wallet</h3>
                  <p className="text-gray-600 text-sm">Instant payment processing with savings, withdrawals, and transaction history</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">GPS Tracking</h3>
                  <p className="text-gray-600 text-sm">Real-time location tracking, route optimization, and delivery proof</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Shift Scheduler</h3>
                  <p className="text-gray-600 text-sm">Flexible scheduling tools to manage your availability and work-life balance</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                  <HeadphonesIcon className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">24/7 Support</h3>
                  <p className="text-gray-600 text-sm">Round-the-clock customer support via phone, chat, and emergency hotline</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Analytics Dashboard</h3>
                  <p className="text-gray-600 text-sm">Detailed insights on earnings, performance metrics, and growth opportunities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Requirements To Join
              </h2>
              <p className="text-xl text-gray-600">
                Simple qualifications to become a RiderGuy professional
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Age Requirement</h3>
                  <p className="text-gray-600">Must be 18 years or older with valid identification</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Motorcycle & License</h3>
                  <p className="text-gray-600">Valid motorcycle and driver's license (or access to rental options)</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Smartphone</h3>
                  <p className="text-gray-600">Android or iOS device with GPS and internet connection</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Background Check</h3>
                  <p className="text-gray-600">Clean background and commitment to safety standards</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Communication Skills</h3>
                  <p className="text-gray-600">Basic English or local language proficiency for customer service</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Training Completion</h3>
                  <p className="text-gray-600">Pass RiderGuy professional certification program</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-gray-700">
                <strong>Don't have a motorcycle?</strong> No problem! We offer flexible rental and lease-to-own programs to help you get started.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Partnership Section */}
      <section className="py-20 bg-linear-to-br from-blue-600 via-cyan-500 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Partner With RiderGuy
              </h2>
              <p className="text-xl text-blue-100">
                Access Africa's most reliable delivery network for your business
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Small Business / Individual Clients */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Small Business & Individuals</h3>
                <p className="text-cyan-100 mb-6">
                  Perfect for small businesses, e-commerce stores, restaurants, and individuals who need reliable delivery services
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-300 shrink-0 mt-0.5" />
                    <span className="text-cyan-100">Pay-per-delivery pricing with no monthly fees</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-300 shrink-0 mt-0.5" />
                    <span className="text-cyan-100">Real-time tracking and delivery notifications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-300 shrink-0 mt-0.5" />
                    <span className="text-cyan-100">Easy online booking and management dashboard</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-300 shrink-0 mt-0.5" />
                    <span className="text-cyan-100">Flexible scheduling and same-day delivery</span>
                  </li>
                </ul>
                <Link 
                  href="/partner/individual"
                  className="inline-flex items-center justify-center w-full px-6 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all"
                >
                  Create Business Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>

              {/* Enterprise / Large Business */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Enterprise Solutions</h3>
                <p className="text-cyan-100 mb-6">
                  Comprehensive delivery infrastructure for large businesses, logistics companies, and enterprise organizations
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-300 shrink-0 mt-0.5" />
                    <span className="text-cyan-100">Dedicated fleet and priority rider allocation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-300 shrink-0 mt-0.5" />
                    <span className="text-cyan-100">Custom API integration with your systems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-300 shrink-0 mt-0.5" />
                    <span className="text-cyan-100">Volume discounts and flexible billing options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-300 shrink-0 mt-0.5" />
                    <span className="text-cyan-100">Advanced analytics and reporting dashboard</span>
                  </li>
                </ul>
                <Link 
                  href="/partner/enterprise"
                  className="inline-flex items-center justify-center w-full px-6 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all"
                >
                  Request Enterprise Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Partnership Benefits */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-center mb-8">Why Businesses Choose RiderGuy</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-7 h-7 text-yellow-300" />
                  </div>
                  <h4 className="font-bold mb-2">Fast & Reliable</h4>
                  <p className="text-indigo-100 text-sm">Average delivery time under 45 minutes</p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-7 h-7 text-blue-300" />
                  </div>
                  <h4 className="font-bold mb-2">Fully Insured</h4>
                  <p className="text-indigo-100 text-sm">All deliveries covered with insurance</p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-7 h-7 text-green-300" />
                  </div>
                  <h4 className="font-bold mb-2">Real-Time Tracking</h4>
                  <p className="text-indigo-100 text-sm">Monitor every delivery live</p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <HeadphonesIcon className="w-7 h-7 text-pink-300" />
                  </div>
                  <h4 className="font-bold mb-2">24/7 Support</h4>
                  <p className="text-indigo-100 text-sm">Dedicated account managers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of riders who are building better futures with RiderGuy. 
            Get started today and unlock your potential.
          </p>
          <Link 
            href="/join"
            className="inline-flex items-center justify-center px-10 py-5 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-xl text-lg"
          >
            Join RiderGuy Now
            <ArrowRight className="ml-3 w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}
