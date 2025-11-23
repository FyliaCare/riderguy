'use client';

import Link from 'next/link';
import { 
  AlertCircle, 
  BookOpen, 
  Gift, 
  MessageSquare,
  Shield,
  Trophy
} from 'lucide-react';

const actions = [
  {
    label: 'Training',
    href: '/training',
    icon: BookOpen,
    color: 'bg-blue-500',
  },
  {
    label: 'Leaderboard',
    href: '/leaderboard',
    icon: Trophy,
    color: 'bg-yellow-500',
  },
  {
    label: 'Support',
    href: '/support',
    icon: MessageSquare,
    color: 'bg-green-500',
  },
  {
    label: 'Rewards',
    href: '/rewards',
    icon: Gift,
    color: 'bg-purple-500',
  },
  {
    label: 'Safety',
    href: '/safety',
    icon: Shield,
    color: 'bg-red-500',
  },
  {
    label: 'Report',
    href: '/incidents/new',
    icon: AlertCircle,
    color: 'bg-orange-500',
  },
];

export function QuickActions() {
  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold">Quick Actions</h2>
      <div className="grid grid-cols-3 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className="flex flex-col items-center gap-2 rounded-lg border bg-card p-4 transition-all hover:bg-secondary"
            >
              <div className={`rounded-full p-3 ${action.color}`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs font-medium text-center">{action.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
