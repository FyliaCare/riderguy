import Image from 'next/image';
import Link from 'next/link';
import { Target, Eye, Heart, Users, MapPin, Award, TrendingUp, Shield, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Storytelling Approach */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0 items-stretch min-h-screen">
          {/* Left - Story Content */}
          <div className="relative bg-linear-to-br from-gray-900 via-green-900 to-gray-900 text-white px-8 lg:px-20 py-20 flex flex-col justify-center">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 -left-48 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-green-400/30">
                <Sparkles className="w-5 h-5 text-green-400" />
                <span className="font-semibold text-green-300">Our Journey</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-black mb-8 leading-tight">
                From Streets to 
                <span className="block bg-linear-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                  Success Stories
                </span>
              </h1>

              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p className="text-xl">
                  Every great movement starts with a simple question. Ours was: 
                  <span className="block mt-2 text-2xl font-bold text-white italic">
                    "What if delivery riders had the same opportunities as any other professional?"
                  </span>
                </p>
                
                <p>
                  In 2020, we watched as the world shifted online. Delivery riders became essential workers, 
                  risking their lives daily to keep cities running. Yet they remained invisible, 
                  undervalued, and undersupported.
                </p>

                <p>
                  We saw talented young people working 12-hour days without training, facing accidents 
                  without insurance, and struggling to save without financial tools. Their dedication 
                  deserved better.
                </p>

                <div className="pt-8">
                  <Link 
                    href="/join"
                    className="inline-flex items-center px-8 py-4 bg-linear-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-2xl group"
                  >
                    Join Our Mission
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Training Image */}
          <div className="relative bg-linear-to-br from-green-50 to-gray-100 flex items-center justify-center">
            <Image 
              src="/biker-train.svg" 
              alt="Rider Training" 
              fill
              className="object-cover"
              priority
              quality={100}
            />
          </div>
        </div>
      </section>

      {/* The Journey Timeline */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl lg:text-6xl font-black mb-6 text-gray-900">The Journey</h2>
              <p className="text-2xl text-gray-600">
                How we're transforming delivery work across Africa
              </p>
            </div>

            {/* Timeline Items */}
            <div className="space-y-16">
              {/* Chapter 1 */}
              <div className="relative pl-8 border-l-4 border-green-500">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-green-500 rounded-full"></div>
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-green-100 text-green-700 font-bold rounded-full text-sm mb-4">
                    Chapter 1: The Problem
                  </span>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Riders Were Struggling, Silently
                  </h3>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  We conducted over 500 interviews with delivery riders across Ghana. What we found 
                  was heartbreaking: 73% had no emergency savings, 84% never received formal training, 
                  and 91% couldn't access healthcare when injured.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  These weren't just statistics. They were Kwame, who couldn't afford his daughter's 
                  school fees. They were Ama, who rode through pain because she couldn't afford a 
                  doctor's visit. They were thousands of hardworking people trapped in a system that 
                  didn't see their value.
                </p>
              </div>

              {/* Chapter 2 */}
              <div className="relative pl-8 border-l-4 border-blue-500">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-500 rounded-full"></div>
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 font-bold rounded-full text-sm mb-4">
                    Chapter 2: The Solution
                  </span>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Building What Riders Actually Need
                  </h3>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  We didn't just build another delivery app. We built a complete support ecosystem. 
                  Professional training programs that teach road safety, customer service, and digital 
                  literacy. Digital wallets that help riders save automatically and access credit. 
                  Healthcare partnerships that provide affordable coverage.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  <div className="bg-green-50 p-6 rounded-2xl">
                    <div className="text-3xl font-black text-green-600 mb-2">50,000+</div>
                    <div className="text-gray-700 font-semibold">Riders Trained</div>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-2xl">
                    <div className="text-3xl font-black text-blue-600 mb-2">GH₵8M+</div>
                    <div className="text-gray-700 font-semibold">In Earnings Paid</div>
                  </div>
                </div>
              </div>

              {/* Chapter 3 */}
              <div className="relative pl-8 border-l-4 border-purple-500">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-purple-500 rounded-full"></div>
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 font-bold rounded-full text-sm mb-4">
                    Chapter 3: The Impact
                  </span>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Real People, Real Change
                  </h3>
                </div>
                <div className="bg-linear-to-br from-purple-50 to-pink-50 p-8 rounded-3xl mb-6 border border-purple-200">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0">
                      K
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">Kwame Mensah</div>
                      <div className="text-purple-600 text-sm">Accra, Ghana • Rider since 2021</div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic leading-relaxed mb-4">
                    "Before RiderGuy, I was just trying to survive. Now I have a career. I've completed 
                    safety certification, saved enough for a down payment on my own bike, and even 
                    started mentoring new riders. My family is proud. I'm proud."
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-semibold">Certified Trainer</span>
                    <span className="px-3 py-1 bg-pink-200 text-pink-800 rounded-full text-sm font-semibold">Top 5% Earnings</span>
                    <span className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-semibold">5,000+ Deliveries</span>
                  </div>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Kwame's story isn't unique. Across our network, riders are saving more, earning more, 
                  and building real careers. They're buying homes, starting businesses, and sending 
                  their kids to better schools. That's the power of proper support and training.
                </p>
              </div>

              {/* Chapter 4 */}
              <div className="relative pl-8 border-l-4 border-orange-500">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-orange-500 rounded-full"></div>
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-orange-100 text-orange-700 font-bold rounded-full text-sm mb-4">
                    Chapter 4: The Future
                  </span>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Just Getting Started
                  </h3>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  We're expanding to 50 cities across Africa by 2026. We're building partnerships 
                  with insurance companies, healthcare providers, and financial institutions. We're 
                  creating career pathways that let riders become trainers, dispatchers, and managers.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  But most importantly, we're proving that delivery work can be dignified, sustainable, 
                  and rewarding. We're showing that when you invest in people, they don't just survive — 
                  they thrive.
                </p>
                <div className="bg-linear-to-r from-orange-500 to-red-500 p-8 rounded-3xl text-white">
                  <div className="text-xl font-bold mb-4">Our 2026 Goals</div>
                  <div className="grid sm:grid-cols-3 gap-6">
                    <div>
                      <div className="text-4xl font-black mb-2">100K+</div>
                      <div className="text-orange-100">Active Riders</div>
                    </div>
                    <div>
                      <div className="text-4xl font-black mb-2">50</div>
                      <div className="text-orange-100">African Cities</div>
                    </div>
                    <div>
                      <div className="text-4xl font-black mb-2">GH₵100M</div>
                      <div className="text-orange-100">Rider Earnings</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Redesigned */}
      <section className="py-32 bg-linear-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Mission */}
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-green-200 rounded-3xl opacity-50"></div>
                <div className="relative bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                  <div className="w-16 h-16 bg-linear-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-4xl font-black text-gray-900 mb-6">Our Mission</h2>
                  <p className="text-xl text-gray-700 leading-relaxed mb-6">
                    Transform delivery work from a gig into a dignified, sustainable career across Africa.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-gray-600">Professional training & certification</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-gray-600">Financial stability & growth tools</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-gray-600">Healthcare & welfare benefits</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-gray-600">Supportive community network</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vision */}
              <div className="relative">
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-200 rounded-3xl opacity-50"></div>
                <div className="relative bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                  <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-4xl font-black text-gray-900 mb-6">Our Vision</h2>
                  <p className="text-xl text-gray-700 leading-relaxed mb-6">
                    A future where every African delivery rider has access to world-class support, 
                    opportunities, and recognition.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                      <span className="text-gray-600">Career progression pathways</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                      <span className="text-gray-600">Industry-wide standards</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                      <span className="text-gray-600">Pan-African reach & impact</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                      <span className="text-gray-600">Social recognition & respect</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values - Interactive Cards */}
      <section className="py-32 bg-linear-to-br from-gray-900 via-green-900 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black mb-6">What Drives Us</h2>
            <p className="text-2xl text-gray-300">
              The values that guide every decision we make
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all hover:scale-105 hover:shadow-2xl">
              <div className="w-16 h-16 bg-linear-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Empathy</h3>
              <p className="text-gray-300 leading-relaxed">
                We listen deeply to riders' needs and build solutions that truly help their lives.
              </p>
            </div>

            <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all hover:scale-105 hover:shadow-2xl">
              <div className="w-16 h-16 bg-linear-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Excellence</h3>
              <p className="text-gray-300 leading-relaxed">
                World-class training, support, and tools that set new industry standards.
              </p>
            </div>

            <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all hover:scale-105 hover:shadow-2xl">
              <div className="w-16 h-16 bg-linear-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Community</h3>
              <p className="text-gray-300 leading-relaxed">
                Building strong networks where riders support, learn from, and uplift each other.
              </p>
            </div>

            <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all hover:scale-105 hover:shadow-2xl">
              <div className="w-16 h-16 bg-linear-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Integrity</h3>
              <p className="text-gray-300 leading-relaxed">
                Operating with transparency, honesty, and unwavering commitment to our mission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-linear-to-r from-green-500 to-green-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-5xl lg:text-6xl font-black mb-6">
              Be Part of the Story
            </h2>
            <p className="text-2xl mb-12 text-green-100">
              Whether you're a rider looking to grow your career or a business wanting to support 
              our mission, there's a place for you in the RiderGuy community.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/join"
                className="inline-flex items-center justify-center px-10 py-5 bg-white text-green-600 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl text-lg group"
              >
                Join as Rider
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/partner"
                className="inline-flex items-center justify-center px-10 py-5 bg-green-700 text-white rounded-xl font-bold hover:bg-green-800 transition-all transform hover:scale-105 shadow-2xl text-lg border-2 border-white/30"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
