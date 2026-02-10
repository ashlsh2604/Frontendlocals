import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Search, MapPin, Shield, Clock, ArrowRight, Sparkles, Zap, Star, TrendingUp, CheckCircle } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const popularCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad'
  ];

  const placeTypes = [
    { icon: '🏨', label: 'Hotels', value: 'hotel' },
    { icon: '🏫', label: 'Schools', value: 'school' },
    { icon: '🏘️', label: 'Neighborhoods', value: 'neighborhood' },
    { icon: '🏢', label: 'PG/Hostels', value: 'pg' },
  ];

  const handleSearch = () => {
    navigate('/request');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - Dark Gradient with Search Focus */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Dark Gradient Background - Multiple Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-purple-900/30 to-cyan-900/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }} />
        
        {/* Spotlight Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-radial from-blue-500/15 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-gradient-radial from-purple-500/10 via-transparent to-transparent blur-3xl" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-[8%] hidden lg:block">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full" />
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl">
              <MapPin className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
            </div>
          </div>
        </div>
        
        <div className="absolute top-1/3 right-[10%] hidden lg:block">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/30 blur-2xl rounded-full" />
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl">
              <Shield className="w-10 h-10 text-purple-400 drop-shadow-[0_0_12px_rgba(192,132,252,0.8)]" />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-1/4 right-[15%] hidden xl:block">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/30 blur-2xl rounded-full" />
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-2xl">
              <CheckCircle className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="text-center mb-12">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2.5 mb-8 shadow-lg">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-200">Trusted by 2,400+ users across 45 cities</span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight text-white">
              Find Verified Places
              <span className="block mt-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(34,211,238,0.4)]">
                Near You, Instantly
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg md:text-xl lg:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Search for hotels, schools, neighborhoods & more verified by trusted locals using AI-powered insights
            </p>
          </div>
          
          {/* PROMINENT SEARCH BAR - Main Focus */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="relative">
              {/* Glow effect behind search bar */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 blur-2xl" />
              
              {/* Main Search Container */}
              <div className="relative bg-white rounded-2xl shadow-2xl shadow-blue-500/20 p-2">
                <div className="flex flex-col lg:flex-row gap-2">
                  {/* Search Input */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search for hotels, schools, neighborhoods..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 text-base"
                    />
                  </div>
                  
                  {/* City Selector */}
                  <div className="relative lg:w-48">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 text-gray-900 appearance-none cursor-pointer text-base bg-white"
                    >
                      <option value="">Select City</option>
                      {popularCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Search Button */}
                  <button
                    onClick={handleSearch}
                    className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-base transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/50 hover:scale-[1.02] flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <Search className="w-5 h-5" />
                    Search Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Quick Filter Buttons */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <div className="text-sm text-gray-400 font-medium self-center">Quick search:</div>
              {placeTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => {
                    setSelectedType(type.value);
                    navigate('/request');
                  }}
                  className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 text-sm hover:scale-105"
                >
                  <span className="text-lg">{type.icon}</span>
                  {type.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
              <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                2,400+
              </div>
              <div className="text-sm text-gray-400">Verified Places</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
              <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                6-12hr
              </div>
              <div className="text-sm text-gray-400">Avg Response</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
              <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                4.8★
              </div>
              <div className="text-sm text-gray-400">User Rating</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
              <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                45+
              </div>
              <div className="text-sm text-gray-400">Cities</div>
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap gap-6 justify-center items-center text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>AI-Powered Verification</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>Trusted Local Verifiers</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>Real-Time Updates</span>
            </div>
          </div>
        </div>
        
        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Featured Verifications Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-bold px-4 py-2 rounded-full mb-4">
              <TrendingUp className="w-4 h-4" />
              TRENDING NOW
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Recently Verified Places
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real verification reports from users just like you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Verification Card 1 */}
            <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all hover:-translate-y-1">
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-500">
                <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </div>
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-medium">
                  🏨 Hotel
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sunrise Grand Hotel</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  Andheri West, Mumbai
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-bold text-gray-900">4.8</span>
                  </div>
                  <span className="text-sm text-gray-500">Trust Score</span>
                </div>
                <button
                  onClick={() => navigate('/report/1')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 group-hover:scale-105"
                >
                  View Report
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Verification Card 2 */}
            <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all hover:-translate-y-1">
              <div className="relative h-48 bg-gradient-to-br from-emerald-500 to-teal-500">
                <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </div>
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-medium">
                  🏫 School
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Green Valley International</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  Whitefield, Bangalore
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-bold text-gray-900">4.9</span>
                  </div>
                  <span className="text-sm text-gray-500">Trust Score</span>
                </div>
                <button
                  onClick={() => navigate('/report/2')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 group-hover:scale-105"
                >
                  View Report
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Verification Card 3 */}
            <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all hover:-translate-y-1">
              <div className="relative h-48 bg-gradient-to-br from-orange-500 to-pink-500">
                <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </div>
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-medium">
                  🏘️ Neighborhood
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Koramangala 4th Block</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  Koramangala, Bangalore
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-bold text-gray-900">4.7</span>
                  </div>
                  <span className="text-sm text-gray-500">Trust Score</span>
                </div>
                <button
                  onClick={() => navigate('/report/3')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 group-hover:scale-105"
                >
                  View Report
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold text-lg hover:underline"
            >
              Browse All Verifications
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get verified information about any place in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-blue-200 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/30">
                <Search className="w-8 h-8 text-white" />
              </div>
              <div className="inline-block bg-blue-100 text-blue-700 text-sm font-bold px-3 py-1 rounded-full mb-4">STEP 1</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Search & Request</h3>
              <p className="text-gray-600 leading-relaxed">
                Search for any place or submit a verification request with your specific requirements and priorities.
              </p>
            </div>

            <div className="group bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-green-200 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-green-500/30">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div className="inline-block bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full mb-4">STEP 2</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Local Verifies</h3>
              <p className="text-gray-600 leading-relaxed">
                A trusted local visits the location, takes photos, and completes your custom checklist within hours.
              </p>
            </div>

            <div className="group bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-purple-200 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/30">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="inline-block bg-purple-100 text-purple-700 text-sm font-bold px-3 py-1 rounded-full mb-4">STEP 3</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Get AI Report</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive a comprehensive report with AI-powered insights, trust scores, and verified photos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-blue-100 text-blue-700 text-sm font-bold px-4 py-2 rounded-full mb-6">
                WHY CHOOSE US
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 leading-tight">
                Built on Trust & Technology
              </h2>
              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-blue-600 transition-colors">
                    <Clock className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Lightning Fast</h4>
                    <p className="text-gray-600 leading-relaxed">Get verification reports within 6-12 hours, not days</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-green-600 transition-colors">
                    <Shield className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Verified Locals</h4>
                    <p className="text-gray-600 leading-relaxed">All verifiers are background-checked and community-rated</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-purple-600 transition-colors">
                    <Sparkles className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">AI-Enhanced</h4>
                    <p className="text-gray-600 leading-relaxed">Computer vision validates photos and detects anomalies</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-2xl text-white shadow-xl shadow-blue-500/30">
                <div className="text-5xl font-bold mb-2">2,400+</div>
                <div className="text-blue-100">Verifications</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-2xl text-white shadow-xl shadow-green-500/30">
                <div className="text-5xl font-bold mb-2">850+</div>
                <div className="text-green-100">Trusted Locals</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 rounded-2xl text-white shadow-xl shadow-purple-500/30">
                <div className="text-5xl font-bold mb-2">4.8/5</div>
                <div className="text-purple-100">Average Rating</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-2xl text-white shadow-xl shadow-orange-500/30">
                <div className="text-5xl font-bold mb-2">45</div>
                <div className="text-orange-100">Cities Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/30 via-transparent to-transparent" />
        
        {/* Animated orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }} />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Ready to find your perfect place?
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-gray-300 font-light">
            Search verified locations or request a custom verification report today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/request')}
              className="group bg-white text-gray-900 hover:bg-gray-100 px-10 py-5 rounded-xl text-lg font-bold transition-all shadow-2xl hover:scale-105 flex items-center justify-center gap-2"
            >
              Start Searching
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/local/login')}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white px-10 py-5 rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-2"
            >
              Become a Verifier
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
