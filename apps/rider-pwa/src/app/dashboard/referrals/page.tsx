'use client';

import { SEOHead } from '@/components/seo-head';
import { useState } from 'react';
import {
  Users,
  UserPlus,
  Share2,
  Copy,
  Mail,
  MessageCircle,
  Award,
  TrendingUp,
  DollarSign,
  Gift,
  Star,
  CheckCircle2,
  Clock,
  Crown,
  Zap,
  Target,
  ArrowRight,
  ExternalLink,
  Download,
} from 'lucide-react';
import Link from 'next/link';

export default function ReferralsPage() {
  const [referralCode, setReferralCode] = useState('RIDE-KM2847');
  const [copied, setCopied] = useState(false);
  const [selectedRider, setSelectedRider] = useState<any>(null);

  const copyReferralCode = () => {
    navigator.clipboard.writeText(`https://riderguy.com/join?ref=${referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Referral stats
  const stats = {
    totalReferrals: 24,
    activeReferrals: 18,
    pendingReferrals: 3,
    totalEarnings: 1240.00,
    bonusXP: 2400,
    nextMilestone: 25,
    networkLevel: 3,
  };

  // Network hierarchy data
  const networkData = {
    you: {
      name: 'You',
      level: 12,
      directReferrals: 8,
      totalNetwork: 24,
    },
    level1: [
      { 
        id: 1, name: 'Kwame M.', status: 'active', referrals: 5, earnings: 450, joined: '2 months ago', level: 8,
        fullName: 'Kwame Mensah', phone: '+233 24 555 0101', email: 'kwame.m@example.com',
        totalDeliveries: 342, rating: 4.8, badges: ['Top Performer', 'Speed Demon', 'Customer Favorite'],
        joinedDate: 'Sep 23, 2024', referredBy: 'You', totalEarnings: 12450, thisMonth: 1850
      },
      { 
        id: 2, name: 'Ama F.', status: 'active', referrals: 4, earnings: 380, joined: '3 months ago', level: 7,
        fullName: 'Ama Frimpong', phone: '+233 24 555 0102', email: 'ama.f@example.com',
        totalDeliveries: 298, rating: 4.7, badges: ['Reliable', 'Team Player'],
        joinedDate: 'Aug 15, 2024', referredBy: 'You', totalEarnings: 10230, thisMonth: 1620
      },
      { 
        id: 3, name: 'Yaw B.', status: 'active', referrals: 3, earnings: 290, joined: '1 month ago', level: 6,
        fullName: 'Yaw Boateng', phone: '+233 24 555 0103', email: 'yaw.b@example.com',
        totalDeliveries: 156, rating: 4.6, badges: ['Rising Star'],
        joinedDate: 'Oct 15, 2024', referredBy: 'You', totalEarnings: 5680, thisMonth: 1420
      },
      { 
        id: 4, name: 'Kofi A.', status: 'active', referrals: 2, earnings: 180, joined: '3 weeks ago', level: 5,
        fullName: 'Kofi Asante', phone: '+233 24 555 0104', email: 'kofi.a@example.com',
        totalDeliveries: 89, rating: 4.5, badges: ['Newcomer'],
        joinedDate: 'Nov 2, 2024', referredBy: 'You', totalEarnings: 3240, thisMonth: 980
      },
      { 
        id: 5, name: 'Abena O.', status: 'active', referrals: 1, earnings: 120, joined: '2 weeks ago', level: 4,
        fullName: 'Abena Owusu', phone: '+233 24 555 0105', email: 'abena.o@example.com',
        totalDeliveries: 67, rating: 4.4, badges: [],
        joinedDate: 'Nov 9, 2024', referredBy: 'You', totalEarnings: 2140, thisMonth: 890
      },
      { 
        id: 6, name: 'Akua S.', status: 'pending', referrals: 0, earnings: 0, joined: '3 days ago', level: 1,
        fullName: 'Akua Sarpong', phone: '+233 24 555 0106', email: 'akua.s@example.com',
        totalDeliveries: 3, rating: 0, badges: [],
        joinedDate: 'Nov 20, 2024', referredBy: 'You', totalEarnings: 120, thisMonth: 120
      },
      { 
        id: 7, name: 'Fiifi M.', status: 'pending', referrals: 0, earnings: 0, joined: '1 day ago', level: 1,
        fullName: 'Fiifi Mensah', phone: '+233 24 555 0107', email: 'fiifi.m@example.com',
        totalDeliveries: 1, rating: 0, badges: [],
        joinedDate: 'Nov 22, 2024', referredBy: 'You', totalEarnings: 45, thisMonth: 45
      },
      { 
        id: 8, name: 'Efua A.', status: 'active', referrals: 1, earnings: 95, joined: '1 week ago', level: 3,
        fullName: 'Efua Adjei', phone: '+233 24 555 0108', email: 'efua.a@example.com',
        totalDeliveries: 45, rating: 4.3, badges: [],
        joinedDate: 'Nov 16, 2024', referredBy: 'You', totalEarnings: 1680, thisMonth: 720
      },
    ],
    level2: [
      { id: 9, name: 'Kojo T.', parentId: 1, status: 'active' },
      { id: 10, name: 'Afua K.', parentId: 1, status: 'active' },
      { id: 11, name: 'Kwesi D.', parentId: 2, status: 'active' },
      { id: 12, name: 'Esi M.', parentId: 3, status: 'active' },
    ],
  };

  const milestones = [
    { referrals: 5, bonus: 250, xp: 500, unlocked: true },
    { referrals: 10, bonus: 600, xp: 1000, unlocked: true },
    { referrals: 15, bonus: 1000, xp: 1500, unlocked: true },
    { referrals: 25, bonus: 2000, xp: 2500, unlocked: false },
    { referrals: 50, bonus: 5000, xp: 5000, unlocked: false },
  ];

  const recentActivity = [
    { type: 'signup', name: 'Fiifi M.', action: 'signed up', time: '1 day ago', reward: 0 },
    { type: 'completed', name: 'Akua S.', action: 'completed first 10 deliveries', time: '2 days ago', reward: 50 },
    { type: 'active', name: 'Yaw B.', action: 'reached Level 5', time: '3 days ago', reward: 100 },
    { type: 'milestone', name: 'Kwame M.', action: 'completed 100 deliveries', time: '1 week ago', reward: 200 },
  ];

  return (
    <>
      <SEOHead
        title="Referrals"
        description="Earn rewards by referring new riders and track your referral progress"
        keywords={['referrals', 'invite', 'rewards', 'bonus', 'earnings']}
        canonicalPath="/dashboard/referrals"
      />
      <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900">Referral Network</h1>
        <p className="text-gray-600 mt-1">Grow your network and earn rewards together</p>
      </div>

      {/* Referral Overview - Modern Metrics Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 px-8 py-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Network Overview</h2>
              <p className="text-sm text-gray-600 mt-1">Real-time performance metrics</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">Live</span>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Total Referrals */}
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Network</p>
                  <p className="text-3xl font-black text-gray-900">{stats.totalReferrals}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Next milestone</span>
                  <span className="font-bold text-gray-900">{stats.nextMilestone - stats.totalReferrals} more</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
                    style={{ width: `${(stats.totalReferrals / stats.nextMilestone) * 100}%` }}
                  />
                </div>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  <span className="font-semibold">{Math.round((stats.totalReferrals / stats.nextMilestone) * 100)}% to Level {stats.networkLevel + 1}</span>
                </div>
              </div>
            </div>

            {/* Active Riders */}
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Riders</p>
                  <p className="text-3xl font-black text-gray-900">{stats.activeReferrals}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-blue-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(stats.activeReferrals / stats.totalReferrals) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-blue-600">{Math.round((stats.activeReferrals / stats.totalReferrals) * 100)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">{stats.pendingReferrals} pending</span>
                  <div className="flex items-center gap-1">
                    <Crown className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs font-semibold text-gray-700">High engagement</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Earnings */}
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Earned</p>
                  <p className="text-3xl font-black text-gray-900">GH₵{stats.totalEarnings}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Avg per referral</span>
                  <span className="font-bold text-purple-600">GH₵{(stats.totalEarnings / stats.totalReferrals).toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-lg">
                  <Gift className="w-3.5 h-3.5 text-purple-600" />
                  <span className="text-xs font-semibold text-purple-700">From referral bonuses</span>
                </div>
              </div>
            </div>

            {/* Bonus XP */}
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Bonus XP</p>
                  <p className="text-3xl font-black text-gray-900">{stats.bonusXP.toLocaleString()}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Network Level</span>
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full">
                    <Star className="w-3 h-3 text-white" />
                    <span className="text-xs font-black text-white">Level {stats.networkLevel}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 rounded-lg">
                  <Target className="w-3.5 h-3.5 text-orange-600" />
                  <span className="text-xs font-semibold text-orange-700">Elite networker status</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Code & Share Section */}
      <div className="bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Share2 className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-black">Your Referral Code</h2>
              <p className="text-sm opacity-90">Share with friends and earn together</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Referral Code */}
            <div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-75 mb-1">Your unique code</p>
                    <p className="text-2xl font-black tracking-wider">{referralCode}</p>
                  </div>
                  <button
                    onClick={copyReferralCode}
                    className="px-4 py-2 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Link
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </button>
                <button className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email
                </button>
              </div>
            </div>

            {/* Rewards Info */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">How It Works</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shrink-0">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-semibold">Share your code</p>
                    <p className="text-sm opacity-75">Send your referral link to friends</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shrink-0">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-semibold">They sign up</p>
                    <p className="text-sm opacity-75">Get GH₵25 when they complete training</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shrink-0">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-semibold">Earn together</p>
                    <p className="text-sm opacity-75">Get 5% of their earnings for 6 months</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Network Visualization & Direct Referrals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Network Hierarchy Visualization */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Your Network</h2>
              <p className="text-sm text-gray-600">Network of competence - Leadership everywhere</p>
            </div>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>

          {/* Network Diagram */}
          <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-8 border border-gray-200">
            {/* You (Center/Top) */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <div className="text-center">
                    <Crown className="w-8 h-8 mx-auto mb-1" />
                    <p className="text-xs font-bold">You</p>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-white">
                  <span className="text-xs font-black">L{networkData.you.level}</span>
                </div>
              </div>
              <div className="mt-3 text-center">
                <p className="font-bold text-gray-900">Network Level {stats.networkLevel}</p>
                <p className="text-sm text-gray-600">{networkData.you.totalNetwork} total riders</p>
              </div>
            </div>

            {/* Connection Lines Visual */}
            <div className="relative">
              {/* Level 1 - Direct Referrals */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {networkData.level1.slice(0, 8).map((rider, index) => (
                  <div key={rider.id} className="flex flex-col items-center relative">
                    {/* Connection line to parent */}
                    <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-gradient-to-b from-green-400 to-green-500"></div>
                    
                    <div className="relative group">
                      <button
                        onClick={() => setSelectedRider(rider)}
                        className={`w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-md transition-all hover:scale-110 hover:shadow-xl cursor-pointer ${
                          rider.status === 'active' 
                            ? 'bg-gradient-to-br from-green-500 to-green-600' 
                            : 'bg-gradient-to-br from-gray-400 to-gray-500'
                        }`}
                      >
                        <div className="text-center">
                          <Users className="w-5 h-5 mx-auto mb-0.5" />
                          <p className="text-[10px] font-bold">{rider.name.split(' ')[0]}</p>
                        </div>
                      </button>
                      
                      {/* Hover tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10 pointer-events-none">
                        <div className="bg-gray-900 text-white text-xs rounded-lg p-3 whitespace-nowrap shadow-xl">
                          <p className="font-bold">{rider.name}</p>
                          <p className="text-gray-300">Level {rider.level}</p>
                          <p className="text-gray-300">{rider.referrals} referrals</p>
                          <p className="text-green-400">+GH₵{rider.earnings}</p>
                          <p className="text-blue-400 mt-1">Click to view profile</p>
                        </div>
                      </div>

                      {rider.referrals > 0 && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                          <span className="text-[10px] font-black text-white">{rider.referrals}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-[10px] text-gray-600 mt-1 text-center">{rider.status}</p>
                  </div>
                ))}
              </div>

              {/* Level 2 - Secondary Network (smaller) */}
              <div className="flex justify-center gap-3 opacity-60">
                {networkData.level2.map((rider) => (
                  <div key={rider.id} className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center text-white shadow-sm">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-center">
                  <span className="text-xs text-gray-500 font-medium">+{networkData.you.totalNetwork - networkData.level1.length - networkData.level2.length} more</span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-green-600 rounded"></div>
                  <span className="text-gray-600">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-gray-400 to-gray-500 rounded"></div>
                  <span className="text-gray-600">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-[8px] text-white font-bold">2</span>
                  </div>
                  <span className="text-gray-600">Has Referrals</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestones & Recent Activity */}
        <div className="space-y-6">
          {/* Milestones */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Milestones
            </h2>
            <div className="space-y-3">
              {milestones.map((milestone) => (
                <div
                  key={milestone.referrals}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    milestone.unlocked
                      ? 'bg-green-50 border-green-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">{milestone.referrals} Referrals</span>
                    {milestone.unlocked ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1 text-green-600">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-semibold">{milestone.bonus}</span>
                    </div>
                    <div className="flex items-center gap-1 text-purple-600">
                      <Zap className="w-4 h-4" />
                      <span className="font-semibold">{milestone.xp} XP</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    activity.type === 'completed' ? 'bg-green-100' :
                    activity.type === 'milestone' ? 'bg-purple-100' :
                    activity.type === 'active' ? 'bg-blue-100' :
                    'bg-gray-200'
                  }`}>
                    {activity.type === 'completed' && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                    {activity.type === 'milestone' && <Award className="w-4 h-4 text-purple-600" />}
                    {activity.type === 'active' && <TrendingUp className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'signup' && <UserPlus className="w-4 h-4 text-gray-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{activity.name}</p>
                    <p className="text-xs text-gray-600">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  {activity.reward > 0 && (
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-green-600">+GH₵{activity.reward}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Direct Referrals Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Direct Referrals</h2>
          <p className="text-sm text-gray-600">Riders you directly referred</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Rider</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Level</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Their Network</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Your Earnings</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {networkData.level1.map((rider) => (
                <tr 
                  key={rider.id} 
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedRider(rider)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold">
                        {rider.name[0]}
                      </div>
                      <span className="font-semibold text-gray-900">{rider.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      rider.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {rider.status === 'active' ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {rider.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium">Level {rider.level}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900 font-medium">{rider.referrals}</span>
                      {rider.referrals > 0 && (
                        <span className="text-xs text-gray-500">riders</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-green-600">+GH₵{rider.earnings}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{rider.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rider Profile Modal */}
      {selectedRider && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedRider(null)}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-green-500 via-green-600 to-green-700 p-8 text-white">
              <button
                onClick={() => setSelectedRider(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
              >
                <span className="text-2xl">×</span>
              </button>

              <div className="flex items-start gap-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl font-black border-4 border-white/30">
                    {selectedRider.name[0]}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-sm font-black text-gray-900">L{selectedRider.level}</span>
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-3xl font-black mb-1">{selectedRider.fullName}</h2>
                  <p className="text-white/80 mb-3">Rider ID: RG-{selectedRider.id.toString().padStart(5, '0')}</p>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedRider.status === 'active'
                        ? 'bg-white/20 backdrop-blur-sm text-white'
                        : 'bg-yellow-400 text-gray-900'
                    }`}>
                      {selectedRider.status === 'active' ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {selectedRider.status}
                    </span>
                    
                    {selectedRider.rating > 0 && (
                      <div className="flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold">{selectedRider.rating}</span>
                      </div>
                    )}
                  </div>

                  {selectedRider.badges.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedRider.badges.map((badge: string, idx: number) => (
                        <span key={idx} className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs font-medium">
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 border-b border-gray-200">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users className="w-4 h-4 text-gray-500" />
                </div>
                <p className="text-2xl font-black text-gray-900">{selectedRider.referrals}</p>
                <p className="text-xs text-gray-600">Referrals</p>
              </div>
              <div className="text-center border-x border-gray-200">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-gray-500" />
                </div>
                <p className="text-2xl font-black text-gray-900">{selectedRider.totalDeliveries}</p>
                <p className="text-xs text-gray-600">Deliveries</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                </div>
                <p className="text-2xl font-black text-green-600">GH₵{selectedRider.totalEarnings}</p>
                <p className="text-xs text-gray-600">Total Earned</p>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-semibold text-gray-900">{selectedRider.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="font-semibold text-gray-900">{selectedRider.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Performance</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-semibold text-gray-600">This Month</span>
                    </div>
                    <p className="text-2xl font-black text-green-600">GH₵{selectedRider.thisMonth}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-semibold text-gray-600">Your Earnings</span>
                    </div>
                    <p className="text-2xl font-black text-purple-600">GH₵{selectedRider.earnings}</p>
                  </div>
                </div>
              </div>

              {/* Network Info */}
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Network Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        <UserPlus className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Joined</p>
                        <p className="font-semibold text-gray-900">{selectedRider.joinedDate}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-600">{selectedRider.joined}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Referred by</p>
                        <p className="font-semibold text-gray-900">{selectedRider.referredBy}</p>
                      </div>
                    </div>
                  </div>
                  {selectedRider.referrals > 0 && (
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Target className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Network Size</p>
                          <p className="font-semibold text-gray-900">{selectedRider.referrals} direct referrals</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Send Message
                </button>
                <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  View Full Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
