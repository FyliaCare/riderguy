'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { MobileHeader } from '@/components/dashboard/mobile-header';
import { MobileBottomNav } from '@/components/dashboard/mobile-bottom-nav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Desktop & Mobile Drawer */}
      <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Mobile Header */}
      <MobileHeader onMenuClick={() => setMobileMenuOpen(true)} />

      {/* Main Content */}
      <div className="lg:pl-72 transition-all duration-300">
        {/* Page Content with Mobile-Optimized Padding */}
        <main className="pt-16 lg:pt-6 pb-20 lg:pb-6 px-4 sm:px-6 lg:px-8 mobile-container">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
