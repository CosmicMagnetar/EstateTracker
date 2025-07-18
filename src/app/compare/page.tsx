"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Home,
  Building2,
  Star,
  ArrowRight,
  Menu,
  X,
  Sun,
  Moon,
  Bed,
  Bath,
  Square,
  Car,
  Wifi,
  Shield,
  Heart,
  Share2,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
  DollarSign,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Calculator,
  Clock,
  Users,
  Award,
  Zap,
  Target,
  Globe2,
  Camera,
  Twitter,
  Linkedin,
  Github,
  Instagram
} from "lucide-react";
import Link from "next/link";
import { useSettings } from "../settings-context";
import ToggleSwitch from "../components/ToggleSwitch";

export default function ComparePage() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isDark, toggleDark, notifications, toggleNotifications } = useSettings();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState([0, 1, 2]);
  const [viewMode, setViewMode] = useState("cards");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [propertyType, setPropertyType] = useState("all");
  const [sortBy, setSortBy] = useState("price");
  const cursorRef = useRef<HTMLDivElement>(null);



 const properties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "₹1,250,000",
      priceValue: 1250000,
      location: "Banjara Hills, Hyderabad",
      type: "Luxury Villa",
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
      parking: 2,
      yearBuilt: 2020,
      features: ["Swimming Pool", "Garden", "Security", "Gym", "Elevator"],
      priceHistory: [1200000, 1220000, 1250000],
      roi: 8.5,
      rating: 4.8,
      views: 1250,
      lastUpdated: "2 hours ago",
      agent: "Priya Sharma",
      description: "Luxurious villa in prime location with modern amenities"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "₹890,000",
      priceValue: 890000,
      location: "Gachibowli, Hyderabad",
      type: "Modern Apartment",
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      parking: 1,
      yearBuilt: 2022,
      features: ["Balcony", "Security", "Gym", "Club House", "Power Backup"],
      priceHistory: [850000, 870000, 890000],
      roi: 9.2,
      rating: 4.6,
      views: 890,
      lastUpdated: "4 hours ago",
      agent: "Rajesh Kumar",
      description: "Contemporary apartment in tech hub with excellent connectivity"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "₹650,000",
      priceValue: 650000,
      location: "Kondapur, Hyderabad",
      type: "Cozy Townhouse",
      bedrooms: 2,
      bathrooms: 2,
      area: 1400,
      parking: 1,
      yearBuilt: 2021,
      features: ["Terrace", "Security", "Park View", "Storage", "Modular Kitchen"],
      priceHistory: [620000, 635000, 650000],
      roi: 7.8,
      rating: 4.4,
      views: 567,
      lastUpdated: "6 hours ago",
      agent: "Anita Reddy",
      description: "Comfortable townhouse perfect for small families"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "₹1,890,000",
      priceValue: 1890000,
      location: "Jubilee Hills, Hyderabad",
      type: "Penthouse",
      bedrooms: 5,
      bathrooms: 4,
      area: 3200,
      parking: 3,
      yearBuilt: 2019,
      features: ["Private Pool", "Sky Garden", "Elevator", "Servant Room", "Wine Cellar"],
      priceHistory: [1800000, 1850000, 1890000],
      roi: 6.5,
      rating: 4.9,
      views: 2100,
      lastUpdated: "1 hour ago",
      agent: "Vikram Singh",
      description: "Exclusive penthouse with panoramic city views"
    }
  ];


  const sortedProperties = [...properties]
    .filter(
      (p) =>
        (propertyType === "all" || p.type.toLowerCase().includes(propertyType.toLowerCase())) &&
        p.priceValue >= priceRange[0] &&
        p.priceValue <= priceRange[1]
    )
    .sort((a, b) => {
      if (sortBy === "price") return a.priceValue - b.priceValue;
      if (sortBy === "area") return a.area - b.area;
      if (sortBy === "bedrooms") return a.bedrooms - b.bedrooms;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const togglePropertySelection = (index: number) => {
    setSelectedProperties(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : prev.length < 3 ? [...prev, index] : prev
    );
  };

  const getComparisonFeatures = () => {
    const allFeatures = new Set();
    selectedProperties.forEach(index => {
      properties[index].features.forEach(feature => allFeatures.add(feature));
    });
    return Array.from(allFeatures);
  };

  const formatPrice = (price: string | number | bigint) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(Number(price));
  };

  const themeClasses = {
    bg: isDark ? 'bg-gray-900' : 'bg-gray-50',
    text: isDark ? 'text-white' : 'text-gray-900',
    textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
    textMuted: isDark ? 'text-gray-500' : 'text-gray-400',
    border: isDark ? 'border-gray-700' : 'border-gray-200',
    borderHover: isDark ? 'hover:border-gray-600' : 'hover:border-gray-300',
    bgHover: isDark ? 'hover:bg-gray-800' : 'hover:bg-white',
    navBg: isDark ? 'bg-gray-900/90' : 'bg-white/90',
    gradient: isDark ? 'from-gray-900 via-gray-800 to-gray-900' : 'from-white via-gray-50 to-white',
    cardBg: isDark ? 'bg-gray-800' : 'bg-white',
    cursor: isDark ? 'bg-green-400' : 'bg-green-500',
    accent: 'text-green-500',
    accentBg: isDark ? 'bg-green-500' : 'bg-green-500',
    accentHover: isDark ? 'hover:bg-green-600' : 'hover:bg-green-600',
    accentBorder: 'border-green-500',
    accentGlow: isDark ? 'shadow-green-500/20' : 'shadow-green-500/10',
    selectedBg: isDark ? 'bg-green-900/30' : 'bg-green-50',
    selectedBorder: 'border-green-500'
  };

const Logo = () => (
    <Link href="/" className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-10 h-10 rounded-full flex items-center justify-center">
          <img src="/logo.png" />
        </div>
      </div>
      <span className="text-2xl font-light tracking-wider">ZonePulse</span>
    </Link>
  );

  return (
    <div className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} overflow-x-hidden transition-colors duration-700`}>
      {/* Custom Cursor */}
      {/* Navigation */}

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl`}
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.002)
            }}
          />
          <div 
            className={`absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-emerald-500/20 to-green-400/20 rounded-full blur-3xl`}
            style={{
              transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.002)
            }}
          />
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-none tracking-tight">
            <span className="block">Compare</span>
            <span className="block bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Properties</span>
          </h1>
          <p className={`text-xl md:text-2xl font-light mb-12 max-w-3xl mx-auto ${themeClasses.textSecondary} leading-relaxed`}>
            Make informed decisions with side-by-side property comparisons, market insights, and detailed analytics.
          </p>
          
          {/* Quick Stats */}
          <div className="flex justify-center items-center space-x-8 mb-16">
            <div className="text-center">
              <div className="text-2xl font-light text-green-500">{properties.length}</div>
              <div className={`text-sm ${themeClasses.textMuted} tracking-wider`}>Properties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-emerald-500">{selectedProperties.length}</div>
              <div className={`text-sm ${themeClasses.textMuted} tracking-wider`}>Selected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-green-600">Live</div>
              <div className={`text-sm ${themeClasses.textMuted} tracking-wider`}>Data</div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className={`py-8 px-8 ${themeClasses.cardBg} border-b ${themeClasses.border}`}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${themeClasses.border} ${themeClasses.bgHover} transition-all duration-300`}
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-light">Filters</span>
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-light">Sort by:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-3 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} text-sm font-light`}
              >
                <option value="price">Price</option>
                <option value="area">Area</option>
                <option value="bedrooms">Bedrooms</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-2 rounded-lg ${viewMode === 'cards' ? 'bg-green-500 text-white' : `${themeClasses.border} border`} transition-all duration-300`}
              >
                <Building2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg ${viewMode === 'table' ? 'bg-green-500 text-white' : `${themeClasses.border} border`} transition-all duration-300`}
              >
                <BarChart3 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-sm font-light">
              {selectedProperties.length} of {properties.length} selected
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className={`mt-6 p-6 border ${themeClasses.border} rounded-2xl ${themeClasses.cardBg}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-light mb-2">Property Type</label>
                <select 
                  value={propertyType} 
                  onChange={(e) => setPropertyType(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} text-sm font-light`}
                >
                  <option value="all">All Types</option>
                  <option value="villa">Villa</option>
                  <option value="apartment">Apartment</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="penthouse">Penthouse</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-light mb-2">Min Price</label>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className={`w-full px-3 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} text-sm font-light`}
                  placeholder="Min Price"
                />
              </div>
              
              <div>
                <label className="block text-sm font-light mb-2">Max Price</label>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className={`w-full px-3 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} text-sm font-light`}
                  placeholder="Max Price"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Properties Grid */}
      {viewMode === 'cards' && (
        <section className="py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {properties.map((property, index) => (
                <div
                  key={property.id}
                  className={`group relative overflow-hidden rounded-2xl border ${selectedProperties.includes(index) ? themeClasses.selectedBorder : themeClasses.border} transition-all duration-700 hover:shadow-2xl hover:scale-[1.02] ${selectedProperties.includes(index) ? themeClasses.selectedBg : themeClasses.cardBg}`}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.type}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-green-500 text-white text-xs font-light rounded-full">
                        {property.type}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                        <Heart className="w-4 h-4 text-black" />
                      </button>
                      <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                        <Share2 className="w-4 h-4 text-black" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-light text-green-500">{property.price}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-light">{property.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 mb-4">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className={`text-sm font-light ${themeClasses.textSecondary}`}>{property.location}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Bed className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-light">{property.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Bath className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-light">{property.bathrooms} Baths</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Square className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-light">{property.area} sqft</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Car className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-light">{property.parking} Parking</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => togglePropertySelection(index)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-light transition-all duration-300 ${
                          selectedProperties.includes(index)
                            ? 'bg-green-500 text-white'
                            : `border ${themeClasses.accentBorder} text-green-500 hover:bg-green-500 hover:text-white`
                        }`}
                      >
                        {selectedProperties.includes(index) ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            <span>Selected</span>
                          </>
                        ) : (
                          <>
                            <Target className="w-4 h-4" />
                            <span>Compare</span>
                          </>
                        )}
                      </button>
                      
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className={`text-xs font-light ${themeClasses.textMuted}`}>{property.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Comparison Table */}
      {viewMode === 'table' && (
        <section className="py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className={`${themeClasses.cardBg} border-b ${themeClasses.border}`}>
                    <th className="text-left p-6 font-light">Property</th>
                    <th className="text-left p-6 font-light">Price</th>
                    <th className="text-left p-6 font-light">Location</th>
                    <th className="text-left p-6 font-light">Bedrooms</th>
                    <th className="text-left p-6 font-light">Bathrooms</th>
                    <th className="text-left p-6 font-light">Area</th>
                    <th className="text-left p-6 font-light">ROI</th>
                    <th className="text-left p-6 font-light">Rating</th>
                    <th className="text-left p-6 font-light">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property, index) => (
                    <tr key={property.id} className={`border-b ${themeClasses.border} hover:${themeClasses.bgHover} ${selectedProperties.includes(index) ? themeClasses.selectedBg : ''}`}>
                      <td className="p-6">
                        <div className="flex items-center space-x-4">
                          <img src={property.image} alt={property.type} className="w-16 h-16 object-cover rounded-lg" />
                          <div>
                            <div className="font-light">{property.type}</div>
                            <div className={`text-sm ${themeClasses.textSecondary}`}>{property.yearBuilt}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-green-500 font-light">{property.price}</td>
                      <td className="p-6 font-light">{property.location}</td>
                      <td className="p-6 font-light">{property.bedrooms}</td>
                      <td className="p-6 font-light">{property.bathrooms}</td>
                      <td className="p-6 font-light">{property.area} sqft</td>
                      <td className="p-6">
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="font-light">{property.roi}%</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-light">{property.rating}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <button
                          onClick={() => togglePropertySelection(index)}
                          className={`px-4 py-2 rounded-full text-sm font-light transition-all duration-300 ${
                            selectedProperties.includes(index)
                              ? 'bg-green-500 text-white'
                              : `border ${themeClasses.accentBorder} text-green-500 hover:bg-green-500 hover:text-white`
                          }`}
                        >
                          {selectedProperties.includes(index) ? 'Selected' : 'Select'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Detailed Comparison */}
      {selectedProperties.length > 1 && (
        <section className={`py-16 px-8 ${themeClasses.cardBg} border-t ${themeClasses.border}`}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-light mb-12 text-center">
              Detailed <span className="text-green-500">Comparison</span>
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {selectedProperties.map((index) => {
                const property = properties[index];
                return (
                  <div key={property.id} className={`p-8 border ${themeClasses.border} rounded-2xl ${themeClasses.cardBg}`}>
                    <img src={property.image}                      alt={property.type}
                      className="w-full h-48 object-cover rounded-xl mb-6"
                    />
                    <h3 className="text-2xl font-light text-green-500 mb-2">{property.type}</h3>
                    <p className={`text-sm font-light mb-4 ${themeClasses.textSecondary}`}>{property.location}</p>
                    <div className="space-y-2 text-sm">
                      <p><strong>Price:</strong> {property.price}</p>
                      <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                      <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
                      <p><strong>Area:</strong> {property.area} sqft</p>
                      <p><strong>Year Built:</strong> {property.yearBuilt}</p>
                      <p><strong>Agent:</strong> {property.agent}</p>
                      <p><strong>ROI:</strong> {property.roi}%</p>
                      <p><strong>Views:</strong> {property.views}</p>
                      <p className="text-sm mt-4 text-green-400 italic">"{property.description}"</p>
                    </div>

                    <div className="mt-6">
                      <p className="font-medium mb-2">Features:</p>
                      <ul className="list-disc list-inside text-sm text-green-500 space-y-1">
                        {property.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className={`text-center py-6 mt-16 ${isDark ? "bg-gray-800 text-white" : "bg-gray-900 text-white"}`}>
        <p className="text-sm font-light">© 2025 ZonePulse. All rights reserved.</p>
      </footer>
    </div>
  );
}
