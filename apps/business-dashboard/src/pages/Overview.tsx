import { TrendingUp, Package, DollarSign, Clock, ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Overview() {
  const stats = [
    { label: 'Total Deliveries', value: '247', change: '+12%', icon: Package, color: 'blue' },
    { label: 'Active Deliveries', value: '8', change: '+3', icon: Clock, color: 'yellow' },
    { label: 'This Month Cost', value: '$1,842', change: '+8%', icon: DollarSign, color: 'green' },
    { label: 'Avg. Delivery Time', value: '32 min', change: '-5%', icon: TrendingUp, color: 'purple' },
  ];

  const recentDeliveries = [
    { id: 'DEL-001', customer: 'John Doe', address: '123 Main St, Lagos', status: 'In Transit', time: '10 min ago' },
    { id: 'DEL-002', customer: 'Jane Smith', address: '456 Oak Ave, Lagos', status: 'Delivered', time: '25 min ago' },
    { id: 'DEL-003', customer: 'Mike Johnson', address: '789 Pine Rd, Lagos', status: 'Picked Up', time: '45 min ago' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
        <p className="text-gray-600">Here's what's happening with your deliveries today</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-${stat.color}-50 flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/new-delivery"
              className="flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition group"
            >
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900">New Delivery</span>
              </div>
              <ArrowRight className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              to="/deliveries"
              className="flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition group"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">Track Deliveries</span>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              to="/billing"
              className="flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition group"
            >
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-900">View Billing</span>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition" />
            </Link>
          </div>
        </div>

        {/* Recent Deliveries */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Deliveries</h2>
            <Link to="/deliveries" className="text-sm text-green-600 hover:text-green-700 font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentDeliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-green-300 transition"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-medium text-gray-900">{delivery.id}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        delivery.status === 'Delivered'
                          ? 'bg-green-100 text-green-700'
                          : delivery.status === 'In Transit'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {delivery.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{delivery.customer}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {delivery.address}
                  </p>
                </div>
                <span className="text-xs text-gray-500">{delivery.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-6 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Need Help Getting Started?</h3>
        <p className="text-green-50 mb-4">
          Watch our quick tutorial or contact our support team for assistance with your first delivery.
        </p>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white text-green-700 rounded-lg font-medium hover:bg-green-50 transition">
            Watch Tutorial
          </button>
          <button className="px-4 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
