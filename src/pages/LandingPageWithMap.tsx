import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Search, MapPin, ArrowRight, CheckCircle, Star, Heart, Coffee, Pizza, Gift, Percent } from 'lucide-react';
import { motion } from 'motion/react';

export function LandingPageWithMap() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const popularCities = [
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    { name: 'Delhi', lat: 28.7041, lon: 77.1025 },
    { name: 'Bangalore', lat: 12.9716, lon: 77.5946 },
    { name: 'Pune', lat: 18.5204, lon: 73.8567 },
    { name: 'Hyderabad', lat: 17.3850, lon: 78.4867 },
    { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
  ];

  const placeTypes = [
    { icon: '🏨', label: 'Hotels', value: 'hotel' },
    { icon: '💪', label: 'Gyms', value: 'gym' },
    { icon: '🏘️', label: 'Neighborhoods', value: 'neighborhood' },
    { icon: '🏢', label: 'PG/Hostels', value: 'pg' },
  ];

  // Floating particles data
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSearch = () => {
    navigate('/request');
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      {/* Hero Section with Map Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
        {/* Animated Map Background */}
        <div className="absolute inset-0">
          {/* Base dark layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-950 via-magenta-950 to-pink-950" />
          
          {/* Animated Map Grid */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(236, 72, 153, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(236, 72, 153, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
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
          
          {/* Removed Glowing Map Markers */}

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
          <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-black via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mb-16"
          >
            {/* Search glow */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-2xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />
            
            {/* Search Container */}
            <motion.div 
              className="relative bg-white rounded-2xl p-2 shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col md:flex-row gap-2">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search hotels, schools, neighborhoods..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
                  />
                </div>
                
                {/* City Selector */}
                <div className="relative md:w-48">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 text-gray-900 appearance-none cursor-pointer bg-white"
                  >
                    <option value="">Select City</option>
                    {popularCities.map(city => (
                      <option key={city.name} value={city.name}>{city.name}</option>
                    ))}
                  </select>
                </div>
                
                {/* Search Button */}
                <motion.button
                  onClick={handleSearch}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Search
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
            
            {/* Removed Quick Filters */}
          </motion.div>

          {/* Valentine's Day Special Offers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-red-600 text-white text-sm font-bold px-5 py-2.5 rounded-full mb-4 shadow-lg"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Heart className="w-4 h-4 fill-white" />
                VALENTINE'S DAY SPECIAL
                <Heart className="w-4 h-4 fill-white" />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-pink-400 via-red-400 to-rose-400 bg-clip-text text-transparent">
                Love is in the Air! ❤️
              </h2>
              <p className="text-lg text-gray-300 font-medium">
                Exclusive verified deals on romantic cafes & pizza places in Bangalore
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Cafe Offer 1 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative cursor-pointer"
                onClick={() => navigate('/nearby')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-red-500/30 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 rounded-2xl" />
                
                <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border-2 border-pink-200 group-hover:border-pink-400 transition-all">
                  <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2.5 py-1 rounded-full text-xs font-black shadow-lg flex items-center gap-1">
                    <Percent className="w-3 h-3" />
                    30% OFF
                  </div>

                  <div className="relative h-40 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1658829455151-992e776998bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwcm9tYW50aWMlMjBjb3VwbGV8ZW58MXx8fHwxNzcwNzM5OTg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Romantic Cafe"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1.5">
                      <Coffee className="w-3 h-3 text-pink-600" />
                      <span className="text-xs font-bold text-gray-900">Cafe</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs font-bold text-green-600 uppercase">Verified</span>
                    </div>
                    
                    <h3 className="text-base font-black text-gray-900 mb-1 group-hover:text-pink-600 transition-colors">
                      The Love Brew Cafe
                    </h3>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>Indiranagar</span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-bold text-gray-900">4.9</span>
                      </div>
                      <span className="text-xs text-gray-500">156 reviews</span>
                    </div>

                    <div className="bg-pink-50 border border-pink-200 rounded-lg p-2 mb-3">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Gift className="w-3 h-3 text-pink-600" />
                        <span className="text-xs font-bold text-pink-900">Valentine's Deal</span>
                      </div>
                      <p className="text-xs text-gray-700 mb-1.5">
                        Free dessert + 30% off coffee
                      </p>
                      <div className="text-xs text-gray-600">
                        <span className="line-through">₹800</span>{' '}
                        <span className="text-pink-600 font-black">₹560 for 2</span>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white py-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md">
                      <Heart className="w-3 h-3 fill-white" />
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Pizza Offer 1 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative cursor-pointer"
                onClick={() => navigate('/nearby')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-red-500/30 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 rounded-2xl" />
                
                <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border-2 border-red-200 group-hover:border-red-400 transition-all">
                  <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2.5 py-1 rounded-full text-xs font-black shadow-lg flex items-center gap-1">
                    <Percent className="w-3 h-3" />
                    25% OFF
                  </div>

                  <div className="relative h-40 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1768051313568-b35886b9a093?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHJlc3RhdXJhbnQlMjByb21hbnRpY3xlbnwxfHx8fDE3NzA3Mzk5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Pizza Restaurant"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1.5">
                      <Pizza className="w-3 h-3 text-red-600" />
                      <span className="text-xs font-bold text-gray-900">Pizza</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs font-bold text-green-600 uppercase">Verified</span>
                    </div>
                    
                    <h3 className="text-base font-black text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                      Amore Pizza Lounge
                    </h3>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>Koramangala</span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-bold text-gray-900">4.7</span>
                      </div>
                      <span className="text-xs text-gray-500">203 reviews</span>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-2 mb-3">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Gift className="w-3 h-3 text-red-600" />
                        <span className="text-xs font-bold text-red-900">Love Deal</span>
                      </div>
                      <p className="text-xs text-gray-700 mb-1.5">
                        Heart pizza + free mocktails
                      </p>
                      <div className="text-xs text-gray-600">
                        <span className="line-through">₹1,200</span>{' '}
                        <span className="text-red-600 font-black">₹900 for 2</span>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md">
                      <Heart className="w-3 h-3 fill-white" />
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Cafe Offer 2 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative cursor-pointer"
                onClick={() => navigate('/nearby')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/30 to-pink-500/30 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 rounded-2xl" />
                
                <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border-2 border-rose-200 group-hover:border-rose-400 transition-all">
                  <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-2.5 py-1 rounded-full text-xs font-black shadow-lg flex items-center gap-1">
                    <Percent className="w-3 h-3" />
                    35% OFF
                  </div>

                  <div className="relative h-40 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1749829134509-00f6ba18a0a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwdmFsZW50aW5lc3xlbnwxfHx8fDE3NzA3Mzk5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Coffee Shop"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1.5">
                      <Coffee className="w-3 h-3 text-rose-600" />
                      <span className="text-xs font-bold text-gray-900">Cafe</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs font-bold text-green-600 uppercase">Verified</span>
                    </div>
                    
                    <h3 className="text-base font-black text-gray-900 mb-1 group-hover:text-rose-600 transition-colors">
                      Hearts & Coffee Co.
                    </h3>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>HSR Layout</span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-bold text-gray-900">4.8</span>
                      </div>
                      <span className="text-xs text-gray-500">187 reviews</span>
                    </div>

                    <div className="bg-rose-50 border border-rose-200 rounded-lg p-2 mb-3">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Gift className="w-3 h-3 text-rose-600" />
                        <span className="text-xs font-bold text-rose-900">Couple's Deal</span>
                      </div>
                      <p className="text-xs text-gray-700 mb-1.5">
                        2 lattes + heart cookies
                      </p>
                      <div className="text-xs text-gray-600">
                        <span className="line-through">₹650</span>{' '}
                        <span className="text-rose-600 font-black">₹420 for 2</span>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white py-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md">
                      <Heart className="w-3 h-3 fill-white" />
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Pizza Offer 2 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative cursor-pointer"
                onClick={() => navigate('/nearby')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-orange-500/30 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 rounded-2xl" />
                
                <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border-2 border-orange-200 group-hover:border-orange-400 transition-all">
                  <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2.5 py-1 rounded-full text-xs font-black shadow-lg flex items-center gap-1">
                    <Percent className="w-3 h-3" />
                    40% OFF
                  </div>

                  <div className="relative h-40 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1675869583378-9bae94ca8d2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHNsaWNlJTIwaGVhcnQlMjBzaGFwZWR8ZW58MXx8fHwxNzcwNzM5OTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Pizza Special"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1.5">
                      <Pizza className="w-3 h-3 text-orange-600" />
                      <span className="text-xs font-bold text-gray-900">Pizza</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs font-bold text-green-600 uppercase">Verified</span>
                    </div>
                    
                    <h3 className="text-base font-black text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                      Pizza Romance Hub
                    </h3>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>Whitefield</span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-bold text-gray-900">4.6</span>
                      </div>
                      <span className="text-xs text-gray-500">234 reviews</span>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 mb-3">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Gift className="w-3 h-3 text-orange-600" />
                        <span className="text-xs font-bold text-orange-900">Date Special</span>
                      </div>
                      <p className="text-xs text-gray-700 mb-1.5">
                        Pizza + drinks + candlelit setup
                      </p>
                      <div className="text-xs text-gray-600">
                        <span className="line-through">₹1,500</span>{' '}
                        <span className="text-orange-600 font-black">₹900 for 2</span>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md">
                      <Heart className="w-3 h-3 fill-white" />
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="text-center">
              <motion.button
                onClick={() => navigate('/nearby')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 via-red-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-xl"
              >
                <Heart className="w-4 h-4 fill-white animate-pulse" />
                Explore All Valentine's Deals
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <p className="mt-3 text-xs text-gray-400 font-medium">
                Valid until Feb 14, 2026 • Limited seats • All verified by locals
              </p>
            </div>
          </motion.div>

          {/* Recently Verified Places */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="inline-block bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 text-blue-400 text-sm font-bold px-4 py-2 rounded-full mb-4"
              >
                ✨ RECENTLY VERIFIED
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Recommended Places
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Hotel in Mumbai */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ y: -10 }}
                className="group relative cursor-pointer"
                onClick={() => navigate('/report/1')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 rounded-3xl" />
                
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-3xl overflow-hidden transition-all duration-300 shadow-2xl">
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                    <img 
                      src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzcwNzE0NDkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Luxury Hotel Mumbai"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 z-20 shadow-lg">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </div>
                    
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium z-20">
                      🏨 Hotel
                    </div>
                    
                    <div className="absolute top-4 right-4 bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-bold z-20 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Mumbai
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">Sunrise Grand Hotel</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                      <MapPin className="w-4 h-4" />
                      Andheri West, Mumbai
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-bold text-white">4.8</span>
                        <span className="text-sm text-gray-400">Trust Score</span>
                      </div>
                      <div className="text-sm text-gray-400">2 hours ago</div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group-hover:scale-105">
                      View Report
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Gym in Bangalore */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ y: -10 }}
                className="group relative cursor-pointer"
                onClick={() => navigate('/report/2')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 rounded-3xl" />
                
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-3xl overflow-hidden transition-all duration-300 shadow-2xl">
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                    <img 
                      src="https://images.unsplash.com/photo-1761971975769-97e598bf526b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmaXRuZXNzJTIwZ3ltJTIwaW50ZXJpb3IlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzcwNzMyNDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Modern Gym Bangalore"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 z-20 shadow-lg">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </div>
                    
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium z-20">
                      💪 Gym
                    </div>
                    
                    <div className="absolute top-4 right-4 bg-purple-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-bold z-20 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Bangalore
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">FitZone Premium Gym</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                      <MapPin className="w-4 h-4" />
                      Indiranagar, Bangalore
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-bold text-white">4.9</span>
                        <span className="text-sm text-gray-400">Trust Score</span>
                      </div>
                      <div className="text-sm text-gray-400">5 hours ago</div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group-hover:scale-105">
                      View Report
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Neighborhood */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ y: -10 }}
                className="group relative cursor-pointer"
                onClick={() => navigate('/report/3')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 rounded-3xl" />
                
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-3xl overflow-hidden transition-all duration-300 shadow-2xl">
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                    <img 
                      src="https://images.unsplash.com/photo-1573845105959-48591b7fd566?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMG5laWdoYm9yaG9vZCUyMHN0cmVldHxlbnwxfHx8fDE3NzA3MzEyNzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Residential Neighborhood"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 z-20 shadow-lg">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </div>
                    
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium z-20">
                      🏘️ Neighborhood
                    </div>
                    
                    <div className="absolute top-4 right-4 bg-orange-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-bold z-20 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Delhi
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">Vasant Kunj Sector C</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                      <MapPin className="w-4 h-4" />
                      Vasant Kunj, New Delhi
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-bold text-white">4.7</span>
                        <span className="text-sm text-gray-400">Trust Score</span>
                      </div>
                      <div className="text-sm text-gray-400">1 day ago</div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group-hover:scale-105">
                      View Report
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}