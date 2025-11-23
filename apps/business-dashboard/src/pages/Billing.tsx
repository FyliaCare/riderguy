import { Download, CreditCard, FileText, Calendar, DollarSign } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  invoiceUrl?: string;
}

export default function Billing() {
  const transactions: Transaction[] = [
    {
      id: 'INV-001',
      date: '2025-11-20',
      description: 'Delivery Services - November 2025',
      amount: 15420,
      status: 'paid',
      invoiceUrl: '#'
    },
    {
      id: 'INV-002',
      date: '2025-10-20',
      description: 'Delivery Services - October 2025',
      amount: 12850,
      status: 'paid',
      invoiceUrl: '#'
    },
    {
      id: 'INV-003',
      date: '2025-09-20',
      description: 'Delivery Services - September 2025',
      amount: 14200,
      status: 'paid',
      invoiceUrl: '#'
    },
  ];

  const paymentMethods = [
    {
      id: '1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/25',
      isDefault: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Billing & Invoices</h1>
        <p className="text-gray-600">Manage your payments and download invoices</p>
      </div>

      {/* Current Balance */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-6 h-6" />
            <span className="text-green-100">Current Balance</span>
          </div>
          <p className="text-4xl font-bold mb-1">₦0.00</p>
          <p className="text-green-100 text-sm">No pending charges</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            <span className="text-gray-600">This Month</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">₦1,842</p>
          <p className="text-sm text-gray-500">247 deliveries</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-6 h-6 text-purple-600" />
            <span className="text-gray-600">Total Spent</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">₦42,470</p>
          <p className="text-sm text-gray-500">Last 3 months</p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium">
            Add Payment Method
          </button>
        </div>

        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900">
                      {method.brand} •••• {method.last4}
                    </p>
                    {method.isDefault && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                </div>
              </div>
              <button className="text-sm text-gray-600 hover:text-gray-900">Edit</button>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900">{transaction.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(transaction.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₦{transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        transaction.status
                      )}`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Billing Settings */}
      <div className="mt-6 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Billing Settings</h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-5 h-5 text-green-600 rounded focus:ring-green-600" />
            <div>
              <p className="font-medium text-gray-900">Email invoices</p>
              <p className="text-sm text-gray-600">Receive invoices via email automatically</p>
            </div>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-green-600 rounded focus:ring-green-600"
            />
            <div>
              <p className="font-medium text-gray-900">Auto-pay</p>
              <p className="text-sm text-gray-600">Automatically charge default payment method</p>
            </div>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-5 h-5 text-green-600 rounded focus:ring-green-600" />
            <div>
              <p className="font-medium text-gray-900">Payment reminders</p>
              <p className="text-sm text-gray-600">Get notified 3 days before payment is due</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
