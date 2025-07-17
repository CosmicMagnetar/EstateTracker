"use client";
import React, { useState, useEffect, useRef, ChangeEvent, FormEvent, MouseEvent } from "react";
import {
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Sun,
  Moon,
  Star,
  Shield,
  Zap,
  ChevronLeft,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Chrome,
} from "lucide-react";
import { supabase } from '../../../supabaseClient';
import { useSettings } from "../settings-context";
import Link from "next/link";
import Image from "next/image";

interface FormData {
  email: string;
  password: string;
  acceptTerms: boolean;
  newsletter: boolean;
}

interface Errors {
  email?: string;
  password?: string;
  acceptTerms?: string;
  submit?: string;
  [key: string]: string | undefined;
}

export default function SignupPage() {
  const { isDark, toggleDark } = useSettings();
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    acceptTerms: false,
    newsletter: true
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);
            
      if (cursorRef.current) {
        requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.transform = `translate(${newPosition.x - 8}px, ${newPosition.y - 8}px)`;
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
    cursor: isDark ? 'bg-green-400' : 'bg-green-500',
    accent: 'text-green-500',
    accentBg: 'bg-green-500',
    accentHover: 'hover:bg-green-600',
    accentBorder: 'border-green-500',
    accentGlow: isDark ? 'shadow-green-500/20' : 'shadow-green-500/10',
    input: isDark ? 'bg-gray-700 border-gray-600 focus:border-green-500' : 'bg-white border-gray-300 focus:border-green-500',
    inputText: isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Errors = {};
    
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms and conditions';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({});
    
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            newsletter: formData.newsletter
          }
        }
      });

      if (error) {
        setErrors({ submit: error.message });
      } else {
        alert('Account created successfully! Please check your email for verification.');
      }
    } catch (error) {
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    setErrors({});
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        setErrors({ submit: error.message });
      }
    } catch (error) {
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setGoogleLoading(false);
    }
  };

  const Logo = () => (
    <Link href="/" className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-10 h-10 rounded-full flex items-center justify-center">
          <Image src="/logo.png" alt="ZonePulse Logo" width={40} height={40} />
        </div>
      </div>
      <span className="text-2xl font-light tracking-wider">ZonePulse</span>
    </Link>
  );

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

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 py-6 ${themeClasses.navBg} backdrop-blur-xl shadow-xl`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <Logo />
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDark}
              className={`p-2 rounded-full ${themeClasses.border} ${themeClasses.bgHover}`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <Link href="/" className={`flex items-center space-x-2 px-4 py-2 rounded-full ${themeClasses.border} ${themeClasses.bgHover} transition-all duration-300`}>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-light">Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Hero Content */}
            <div className="relative">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div 
                  className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl"
                  style={{
                    transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
                  }}
                />
                <div 
                  className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-emerald-500/20 to-green-400/20 rounded-full blur-3xl"
                  style={{
                    transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
                  }}
                />
              </div>

              <div className="relative z-10">
                {/* Badge */}
                <div className={`inline-flex items-center space-x-2 border ${themeClasses.accentBorder} rounded-full px-4 py-2 mb-8 backdrop-blur-sm bg-green-500/10 shadow-lg ${themeClasses.accentGlow}`}>
                  <Star className="w-4 h-4 text-green-500" />
                  <span className={`text-sm font-light tracking-wide ${themeClasses.accent}`}>Join 10,000+ professionals</span>
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight tracking-tight">
                  <span className="block">Start Your</span>
                  <span className="block bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Real Estate Journey</span>
                </h1>

                {/* Subtitle */}
                <p className={`text-xl font-light mb-8 ${themeClasses.textSecondary} leading-relaxed`}>
                  Get access to premium market insights, property analytics, and AI-powered predictions.
                </p>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {[
                    { icon: <Shield className="w-5 h-5" />, text: "Enterprise-grade security" },
                    { icon: <Zap className="w-5 h-5" />, text: "Real-time market data" },
                    { icon: <Star className="w-5 h-5" />, text: "AI-powered insights" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="text-green-500">{item.icon}</div>
                      <span className={`font-light ${themeClasses.textSecondary}`}>{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8">
                  {[
                    { number: "10K+", label: "Users" },
                    { number: "2.5M+", label: "Properties" },
                    { number: "150+", label: "Cities" }
                  ].map((stat, index) => (
                    <div key={index}>
                      <div className="text-2xl font-light text-green-500 mb-1">{stat.number}</div>
                      <div className={`text-sm font-light ${themeClasses.textMuted} uppercase tracking-wider`}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="relative">
              <div className={`${themeClasses.cardBg} rounded-3xl p-8 shadow-2xl border ${themeClasses.border}`}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-light mb-2 tracking-wide">Create Account</h2>
                  <p className={`${themeClasses.textSecondary} font-light`}>
                    Already have an account? <a href="/login" className={`${themeClasses.accent} hover:underline`}>Sign in</a>
                  </p>
                </div>

                {/* Error Message */}
                {errors.submit && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-sm">{errors.submit}</p>
                  </div>
                )}

                {/* Google Sign Up */}
                <button
                  onClick={handleGoogleSignup}
                  disabled={googleLoading}
                  className={`w-full flex items-center justify-center space-x-3 py-4 px-4 border ${themeClasses.border} rounded-xl ${themeClasses.bgHover} transition-all duration-300 mb-6 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {googleLoading ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Chrome className="w-5 h-5" />
                  )}
                  <span className="font-light">
                    {googleLoading ? 'Connecting...' : 'Continue with Google'}
                  </span>
                </button>

                <div className="relative mb-8">
                  <div className={`absolute inset-0 flex items-center`}>
                    <div className={`w-full border-t ${themeClasses.border}`}></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className={`${themeClasses.bg} px-4 ${themeClasses.textMuted} font-light`}>or continue with email</span>
                  </div>
                </div>

                {/* Email Signup Form */}
                <form onSubmit={handleEmailSignup} className="space-y-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={`block text-sm font-light mb-2 ${themeClasses.textSecondary}`}>Email Address</label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeClasses.textMuted}`} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl ${themeClasses.input} ${themeClasses.inputText} focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                        placeholder="john@example.com"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className={`block text-sm font-light mb-2 ${themeClasses.textSecondary}`}>Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full pl-4 pr-12 py-3 border rounded-xl ${themeClasses.input} ${themeClasses.inputText} focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textMuted} hover:text-green-500 transition-colors`}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="acceptTerms"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleInputChange}
                        className="mt-1 w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                      />
                      <label htmlFor="acceptTerms" className={`text-sm font-light ${themeClasses.textSecondary}`}>
                        I accept the <a href="/terms" className={`${themeClasses.accent} hover:underline`}>Terms and Conditions</a> and <a href="/privacy" className={`${themeClasses.accent} hover:underline`}>Privacy Policy</a>
                      </label>
                    </div>
                    {errors.acceptTerms && <p className="text-red-500 text-sm">{errors.acceptTerms}</p>}
                    
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="newsletter"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleInputChange}
                        className="mt-1 w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                      />
                      <label htmlFor="newsletter" className={`text-sm font-light ${themeClasses.textSecondary}`}>
                        I want to receive updates about new features and market insights
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`group relative w-full overflow-hidden bg-green-500 text-white hover:bg-green-600 py-4 rounded-xl font-light text-lg transition-all duration-500 tracking-wide shadow-lg hover:shadow-xl ${themeClasses.accentGlow} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        <>
                          <span>Create Account</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`py-8 px-8 ${themeClasses.cardBg} border-t ${themeClasses.border}`}>
        <div className={`max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm font-light ${themeClasses.textSecondary}`}>
          <p>© {new Date().getFullYear()} ZonePulse. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">
              <Twitter size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">
              <Github size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}