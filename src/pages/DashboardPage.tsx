import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { StatusBadge } from '../components/StatusBadge';
import { Eye, MapPin, Calendar, TrendingUp, Clock, Award, Zap, Filter, Search, Bell, Star, Flame, Target, Gift, ChevronRight, Map, Activity, CreditCard, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

const mockRequests = [
  {
    id: 1,
    placeName: 'ABC PG',
    city: 'Bangalore',
    placeType: 'PG/Hostel',
    status: 'completed' as const,
    requestDate: '2026-02-08',
    completionDate: '2026-02-09',
    trustScore: 4.7,
    verifier: 'Raj Kumar',
  },
  {
    id: 2,
    placeName: 'XYZ Hotel',
    city: 'Mumbai',
    placeType: 'Hotel',
    status: 'in-progress' as const,
    requestDate: '2026-02-10',
    completionDate: null,
    trustScore: null,
    verifier: 'Priya Sharma',
    progress: 65,
  },
  {
    id: 3,
    placeName: 'DEF International School',
    city: 'Delhi',
    placeType: 'School/College',
    status: 'pending' as const,
    requestDate: '2026-02-10',
    completionDate: null,
    trustScore: null,
    verifier: null,
  },
  {
    id: 4,
    placeName: 'FitZone Premium Gym',
    city: 'Pune',
    placeType: 'Gym',
    status: 'completed' as const,
    requestDate: '2026-02-07',
    completionDate: '2026-02-08',
    trustScore: 4.9,
    verifier: 'Amit Patel',
  },
  {
    id: 5,
    placeName: 'Green Valley Apartments',
    city: 'Hyderabad',
    placeType: 'Neighborhood',
    status: 'completed' as const,
    requestDate: '2026-02-05',
    completionDate: '2026-02-06',
    trustScore: 4.6,
    verifier: 'Neha Singh',
  },
];

const recentActivity = [
  { id: 1, action: 'Verification completed', place: 'ABC PG', time: '2 hours ago', icon: CheckCircle2, color: 'text-green-500' },
  { id: 2, action: 'Verifier assigned', place: 'XYZ Hotel', time: '5 hours ago', icon: Users, color: 'text-blue-500' },
  { id: 3, action: 'Credits earned', amount: '+50', time: '1 day ago', icon: CreditCard, color: 'text-purple-500' },
  { id: 4, action: 'New badge unlocked', badge: 'Explorer', time: '2 days ago', icon: Award, color: 'text-yellow-500' },
];

export function DashboardPage() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'in-progress' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRequests = mockRequests.filter(request => {
    const matchesFilter = filterStatus === 'all' || request.status === filterStatus;
    const matchesSearch = request.placeName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         request.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    totalVerifications: mockRequests.length,
    completed: mockRequests.filter(r => r.status === 'completed').length,
    inProgress: mockRequests.filter(r => r.status === 'in-progress').length,
    credits: 450,
    streak: 7,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navbar />
      
      <div className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                  Welcome Back! 👋
                </h1>
                <p className="text-gray-600 text-lg">Track your verifications and explore new places</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-full shadow-lg"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
              </motion.button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {/* Total Verifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden"
            >
              <motion.div 
                className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />
              <TrendingUp className="w-8 h-8 mb-3 opacity-90" />
              <p className="text-sm opacity-90 mb-1">Total Verifications</p>
              <p className="text-3xl font-black">{stats.totalVerifications}</p>
            </motion.div>

            {/* Completed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden"
            >
              <motion.div 
                className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              <CheckCircle2 className="w-8 h-8 mb-3 opacity-90" />
              <p className="text-sm opacity-90 mb-1">Completed</p>
              <p className="text-3xl font-black">{stats.completed}</p>
            </motion.div>

            {/* In Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden"
            >
              <motion.div 
                className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <Clock className="w-8 h-8 mb-3 opacity-90" />
              <p className="text-sm opacity-90 mb-1">In Progress</p>
              <p className="text-3xl font-black">{stats.inProgress}</p>
            </motion.div>

            {/* Credits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden"
            >
              <motion.div 
                className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <CreditCard className="w-8 h-8 mb-3 opacity-90" />
              <p className="text-sm opacity-90 mb-1">Credits Balance</p>
              <p className="text-3xl font-black">{stats.credits}</p>
            </motion.div>

            {/* Streak */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden"
            >
              <motion.div 
                className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
              <Flame className="w-8 h-8 mb-3 opacity-90" />
              <p className="text-sm opacity-90 mb-1">Day Streak</p>
              <p className="text-3xl font-black">{stats.streak} 🔥</p>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/request')}
                className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all group"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-bold text-gray-900">New Request</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl transition-all group"
              >
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Map className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-bold text-gray-900">Explore Map</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition-all group"
              >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-bold text-gray-900">My Badges</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-xl transition-all group"
              >
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-bold text-gray-900">Rewards</span>
              </motion.button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Main Verifications List */}
            <div className="lg:col-span-2">
              {/* Search and Filters */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search verifications..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  {/* Filter Buttons */}
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setFilterStatus('all')}
                      className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                        filterStatus === 'all'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilterStatus('completed')}
                      className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                        filterStatus === 'completed'
                          ? 'bg-green-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Completed
                    </button>
                    <button
                      onClick={() => setFilterStatus('in-progress')}
                      className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                        filterStatus === 'in-progress'
                          ? 'bg-yellow-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Active
                    </button>
                  </div>
                </div>
              </div>

              {/* Verifications Cards */}
              {filteredRequests.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl shadow-lg p-12 text-center"
                >
                  <div className="max-w-md mx-auto">
                    <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No verifications found</h3>
                    <p className="text-gray-600 mb-6">
                      {searchQuery ? 'Try adjusting your search or filters' : 'Start by requesting a verification for a location you want to check out.'}
                    </p>
                    <button
                      onClick={() => navigate('/request')}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg"
                    >
                      Request Verification
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {filteredRequests.map((request, index) => (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
                      onClick={() => request.status === 'completed' && navigate(`/report/${request.id}`)}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-gray-900">
                                {request.placeName}
                              </h3>
                              <StatusBadge status={request.status} />
                            </div>
                            <div className="flex items-center text-gray-600 text-sm mb-2">
                              <MapPin className="w-4 h-4 mr-1" />
                              {request.city} • {request.placeType}
                            </div>
                            {request.verifier && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Users className="w-4 h-4" />
                                Verified by {request.verifier}
                              </div>
                            )}
                          </div>
                          
                          {request.trustScore && (
                            <div className="flex items-center gap-2 bg-gradient-to-br from-yellow-50 to-orange-50 px-4 py-2 rounded-xl">
                              <Star className="w-5 h-5 text-yellow-500 fill-current" />
                              <span className="font-bold text-gray-900">{request.trustScore}</span>
                            </div>
                          )}
                        </div>

                        {/* Progress Bar for In-Progress */}
                        {request.status === 'in-progress' && request.progress && (
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-gray-600">Verification Progress</span>
                              <span className="font-bold text-blue-600">{request.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${request.progress}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                              />
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(request.requestDate).toLocaleDateString()}
                          </div>

                          {request.status === 'completed' ? (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/report/${request.id}`);
                              }}
                              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-lg"
                            >
                              <Eye className="w-4 h-4" />
                              View Report
                              <ChevronRight className="w-4 h-4" />
                            </motion.button>
                          ) : request.status === 'in-progress' ? (
                            <div className="flex items-center gap-2 text-sm font-semibold text-yellow-600 bg-yellow-50 px-4 py-2 rounded-lg">
                              <Activity className="w-4 h-4 animate-pulse" />
                              Verifier on the way...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-lg">
                              <AlertCircle className="w-4 h-4" />
                              Waiting for assignment
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Activity Feed Sidebar */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-blue-500" />
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
                    >
                      <div className={`w-10 h-10 ${activity.color} bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0`}>
                        <activity.icon className={`w-5 h-5 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600 truncate">
                          {activity.place || activity.amount || activity.badge}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Award className="w-6 h-6" />
                  Achievements
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl">
                      🏆
                    </div>
                    <div>
                      <p className="font-bold">Explorer</p>
                      <p className="text-sm opacity-90">5 verifications completed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-2xl">
                      🔥
                    </div>
                    <div>
                      <p className="font-bold">On Fire!</p>
                      <p className="text-sm opacity-90">7-day streak maintained</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Credits Promo */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden"
              >
                <motion.div
                  className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                  }}
                />
                <Gift className="w-10 h-10 mb-3" />
                <h3 className="text-xl font-bold mb-2">Earn More Credits!</h3>
                <p className="text-sm opacity-90 mb-4">
                  Complete verifications and earn up to 100 credits per task
                </p>
                <button className="bg-white text-orange-600 px-5 py-2 rounded-lg font-bold hover:bg-gray-100 transition-all">
                  Learn More
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
