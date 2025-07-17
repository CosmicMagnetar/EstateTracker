"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Filter,
  MapPin,
  Home,
  Building2,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Eye,
  Heart,
  Bookmark,
  ArrowRight,
  Grid3X3,
  List,
  SlidersHorizontal,
  Star,
  Bath,
  Bed,
  Square,
  DollarSign,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";
import { useSettings } from "../settings-context";
import ToggleSwitch from "../components/ToggleSwitch";

interface Property {
  id: string;
  title: string;
  price: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  city: string;
  image: string;
  rating?: number;
  featured?: boolean;
  priceChange?: number;
}

interface PropertyModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

const PropertyModal: React.FC<PropertyModalProps> = ({ property, isOpen, onClose, isDark }) => {
const [priceHistory, setPriceHistory] = useState<{ month: string; price: number }[]>([]);

  useEffect(() => {
    if (property) {
      const generateRandomPriceHistory = () => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
        return months.map((month) => ({
          month,
          price: Math.floor(Math.random() * (property.price * 1.2 - property.price * 0.8 + 1)) + property.price * 0.8,
        }));
      };
      setPriceHistory(generateRandomPriceHistory());
    }
  }, [property]);

  if (!isOpen || !property) return null;

  const themeClasses = {
    bg: isDark ? 'bg-gray-900' : 'bg-gray-50',
    text: isDark ? 'text-white' : 'text-gray-900',
    textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
    textMuted: isDark ? 'text-gray-500' : 'text-gray-400',
    border: isDark ? 'border-gray-700' : 'border-gray-200',
    cardBg: isDark ? 'bg-gray-800' : 'bg-white',
    modalBg: isDark ? 'bg-gray-800' : 'bg-white',
    overlayBg: isDark ? 'bg-black/70' : 'bg-black/50',
  };


  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${themeClasses.overlayBg} backdrop-blur-sm p-4`}>
      <div className={`relative w-full max-w-4xl max-h-[90vh] ${themeClasses.modalBg} rounded-2xl shadow-2xl overflow-hidden`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 p-2 rounded-full ${themeClasses.cardBg} ${themeClasses.border} hover:bg-gray-100 ${isDark ? 'hover:bg-gray-700' : ''} transition-colors duration-300`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Property Image */}
          <div className="relative">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Property badges */}
            <div className="absolute top-4 left-4 flex items-center space-x-2">
              {property.featured && (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-light">Featured</span>
              )}
              {property.rating && (
                <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-light flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span>{property.rating}</span>
                </span>
              )}
            </div>

            {/* Price change indicator */}
            {property.priceChange && (
              <div className="absolute top-4 right-16">
                <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-light ${
                  property.priceChange > 0 ? 'bg-green-500/80 text-white' : 'bg-red-500/80 text-white'
                }`}>
                  {property.priceChange > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{Math.abs(property.priceChange).toFixed(1)}%</span>
                </span>
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="p-8">
            <h1 className={`text-4xl font-light mb-6 ${themeClasses.text}`}>{property.title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8 text-lg">
              <div>
                <p className={`mb-3 ${themeClasses.text}`}>
                  <span className="font-semibold">City:</span> 
                  <span className={`ml-2 ${themeClasses.textSecondary}`}>{property.city}</span>
                </p>
                <p className={`mb-3 ${themeClasses.text}`}>
                  <span className="font-semibold">Size:</span> 
                  <span className={`ml-2 ${themeClasses.textSecondary}`}>{property.size} sq ft</span>
                </p>
                <p className={`mb-3 ${themeClasses.text}`}>
                  <span className="font-semibold">Bedrooms:</span> 
                  <span className={`ml-2 ${themeClasses.textSecondary}`}>{property.bedrooms}</span>
                </p>
                <p className={`mb-3 ${themeClasses.text}`}>
                  <span className="font-semibold">Bathrooms:</span> 
                  <span className={`ml-2 ${themeClasses.textSecondary}`}>{property.bathrooms}</span>
                </p>
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-4xl font-light mb-2 text-green-500">
                  ₹{(property.price / 100000).toFixed(1)}L
                </p>
                <p className={`text-sm ${themeClasses.textMuted}`}>
                  * Price subject to change
                </p>
              </div>
            </div>

            {/* Property Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className={`p-4 rounded-xl ${themeClasses.cardBg} ${themeClasses.border} text-center`}>
                <Bed className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className={`text-sm font-light ${themeClasses.textSecondary}`}>Bedrooms</div>
                <div className={`text-lg font-semibold ${themeClasses.text}`}>{property.bedrooms}</div>
              </div>
              <div className={`p-4 rounded-xl ${themeClasses.cardBg} ${themeClasses.border} text-center`}>
                <Bath className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className={`text-sm font-light ${themeClasses.textSecondary}`}>Bathrooms</div>
                <div className={`text-lg font-semibold ${themeClasses.text}`}>{property.bathrooms}</div>
              </div>
              <div className={`p-4 rounded-xl ${themeClasses.cardBg} ${themeClasses.border} text-center`}>
                <Square className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className={`text-sm font-light ${themeClasses.textSecondary}`}>Size</div>
                <div className={`text-lg font-semibold ${themeClasses.text}`}>{property.size} sq ft</div>
              </div>
              <div className={`p-4 rounded-xl ${themeClasses.cardBg} ${themeClasses.border} text-center`}>
                <MapPin className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className={`text-sm font-light ${themeClasses.textSecondary}`}>Location</div>
                <div className={`text-lg font-semibold ${themeClasses.text}`}>{property.city}</div>
              </div>
            </div>

            {/* Price History Chart */}
            <div className="mt-10 w-full h-80 mb-20">
              <h2 className={`text-2xl font-light mb-6 ${themeClasses.text}`}>Price History (Last 6 months)</h2>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={priceHistory}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
                  <XAxis
                    dataKey="month"
                    stroke={isDark ? "#d1d5db" : "#4b5563"}
                    tick={{ fontWeight: "600" }}
                  />
                  <YAxis
                    tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                    domain={["auto", "auto"]}
                    stroke={isDark ? "#d1d5db" : "#4b5563"}
                    tick={{ fontWeight: "600" }}
                  />
                  <Tooltip
                    formatter={(value: number) => `₹${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: isDark ? "#1f2937" : "#fff",
                      borderRadius: 8,
                      borderColor: isDark ? "#374151" : "#e5e7eb",
                      color: isDark ? "#d1d5db" : "#111827",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button className="flex-1 py-3 bg-green-500 text-white rounded-xl font-light hover:bg-green-600 transition-colors duration-300 flex items-center justify-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Add to Favorites</span>
              </button>
              <button className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-light hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center space-x-2">
                <Bookmark className="w-4 h-4" />
                <span>Save Property</span>
              </button>
              <button className="flex-1 py-3 bg-purple-500 text-white rounded-xl font-light hover:bg-purple-600 transition-colors duration-300 flex items-center justify-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Schedule Visit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<"title" | "city" | "price" | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBedrooms, setSelectedBedrooms] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 12;
  
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isDark, toggleDark, notifications, toggleNotifications } = useSettings();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
  const newPosition = { x: e.clientX, y: e.clientY };
  setMousePosition(newPosition);
};


  window.addEventListener("mousemove", handleMouseMove);
  return () => window.removeEventListener("mousemove", handleMouseMove);
}, []);


  useEffect(() => {
    // Mock data generation
    const mockProperties: Property[] = Array.from({ length: 50 }, (_, i) => ({
      id: `prop-${i + 1}`,
      title: `Premium ${['Apartment', 'Villa', 'Penthouse', 'Townhouse'][i % 4]} in ${['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune'][i % 6]}`,
      price: Math.floor(Math.random() * 8000000) + 1000000,
      size: Math.floor(Math.random() * 2000) + 800,
      bedrooms: Math.floor(Math.random() * 4) + 1,
      bathrooms: Math.floor(Math.random() * 3) + 1,
      city: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune'][i % 6],
      image: `https://picsum.photos/400/300?random=${i + 1}`,
      rating: Math.floor(Math.random() * 2) + 4,
      featured: Math.random() > 0.8,
      priceChange: (Math.random() - 0.5) * 20
    }));

    setTimeout(() => {
      setProperties(mockProperties);
      setLoading(false);
    }, 1000);
  }, []);

  const openModal = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProperty(null);
    setIsModalOpen(false);
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
    cardBg: isDark ? 'bg-gray-800' : 'bg-white',
    inputBg: isDark ? 'bg-gray-800' : 'bg-white',
    cursor: isDark ? 'bg-green-400' : 'bg-green-500',
    accent: 'text-green-500',
    accentBg: isDark ? 'bg-green-500' : 'bg-green-500',
    accentHover: isDark ? 'hover:bg-green-600' : 'hover:bg-green-600',
    accentBorder: 'border-green-500',
    accentGlow: isDark ? 'shadow-green-500/20' : 'shadow-green-500/10'
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
  // Filter logic
  const filtered = properties.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = !selectedCity || p.city === selectedCity;
    const matchesBedrooms = !selectedBedrooms || p.bedrooms.toString() === selectedBedrooms;
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchesSearch && matchesCity && matchesBedrooms && matchesPrice;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    let compareA = a[sortKey];
    let compareB = b[sortKey];
    if (typeof compareA === "string" && typeof compareB === "string") {
      compareA = compareA.toLowerCase();
      compareB = compareB.toLowerCase();
    }
    if (compareA < compareB) return sortOrder === "asc" ? -1 : 1;
    if (compareA > compareB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const displayed = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSortChange = (key: "title" | "city" | "price" | "") => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const cities = [...new Set(properties.map(p => p.city))];

  return (
    <div className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} overflow-x-hidden transition-colors duration-700`}>
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className={`fixed w-4 h-4 ${themeClasses.cursor} rounded-full pointer-events-none z-50 transition-all duration-100 ease-out mix-blend-difference`}
        style={{
          transform: `translate(${mousePosition.x - 8}px, ${mousePosition.y - 8}px)`,
          willChange: 'transform'
        }}
      />

      {/* Property Detail Modal */}
      <PropertyModal
        property={selectedProperty}
        isOpen={isModalOpen}
        onClose={closeModal}
        isDark={isDark}
      />

      {/* Navigation */}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
              Property <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className={`text-xl font-light ${themeClasses.textSecondary} mb-12 max-w-2xl mx-auto leading-relaxed`}>
              Discover and analyze premium properties across India's major cities
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <div className={`flex items-center ${themeClasses.inputBg} ${themeClasses.border} rounded-2xl shadow-lg overflow-hidden`}>
                <Search className={`w-5 h-5 ${themeClasses.textMuted} ml-6`} />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className={`flex-1 px-4 py-4 bg-transparent outline-none ${themeClasses.text} placeholder-gray-500`}
                />
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className={`flex items-center space-x-2 px-6 py-4 border-l ${themeClasses.border} ${themeClasses.bgHover} transition-colors duration-300`}
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  <span className="font-light">Filters</span>
                </button>
              </div>
            </div>

            {/* Filter Panel */}
            {filterOpen && (
              <div className={`max-w-4xl mx-auto ${themeClasses.cardBg} ${themeClasses.border} rounded-2xl p-8 shadow-xl mb-8`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className={`block text-sm font-light ${themeClasses.textSecondary} mb-2`}>City</label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className={`w-full px-4 py-3 ${themeClasses.inputBg} ${themeClasses.border} rounded-xl outline-none transition-all duration-300 focus:border-green-500`}
                    >
                      <option value="">All Cities</option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-light ${themeClasses.textSecondary} mb-2`}>Bedrooms</label>
                    <select
                      value={selectedBedrooms}
                      onChange={(e) => setSelectedBedrooms(e.target.value)}
                      className={`w-full px-4 py-3 ${themeClasses.inputBg} ${themeClasses.border} rounded-xl outline-none transition-all duration-300 focus:border-green-500`}
                    >
                      <option value="">Any</option>
                      <option value="1">1 BHK</option>
                      <option value="2">2 BHK</option>
                      <option value="3">3 BHK</option>
                      <option value="4">4+ BHK</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-light ${themeClasses.textSecondary} mb-2`}>Price Range</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="0"
                        max="10000000"
                        step="100000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="flex-1 accent-green-500"
                      />
                      <span className="text-sm font-light">₹{(priceRange[1] / 100000).toFixed(0)}L</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sort and View Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between max-w-4xl mx-auto mb-8 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <span className={`text-sm font-light ${themeClasses.textSecondary}`}>Sort by:</span>
                {[
                  { key: "price", label: "Price" },
                  { key: "city", label: "City" },
                  { key: "title", label: "Name" }
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() => handleSortChange(option.key as "title" | "city" | "price")}
                    className={`flex items-center space-x-1 px-4 py-2 rounded-full transition-all duration-300 ${
                      sortKey === option.key
                        ? `bg-green-500 text-white shadow-lg ${themeClasses.accentGlow}`
                        : `${themeClasses.border} ${themeClasses.bgHover}`
                    }`}
                  >
                    <span className="font-light">{option.label}</span>
                    {sortKey === option.key && (
                      sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === "grid" ? `bg-green-500 text-white` : `${themeClasses.border} ${themeClasses.bgHover}`
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-8`}>
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl animate-pulse h-[400px] ${themeClasses.cardBg}`}
                ></div>
              ))}
            </div>
          ) : displayed.length === 0 ? (
            <div className="text-center py-20">
              <p className={`text-xl font-light ${themeClasses.textSecondary}`}>No properties found.</p>
            </div>
          ) : (
            <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-8`}>
              {displayed.map((property) => (
                <div
                  key={property.id}
                  onClick={() => openModal(property)}
                  className={`cursor-pointer group ${themeClasses.cardBg} rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] ${themeClasses.border} ${themeClasses.borderHover}`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      {property.featured && (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-light">Featured</span>
                      )}
                      {property.rating && (
                        <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-light flex items-center space-x-1">
                          <Star className="w-3 h-3" />
                          <span>{property.rating}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-light mb-2 line-clamp-2">{property.title}</h3>
                      <div className="flex items-center space-x-2 mb-3">
                        <MapPin className="w-4 h-4 text-green-500" />
                        <span className={`text-sm font-light ${themeClasses.textSecondary}`}>{property.city}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-light text-green-500">
                        ₹{(property.price / 100000).toFixed(1)}L
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Bed className="w-4 h-4 text-gray-500" />
                          <span>{property.bedrooms}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Bath className="w-4 h-4 text-gray-500" />
                          <span>{property.bathrooms}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Square className="w-4 h-4 text-gray-500" />
                          <span>{property.size}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center mt-16 space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  currentPage === 1
                    ? `${themeClasses.textMuted} cursor-not-allowed`
                    : `${themeClasses.border} ${themeClasses.bgHover}`
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                return (
                  <button
                    key={pageNum}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      currentPage === pageNum
                        ? `bg-green-500 text-white shadow-lg ${themeClasses.accentGlow}`
                        : `${themeClasses.border} ${themeClasses.bgHover}`
                    }`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  currentPage === totalPages
                    ? `${themeClasses.textMuted} cursor-not-allowed`
                    : `${themeClasses.border} ${themeClasses.bgHover}`
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transition-colors duration-300"
        >
          ↑
        </button>
      )}
    </div>
  );
}
