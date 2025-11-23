import { useState } from 'react';
import { Search, Download, MapPin, Clock, Package, Eye } from 'lucide-react';

interface Delivery {
  id: string;
  trackingId: string;
  pickup: string;
  delivery: string;
  status: 'pending' | 'picked-up' | 'in-transit' | 'delivered' | 'cancelled';
  cost: number;
  date: string;
  rider?: string;
}

export default function Deliveries() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const deliveries: Delivery[] = [
    {
      id: '1',
      trackingId: 'DEL-001',
      pickup: '123 Main St, Lagos',
      delivery: '456 Oak Ave, Lagos',
      status: 'in-transit',
      cost: 1250,
      date: '2025-11-22 14:30',
      rider: 'John Rider'
    },
    {
      id: '2',
      trackingId: 'DEL-002',
      pickup: '789 Pine Rd, Lagos',
      delivery: '321 Elm St, Lagos',
      status: 'delivered',
      cost: 850,
      date: '2025-11-22 12:15',
      rider: 'Jane Courier'
    },
    {
      id: '3',
      trackingId: 'DEL-003',
      pickup: '555 Market St, Lagos',
      delivery: '777 Hill Rd, Lagos',
      status: 'picked-up',
      cost: 1500,
      date: '2025-11-22 15:00',
      rider: 'Mike Swift'
    },
    {
      id: '4',
      trackingId: 'DEL-004',
      pickup: '999 Center Ave, Lagos',
      delivery: '111 Park Lane, Lagos',
      status: 'pending',
      cost: 950,
      date: '2025-11-22 16:00'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'in-transit':
        return 'bg-blue-100 text-blue-700';
      case 'picked-up':
        return 'bg-yellow-100 text-yellow-700';
      case 'pending':
        return 'bg-gray-100 text-gray-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch =
      delivery.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.delivery.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === 'all' || delivery.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deliveries</h1>
          <p className="text-gray-600">Track and manage all your deliveries</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by tracking ID, address..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="picked-up">Picked Up</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Total</p>
          <p className="text-2xl font-bold text-gray-900">{deliveries.length}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <p className="text-sm text-blue-600 mb-1">In Transit</p>
          <p className="text-2xl font-bold text-blue-900">
            {deliveries.filter((d) => d.status === 'in-transit').length}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-100">
          <p className="text-sm text-green-600 mb-1">Delivered</p>
          <p className="text-2xl font-bold text-green-900">
            {deliveries.filter((d) => d.status === 'delivered').length}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Pending</p>
          <p className="text-2xl font-bold text-gray-900">
            {deliveries.filter((d) => d.status === 'pending').length}
          </p>
        </div>
      </div>

      {/* Deliveries Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tracking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDeliveries.map((delivery) => (
                <tr key={delivery.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{delivery.trackingId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-start gap-2 mb-1">
                        <MapPin className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-900">{delivery.pickup}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3 h-3 text-blue-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">{delivery.delivery}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        delivery.status
                      )}`}
                    >
                      {delivery.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {delivery.rider || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₦{delivery.cost.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {delivery.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDeliveries.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No deliveries found</p>
          </div>
        )}
      </div>
    </div>
  );
}
