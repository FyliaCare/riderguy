import { useState } from 'react';
import { MapPin, Package } from 'lucide-react';

export default function NewDelivery() {
  const [formData, setFormData] = useState({
    pickupAddress: '',
    pickupContact: '',
    pickupPhone: '',
    deliveryAddress: '',
    deliveryContact: '',
    deliveryPhone: '',
    packageType: '',
    packageWeight: '',
    deliveryDate: '',
    deliveryTime: 'immediate',
    specialInstructions: '',
  });

  const [estimatedCost, setEstimatedCost] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send to task service at http://localhost:4003/api/tasks
    console.log('New Delivery Request:', formData);
    alert('Delivery request submitted successfully!');
  };

  const calculateCost = () => {
    // Simple pricing calculation (can be enhanced)
    const baseCost = 500;
    const weightMultiplier = parseFloat(formData.packageWeight) || 1;
    const urgencyMultiplier = formData.deliveryTime === 'immediate' ? 1.5 : 1;
    const total = baseCost * weightMultiplier * urgencyMultiplier;
    setEstimatedCost(total);
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Delivery</h1>
        <p className="text-gray-600">Fill in the details to book a delivery</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Pickup Information */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" />
            Pickup Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Address *
              </label>
              <input
                type="text"
                required
                value={formData.pickupAddress}
                onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                placeholder="123 Business Street, Lagos"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Name *
              </label>
              <input
                type="text"
                required
                value={formData.pickupContact}
                onChange={(e) => setFormData({ ...formData, pickupContact: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.pickupPhone}
                onChange={(e) => setFormData({ ...formData, pickupPhone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                placeholder="+234 123 456 7890"
              />
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            Delivery Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Address *
              </label>
              <input
                type="text"
                required
                value={formData.deliveryAddress}
                onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                placeholder="456 Customer Avenue, Lagos"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient Name *
              </label>
              <input
                type="text"
                required
                value={formData.deliveryContact}
                onChange={(e) => setFormData({ ...formData, deliveryContact: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                placeholder="Jane Smith"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient Phone *
              </label>
              <input
                type="tel"
                required
                value={formData.deliveryPhone}
                onChange={(e) => setFormData({ ...formData, deliveryPhone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                placeholder="+234 987 654 3210"
              />
            </div>
          </div>
        </div>

        {/* Package Details */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-purple-600" />
            Package Details
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Package Type *
              </label>
              <select
                required
                value={formData.packageType}
                onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
              >
                <option value="">Select type</option>
                <option value="documents">Documents</option>
                <option value="food">Food</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="groceries">Groceries</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg) *
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.packageWeight}
                onChange={(e) => {
                  setFormData({ ...formData, packageWeight: e.target.value });
                  calculateCost();
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                placeholder="1.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Time *
              </label>
              <select
                required
                value={formData.deliveryTime}
                onChange={(e) => {
                  setFormData({ ...formData, deliveryTime: e.target.value });
                  calculateCost();
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
              >
                <option value="immediate">Immediate (within 1 hour)</option>
                <option value="same-day">Same Day</option>
                <option value="scheduled">Schedule for Later</option>
              </select>
            </div>

            {formData.deliveryTime === 'scheduled' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scheduled Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                />
              </div>
            )}

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Instructions (Optional)
              </label>
              <textarea
                value={formData.specialInstructions}
                onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                placeholder="Handle with care, fragile items..."
              />
            </div>
          </div>
        </div>

        {/* Cost Estimate */}
        {estimatedCost > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-1">Estimated Cost</h3>
                <p className="text-sm text-green-700">Based on distance, weight, and delivery time</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-green-600">₦{estimatedCost.toFixed(2)}</p>
                <p className="text-xs text-green-700">Final cost may vary</p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            <Package className="w-5 h-5" />
            Book Delivery
          </button>
        </div>
      </form>
    </div>
  );
}
