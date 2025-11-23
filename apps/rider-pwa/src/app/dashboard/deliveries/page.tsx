'use client';

import { useState } from 'react';
import { SEOHead } from '@/components/seo-head';
import {
  Package,
  MapPin,
  Clock,
  DollarSign,
  Phone,
  Navigation,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Search,
  Filter,
  Calendar,
  Download,
} from 'lucide-react';
import Link from 'next/link';

export default function DeliveriesPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'history' | 'scheduled'>('active');
  const [searchQuery, setSearchQuery] = useState('');

  const activeDeliveries = [
    {
      id: '#DEL-2850',
      customer: 'Akua Sarpong',
      pickup: 'KFC, Oxford Street',
      dropoff: 'Ridge Tower, Ridge',
      distance: '3.2 km',
      amount: 45.50,
      status: 'In Transit',
      phone: '+233 24 123 4567',
      eta: '15 mins',
      priority: 'high',
    },
    {
      id: '#DEL-2849',
      customer: 'Yaw Boateng',
      pickup: 'Max Mart, Osu',
      dropoff: 'Cantonments',
      distance: '2.8 km',
      amount: 38.00,
      status: 'Picked Up',
      phone: '+233 20 987 6543',
      eta: '20 mins',
      priority: 'normal',
    },
  ];

  const deliveryHistory = [
    {
      id: '#DEL-2848',
      customer: 'Kwame Mensah',
      location: 'Osu, Accra',
      amount: 45.50,
      status: 'Delivered',
      time: '2 hours ago',
      rating: 5,
    },
    {
      id: '#DEL-2847',
      customer: 'Ama Frimpong',
      location: 'East Legon',
      amount: 38.00,
      status: 'Delivered',
      time: '3 hours ago',
      rating: 5,
    },
    {
      id: '#DEL-2846',
      customer: 'Kofi Asante',
      location: 'Airport Residential',
      amount: 52.25,
      status: 'Delivered',
      time: '4 hours ago',
      rating: 4,
    },
    {
      id: '#DEL-2845',
      customer: 'Abena Osei',
      location: 'Labone',
      amount: 41.75,
      status: 'Cancelled',
      time: '5 hours ago',
      rating: null,
    },
  ];

  const scheduledDeliveries = [
    {
      id: '#DEL-SCH-101',
      customer: 'Mensah Corp',
      pickup: 'Warehouse A, Tema',
      dropoff: 'Office Complex, Airport',
      scheduledTime: 'Tomorrow, 9:00 AM',
      amount: 125.00,
      items: 3,
    },
    {
      id: '#DEL-SCH-102',
      customer: 'Afia Restaurant',
      pickup: 'Central Kitchen',
      dropoff: 'Multiple locations',
      scheduledTime: 'Tomorrow, 12:00 PM',
      amount: 180.00,
      items: 8,
    },
  ];

  return (
    <>
      <SEOHead
        title="Deliveries"
        description="Manage your active, scheduled, and completed deliveries"
        keywords={['deliveries', 'orders', 'delivery tracking', 'delivery history']}
        canonicalPath="/dashboard/deliveries"
      />
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Deliveries</h1>
          <p className="text-gray-600 mt-1">Manage your delivery orders</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('active')}
            className={`
              flex-1 px-6 py-3 rounded-xl font-medium transition-all
              ${activeTab === 'active'
                ? 'bg-green-50 text-green-600 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
              }
            `}
          >
            Active ({activeDeliveries.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`
              flex-1 px-6 py-3 rounded-xl font-medium transition-all
              ${activeTab === 'history'
                ? 'bg-green-50 text-green-600 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
              }
            `}
          >
            History ({deliveryHistory.length})
          </button>
          <button
            onClick={() => setActiveTab('scheduled')}
            className={`
              flex-1 px-6 py-3 rounded-xl font-medium transition-all
              ${activeTab === 'scheduled'
                ? 'bg-green-50 text-green-600 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
              }
            `}
          >
            Scheduled ({scheduledDeliveries.length})
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order ID, customer name, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-green-500 transition-colors"
          />
        </div>
      </div>

      {/* Active Deliveries */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {activeDeliveries.map((delivery) => (
            <div
              key={delivery.id}
              className="bg-white rounded-2xl shadow-sm border-2 border-green-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900">{delivery.id}</span>
                    {delivery.priority === 'high' && (
                      <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                        High Priority
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">{delivery.customer}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                  {delivery.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pickup</p>
                    <p className="font-medium text-gray-900">{delivery.pickup}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Drop-off</p>
                    <p className="font-medium text-gray-900">{delivery.dropoff}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 mb-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Navigation className="w-4 h-4" />
                  <span>{delivery.distance}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>ETA: {delivery.eta}</span>
                </div>
                <div className="flex items-center gap-2 font-semibold text-gray-900">
                  <DollarSign className="w-4 h-4" />
                  <span>GH₵{delivery.amount}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={`tel:${delivery.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Customer
                </a>
                <Link
                  href={`/dashboard/deliveries/${delivery.id.replace('#', '')}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  Navigate
                </Link>
              </div>
            </div>
          ))}

          {activeDeliveries.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Active Deliveries</h3>
              <p className="text-gray-600">You don't have any active orders at the moment</p>
            </div>
          )}
        </div>
      )}

      {/* Delivery History */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Time</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {deliveryHistory.map((delivery) => (
                  <tr key={delivery.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{delivery.id}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{delivery.customer}</td>
                    <td className="px-6 py-4 text-gray-600">{delivery.location}</td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">GH₵{delivery.amount}</span>
                    </td>
                    <td className="px-6 py-4">
                      {delivery.status === 'Delivered' ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          Delivered
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                          <XCircle className="w-3 h-3" />
                          Cancelled
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{delivery.time}</td>
                    <td className="px-6 py-4">
                      {delivery.rating ? (
                        <div className="flex items-center gap-1">
                          {[...Array(delivery.rating)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Scheduled Deliveries */}
      {activeTab === 'scheduled' && (
        <div className="space-y-4">
          {scheduledDeliveries.map((delivery) => (
            <div
              key={delivery.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="font-bold text-gray-900">{delivery.id}</span>
                  <p className="text-gray-600 mt-1">{delivery.customer}</p>
                </div>
                <div className="flex items-center gap-2 text-orange-600 text-sm font-medium">
                  <Calendar className="w-4 h-4" />
                  {delivery.scheduledTime}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pickup</p>
                    <p className="font-medium text-gray-900">{delivery.pickup}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Drop-off</p>
                    <p className="font-medium text-gray-900">{delivery.dropoff}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Package className="w-4 h-4" />
                    <span>{delivery.items} items</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-gray-900">
                    <DollarSign className="w-4 h-4" />
                    <span>GH₵{delivery.amount}</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}
