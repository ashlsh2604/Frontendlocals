import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { User, Mail, Phone, MapPin, Shield, CreditCard, Edit2, Save, X, CheckCircle, Camera, Lock, Smartphone, Key, Coins, TrendingUp, Award, Gift, ArrowRight, Zap, Bell, Eye, EyeOff, LogOut, Image as ImageIcon, Video, History, FileText, Star, Clock, Building2, Dumbbell, Home, Search, MousePointerClick } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function AccountPage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isProfilePicModalOpen, setIsProfilePicModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [historyTab, setHistoryTab] = useState<'verifications' | 'browsing'>('verifications');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  
  const [profileData, setProfileData] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    city: 'Bangalore',
    joinDate: 'January 2026',
    verified: true,
  });

  const [editData, setEditData] = useState(profileData);

  const creditsData = {
    balance: 450,
    earned: 850,
    spent: 400,
    history: [
      { id: 1, type: 'earned', amount: 50, description: 'Review verified', date: '2026-02-09', icon: CheckCircle, color: 'green' },
      { id: 2, type: 'spent', amount: -30, description: 'Verification request', date: '2026-02-08', icon: ArrowRight, color: 'blue' },
      { id: 3, type: 'earned', amount: 100, description: 'Photo verification bonus', date: '2026-02-07', icon: Camera, color: 'purple' },
      { id: 4, type: 'earned', amount: 50, description: 'Review verified', date: '2026-02-06', icon: CheckCircle, color: 'green' },
    ]
  };

  // Recent Verifications History
  const verificationHistory = [
    {
      id: 1,
      placeName: 'Sunrise Grand Hotel',
      placeType: 'Hotel',
      location: 'Indiranagar, Bangalore',
      date: '2026-02-09',
      status: 'Completed',
      trustScore: 92,
      icon: Building2,
      color: 'blue',
    },
    {
      id: 2,
      placeName: 'FitZone Premium Gym',
      placeType: 'Gym',
      location: 'Koramangala, Bangalore',
      date: '2026-02-08',
      status: 'Completed',
      trustScore: 88,
      icon: Dumbbell,
      color: 'green',
    },
    {
      id: 3,
      placeName: 'ABC PG',
      placeType: 'PG/Hostel',
      location: 'HSR Layout, Bangalore',
      date: '2026-02-06',
      status: 'Completed',
      trustScore: 87,
      icon: Home,
      color: 'purple',
    },
  ];

  // Browsing Activity History
  const browsingActivity = [
    {
      id: 1,
      action: 'Viewed verification report',
      page: 'Sunrise Grand Hotel',
      time: '2 hours ago',
      icon: MousePointerClick,
      color: 'blue',
    },
    {
      id: 2,
      action: 'Searched for gyms',
      page: 'Nearby Places',
      time: '5 hours ago',
      icon: Search,
      color: 'purple',
    },
    {
      id: 3,
      action: 'Added review',
      page: 'FitZone Premium Gym',
      time: '1 day ago',
      icon: Star,
      color: 'yellow',
    },
    {
      id: 4,
      action: 'Viewed nearby places',
      page: 'Koramangala Area',
      time: '1 day ago',
      icon: MapPin,
      color: 'orange',
    },
    {
      id: 5,
      action: 'Checked dashboard',
      page: 'Dashboard',
      time: '2 days ago',
      icon: Clock,
      color: 'pink',
    },
  ];

  // Floating particles data
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 8 + 8,
    delay: Math.random() * 3,
  }));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 10 - 5,
        y: (e.clientY / window.innerHeight) * 10 - 5,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleToggle2FA = () => {
    if (!twoFactorEnabled) {
      setShowVerificationCode(true);
    } else {
      setTwoFactorEnabled(false);
    }
  };

  const handleVerificationCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }

      // Auto-verify when all digits entered
      if (newCode.every(digit => digit) && index === 5) {
        setTimeout(() => {
          setTwoFactorEnabled(true);
          setShowVerificationCode(false);
          setVerificationCode(['', '', '', '', '', '']);
        }, 500);
      }
    }
  };

  const handleLogout = () => {
    // In a real app, you would clear authentication tokens and session data
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/');
    }
  };

  const handleChoosePhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setProfilePicture(event.target?.result as string);
          setIsProfilePicModalOpen(false);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleTakePhoto = () => {
    // In a real app, this would open the device camera
    // For now, we'll simulate it with a file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment' as any; // Opens camera on mobile devices
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setProfilePicture(event.target?.result as string);
          setIsProfilePicModalOpen(false);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-hidden">
      <Navbar />
      
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Base dark layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-950 via-magenta-950 to-pink-950" />
        
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(236, 72, 153, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(236, 72, 153, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />

        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-fuchsia-400 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 1, 0],
              scale: [0, particle.size, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black" />
      </div>

      <div className="flex-1 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Account Settings
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Manage your profile, security, and credits
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Profile Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl rounded-3xl"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                />

                <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      Profile Information
                    </h2>
                    {!isEditing ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </motion.button>
                    ) : (
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleSave}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleCancel}
                          className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-xl font-semibold shadow-lg"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </motion.button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      ) : (
                        <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl">
                          <User className="w-5 h-5 text-blue-400" />
                          <span className="text-white font-medium">{profileData.name}</span>
                          {profileData.verified && (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      ) : (
                        <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl">
                          <Mail className="w-5 h-5 text-purple-400" />
                          <span className="text-white font-medium">{profileData.email}</span>
                        </div>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editData.phone}
                          onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      ) : (
                        <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl">
                          <Phone className="w-5 h-5 text-green-400" />
                          <span className="text-white font-medium">{profileData.phone}</span>
                        </div>
                      )}
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">City</label>
                      {isEditing ? (
                        <select
                          value={editData.city}
                          onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                        >
                          <option value="Bangalore" className="bg-gray-900">Bangalore</option>
                          <option value="Mumbai" className="bg-gray-900">Mumbai</option>
                          <option value="Delhi" className="bg-gray-900">Delhi</option>
                          <option value="Pune" className="bg-gray-900">Pune</option>
                          <option value="Hyderabad" className="bg-gray-900">Hyderabad</option>
                        </select>
                      ) : (
                        <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl">
                          <MapPin className="w-5 h-5 text-orange-400" />
                          <span className="text-white font-medium">{profileData.city}</span>
                        </div>
                      )}
                    </div>

                    {/* Member Since */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Member Since</label>
                      <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl">
                        <Award className="w-5 h-5 text-yellow-400" />
                        <span className="text-white font-medium">{profileData.joinDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Two-Factor Authentication */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 blur-xl rounded-3xl"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                />

                <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    Two-Step Verification
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${twoFactorEnabled ? 'bg-green-500/20' : 'bg-gray-500/20'} rounded-full flex items-center justify-center`}>
                          <Smartphone className={`w-6 h-6 ${twoFactorEnabled ? 'text-green-400' : 'text-gray-400'}`} />
                        </div>
                        <div>
                          <p className="text-white font-semibold">SMS Authentication</p>
                          <p className="text-sm text-gray-400">
                            {twoFactorEnabled ? 'Enabled - Your account is protected' : 'Add an extra layer of security'}
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleToggle2FA}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                          twoFactorEnabled
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg'
                        }`}
                      >
                        {twoFactorEnabled ? 'Disable' : 'Enable'}
                      </motion.button>
                    </div>

                    {showVerificationCode && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl"
                      >
                        <div className="text-center mb-6">
                          <h3 className="text-lg font-bold text-white mb-2">Enter Verification Code</h3>
                          <p className="text-sm text-gray-300">We've sent a 6-digit code to {profileData.phone}</p>
                        </div>
                        
                        <div className="flex justify-center gap-3 mb-6">
                          {verificationCode.map((digit, index) => (
                            <input
                              key={index}
                              id={`code-${index}`}
                              type="text"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
                              className="w-12 h-14 text-center text-2xl font-bold bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          ))}
                        </div>

                        <button
                          onClick={() => setShowVerificationCode(false)}
                          className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all"
                        >
                          Cancel
                        </button>
                      </motion.div>
                    )}

                    {twoFactorEnabled && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
                      >
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        <p className="text-green-300 font-semibold">Two-step verification is active</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Activity History Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 via-red-500/20 to-orange-500/20 blur-xl rounded-3xl"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                />

                <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-red-600 rounded-xl flex items-center justify-center">
                      <History className="w-5 h-5 text-white" />
                    </div>
                    Activity History
                  </h2>

                  {/* Tab Switcher */}
                  <div className="flex gap-2 mb-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setHistoryTab('verifications')}
                      className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                        historyTab === 'verifications'
                          ? 'bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-lg'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      Recent Verifications
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setHistoryTab('browsing')}
                      className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                        historyTab === 'browsing'
                          ? 'bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-lg'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      Browsing Activity
                    </motion.button>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {/* Verification History */}
                    {historyTab === 'verifications' && verificationHistory.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center gap-3 p-4 bg-white/5 hover:bg-gradient-to-r hover:from-pink-600/10 hover:to-red-600/10 rounded-xl transition-all cursor-pointer border border-white/10 hover:border-pink-500/30"
                      >
                        <div className={`w-12 h-12 bg-${item.color}-500/20 rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-bold text-white truncate">{item.placeName}</p>
                          <p className="text-sm text-gray-400">{item.location}</p>
                          <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-bold ${
                            item.status === 'Completed' ? 'text-green-400' : 'text-blue-400'
                          }`}>
                            {item.status}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">Score: {item.trustScore}</p>
                        </div>
                      </motion.div>
                    ))}

                    {/* Browsing Activity */}
                    {historyTab === 'browsing' && browsingActivity.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center gap-3 p-4 bg-white/5 hover:bg-gradient-to-r hover:from-pink-600/10 hover:to-red-600/10 rounded-xl transition-all cursor-pointer border border-white/10 hover:border-pink-500/30"
                      >
                        <div className={`w-12 h-12 bg-${item.color}-500/20 rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-bold text-white truncate">{item.action}</p>
                          <p className="text-sm text-gray-400">{item.page}</p>
                        </div>
                        <p className="text-sm font-semibold text-pink-400">
                          {item.time}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 p-4 bg-gradient-to-r from-pink-500/10 to-red-500/10 border border-pink-500/20 rounded-xl"
                  >
                    <p className="text-sm text-pink-300 text-center">
                      💕 Keep track of all your activities and verifications in one place!
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar - Credits */}
            <div className="space-y-6">
              {/* Credits Balance */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 blur-xl rounded-3xl"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                />

                <div className="relative bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-2xl border border-yellow-500/20 rounded-3xl p-6 shadow-2xl overflow-hidden">
                  <motion.div
                    className="absolute -right-8 -top-8 w-32 h-32 bg-yellow-500/10 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                    }}
                  />

                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">Credits Balance</h3>
                      <Coins className="w-6 h-6 text-yellow-400" />
                    </div>
                    
                    <div className="text-center py-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="text-5xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text mb-2"
                      >
                        {creditsData.balance}
                      </motion.div>
                      <p className="text-gray-300 text-sm">Available Credits</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-white/5 rounded-xl p-3 text-center">
                        <TrendingUp className="w-5 h-5 text-green-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white">{creditsData.earned}</p>
                        <p className="text-xs text-gray-400">Earned</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-3 text-center">
                        <ArrowRight className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white">{creditsData.spent}</p>
                        <p className="text-xs text-gray-400">Spent</p>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full mt-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                    >
                      <Gift className="w-5 h-5" />
                      Earn More Credits
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Transaction History */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-xl rounded-3xl"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                />

                <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-purple-400" />
                    Recent Activity
                  </h3>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {creditsData.history.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer"
                      >
                        <div className={`w-10 h-10 bg-${item.color}-500/20 rounded-full flex items-center justify-center flex-shrink-0`}>
                          <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{item.description}</p>
                          <p className="text-xs text-gray-400">{item.date}</p>
                        </div>
                        <p className={`text-lg font-bold ${item.type === 'earned' ? 'text-green-400' : 'text-blue-400'}`}>
                          {item.amount > 0 ? '+' : ''}{item.amount}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions - Settings Menu */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 }}
                className="relative"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 via-red-500/20 to-orange-500/20 blur-xl rounded-3xl"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                />

                <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-pink-400" />
                    Quick Actions
                  </h3>

                  <div className="space-y-3">
                    {/* History / Previous Verifications */}
                    <motion.button
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate('/dashboard')}
                      className="w-full flex items-center gap-4 p-4 bg-white/5 hover:bg-gradient-to-r hover:from-pink-600/20 hover:to-red-600/20 border border-white/10 hover:border-pink-500/30 rounded-xl transition-all group"
                    >
                      <div className="w-11 h-11 bg-gradient-to-br from-pink-600 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <History className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <h4 className="text-white font-bold text-sm">Previous Verifications</h4>
                        <p className="text-gray-400 text-xs">View your history</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-pink-400 group-hover:translate-x-2 transition-transform" />
                    </motion.button>

                    {/* Add Review */}
                    <motion.button
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate('/add-review')}
                      className="w-full flex items-center gap-4 p-4 bg-white/5 hover:bg-gradient-to-r hover:from-pink-600/20 hover:to-red-600/20 border border-white/10 hover:border-pink-500/30 rounded-xl transition-all group"
                    >
                      <div className="w-11 h-11 bg-gradient-to-br from-pink-600 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <h4 className="text-white font-bold text-sm">Add Review</h4>
                        <p className="text-gray-400 text-xs">Share your experience</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-pink-400 group-hover:translate-x-2 transition-transform" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Logout Button */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="relative"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-pink-500/20 to-orange-500/20 blur-xl rounded-3xl"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                />

                <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="w-full py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-3 transition-all group"
                  >
                    <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Logout
                  </motion.button>
                  <p className="text-xs text-gray-400 text-center mt-3">
                    You will be redirected to the home page
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Picture Modal */}
      <AnimatePresence>
        {isProfilePicModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProfilePicModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setIsProfilePicModalOpen(false)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md"
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-red-600 blur-2xl opacity-50 rounded-3xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.7, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />

                <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-8 border border-white/10 shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">Add Profile Picture</h3>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsProfilePicModalOpen(false)}
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </motion.button>
                  </div>

                  <p className="text-gray-400 mb-6">Choose how you'd like to add your profile picture</p>

                  <div className="space-y-4">
                    {/* Choose Photo Button */}
                    <motion.button
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleChoosePhoto}
                      className="w-full flex items-center gap-4 p-5 bg-gradient-to-r from-pink-600/20 to-red-600/20 hover:from-pink-600/30 hover:to-red-600/30 border border-pink-500/30 rounded-2xl transition-all group"
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-pink-600 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <ImageIcon className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <h4 className="text-white font-bold text-lg">Choose Photo</h4>
                        <p className="text-gray-400 text-sm">Select from your gallery</p>
                      </div>
                      <div className="text-pink-400 group-hover:translate-x-2 transition-transform">
                        →
                      </div>
                    </motion.button>

                    {/* Take Photo Button */}
                    <motion.button
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleTakePhoto}
                      className="w-full flex items-center gap-4 p-5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 border border-purple-500/30 rounded-2xl transition-all group"
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Camera className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <h4 className="text-white font-bold text-lg">Take Photo</h4>
                        <p className="text-gray-400 text-sm">Use your camera</p>
                      </div>
                      <div className="text-purple-400 group-hover:translate-x-2 transition-transform">
                        →
                      </div>
                    </motion.button>
                  </div>

                  {/* Info text */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"
                  >
                    <p className="text-sm text-blue-300 text-center">
                      💕 Your profile picture helps others recognize you!
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* History Modal */}
      <AnimatePresence>
        {isHistoryModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHistoryModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setIsHistoryModalOpen(false)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl"
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-red-600 blur-2xl opacity-50 rounded-3xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.7, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />

                <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-8 border border-white/10 shadow-2xl max-h-[80vh] overflow-y-auto">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">Activity History</h3>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsHistoryModalOpen(false)}
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </motion.button>
                  </div>

                  {/* Tab Switcher */}
                  <div className="flex gap-2 mb-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setHistoryTab('verifications')}
                      className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                        historyTab === 'verifications'
                          ? 'bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-lg'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      Verifications
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setHistoryTab('browsing')}
                      className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                        historyTab === 'browsing'
                          ? 'bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-lg'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      Browsing Activity
                    </motion.button>
                  </div>

                  <p className="text-gray-400 mb-6">
                    {historyTab === 'verifications' 
                      ? 'View your recent verification history' 
                      : 'Track your recent browsing activity'}
                  </p>

                  <div className="space-y-4">
                    {/* Verification History */}
                    {historyTab === 'verifications' && verificationHistory.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: item.id * 0.1 }}
                        className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer border border-white/10 hover:border-pink-500/30"
                      >
                        <div className={`w-12 h-12 bg-${item.color}-500/20 rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-bold text-white truncate">{item.placeName}</p>
                          <p className="text-sm text-gray-400">{item.location}</p>
                          <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-bold ${
                            item.status === 'Completed' ? 'text-green-400' : 'text-blue-400'
                          }`}>
                            {item.status}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">Score: {item.trustScore}</p>
                        </div>
                      </motion.div>
                    ))}

                    {/* Browsing Activity */}
                    {historyTab === 'browsing' && browsingActivity.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: item.id * 0.1 }}
                        className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer border border-white/10 hover:border-pink-500/30"
                      >
                        <div className={`w-12 h-12 bg-${item.color}-500/20 rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-bold text-white truncate">{item.action}</p>
                          <p className="text-sm text-gray-400">{item.page}</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-400">
                          {item.time}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Info text */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"
                  >
                    <p className="text-sm text-blue-300 text-center">
                      💕 Track your activity and verifications all in one place!
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}