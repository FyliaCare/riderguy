'use client';

import { DollarSign, Package, Star, TrendingUp } from 'lucide-react';
import { useRiderStore } from '@/store/rider-store';

export function StatsCards() {
  const { rider } = useRiderStore();

  const stats = [
    {
      label: "Today's Earnings",
      value: `$${rider?.todayEarnings?.toFixed(2) || '0.00'}`,
      icon: DollarSign,
      color: 'text-success',
    },
    {
      label: 'Tasks Completed',
      value: rider?.tasksCompletedToday || 0,
      icon: Package,
      color: 'text-primary',
    },
    {
      label: 'Rating',
      value: rider?.rating?.toFixed(1) || '5.0',
      icon: Star,
      color: 'text-warning',
    },
    {
      label: 'Streak',
      value: `${rider?.streak || 0} days`,
      icon: TrendingUp,
      color: 'text-destructive',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="rounded-lg border bg-card p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold">{stat.value}</p>
              </div>
              <Icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
