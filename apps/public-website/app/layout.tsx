import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RiderGuy - Empowering Delivery Riders Across Africa",
  description: "Professional training, digital wallet, welfare benefits, and community support for delivery riders building sustainable careers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Header Navigation */}
        <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
          <nav className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <Image 
                  src="/logo-header-black.svg" 
                  alt="RiderGuy" 
                  width={200} 
                  height={70}
                  className="h-12 md:h-14 w-auto"
                  priority
                />
              </Link>
              
              <div className="hidden md:flex items-center gap-8">
                <Link href="/" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                  Home
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                  About
                </Link>
                <Link href="/services" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                  Riders
                </Link>
                <Link href="/partner" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                  Business
                </Link>
                <Link 
                  href="/join" 
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Join Now
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button className="md:hidden p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="pt-20">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <Image 
                  src="/logo-footer-white.svg" 
                  alt="RiderGuy" 
                  width={280} 
                  height={95}
                  className="h-20 md:h-24 w-auto mb-6"
                />
                <p className="text-gray-400 text-sm">
                  Empowering delivery riders across Africa with training, support, and opportunities.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Platform</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/services" className="hover:text-white transition-colors">Riders</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/join" className="hover:text-white transition-colors">Join RiderGuy</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Business</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/partner" className="hover:text-white transition-colors">Partner With Us</Link></li>
                  <li><Link href="/partner/individual" className="hover:text-white transition-colors">Small Business</Link></li>
                  <li><Link href="/partner/enterprise" className="hover:text-white transition-colors">Enterprise Solutions</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                  <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
              <p>&copy; {new Date().getFullYear()} RiderGuy. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
