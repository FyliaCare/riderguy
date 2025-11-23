export default function RiderMap() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Rider Map</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
          <div className="text-center">
            <p className="text-gray-500 mb-2">Map Integration</p>
            <p className="text-sm text-gray-400">
              Mapbox GL integration - requires API key
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
