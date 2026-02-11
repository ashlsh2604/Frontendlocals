import { useState } from 'react';
import { motion } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { TrustBadge, getTrustLevel } from '../components/TrustBadge';
import { TrustScoreMeter } from '../components/TrustScoreMeter';
import { CreditsDisplay } from '../components/CreditsDisplay';
import { VerificationCard } from '../components/VerificationCard';
import { 
  Award, 
  TrendingUp, 
  Target, 
  CheckCircle, 
  Clock,
  Star,
  Gift,
  Sparkles,
  ArrowRight,
  Trophy,
  Zap
} from 'lucide-react';

export function RewardsDashboard() {
  const [userStats] = useState({
    trustScore: 67,
    previousTrustScore: 62,
    credits: 1250,
    earnedToday: 150,
    totalVerifications: 23,
    completedToday: 3,
    accuracy: 94,
    responseRate: 98,
  });

  const trustLevel = getTrustLevel(userStats.trustScore);

  const recentVerifications = [
    {
      verifier: { name: 'Priya Sharma', trustScore: 67, totalVerifications: 23 },
      location: { name: 'Gold\'s Gym, Indiranagar', coordinates: '12.9716° N, 77.5946° E' },
      timestamp: new Date('2026-02-11T14:30:00'),
      media: { photos: 8, videos: 1 },
      status: 'verified' as const,
      completeness: 95,
      freshness: 'fresh' as const,
    },
    {
      verifier: { name: 'Priya Sharma', trustScore: 67, totalVerifications: 23 },
      location: { name: 'The Oberoi Hotel, Koramangala', coordinates: '12.9352° N, 77.6245° E' },
      timestamp: new Date('2026-02-10T16:45:00'),
      media: { photos: 12, videos: 2 },
      status: 'verified' as const,
      completeness: 100,
      freshness: 'fresh' as const,
    },
    {
      verifier: { name: 'Priya Sharma', trustScore: 67, totalVerifications: 23 },
      location: { name: 'HSR Layout Neighborhood Tour', coordinates: '12.9082° N, 77.6476° E' },
      timestamp: new Date('2026-02-09T11:20:00'),
      media: { photos: 15, videos: 3 },
      status: 'verified' as const,
      completeness: 98,
      freshness: 'recent' as const,
    },
  ];

  const benefits = [
    {
      level: 'verified',
      title: 'Unlock Verified Benefits',
      description: 'Complete 5 more verifications',
      progress: 60,
      rewards: ['Higher credits per task', 'Priority task visibility', 'Verified badge'],
      unlocked: true,
    },
    {
      level: 'trusted',
      title: 'Reach Trusted Status',
      description: '18 points needed',
      progress: 45,
      rewards: ['Bonus credits', 'Featured placement', 'Lower request costs'],
      unlocked: false,
    },
    {
      level: 'elite',
      title: 'Become Elite Local',
      description: 'Premium tier with exclusive perks',
      progress: 25,
      rewards: ['Maximum credits', 'Cash rewards', 'VIP recognition'],
      unlocked: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-24 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-8 h-8 text-pink-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
              Rewards & Trust
            </h1>
          </div>
          <p className="text-gray-600">Build your reputation, earn rewards, and unlock exclusive benefits</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Trust Score Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-2xl p-6 border border-pink-200 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Trust Score</h2>
              <TrustBadge level={trustLevel} score={userStats.trustScore} />
            </div>
            <TrustScoreMeter score={userStats.trustScore} previousScore={userStats.previousTrustScore} />
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-xl p-4 border border-pink-200 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Total Verifications</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{userStats.totalVerifications}</div>
              <div className="text-xs text-green-600 mt-1">+{userStats.completedToday} today</div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-pink-200 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Accuracy Rate</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{userStats.accuracy}%</div>
              <div className="text-xs text-gray-500 mt-1">Based on feedback</div>
            </div>
          </motion.div>
        </div>

        {/* Credits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <CreditsDisplay
            credits={userStats.credits}
            earnedToday={userStats.earnedToday}
          />
        </motion.div>

        {/* Benefits Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-pink-600" />
            Unlock More Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl p-6 border-2 ${
                  benefit.unlocked ? 'border-green-300 bg-green-50' : 'border-gray-200'
                } transition-all hover:shadow-lg`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                  {benefit.unlocked && (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  )}
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{benefit.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${benefit.progress}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-pink-600 to-red-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  {benefit.rewards.map((reward, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <Zap className="w-3 h-3 text-pink-600" />
                      <span>{reward}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Verifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Award className="w-6 h-6 text-pink-600" />
              Recent Verifications
            </h2>
            <button className="text-pink-600 hover:text-pink-700 font-medium text-sm flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentVerifications.map((verification, index) => (
              <VerificationCard key={index} {...verification} />
            ))}
          </div>
        </motion.div>

        {/* How to Improve */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-gradient-to-r from-pink-600 to-red-600 rounded-2xl p-6 text-white"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            How to Increase Your Trust Score
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Star className="w-8 h-8 mb-2" />
              <h4 className="font-bold mb-1">Complete More Verifications</h4>
              <p className="text-sm text-white/90">Each quality verification increases your score</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Clock className="w-8 h-8 mb-2" />
              <h4 className="font-bold mb-1">Upload Fresh Content</h4>
              <p className="text-sm text-white/90">Recent photos and videos boost freshness</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Gift className="w-8 h-8 mb-2" />
              <h4 className="font-bold mb-1">Maintain Consistency</h4>
              <p className="text-sm text-white/90">Regular, quality submissions build trust</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
