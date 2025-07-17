"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Sun,
  Moon,
  Star,
  Shield,
  Zap,
  Globe2,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  CheckCircle,
  AlertCircle,
  Phone,
  Building2,
  Chrome,
  ChevronLeft
} from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "../../../supabaseClient"; // adjust path if needed
import Header from "../components/Header";
import { useSettings } from "../settings-context";
import Link from "next/link";

const handleGoogleAuth = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });

    if (error) {
      console.error("Google Auth Error:", error.message);
    }
  } catch (err) {
    console.error("Unexpected error with Google login", err);
  }
};

const AuthPages = () => {
  const [currentPage, setCurrentPage] = useState('login'); // 'login' or 'signup'
  const [scrollY, setScrollY] = useState(0);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const { isDark, toggleDark } = useSettings();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const cursorRef = useRef(null);

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [signupForm, setSignupForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

   const handleMouseMove = (e) => {
  mousePositionRef.current = { x: e.clientX, y: e.clientY };

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
    inputBg: isDark ? 'bg-gray-800' : 'bg-white',
    cursor: isDark ? 'bg-green-400' : 'bg-green-500',
    accent: 'text-green-500',
    accentBg: isDark ? 'bg-green-500' : 'bg-green-500',
    accentHover: isDark ? 'hover:bg-green-600' : 'hover:bg-green-600',
    accentBorder: 'border-green-500',
    accentGlow: isDark ? 'shadow-green-500/20' : 'shadow-green-500/10',
    bgLog: isDark ? 'bg-gray-800':'bg-white'
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

  const validateLogin = () => {
    const newErrors = {};
    
    if (!loginForm.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!loginForm.password) {
      newErrors.password = 'Password is required';
    } else if (loginForm.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignup = () => {
    const newErrors = {};
    
    if (!signupForm.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!signupForm.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signupForm.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!signupForm.phone) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!signupForm.password) {
      newErrors.password = 'Password is required';
    } else if (signupForm.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!signupForm.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (signupForm.password !== signupForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!signupForm.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setIsLoading(true);
    setErrors({});
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password,
      });

      if (error) {
        setErrors({ password: error.message });
      } else {
        alert("Login successful!");
        window.location.href = "/dashboard"; // optional
      }
    } catch (err) {
      setErrors({ password: "Unexpected error. Try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateSignup()) return;

    setIsLoading(true);
    setErrors({});
    
    try {
      const { error } = await supabase.auth.signUp({
        email: signupForm.email,
        password: signupForm.password,
        options: {
          data: {
            fullName: signupForm.fullName,
            phone: signupForm.phone,
            company: signupForm.company,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        setErrors({ email: error.message });
      } else {
        alert("Signup successful! Please check your email.");
        setCurrentPage("login");
      }
    } catch (err) {
      setErrors({ email: "Unexpected error. Try again." });
    } finally {
      setIsLoading(false);
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
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setGoogleLoading(false);
    }
  };

  const InputField = ({ 
    icon: Icon, 
    type = "text", 
    placeholder, 
    value, 
    onChange, 
    error, 
    name,
    showPasswordToggle = false,
    showPassword = false,
    onTogglePassword = () => {}
  }) => (
    <div className="relative mb-5">
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          className={`w-full pl-12 pr-12 py-4 border ${error ? 'border-red-500' : themeClasses.border} rounded-xl ${themeClasses.inputBg} ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 font-light`}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-500 transition-colors duration-200"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center space-x-2 mt-2 text-red-500">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  );

  const LoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-6">
      {/* Error Message */}
      {errors.submit && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600 text-sm">{errors.submit}</p>
        </div>
      )}

      {/* Google Login */}
      <button
        type="button"
        onClick={handleGoogleLogin}
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

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className={`w-full border-t ${themeClasses.border}`} />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className={`${themeClasses.bgLog} px-4 ${themeClasses.textSecondary}`}>
            or continue with email
          </span>
        </div>
      </div>

      <InputField
        icon={Mail}
        type="email"
        placeholder="Enter your email"
        value={loginForm.email}
        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
        error={errors.email}
        name="email"
      />

      <InputField
        icon={Lock}
        placeholder="Enter your password"
        value={loginForm.password}
        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
        error={errors.password}
        name="password"
        showPasswordToggle={true}
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(!showPassword)}
      />

      <div className="flex items-center justify-between mb-6">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={loginForm.rememberMe}
            onChange={(e) => setLoginForm({ ...loginForm, rememberMe: e.target.checked })}
            className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
          />
          <span className={`text-sm ${themeClasses.textSecondary}`}>Remember me</span>
        </label>
        <button
          type="button"
          className="text-sm text-green-500 hover:text-green-600 transition-colors duration-200"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 bg-green-500 text-white rounded-xl font-light text-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg ${themeClasses.accentGlow} mb-6`}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <span>Sign In</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      <div className="text-center">
        <span className={`text-sm ${themeClasses.textSecondary}`}>
          Don't have an account?{' '}
        </span>
        <Link href="/signup" className="text-sm text-green-500 hover:text-green-600 transition-colors duration-200 font-medium">
          Sign up
        </Link>
      </div>
    </form>
  );

  return (
    <div className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} overflow-x-hidden transition-colors duration-700`}>
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className={`fixed w-4 h-4 ${themeClasses.cursor} rounded-full pointer-events-none z-50 transition-all duration-100 ease-out mix-blend-difference`}
        style={{
  transform: `translate(${mousePositionRef.current.x * 0.02}px, ${mousePositionRef.current.y * 0.02}px)`,
}}

      />

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl"
          style={{
  transform: `translate(${mousePositionRef.current.x * 0.02}px, ${mousePositionRef.current.y * 0.02}px)`,
}}

        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-emerald-500/20 to-green-400/20 rounded-full blur-3xl"
          style={{
  transform: `translate(${mousePositionRef.current.x * 0.02}px, ${mousePositionRef.current.y * 0.02}px)`,
}}

        />
      </div>

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
      <div className="relative z-10 min-h-screen flex items-center justify-center py-20 px-8 mt-10">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Features */}
            <div className="space-y-12">
              <div>
                <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
                  <span className="block">Welcome to</span>
                  <span className="block bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                    ZonePulse
                  </span>
                </h1>
                <p className={`text-xl font-light ${themeClasses.textSecondary} leading-relaxed`}>
                  {currentPage === 'login' 
                    ? "Welcome back! Sign in to access your real estate analytics dashboard." 
                    : "Join thousands of professionals making smarter real estate decisions."}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-6">
                {[
                  {
                    icon: <Shield className="w-6 h-6 text-green-500" />,
                    title: "Secure & Trusted",
                    desc: "Enterprise-grade security for your data"
                  },
                  {
                    icon: <Zap className="w-6 h-6 text-emerald-500" />,
                    title: "Real-time Analytics",
                    desc: "Get instant insights on market trends"
                  },
                  {
                    icon: <Star className="w-6 h-6 text-green-600" />,
                    title: "Trusted by 10K+",
                    desc: "Join professionals worldwide"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className={`w-12 h-12 rounded-xl ${themeClasses.cardBg} border ${themeClasses.border} flex items-center justify-center`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-light text-lg mb-1">{feature.title}</h3>
                      <p className={`${themeClasses.textSecondary} text-sm`}>{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { number: "10K+", label: "Users" },
                  { number: "2.5M+", label: "Properties" },
                  { number: "150+", label: "Cities" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-light text-green-500 mb-1">{stat.number}</div>
                    <div className={`text-sm ${themeClasses.textSecondary}`}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="relative">
              <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-3xl p-8 shadow-2xl backdrop-blur-sm`}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-light mb-2">
                    {currentPage === 'login' ? 'Sign In' : 'Create Account'}
                  </h2>
                  <p className={`${themeClasses.textSecondary} font-light`}>
                    {currentPage === 'login' 
                      ? 'Access your dashboard and continue your journey' 
                      : 'Get started with your free account today'}
                  </p>
                </div>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`py-8 px-8 ${themeClasses.cardBg} border-t ${themeClasses.border}`}>
        <div className={`max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm font-light ${themeClasses.textSecondary}`}>
          <p>© 2024 ZonePulse. All rights reserved.</p>
          <div className="flex space-x-6">
            <button className="hover:text-green-500 transition-colors duration-200">Privacy Policy</button>
            <button className="hover:text-green-500 transition-colors duration-200">Terms of Service</button>
            <button className="hover:text-green-500 transition-colors duration-200">Support</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthPages;