"use client";

import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { LineChart, BarChart, TrendingDown, MapPin, Home, Building2, Globe2 } from "lucide-react";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
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

  const allListings = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `${["Cozy", "Spacious", "Modern", "Charming"][Math.floor(Math.random() * 4)]} ${
      ["Apartment", "Condo", "House", "Townhouse"][Math.floor(Math.random() * 4)]
    } in ${["New York", "San Francisco", "Los Angeles", "Chicago"][Math.floor(Math.random() * 4)]}`,
    price: Math.floor(Math.random() * (500000 - 80000) + 80000),
    size: Math.floor(Math.random() * (2500 - 500) + 500),
    bedrooms: Math.floor(Math.random() * 5 + 1),
    bathrooms: Math.floor(Math.random() * 4 + 1),
    image: `https://placeimg.com/640/480/arch?${i}`,
  }));

  const filteredListings = allListings.filter((listing) =>
    listing.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const displayedListings = filteredListings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <Head>
        <title>EstateTracker Dashboard</title>
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

      <section className={`text-center py-24 px-4 ${darkMode ? "bg-gray-800 text-white" : "bg-blue-50 text-gray-900"}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg md:text-xl mb-8">Search and explore live property listings.</p>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="p-4 w-full max-w-md mx-auto rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </section>

      <section className="p-6 max-w-7xl mx-auto">
        {filteredListings.length === 0 ? (
          <p className="text-gray-600 text-lg text-center mt-10">No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedListings.map((listing) => (
              <div key={listing.id} className={`rounded-lg shadow p-4 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
                <img src={listing.image} alt={listing.title} className="rounded w-full h-40 object-cover mb-4" />
                <h2 className="text-xl font-semibold mb-2">{listing.title}</h2>
                <p><strong>Price:</strong> ₹{listing.price.toLocaleString()}</p>
                <p><strong>Size:</strong> {listing.size} sq ft</p>
                <p><strong>Bedrooms:</strong> {listing.bedrooms}, <strong>Bathrooms:</strong> {listing.bathrooms}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} className={`px-4 py-2 rounded ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-white border border-gray-300 text-gray-700 hover:bg-blue-100"}`} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
