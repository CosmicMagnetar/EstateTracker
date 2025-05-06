'use client';

import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { LineChart, BarChart, TrendingDown, MapPin, Home, Building2, Globe2 } from 'lucide-react';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const allListings = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `${['Cozy', 'Spacious', 'Modern', 'Charming'][Math.floor(Math.random() * 4)]} ${['Apartment', 'Condo', 'House', 'Townhouse'][Math.floor(Math.random() * 4)]} in ${['New York', 'San Francisco', 'Los Angeles', 'Chicago', 'Austin', 'Seattle', 'Boston', 'Denver'][Math.floor(Math.random() * 8)]}`,
    price: Math.floor(Math.random() * (500000 - 80000) + 80000),
    size: Math.floor(Math.random() * (2500 - 500) + 500),
    bedrooms: Math.floor(Math.random() * 5 + 1),
    bathrooms: Math.floor(Math.random() * 4 + 1),
    city: ['New York', 'San Francisco', 'Los Angeles', 'Chicago', 'Austin', 'Seattle', 'Boston', 'Denver'][Math.floor(Math.random() * 8)],
    property_type: ['Apartment', 'Condo', 'House', 'Townhouse'][Math.floor(Math.random() * 4)],
    image: `https://placeimg.com/640/480/arch?${i}`,
    tags: [['garden', 'garage'], ['pool'], ['balcony', 'gym'], ['pet-friendly'], ['furnished'], ['newly-built']][Math.floor(Math.random() * 6)],
    available: Math.random() < 0.5
  }));

  const filteredListings = allListings.filter(listing =>
    listing.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const displayedListings = filteredListings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>EstateTracker Dashboard</title>
      </Head>

      <nav className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-50 pl-7">
        <div className="text-xl font-bold text-gray-800">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">EstateTracker</Link>
        </div>
        <div className="space-x-6">
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">Dashboard</Link>
          <Link href="/compare" className="text-gray-700 hover:text-blue-600 transition-colors">Compare</Link>
          <Link href="/insights" className="text-gray-700 hover:text-blue-600 transition-colors">Insights</Link>
          <Link href="/settings" className="text-gray-700 hover:text-blue-600 transition-colors">Settings</Link>
        </div>
      </nav>

      <section className="bg-blue-50 text-center py-24 px-4 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 transition duration-500 hover:scale-105">Dashboard</h1>
        <p className="text-gray-700 text-lg md:text-xl mb-8">Search and explore live property listings</p>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="p-4 w-full max-w-md mx-auto rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </section>

      <section className="p-6 max-w-7xl mx-auto">
        {filteredListings.length === 0 ? (
          <p className="text-gray-600 text-lg text-center mt-10">No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedListings.map(listing => (
              <div key={listing.id} className="bg-white rounded-lg shadow p-4">
                <img src={listing.image} alt={listing.title} className="rounded w-full h-40 object-cover mb-4" />
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{listing.title}</h2>
                <p className="text-gray-700"><strong>Price:</strong> ₹{listing.price.toLocaleString()}</p>
                <p className="text-gray-700"><strong>Size:</strong> {listing.size} sq ft</p>
                <p className="text-gray-700"><strong>Bedrooms:</strong> {listing.bedrooms}, <strong>Bathrooms:</strong> {listing.bathrooms}</p>
                <p className="text-gray-700"><strong>Location:</strong> {listing.city}</p>
                <p className="text-gray-700"><strong>Type:</strong> {listing.property_type}</p>
                <p className="text-gray-700"><strong>Tags:</strong> {listing.tags.join(', ')}</p>
                <p className={`mt-2 font-semibold ${listing.available ? 'text-green-600' : 'text-red-600'}`}>
                  {listing.available ? 'Available' : 'Not Available'}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-blue-100'}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>

      <footer className="bg-gray-800 text-white text-center py-6 mt-12">
        <p className="text-sm">© 2024 EstateTracker. All rights reserved.</p>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}