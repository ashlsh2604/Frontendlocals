import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PhotoUploadWithLocation } from '../components/PhotoUploadWithLocation';
import { Star, MapPin, Upload, CheckCircle, ArrowLeft, AlertCircle, Sparkles, Award, TrendingUp, Camera, Zap, Coins, PartyPopper } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AddReviewPage() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    placeName: '',
    placeType: '',
    city: '',
    address: '',
    review: '',
  });
  const [photos, setPhotos] = useState<(File | null)[]>([null, null, null]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const placeTypes = [
    { value: 'hotel', label: 'Hotel', icon: '🏨' },
    { value: 'gym', label: 'Gym', icon: '💪' },
    { value: 'neighborhood', label: 'Neighborhood', icon: '🏘️' },
    { value: 'pg', label: 'PG/Hostel', icon: '🏢' },
    { value: 'restaurant', label: 'Restaurant', icon: '🍽️' },
    { value: 'other', label: 'Other', icon: '📍' },
  ];

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 
    'Chennai', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Gurgaon'
  ];

  // Floating particles data
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 15 - 7.5,
        y: (e.clientY / window.innerHeight) * 15 - 7.5,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  const handlePhotoChange = (index: number, file: File | null) => {
    const newPhotos = [...photos];
    newPhotos[index] = file;
    setPhotos(newPhotos);
  };

  const ratingLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

  return (
    <div className="min-h-screen flex flex-col bg-black relative overflow-hidden">
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
              y: [0, -100, 0],
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

        {/* Animated light beams */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-full bg-gradient-to-b from-fuchsia-500/20 via-transparent to-transparent blur-3xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-96 h-full bg-gradient-to-b from-magenta-500/20 via-transparent to-transparent blur-3xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black" />
      </div>
      
      <div className="flex-1 py-12 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back</span>
            </button>
            
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block mb-4"
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-2xl opacity-50"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />
                  <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                </div>
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Share Your Experience
                </span>
              </h1>
              <p className="text-xl text-gray-300">
                Help others make informed decisions with your review
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="relative"
          >
            {/* Glow effect */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-2xl rounded-3xl"
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            />

            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 space-y-8 shadow-2xl">
              {/* Place Information */}
              <div className="space-y-6">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-2xl font-bold text-white flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  Place Information
                </motion.h2>

                {/* Place Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block font-semibold text-white mb-3">
                    Place Name *
                  </label>
                  <input
                    type="text"
                    value={formData.placeName}
                    onChange={(e) => setFormData({ ...formData, placeName: e.target.value })}
                    placeholder="e.g., Sunrise Grand Hotel"
                    required
                    className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                  />
                </motion.div>

                {/* Place Type & City */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <label className="block font-semibold text-white mb-3">
                      Place Type *
                    </label>
                    <select
                      value={formData.placeType}
                      onChange={(e) => setFormData({ ...formData, placeType: e.target.value })}
                      required
                      className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none cursor-pointer text-white"
                    >
                      <option value="" className="bg-gray-900">Select type</option>
                      {placeTypes.map((type) => (
                        <option key={type.value} value={type.value} className="bg-gray-900">
                          {type.icon} {type.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <label className="block font-semibold text-white mb-3">
                      City *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                      className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none cursor-pointer text-white"
                    >
                      <option value="" className="bg-gray-900">Select city</option>
                      {cities.map((city) => (
                        <option key={city} value={city} className="bg-gray-900">{city}</option>
                      ))}
                    </select>
                  </motion.div>
                </div>

                {/* Address */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  <label className="block font-semibold text-white mb-3">
                    Address *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g., 123 Main Street, Andheri West"
                    required
                    className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                  />
                </motion.div>
              </div>

              {/* Rating */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="border-t border-white/10 pt-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 text-white fill-white" />
                  </div>
                  Your Rating
                </h2>
                
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          whileHover={{ scale: 1.2, rotate: 15 }}
                          whileTap={{ scale: 0.9 }}
                          className="transition-all"
                        >
                          <Star
                            className={`w-12 h-12 md:w-14 md:h-14 transition-all duration-200 ${
                              star <= (hoveredRating || rating)
                                ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]'
                                : 'text-gray-600'
                            }`}
                          />
                        </motion.button>
                      ))}
                    </div>
                    
                    {rating > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                      >
                        <p className="text-3xl font-black text-white mb-1">
                          {rating}.0 / 5.0
                        </p>
                        <p className="text-lg font-semibold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                          {ratingLabels[rating - 1]}
                        </p>
                      </motion.div>
                    )}
                    
                    {rating === 0 && (
                      <p className="text-sm text-gray-400 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Tap the stars to rate your experience
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Review Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="border-t border-white/10 pt-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  Your Review
                </h2>
                <textarea
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  placeholder="Share your detailed experience... What did you like? What could be improved?"
                  required
                  rows={6}
                  className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none text-white placeholder-gray-400"
                />
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm text-gray-400">
                    Minimum 50 characters
                  </p>
                  <p className={`text-sm font-semibold ${
                    formData.review.length >= 50 ? 'text-green-400' : 'text-gray-400'
                  }`}>
                    {formData.review.length}/50
                  </p>
                </div>
              </motion.div>

              {/* Photos */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="border-t border-white/10 pt-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                  Add Photos
                </h2>
                <p className="text-gray-300 mb-6">
                  Upload up to 3 photos to support your review
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[0, 1, 2].map((index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.4 + index * 0.1 }}
                    >
                      <PhotoUploadWithLocation
                        label={`Photo ${index + 1}`}
                        helperText={index === 0 ? "Primary photo" : "Additional photo"}
                        size="md"
                        required={index === 0}
                        onImageChange={(file) => handlePhotoChange(index, file)}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="border-t border-white/10 pt-8"
              >
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <motion.button
                    type="button"
                    onClick={() => navigate(-1)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-bold hover:bg-white/20 transition-all"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || rating === 0 || formData.review.length < 50}
                    whileHover={{ scale: isSubmitting || rating === 0 || formData.review.length < 50 ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting || rating === 0 || formData.review.length < 50 ? 1 : 0.95 }}
                    className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-purple-600/30 hover:shadow-xl hover:shadow-purple-600/50 disabled:shadow-none flex items-center justify-center gap-2 overflow-hidden"
                  >
                    {!isSubmitting && !(rating === 0 || formData.review.length < 50) && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      />
                    )}
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Submit Review
                        <Sparkles className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.form>

          {/* Help Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <h3 className="font-bold text-white mb-4 flex items-center gap-2 text-lg">
              <AlertCircle className="w-6 h-6 text-purple-400" />
              Review Guidelines
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-purple-400" />
                </span>
                <span>Be honest and specific about your experience</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-purple-400" />
                </span>
                <span>Include relevant details about location, service, and facilities</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-purple-400" />
                </span>
                <span>Upload clear, recent photos to support your review</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-purple-400" />
                </span>
                <span>Avoid offensive language or personal attacks</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      <Footer />

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowSuccessModal(false);
              navigate('/dashboard');
            }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 100 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="relative max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow Effect */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-green-500/30 via-yellow-500/30 to-orange-500/30 blur-3xl rounded-3xl"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />

              <div className="relative bg-gradient-to-br from-gray-900/95 via-purple-900/95 to-gray-900/95 backdrop-blur-2xl border-2 border-white/20 rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden">
                {/* Confetti Particles */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: ['#fbbf24', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'][i % 5],
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [-20, 100],
                      x: [0, (Math.random() - 0.5) * 100],
                      rotate: [0, 360],
                      opacity: [1, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}

                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="flex justify-center mb-6"
                >
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 bg-green-500 blur-2xl rounded-full opacity-50"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                    <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
                      <CheckCircle className="w-14 h-14 text-white" strokeWidth={3} />
                    </div>
                  </div>
                </motion.div>

                {/* Success Text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-4xl font-black text-white mb-3">
                    <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                      Review Submitted!
                    </span>
                  </h2>
                  <p className="text-lg text-gray-300">
                    Thank you for sharing your valuable experience
                  </p>
                </motion.div>

                {/* Credits Earned */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  className="relative mb-8"
                >
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-yellow-500/30 via-orange-500/30 to-yellow-500/30 blur-xl rounded-2xl"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  />
                  
                  <div className="relative bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border-2 border-yellow-500/40 rounded-2xl p-6">
                    <div className="flex items-center justify-center gap-4">
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                      >
                        <Coins className="w-12 h-12 text-yellow-400" strokeWidth={2.5} />
                      </motion.div>
                      
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
                          className="text-6xl font-black"
                        >
                          <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
                            +10
                          </span>
                        </motion.div>
                        <p className="text-lg font-bold text-yellow-300 -mt-1">Credits Earned!</p>
                      </div>

                      <motion.div
                        animate={{
                          rotate: [0, -10, 10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          repeatDelay: 2,
                          delay: 0.25,
                        }}
                      >
                        <PartyPopper className="w-12 h-12 text-orange-400" strokeWidth={2.5} />
                      </motion.div>
                    </div>
                    
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="text-center text-sm text-gray-300 mt-4"
                    >
                      Your contribution helps the community make better decisions!
                    </motion.p>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowSuccessModal(false);
                      navigate('/dashboard');
                    }}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/50 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Go to Dashboard
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowSuccessModal(false);
                      // Reset form
                      setFormData({ placeName: '', placeType: '', city: '', address: '', review: '' });
                      setRating(0);
                      setPhotos([null, null, null]);
                    }}
                    className="flex-1 px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold border border-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    Add Another
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}