"use client";
import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
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
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { supabase } from '../../../supabaseClient';
import { useSettings } from "../settings-context";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface Errors {
  email?: string;
  password?: string;
  submit?: string;
  [key: string]: string | undefined;
}

export default function LoginPage() {
  const router = useRouter();
  const { isDark, toggleDark } = useSettings();
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const emailCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: globalThis.MouseEvent) => {
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

  useEffect(() => {
    if (formData.email && /\S+@\S+\.\S+/.test(formData.email)) {
      if (emailCheckTimeoutRef.current) {
        clearTimeout(emailCheckTimeoutRef.current);
      }
      
      emailCheckTimeoutRef.current = setTimeout(async () => {
        setIsCheckingUser(true);
        try {
          const { error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: 'dummy_password_check_123456'
          });
          
          if (error) {
            if (error.message.includes('Invalid login credentials')) {
              setUserExists(true);
            } else if (error.message.includes('Email not confirmed')) {
              setUserExists(true);
            } else {
              setUserExists(false);
            }
          } else {
            setUserExists(true);
          }
        } catch (error) {
          console.error('Error checking user:', error);
          setUserExists(null);
        } finally {
          setIsCheckingUser(false);
        }
      }, 500);
    } else {
      setUserExists(null);
    }

    return () => {
      if (emailCheckTimeoutRef.current) {
        clearTimeout(emailCheckTimeoutRef.current);
      }
    };
  }, [formData.email]);

  const themeClasses = {
    text: isDark ? "text-white" : "text-gray-900",
    textSecondary: isDark ? "text-gray-300" : "text-gray-600",
    bgHover: isDark ? "hover:bg-gray-800" : "hover:bg-gray-100",
    border: isDark ? "border-gray-700" : "border-gray-200",
    navBg: isDark ? "bg-gray-900/90" : "bg-white/90",
    accent: "text-green-500",
    bg: isDark ? "bg-gray-900" : "bg-gray-50",
    textMuted: isDark ? "text-gray-500" : "text-gray-400",
    borderHover: isDark ? "hover:border-gray-600" : "hover:border-gray-300",
    cardBg: isDark ? "bg-gray-800" : "bg-white",
    cursor: isDark ? "bg-green-400" : "bg-green-500",
    accentBg: isDark ? "bg-green-500" : "bg-green-500",
    accentHover: isDark ? "hover:bg-green-600" : "hover:bg-green-600",
    accentBorder: "border-green-500",
    accentGlow: isDark ? "shadow-green-500/20" : "shadow-green-500/10",
    gradient: isDark
      ? "from-gray-900 via-gray-800 to-gray-900"
      : "from-white via-gray-50 to-white",
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({});
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setErrors({ submit: 'Invalid email or password. Please check your credentials and try again.' });
        } else if (error.message.includes('Email not confirmed')) {
          setErrors({ submit: 'Please check your email and click the confirmation link before signing in.' });
        } else if (error.message.includes('Too many requests')) {
          setErrors({ submit: 'Too many login attempts. Please wait a moment and try again.' });
        } else {
          setErrors({ submit: error.message });
        }
      } else if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        if (profile?.onboarding_completed) {
          router.push('/dashboard');
        } else {
          router.push('/onboarding');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
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
      console.error('Google login error:', error);
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      setErrors({ email: 'Email is required to reset password' });
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }
    
    setResetLoading(true);
    setErrors({});
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setErrors({ submit: error.message });
      } else {
        setResetSuccess(true);
        setTimeout(() => {
          setShowForgotPassword(false);
          setResetSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setResetLoading(false);
    }
  };

  const Logo = () => (
    <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
      <div className="relative">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
          <Image 
            src="/logo.png" 
            alt="ZonePulse Logo" 
            width={32} 
            height={32}
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
        </div>
      </div>
      <span className="text-xl sm:text-2xl font-light tracking-wider">ZonePulse</span>
    </Link>
  );

  const UserExistsIndicator = () => {
    if (isCheckingUser) {
      return (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-gray-400" />
        </div>
      );
    }
    
    if (userExists === true) {
      return (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
        </div>
      );
    }
    
    if (userExists === false) {
      return (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
        </div>
      );
    }
    
    return null;
  };

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
      <nav className={`fixed top-0 left-0 right-0 z-40 py-4 sm:py-6 ${themeClasses.navBg} backdrop-blur-xl shadow-xl`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Logo />
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={toggleDark}
              className={`p-2 rounded-full border transition-colors duration-200 ${themeClasses.border} ${themeClasses.bgHover} ${themeClasses.text}`}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
            
            <Link href="/" className={`flex items-center space-x-1 sm:space-x-2 px-3 py-1 sm:px-4 sm:py-2 rounded-full ${themeClasses.border} ${themeClasses.bgHover} transition-all duration-300 text-xs sm:text-sm`}>
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-light">Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Left Side - Hero Content */}
            <div className="relative">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div 
                  className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-64 sm:h-64 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-xl sm:blur-3xl"
                  style={{
                    transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
                  }}
                />
                <div 
                  className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-emerald-500/20 to-green-400/20 rounded-full blur-xl sm:blur-3xl"
                  style={{
                    transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
                  }}
                />
              </div>

              <div className="relative z-10">
                {/* Badge */}
                <div className={`inline-flex items-center space-x-2 border ${themeClasses.accentBorder} rounded-full px-3 py-1 sm:px-4 sm:py-2 mb-4 sm:mb-8 backdrop-blur-sm bg-green-500/10 shadow-lg ${themeClasses.accentGlow}`}>
                  <Star className="w-4 h-4 text-green-500" />
                  <span className={`text-xs sm:text-sm font-light tracking-wide ${themeClasses.accent}`}>Welcome back!</span>
                </div>

                {/* Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6 leading-tight tracking-tight">
                  <span className="block">Continue Your</span>
                  <span className="block bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Real Estate Journey</span>
                </h1>

                {/* Subtitle */}
                <p className={`text-base sm:text-lg md:text-xl font-light mb-6 sm:mb-8 ${themeClasses.textSecondary} leading-relaxed`}>
                  Access your personalized dashboard with the latest market insights and property analytics.
                </p>

                {/* Features List */}
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {[
                    { icon: <Shield className="w-4 sm:w-5 h-4 sm:h-5" />, text: "Secure access to your account" },
                    { icon: <Zap className="w-4 sm:w-5 h-4 sm:h-5" />, text: "Real-time portfolio tracking" },
                    { icon: <Star className="w-4 sm:w-5 h-4 sm:h-5" />, text: "Personalized market insights" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 sm:space-x-3">
                      <div className="text-green-500">{item.icon}</div>
                      <span className={`font-light ${themeClasses.textSecondary} text-sm sm:text-base`}>{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 sm:gap-6">
                  {[
                    { number: "10K+", label: "Users" },
                    { number: "2.5M+", label: "Properties" },
                    { number: "150+", label: "Cities" }
                  ].map((stat, index) => (
                    <div key={index}>
                      <div className="text-xl sm:text-2xl font-light text-green-500 mb-1">{stat.number}</div>
                      <div className={`text-xs sm:text-sm font-light ${themeClasses.textMuted} uppercase tracking-wider`}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="relative">
              <div className={`${themeClasses.cardBg} rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border ${themeClasses.border}`}>
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-light mb-2 tracking-wide">
                    {showForgotPassword ? 'Reset Password' : 'Welcome Back'}
                  </h2>
                  <p className={`${themeClasses.textSecondary} font-light text-sm sm:text-base`}>
                    {showForgotPassword ? (
                      <>
                        Remember your password? 
                        <button 
                          onClick={() => setShowForgotPassword(false)}
                          className={`${themeClasses.accent} hover:underline ml-1`}
                        >
                          Sign in
                        </button>
                      </>
                    ) : (
                      <>
                        Don't have an account? 
                        <Link href="/signup" className={`${themeClasses.accent} hover:underline ml-1`}>
                          Sign up
                        </Link>
                      </>
                    )}
                  </p>
                </div>

                {/* Success Message */}
                {resetSuccess && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg sm:rounded-xl">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      <p className="text-green-600 text-xs sm:text-sm">Password reset email sent! Check your inbox.</p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {errors.submit && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                      <p className="text-red-600 text-xs sm:text-sm">{errors.submit}</p>
                    </div>
                  </div>
                )}

                {/* User Exists Warning */}
                {userExists === false && formData.email && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg sm:rounded-xl">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                      <p className="text-yellow-600 text-xs sm:text-sm">
                        No account found with this email. 
                        <Link href="/signup" className="text-yellow-700 hover:underline font-medium ml-1">
                          Create an account
                        </Link>
                      </p>
                    </div>
                  </div>
                )}

                {!showForgotPassword && (
                  <>
                    {/* Google Sign In */}
                    <button
                      onClick={handleGoogleLogin}
                      disabled={googleLoading}
                      className={`w-full flex items-center justify-center space-x-2 sm:space-x-3 py-3 sm:py-4 px-4 border ${themeClasses.border} rounded-lg sm:rounded-xl ${themeClasses.bgHover} transition-all duration-300 mb-4 sm:mb-6 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base`}
                    >
                      {googleLoading ? (
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Chrome className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                      <span className="font-light">
                        {googleLoading ? 'Signing in...' : 'Continue with Google'}
                      </span>
                    </button>

                    <div className="relative mb-6 sm:mb-8">
                      <div className={`absolute inset-0 flex items-center`}>
                        <div className={`w-full border-t ${themeClasses.border}`}></div>
                      </div>
                      <div className="relative flex justify-center text-xs sm:text-sm">
                        <span className={`${themeClasses.bg} px-3 sm:px-4 ${themeClasses.textMuted} font-light`}>or continue with email</span>
                      </div>
                    </div>
                  </>
                )}

                {/* Email Login/Reset Form */}
                <form onSubmit={showForgotPassword ? handleForgotPassword : handleEmailLogin} className="space-y-4 sm:space-y-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={`block text-xs sm:text-sm font-light mb-2 ${themeClasses.textSecondary}`}>
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 ${themeClasses.textMuted}`} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-3 border rounded-lg sm:rounded-xl ${themeClasses.input} ${themeClasses.inputText} focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-sm sm:text-base`}
                        placeholder="john@example.com"
                      />
                      <UserExistsIndicator />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
                  </div>

                  {/* Password - only show if not forgot password */}
                  {!showForgotPassword && (
                    <div>
                      <label htmlFor="password" className={`block text-xs sm:text-sm font-light mb-2 ${themeClasses.textSecondary}`}>
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`w-full pl-4 pr-10 sm:pr-12 py-2 sm:py-3 border rounded-lg sm:rounded-xl ${themeClasses.input} ${themeClasses.inputText} focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-sm sm:text-base`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textMuted} hover:text-green-500 transition-colors`}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password}</p>}
                    </div>
                  )}

                  {/* Remember Me & Forgot Password */}
                  {!showForgotPassword && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleInputChange}
                          className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                        />
                        <label htmlFor="rememberMe" className={`text-xs sm:text-sm font-light ${themeClasses.textSecondary}`}>
                          Remember me
                        </label>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className={`text-xs sm:text-sm font-light ${themeClasses.accent} hover:underline`}
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading || resetLoading}
                    className={`group relative w-full overflow-hidden bg-green-500 text-white hover:bg-green-600 py-3 sm:py-4 rounded-lg sm:rounded-xl font-light text-base sm:text-lg transition-all duration-500 tracking-wide shadow-lg hover:shadow-xl ${themeClasses.accentGlow} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      {(loading || resetLoading) ? (
                        <>
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm sm:text-base">{showForgotPassword ? 'Sending Reset Email...' : 'Signing In...'}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-sm sm:text-base">{showForgotPassword ? 'Send Reset Email' : 'Sign In'}</span>
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
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
      <footer className={`py-6 sm:py-8 px-4 sm:px-6 lg:px-8 ${themeClasses.cardBg} border-t ${themeClasses.border}`}>
        <div className={`max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0 text-xs sm:text-sm font-light ${themeClasses.textSecondary}`}>
          <p>© {new Date().getFullYear()} ZonePulse. All rights reserved.</p>
          <div className="flex space-x-3 sm:space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">
              <Twitter size={16} className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">
              <Linkedin size={16} className="w-4 h-4" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">
              <Github size={16} className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">
              <Instagram size={16} className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}