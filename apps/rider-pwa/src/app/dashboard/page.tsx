'use client';

import { useEffect, useState } from 'react';
import { useRiderStore } from '@/store/rider-store';
import { SEOHead } from '@/components/seo-head';
import {
  TrendingUp,
  TrendingDown,
  Package,
  DollarSign,
  Clock,
  Star,
  Award,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Calendar,
  Target,
  Zap,
  Users,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { rider, fetchRiderProfile } = useRiderStore();
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    fetchRiderProfile();
  }, [fetchRiderProfile]);

  return (
    <>
      <SEOHead
        title="Dashboard"
        description="View your rider performance, earnings, deliveries, and daily statistics"
        keywords={['rider dashboard', 'delivery stats', 'earnings', 'performance']}
        canonicalPath="/dashboard"
      />

  // Mock data - replace with real API calls
  const stats = {
    todayEarnings: 245.50,
    todayDeliveries: 12,
    weekEarnings: 1823.75,
    monthEarnings: 7456.20,
    rating: 4.8,
    completionRate: 98,
    totalDeliveries: 1247,
    activeOrders: 2,
  };

  const recentDeliveries = [
    {
      id: '#DEL-2847',
      customer: 'Kwame Mensah',
      status: 'Delivered',
      amount: 45.50,
      time: '12:45 PM',
      location: 'Osu, Accra',
    },
    {
      id: '#DEL-2846',
      customer: 'Ama Frimpong',
      status: 'Delivered',
      amount: 38.00,
      time: '11:30 AM',
      location: 'East Legon',
    },
    {
      id: '#DEL-2845',
      customer: 'Kofi Asante',
      status: 'Delivered',
      amount: 52.25,
      time: '10:15 AM',
      location: 'Airport',
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: 'Complete Safety Training Module',
      type: 'Training',
      xp: 50,
      deadline: '2 days left',
      progress: 75,
    },
    {
      id: 2,
      title: 'Achieve 15 Deliveries Today',
      type: 'Goal',
      xp: 100,
      progress: 80,
      current: 12,
      target: 15,
    },
    {
      id: 3,
      title: 'Maintain 5-Star Rating',
      type: 'Challenge',
      xp: 200,
      progress: 96,
    },
  ];

  const quickActions = [
    { name: 'View Routes', icon: MapPin, href: '/dashboard/routes', color: 'bg-blue-500' },
    { name: 'Training', icon: BookOpen, href: '/dashboard/training', color: 'bg-purple-500' },
    { name: 'Schedule', icon: Calendar, href: '/dashboard/schedule', color: 'bg-orange-500' },
    { name: 'Community', icon: Users, href: '/dashboard/community', color: 'bg-pink-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900">
              Welcome back, {rider?.name || 'Rider'}! 👋
            </h1>
            <p className="text-gray-600 mt-1">Here's what's happening with your deliveries today</p>
          </div>

          {/* Online Toggle */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <button
                onClick={() => setIsOnline(!isOnline)}
                className={`
                  relative inline-flex h-8 w-14 items-center rounded-full transition-colors
                  ${isOnline ? 'bg-green-500' : 'bg-gray-300'}
                `}
              >
                <span
                  className={`
                    inline-block h-6 w-6 transform rounded-full bg-white transition-transform
                    ${isOnline ? 'translate-x-7' : 'translate-x-1'}
                  `}
                />
              </button>
              <span className={`text-sm font-semibold ${isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mt-6 bg-gradient-to-br from-green-50 to-cyan-50 rounded-xl p-4 border border-green-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-gray-900">Level {rider?.level || 1}</span>
              <span className="text-sm text-gray-600">• Professional Rider</span>
            </div>
            <span className="text-sm font-medium text-green-600">{rider?.xp || 0}/1000 XP</span>
          </div>
          <div className="relative w-full h-3 bg-white rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-cyan-500 transition-all duration-500"
              style={{ width: `${((rider?.xp || 0) / 1000) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-2">
            {1000 - (rider?.xp || 0)} XP to Level {(rider?.level || 1) + 1}
          </p>
        </div>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Today's Earnings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
              <TrendingUp className="w-4 h-4" />
              +12.5%
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Today's Earnings</p>
          <p className="text-3xl font-black text-gray-900">GH₵{stats.todayEarnings}</p>
          <p className="text-xs text-gray-500 mt-2">{stats.todayDeliveries} deliveries completed</p>
        </div>

        {/* Week Earnings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-blue-600">
              <TrendingUp className="w-4 h-4" />
              +8.3%
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">This Week</p>
          <p className="text-3xl font-black text-gray-900">GH₵{stats.weekEarnings}</p>
          <p className="text-xs text-gray-500 mt-2">vs GH₵1,683 last week</p>
        </div>

        {/* Rating */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-yellow-600">
              <Star className="w-4 h-4 fill-current" />
              Excellent
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Average Rating</p>
          <p className="text-3xl font-black text-gray-900">{stats.rating}</p>
          <p className="text-xs text-gray-500 mt-2">{stats.completionRate}% completion rate</p>
        </div>

        {/* Active Orders */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-purple-600">
              <Clock className="w-4 h-4" />
              Active
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Active Orders</p>
          <p className="text-3xl font-black text-gray-900">{stats.activeOrders}</p>
          <Link href="/dashboard/deliveries/active" className="text-xs text-purple-600 hover:text-purple-700 font-medium mt-2 inline-flex items-center gap-1">
            View details <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Deliveries */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Deliveries</h2>
            <Link href="/dashboard/deliveries/history" className="text-sm text-green-600 hover:text-green-700 font-medium">
              View all
            </Link>
          </div>

          <div className="space-y-4">
            {recentDeliveries.map((delivery) => (
              <div key={delivery.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{delivery.customer}</span>
                    <span className="text-xs text-gray-500">{delivery.id}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{delivery.location}</span>
                    <span>•</span>
                    <span>{delivery.time}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-gray-900">GH₵{delivery.amount}</p>
                  <span className="text-xs text-green-600 font-medium">{delivery.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Tasks */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  href={action.href}
                  className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                >
                  <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center">{action.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Tasks & Goals</h2>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="border border-gray-200 rounded-xl p-4 hover:border-green-300 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">{task.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{task.type}</span>
                        {task.deadline && (
                          <>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-orange-600 font-medium">{task.deadline}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-green-600">
                      <Zap className="w-4 h-4" />
                      +{task.xp} XP
                    </div>
                  </div>
                  <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-green-600"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                  {task.current && task.target && (
                    <p className="text-xs text-gray-600 mt-2">{task.current}/{task.target} completed</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-90">Peak Hours</p>
              <p className="text-2xl font-black">12 PM - 2 PM</p>
            </div>
          </div>
          <p className="text-sm opacity-90">You earn 25% more during lunch hours. Stay online!</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-90">This Month</p>
              <p className="text-2xl font-black">Top 10%</p>
            </div>
          </div>
          <p className="text-sm opacity-90">You're performing better than 90% of riders in Accra!</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-90">Weekly Goal</p>
              <p className="text-2xl font-black">85% Done</p>
            </div>
          </div>
          <p className="text-sm opacity-90">15 more deliveries to hit your GH₵2,000 weekly target!</p>
        </div>
      </div>
    </div>
  );
}
