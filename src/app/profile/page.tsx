"use client";

import { useEffect, useState, useRef } from "react";
import {
  Mail,
  User,
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
  LogOut,
  Edit3,
  Camera,
  X,
  Menu,
} from "lucide-react";
import { supabase } from "../../../supabaseClient";
import { useSettings } from "../settings-context";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname } from "next/navigation";

type UserData = {
  fullName: string;
  email: string;
  avatar: string | null;
  provider: string;
  joined: string;
  lastSignIn: string;
};

export default function ProfilePage() {
  const pathname = usePathname();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isDark, toggleDark } = useSettings();
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);

  // ✅ Consistent theme classes with header
  const themeClasses = {
    text: isDark ? "text-white" : "text-gray-900",
    textSecondary: isDark ? "text-gray-300" : "text-gray-600",
    bgHover: isDark ? "hover:bg-gray-800" : "hover:bg-gray-100",
    border: isDark ? "border-gray-700" : "border-gray-200",
    navBg: isDark ? "bg-gray-900/90" : "bg-white/90",
    accent: "text-green-500",
    dropdownBg: isDark ? "bg-gray-800" : "bg-white",
    dropdownHover: isDark ? "hover:bg-gray-700" : "hover:bg-gray-50",
    dropdownText: isDark ? "text-gray-300" : "text-gray-700",
    dropdownTextHover: isDark ? "hover:text-white" : "hover:text-gray-900",
    dangerText: isDark ? "text-red-400" : "text-red-600",
    dangerTextHover: isDark ? "hover:text-red-300" : "hover:text-red-500",
    dangerBgHover: isDark ? "hover:bg-red-900/20" : "hover:bg-red-50",
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
  };

  // ✅ Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
        setUserData({
          fullName: profileData.name || user.email || "",
          email: user.email || "",
          avatar: profileData.avatar_url || null,
          provider: user.app_metadata?.provider || "email",
          joined: new Date(user.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          }),
          lastSignIn: new Date(
            user.last_sign_in_at || new Date()
          ).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }),
        });
      } else {
        console.error("❌ Profile fetch error:", profileError);
        setUserData({
          fullName: user.email || "",
          email: user.email || "",
          avatar: null,
          provider: user.app_metadata?.provider || "email",
          joined: new Date(user.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          }),
          lastSignIn: new Date(
            user.last_sign_in_at || new Date()
          ).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }),
        });
      }
    };

    fetchUserAndProfile();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          fetchUserAndProfile();
        } else {
          setUser(null);
          setProfile(null);
          setUserData(null);
          window.location.href = "/login";
        }
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/compare", label: "Compare" },
    { href: "/insights", label: "Insights" },
    { href: "/settings", label: "Settings" },
  ];

  const stats = [
    {
      icon: <Home className="w-5 h-5" />,
      label: "Properties Tracked",
      value: "247",
      color: "text-green-500",
    },
    {
      icon: <Eye className="w-5 h-5" />,
      label: "Market Views",
      value: "1.2K",
      color: "text-emerald-500",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      label: "Saved Properties",
      value: "89",
      color: "text-green-600",
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: "Alerts Set",
      value: "34",
      color: "text-emerald-600",
    },
  ];

  const activities = [
    {
      icon: <Bookmark className="w-4 h-4" />,
      action: "Saved property",
      detail: "3 BHK in Bandra West",
      time: "2 hours ago",
    },
    {
      icon: <Bell className="w-4 h-4" />,
      action: "Price alert triggered",
      detail: "Andheri East apartment",
      time: "5 hours ago",
    },
    {
      icon: <Activity className="w-4 h-4" />,
      action: "Market analysis viewed",
      detail: "South Mumbai trends",
      time: "1 day ago",
    },
    {
      icon: <Star className="w-4 h-4" />,
      action: "Report generated",
      detail: "Monthly market summary",
      time: "2 days ago",
    },
  ];

  if (!userData) {
    return (
      <div
        className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} flex items-center justify-center`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-lg font-light">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} overflow-x-hidden transition-colors duration-700`}
    >
      <nav
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
    scrollY > 50
      ? `py-4 ${themeClasses.navBg} backdrop-blur-xl shadow-xl`
      : "py-6 bg-transparent"
  } border-b ${themeClasses.border}`}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
    <Link href="/" className="flex items-center space-x-3">
      <img src="/logo.png" className="w-8 h-8 rounded-full" alt="Logo" />
      <span className={`text-xl sm:text-2xl font-light tracking-wider ${themeClasses.text}`}>
        ZonePulse
      </span>
    </Link>

    <div className="hidden md:flex items-center space-x-8">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-sm font-light transition-colors duration-200 ${
            isActive(link.href)
              ? "text-green-500"
              : themeClasses.textSecondary
          } hover:text-green-500`}
        >
          {link.label}
        </Link>
      ))}
    </div>

    <div className="flex items-center space-x-2 sm:space-x-4">
      <button
        onClick={toggleDark}
        className={`p-2 rounded-full border transition-colors duration-200 ${themeClasses.border} ${themeClasses.bgHover} ${themeClasses.text}`}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
      </button>

      {user ? (
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`hidden md:flex items-center space-x-2 text-sm transition-colors duration-200 ${themeClasses.text} ${themeClasses.bgHover} px-3 py-2 rounded-lg`}
          >
            {profile?.avatar_url && (
              <img src={profile.avatar_url} alt="Avatar" className="w-6 h-6 rounded-full" />
            )}
            <span className="max-w-32 truncate">{profile?.name || user.email}</span>
          </button>

          {isMenuOpen && !isMobile && (
            <div
              className={`absolute right-0 mt-2 w-48 rounded-lg border ${themeClasses.border} ${isDark ? "bg-gray-800" : "bg-white"} shadow-xl`}
            >
              <Link
                href="/profile"
                className="w-full flex items-center px-4 py-3 text-sm hover:text-green-500 hover:bg-green-50 transition"
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </Link>
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
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/login"
            className="text-sm font-light hover:text-green-500 transition"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-sm font-light hover:text-green-500 transition"
          >
            Sign Up
          </Link>
        </div>
      )}

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 transition-colors duration-200 ${themeClasses.text} ${themeClasses.bgHover} rounded-lg"
        aria-label="Toggle mobile menu"
      >
        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
    </div>
  </div>

  {isMenuOpen && (
    <div
      className={`md:hidden px-4 sm:px-6 py-6 space-y-4 ${themeClasses.navBg} border-t ${themeClasses.border} backdrop-blur-xl`}
    >
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`block text-sm font-light transition-colors duration-200 ${
            isActive(link.href)
              ? "text-green-500"
              : themeClasses.textSecondary
          } hover:text-green-500`}
          onClick={() => setIsMenuOpen(false)}
        >
          {link.label}
        </Link>
      ))}

      {user && (
        <div className={`pt-4 border-t ${themeClasses.border} space-y-3`}>
          <div className={`flex items-center space-x-3 ${themeClasses.textSecondary}`}>
            {profile?.avatar_url && (
              <img
                src={profile.avatar_url}
                alt="Avatar"
                className="w-8 h-8 rounded-full"
              />
            )}
            <div>
              <div className="text-sm font-medium">{profile?.name || user.email}</div>
            </div>
          </div>

          <Link
            href="/profile"
            className={`flex items-center space-x-2 text-sm font-light transition-colors duration-200 ${themeClasses.textSecondary} hover:text-green-500`}
            onClick={() => setIsMenuOpen(false)}
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </Link>

          <button
            onClick={handleLogout}
            className={`flex items-center space-x-2 text-sm font-light transition-colors duration-200 ${themeClasses.dangerText} ${themeClasses.dangerTextHover}`}
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  )}
</nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 sm:mb-16">
            <div
              className={`inline-flex items-center space-x-2 border ${themeClasses.accentBorder} rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-4 sm:mb-8 backdrop-blur-sm bg-green-500/10 shadow-lg ${themeClasses.accentGlow}`}
            >
              <User className="w-4 h-4 text-green-500" />
              <span
                className={`text-xs sm:text-sm font-light tracking-wide ${themeClasses.accent}`}
              >
                Profile Dashboard
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-light mb-4 sm:mb-6 tracking-tight">
              <span className={themeClasses.textMuted}>Your</span>{" "}
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                Profile
              </span>
            </h1>
            <p
              className={`text-base sm:text-xl font-light ${themeClasses.textSecondary} max-w-2xl leading-relaxed`}
            >
              Manage your account, track your activity, and customize your
              experience
            </p>
          </div>

          {/* Main Profile Card */}
          <div
            className={`relative p-4 sm:p-8 md:p-12 border ${themeClasses.border} rounded-xl sm:rounded-2xl md:rounded-3xl transition-all duration-700 ${themeClasses.borderHover} ${themeClasses.cardBg} hover:shadow-xl sm:hover:shadow-2xl mb-8 sm:mb-12 group`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              {/* Profile Info */}
              <div className="space-y-6 sm:space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
                  <div className="relative">
                    {userData.avatar ? (
                      <img
                        src={userData.avatar}
                        alt="Profile"
                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover shadow-lg"
                      />
                    ) : (
                      <div
                        className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-xl sm:text-2xl md:text-3xl font-light shadow-lg ${themeClasses.accentGlow}`}
                      >
                        {userData.fullName?.charAt(0) || "U"}
                      </div>
                    )}
                    <button
                      className={`absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-500 text-white flex items-center justify-center shadow-md hover:bg-green-600 transition-colors duration-300`}
                    >
                      <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide break-words">
                      {userData?.fullName}
                    </h2>
                    <p
                      className={`${themeClasses.textSecondary} font-light capitalize text-sm sm:text-base`}
                    >
                      {userData.provider === "google"
                        ? "Google Account"
                        : "Email Account"}
                    </p>
                    <div className="flex items-center space-x-2 mt-1 sm:mt-2">
                      <Award className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                      <span className={`text-xs sm:text-sm ${themeClasses.accent}`}>
                        Active User
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {[
                    {
                      icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />,
                      label: "Email",
                      value: userData.email,
                    },
                    {
                      icon: <User className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />,
                      label: "Login Method",
                      value:
                        userData.provider === "google"
                          ? "Google OAuth"
                          : "Email & Password",
                    },
                    {
                      icon: <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />,
                      label: "Joined",
                      value: userData.joined,
                    },
                    {
                      icon: <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />,
                      label: "Last Sign In",
                      value: userData.lastSignIn,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 sm:space-x-4 group/item"
                    >
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border ${themeClasses.border} flex items-center justify-center group-hover/item:border-green-500 transition-all duration-300`}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`text-xs sm:text-sm font-light ${themeClasses.textMuted} mb-1`}
                        >
                          {item.label}
                        </p>
                        <p className="font-light tracking-wide text-sm sm:text-base">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className={`p-4 sm:p-6 border ${themeClasses.border} rounded-xl sm:rounded-2xl transition-all duration-500 ${themeClasses.borderHover} ${themeClasses.bgHover} hover:shadow-lg group/stat`}
                    >
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border ${themeClasses.border} flex items-center justify-center group-hover/stat:border-green-500 transition-all duration-300 ${stat.color}`}
                        >
                          {stat.icon}
                        </div>
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover/stat:text-green-500 transition-colors duration-300" />
                      </div>
                      <div className={`text-xl sm:text-2xl font-light mb-1 ${stat.color}`}>
                        {stat.value}
                      </div>
                      <div
                        className={`text-xs sm:text-sm font-light ${themeClasses.textSecondary}`}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    className={`flex-1 group relative overflow-hidden bg-green-500 text-white hover:bg-green-600 px-4 py-3 sm:px-6 sm:py-4 rounded-full font-light transition-all duration-500 tracking-wide shadow-lg hover:shadow-xl ${themeClasses.accentGlow}`}
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">Edit Profile</span>
                    </span>
                  </button>
                  <button
                    className={`group flex items-center justify-center space-x-2 px-4 py-3 sm:px-6 sm:py-4 rounded-full font-light border ${themeClasses.accentBorder} text-green-500 hover:bg-green-500 hover:text-white transition-all duration-500 tracking-wide text-xs sm:text-sm`}
                  >
                    <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2">
              <div
                className={`p-4 sm:p-6 md:p-8 border ${themeClasses.border} rounded-xl sm:rounded-2xl transition-all duration-700 ${themeClasses.borderHover} ${themeClasses.cardBg} hover:shadow-lg sm:hover:shadow-xl`}
              >
                <h3 className="text-xl sm:text-2xl font-light mb-6 tracking-wide">
                  Recent Activity
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  {activities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 sm:space-x-4 group/activity"
                    >
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border ${themeClasses.border} flex items-center justify-center group-hover/activity:border-green-500 transition-all duration-300 text-green-500`}
                      >
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-light mb-1 text-sm sm:text-base">{activity.action}</p>
                        <p
                          className={`text-xs sm:text-sm ${themeClasses.textSecondary} mb-1 sm:mb-2`}
                        >
                          {activity.detail}
                        </p>
                        <p className={`text-xs ${themeClasses.textMuted}`}>
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {/* Quick Actions */}
              <div
                className={`p-4 sm:p-6 border ${themeClasses.border} rounded-xl sm:rounded-2xl transition-all duration-700 ${themeClasses.borderHover} ${themeClasses.cardBg} hover:shadow-lg sm:hover:shadow-xl`}
              >
                <h3 className="text-lg sm:text-xl font-light mb-4 sm:mb-6 tracking-wide">
                  Quick Actions
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    {
                      icon: <Shield className="w-3 h-3 sm:w-4 sm:h-4" />,
                      label: "Privacy Settings",
                      color: "text-green-500",
                    },
                    {
                      icon: <Bell className="w-3 h-3 sm:w-4 sm:w-4" />,
                      label: "Notifications",
                      color: "text-emerald-500",
                    },
                    {
                      icon: <Activity className="w-3 h-3 sm:w-4 sm:h-4" />,
                      label: "Activity Log",
                      color: "text-green-600",
                    },
                    {
                      icon: <Star className="w-3 h-3 sm:w-4 sm:h-4" />,
                      label: "Preferences",
                      color: "text-emerald-600",
                    },
                  ].map((action, index) => (
                    <button
                      key={index}
                      className={`w-full flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg border ${themeClasses.border} transition-all duration-300 ${themeClasses.borderHover} ${themeClasses.bgHover} hover:shadow-md group text-xs sm:text-sm`}
                    >
                      <div
                        className={`${action.color} group-hover:scale-110 transition-transform duration-300`}
                      >
                        {action.icon}
                      </div>
                      <span className="font-light">{action.label}</span>
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 ml-auto group-hover:text-green-500 transition-colors duration-300" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Plan Info */}
              <div
                className={`p-4 sm:p-6 border ${themeClasses.border} rounded-xl sm:rounded-2xl transition-all duration-700 ${themeClasses.borderHover} ${themeClasses.cardBg} hover:shadow-lg sm:hover:shadow-xl`}
              >
                <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  <h3 className="text-lg sm:text-xl font-light tracking-wide">
                    Account Status
                  </h3>
                </div>
                <p className={`text-xl sm:text-2xl font-light text-green-500 mb-1 sm:mb-2`}>
                  Active
                </p>
                <p className={`text-xs sm:text-sm ${themeClasses.textSecondary} mb-3 sm:mb-4`}>
                  Signed in via{" "}
                  {userData.provider === "google" ? "Google" : "Email"}
                </p>
                <button
                  className={`w-full py-2 sm:py-3 rounded-full font-light border ${themeClasses.accentBorder} text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300 tracking-wide text-xs sm:text-sm`}
                >
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