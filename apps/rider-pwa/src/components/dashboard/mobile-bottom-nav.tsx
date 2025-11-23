'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Wallet,
  TrendingUp,
  Users,
} from 'lucide-react';

const bottomNavItems = [
  { name: 'Home', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Orders', href: '/dashboard/deliveries', icon: Package },
  { name: 'Earnings', href: '/dashboard/earnings', icon: Wallet },
  { name: 'Stats', href: '/dashboard/performance', icon: TrendingUp },
  { name: 'More', href: '/dashboard/community', icon: Users },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="mobile-bottom-nav lg:hidden">
      <div className="grid grid-cols-5 h-full">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`mobile-bottom-nav-item no-tap-highlight ${
                isActive
                  ? 'text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className={`mobile-icon-sm ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
