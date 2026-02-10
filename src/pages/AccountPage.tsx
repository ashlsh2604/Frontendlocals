import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { User, Mail, Phone, MapPin, Shield, CreditCard, Edit2, Save, X, CheckCircle, Camera, Lock, Smartphone, Key, Coins, TrendingUp, Award, Gift, ArrowRight, Zap, Bell, Eye, EyeOff, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

export function AccountPage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block mb-4"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-2xl opacity-50"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
              </div>
            </motion.div>

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

      <Footer />
    </div>
  );
}