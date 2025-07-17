"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../../../supabaseClient";
import { useSettings } from "../settings-context";
import { Sun, Moon, User, LogOut, Menu, X } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  type UserProfile = {
  avatar_url?: string;
  name?: string;
};

  // ❌ Hide on login/signup pages
  const hideHeaderRoutes = ["/login", "/signup", "/profile"];
  if (hideHeaderRoutes.includes(pathname)) return null;

  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { isDark, toggleDark } = useSettings();

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
    router.push("/login");
  };

  const themeClasses = {
    text: isDark ? "text-white" : "text-gray-900",
    textSecondary: isDark ? "text-gray-300" : "text-gray-600",
    bgHover: isDark ? "hover:bg-gray-800" : "hover:bg-gray-100",
    border: isDark ? "border-gray-700" : "border-gray-200",
    navBg: isDark ? "bg-gray-900/90" : "bg-white/90",
    accent: "text-green-500",
  };

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/compare", label: "Compare" },
    { href: "/insights", label: "Insights" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrollY > 50
          ? `py-4 ${themeClasses.navBg} backdrop-blur-xl shadow-xl`
          : "py-6 bg-transparent"
      } border-b ${themeClasses.border}`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <img src="/logo.png" className="w-8 h-8 rounded-full" alt="Logo" />
          <span className="text-2xl font-light tracking-wider">ZonePulse</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-light transition-colors duration-200 ${
                pathname === link.href
                  ? "text-green-500"
                  : themeClasses.textSecondary
              } hover:text-green-500`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDark}
            className={`p-2 rounded-full ${themeClasses.border} ${themeClasses.bgHover}`}
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
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
                <span>{profile?.name || user.email}</span>
              </button>

              {isMenuOpen && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-lg border ${
                    themeClasses.border
                  } ${isDark ? "bg-gray-800" : "bg-white"} shadow-xl`}
                >
                  <Link
                    href="/profile"
                    className="w-full flex items-center px-4 py-3 text-sm hover:text-red-500 hover:bg-red-50 transition"
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
            <div className="flex items-center space-x-4">
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
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Items */}
      {isMenuOpen && (
        <div
          className={`md:hidden px-8 py-6 space-y-4 ${themeClasses.navBg} border-t ${themeClasses.border}`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block text-sm font-light transition-colors duration-200 ${
                pathname === link.href
                  ? "text-green-500"
                  : themeClasses.textSecondary
              } hover:text-green-500`}
            >
              {link.label}
            </Link>
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
  );
}
