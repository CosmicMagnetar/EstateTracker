"use client";

import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState<boolean>(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-gray-900", "text-white");
      document.body.classList.remove("bg-gray-50", "text-gray-900");
    } else {
      document.body.classList.add("bg-gray-50", "text-gray-900");
      document.body.classList.remove("bg-gray-900", "text-white");
    }

    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <Head>
        <title>Settings - EstateTracker</title>
      </Head>

      <nav className={`shadow p-4 flex justify-between items-center sticky top-0 z-50 pl-7 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
        <div className="text-xl font-bold">
          <Link href="/" className="hover:text-blue-400 transition-colors">EstateTracker</Link>
        </div>
        <div className="space-x-6">
          <Link href="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link>
          <Link href="/compare" className="hover:text-blue-400 transition-colors">Compare</Link>
          <Link href="/insights" className="hover:text-blue-400 transition-colors">Insights</Link>
          <Link href="/settings" className="hover:text-blue-400 transition-colors">Settings</Link>
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </nav>

      <section className={`text-center py-20 px-4 ${darkMode ? "bg-gray-800 text-white" : "bg-blue-50 text-gray-900"}`}>
        <h1 className="text-5xl font-extrabold mb-4">Settings</h1>
        <p className="text-lg md:text-xl mb-8">Adjust your preferences for a personalized experience.</p>
      </section>

      <div className={`max-w-5xl mx-auto py-12 px-6 rounded-lg shadow-lg ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}>
        <h2 className="text-3xl font-semibold mb-6">Theme Preferences</h2>
        <div>
          <label className="block text-lg font-medium">Enable Dark Mode</label>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-6 py-3 rounded-lg mt-2 transition-all bg-blue-600 text-white hover:bg-blue-700"
          >
            {darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
          </button>
        </div>
      </div>

      <div className={`max-w-5xl mx-auto py-12 px-6 rounded-lg shadow-lg ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}>
        <h2 className="text-3xl font-semibold mb-6">Account & Preferences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
            <h3 className="text-xl font-bold mb-4">Notification Preferences</h3>
            <p className="text-gray-400">Manage alerts and updates for real estate trends.</p>
          </div>
          <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
            <h3 className="text-xl font-bold mb-4">Language Preferences</h3>
            <p className="text-gray-400">Select your preferred language for the platform.</p>
          </div>
          <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
            <h3 className="text-xl font-bold mb-4">Currency Format</h3>
            <p className="text-gray-400">Choose how currency values are displayed.</p>
          </div>
          <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
            <h3 className="text-xl font-bold mb-4">Privacy Settings</h3>
            <p className="text-gray-400">Control who can see your profile and activity.</p>
          </div>
        </div>
      </div>

      <footer className={`text-center py-6 mt-12 ${darkMode ? "bg-gray-800 text-white" : "bg-gray-900 text-white"}`}>
        <p className="text-sm">© 2024 EstateTracker. All rights reserved.</p>
      </footer>
    </div>
  );
}
