import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Bike, Package, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

export default function Overview() {
  const stats = [
    { label: 'Total Users', value: '12,458', change: '+12%', icon: Users, color: 'blue' },
    { label: 'Active Riders', value: '3,247', change: '+8%', icon: Bike, color: 'green' },
    { label: 'Tasks (Today)', value: '1,842', change: '+24%', icon: Package, color: 'purple' },
    { label: 'Revenue (Month)', value: '$54,231', change: '+18%', icon: DollarSign, color: 'yellow' },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 42000 },
    { month: 'Feb', revenue: 45000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 51000 },
    { month: 'May', revenue: 49000 },
    { month: 'Jun', revenue: 54231 },
  ];

  const taskData = [
    { day: 'Mon', completed: 245, cancelled: 12 },
    { day: 'Tue', completed: 278, cancelled: 8 },
    { day: 'Wed', completed: 256, cancelled: 15 },
    { day: 'Thu', completed: 289, cancelled: 9 },
    { day: 'Fri', completed: 312, cancelled: 11 },
    { day: 'Sat', completed: 298, cancelled: 6 },
    { day: 'Sun', completed: 234, cancelled: 14 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon className={`text-${stat.color}-600`} size={24} />
                <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                  <TrendingUp size={16} />
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Revenue Trend (6 Months)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Tasks (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#22c55e" />
              <Bar dataKey="cancelled" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent System Alerts</h2>
        </div>
        <div className="divide-y">
          {[
            { type: 'warning', message: 'High task volume detected in Zone A', time: '5 min ago' },
            { type: 'info', message: 'New rider verification completed: John Doe', time: '12 min ago' },
            { type: 'error', message: 'Payment gateway timeout - Transaction #12345', time: '1 hour ago' },
          ].map((alert, i) => (
            <div key={i} className="p-4 flex items-center gap-4 hover:bg-gray-50">
              <AlertCircle
                className={
                  alert.type === 'error'
                    ? 'text-red-600'
                    : alert.type === 'warning'
                    ? 'text-yellow-600'
                    : 'text-blue-600'
                }
                size={20}
              />
              <div className="flex-1">
                <p className="text-sm text-gray-900">{alert.message}</p>
                <p className="text-xs text-gray-500">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
