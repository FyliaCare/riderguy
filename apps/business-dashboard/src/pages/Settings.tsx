import { useState } from 'react';
import { useAuthStore } from '../stores/auth.store';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Key,
  Bell,
  Shield,
  Users,
  Save
} from 'lucide-react';

export default function Settings() {
  const { business, updateBusiness } = useAuthStore();
  const [activeTab, setActiveTab] = useState('business');

  const [businessInfo, setBusinessInfo] = useState({
    name: business?.name || '',
    email: business?.email || '',
    phone: business?.phone || '',
    businessType: business?.businessType || '',
    address: business?.address || '',
    website: ''
  });

  const handleSaveBusinessInfo = () => {
    updateBusiness(businessInfo);
    alert('Business information updated successfully!');
  };

  const tabs = [
    { id: 'business', label: 'Business Profile', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'team', label: 'Team Members', icon: Users },
    { id: 'api', label: 'API & Integrations', icon: Key },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                    activeTab === tab.id
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'business' && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Business Profile</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Business Name
                    </div>
                  </label>
                  <input
                    type="text"
                    value={businessInfo.name}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </div>
                    </label>
                    <input
                      type="email"
                      value={businessInfo.email}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Number
                      </div>
                    </label>
                    <input
                      type="tel"
                      value={businessInfo.phone}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Type
                  </label>
                  <select
                    value={businessInfo.businessType}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, businessType: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                  >
                    <option value="">Select type</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="retail">Retail</option>
                    <option value="pharmacy">Pharmacy</option>
                    <option value="grocery">Grocery</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Business Address
                    </div>
                  </label>
                  <textarea
                    value={businessInfo.address}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Website (Optional)
                    </div>
                  </label>
                  <input
                    type="url"
                    value={businessInfo.website}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, website: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                    placeholder="https://yourbusiness.com"
                  />
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleSaveBusinessInfo}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Delivery Updates</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-green-600 rounded focus:ring-green-600" />
                      <span className="text-gray-700">Delivery assigned to rider</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-green-600 rounded focus:ring-green-600" />
                      <span className="text-gray-700">Pickup completed</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-green-600 rounded focus:ring-green-600" />
                      <span className="text-gray-700">Delivery completed</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Billing & Payments</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-green-600 rounded focus:ring-green-600" />
                      <span className="text-gray-700">Payment successful</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-green-600 rounded focus:ring-green-600" />
                      <span className="text-gray-700">Payment failed</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="w-5 h-5 text-green-600 rounded focus:ring-green-600" />
                      <span className="text-gray-700">Monthly invoice ready</span>
                    </label>
                  </div>
                </div>

                <div className="pt-4">
                  <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Change Password</h3>
                  <div className="space-y-4">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                    />
                    <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
                      Update Password
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <button className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                  Invite Member
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">
                Manage team members who can access your business dashboard
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{business?.email}</p>
                    <p className="text-sm text-gray-500">Owner</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded">
                    You
                  </span>
                </div>
                <div className="text-center py-8 text-gray-500">
                  No team members yet. Invite your team to collaborate.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">API & Integrations</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Enterprise Feature:</strong> API access is available for Enterprise plan subscribers.
                  </p>
                </div>

                {business?.tier === 'enterprise' && (
                  <>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">API Keys</h3>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                        Generate API Key
                      </button>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Webhooks</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Receive real-time notifications about delivery events
                      </p>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                        Configure Webhooks
                      </button>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Documentation</h3>
                      <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                        View API Documentation →
                      </a>
                    </div>
                  </>
                )}

                {business?.tier !== 'enterprise' && (
                  <div className="text-center py-8">
                    <Key className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-4">Upgrade to Enterprise to access API features</p>
                    <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                      Upgrade Plan
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
