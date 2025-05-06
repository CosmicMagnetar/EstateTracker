import Head from 'next/head';
import Link from 'next/link';

export default function Settings() {
  return (
    <div className="min-h-screen bg-gray-50">
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

        <section className="bg-blue-50 text-center py-20 px-4">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Customize Your Preferences</h1>
        <p className="text-gray-700 text-lg md:text-xl mb-8">Adjust settings for a personalized real estate experience.</p>
      </section>

      <div className="max-w-5xl mx-auto py-12 px-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Account & Preferences</h2>

        <form className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-800">Notification Preferences</label>
            <select className="w-full p-3 mt-2 border rounded-lg text-gray-500">
              <option>Email Alerts</option>
              <option>SMS Alerts</option>
              <option>Push Notifications</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-800">Theme Selection</label>
            <div className="flex space-x-4 mt-2">
              <button className="w-10 h-10 rounded-full bg-white border shadow-lg"></button>
              <button className="w-10 h-10 rounded-full bg-gray-800 border shadow-lg"></button>
              <button className="w-10 h-10 rounded-full bg-blue-600 border shadow-lg"></button>
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-800">Preferred Market Region</label>
            <input type="text" placeholder="Enter preferred city or region" className="w-full p-3 mt-2 border rounded-lg text-gray-800" />
          </div>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all ">
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
}