import Head from 'next/head';
import Link from 'next/link';

export default function Insights() {
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
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Real Estate Investment Insights</h1>
        <p className="text-gray-700 text-lg md:text-xl mb-8">Analyze growth patterns, risk factors, and strategic investment opportunities.</p>
      </section>

      <div className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8">Long-Term Investment Growth</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-lg text-gray-600">
            <strong>Real estate investments have historically outperformed inflation by an average of 3% yearly.</strong>
            <br/>
            Major cities experience higher appreciation rates based on demand and economic stability.
          </p>
          <img src="https://source.unsplash.com/1200x600/?realestate,graph" alt="Investment Growth Graph" className="rounded-lg w-full mt-6 shadow-lg" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8">Risk Zones & Market Stability</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-lg text-gray-600">
            <strong>Cities with rapid price hikes may face downturns due to economic corrections.</strong>
            <br/>
            Key indicators such as unemployment rates and consumer demand help predict stability.
          </p>
          <img src="https://source.unsplash.com/1200x600/?risk,finance" alt="Market Risk Graph" className="rounded-lg w-full mt-6 shadow-lg" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8">Expert Market Opinions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { headline: "Top Investment Strategies for 2025", source: "Forbes", image: "https://source.unsplash.com/400x300/?strategy" },
            { headline: "Economic Shifts Affecting Property Prices", source: "Bloomberg", image: "https://source.unsplash.com/400x300/?finance,business" }
          ].map((article, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300">
              <img src={article.image} alt={article.headline} className="rounded-lg w-full h-48 object-cover mb-4" />
              <h2 className="text-xl font-bold text-gray-800">{article.headline}</h2>
              <p className="text-gray-600">Source: {article.source}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}