import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Star, Navigation, Filter, TrendingUp, Award, CheckCircle, Hotel, Dumbbell, Home, ChevronDown, X, ArrowUpDown, Clock, Zap, Target, Sparkles, Radio } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Navbar } from '../components/Navbar';
import { PlaceCard } from '../components/PlaceCard';

interface Place {
  id: string;
  name: string;
  type: 'hotel' | 'gym' | 'neighborhood';
  rating: number;
  verificationCount: number;
  distance: number; // in km
  latitude: number;
  longitude: number;
  address: string;
  price?: string;
  verified: boolean;
  trending: boolean;
  recentlyVerified: boolean;
  image: string;
  amenities: string[];
}

export default function NearbyPlaces() {
  const location = useLocation();
  const navigate = useNavigate();
  const { latitude, longitude } = location.state || { latitude: 12.9716, longitude: 77.5946 }; // Default to Bangalore
  
  const [selectedType, setSelectedType] = useState<'all' | 'hotel' | 'gym' | 'neighborhood'>('all');
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'verifications'>('distance');
  const [showFilters, setShowFilters] = useState(false);
  const [maxDistance, setMaxDistance] = useState(10);
  const [isChangingDistance, setIsChangingDistance] = useState(false);

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Mock highly recommended places near user
  const allPlaces: Place[] = useMemo(() => {
    const baseLatitude = latitude;
    const baseLongitude = longitude;
    
    // Generate random coordinates within 10km radius
    const generateNearbyCoords = (distance: number) => {
      const angle = Math.random() * 2 * Math.PI;
      const latOffset = (distance / 111) * Math.cos(angle); // ~111 km per degree latitude
      const lonOffset = (distance / (111 * Math.cos(baseLatitude * Math.PI / 180))) * Math.sin(angle);
      return {
        latitude: baseLatitude + latOffset,
        longitude: baseLongitude + lonOffset
      };
    };

    const places = [
      // Hotels
      {
        id: 'h1',
        name: 'Grand Plaza Hotel',
        type: 'hotel' as const,
        rating: 4.8,
        verificationCount: 156,
        ...generateNearbyCoords(2.3),
        address: 'MG Road, Bangalore',
        price: '₹12,000-20,000/night',
        verified: true,
        trending: true,
        recentlyVerified: true,
        image: 'https://images.unsplash.com/photo-1720540244592-b4124532b318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5fGVufDF8fHx8MTc3MDYyOTI2NHww&ixlib=rb-4.1.0&q=80&w=1080',
        amenities: ['Pool', 'Gym', 'Restaurant', 'WiFi', 'Parking']
      },
      {
        id: 'h2',
        name: 'Skyline Suites',
        type: 'hotel' as const,
        rating: 4.6,
        verificationCount: 98,
        ...generateNearbyCoords(5.7),
        address: 'Koramangala, Bangalore',
        price: '₹16,000-28,000/night',
        verified: true,
        trending: false,
        recentlyVerified: true,
        image: 'https://images.unsplash.com/photo-1766928210443-0be92ed5884a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMHN1aXRlJTIwYmVkcm9vbXxlbnwxfHx8fDE3NzA2OTQxODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        amenities: ['Rooftop Bar', 'Spa', 'WiFi', '24/7 Service']
      },
      {
        id: 'h3',
        name: 'Comfort Inn Downtown',
        type: 'hotel' as const,
        rating: 4.4,
        verificationCount: 203,
        ...generateNearbyCoords(1.2),
        address: 'Indiranagar, Bangalore',
        price: '₹6,500-9,500/night',
        verified: true,
        trending: true,
        recentlyVerified: false,
        image: 'https://images.unsplash.com/photo-1762420874081-b93a5fb337f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGV4dGVyaW9yJTIwbmlnaHQlMjBsaWdodHN8ZW58MXx8fHwxNzcwNzM1OTY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
        amenities: ['Free Breakfast', 'WiFi', 'Parking']
      },
      {
        id: 'h4',
        name: 'The Riverside Hotel',
        type: 'hotel' as const,
        rating: 4.9,
        verificationCount: 187,
        ...generateNearbyCoords(8.4),
        address: 'Whitefield, Bangalore',
        price: '₹24,000-40,000/night',
        verified: true,
        trending: true,
        recentlyVerified: true,
        image: 'https://images.unsplash.com/photo-1761476328661-e9a05bb7fca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsJTIwd2F0ZXJmcm9udCUyMHZpZXd8ZW58MXx8fHwxNzcwNzM1OTY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
        amenities: ['River View', 'Fine Dining', 'Spa', 'Concierge']
      },
      
      // Gyms
      {
        id: 'g1',
        name: 'PowerFit Gym',
        type: 'gym' as const,
        rating: 4.7,
        verificationCount: 234,
        ...generateNearbyCoords(3.1),
        address: 'HSR Layout, Bangalore',
        price: '₹4,000/month',
        verified: true,
        trending: true,
        recentlyVerified: true,
        image: 'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBneW0lMjBlcXVpcG1lbnQlMjB3ZWlnaHRzfGVufDF8fHx8MTc3MDczNTk2NHww&ixlib=rb-4.1.0&q=80&w=1080',
        amenities: ['Weights', 'Cardio', 'Classes', 'Showers', 'Lockers']
      },
      {
        id: 'g2',
        name: 'Elite Performance Center',
        type: 'gym' as const,
        rating: 4.9,
        verificationCount: 167,
        ...generateNearbyCoords(6.2),
        address: 'Brigade Road, Bangalore',
        price: '₹6,500/month',
        verified: true,
        trending: true,
        recentlyVerified: true,
        image: 'https://images.unsplash.com/photo-1761971975962-9cc397e2ba2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZml0bmVzcyUyMGNlbnRlciUyMGludGVyaW9yfGVufDF8fHx8MTc3MDczNTk2NHww&ixlib=rb-4.1.0&q=80&w=1080',
        amenities: ['Personal Training', 'Pool', 'Sauna', 'Smoothie Bar']
      },
      {
        id: 'g3',
        name: '24/7 Fitness Hub',
        type: 'gym' as const,
        rating: 4.5,
        verificationCount: 312,
        ...generateNearbyCoords(4.8),
        address: 'Jayanagar, Bangalore',
        price: '₹2,800/month',
        verified: true,
        trending: false,
        recentlyVerified: false,
        image: 'https://images.unsplash.com/photo-1761971975769-97e598bf526b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBpbnRlcmlvciUyMHdvcmtvdXQlMjBzcGFjZXxlbnwxfHx8fDE3NzA3MzU5NjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        amenities: ['24/7 Access', 'Cardio', 'Weights', 'WiFi']
      },
      {
        id: 'g4',
        name: 'Yoga & Wellness Studio',
        type: 'gym' as const,
        rating: 4.8,
        verificationCount: 145,
        ...generateNearbyCoords(2.9),
        address: 'Malleshwaram, Bangalore',
        price: '₹4,900/month',
        verified: true,
        trending: true,
        recentlyVerified: true,
        image: 'https://images.unsplash.com/photo-1767611120077-3697335ec748?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwc3R1ZGlvJTIwcGVhY2VmdWwlMjBtZWRpdGF0aW9ufGVufDF8fHx8MTc3MDczNTk2NXww&ixlib=rb-4.1.0&q=80&w=1080',
        amenities: ['Yoga Classes', 'Meditation', 'Spa', 'Wellness Programs']
      },
      
      // Neighborhoods
      {
        id: 'n1',
        name: 'Indiranagar Arts District',
        type: 'neighborhood' as const,
        rating: 4.6,
        verificationCount: 421,
        ...generateNearbyCoords(1.5),
        address: 'Indiranagar Area, Bangalore',
        verified: true,
        trending: true,
        recentlyVerified: true,
        image: 'https://images.unsplash.com/photo-1627087823136-a7668a7a06f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGFydHMlMjBkaXN0cmljdCUyMHN0cmVldHxlbnwxfHx8fDE3NzA3MzU5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        amenities: ['Galleries', 'Cafes', 'Nightlife', 'Public Transit', 'Parks']
      },
      {
        id: 'n2',
        name: 'Ulsoor Lake Residential',
        type: 'neighborhood' as const,
        rating: 4.8,
        verificationCount: 289,
        ...generateNearbyCoords(7.3),
        address: 'Ulsoor District, Bangalore',
        verified: true,
        trending: true,
        recentlyVerified: true,
        image: 'https://images.unsplash.com/photo-1761613788675-503cb20ee73e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMG5laWdoYm9yaG9vZCUyMHRyZWVzJTIwaG91c2VzfGVufDF8fHx8MTc3MDczNTk2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
        amenities: ['Family Friendly', 'Schools', 'Parks', 'Shopping', 'Safe']
      },
      {
        id: 'n3',
        name: 'Electronic City Tech Hub',
        type: 'neighborhood' as const,
        rating: 4.7,
        verificationCount: 356,
        ...generateNearbyCoords(3.6),
        address: 'Electronic City, Bangalore',
        verified: true,
        trending: true,
        recentlyVerified: false,
        image: 'https://images.unsplash.com/photo-1766058481154-02ce7abd670b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1cmJhbiUyMGRldmVsb3BtZW50JTIwYnVpbGRpbmdzfGVufDF8fHx8MTc3MDczNTk2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
        amenities: ['Co-working Spaces', 'Startups', 'Cafes', 'Fast Internet']
      },
      {
        id: 'n4',
        name: 'Basavanagudi Heritage',
        type: 'neighborhood' as const,
        rating: 4.9,
        verificationCount: 512,
        ...generateNearbyCoords(9.1),
        address: 'Basavanagudi, Bangalore',
        verified: true,
        trending: false,
        recentlyVerified: true,
        image: 'https://images.unsplash.com/photo-1643573759086-20bfa523d40e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpYyUyMGFyY2hpdGVjdHVyZSUyMHN0cmVldCUyMGV1cm9wZXxlbnwxfHx8fDE3NzA3MzU5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
        amenities: ['Historic Sites', 'Temples', 'Restaurants', 'Cultural Tours']
      },
    ];

    // Calculate actual distances
    return places.map(place => ({
      ...place,
      distance: calculateDistance(baseLatitude, baseLongitude, place.latitude, place.longitude)
    }));
  }, [latitude, longitude]);

  // Filter and sort places
  const filteredPlaces = useMemo(() => {
    let filtered = allPlaces.filter(place => place.distance <= maxDistance);
    
    if (selectedType !== 'all') {
      filtered = filtered.filter(place => place.type === selectedType);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'rating':
          return b.rating - a.rating;
        case 'verifications':
          return b.verificationCount - a.verificationCount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [allPlaces, selectedType, sortBy, maxDistance]);

  // Get categorized places
  const categorizedPlaces = useMemo(() => {
    const filtered = allPlaces.filter(place => place.distance <= maxDistance);
    
    return {
      hotels: filtered.filter(p => p.type === 'hotel').sort((a, b) => {
        if (sortBy === 'distance') return a.distance - b.distance;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.verificationCount - a.verificationCount;
      }),
      gyms: filtered.filter(p => p.type === 'gym').sort((a, b) => {
        if (sortBy === 'distance') return a.distance - b.distance;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.verificationCount - a.verificationCount;
      }),
      neighborhoods: filtered.filter(p => p.type === 'neighborhood').sort((a, b) => {
        if (sortBy === 'distance') return a.distance - b.distance;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.verificationCount - a.verificationCount;
      })
    };
  }, [allPlaces, sortBy, maxDistance]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hotel': return Hotel;
      case 'gym': return Dumbbell;
      case 'neighborhood': return Home;
      default: return MapPin;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hotel': return 'from-blue-500 to-cyan-500';
      case 'gym': return 'from-orange-500 to-red-500';
      case 'neighborhood': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Navbar */}
      <Navbar />
      
      {/* Animated Background - Similar to Homepage */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dark Gradient Background - Multiple Layers - MAGENTA THEME */}
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-950 via-magenta-950 to-pink-950" />
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-900/40 via-fuchsia-900/30 to-rose-900/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-600/20 via-transparent to-transparent" />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(rgba(236, 72, 153, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(236, 72, 153, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }} />
        
        {/* Spotlight Effects - MAGENTA */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-radial from-fuchsia-500/15 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-gradient-radial from-pink-500/10 via-transparent to-transparent blur-3xl" />
        
        {/* Gradient Orbs - MAGENTA THEME */}
        <motion.div
          className="absolute w-[500px] h-[500px] bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '10%', left: '5%' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 80, 0],
            y: [0, 80, -80, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ bottom: '15%', right: '10%' }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] bg-gradient-to-br from-magenta-400/15 to-fuchsia-400/15 rounded-full blur-3xl"
          animate={{
            x: [0, 120, -60, 0],
            y: [0, -60, 100, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '50%', right: '30%' }}
        />

        {/* Floating Particles - MAGENTA */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-fuchsia-400 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * -200, 0],
              opacity: [0, 1, 0],
              scale: [0, 2 + Math.random() * 3, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Floating Icons - MAGENTA */}
        {[MapPin, Star, Navigation, Hotel, Dumbbell, Home].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          >
            <Icon className="w-8 h-8 text-fuchsia-400/20" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Enhanced Header with Radar Effect */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 relative"
        >
          <div className="flex items-center gap-4 mb-2">
            {/* Animated Icon Container */}
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-3xl blur-2xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <motion.div
                className="relative p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl shadow-2xl border-4 border-white/20"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  y: [0, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="relative">
                  <Navigation className="w-10 h-10 text-white" />
                  {/* Radar Ping Effect */}
                  <motion.div
                    className="absolute inset-0 border-2 border-white/50 rounded-full"
                    animate={{
                      scale: [1, 2.5],
                      opacity: [1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 border-2 border-white/50 rounded-full"
                    animate={{
                      scale: [1, 2.5],
                      opacity: [1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0.7,
                    }}
                  />
                </div>
              </motion.div>
              
              {/* Pulsing Rings */}
              <motion.div
                className="absolute inset-0 border-4 border-orange-400/30 rounded-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </div>

            <div className="flex-1">
              <motion.h1 
                className="text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
              >
                Nearby Places
              </motion.h1>
              <div className="flex items-center gap-3">
                <motion.div
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full border border-purple-200/50 shadow-lg"
                  animate={{
                    boxShadow: [
                      '0 4px 20px rgba(168, 85, 247, 0.2)',
                      '0 4px 30px rgba(168, 85, 247, 0.4)',
                      '0 4px 20px rgba(168, 85, 247, 0.2)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Radio className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-bold text-gray-700">Scanning {maxDistance} km radius</span>
                  <motion.div
                    className="w-2 h-2 bg-green-500 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
                <motion.div
                  className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-full border border-green-200/50"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                >
                  <Sparkles className="w-3 h-3 text-green-600" />
                  <span className="text-xs font-bold text-green-700">{filteredPlaces.length} Verified Spots</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Places</p>
                <motion.p 
                  key={filteredPlaces.length}
                  initial={{ scale: 1.5, color: '#10b981' }}
                  animate={{ scale: 1, color: '#2563eb' }}
                  transition={{ type: 'spring' }}
                  className="text-2xl font-black text-blue-600"
                >
                  {filteredPlaces.length}
                </motion.p>
              </div>
              <MapPin className="w-10 h-10 text-blue-500/30" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Trending</p>
                <p className="text-2xl font-black text-orange-600">
                  {filteredPlaces.filter(p => p.trending).length}
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-orange-500/30" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-black text-yellow-600">
                  {(filteredPlaces.reduce((sum, p) => sum + p.rating, 0) / filteredPlaces.length).toFixed(1)}
                </p>
              </div>
              <Star className="w-10 h-10 text-yellow-500/30" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Verified</p>
                <p className="text-2xl font-black text-green-600">
                  {filteredPlaces.filter(p => p.verified).length}
                </p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500/30" />
            </div>
          </motion.div>
        </motion.div>

        {/* Interactive Distance Control - COMPACT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-lg overflow-hidden"
          >
            {/* Animated Background Gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"
              animate={{
                x: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            <div className="relative z-10 flex items-center gap-4">
              {/* Icon & Title */}
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-md"
                  animate={{
                    scale: isChangingDistance ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Target className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Search Radius</h3>
                  <p className="text-xs text-gray-600">Adjust distance</p>
                </div>
              </div>
              
              {/* Distance Display */}
              <motion.div
                key={maxDistance}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative"
              >
                <div className="flex items-baseline gap-0.5 px-4 py-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-md border border-white/20">
                  <motion.span 
                    className="text-2xl font-black text-white"
                    animate={{
                      scale: isChangingDistance ? [1, 1.15, 1] : 1,
                    }}
                  >
                    {maxDistance}
                  </motion.span>
                  <span className="text-sm font-bold text-white/80">km</span>
                </div>
              </motion.div>

              {/* Slider - Horizontal Compact */}
              <div className="flex-1 relative">
                {/* Slider Track */}
                <div className="relative h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full shadow-inner overflow-hidden">
                  {/* Active Track */}
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-md"
                    animate={{
                      width: `${(maxDistance / 10) * 100}%`,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </motion.div>

                  {/* Slider Input */}
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={maxDistance}
                    onChange={(e) => {
                      setMaxDistance(Number(e.target.value));
                      setIsChangingDistance(true);
                      setTimeout(() => setIsChangingDistance(false), 500);
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />

                  {/* Slider Thumb */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-20"
                    animate={{
                      left: `calc(${((maxDistance - 1) / 9) * 100}%)`,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <motion.div
                      className="relative w-6 h-6 bg-white rounded-full shadow-lg border-2 border-blue-500 -ml-3"
                      animate={{
                        scale: isChangingDistance ? [1, 1.2, 1] : 1,
                      }}
                    >
                      {/* Inner Dot */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="w-2 h-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full"
                          animate={{
                            scale: isChangingDistance ? [1, 1.3, 1] : 1,
                          }}
                        />
                      </div>
                      
                      {/* Outer Ring */}
                      <motion.div
                        className="absolute inset-0 border-2 border-blue-400 rounded-full"
                        animate={{
                          scale: [1, 1.8],
                          opacity: [0.5, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Quick Distance Markers Below */}
                <div className="flex justify-between mt-1 px-1">
                  {[1, 5, 10].map((km) => (
                    <button
                      key={km}
                      onClick={() => {
                        setMaxDistance(km);
                        setIsChangingDistance(true);
                        setTimeout(() => setIsChangingDistance(false), 500);
                      }}
                      className={`text-xs font-semibold transition-colors ${
                        maxDistance === km ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {km}km
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Presets */}
              <div className="flex gap-2">
                {[
                  { label: '🚶', km: 2, tooltip: 'Walk' },
                  { label: '🚴', km: 5, tooltip: 'Bike' },
                  { label: '🚗', km: 10, tooltip: 'Drive' }
                ].map((preset) => (
                  <motion.button
                    key={preset.label}
                    onClick={() => {
                      setMaxDistance(preset.km);
                      setIsChangingDistance(true);
                      setTimeout(() => setIsChangingDistance(false), 500);
                    }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    title={preset.tooltip}
                    className={`
                      w-8 h-8 rounded-lg font-semibold text-sm transition-all flex items-center justify-center
                      ${maxDistance === preset.km
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-md scale-110'
                        : 'bg-white/60 hover:bg-white/80'
                      }
                    `}
                  >
                    <span className="text-base">{preset.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <div className="flex flex-wrap gap-3">
            {[
              { type: 'all', label: 'All Places', icon: MapPin, count: filteredPlaces.length, gradient: 'from-gray-600 to-gray-800' },
              { type: 'hotel', label: 'Hotels', icon: Hotel, count: categorizedPlaces.hotels.length, gradient: 'from-blue-500 to-cyan-500' },
              { type: 'gym', label: 'Gyms & Fitness', icon: Dumbbell, count: categorizedPlaces.gyms.length, gradient: 'from-orange-500 to-red-500' },
              { type: 'neighborhood', label: 'Neighborhoods', icon: Home, count: categorizedPlaces.neighborhoods.length, gradient: 'from-purple-500 to-pink-500' }
            ].map((category, index) => {
              const Icon = category.icon;
              const isActive = selectedType === category.type;
              
              return (
                <motion.button
                  key={category.type}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedType(category.type as any)}
                  className={`
                    relative px-6 py-3 rounded-2xl font-bold transition-all overflow-hidden group
                    ${isActive
                      ? `bg-gradient-to-r ${category.gradient} text-white shadow-xl border-2 border-white/30`
                      : 'bg-white/70 text-gray-700 hover:bg-white/90 shadow-md border border-white/20'
                    }
                  `}
                >
                  {!isActive && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                    />
                  )}
                  
                  <div className="relative z-10 flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                    <span className="text-sm">{category.label}</span>
                    
                    <motion.div
                      className={`
                        px-2.5 py-0.5 rounded-full text-xs font-black
                        ${isActive
                          ? 'bg-white/30 text-white'
                          : 'bg-gray-200 text-gray-700'
                        }
                      `}
                      animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {category.count}
                    </motion.div>
                  </div>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 border-2 border-white/50 rounded-2xl"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Categorized Places Sections */}
        {selectedType === 'all' ? (
          <div className="space-y-12">
            {/* Hotels Section */}
            {categorizedPlaces.hotels.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
                    <Hotel className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      Hotels
                    </h2>
                    <p className="text-sm text-gray-600">{categorizedPlaces.hotels.length} verified properties</p>
                  </div>
                </div>
                
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {categorizedPlaces.hotels.map((place, index) => (
                      <PlaceCard key={place.id} place={place} index={index} getTypeIcon={getTypeIcon} getTypeColor={getTypeColor} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}

            {/* Gyms Section */}
            {categorizedPlaces.gyms.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg">
                    <Dumbbell className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      Gyms & Fitness
                    </h2>
                    <p className="text-sm text-gray-600">{categorizedPlaces.gyms.length} verified centers</p>
                  </div>
                </div>
                
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {categorizedPlaces.gyms.map((place, index) => (
                      <PlaceCard key={place.id} place={place} index={index} getTypeIcon={getTypeIcon} getTypeColor={getTypeColor} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}

            {/* Neighborhoods Section */}
            {categorizedPlaces.neighborhoods.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Neighborhoods
                    </h2>
                    <p className="text-sm text-gray-600">{categorizedPlaces.neighborhoods.length} verified areas</p>
                  </div>
                </div>
                
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {categorizedPlaces.neighborhoods.map((place, index) => (
                      <PlaceCard key={place.id} place={place} index={index} getTypeIcon={getTypeIcon} getTypeColor={getTypeColor} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </div>
        ) : (
          // Single category view
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPlaces.map((place, index) => (
                <PlaceCard key={place.id} place={place} index={index} getTypeIcon={getTypeIcon} getTypeColor={getTypeColor} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* No Results */}
        {filteredPlaces.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <MapPin className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No places found</h3>
            <p className="text-gray-500">Try adjusting your filters or increasing the distance</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}