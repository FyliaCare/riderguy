'use client';

import { SEOHead } from '@/components/seo-head';
import { useState } from 'react';
import {
  TrendingUp,
  Award,
  Clock,
  Star,
  Zap,
  Target,
  Package,
  Users,
  MapPin,
  BarChart3,
  Activity,
  Calendar,
  XCircle,
} from 'lucide-react';

type TabType = 'overview' | 'delivery' | 'time' | 'satisfaction' | 'efficiency' | 'goals';

export default function PerformancePage() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: Activity },
    { id: 'delivery' as TabType, label: 'Delivery Metrics', icon: Package },
    { id: 'time' as TabType, label: 'Time Management', icon: Clock },
    { id: 'satisfaction' as TabType, label: 'Customer Satisfaction', icon: Star },
    { id: 'efficiency' as TabType, label: 'Efficiency', icon: Zap },
    { id: 'goals' as TabType, label: 'Goals & Targets', icon: Target },
  ];

  return (
    <>
      <SEOHead
        title="Performance"
        description="Track your rider performance metrics, ratings, and achievement badges"
        keywords={['performance', 'metrics', 'ratings', 'achievements']}
        canonicalPath="/dashboard/performance"
      />
      <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900">Performance Analytics</h1>
        <p className="text-gray-600 mt-1">Track your performance and improve your metrics</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === tab.id
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
      <div className="min-h-[600px]">
        {activeTab === 'overview' && <OverviewSection />}
        {activeTab === 'delivery' && <DeliveryMetricsSection />}
        {activeTab === 'time' && <TimeManagementSection />}
        {activeTab === 'satisfaction' && <CustomerSatisfactionSection />}
        {activeTab === 'efficiency' && <EfficiencySection />}
        {activeTab === 'goals' && <GoalsTargetsSection />}
      </div>
    </div>
    </>
  );
}

