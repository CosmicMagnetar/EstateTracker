"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../../../supabaseClient";
import { useSettings } from "../settings-context";
import { Sun, Moon, User, LogOut, Menu, X } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

type UserProfile = {
  avatar_url?: string;
  name?: string;
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  // ❌ Hide on login/signup pages
  const hideHeaderRoutes = ["/login", "/signup", "/profile"];
  if (hideHeaderRoutes.includes(pathname)) return null;

  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { isDark, toggleDark } = useSettings();

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
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (data) setProfile(data);
        else if (error) console.error("Profile fetch error:", error);
      }
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const newUser = session?.user || null;
        setUser(newUser);

        if (newUser) {
          supabase
            .from("profiles")
            .select("*")
            .eq("id", newUser.id)
            .single()
            .then(({ data, error }) => {
              if (data) setProfile(data);
              if (error) console.error("Profile fetch error:", error);
            });
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsMenuOpen(false);
    router.push("/login");
  };

  // ✅ Fixed and comprehensive theme classes
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
  };

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/compare", label: "Compare" },
    { href: "/insights", label: "Insights" },
    { href: "/settings", label: "Settings" },
  ];

  // ✅ Helper function to get display name
  const getDisplayName = () => {
    if (profile?.name) return profile.name;
    if (user?.email) {
      // On mobile, show just the username part of email
      if (isMobile) {
        return user.email.split('@')[0];
      }
      return user.email;
    }
    return "User";
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrollY > 50
          ? `py-4 ${themeClasses.navBg} backdrop-blur-xl shadow-xl`
          : "py-6 bg-transparent"
      } border-b ${themeClasses.border}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* ✅ Logo with proper theme classes */}
        <Link href="/" className="flex items-center space-x-3">
          <img src="/logo.png" className="w-8 h-8 rounded-full" alt="Logo" />
          <span className={`text-xl sm:text-2xl font-light tracking-wider ${themeClasses.text}`}>
            ZonePulse
          </span>
        </Link>

        {/* ✅ Desktop Navigation - hidden on mobile */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-light transition-colors duration-200 ${
                pathname === link.href
                  ? themeClasses.accent
                  : themeClasses.textSecondary
              } hover:text-green-500`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ✅ Right side controls */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* ✅ Theme toggle button */}
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

          {/* ✅ Desktop User menu or auth links - hidden on mobile */}
          {user ? (
            <div className="relative">
              {/* ✅ Desktop user menu */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`hidden md:flex items-center space-x-2 text-sm transition-colors duration-200 ${themeClasses.text} ${themeClasses.bgHover} px-3 py-2 rounded-lg`}
                aria-label="User menu"
              >
                {profile?.avatar_url && (
                  <img
                    src={profile.avatar_url}
                    alt="Avatar"
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span className="max-w-32 truncate">{getDisplayName()}</span>
              </button>

              {/* ✅ Desktop dropdown menu */}
              {isMenuOpen && !isMobile && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-lg border shadow-xl z-50 ${themeClasses.border} ${themeClasses.dropdownBg}`}
                >
                  <Link
                    href="/profile"
                    className={`w-full flex items-center px-4 py-3 text-sm transition-colors duration-200 ${themeClasses.dropdownText} ${themeClasses.dropdownTextHover} ${themeClasses.dropdownHover} rounded-t-lg`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`w-full flex items-center px-4 py-3 text-sm transition-colors duration-200 ${themeClasses.dangerText} ${themeClasses.dangerTextHover} ${themeClasses.dangerBgHover} rounded-b-lg`}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // ✅ Desktop auth links - hidden on mobile
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/login"
                className={`text-sm font-light transition-colors duration-200 ${themeClasses.textSecondary} hover:text-green-500`}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className={`text-sm font-light transition-colors duration-200 ${themeClasses.textSecondary} hover:text-green-500`}
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* ✅ Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 transition-colors duration-200 ${themeClasses.text} ${themeClasses.bgHover} rounded-lg`}
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Menu Items */}
      {isMenuOpen && (
        <div
          className={`md:hidden px-4 sm:px-6 py-6 space-y-4 ${themeClasses.navBg} border-t ${themeClasses.border} backdrop-blur-xl`}
        >
          {/* ✅ Navigation links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block text-sm font-light transition-colors duration-200 ${
                pathname === link.href
                  ? themeClasses.accent
                  : themeClasses.textSecondary
              } hover:text-green-500`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          {/* ✅ Mobile user section */}
          {user ? (
            <div className={`pt-4 border-t ${themeClasses.border} space-y-3`}>
              {/* ✅ User info display */}
              <div className={`flex items-center space-x-3 ${themeClasses.textSecondary}`}>
                {profile?.avatar_url && (
                  <img
                    src={profile.avatar_url}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div>
                  <div className="text-sm font-medium">{getDisplayName()}</div>
                  {profile?.name && user?.email && (
                    <div className="text-xs opacity-75">{user.email}</div>
                  )}
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
          ) : (
            // ✅ Mobile auth section
            <div className={`pt-4 border-t ${themeClasses.border} space-y-3`}>
              <Link
                href="/login"
                className={`block text-sm font-light transition-colors duration-200 ${themeClasses.textSecondary} hover:text-green-500`}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className={`block text-sm font-light transition-colors duration-200 ${themeClasses.textSecondary} hover:text-green-500`}
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}