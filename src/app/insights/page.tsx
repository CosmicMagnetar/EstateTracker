"use client";

import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Insights() {
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
        <title>Real Estate Investment Insights</title>
      </Head>

      <nav className={`shadow-lg p-4 flex justify-between items-center sticky top-0 z-50 pl-7 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
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
        <h1 className="text-5xl font-extrabold mb-4">Real Estate Investment Insights</h1>
        <p className="text-lg md:text-xl mb-8">
          Analyze growth patterns, risk factors, and strategic investment opportunities.
        </p>
      </section>

      <div className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-semibold mb-8">Long-Term Investment Growth</h2>
        <div className={`p-6 rounded-lg shadow-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
          <p className="text-lg">
            <strong>Real estate investments have historically outperformed inflation by an average of 3% yearly.</strong>
            <br />
            Major cities experience higher appreciation rates based on demand and economic stability.
          </p>
          <img
            src="https://learn.thinkprop.ae/wp-content/uploads/2023/04/real-estate-market-insight.jpg"
            alt="Investment Growth Graph"
            className="rounded-lg w-full mt-6 shadow-lg"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-semibold mb-8">Risk Zones & Market Stability</h2>
        <div className={`p-6 rounded-lg shadow-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
          <p className="text-lg">
            <strong>Cities with rapid price hikes may face downturns due to economic corrections.</strong>
            <br />
            Key indicators such as unemployment rates and consumer demand help predict stability.
          </p>
          <img
            src="https://techbonafide.com/wp-content/uploads/strategic-insights-the-future-of-real-estate-investment.webp"
            alt="Market Risk Graph"
            className="rounded-lg w-full mt-6 shadow-lg"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-semibold mb-8">Expert Market Opinions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              headline: "Top Investment Strategies for 2025",
              source: "Forbes",
              image: "https://i.pinimg.com/736x/3a/95/f4/3a95f45ca126a3aa8760449a6fd3ecda.jpg",
            },
            {
              headline: "Economic Shifts Affecting Property Prices",
              source: "Bloomberg",
              image: "https://i.pinimg.com/736x/be/68/f7/be68f747a084ce5fd4a9ce688c949897.jpg",
            },
          ].map((article, index) => (
            <div key={index} className={`p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
              <img src={article.image} alt={article.headline} className="rounded-lg w-full h-48 object-cover mb-4" />
              <h2 className="text-xl font-bold">{article.headline}</h2>
              <p className="text-gray-400">Source: {article.source}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className={`text-center py-6 mt-12 ${darkMode ? "bg-gray-800 text-white" : "bg-gray-900 text-white"}`}>
        <p className="text-sm">© 2024 EstateTracker. All rights reserved.</p>
      </footer>
    </div>
  );
}
