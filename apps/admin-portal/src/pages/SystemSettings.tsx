import { Settings, Bell, Shield, Database } from 'lucide-react';

export default function SystemSettings() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">System Settings</h1>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <Settings className="text-primary-600" size={24} />
              <h2 className="text-lg font-semibold">General Settings</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform Name
              </label>
              <input
                type="text"
                defaultValue="RiderGuy"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Support Email
              </label>
              <input
                type="email"
                defaultValue="support@riderguy.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maintenance Mode
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-600">Enable maintenance mode</span>
              </label>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <Bell className="text-primary-600" size={24} />
              <h2 className="text-lg font-semibold">Notification Settings</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Email Notifications</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">SMS Notifications</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Push Notifications</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </label>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <Shield className="text-primary-600" size={24} />
              <h2 className="text-lg font-semibold">Security Settings</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                defaultValue="30"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <label className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Require 2FA for Admins</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Enable Rate Limiting</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </label>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <Database className="text-primary-600" size={24} />
              <h2 className="text-lg font-semibold">Payment Settings</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commission Rate (%)
              </label>
              <input
                type="number"
                defaultValue="15"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Payout Amount ($)
              </label>
              <input
                type="number"
                defaultValue="50"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
