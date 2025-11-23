import Image from 'next/image';
import Link from 'next/link';
import { Award, Wallet, Users, Heart, TrendingUp, Shield, BookOpen, DollarSign, MessageSquare, Zap, BarChart3, Phone, ArrowRight, CheckCircle2, Star, Sparkles, Target, Clock, Globe, Lock, Package } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0 items-stretch min-h-screen">
          {/* Left Content - Dark Background */}
          <div className="relative bg-linear-to-br from-gray-900 via-green-900 to-gray-900 text-white px-8 lg:px-16 py-20 flex flex-col justify-center">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-48 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
              
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-green-400/30">
                  <Sparkles className="w-5 h-5 text-green-400" />
                  <span className="font-semibold text-green-300">Services Built for Riders</span>
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
                  Beyond Just
                  <span className="block bg-linear-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                    Deliveries
                  </span>
                </h1>
                
                <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                  A complete ecosystem of services designed to support, protect, and empower every rider in our community.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/rider/register"
                    className="inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-2xl text-lg group"
                  >
                    Join as Rider
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    href="#explore"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20 text-lg"
                  >
                    Explore Services
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Image - Light Background */}
            <div className="relative bg-gray-50 flex items-center justify-center">
              <Image 
                src="/biker-talk.svg" 
                alt="Rider Services" 
                fill
                className="object-cover"
                priority
                quality={100}
              />
            </div>
          </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 text-white/60 animate-bounce">
            <span className="text-sm font-medium">Explore Below</span>
            <ArrowRight className="w-5 h-5 rotate-90" />
          </div>
        </div>
      </section>

      {/* Services Navigation */}
      <section id="explore" className="sticky top-20 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-200 py-6 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
            {[
              { name: 'Training', icon: Award, href: '#training' },
              { name: 'Digital Wallet', icon: Wallet, href: '#wallet' },
              { name: 'Community', icon: Users, href: '#community' },
              { name: 'Welfare', icon: Heart, href: '#welfare' },
              { name: 'XP & Rewards', icon: TrendingUp, href: '#rewards' },
              { name: 'Smart Dispatch', icon: Zap, href: '#dispatch' },
            ].map((service) => (
              <a
                key={service.name}
                href={service.href}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-semibold whitespace-nowrap transition-all hover:scale-105 border border-gray-200"
              >
                <service.icon className="w-5 h-5" />
                {service.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section id="training" className="py-32 bg-linear-to-br from-green-50 via-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-green-100 px-6 py-3 rounded-full mb-6">
                <Award className="w-5 h-5 text-green-600" />
                <span className="font-bold text-green-700">Professional Training</span>
              </div>
              <h2 className="text-5xl lg:text-6xl font-black mb-6 text-gray-900">Master Your Craft</h2>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
                World-class training programs designed to elevate your skills
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 lg:row-span-2 bg-linear-to-br from-green-500 to-green-700 rounded-3xl p-12 text-white relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8">
                    <BookOpen className="w-10 h-10" />
                  </div>
                  <h3 className="text-4xl font-black mb-4">Road Safety Certification</h3>
                  <p className="text-xl text-green-100 mb-8 leading-relaxed">
                    Complete defensive driving courses and master traffic regulations. Increase your earning potential by up to 35%.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">4-Week Program</div>
                    <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">Free</div>
                    <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">+35% Earnings</div>
                  </div>
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 rounded-xl font-bold hover:bg-green-50 transition-all">
                    Enroll Now
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:scale-[1.02]">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-black mb-3 text-gray-900">Customer Service</h3>
                <p className="text-gray-600 leading-relaxed">
                  Professional communication and conflict resolution
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:scale-[1.02]">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-black mb-3 text-gray-900">Bike Maintenance</h3>
                <p className="text-gray-600 leading-relaxed">
                  Essential maintenance skills to reduce costs
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:scale-[1.02]">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <Phone className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-black mb-3 text-gray-900">Digital Literacy</h3>
                <p className="text-gray-600 leading-relaxed">
                  Master delivery apps and navigation tools
                </p>
              </div>

              <div className="lg:col-span-2 bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white flex items-center justify-between hover:scale-[1.02] transition-transform">
                <div>
                  <h3 className="text-3xl font-black mb-2">12,450 riders certified</h3>
                  <p className="text-gray-400">Most trained network in Ghana</p>
                </div>
                <div className="text-6xl font-black text-green-400">↗</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wallet Section */}
      <section id="wallet" className="py-32 bg-linear-to-br from-blue-50 via-white to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-blue-100 px-6 py-3 rounded-full mb-6">
                <Wallet className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-blue-700">Digital Wallet</span>
              </div>
              <h2 className="text-5xl lg:text-6xl font-black mb-6 text-gray-900">
                Your Money, <span className="text-blue-600">Your Control</span>
              </h2>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
                Financial platform built specifically for riders
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {[
                  { icon: DollarSign, title: 'Instant Payments', desc: 'Get paid immediately after delivery' },
                  { icon: TrendingUp, title: 'Smart Savings', desc: 'Automated savings with 8% interest' },
                  { icon: BarChart3, title: 'Financial Dashboard', desc: 'Track earnings and expenses' },
                  { icon: Shield, title: 'Bank-Level Security', desc: 'Enterprise encryption protection' },
                ].map((feature, idx) => (
                  <div key={idx} className="flex gap-4 items-start group">
                    <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-linear-to-br from-blue-600 via-blue-700 to-cyan-600 rounded-3xl p-12 text-white shadow-2xl">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <div className="text-sm text-blue-200 mb-2">Available Balance</div>
                    <div className="text-5xl font-black">GH₵ 2,840</div>
                  </div>
                  <Wallet className="w-8 h-8 opacity-50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                    <div className="text-sm text-blue-200">Today</div>
                    <div className="text-2xl font-black">GH₵ 185</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                    <div className="text-sm text-blue-200">Goal</div>
                    <div className="text-2xl font-black">68%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-linear-to-br from-green-600 via-green-500 to-yellow-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-6xl lg:text-7xl font-black mb-8 leading-tight">
              Ready to Start Your Journey?
            </h2>
            <p className="text-3xl text-green-100 mb-12 leading-relaxed">
              Join 50,000+ riders enjoying comprehensive support and fair earnings
            </p>
            <Link 
              href="/rider/register"
              className="inline-flex items-center justify-center px-12 py-6 bg-white text-green-600 rounded-2xl font-black hover:bg-green-50 transition-all transform hover:scale-105 shadow-2xl text-2xl group"
            >
              Become a Rider
              <ArrowRight className="ml-4 w-7 h-7 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
