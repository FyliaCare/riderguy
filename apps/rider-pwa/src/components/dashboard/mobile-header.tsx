'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Bell, Search } from 'lucide-react';
import { useRiderStore } from '@/store/rider-store';

interface MobileHeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export function MobileHeader({ onMenuClick, title }: MobileHeaderProps) {
  const { rider } = useRiderStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`lg:hidden fixed top-0 left-0 right-0 z-40 transition-all duration-300 mobile-safe-area ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-sm'
          : 'bg-white'
      }`}
    >
      <div className="flex items-center justify-between px-4 h-16">
        {/* Menu Button */}
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-xl touch-target touch-feedback no-tap-highlight"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Center Content - Title or Logo */}
        <div className="flex-1 flex items-center justify-center">
          {title ? (
            <h1 className="font-bold text-lg truncate px-4">{title}</h1>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="font-bold text-lg text-green-600">RiderGuy</span>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-gray-100 rounded-xl touch-target touch-feedback no-tap-highlight relative">
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Optional Search Bar */}
      {/* <div className="px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div> */}
    </header>
  );
}
