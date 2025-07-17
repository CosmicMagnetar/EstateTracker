"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  LineChart,
  BarChart,
  TrendingUp,
  TrendingDown,
  MapPin,
  Home,
  Building2,
  Globe2,
  ArrowRight,
  Star,
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  Shield,
  Users,
  Zap,
  Target,
  Calendar,
  Award,
  Activity,
  PieChart,
  Database,
  Eye,
  Clock,
  DollarSign,
  BarChart3,
  ExternalLink,
  Filter,
  Search,
  Download,
  Share,
  Bookmark,
  ChevronUp,
  AlertCircle,
  Info,
  CheckCircle
} from "lucide-react";
import Link from "next/link"
import { useSettings } from "../settings-context";
import ToggleSwitch from "../components/ToggleSwitch";

export default function InsightsPage() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeTab, setActiveTab] = useState('growth');
  const heroRef = useRef(null);
  const cursorRef = useRef(null);
  const { isDark, toggleDark, notifications, toggleNotifications } = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowScrollTop(window.scrollY > 500);
    };

    const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);
      
      if (cursorRef.current) {
        requestAnimationFrame(() => {
          cursorRef.current.style.transform = `translate(${newPosition.x - 8}px, ${newPosition.y - 8}px)`;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
  const insightTabs = [
    { id: 'growth', label: 'Growth Analysis', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'risk', label: 'Risk Assessment', icon: <Shield className="w-4 h-4" /> },
    { id: 'market', label: 'Market Trends', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'forecast', label: 'Forecasting', icon: <Target className="w-4 h-4" /> }
  ];

  const marketInsights = [
    {
      title: "Property Appreciation Trends",
      metric: "+12.5%",
      trend: "up",
      description: "Annual growth rate in tier-1 cities",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Market Volatility Index",
      metric: "0.23",
      trend: "down",
      description: "Lower volatility indicates stability",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Investment Opportunity Score",
      metric: "8.7/10",
      trend: "up",
      description: "Based on current market conditions",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Rental Yield Average",
      metric: "4.2%",
      trend: "stable",
      description: "Annual rental returns",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    }
  ];

  const expertArticles = [
    {
      title: "Top Investment Strategies for 2025",
      source: "Forbes Real Estate",
      readTime: "8 min read",
      category: "Strategy",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
      excerpt: "Discover the most effective approaches to real estate investment in the current market climate."
    },
    {
      title: "Economic Shifts Affecting Property Prices",
      source: "Bloomberg Markets",
      readTime: "12 min read",
      category: "Analysis",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=250&fit=crop",
      excerpt: "Understanding how macroeconomic factors influence regional property valuations."
    },
    {
      title: "Emerging Markets: Hidden Opportunities",
      source: "Wall Street Journal",
      readTime: "6 min read",
      category: "Opportunities",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop",
      excerpt: "Identifying undervalued markets with high growth potential."
    }
  ];

  return (
    <div className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} overflow-x-hidden transition-colors duration-700`}>
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className={`fixed w-4 h-4 ${themeClasses.cursor} rounded-full pointer-events-none z-50 transition-all duration-100 ease-out mix-blend-difference`}
        style={{
          transform: `translate(${mousePosition.x - 8}px, ${mousePosition.y - 8}px) scale(${scrollY > 50 ? 1.5 : 1})`,
          willChange: 'transform'
        }}
      />

      {/* Navigation */}

      {/* Hero Section */}
      <section id="insights" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden mt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl`}
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px) translateY(${scrollY * 0.5}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.002)
            }}
          />
          <div 
            className={`absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-emerald-500/20 to-green-400/20 rounded-full blur-3xl`}
            style={{
              transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px) translateY(${scrollY * -0.3}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.002)
            }}
          />
        </div>

        <div className="relative z-10 text-center px-8 max-w-6xl mx-auto">
          {/* Badge */}
          <div 
            className={`inline-flex items-center space-x-2 border ${themeClasses.accentBorder} rounded-full px-6 py-3 mb-12 backdrop-blur-sm bg-green-500/10 shadow-lg ${themeClasses.accentGlow}`}
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.003)
            }}
          >
            <Activity className="w-4 h-4 text-green-500" />
            <span className={`text-sm font-light tracking-wide ${themeClasses.accent}`}>Real-time market intelligence</span>
          </div>

          {/* Main Headline */}
          <h1 
            className="text-6xl md:text-8xl lg:text-9xl font-light mb-8 leading-none tracking-tight"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.002)
            }}
          >
            <span className="block">Investment</span>
            <span className="block bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Insights</span>
          </h1>

          {/* Subtitle */}
          <p 
            className={`text-xl md:text-2xl font-light mb-16 max-w-3xl mx-auto ${themeClasses.textSecondary} leading-relaxed`}
            style={{
              transform: `translateY(${scrollY * 0.4}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.004)
            }}
          >
            Analyze growth patterns, assess risk factors, and discover strategic investment opportunities with AI-powered market intelligence.
          </p>

          {/* Scroll Indicator */}
          <div 
            className="animate-bounce"
            style={{
              opacity: Math.max(0, 1 - scrollY * 0.01)
            }}
          >
            <ChevronDown className="w-6 h-6 mx-auto text-green-500" />
          </div>
        </div>
      </section>

      {/* Market Metrics */}
      <section className={`py-20 px-8 ${themeClasses.cardBg} shadow-lg`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {marketInsights.map((insight, index) => (
              <div key={index} className={`p-6 rounded-2xl ${insight.bgColor} border ${themeClasses.border}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`text-2xl font-light ${insight.color}`}>{insight.metric}</div>
                  <div className="flex items-center space-x-1">
                    {insight.trend === 'up' && <TrendingUp className={`w-4 h-4 ${insight.color}`} />}
                    {insight.trend === 'down' && <TrendingDown className={`w-4 h-4 ${insight.color}`} />}
                    {insight.trend === 'stable' && <Activity className={`w-4 h-4 ${insight.color}`} />}
                  </div>
                </div>
                <h3 className="text-lg font-light mb-2">{insight.title}</h3>
                <p className={`text-sm ${themeClasses.textSecondary}`}>{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Analysis Tabs */}
      <section className={`py-32 px-8 ${themeClasses.bg}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
              Deep Market <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Analysis</span>
            </h2>
            <p className={`text-xl font-light ${themeClasses.textSecondary} max-w-2xl mx-auto leading-relaxed`}>
              Comprehensive insights across multiple market dimensions
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {insightTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-light transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-green-500 text-white shadow-lg'
                    : `${themeClasses.border} border ${themeClasses.textSecondary} hover:border-green-500 hover:text-green-500`
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className={`p-8 rounded-2xl ${themeClasses.cardBg} shadow-xl`}>
            {activeTab === 'growth' && (
              <div>
                <h3 className="text-3xl font-light mb-8">Long-Term Investment Growth</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <p className={`text-lg ${themeClasses.textSecondary} mb-6 leading-relaxed`}>
                      <strong className={themeClasses.text}>Real estate investments have historically outperformed inflation by an average of 3% yearly.</strong>
                      <br />
                      Major cities experience higher appreciation rates based on demand and economic stability.
                    </p>
                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg ${themeClasses.bg} border ${themeClasses.border}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-light">Tier-1 Cities</span>
                          <span className="text-green-500 font-light">+15.2%</span>
                        </div>
                      </div>
                      <div className={`p-4 rounded-lg ${themeClasses.bg} border ${themeClasses.border}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-light">Tier-2 Cities</span>
                          <span className="text-green-500 font-light">+8.7%</span>
                        </div>
                      </div>
                      <div className={`p-4 rounded-lg ${themeClasses.bg} border ${themeClasses.border}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-light">Emerging Markets</span>
                          <span className="text-green-500 font-light">+12.3%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop"
                      alt="Investment Growth Visualization"
                      className="rounded-lg w-full shadow-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'risk' && (
              <div>
                <h3 className="text-3xl font-light mb-8">Risk Zones & Market Stability</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                      alt="Risk Assessment Chart"
                      className="rounded-lg w-full shadow-lg mb-6"
                    />
                  </div>
                  <div>
                    <p className={`text-lg ${themeClasses.textSecondary} mb-6 leading-relaxed`}>
                      <strong className={themeClasses.text}>Cities with rapid price hikes may face downturns due to economic corrections.</strong>
                      <br />
                      Key indicators such as unemployment rates and consumer demand help predict stability.
                    </p>
                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg bg-red-500/10 border border-red-500/20`}>
                        <div className="flex items-center space-x-3">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                          <div>
                            <div className="font-light">High Risk</div>
                            <div className="text-sm text-red-400">Overvalued markets</div>
                          </div>
                        </div>
                      </div>
                      <div className={`p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20`}>
                        <div className="flex items-center space-x-3">
                          <Info className="w-5 h-5 text-yellow-500" />
                          <div>
                            <div className="font-light">Moderate Risk</div>
                            <div className="text-sm text-yellow-400">Stable with caution</div>
                          </div>
                        </div>
                      </div>
                      <div className={`p-4 rounded-lg bg-green-500/10 border border-green-500/20`}>
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <div>
                            <div className="font-light">Low Risk</div>
                            <div className="text-sm text-green-400">Stable growth markets</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'market' && (
              <div>
                <h3 className="text-3xl font-light mb-8">Current Market Trends</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "Urban Migration", value: "+23%", color: "text-green-500" },
                    { title: "Remote Work Impact", value: "+18%", color: "text-green-500" },
                    { title: "Luxury Segment", value: "+31%", color: "text-green-500" },
                    { title: "Affordable Housing", value: "+12%", color: "text-orange-500" },
                    { title: "Commercial Spaces", value: "-8%", color: "text-red-500" },
                    { title: "Co-living Trend", value: "+45%", color: "text-indigo-500" }
                  ].map((trend, index) => (
                    <div key={index} className={`p-6 rounded-xl ${themeClasses.bg} border ${themeClasses.border}`}>
                      <div className={`text-2xl font-light ${trend.color} mb-2`}>{trend.value}</div>
                      <div className="font-light">{trend.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'forecast' && (
              <div>
                <h3 className="text-3xl font-light mb-8">Market Forecasting</h3>
                <div className="space-y-8">
                  <div className={`p-6 rounded-xl ${themeClasses.bg} border ${themeClasses.border}`}>
                    <h4 className="text-xl font-light mb-4">Next 6 Months</h4>
                    <p className={`${themeClasses.textSecondary} leading-relaxed`}>
                      Expected moderate growth with seasonal adjustments. Tech hubs likely to see continued demand.
                    </p>
                  </div>
                  <div className={`p-6 rounded-xl ${themeClasses.bg} border ${themeClasses.border}`}>
                    <h4 className="text-xl font-light mb-4">12-Month Outlook</h4>
                    <p className={`${themeClasses.textSecondary} leading-relaxed`}>
                      Infrastructure developments and policy changes will drive market dynamics in emerging corridors.
                    </p>
                  </div>
                  <div className={`p-6 rounded-xl ${themeClasses.bg} border ${themeClasses.border}`}>
                    <h4 className="text-xl font-light mb-4">Long-term Projection</h4>
                    <p className={`${themeClasses.textSecondary} leading-relaxed`}>
                      Sustainable growth expected with focus on green buildings and smart city developments.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Expert Articles */}
      <section className={`py-32 px-8 ${themeClasses.cardBg}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
              Expert <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Opinions</span>
            </h2>
            <p className={`text-xl font-light ${themeClasses.textSecondary} max-w-2xl mx-auto leading-relaxed`}>
              Latest insights from industry leaders and market analysts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertArticles.map((article, index) => (
              <div key={index} className={`group p-6 rounded-2xl ${themeClasses.bg} border ${themeClasses.border} transition-all duration-700 hover:shadow-xl ${themeClasses.borderHover}`}>
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-light">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-light leading-tight group-hover:text-green-500 transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className={`${themeClasses.textSecondary} text-sm leading-relaxed`}>
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className={`text-sm font-light ${themeClasses.textMuted}`}>{article.source}</span>
                      <span className={`text-sm font-light ${themeClasses.textMuted}`}>{article.readTime}</span>
                    </div>
                    <button className="flex items-center space-x-1 text-green-500 hover:text-green-600 transition-colors duration-300">
                      <span className="text-sm font-light">Read</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-32 px-8 bg-gradient-to-b ${themeClasses.gradient}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
            Ready to Make <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Smart</span> Investments?
          </h2>
          <p className={`text-xl font-light ${themeClasses.textSecondary} mb-12 leading-relaxed`}>
            Join thousands of investors making data-driven decisions with our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group relative overflow-hidden bg-green-500 text-white hover:bg-green-600 px-8 py-4 rounded-full font-light text-lg transition-all duration-500 tracking-wide shadow-lg hover:shadow-xl">
<span className="z-10 relative">Get Started</span>
            </button>
            <button className={`px-8 py-4 rounded-full border ${themeClasses.accentBorder} text-green-500 hover:bg-green-500 hover:text-white transition-all duration-500 font-light text-lg`}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transition-colors duration-300"
        >
          ↑
        </button>
      )}
    </div>
  );
}
