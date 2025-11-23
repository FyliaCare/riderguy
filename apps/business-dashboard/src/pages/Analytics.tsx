import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Package, Clock, DollarSign, Calendar } from 'lucide-react';

export default function Analytics() {
  const deliveryData = [
    { month: 'Jun', deliveries: 42, cost: 8400 },
    { month: 'Jul', deliveries: 58, cost: 11600 },
    { month: 'Aug', deliveries: 65, cost: 13000 },
    { month: 'Sep', deliveries: 71, cost: 14200 },
    { month: 'Oct', deliveries: 64, cost: 12800 },
    { month: 'Nov', deliveries: 87, cost: 17400 },
  ];

  const packageTypeData = [
    { name: 'Food', value: 35, color: '#22c55e' },
    { name: 'Documents', value: 25, color: '#3b82f6' },
    { name: 'Electronics', value: 20, color: '#a855f7' },
    { name: 'Groceries', value: 15, color: '#f59e0b' },
    { name: 'Other', value: 5, color: '#6b7280' },
  ];

  const performanceMetrics = [
    { day: 'Mon', onTime: 42, delayed: 3 },
    { day: 'Tue', onTime: 48, delayed: 2 },
    { day: 'Wed', onTime: 51, delayed: 4 },
    { day: 'Thu', onTime: 45, delayed: 1 },
    { day: 'Fri', onTime: 58, delayed: 5 },
    { day: 'Sat', onTime: 39, delayed: 2 },
    { day: 'Sun', onTime: 35, delayed: 3 },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Insights into your delivery performance</p>
      </div>

      {/* Date Range Selector */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-6">
        <div className="flex items-center gap-4">
          <Calendar className="w-5 h-5 text-gray-600" />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last 6 months</option>
            <option>Last year</option>
            <option>Custom range</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+12%</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Deliveries</p>
          <p className="text-3xl font-bold text-gray-900">387</p>
          <p className="text-xs text-gray-500 mt-2">Last 6 months</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-blue-600 font-medium">94%</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">On-Time Rate</p>
          <p className="text-3xl font-bold text-gray-900">32 min</p>
          <p className="text-xs text-gray-500 mt-2">Avg. delivery time</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-purple-600 font-medium">+8%</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Spend</p>
          <p className="text-3xl font-bold text-gray-900">₦77,400</p>
          <p className="text-xs text-gray-500 mt-2">Last 6 months</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-yellow-600" />
            </div>
            <span className="text-sm text-yellow-600 font-medium">₦200</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Avg. Cost</p>
          <p className="text-3xl font-bold text-gray-900">₦200</p>
          <p className="text-xs text-gray-500 mt-2">Per delivery</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Delivery Volume & Cost */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Delivery Volume & Cost</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deliveryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="deliveries" fill="#22c55e" name="Deliveries" />
              <Bar yAxisId="right" dataKey="cost" fill="#3b82f6" name="Cost (₦)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Package Type Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Package Type Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={packageTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name} (${entry.value}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {packageTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Delivery Performance (Last 7 Days)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceMetrics}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="onTime" stroke="#22c55e" strokeWidth={2} name="On Time" />
            <Line type="monotone" dataKey="delayed" stroke="#ef4444" strokeWidth={2} name="Delayed" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Export Options */}
      <div className="mt-6 flex justify-end gap-3">
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
          Export PDF
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2">
          Export CSV
        </button>
      </div>
    </div>
  );
}
