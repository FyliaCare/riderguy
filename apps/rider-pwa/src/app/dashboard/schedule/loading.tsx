export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>

      {/* View Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="flex gap-4 p-4 border-b">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-gray-200 rounded w-20"></div>
          ))}
        </div>
        
        {/* Calendar Grid */}
        <div className="p-6">
          {/* Week Days */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="h-8 bg-gray-200 rounded"></div>
            ))}
          </div>
          
          {/* Calendar Cells */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Shift List */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
