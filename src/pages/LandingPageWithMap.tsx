import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Search, MapPin, Shield, Clock, ArrowRight, Sparkles, CheckCircle, TrendingUp, Zap } from 'lucide-react';
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
    { icon: '🏫', label: 'Schools', value: 'school' },
    { icon: '🏘️', label: 'Neighborhoods', value: 'neighborhood' },
    { icon: '🏢', label: 'PG/Hostels', value: 'pg' },
  ];

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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Map Background */}
        <div className="absolute inset-0">
          {/* Base dark layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950" />
          
          {/* Animated Map Grid */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          />
          
          {/* Glowing Map Markers */}
          {popularCities.map((city, index) => (
            <motion.div
              key={city.name}
              className="absolute"
              style={{
                left: `${15 + (index % 3) * 30}%`,
                top: `${20 + Math.floor(index / 3) * 35}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div className="relative group cursor-pointer">
                {/* Pulsing glow */}
                <div className="absolute inset-0 bg-blue-500/40 rounded-full blur-xl animate-pulse" />
                
                {/* Marker pin */}
                <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 group-hover:scale-125 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                
                {/* City label */}
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                    <p className="text-xs font-bold text-gray-900">{city.name}</p>
                  </div>
                </div>
                
                {/* Connecting lines animation */}
                <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-blue-500/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                  style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }}
                />
              </div>
            </motion.div>
          ))}
          
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black" />
          <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-black via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* Floating UI Cards */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          {/* Main Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Glassmorphic Container */}
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 via-purple-600/50 to-pink-600/50 blur-3xl opacity-60" />
              
              {/* Main Card */}
              <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[32px] p-8 md:p-12 shadow-2xl">
                {/* Trust Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 mb-8"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-white">Trusted by 2,400+ users across 45 cities</span>
                </motion.div>
                
                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight"
                >
                  <span className="text-white">Find Verified Places</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Near You, Instantly
                  </span>
                </motion.h1>
                
                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl mb-10 text-gray-300 leading-relaxed"
                >
                  AI-powered verification of hotels, schools & neighborhoods by trusted locals
                </motion.p>
                
                {/* Search Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="relative"
                >
                  {/* Search glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-2xl" />
                  
                  {/* Search Container */}
                  <div className="relative bg-white rounded-2xl p-2 shadow-2xl">
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
                      <button
                        onClick={handleSearch}
                        className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:scale-105 flex items-center justify-center gap-2"
                      >
                        <Search className="w-5 h-5" />
                        Search
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Quick Filters */}
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    <span className="text-sm text-gray-400 font-medium self-center">Quick:</span>
                    {placeTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => navigate('/request')}
                        className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 text-sm hover:scale-105"
                      >
                        <span>{type.icon}</span>
                        {type.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Floating Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mt-12"
          >
            {[
              { label: 'Verified Places', value: '2,400+', gradient: 'from-blue-500 to-cyan-500', icon: CheckCircle },
              { label: 'Avg Response', value: '6-12hr', gradient: 'from-purple-500 to-pink-500', icon: Clock },
              { label: 'User Rating', value: '4.8★', gradient: 'from-yellow-500 to-orange-500', icon: Sparkles },
              { label: 'Cities', value: '45+', gradient: 'from-green-500 to-emerald-500', icon: MapPin },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                {/* Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity rounded-2xl`} />
                
                {/* Card */}
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all shadow-xl">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-white/80" />
                  <div className={`text-3xl font-bold mb-1 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex flex-wrap gap-6 justify-center items-center"
          >
            {[
              { icon: CheckCircle, text: 'AI-Powered', color: 'text-emerald-400' },
              { icon: Shield, text: 'Trusted Verifiers', color: 'text-blue-400' },
              { icon: Zap, text: 'Real-Time', color: 'text-purple-400' },
            ].map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-sm"
              >
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-gray-300 font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-[5]" />
      </section>

      {/* How It Works - Floating Cards */}
      <section className="relative py-24 bg-black overflow-hidden">
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-bold px-4 py-2 rounded-full mb-6">
              HOW IT WORKS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Three Simple Steps
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get verified information in hours, not days
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: Search, title: 'Search & Request', description: 'Submit a verification request with your specific requirements', gradient: 'from-blue-500 to-cyan-500' },
              { step: '02', icon: MapPin, title: 'Local Verifies', description: 'A trusted local visits and completes your checklist', gradient: 'from-purple-500 to-pink-500' },
              { step: '03', icon: Zap, title: 'Get AI Report', description: 'Receive comprehensive report with insights and photos', gradient: 'from-orange-500 to-red-500' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 rounded-3xl`} />
                
                {/* Card */}
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-3xl p-8 h-full transition-all duration-300">
                  {/* Step number */}
                  <div className={`absolute top-8 right-8 text-6xl font-bold bg-gradient-to-br ${item.gradient} bg-clip-text text-transparent opacity-20`}>
                    {item.step}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Animated patterns */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 2px, transparent 2px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 2px, transparent 2px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto text-center px-4"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Ready to find your
            <br />
            <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 bg-clip-text text-transparent">
              perfect place?
            </span>
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-white/90">
            Join 2,400+ users who trust Locals.com for verified information
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/request')}
              className="group bg-white text-gray-900 hover:bg-gray-100 px-10 py-5 rounded-2xl text-lg font-bold transition-all shadow-2xl flex items-center justify-center gap-2"
            >
              Start Searching
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/local/login')}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white/30 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all"
            >
              Become a Verifier
            </motion.button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
