// ✅ src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from "./settings-context";
import Header from "./components/Header"; // adjust path as needed
import CustomCursor from "./components/CustomCursor";
import RouteTransition from "./components/RouteTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZonePulse — Real Estate Market Tracker",
  description:
    "ZonePulse helps you track property price changes, compare zones, and get real-time real estate market insights across India.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
        <meta name="theme-color" content="#1e40af" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased transition-colors duration-300`}
      >
        <SettingsProvider>
          <CustomCursor themeClasses={{ cursor: "bg-[#00c950]" }}/>
          <Header />
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
