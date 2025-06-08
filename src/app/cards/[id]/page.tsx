"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

export default function PropertyDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });
  const [priceHistory, setPriceHistory] = useState<{ month: string; price: number }[]>([]);

  const generateRandomPriceHistory = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return months.map((month) => ({
      month,
      price: Math.floor(Math.random() * (9000000 - 3000000 + 1)) + 3000000,
    }));
  };

  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await fetch(`https://6845deaafc51878754dc6a46.mockapi.io/properties/${id}`);
        if (!res.ok) throw new Error("Property not found");
        const data = await res.json();
        setProperty(data);

        setPriceHistory(generateRandomPriceHistory());
      } catch (err) {
        console.error(err);
        router.push("/cards");
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, [id, router]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-gray-900", "text-gray-100");
      document.body.classList.remove("bg-gray-50", "text-gray-900");
    } else {
      document.body.classList.add("bg-gray-50", "text-gray-900");
      document.body.classList.remove("bg-gray-900", "text-gray-100");
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", darkMode.toString());
    }
  }, [darkMode]);

  if (loading)
    return (
      <div className="p-12 text-center text-lg font-medium">
        Loading property details...
      </div>
    );

  if (!property) return null;

  return (
    <main
      className={`min-h-screen flex flex-col items-center px-6 py-16 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <button
        onClick={() => router.back()}
        className="self-start mb-10 inline-flex items-center gap-2 px-5 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md"
        aria-label="Go back"
      >
        ← Back to listings
      </button>

      <div
        className={`max-w-5xl w-full ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } rounded-lg shadow-xl border overflow-hidden`}
      >
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-96 object-cover rounded-t-lg"
          loading="lazy"
        />

        <div className="p-8">
          <h1 className="text-4xl font-extrabold mb-6">{property.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8 text-lg">
            <div>
              <p className="mb-2">
                <span className="font-semibold">City:</span> {property.city}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Size:</span> {property.size} sq ft
              </p>
              <p className="mb-2">
                <span className="font-semibold">Bedrooms:</span> {property.bedrooms}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Bathrooms:</span> {property.bathrooms}
              </p>
            </div>

            <div className="flex flex-col justify-center">
              <p
                className={`text-3xl font-bold mb-2 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                ₹{Number(property.price).toLocaleString()}
              </p>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                * Price subject to change
              </p>
            </div>
          </div>

          <div className="mt-10 w-full h-64 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Price History (Last 6 months)</h2>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={priceHistory}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                <XAxis
                  dataKey="month"
                  stroke={darkMode ? "#d1d5db" : "#4b5563"}
                  tick={{ fontWeight: "600" }}
                />
                <YAxis
                  tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                  domain={["auto", "auto"]}
                  stroke={darkMode ? "#d1d5db" : "#4b5563"}
                  tick={{ fontWeight: "600" }}
                />
                <Tooltip
                  formatter={(value: number) => `₹${value.toLocaleString()}`}
                  contentStyle={{
                    backgroundColor: darkMode ? "#1f2937" : "#fff",
                    borderRadius: 8,
                    borderColor: darkMode ? "#374151" : "#e5e7eb",
                    color: darkMode ? "#d1d5db" : "#111827",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={darkMode ? "#60a5fa" : "#3b82f6"}
                  strokeWidth={3}
                  dot={{ r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <br/>
          <br/>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mt-6 px-6 py-3 bg-blue-600 rounded-md text-white font-semibold hover:bg-blue-700 transition self-center block mx-auto shadow-md"
            aria-label="Toggle dark mode"
          >
            {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>
      </div>
    </main>
  );
}
