import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, User, Phone, Eye, EyeOff, CheckCircle, ArrowLeft, MapPin, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import logoImage from 'figma:asset/631dfbc430742baae2d80970ce70de987ccbd36c.png';

export function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Floating particles data
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/local/tasks');
    }, 1500);
  };

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background - exact match to the image */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#4a0e2e] via-[#6b1442] to-[#8b1538]" />
      
      {/* Floating Particles */}
      <div className="fixed inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-pink-300/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        onClick={() => navigate('/local/login')}
        className="fixed top-8 left-8 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/20 hover:border-white/30 text-white px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 group z-20"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back</span>
      </motion.button>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 blur-xl opacity-60 rounded-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              <div className="relative w-20 h-20 bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <MapPin className="w-10 h-10 text-white absolute" />
                  <CheckCircle className="w-5 h-5 text-yellow-300 absolute" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-5xl font-black text-pink-400 mb-2 tracking-wide"
          >
            LOCALS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-pink-200/80 mb-8"
          >
            Create Your Account
          </motion.p>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-pink-100 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <User className="w-5 h-5 text-pink-200/50" />
                  </div>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-3.5 bg-pink-900/20 backdrop-blur-sm border border-pink-300/20 rounded-xl text-pink-50 placeholder-pink-200/40 focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400/50 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-pink-100 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Mail className="w-5 h-5 text-pink-200/50" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3.5 bg-pink-900/20 backdrop-blur-sm border border-pink-300/20 rounded-xl text-pink-50 placeholder-pink-200/40 focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400/50 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-pink-100 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Phone className="w-5 h-5 text-pink-200/50" />
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full pl-12 pr-4 py-3.5 bg-pink-900/20 backdrop-blur-sm border border-pink-300/20 rounded-xl text-pink-50 placeholder-pink-200/40 focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400/50 transition-all"
                    maxLength={10}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-pink-100 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Lock className="w-5 h-5 text-pink-200/50" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3.5 bg-pink-900/20 backdrop-blur-sm border border-pink-300/20 rounded-xl text-pink-50 placeholder-pink-200/40 focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400/50 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-200/50 hover:text-pink-100 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-pink-100 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Lock className="w-5 h-5 text-pink-200/50" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full pl-12 pr-12 py-3.5 bg-pink-900/20 backdrop-blur-sm border border-pink-300/20 rounded-xl text-pink-50 placeholder-pink-200/40 focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400/50 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-200/50 hover:text-pink-100 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 w-5 h-5 rounded border-pink-300/30 bg-pink-900/20 text-pink-500 focus:ring-2 focus:ring-pink-400/50 cursor-pointer"
                  />
                  <span className="text-sm text-pink-100/80 leading-relaxed group-hover:text-pink-50">
                    I agree to the{' '}
                    <button type="button" className="text-pink-300 hover:text-pink-200 underline">
                      Terms & Conditions
                    </button>{' '}
                    and{' '}
                    <button type="button" className="text-pink-300 hover:text-pink-200 underline">
                      Privacy Policy
                    </button>
                  </span>
                </label>
              </div>

              {/* Sign Up Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:from-pink-600 hover:via-rose-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/50 disabled:shadow-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Sign Up
                    <div className="relative w-5 h-5 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white absolute" />
                      <CheckCircle className="w-2.5 h-2.5 text-yellow-300 absolute" />
                    </div>
                  </>
                )}
              </motion.button>

              {/* Sign In Link */}
              <div className="text-center pt-2">
                <p className="text-pink-100/70 text-sm">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/local/login')}
                    className="text-pink-300 hover:text-pink-200 font-semibold transition-colors"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </form>
          </motion.div>

          {/* Footer Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-sm text-pink-200/60 mt-6 flex items-center justify-center gap-1"
          >
            Trusted by locals across Bangalore <Heart className="w-4 h-4 text-pink-400 fill-pink-400 inline" />
          </motion.p>
        </motion.div>
      </div>

      {/* Floating Help Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-full shadow-2xl shadow-pink-500/50 flex items-center justify-center text-white font-bold text-xl z-20 transition-all group"
      >
        <span className="group-hover:scale-110 transition-transform">?</span>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#4a0e2e]"></div>
      </motion.button>
    </div>
  );
}
