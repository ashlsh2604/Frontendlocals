import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { MapPin, Search, LayoutDashboard, PenSquare, Menu, X, Home, Camera, Navigation, Shield, CheckCircle, User, Bell, Users, Compass, HelpCircle, Sparkles } from 'lucide-react';
import { CameraPermissionModal } from './CameraPermissionModal';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);
  
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
          // Use Bangalore as default location if denied
          navigate('/nearby', {
            state: {
              latitude: 12.9716,
              longitude: 77.5946
            }
          });
          console.error('Geolocation error:', error);
        }
      );
    } else {
      setIsRequestingLocation(false);
      // Use Bangalore as default location if not supported
      navigate('/nearby', {
        state: {
          latitude: 12.9716,
          longitude: 77.5946
        }
      });
    }
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home, primary: false },
    { path: '/add-review', label: 'Add Review', icon: PenSquare, primary: false },
  ];

  // Mock notification count
  const notificationCount = 3;

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50 relative overflow-hidden"
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
                  className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-3 rounded-2xl shadow-2xl shadow-blue-600/40"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 3,
                    boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.6)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {/* Inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                  
                  {/* Icon Stack - Shield with Check */}
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    <motion.div
                      animate={{ 
                        y: [0, -2, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <MapPin className="w-10 h-10 text-white absolute" />
                    </motion.div>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-300 absolute" />
                    </motion.div>
                  </div>
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
              
              {/* Camera Button */}
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCameraModalOpen(true)}
                className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all overflow-hidden group bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40"
                title={cameraPermissionGranted ? 'Camera access granted' : 'Enable camera access'}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-700 to-red-700"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  animate={cameraPermissionGranted ? { rotate: [0, 5, -5, 0] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Camera className="w-4 h-4 relative z-10" />
                </motion.div>
                <span className="text-sm relative z-10">Camera</span>
                {cameraPermissionGranted && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-green-500 z-20"
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                  >
                    <div className="absolute inset-0 bg-green-400 rounded-full animate-ping" />
                  </motion.div>
                )}
              </motion.button>

              {/* Account Button */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
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

              {/* Notifications Button */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
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
    </>
  );
}