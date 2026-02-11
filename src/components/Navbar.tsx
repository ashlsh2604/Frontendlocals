import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { MapPin, Search, LayoutDashboard, PenSquare, Menu, X, Home, Camera, Navigation, Shield, CheckCircle, User, Bell, Users, Compass, HelpCircle, Sparkles, Heart, Award, TrendingUp, MapPinned, Settings, Moon, Sun, Globe, Lock, CreditCard, Volume2, Palette, Zap, History, Clock, Building2, Dumbbell, Star } from 'lucide-react';
import { CameraPermissionModal } from './CameraPermissionModal';
import { motion, AnimatePresence } from 'motion/react';
import logoImage from 'figma:asset/631dfbc430742baae2d80970ce70de987ccbd36c.png';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' | 'auto'>('light');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  
  // History data
  const recentHistory = [
    {
      id: 1,
      type: 'verification',
      title: 'Sunrise Grand Hotel',
      location: 'Indiranagar, Bangalore',
      time: '2 hours ago',
      icon: Building2,
      color: 'blue',
      status: 'Completed'
    },
    {
      id: 2,
      type: 'verification',
      title: 'FitZone Premium Gym',
      location: 'Koramangala, Bangalore',
      time: '5 hours ago',
      icon: Dumbbell,
      color: 'green',
      status: 'Completed'
    },
    {
      id: 3,
      type: 'activity',
      title: 'Added review',
      location: 'FitZone Premium Gym',
      time: '1 day ago',
      icon: Star,
      color: 'yellow',
      status: 'Activity'
    },
    {
      id: 4,
      type: 'activity',
      title: 'Searched nearby places',
      location: 'Koramangala Area',
      time: '1 day ago',
      icon: MapPin,
      color: 'purple',
      status: 'Activity'
    },
    {
      id: 5,
      type: 'activity',
      title: 'Checked dashboard',
      location: 'Dashboard',
      time: '2 days ago',
      icon: Clock,
      color: 'pink',
      status: 'Activity'
    },
  ];
  
  const badgeInfo = {
    'Top Contributor': {
      icon: Award,
      gradient: 'from-yellow-400 to-orange-400',
      description: 'Completed 50+ verifications with 5-star ratings',
      earned: 'January 15, 2026',
      progress: '127 verifications completed'
    },
    '100% Verified': {
      icon: Shield,
      gradient: 'from-green-500 to-emerald-500',
      description: 'All verifications passed quality checks with perfect scores',
      earned: 'December 20, 2025',
      progress: '100% accuracy rate maintained'
    },
    'Rising Star': {
      icon: Sparkles,
      gradient: 'from-purple-500 to-pink-500',
      description: 'Fastest growing verifier in Bangalore this month',
      earned: 'February 5, 2026',
      progress: 'Top 5% of all verifiers'
    },
    'Explorer': {
      icon: Compass,
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Verified places in 10+ different neighborhoods',
      earned: 'January 28, 2026',
      progress: '12 neighborhoods explored'
    }
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleCameraAllow = () => {
    setCameraPermissionGranted(true);
    setIsCameraModalOpen(false);
  };

  const handleCameraDeny = () => {
    setCameraPermissionGranted(false);
    setIsCameraModalOpen(false);
  };

  const handleNearbyPlaces = () => {
    setIsRequestingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setIsRequestingLocation(false);
          
          // Navigate to nearby page with location data
          navigate('/nearby', { 
            state: { 
              latitude,
              longitude 
            } 
          });
        },
        (error) => {
          setIsRequestingLocation(false);
          
          // Log detailed error information
          let errorMessage = 'Unknown error';
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'User denied location permission';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timeout';
              break;
          }
          console.log('Geolocation error:', errorMessage, error.message);
          
          // Use Bangalore as default location
          navigate('/nearby', {
            state: {
              latitude: 12.9716,
              longitude: 77.5946,
              isDefaultLocation: true
            }
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setIsRequestingLocation(false);
      console.log('Geolocation not supported by this browser');
      
      // Use Bangalore as default location if not supported
      navigate('/nearby', {
        state: {
          latitude: 12.9716,
          longitude: 77.5946,
          isDefaultLocation: true
        }
      });
    }
  };

  const navItems = [
    { path: '/home', label: 'Home', icon: Home, primary: false },
    { path: '/add-review', label: 'Add Review', icon: PenSquare, primary: false },
  ];

  // Mock notification count
  const notificationCount = 3;

  // Apply theme changes
  useEffect(() => {
    const root = document.documentElement;
    
    if (selectedTheme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else if (selectedTheme === 'light') {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    } else {
      // Auto mode - follow system preference
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDark) {
        root.classList.add('dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      }
    }
  }, [selectedTheme]);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50 relative"
      >
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-magenta-500/5 via-fuchsia-500/5 to-pink-500/5" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-magenta-500/10 via-fuchsia-500/10 to-pink-500/10"
          animate={{
            x: ['0%', '100%', '0%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Primary Hierarchy */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                {/* Glow effect on hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-xl rounded-full"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Main Icon Container - ENLARGED */}
                <motion.div 
                  className="relative rounded-2xl overflow-hidden"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 3,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.img 
                    src={logoImage} 
                    alt="Locals Logo" 
                    className="w-16 h-16 object-cover"
                    animate={{ 
                      y: [0, -2, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
                
                {/* Pulsing ring effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-blue-400/50 animate-ping opacity-20" />
              </div>
              <motion.div 
                className="flex flex-col"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="font-black text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">LOCALS</span>
                <span className="text-[10px] text-blue-600 font-semibold -mt-1 flex items-center gap-1">
                  <Sparkles className="w-2 h-2" />
                  VERIFIED PLACES
                  <Sparkles className="w-2 h-2" />
                </span>
              </motion.div>
            </Link>
            
            {/* Desktop Navigation - Secondary Hierarchy */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className="group relative"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all relative overflow-hidden bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-pink-700 to-red-700"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        <Icon className="w-4 h-4 relative z-10 text-white" />
                        <span className="text-sm relative z-10">{item.label}</span>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
              
              {/* Nearby Places Button */}
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNearbyPlaces}
                disabled={isRequestingLocation}
                className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                title="Find verified places near you"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-700 to-red-700"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <Navigation className={`w-4 h-4 relative z-10 ${isRequestingLocation ? 'animate-spin' : ''}`} />
                <span className="text-sm relative z-10">{isRequestingLocation ? 'Locating...' : 'Nearby'}</span>
                {!isRequestingLocation && (
                  <motion.div
                    className="absolute right-1 top-1 w-2 h-2 bg-white/50 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                )}
              </motion.button>

              {/* Account Button */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link to="/account">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all overflow-hidden group bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40"
                    title="Account Settings"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-pink-700 to-red-700"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <User className="w-4 h-4 relative z-10" />
                    <span className="text-sm relative z-10">Account</span>
                    <motion.div
                      className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </motion.div>
                </Link>
              </motion.div>

              {/* History Button */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                  className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all overflow-hidden group bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40"
                  title="View History"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-700 to-red-700"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <History className="w-4 h-4 relative z-10 text-white" />
                  <span className="text-sm relative z-10">History</span>
                </motion.button>

                {/* History Dropdown */}
                <AnimatePresence>
                  {isHistoryOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                    >
                      {/* Header */}
                      <div className="bg-gradient-to-r from-pink-600 to-red-600 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <History className="w-5 h-5 text-white" />
                          <h3 className="font-bold text-white text-lg">Recent History</h3>
                        </div>
                        <button
                          onClick={() => setIsHistoryOpen(false)}
                          className="text-white/80 hover:text-white transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* History List */}
                      <div className="max-h-[500px] overflow-y-auto">
                        {recentHistory.map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="border-b border-gray-100 p-4 hover:bg-pink-50 transition-colors cursor-pointer group"
                          >
                            <div className="flex gap-3">
                              <div className="flex-shrink-0">
                                <div className={`w-12 h-12 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 rounded-full flex items-center justify-center shadow-lg`}>
                                  <item.icon className="w-6 h-6 text-white" />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <h4 className="font-bold text-gray-900 text-sm group-hover:text-pink-600 transition-colors">
                                    {item.title}
                                  </h4>
                                  <span className="text-xs text-gray-500 flex-shrink-0">{item.time}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  {item.location}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <div className={`flex items-center gap-1 ${
                                    item.type === 'verification' 
                                      ? 'bg-green-100' 
                                      : 'bg-purple-100'
                                  } px-2 py-1 rounded-full`}>
                                    <span className={`text-xs font-bold ${
                                      item.type === 'verification' 
                                        ? 'text-green-700' 
                                        : 'text-purple-700'
                                    }`}>
                                      {item.status}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                        <button
                          onClick={() => {
                            setIsHistoryOpen(false);
                            navigate('/account');
                          }}
                          className="w-full py-2 text-center text-sm font-bold text-pink-600 hover:text-pink-700 transition-colors"
                        >
                          View Full History →
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Notifications Button */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAlertsOpen(!isAlertsOpen)}
                  className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all overflow-hidden group bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40"
                  title="Notifications"
                >
                  {/* Hover gradient effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-700 to-red-700"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Bell Icon with Animation */}
                  <div className="relative">
                    <motion.div
                      animate={{
                        rotate: [0, 15, -15, 15, 0],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    >
                      <Bell className="w-4 h-4 relative z-10 text-white" />
                    </motion.div>
                    
                    {/* Notification Badge */}
                    {notificationCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 z-20"
                      >
                        <motion.div
                          className="relative flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full border-2 border-white shadow-lg"
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        >
                          <span className="text-[10px] font-black text-gray-900">
                            {notificationCount > 9 ? '9+' : notificationCount}
                          </span>
                          
                          {/* Pulsing ring */}
                          <motion.div
                            className="absolute inset-0 border-2 border-yellow-400 rounded-full"
                            animate={{
                              scale: [1, 1.6],
                              opacity: [0.6, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                            }}
                          />
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                  
                  <span className="text-sm relative z-10">Alerts</span>
                  
                  {/* New notification indicator */}
                  {notificationCount > 0 && (
                    <motion.div
                      className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full z-10"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    />
                  )}
                </motion.button>

                {/* Alerts Dropdown */}
                <AnimatePresence>
                  {isAlertsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                    >
                      {/* Header */}
                      <div className="bg-gradient-to-r from-pink-600 to-red-600 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="w-5 h-5 text-white" />
                          <h3 className="font-bold text-white text-lg">Alerts</h3>
                        </div>
                        <button
                          onClick={() => setIsAlertsOpen(false)}
                          className="text-white/80 hover:text-white transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Notifications List */}
                      <div className="max-h-[500px] overflow-y-auto">
                        {/* Notification 1 - New Verification */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="border-b border-gray-100 p-4 hover:bg-pink-50 transition-colors cursor-pointer group"
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                                <CheckCircle className="w-6 h-6 text-white" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-bold text-gray-900 text-sm group-hover:text-pink-600 transition-colors">
                                  New Verification Complete! 🎉
                                </h4>
                                <span className="text-xs text-gray-500 flex-shrink-0">2m ago</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                Your verification for <span className="font-semibold">The Oberoi Hotel</span> has been approved. +50 credits added!
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
                                  <Award className="w-3 h-3 text-yellow-600" />
                                  <span className="text-xs font-bold text-yellow-700">+50 Credits</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Notification 2 - Trending Place */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="border-b border-gray-100 p-4 hover:bg-pink-50 transition-colors cursor-pointer group"
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                                <TrendingUp className="w-6 h-6 text-white" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-bold text-gray-900 text-sm group-hover:text-pink-600 transition-colors">
                                  Place You Verified is Trending! 🔥
                                </h4>
                                <span className="text-xs text-gray-500 flex-shrink-0">1h ago</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                <span className="font-semibold">FitZone Gym, Koramangala</span> is now trending in Bangalore! Your verification helped 127 people today.
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center gap-1 bg-orange-100 px-2 py-1 rounded-full">
                                  <Heart className="w-3 h-3 text-orange-600 fill-orange-600" />
                                  <span className="text-xs font-bold text-orange-700">127 Views</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Notification 3 - New Task Available */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className="border-b border-gray-100 p-4 hover:bg-pink-50 transition-colors cursor-pointer group"
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                <MapPinned className="w-6 h-6 text-white" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-bold text-gray-900 text-sm group-hover:text-pink-600 transition-colors">
                                  New Verification Task Near You! 📍
                                </h4>
                                <span className="text-xs text-gray-500 flex-shrink-0">3h ago</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                A hotel in <span className="font-semibold">Indiranagar (1.2km away)</span> needs verification. Earn up to ₹200!
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                                  <Sparkles className="w-3 h-3 text-green-600" />
                                  <span className="text-xs font-bold text-green-700">High Priority</span>
                                </div>
                                <div className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded-full">
                                  <span className="text-xs font-bold text-blue-700">₹200 Reward</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Notification 4 - Valentine's Day Bonus */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                          className="p-4 hover:bg-pink-50 transition-colors cursor-pointer group bg-gradient-to-r from-pink-50 to-red-50"
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-red-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                <Heart className="w-6 h-6 text-white fill-white" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-bold text-gray-900 text-sm group-hover:text-pink-600 transition-colors">
                                  💕 Valentine's Day Special Offer!
                                </h4>
                                <span className="text-xs text-gray-500 flex-shrink-0">5h ago</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                Complete any 3 verifications this week and get <span className="font-bold text-pink-600">2x bonus credits</span>! Offer valid until Feb 14.
                              </p>
                              <div className="mt-3">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs font-semibold text-gray-700">Progress: 1/3 tasks</span>
                                  <span className="text-xs font-bold text-pink-600">33%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '33%' }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="bg-gradient-to-r from-pink-600 to-red-600 h-2 rounded-full"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Footer */}
                      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                        <button className="w-full text-center text-sm font-semibold text-pink-600 hover:text-pink-700 transition-colors">
                          View All Notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Settings Button */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="relative"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className="relative flex items-center justify-center p-2.5 rounded-xl font-semibold transition-all overflow-hidden group bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40"
                  title="Settings"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-700 to-red-700"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    animate={{
                      rotate: [0, 180],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Settings className="w-5 h-5 relative z-10" />
                  </motion.div>
                  
                  {/* Pulsing indicator dot */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full border-2 border-white shadow-lg z-20"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    {/* Pulsing ring effect */}
                    <motion.div
                      className="absolute inset-0 border-2 border-yellow-400 rounded-full"
                      animate={{
                        scale: [1, 1.8],
                        opacity: [0.8, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    />
                  </motion.div>
                  
                  {/* Sparkle particles */}
                  <motion.div
                    className="absolute -top-1 -left-1 z-20"
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      rotate: [0, 180],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  >
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-0 right-0 z-20"
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      rotate: [180, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      delay: 1,
                    }}
                  >
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                  </motion.div>
                </motion.button>

                {/* Settings Dropdown */}
                <AnimatePresence>
                  {isSettingsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                    >
                      {/* Header */}
                      <div className="bg-gradient-to-r from-pink-600 to-red-600 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Settings className="w-5 h-5 text-white" />
                          <h3 className="font-bold text-white text-lg">Settings</h3>
                        </div>
                        <button
                          onClick={() => setIsSettingsOpen(false)}
                          className="text-white/80 hover:text-white transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Profile Section */}
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="p-6 bg-gradient-to-br from-pink-50 to-red-50 border-b border-gray-200"
                      >
                        <div className="flex items-center gap-4">
                          {/* Profile Picture with Stickers */}
                          <div className="relative">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="relative w-16 h-16 rounded-full bg-gradient-to-br from-pink-600 to-red-600 p-1 cursor-pointer"
                            >
                              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                <User className="w-8 h-8 text-pink-600" />
                              </div>
                              
                              {/* Camera icon overlay for changing picture */}
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="absolute bottom-0 right-0 w-6 h-6 bg-gradient-to-br from-pink-600 to-red-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg cursor-pointer"
                              >
                                <Camera className="w-3 h-3 text-white" />
                              </motion.div>
                            </motion.div>
                            
                            {/* Verified Badge Sticker */}
                            <motion.div
                              animate={{
                                rotate: [0, 5, -5, 0],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatDelay: 2,
                              }}
                              className="absolute -top-1 -right-1 w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg z-10"
                            >
                              <CheckCircle className="w-4 h-4 text-white fill-white" />
                            </motion.div>
                          </div>

                          {/* User Info */}
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-lg">Sarah Johnson</h4>
                            <p className="text-sm text-gray-600">Premium Verifier</p>
                            
                            {/* Sticker Collection */}
                            <div className="flex items-center gap-1 mt-2">
                              <motion.div
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelectedBadge('Top Contributor')}
                                className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-md cursor-pointer"
                                title="Top Contributor"
                              >
                                <Award className="w-3.5 h-3.5 text-white" />
                              </motion.div>
                              
                              <motion.div
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelectedBadge('100% Verified')}
                                className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-md cursor-pointer"
                                title="100% Verified"
                              >
                                <Shield className="w-3.5 h-3.5 text-white" />
                              </motion.div>
                              
                              <motion.div
                                whileHover={{ scale: 1.2, rotate: -10 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelectedBadge('Rising Star')}
                                className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-md cursor-pointer"
                                title="Rising Star"
                              >
                                <Sparkles className="w-3.5 h-3.5 text-white" />
                              </motion.div>
                              
                              <motion.div
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelectedBadge('Explorer')}
                                className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-md cursor-pointer"
                                title="Explorer"
                              >
                                <Compass className="w-3.5 h-3.5 text-white" />
                              </motion.div>
                              
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="ml-1 px-2 py-0.5 bg-white/80 rounded-full text-xs font-semibold text-pink-600 border border-pink-200 hover:bg-pink-50 transition-colors"
                              >
                                +4
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Settings Content */}
                      <div className="p-6 space-y-6">
                        {/* Theme Settings */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <Palette className="w-5 h-5 text-pink-600" />
                            <h4 className="font-bold text-gray-900">Theme</h4>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {/* Light Theme */}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedTheme('light')}
                              className={`relative p-3 rounded-xl border-2 transition-all ${
                                selectedTheme === 'light'
                                  ? 'border-pink-600 bg-pink-50'
                                  : 'border-gray-200 hover:border-pink-300'
                              }`}
                            >
                              <Sun className={`w-6 h-6 mx-auto ${
                                selectedTheme === 'light' ? 'text-pink-600' : 'text-gray-400'
                              }`} />
                              <p className={`text-xs mt-2 font-semibold ${
                                selectedTheme === 'light' ? 'text-pink-600' : 'text-gray-600'
                              }`}>
                                Light
                              </p>
                              {selectedTheme === 'light' && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute -top-1 -right-1 w-5 h-5 bg-pink-600 rounded-full flex items-center justify-center"
                                >
                                  <CheckCircle className="w-3 h-3 text-white" />
                                </motion.div>
                              )}
                            </motion.button>

                            {/* Dark Theme */}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedTheme('dark')}
                              className={`relative p-3 rounded-xl border-2 transition-all ${
                                selectedTheme === 'dark'
                                  ? 'border-pink-600 bg-pink-50'
                                  : 'border-gray-200 hover:border-pink-300'
                              }`}
                            >
                              <Moon className={`w-6 h-6 mx-auto ${
                                selectedTheme === 'dark' ? 'text-pink-600' : 'text-gray-400'
                              }`} />
                              <p className={`text-xs mt-2 font-semibold ${
                                selectedTheme === 'dark' ? 'text-pink-600' : 'text-gray-600'
                              }`}>
                                Dark
                              </p>
                              {selectedTheme === 'dark' && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute -top-1 -right-1 w-5 h-5 bg-pink-600 rounded-full flex items-center justify-center"
                                >
                                  <CheckCircle className="w-3 h-3 text-white" />
                                </motion.div>
                              )}
                            </motion.button>

                            {/* Auto Theme */}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedTheme('auto')}
                              className={`relative p-3 rounded-xl border-2 transition-all ${
                                selectedTheme === 'auto'
                                  ? 'border-pink-600 bg-pink-50'
                                  : 'border-gray-200 hover:border-pink-300'
                              }`}
                            >
                              <Zap className={`w-6 h-6 mx-auto ${
                                selectedTheme === 'auto' ? 'text-pink-600' : 'text-gray-400'
                              }`} />
                              <p className={`text-xs mt-2 font-semibold ${
                                selectedTheme === 'auto' ? 'text-pink-600' : 'text-gray-600'
                              }`}>
                                Auto
                              </p>
                              {selectedTheme === 'auto' && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute -top-1 -right-1 w-5 h-5 bg-pink-600 rounded-full flex items-center justify-center"
                                >
                                  <CheckCircle className="w-3 h-3 text-white" />
                                </motion.div>
                              )}
                            </motion.button>
                          </div>
                        </motion.div>

                        {/* Divider */}
                        <div className="border-t border-gray-200" />

                        {/* Notifications Toggle */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <motion.button
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                            className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 hover:border-pink-300 transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                notificationsEnabled ? 'bg-pink-100' : 'bg-gray-100'
                              }`}>
                                <Bell className={`w-5 h-5 ${
                                  notificationsEnabled ? 'text-pink-600' : 'text-gray-400'
                                }`} />
                              </div>
                              <div className="text-left">
                                <p className="font-semibold text-gray-900">Push Notifications</p>
                                <p className="text-xs text-gray-500">Get updates on your activity</p>
                              </div>
                            </div>
                            <motion.div
                              animate={{
                                backgroundColor: notificationsEnabled ? '#DB2777' : '#D1D5DB'
                              }}
                              className="relative w-12 h-6 rounded-full"
                            >
                              <motion.div
                                animate={{
                                  x: notificationsEnabled ? 24 : 2
                                }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-md"
                              />
                            </motion.div>
                          </motion.button>
                        </motion.div>

                        {/* Divider */}
                        <div className="border-t border-gray-200" />

                        {/* Sound Toggle */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <motion.button
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 hover:border-pink-300 transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                soundEnabled ? 'bg-pink-100' : 'bg-gray-100'
                              }`}>
                                <Volume2 className={`w-5 h-5 ${
                                  soundEnabled ? 'text-pink-600' : 'text-gray-400'
                                }`} />
                              </div>
                              <div className="text-left">
                                <p className="font-semibold text-gray-900">Sound Effects</p>
                                <p className="text-xs text-gray-500">Play sounds for actions</p>
                              </div>
                            </div>
                            <motion.div
                              animate={{
                                backgroundColor: soundEnabled ? '#DB2777' : '#D1D5DB'
                              }}
                              className="relative w-12 h-6 rounded-full"
                            >
                              <motion.div
                                animate={{
                                  x: soundEnabled ? 24 : 2
                                }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-md"
                              />
                            </motion.div>
                          </motion.button>
                        </motion.div>

                        {/* Divider */}
                        <div className="border-t border-gray-200" />

                        {/* Privacy & Help */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="space-y-2"
                        >
                          <motion.button
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-between p-3 rounded-xl border-2 border-gray-200 hover:border-pink-300 transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <Lock className="w-5 h-5 text-pink-600" />
                              <span className="font-semibold text-gray-900">Privacy & Security</span>
                            </div>
                            <span className="text-gray-400">→</span>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-between p-3 rounded-xl border-2 border-gray-200 hover:border-pink-300 transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <HelpCircle className="w-5 h-5 text-pink-600" />
                              <span className="font-semibold text-gray-900">Help & Support</span>
                            </div>
                            <span className="text-gray-400">→</span>
                          </motion.button>
                        </motion.div>
                      </div>

                      {/* Footer - Account Link */}
                      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                        <button 
                          onClick={() => {
                            setIsSettingsOpen(false);
                            navigate('/account');
                          }}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-lg hover:shadow-xl"
                        >
                          <User className="w-4 h-4" />
                          <span>Go to Account Settings</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 animate-in slide-in-from-top duration-300">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all
                        ${active 
                          ? 'bg-blue-50 text-blue-700 shadow-sm' 
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-gray-500'}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                
                {/* Mobile Nearby Places Button */}
                <button
                  onClick={() => {
                    handleNearbyPlaces();
                    setIsMobileMenuOpen(false);
                  }}
                  disabled={isRequestingLocation}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md disabled:opacity-50"
                >
                  <Navigation className={`w-5 h-5 ${isRequestingLocation ? 'animate-pulse' : ''}`} />
                  <span>{isRequestingLocation ? 'Finding Nearby...' : 'Find Nearby Places'}</span>
                </button>
                
                {/* Mobile Camera Button */}
                <button
                  onClick={() => {
                    setIsCameraModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all relative
                    ${cameraPermissionGranted 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-purple-50 text-purple-700'
                    }
                  `}
                >
                  <Camera className={`w-5 h-5 ${cameraPermissionGranted ? 'text-green-600' : 'text-purple-600'}`} />
                  <span>{cameraPermissionGranted ? 'Camera Enabled' : 'Enable Camera'}</span>
                  {cameraPermissionGranted && (
                    <div className="absolute top-3 left-8 w-2 h-2 bg-green-500 rounded-full" />
                  )}
                </button>

                {/* Mobile Account Button */}
                <Link
                  to="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                >
                  <User className="w-5 h-5" />
                  <span>Account</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </motion.nav>

      {/* Camera Permission Modal */}
      <CameraPermissionModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        onAllow={handleCameraAllow}
        onDeny={handleCameraDeny}
      />

      {/* Badge Details Modal */}
      <AnimatePresence>
        {selectedBadge && badgeInfo[selectedBadge as keyof typeof badgeInfo] && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBadge(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden"
            >
              {/* Header with gradient */}
              <div className={`relative bg-gradient-to-br ${badgeInfo[selectedBadge as keyof typeof badgeInfo].gradient} p-8 text-white`}>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedBadge(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>

                {/* Large Badge Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                  className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 shadow-xl"
                >
                  {(() => {
                    const BadgeIcon = badgeInfo[selectedBadge as keyof typeof badgeInfo].icon;
                    return <BadgeIcon className="w-12 h-12 text-white" />;
                  })()}
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-black text-center mb-2"
                >
                  {selectedBadge}
                </motion.h2>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-gray-700 text-center leading-relaxed mb-6">
                    {badgeInfo[selectedBadge as keyof typeof badgeInfo].description}
                  </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-600">Progress</span>
                    <span className="text-sm font-bold text-pink-600">
                      {badgeInfo[selectedBadge as keyof typeof badgeInfo].progress}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-600">Earned On</span>
                    <span className="text-sm font-bold text-gray-900">
                      {badgeInfo[selectedBadge as keyof typeof badgeInfo].earned}
                    </span>
                  </div>
                </motion.div>

                {/* Share Button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-pink-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  Share Achievement
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}