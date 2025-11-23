import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function Analytics() {
  const taskCompletionData = [
    { day: 'Mon', completed: 45, pending: 12 },
    { day: 'Tue', completed: 52, pending: 8 },
    { day: 'Wed', completed: 48, pending: 15 },
    { day: 'Thu', completed: 61, pending: 9 },
    { day: 'Fri', completed: 55, pending: 11 },
    { day: 'Sat', completed: 67, pending: 6 },
    { day: 'Sun', completed: 43, pending: 14 },
  ];

  const riderPerformanceData = [
    { hour: '6AM', active: 5 },
    { hour: '9AM', active: 15 },
    { hour: '12PM', active: 25 },
    { hour: '3PM', active: 22 },
    { hour: '6PM', active: 30 },
    { hour: '9PM', active: 18 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Total Tasks (Week)</p>
          <p className="text-2xl font-bold">371</p>
          <p className="text-sm text-green-600">↑ 12% from last week</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Completion Rate</p>
          <p className="text-2xl font-bold">94.2%</p>
          <p className="text-sm text-green-600">↑ 2.1% from last week</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Avg. Completion Time</p>
          <p className="text-2xl font-bold">28 min</p>
          <p className="text-sm text-red-600">↓ 3 min slower</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Active Riders</p>
          <p className="text-2xl font-bold">24</p>
          <p className="text-sm text-gray-600">Currently online</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Task Completion (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskCompletionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#22c55e" />
              <Bar dataKey="pending" fill="#eab308" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Active Riders (Today)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={riderPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="active" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Top Performing Riders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Rider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tasks Completed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Avg. Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { name: 'John Doe', tasks: 48, avgTime: '24 min', rating: 4.9 },
                { name: 'Jane Smith', tasks: 45, avgTime: '26 min', rating: 4.8 },
                { name: 'Mike Johnson', tasks: 42, avgTime: '25 min', rating: 4.7 },
              ].map((rider, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {rider.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {rider.tasks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {rider.avgTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ⭐ {rider.rating}
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
