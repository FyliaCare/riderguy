import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'indigo' | 'pink';
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  subtitle,
  trend,
  color = 'blue',
  className,
}: StatCardProps) {
  const gradientClasses = {
    blue: 'from-blue-600 to-blue-700',
    green: 'from-green-600 to-green-700',
    purple: 'from-purple-600 to-purple-700',
    orange: 'from-orange-600 to-orange-700',
    red: 'from-red-600 to-red-700',
    indigo: 'from-indigo-600 to-indigo-700',
    pink: 'from-pink-600 to-pink-700',
  };

  return (
    <div
      className={cn(
        'bg-gradient-to-br rounded-2xl p-5 text-white',
        gradientClasses[color],
        className
      )}
    >
      <Icon className="w-8 h-8 mb-2 opacity-90" />
      <p className="text-3xl font-black">{value}</p>
      <p className="text-sm opacity-90">{title}</p>
      {subtitle && <p className="text-xs opacity-75 mt-1">{subtitle}</p>}
      {trend && (
        <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${trend.isPositive ? 'text-green-200' : 'text-red-200'}`}>
          <span>{trend.isPositive ? '↑' : '↓'}</span>
          <span>{Math.abs(trend.value)}%</span>
        </div>
      )}
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  change?: {
    value: number;
    label: string;
  };
  className?: string;
}

export function MetricCard({ label, value, icon: Icon, change, className }: MetricCardProps) {
  return (
    <div className={cn('p-4 bg-gray-50 rounded-xl', className)}>
      <div className="flex items-center gap-2 mb-1">
        {Icon && <Icon className="w-4 h-4 text-gray-600" />}
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <p className="text-2xl font-black text-gray-900">{value}</p>
      {change && (
        <p className="text-xs text-gray-600 mt-1">
          <span className={change.value >= 0 ? 'text-green-600' : 'text-red-600'}>
            {change.value >= 0 ? '+' : ''}{change.value}%
          </span>{' '}
          {change.label}
        </p>
      )}
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-black text-gray-900">{title}</h1>
        {description && <p className="text-gray-600 mt-1">{description}</p>}
      </div>
      {action}
    </div>
  );
}

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-gray-600 mb-4">{description}</p>}
      {action}
    </div>
  );
}

interface LoadingSkeletonProps {
  count?: number;
  className?: string;
}

export function LoadingSkeleton({ count = 1, className }: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn('animate-pulse bg-gray-200 rounded-lg', className)}
          style={{ height: '100px' }}
        />
      ))}
    </>
  );
}

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({ children, variant = 'neutral', size = 'md', className }: BadgeProps) {
  const variantClasses = {
    success: 'bg-green-100 text-green-700 border-green-300',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    error: 'bg-red-100 text-red-700 border-red-300',
    info: 'bg-blue-100 text-blue-700 border-blue-300',
    neutral: 'bg-gray-100 text-gray-700 border-gray-300',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-bold rounded-full border-2',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProgressBar({
  value,
  max,
  label,
  showPercentage = true,
  color = 'blue',
  size = 'md',
  className,
}: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100);
  
  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    orange: 'bg-orange-600',
    red: 'bg-red-600',
  };

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className={cn('space-y-2', className)}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="font-semibold text-gray-700">{label}</span>}
          {showPercentage && <span className="font-bold text-gray-900">{percentage}%</span>}
        </div>
      )}
      <div className={cn('bg-gray-200 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={cn('rounded-full transition-all duration-500', colorClasses[color], sizeClasses[size])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
