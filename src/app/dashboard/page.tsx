"use client";

import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Property {
  id: string;
  title: string;
  price: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  city: string;
  image: string;
}

export default function Dashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<"title" | "city" | "price" | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [darkMode, setDarkMode] = useState<boolean>(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      try {
        const res = await fetch("https://6845deaafc51878754dc6a46.mockapi.io/properties");
        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.error("Failed to fetch properties", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

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

  const filtered = properties.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    let compareA = a[sortKey];
    let compareB = b[sortKey];
    if (typeof compareA === "string" && typeof compareB === "string") {
      compareA = compareA.toLowerCase();
      compareB = compareB.toLowerCase();
    }
    if (compareA < compareB) return sortOrder === "asc" ? -1 : 1;
    if (compareA > compareB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const displayed = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSortChange = (key: "title" | "city" | "price" | "") => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <Head>
        <title>EstateTracker Dashboard</title>
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
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </nav>

      <section className={`text-center py-12 px-4 ${darkMode ? "bg-gray-800 text-white" : "bg-blue-50 text-gray-900"}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg md:text-xl mb-8">Search and explore property listings.</p>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className={`p-4 w-full max-w-md mx-auto rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            darkMode
              ? "bg-gray-900 text-white border-gray-700 placeholder-gray-400"
              : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
          }`}
        />
        <div className="mt-4 flex justify-center space-x-4 max-w-md mx-auto">
          <button
            onClick={() => handleSortChange("title")}
            className={`px-3 py-1 rounded ${
              sortKey === "title"
          ? "bg-blue-600 text-white"
          : darkMode
          ? "bg-gray-900 border border-gray-700 text-white hover:bg-gray-800"
          : "bg-white border border-gray-300 text-gray-700 hover:bg-blue-100"
            }`}
          >
            Sort by Title {sortKey === "title" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </button>
          <button
            onClick={() => handleSortChange("city")}
            className={`px-3 py-1 rounded ${
              sortKey === "city"
          ? "bg-blue-600 text-white"
          : darkMode
          ? "bg-gray-900 border border-gray-700 text-white hover:bg-gray-800"
          : "bg-white border border-gray-300 text-gray-700 hover:bg-blue-100"
            }`}
          >
            Sort by City {sortKey === "city" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </button>
          <button
            onClick={() => handleSortChange("price")}
            className={`px-3 py-1 rounded ${
              sortKey === "price"
          ? "bg-blue-600 text-white"
          : darkMode
          ? "bg-gray-900 border border-gray-700 text-white hover:bg-gray-800"
          : "bg-white border border-gray-300 text-gray-700 hover:bg-blue-100"
            }`}
          >
            Sort by Price {sortKey === "price" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </button>
        </div>
      </section>

      <section className="p-6 max-w-7xl mx-auto">
        {loading ? (
          <p className="text-center text-lg">Loading properties...</p>
        ) : displayed.length === 0 ? (
          <p className="text-center text-lg">No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map((property) => (
              <Link
                key={property.id}
                href={`/cards/${property.id}`}
                className={`block rounded-lg shadow p-4 hover:shadow-xl transition ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="rounded w-full h-40 object-cover mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
                <p><strong>City:</strong> {property.city}</p>
                <p><strong>Price:</strong> ₹{Number(property.price).toLocaleString()}</p>
                <p><strong>Size:</strong> {property.size} sq ft</p>
                <p><strong>Bedrooms:</strong> {property.bedrooms}, <strong>Bathrooms:</strong> {property.bathrooms}</p>
              </Link>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-8 space-x-2 flex-wrap gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white border border-gray-300 text-gray-700 hover:bg-blue-100"}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}