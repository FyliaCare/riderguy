'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Wallet,
  TrendingUp,
  Award,
  Users,
  Settings,
  BarChart3,
  MapPin,
  Bell,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Calendar,
  Heart,
  BookOpen,
  Shield,
  ChevronDown,
  ChevronRight,
  UserPlus,
} from 'lucide-react';
import { useRiderStore } from '@/store/rider-store';

interface NavItem {
  name: string;
  href: string;
  icon: any;
  badge?: string | number;
  subItems?: { name: string; href: string }[];
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Deliveries', href: '/dashboard/deliveries', icon: Package, badge: 3 },
  { name: 'Earnings', href: '/dashboard/earnings', icon: Wallet },
  { name: 'Performance', href: '/dashboard/performance', icon: TrendingUp },
  { name: 'XP & Rewards', href: '/dashboard/rewards', icon: Award },
  { name: 'Training', href: '/dashboard/training', icon: BookOpen },
  { name: 'Community', href: '/dashboard/community', icon: Users },
  { name: 'Referrals', href: '/dashboard/referrals', icon: UserPlus, badge: 'HOT' },
  { name: 'Schedule', href: '/dashboard/schedule', icon: Calendar },
  { name: 'Welfare', href: '/dashboard/welfare', icon: Heart },
  { name: 'Route History', href: '/dashboard/routes', icon: MapPin },
  { name: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
  { name: 'Insurance', href: '/dashboard/insurance', icon: Shield },
];

const bottomNavigation: NavItem[] = [
  { name: 'Notifications', href: '/dashboard/notifications', icon: Bell, badge: 12 },
  { name: 'Help Center', href: '/dashboard/help', icon: HelpCircle },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  const { rider } = useRiderStore();

  const toggleExpanded = (name: string) => {
    setExpandedItems(prev =>
      prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
    );
  };
  
  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  const NavContent = () => (
    <>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                {rider?.name?.[0] || 'R'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{rider?.name || 'Rider'}</p>
                <p className="text-xs text-gray-500">Level {rider?.level || 1}</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden lg:block"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* XP Progress Bar */}
        {!collapsed && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-gray-600">XP Progress</span>
              <span className="font-semibold text-green-600">{rider?.xp || 0}/1000</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                style={{ width: `${((rider?.xp || 0) / 1000) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isExpanded = expandedItems.includes(item.name);

          return (
            <div key={item.name}>
              <Link
                href={hasSubItems ? '#' : item.href}
                onClick={(e) => {
                  if (hasSubItems) {
                    e.preventDefault();
                    toggleExpanded(item.name);
                  } else {
                    handleLinkClick();
                  }
                }}
                className={`
                  mobile-nav-item
                  ${isActive
                    ? 'bg-green-50 text-green-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                  ${collapsed ? 'justify-center' : ''}
                `}
              >
                <item.icon className={`mobile-icon ${isActive ? 'text-green-600' : 'text-gray-500'} flex-shrink-0`} />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs font-semibold bg-red-500 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {hasSubItems && (
                      isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )
                    )}
                  </>
                )}
              </Link>

              {/* Sub-items */}
              {hasSubItems && isExpanded && !collapsed && (
                <div className="ml-11 mt-1 space-y-1">
                  {item.subItems?.map((subItem) => {
                    const isSubActive = pathname === subItem.href;
                    return (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={`
                          block px-3 py-2 text-sm rounded-lg transition-colors
                          ${isSubActive
                            ? 'bg-green-50 text-green-600 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                          }
                        `}
                      >
                        {subItem.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-200 p-4 space-y-1">
        {bottomNavigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                ${isActive
                  ? 'bg-green-50 text-green-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
                }
                ${collapsed ? 'justify-center' : ''}
              `}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-green-600' : 'text-gray-500'} flex-shrink-0`} />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-red-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}

        {/* Logout */}
        <button
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-red-600 hover:bg-red-50
            ${collapsed ? 'justify-center' : ''}
          `}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-30
          ${collapsed ? 'w-20' : 'w-72'}
        `}
      >
        <NavContent />
      </aside>

      {/* Mobile Sidebar Overlay & Drawer */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
            onClick={onClose}
          />
          <aside className="fixed left-0 top-0 h-screen w-80 max-w-[85vw] bg-white z-50 flex flex-col lg:hidden animate-slide-in-left mobile-safe-area">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="font-bold text-lg">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-xl touch-target touch-feedback no-tap-highlight"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <NavContent />
          </aside>
        </>
      )}
    </>
  );
}
