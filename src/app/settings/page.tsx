"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Moon, Sun, Bell, Globe2, DollarSign, Lock, Shield,
  X,
  Menu,
  ChevronDown,
  Activity,
  Settings
} from "lucide-react";
import { useSettings } from "../settings-context";

interface ThemeClasses {
  bg: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderHover: string;
  bgHover: string;
  navBg: string;
  gradient: string;
  cardBg: string;
  cursor: string;
  accent: string;
  accentBg: string;
  accentHover: string;
  accentBorder: string;
  accentGlow: string;
  tileBg?: string;
  tileHover?: string;
}

interface SettingTileProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  theme: ThemeClasses;
}

export default function SettingsPage() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isDark, toggleDark } = useSettings();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowScrollTop(window.scrollY > 500);
    };

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const themeClasses: ThemeClasses = {
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
    accentGlow: isDark ? 'shadow-green-500/20' : 'shadow-green-500/10',
    tileBg: isDark ? 'bg-gray-800' : 'bg-white',
    tileHover: isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
  };

  const Logo = () => (
    <Link href="/" className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-10 h-10 rounded-full flex items-center justify-center">
          <img src="/logo.png" alt="ZonePulse Logo" />
        </div>
      </div>
      <span className="text-2xl font-light tracking-wider">ZonePulse</span>
    </Link>
  );

  return (
    <div className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} transition-all duration-700`}>
      <div 
        ref={cursorRef}
        className={`fixed w-4 h-4 ${themeClasses.cursor} rounded-full pointer-events-none z-50 transition-all duration-100 ease-out mix-blend-difference`}
        style={{
          transform: `translate(${mousePosition.x - 8}px, ${mousePosition.y - 8}px) scale(${scrollY > 50 ? 1.5 : 1})`,
          willChange: 'transform'
        }}
      />

      {/* Header */}
      <section id="settings" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl`}
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px) translateY(${scrollY * 0.5}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.002),
            }}
          />
          <div
            className={`absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-emerald-500/20 to-green-400/20 rounded-full blur-3xl`}
            style={{
              transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px) translateY(${scrollY * -0.3}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.002),
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
            <Settings className="w-4 h-4 text-green-500" />
            <span className={`text-sm font-light tracking-wide ${themeClasses.accent}`}>
              Customize your preferences
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
            <span className="block">User</span>
            <span className="block bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
              Settings
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
            Manage your display preferences, privacy controls, and platform behavior from one unified dashboard.
          </p>

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

      {/* Theme Toggle */}
      <section className="max-w-5xl mx-auto py-16 px-6">
        <div className={`rounded-xl shadow-lg p-8 ${themeClasses.cardBg}`}>
          <h2 className="text-3xl font-light mb-6">Theme Preferences</h2>
          <button
            onClick={toggleDark}
            className="px-6 py-3 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all"
          >
            {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>
      </section>

      {/* Settings Cards */}
      <section className="max-w-5xl mx-auto pb-24 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SettingTile
            icon={<Bell className="w-6 h-6" />}
            title="Notifications"
            description="Manage alerts for market trends, AI predictions, and more."
            theme={themeClasses}
          />
          <SettingTile
            icon={<Globe2 className="w-6 h-6" />}
            title="Language"
            description="Choose your preferred language for the platform."
            theme={themeClasses}
          />
          <SettingTile
            icon={<DollarSign className="w-6 h-6" />}
            title="Currency Format"
            description="Control how pricing and investments are displayed."
            theme={themeClasses}
          />
          <SettingTile
            icon={<Lock className="w-6 h-6" />}
            title="Privacy"
            description="Control who can view your activity and preferences."
            theme={themeClasses}
          />
          <SettingTile
            icon={<Shield className="w-6 h-6" />}
            title="Security"
            description="Update password and enable 2FA for enhanced safety."
            theme={themeClasses}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className={`text-center py-6 ${isDark ? "bg-gray-800" : "bg-gray-900"} text-white`}>
        <p className="text-sm">© 2025 ZonePulse. All rights reserved.</p>
      </footer>
    </div>
  );
}

function SettingTile({ icon, title, description, theme }: SettingTileProps) {
  return (
    <div
      className={`p-6 rounded-xl border ${theme.border} ${theme.tileBg} transition-all duration-300 transform hover:scale-105 ${theme.tileHover} shadow-md`}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="text-green-500">{icon}</div>
        <h3 className="text-xl font-medium">{title}</h3>
      </div>
      <p className={`text-sm ${theme.textSecondary}`}>{description}</p>
    </div>
  );
}