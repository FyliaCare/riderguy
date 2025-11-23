'use client';

import { useState } from 'react';
import { SEOHead } from '@/components/seo-head';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
  Download,
  Upload,
  Calendar,
  Clock,
  CreditCard,
  Smartphone,
  Building2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Filter,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  BarChart3,
  Gift,
  Zap,
  Star,
  Users,
  Package,
  Award,
  Eye,
  EyeOff,
  RefreshCw,
  Plus,
  ExternalLink,
} from 'lucide-react';

export default function EarningsPage() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month' | 'year'>('week');
  const [selectedTransactionFilter, setSelectedTransactionFilter] = useState<'all' | 'earnings' | 'withdrawals' | 'bonuses'>('all');

  // Financial data
  const wallet = {
    availableBalance: 3847.50,
    pendingEarnings: 425.30,
    totalEarnings: 28450.75,
    totalWithdrawn: 24603.25,
    lifetimeEarnings: 53054.00,
  };

  const earningsBreakdown = {
    deliveries: 3420.50,
    tips: 185.00,
    bonuses: 142.00,
    referrals: 100.00,
  };

  const periodData = {
    today: { earnings: 245.50, deliveries: 12, avgPerDelivery: 20.46, change: 12.5 },
    week: { earnings: 1823.75, deliveries: 87, avgPerDelivery: 20.96, change: 8.3 },
    month: { earnings: 7456.20, deliveries: 342, avgPerDelivery: 21.80, change: 15.2 },
    year: { earnings: 53054.00, deliveries: 2847, avgPerDelivery: 18.63, change: 24.7 },
  };

  const currentPeriod = periodData[selectedPeriod];

  // Transaction history
  const transactions = [
    { id: 1, type: 'earning', category: 'delivery', amount: 45.50, status: 'completed', description: 'Delivery #DEL-2847', time: '2 hours ago', date: 'Nov 23, 2024' },
    { id: 2, type: 'earning', category: 'tip', amount: 15.00, status: 'completed', description: 'Customer tip', time: '2 hours ago', date: 'Nov 23, 2024' },
    { id: 3, type: 'withdrawal', category: 'bank', amount: -500.00, status: 'pending', description: 'Bank Transfer to GCB', time: '5 hours ago', date: 'Nov 23, 2024', reference: 'WTH-8472' },
    { id: 4, type: 'earning', category: 'delivery', amount: 38.20, status: 'completed', description: 'Delivery #DEL-2846', time: '6 hours ago', date: 'Nov 23, 2024' },
    { id: 5, type: 'earning', category: 'bonus', amount: 50.00, status: 'completed', description: 'Peak hour bonus', time: '8 hours ago', date: 'Nov 23, 2024' },
    { id: 6, type: 'earning', category: 'referral', amount: 25.00, status: 'completed', description: 'Referral bonus - Kwame M.', time: '1 day ago', date: 'Nov 22, 2024' },
    { id: 7, type: 'withdrawal', category: 'momo', amount: -300.00, status: 'completed', description: 'Mobile Money to MTN', time: '2 days ago', date: 'Nov 21, 2024', reference: 'WTH-8461' },
    { id: 8, type: 'earning', category: 'delivery', amount: 52.80, status: 'completed', description: 'Delivery #DEL-2845', time: '2 days ago', date: 'Nov 21, 2024' },
    { id: 9, type: 'earning', category: 'bonus', amount: 75.00, status: 'completed', description: 'Weekly target achieved', time: '3 days ago', date: 'Nov 20, 2024' },
    { id: 10, type: 'withdrawal', category: 'bank', amount: -1000.00, status: 'completed', description: 'Bank Transfer to GCB', time: '1 week ago', date: 'Nov 16, 2024', reference: 'WTH-8445' },
  ];

  const filteredTransactions = transactions.filter(t => {
    if (selectedTransactionFilter === 'all') return true;
    if (selectedTransactionFilter === 'earnings') return t.type === 'earning';
    if (selectedTransactionFilter === 'withdrawals') return t.type === 'withdrawal';
    if (selectedTransactionFilter === 'bonuses') return t.category === 'bonus';
    return true;
  });

  // Withdrawal methods
  const withdrawalMethods = [
    { id: 1, name: 'Mobile Money', provider: 'MTN', number: '**** 5678', icon: Smartphone, color: 'yellow', fee: '0%', instant: true },
    { id: 2, name: 'Mobile Money', provider: 'Vodafone', number: '**** 9012', icon: Smartphone, color: 'red', fee: '0%', instant: true },
    { id: 3, name: 'Bank Transfer', provider: 'GCB Bank', number: '**** 3456', icon: Building2, color: 'blue', fee: '0%', instant: false },
    { id: 4, name: 'Bank Transfer', provider: 'Ecobank', number: '**** 7890', icon: Building2, color: 'green', fee: '0%', instant: false },
  ];

  // Weekly earnings chart data (mock data for visualization)
  const weeklyChartData = [
    { day: 'Mon', amount: 245.50, deliveries: 12 },
    { day: 'Tue', amount: 310.20, deliveries: 15 },
    { day: 'Wed', amount: 198.40, deliveries: 9 },
    { day: 'Thu', amount: 285.60, deliveries: 14 },
    { day: 'Fri', amount: 342.80, deliveries: 16 },
    { day: 'Sat', amount: 268.90, deliveries: 13 },
    { day: 'Sun', amount: 172.35, deliveries: 8 },
  ];

  const maxAmount = Math.max(...weeklyChartData.map(d => d.amount));

  return (
    <>
      <SEOHead
        title="Earnings"
        description="View your earnings, wallet balance, transactions, and withdrawal history"
        keywords={['earnings', 'wallet', 'income', 'withdrawals', 'transactions']}
        canonicalPath="/dashboard/earnings"
      />
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Earnings & Wallet</h1>
          <p className="text-gray-600 mt-1">Track your income and manage withdrawals</p>
        </div>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm opacity-90">Available Balance</p>
                  <div className="flex items-center gap-2">
                    {balanceVisible ? (
                      <p className="text-4xl font-black">GH₵{wallet.availableBalance.toFixed(2)}</p>
                    ) : (
                      <p className="text-4xl font-black">GH₵ ••••••</p>
                    )}
                    <button
                      onClick={() => setBalanceVisible(!balanceVisible)}
                      className="w-8 h-8 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors"
                    >
                      {balanceVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg">
                  <Clock className="w-4 h-4" />
                  <span>Pending: GH₵{wallet.pendingEarnings.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-1 text-green-300">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-semibold">+{currentPeriod.change}% this {selectedPeriod}</span>
                </div>
              </div>
            </div>

            <button className="px-6 py-3 bg-white text-green-600 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-lg">
              <Upload className="w-5 h-5" />
              Withdraw
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 opacity-75" />
                <p className="text-xs opacity-75">Total Earned</p>
              </div>
              <p className="text-2xl font-black">GH₵{wallet.totalEarnings.toFixed(2)}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <ArrowDownRight className="w-4 h-4 opacity-75" />
                <p className="text-xs opacity-75">Total Withdrawn</p>
              </div>
              <p className="text-2xl font-black">GH₵{wallet.totalWithdrawn.toFixed(2)}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 opacity-75" />
                <p className="text-xs opacity-75">Lifetime</p>
              </div>
              <p className="text-2xl font-black">GH₵{wallet.lifetimeEarnings.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Period Selector & Stats */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Earnings Overview</h2>
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
            {(['today', 'week', 'month', 'year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedPeriod === period
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Earnings</p>
                <p className="text-2xl font-black text-gray-900">GH₵{currentPeriod.earnings.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <ArrowUpRight className="w-3 h-3" />
              <span className="font-semibold">+{currentPeriod.change}% from last {selectedPeriod}</span>
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Deliveries</p>
                <p className="text-2xl font-black text-gray-900">{currentPeriod.deliveries}</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">Completed successfully</p>
          </div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg Per Delivery</p>
                <p className="text-2xl font-black text-gray-900">GH₵{currentPeriod.avgPerDelivery.toFixed(2)}</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">Average earnings rate</p>
          </div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Growth Rate</p>
                <p className="text-2xl font-black text-gray-900">+{currentPeriod.change}%</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">Performance trend</p>
          </div>
        </div>
      </div>

      {/* Earnings Breakdown & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Weekly Performance</h2>
            <button className="text-sm text-green-600 font-semibold hover:text-green-700 flex items-center gap-1">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          <div className="space-y-3">
            {weeklyChartData.map((day, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-600 w-12">{day.day}</span>
                <div className="flex-1 relative">
                  <div className="h-12 bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-end px-3 transition-all duration-500"
                      style={{ width: `${(day.amount / maxAmount) * 100}%` }}
                    >
                      <span className="text-sm font-bold text-white">GH₵{day.amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right w-24">
                  <p className="text-sm font-bold text-gray-900">{day.deliveries}</p>
                  <p className="text-xs text-gray-500">deliveries</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-black text-gray-900">GH₵{weeklyChartData.reduce((sum, d) => sum + d.amount, 0).toFixed(2)}</p>
                <p className="text-xs text-gray-600">Total Week</p>
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900">{weeklyChartData.reduce((sum, d) => sum + d.deliveries, 0)}</p>
                <p className="text-xs text-gray-600">Total Deliveries</p>
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900">GH₵{(weeklyChartData.reduce((sum, d) => sum + d.amount, 0) / weeklyChartData.reduce((sum, d) => sum + d.deliveries, 0)).toFixed(2)}</p>
                <p className="text-xs text-gray-600">Avg Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Earnings Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Earnings Breakdown</h2>

          <div className="space-y-4">
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-gray-700">Deliveries</span>
                </div>
                <span className="text-sm font-bold text-gray-900">GH₵{earningsBreakdown.deliveries.toFixed(2)}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(earningsBreakdown.deliveries / Object.values(earningsBreakdown).reduce((a, b) => a + b, 0)) * 100}%` }}
                />
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-gray-700">Tips</span>
                </div>
                <span className="text-sm font-bold text-gray-900">GH₵{earningsBreakdown.tips.toFixed(2)}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${(earningsBreakdown.tips / Object.values(earningsBreakdown).reduce((a, b) => a + b, 0)) * 100}%` }}
                />
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-gray-700">Bonuses</span>
                </div>
                <span className="text-sm font-bold text-gray-900">GH₵{earningsBreakdown.bonuses.toFixed(2)}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${(earningsBreakdown.bonuses / Object.values(earningsBreakdown).reduce((a, b) => a + b, 0)) * 100}%` }}
                />
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-gray-700">Referrals</span>
                </div>
                <span className="text-sm font-bold text-gray-900">GH₵{earningsBreakdown.referrals.toFixed(2)}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full"
                  style={{ width: `${(earningsBreakdown.referrals / Object.values(earningsBreakdown).reduce((a, b) => a + b, 0)) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-700">Total</span>
              <span className="text-xl font-black text-gray-900">
                GH₵{Object.values(earningsBreakdown).reduce((a, b) => a + b, 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Withdrawal Methods */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Withdrawal Methods</h2>
            <p className="text-sm text-gray-600">Manage your payout accounts</p>
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Method
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {withdrawalMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.id}
                className="p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 bg-${method.color}-100 rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${method.color}-600`} />
                  </div>
                  {method.instant && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                      Instant
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-1">{method.name}</p>
                <p className="text-xs text-gray-600 mb-1">{method.provider}</p>
                <p className="text-xs text-gray-500">{method.number}</p>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-600">Fee: <span className="font-bold text-green-600">{method.fee}</span></p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {(['all', 'earnings', 'withdrawals', 'bonuses'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedTransactionFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedTransactionFilter === filter
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    transaction.type === 'earning'
                      ? 'bg-green-100'
                      : 'bg-red-100'
                  }`}>
                    {transaction.type === 'earning' ? (
                      transaction.category === 'delivery' ? <Package className="w-6 h-6 text-green-600" /> :
                      transaction.category === 'tip' ? <Gift className="w-6 h-6 text-green-600" /> :
                      transaction.category === 'bonus' ? <Zap className="w-6 h-6 text-green-600" /> :
                      <Users className="w-6 h-6 text-green-600" />
                    ) : (
                      transaction.category === 'bank' ? <Building2 className="w-6 h-6 text-red-600" /> :
                      <Smartphone className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{transaction.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm text-gray-600">{transaction.time}</p>
                      {transaction.reference && (
                        <>
                          <span className="text-gray-300">•</span>
                          <p className="text-xs text-gray-500 font-mono">{transaction.reference}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    transaction.type === 'earning'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    {transaction.type === 'earning' ? '+' : ''}GH₵{Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    {transaction.status === 'completed' ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-xs text-green-600 font-semibold">Completed</span>
                      </>
                    ) : transaction.status === 'pending' ? (
                      <>
                        <Clock className="w-4 h-4 text-yellow-600" />
                        <span className="text-xs text-yellow-600 font-semibold">Pending</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span className="text-xs text-red-600 font-semibold">Failed</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Showing {filteredTransactions.length} transactions</p>
            <button className="text-sm text-green-600 font-semibold hover:text-green-700 flex items-center gap-1">
              Load More
              <ArrowDownRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