// Placeholder sections - will be built one by one
function OverviewSection() {
  const performanceScore = 87;
  
  const kpis = {
    deliveries: { current: 342, target: 400, change: 12.5, label: 'Deliveries', icon: Package },
    rating: { current: 4.8, target: 5.0, change: 5.2, label: 'Rating', icon: Star },
    onTime: { current: 94, target: 95, change: 3.1, label: 'On-Time %', icon: Clock },
    earnings: { current: 7456, target: 8000, change: 15.2, label: 'Earnings', icon: TrendingUp },
  };

  const weeklyTrend = [
    { day: 'Mon', score: 82, deliveries: 48, rating: 4.7 },
    { day: 'Tue', score: 85, deliveries: 52, rating: 4.8 },
    { day: 'Wed', score: 88, deliveries: 45, rating: 4.8 },
    { day: 'Thu', score: 84, deliveries: 50, rating: 4.7 },
    { day: 'Fri', score: 90, deliveries: 55, rating: 4.9 },
    { day: 'Sat', score: 87, deliveries: 53, rating: 4.8 },
    { day: 'Sun', score: 89, deliveries: 39, rating: 4.9 },
  ];

  const badges = [
    { id: 1, name: 'Top Performer', icon: Award, color: 'yellow', earned: true },
    { id: 2, name: 'Speed Demon', icon: Zap, color: 'orange', earned: true },
    { id: 3, name: 'Customer Favorite', icon: Star, color: 'purple', earned: true },
    { id: 4, name: 'Perfect Week', icon: Target, color: 'green', earned: false },
  ];

  const maxScore = Math.max(...weeklyTrend.map(d => d.score));

  return (
    <div className="space-y-6">
      {/* Performance Score Card */}
      <div className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black mb-2">Performance Score</h2>
              <p className="text-sm opacity-90">Your overall performance this month</p>
            </div>
            <div className="text-right">
              <div className="text-6xl font-black mb-2">{performanceScore}</div>
              <div className="flex items-center gap-2 justify-end">
                <TrendingUp className="w-5 h-5 text-green-300" />
                <span className="text-lg font-bold text-green-300">+5.2%</span>
              </div>
            </div>
          </div>

          {/* Circular Progress */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="white"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - performanceScore / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Award className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm font-semibold">Excellent</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-3xl font-black mb-1">A+</p>
              <p className="text-xs opacity-75">Grade</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-3xl font-black mb-1">#12</p>
              <p className="text-xs opacity-75">Rank</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-3xl font-black mb-1">Top 5%</p>
              <p className="text-xs opacity-75">Percentile</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-3xl font-black mb-1">12</p>
              <p className="text-xs opacity-75">Badges</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(kpis).map(([key, kpi]) => {
          const Icon = kpi.icon;
          const progress = (kpi.current / kpi.target) * 100;
          
          return (
            <div key={key} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="font-bold text-green-600">+{kpi.change}%</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-1">{kpi.label}</p>
              <p className="text-3xl font-black text-gray-900 mb-2">
                {key === 'earnings' ? `GH₵${kpi.current.toLocaleString()}` : 
                 key === 'onTime' ? `${kpi.current}%` :
                 kpi.current}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Target</span>
                  <span className="font-bold text-gray-900">
                    {key === 'earnings' ? `GH₵${kpi.target.toLocaleString()}` :
                     key === 'onTime' ? `${kpi.target}%` :
                     kpi.target}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      progress >= 100 ? 'bg-green-500' :
                      progress >= 75 ? 'bg-blue-500' :
                      progress >= 50 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600">
                  {progress >= 100 ? 'Target achieved! 🎉' :
                   `${(kpi.target - kpi.current).toFixed(0)} to go`}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly Trend Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Weekly Performance Trend</h2>
            <p className="text-sm text-gray-600">Your daily performance scores</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Score</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Deliveries</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {weeklyTrend.map((day, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-gray-900 w-16">{day.day}</span>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span>Score: <strong className="text-gray-900">{day.score}</strong></span>
                  <span>Deliveries: <strong className="text-gray-900">{day.deliveries}</strong></span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <strong className="text-gray-900">{day.rating}</strong>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-end px-3"
                    style={{ width: `${(day.score / maxScore) * 100}%` }}
                  >
                    <span className="text-xs font-bold text-white">{day.score}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-black text-gray-900">
                {(weeklyTrend.reduce((sum, d) => sum + d.score, 0) / weeklyTrend.length).toFixed(1)}
              </p>
              <p className="text-xs text-gray-600">Avg Score</p>
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">
                {weeklyTrend.reduce((sum, d) => sum + d.deliveries, 0)}
              </p>
              <p className="text-xs text-gray-600">Total Deliveries</p>
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">
                {(weeklyTrend.reduce((sum, d) => sum + d.rating, 0) / weeklyTrend.length).toFixed(2)}
              </p>
              <p className="text-xs text-gray-600">Avg Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Badges & Achievements */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Achievements & Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.id}
                className={`p-6 rounded-xl border-2 text-center transition-all ${
                  badge.earned
                    ? `bg-${badge.color}-50 border-${badge.color}-200`
                    : 'bg-gray-50 border-gray-200 opacity-50'
                }`}
              >
                <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center ${
                  badge.earned ? `bg-${badge.color}-100` : 'bg-gray-200'
                }`}>
                  <Icon className={`w-8 h-8 ${badge.earned ? `text-${badge.color}-600` : 'text-gray-400'}`} />
                </div>
                <p className="text-sm font-bold text-gray-900">{badge.name}</p>
                {badge.earned && (
                  <p className="text-xs text-green-600 font-semibold mt-1">✓ Earned</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparative Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">vs. Top Performers</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Deliveries/Day</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">48.9</span>
                  <span className="text-xs text-gray-500">vs 52.3</span>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '93%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Rating</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">4.8</span>
                  <span className="text-xs text-gray-500">vs 4.9</span>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '98%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">On-Time Rate</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">94%</span>
                  <span className="text-xs text-gray-500">vs 96%</span>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '97%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-600">Best Day</span>
              <span className="text-sm font-bold text-gray-900">Friday (90 score)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-600">Streak</span>
              <span className="text-sm font-bold text-gray-900">14 days active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-600">Total Hours</span>
              <span className="text-sm font-bold text-gray-900">187.5 hrs</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-600">Peak Performance</span>
              <span className="text-sm font-bold text-gray-900">12PM - 2PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeliveryMetricsSection() {
  const deliveryStats = {
    totalDeliveries: 342,
    completed: 328,
    cancelled: 8,
    failed: 6,
    completionRate: 95.9,
    successRate: 98.2,
    totalDistance: 1847.5,
    avgDistance: 5.4,
  };

  const deliveryZones = [
    { name: 'Accra Central', deliveries: 142, percentage: 41.5, avgTime: 25, earnings: 3420 },
    { name: 'Osu', deliveries: 89, percentage: 26.0, avgTime: 22, earnings: 2140 },
    { name: 'Cantonments', deliveries: 54, percentage: 15.8, avgTime: 28, earnings: 1680 },
    { name: 'East Legon', deliveries: 38, percentage: 11.1, avgTime: 32, earnings: 1420 },
    { name: 'Other', deliveries: 19, percentage: 5.6, avgTime: 30, earnings: 796 },
  ];

  const peakHours = [
    { hour: '6AM-8AM', deliveries: 18, earnings: 420, avgTime: 28 },
    { hour: '8AM-10AM', deliveries: 32, earnings: 780, avgTime: 25 },
    { hour: '10AM-12PM', deliveries: 45, earnings: 1080, avgTime: 24 },
    { hour: '12PM-2PM', deliveries: 68, earnings: 1640, avgTime: 22 },
    { hour: '2PM-4PM', deliveries: 52, earnings: 1240, avgTime: 23 },
    { hour: '4PM-6PM', deliveries: 48, earnings: 1150, avgTime: 26 },
    { hour: '6PM-8PM', deliveries: 58, earnings: 1420, avgTime: 24 },
    { hour: '8PM-10PM', deliveries: 21, earnings: 520, avgTime: 27 },
  ];

  const deliveryTypes = [
    { type: 'Food', count: 185, percentage: 54.1, icon: '🍔', color: 'orange' },
    { type: 'Groceries', count: 78, percentage: 22.8, icon: '🛒', color: 'green' },
    { type: 'Pharmacy', count: 42, percentage: 12.3, icon: '💊', color: 'blue' },
    { type: 'Documents', count: 23, percentage: 6.7, icon: '📄', color: 'purple' },
    { type: 'Other', count: 14, percentage: 4.1, icon: '📦', color: 'gray' },
  ];

  const maxDeliveries = Math.max(...peakHours.map(h => h.deliveries));

  return (
    <div className="space-y-6">
      {/* Delivery Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Total Deliveries</p>
              <p className="text-3xl font-black text-gray-900">{deliveryStats.totalDeliveries}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-green-600">
            <TrendingUp className="w-3 h-3" />
            <span className="font-semibold">+12.5% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Completion Rate</p>
              <p className="text-3xl font-black text-gray-900">{deliveryStats.completionRate}%</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">{deliveryStats.completed}/{deliveryStats.totalDeliveries} completed</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Distance Covered</p>
              <p className="text-3xl font-black text-gray-900">{deliveryStats.totalDistance}</p>
            </div>
          </div>
          <p className="text-xs text-gray-600">Avg: {deliveryStats.avgDistance} km/delivery</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Success Rate</p>
              <p className="text-3xl font-black text-gray-900">{deliveryStats.successRate}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-red-600">{deliveryStats.cancelled} cancelled</span>
            <span className="text-gray-300">•</span>
            <span className="text-red-600">{deliveryStats.failed} failed</span>
          </div>
        </div>
      </div>

      {/* Peak Hours Performance */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Peak Hours Performance</h2>
            <p className="text-sm text-gray-600">Delivery activity by time of day</p>
          </div>
        </div>

        <div className="space-y-3">
          {peakHours.map((hour, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900 w-24">{hour.hour}</span>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span>{hour.deliveries} deliveries</span>
                  <span>GH₵{hour.earnings}</span>
                  <span>{hour.avgTime} min avg</span>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-end px-3"
                    style={{ width: `${(hour.deliveries / maxDeliveries) * 100}%` }}
                  >
                    {hour.deliveries > maxDeliveries * 0.3 && (
                      <span className="text-xs font-bold text-white">{hour.deliveries}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-black text-gray-900">12PM-2PM</p>
              <p className="text-xs text-gray-600">Peak Time</p>
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">{peakHours.reduce((sum, h) => sum + h.deliveries, 0)}</p>
              <p className="text-xs text-gray-600">Total Deliveries</p>
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">24 min</p>
              <p className="text-xs text-gray-600">Avg Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Zones & Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delivery Zones */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery Zones</h2>
          <div className="space-y-4">
            {deliveryZones.map((zone, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{zone.name}</p>
                    <p className="text-xs text-gray-600">{zone.deliveries} deliveries • Avg {zone.avgTime} min</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-600">GH₵{zone.earnings}</p>
                    <p className="text-xs text-gray-600">{zone.percentage}%</p>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${zone.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Types */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery Types</h2>
          <div className="space-y-3">
            {deliveryTypes.map((type, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border-2 border-${type.color}-200 bg-${type.color}-50`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{type.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{type.type}</p>
                      <p className="text-xs text-gray-600">{type.count} deliveries</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-gray-900">{type.percentage}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery Status Breakdown */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery Status Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-green-50 rounded-xl border-2 border-green-200">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8 text-white" />
            </div>
            <p className="text-4xl font-black text-green-600 mb-1">{deliveryStats.completed}</p>
            <p className="text-sm font-semibold text-gray-900 mb-1">Completed</p>
            <p className="text-xs text-gray-600">{deliveryStats.completionRate}% success rate</p>
          </div>

          <div className="text-center p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <p className="text-4xl font-black text-yellow-600 mb-1">{deliveryStats.cancelled}</p>
            <p className="text-sm font-semibold text-gray-900 mb-1">Cancelled</p>
            <p className="text-xs text-gray-600">{((deliveryStats.cancelled / deliveryStats.totalDeliveries) * 100).toFixed(1)}% of total</p>
          </div>

          <div className="text-center p-6 bg-red-50 rounded-xl border-2 border-red-200">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <XCircle className="w-8 h-8 text-white" />
            </div>
            <p className="text-4xl font-black text-red-600 mb-1">{deliveryStats.failed}</p>
            <p className="text-sm font-semibold text-gray-900 mb-1">Failed</p>
            <p className="text-xs text-gray-600">{((deliveryStats.failed / deliveryStats.totalDeliveries) * 100).toFixed(1)}% of total</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimeManagementSection() {
  const timeStats = {
    avgDeliveryTime: 24.5,
    totalActiveHours: 187.5,
    idleTime: 32.8,
    onTimeDeliveries: 322,
    lateDeliveries: 20,
    punctualityRate: 94.1,
    avgResponseTime: 2.3,
  };

  const timeBreakdown = [
    { activity: 'Active Delivery', hours: 154.7, percentage: 82.5, color: 'green' },
    { activity: 'Idle/Waiting', hours: 32.8, percentage: 17.5, color: 'yellow' },
  ];

  const dailySchedule = [
    { day: 'Monday', active: 8.5, idle: 1.5, deliveries: 48 },
    { day: 'Tuesday', active: 9.2, idle: 0.8, deliveries: 52 },
    { day: 'Wednesday', active: 7.8, idle: 2.2, deliveries: 45 },
    { day: 'Thursday', active: 8.1, idle: 1.9, deliveries: 50 },
    { day: 'Friday', active: 9.5, idle: 0.5, deliveries: 55 },
    { day: 'Saturday', active: 8.9, idle: 1.1, deliveries: 53 },
    { day: 'Sunday', active: 6.5, idle: 3.5, deliveries: 39 },
  ];

  const deliveryTimeRanges = [
    { range: '0-15 min', count: 85, percentage: 24.9 },
    { range: '15-20 min', count: 112, percentage: 32.7 },
    { range: '20-25 min', count: 89, percentage: 26.0 },
    { range: '25-30 min', count: 38, percentage: 11.1 },
    { range: '30+ min', count: 18, percentage: 5.3 },
  ];

  const punctualityTrend = [
    { week: 'Week 1', onTime: 89, late: 11, percentage: 89.0 },
    { week: 'Week 2', onTime: 92, late: 8, percentage: 92.0 },
    { week: 'Week 3', onTime: 95, late: 5, percentage: 95.0 },
    { week: 'Week 4', onTime: 94, late: 6, percentage: 94.0 },
  ];

  const maxHours = Math.max(...dailySchedule.map(d => d.active + d.idle));

  return (
    <div className="space-y-6">
      {/* Time Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Avg Delivery Time</p>
              <p className="text-3xl font-black text-gray-900">{timeStats.avgDeliveryTime} <span className="text-lg">min</span></p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-green-600">
            <TrendingUp className="w-3 h-3" />
            <span className="font-semibold">-8% faster than last month</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Active Hours</p>
              <p className="text-3xl font-black text-gray-900">{timeStats.totalActiveHours} <span className="text-lg">hrs</span></p>
            </div>
          </div>
          <p className="text-xs text-gray-600">This month</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Punctuality Rate</p>
              <p className="text-3xl font-black text-gray-900">{timeStats.punctualityRate}%</p>
            </div>
          </div>
          <p className="text-xs text-gray-600">{timeStats.onTimeDeliveries} on-time • {timeStats.lateDeliveries} late</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Response Time</p>
              <p className="text-3xl font-black text-gray-900">{timeStats.avgResponseTime} <span className="text-lg">min</span></p>
            </div>
          </div>
          <p className="text-xs text-gray-600">Avg time to accept orders</p>
        </div>
      </div>

      {/* Time Breakdown Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Time Allocation</h2>
          
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="#f3f4f6"
                  strokeWidth="24"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="#10b981"
                  strokeWidth="24"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 80}`}
                  strokeDashoffset={`${2 * Math.PI * 80 * (1 - timeBreakdown[0].percentage / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-black text-gray-900">{timeBreakdown[0].percentage}%</p>
                  <p className="text-xs text-gray-600">Active</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {timeBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full bg-${item.color}-500`}></div>
                  <span className="text-sm font-semibold text-gray-900">{item.activity}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{item.hours} hrs</p>
                  <p className="text-xs text-gray-600">{item.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Time Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery Time Distribution</h2>
          <div className="space-y-4">
            {deliveryTimeRanges.map((range, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900">{range.range}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{range.count} deliveries</span>
                    <span className="text-sm font-bold text-gray-900">{range.percentage}%</span>
                  </div>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      index === 0 ? 'bg-green-500' :
                      index === 1 ? 'bg-blue-500' :
                      index === 2 ? 'bg-yellow-500' :
                      index === 3 ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${range.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Schedule */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Daily Schedule</h2>
            <p className="text-sm text-gray-600">Active vs idle time by day</p>
          </div>
        </div>

        <div className="space-y-3">
          {dailySchedule.map((day, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900 w-24">{day.day}</span>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="text-green-600">{day.active}h active</span>
                  <span className="text-yellow-600">{day.idle}h idle</span>
                  <span>{day.deliveries} deliveries</span>
                </div>
              </div>
              <div className="flex gap-1">
                <div
                  className="h-8 bg-green-500 rounded-l-lg flex items-center justify-center"
                  style={{ width: `${(day.active / maxHours) * 100}%` }}
                >
                  {day.active > 2 && <span className="text-xs font-bold text-white">{day.active}h</span>}
                </div>
                <div
                  className="h-8 bg-yellow-400 rounded-r-lg flex items-center justify-center"
                  style={{ width: `${(day.idle / maxHours) * 100}%` }}
                >
                  {day.idle > 1 && <span className="text-xs font-bold text-white">{day.idle}h</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-black text-green-600">{dailySchedule.reduce((sum, d) => sum + d.active, 0).toFixed(1)}h</p>
              <p className="text-xs text-gray-600">Total Active</p>
            </div>
            <div>
              <p className="text-2xl font-black text-yellow-600">{dailySchedule.reduce((sum, d) => sum + d.idle, 0).toFixed(1)}h</p>
              <p className="text-xs text-gray-600">Total Idle</p>
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">{(dailySchedule.reduce((sum, d) => sum + d.active, 0) / dailySchedule.length).toFixed(1)}h</p>
              <p className="text-xs text-gray-600">Avg Daily Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Punctuality Trend */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Punctuality Trend</h2>
        <div className="space-y-4">
          {punctualityTrend.map((week, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-900">{week.week}</span>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-green-600">{week.onTime} on-time</span>
                  <span className="text-red-600">{week.late} late</span>
                  <span className="font-bold text-gray-900">{week.percentage}%</span>
                </div>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    week.percentage >= 95 ? 'bg-green-500' :
                    week.percentage >= 90 ? 'bg-blue-500' :
                    week.percentage >= 85 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${week.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <p className="text-3xl font-black text-green-600 mb-1">{punctualityTrend[punctualityTrend.length - 1].percentage}%</p>
            <p className="text-sm text-gray-600">Current Week</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <p className="text-3xl font-black text-blue-600 mb-1">
              {(punctualityTrend.reduce((sum, w) => sum + w.percentage, 0) / punctualityTrend.length).toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600">Monthly Average</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomerSatisfactionSection() {
  const satisfactionStats = {
    overallRating: 4.8,
    totalReviews: 287,
    compliments: 142,
    complaints: 8,
    satisfactionRate: 97.2,
  };

  const ratingBreakdown = [
    { stars: 5, count: 218, percentage: 76.0 },
    { stars: 4, count: 52, percentage: 18.1 },
    { stars: 3, count: 9, percentage: 3.1 },
    { stars: 2, count: 5, percentage: 1.7 },
    { stars: 1, count: 3, percentage: 1.1 },
  ];

  const complimentCategories = [
    { category: 'Friendly Service', count: 58, icon: '😊', color: 'green' },
    { category: 'Fast Delivery', count: 45, icon: '⚡', color: 'blue' },
    { category: 'Professional', count: 32, icon: '👔', color: 'purple' },
    { category: 'Careful Handling', count: 28, icon: '📦', color: 'orange' },
    { category: 'Good Communication', count: 24, icon: '💬', color: 'pink' },
  ];

  const recentReviews = [
    { id: 1, customer: 'Kwame A.', rating: 5, comment: 'Super fast and very professional! Best delivery experience I\'ve had.', time: '2 hours ago', tags: ['Fast', 'Professional'] },
    { id: 2, customer: 'Ama F.', rating: 5, comment: 'Always punctual and handles packages with care. Highly recommend!', time: '5 hours ago', tags: ['Punctual', 'Careful'] },
    { id: 3, customer: 'Yaw M.', rating: 4, comment: 'Good service overall. Delivery was on time.', time: '1 day ago', tags: ['On-time'] },
    { id: 4, customer: 'Akua S.', rating: 5, comment: 'Very friendly and courteous. Made my day!', time: '1 day ago', tags: ['Friendly'] },
    { id: 5, customer: 'Kofi B.', rating: 5, comment: 'Excellent communication throughout the delivery. Will request again.', time: '2 days ago', tags: ['Communication'] },
  ];

  const ratingTrend = [
    { week: 'Week 1', rating: 4.7, reviews: 68 },
    { week: 'Week 2', rating: 4.8, reviews: 72 },
    { week: 'Week 3', rating: 4.8, reviews: 74 },
    { week: 'Week 4', rating: 4.9, reviews: 73 },
  ];

  const maxCount = Math.max(...ratingBreakdown.map(r => r.count));

  return (
    <div className="space-y-6">
      {/* Satisfaction Overview */}
      <div className="bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black mb-2">Customer Satisfaction</h2>
              <p className="text-sm opacity-90">Your customer feedback summary</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-2">
                <Star className="w-8 h-8 fill-white" />
                <div className="text-6xl font-black">{satisfactionStats.overallRating}</div>
              </div>
              <p className="text-sm opacity-90">{satisfactionStats.totalReviews} reviews</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-3xl font-black mb-1">{satisfactionStats.satisfactionRate}%</p>
              <p className="text-xs opacity-75">Satisfaction</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-3xl font-black mb-1">{satisfactionStats.compliments}</p>
              <p className="text-xs opacity-75">Compliments</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-3xl font-black mb-1">{ratingBreakdown[0].count}</p>
              <p className="text-xs opacity-75">5-Star Reviews</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-3xl font-black mb-1">{satisfactionStats.complaints}</p>
              <p className="text-xs opacity-75">Complaints</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Rating Breakdown</h2>
          <div className="space-y-4">
            {ratingBreakdown.map((rating) => (
              <div key={rating.stars}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rating.stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">{rating.count} reviews</span>
                    <span className="text-sm font-bold text-gray-900 w-12 text-right">{rating.percentage}%</span>
                  </div>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      rating.stars === 5 ? 'bg-green-500' :
                      rating.stars === 4 ? 'bg-blue-500' :
                      rating.stars === 3 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${(rating.count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Positive Reviews (4-5★)</span>
              <span className="text-lg font-black text-green-600">
                {ratingBreakdown.slice(0, 2).reduce((sum, r) => sum + r.percentage, 0).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Compliment Categories */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Top Compliments</h2>
          <div className="space-y-3">
            {complimentCategories.map((compliment, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border-2 border-${compliment.color}-200 bg-${compliment.color}-50`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{compliment.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{compliment.category}</p>
                      <p className="text-xs text-gray-600">{compliment.count} mentions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-gray-900">
                      {((compliment.count / satisfactionStats.compliments) * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rating Trend */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Rating Trend</h2>
            <p className="text-sm text-gray-600">Monthly rating progression</p>
          </div>
        </div>

        <div className="space-y-4">
          {ratingTrend.map((week, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">{week.week}</span>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-900">{week.rating}</span>
                  </div>
                  <span className="text-gray-600">{week.reviews} reviews</span>
                </div>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                  style={{ width: `${(week.rating / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 gap-6">
          <div className="text-center p-4 bg-yellow-50 rounded-xl">
            <p className="text-3xl font-black text-yellow-600 mb-1">{ratingTrend[ratingTrend.length - 1].rating}</p>
            <p className="text-sm text-gray-600">Current Week</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <p className="text-3xl font-black text-green-600 mb-1">
              +{((ratingTrend[ratingTrend.length - 1].rating - ratingTrend[0].rating) * 100 / ratingTrend[0].rating).toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600">Growth</p>
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Reviews</h2>
        <div className="space-y-4">
          {recentReviews.map((review) => (
            <div key={review.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    {review.customer[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{review.customer}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{review.time}</span>
              </div>
              <p className="text-sm text-gray-700 mb-3">{review.comment}</p>
              <div className="flex flex-wrap gap-2">
                {review.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EfficiencySection() {
  const efficiencyStats = {
    earningsPerHour: 39.75,
    deliveriesPerHour: 1.82,
    fuelEfficiency: 18.5,
    routeOptimization: 92.3,
    acceptanceRate: 96.8,
    completionSpeed: 88.5,
  };

  const efficiencyComparison = [
    { metric: 'Earnings/Hour', you: 39.75, average: 35.20, top: 45.60, unit: 'GH₵' },
    { metric: 'Deliveries/Hour', you: 1.82, average: 1.65, top: 2.10, unit: '' },
    { metric: 'Route Optimization', you: 92.3, average: 85.0, top: 97.5, unit: '%' },
    { metric: 'Acceptance Rate', you: 96.8, average: 90.5, top: 98.5, unit: '%' },
  ];

  const productivityMetrics = [
    { day: 'Mon', earnings: 312.50, hours: 8.5, deliveries: 48, efficiency: 36.76 },
    { day: 'Tue', earnings: 385.20, hours: 9.2, deliveries: 52, efficiency: 41.87 },
    { day: 'Wed', earnings: 296.40, hours: 7.8, deliveries: 45, efficiency: 38.00 },
    { day: 'Thu', earnings: 328.80, hours: 8.1, deliveries: 50, efficiency: 40.59 },
    { day: 'Fri', earnings: 427.50, hours: 9.5, deliveries: 55, efficiency: 45.00 },
    { day: 'Sat', earnings: 378.90, hours: 8.9, deliveries: 53, efficiency: 42.58 },
    { day: 'Sun', earnings: 221.25, hours: 6.5, deliveries: 39, efficiency: 34.04 },
  ];

  const routeStats = {
    avgDistancePerDelivery: 5.4,
    totalDistance: 1847.5,
    optimalRoutes: 316,
    suboptimalRoutes: 26,
    timeSaved: 142,
  };

  const peakPerformance = [
    { metric: 'Best Hour', value: 'GH₵58.50', subtext: '12PM-1PM Friday' },
    { metric: 'Best Day', value: 'GH₵427.50', subtext: 'Last Friday' },
    { metric: 'Longest Streak', value: '14 days', subtext: 'Active daily' },
    { metric: 'Most Deliveries', value: '55', subtext: 'In one day' },
  ];

  const maxEarnings = Math.max(...productivityMetrics.map(d => d.earnings));

  return (
    <div className="space-y-6">
      {/* Efficiency Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-90">Earnings/Hour</p>
              <p className="text-3xl font-black">GH₵{efficiencyStats.earningsPerHour}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <TrendingUp className="w-3 h-3" />
            <span>+13% above average</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-90">Deliveries/Hour</p>
              <p className="text-3xl font-black">{efficiencyStats.deliveriesPerHour}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <TrendingUp className="w-3 h-3" />
            <span>+10% above average</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-90">Route Optimization</p>
              <p className="text-3xl font-black">{efficiencyStats.routeOptimization}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <TrendingUp className="w-3 h-3" />
            <span>Excellent optimization</span>
          </div>
        </div>
      </div>

      {/* Efficiency Comparison */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Performance vs Network</h2>
        <div className="space-y-6">
          {efficiencyComparison.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-900">{item.metric}</span>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-right">
                    <p className="text-xs text-gray-500">You</p>
                    <p className="font-bold text-green-600">{item.unit}{item.you}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Average</p>
                    <p className="font-bold text-gray-600">{item.unit}{item.average}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Top 10%</p>
                    <p className="font-bold text-blue-600">{item.unit}{item.top}</p>
                  </div>
                </div>
              </div>
              <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="absolute h-full bg-gray-300 rounded-full"
                  style={{ width: `${(item.average / item.top) * 100}%` }}
                />
                <div
                  className="absolute h-full bg-green-500 rounded-full"
                  style={{ width: `${(item.you / item.top) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Productivity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Weekly Productivity</h2>
            <p className="text-sm text-gray-600">Earnings efficiency by day</p>
          </div>
        </div>

        <div className="space-y-3">
          {productivityMetrics.map((day, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900 w-16">{day.day}</span>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span>GH₵{day.earnings}</span>
                  <span>{day.hours}h</span>
                  <span>{day.deliveries} deliveries</span>
                  <span className="font-bold text-purple-600">GH₵{day.efficiency}/hr</span>
                </div>
              </div>
              <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-end px-3"
                  style={{ width: `${(day.earnings / maxEarnings) * 100}%` }}
                >
                  {day.earnings > maxEarnings * 0.5 && (
                    <span className="text-xs font-bold text-white">GH₵{day.earnings}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-black text-gray-900">GH₵{productivityMetrics.reduce((sum, d) => sum + d.earnings, 0).toFixed(2)}</p>
              <p className="text-xs text-gray-600">Total Earnings</p>
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">{productivityMetrics.reduce((sum, d) => sum + d.hours, 0).toFixed(1)}h</p>
              <p className="text-xs text-gray-600">Total Hours</p>
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">{productivityMetrics.reduce((sum, d) => sum + d.deliveries, 0)}</p>
              <p className="text-xs text-gray-600">Total Deliveries</p>
            </div>
            <div>
              <p className="text-2xl font-black text-purple-600">GH₵{(productivityMetrics.reduce((sum, d) => sum + d.earnings, 0) / productivityMetrics.reduce((sum, d) => sum + d.hours, 0)).toFixed(2)}</p>
              <p className="text-xs text-gray-600">Avg Efficiency</p>
            </div>
          </div>
        </div>
      </div>

      {/* Route Optimization & Peak Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Route Stats */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Route Optimization</h2>
          
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#f3f4f6"
                  strokeWidth="20"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#10b981"
                  strokeWidth="20"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - efficiencyStats.routeOptimization / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-black text-gray-900">{efficiencyStats.routeOptimization}%</p>
                  <p className="text-xs text-gray-600">Optimized</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
              <span className="text-sm text-gray-600">Optimal Routes</span>
              <span className="text-sm font-bold text-green-600">{routeStats.optimalRoutes}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl">
              <span className="text-sm text-gray-600">Suboptimal Routes</span>
              <span className="text-sm font-bold text-yellow-600">{routeStats.suboptimalRoutes}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
              <span className="text-sm text-gray-600">Time Saved</span>
              <span className="text-sm font-bold text-blue-600">{routeStats.timeSaved} min</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
              <span className="text-sm text-gray-600">Avg Distance</span>
              <span className="text-sm font-bold text-purple-600">{routeStats.avgDistancePerDelivery} km</span>
            </div>
          </div>
        </div>

        {/* Peak Performance */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Peak Performance</h2>
          <div className="space-y-4">
            {peakPerformance.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200"
              >
                <p className="text-xs text-gray-600 mb-1">{item.metric}</p>
                <p className="text-2xl font-black text-gray-900 mb-1">{item.value}</p>
                <p className="text-xs text-gray-600">{item.subtext}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Efficiency Tips */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Efficiency Tips</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Your peak hours are 12PM-2PM. Focus on maximizing deliveries during this time.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>Friday is your most productive day (GH₵45/hr). Try replicating this pattern.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>You're in the top 15% for route optimization. Keep up the great work!</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoalsTargetsSection() {
  const dailyGoals = [
    { id: 1, goal: '50 Deliveries', current: 48, target: 50, reward: 'GH₵50 Bonus', status: 'in-progress', icon: Package },
    { id: 2, goal: '8 Active Hours', current: 7.5, target: 8, reward: '100 XP', status: 'in-progress', icon: Clock },
    { id: 3, goal: '4.8+ Rating', current: 4.8, target: 4.8, reward: 'Badge', status: 'completed', icon: Star },
    { id: 4, goal: 'GH₵400 Earnings', current: 385, target: 400, reward: 'Streak', status: 'in-progress', icon: Target },
  ];

  const weeklyGoals = [
    { id: 1, goal: '350 Deliveries', current: 342, target: 350, progress: 97.7, reward: 'GH₵200', daysLeft: 1 },
    { id: 2, goal: 'GH₵3000 Earnings', current: 2850, target: 3000, progress: 95.0, reward: 'GH₵150', daysLeft: 1 },
    { id: 3, goal: '7 Active Days', current: 7, target: 7, progress: 100, reward: '500 XP', daysLeft: 0 },
    { id: 4, goal: '95% On-Time', current: 94.1, target: 95, progress: 99.1, reward: 'Badge', daysLeft: 1 },
  ];

  const monthlyGoals = [
    { id: 1, goal: '1500 Deliveries', current: 1423, target: 1500, progress: 94.9 },
    { id: 2, goal: 'GH₵12000 Earnings', current: 11240, target: 12000, progress: 93.7 },
    { id: 3, goal: '30 Active Days', current: 28, target: 30, progress: 93.3 },
    { id: 4, goal: 'Level 15', current: 12, target: 15, progress: 80.0 },
  ];

  const activeChallenges = [
    { 
      id: 1, 
      name: 'Weekend Warrior', 
      description: 'Complete 100 deliveries this weekend',
      current: 67,
      target: 100,
      timeLeft: '1 day 8 hours',
      reward: 'GH₵300 + Exclusive Badge',
      difficulty: 'Hard',
      icon: Award,
    },
    { 
      id: 2, 
      name: 'Speed Master', 
      description: 'Complete 20 deliveries under 20 minutes',
      current: 14,
      target: 20,
      timeLeft: '3 days',
      reward: 'GH₵100 + 200 XP',
      difficulty: 'Medium',
      icon: Zap,
    },
    { 
      id: 3, 
      name: 'Perfect Week', 
      description: 'Maintain 5.0 rating for 7 consecutive days',
      current: 4,
      target: 7,
      timeLeft: '3 days',
      reward: 'Elite Badge + GH₵250',
      difficulty: 'Hard',
      icon: Star,
    },
  ];

  const achievements = [
    { id: 1, name: 'Century Club', description: '100 deliveries in one week', icon: '🏆', unlocked: true, date: 'Nov 15, 2024' },
    { id: 2, name: 'Speed Demon', description: '50 deliveries under 20 min', icon: '⚡', unlocked: true, date: 'Nov 10, 2024' },
    { id: 3, name: 'Five Star Hero', description: '100 five-star ratings', icon: '⭐', unlocked: true, date: 'Nov 5, 2024' },
    { id: 4, name: 'Early Bird', description: 'Start before 7AM for 10 days', icon: '🌅', unlocked: false, date: null },
    { id: 5, name: 'Night Owl', description: 'Deliver past 10PM for 20 days', icon: '🦉', unlocked: false, date: null },
    { id: 6, name: 'Marathon', description: '12+ hours in one day', icon: '🏃', unlocked: false, date: null },
  ];

  const streaks = {
    current: 14,
    longest: 28,
    activeDays: 28,
  };

  return (
    <div className="space-y-6">
      {/* Streak Card */}
      <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black mb-2">Active Streak</h2>
              <p className="text-sm opacity-90">Keep going! You're on fire 🔥</p>
            </div>
            <div className="text-right">
              <div className="text-6xl font-black mb-2">{streaks.current}</div>
              <p className="text-sm opacity-90">Days</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-3xl font-black mb-1">{streaks.longest}</p>
              <p className="text-xs opacity-75">Longest Streak</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-3xl font-black mb-1">{streaks.activeDays}</p>
              <p className="text-xs opacity-75">Active Days</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-3xl font-black mb-1">93%</p>
              <p className="text-xs opacity-75">Consistency</p>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Goals */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Daily Goals</h2>
            <p className="text-sm text-gray-600">Complete today's objectives</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">
            <Clock className="w-4 h-4" />
            <span>Resets in 6h</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dailyGoals.map((goal) => {
            const Icon = goal.icon;
            const progress = (goal.current / goal.target) * 100;
            
            return (
              <div
                key={goal.id}
                className={`p-4 rounded-xl border-2 ${
                  goal.status === 'completed'
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      goal.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{goal.goal}</p>
                      <p className="text-xs text-gray-600">{goal.reward}</p>
                    </div>
                  </div>
                  {goal.status === 'completed' && (
                    <Award className="w-5 h-5 text-green-600" />
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-bold text-gray-900">{goal.current}/{goal.target}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        goal.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Goals */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Weekly Goals</h2>
            <p className="text-sm text-gray-600">This week's targets</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold">
            <Calendar className="w-4 h-4" />
            <span>1 day left</span>
          </div>
        </div>

        <div className="space-y-4">
          {weeklyGoals.map((goal) => (
            <div key={goal.id} className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-bold text-gray-900">{goal.goal}</p>
                  <p className="text-xs text-gray-600">Reward: {goal.reward}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{goal.current}/{goal.target}</p>
                  <p className="text-xs text-gray-600">{goal.progress.toFixed(1)}%</p>
                </div>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    goal.progress >= 100 ? 'bg-green-500' :
                    goal.progress >= 90 ? 'bg-blue-500' :
                    goal.progress >= 75 ? 'bg-yellow-500' :
                    'bg-orange-500'
                  }`}
                  style={{ width: `${Math.min(goal.progress, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Challenges */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Active Challenges</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {activeChallenges.map((challenge) => {
            const Icon = challenge.icon;
            const progress = (challenge.current / challenge.target) * 100;
            
            return (
              <div
                key={challenge.id}
                className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                    challenge.difficulty === 'Hard' ? 'bg-red-100 text-red-700' :
                    challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {challenge.difficulty}
                  </span>
                </div>
                
                <h3 className="font-bold text-gray-900 mb-1">{challenge.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-bold text-gray-900">{challenge.current}/{challenge.target}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t border-purple-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">⏱️ {challenge.timeLeft}</span>
                    <span className="font-bold text-purple-600">{challenge.reward}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Goals */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {monthlyGoals.map((goal) => (
            <div key={goal.id} className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200">
              <p className="text-sm text-gray-600 mb-2">{goal.goal}</p>
              <p className="text-4xl font-black text-gray-900 mb-2">{goal.current}</p>
              <p className="text-xs text-gray-600 mb-4">Target: {goal.target}</p>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <p className="text-sm font-bold text-blue-600">{goal.progress.toFixed(1)}% Complete</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl text-center transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200'
                  : 'bg-gray-50 border-2 border-gray-200 opacity-50'
              }`}
            >
              <div className="text-4xl mb-2">{achievement.icon}</div>
              <p className="text-xs font-bold text-gray-900 mb-1">{achievement.name}</p>
              <p className="text-[10px] text-gray-600 mb-2">{achievement.description}</p>
              {achievement.unlocked ? (
                <p className="text-[10px] text-green-600 font-semibold">✓ {achievement.date}</p>
              ) : (
                <p className="text-[10px] text-gray-500">Locked</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
