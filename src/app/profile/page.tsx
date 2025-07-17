"use client";

import { useEffect, useState, useRef } from "react";
import { 
  Mail, 
  User, 
  Phone, 
  Building2, 
  Edit3, 
  Save,
  Camera,
  MapPin,
  Calendar,
  Shield,
  Star,
  Award,
  Activity,
  TrendingUp,
  Home,
  Eye,
  Heart,
  Bookmark,
  Settings,
  Bell,
  ChevronRight,
  Sun,
  Moon,
  Menu,
  X,
  LogOut
} from "lucide-react";
import { supabase } from "../../../supabaseClient";
import { useSettings } from "../settings-context";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isDark, toggleDark, notifications, toggleNotifications } = useSettings();
  const cursorRef = useRef(null);


  const themeClasses = {
    bg: isDark ? 'bg-gray-900' : 'bg-gray-50',
    text: isDark ? 'text-white' : 'text-gray-900',
    textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
    textMuted: isDark ? 'text-gray-500' : 'text-gray-400',
    border: isDark ? 'border-gray-700' : 'border-gray-200',
    borderHover: isDark ? 'hover:border-gray-600' : 'hover:border-gray-300',
    bgHover: isDark ? 'hover:bg-gray-800' : 'hover:bg-white',
    cardBg: isDark ? 'bg-gray-800' : 'bg-white',
    navBg: isDark ? 'bg-gray-900/90' : 'bg-white/90',
    cursor: isDark ? 'bg-green-400' : 'bg-green-500',
    accent: 'text-green-500',
    accentBg: isDark ? 'bg-green-500' : 'bg-green-500',
    accentHover: isDark ? 'hover:bg-green-600' : 'hover:bg-green-600',
    accentBorder: 'border-green-500',
    accentGlow: isDark ? 'shadow-green-500/20' : 'shadow-green-500/10',
    gradient: isDark ? 'from-gray-900 via-gray-800 to-gray-900' : 'from-white via-gray-50 to-white',
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);
      
      if (cursorRef.current) {
        requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.transform = `translate(${newPosition.x - 8}px, ${newPosition.y - 8}px)`;
          }
        });
      }


    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      setUser(user);

      // Use the same approach as in Header component
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)  // Use user.id directly, not the cleaned version
        .single();

      if (profileData) {
        setProfile(profileData);
        setUserData({
          fullName: profileData.name || user.email,
          email: user.email,
          avatar: profileData.avatar_url,
          provider: user.app_metadata?.provider || "email",
          joined: new Date(user.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          }),
          lastSignIn: new Date(user.last_sign_in_at || new Date()).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }),
        });
      } else {
        console.error("❌ Profile fetch error:", profileError);
        console.warn("🧪 user.id is:", user.id);
        
        // If profile doesn't exist, create basic userData from user info
        setUserData({
          fullName: user.email,
          email: user.email,
          avatar: null,
          provider: user.app_metadata?.provider || "email",
          joined: new Date(user.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          }),
          lastSignIn: new Date(user.last_sign_in_at || new Date()).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }),
        });
      }
    };

    fetchUserAndProfile();

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        // Refetch profile when auth state changes
        fetchUserAndProfile();
      } else {
        setUser(null);
        setProfile(null);
        setUserData(null);
        window.location.href = "/login";
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const isActive = (href) => {
    return window.location.pathname === href;
  };

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/compare", label: "Compare" },
    { href: "/insights", label: "Insights" },
    { href: "/settings", label: "Settings" },
  ];

  const stats = [
    { icon: <Home className="w-5 h-5" />, label: "Properties Tracked", value: "247", color: "text-green-500" },
    { icon: <Eye className="w-5 h-5" />, label: "Market Views", value: "1.2K", color: "text-emerald-500" },
    { icon: <Heart className="w-5 h-5" />, label: "Saved Properties", value: "89", color: "text-green-600" },
    { icon: <TrendingUp className="w-5 h-5" />, label: "Alerts Set", value: "34", color: "text-emerald-600" }
  ];

  const activities = [
    { icon: <Bookmark className="w-4 h-4" />, action: "Saved property", detail: "3 BHK in Bandra West", time: "2 hours ago" },
    { icon: <Bell className="w-4 h-4" />, action: "Price alert triggered", detail: "Andheri East apartment", time: "5 hours ago" },
    { icon: <Activity className="w-4 h-4" />, action: "Market analysis viewed", detail: "South Mumbai trends", time: "1 day ago" },
    { icon: <Star className="w-4 h-4" />, action: "Report generated", detail: "Monthly market summary", time: "2 days ago" }
  ];

  // Show loading state while userData is being fetched
  if (!userData) {
    return (
      <div className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-lg font-light">Loading your profile...</p>
        </div>
      </div>
    );
  }

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

      {/* Header Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrollY > 50 ? `py-4 ${themeClasses.navBg} backdrop-blur-xl shadow-xl` : 'py-6 bg-transparent'} border-b ${themeClasses.border}`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <a href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <span className="text-2xl font-light tracking-wider">ZonePulse</span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-light transition-colors duration-200 ${
                  isActive(link.href) ? "text-green-500" : themeClasses.textSecondary
                } hover:text-green-500`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDark}
              className={`p-2 rounded-full ${themeClasses.border} ${themeClasses.bgHover}`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 text-sm"
                >
                  {profile?.avatar_url && (
                    <img
                      src={profile.avatar_url}
                      alt="Avatar"
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <User className="w-4 h-4" />
                  <span>{profile?.name || user.email}</span>
                </button>

                {isMenuOpen && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-lg border ${themeClasses.border} ${isDark ? "bg-gray-800" : "bg-white"} shadow-xl`}>
                    <a
                      href="/profile"
                      className="w-full flex items-center px-4 py-3 text-sm hover:text-green-500 hover:bg-green-50 transition"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-3 text-sm hover:text-red-500 hover:bg-red-50 transition"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <a href="/login" className="text-sm font-light hover:text-green-500 transition">Login</a>
                <a href="/signup" className="text-sm font-light hover:text-green-500 transition">Sign Up</a>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Items */}
        {isMenuOpen && (
          <div className={`md:hidden px-8 py-6 space-y-4 ${themeClasses.navBg} border-t ${themeClasses.border}`}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`block text-sm font-light transition-colors duration-200 ${
                  isActive(link.href) ? "text-green-500" : themeClasses.textSecondary
                } hover:text-green-500`}
              >
                {link.label}
              </a>
            ))}
            {user && (
              <button
                onClick={handleLogout}
                className="w-full text-left text-sm text-red-500 mt-4"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-3xl`}
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px) translateY(${scrollY * 0.5}px)`,
            opacity: Math.max(0, 0.7 - scrollY * 0.001)
          }}
        />
        <div 
          className={`absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-emerald-500/10 to-green-400/10 rounded-full blur-3xl`}
          style={{
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px) translateY(${scrollY * -0.3}px)`,
            opacity: Math.max(0, 0.7 - scrollY * 0.001)
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <div className={`inline-flex items-center space-x-2 border ${themeClasses.accentBorder} rounded-full px-6 py-3 mb-8 backdrop-blur-sm bg-green-500/10 shadow-lg ${themeClasses.accentGlow}`}>
              <User className="w-4 h-4 text-green-500" />
              <span className={`text-sm font-light tracking-wide ${themeClasses.accent}`}>Profile Dashboard</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
              <span className={themeClasses.textMuted}>Your</span>{" "}
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Profile</span>
            </h1>
            <p className={`text-xl font-light ${themeClasses.textSecondary} max-w-2xl leading-relaxed`}>
              Manage your account, track your activity, and customize your experience
            </p>
          </div>

          {/* Main Profile Card */}
          <div className={`relative p-12 border ${themeClasses.border} rounded-3xl transition-all duration-700 ${themeClasses.borderHover} ${themeClasses.cardBg} hover:shadow-2xl mb-12 group`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Profile Info */}
              <div className="space-y-8">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    {userData.avatar ? (
                      <img 
                        src={userData.avatar} 
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover shadow-lg"
                      />
                    ) : (
                      <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-3xl font-light shadow-lg ${themeClasses.accentGlow}`}>
                        {userData.fullName?.charAt(0) || "U"}
                      </div>
                    )}
                    <button className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shadow-md hover:bg-green-600 transition-colors duration-300`}>
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h2 className="text-3xl font-light tracking-wide">{userData?.fullName}</h2>
                    <p className={`${themeClasses.textSecondary} font-light capitalize`}>
                      {userData.provider === 'google' ? 'Google Account' : 'Email Account'}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Award className="w-4 h-4 text-green-500" />
                      <span className={`text-sm ${themeClasses.accent}`}>Active User</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { icon: <Mail className="w-5 h-5 text-green-500" />, label: "Email", value: userData.email },
                    { icon: <User className="w-5 h-5 text-emerald-500" />, label: "Login Method", value: userData.provider === 'google' ? 'Google OAuth' : 'Email & Password' },
                    { icon: <Calendar className="w-5 h-5 text-green-600" />, label: "Joined", value: userData.joined },
                    { icon: <Activity className="w-5 h-5 text-emerald-600" />, label: "Last Sign In", value: userData.lastSignIn }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 group/item">
                      <div className={`w-10 h-10 rounded-full border ${themeClasses.border} flex items-center justify-center group-hover/item:border-green-500 transition-all duration-300`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-light ${themeClasses.textMuted} mb-1`}>{item.label}</p>
                        <p className="font-light tracking-wide">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className={`p-6 border ${themeClasses.border} rounded-2xl transition-all duration-500 ${themeClasses.borderHover} ${themeClasses.bgHover} hover:shadow-lg group/stat`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 rounded-full border ${themeClasses.border} flex items-center justify-center group-hover/stat:border-green-500 transition-all duration-300 ${stat.color}`}>
                          {stat.icon}
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover/stat:text-green-500 transition-colors duration-300" />
                      </div>
                      <div className={`text-2xl font-light mb-1 ${stat.color}`}>{stat.value}</div>
                      <div className={`text-sm font-light ${themeClasses.textSecondary}`}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <button className={`flex-1 group relative overflow-hidden bg-green-500 text-white hover:bg-green-600 px-6 py-4 rounded-full font-light transition-all duration-500 tracking-wide shadow-lg hover:shadow-xl ${themeClasses.accentGlow}`}>
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <Edit3 className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </span>
                  </button>
                  <button className={`group flex items-center justify-center space-x-2 px-6 py-4 rounded-full font-light border ${themeClasses.accentBorder} text-green-500 hover:bg-green-500 hover:text-white transition-all duration-500 tracking-wide`}>
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className={`p-8 border ${themeClasses.border} rounded-2xl transition-all duration-700 ${themeClasses.borderHover} ${themeClasses.cardBg} hover:shadow-xl`}>
                <h3 className="text-2xl font-light mb-8 tracking-wide">Recent Activity</h3>
                <div className="space-y-6">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4 group/activity">
                      <div className={`w-10 h-10 rounded-full border ${themeClasses.border} flex items-center justify-center group-hover/activity:border-green-500 transition-all duration-300 text-green-500`}>
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-light mb-1">{activity.action}</p>
                        <p className={`text-sm ${themeClasses.textSecondary} mb-2`}>{activity.detail}</p>
                        <p className={`text-xs ${themeClasses.textMuted}`}>{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Quick Actions */}
              <div className={`p-6 border ${themeClasses.border} rounded-2xl transition-all duration-700 ${themeClasses.borderHover} ${themeClasses.cardBg} hover:shadow-xl`}>
                <h3 className="text-xl font-light mb-6 tracking-wide">Quick Actions</h3>
                <div className="space-y-4">
                  {[
                    { icon: <Shield className="w-4 h-4" />, label: "Privacy Settings", color: "text-green-500" },
                    { icon: <Bell className="w-4 h-4" />, label: "Notifications", color: "text-emerald-500" },
                    { icon: <Activity className="w-4 h-4" />, label: "Activity Log", color: "text-green-600" },
                    { icon: <Star className="w-4 h-4" />, label: "Preferences", color: "text-emerald-600" }
                  ].map((action, index) => (
                    <button key={index} className={`w-full flex items-center space-x-3 p-3 rounded-lg border ${themeClasses.border} transition-all duration-300 ${themeClasses.borderHover} ${themeClasses.bgHover} hover:shadow-md group`}>
                      <div className={`${action.color} group-hover:scale-110 transition-transform duration-300`}>
                        {action.icon}
                      </div>
                      <span className="font-light">{action.label}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-green-500 transition-colors duration-300" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Plan Info */}
              <div className={`p-6 border ${themeClasses.border} rounded-2xl transition-all duration-700 ${themeClasses.borderHover} ${themeClasses.cardBg} hover:shadow-xl`}>
                <div className="flex items-center space-x-3 mb-4">
                  <Award className="w-5 h-5 text-green-500" />
                  <h3 className="text-xl font-light tracking-wide">Account Status</h3>
                </div>
                <p className={`text-2xl font-light text-green-500 mb-2`}>Active</p>
                <p className={`text-sm ${themeClasses.textSecondary} mb-4`}>
                  Signed in via {userData.provider === 'google' ? 'Google' : 'Email'}
                </p>
                <button className={`w-full py-3 rounded-full font-light border ${themeClasses.accentBorder} text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300 tracking-wide`}>
                  Account Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}