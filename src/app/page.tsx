"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  LineChart,
  BarChart,
  TrendingDown,
  MapPin,
  Home,
  Building2,
  Globe2,
  ArrowRight,
  Star,
  Play,
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  Shield,
  Users,
  Zap,
  Target,
  Check,
  Award,
  Calendar,
  Mail,
  Phone,
  Twitter,
  Linkedin,
  Github,
  Facebook,
  Instagram,
  Youtube,
  ChevronUp,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  Share,
  Heart,
  Bookmark,
  Eye,
  Clock,
  DollarSign,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Database,
  Lock,
  Cloud,
  Smartphone,
  Laptop,
  Tablet,
  Wifi,
  Headphones,
  MessageCircle,
  FileText,
  HelpCircle,
  ExternalLink,
  Leaf,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useSettings } from "./settings-context";
import ToggleSwitch from "./components/ToggleSwitch";
import Header from "./components/Header";

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isDark, toggleDark, notifications, toggleNotifications } =
    useSettings();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const heroRef = useRef(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowScrollTop(window.scrollY > 500);
    };

    const handleMouseMove = (e: { clientX: any; clientY: any }) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);

      if (cursorRef.current) {
        requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.transform = `translate(${
              newPosition.x - 8
            }px, ${newPosition.y - 8}px)`;
          }
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const themeClasses = {
    bg: isDark ? "bg-gray-900" : "bg-gray-50",
    text: isDark ? "text-white" : "text-gray-900",
    textSecondary: isDark ? "text-gray-300" : "text-gray-600",
    textMuted: isDark ? "text-gray-500" : "text-gray-400",
    border: isDark ? "border-gray-700" : "border-gray-200",
    borderHover: isDark ? "hover:border-gray-600" : "hover:border-gray-300",
    bgHover: isDark ? "hover:bg-gray-800" : "hover:bg-white",
    navBg: isDark ? "bg-gray-900/90" : "bg-white/90",
    gradient: isDark
      ? "from-gray-900 via-gray-800 to-gray-900"
      : "from-white via-gray-50 to-white",
    cardBg: isDark ? "bg-gray-800" : "bg-white",
    cursor: isDark ? "bg-green-400" : "bg-green-500",
    accent: "text-green-500",
    accentBg: isDark ? "bg-green-500" : "bg-green-500",
    accentHover: isDark ? "hover:bg-green-600" : "hover:bg-green-600",
    accentBorder: "border-green-500",
    accentGlow: isDark ? "shadow-green-500/20" : "shadow-green-500/10",
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
    <div
      className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} overflow-x-hidden transition-colors duration-700`}
    >
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`fixed w-4 h-4 ${themeClasses.cursor} rounded-full pointer-events-none z-50 transition-all duration-100 ease-out mix-blend-difference`}
        style={{
          transform: `translate(${mousePosition.x - 8}px, ${
            mousePosition.y - 8
          }px) scale(${scrollY > 50 ? 1.5 : 1})`,
          willChange: "transform",
        }}
      />

      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden  mt-20"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl`}
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${
                mousePosition.y * 0.02
              }px) translateY(${scrollY * 0.5}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.002),
            }}
          />
          <div
            className={`absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-emerald-500/20 to-green-400/20 rounded-full blur-3xl`}
            style={{
              transform: `translate(${mousePosition.x * -0.02}px, ${
                mousePosition.y * -0.02
              }px) translateY(${scrollY * -0.3}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.002),
            }}
          />
          <div
            className={`absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-green-600/10 to-emerald-400/10 rounded-full blur-2xl`}
            style={{
              transform: `translate(-50%, -50%) translate(${
                mousePosition.x * 0.01
              }px, ${mousePosition.y * 0.01}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.003),
            }}
          />
        </div>

        <div className="relative z-10 text-center px-8 max-w-6xl mx-auto">
          {/* Badge */}
          <div
            className={`inline-flex items-center space-x-2 border ${themeClasses.accentBorder} rounded-full px-6 py-3 mb-12 backdrop-blur-sm bg-green-500/10 shadow-lg ${themeClasses.accentGlow}`}
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.003),
            }}
          >
            <Star className="w-4 h-4 text-green-500" />
            <span
              className={`text-sm font-light tracking-wide ${themeClasses.accent}`}
            >
              Trusted by 10,000+ professionals
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-light mb-8 leading-none tracking-tight"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.002),
            }}
          >
            <span className="block">Smart Real Estate</span>
            <span className="block bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
              Intelligence
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-xl md:text-2xl font-light mb-16 max-w-3xl mx-auto ${themeClasses.textSecondary} leading-relaxed`}
            style={{
              transform: `translateY(${scrollY * 0.4}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.004),
            }}
          >
            Track property prices, analyze market trends, and make data-driven
            decisions with our premium AI-powered platform.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.005),
            }}
          >
            <button
              className={`group relative overflow-hidden bg-green-500 text-white hover:bg-green-600 px-8 py-4 rounded-full font-light text-lg transition-all duration-500 tracking-wide shadow-lg hover:shadow-xl ${themeClasses.accentGlow}`}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>

            <button
              className={`group flex items-center space-x-2 px-8 py-4 rounded-full font-light text-lg border ${themeClasses.accentBorder} text-green-500 hover:bg-green-500 hover:text-white transition-all duration-500 tracking-wide`}
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Scroll Indicator */}
          <div
            className="animate-bounce"
            style={{
              opacity: Math.max(0, 1 - scrollY * 0.01),
            }}
          >
            <ChevronDown className="w-6 h-6 mx-auto text-green-500" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-20 px-8 ${themeClasses.cardBg} shadow-lg`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                number: "10K+",
                label: "Active Users",
                color: "text-green-500",
              },
              {
                number: "2.5M+",
                label: "Properties Tracked",
                color: "text-emerald-500",
              },
              {
                number: "150+",
                label: "Cities Covered",
                color: "text-green-600",
              },
              { number: "99.9%", label: "Uptime", color: "text-emerald-600" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className={`text-4xl md:text-5xl font-light mb-2 ${stat.color}`}
                >
                  {stat.number}
                </div>
                <div
                  className={`text-sm font-light ${themeClasses.textSecondary} tracking-wider uppercase`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-32 px-8 ${themeClasses.bg}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
              <span className={themeClasses.textMuted}>Everything</span> You
              Need
            </h2>
            <p
              className={`text-xl font-light ${themeClasses.textSecondary} max-w-2xl mx-auto leading-relaxed`}
            >
              Professional tools for real estate analysis and market
              intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <LineChart className="w-6 h-6" />,
                title: "Price Tracking",
                desc: "Real-time property value monitoring",
                color: "text-green-500",
              },
              {
                icon: <BarChart className="w-6 h-6" />,
                title: "Market Analytics",
                desc: "Advanced visualizations and insights",
                color: "text-emerald-500",
              },
              {
                icon: <TrendingDown className="w-6 h-6" />,
                title: "Trend Analysis",
                desc: "AI-powered market predictions",
                color: "text-green-600",
              },
              {
                icon: <MapPin className="w-6 h-6" />,
                title: "Location Intel",
                desc: "Regional market comparisons",
                color: "text-emerald-600",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Data Security",
                desc: "Enterprise-grade protection",
                color: "text-green-500",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Fast Processing",
                desc: "Lightning-fast data analysis",
                color: "text-emerald-500",
              },
              {
                icon: <Target className="w-6 h-6" />,
                title: "Precision Alerts",
                desc: "Custom notifications and triggers",
                color: "text-green-600",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Team Collaboration",
                desc: "Share insights with your team",
                color: "text-emerald-600",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`group relative p-8 border ${themeClasses.border} rounded-2xl transition-all duration-700 ${themeClasses.borderHover} ${themeClasses.bgHover} hover:shadow-xl`}
              >
                <div className="mb-6">
                  <div
                    className={`w-12 h-12 border ${themeClasses.border} rounded-full flex items-center justify-center group-hover:border-green-500 transition-all duration-500 ${feature.color}`}
                  >
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-light mb-3 tracking-wide">
                  {feature.title}
                </h3>
                <p
                  className={`${themeClasses.textSecondary} font-light leading-relaxed`}
                >
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section
        className={`py-32 px-8 bg-gradient-to-b ${themeClasses.gradient}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
              Track Any{" "}
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                Property
              </span>
            </h2>
            <p
              className={`text-xl font-light ${themeClasses.textSecondary} max-w-2xl mx-auto leading-relaxed`}
            >
              Comprehensive coverage across all real estate segments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Home className="w-8 h-8" />,
                title: "Residential",
                desc: "Houses and townhomes",
                stats: "2.3M+",
                color: "text-green-500",
                ring: "ring-green-500/30",
              },
              {
                icon: <Building2 className="w-8 h-8" />,
                title: "Apartments",
                desc: "Multi-unit buildings",
                stats: "1.8M+",
                color: "text-emerald-500",
                ring: "ring-emerald-500/30",
              },
              {
                icon: <Globe2 className="w-8 h-8" />,
                title: "Luxury",
                desc: "Premium properties",
                stats: "450K+",
                color: "text-green-600",
                ring: "ring-green-600/30",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`group relative p-12 border ${themeClasses.border} rounded-2xl transition-all duration-700 ${themeClasses.borderHover} ${themeClasses.bgHover} hover:shadow-2xl hover:scale-[1.02]`}
              >
                <div className="text-center relative z-10">
                  <div
                    className={`w-16 h-16 border ${themeClasses.border} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:border-green-500 transition-all duration-500 ${item.color} bg-white dark:bg-gray-900 ring-4 ${item.ring}`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-light mb-3 tracking-wide">
                    {item.title}
                  </h3>
                  <p
                    className={`${themeClasses.textSecondary} font-light mb-4`}
                  >
                    {item.desc}
                  </p>
                  <div
                    className={`text-sm font-light ${item.color} tracking-wider`}
                  >
                    {item.stats} Properties
                  </div>
                </div>

                {/* Floating glow animation circle */}
                <motion.div
                  className={`absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-r ${item.color} opacity-10 blur-2xl z-0`}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Pricing Section */}
      <section id="pricing" className={`py-32 px-8 ${themeClasses.bg}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
              Simple{" "}
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>
            <p
              className={`text-xl font-light ${themeClasses.textSecondary} max-w-2xl mx-auto leading-relaxed`}
            >
              Choose the perfect plan for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$29",
                period: "/month",
                features: [
                  "Up to 100 properties",
                  "Basic analytics",
                  "Email support",
                  "Mobile app access",
                ],
                popular: false,
              },
              {
                name: "Professional",
                price: "$99",
                period: "/month",
                features: [
                  "Up to 1,000 properties",
                  "Advanced analytics",
                  "Priority support",
                  "API access",
                  "Team collaboration",
                ],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                features: [
                  "Unlimited properties",
                  "Custom integrations",
                  "Dedicated support",
                  "White-label options",
                  "Advanced security",
                ],
                popular: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 border ${
                  themeClasses.border
                } rounded-2xl transition-all duration-700 ${
                  themeClasses.borderHover
                } ${themeClasses.bgHover} hover:shadow-xl ${
                  plan.popular
                    ? "ring-2 ring-green-500 shadow-green-500/20"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-light">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-2xl font-light mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-light text-green-500">
                      {plan.price}
                    </span>
                    <span
                      className={`${themeClasses.textSecondary} font-light`}
                    >
                      {plan.period}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center space-x-3"
                      >
                        <Check className="w-5 h-5 text-green-500" />
                        <span
                          className={`${themeClasses.textSecondary} font-light`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 rounded-full font-light border ${
                      plan.popular
                        ? "bg-green-500 text-white border-green-500 hover:bg-green-600"
                        : `${themeClasses.accentBorder} text-green-500 hover:bg-green-500 hover:text-white`
                    } transition-all duration-300`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={`py-32 px-8 ${themeClasses.cardBg}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
              How It{" "}
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                step: "01",
                title: "Connect",
                desc: "Link your data sources and property listings",
                color: "text-green-500",
              },
              {
                step: "02",
                title: "Analyze",
                desc: "AI processes market data and identifies trends",
                color: "text-emerald-500",
              },
              {
                step: "03",
                title: "Decide",
                desc: "Make informed decisions with actionable insights",
                color: "text-green-600",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className={`text-6xl font-light mb-6 ${item.color}`}>
                  {item.step}
                </div>
                <h3 className="text-2xl font-light mb-4 tracking-wide">
                  {item.title}
                </h3>
                <p
                  className={`${themeClasses.textSecondary} font-light leading-relaxed`}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className={`py-24 px-8 ${themeClasses.bg}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">What Our Users Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Aarav Mehta",
              feedback:
                "ZonePulse helped me pick the best investment zone in Pune. Charts are 🔥",
            },
            {
              name: "Shruti R",
              feedback:
                "I love how easy the dashboard is. Dark mode is a plus 😍",
            },
            {
              name: "Vikram Sinha",
              feedback:
                "Very helpful for analyzing Bangalore property rates. Saved me hours.",
            },
          ].map((user, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl shadow-md ${themeClasses.cardBg}`}
            >
              <p className="mb-4">“{user.feedback}”</p>
              <div className="text-sm font-semibold text-blue-500">
                {user.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className={`py-24 px-8 ${themeClasses.bg}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-light mb-6 tracking-tight">
            Get in <span className={themeClasses.textMuted}>Touch</span>
          </h2>
          <p
            className={`text-xl font-light ${themeClasses.textSecondary} mb-12`}
          >
            Have questions or need support? We're just a message away.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                icon: <Mail className="w-6 h-6 text-blue-500" />,
                label: "Email",
                value: "support@zonepulse.in",
              },
              {
                icon: <Phone className="w-6 h-6 text-green-500" />,
                label: "Phone",
                value: "+91 98765 43210",
              },
              {
                icon: <MapPin className="w-6 h-6 text-red-500" />,
                label: "Address",
                value: "Bangalore, India",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-start space-x-4 border ${themeClasses.border} p-6 rounded-2xl`}
              >
                {item.icon}
                <div>
                  <div className="font-light">{item.label}</div>
                  <div className={`${themeClasses.textSecondary} text-sm`}>
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-8 ${themeClasses.cardBg}`}>
        <div
          className={`max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm font-light ${themeClasses.textSecondary}`}
        >
          <p>© {new Date().getFullYear()} ZonePulse. All rights reserved.</p>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              className="hover:text-white"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="hover:text-white"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/CosmicMagnetar"
              target="_blank"
              className="hover:text-white"
            >
              <Github size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="hover:text-white"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
