import Head from 'next/head';
import Link from 'next/link';

export default function Compare() {
  const properties = [
    {
      image: "https://i.pinimg.com/736x/b8/53/6a/b8536a1533b7e81636f7d897a266bd2b.jpg",
      price: "₹750,000",
      location: "New York, USA",
      features: ["4 Bedrooms", "3 Bathrooms", "2,500 sqft", "Private Garden"]
    },
    {
      image: "https://i.pinimg.com/736x/88/a2/d1/88a2d1b1e93e8c9377e777239f58a17a.jpg",
      price: "₹490,000",
      location: "Los Angeles, USA",
      features: ["2 Bedrooms", "2 Bathrooms", "1,800 sqft", "City View"]
    },
    {
      image: "https://i.pinimg.com/736x/ab/e0/9e/abe09e62b4aaecdee71e81af50211563.jpg",
      price: "₹1,250,000",
      location: "Miami, USA",
      features: ["6 Bedrooms", "5 Bathrooms", "5,000 sqft", "Ocean View"]
    }
  ];

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

      <section className="bg-blue-50 text-center py-24 px-4">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Compare Real Estate Listings</h1>
        <p className="text-gray-700 text-lg md:text-xl mb-8">Find the perfect property by comparing price, features, and location.</p>
      </section>

      <div className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Featured Properties</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {properties.map((property, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg transition transform hover:scale-105 duration-300">
              <img src={property.image} alt="Property" className="rounded-lg w-full h-64 object-cover mb-6" />
              <div className="text-gray-800 text-base space-y-2">
                <p><span className="font-semibold">Price:</span> {property.price}</p>
                <p><span className="font-semibold">Size:</span> {property.features[2]}</p>
                <p>
                  <span className="font-semibold">Bedrooms:</span> {property.features[0].split(' ')[0]}, 
                  <span className="ml-2 font-semibold">Bathrooms:</span> {property.features[1].split(' ')[0]}
                </p>
                <p><span className="font-semibold">Location:</span> {property.location}</p>
                <p><span className="font-semibold">Type:</span> Condo</p>
                <p><span className="font-semibold">Tags:</span> {property.features[3]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Compare Features</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-black">
                <th className="p-4 text-left font-bold">Property</th>
                <th className="p-4 text-left">Location</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Bedrooms</th>
                <th className="p-4 text-left">Bathrooms</th>
                <th className="p-4 text-left">Size</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property, index) => (
                <tr key={index} className="border-b border-black-800 text-black">
                  <td className="p-4 font-bold">{property.location}</td>
                  <td className="p-4">{property.location}</td>
                  <td className="p-4 text-blue-600">{property.price}</td>
                  <td className="p-4">{property.features[0]}</td>
                  <td className="p-4">{property.features[1]}</td>
                  <td className="p-4">{property.features[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
