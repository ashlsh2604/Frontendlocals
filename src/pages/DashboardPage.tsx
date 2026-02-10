import { useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { StatusBadge } from '../components/StatusBadge';
import { Eye, MapPin, Calendar } from 'lucide-react';

const mockRequests = [
  {
    id: 1,
    placeName: 'ABC PG',
    city: 'Bangalore',
    placeType: 'PG/Hostel',
    status: 'completed' as const,
    requestDate: '2026-02-08',
    completionDate: '2026-02-09',
  },
  {
    id: 2,
    placeName: 'XYZ Hotel',
    city: 'Mumbai',
    placeType: 'Hotel',
    status: 'in-progress' as const,
    requestDate: '2026-02-10',
    completionDate: null,
  },
  {
    id: 3,
    placeName: 'DEF International School',
    city: 'Delhi',
    placeType: 'School/College',
    status: 'pending' as const,
    requestDate: '2026-02-10',
    completionDate: null,
  },
];

export function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Verifications</h1>
            <p className="text-gray-600">Track your verification requests and view reports</p>
          </div>

          {mockRequests.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="max-w-md mx-auto">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No verifications yet</h3>
                <p className="text-gray-600 mb-6">
                  Start by requesting a verification for a location you want to check out.
                </p>
                <button
                  onClick={() => navigate('/request')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Request Verification
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockRequests.map(request => (
                <div key={request.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                          {request.placeName}
                        </h3>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          {request.city}
                        </div>
                      </div>
                      <StatusBadge status={request.status} />
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        Requested: {new Date(request.requestDate).toLocaleDateString()}
                      </div>
                      {request.completionDate && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          Completed: {new Date(request.completionDate).toLocaleDateString()}
                        </div>
                      )}
                      <div className="text-sm text-gray-600">
                        Type: {request.placeType}
                      </div>
                    </div>

                    {request.status === 'completed' ? (
                      <button
                        onClick={() => navigate(`/report/${request.id}`)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Report
                      </button>
                    ) : request.status === 'in-progress' ? (
                      <div className="text-center py-2 text-sm text-gray-600">
                        Local verifier is on the way...
                      </div>
                    ) : (
                      <div className="text-center py-2 text-sm text-gray-600">
                        Waiting for local assignment
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/request')}
              className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              + New Verification Request
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
