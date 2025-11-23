'use client';

import { SEOHead } from '@/components/seo-head';
import { useState } from 'react';
import {
  Award,
  Star,
  Zap,
  Trophy,
  Crown,
  Gift,
  Target,
  TrendingUp,
  Lock,
  Unlock,
  Calendar,
  Users,
  Package,
  DollarSign,
  CheckCircle2,
  Sparkles,
  Flame,
  ShoppingBag,
  Ticket,
  Clock,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

export default function RewardsPage() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'perks' | 'store' | 'history'>('overview');

  // Current rider stats
  const riderStats = {
    currentLevel: 12,
    currentXP: 8450,
    nextLevelXP: 10000,
    totalXP: 48450,
    rank: '#142',
    percentile: 'Top 8%',
  };

  // Level benefits
  const levels = [
    { level: 1, xpRequired: 0, title: 'Rookie', benefits: ['Basic training', 'Standard rates'], color: 'gray' },
    { level: 5, xpRequired: 2500, title: 'Explorer', benefits: ['Priority support', '+5% bonus'], color: 'blue' },
    { level: 10, xpRequired: 7500, title: 'Pro Rider', benefits: ['Premium orders', '+10% bonus', 'Early payouts'], color: 'purple' },
    { level: 12, xpRequired: 10000, title: 'Expert', benefits: ['VIP support', '+12% bonus', 'Exclusive events'], color: 'orange', current: true },
    { level: 15, xpRequired: 15000, title: 'Elite', benefits: ['Top-tier orders', '+15% bonus', 'Personal manager'], color: 'yellow' },
    { level: 20, xpRequired: 25000, title: 'Legend', benefits: ['Premium perks', '+20% bonus', 'Leadership role'], color: 'red' },
  ];

  // XP sources
  const xpSources = [
    { activity: 'Delivery Completed', xp: 50, icon: Package, color: 'green' },
    { activity: '5-Star Rating', xp: 25, icon: Star, color: 'yellow' },
    { activity: 'On-Time Delivery', xp: 15, icon: Clock, color: 'blue' },
    { activity: 'Peak Hour Bonus', xp: 35, icon: Zap, color: 'orange' },
    { activity: 'Daily Streak', xp: 100, icon: Flame, color: 'red' },
    { activity: 'Referral Success', xp: 200, icon: Users, color: 'purple' },
    { activity: 'Challenge Completed', xp: 150, icon: Target, color: 'pink' },
    { activity: 'Training Module', xp: 75, icon: Award, color: 'teal' },
  ];

  // Active perks
  const activePerks = [
    { id: 1, name: 'Priority Support', description: '24/7 dedicated support line', icon: '🎯', unlocked: true },
    { id: 2, name: 'Early Payouts', description: 'Get paid instantly', icon: '💰', unlocked: true },
    { id: 3, name: 'Premium Orders', description: 'Access to high-value deliveries', icon: '⭐', unlocked: true },
    { id: 4, name: 'Bonus Multiplier', description: '+12% on all earnings', icon: '🚀', unlocked: true },
    { id: 5, name: 'VIP Lounge Access', description: 'Exclusive rider spaces', icon: '👑', unlocked: false },
    { id: 6, name: 'Personal Manager', description: 'Dedicated account manager', icon: '🤝', unlocked: false },
  ];

  // Rewards store items
  const storeItems = [
    { id: 1, name: 'Free Fuel Voucher', cost: 500, value: 'GH₵50', icon: '⛽', category: 'voucher', stock: 'Limited' },
    { id: 2, name: 'Food Delivery Credit', cost: 300, value: 'GH₵30', icon: '🍔', category: 'voucher', stock: 'Available' },
    { id: 3, name: 'RiderGuy Merchandise', cost: 1000, value: 'T-Shirt', icon: '👕', category: 'merch', stock: 'Available' },
    { id: 4, name: 'Phone Data Bundle', cost: 200, value: '10GB', icon: '📱', category: 'voucher', stock: 'Available' },
    { id: 5, name: 'Insurance Upgrade', cost: 800, value: '1 Month', icon: '🛡️', category: 'service', stock: 'Available' },
    { id: 6, name: 'Training Course', cost: 400, value: 'Advanced', icon: '📚', category: 'service', stock: 'Available' },
    { id: 7, name: 'Bike Maintenance', cost: 600, value: 'Full Service', icon: '🔧', category: 'service', stock: 'Limited' },
    { id: 8, name: 'Premium Helmet', cost: 1500, value: 'Safety Gear', icon: '🪖', category: 'merch', stock: 'Available' },
  ];

  // Recent XP activities
  const recentActivities = [
    { id: 1, activity: 'Completed 5 deliveries', xp: 250, time: '2 hours ago', icon: Package },
    { id: 2, activity: 'Received 5-star rating', xp: 25, time: '3 hours ago', icon: Star },
    { id: 3, activity: 'Maintained daily streak', xp: 100, time: '1 day ago', icon: Flame },
    { id: 4, activity: 'Completed peak hour challenge', xp: 150, time: '1 day ago', icon: Target },
    { id: 5, activity: 'Training module completed', xp: 75, time: '2 days ago', icon: Award },
  ];

  // Leaderboard
  const leaderboard = [
    { rank: 1, name: 'Kwame M.', level: 18, xp: 78450, badge: '👑' },
    { rank: 2, name: 'Ama F.', level: 17, xp: 72380, badge: '🥈' },
    { rank: 3, name: 'Yaw B.', level: 16, xp: 68290, badge: '🥉' },
    { rank: 142, name: 'You', level: 12, xp: 48450, badge: '', highlight: true },
  ];

  const progressPercentage = (riderStats.currentXP / riderStats.nextLevelXP) * 100;

  return (
    <>
      <SEOHead
        title="Rewards & XP"
        description="Earn XP, unlock perks, redeem rewards, and climb the leaderboard"
        keywords={['rewards', 'xp', 'perks', 'level up', 'leaderboard']}
        canonicalPath="/dashboard/rewards"
      />
      <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900">XP & Rewards</h1>
        <p className="text-gray-600 mt-1">Level up and unlock exclusive benefits</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2">
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'overview', label: 'Overview', icon: Trophy },
            { id: 'perks', label: 'Perks', icon: Star },
            { id: 'store', label: 'Rewards Store', icon: ShoppingBag },
            { id: 'history', label: 'History', icon: Calendar },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  selectedTab === tab.id
                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/30'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          {/* Level Progress Card */}
          <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <Crown className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black">Level {riderStats.currentLevel}</h2>
                      <p className="text-sm opacity-90">Expert Rider</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg">
                      <p className="text-xs opacity-75">Rank</p>
                      <p className="text-lg font-bold">{riderStats.rank}</p>
                    </div>
                    <div className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg">
                      <p className="text-xs opacity-75">Percentile</p>
                      <p className="text-lg font-bold">{riderStats.percentile}</p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm opacity-90 mb-1">Total XP</p>
                  <p className="text-4xl font-black">{riderStats.totalXP.toLocaleString()}</p>
                </div>
              </div>

              {/* XP Progress Bar */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Progress to Level {riderStats.currentLevel + 1}</p>
                  <p className="text-sm font-bold">{riderStats.currentXP}/{riderStats.nextLevelXP} XP</p>
                </div>
                <div className="h-4 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                    style={{ width: `${progressPercentage}%` }}
                  >
                    <span className="text-xs font-black text-purple-900">{progressPercentage.toFixed(0)}%</span>
                  </div>
                </div>
                <p className="text-sm opacity-90">{riderStats.nextLevelXP - riderStats.currentXP} XP to next level</p>
              </div>
            </div>
          </div>

          {/* Level Path */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Journey</h2>
            <div className="space-y-4">
              {levels.map((level, index) => {
                const isUnlocked = riderStats.currentLevel >= level.level;
                const isCurrent = level.current;
                
                return (
                  <div
                    key={level.level}
                    className={`relative p-5 rounded-xl border-2 transition-all ${
                      isCurrent
                        ? 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-300 shadow-md'
                        : isUnlocked
                        ? 'bg-green-50 border-green-200'
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                          isCurrent ? 'bg-orange-500' :
                          isUnlocked ? 'bg-green-500' :
                          'bg-gray-300'
                        }`}>
                          {isUnlocked ? (
                            <Unlock className="w-8 h-8 text-white" />
                          ) : (
                            <Lock className="w-8 h-8 text-white" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-black text-gray-900">Level {level.level}</h3>
                            {isCurrent && (
                              <span className="px-2 py-0.5 bg-orange-500 text-white text-xs font-bold rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-semibold text-gray-600 mb-2">{level.title}</p>
                          <div className="flex flex-wrap gap-2">
                            {level.benefits.map((benefit, idx) => (
                              <span
                                key={idx}
                                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                                  isUnlocked
                                    ? 'bg-white border border-green-200 text-green-700'
                                    : 'bg-white border border-gray-200 text-gray-500'
                                }`}
                              >
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Required XP</p>
                        <p className="text-lg font-bold text-gray-900">{level.xpRequired.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* XP Sources & Leaderboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* How to Earn XP */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">How to Earn XP</h2>
              <div className="space-y-3">
                {xpSources.map((source, index) => {
                  const Icon = source.icon;
                  return (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 bg-${source.color}-50 rounded-xl border border-${source.color}-200`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-${source.color}-500 rounded-lg flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{source.activity}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="text-lg font-black text-gray-900">+{source.xp}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Leaderboard</h2>
              <div className="space-y-3">
                {leaderboard.map((rider) => (
                  <div
                    key={rider.rank}
                    className={`flex items-center justify-between p-4 rounded-xl ${
                      rider.highlight
                        ? 'bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        rider.rank === 1 ? 'bg-yellow-500 text-white' :
                        rider.rank === 2 ? 'bg-gray-400 text-white' :
                        rider.rank === 3 ? 'bg-orange-600 text-white' :
                        'bg-gray-200 text-gray-700'
                      }`}>
                        {rider.badge || `#${rider.rank}`}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{rider.name}</p>
                        <p className="text-xs text-gray-600">Level {rider.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">{rider.xp.toLocaleString()}</p>
                      <p className="text-xs text-gray-600">XP</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                View Full Leaderboard
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent XP Activity</h2>
            <div className="space-y-3">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{activity.activity}</p>
                        <p className="text-xs text-gray-600">{activity.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="text-lg font-bold text-green-600">+{activity.xp}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'perks' && (
        <div className="space-y-6">
          {/* Active Perks */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Active Perks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activePerks.map((perk) => (
                <div
                  key={perk.id}
                  className={`p-6 rounded-xl border-2 ${
                    perk.unlocked
                      ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-300'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-4xl">{perk.icon}</div>
                    {perk.unlocked ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : (
                      <Lock className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{perk.name}</h3>
                  <p className="text-sm text-gray-600">{perk.description}</p>
                  {!perk.unlocked && (
                    <p className="text-xs text-gray-500 mt-3">Unlock at Level 15</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'store' && (
        <div className="space-y-6">
          {/* Balance Card */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Available XP Balance</p>
                <p className="text-4xl font-black">{riderStats.currentXP.toLocaleString()}</p>
              </div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
          </div>

          {/* Rewards Store */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Rewards Store</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {storeItems.map((item) => {
                const canAfford = riderStats.currentXP >= item.cost;
                
                return (
                  <div
                    key={item.id}
                    className={`p-5 rounded-xl border-2 transition-all ${
                      canAfford
                        ? 'bg-white border-green-300 hover:shadow-lg'
                        : 'bg-gray-50 border-gray-200 opacity-70'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-4xl">{item.icon}</div>
                      {item.stock === 'Limited' && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                          Limited
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-600 mb-3">Value: {item.value}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="text-lg font-black text-gray-900">{item.cost}</span>
                      </div>
                      <button
                        disabled={!canAfford}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          canAfford
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Redeem
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'history' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">XP History</h2>
          <div className="space-y-3">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{activity.activity}</p>
                      <p className="text-xs text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-lg font-bold text-green-600">+{activity.xp}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
    </>
  );
}
