'use client';

import Head from 'next/head';
import Link from 'next/link';
import { LineChart, BarChart, TrendingDown, MapPin, Home as HomeIcon, Building2, Globe2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>EstateTracker</title>
      </Head>

      <nav className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-50 pl-7">
        <div className="text-xl font-bold text-gray-800">EstateTracker</div>
        <div className="space-x-6">
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">Dashboard</Link>
          <Link href="/compare" className="text-gray-700 hover:text-blue-600 transition-colors">Compare</Link>
          <Link href="/insights" className="text-gray-700 hover:text-blue-600 transition-colors">Insights</Link>
          <Link href="/settings" className="text-gray-700 hover:text-blue-600 transition-colors">Settings</Link>
        </div>
      </nav>

      <section className="bg-blue-50 text-center py-24 px-4 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 transition duration-500 hover:scale-105">Real Estate Market Tracker</h1>
        <p className="text-gray-700 text-lg md:text-xl mb-8">Track property price changes and market trends with ease</p>
        <Link href="#">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300">
            Start Exploring
          </button>
        </Link>
      </section>

      <section className="py-20 px-4 bg-white text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-16">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
          {[
            { icon: <LineChart size={48} />, title: 'Track property price changes' },
            { icon: <BarChart size={48} />, title: 'Visualize trends with charts' },
            { icon: <TrendingDown size={48} />, title: 'Get market insights' },
            { icon: <MapPin size={48} />, title: 'Compare regions and properties' }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition transform hover:scale-105 duration-300"
            >
              <div className="text-blue-600 mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="font-medium text-lg text-gray-800">{feature.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-50 py-20 px-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8">Explore Popular Property Types</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[{ icon: <HomeIcon className="w-10 h-10" />, label: 'Houses' }, { icon: <Building2 className="w-10 h-10" />, label: 'Apartments' }, { icon: <Globe2 className="w-10 h-10" />, label: 'Villas' }].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transform hover:scale-105 transition duration-300">
              <div className="text-blue-600 mb-4 flex justify-center">{item.icon}</div>
              <h4 className="text-xl font-medium text-gray-800">{item.label}</h4>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 bg-white text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8">How It Works</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { step: '1', desc: 'Browse through thousands of property listings' },
            { step: '2', desc: 'Compare prices and features across locations' },
            { step: '3', desc: 'Get insights and make smarter decisions' }
          ].map((step, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-xl shadow-md hover:scale-105 transition duration-300">
              <div className="text-blue-600 text-4xl font-bold mb-4">{step.step}</div>
              <p className="text-gray-700 text-lg">{step.desc}</p>
            </div>
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
