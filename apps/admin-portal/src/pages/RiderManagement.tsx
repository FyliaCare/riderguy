import { useState } from 'react';
import { Search, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function RiderManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const riders = [
    { id: 'R001', name: 'Michael Chen', email: 'michael@riderguy.com', phone: '+1234567890', status: 'active', level: 5, rating: 4.8, tasksCompleted: 342, verificationStatus: 'verified' },
    { id: 'R002', name: 'Sarah Johnson', email: 'sarah@riderguy.com', phone: '+1234567891', status: 'active', level: 3, rating: 4.6, tasksCompleted: 156, verificationStatus: 'verified' },
    { id: 'R003', name: 'David Lee', email: 'david@riderguy.com', phone: '+1234567892', status: 'pending', level: 1, rating: null, tasksCompleted: 0, verificationStatus: 'pending' },
  ];

  const statusColors = {
    active: 'bg-green-100 text-green-700',
    inactive: 'bg-gray-100 text-gray-700',
    suspended: 'bg-red-100 text-red-700',
    pending: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Rider Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Total Riders</p>
          <p className="text-2xl font-bold">{riders.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Active Now</p>
          <p className="text-2xl font-bold">{riders.filter(r => r.status === 'active').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Pending Verification</p>
          <p className="text-2xl font-bold">{riders.filter(r => r.verificationStatus === 'pending').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Avg Rating</p>
          <p className="text-2xl font-bold">4.7 ⭐</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search riders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rider</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tasks</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verification</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {riders.map((rider) => (
                <tr key={rider.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{rider.name}</div>
                      <div className="text-sm text-gray-500">{rider.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{rider.email}</div>
                    <div className="text-sm text-gray-500">{rider.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Level {rider.level}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {rider.rating ? `⭐ ${rider.rating}` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {rider.tasksCompleted}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[rider.status as keyof typeof statusColors]}`}>
                      {rider.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {rider.verificationStatus === 'verified' ? (
                      <CheckCircle className="text-green-600" size={20} />
                    ) : rider.verificationStatus === 'rejected' ? (
                      <XCircle className="text-red-600" size={20} />
                    ) : (
                      <Clock className="text-yellow-600" size={20} />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-3">
                      View
                    </button>
                    {rider.verificationStatus === 'pending' && (
                      <button className="text-blue-600 hover:text-blue-900">
                        Verify
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
