import { MessageSquare, Flag, CheckCircle } from 'lucide-react';

export default function ContentModeration() {
  const posts = [
    { id: '1', author: 'John Doe', content: 'Great service! Fast delivery...', type: 'post', status: 'pending', reports: 0, createdAt: '2024-11-22 10:30' },
    { id: '2', author: 'Jane Smith', content: 'Having issues with the app...', type: 'comment', status: 'flagged', reports: 2, createdAt: '2024-11-22 11:15' },
    { id: '3', author: 'Bob Wilson', content: 'Thanks for the help!', type: 'post', status: 'approved', reports: 0, createdAt: '2024-11-22 12:00' },
  ];

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    flagged: 'bg-red-100 text-red-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-gray-100 text-gray-700',
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Content Moderation</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold">{posts.filter(p => p.status === 'pending').length}</p>
            </div>
            <MessageSquare className="text-yellow-600" size={32} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Flagged</p>
              <p className="text-2xl font-bold">{posts.filter(p => p.status === 'flagged').length}</p>
            </div>
            <Flag className="text-red-600" size={32} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold">{posts.filter(p => p.status === 'approved').length}</p>
            </div>
            <CheckCircle className="text-green-600" size={32} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Content</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reports</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {post.author}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-md truncate">
                    {post.content}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {post.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[post.status as keyof typeof statusColors]}`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {post.reports}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {post.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {post.status === 'pending' || post.status === 'flagged' ? (
                    <>
                      <button className="text-green-600 hover:text-green-900 mr-3">
                        Approve
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Reject
                      </button>
                    </>
                  ) : (
                    <button className="text-primary-600 hover:text-primary-900">
                      View
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
